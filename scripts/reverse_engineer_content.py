#!/usr/bin/env python3
"""Recover Markdown source files from legacy blog and wiki HTML pages."""

from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from build import ROOT, md_to_html, parse_html_post, parse_html_wiki_note, split_md_title


def relative_path(path: Path) -> str:
    return str(path.relative_to(ROOT))


def normalize_text(value: str) -> str:
    value = value.replace("\xa0", " ")
    value = re.sub(r"[ \t\r\f\v]+", " ", value)
    value = re.sub(r"\n{3,}", "\n\n", value)
    return value.strip()


def yaml_scalar(value: str) -> str:
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'


def clean_math_delimiters(text: str) -> str:
    text = re.sub(r"\$\\\((.+?)\\\)\$", r"\\(\1\\)", text)
    text = re.sub(r"\$\\\[(.+?)\\\]\$", r"\\[\1\\]", text)
    return text


def emit_frontmatter(metadata: dict[str, str]) -> str:
    lines = ["---"]
    for key, value in metadata.items():
        lines.append(f"{key}: {yaml_scalar(str(value))}")
    lines.append("---")
    return "\n".join(lines)


@dataclass
class ConversionContext:
    warnings: list[str] = field(default_factory=list)
    raw_html_fallback: bool = False
    code_language_unresolved: bool = False


@dataclass
class ValidationResult:
    passed: bool
    issues: list[str] = field(default_factory=list)


@dataclass
class MigrationResult:
    target: str
    source_html: str
    output_markdown: str
    content_type: str
    action: str
    warnings: list[str]
    raw_html_fallback: bool
    code_language_unresolved: bool
    validation: dict


def inline_text(text: str) -> str:
    text = text.replace("\xa0", " ")
    return re.sub(r"[ \t\r\f\v]+", " ", text)


def join_inline(parts: list[str]) -> str:
    text = "".join(parts)
    text = text.replace(" \n", "\n").replace("\n ", "\n")
    text = re.sub(r"[ \t\r\f\v]+", " ", text)
    return text.strip()


def is_list_marker(text: str) -> bool:
    return bool(re.match(r"^(?:\*|-|\d+\.)\s+", text))


def split_on_breaks(node: Tag, context: ConversionContext) -> list[str]:
    segments = [[]]
    for child in node.children:
        if isinstance(child, Tag) and child.name == "br":
            segments.append([])
            continue
        segments[-1].append(render_inline(child, context))
    return [join_inline(segment) for segment in segments]


def render_inline(node, context: ConversionContext) -> str:
    if isinstance(node, NavigableString):
        return inline_text(str(node))

    if not isinstance(node, Tag):
        return ""

    classes = set(node.get("class", []))

    if node.name == "br":
        return "  \n"
    if node.name in {"strong", "b"}:
        inner = join_inline([render_inline(child, context) for child in node.children])
        return f"**{inner}**" if inner else ""
    if node.name in {"em", "i"}:
        inner = join_inline([render_inline(child, context) for child in node.children])
        return f"*{inner}*" if inner else ""
    if node.name == "del":
        inner = join_inline([render_inline(child, context) for child in node.children])
        return f"~~{inner}~~" if inner else ""
    if node.name == "code":
        return f"`{node.get_text('', strip=False)}`"
    if node.name == "a":
        label = join_inline([render_inline(child, context) for child in node.children]) or node.get_text(" ", strip=True)
        href = (node.get("href") or "").strip()
        return f"[{label}]({href})" if href else label
    if node.name == "img":
        alt = node.get("alt", "")
        src = node.get("src", "")
        return f"![{alt}]({src})" if src else alt
    if node.name in {"span", "div"} and "arithmatex" in classes:
        return node.get_text("", strip=False)
    if node.name in {"span", "small"}:
        return join_inline([render_inline(child, context) for child in node.children])

    context.raw_html_fallback = True
    context.warnings.append(f"kept raw HTML for inline <{node.name}>")
    return str(node)


def indent_block(block: str, spaces: int) -> str:
    prefix = " " * spaces
    return "\n".join(f"{prefix}{line}" if line else "" for line in block.splitlines())


def render_paragraph(node: Tag, context: ConversionContext) -> str:
    segments = [segment for segment in split_on_breaks(node, context) if segment]
    if not segments:
        return ""

    segments = [clean_math_delimiters(segment) for segment in segments]

    if len(segments) > 1:
        if all(is_list_marker(segment) for segment in segments):
            return "\n".join(segments)
        if all(is_list_marker(segment) for segment in segments[1:]):
            return segments[0] + "\n\n" + "\n".join(segments[1:])

    if len(segments) == 1:
        return segments[0]
    return "  \n".join(segments)


def render_code_block(node: Tag, context: ConversionContext) -> str:
    code_node = node.find("code") if node.name != "code" else node
    code_text = code_node.get_text("", strip=False) if code_node else node.get_text("", strip=False)
    code_text = code_text.rstrip("\n")
    context.code_language_unresolved = True
    return f"```\n{code_text}\n```"


def render_table(node: Tag, context: ConversionContext) -> str:
    if node.select("div.codehilite, pre"):
        context.raw_html_fallback = True
        context.warnings.append("kept raw HTML for table containing code blocks")
        return str(node)

    rows = []
    for row in node.find_all("tr"):
        cells = row.find_all(["th", "td"])
        rows.append(
            [join_inline([render_inline(child, context) for child in cell.children]) for cell in cells]
        )

    if not rows:
        return ""

    header = rows[0]
    divider = ["---"] * len(header)
    body = rows[1:]
    lines = [
        "| " + " | ".join(header) + " |",
        "| " + " | ".join(divider) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in body)
    return "\n".join(lines)


def render_blockquote(node: Tag, context: ConversionContext) -> str:
    inner = render_children(node, context)
    if not inner:
        return ""
    return "\n".join(f"> {line}" if line else ">" for line in inner.splitlines())


def render_list_item(node: Tag, context: ConversionContext, marker: str) -> str:
    content_nodes = []
    nested_lists = []
    for child in node.children:
        if isinstance(child, Tag) and child.name in {"ul", "ol"}:
            nested_lists.append(child)
        else:
            content_nodes.append(child)

    text = join_inline([render_inline(child, context) for child in content_nodes]).strip()
    if not text:
        text = render_children(node, context).strip()
    lines = text.splitlines() if text else [""]
    rendered = [f"{marker}{lines[0]}".rstrip()]
    rendered.extend(f"  {line}" if line else "" for line in lines[1:])
    for nested in nested_lists:
        nested_rendered = render_block(nested, context)
        if nested_rendered:
            rendered.append(indent_block(nested_rendered, 2))
    return "\n".join(line for line in rendered if line.strip())


def render_list(node: Tag, context: ConversionContext) -> str:
    items = []
    for index, item in enumerate(node.find_all("li", recursive=False), start=1):
        marker = f"{index}. " if node.name == "ol" else "* "
        rendered = render_list_item(item, context, marker)
        if rendered:
            items.append(rendered)
    return "\n".join(items)


def render_block(node: Tag, context: ConversionContext) -> str:
    classes = set(node.get("class", []))

    if node.name and re.fullmatch(r"h[1-6]", node.name):
        level = int(node.name[1])
        text = join_inline([render_inline(child, context) for child in node.children])
        return f"{'#' * level} {text}".strip()
    if node.name == "p":
        return render_paragraph(node, context)
    if node.name in {"ul", "ol"}:
        return render_list(node, context)
    if node.name == "blockquote":
        return render_blockquote(node, context)
    if node.name == "table":
        return render_table(node, context)
    if node.name in {"pre", "code"}:
        return render_code_block(node, context)
    if node.name == "div" and "codehilite" in classes:
        return render_code_block(node, context)
    if node.name in {"div", "section"} and "arithmatex" in classes:
        return node.get_text("", strip=False)
    if node.name == "html":
        context.raw_html_fallback = True
        context.warnings.append("kept raw HTML block for embedded HTML example")
        return str(node)
    if node.name in {"div", "section"}:
        return render_children(node, context)
    if node.name == "hr":
        return "---"

    context.raw_html_fallback = True
    context.warnings.append(f"kept raw HTML for block <{node.name}>")
    return str(node)


def render_children(node: Tag, context: ConversionContext) -> str:
    blocks = []
    for child in node.children:
        if isinstance(child, NavigableString):
            text = normalize_text(str(child))
            if text:
                blocks.append(text)
            continue
        rendered = render_block(child, context).strip()
        if rendered:
            blocks.append(rendered)
    return "\n\n".join(blocks).strip()


def extract_blog_metadata(source_html: Path) -> tuple[str, dict[str, str], Tag]:
    soup = BeautifulSoup(source_html.read_text(encoding="utf-8"), "html.parser")
    content_section = soup.select_one("section.blog-content, section.review-content, section.writeup-content")
    if content_section is None:
        raise ValueError("missing blog content section")

    meta = parse_html_post(source_html)
    if soup.select_one("section.book-details"):
        metadata = {
            "title": meta["title"],
            "author": meta.get("author", ""),
            "isbn": meta.get("isbn", ""),
            "category": meta.get("category", ""),
            "rating": meta.get("rating", "").replace("/5", ""),
            "date": meta.get("date", ""),
            "type": "book",
        }
        content_type = "book"
    elif soup.select_one("section.film-details"):
        metadata = {
            "title": meta["title"],
            "date": meta.get("date", ""),
            "type": "film",
            "director": meta.get("director", ""),
            "year": meta.get("release year", meta.get("year", "")),
            "rating": meta.get("rating", "").replace("/5", ""),
        }
        content_type = "film"
    elif soup.select_one("section.writeup-details"):
        metadata = {
            "title": meta["title"],
            "date": meta.get("date", ""),
            "type": "tech-writeup",
            "tech_stack": meta.get("tech stack", ""),
            "date_range": meta.get("timeline", ""),
            "status": meta.get("status", ""),
        }
        content_type = "tech-writeup"
    else:
        metadata = {
            "title": meta["title"],
            "date": meta.get("date", ""),
            "type": "blog",
        }
        content_type = "blog"

    return content_type, metadata, content_section


def extract_wiki_metadata(source_html: Path) -> tuple[str, Tag]:
    soup = BeautifulSoup(source_html.read_text(encoding="utf-8"), "html.parser")
    content_section = soup.select_one("section.note-content")
    if content_section is None:
        raise ValueError("missing wiki note content section")
    title = parse_html_wiki_note(source_html)["title"]
    return title, content_section


def semantic_signature(html_fragment: str) -> dict:
    soup = BeautifulSoup(f"<div>{html_fragment}</div>", "html.parser")
    root = soup.div
    prose_root = BeautifulSoup(str(root), "html.parser").div
    for node in prose_root.select("div.codehilite, pre, table"):
        node.decompose()
    prose_lines = []
    for raw_line in prose_root.get_text("\n", strip=True).splitlines():
        line = normalize_text(raw_line)
        line = re.sub(r"^(?:\*|-|\d+\.)\s*", "", line)
        if line and line != "?>":
            prose_lines.append(line)
    return {
        "plain_text": "\n".join(prose_lines).strip(),
        "links": [
            {
                "text": normalize_text(link.get_text(" ", strip=True)),
                "href": (link.get("href") or "").strip(),
            }
            for link in root.find_all("a")
        ],
        "code_blocks": [
            code.get_text("", strip=False).rstrip("\n")
            for code in root.select("div.codehilite code, pre code")
        ],
        "math": [node.get_text("", strip=False).strip() for node in root.select(".arithmatex")],
        "tables": [
            [
                normalize_text(cell.get_text(" ", strip=True))
                for cell in row.find_all(["th", "td"])
            ]
            for row in root.select("tr")
        ],
    }


def validate_blog_conversion(source_html: Path, metadata: dict[str, str], markdown_body: str) -> ValidationResult:
    issues = []
    source_meta = parse_html_post(source_html)

    expected_pairs = {
        "title": source_meta.get("title", ""),
        "date": source_meta.get("date", ""),
    }
    if metadata["type"] == "book":
        expected_pairs.update(
            {
                "author": source_meta.get("author", ""),
                "isbn": source_meta.get("isbn", ""),
                "category": source_meta.get("category", ""),
                "rating": source_meta.get("rating", "").replace("/5", ""),
            }
        )
    elif metadata["type"] == "film":
        expected_pairs.update(
            {
                "director": source_meta.get("director", ""),
                "year": source_meta.get("release year", source_meta.get("year", "")),
                "rating": source_meta.get("rating", "").replace("/5", ""),
            }
        )
    elif metadata["type"] == "tech-writeup":
        expected_pairs.update(
            {
                "tech_stack": source_meta.get("tech stack", ""),
                "date_range": source_meta.get("timeline", ""),
                "status": source_meta.get("status", ""),
            }
        )

    for key, expected in expected_pairs.items():
        actual = str(metadata.get(key, ""))
        if normalize_text(actual) != normalize_text(expected):
            issues.append(f"metadata mismatch for '{key}': expected '{expected}' got '{actual}'")

    soup = BeautifulSoup(source_html.read_text(encoding="utf-8"), "html.parser")
    source_content = soup.select_one("section.blog-content, section.review-content, section.writeup-content")
    rendered_signature = semantic_signature(md_to_html(markdown_body))
    source_signature = semantic_signature(source_content.decode_contents())
    if rendered_signature != source_signature:
        issues.append("rendered content semantics differ from source HTML")

    return ValidationResult(passed=not issues, issues=issues)


def validate_wiki_conversion(source_html: Path, markdown_document: str) -> ValidationResult:
    issues = []
    expected_title, source_content = extract_wiki_metadata(source_html)
    actual_title, body = split_md_title(markdown_document)

    if normalize_text(actual_title) != normalize_text(expected_title):
        issues.append(f"title mismatch: expected '{expected_title}' got '{actual_title}'")

    rendered_signature = semantic_signature(md_to_html(body))
    source_signature = semantic_signature(source_content.decode_contents())
    if rendered_signature != source_signature:
        issues.append("rendered content semantics differ from source HTML")

    return ValidationResult(passed=not issues, issues=issues)


def convert_blog(source_html: Path) -> tuple[str, str, ConversionContext]:
    content_type, metadata, content_section = extract_blog_metadata(source_html)
    context = ConversionContext()
    markdown_body = render_children(content_section, context).strip() + "\n"
    markdown_document = emit_frontmatter(metadata) + "\n\n" + markdown_body
    return content_type, markdown_document, context


def convert_wiki(source_html: Path) -> tuple[str, str, ConversionContext]:
    title, content_section = extract_wiki_metadata(source_html)
    context = ConversionContext()
    markdown_body = render_children(content_section, context).strip()
    markdown_document = f"# {title}\n\n{markdown_body}\n"
    return "wiki-note", markdown_document, context


def build_raw_html_fallback(target: str, source_html: Path) -> tuple[str, str, ConversionContext]:
    if target == "blog":
        content_type, metadata, content_section = extract_blog_metadata(source_html)
        markdown_document = emit_frontmatter(metadata) + "\n\n" + content_section.decode_contents().strip() + "\n"
    else:
        title, content_section = extract_wiki_metadata(source_html)
        content_type = "wiki-note"
        markdown_document = f"# {title}\n\n{content_section.decode_contents().strip()}\n"

    context = ConversionContext(
        warnings=["used raw HTML body fallback after semantic mismatch"],
        raw_html_fallback=True,
        code_language_unresolved=bool(
            BeautifulSoup(content_section.decode_contents(), "html.parser").select("div.codehilite, pre")
        ),
    )
    return content_type, markdown_document, context


def discover_targets(target: str) -> list[tuple[str, Path, Path]]:
    items = []
    if target in {"blog", "all"}:
        for html_file in sorted((ROOT / "blog" / "posts").glob("*.html")):
            items.append(("blog", html_file, ROOT / "blog" / "posts" / f"{html_file.stem}.md"))
    if target in {"wiki", "all"}:
        for html_file in sorted((ROOT / "personal-wiki" / "pages").glob("*.html")):
            items.append(("wiki", html_file, ROOT / "personal-wiki" / "notes" / f"{html_file.stem}.md"))
    return items


def process_item(target: str, source_html: Path, output_markdown: Path, args: argparse.Namespace) -> MigrationResult:
    source_had_markdown = output_markdown.exists()

    if target == "blog":
        detected_type, converted_markdown, context = convert_blog(source_html)
        validator = validate_blog_conversion
    else:
        detected_type, converted_markdown, context = convert_wiki(source_html)
        validator = validate_wiki_conversion

    action = "would_create"
    markdown_document = converted_markdown

    if args.validate_only:
        if output_markdown.exists():
            markdown_document = output_markdown.read_text(encoding="utf-8")
            action = "validated_existing"
            context = ConversionContext()
        else:
            validation = ValidationResult(False, ["mapped Markdown file does not exist"])
            return MigrationResult(
                target=target,
                source_html=relative_path(source_html),
                output_markdown=relative_path(output_markdown),
                content_type=detected_type,
                action="missing_markdown",
                warnings=["mapped Markdown file does not exist"],
                raw_html_fallback=False,
                code_language_unresolved=False,
                validation=asdict(validation),
            )
    elif output_markdown.exists() and not args.overwrite:
        markdown_document = output_markdown.read_text(encoding="utf-8")
        action = "skipped_existing"
        context = ConversionContext(warnings=["mapped Markdown file already exists"])

    if target == "blog":
        content_type, metadata, _ = extract_blog_metadata(source_html)
        validation = validator(source_html, metadata, split_frontmatter_body(markdown_document))
    else:
        validation = validator(source_html, markdown_document)
        content_type = detected_type

    if (
        not args.validate_only
        and action in {"would_create", "created", "overwritten"}
        and not validation.passed
    ):
        fallback_type, fallback_markdown, fallback_context = build_raw_html_fallback(target, source_html)
        if target == "blog":
            _, fallback_metadata, _ = extract_blog_metadata(source_html)
            fallback_validation = validator(source_html, fallback_metadata, split_frontmatter_body(fallback_markdown))
        else:
            fallback_validation = validator(source_html, fallback_markdown)

        if fallback_validation.passed or len(fallback_validation.issues) < len(validation.issues):
            markdown_document = fallback_markdown
            context = fallback_context
            validation = fallback_validation
            content_type = fallback_type

    if not args.validate_only and action == "would_create" and args.write:
        output_markdown.parent.mkdir(parents=True, exist_ok=True)
        output_markdown.write_text(markdown_document, encoding="utf-8")
        action = "overwritten" if source_had_markdown and args.overwrite else "created"

    return MigrationResult(
        target=target,
        source_html=relative_path(source_html),
        output_markdown=relative_path(output_markdown),
        content_type=content_type,
        action=action,
        warnings=sorted(set(context.warnings)),
        raw_html_fallback=context.raw_html_fallback,
        code_language_unresolved=context.code_language_unresolved,
        validation=asdict(validation),
    )


def split_frontmatter_body(markdown_document: str) -> str:
    if not markdown_document.startswith("---"):
        return markdown_document
    parts = markdown_document.split("---", 2)
    if len(parts) < 3:
        return markdown_document
    return parts[2].strip()


def write_reports(results: list[MigrationResult], report_path: Path) -> None:
    report_path.parent.mkdir(parents=True, exist_ok=True)
    passed = sum(1 for result in results if result.validation["passed"])
    failed = len(results) - passed
    raw_html = sum(1 for result in results if result.raw_html_fallback)
    unresolved_code = sum(1 for result in results if result.code_language_unresolved)

    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "total": len(results),
            "passed": passed,
            "failed": failed,
            "raw_html_fallback": raw_html,
            "code_language_unresolved": unresolved_code,
        },
        "results": [asdict(result) for result in results],
    }
    report_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    markdown_lines = [
        "# Content Migration Report",
        "",
        f"* Generated at: `{payload['generated_at']}`",
        f"* Total items: `{len(results)}`",
        f"* Validation passed: `{passed}`",
        f"* Validation failed: `{failed}`",
        f"* Raw HTML fallback used: `{raw_html}`",
        f"* Code fence language unresolved: `{unresolved_code}`",
        "",
        "## Items",
        "",
    ]

    for result in results:
        markdown_lines.extend(
            [
                f"### `{result.source_html}`",
                "",
                f"* Output Markdown: `{result.output_markdown}`",
                f"* Target: `{result.target}`",
                f"* Content type: `{result.content_type}`",
                f"* Action: `{result.action}`",
                f"* Validation passed: `{result.validation['passed']}`",
                f"* Raw HTML fallback: `{result.raw_html_fallback}`",
                f"* Code language unresolved: `{result.code_language_unresolved}`",
            ]
        )
        if result.warnings:
            markdown_lines.append(f"* Warnings: `{'; '.join(result.warnings)}`")
        if result.validation["issues"]:
            markdown_lines.append(f"* Validation issues: `{'; '.join(result.validation['issues'])}`")
        markdown_lines.append("")

    report_path.with_suffix(".md").write_text("\n".join(markdown_lines), encoding="utf-8")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Recover Markdown source files from legacy HTML content.")
    parser.add_argument("--target", choices=["blog", "wiki", "all"], default="all")
    parser.add_argument("--write", action="store_true", help="Write recovered Markdown files to disk.")
    parser.add_argument("--overwrite", action="store_true", help="Overwrite mapped Markdown files if they already exist.")
    parser.add_argument("--dry-run", action="store_true", help="Preview conversions without writing files.")
    parser.add_argument("--validate-only", action="store_true", help="Validate existing mapped Markdown files against source HTML.")
    parser.add_argument(
        "--report",
        default="migration-reports/content-migration.json",
        help="Path to the JSON migration report. A Markdown summary is written alongside it.",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    if args.write and args.dry_run:
        print("error: --write and --dry-run cannot be used together")
        sys.exit(1)

    report_path = Path(args.report)
    if not report_path.is_absolute():
        report_path = ROOT / report_path

    results = [
        process_item(target, source_html, output_markdown, args)
        for target, source_html, output_markdown in discover_targets(args.target)
    ]
    write_reports(results, report_path)

    failed = [result for result in results if not result.validation["passed"]]
    print(f"processed {len(results)} items")
    print(f"report: {relative_path(report_path)}")
    print(f"markdown summary: {relative_path(report_path.with_suffix('.md'))}")
    if failed:
        print(f"validation failures: {len(failed)}")
        sys.exit(1)


if __name__ == "__main__":
    main()
