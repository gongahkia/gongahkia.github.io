"""Build annotations that otherwise require walking the document in the browser.

Edits use original source offsets so unrelated markup, code whitespace, and
embedded scripts are preserved byte for byte.
"""

from __future__ import annotations

import html
import re
from dataclasses import dataclass, field
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

VOID_TAGS = set("area base br col embed hr img input link meta param source track wbr".split())


@dataclass
class Element:
    tag: str
    attrs: dict
    start: int
    open_end: int
    parent: Element | None
    close_start: int = 0
    end: int = 0
    text: list[str] = field(default_factory=list)

    def inside_class(self, name):
        node = self.parent
        while node:
            if name in (node.attrs.get("class") or "").split():
                return True
            node = node.parent
        return False


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.source = source
        self.lines = [0, *(match.end() for match in re.finditer("\n", source))]
        self.elements = []
        self.stack = []
        self.feed(source)
        self.close()

    def source_offset(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, attrs):
        start = self.source_offset()
        node = Element(tag, dict(attrs), start, start + len(self.get_starttag_text()),
                       self.stack[-1] if self.stack else None)
        self.elements.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            node = self.stack.pop()
            node.close_start = node.end = node.open_end

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index].tag == tag:
                node = self.stack[index]
                node.close_start = self.source_offset()
                node.end = self.source.index(">", node.close_start) + 1
                del self.stack[index:]
                break

    def handle_data(self, data):
        for node in self.stack:
            node.text.append(data)


def origin(url):
    parsed = urlsplit(url)
    port = parsed.port if parsed.port is not None else {"http": 80, "https": 443}.get(parsed.scheme)
    return parsed.scheme, parsed.hostname, port


def optimize_html(source: str, page_url: str) -> str:
    document = Document(source)
    edits = []
    used_ids = {node.attrs["id"] for node in document.elements if "id" in node.attrs}
    anchors_enabled = any(node.tag == "body" and "data-heading-anchors" in node.attrs
                          for node in document.elements)
    heading_index = 0
    for node in document.elements:
        # Pygments' generic Name token inherits the same styling as plain text.
        # Preserve named token subclasses, arbitrary author spans and attributes.
        if (node.tag == "span" and node.attrs == {"class": "n"}
                and node.inside_class("codehilite") and node.end):
            edits.extend(((node.start, node.open_end, ""), (node.close_start, node.end, "")))

        updates = {}
        removals = []
        heading = ("data-toc" in node.attrs or
                   (node.tag in {"h2", "h3", "h4"} and node.inside_class("prose")))
        if anchors_enabled and heading and "data-toc-ignore" not in node.attrs:
            if not node.attrs.get("id"):
                text = (node.attrs.get("data-toc-title") or "".join(node.text) or "Section").strip()
                if text:
                    slug = re.sub(r"[^a-z0-9\s-]", "", text.lower())
                    slug = re.sub(r"-+", "-", re.sub(r"\s+", "-", slug)).strip("-")
                    base = slug or f"toc-heading-{heading_index}"
                    slug, suffix = base, 2
                    while slug in used_ids:
                        slug = f"{base}-{suffix}"
                        suffix += 1
                    updates["id"] = slug
                    used_ids.add(slug)
            heading_index += 1

        if node.tag == "a" and "href" in node.attrs:
            destination = urljoin(page_url, (node.attrs["href"] or "").strip())
            external = urlsplit(destination).scheme in {"http", "https"} and origin(destination) != origin(page_url)
            if external and "data-external" not in node.attrs:
                updates["data-external"] = ""
            elif not external and "data-external" in node.attrs:
                removals.append("data-external")

        if updates or removals:
            raw = source[node.start:node.open_end]
            # Empty id attributes must be replaced, just as heading.id was in JS.
            if "id" in updates and "id" in node.attrs:
                removals.append("id")
            for name in removals:
                raw = re.sub(rf'\s+{name}(?=[\s=>])(?:\s*=\s*(?:"[^"]*"|\x27[^\x27]*\x27|[^\s>]+))?',
                             "", raw, flags=re.I)
            additions = "".join(f' {name}="{html.escape(value, quote=True)}"' for name, value in updates.items())
            edits.append((node.start, node.open_end, raw[:-1] + additions + ">"))

    parts, position = [], 0
    for start, end, replacement in sorted(edits):
        parts.extend((source[position:start], replacement))
        position = end
    parts.append(source[position:])
    return "".join(parts)


def optimize_site_html(output: Path, base_url: str) -> None:
    for path in sorted(output.rglob("*.html")):
        route = path.relative_to(output).as_posix()
        source = path.read_text(encoding="utf-8")
        path.write_text(optimize_html(source, f"{base_url}/{route}"), encoding="utf-8")
