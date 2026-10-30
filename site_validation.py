"""Verify the crawlable metadata in the deployable static artifact."""

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit
from urllib.robotparser import RobotFileParser
from xml.etree import ElementTree


class PageMetadata(HTMLParser):
    def __init__(self, source: str):
        super().__init__()
        self.meta = {}
        self.canonical = []
        self.icons = []
        self.schemas = []
        self.title = ""
        self._capture = None
        self._schema = ""
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "meta":
            self.meta[attrs.get("name", attrs.get("property"))] = attrs.get("content", "")
        elif tag == "link" and attrs.get("rel") == "canonical":
            self.canonical.append(attrs.get("href"))
        elif tag == "link" and attrs.get("rel") == "icon":
            self.icons.append(attrs.get("href", ""))
        elif tag == "title":
            self._capture = "title"
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self._capture = "schema"
            self._schema = ""

    def handle_data(self, data):
        if self._capture == "title":
            self.title += data
        elif self._capture == "schema":
            self._schema += data

    def handle_endtag(self, tag):
        if tag == "title":
            self._capture = None
        elif tag == "script" and self._capture == "schema":
            self.schemas.append(json.loads(self._schema))
            self._capture = None


def validate_page(source: str, canonical: str) -> None:
    page = PageMetadata(source)
    if page.canonical != [canonical]:
        raise ValueError("missing or incorrect canonical URL")
    robots = {part.strip() for part in page.meta.get("robots", "").lower().split(",")}
    if not {"index", "follow"} <= robots or {"noindex", "nofollow"} & robots:
        raise ValueError("page is not indexable")
    if not page.title or page.title != page.title.upper() or "· v11" in page.title:
        raise ValueError("tab title is not uppercase and title-only")
    for key in ("description", "author", "og:title", "og:description", "og:type",
                "og:site_name", "og:image", "twitter:card", "twitter:title",
                "twitter:description", "twitter:image", "twitter:creator"):
        if not page.meta.get(key):
            raise ValueError(f"missing {key} metadata")
    if page.meta.get("og:url") != canonical:
        raise ValueError("social URL differs from canonical URL")
    if len(page.icons) != 1 or not page.icons[0].endswith("/asset/favicon.svg?v=11-light"):
        raise ValueError("favicon is not the fixed light icon")
    if not page.schemas:
        raise ValueError("missing structured data")
    nodes = [node for schema in page.schemas for node in schema.get("@graph", [schema])]
    route = urlsplit(canonical).path
    expected = {"WebSite", "Person"} if route == "/" else {"CollectionPage"} if route.endswith("/") else {"SoftwareSourceCode"} if route.startswith("/work/") else {"Article"} if route.startswith("/personal-wiki/") else {"BlogPosting", "TechArticle"}
    if not any(node.get("@type") in expected for node in nodes):
        raise ValueError("incorrect structured-data type")
    if route == "/" and not {"WebSite", "Person"} <= {node.get("@type") for node in nodes}:
        raise ValueError("missing site or person identity")
    for node in nodes:
        if node.get("url") != canonical:
            raise ValueError("structured-data URL differs from canonical URL")
        if node.get("@type") in {"Article", "BlogPosting", "TechArticle", "SoftwareSourceCode"}:
            if not all(node.get(key) for key in ("author", "datePublished", "dateModified")):
                raise ValueError("missing article author or dates")


def verify_seo_output(output: Path, base_url: str) -> None:
    expected = set()
    for path in sorted(output.rglob("*.html")):
        relative = path.relative_to(output).as_posix()
        route = "/" + relative.removesuffix("index.html") if relative.endswith("index.html") else "/" + relative
        canonical = base_url + route
        expected.add(canonical)
        try:
            validate_page(path.read_text(encoding="utf-8"), canonical)
        except (ValueError, TypeError, KeyError) as error:
            raise ValueError(f"SEO validation failed for {relative}: {error}") from error
    sitemap = ElementTree.parse(output / "sitemap.xml")
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text for node in sitemap.findall("s:url/s:loc", namespace)]
    if set(locations) != expected or len(locations) != len(expected):
        raise ValueError("sitemap must include every generated page exactly once")
    robots = RobotFileParser()
    robots.parse((output / "robots.txt").read_text().splitlines())
    for agent in ("Googlebot", "Bingbot", "GPTBot", "ChatGPT-User", "OAI-SearchBot",
                  "ClaudeBot", "Claude-SearchBot", "Claude-User", "PerplexityBot"):
        if not all(robots.can_fetch(agent, url) for url in expected):
            raise ValueError(f"robots.txt blocks {agent}")
    if robots.site_maps() != [base_url + "/sitemap.xml"]:
        raise ValueError("robots.txt is missing the production sitemap")
    if (output / "CNAME").read_text().strip() != urlsplit(base_url).hostname:
        raise ValueError("CNAME differs from canonical host")
    if not (output / "asset/portrait/gong-2-og.png").is_file():
        raise ValueError("missing social-preview image")
    if (output / "asset/favicon-dark.svg").exists():
        raise ValueError("dark favicon was included in the deployment")
    for stylesheet in ("style.css", "content.css", "tiempos.css"):
        for url in re.findall(r'url\(["\']?([^"\')]+)', (output / stylesheet).read_text()):
            if not urlsplit(url).scheme and not (output / url).is_file():
                raise ValueError(f"missing stylesheet asset: {url}")
