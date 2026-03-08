![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/pages.yml/badge.svg)
![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/fetch-contributions.yml/badge.svg)
![](https://github.com/gongahkia/gongahkia.github.io/actions/workflows/wiki-release.yml/badge.svg)

# `Site, Notes, Blog`

Monorepo for my personal [site](./), [blog](./blog/) and [wiki](./personal-wiki/).

## Wiki Notes

<a href="https://github.com/gongahkia/gongahkia.github.io/releases/tag/notes-2026-02-02"><b>Download</b></a> my notes as a ZIP file.   

If you like them, consider [**sponsoring**](https://github.com/sponsors/gongahkia) this repository.  

## Usage

```console
$ make help
```

### Current content model

* Blog posts and wiki notes can be authored in Markdown and built into static HTML.
* Existing checked-in HTML blog posts and wiki notes remain supported as legacy content.
* `make build` writes a full deployable site tree into `dist/` and preserves Markdown authoring files.
* `make clean-wiki` only removes generated HTML for Markdown-backed wiki notes and leaves legacy HTML-only notes untouched.
* GitHub Pages is intended to deploy from a GitHub Actions artifact built from source, not from tracked generated HTML on `main`.

## Automated workflows

* [`fetch-contributions.yml`](./.github/workflows/fetch-contributions.yml): Update GitHub contributions calendar on personal site daily
* [`wiki-release.yml`](./.github/workflows/wiki-release.yml): ZIPs all Markdown wiki notes on changes
* `pages.yml`: Builds `dist/` and deploys the site through GitHub Pages Actions

## Migration workflow

* Run `python3 scripts/reverse_engineer_content.py --target all --write --report migration-reports/content-migration.json` to recover Markdown sources from legacy HTML pages that do not already have mapped Markdown files.
* Review the JSON and Markdown reports before removing any tracked generated HTML from `main`.
* After the Pages workflow is merged, switch GitHub Pages in repository settings from `Deploy from a branch` to `GitHub Actions`.

## Stack

![JavaScript](https://img.shields.io/badge/-JavaScript-000?&logo=JavaScript)
![HTML](https://img.shields.io/badge/-HTML-000?&logo=html5)
![CSS](https://img.shields.io/badge/-CSS-000?&logo=css3)
![Python](https://img.shields.io/badge/-Python-000?&logo=python)
![Github Pages](https://img.shields.io/badge/-Github%20Pages-000?&logo=github)
