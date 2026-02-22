#!/usr/bin/env python3
"""parse letterboxd.txt -> .md film review posts with TMDB director lookup.
usage: TMDB_API_KEY=xxx python3 scripts/import_letterboxd.py [--dry-run]
"""
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import json
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).parent.parent
POSTS_DIR = ROOT / "blog" / "posts"
LB_FILE = ROOT / "letterboxd.txt"
TMDB_KEY = os.environ.get("TMDB_API_KEY", "")
TMDB_BASE = "https://api.themoviedb.org/3"
RATE_LIMIT_DELAY = 0.25  # seconds between TMDB requests

NAV_SKIP = {
    "Activity", "Films", "Diary", "Reviews", "Watchlist", "Lists",
    "Likes", "Tags", "Network", "Visibility Filters", "Sort by",
    "When Reviewed", "Diary Year", "Rating",
}

def parse_stars(s):
    """convert ★★★½ etc to float rating"""
    s = s.strip()
    full = s.count("★")
    half = 0.5 if "½" in s else 0
    return full + half

def parse_date(raw):
    """parse letterboxd date string -> YYYY-MM-DD. strips trailing page numbers."""
    raw = raw.strip()
    # extract 'DD Mon YYYY' pattern; ignore trailing page numbers
    m = re.search(r"(\d{1,2}\s+\w{3,9}\s+\d{4})", raw)
    if m:
        raw = m.group(1)
    for fmt in ("%d %b %Y", "%d %B %Y"):
        try:
            return datetime.strptime(raw, fmt).strftime("%Y-%m-%d")
        except ValueError:
            continue
    return raw

def slugify(title):
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "_", s)
    s = s.strip("_")
    return s

def parse_letterboxd(path):
    """yield dicts: title, year, rating, date, review"""
    lines = Path(path).read_text(encoding="utf-8").splitlines()
    films = []
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        # skip nav/empty
        if not line or line in NAV_SKIP or line.startswith("Search ") or line.startswith("RSS feed"):
            i += 1
            continue
        # film block starts
        m = re.match(r"^Poster for (.+?)\((\d{4})\)", line)
        if m:
            raw_title = m.group(1).strip()
            year = int(m.group(2))
            i += 1
            # skip the "Title YEAR" line
            if i < len(lines):
                i += 1
            # rating + action + date line
            if i >= len(lines):
                break
            rating_line = lines[i].strip()
            i += 1
            # parse rating
            rm = re.match(r"^([★½]+)\s+(Watched|Rewatched|Added)\s+(.+)$", rating_line)
            if not rm:
                continue
            rating = parse_stars(rm.group(1))
            date_str = parse_date(rm.group(3))
            # collect review paragraphs
            review_lines = []
            while i < len(lines):
                l = lines[i].strip()
                if re.match(r"^\d+ likes?$", l, re.IGNORECASE) or l == "No likes yet" or l.startswith("Poster for"):
                    break
                review_lines.append(l)
                i += 1
            review = "\n".join(review_lines).strip()
            # strip trailing blank lines
            review = re.sub(r"\n{3,}", "\n\n", review)
            films.append({
                "title": raw_title,
                "year": year,
                "rating": rating,
                "date": date_str,
                "review": review,
            })
        else:
            i += 1
    return films

def tmdb_get_director(title, year):
    """look up director via TMDB search + credits. returns str or ''."""
    if not TMDB_KEY:
        return ""
    query = urllib.parse.quote(title)
    search_url = f"{TMDB_BASE}/search/movie?api_key={TMDB_KEY}&query={query}&year={year}&language=en-US&page=1"
    try:
        with urllib.request.urlopen(search_url, timeout=10) as r:
            data = json.loads(r.read())
        results = data.get("results", [])
        if not results:
            # retry without year constraint
            search_url2 = f"{TMDB_BASE}/search/movie?api_key={TMDB_KEY}&query={query}&language=en-US&page=1"
            with urllib.request.urlopen(search_url2, timeout=10) as r:
                data = json.loads(r.read())
            results = data.get("results", [])
        if not results:
            return ""
        movie_id = results[0]["id"]
        time.sleep(RATE_LIMIT_DELAY)
        credits_url = f"{TMDB_BASE}/movie/{movie_id}/credits?api_key={TMDB_KEY}"
        with urllib.request.urlopen(credits_url, timeout=10) as r:
            cdata = json.loads(r.read())
        directors = [c["name"] for c in cdata.get("crew", []) if c["job"] == "Director"]
        return ", ".join(directors)
    except Exception as e:
        print(f"  warn: TMDB lookup failed for '{title}': {e}", file=sys.stderr)
        return ""

def generate_md(film, director):
    rating_str = str(film["rating"]).rstrip("0").rstrip(".") if "." in str(film["rating"]) else str(film["rating"])
    # keep one decimal for x.5 values
    if film["rating"] != int(film["rating"]):
        rating_str = f"{film['rating']:.1f}"
    else:
        rating_str = str(int(film["rating"]))
    title_escaped = film["title"].replace('"', '\\"')
    director_escaped = director.replace('"', '\\"') if director else "Unknown"
    frontmatter = f"""---
title: "{title_escaped}"
date: {film["date"]}
type: film
director: "{director_escaped}"
year: {film["year"]}
rating: {rating_str}
---"""
    review_body = film["review"] if film["review"] else "_No written review._"
    return frontmatter + "\n\n" + review_body + "\n"

def main():
    dry_run = "--dry-run" in sys.argv
    if not TMDB_KEY:
        print("warn: TMDB_API_KEY not set. Directors will be 'Unknown'.")
    if not LB_FILE.exists():
        print(f"error: {LB_FILE} not found", file=sys.stderr)
        sys.exit(1)
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    print(f"parsing {LB_FILE}...")
    films = parse_letterboxd(LB_FILE)
    print(f"found {len(films)} reviews")
    skipped, written = 0, 0
    for film in films:
        slug = slugify(film["title"])
        filename = f"{slug}.md"
        out_path = POSTS_DIR / filename
        if out_path.exists():
            skipped += 1
            continue
        # also skip if html version exists (legacy post)
        if (POSTS_DIR / f"{slug}.html").exists():
            skipped += 1
            continue
        print(f"  [{film['date']}] {film['title']} ({film['year']}) ★{film['rating']}", end="")
        director = ""
        if TMDB_KEY:
            director = tmdb_get_director(film["title"], film["year"])
            time.sleep(RATE_LIMIT_DELAY)
        print(f" -> dir: {director or 'Unknown'}")
        md = generate_md(film, director)
        if not dry_run:
            out_path.write_text(md, encoding="utf-8")
            written += 1
        else:
            print(f"  [dry-run] would write {out_path.name}")
            written += 1
    print(f"\ndone: {written} written, {skipped} skipped (already exist)")
    if not dry_run and written > 0:
        print("run 'make build' to regenerate HTML")

if __name__ == "__main__":
    main()
