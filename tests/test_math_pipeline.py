import re
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from content_pipeline import md_to_html
from math_pipeline import CSS_MARKER, render_static_math


class StaticMathTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.output = Path(self.temporary.name)

    def tearDown(self):
        self.temporary.cleanup()

    def page(self, path, markdown):
        target = self.output / path
        target.parent.mkdir(parents=True, exist_ok=True)
        prose = md_to_html(markdown)
        target.write_text(f'<!doctype html><html><head>{CSS_MARKER}</head>'
                          f'<body><p id="untouched">A &amp; B</p>{prose}</body></html>')
        return target

    def test_static_inline_display_accessibility_and_local_assets(self):
        inline = self.page("blog/posts/math.html", r"Inline $a < b$ and $O(n^2)$.")
        display = self.page("personal-wiki/pages/math.html", r"$$\frac{1}{\sqrt{2}}$$")
        self.assertEqual(render_static_math(self.output), (2, 3))
        for target, count in ((inline, 2), (display, 1)):
            html = target.read_text()
            self.assertEqual(html.count('<mjx-container '), count)
            self.assertEqual(html.count('<mjx-assistive-mml '), count)
            self.assertIn('aria-hidden="true"', html)
            self.assertNotIn(CSS_MARKER, html)
            self.assertNotIn('<script', html)
            self.assertIn('<p id="untouched">A &amp; B</p>', html)
            self.assertNotRegex(html, r'\\[\[(]')
            css_path = target.parent / re.search(r'href="([^"]+)"', html)[1]
            self.assertTrue(css_path.is_file())
            css = css_path.read_text()
            self.assertIn('mjx-assistive-mml', css)
            # Shared stylesheet covers both earlier and later pages' glyphs.
            self.assertIn('mjx-c1D44E', css)  # italic a
            self.assertIn('mjx-msqrt', css)
            for url in re.findall(r'url\("([^"]+)"\)', css):
                self.assertTrue((css_path.parent / url).is_file(), url)
        self.assertIn('display="true"', display.read_text())
        # Running the stage again does not double-typeset anything.
        original = inline.read_bytes()
        self.assertEqual(render_static_math(self.output), (0, 0))
        self.assertEqual(inline.read_bytes(), original)

    def test_code_is_not_typeset_and_non_math_pages_are_untouched(self):
        target = self.page("code.html", '```tex\n$x^2$\n\\[x\\]\n```')
        plain = self.output / "plain.html"
        plain.write_text("<p>Plain &amp; unchanged</p>")
        with patch('math_pipeline.subprocess.run') as run:
            self.assertEqual(render_static_math(self.output), (0, 0))
            run.assert_not_called()
        self.assertNotIn('mjx-container', target.read_text())
        self.assertIn('$x^2$', re.sub('<[^>]+>', '', target.read_text()))
        self.assertEqual(plain.read_text(), "<p>Plain &amp; unchanged</p>")

    def test_macros_and_forward_references_share_a_page_but_not_other_pages(self):
        a = self.page("a.html", r"$\newcommand{\sitevalue}{x}\sitevalue$ then $\sitevalue$.")
        b = self.page("b.html", r"$\newcommand{\sitevalue}{y}\sitevalue$.")
        c = self.page("c.html", r"$\ref{answer}$" + '\n\n' +
                      r"$$\begin{equation}\label{answer}x=1\tag{A}\end{equation}$$")
        self.assertEqual(render_static_math(self.output), (3, 5))
        self.assertEqual(a.read_text().count('<mi>x</mi>'), 2)
        self.assertIn('<mi>y</mi>', b.read_text())
        self.assertIn('href="#mjx-eqn%3Aanswer"', c.read_text())
        self.assertNotIn('???', c.read_text())

    def test_invalid_math_fails_with_page_and_tex_context(self):
        target = self.page("wiki/broken.html", r"$\notarealcommand{x}$")
        original = target.read_bytes()
        with self.assertRaisesRegex(RuntimeError, r'wiki/broken.html:.*notarealcommand'):
            render_static_math(self.output)
        self.assertEqual(target.read_bytes(), original)

    def test_macros_do_not_leak_between_pages(self):
        self.page("a.html", r"$\newcommand{\privatecommand}{x}\privatecommand$")
        self.page("b.html", r"$\privatecommand$")
        with self.assertRaisesRegex(RuntimeError, r'b.html:.*privatecommand'):
            render_static_math(self.output)

    def test_missing_build_dependency_has_actionable_error(self):
        self.page("math.html", "$x$")
        with patch('math_pipeline.shutil.which', return_value=None):
            with self.assertRaisesRegex(RuntimeError, r'Node.js 22\+ and npm ci'):
                render_static_math(self.output)


if __name__ == "__main__":
    unittest.main()
