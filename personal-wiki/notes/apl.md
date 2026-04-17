---
category: Tech
---
# APL

# `APL`

A programming language.

## Comments

```
⍝ ----- COMMENT -----

⍝ this is a single-line comment

⍝ there is no built-in syntax for 
⍝ multi-line comments in APL but the
⍝ same effect can be achieved as such
```

## Printing

```
⍝ ----- PRINT -----
    ⍝ `⎕` => function that receives a string argument which is displayed to the stdout and does not include a newline automatically
    ⍝ `⎕← ⍴⊢` => function that receives a string argument which is then displayed to the stdout and this includes a newline by default

⎕ ← 'this does not include a newline by default and one must be explicitly specified\n'
'this includes a newline and we don't need to specify its inclusion' ⎕← ⍴⊢ 
```

## Quickstart

```
⍝ ----- QUICKSTART -----
    ⍝ array-oriented programming langauge 
    ⍝ syntax defined by a unique character set comprising many special symbols
    ⍝ APL is 1-indexed, unlike most other programming languages which are 0-indexed
    ⍝ APL statements are composed of functions and operators
    ⍝ ← => assignment operator, specifying the relationship between a user-defined named variable and its assigned value
```

## Types

```
⍝ ----- TYPE -----

⍝ --- SCALAR TYPES ---
    ⍝ scalar: single-valued array
    ⍝ integer number
    ⍝ floating-point number
    ⍝ character value, declared within '' single quotation marks
    ⍝ string value, declared within "" double quotation marks 
    ⍝ boolean TRUE and FALSE, declared as 1 and 0 respectively

3 ⍝ stores an integer number value
3.14 ⍝ stores a floating-point number value
'c' ⍝ stores a character value declared within '' single quotation marks
"hello" ⍝ stores a string value declared within "" double quotation marks, handled as a character vector
0 ⍝ boolean FALSE, can be combined with logical operators
1 ⍝ boolean TRUE, can be combined with logical operators

⍝ --- ARRAY TYPES ---
    ⍝ arrays are the fundamental data type in APL
    ⍝ vector: one-dimensional array generated along a single axis, the equivalent of a list in most other programming languages
    ⍝ matrix: two-dimensional array with rows and columns

1 2 3 4 5 ⍝ numeric vector
1 2 ⍴ 3 4 5 6 ⍝ Numeric matrix, reshaped into 2 rows and 3 columns
'hello' 'world' ⍝ character vector (a.k.a a string)
(1 2 3) (4 5 6) ⍝ nested numeric vector
```

## Operators

```
⍝ ----- OPERATOR -----

⍝ --- ARITHMETIC OPERATORS ---

+  ⍝ addition
-  ⍝ subtraction
×  ⍝ multiplication
÷  ⍝ division
⍟  ⍝ logarithm operator

⍝ --- COMPARISON OPERATORS ---

=  ⍝ equality operator 
≠  ⍝ inequality operator
<  ⍝ comparison operator
≤  ⍝ comparison operator
>  ⍝ comparison operator
≥  ⍝ comparison operator

⍝ --- LOGICAL OPERATORS ---

∧  ⍝ logical AND
∨  ⍝ logical OR
~  ⍝ logical NOT

⍝ --- ARRAY OPERATORS ---

⍴  ⍝ reshape operator
⍳  ⍝ index generator operator
⍴  ⍝ reshape array operator
,  ⍝ flatten array operator
```

## Control structures

```
⍝ ----- CONTROL STRUCTURE -----

⍝ --- CONDITIONALS ---
    ⍝ APL does not feature the actual 'if' 'else if' 'else' syntax present in most other programming languages
    ⍝ × => specifies the relationship between a predicate condition on the left and the evaluated result on the right
        ⍝ chaining multiple × conditional operators allows for the equivalent of if else is else constructs

x ← 20 ⍝ variable assignment
result ← (x > 5) × 'greater than 5' ⍝ if x > 5 set result to 'greater than 5'
result ← (x = 5) × 'equal to 5' ⍝ else if x = 5 set result to 'equal to 5'
result ← 'less than 5' ⍝ else set result to 'less than 5'
result ⍝ evaluates to the char vector 'greater than 5'

⍝ --- LOOPS ---
    ⍝ APL avoids explicit loops by convention, similar to the functional programming paradigm
    ⍝ instead, APL uses array operations to handle most iteration and traversal of arrays
    ⍝ chaining array operations does afford the creation of the equivalent of both FOR loops and WHILE loops

⍝ FOR LOOP

vec ← 1 2 3 4 5 ⍝ defining a vector of values
result ← vec × 2 ⍝ for each element in the vector, apply the specified function that multiplies each element's value by 2 
result ⍝ evaluates to a new vector that has had each element's value multiplied by 2

⍝ WHILE LOOP

i ← 1 ⍝ initialise a variable
results ← ⍬ ⍝ define an empty vector to store results
while i ≤ 5 { ⍝ equivalent of a while loop that continues execution until the predicate is false
    results ← results, i ⍝ appends i to the results array
    i ← i + 1 ⍝ increments the value of i by 1 each iteration
}
results ⍝ evaluates to the integer vector 1, 2, 3, 4, 5
```

## Data structures

```
⍝ ----- DATA STRUCTURE -----
    ⍝ arrays are the primary data structure in APL
    ⍝ scalar: a single-valued array
    ⍝ vector: one-dimensional array
    ⍝ matrix: two-dimensional array
    ⍝ higher-dimensional arrays

42 ⍝ an integer scalar
1 2 3 4 5 ⍝ an integer vector
2 2 ⍴ 1 2 3 4 ⍝ an integer 2 by 2 matrix
2 2 2 ⍴ 1 2 3 4 5 6 7 8 ⍝ an integer 2 by 2 by 2 higher-dimensional array
(1 2 3) (4 5 6) ⍝ a nested array consisting of vector of vectors
```

## Functions

```
⍝ ----- FUNCTION -----
    ⍝ APL functions can receive either...
        ⍝ 1 argument (monadic)
        ⍝ 2 arguments (dyadic)
    ⍝ {} => specify a user-defined function within the 2 curly braces, which can then be assigned to a variable name to be a named function

- 5 ⍝ this is techically a monadic negation function that evaluates to -5 
2 + 3 ⍝ this is a dyadic addition function that evaluates to 5
square ← { ⍵ × ⍵ } ⍝ defines a MONADIC named function that squares its argument
square 4 ⍝ calling of the named function, which here evaluates to 16
sum ← { ⍺ + ⍵ } ⍝ defines a DYADIC named function that adds its two arguments
3 sum 4 ⍝ calling of the named function, which here evaluates to 7
```

## More on

* [learn APL in y minutes](https://learnxinyminutes.com/docs/apl/)
* [APL documentation](https://aplwiki.com)
* [GNU APL](https://www.gnu.org/software/apl/apl.html)
* [APL routines](https://aplwiki.com/routines)
* [APL Course](https://course.dyalog.com/) by Dyalog
* [TryAPL](https://tryapl.org/)
* [Learning APL](https://xpqz.github.io/learnapl/intro.html)
* [Functional vs Array Programming](https://youtu.be/UogkQ67d0nY?si=-AYn3N3XyKRYzK-O) by code_report
