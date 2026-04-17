---
category: Tech
---
# V

# `V`

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
    // print() => receives a string argument that is then printed to the stdout and does not include a newline by default
    // println() => receives a string argument that is then printed to the stdout and includes a newline automatically

print("this does not include a newline and one must be explicitly specified as seen here\n")
println("this already has a newline")
```

## Quickstart

```
// ----- QUICKSTART -----
    // strongly statically-typed language for high performance and safety
    // compiles directly to machine bytecode similar to languages from the C family
    // V is heavily inspired by and thus draws many syntactical and foundational similarities to other low-level systems programming languages like C, Rust and Go
    // most often used for systems programming, backend development and as an intermediary language for service integration
    // fn main() => acts as the entry point for the program within which all execution code is written, the equivalent of the main function or method in many other C-style programming languages
    // mut => specifies that a given variable is mutable, wherein mutable variables can have their values reassigned or modified even after the initial assignment, similar to mut in Rust
    // := => simultaneous variable intialization and assignment, operating similarly to := in Go
```

## Types

```
// ----- TYPE -----
    // i32 => 32-bit signed integer number value
    // i64 => 64-bit signed integer number value
    // u32 => 32-bit unsigned integer number value
    // u64 => 64-bit unsigned integer number value
    // f32 => 32-bit single-precision floating-point number value
    // f64 => 64-bit double-precision floating-point number value
    // Character => character value declared within '' single quotation marks
    // String => string value declared within "" double quotation marks
    // Boolean => true, false
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATOR ---

+ // addition
- // subtraction
* // multiplication
/ // divison
% // modulo

// --- COMPARISON OPERATOR ---

== // complete equality check for both value and type
!= // complete inequality check for both value and type
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATOR ---

&& // logical and
|| // logical or
! // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE 

age := 20
if age < 18 {
    println('You are a minor.')
} else if age >= 18 && age < 65 {
    println('You are an adult.')
} else {
    println('You are a senior citizen.')
}

// MATCH => _
    // provides advanced pattern-matching capabilities in V on par with those of Rust, seen below with conditional constructs specified within each pattern predicate case condition
    // the equivalent of select case or switch case in other programming languages
    // _ => specifies the default fall-through case which executes when all other predicate case conditions are unmet 

number := 42
match number {
    0 => {
        println('Zero')
    }
    n if n > 0 => {
        println('Positive number')
    }
    n if n < 0 => {
        println('Negative number')
    }
    _ => {
        println('Unknown')
    }
}

// --- LOOPS ---

// FOR IN
    // allows iteration and traversal over an iterable data structure
    // operates similar to for in loops in Python and foreach loops in PHP

for i in 1..=5 {
    println('Current number: $i')
}

// WHILE
    // operates similarly to while loops in most other programming languages

mut count i32 = 0
while count < 5 {
    println('Count: $count')
    count += 1
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => fixed-size ordered collection of elements of the same datatype, the equivalent of lists in Python
    // map => fixed-size unordered collection of key-value pairs of multiple datatypes, the equivalent of dictionaries in Python
    // set => dynamically-sized unordered collection of unique elements upon which various set operations can be called, the equivalent of sets in Python
    // struct => user-defined collection of specified named fields and their corresponding datatypes, the equivalent of structs in Rust and Typescript, allowing modelling of representative data via type aliases

anExampleArray := [1, 2, 3, 4, 5]

anExampleMap := {
    'name': 'Alice',
    'age': 30,
    'city': 'New York'
}

anExampleSet := set{'apple', 'banana', 'orange'}

struct anExampleStruct {
    name string
    age int
}
struct threeDimensionalCoordinate {
    X int
    Y int
    Z int
}
```

## Functions

```
// ----- FUNCTION -----
    // fn <functionName> ( <functionParameterName(s)> <functionParameterDatatype(s)> ) <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of a named function
    // fn ( <functionParameterName(s)> <functionParameterDatatype(s)> ) <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of an anonymous function, which is then normally assigned to a named variable identifier
    // return => explicit return keyword that specifies the return expression or value of the given function

fn aNamedAdditionFunction(a i32, b i32) i32 {
    return a + b
}

anAnonymousFunctionLiteralForAdditionLikeAbove := fn (a int, b int) int {
    return a + b
}
```

## More on

* [controversy surrounding v](https://www.reddit.com/r/ProgrammingLanguages/comments/vq4ul6/why_does_v_language_get_so_much_hate/)
* [vlang.io](https://vlang.io/)
* [v documentation](https://docs.vlang.io/introduction.html)
* [learn v in y minutes](https://learnxinyminutes.com/docs/v/)
