#!/usr/bin/env python3
"""unified build script for gabrielongzm.com
builds wiki pages, blog posts (from markdown), blog/wiki indices, and sitemap.
"""
import re
import sys
import subprocess
from pathlib import Path
from datetime import datetime, timezone
from html.parser import HTMLParser
try:
    import markdown
    import yaml
    from jinja2 import Environment, FileSystemLoader
except ImportError:
    print("error: missing deps. run: pip install -r requirements.txt")
    sys.exit(1)
ROOT = Path(__file__).parent
BASE_URL = "https://gabrielongzm.com"
env = Environment(loader=FileSystemLoader(ROOT / "templates"), autoescape=False)
# --- wiki cross-linking preprocessor ---
def process_wikilinks(md_content, notes_dir):
    """convert [[Note Name]] to html links before markdown conversion"""
    available = {}
    for f in notes_dir.glob("*.md"):
        title = extract_md_title(f.read_text(encoding="utf-8"))
        available[title.lower()] = f.stem.lower() + ".html"
    def replace_link(match):
        name = match.group(1).strip()
        key = name.lower()
        if key in available:
            return f'<a href="{available[key]}">{name}</a>'
        return f'<span class="broken-wikilink">{name}</span>' # unresolved link
    return re.sub(r'\[\[([^\]]+)\]\]', replace_link, md_content)
# --- markdown helpers ---
def extract_md_title(md_content):
    """extract title from first h1 heading"""
    match = re.search(r'^#\s+`?([^`\n]+)`?', md_content, re.MULTILINE)
    return match.group(1).strip() if match else "Untitled"
def md_to_html(md_content):
    """convert markdown string to html"""
    md = markdown.Markdown(extensions=['fenced_code', 'tables', 'nl2br', 'codehilite'])
    return md.convert(md_content)
def parse_frontmatter(text):
    """parse YAML frontmatter from markdown file, returns (metadata_dict, content_str)"""
    if not text.startswith("---"):
        return {}, text
    parts = text.split("---", 2)
    if len(parts) < 3:
        return {}, text
    meta = yaml.safe_load(parts[1]) or {}
    content = parts[2].strip()
    return meta, content
# --- frontmatter validation ---
REQUIRED_FIELDS = { # per post type
    "blog": ["title", "date"],
    "book": ["title", "date", "author", "isbn", "category", "rating"],
    "film": ["title", "date", "director", "year", "rating"],
    "tech-writeup": ["title", "date", "tech_stack", "duration", "status"],
}
def validate_frontmatter(meta, filepath):
    """validate required frontmatter fields, returns list of errors"""
    post_type = meta.get("type", "blog")
    required = REQUIRED_FIELDS.get(post_type, ["title", "date"])
    errors = []
    for field in required:
        if not meta.get(field):
            errors.append(f"{filepath}: missing required field '{field}' for type '{post_type}'")
    return errors
# --- html post metadata parser ---
class BlogPostParser(HTMLParser):
    """parse existing html blog posts to extract metadata for index generation"""
    def __init__(self):
        super().__init__()
        self._in_h2 = False
        self._in_dt = False
        self._in_dd = False
        self._in_section = None
        self._current_dt = ""
        self._current_dd = ""
        self.title = ""
        self.meta = {}
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == "section":
            cls = attrs_dict.get("class", "") or ""
            if "book-details" in cls or "blog-details" in cls or "writeup-details" in cls or "film-details" in cls:
                self._in_section = cls
        elif tag == "h2" and self._in_section:
            self._in_h2 = True
        elif tag == "dt" and self._in_section:
            self._in_dt = True
            self._current_dt = ""
        elif tag == "dd" and self._in_section:
            self._in_dd = True
            self._current_dd = ""
    def handle_endtag(self, tag):
        if tag == "h2":
            self._in_h2 = False
        elif tag == "dt":
            self._in_dt = False
        elif tag == "dd":
            self._in_dd = False
            key = self._current_dt.strip().lower()
            val = self._current_dd.strip()
            if key:
                self.meta[key] = val
        elif tag == "section":
            self._in_section = None
    def handle_data(self, data):
        if self._in_h2:
            self.title += data
        elif self._in_dt:
            self._current_dt += data
        elif self._in_dd:
            self._current_dd += data
def parse_html_post(filepath):
    """extract metadata from existing html blog post"""
    parser = BlogPostParser()
    parser.feed(filepath.read_text(encoding="utf-8"))
    return {"title": parser.title.strip(), **parser.meta}
# --- build wiki ---
def build_wiki():
    """convert all wiki markdown notes to html pages, generate index"""
    notes_dir = ROOT / "personal-wiki" / "notes"
    pages_dir = ROOT / "personal-wiki" / "pages"
    pages_dir.mkdir(exist_ok=True)
    if not notes_dir.exists():
        print("warn: personal-wiki/notes/ not found, skipping wiki build")
        return []
    md_files = sorted(notes_dir.glob("*.md"))
    print(f"wiki: found {len(md_files)} notes")
    template = env.get_template("wiki-note.html")
    notes_info = []
    for md_file in md_files:
        md_content = md_file.read_text(encoding="utf-8")
        title = extract_md_title(md_content)
        md_content = process_wikilinks(md_content, notes_dir) # cross-linking
        html_content = md_to_html(md_content)
        output_filename = md_file.stem.lower() + ".html"
        output_path = pages_dir / output_filename
        rendered = template.render(
            title=title, content=html_content,
            file_size="...", loc="...", # placeholder, calculated after write
            meta_description=f"Wiki Note: {title} - Gabriel Ong",
            og_title=f"{title} | Gabriel Ong Wiki",
            og_type="article",
            page_title=f"{title} | Gabriel Ong Wiki",
            base_path="../..", section_path="..",
        )
        output_path.write_text(rendered, encoding="utf-8")
        size_bytes = output_path.stat().st_size
        size_kb = size_bytes / 1024
        file_size = f"{size_bytes}B" if size_kb < 1 else f"{size_kb:.1f}KB"
        loc = len(rendered.splitlines())
        rendered = rendered.replace("...", file_size, 1).replace("...", str(loc), 1) # replace placeholders
        output_path.write_text(rendered, encoding="utf-8")
        notes_info.append({"title": title, "filename": output_filename, "size": file_size})
        print(f"  wiki: {md_file.name} -> {output_filename}")
    notes_info.sort(key=lambda x: x["title"].lower())
    idx_template = env.get_template("wiki-index.html")
    idx_html = idx_template.render(
        notes=notes_info,
        meta_description="Gabriel Ong's personal wiki - programming notes, language references, and CS topics.",
        og_title="Personal Wiki | Gabriel Ong",
        og_type="website",
        page_title="Personal Wiki | Gabriel Ong",
        base_path="..", section_path=".",
    )
    (ROOT / "personal-wiki" / "index.html").write_text(idx_html, encoding="utf-8")
    print(f"  wiki: generated index.html ({len(notes_info)} notes)")
    return [{"loc": f"{BASE_URL}/personal-wiki/", "priority": "0.8", "changefreq": "weekly"}] + \
           [{"loc": f"{BASE_URL}/personal-wiki/pages/{n['filename']}", "priority": "0.5", "changefreq": "monthly"} for n in notes_info]
# --- build blog ---
def build_blog():
    """render new markdown blog posts, parse existing html posts, generate index"""
    posts_dir = ROOT / "blog" / "posts"
    posts_dir.mkdir(exist_ok=True)
    all_posts = [] # [{title, date, filename, author?, isbn?, category?, rating?}]
    validation_errors = []
    template_map = {
        "blog": "blog-post.html",
        "book": "book-review.html",
        "tech-writeup": "tech-writeup.html",
        "film": "film-review.html",
    }
    md_files = sorted(posts_dir.glob("*.md"))
    for md_file in md_files:
        raw = md_file.read_text(encoding="utf-8")
        meta, content = parse_frontmatter(raw)
        errors = validate_frontmatter(meta, md_file)
        validation_errors.extend(errors)
        if errors:
            continue
        post_type = meta.get("type", "blog")
        template_name = template_map.get(post_type, "blog-post.html")
        template = env.get_template(template_name)
        html_content = md_to_html(content)
        title = meta["title"]
        date = str(meta["date"])
        output_filename = md_file.stem + ".html"
        og_title = title
        meta_desc = f"Blog Post: {title} - Gabriel Ong"
        if post_type == "book":
            og_title = f"{title} by {meta.get('author', '')} | Gabriel Ong"
            meta_desc = f"Book Review: {title} by {meta.get('author', '')} - Gabriel Ong"
        elif post_type == "film":
            og_title = f"{title} ({meta.get('year', '')}) | Gabriel Ong"
            meta_desc = f"Film Review: {title} ({meta.get('year', '')}) dir. {meta.get('director', '')} - Gabriel Ong"
        rendered = template.render(
            content=html_content, base_path="../..", section_path="..",
            meta_description=meta_desc, og_title=og_title, og_type="article",
            page_title=f"{title} | Gabriel Ong", **meta,
        )
        output_path = posts_dir / output_filename
        output_path.write_text(rendered, encoding="utf-8")
        print(f"  blog: {md_file.name} -> {output_filename}")
        post_info = {"title": title, "date": date, "filename": output_filename}
        if post_type == "book":
            post_info.update({
                "author": meta.get("author", ""),
                "isbn": meta.get("isbn", ""),
                "rating": meta.get("rating", ""),
                "category": meta.get("category", ""),
            })
        elif post_type == "film":
            post_info.update({
                "director": meta.get("director", ""),
                "year": meta.get("year", ""),
                "rating": meta.get("rating", ""),
            })
        elif post_type == "tech-writeup":
            post_info.update({
                "duration": meta.get("duration", ""),
                "status": meta.get("status", ""),
            })
        all_posts.append(post_info)
    html_files = sorted(posts_dir.glob("*.html"))
    for html_file in html_files:
        if any(p["filename"] == html_file.name for p in all_posts):
            continue # already processed from markdown
        meta = parse_html_post(html_file)
        if not meta.get("title"):
            continue
        post_info = {"title": meta["title"], "date": meta.get("date", ""), "filename": html_file.name}
        if meta.get("author"):
            post_info.update({
                "author": meta.get("author", ""),
                "isbn": meta.get("isbn", ""),
                "rating": meta.get("rating", "").replace("/5", ""),
                "category": meta.get("category", ""),
            })
        elif meta.get("director"):
            post_info.update({
                "director": meta.get("director", ""),
                "year": meta.get("year", ""),
                "rating": meta.get("rating", "").replace("/5", ""),
            })
        elif meta.get("tech stack") or meta.get("duration"):
            post_info.update({
                "duration": meta.get("duration", ""),
                "status": meta.get("status", ""),
            })
        all_posts.append(post_info)
    def parse_date(d):
        """parse date string to sortable tuple"""
        for fmt in ("%d %b %Y", "%Y-%m-%d", "%d %B %Y"):
            try:
                return datetime.strptime(d, fmt)
            except (ValueError, TypeError):
                continue
        return datetime.min
    all_posts.sort(key=lambda p: parse_date(p.get("date", "")), reverse=True)
    idx_template = env.get_template("blog-index.html")
    idx_html = idx_template.render(
        posts=all_posts,
        meta_description="Gabriel Ong's blog - thoughts on books, film, and other media.",
        og_title="Gabriel's Blog",
        og_type="website",
        page_title="Blog | Gabriel Ong",
        base_path="..", section_path=".",
    )
    (ROOT / "blog" / "index.html").write_text(idx_html, encoding="utf-8")
    print(f"  blog: generated index.html ({len(all_posts)} posts)")
    if validation_errors:
        print("\nfrontmatter validation errors:")
        for err in validation_errors:
            print(f"  {err}")
    return (
        [{"loc": f"{BASE_URL}/blog/", "priority": "0.8", "changefreq": "weekly"}] +
        [{"loc": f"{BASE_URL}/blog/posts/{p['filename']}", "priority": "0.6", "changefreq": "monthly"} for p in all_posts],
        validation_errors,
    )
# --- sitemap ---
def git_lastmod(filepath):
    """get last modified date from git history"""
    try:
        result = subprocess.run(
            ["git", "log", "-1", "--format=%aI", "--", str(filepath)],
            capture_output=True, text=True, cwd=ROOT,
        )
        if result.stdout.strip():
            return result.stdout.strip()[:10]
    except Exception:
        pass
    return datetime.now(timezone.utc).strftime("%Y-%m-%d")
def generate_sitemap(urls):
    """generate sitemap.xml from url list"""
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url in urls:
        loc = url["loc"]
        priority = url.get("priority", "0.5")
        changefreq = url.get("changefreq", "monthly")
        filepath = loc.replace(BASE_URL, "").lstrip("/")
        if filepath == "":
            filepath = "index.html"
        lastmod = git_lastmod(ROOT / filepath) if (ROOT / filepath).exists() else datetime.now(timezone.utc).strftime("%Y-%m-%d")
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append(f"    <changefreq>{changefreq}</changefreq>")
        lines.append(f"    <priority>{priority}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"
# --- css/js sync ---
def sync_assets():
    """ensure blog/wiki sections reference root style.css and have their own script.js/assets"""
    pass # paths handled by templates; copies maintained for backward compat with existing html posts
# --- main ---
def main():
    print("=== building gabrielongzm.com ===\n")
    all_urls = [{"loc": BASE_URL + "/", "priority": "1.0", "changefreq": "weekly"}]
    print("[1/3] building wiki...")
    wiki_urls = build_wiki()
    all_urls.extend(wiki_urls)
    print(f"\n[2/3] building blog...")
    blog_urls, errors = build_blog()
    all_urls.extend(blog_urls)
    print(f"\n[3/3] generating sitemap...")
    sitemap_xml = generate_sitemap(all_urls)
    (ROOT / "sitemap.xml").write_text(sitemap_xml, encoding="utf-8")
    print(f"  sitemap: {len(all_urls)} URLs")
    print(f"\n=== build complete ===")
    if errors:
        print(f"\nWARN: {len(errors)} frontmatter validation error(s)")
        sys.exit(1)
if __name__ == "__main__":
    main()
