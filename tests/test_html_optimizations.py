import unittest

from html_optimizations import optimize_html


URL = "https://gabrielongzm.com/personal-wiki/pages/note.html"


class HtmlOptimizationTests(unittest.TestCase):
    def test_only_unstyled_code_name_spans_are_removed(self):
        source = ('<span class="n">prose</span><div class="codehilite"><pre><code>'
                  '<span class="n">a &lt; b</span>\n  <span class="k">return</span> '
                  '<span class="nf">func</span><span class="n" id="keep">x</span>'
                  '</code></pre></div>')
        expected = source.replace('<span class="n">a &lt; b</span>', 'a &lt; b')
        self.assertEqual(optimize_html(source, URL), expected)

    def test_heading_ids_follow_existing_slug_and_collision_rules(self):
        source = ('<body data-heading-anchors><h1 data-toc>Title</h1><section class="prose">'
                  '<h2>A <code>&amp;</code> B!</h2><h3>A B</h3><h2 id="a-b">Reserved</h2>'
                  '<h2 data-toc-ignore>Ignored</h2><h2>日本語</h2><h2> </h2><h2></h2>'
                  '<h4 data-toc-title="Alias">Real title</h4></section>'
                  '<h2>Outside prose</h2><div id="title"></div></body>')
        result = optimize_html(source, URL)
        self.assertIn('<h1 data-toc id="title-2">', result)
        self.assertIn('<h2 id="a-b-2">', result)
        self.assertIn('<h3 id="a-b-3">', result)
        self.assertIn('<h2 id="toc-heading-4">日本語', result)
        self.assertIn('<h2> </h2>', result)
        self.assertIn('<h2 id="section"></h2>', result)
        self.assertIn('data-toc-title="Alias" id="alias"', result)
        self.assertIn('<h2>Outside prose</h2>', result)
        self.assertEqual(optimize_html(result, URL), result)

    def test_headings_are_unchanged_when_anchors_are_disabled(self):
        source = '<section class="prose"><h2>Title</h2></section>'
        self.assertEqual(optimize_html(source, URL), source)

    def test_external_markers_use_production_origin_and_preserve_urls(self):
        for href, external in [
            ("https://example.com?a=1&amp;b=2", True),
            ("//EXAMPLE.com/path", True),
            ("http://gabrielongzm.com/", True),
            ("https://gabrielongzm.com:443/work/", False),
            ("https://gabrielongzm.com:0/work/", True),
            ("../../work/", False), ("#section", False),
            ("mailto:user@example.com", False), ("tel:+12345", False),
        ]:
            with self.subTest(href=href):
                source = f'<a href="{href}">Link</a>'
                result = optimize_html(source, URL)
                self.assertEqual('data-external=""' in result, external)
                self.assertIn(f'href="{href}"', result)
                self.assertEqual(optimize_html(result, URL), result)

    def test_empty_ids_and_stale_external_markers_are_corrected(self):
        source = ('<body data-heading-anchors><h2 data-toc id="">Title</h2>'
                  '<a data-external href="/work/">Work</a></body>')
        result = optimize_html(source, URL)
        self.assertIn('id="title"', result)
        self.assertNotIn('id=""', result)
        self.assertNotIn('data-external', result)

    def test_unrelated_markup_and_script_bytes_are_preserved(self):
        source = ('<!doctype html><script>const html = "<h2>raw</h2>";</script>'
                  '<!-- comment --><img src="photo.png"/><p>&copy; &amp; A</p>')
        self.assertEqual(optimize_html(source, URL), source)


if __name__ == "__main__":
    unittest.main()
