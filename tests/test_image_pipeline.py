import tempfile
import unittest
from pathlib import Path
from unittest import mock

import content_pipeline as pipeline
from build import render_markdown


class ImagePipelineTests(unittest.TestCase):
    def setUp(self):
        self.source = Path('fixture.md')

    def render_image(self, markdown):
        rendered = render_markdown(markdown, self.source)
        parser = pipeline.MarkdownImageCollector()
        parser.feed(rendered)
        self.assertEqual(len(parser.images), 1)
        self.assertNotIn('<figure', rendered)
        return dict(parser.images[0])

    def test_images_and_gifs_keep_original_urls_without_fetching_or_decoding(self):
        with mock.patch('urllib.request.urlopen', side_effect=AssertionError('unexpected fetch')), mock.patch.object(
            pipeline.Image, 'open', side_effect=AssertionError('unexpected decoding')
        ):
            for extension in ('png', 'jpg', 'webp', 'gif', 'svg'):
                with self.subTest(extension=extension):
                    url = f'https://invalid.example/image.{extension}'
                    attrs = self.render_image(f'![An image]({url} "Original title")')
                    self.assertEqual(attrs['src'], url)
                    self.assertEqual(attrs['alt'], 'An image')
                    self.assertEqual(attrs['title'], 'Original title')
                    self.assertEqual(attrs['loading'], 'lazy')
                    self.assertEqual(attrs['decoding'], 'async')
                    self.assertEqual(attrs['class'], 'markdown-image')
                    self.assertNotIn('srcset', attrs)

    def test_url_fragments_are_preserved_without_interpreting_effects(self):
        for fragment in ('dither', 'ascii', 'tint', 'palette', 'posterize', 'ascii+palette',
                         'ascii+dither', 'dither=nope', 'icon'):
            with self.subTest(fragment=fragment):
                url = f'https://invalid.example/animated.gif#{fragment}'
                attrs = self.render_image(f'![]({url})')
                self.assertEqual(attrs['src'], url)
                self.assertEqual(attrs['alt'], '')

    def test_existing_html_image_attributes_are_preserved(self):
        attrs = self.render_image(
            '<img src="photo.png?a=1&amp;b=2" alt="A &amp; B" title="An &quot;image&quot;" '
            'class="example" loading="eager" decoding="sync" width="120" height="80">'
        )
        self.assertEqual(attrs['src'], 'photo.png?a=1&b=2')
        self.assertEqual(attrs['alt'], 'A & B')
        self.assertEqual(attrs['title'], 'An "image"')
        self.assertEqual(attrs['class'], 'example markdown-image')
        self.assertEqual(attrs['loading'], 'eager')
        self.assertEqual(attrs['decoding'], 'sync')
        self.assertEqual((attrs['width'], attrs['height']), ('120', '80'))

    def test_rejects_missing_image_source(self):
        with self.assertRaisesRegex(ValueError, 'missing image source'):
            render_markdown('<img alt="Missing">', self.source)

    def test_local_reference_validation_does_not_read_image_data(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary).resolve()
            image = root / 'image.gif'
            image.write_bytes(b'original image bytes')
            with mock.patch.object(pipeline, 'ROOT', root), mock.patch.object(
                pipeline.Image, 'open', side_effect=AssertionError('unexpected decoding')
            ):
                source = root / 'note.md'
                self.assertEqual(pipeline.validate_markdown_images([
                    (source, [('src', 'image.gif#ascii')]),
                    (source, [('src', 'https://invalid.example/image.gif#dither')]),
                ]), [])
                self.assertEqual(len(pipeline.validate_markdown_images([
                    (source, [('src', 'missing.gif')]),
                    (source, [('src', '../outside.gif')]),
                    (source, [('alt', 'Missing')]),
                ])), 3)
            self.assertEqual(image.read_bytes(), b'original image bytes')


if __name__ == '__main__':
    unittest.main()
