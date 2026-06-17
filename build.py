#!/usr/bin/env python3
"""Build the published site into a deployable output directory."""

from __future__ import annotations

import argparse
import hashlib
import html
import io
import json
import re
import shutil
import statistics
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

try:
    import markdown
    import yaml
    from jinja2 import Environment, FileSystemLoader
    from PIL import Image, ImageChops, ImageFilter, ImageOps, UnidentifiedImageError
except ImportError:
    print("error: missing deps. run: pip install -r requirements.txt")
    sys.exit(1)

ROOT = Path(__file__).parent.resolve()
BASE_URL = "https://gabrielongzm.com"
DEFAULT_OUTPUT_DIR = ROOT / "dist"
WORKS_SOURCE_DIR = ROOT / "works"
PERSON_ID = f"{BASE_URL}/#person"
DEFAULT_SOCIAL_IMAGE_URL = f"{BASE_URL}/asset/portrait/gong-2-og.png"
PORTRAIT_SOURCE = ROOT / "asset" / "portrait" / "gong-2.png"
PORTRAIT_VARIANTS = [
    ("gong-2-140.webp", 140, "WEBP", {"quality": 82, "method": 6}),
    ("gong-2-280.webp", 280, "WEBP", {"quality": 82, "method": 6}),
    ("gong-2-560.webp", 560, "WEBP", {"quality": 82, "method": 6}),
    ("gong-2-140.png", 140, "PNG", {"optimize": True}),
    ("gong-2-280.png", 280, "PNG", {"optimize": True}),
    ("gong-2-560.png", 560, "PNG", {"optimize": True}),
    ("gong-2-og.png", 1200, "PNG", {"optimize": True}),
]
IMAGE_CACHE_DIR = ROOT / ".cache" / "ascii-images"
ASCII_ART_CACHE_DIR = ROOT / ".cache" / "ascii-art"
ASCII_ALGORITHM_VERSION = "braille-fs-v4-photo"
ASCII_IMAGE_COLUMNS = 104
ANIMATED_IMAGE_COLUMNS = 90  # narrower for animated sources to keep frame payload reasonable
MAX_ANIMATION_FRAMES = 48  # cap kept frames; longer sequences are subsampled evenly
DEFAULT_FRAME_MS = 100  # fallback when a frame omits its duration (matches browser behaviour)
MAX_IMAGE_BYTES = 12 * 1024 * 1024
BRAILLE_BLANK = chr(0x2800)
BRAILLE_DOT_BITS = {
    (0, 0): 0x01,
    (0, 1): 0x02,
    (0, 2): 0x04,
    (0, 3): 0x40,
    (1, 0): 0x08,
    (1, 1): 0x10,
    (1, 2): 0x20,
    (1, 3): 0x80,
}
IMAGE_MARKDOWN_DIRS = [
    ROOT / "works",
    ROOT / "blog" / "posts",
    ROOT / "personal-wiki" / "notes",
    ROOT / "papers" / "sources",
]

ROOT_STATIC_FILES = [
    "index.html",
    "style.css",
    "site.js",
    "dappled.js",
    "script.js",
    "mermaid.js",
    "toc.js",
    "robots.txt",
    "CNAME",
]
ROOT_STATIC_DIRS = [
    "resume",
]
SECTION_STATIC_DIRS = {
    "blog": ["script.js", "asset"],
    "personal-wiki": ["script.js", "asset"],
    "papers": ["asset"],
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

    copy_root_asset_dir(output_dir)

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


def copy_root_asset_dir(output_dir: Path) -> None:
    """Copy root assets without shipping unused large portrait variants."""
    source = ROOT / "asset"
    destination = output_dir / "asset"
    if destination.exists():
        shutil.rmtree(destination)
    destination.mkdir(parents=True, exist_ok=True)

    for entry in source.iterdir():
        if entry.name == "portrait":
            continue
        target = destination / entry.name
        if entry.is_dir():
            copy_tree(entry, target)
        else:
            copy_file(entry, target)

    generate_responsive_portrait_assets(destination / "portrait")


def generate_responsive_portrait_assets(destination: Path) -> None:
    """Generate the portrait files served by the built site from the original source PNG."""
    destination.mkdir(parents=True, exist_ok=True)
    with Image.open(PORTRAIT_SOURCE) as image:
        image = ImageOps.exif_transpose(image).convert("RGBA")
        for filename, width, image_format, options in PORTRAIT_VARIANTS:
            height = round(image.height * (width / image.width))
            resized = image.resize((width, height), Image.Resampling.LANCZOS)
            resized.save(destination / filename, image_format, **options)


TITLE_RE = re.compile(r"^#\s+`?([^`\n]+)`?\s*$")
ASCII_FIGURE_PARAGRAPH_RE = re.compile(r"<p>(\s*<figure class=\"ascii-figure[^\"]*\".*?</figure>\s*)</p>", re.S)
MERMAID_CODE_BLOCK_RE = re.compile(
    r'<pre class="codehilite"><code class="language-mermaid">(.*?)</code></pre>',
    re.S,
)


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


def render_mermaid_block(match: re.Match[str]) -> str:
    """Render a fenced Mermaid code block as source for the runtime renderer."""
    source = html.unescape(match.group(1)).strip()
    escaped_source = html.escape(source)
    escaped_attr = html.escape(source, quote=True)
    return f'<div class="mermaid" data-mermaid-source="{escaped_attr}">\n{escaped_source}\n</div>'


def process_mermaid_blocks(rendered_html: str) -> str:
    return MERMAID_CODE_BLOCK_RE.sub(render_mermaid_block, rendered_html)


def html_uses_mathjax(rendered_html: str) -> bool:
    return "arithmatex" in rendered_html


def html_uses_mermaid(rendered_html: str) -> bool:
    return 'class="mermaid"' in rendered_html


class MarkdownImageAsciiParser(HTMLParser):
    def __init__(self, source_path: Path) -> None:
        super().__init__(convert_charrefs=False)
        self.source_path = source_path
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "img":
            self.parts.append(render_ascii_image(attrs, self.source_path))
            return
        self.parts.append(self.get_starttag_text() or "")

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "img":
            self.parts.append(render_ascii_image(attrs, self.source_path))
            return
        self.parts.append(self.get_starttag_text() or "")

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() != "img":
            self.parts.append(f"</{tag}>")

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def handle_entityref(self, name: str) -> None:
        self.parts.append(f"&{name};")

    def handle_charref(self, name: str) -> None:
        self.parts.append(f"&#{name};")

    def handle_comment(self, data: str) -> None:
        self.parts.append(f"<!--{data}-->")

    def handle_decl(self, decl: str) -> None:
        self.parts.append(f"<!{decl}>")

    def handle_pi(self, data: str) -> None:
        self.parts.append(f"<?{data}>")

    def html(self) -> str:
        return "".join(self.parts)


class MarkdownImageCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.images: list[list[tuple[str, str | None]]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "img":
            self.images.append(attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() == "img":
            self.images.append(attrs)


def md_to_html(md_content: str, source_path: Path | None = None) -> str:
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
    rendered = process_mermaid_blocks(md.convert(md_content))
    if not source_path:
        return rendered

    parser = MarkdownImageAsciiParser(source_path)
    parser.feed(rendered)
    parser.close()
    return ASCII_FIGURE_PARAGRAPH_RE.sub(r"\1", parser.html())


def collect_markdown_images(md_content: str) -> list[list[tuple[str, str | None]]]:
    rendered = markdown.Markdown(extensions=["fenced_code", "tables", "nl2br"]).convert(md_content)
    parser = MarkdownImageCollector()
    parser.feed(rendered)
    parser.close()
    return parser.images


def render_ascii_image(attrs: list[tuple[str, str | None]], source_path: Path) -> str:
    attrs_dict = {key.lower(): value for key, value in attrs if key}
    src = (attrs_dict.get("src") or "").strip()
    alt = (attrs_dict.get("alt") or "").strip()
    title = (attrs_dict.get("title") or "").strip()
    label = alt or title or "image"

    if not src:
        raise ValueError(f"{source_path}: missing image source")
    try:
        result = image_src_to_frames(src, source_path)
    except (OSError, ValueError, UnidentifiedImageError, urllib.error.URLError) as exc:
        raise RuntimeError(f"{source_path}: {src}: {exc}") from exc

    if result.get("animated"):
        return render_ascii_animation(result, src, label)

    art = result["frames"][0]
    return (
        f'<figure class="ascii-figure" data-image-source="{html.escape(src, quote=True)}">'
        f'<pre class="ascii-art" role="img" aria-label="{html.escape(label, quote=True)}">'
        f"{html.escape(art)}</pre></figure>"
    )


def render_ascii_animation(result: dict, src: str, label: str) -> str:
    """Render an animated source as a vertically-stacked braille sheet cycled in pure CSS."""
    frames = result["frames"]
    rows = result["rows"]
    steps = len(frames)
    # Sprite-style playback divides the cycle evenly across frames; keep a sane floor so
    # GIFs that declare near-zero per-frame delays don't render as an unreadable blur.
    total_ms = max(int(result.get("total_ms") or 0), steps * 40)
    loop = int(result.get("loop") or 0)
    iterations = "infinite" if loop <= 0 else str(loop)
    sheet = html.escape("\n".join(frames))
    style = (
        f"--ascii-rows:{rows};--ascii-duration:{total_ms}ms;"
        f"--ascii-steps:{steps};--ascii-iterations:{iterations};"
    )
    return (
        f'<figure class="ascii-figure ascii-figure--anim" '
        f'data-image-source="{html.escape(src, quote=True)}">'
        f'<div class="ascii-anim" role="img" aria-label="{html.escape(label, quote=True)}" '
        f'style="{style}">'
        f'<pre class="ascii-art ascii-anim__frames">{sheet}</pre>'
        f"</div></figure>"
    )


def subsample_indices(n_frames: int, max_frames: int) -> list[int]:
    """Pick up to max_frames evenly spaced frame indices, always spanning first to last."""
    if n_frames <= max_frames:
        return list(range(n_frames))
    return sorted({round(i * (n_frames - 1) / (max_frames - 1)) for i in range(max_frames)})


def normalize_frame_ms(value: object) -> int:
    try:
        ms = int(value)  # type: ignore[arg-type]
    except (TypeError, ValueError):
        ms = 0
    # GIFs frequently declare 0/10ms ("as fast as possible"); browsers clamp these to ~100ms.
    return ms if ms > 10 else DEFAULT_FRAME_MS


def render_image_frames(data: bytes) -> dict:
    with Image.open(io.BytesIO(data)) as image:
        n_frames = int(getattr(image, "n_frames", 1) or 1)
        animated = bool(getattr(image, "is_animated", False)) and n_frames > 1
        if not animated:
            frame = ImageOps.exif_transpose(image)
            frame = flatten_image(frame)
            return {"animated": False, "frames": [image_to_braille(frame, ASCII_IMAGE_COLUMNS)]}

        keep = subsample_indices(n_frames, MAX_ANIMATION_FRAMES)
        keep_set = set(keep)
        image.seek(0)
        loop = int(image.info.get("loop", 0) or 0)
        source_durations: list[int] = []
        rendered: dict[int, str] = {}
        # Seek every frame in order so Pillow accumulates disposal correctly, even though we
        # only braille the kept subset.
        for index in range(n_frames):
            image.seek(index)
            source_durations.append(normalize_frame_ms(image.info.get("duration")))
            if index in keep_set:
                frame = flatten_image(image)
                rendered[index] = image_to_braille(frame, ANIMATED_IMAGE_COLUMNS, keep_all_rows=True)

        frames = [rendered[index] for index in keep]
        effective_ms = []
        for position, index in enumerate(keep):
            end = keep[position + 1] if position + 1 < len(keep) else n_frames
            effective_ms.append(sum(source_durations[index:end]))

        rows = max((frame.count("\n") + 1) for frame in frames)
        frames = [pad_braille_rows(frame, rows) for frame in frames]
        return {
            "animated": True,
            "frames": frames,
            "rows": rows,
            "total_ms": sum(effective_ms),
            "loop": loop,
            "source_frame_count": n_frames,
        }


def pad_braille_rows(art: str, rows: int) -> str:
    """Ensure a frame has exactly `rows` lines so stacked frames stay vertically aligned."""
    lines = art.split("\n")
    if len(lines) < rows:
        lines.extend([BRAILLE_BLANK] * (rows - len(lines)))
    elif len(lines) > rows:
        lines = lines[:rows]
    return "\n".join(lines)


def image_src_to_frames(src: str, source_path: Path) -> dict:
    data = read_image_bytes(src, source_path)
    cache_key = hashlib.sha256(
        b"\0".join(
            [
                ASCII_ALGORITHM_VERSION.encode("utf-8"),
                str(ASCII_IMAGE_COLUMNS).encode("utf-8"),
                str(ANIMATED_IMAGE_COLUMNS).encode("utf-8"),
                str(MAX_ANIMATION_FRAMES).encode("utf-8"),
                hashlib.sha256(data).digest(),
            ]
        )
    ).hexdigest()
    cache_path = ASCII_ART_CACHE_DIR / f"{cache_key}.json"
    if cache_path.is_file():
        try:
            return json.loads(cache_path.read_text(encoding="utf-8"))
        except (ValueError, OSError):
            pass

    result = render_image_frames(data)
    ASCII_ART_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(result), encoding="utf-8")
    return result


def read_image_bytes(src: str, source_path: Path) -> bytes:
    parsed = urllib.parse.urlsplit(src)
    if parsed.scheme in ("http", "https"):
        return read_remote_image(src)
    if parsed.scheme and parsed.scheme != "file":
        raise ValueError(f"unsupported image scheme '{parsed.scheme}'")

    path_text = urllib.parse.unquote(parsed.path)
    if parsed.scheme == "file" or path_text.startswith("/"):
        image_path = (ROOT / path_text.lstrip("/")).resolve()
    else:
        image_path = (source_path.parent / path_text).resolve()

    try:
        image_path.relative_to(ROOT)
    except ValueError as exc:
        raise ValueError("image path escapes repository root") from exc
    if not image_path.is_file():
        raise FileNotFoundError(image_path)
    return image_path.read_bytes()


def read_remote_image(src: str) -> bytes:
    cache_key = hashlib.sha256(src.encode("utf-8")).hexdigest()
    cache_path = IMAGE_CACHE_DIR / f"{cache_key}.img"
    if cache_path.is_file():
        return cache_path.read_bytes()

    IMAGE_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    request = urllib.request.Request(
        src,
        headers={"User-Agent": "Mozilla/5.0 (compatible; gabrielongzm-site-builder/1.0)"},
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        data = response.read(MAX_IMAGE_BYTES + 1)
    if len(data) > MAX_IMAGE_BYTES:
        raise ValueError("image exceeds 12MB limit")
    cache_path.write_bytes(data)
    return data


def flatten_image(image: Image.Image) -> Image.Image:
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        rgba = image.convert("RGBA")
        background = Image.new("RGBA", rgba.size, (255, 255, 255, 255))
        background.alpha_composite(rgba)
        return background.convert("RGB")
    return image.convert("RGB")


_SRGB_TO_LINEAR_LUT = [int(round(((v / 255.0) ** 2.2) * 255.0)) for v in range(256)]
_LINEAR_TO_SRGB_LUT = [int(round(((v / 255.0) ** (1 / 2.2)) * 255.0)) for v in range(256)]


def image_to_braille(image: Image.Image, cols: int = ASCII_IMAGE_COLUMNS, keep_all_rows: bool = False) -> str:
    del keep_all_rows  # rows are always padded now; flag kept for callers
    gray = ImageOps.grayscale(image)
    aspect = gray.height / max(gray.width, 1)
    rows = max(1, round(aspect * cols * 0.55))
    target_w, target_h = cols * 2, rows * 4

    # gamma-correct resize: decode sRGB → resize in linear light → re-encode
    linear = gray.point(_SRGB_TO_LINEAR_LUT)
    linear = linear.resize((target_w, target_h), Image.Resampling.LANCZOS)
    gray = linear.point(_LINEAR_TO_SRGB_LUT)
    gray = ImageOps.autocontrast(gray, cutoff=2)

    bg_level, bg_noise = estimate_background(gray)
    is_photo = bg_noise > 24  # noisy border → no uniform background to subtract

    # DoG edge layer: small-sigma minus large-sigma, centered on 128
    edge = ImageChops.subtract(
        gray.filter(ImageFilter.GaussianBlur(0.8)),
        gray.filter(ImageFilter.GaussianBlur(2.0)),
        scale=1.0,
        offset=128,
    )

    if is_photo:
        base = ImageOps.invert(gray)  # darker pixels become denser braille
    elif bg_level >= 128:
        base = ImageOps.invert(gray)  # dark subject on light background
    else:
        base = gray  # light subject on dark background

    base_pixels = base.load()
    edge_pixels = edge.load()
    signal = [
        [
            min(255, base_pixels[x, y] + int(abs(edge_pixels[x, y] - 128) * 0.5))
            for x in range(target_w)
        ]
        for y in range(target_h)
    ]

    # Floyd-Steinberg error diffusion, 1-bit
    bits = [[0] * target_w for _ in range(target_h)]
    for y in range(target_h):
        row_signal = signal[y]
        next_row = signal[y + 1] if y + 1 < target_h else None
        for x in range(target_w):
            old = row_signal[x]
            new = 255 if old >= 128 else 0
            bits[y][x] = 1 if new else 0
            err = old - new
            if x + 1 < target_w:
                row_signal[x + 1] = max(0, min(255, row_signal[x + 1] + err * 7 // 16))
            if next_row is not None:
                if x > 0:
                    next_row[x - 1] = max(0, min(255, next_row[x - 1] + err * 3 // 16))
                next_row[x] = max(0, min(255, next_row[x] + err * 5 // 16))
                if x + 1 < target_w:
                    next_row[x + 1] = max(0, min(255, next_row[x + 1] + err * 1 // 16))

    lines = []
    for row in range(rows):
        chars = []
        for col in range(cols):
            mask = 0
            for y in range(4):
                for x in range(2):
                    if bits[row * 4 + y][col * 2 + x]:
                        mask |= BRAILLE_DOT_BITS[(x, y)]
            chars.append(chr(0x2800 + mask))
        lines.append("".join(chars))
    return "\n".join(lines)


def estimate_background(gray: Image.Image) -> tuple[int, float]:
    width, height = gray.size
    pixels = gray.load()
    samples = []
    for x in range(width):
        samples.append(pixels[x, 0])
        samples.append(pixels[x, height - 1])
    for y in range(height):
        samples.append(pixels[0, y])
        samples.append(pixels[width - 1, y])
    level = round(statistics.median(samples))
    noise = statistics.median(abs(value - level) for value in samples)
    return level, noise


def markdown_image_sources() -> list[tuple[Path, list[tuple[str, str | None]]]]:
    images = []
    for directory in IMAGE_MARKDOWN_DIRS:
        if not directory.exists():
            continue
        for md_file in sorted(directory.glob("*.md")):
            if md_file.name.startswith("."):
                continue
            _, content = parse_frontmatter(md_file.read_text(encoding="utf-8"))
            for attrs in collect_markdown_images(content):
                images.append((md_file, attrs))
    return images


def validate_markdown_images(images: list[tuple[Path, list[tuple[str, str | None]]]]) -> list[str]:
    errors = []
    for source_path, attrs in images:
        attrs_dict = {key.lower(): value for key, value in attrs if key}
        src = (attrs_dict.get("src") or "").strip()
        if not src:
            errors.append(f"{source_path}: missing image source")
            continue
        try:
            result = image_src_to_frames(src, source_path)
        except (OSError, ValueError, UnidentifiedImageError, urllib.error.URLError) as exc:
            errors.append(f"{source_path}: {src}: {exc}")
            continue
        if result.get("animated"):
            frames = result["frames"]
            total_source = result.get("source_frame_count", len(frames))
            kb = len("\n".join(frames).encode("utf-8")) / 1024
            note = "" if len(frames) == total_source else f" (subsampled from {total_source})"
            print(
                f"  image: {source_path.name}: animated {len(frames)} frame(s){note}, "
                f"{result['rows']} rows, {result['total_ms'] / 1000:.1f}s loop, ~{kb:.0f}KB"
            )
    return errors


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
    "paper": ["title", "date", "authors"],
    "paper:arxiv": ["title", "date", "authors", "arxiv"],
    "paper:zenodo": ["title", "date", "authors", "zenodo", "doi", "resource_type"],
}


def validate_frontmatter(meta: dict, filepath: Path) -> list[str]:
    """Validate required frontmatter fields for a markdown blog file."""
    if "__yaml_error__" in meta:
        return [f"{filepath}: invalid YAML in frontmatter: {meta['__yaml_error__']}"]
    if "__fm_error__" in meta:
        return [f"{filepath}: {meta['__fm_error__']}"]

    post_type = meta.get("type", "blog")
    key = post_type
    if post_type == "paper":
        source = str(meta.get("source", "arxiv")).lower() # default arxiv for back-compat
        key = f"paper:{source}" if f"paper:{source}" in REQUIRED_FIELDS else "paper"
    required = REQUIRED_FIELDS.get(key, ["title", "date"])
    errors = []

    for field in required:
        if not meta.get(field):
            errors.append(f"{filepath}: missing required field '{field}' for type '{key}'")

    return errors


def parse_date_to_iso(date_value: object) -> str:
    """Normalize known content date formats to ISO-like strings for metadata."""
    value = str(date_value or "").strip()
    if not value:
        return ""
    if " to " in value:
        value = value.split(" to ", 1)[0].strip()
    if value.lower() == "present":
        return ""

    for fmt in ("%d %b %Y", "%d %B %Y", "%Y-%m-%d"):
        try:
            return datetime.strptime(value, fmt).date().isoformat()
        except ValueError:
            pass

    for fmt in ("%b %Y", "%B %Y"):
        try:
            return datetime.strptime(value, fmt).strftime("%Y-%m")
        except ValueError:
            pass

    if re.fullmatch(r"\d{4}", value):
        return value
    return value


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


def browser_title(title: str) -> str:
    """Format detail-page browser titles in the site's compact all-caps style."""
    return str(title).strip().upper()


def paper_browser_title(title: str) -> str:
    """Use the compact paper name before the subtitle delimiter."""
    return browser_title(str(title).split(":", 1)[0])


def render_wiki_note(
    template,
    title: str,
    content: str,
    output_path: Path,
    canonical_url: str,
    source_path: Path,
    has_math: bool,
    has_mermaid: bool,
) -> str:
    rendered = template.render(
        title=title,
        content=content,
        file_size="__WIKI_FILE_SIZE__",
        loc="__WIKI_LOC__",
        meta_description=f"Wiki Note: {title} - Gabriel Ong",
        og_title=f"{title} | Gabriel Ong Wiki",
        og_type="article",
        page_title=browser_title(title),
        document_title="PERSONAL WIKI",
        canonical_url=canonical_url,
        date_published=parse_date_to_iso("2 Feb 2026"),
        date_modified=git_lastmod(source_path),
        person_id=PERSON_ID,
        default_image_url=DEFAULT_SOCIAL_IMAGE_URL,
        base_path="../..",
        section_path="..",
        toc_enabled=True,
        has_math=has_math,
        has_mermaid=has_mermaid,
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
        html_content = md_to_html(body, md_file)
        output_filename = md_file.stem.lower() + ".html"
        output_path = output_pages_dir / output_filename
        canonical_url = f"{BASE_URL}/personal-wiki/pages/{output_filename}"
        rendered = render_wiki_note(
            template,
            title,
            html_content,
            output_path,
            canonical_url,
            md_file,
            has_math=html_uses_mathjax(html_content),
            has_mermaid=html_uses_mermaid(html_content),
        )
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
        page_title="PERSONAL WIKI",
        document_title="PERSONAL WIKI",
        canonical_url=f"{BASE_URL}/personal-wiki/",
        base_path="..",
        section_path=".",
        route_script="./script.js",
    )
    (output_dir / "personal-wiki" / "index.html").write_text(index_html, encoding="utf-8")
    print(f"  wiki: generated dist/personal-wiki/index.html ({len(notes_info)} notes)")

    urls = [
        {
            "loc": f"{BASE_URL}/personal-wiki/",
            "priority": "0.8",
            "changefreq": "weekly",
            "source_path": [ROOT / "templates" / "wiki-index.html", *(note["source_path"] for note in notes_info)],
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

        canonical_url = f"{BASE_URL}/blog/posts/{output_filename}"
        html_content = md_to_html(content, md_file)
        rendered = template.render(
            content=html_content,
            base_path="../..",
            section_path="..",
            toc_enabled=True,
            has_mermaid=html_uses_mermaid(html_content),
            meta_description=meta_description,
            og_title=og_title,
            og_type="article",
            page_title=browser_title(title),
            document_title="BLOG",
            canonical_url=canonical_url,
            date_published=parse_date_to_iso(date),
            date_modified=git_lastmod(md_file),
            person_id=PERSON_ID,
            default_image_url=DEFAULT_SOCIAL_IMAGE_URL,
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
        page_title="BLOG",
        document_title="BLOG",
        canonical_url=f"{BASE_URL}/blog/",
        base_path="..",
        section_path=".",
        route_script="./script.js",
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
            "source_path": [ROOT / "templates" / "blog-index.html", *(post["source_path"] for post in all_posts)],
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


def git_lastmod(source_path: Path | list[Path] | tuple[Path, ...] | None) -> str:
    """Get the latest meaningful modified date for one or more source paths."""
    if source_path is None:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")

    if isinstance(source_path, (list, tuple, set)):
        source_paths = list(source_path)
    else:
        source_paths = [source_path]

    latest: datetime | None = None
    for path in source_paths:
        if not path or not path.exists():
            continue

        path_latest = None
        try:
            result = subprocess.run(
                ["git", "log", "-1", "--format=%aI", "--", str(path)],
                capture_output=True,
                text=True,
                cwd=ROOT,
                check=False,
            )
            if result.stdout.strip():
                path_latest = datetime.fromisoformat(result.stdout.strip().replace("Z", "+00:00"))
        except Exception:
            path_latest = None

        if path_latest is None:
            path_latest = datetime.fromtimestamp(path.stat().st_mtime, timezone.utc)

        if latest is None or path_latest > latest:
            latest = path_latest

    if latest is None:
        return datetime.now(timezone.utc).strftime("%Y-%m-%d")
    return latest.date().isoformat()


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


WORK_SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def parse_work_markdown(md_file: Path) -> tuple[dict | None, list[str]]:
    raw = md_file.read_text(encoding="utf-8")
    meta, content = parse_frontmatter(raw)
    errors = []

    if "__yaml_error__" in meta:
        return None, [f"{md_file}: invalid YAML in frontmatter: {meta['__yaml_error__']}"]
    if "__fm_error__" in meta:
        return None, [f"{md_file}: {meta['__fm_error__']}"]

    slug = str(meta.get("slug") or md_file.stem).strip().lower()
    if not WORK_SLUG_RE.fullmatch(slug):
        errors.append(f"{md_file}: slug must use lowercase letters, numbers, and hyphens")

    for field in ("title", "date", "summary"):
        if not str(meta.get(field, "")).strip():
            errors.append(f"{md_file}: missing required field '{field}'")

    order_raw = meta.get("order", 9999)
    try:
        order = int(order_raw)
    except (TypeError, ValueError):
        errors.append(f"{md_file}: order must be an integer")
        order = 9999

    if errors:
        return None, errors

    return (
        {
            "slug": slug,
            "title": str(meta["title"]).strip(),
            "date": str(meta["date"]).strip(),
            "summary": str(meta["summary"]).strip(),
            "href": str(meta.get("href", "")).strip(),
            "order": order,
            "content": content.strip(),
            "source_path": md_file,
        },
        [],
    )


def load_work_entries() -> tuple[list[dict], list[str]]:
    if not WORKS_SOURCE_DIR.exists():
        print("warn: works/ not found, skipping work writeups")
        return [], []

    md_files = [path for path in sorted(WORKS_SOURCE_DIR.glob("*.md")) if not path.name.startswith(".")]
    print(f"work: found {len(md_files)} markdown writeups")

    works = []
    validation_errors = []
    seen_slugs = set()

    for md_file in md_files:
        work, errors = parse_work_markdown(md_file)
        validation_errors.extend(errors)
        if errors or work is None:
            continue

        if work["slug"] in seen_slugs:
            validation_errors.append(f"{md_file}: duplicate work slug '{work['slug']}'")
            continue

        seen_slugs.add(work["slug"])
        works.append(work)

    works.sort(key=lambda item: (item["order"], item["slug"]))
    return works, validation_errors


def render_home_works_section(works: list[dict]) -> str:
    work_items = []
    for work in works:
        slug = html.escape(work["slug"], quote=True)
        summary = html.escape(work["summary"], quote=True)
        work_items.append(
            f"""          <div class="grid-item-1">
            <h3><a href="/work/{slug}.html">{slug}</a></h3>
            <p>{summary}</p>
          </div>"""
        )

    return f"""      <section class="works">
        <h2>Works</h2>
          <div class="grid-container">

{chr(10).join(work_items)}

        </div>
        <div class="grid-item-3">
          <h3><a href="https://github.com/gongahkia" id="contrib-title">GitHub contributions (past year)</a></h3>
          <div id="github-contrib-calendar" class="contrib-wrapper" aria-label="GitHub contributions calendar" role="img"></div>
          <div id="contrib-legend-container"></div>
        </div>
      </section>"""


def inject_home_works(output_dir: Path, works: list[dict]) -> None:
    if not works:
        return

    index_path = output_dir / "index.html"
    source = index_path.read_text(encoding="utf-8")
    marker = "    <!-- build:works -->"
    if marker not in source:
        raise ValueError("could not locate homepage works marker for generated work grid")

    updated = source.replace(marker, render_home_works_section(works), 1)
    index_path.write_text(updated, encoding="utf-8")


def build_work(output_dir: Path) -> tuple[list[dict], list[str], list[dict]]:
    """Build work detail pages from works/*.md."""
    output_pages_dir = output_dir / "work"
    output_pages_dir.mkdir(parents=True, exist_ok=True)

    works, validation_errors = load_work_entries()

    detail_template = env.get_template("work-detail.html")
    urls = []

    for work in works:
        slug = work["slug"]
        title = work["title"]
        summary = work["summary"]
        date = work["date"]
        href = work["href"]
        source_path = work["source_path"]
        content = md_to_html(work["content"], source_path)
        output_filename = f"{slug}.html"
        canonical_url = f"{BASE_URL}/work/{output_filename}"
        rendered = detail_template.render(
            title=title,
            summary=summary,
            date=date,
            href=href,
            content=content,
            meta_description=f"Work: {title} - {summary} - Gabriel Ong",
            og_title=f"{title} | Gabriel Ong",
            og_type="article",
            page_title=browser_title(title),
            document_title="GABRIEL ONG",
            canonical_url=canonical_url,
            date_published=parse_date_to_iso(date),
            date_modified=git_lastmod(source_path),
            person_id=PERSON_ID,
            default_image_url=DEFAULT_SOCIAL_IMAGE_URL,
            base_path="..",
            section_path="..",
            toc_enabled=True,
            has_mermaid=html_uses_mermaid(content),
        )

        (output_pages_dir / output_filename).write_text(rendered, encoding="utf-8")
        print(f"  work: {slug} -> dist/work/{output_filename}")
        urls.append(
            {
                "loc": canonical_url,
                "priority": "0.7",
                "changefreq": "monthly",
                "source_path": source_path,
            }
        )

    if validation_errors:
        print("\nwork frontmatter validation errors:")
        for error in validation_errors:
            print(f"  {error}")

    return urls, validation_errors, works


def build_papers(output_dir: Path) -> tuple[list[dict], list[str]]:
    """Build paper detail pages and index into the output directory."""
    sources_dir = ROOT / "papers" / "sources"
    output_pages_dir = output_dir / "papers" / "pages"
    output_pages_dir.mkdir(parents=True, exist_ok=True)

    md_files = []
    if sources_dir.exists():
        md_files = [path for path in sorted(sources_dir.glob("*.md")) if not path.name.startswith(".")]

    print(f"papers: found {len(md_files)} markdown papers")

    detail_template = env.get_template("paper-detail.html")
    papers_info = []
    validation_errors = []

    for md_file in md_files:
        raw = md_file.read_text(encoding="utf-8")
        meta, content = parse_frontmatter(raw)
        meta["type"] = "paper" # force type for validation
        errors = validate_frontmatter(meta, md_file)
        validation_errors.extend(errors)
        if errors:
            continue

        title = str(meta["title"])
        date = str(meta["date"])
        authors = str(meta.get("authors", ""))
        source = str(meta.get("source", "arxiv")).lower() # default arxiv for back-compat
        arxiv = str(meta.get("arxiv", ""))
        arxiv_id = str(meta.get("arxiv_id", ""))
        arxiv_category = str(meta.get("arxiv_category", ""))
        zenodo = str(meta.get("zenodo", ""))
        doi = str(meta.get("doi", ""))
        resource_type = str(meta.get("resource_type", ""))
        version = str(meta.get("version", ""))
        license_ = str(meta.get("license", ""))
        github = str(meta.get("github", ""))
        output_filename = md_file.stem.lower() + ".html"
        canonical_url = f"{BASE_URL}/papers/pages/{output_filename}"

        html_content = md_to_html(content, md_file)
        rendered = detail_template.render(
            title=title,
            date=date,
            authors=authors,
            source=source,
            arxiv=arxiv,
            arxiv_id=arxiv_id,
            arxiv_category=arxiv_category,
            zenodo=zenodo,
            doi=doi,
            resource_type=resource_type,
            version=version,
            license=license_,
            github=github,
            content=html_content,
            meta_description=f"Paper: {title} - Gabriel Ong",
            og_title=f"{title} | Gabriel Ong",
            og_type="article",
            page_title=paper_browser_title(title),
            document_title="PAPERS",
            canonical_url=canonical_url,
            date_published=parse_date_to_iso(date),
            date_modified=git_lastmod(md_file),
            person_id=PERSON_ID,
            default_image_url=DEFAULT_SOCIAL_IMAGE_URL,
            base_path="../..",
            section_path="..",
            toc_enabled=True,
            has_math=html_uses_mathjax(html_content),
            has_mermaid=html_uses_mermaid(html_content),
        )

        output_path = output_pages_dir / output_filename
        output_path.write_text(rendered, encoding="utf-8")
        print(f"  papers: {md_file.name} -> dist/papers/pages/{output_filename}")

        papers_info.append({
            "title": title,
            "date": date,
            "authors": authors,
            "source": source,
            "arxiv": arxiv,
            "arxiv_id": arxiv_id,
            "arxiv_category": arxiv_category,
            "zenodo": zenodo,
            "doi": doi,
            "resource_type": resource_type,
            "version": version,
            "license": license_,
            "github": github,
            "filename": output_filename,
            "source_path": md_file,
            "canonical_url": canonical_url,
        })

    def parse_date(date_value: str) -> datetime:
        for fmt in ("%d %b %Y", "%Y-%m-%d", "%d %B %Y"):
            try:
                return datetime.strptime(date_value, fmt)
            except (TypeError, ValueError):
                continue
        return datetime.min

    papers_info.sort(key=lambda paper: parse_date(paper.get("date", "")), reverse=True)

    index_template = env.get_template("papers-index.html")
    index_html = index_template.render(
        papers=papers_info,
        meta_description="Gabriel Ong's research papers published.",
        og_title="Papers | Gabriel Ong",
        og_type="website",
        page_title="PAPERS",
        document_title="PAPERS",
        canonical_url=f"{BASE_URL}/papers/",
        base_path="..",
        section_path=".",
    )
    (output_dir / "papers" / "index.html").write_text(index_html, encoding="utf-8")
    print(f"  papers: generated dist/papers/index.html ({len(papers_info)} papers)")

    if validation_errors:
        print("\npapers frontmatter validation errors:")
        for error in validation_errors:
            print(f"  {error}")

    urls = [
        {
            "loc": f"{BASE_URL}/papers/",
            "priority": "0.8",
            "changefreq": "weekly",
            "source_path": [ROOT / "templates" / "papers-index.html", *(paper["source_path"] for paper in papers_info)],
        }
    ]
    urls.extend(
        {
            "loc": paper["canonical_url"],
            "priority": "0.7",
            "changefreq": "monthly",
            "source_path": paper["source_path"],
        }
        for paper in papers_info
    )
    return urls, validation_errors


def build_site(output_dir: Path) -> list[str]:
    print("=== building gabrielongzm.com ===\n")
    print(f"output: {output_dir}")

    print("\n[0/5] checking markdown images...")
    markdown_images = markdown_image_sources()
    image_errors = validate_markdown_images(markdown_images)
    if image_errors:
        print("\nimage validation errors:")
        for error in image_errors:
            print(f"  {error}")
        return image_errors
    print(f"  images: checked {len(markdown_images)} markdown image(s)")

    ensure_clean_output_dir(output_dir)
    copy_static_site(output_dir)

    print("\n[1/5] building work writeups...")
    work_urls, errors, works = build_work(output_dir)
    inject_home_works(output_dir, works)

    all_urls = [
        {
            "loc": BASE_URL + "/",
            "priority": "1.0",
            "changefreq": "weekly",
            "source_path": [ROOT / "index.html", *(work["source_path"] for work in works)],
        }
    ]
    all_urls.extend(work_urls)

    print("\n[2/5] building wiki...")
    all_urls.extend(build_wiki(output_dir))

    print("\n[3/5] building blog...")
    blog_urls, blog_errors = build_blog(output_dir)
    all_urls.extend(blog_urls)
    errors.extend(blog_errors)

    print("\n[4/5] building papers...")
    paper_urls, paper_errors = build_papers(output_dir)
    all_urls.extend(paper_urls)
    errors.extend(paper_errors)

    print("\n[5/5] generating sitemap...")
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
        print(f"\nerror: {len(errors)} build validation error(s)")
        sys.exit(1)


if __name__ == "__main__":
    main()
