// MathJax runs only in Node during the build. No renderer is shipped to browsers.
// Keep v3.2.2/CommonHTML to match the former tex-chtml.js browser output.
const fs = require('node:fs');
const { mathjax } = require('mathjax-full/js/mathjax.js');
const { TeX } = require('mathjax-full/js/input/tex.js');
const { CHTML } = require('mathjax-full/js/output/chtml.js');
const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
const { RegisterHTMLHandler } = require('mathjax-full/js/handlers/html.js');
const { AssistiveMmlHandler } = require('mathjax-full/js/a11y/assistive-mml.js');
const { AllPackages } = require('mathjax-full/js/input/tex/AllPackages.js');

const adaptor = liteAdaptor();
AssistiveMmlHandler(RegisterHTMLHandler(adaptor));
// Accumulate only the CSS/glyphs used across the site into one cacheable sheet.
const output = new CHTML({ fontURL: './fonts', adaptiveCSS: true });
// Extensions are available locally; invalid TeX must fail the build, not appear
// as a red error or silently fall back to browser-side rendering.
const packages = AllPackages.filter(name => !['noerrors', 'noundefined'].includes(name));

try {
  let lastDocument;
  const pages = JSON.parse(fs.readFileSync(0, 'utf8')).map(page => {
    try {
      // A fresh input jax isolates macros/labels between pages, while keeping
      // definitions and forward references shared by equations on the same page.
      const input = new TeX({
        packages,
        inlineMath: [['\\(', '\\)']],
        displayMath: [['\\[', '\\]']],
        formatError: (_jax, error) => { throw error; },
      });
      const document = mathjax.document(page.fragments.join('\n'), {
        InputJax: input,
        OutputJax: output,
        compileError: (_doc, math, error) => {
          throw new Error(`${error.message} in ${JSON.stringify(math.math)}`);
        },
        typesetError: (_doc, math, error) => {
          throw new Error(`${error.message} in ${JSON.stringify(math.math)}`);
        },
      });
      document.render();
      const math = Array.from(document.math);
      if (math.length !== page.fragments.length) {
        throw new Error(`Expected ${page.fragments.length} equations, rendered ${math.length}`);
      }
      for (const item of math) {
        // Match the surrounding font's x-height using CSS, even after web fonts
        // load or at mobile sizes. Node cannot measure the visitor's fonts.
        adaptor.setStyle(item.typesetRoot, 'fontSize', `${1 / output.font.params.x_height}ex`);
      }
      lastDocument = document;
      const fragments = adaptor.childNodes(adaptor.body(document.document))
        .filter(node => adaptor.kind(node) !== '#text')
        .map(node => adaptor.outerHTML(node));
      if (fragments.length !== page.fragments.length) throw new Error('Math wrapper count changed');
      return { path: page.path, fragments };
    } catch (error) {
      throw new Error(`${page.path}: ${error.message}`);
    }
  });
  const css = lastDocument ? adaptor.textContent(output.styleSheet(lastDocument)) : '';
  process.stdout.write(JSON.stringify({ pages, css }));
} catch (error) {
  console.error(`Static math rendering failed: ${error.message}`);
  process.exitCode = 1;
}
