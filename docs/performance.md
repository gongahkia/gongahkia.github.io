# v11 performance findings — 2 November 2026

## Implemented

The initial pass replaced full TTF/OTF downloads with equivalent WOFF2 fonts, embedded the small hover underline SVGs in the generated stylesheet, and deferred the main site script. Font character maps and metrics were preserved. Homepage font downloads fell from 869,100 to 320,340 bytes; the sampled wiki page's site fonts fell from 406,704 to 188,092 bytes. First hover no longer fetches a separate underline image.

The next pass moved MathJax into the build. The current corpus has 40 equations, all on `personal-wiki/pages/datastructuresandalgorithms.html`. Future math in work, writing, and wiki pages follows the same build stage. The browser no longer downloads or executes MathJax. The engine remains MathJax 3.2.2 with CommonHTML and its original TeX fonts; this is not a switch to a different equation renderer.

The generated shared math stylesheet is 10,325 bytes. Browsers fetch only the math font files actually used. The deployment includes no MathJax JavaScript. Other long wiki pages without equations do not benefit directly from this particular change.

## Measurement

Compared the previous optimized build (runtime MathJax) with static math in headless Google Chrome at 1440 × 1000, with 6× CPU throttling, 150 ms network latency, 375,000 bytes/s download throughput, and cache disabled. Three alternating before/after runs used separate browser contexts. This is a local laboratory comparison, not a measurement of the user's older laptop or live hosting.

| Data Structures and Algorithms | Runtime math | Static math |
| --- | ---: | ---: |
| JavaScript response bodies, decoded | 1,167,747 B | 6,758 B |
| MathJax script evaluation, median | 1,022 ms | 0 ms |
| Load-observation blocking time, median | 1,218 ms | 524 ms |
| Load-observation blocking time, range | 1,108–1,264 ms | 389–1,941 ms |
| First contentful paint, median | 808 ms | 1,036 ms |

Blocking time here sums `max(longTask.duration - 50 ms, 0)` until page resources and fonts finish loading; it is not Lighthouse's TBT metric. The static build had one noisy run on the shared machine. The reliable conclusion is removal of 1,160,989 bytes of renderer JavaScript and its approximately one-second evaluation task. These results do not establish a universal page-load speedup; static equations also add HTML, and CSS/font loading and document layout still take time.

Visual/functional checks:

- All 40 equations have identical MathML before and after, at widths 390, 768, and 1440 px.
- All direct article blocks retain the same positions and heights. Maximum equation-width difference was 0.15625 px on mobile and 0.015625 px at the other widths, from font-size rounding.
- Equations and local math fonts render in mobile emulation with JavaScript disabled. No failed resource requests or browser exceptions were observed.
- Homepage HTML is byte-for-byte unchanged by the math pass.
- Regression tests cover inline/display math, fractions and roots, shared CSS/fonts, accessibility markup, literal math inside code, page-scoped macros, forward references, failed TeX, missing dependencies, and repeat processing.

## Remaining costs and priorities

1. **Reduce unnecessary syntax-highlighting elements.** The DSA page still has 13,860 elements and 379,962 bytes of HTML. It contains 2,424 `<span class="n">` wrappers whose class has no dedicated styling in the current stylesheet. Removing those wrappers during highlighting could eliminate about 17.5% of the page's elements while preserving the code's text and colors. Validate text selection, whitespace, and computed syntax styles before implementing. Other large pages include Japanese (5,999 elements), Red Teaming LLMs (5,487), and PyTorch (5,177).

2. **Reduce offscreen layout work on long articles.** Static-math load traces still spent 666–1,318 ms in layout across all layout events; individual layout events reached 174–579 ms. Experiment with `content-visibility: auto` on suitably sized code blocks or article sections. This needs careful tests of deep links, browser find, printing, selection, accessibility, and scroll stability before shipping; applying it blindly to the whole article could introduce visible jumps.

3. **Optimize the remaining font downloads.** Homepage Inter regular/semibold files total 220,416 bytes; the wiki UI's variable Zalando Sans font is 126,400 bytes. Consider Unicode-range subsets with complete fallback coverage, then measure preload choices for the fonts required above the fold. Preserve the wiki's multilingual content and font metrics; do not simply discard non-Latin glyphs.

4. **Generate heading IDs and external-link markers during the build.** `site.js` currently creates heading IDs and loops over links on DOMContentLoaded. Moving these annotations into generated HTML would avoid that startup DOM work and make fragment navigation work without JavaScript. Preserve the current slug rules, duplicate-heading suffixes, and existing fragment URLs. This is smaller than the layout work: sampled load traces spent around 24–31 ms in the largest site-script callback at 6× CPU throttling.

5. **Reserve image space using intrinsic dimensions.** The generated site has 15 image tags, none with both width and height metadata; eight already use lazy loading. Extract dimensions for local images/GIFs at build time to reduce layout shifts while retaining normal centered, responsive images. Profile image-heavy pages separately before changing download formats or loading priority.

Mermaid is already loaded on demand when diagrams approach the viewport. Its renderer and the work it does on diagram-heavy pages should be profiled separately; the DSA page contains no Mermaid diagrams.

## Hover findings

After loading settled, hovered four real links three times each on the homepage, DSA, and Japanese pages at 6× CPU throttling. Largest observed hover-related trace events:

| Page | Style recalculation | Paint | Layout |
| --- | ---: | ---: | ---: |
| Homepage | 2.33 ms | 5.71 ms | 1.19 ms |
| DSA | 1.53 ms | 9.44 ms | 0.05 ms |
| Japanese | 1.41 ms | 6.38 ms | 1.78 ms |

These are individual trace-event maxima, not complete input-to-display latency measurements. The sample does not reproduce a large steady-state hover bottleneck. Loading-time main-thread tasks remain a plausible cause of temporarily delayed cursor feedback. Retain the existing cursor, hover decorations, and wave interaction while optimizing that work; retest on the affected physical laptop if lag persists after loading settles.

To repeat the comparison, serve before/after build directories locally, use fresh Chrome contexts with the settings above, and capture Performance traces from navigation through font/math readiness. Check network script sizes and `EvaluateScript` events separately from FCP, layout, and paint. For hover, wait until fonts/resources settle, scroll each target into view before recording, then move in/out of the same real links. Do not benchmark builds or browser variants concurrently.

MathJax references: [Node integration](https://docs.mathjax.org/en/v3.2/server/direct.html) and [CommonHTML adaptive CSS and fonts](https://docs.mathjax.org/en/v3.2/options/output/chtml.html).
