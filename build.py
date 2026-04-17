#!/usr/bin/env python3
"""Build the published site into a deployable output directory."""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

try:
    import markdown
    import yaml
    from jinja2 import Environment, FileSystemLoader
except ImportError:
    print("error: missing deps. run: pip install -r requirements.txt")
    sys.exit(1)

ROOT = Path(__file__).parent.resolve()
BASE_URL = "https://gabrielongzm.com"
DEFAULT_OUTPUT_DIR = ROOT / "dist"

ROOT_STATIC_FILES = [
    "index.html",
    "style.css",
    "script.js",
    "robots.txt",
    "CNAME",
]
ROOT_STATIC_DIRS = [
    "asset",
    "resume",
]
SECTION_STATIC_DIRS = {
    "blog": ["script.js", "asset"],
    "personal-wiki": ["script.js", "asset"],
}

env = Environment(loader=FileSystemLoader(ROOT / "templates"), autoescape=False)


def resolve_output_dir(output: str) -> Path:
    output_dir = Path(output)
    if not output_dir.is_absolute():
        output_dir = ROOT / output_dir
    return output_dir.resolve()


def ensure_clean_output_dir(output_dir: Path) -> None:
    if output_dir == ROOT:
        raise ValueError("refusing to build into repository root; use an output directory like dist/")
    if output_dir.exists():
        shutil.rmtree(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)


def copy_file(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, destination)


def copy_tree(source: Path, destination: Path) -> None:
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(source, destination)


def copy_static_site(output_dir: Path) -> None:
    for relative_path in ROOT_STATIC_FILES:
        copy_file(ROOT / relative_path, output_dir / relative_path)

    for relative_path in ROOT_STATIC_DIRS:
        copy_tree(ROOT / relative_path, output_dir / relative_path)

    for section, entries in SECTION_STATIC_DIRS.items():
        for entry in entries:
            source = ROOT / section / entry
            destination = output_dir / section / entry
            if source.is_dir():
                copy_tree(source, destination)
            else:
                copy_file(source, destination)

    (output_dir / ".nojekyll").write_text("", encoding="utf-8")


TITLE_RE = re.compile(r"^#\s+`?([^`\n]+)`?\s*$")


def extract_md_title(md_content: str) -> str:
    """Extract the first markdown H1 title from content."""
    for line in md_content.splitlines():
        match = TITLE_RE.match(line.strip())
        if match:
            return match.group(1).strip()
    return "Untitled"


def split_md_title(md_content: str) -> tuple[str, str]:
    """Return (title, body_without_first_h1)."""
    lines = md_content.splitlines()
    for index, line in enumerate(lines):
        match = TITLE_RE.match(line.strip())
        if match:
            body = "\n".join(lines[index + 1 :]).lstrip("\n")
            return match.group(1).strip(), body
    return "Untitled", md_content


def process_wikilinks(md_content: str, notes_dir: Path) -> str:
    """Convert [[Note Name]] references to HTML links before Markdown rendering."""
    available = {}
    for note_file in notes_dir.glob("*.md"):
        title = extract_md_title(note_file.read_text(encoding="utf-8"))
        available[title.lower()] = note_file.stem.lower() + ".html"

    def replace_link(match: re.Match[str]) -> str:
        name = match.group(1).strip()
        filename = available.get(name.lower())
        if filename:
            return f'<a href="{filename}">{name}</a>'
        return f'<span class="broken-wikilink">{name}</span>'

    return re.sub(r"\[\[([^\]]+)\]\]", replace_link, md_content)


def md_to_html(md_content: str) -> str:
    """Convert markdown content to HTML."""
    md = markdown.Markdown(
        extensions=[
            "fenced_code",
            "tables",
            "nl2br",
            "codehilite",
            "pymdownx.arithmatex",
        ],
        extension_configs={
            "pymdownx.arithmatex": {"generic": True},
        },
    )
    return md.convert(md_content)


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Parse YAML frontmatter from a markdown file."""
    if not text.startswith("---"):
        return {}, text

    parts = text.split("---", 2)
    if len(parts) < 3:
        return {"__fm_error__": "missing closing ---"}, text

    try:
        meta = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError as exc:
        return {"__yaml_error__": str(exc)}, parts[2].strip()

    return meta, parts[2].strip()


REQUIRED_FIELDS = {
    "blog": ["title", "date"],
    "book": ["title", "date", "author", "isbn", "category", "rating"],
    "film": ["title", "date", "director", "year", "rating"],
    "tech-writeup": ["title", "date", "tech_stack", "status"],
}


def validate_frontmatter(meta: dict, filepath: Path) -> list[str]:
    """Validate required frontmatter fields for a markdown blog file."""
    if "__yaml_error__" in meta:
        return [f"{filepath}: invalid YAML in frontmatter: {meta['__yaml_error__']}"]
    if "__fm_error__" in meta:
        return [f"{filepath}: {meta['__fm_error__']}"]

    post_type = meta.get("type", "blog")
    required = REQUIRED_FIELDS.get(post_type, ["title", "date"])
    errors = []

    for field in required:
        if not meta.get(field):
            errors.append(f"{filepath}: missing required field '{field}' for type '{post_type}'")

    return errors


class BlogPostParser(HTMLParser):
    """Parse existing HTML blog posts to extract metadata for indexing and migration."""

    def __init__(self) -> None:
        super().__init__()
        self._in_h2 = False
        self._in_dt = False
        self._in_dd = False
        self._in_section = None
        self._current_dt = ""
        self._current_dd = ""
        self.title = ""
        self.meta = {}

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag == "section":
            css_class = attrs_dict.get("class", "") or ""
            if any(
                section in css_class
                for section in ("book-details", "blog-details", "writeup-details", "film-details")
            ):
                self._in_section = css_class
        elif tag == "h2" and self._in_section:
            self._in_h2 = True
        elif tag == "dt" and self._in_section:
            self._in_dt = True
            self._current_dt = ""
        elif tag == "dd" and self._in_section:
            self._in_dd = True
            self._current_dd = ""

    def handle_endtag(self, tag: str) -> None:
        if tag == "h2":
            self._in_h2 = False
        elif tag == "dt":
            self._in_dt = False
        elif tag == "dd":
            self._in_dd = False
            key = self._current_dt.strip().lower()
            value = self._current_dd.strip()
            if key:
                self.meta[key] = value
        elif tag == "section":
            self._in_section = None

    def handle_data(self, data: str) -> None:
        if self._in_h2:
            self.title += data
        elif self._in_dt:
            self._current_dt += data
        elif self._in_dd:
            self._current_dd += data


def parse_html_post(filepath: Path) -> dict:
    parser = BlogPostParser()
    parser.feed(filepath.read_text(encoding="utf-8"))
    return {"title": parser.title.strip(), **parser.meta}


class WikiNoteParser(HTMLParser):
    """Parse existing HTML wiki notes to extract title for indexing and migration."""

    def __init__(self) -> None:
        super().__init__()
        self._in_header = False
        self._in_h2 = False
        self.title = ""

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag == "section" and "note-header" in (attrs_dict.get("class") or ""):
            self._in_header = True
        elif tag == "h2" and self._in_header:
            self._in_h2 = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "h2":
            self._in_h2 = False
        elif tag == "section":
            self._in_header = False

    def handle_data(self, data: str) -> None:
        if self._in_h2:
            self.title += data


def format_file_size(size_bytes: int) -> str:
    size_kb = size_bytes / 1024
    return f"{size_bytes}B" if size_kb < 1 else f"{size_kb:.1f}KB"


def parse_html_wiki_note(filepath: Path) -> dict:
    parser = WikiNoteParser()
    parser.feed(filepath.read_text(encoding="utf-8"))
    return {
        "title": parser.title.strip(),
        "file_size": format_file_size(filepath.stat().st_size),
    }


def render_wiki_note(template, title: str, content: str, output_path: Path) -> str:
    rendered = template.render(
        title=title,
        content=content,
        file_size="__WIKI_FILE_SIZE__",
        loc="__WIKI_LOC__",
        meta_description=f"Wiki Note: {title} - Gabriel Ong",
        og_title=f"{title} | Gabriel Ong Wiki",
        og_type="article",
        page_title=f"{title} | Gabriel Ong Wiki",
        base_path="../..",
        section_path="..",
    )
    output_path.write_text(rendered, encoding="utf-8")

    rendered = rendered.replace("__WIKI_FILE_SIZE__", format_file_size(output_path.stat().st_size))
    rendered = rendered.replace("__WIKI_LOC__", str(len(rendered.splitlines())))
    output_path.write_text(rendered, encoding="utf-8")
    return rendered


def build_wiki(output_dir: Path) -> list[dict]:
    """Build wiki pages and index into the output directory."""
    notes_dir = ROOT / "personal-wiki" / "notes"
    source_pages_dir = ROOT / "personal-wiki" / "pages"
    output_pages_dir = output_dir / "personal-wiki" / "pages"
    output_pages_dir.mkdir(parents=True, exist_ok=True)

    md_files = []
    if notes_dir.exists():
        md_files = [path for path in sorted(notes_dir.glob("*.md")) if not path.name.startswith(".")]
    else:
        print("warn: personal-wiki/notes/ not found, scanning legacy html-only wiki pages")

    print(f"wiki: found {len(md_files)} markdown notes")

    template = env.get_template("wiki-note.html")
    notes_info = []
    generated_filenames = set()

    wiki_default_date = "2 Feb 2026" # all notes treated as created on this date

    for md_file in md_files:
        raw_markdown = md_file.read_text(encoding="utf-8")
        meta, content_after_fm = parse_frontmatter(raw_markdown)
        title, body = split_md_title(content_after_fm)
        body = process_wikilinks(body, notes_dir)
        html_content = md_to_html(body)
        output_filename = md_file.stem.lower() + ".html"
        output_path = output_pages_dir / output_filename
        rendered = render_wiki_note(template, title, html_content, output_path)
        category = str(meta.get("category", "General")).strip().lower() or "general"
        if category not in ("general", "tech"):
            category = "general"
        notes_info.append(
            {
                "title": title,
                "filename": output_filename,
                "size": format_file_size(output_path.stat().st_size),
                "loc": len(rendered.splitlines()),
                "date": wiki_default_date,
                "filter_category": category,
                "source_path": md_file,
            }
        )
        generated_filenames.add(output_filename)
        print(f"  wiki: {md_file.name} -> dist/personal-wiki/pages/{output_filename}")

    for html_file in sorted(source_pages_dir.glob("*.html")):
        if html_file.name in generated_filenames:
            continue

        meta = parse_html_wiki_note(html_file)
        if not meta.get("title"):
            continue

        dest = output_pages_dir / html_file.name
        copy_file(html_file, dest)
        notes_info.append(
            {
                "title": meta["title"],
                "filename": html_file.name,
                "size": meta["file_size"],
                "loc": len(dest.read_text(encoding="utf-8").splitlines()),
                "date": wiki_default_date,
                "filter_category": "general",
                "source_path": html_file,
            }
        )
        print(f"  wiki: {html_file.name} (html-only legacy copy)")

    notes_info.sort(key=lambda item: item["title"].lower())

    index_template = env.get_template("wiki-index.html")
    index_html = index_template.render(
        notes=notes_info,
        meta_description="Gabriel Ong's personal wiki - programming notes, language references, and CS topics.",
        og_title="Personal Wiki | Gabriel Ong",
        og_type="website",
        page_title="Personal Wiki | Gabriel Ong",
        base_path="..",
        section_path=".",
    )
    (output_dir / "personal-wiki" / "index.html").write_text(index_html, encoding="utf-8")
    print(f"  wiki: generated dist/personal-wiki/index.html ({len(notes_info)} notes)")

    urls = [
        {
            "loc": f"{BASE_URL}/personal-wiki/",
            "priority": "0.8",
            "changefreq": "weekly",
            "source_path": ROOT / "templates" / "wiki-index.html",
        }
    ]
    urls.extend(
        {
            "loc": f"{BASE_URL}/personal-wiki/pages/{note['filename']}",
            "priority": "0.5",
            "changefreq": "monthly",
            "source_path": note["source_path"],
        }
        for note in notes_info
    )
    return urls


def build_blog(output_dir: Path) -> tuple[list[dict], list[str]]:
    """Build blog posts and index into the output directory."""
    source_posts_dir = ROOT / "blog" / "posts"
    output_posts_dir = output_dir / "blog" / "posts"
    output_posts_dir.mkdir(parents=True, exist_ok=True)

    all_posts = []
    validation_errors = []
    template_map = {
        "blog": "blog-post.html",
        "book": "book-review.html",
        "tech-writeup": "tech-writeup.html",
        "film": "film-review.html",
    }
    filter_category_map = {
        "blog": "general",
        "book": "book",
        "film": "film",
        "tech-writeup": "project",
    }

    md_files = [path for path in sorted(source_posts_dir.glob("*.md")) if not path.name.startswith(".")]
    generated_filenames = set()

    for md_file in md_files:
        raw = md_file.read_text(encoding="utf-8")
        meta, content = parse_frontmatter(raw)
        errors = validate_frontmatter(meta, md_file)
        validation_errors.extend(errors)
        if errors:
            continue

        post_type = meta.get("type", "blog")
        template = env.get_template(template_map.get(post_type, "blog-post.html"))
        title = str(meta["title"])
        date = str(meta["date"])
        output_filename = md_file.stem + ".html"
        generated_filenames.add(output_filename)

        og_title = title
        meta_description = f"Blog Post: {title} - Gabriel Ong"
        if post_type == "book":
            og_title = f"{title} by {meta.get('author', '')} | Gabriel Ong"
            meta_description = f"Book Review: {title} by {meta.get('author', '')} - Gabriel Ong"
        elif post_type == "film":
            og_title = f"{title} ({meta.get('year', '')}) | Gabriel Ong"
            meta_description = (
                f"Film Review: {title} ({meta.get('year', '')}) dir. {meta.get('director', '')} - Gabriel Ong"
            )

        rendered = template.render(
            content=md_to_html(content),
            base_path="../..",
            section_path="..",
            meta_description=meta_description,
            og_title=og_title,
            og_type="article",
            page_title=f"{title} | Gabriel Ong",
            **meta,
        )

        output_path = output_posts_dir / output_filename
        output_path.write_text(rendered, encoding="utf-8")
        print(f"  blog: {md_file.name} -> dist/blog/posts/{output_filename}")

        post_info = {
            "title": title,
            "date": date,
            "filename": output_filename,
            "source_path": md_file,
            "filter_category": filter_category_map.get(post_type, "general"),
        }
        if post_type == "book":
            post_info.update(
                {
                    "author": str(meta.get("author", "")),
                    "isbn": str(meta.get("isbn", "")),
                    "rating": str(meta.get("rating", "")),
                    "category": str(meta.get("category", "")),
                }
            )
        elif post_type == "film":
            post_info.update(
                {
                    "director": str(meta.get("director", "")),
                    "year": str(meta.get("year", "")),
                    "rating": str(meta.get("rating", "")),
                }
            )
        elif post_type == "tech-writeup":
            post_info.update(
                {
                    "status": str(meta.get("status", "")),
                    "date_range": str(meta.get("date_range", "")),
                }
            )

        all_posts.append(post_info)

    for html_file in sorted(source_posts_dir.glob("*.html")):
        if html_file.name in generated_filenames:
            continue

        meta = parse_html_post(html_file)
        if not meta.get("title"):
            print(f"warn: skipping {html_file.name} - could not extract title")
            continue

        copy_file(html_file, output_posts_dir / html_file.name)

        if meta.get("author"):
            legacy_category = "book"
        elif meta.get("director"):
            legacy_category = "film"
        elif meta.get("tech stack") or meta.get("status"):
            legacy_category = "project"
        else:
            legacy_category = "general"

        post_info = {
            "title": meta["title"],
            "date": meta.get("date", ""),
            "filename": html_file.name,
            "source_path": html_file,
            "filter_category": legacy_category,
        }
        if meta.get("author"):
            post_info.update(
                {
                    "author": meta.get("author", ""),
                    "isbn": meta.get("isbn", ""),
                    "rating": meta.get("rating", "").replace("/5", ""),
                    "category": meta.get("category", ""),
                }
            )
        elif meta.get("director"):
            post_info.update(
                {
                    "director": meta.get("director", ""),
                    "year": meta.get("release year", meta.get("year", "")),
                    "rating": meta.get("rating", "").replace("/5", ""),
                }
            )
        elif meta.get("tech stack") or meta.get("status"):
            post_info.update(
                {
                    "status": meta.get("status", ""),
                    "date_range": meta.get("timeline", ""),
                }
            )

        all_posts.append(post_info)
        print(f"  blog: {html_file.name} (html-only legacy copy)")

    def parse_date(date_value: str) -> datetime:
        if isinstance(date_value, str) and " to " in date_value:
            date_value = date_value.split(" to ", 1)[0].strip()
        for fmt in ("%d %b %Y", "%Y-%m-%d", "%d %B %Y"):
            try:
                return datetime.strptime(date_value, fmt)
            except (TypeError, ValueError):
                continue
        print(f"warn: unparseable date '{date_value}', sorting to end")
        return datetime.min

    all_posts.sort(key=lambda post: parse_date(post.get("date", "")), reverse=True)

    index_template = env.get_template("blog-index.html")
    index_html = index_template.render(
        posts=all_posts,
        meta_description="Gabriel Ong's blog - thoughts on books, film, and other media.",
        og_title="Gabriel's Blog",
        og_type="website",
        page_title="Blog | Gabriel Ong",
        base_path="..",
        section_path=".",
    )
    (output_dir / "blog" / "index.html").write_text(index_html, encoding="utf-8")
    print(f"  blog: generated dist/blog/index.html ({len(all_posts)} posts)")

    if validation_errors:
        print("\nfrontmatter validation errors:")
        for error in validation_errors:
            print(f"  {error}")

    urls = [
        {
            "loc": f"{BASE_URL}/blog/",
            "priority": "0.8",
            "changefreq": "weekly",
            "source_path": ROOT / "templates" / "blog-index.html",
        }
    ]
    urls.extend(
        {
            "loc": f"{BASE_URL}/blog/posts/{post['filename']}",
            "priority": "0.6",
            "changefreq": "monthly",
            "source_path": post["source_path"],
        }
        for post in all_posts
    )
    return urls, validation_errors


def git_lastmod(source_path: Path | None) -> str:
    """Get last modified date from git history for a source path."""
    if source_path and source_path.exists():
        try:
            result = subprocess.run(
                ["git", "log", "-1", "--format=%aI", "--", str(source_path)],
                capture_output=True,
                text=True,
                cwd=ROOT,
                check=False,
            )
            if result.stdout.strip():
                return result.stdout.strip()[:10]
        except Exception:
            pass
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")


def generate_sitemap(urls: list[dict]) -> str:
    """Generate sitemap.xml for the built site."""
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for url in urls:
        lines.append("  <url>")
        lines.append(f"    <loc>{url['loc']}</loc>")
        lines.append(f"    <lastmod>{git_lastmod(url.get('source_path'))}</lastmod>")
        lines.append(f"    <changefreq>{url.get('changefreq', 'monthly')}</changefreq>")
        lines.append(f"    <priority>{url.get('priority', '0.5')}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def build_site(output_dir: Path) -> list[str]:
    print("=== building gabrielongzm.com ===\n")
    print(f"output: {output_dir}")

    ensure_clean_output_dir(output_dir)
    copy_static_site(output_dir)

    all_urls = [
        {
            "loc": BASE_URL + "/",
            "priority": "1.0",
            "changefreq": "weekly",
            "source_path": ROOT / "index.html",
        }
    ]

    print("\n[1/3] building wiki...")
    all_urls.extend(build_wiki(output_dir))

    print("\n[2/3] building blog...")
    blog_urls, errors = build_blog(output_dir)
    all_urls.extend(blog_urls)

    print("\n[3/3] generating sitemap...")
    (output_dir / "sitemap.xml").write_text(generate_sitemap(all_urls), encoding="utf-8")
    print(f"  sitemap: {len(all_urls)} URLs")

    print("\n=== build complete ===")
    return errors


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Build gabrielongzm.com into a deployable output directory.")
    parser.add_argument(
        "--output",
        default=str(DEFAULT_OUTPUT_DIR.relative_to(ROOT)),
        help="Output directory for the built site (default: dist)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()
    output_dir = resolve_output_dir(args.output)
    errors = build_site(output_dir)
    if errors:
        print(f"\nWARN: {len(errors)} frontmatter validation error(s)")
        sys.exit(1)


if __name__ == "__main__":
    main()
