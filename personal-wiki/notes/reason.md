---
category: Tech
---
# Reason

# `Reason`

Syntax and tooling extension on top of OCaml for reliable, maintainable software development with seamless JavaScript interoperability.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

/* this is a 
multi-line 
comment */
```

## Printing

```
// ----- PRINTING -----
    // Js.log() => receives a string argument that is then printed to the stdout and includes a newline automatically
    // note that there is no built-in implementation to display a string to the stdout without including a newline

Js.log("this includes a newline by default"); 
```

## Quickstart

```
// ----- QUICKSTART -----
    // semicolon-delimited functional language
    // strongly, statically-typed with type inference for convenience
    // high performance optimisation with strict type safety
    // compiles to native bytecode or transpiles to JavaScript
    // let => declares an immutable variable binding, note that Reason variables are immutable by default similar to Rust
    // : => specifies the datatype of a given variable, providing type annotations for safety and expressiveness
    // := => reassigns a new value to an existing mutable reference variable created with ref()
```

## Types

```
// ----- TYPE -----
    // int => stores an integer number value
    // float => stores a floating-point number value
    // string => stores a string value declared within "" double quotation marks, note that characters are handled as single-character long strings
    // bool => true, false
    // Option => specifies that a given value could either be of the specified datatype (and thereby Some) or the special value None
    // Some => represents the presence of a value
    // None => represents the absence of a value, the equivalent of void and null in other programming languages
    // ref() => creates a mutable reference variable whose datatype is also specified within the () round brackets, and whose value can then be reassigned with :=
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATORS ---

+ // addition
- // subtraction
* // multiplication
/ // division
mod // modulo

// --- COMPARISON OPERATORS ---

== // thorough physical equality check for whether two objects have the same memory address
= // partial equality check for value but not type or memory address
!= // partial inequality check for value but not type or memory address
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATORS ---

&& // logical and
|| // logical or
not() // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE
    // observe that as a functional language, the results of a conditional construct as below can be direcly assigned to a variable

let categorizeNumber = (n) => {
    if (n < 0) {
        "negative";
    } else if (n == 0) {
        "zero";
    } else if (n > 0 && n < 10) {
        "positive and less than 10";
    } else {
        "positive and 10 or greater";
    }
};

// SWITCH | => _
    // provides an advanced degree of pattern-matching, the equivalent of match case in Rust and select case in many other programming languages
    // | => delimits each specified case and their corresponding execution code from the other cases
    // _ => specifies the default fall-through case which executes if all other predicate case conditions fail to be met
    // note that => specifies the relationship between a given predicate case condition and the execution code to be run if that case is met

let describeNumber = (x) => {
    switch (x) {
        | 0 => "zero"
        | 1 => "one"
        | _ => "many"
    }
};

// --- LOOPS ---

// WHILE 
    // operates similarly to while loops in most other programming languages

let total = ref(0); 
let i = ref(1); 
while (!=(!i, 11)) { 
    total := !total + !i; 
    i := !i + 1;
    Js.log(total);
};

// FOR IN
    // allows for iteration and traversal over an iterable data structure
    // operates similarly to for in loops in Python and foreach loops in PHP

for (i in 0 to 5) {
    Js.log(i);
};
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // list => fixed-size immutable singly-linked list traversed via recursion and enabling pattern-matching, declared within [] square brackets
    // array => fixed-size mutable ordered collection of elements of the same datatype, the equivalent of lists in Python
    // tuple => fixed-size immutable ordered collection of elements of multiple datatypes that affords powerful tuple destructuring, the equivalent of tuples in Python
    // record => immutable user-defined collection of specified named fields and their corresponding datatypes, the equivalent of structs in Rust and Typescript, affording the modelling of representative data via type aliases
    // variant => enumerated sun type that could be one of several user-defined types affording powerful pattern-matching, the equivalent of enums in Rust and Typescript

let anExampleList = [1, 2, 3, 4];

let anExampleArray = [|1, 2, 3, 4|];

let anExampleTuple = (1, "Hello", true);
let (x, y, z) = anExampleTuple; // tuple destructuring

type anExampleRecordOfAPerson = {
    name: string,
    age: int,
};

type threeDimensionalCoordinate = {
    X: int,
    Y: int,
    Z: int,
};

type anExampleVariant =
    | Circle(float)
    | Rectangle(float, float);

let area = (s) => {
    switch (s) {
        | Circle(radius) => 3.14 *. radius *. radius
        | Rectangle(width, height) => width *. height
    }
};
```

## Functions

```
// ----- FUNCTION -----
    // functions are first-class citizens, allowing for the creation of user-defined higher-order functions
    // while the syntax for creation of named and anonymous functions appear to be exactly the same as below, their use cases distinguish them from each other
    // note that Reason inherits from functional programming paradigms, featuring implicit return of the last expression within the function
    // let <functionName> = (<functionParameter(s)>) => <functionDefinitionBody> => definition and declaration of a named function, which are then called by their function name
    // let <anonymousFunctionVariableIdentifier> = (<functionParameter(s)>) => <functionDefinitionBody> => definition of an anonymous function, which is then assigned to a named variable identifier
        // also observe that anonymous functions can also be called directly in the same line as their definition

let add = (x, y) => x + y; // definition of a named function
let result1 = add(2, 3); // calling a named function
let result2 = add(3, 4); // calling a named function again
let result3 = add(4, 5); // calling a named function the last time

let subtract = (x, y) => x - y; // definition of an anonymous function
let result4 = subtract(5, 3); // calling an anonymous function
let resultDirect = ((x, y) => x * y)(4, 5); // anonymous function is declared and called in the same line

let applyFunction = (f, x) => f(x); // definition of a higher-order function
applyFunction((x) => x * x, 5); // calling a higher-order function
```

## More on

* [install reason](https://reasonml.github.io/docs/en/installation)
* [reasonml.github.io](https://reasonml.github.io/)
* [reason documentation](https://reasonml.github.io/docs/en/what-and-why)
* [learn reason in y minutes](https://learnxinyminutes.com/docs/reason/)
