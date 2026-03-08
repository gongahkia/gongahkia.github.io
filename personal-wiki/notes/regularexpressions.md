# Regular expressions

# `Regular expressions`

The bane of every programmer's existence.

## Intro

* Abbreviated as *regex* or *regexp*
* Powerful pattern-matching for specific character combinations in strings
* Used for searching, editing and manipulating strings

## Quickstart

* Regular expressions consist of both **literal characters** and **metacharacters**
  1. Literal character: character literals *(eg. `a`, `b`, `c`, `1`, `2`, `3`)*
  2. Metacharacter: special character with a specific meaning *(eg. `.`, `^`, `$`, `*`)*

### Literal character

* Alphanumeric characters: `a`, `b`, `c`, ... and `1`, `2`, `3`, ...
* Whitespace characters: spaces, tabs, newline, ... *(unless explicitly escaped)*
* Punctuation and symbols: `@`, `#`, `$`, ... *(unless they are already designated metacharacters)*

### Metacharacters

* `.`: matches any character *except* the newline character
* `^`: matches the *start* of a string
* `$`: matches the *end* of a string
* `*`: matches *0 or more repetitions* of the preceding element
* `+`: matches *1 or more repetitions* of the preceding element
* `?`: matches *0 or 1 repetition* of the preceding element
* `{n}`: matches *exactly `n` repetitions* of the preceding element
* `{n,}`: matches *`n` or more repetitions* of the preceding element
* `{n,m}`: matches *between `n` and `m` repetitions* of the preceding element
* `[]`: matches *any one character* within the square brackets
* `|`: logical OR operator
* `\`: escape character that specifies the escape of a regex metacharacter *(treating the metacharacter as a literal character)*
* `()`: groups multiple tokens together to create a capture group for extracting substrings
* `\d`: matches any digit *(equivalent to `[0-9]`)*
* `\D`: matches any non-digit *(equivalent to `[^0-9]`)*
* `\w`: matches any alphanumeric character and the `_` underscore *(equivalent to `[a-zA-Z0-9_]`)*
* `\W`: matches any character that is not a word character *(equivalent to `[^a-zA-Z0-9_]`)*
* `\s`: matches any whitespace character *(equivalent to `[ \t\n\r\f\v]`)*
* `\S`: matches any character that is not a whitespace character *(equivalent to `[^ \t\n\r\f\v]`)*
* `\b`: matches a position between a word character and a non-word character *(word boundary)*
* `\B`: matches a position that is not a word boundary *(non-word boundary)*
* `(?:)`: groups multiple tokens together without creating a capture group *(non-capturing group)*
* `(?=)`: asserts that a group of characters can be matched to the right of the current position without including it in the match *(positive lookahead)*
* `(?!`: asserts that a group of characters cannot be matched to the right of the current position *(negative lookahead)*
* `(?<=)`: asserts that a group of characters can be matched to the left of the current position *(positive lookbehind)*
* `(?<!`: asserts that a group of characters cannot be matched to the left of the current position *(negative lookbehind)*

## Worked example

```
# ----- WORKED EXAMPLE -----

hello         # this matches the exact string "hello"

h.llo         # this matches "hello", "hallo", "hxllo", etc.

^hello        # this matches "hello" only if it's at the start of a line
world$        # this matches "world" only if it's at the end of a line

a*            # this matches "a", "aa", "aaa", etc., including an empty string
a+            # this matches "a", "aa", "aaa", etc., but not an empty string
a?            # this matches "a" or an empty string
a{3}          # this matches exactly "aaa"
a{2,4}        # this matches "aa", "aaa", or "aaaa"

[abc]         # this matches "a", "b", or "c"
[^abc]        # this matches any character except "a", "b", or "c"
[a-z]         # this matches any lowercase letter
[A-Z]         # this matches any uppercase letter
[0-9]         # this matches any digit

(ab|cd)       # this matches "ab" or "cd"
(grape|apple)s # this matches "grapes" or "apples"
```

## More on

* [RegExr: Learn, Build & Test RegEx](https://regexr.com/)
* [RexEgg: The world's most tyrannosaurical regex tutorial](https://www.rexegg.com/regex-quickstart.php)
* [regular expressions 101](https://regex101.com/)
* [Regular Expressions (Regex)](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html) by NTU
* [Regular Expressions Cheat Sheet](https://cheatography.com/davechild/cheat-sheets/regular-expressions/) by DaveChild
