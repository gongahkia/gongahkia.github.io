#!/usr/bin/env python3
from __future__ import annotations

import csv
import re
from datetime import date, datetime
from html.parser import HTMLParser
from pathlib import Path

import markdown
import yaml

ROOT = Path(__file__).resolve().parents[1]
POSTS_DIR = ROOT / "blog" / "posts"
OUTPUT_DIR = ROOT / "output"
TODAY = date(2026, 6, 28)
DATE_FORMATS = ("%d %b %Y", "%Y-%m-%d", "%Y/%m/%d", "%d %B %Y")


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in {"p", "div", "blockquote", "li", "br", "h1", "h2", "h3", "h4"}:
            self.parts.append("\n")

    def handle_endtag(self, tag: str) -> None:
        if tag in {"p", "div", "blockquote", "li", "ul", "ol", "h1", "h2", "h3", "h4"}:
            self.parts.append("\n")

    def text(self) -> str:
        raw = "".join(self.parts)
        raw = re.sub(r"[ \t\r\f\v]+", " ", raw)
        raw = re.sub(r" *\n *", "\n", raw)
        raw = re.sub(r"\n{3,}", "\n\n", raw)
        return raw.strip()


def split_frontmatter(raw: str, source: Path) -> tuple[dict, str]:
    if not raw.startswith("---\n"):
        raise ValueError(f"{source}: missing frontmatter")
    _, frontmatter, body = raw.split("---", 2)
    data = yaml.safe_load(frontmatter) or {}
    return data, body.lstrip("\n")


def plain_review(md: str) -> str:
    html = markdown.markdown(md, extensions=["extra", "sane_lists"])
    parser = TextExtractor()
    parser.feed(html)
    return parser.text()


def parse_review_date(value: object) -> tuple[date | None, str]:
    if isinstance(value, datetime):
        parsed = value.date()
        return parsed, parsed.isoformat()
    if isinstance(value, date):
        return value, value.isoformat()
    text = str(value).strip().strip('"').strip("'")
    for fmt in DATE_FORMATS:
        try:
            parsed = datetime.strptime(text, fmt).date()
            return parsed, parsed.isoformat()
        except ValueError:
            pass
    return None, text


def parse_rating(value: object) -> float | None:
    try:
        return float(str(value).strip().strip('"').strip("'"))
    except ValueError:
        return None


def isbn_digits(value: object) -> str:
    raw = str(value).strip().strip('"').strip("'")
    return re.sub(r"[^0-9Xx]", "", raw)


def valid_isbn10(code: str) -> bool:
    if not re.fullmatch(r"\d{9}[\dXx]", code):
        return False
    total = 0
    for idx, char in enumerate(code.upper(), start=1):
        digit = 10 if char == "X" else int(char)
        total += idx * digit
    return total % 11 == 0


def valid_isbn13(code: str) -> bool:
    if not re.fullmatch(r"\d{13}", code):
        return False
    total = sum((1 if idx % 2 == 0 else 3) * int(char) for idx, char in enumerate(code[:12]))
    check = (10 - total % 10) % 10
    return check == int(code[-1])


def validate_common(path: Path, data: dict, parsed_date: date | None, rating: float | None, issues: list[str]) -> None:
    for field in ("title", "date", "rating"):
        if field not in data or data[field] in (None, ""):
            issues.append(f"{path}: missing {field}")
    if parsed_date is None:
        issues.append(f"{path}: invalid date {data.get('date')!r}")
    elif parsed_date > TODAY:
        issues.append(f"{path}: future date {parsed_date.isoformat()}")
    if rating is None or rating < 0 or rating > 5:
        issues.append(f"{path}: invalid rating {data.get('rating')!r}")
    elif (rating * 2) % 1:
        issues.append(f"{path}: rating not on 0.5 step {rating:g}")


def goodreads_rating(rating: float | None, path: Path, issues: list[str]) -> int | str:
    if rating is None:
        return ""
    rounded = int(rating + 0.5)
    if rounded != rating:
        issues.append(f"{path}: Goodreads whole-star rating rounded {rating:g} -> {rounded}")
    return max(0, min(5, rounded))


def collect() -> tuple[list[dict], list[dict], list[str]]:
    films: list[dict] = []
    books: list[dict] = []
    issues: list[str] = []

    for path in sorted(POSTS_DIR.glob("*.md")):
        data, body = split_frontmatter(path.read_text(encoding="utf-8"), path)
        review_type = str(data.get("type", "")).strip().strip('"').strip("'")
        if review_type not in {"film", "book"}:
            continue

        parsed_date, iso_date = parse_review_date(data.get("date", ""))
        rating = parse_rating(data.get("rating", ""))
        review = plain_review(body)
        rel = path.relative_to(ROOT)
        validate_common(rel, data, parsed_date, rating, issues)

        if review_type == "film":
            for field in ("director", "year"):
                if field not in data or data[field] in (None, ""):
                    issues.append(f"{rel}: missing {field}")
            try:
                year = int(str(data.get("year", "")).strip().strip('"').strip("'"))
            except ValueError:
                year = ""
                issues.append(f"{rel}: invalid year {data.get('year')!r}")
            films.append(
                {
                    "Title": str(data.get("title", "")).strip(),
                    "Year": year,
                    "Directors": str(data.get("director", "")).strip(),
                    "WatchedDate": iso_date if parsed_date else "",
                    "Rating": f"{rating:g}" if rating is not None else "",
                    "Review": review,
                }
            )
        else:
            for field in ("author", "isbn"):
                if field not in data or data[field] in (None, ""):
                    issues.append(f"{rel}: missing {field}")
            isbn = isbn_digits(data.get("isbn", ""))
            if isbn and not (valid_isbn10(isbn) or valid_isbn13(isbn)):
                issues.append(f"{rel}: invalid ISBN checksum {isbn}")
            books.append(
                {
                    "Title": str(data.get("title", "")).strip(),
                    "Author": str(data.get("author", "")).strip(),
                    "ISBN": isbn if len(isbn) == 10 else "",
                    "ISBN13": isbn if len(isbn) == 13 else "",
                    "My Rating": goodreads_rating(rating, rel, issues),
                    "Date Read": iso_date.replace("-", "/") if parsed_date else "",
                    "Date Added": iso_date.replace("-", "/") if parsed_date else "",
                    "Bookshelves": str(data.get("category", "")).strip().lower().replace("non-fiction", "nonfiction"),
                    "Exclusive Shelf": "read",
                    "My Review": review,
                    "Read Count": 1,
                    "Owned Copies": 0,
                }
            )

    return films, books, issues


def write_csv(path: Path, rows: list[dict], fields: list[str]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)


def write_report(path: Path, films: list[dict], books: list[dict], issues: list[str]) -> None:
    lines = [
        "# Review import validation",
        "",
        f"- films: {len(films)}",
        f"- books: {len(books)}",
        f"- issues: {len(issues)}",
        "",
        "## Issues",
        "",
    ]
    lines.extend(f"- {issue}" for issue in issues)
    if not issues:
        lines.append("- none")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    films, books, issues = collect()
    write_csv(
        OUTPUT_DIR / "letterboxd_import.csv",
        films,
        ["Title", "Year", "Directors", "WatchedDate", "Rating", "Review"],
    )
    write_csv(
        OUTPUT_DIR / "goodreads_import.csv",
        books,
        [
            "Title",
            "Author",
            "ISBN",
            "ISBN13",
            "My Rating",
            "Date Read",
            "Date Added",
            "Bookshelves",
            "Exclusive Shelf",
            "My Review",
            "Read Count",
            "Owned Copies",
        ],
    )
    write_report(OUTPUT_DIR / "review_import_validation.md", films, books, issues)
    print(f"films={len(films)} books={len(books)} issues={len(issues)}")


if __name__ == "__main__":
    main()
