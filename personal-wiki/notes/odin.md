# Odin

# `Odin`

Data-oriented language with low-level control.

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
    // std.put() => prints the specified string argument to the stdout without including a newline by default

std.put("Hello, Odin!\n");
```

## Quickstart

```
// ----- QUICKSTART -----
    // all odin execution code is written within the main procedure
    // statically, strongly-typed
    // semicolon language
    // import => bring a specified library into the local scope of the given odin file

import std;

main :: proc() {
    std.put("this is my first odin program\n");
}
```

## Types

```
// ----- TYPE -----
    // int => integer value
    // float => floating point value
    // string => declared within "" double quotes, characters in odin are handled as one-character long strings
    // bool => true, false
    // () => empty tuple represents the absence of a datatype when a procedure does not return any value
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

== // complete equality, including type
!= // complete inequality, including type
< // comparison operator
> // comparison operator
<= // comparison operator
>= // comparison operator

// --- LOGICAL  OPERATOR ---

&& // and
|| // or
! // not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE

isAdult(age: int) -> void {
    if age >= 18 {
        std.put("Adult\n");
    } else if age >= 13 {
        std.put("Teenager\n");
    } else {
        std.put("Child\n");
    }
}

// CASE => _
    // equivalent of switch case construct in other programming languages
    // provides basic pattern-matching in odin
    // _ => represents the catch-all operator for all predicate conditional checks that fail and fall through, similar to Rust

getType(age: int) -> string {
    case age {
        0 => return "Baby";
        1 => return "Toddler";
        2 => return "Child";
        _ => return "Unknown";
    }
}

// --- LOOPS ---

// FOR LOOPS
    // conventional C-style for loops with an explict start, end and step

for i: int = 0; i <= 4; i += 1 {
    std.put("%d\n", i);
}

// FOREACH IN LOOPS
    // foreach loops allow for iteration over an iterable data structure in odin

numbers: []int = {1, 2, 3, 4, 5};
foreach number in numbers {
    std.put("%d\n", number);
}

// WHILE LOOPS

i: int = 0;
while i < 5 {
    std.put("%d\n", i);
    i += 1;
}

// LOOP CONSTRUCT
    // loop => keyword can also be called directly to create an infinite loop similar to Rust, do note that the break condition must then be specified seperately

i: int = 0;
loop {
    std.put("%d\n", i);
    i += 1;
    if i >= 5 { // break condition
        break; 
    }
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => fixed-size ordered collection of elements of the same datatype
    // tuple => fixed-size ordered collection of elements of multiple datatypes
    // struct => composite datatype defined by its collection of user-defined comma-delimied fields, allowing for structured representation of data via type aliases similar to structs in Go and Typescript

anArray: [5] int = {1, 2, 3, 4, 5}; // array

aTuple: (string, int) = ("Alice", 30); // tuple

type aStruct struct { // struct
    firstName: string,
    lastName: string,
}

type Coordinate struct { // another struct
    x: float,
    y: float,
};
```

## Functions and Procedures

```
// ----- FUNCTION -----
    // odin functions must return a value, similar to functions in ada
    // note that there are NO void functions in odin since the equivalent are written as procedures
    // <functionName> :: func(<functionParameter(s)>:<functionDatatype(s)>) -> <returnDataType> => function definition for a named function in odin
    // functions are invoked with arguments using the same bracket syntax as many other programming languages

addNumbers :: func(a: int, b: int) -> int {
    return a + b;
}
result: int = addNumbers(3, 5);

// ----- PROCEDURE ------
    // odin procedures do not return a value and are effectively void functions in other programming languages, similar to procedures in ada
    // <procedureName> :: proc(<procedureParameter(s)>:<procedureDatatype(s)>) => procedure definition for a named procedure in odin
    // procedures are invoked with arguments using the same bracket syntax as void functions in many other programming langauges

printMessage :: proc(message: string) {
    std.put(message); // Print the message
}
printMessage("Hello, Odin!");
```

## More on

* [odin documentation](https://odin-lang.org/docs/)
