import tempfile
import unittest
from pathlib import Path

from build import BASE_URL, build_portfolio, verify_build_output
from site_validation import PageMetadata, validate_page


class BuildOutputTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.output = Path(self.temporary.name)
        for relative_path in ("index.html", "CNAME", "robots.txt", "sitemap.xml"):
            target = self.output / relative_path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("<urlset>" if relative_path == "sitemap.xml" else "ok")

    def tearDown(self):
        self.temporary.cleanup()

    def test_accepts_pages_derived_from_current_content(self):
        generated_pages = {
            "work/index.html": [],
            "blog/posts/current-post.html": [],
            "personal-wiki/pages/current-note.html": [],
        }
        for relative_path in generated_pages:
            target = self.output / relative_path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("ok")

        verify_build_output(self.output, generated_pages)

    def test_reports_a_missing_current_content_page(self):
        with self.assertRaisesRegex(ValueError, r"work/index\.html"):
            verify_build_output(self.output, {"work/index.html": []})

    def test_portfolio_preserves_full_writeups_and_links_to_its_sections(self):
        source = self.output / "fixture.md"
        source.write_text("Introduction.\n\n## Details\n\nThe complete writeup.")
        pages = build_portfolio(self.output, [{
            "slug": "fixture", "title": "Fixture", "summary": "A project",
            "href": "https://github.com/example/fixture", "date": "2026",
            "content": source.read_text(), "source_path": source,
        }])
        self.assertEqual(set(pages), {"work/index.html"})
        self.assertEqual([path.name for path in (self.output / "work").glob("*.html")], ["index.html"])
        rendered = (self.output / "work/index.html").read_text()
        self.assertIn("<h2>Details</h2>", rendered)
        self.assertIn("The complete writeup.", rendered)
        self.assertIn('id="project-fixture"', rendered)
        collection = PageMetadata(rendered).schemas[0]
        self.assertEqual(collection["mainEntity"]["itemListElement"][0]["url"],
                         BASE_URL + "/work/#project-fixture")
        validate_page(rendered, BASE_URL + "/work/")


if __name__ == "__main__":
    unittest.main()
