version [10](./archived) of my website

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

## Markdown images

Images without a directive render in their original format and scale down to the
available content width:

```md
![Alternative text](https://example.com/image.jpg)
```

Add an effect to the image URL fragment to process it at build time. Effects can
be combined in either order:

```md
![ASCII](image.jpg#ascii)
![Dithered](image.jpg#dither)
![Floyd-Steinberg](image.jpg#dither=fs)
![Dominant-color tint](image.jpg#tint)
![Smooth three-color palette](image.jpg#palette)
![Flat three-color posterization](image.jpg#posterize)
![Colored ASCII](image.jpg#ascii+palette)
![Colored dither](image.jpg#dither=bayer+posterize)
```

Supported dither algorithms are `atkinson` (the default), `bayer`, and `fs`.
Only one render effect (`ascii` or `dither`) and one color effect (`tint`,
`palette`, or `posterize`) may be used on an image. Invalid combinations fail the
build. Processed raster images are emitted as responsive PNG/APNG variants; GIF
and APNG timing and looping are preserved. ASCII rendering is limited to still
images: using `#ascii`, including in a combination, on an animated source fails
the build with an authoring error.
