#!/usr/bin/env python3
"""Build the local-only v10 prototype from the repository's live sources."""

from __future__ import annotations

import argparse
import html
import re
import shutil
from datetime import datetime
from pathlib import Path

import content_pipeline as v9
from jinja2 import Environment, FileSystemLoader, select_autoescape
from markupsafe import Markup
from pygments.lexers import get_lexer_by_name
from pygments.util import ClassNotFound


ROOT = Path(__file__).resolve().parent
SOURCE_ROOT = ROOT
DEFAULT_OUTPUT = ROOT / "dist"
TEMPLATES = ROOT / "templates"
STATIC = ROOT
HOME_SOURCE = ROOT / "content" / "home.html"

v9.IMAGE_CACHE_DIR = ROOT / ".cache" / "ascii-images"
v9.ASCII_ART_CACHE_DIR = ROOT / ".cache" / "ascii-art"
v9.DITHER_CACHE_DIR = ROOT / ".cache" / "dither-out"
env = Environment(
    loader=FileSystemLoader(TEMPLATES),
    autoescape=select_autoescape(["html", "xml"]),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build the v10 local prototype from the root content sources."
    )
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help="Output directory (default: prototype-v10/dist)",
    )
    return parser.parse_args()


def output_path(value: str) -> Path:
    path = Path(value)
    if not path.is_absolute():
        path = SOURCE_ROOT / path
    return path.resolve()


def clean_output(path: Path) -> None:
    if path == ROOT:
        raise ValueError("refusing to build into a source directory")
    if path.exists():
        shutil.rmtree(path)
    path.mkdir(parents=True)


def copy_tree(source: Path, destination: Path) -> None:
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination)


def copy_static_files(output: Path) -> None:
    copy_tree(SOURCE_ROOT / "asset", output / "asset")
    copy_tree(SOURCE_ROOT / "resume", output / "resume")
    for section in ("blog", "personal-wiki"):
        source = SOURCE_ROOT / section / "asset"
        if source.exists():
            copy_tree(source, output / section / "asset")
    for filename in ("style.css", "site.js"):
        shutil.copy2(STATIC / filename, output / filename)
    for filename in ("mermaid.js", "toc.js"):
        shutil.copy2(SOURCE_ROOT / filename, output / filename)
    (output / "robots.txt").write_text("User-agent: *\nDisallow: /\n", encoding="utf-8")
    (output / ".nojekyll").write_text("", encoding="utf-8")


def copy_generated_media(output: Path) -> None:
    """Publish dither assets produced while rendering Markdown, if any."""
    source = v9.DITHER_CACHE_DIR
    if source.exists():
        copy_tree(source, output / "asset" / "dither")


def page_context(
    title: str,
    root_path: str,
    *,
    toc_enabled: bool = False,
    has_math: bool = False,
    has_mermaid: bool = False,
) -> dict:
    return {
        "page_title": title,
        "root_path": root_path,
        "toc_enabled": toc_enabled,
        "has_math": has_math,
        "has_mermaid": has_mermaid,
    }


def write_template(output: Path, relative_path: str, template_name: str, **context) -> Path:
    target = output / relative_path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(env.get_template(template_name).render(**context), encoding="utf-8")
    return target


def format_file_size(size_bytes: int) -> str:
    size_kb = size_bytes / 1024
    return f"{size_bytes}B" if size_kb < 1 else f"{size_kb:.1f}KB"


def sort_date(value: str) -> datetime:
    value = str(value)
    if " to " in value:
        value = value.split(" to ", 1)[0].strip()
    for fmt in ("%d %b %Y", "%d %B %Y", "%Y-%m-%d", "%Y"):
        try:
            return datetime.strptime(value, fmt)
        except ValueError:
            pass
    return datetime.min


def browser_title(title: str) -> str:
    return str(title).strip().upper()


FENCE_START_RE = re.compile(r"^(?P<fence>`{3,}|~{3,})(?P<info>[^\r\n]*)")


def code_language_for(source: Path) -> str | None:
    """Use the source filename's language name when Pygments recognises it."""
    try:
        return get_lexer_by_name(source.stem).aliases[0]
    except ClassNotFound:
        return None


def is_closing_fence(line: str, fence: str) -> bool:
    return re.fullmatch(rf"{re.escape(fence)}[ \t]*(?:\r?\n)?", line) is not None


def prepare_markdown(content: str, source: Path) -> str:
    """Preserve Mermaid fences and label otherwise-untyped language-note code."""
    language = code_language_for(source)
    lines = content.splitlines(keepends=True)
    output: list[str] = []
    index = 0

    while index < len(lines):
        opening = lines[index]
        match = FENCE_START_RE.match(opening)
        if not match:
            output.append(opening)
            index += 1
            continue

        fence = match.group("fence")
        closing_index = index + 1
        while closing_index < len(lines) and not is_closing_fence(lines[closing_index], fence):
            closing_index += 1

        if closing_index == len(lines):
            output.append(opening)
            index += 1
            continue

        info = match.group("info").strip().lower()
        code = "".join(lines[index + 1 : closing_index]).rstrip("\r\n")
        if info == "mermaid":
            escaped_code = html.escape(code)
            escaped_attribute = html.escape(code, quote=True)
            output.append(
                f'<div class="mermaid" data-mermaid-source="{escaped_attribute}">\n'
                f"{escaped_code}\n"
                "</div>\n"
            )
        else:
            output.append(f"{fence}{language}\n" if not info and language else opening)
            output.extend(lines[index + 1 : closing_index + 1])
        index = closing_index + 1

    return "".join(output)


def render_markdown(content: str, source: Path) -> str:
    return v9.md_to_html(prepare_markdown(content, source), source)


def rewrite_wiki_markdown_links(html_content: str, notes_dir: Path) -> str:
    """Resolve legacy relative .md links to the generated wiki pages.

    Some notes predate the current lower-case filenames. Links without a current
    note become plain, visibly-muted references instead of shipping a dead URL.
    """
    note_targets = {
        re.sub(r"[^a-z0-9]", "", note.stem.lower()): f"{note.stem.lower()}.html"
        for note in notes_dir.glob("*.md")
    }

    def replace(match: re.Match[str]) -> str:
        href, label = match.groups()
        path, fragment = href.split("#", 1) if "#" in href else (href, "")
        if "://" in path or path.startswith("/"):
            return match.group(0)
        key = re.sub(r"[^a-z0-9]", "", Path(path).stem.lower())
        destination = note_targets.get(key)
        if destination:
            return f'<a href="{destination}{"#" + fragment if fragment else ""}">{label}</a>'
        return f'<span class="broken-reference">{label}</span>'

    return re.sub(r'<a href="([^"]+\.md(?:#[^"]*)?)">(.*?)</a>', replace, html_content)


def load_works() -> list[dict]:
    works, errors = v9.load_work_entries()
    if errors:
        raise ValueError("\n".join(errors))
    return works


def render_home_works(works: list[dict]) -> str:
    items = []
    for work in works:
        items.append(
            """
        <li>
          <a href="work/{slug}.html">{title}</a>
          <span>{summary}</span>
        </li>""".format(
                slug=work["slug"],
                title=work["title"],
                summary=work["summary"],
            )
        )
    return """
      <section class="works">
        <h2>Work</h2>
        <ul class="home-work-list">{items}
        </ul>
        <div class="contributions">
          <p><a href="https://github.com/gongahkia" id="contrib-title">GitHub contributions (past year)</a></p>
          <div id="github-contrib-calendar" aria-label="GitHub contributions calendar" role="img"></div>
          <div id="contrib-legend-container"></div>
        </div>
      </section>""".format(items="".join(items))


def homepage_content(works: list[dict]) -> str:
    source = HOME_SOURCE.read_text(encoding="utf-8")
    match = re.search(
        r'<article class="overallArticleTags">(.*?)</article>',
        source,
        flags=re.DOTALL,
    )
    if not match:
        raise ValueError("could not locate the root homepage article")
    content = match.group(1)
    marker = "    <!-- build:works -->"
    if marker not in content:
        raise ValueError("could not locate the homepage work marker")
    return content.replace(marker, render_home_works(works), 1)


def build_home(output: Path, works: list[dict]) -> None:
    write_template(
        output,
        "index.html",
        "home.html",
        home_content=Markup(homepage_content(works)),
        **page_context("GABRIEL ONG", "."),
    )


def build_work(output: Path, works: list[dict]) -> None:
    work_items = [{**work, "href": f"{work['slug']}.html"} for work in works]
    write_template(
        output,
        "work/index.html",
        "work-index.html",
        works=work_items,
        **page_context("WORK", ".."),
    )
    for work in works:
        html_content = render_markdown(work["content"], work["source_path"])
        write_template(
            output,
            f"work/{work['slug']}.html",
            "work-detail.html",
            title=work["title"],
            date=work["date"],
            summary=work["summary"],
            repository=work["href"],
            content=Markup(html_content),
            **page_context(
                browser_title(work["title"]),
                "..",
                toc_enabled=True,
                has_math=v9.html_uses_mathjax(html_content),
                has_mermaid=v9.html_uses_mermaid(html_content),
            ),
        )


def build_blog(output: Path) -> None:
    post_dir = SOURCE_ROOT / "blog" / "posts"
    posts = []
    for source in sorted(post_dir.glob("*.md")):
        metadata, markdown_content = v9.parse_frontmatter(source.read_text(encoding="utf-8"))
        errors = v9.validate_frontmatter(metadata, source)
        if errors:
            raise ValueError("\n".join(errors))

        post_type = str(metadata.get("type", "blog"))
        title = str(metadata["title"])
        date = str(metadata["date"])
        filename = f"{source.stem}.html"
        html_content = render_markdown(markdown_content, source)
        posts.append(
            {
                "title": title,
                "date": date,
                "filename": filename,
                "filter_category": "project" if post_type == "tech-writeup" else "general",
                "status": str(metadata.get("status", "")),
                "date_range": str(metadata.get("date_range", "")),
            }
        )
        write_template(
            output,
            f"blog/posts/{filename}",
            "blog-post.html",
            title=title,
            date=date,
            post_type=post_type,
            metadata=metadata,
            content=Markup(html_content),
            **page_context(
                browser_title(title),
                "../..",
                toc_enabled=True,
                has_math=v9.html_uses_mathjax(html_content),
                has_mermaid=v9.html_uses_mermaid(html_content),
            ),
        )

    posts.sort(key=lambda post: sort_date(post["date"]), reverse=True)
    write_template(
        output,
        "blog/index.html",
        "blog-index.html",
        posts=posts,
        **page_context("BLOG", ".."),
    )


def build_wiki(output: Path) -> None:
    notes_dir = SOURCE_ROOT / "personal-wiki" / "notes"
    notes = []
    for source in sorted(notes_dir.glob("*.md")):
        metadata, markdown_content = v9.parse_frontmatter(source.read_text(encoding="utf-8"))
        title, body = v9.split_md_title(markdown_content)
        html_content = render_markdown(v9.process_wikilinks(body, notes_dir), source)
        html_content = rewrite_wiki_markdown_links(html_content, notes_dir)
        filename = f"{source.stem.lower()}.html"
        target = write_template(
            output,
            f"personal-wiki/pages/{filename}",
            "wiki-note.html",
            title=title,
            file_size="__FILE_SIZE__",
            loc="__LINE_COUNT__",
            content=Markup(html_content),
            **page_context(
                browser_title(title),
                "../..",
                toc_enabled=True,
                has_math=v9.html_uses_mathjax(html_content),
                has_mermaid=v9.html_uses_mermaid(html_content),
            ),
        )
        rendered = target.read_text(encoding="utf-8")
        rendered = rendered.replace("__FILE_SIZE__", format_file_size(target.stat().st_size))
        rendered = rendered.replace("__LINE_COUNT__", str(len(rendered.splitlines())))
        target.write_text(rendered, encoding="utf-8")
        category = str(metadata.get("category", "General")).strip().lower()
        notes.append(
            {
                "title": title,
                "filename": filename,
                "size": format_file_size(target.stat().st_size),
                "loc": len(rendered.splitlines()),
                "category": category if category in {"general", "tech"} else "general",
            }
        )

    notes.sort(key=lambda note: note["title"].lower())
    write_template(
        output,
        "personal-wiki/index.html",
        "wiki-index.html",
        notes=notes,
        **page_context("PERSONAL WIKI", ".."),
    )


def build_site(output: Path) -> None:
    clean_output(output)
    copy_static_files(output)
    works = load_works()
    build_home(output, works)
    build_work(output, works)
    build_blog(output)
    build_wiki(output)
    copy_generated_media(output)
    print(
        f"built v10 prototype: {len(works)} work pages, "
        f"{len(list((SOURCE_ROOT / 'blog' / 'posts').glob('*.md')))} posts, "
        f"{len(list((SOURCE_ROOT / 'personal-wiki' / 'notes').glob('*.md')))} notes"
    )


def main() -> None:
    args = parse_args()
    build_site(output_path(args.output))


if __name__ == "__main__":
    main()
