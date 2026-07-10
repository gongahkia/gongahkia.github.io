---
category: Tech
---
# Pony

# `Pony`

Actor-model language for safe, scalable application development.

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
// ----- PRINT -----
    // env.out.write() => receives a string argument which is then displayed to the stdout and does not include a newline by default 
    // env.out.print() => receives a string argument which is then displayed to the stdout and automatically includes a newline

env.out.write("this does not include a newline and its inclusion must be explicitly specified as here\n")
env.out.print("this includes a newline automatically")
```

## Quickstart

```
// ----- QUICKSTART -----
    // strong and statically typed to provide guarantees against null-pointer dereferencing and deadlocks
    // object-oriented actor-model programming language that emphasizes type safety, memory safety, and performance
    // compiles to bytecode, enabling the development of high-performance native applications
    // emphasizes concurrent programming without data races using lightweight actors and message passing
```

## Types

```
// ----- TYPE -----

// --- SCALAR TYPES ---
    // Bool => true, false
    // I32 => stores a 32-bit signed integer value
    // U64 => stores a 64-bit unsigned integer value
    // F64 => stores a 64-bit floating-point number value
    // String => stores a sequence of UTF-8 characters

// --- REFERENCE TYPES ---
    // Array[A] => stores a dynamically-sized collection of elements of a single datatype A
    // List[A] => a singly-linked list of elements of a single datatype A
    // Map[K, V] => stores a collection of key-value pairs with keys of type K and values of type V that adhere to the predefined type signature
    // Option[A] => represents an optional value which can either be of the datatype Some(A) or None

let exampleBool: Bool = true
let exampleInt: I32 = 42
let exampleFloat: F64 = 3.14
let exampleString: String = "Hello, Pony!"
let exampleArray: Array[I32] = [1; 2; 3; 4; 5]
let exampleList: List[String] = List[String]
let exampleMap: Map[String, I32] = Map[String, I32]
let exampleOption: Option[I32] = None
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

== // equality operator
!= // inequality operator
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATORS ---

and // logical AND
or // logical OR
not // logical NOT
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF THEN ELSE IF THEN ELSE END 
    // operates the same as if else if else conditional constructs in most other programming languages
    // note that end is used to delimit the end of the conditional construct similar to Bash

if x > 5 then
    env.out.print("x is greater than 5")
else if x == 5 then
    env.out.print("x is equal to 5")
else
    env.out.print("x is less than 5")
end

// MATCH | 
    // similar to switch-case in other languages that enables powerful pattern-matching on values and types
    // => => specifies the relationship between a given predicate case condition and the execution code to be run if that case is fulfilled
    // _ => catch-all operator that runs when all other predicate case conditions fall through

match x
    | 1 => env.out.print("x is 1")
    | 10 => env.out.print("x is 10")
    | _ => env.out.print("x is something else")
end

// --- LOOPS ---

// FOR IN DO END
    // provides a way to iterate over collections like arrays and lists
    // operates the same as in Python
    // observe the for loop construct is similarly delimited by the end keyword similar to Bash

for item in exampleArray.values() do
    env.out.print(item.string())
end

// WHILE DO END
    // while loop construct which loops until the specified predicate condition is false
    // operates the same as in Python
    // observe the while loop construct is similarly delimited by the end keyword similar to Bash

while x < 10 do
    env.out.print(x.string())
    x = x + 1
end
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // Array[] => dynamically-sized collection of elements of a single datatype
    // List[] => singly-linked list of elements of a single datatype
    // Map[] => mutable collection of key-value pairs where key-value pairs adhere to the predefined type signature specified at initialisation
    // Tuple[] => immutable ordered pair of elements of multiple datatypes

let anotherExampleArray: Array[String] = ["Hello"; "Pony"]
let anotherExampleList: List[I32] = List[I32]
let anotherExampleMap: Map[String, F64] = Map[String, F64]
let anotherExampleTuple: (String, I32) = ("Erlang", 1986)
```

## Functions

```
// ----- FUNCTION -----
    // fun <function_name>(<function_parameter(s)>): <return_type> => <indented_function_body> => defines a named function in Pony
    // {(function_parameter(s))}: <return_type> => <inline_function_body> => defines an anonymous function which is then traditionally assigned to a named variable

class Example
    fun add(a: I32, b: I32): I32 =>
        a + b
    fun exampleAnonymous() =>
        let sum = {(a: I32, b: I32): I32 => a + b}
```

## More on

* [Pony documentation](https://devdocs.io/pony/)
* [Pony Performance cheat sheet](https://www.ponylang.io/use/performance/pony-performance-cheat-sheet/)
* [ponylang.io](https://www.ponylang.io/)
* [ponyc github](https://github.com/ponylang/ponyc)
* [Pony - High-Performance Safe Actor Programming](https://news.ycombinator.com/item?id=25957307) by Hacker News
