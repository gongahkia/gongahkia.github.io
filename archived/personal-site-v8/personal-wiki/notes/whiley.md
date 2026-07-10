---
category: Tech
---
# Whiley

# `Whiley`

Functional language for development of tools, static analyzers and DSLs.

## Comments

```
// ----- COMMENT ----- 

// this is a single-line comment

/* 
this is a 
multi-line 
comment 
*/
```

## Printing

```
// ----- PRINTING ----- 
    // io.print() => receives a string argument which is then printed to the stdout and this does not include a newline by default
    // io.println() => receives a string argument which is then printed to the stdout and automatically includes a newline at the end of the output

io.print("this does not include a newline and we must explicitly specify its inclusion as here\n")
io.println("this has a newline and we do not need to specify it, it comes with it")
```

## Quickstart

```
// ----- QUICKSTART ----- 
    // statically strongly-typed language with robust error handling
    // adheres to functional paradigms with support for pure functions, immutability, and higher-order functions
    // concurrency support and parallelism
    // inherits its modern and easy to understand, indentation-focused syntax from Python
    // provides first-class support for contracts and conditions (preconditions, postconditions, invariants)
    // therefore, Whiley is commonly used for development of system software, formal methods and verification
    // also used for middleware and web services
```

## Types

```
// ----- TYPE ----- 
    // below are some of Whiley's primitive datatypes
    // int => stores an integer number value
    // real => stores a floating-point number value
    // bool => true, false
    // char => stores a character value declared within '' single quotation marks
    // string => stores a string value declared within "" double quotation marks
    // null => special value that represents the absence of any value stored in a variable
    // Void => represents a null datatype within the context of function definitions and their type signatures
```

## Operators

```
// ----- OPERATOR ----- 

// --- ARITHMETIC OPERATORS ---

+ // addition
- // subtraction
* // multiplication
/ // division
% // modulo

// --- COMPARISON OPERATORS ---

== // complete equality check for both value and type
!= // complete inequality check for both value and type
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATORS ---

&& // logical and
|| // logical or
! // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE ----- 

// --- CONDITIONALS ---

// IF ELSE IF ELSE

function classifyNumber(int x) -> void:
    if x > 0:
        io.println(x ++ " is positive");
    else if x < 0:
        io.println(x ++ " is negative");
    else:
        io.println(x ++ " is zero");

// --- LOOPS ---

// FOR IN 
    // used for iteration and traversal over iterable data structures
    // the equivalent of for in loops similar to those in Python and foreach loops in PHP
    // .. => dynamically generates an integer-based range, which is an iterable data structure, similar to the range-creation operator in Haskell and Rust

function printRange(int start, int end) -> void:
    for i in start .. end:
        io.println("Current number: " ++ i);

function printArray(int[] numbers) -> void:
    for n in numbers:
        io.println("Current number: " ++ n);

// WHILE
    // operates the same as you'd expect, similar to while loops in most other programming languages

function countdown(int start) -> void:
    while start > 0:
        io.println(start);
        start = start - 1;
```

## Data structures

```
// ----- DATA STRUCTURE ----- 
    // array => fixed-size ordered indexed collection of elements of the same datatype declared within [] square brackets
    // dictionary => dynamically-sized unordered collection of key-value pairs with unique keys and values of multiple datatypes, the equivalent of arrays in most other programming languages, declared within {} curly braces
    // record => fixed-size user-defined collection of named fields and their corresponding datatypes, the equivalent of Structs in Go and Typescript

int[] anExampleIntegerArray = [1, 2, 3, 4, 5]
string[] anExampleStringArray = ["Alice", "Bob", "Charlie"]

string[int] anExampleDictionary = {
                                    0: "zero",
                                    1: "one", 
                                    2: "two",
                                    3: "three",
                                    4: "four",
                                    5: "five",
                                    6: "six",
                                    7: "seven",
                                    8: "eight",
                                    9: "nine"
                                }

string[int] phoneBook = {
                            "Alice": 123456789, 
                            "Bob": 987654321,
                            "Charlie": 111111111
                        }; 

record anExampleRecord:
    int Age
    string Name
    char Grade
    real ActualGrade

record threeDimensionalCoordinate:
    int X
    int Y
    int Z
```

## Functions

```
// ----- FUNCTION ----- 
    // function <functionName> ( <parameterName(s)> <parameterDatatype(s)> ) -> <returnDatatype(s)>: <functionDefinitionBody> => declaration and definition of a named function

function max(int x, int y) -> int:
    if x > y:
        return x
    else:
        return y
```

## More on

* anonymous functions *(lambdas)*
* nominal types
* type aliases
* union types
* intersection types
* subtyping
* type quantifiers
* nullable types
* type parameterization
* recursive types
* function reference types
* method reference types
* type invariants
* existential quantification
* universal quantification
* [install whiley](https://whiley.org/install/)
* [whiley.org](https://whiley.org/)
* [whiley documentation](https://github.com/Whiley/WhileyDocs)
* [getting started with whiley](https://whiley.org/pdfs/GettingStartedWithWhiley.pdf)
