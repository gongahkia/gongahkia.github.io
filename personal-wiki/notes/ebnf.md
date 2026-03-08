# EBNF

# `EBNF`

Extended Backus-Naur Form is a notation *(metalanguage)* used to define a programming language's syntax.

## Quickstart

```
(* ---------- QUICKSTART ---------- *)
    (* every widely used programming language today has an .ebnf file as universally-understandable documentation to describe language grammer *)
    (* ebnf syntax shares many similarities with regular expressions *)
    (* ::= => definition operator that functions similarly to the assignment operator in other languages *)
    (* | => alternative operator that functions similarly to the or operator *)
    (* * => repetition operator for ZERO or MORE instances of a specified clause *)
    (* + => repetition operator for ONE or MORE instances of a specified clause *)
    (* ? => repetition operator for ZERO or ONE instances of a specified clause *)
    (* () => grouping operator to specify the order of operations *)
    (* .. => range operator to denote the full range of characters between the specified start and stop point *)

expression ::= term | term ('+' | '-') expression
term ::= factor | factor '*' term
factor ::= '(' expression ')' | number
number ::= "0" .. "9"
```

## More on

* [ebnf extended syntax](https://www.freecodecamp.org/news/what-are-bnf-and-ebnf/)
