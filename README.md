version [11](./archived) of my website

made with the following

![JavaScript](https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript)
![HTML](https://img.shields.io/badge/-HTML-000?&logo=html5)
![CSS](https://img.shields.io/badge/-CSS-000?&logo=css)
![Python](https://img.shields.io/badge/-Python-000?&logo=python)
![Jinja](https://img.shields.io/badge/-Jinja-000?&logo=jinja)
![Markdown](https://img.shields.io/badge/-Markdown-000?&logo=markdown)
![YAML](https://img.shields.io/badge/-YAML-000?&logo=yaml)
![MathJax](https://img.shields.io/badge/-MathJax-000?&logo=mathjax)
![Make](https://img.shields.io/badge/-Make-000?&logo=gnu)
![Mermaid](https://img.shields.io/badge/-Mermaid-000?&logo=mermaid)
![SVG](https://img.shields.io/badge/-SVG-000?&logo=svg)
![JSON-LD](https://img.shields.io/badge/-JSON--LD-000?&logo=json)
![GitHub Actions](https://img.shields.io/badge/-GitHub%20Actions-000?&logo=githubactions)
![GitHub Pages](https://img.shields.io/badge/-GitHub%20Pages-000?&logo=githubpages)

## Local build

Use Python 3.12 and Node.js 22 or newer:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
npm ci --ignore-scripts
make test
make build
python -m http.server 8000 --directory dist
```

GitHub Pages runs the same dependency installation, tests, and build. Deploy `dist/`, not the source tree.

## Equations

Write inline math as `$O(n)$` and display math as `$$...$$` in Markdown as before. The v11 build now renders it with the same MathJax 3.2.2 CommonHTML engine previously loaded in the browser. Node is a build dependency only; visitors download finished HTML, a shared stylesheet, and locally hosted math fonts. Non-math pages do not load those assets. Archived v10 is unchanged.

The build preserves screen-reader MathML and matches equation sizing to the surrounding font with CSS `ex` units. Math works without JavaScript. Macros and equation references share the page's context but do not leak into other pages. Invalid or unsupported TeX stops the build with the page and expression in the error message. MathJax's optional interactive settings/context menu is no longer loaded.

`math_pipeline.py` runs `scripts/render_math.cjs` once per site build, after Markdown pages are generated. The stylesheet contains only the rules/glyphs used by the site's equations and has a content-hashed filename. Common TeX extensions are bundled at build time; the renderer does not fetch extensions from a CDN. Keep the pinned renderer and its versioned asset path together when upgrading MathJax.

## Rendering optimizations

The build removes unstyled Pygments name spans, generates stable heading IDs and external-link cursor markers, and sets the current navigation section. Code text, syntax colors, existing fragment URLs, and the page layout are preserved. Heading links and active navigation also work without JavaScript.

Inter and Zalando Sans use smaller Latin WOFF2 faces, with the original fonts retained for other supported characters. Their CSS declares actual character coverage so unsupported scripts use system fallback fonts without downloading an unusable font. Regenerate these checked-in files with:

```sh
uv run --with 'fonttools[woff]' python scripts/subset_fonts.py
```

The DSA page now has 11,436 elements instead of 13,860. Homepage font downloads fall from 320,340 to 165,540 bytes compared with the previous WOFF2 build. Offscreen code rendering was tested but excluded because estimating hidden code-block heights introduced mobile scroll shifts; articles retain normal browser rendering.
