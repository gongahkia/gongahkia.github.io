.PHONY: work blog project wiki tech _new_wiki_note build build-wiki clean-wiki help up history sitemap

# OS detection for sed compatibility
UNAME := $(shell uname)
ifeq ($(UNAME), Darwin)
    SED_CMD := sed -i ''
else
    SED_CMD := sed -i
endif

# Default target
help:
	@echo "Available commands:"
	@echo "  make build          - Build the full deployable site into dist/ (preserves Markdown sources)"
	@echo "  make work           - Create a new work writeup in works/ (interactive)"
	@echo "  make blog           - Create a new blog post (interactive)"
	@echo "  make project        - Create a new tech writeup blog post (interactive)"
	@echo "  make wiki           - Create a new General wiki note in personal-wiki/notes/ (interactive)"
	@echo "  make tech           - Create a new Tech wiki note in personal-wiki/notes/ (interactive)"
	@echo "  make build-wiki     - Build the deployable site into dist/ (legacy alias)"
	@echo "  make clean-wiki     - Remove built wiki pages and index from dist/"

	@echo "  make sitemap        - Build the deployable site into dist/ (legacy alias)"
	@echo "  make up             - Pull latest changes and show status"
	@echo "  make history        - Show git log"

# Unified build: wiki + blog index + sitemap
build:
	@python3 build.py --output dist

# Create a new work writeup (markdown with frontmatter)
work:
	@echo "Creating new work writeup..."
	@mkdir -p works; \
	current_date=$$(date +"%B %Y"); \
	printf "Enter date (default: $$current_date): "; \
	read date; \
	date=$${date:-$$current_date}; \
	printf "Enter work title (required): "; \
	read title; \
	while [ -z "$$title" ]; do \
		echo "Work title is required."; \
		printf "Enter work title (required): "; \
		read title; \
	done; \
	slug=$$(echo "$$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$$//'); \
	while [ -z "$$slug" ]; do \
		echo "Work title must contain at least one letter or number."; \
		printf "Enter work title (required): "; \
		read title; \
		slug=$$(echo "$$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/--*/-/g' | sed 's/^-//' | sed 's/-$$//'); \
	done; \
	printf "Enter summary (required): "; \
	read summary; \
	while [ -z "$$summary" ]; do \
		echo "Summary is required."; \
		printf "Enter summary (required): "; \
		read summary; \
	done; \
	printf "Enter repository or project URL (optional): "; \
	read href; \
	printf "Enter display order (optional): "; \
	read order; \
	filepath=works/"$$slug".md; \
	if [ -e "$$filepath" ]; then \
		echo "Refusing to overwrite existing $$filepath"; \
		exit 1; \
	fi; \
	if [ -n "$$order" ]; then \
		order_line="order: $$order\n"; \
	else \
		order_line=""; \
	fi; \
	printf -- "---\nslug: $$slug\ntitle: \"$$title\"\ndate: \"$$date\"\nsummary: \"$$summary\"\nhref: \"$$href\"\n$${order_line}---\n\nAdd work writeup content here.\n" > "$$filepath"; \
	echo "Created $$filepath"; \
	echo "Run 'make build' after editing to rebuild work pages"

# Create a new blog post (markdown with frontmatter)
blog:
	@echo "Creating new blog post..."
	@current_date=$$(date +"%e %b %Y" | xargs); \
	printf "Enter date (default: $$current_date): "; \
	read date; \
	date=$${date:-$$current_date}; \
	printf "Enter blog post title (required): "; \
	read title; \
	while [ -z "$$title" ]; do \
		echo "Blog post title is required."; \
		printf "Enter blog post title (required): "; \
		read title; \
	done; \
	filename=$$(echo $$title | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g').md; \
	printf -- "---\ntitle: \"$$title\"\ndate: $$date\ntype: blog\n---\n\nAdd post content here.\n" > blog/posts/$$filename; \
	echo "Created blog/posts/$$filename"; \
	echo "Run 'make build' after editing to rebuild index"

# Create a new tech writeup (markdown with frontmatter)
project:
	@echo "Creating new tech writeup..."
	@current_date=$$(date +"%e %b %Y" | xargs); \
	printf "Enter start date (default: $$current_date): "; \
	read start_date; \
	start_date=$${start_date:-$$current_date}; \
	printf "Is this an ongoing project? (Y/N): "; \
	read ongoing; \
	while [ "$$ongoing" != "Y" ] && [ "$$ongoing" != "N" ]; do \
		echo "Please enter Y or N."; \
		printf "Is this an ongoing project? (Y/N): "; \
		read ongoing; \
	done; \
	if [ "$$ongoing" = "Y" ]; then end_date_default="Present"; else end_date_default="$$current_date"; fi; \
	end_date="$$start_date"; \
	while [ "$$end_date" = "$$start_date" ] && [ "$$end_date" != "Present" ]; do \
		printf "Enter end date (default: $$end_date_default): "; \
		read end_date_input; \
		end_date=$${end_date_input:-$$end_date_default}; \
		if [ "$$end_date" = "$$start_date" ]; then \
			echo "Error: start and end date cannot be the same."; \
		fi; \
	done; \
	date_range="$$start_date to $$end_date"; \
	printf "Enter title (required): "; \
	read title; \
	while [ -z "$$title" ]; do \
		echo "Title is required."; \
		printf "Enter title (required): "; \
		read title; \
	done; \
	printf "Enter tech stack (comma-separated): "; \
	read tech_stack; \
	printf "Enter status (Active/Archived/Deprecated): "; \
	read status; \
	printf "Enter GitHub URL (optional): "; \
	read github; \
	printf "Enter demo URL (optional): "; \
	read demo; \
	filename=$$(echo $$title | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g').md; \
	printf -- "---\ntitle: \"$$title\"\ndate: $$current_date\ntype: tech-writeup\ntech_stack: \"$$tech_stack\"\ndate_range: \"$$date_range\"\nstatus: \"$$status\"\ngithub: \"$$github\"\ndemo: \"$$demo\"\n---\n\nAdd writeup content here.\n" > blog/posts/$$filename; \
	echo "Created blog/posts/$$filename"; \
	echo "Run 'make build' after editing to rebuild index"

# Create a new General wiki note
wiki: CATEGORY=General
wiki: _new_wiki_note

# Create a new Tech wiki note
tech: CATEGORY=Tech
tech: _new_wiki_note

_new_wiki_note:
	@echo "Creating new $(CATEGORY) wiki note..."
	@mkdir -p personal-wiki/notes; \
	read -p "Subject: " title; \
	read -p "Language extension: " language; \
	slug=$$(echo "$$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_//' | sed 's/_$$//'); \
	while [ -z "$$slug" ]; do \
		echo "Subject must contain at least one letter or number."; \
		read -p "Subject: " title; \
		slug=$$(echo "$$title" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g' | sed 's/^_//' | sed 's/_$$//'); \
	done; \
	filepath=personal-wiki/notes/"$$slug".md; \
	printf -- "---\ncategory: $(CATEGORY)\n---\n" > "$$filepath"; \
	echo "# \`$$title\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Comments" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Printing" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Quickstart" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Types" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Operators" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Control structures" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Data structures" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## Functions" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`$$language" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "\`\`\`" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "## More on" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "*" >> "$$filepath"; \
	echo "" >> "$$filepath"; \
	echo "Created wiki note: $$filepath"

# Build wiki HTML from markdown (legacy target, calls unified build)
build-wiki:
	@echo "Building deployable site into dist/..."
	@python3 build.py --output dist
	@echo "Build complete!"

# Clean built wiki HTML files from dist/
clean-wiki:
	@echo "Cleaning built wiki files from dist/..."
	@removed=0; \
	if [ -d dist/personal-wiki/pages ]; then \
		count=$$(find dist/personal-wiki/pages -maxdepth 1 -name '*.html' | wc -l | tr -d ' '); \
		rm -rf dist/personal-wiki/pages; \
		removed=$$((removed + count)); \
		echo "Removed dist/personal-wiki/pages ($$count file(s))"; \
	fi; \
	if [ -f dist/personal-wiki/index.html ]; then \
		rm -f dist/personal-wiki/index.html; \
		echo "Removed dist/personal-wiki/index.html"; \
	fi; \
	echo "Clean complete! Removed $$removed built wiki page(s) from dist/."

# Generate sitemap.xml (legacy target, calls unified build)
sitemap:
	@echo "Building deployable site into dist/..."
	@python3 build.py --output dist
	@echo "Build complete! dist/sitemap.xml is ready."

# Git helpers
up:
	@git pull
	@git status

history:
	@git log
