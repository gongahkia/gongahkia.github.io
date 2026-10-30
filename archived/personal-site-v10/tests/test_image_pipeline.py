import tempfile
import unittest
from pathlib import Path
from unittest import mock

from PIL import Image, ImageDraw

import content_pipeline as pipeline


class ImagePipelineTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name).resolve()
        self.original_paths = (
            pipeline.ROOT,
            pipeline.DITHER_CACHE_DIR,
            pipeline.ASCII_ART_CACHE_DIR,
            pipeline.IMAGE_CACHE_DIR,
        )
        pipeline.ROOT = self.root
        pipeline.DITHER_CACHE_DIR = self.root / "effects"
        pipeline.ASCII_ART_CACHE_DIR = self.root / "ascii"
        pipeline.IMAGE_CACHE_DIR = self.root / "remote"
        self.source = self.root / "post.md"
        self.source.write_text("fixture", encoding="utf-8")

        image = Image.new("RGBA", (1200, 600), (245, 245, 245, 255))
        draw = ImageDraw.Draw(image)
        draw.rectangle((0, 0, 399, 599), fill=(190, 30, 45, 255))
        draw.rectangle((400, 0, 799, 599), fill=(30, 145, 85, 255))
        draw.rectangle((800, 0, 1199, 599), fill=(35, 80, 190, 255))
        draw.ellipse((450, 150, 750, 450), fill=(255, 220, 25, 180))
        self.fixture = self.root / "fixture.png"
        image.save(self.fixture)

    def tearDown(self):
        (
            pipeline.ROOT,
            pipeline.DITHER_CACHE_DIR,
            pipeline.ASCII_ART_CACHE_DIR,
            pipeline.IMAGE_CACHE_DIR,
        ) = self.original_paths
        self.temporary.cleanup()

    def test_no_directive_is_a_normal_lazy_image(self):
        html = pipeline.render_markdown_image(
            [("src", "https://invalid.example/animated.gif"), ("alt", "Demo")],
            self.source,
        )
        self.assertIn('src="https://invalid.example/animated.gif"', html)
        self.assertIn('class="markdown-image"', html)
        self.assertIn('loading="lazy"', html)
        self.assertIn('decoding="async"', html)
        with mock.patch.object(pipeline.urllib.request, "urlopen") as urlopen:
            errors = pipeline.validate_markdown_images(
                [(self.source, [("src", "https://invalid.example/animated.gif")])]
            )
        self.assertEqual(errors, [])
        urlopen.assert_not_called()

    def test_directives_are_order_independent_and_preserve_real_fragments(self):
        first = pipeline.parse_image_directive("image.png#ascii+palette")
        second = pipeline.parse_image_directive("image.png#palette+ascii")
        self.assertEqual((first.render_mode, first.color_mode), ("ascii", "palette"))
        self.assertEqual((second.render_mode, second.color_mode), ("ascii", "palette"))
        self.assertEqual(
            pipeline.parse_image_directive("sprite.svg#icon").clean_src,
            "sprite.svg#icon",
        )

    def test_invalid_directives_fail(self):
        for source in (
            "x#ascii+dither",
            "x#palette+tint",
            "x#dither=nope",
            "x#ascii+unknown",
        ):
            with self.subTest(source=source), self.assertRaises(ValueError):
                pipeline.parse_image_directive(source)

    def test_raster_effects_generate_responsive_variants_without_upscaling(self):
        for fragment in ("tint", "palette", "posterize", "dither", "dither=fs+palette"):
            with self.subTest(fragment=fragment):
                directive = pipeline.parse_image_directive(f"/fixture.png#{fragment}")
                variants = pipeline.image_src_to_effect_paths(directive, self.source)
                self.assertEqual([width for _, width, _ in variants], [550, 1100])
                for url, width, height in variants:
                    with Image.open(pipeline.DITHER_CACHE_DIR / Path(url).name) as rendered:
                        self.assertEqual(rendered.size, (width, height))

        small = Image.new("RGB", (320, 160), (40, 90, 180))
        small.save(self.root / "small.png")
        variants = pipeline.image_src_to_effect_paths(
            pipeline.parse_image_directive("/small.png#tint"), self.source
        )
        self.assertEqual([width for _, width, _ in variants], [320])

        html = pipeline.render_markdown_image(
            [("src", "/fixture.png#palette"), ("alt", "Fixture"), ("title", "Example")],
            self.source,
        )
        self.assertIn("srcset=", html)
        self.assertIn('sizes="(max-width: 602px) 90vw, 550px"', html)
        self.assertIn('alt="Fixture"', html)
        self.assertIn('title="Example"', html)

    def test_colored_ascii_stays_text(self):
        for fragment in ("ascii+tint", "ascii+palette", "ascii+posterize"):
            with self.subTest(fragment=fragment):
                result = pipeline.image_src_to_colored_frames(
                    pipeline.parse_image_directive(f"/fixture.png#{fragment}"), self.source
                )
                self.assertFalse(result["animated"])
                self.assertIn('<span style="color:#', result["frames_html"][0])

    def test_color_modes_preserve_detail_palette_limits_and_alpha(self):
        outputs = {}
        for mode in ("tint", "palette", "posterize"):
            variant = pipeline.image_src_to_effect_paths(
                pipeline.parse_image_directive(f"/fixture.png#{mode}"), self.source
            )[0]
            with Image.open(pipeline.DITHER_CACHE_DIR / Path(variant[0]).name) as rendered:
                outputs[mode] = rendered.convert("RGBA")
        self.assertGreater(len(outputs["tint"].convert("RGB").getcolors(550 * 275) or []), 3)
        self.assertGreater(len(outputs["palette"].convert("RGB").getcolors(550 * 275) or []), 3)
        self.assertLessEqual(len(outputs["posterize"].convert("RGB").getcolors(550 * 275) or []), 3)

        transparent = Image.new("RGBA", (300, 100), (220, 30, 80, 0))
        ImageDraw.Draw(transparent).rectangle((100, 0, 299, 99), fill=(20, 120, 210, 255))
        transparent.save(self.root / "transparent.png")
        variant = pipeline.image_src_to_effect_paths(
            pipeline.parse_image_directive("/transparent.png#palette"), self.source
        )[0]
        with Image.open(pipeline.DITHER_CACHE_DIR / Path(variant[0]).name) as rendered:
            alpha = rendered.convert("RGBA").getchannel("A")
            self.assertEqual(alpha.getextrema(), (0, 255))

    def test_plain_background_does_not_beat_a_salient_subject_color(self):
        image = Image.new("RGBA", (400, 300), (255, 255, 255, 255))
        ImageDraw.Draw(image).rectangle((120, 70, 280, 230), fill=(220, 170, 70, 255))
        dominant = pipeline.extract_salient_colors([image], 3)[0]
        self.assertGreater(dominant[0], dominant[2])
        self.assertLess(pipeline._rgb_luma(dominant), 0.95)

    def test_processed_animation_preserves_frames_timing_and_loop(self):
        frames = [
            Image.new("RGBA", (80, 40), color)
            for color in ((220, 30, 30, 255), (20, 80, 220, 255))
        ]
        frames[0].save(
            self.root / "animated.gif",
            save_all=True,
            append_images=frames[1:],
            duration=[120, 240],
            loop=2,
        )
        variants = pipeline.image_src_to_effect_paths(
            pipeline.parse_image_directive("/animated.gif#palette"), self.source
        )
        with Image.open(pipeline.DITHER_CACHE_DIR / Path(variants[-1][0]).name) as rendered:
            self.assertTrue(rendered.is_animated)
            self.assertEqual(rendered.n_frames, 2)
            self.assertEqual(rendered.info["loop"], 2)
            durations = []
            for frame in range(rendered.n_frames):
                rendered.seek(frame)
                durations.append(rendered.info["duration"])
            self.assertEqual(durations, [120, 240])

        for fragment in ("ascii", "ascii+palette"):
            with self.subTest(fragment=fragment), self.assertRaisesRegex(
                RuntimeError, "#ascii is only supported for still images"
            ):
                pipeline.render_markdown_image(
                    [("src", f"/animated.gif#{fragment}"), ("alt", "Demo")], self.source
                )

        with self.assertRaisesRegex(ValueError, "only supported for still images"):
            pipeline.image_src_to_frames("/animated.gif", self.source)


if __name__ == "__main__":
    unittest.main()
