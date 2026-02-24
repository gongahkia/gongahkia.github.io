.PHONY: blog book film tech-writeup wiki build build-wiki clean-wiki help up history sitemap search

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
	@echo "  make build          - Build all (wiki + blog index + sitemap)"
	@echo "  make blog           - Create a new blog post (interactive)"
	@echo "  make book           - Create a new book review (interactive)"
	@echo "  make film           - Create a new film review (interactive)"
	@echo "  make tech-writeup   - Create a new tech writeup (interactive)"
	@echo "  make wiki           - Create a new wiki note (interactive)"
	@echo "  make build-wiki     - Build all wiki HTML from markdown"
	@echo "  make clean-wiki     - Remove generated wiki HTML files"
	@echo "  make search         - Build Pagefind search index for wiki"
	@echo "  make sitemap        - Generate sitemap.xml"
	@echo "  make up             - Pull latest changes and show status"
	@echo "  make history        - Show git log"

# Unified build: wiki + blog index + sitemap + search index
build:
	@python3 build.py
	@npx -y pagefind --site personal-wiki/pages --output-path personal-wiki/pagefind 2>/dev/null || echo "warn: pagefind not available, skipping search index"

# Build Pagefind search index for wiki
search:
	@npx -y pagefind --site personal-wiki/pages --output-path personal-wiki/pagefind

# Create a new blog post (markdown with frontmatter)
blog:
	@echo "Creating new blog post..."
	@current_date=$$(date +%Y-%m-%d); \
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

# Create a new book review (markdown with frontmatter)
book:
	@echo "Creating new book review..."
	@current_date=$$(date +%Y-%m-%d); \
	printf "Enter date (default: $$current_date): "; \
	read date; \
	date=$${date:-$$current_date}; \
	printf "Enter book name (required): "; \
	read book_name; \
	while [ -z "$$book_name" ]; do \
		echo "Book name is required."; \
		printf "Enter book name (required): "; \
		read book_name; \
	done; \
	printf "Enter author name (required): "; \
	read author_name; \
	while [ -z "$$author_name" ]; do \
		echo "Author name is required."; \
		printf "Enter author name (required): "; \
		read author_name; \
	done; \
	printf "Enter ISBN number (required): "; \
	read isbn; \
	while [ -z "$$isbn" ]; do \
		echo "ISBN number is required."; \
		printf "Enter ISBN number (required): "; \
		read isbn; \
	done; \
	printf "Enter category (F for Fiction, N for Non-Fiction): "; \
	read category; \
	while [ "$$category" != "F" ] && [ "$$category" != "N" ]; do \
		echo "Category must be F or N."; \
		printf "Enter category (F for Fiction, N for Non-Fiction): "; \
		read category; \
	done; \
	if [ "$$category" = "F" ]; then \
		category_text="Fiction"; \
	else \
		category_text="Non-Fiction"; \
	fi; \
	printf "Enter rating (0-5, can be decimal): "; \
	read rating; \
	while [ -z "$$rating" ] || ! echo "$$rating" | grep -q "^[0-5]\(\.[0-9]\+\)\?$$"; do \
		echo "Rating must be a number between 0 and 5 (can be decimal)."; \
		printf "Enter rating (0-5, can be decimal): "; \
		read rating; \
	done; \
	filename=$$(echo $$book_name | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g').md; \
	printf -- "---\ntitle: \"$$book_name\"\nauthor: \"$$author_name\"\nisbn: \"$$isbn\"\ncategory: $$category_text\nrating: $$rating\ndate: $$date\ntype: book\n---\n\nAdd book review content here.\n" > blog/posts/$$filename; \
	echo "Created blog/posts/$$filename"; \
	echo "Run 'make build' after editing to rebuild index"

# Create a new film review (markdown with frontmatter)
film:
	@echo "Creating new film review..."
	@current_date=$$(date +%Y-%m-%d); \
	printf "Enter date (default: $$current_date): "; \
	read date; \
	date=$${date:-$$current_date}; \
	printf "Enter film title (required): "; \
	read title; \
	while [ -z "$$title" ]; do \
		echo "Film title is required."; \
		printf "Enter film title (required): "; \
		read title; \
	done; \
	printf "Enter director name (required): "; \
	read director; \
	while [ -z "$$director" ]; do \
		echo "Director name is required."; \
		printf "Enter director name (required): "; \
		read director; \
	done; \
	printf "Enter release year (required): "; \
	read year; \
	while [ -z "$$year" ] || ! echo "$$year" | grep -q "^[0-9]\{4\}$$"; do \
		echo "Release year must be a 4-digit number."; \
		printf "Enter release year (required): "; \
		read year; \
	done; \
	printf "Enter rating (0-5, can be decimal): "; \
	read rating; \
	while [ -z "$$rating" ] || ! echo "$$rating" | grep -q "^[0-5]\(\.[0-9]\+\)\?$$"; do \
		echo "Rating must be a number between 0 and 5 (can be decimal)."; \
		printf "Enter rating (0-5, can be decimal): "; \
		read rating; \
	done; \
	filename=$$(echo $$title | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g').md; \
	printf -- "---\ntitle: \"$$title\"\ndate: $$date\ntype: film\ndirector: \"$$director\"\nyear: $$year\nrating: $$rating\n---\n\nAdd film review content here.\n" > blog/posts/$$filename; \
	echo "Created blog/posts/$$filename"; \
	echo "Run 'make build' after editing to rebuild index"

# Create a new tech writeup (markdown with frontmatter)
tech-writeup:
	@echo "Creating new tech writeup..."
	@current_date=$$(date +%Y-%m-%d); \
	printf "Enter date (default: $$current_date): "; \
	read date; \
	date=$${date:-$$current_date}; \
	printf "Enter title (required): "; \
	read title; \
	while [ -z "$$title" ]; do \
		echo "Title is required."; \
		printf "Enter title (required): "; \
		read title; \
	done; \
	printf "Enter tech stack (comma-separated): "; \
	read tech_stack; \
	printf "Enter duration/timeline: "; \
	read duration; \
	printf "Enter status (Active/Archived/Deprecated): "; \
	read status; \
	printf "Enter GitHub URL (optional): "; \
	read github; \
	printf "Enter demo URL (optional): "; \
	read demo; \
	filename=$$(echo $$title | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/_/g' | sed 's/__*/_/g').md; \
	printf -- "---\ntitle: \"$$title\"\ndate: $$date\ntype: tech-writeup\ntech_stack: \"$$tech_stack\"\nduration: \"$$duration\"\nstatus: \"$$status\"\ngithub: \"$$github\"\ndemo: \"$$demo\"\n---\n\nAdd writeup content here.\n" > blog/posts/$$filename; \
	echo "Created blog/posts/$$filename"; \
	echo "Run 'make build' after editing to rebuild index"


# Create a new wiki note
wiki:
	@echo "Creating new wiki note..."
	@read -p "Subject: " title; \
	read -p "Language extension: " language; \
	echo "# \`$$title\`" > personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Comments" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Printing" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Quickstart" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Types" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Operators" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Control structures" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Data structures" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## Functions" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`$$language" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "\`\`\`" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "## More on" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "*" >> personal-wiki/notes/"$$title".md; \
	echo "" >> personal-wiki/notes/"$$title".md; \
	echo "Created wiki note: personal-wiki/notes/$$title.md"

# Build wiki HTML from markdown (legacy target, calls unified build)
build-wiki:
	@echo "Building wiki pages..."
	@python3 build.py
	@echo "Wiki build complete!"

# Clean generated wiki HTML files
clean-wiki:
	@echo "Cleaning generated wiki files..."
	@rm -f personal-wiki/pages/*.html
	@echo "Clean complete!"

# Generate sitemap.xml (legacy target, calls unified build)
sitemap:
	@echo "Generating sitemap.xml..."
	@python3 build.py
	@echo "Sitemap generation complete!"

# Git helpers
up:
	@git pull
	@git status

history:
	@git log
