---
category: Tech
---
# Dafny

# `Dafny`

Language designed specifically for formal verification, widely used in academic and industrial settings for writing reliable software.

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
    // print => receives a string argument that is then printed to the stdout without including a newline by default
    // note that Dafny has no standard implementation for printing to the stdout with a newline included automatically

print "this does not have a newline";
print "this has a newline but only because we explicitly specify its inclusion\n";
```

## Quickstart

```
// ----- QUICKSTART -----
    // strongly statically-typed
    // ensures program safety and correctness through rigorous specification and control of program behaviour
    // method Main() => specifies the entry point of a Dafny program wherein all execution code is written, the equivalent of the main function in langauges from the C family
    // :=  => assignment operator in Dafny, used to assign a value to a given variable or named field
    // : => specifies the datatype of a given variable, providing type declaration within Dafny

method Main() {
    var x := 5;
    var y := 10;
    var sum := x + y;
    print sum; % this prints without a newline
}
```

## Types

```
// ----- TYPE -----
    // int => stores an integer whole number value
    // real => stores a real number value, which covers floating-point number values
    // char => stores a single character long value declared within '' single quotation marks
    // string => stores a string value declared within "" double quotation marks
    // bool => true, false
```

## Operators

```
// ----- OPERATORS -----

// --- ARITHMETIC OPERATORS ---

+ // addition
- // subtraction
* // multiplication
/ // divison
% // modulo

// --- COMPARISON OPERATORS ---

== // complete equality check for both value and type for primitive datatypes, and checks whether it is the same object in memory for reference types
!= // complete inequality check for both value and type for primitive datatypes, and checks whether it is not the same object in memory for reference types
> // comparison operators
< // comparison operators
>= // comparison operators
<= // comparison operators

// --- LOGICAL OPERATORS ---

&& // logical and 
|| // logical or
! // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURES -----

// --- CONDITIONALS ---
    // Dafny has no conventional switch case constructs as in other programming languages
    // instead, basic pattern-matching can still be achieved with if else if else conditional constructs as below

// IF ELSE IF ELSE

method Main() {
    var age := 18;
    if age >= 18 {
        print "Adult\n";
    } else if age >= 13 {
        print "Teenager\n";
    } else {
        print "Child\n";
    }
}

// --- LOOPS ---
    // Dafny does not have conventional for loop constructs as in other programming languages, but while loops can still be used to achieve some of the effects of for loop range-based iteration
    // this is in line with Dafny's emphasis on loop invariants and termination proofs to ensure verification correctness

// WHILE

method Main() {
    var i := 0;
    while i < 5 {
        print i;
        print "\n";
        i := i + 1;
    }
}
```

## Data structures

```
// ----- DATA STRUCTURES -----
    // array => fixed-size mutable ordered collection of elements of the same datatype
    // sequence => dynamically-sized mutable ordered collection of elements of the same datatype
    // set => mutable unordered collection of unique elements of the same datatype
    // map => mutable unordered collection of key-value pairs of multiple datatypes with unique keys, the equivalent of dictionaries in Python
    // tuple => immutable fixed-size ordered collection of elements of multiple datatypes
    // datatype => immutable user-defined variant enumeration datatype with optional specified named fields and their datatypes, allowing the modelling of the variants of representative structured data, the equivalent of a hybrid of enums and structs in other languages

var anExampleArray := new int[5];
anExampleArray[0] := 10;
anExampleArray[1] := 20;
anExampleArray[2] := 30;
anExampleArray[3] := 40;
anExampleArray[4] := 50;

var anExampleSequence := [1, 2, 3, 4, 5];

var anExampleSet := set {1, 2, 3};

var anExampleMap := map[1 := "one", 2 := "two"];

var anExampleTuple := (1, "two");

datatype anExampleDatatype := John | Elaine | Roger
datatype Color = Red | Green | Blue
```

## Functions and Methods

```
// ----- FUNCTION -----
    // Dafny inherits some characteristics from the functional paradigm, including implicit return of the last expression within the function body
    // function <functionName> ( <functionParameterName(s)> : <functionParameterDatatype(s)> ) : <functionReturnDatatype> { <functionBody> } => function declaration and definition of a named function

function add(a: int, b: int): int {
    a + b
}
```

## More on

* [install dafny](https://dafny.org/dafny/Installation)
* [methods in dafny](https://marcfrappier.espaceweb.usherbrooke.ca/IFT734/ref/dafny/documents/Dafny%20tutorial-web.pdf)
* [object-oriented programming in dafny](https://trepo.tuni.fi/bitstream/handle/10024/96327/GRADU-1416392953.pdf?sequence=1&isAllowed=y)
* [dafny documentation](https://dafny.org/dafny/DafnyRef/DafnyRef.html)
* [dafny cheatsheet](https://webcms3.cse.unsw.edu.au/static/uploads/course/SENG2011/16s1/bf5522d15159428494b373f49f10021645fbbe94724e8dc6fed13d08c1919b85/DafnyCheatsheet.pdf)
* [dafny org](https://dafny.org/)
