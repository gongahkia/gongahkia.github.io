import tempfile
import unittest
from pathlib import Path

from build import verify_build_output


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
            "work/current-project.html": [],
            "blog/posts/current-post.html": [],
            "personal-wiki/pages/current-note.html": [],
        }
        for relative_path in generated_pages:
            target = self.output / relative_path
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text("ok")

        verify_build_output(self.output, generated_pages)

    def test_reports_a_missing_current_content_page(self):
        with self.assertRaisesRegex(ValueError, r"work/replaced-project\.html"):
            verify_build_output(self.output, {"work/replaced-project.html": []})


if __name__ == "__main__":
    unittest.main()
