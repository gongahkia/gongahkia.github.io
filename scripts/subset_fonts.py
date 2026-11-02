#!/usr/bin/env python3
"""Generate Latin WOFF2 faces; full fonts remain available for every other glyph.

Run: uv run --with 'fonttools[woff]' python scripts/subset_fonts.py
FontTools is not needed by the site build. Keep hinting, variation axes, shaping
features, and metrics; change only the glyph coverage of the additional faces.
"""

from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parents[1]
UNICODE_RANGE = (
    "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0300-036F,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,"
    "U+2212,U+2215,U+FEFF,U+FFFD"
)
FACES = [
    ("inter-400", "Inter", "400", ""),
    ("inter-600", "Inter", "600", ""),
    ("zalando-sans", '"Zalando Sans"', "200 900", "font-stretch:75% 125%;"),
]


def unicode_ranges(codepoints):
    """Describe actual coverage so missing CJK glyphs don't fetch a Latin font."""
    ranges = []
    for codepoint in sorted(codepoints):
        if ranges and codepoint == ranges[-1][1] + 1:
            ranges[-1][1] = codepoint
        else:
            ranges.append([codepoint, codepoint])
    return ",".join(f"U+{start:X}" + (f"-{end:X}" if end != start else "")
                    for start, end in ranges)


def main():
    target = ROOT / "fonts/latin"
    target.mkdir(exist_ok=True)
    css = []
    for stem, family, weight, stretch in FACES:
        options = subset.Options()
        options.layout_features = ["*"]
        options.glyph_names = True
        options.notdef_outline = True
        options.recommended_glyphs = True
        options.recalc_timestamp = False
        with TTFont(ROOT / f"fonts/{stem}.ttf", recalcTimestamp=False) as font:
            original = font.getBestCmap().copy()
            metrics = font["hmtx"].metrics.copy()
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(unicodes=subset.parse_unicodes(UNICODE_RANGE))
            subsetter.subset(font)
            for codepoint, glyph in font.getBestCmap().items():
                assert original[codepoint] == glyph
                assert font["hmtx"].metrics[glyph] == metrics[glyph]
            font.flavor = "woff2"
            font.save(target / f"{stem}.woff2")
        css.append(f'@font-face{{font-family:{family};src:url("fonts/{stem}.woff2") '
                   f'format("woff2");font-weight:{weight};{stretch}font-display:swap;'
                   f'unicode-range:{unicode_ranges(original)};}}')
        css.append(f'@font-face{{font-family:{family};src:url("fonts/latin/{stem}.woff2") '
                   f'format("woff2");font-weight:{weight};{stretch}font-display:swap;'
                   f'unicode-range:{UNICODE_RANGE};}}')
        print(f"{stem}: {(target / f'{stem}.woff2').stat().st_size:,} bytes")
    # The later Latin face takes precedence; the full face has exact coverage.
    (target / "faces.css").write_text("\n".join(css) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
