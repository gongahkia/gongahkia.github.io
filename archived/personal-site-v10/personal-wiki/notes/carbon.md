---
category: Tech
---
# Carbon

# `Carbon`

An experimental successor to C++ by Google.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment
```

## Printing

```
// ---------- PRINT ----------
    // Carbon is still experimental and syntax is subject to change.
    // The `Print` function is used for output.

package Sample api;

fn Main() -> i32 {
  Print("Hello, Carbon!");
  return 0;
}
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Carbon is an experimental language, aiming to be a successor to C++.
    // It is designed to be interoperable with existing C++ code.
    // The language is still under development.

package Sample api;

fn Main() -> i32 {
  return 0;
}
```

## Variables

```
// ---------- VARIABLE ----------
    // `var` is used to declare mutable variables.
    // `let` is used to declare immutable variables.
    // Type is specified after the variable name with a colon.

var x: i32 = 10;
let y: f64 = 3.14;
```

## Types

```
// ---------- TYPE ----------
    // i32, i64, etc. for integers
    // f64 for floating-point numbers
    // bool for booleans
    // String for strings
```

## Operators

```
// ---------- OPERATOR ----------
    // Carbon aims to have operators that are familiar to C++ developers.
    // +, -, *, /, %
    // &&, ||, !
    // ==, !=, <, >, <=, >=
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// IF / ELSE

if (x > 5) {
  Print("x is greater than 5");
} else {
  Print("x is not greater than 5");
}

// WHILE

while (x > 0) {
  x = x - 1;
}

// FOR

for (var i: i32 in 0..5) {
  Print(i);
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------
    // Carbon will have structs, arrays, and tuples.
    // The exact syntax is still being finalized.

struct Point {
  var x: f64;
  var y: f64;
}
```

## Functions

```
// ---------- FUNCTION ----------
    // `fn` keyword is used to declare functions.
    // `->` is used to specify the return type.

fn Add(a: i32, b: i32) -> i32 {
  return a + b;
}
```

## More on

* [Carbon Language on GitHub](https://github.com/carbon-language/carbon-lang)
* [Carbon Language Documentation](https://github.com/carbon-language/carbon-lang/tree/trunk/docs)
* [Carbon Language Discord](https://discord.gg/carbon-lang)
