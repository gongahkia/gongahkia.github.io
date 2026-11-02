"""Replace Markdown math wrappers with static CommonHTML and assistive MathML."""

from __future__ import annotations

import hashlib
import json
import os
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CSS_MARKER = "<!-- build:math-css -->"
# These exact wrappers are emitted by pymdownx.arithmatex (generic=True).
# TeX inside them is HTML-escaped, so it cannot contain a closing HTML tag.
MATH_PATTERN = re.compile(r'<(span|div) class="arithmatex">.*?</\1>', re.DOTALL)
ASSET_PATH = Path("assets/mathjax/3.2.2")


def render_static_math(output: Path) -> tuple[int, int]:
    pages = []
    originals = {}
    for path in sorted(output.rglob("*.html")):
        source = path.read_text(encoding="utf-8")
        if CSS_MARKER not in source:
            continue
        fragments = [match[0] for match in MATH_PATTERN.finditer(source)]
        if not fragments:
            path.write_text(source.replace(CSS_MARKER, ""), encoding="utf-8")
            continue
        relative = path.relative_to(output).as_posix()
        originals[relative] = source
        pages.append({"path": relative, "fragments": fragments})
    if not pages:
        return 0, 0

    if not shutil.which("node") or not (ROOT / "node_modules/mathjax-full/package.json").is_file():
        raise RuntimeError("Static math requires Node.js 22+ and npm ci; see README.md.")
    result = subprocess.run(
        ["node", str(ROOT / "scripts/render_math.cjs")],
        input=json.dumps(pages), text=True, capture_output=True, cwd=ROOT, check=False,
    )
    if result.returncode:
        raise RuntimeError(result.stderr.strip() or "Static math rendering failed")
    rendered = json.loads(result.stdout)
    css = rendered["css"]
    digest = hashlib.sha256(css.encode()).hexdigest()[:12]
    assets = output / ASSET_PATH
    assets.mkdir(parents=True, exist_ok=True)
    css_path = assets / f"math-{digest}.css"
    css_path.write_text(css, encoding="utf-8")
    package = ROOT / "node_modules/mathjax-full"
    shutil.copytree(package / "es5/output/chtml/fonts/woff-v2", assets / "fonts", dirs_exist_ok=True)
    shutil.copy2(package / "LICENSE", assets / "LICENSE")

    for page in rendered["pages"]:
        path = output / page["path"]
        fragments = iter(page["fragments"])
        html = MATH_PATTERN.sub(lambda _: next(fragments), originals[page["path"]])
        href = Path(os.path.relpath(css_path, path.parent)).as_posix()
        html = html.replace(CSS_MARKER, f'<link rel="stylesheet" href="{href}">')
        path.write_text(html, encoding="utf-8")
    return len(pages), sum(len(page["fragments"]) for page in pages)
