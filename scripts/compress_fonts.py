#!/usr/bin/env python3
"""Regenerate lossless WOFF2 copies of the bundled fonts (no glyph subsetting).

Run: uv run --with 'fonttools[woff]' python scripts/compress_fonts.py
The site build uses the checked-in files and does not need fontTools.
"""

from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]


def main():
    fonts = ROOT / "fonts"
    sources = sorted(fonts.glob("*.ttf")) + sorted((fonts / "tiempos").glob("*.otf"))
    for source in sources:
        if source.suffix == ".otf":
            filename = source.stem.removeprefix("Test").replace("-", "Web-", 1) + ".woff2"
            target = source.with_name(filename)
        else:
            target = source.with_suffix(".woff2")
        with TTFont(source) as font:
            font.flavor = "woff2"
            font.save(target)
        print(f"{target.relative_to(ROOT)}: {source.stat().st_size:,} → {target.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
