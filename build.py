#!/usr/bin/env python3
"""Build version 11 of the site from the repository's root content sources."""

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
from site_validation import verify_seo_output


ROOT = Path(__file__).resolve().parent
SOURCE_ROOT = ROOT
DEFAULT_OUTPUT = ROOT / "dist"
TEMPLATES = ROOT / "templates"
STATIC = ROOT
HOME_SOURCE = ROOT / "content" / "home.html"
BASE_URL = v9.BASE_URL.rstrip("/")
PERSON_ID = f"{BASE_URL}/#person"
DEFAULT_SOCIAL_IMAGE_URL = f"{BASE_URL}/asset/portrait/gong-2-og.png"
HOME_DESCRIPTION = (
    "Gabriel Ong is a Product-minded Full Stack Engineer in Singapore "
    "specialising in Production AI Agents."
)

v9.IMAGE_CACHE_DIR = ROOT / ".cache" / "ascii-images"
v9.ASCII_ART_CACHE_DIR = ROOT / ".cache" / "ascii-art"
v9.DITHER_CACHE_DIR = ROOT / ".cache" / "dither-out"
env = Environment(
    loader=FileSystemLoader(TEMPLATES),
    autoescape=select_autoescape(["html", "xml"]),
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Build version 11 of the site from the root content sources."
    )
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT),
        help="Output directory (default: dist)",
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
    v9.copy_root_asset_dir(output)
    copy_tree(SOURCE_ROOT / "resume", output / "resume")
    for section in ("blog", "personal-wiki"):
        source = SOURCE_ROOT / section / "asset"
        if source.exists():
            copy_tree(source, output / section / "asset")
    for filename in ("style.css", "content.css", "site.js"):
        shutil.copy2(STATIC / filename, output / filename)
    for filename in ("mermaid.js", "robots.txt", "CNAME"):
        shutil.copy2(SOURCE_ROOT / filename, output / filename)
    copy_tree(STATIC / "fonts", output / "fonts")
    copy_tree(STATIC / "assets", output / "assets")
    write_tiempos_css(output)
    # social crawlers need the image referenced by every page's metadata.
    portrait = output / "asset" / "portrait"
    portrait.mkdir(exist_ok=True)
    shutil.copy2(SOURCE_ROOT / "asset" / "portrait" / "gong-2-og.png", portrait / "gong-2-og.png")
    (output / "asset" / "favicon-dark.svg").unlink(missing_ok=True)
    (output / ".nojekyll").write_text("", encoding="utf-8")


def load_profile_entries(section_name):
    """Reuse v10's dated profile entries and inline links."""
    source = HOME_SOURCE.read_text(encoding="utf-8")
    section = re.search(rf"<h2>\s*{re.escape(section_name)}\s*</h2>(.*?)</section>", source, re.DOTALL)
    if not section:
        raise ValueError(f"Could not locate v10's {section_name} section")
    rows = re.findall(r"<dl>\s*<dt>(.*?)</dt>\s*<dd>(.*?)</dd>\s*</dl>", section[1], re.DOTALL)
    if not rows or len(rows) != section[1].count("<dl>"):
        raise ValueError(f"Could not read every v10 {section_name} entry")
    entries = []
    for date, details in rows:
        # v10 groups certifications sharing a date with a blank line.
        for item in re.split(r"(?:<br\s*/?>\s*){2,}", details):
            parts = re.split(r"<br\s*/?>", item)
            if len(parts) < 2 or not all(part.strip() for part in [date, *parts]):
                raise ValueError(f"Incomplete v10 {section_name} entry: {date.strip()}")
            entries.append({
                "date": " ".join(html.unescape(date).split()),
                "title": Markup(" ".join(parts[0].split())),
                "details": [Markup(" ".join(part.split())) for part in parts[1:]],
            })
    return entries


def write_tiempos_css(output: Path):
    """Prefer supplied web/desktop fonts, then installed faces, without remote loads."""
    faces = [
        ("Complete", "Headline", "Regular", "400", "normal"),
        ("Headline", "Headline", "Light", "300 400", "normal"),
        ("Headline", "Headline", "LightItalic", "300 400", "italic"),
        ("Text", "Text", "Regular", "400", "normal"),
        ("Text", "Text", "RegularItalic", "400", "italic"),
        ("Text", "Text", "Semibold", "600", "normal"),
        ("Text", "Text", "SemiboldItalic", "600", "italic"),
        ("Text", "Text", "Bold", "700", "normal"),
        ("Text", "Text", "BoldItalic", "700", "italic"),
    ]
    rules = []
    for alias, family, style, weight, font_style in faces:
        candidates = [
            (f"Tiempos{family}Web-{style}.woff2", "woff2"),
            (f"Tiempos{family}-{style}.otf", "opentype"),
        ]
        if alias != "Complete":
            candidates.append((f"TestTiempos{family}-{style}.otf", "opentype"))
        sources = []
        for filename, font_format in candidates:
            if (STATIC / "fonts" / "tiempos" / filename).is_file():
                sources.append(f'url("fonts/tiempos/{filename}") format("{font_format}")')
        sources.extend([
            f'local("Tiempos {family} {style}")',
            f'local("Tiempos{family}-{style}")',
        ])
        rules.append(
            f'@font-face {{font-family:"V11 Tiempos {alias}";'
            f'src:{",".join(sources)};font-weight:{weight};font-style:{font_style};font-display:swap;}}'
        )
    (output / "tiempos.css").write_text("\n".join(rules) + "\n", encoding="utf-8")


def display_date(value):
    parsed = sort_date(value)
    return f"{parsed:%B} {parsed.day}, {parsed.year}" if parsed.year > 1 else str(value)


env.filters["display_date"] = display_date
env.filters["iso_date"] = v9.parse_date_to_iso

def copy_generated_media(output: Path) -> None:
    """Publish responsive dither/color assets produced while rendering Markdown."""
    source = v9.DITHER_CACHE_DIR
    if source.exists():
        copy_tree(source, output / "asset" / "dither")


def page_context(
    title: str,
    root_path: str,
    *,
    route: str,
    meta_description: str,
    og_title: str,
    og_type: str,
    date_published: str | None = None,
    date_modified: str | None = None,
    toc_enabled: bool = False,
    has_math: bool = False,
    has_mermaid: bool = False,
) -> dict:
    canonical_url = f"{BASE_URL}{route}"
    return {
        "page_title": title,
        "root_path": root_path,
        "canonical_url": canonical_url,
        "root_site_url": f"{BASE_URL}/",
        "meta_description": meta_description,
        "og_title": og_title,
        "og_type": og_type,
        "default_image_url": DEFAULT_SOCIAL_IMAGE_URL,
        "person_id": PERSON_ID,
        "date_published": date_published,
        "date_modified": date_modified,
        "toc_enabled": toc_enabled,
        "has_math": has_math,
        "has_mermaid": has_mermaid,
    }


def write_template(output: Path, relative_path: str, template_name: str, **context) -> Path:
    target = output / relative_path
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(env.get_template(template_name).render(**context), encoding="utf-8")
    return target


def build_sitemap(output: Path, source_paths: dict[str, Path | list[Path]]) -> None:
    """Create a sitemap for every generated HTML page with Git-derived freshness."""
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for page in sorted(output.rglob("*.html")):
        relative = page.relative_to(output).as_posix()
        if relative == "index.html":
            route = "/"
        elif relative.endswith("/index.html"):
            route = f"/{relative.removesuffix('index.html')}"
        else:
            route = f"/{relative}"
        lastmod = v9.git_lastmod(source_paths[relative])
        lines.extend(
            (
                "  <url>",
                f"    <loc>{html.escape(BASE_URL + route)}</loc>",
                f"    <lastmod>{lastmod}</lastmod>",
                "  </url>",
            )
        )
    lines.append("</urlset>")
    (output / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")


def verify_build_output(output: Path, generated_pages: dict[str, Path | list[Path]]) -> None:
    """Validate permanent files and every page produced for the current content."""
    required_files = {
        "index.html",
        "CNAME",
        "robots.txt",
        "sitemap.xml",
        *generated_pages,
    }
    missing = sorted(
        relative_path
        for relative_path in required_files
        if not (output / relative_path).is_file()
    )
    if missing:
        raise ValueError(
            "build output validation failed; missing file(s):\n"
            + "\n".join(f"  {relative_path}" for relative_path in missing)
        )

    sitemap = (output / "sitemap.xml").read_text(encoding="utf-8")
    if "<urlset" not in sitemap:
        raise ValueError("build output validation failed; sitemap.xml has no urlset")


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
MARKDOWN_H1_RE = re.compile(r"^#\s+`?([^`\n]+)`?\s*$")


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


def strip_duplicate_wiki_title(body: str, title: str) -> str:
    """Drop the source H1 that duplicates the page's semantic H1 header."""
    lines = body.splitlines()
    for index, line in enumerate(lines):
        if not line.strip():
            continue
        match = MARKDOWN_H1_RE.fullmatch(line.strip())
        if not match or match.group(1).strip().casefold() != title.strip().casefold():
            return body
        return "\n".join(lines[index + 1 :]).lstrip("\n")
    return body


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


def build_home(output: Path) -> dict[str, list[Path]]:
    profile = {key: load_profile_entries(title) for key, title in (
        ("education", "Education"), ("experience", "Experience"),
        ("awards", "Awards"), ("certifications", "Licenses & Certifications"),
    )}
    write_template(
        output, "index.html", "home.html", **profile,
        **page_context(
            "GABRIEL ONG", ".", route="/", meta_description=HOME_DESCRIPTION,
            og_title="Gabriel Ong - Product-minded Full Stack Engineer", og_type="website",
        ),
    )
    return {"index.html": [HOME_SOURCE, TEMPLATES / "home.html", TEMPLATES / "base.html"]}


def build_portfolio(output: Path, works: list[dict]) -> dict[str, list[Path]]:
    portfolio = []
    for work in works:
        # full reference material remains on the existing project detail pages.
        introduction = re.split(r"^#{1,6}\s", work["content"], maxsplit=1, flags=re.MULTILINE)[0]
        portfolio.append({**work, "prose": Markup(render_markdown(introduction, work["source_path"]))})
    write_template(
        output, "work/index.html", "work-index.html", works=portfolio,
        **page_context(
            "WORK", "..", route="/work/",
            meta_description="Projects and the stories behind them, by Gabriel Ong.",
            og_title="Work | Gabriel Ong", og_type="website",
        ),
    )
    return {"work/index.html": [TEMPLATES / "work-index.html", TEMPLATES / "base.html",
                               *[work["source_path"] for work in works]]}


def build_work(output: Path, works: list[dict]) -> dict[str, list[Path]]:
    sitemap_sources = {}
    for work in works:
        html_content = render_markdown(work["content"], work["source_path"])
        relative_path = f"work/{work['slug']}.html"
        write_template(
            output,
            relative_path,
            "work-detail.html",
            title=work["title"],
            date=work["date"],
            summary=work["summary"],
            repository=work["href"],
            content=Markup(html_content),
            **page_context(
                browser_title(work["title"]),
                "..",
                route=f"/{relative_path}",
                meta_description=(
                    f"Work: {work['title']} - {work['summary']} - Gabriel Ong"
                ),
                og_title=f"{work['title']} | Gabriel Ong",
                og_type="article",
                date_published=v9.parse_date_to_iso(work["date"]),
                date_modified=v9.git_lastmod(work["source_path"]),
                toc_enabled=True,
                has_math=v9.html_uses_mathjax(html_content),
                has_mermaid=v9.html_uses_mermaid(html_content),
            ),
        )
        sitemap_sources[relative_path] = [
            work["source_path"],
            TEMPLATES / "work-detail.html",
            TEMPLATES / "base.html",
        ]
    return sitemap_sources


def build_blog(output: Path) -> dict[str, list[Path]]:
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
                route=f"/blog/posts/{filename}",
                meta_description=f"Blog Post: {title} - Gabriel Ong",
                og_title=title,
                og_type="article",
                date_published=v9.parse_date_to_iso(date),
                date_modified=v9.git_lastmod(source),
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
        **page_context(
            "BLOG",
            "..",
            route="/blog/",
            meta_description="Gabriel Ong's blog - thoughts, notes, and project writeups.",
            og_title="Gabriel's Blog",
            og_type="website",
        ),
    )
    return {
        "blog/index.html": [
            TEMPLATES / "blog-index.html",
            TEMPLATES / "base.html",
            *sorted(post_dir.glob("*.md")),
        ],
        **{
            f"blog/posts/{source.stem}.html": [
                source,
                TEMPLATES / "blog-post.html",
                TEMPLATES / "base.html",
            ]
            for source in post_dir.glob("*.md")
        },
    }


def build_wiki(output: Path) -> dict[str, list[Path]]:
    notes_dir = SOURCE_ROOT / "personal-wiki" / "notes"
    notes = []
    for source in sorted(notes_dir.glob("*.md")):
        metadata, markdown_content = v9.parse_frontmatter(source.read_text(encoding="utf-8"))
        title, body = v9.split_md_title(markdown_content)
        body = strip_duplicate_wiki_title(body, title)
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
                route=f"/personal-wiki/pages/{filename}",
                meta_description=f"Wiki Note: {title} - Gabriel Ong",
                og_title=f"{title} | Gabriel Ong Wiki",
                og_type="article",
                date_published=v9.parse_date_to_iso("2 Feb 2026"),
                date_modified=v9.git_lastmod(source),
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
        **page_context(
            "PERSONAL WIKI",
            "..",
            route="/personal-wiki/",
            meta_description=(
                "Gabriel Ong's personal wiki - programming notes, language references, "
                "and CS topics."
            ),
            og_title="Personal Wiki | Gabriel Ong",
            og_type="website",
        ),
    )
    return {
        "personal-wiki/index.html": [
            TEMPLATES / "wiki-index.html",
            TEMPLATES / "base.html",
            *sorted(notes_dir.glob("*.md")),
        ],
        **{
            f"personal-wiki/pages/{source.stem.lower()}.html": [
                source,
                TEMPLATES / "wiki-note.html",
                TEMPLATES / "base.html",
            ]
            for source in notes_dir.glob("*.md")
        },
    }


def build_site(output: Path) -> None:
    clean_output(output)
    copy_static_files(output)
    works = load_works()
    sitemap_sources = build_home(output)
    sitemap_sources.update(build_portfolio(output, works))
    sitemap_sources.update(build_work(output, works))
    sitemap_sources.update(build_blog(output))
    sitemap_sources.update(build_wiki(output))
    copy_generated_media(output)
    build_sitemap(output, sitemap_sources)
    verify_build_output(output, sitemap_sources)
    verify_seo_output(output, BASE_URL)
    print(
        f"built v11 site: {len(works)} work pages, "
        f"{len(list((SOURCE_ROOT / 'blog' / 'posts').glob('*.md')))} posts, "
        f"{len(list((SOURCE_ROOT / 'personal-wiki' / 'notes').glob('*.md')))} notes"
    )


def main() -> None:
    args = parse_args()
    build_site(output_path(args.output))


if __name__ == "__main__":
    main()
