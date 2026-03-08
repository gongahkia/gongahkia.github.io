# Gleam

# `Gleam`

Functional language that transpiles to BEAM (Erlang's Virtual Machine) bytecode to build scalable, maintainable systems.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

/*
this is a 
multi-line comment
in Gleam
*/
```

## Printing

```
// ----- PRINTING -----
    // io.print() => receives a string argument that it then prints to the stdout without a newline being included 
    // io.println() => receives a string argument that it then prints to the stdout, automatically including a newline

io.print("this does not include a newline and one must be explicitly specified if desired\n")
io.println("this automatically includes a newline")
```

## Quickstart

```
// ----- QUICKSTART -----
    // strong statically-typed language
    // emphasizes safety, performance and Erlang's concurrency model
    // all execution code within your Gleam file runs from the main function fn main(), similar to all other C-style languages
    // notably differing from C-style traditions, Gleam is not a semicolon-delimited language
    // import => brings the required libraries into the local scope of the present Gleam file, note that Gleam has full access to all existing Erlang libraries and frameworks
    // : => declares the datatype of a given constant and variable, allowing for type declaration
    // let => declares a variable with a mutable value that can be reassigned after declaration and initialisation
    // const => declares a constant with an immutable value that cannot be reassigned after declaration and initialisation

import gleam/io

pub fn main() { // main function
    let name = "gooked" // string variable
    const AGE: Int = 30 // integer constant
    io.println("hello " ++ name ++ " and welcome to the world from a " ++ to_string(AGE) ++ " years old Gleam program")
}
```

## Types

```
// ----- TYPE -----
    // Int => stores signed and unsigned integer number values
    // Float => stores signed and unsigned floating point number values
    // Bool => true, false
    // Atom => stores a constant value identified by its name where atoms are declared with a : colon prefacing the atom value, the equivalent of atoms in Elixir, symbols in Ruby and keywords in Common Lisp and Clojure
    // String => stores a string value declared within "" double quotation marks, note that characters are handled as strings in Gleam
    // BitString => stores a sequence of bits or bytes mostly used to store binary data, declared within <<>> double angle brackets
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATOR ---

+ // addition
- // subtraction
* // multiplication
/ // division
% // modulo
^ // exponentiation

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

let x = 10
if x < 0 {
    io.println("x is negative")
} else if x == 0 {
    io.println("x is zero")
} else {
    io.println("x is positive")
}

// CASE -> _
    // provides a degree of pattern-matching in Gleam similar to languages like Rust, the equivalent of switch case and match case constructs in other languages
    // heavily used in Gleam for completeness and literate, safe programming
    // -> => specifies the relationship between a given predicate case condition and the logic that should execute if that condition is met
    // _ => specifies the logic for a default fall-through case where all other predicate case conditions are left unmet

let x = 3
case x {
    1 -> io.println("One")
    2 -> io.println("Two")
    3 -> io.println("Three")
    _ -> io.println("Other")
}

// --- LOOPS ---
    // since Gleam is a functional language, it carries over many hallmarks of the functional paradigm, including the absence of conventional loop constructs
    // instead, user-defined higher-order functions (and occasionally recursion) are used for traversal and iteration over iterable data structures

// HIGHER ORDER FUNCTIONS
    // the below are one way to implement some standard higher-order functions, note the express use of case -> _ constructs
        // map => applies a specified function to each element of the iterable structure and returns the transformed structure
        // foreach => applies a specified function to each element of the iterable structure in place in memory and does not return anything
        // filter => filters each element of an iterable structure based off a specified predicate function 
        // reduce => reduces an iterable structure to a single value using a specified accumulator function by folding to the left
        // foldr => reduces an iterable structure to a single value using a specified accumulator function by folding to the right

pub fn map_list(lst: List(Int), f: fn(Int) -> Int) -> List(Int) {
    case lst {
        [] -> []
        [head | tail] -> [f(head) | map_list(tail, f)]
    }
}

pub fn for_each(lst: List(Int), f: fn(Int) -> ()) {
    case lst {
        [] -> ()
        [head | tail] -> {
            f(head)
            for_each(tail, f)
        }
    }
}

pub fn filter_list(lst: List(Int), predicate: fn(Int) -> Bool) -> List(Int) {
    case lst {
        [] -> []
        [head | tail] -> if predicate(head) { [head | filter_list(tail, predicate)] } else { filter_list(tail, predicate) }
    }
}

pub fn reduce_list(lst: List(Int), f: fn(Int, Int) -> Int, initial: Int) -> Int {
    case lst {
        [] -> initial
        [head | tail] -> reduce_list(tail, f, f(initial, head))
    }
}

pub fn foldr_list(lst: List(Int), f: fn(Int, Int) -> Int, initial: Int) -> Int {
    case lst {
        [] -> initial
        [head | tail] -> f(head, foldr_list(tail, f, initial))
    }
}

// RECURSION
    // Gleam also allows for recursion to allow for more complex iteration over iterable structures

pub fn factorial(n: Int) -> Int {
    case n {
        0 -> 1 // base case
        _ -> n * factorial(n - 1) // recursive case
    }
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // Tuple => fixed-size ordered collection of elements of multiple datatypes declared within () round brackets
    // List => dynamically-sized ordered collection of elements of the same datatype declared within [] straight brackets
    // Map => unordered collection of key-value pairs declared within %{} percentage sign and curly braces, the equivalent of dictionaries in Python and tables in Lua and PHP
    // Type => user-defined collection of comma-delimited named fields and their datatypes declared within {} curly braces, allowing for modelling of representative data in your Gleam program through type aliases, the equivalent of structs in Go and Rust

let anExampleTuple: (String, Int) = ("Alice", 30)
let anExampleList: List(Int) = [1, 2, 3, 4, 5]
let anExampleMap: Map(String, String) = %{ "red" => "#FF0000", "green" => "#00FF00", "blue" => "#0000FF" }
type anExampleRecord = {
    name: String,
    age: Int
}
type coordinate = {
    X: String,
    Y: String
}
```

## Functions

```
// ----- FUNCTION -----
    // similar to other functional languages, Gleam features implicit return of the last expression within a function, there is no explicit return keyword used traditionally in Gleam
    // fn <functionName> ( <functionParameter(s)> : <functionParameterDatatype(s)> ) -> {returnDatatype(s)} { <functionBodyDefinition> } => declaration and definition of a named function
    // fn ( <functonParameter(s)> : <functionParameterDatatype(s)> ) -> <returnDatatype(s)> { <functionBodyDefinition> } => declaration and definition of an anonymous function that is normally assigned to a named variable as seen below

fn greet(name: String) { // a named void function
    io.println("Hello, " ++ name ++ "!")
}
greet("Alice")

fn square(x: Int) -> Int { // a named integer function
    x * x // implicit return of the last expression in the function
}

let double = fn(x: Int) -> Int { x * 2 } // an anonymous function
```

## More on

* [gleam documentation](https://gleam.run/documentation/)
* [learn gleam in y minutes](https://learnxinyminutes.com/docs/gleam/)
