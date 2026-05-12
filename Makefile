.PHONY: help dev build preview blog book film project paper wiki tech build-wiki clean-wiki sitemap up history

help:
	@echo "Available commands:"
	@echo "  make dev       - Sync content and start the Vite dev server"
	@echo "  make build     - Sync content, build Vite, and generate route wrappers"
	@echo "  make preview   - Preview the built site locally"
	@echo "  make blog      - Create a new general writing post"
	@echo "  make book      - Create a new book review"
	@echo "  make film      - Create a new film review with an optional image path"
	@echo "  make project   - Create a new project-style writing post"
	@echo "  make paper     - Create a new paper source with an optional cover PNG path"
	@echo "  make wiki      - Create a new General wiki note"
	@echo "  make tech      - Create a new Tech wiki note"
	@echo "  make build-wiki, make sitemap - Legacy aliases for make build"
	@echo "  FORCE=1 make <target> overwrites an existing generated source filename"

dev:
	@npm run dev

build:
	@npm run build

preview:
	@npm run preview

blog:
	@node scripts/new-content.mjs blog

book:
	@node scripts/new-content.mjs book

film:
	@node scripts/new-content.mjs film

project:
	@node scripts/new-content.mjs project

paper:
	@node scripts/new-content.mjs paper

wiki:
	@node scripts/new-content.mjs wiki

tech:
	@node scripts/new-content.mjs tech

build-wiki: build

sitemap: build

clean-wiki:
	@rm -rf dist/personal-wiki/pages dist/personal-wiki/index.html
	@echo "Removed built wiki pages from dist/."

up:
	@git pull
	@git status

history:
	@git log
