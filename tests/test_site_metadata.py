import unittest

from build import env, page_context
from site_validation import validate_page


class SiteMetadataTests(unittest.TestCase):
    def setUp(self):
        self.url = "https://gabrielongzm.com/blog/posts/fixture.html"
        self.source = env.get_template("blog-post.html").render(
            title="Fixture", date="1 Oct 2026", post_type="blog", content="Fixture content",
            **page_context(
                "FIXTURE", "../..", route="/blog/posts/fixture.html",
                meta_description="A fixture post.", og_title="Fixture", og_type="article",
                date_published="2026-10-01", date_modified="2026-10-31",
            ),
        )

    def test_production_template_preserves_article_discovery(self):
        validate_page(self.source, self.url)

    def test_rejects_preview_noindex(self):
        source = self.source.replace('content="index, follow"', 'content="noindex, nofollow"')
        with self.assertRaisesRegex(ValueError, "not indexable"):
            validate_page(source, self.url)

    def test_rejects_wrong_canonical(self):
        with self.assertRaisesRegex(ValueError, "canonical URL"):
            validate_page(self.source, self.url + "-wrong")

    def test_rejects_missing_social_preview(self):
        source = self.source.replace('property="og:image"', 'property="unused:image"')
        with self.assertRaisesRegex(ValueError, "og:image"):
            validate_page(source, self.url)

    def test_rejects_missing_structured_data(self):
        source = self.source.replace('type="application/ld+json"', 'type="text/plain"')
        with self.assertRaisesRegex(ValueError, "structured data"):
            validate_page(source, self.url)

    def test_rejects_lost_article_dates(self):
        source = self.source.replace('"datePublished": "2026-10-01"', '"datePublished": null')
        with self.assertRaisesRegex(ValueError, "author or dates"):
            validate_page(source, self.url)

    def test_rejects_dark_favicon(self):
        source = self.source.replace("favicon.svg?v=11-light", "favicon-dark.svg")
        with self.assertRaisesRegex(ValueError, "fixed light icon"):
            validate_page(source, self.url)


if __name__ == "__main__":
    unittest.main()
