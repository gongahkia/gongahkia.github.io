![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/pages.yml/badge.svg)
![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/fetch-contributions.yml/badge.svg)
![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/wiki-release.yml/badge.svg)

# `Site, Notes, Blog`

Monorepo for my personal [site](./), [blog](./blog/) and [wiki](./personal-wiki/).

## Wiki Notes

<a href="https://github.com/gongahkia/gongahkia.github.io/releases/tag/notes-2026-04-19"><b>Download</b></a> my notes as a ZIP file.   

If you like them, consider [**sponsoring**](https://github.com/sponsors/gongahkia) this repository.  

## Usage

```console
$ make help
```

## Github actions

* [`fetch-contributions.yml`](./.github/workflows/fetch-contributions.yml): Update GitHub contributions calendar on personal site daily
* [`wiki-release.yml`](./.github/workflows/wiki-release.yml): ZIPs all Markdown wiki notes on changes
* [`pages.yml`](./.github/workflows/pages.yml): Builds `dist/` and deploys the site through GitHub Pages Actions
