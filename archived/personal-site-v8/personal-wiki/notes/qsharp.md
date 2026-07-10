---
category: Tech
---
# Q#

# `Q#`

Domain-specific language for expressing quantum computations.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

// there is no default implementation for 
// multi-line comments in Q# but this effectively
// achieves the same effect
```

## Printing

```
// ----- PRINTING -----
    // Message() => operation that receives a String argument and prints it to the stdout without including a newline by default
    // there is no built-in Q# implementation for printing to the stdout with a newline automatically included

Message("this does not include a newline");
Message("this has a newline but only because we explicitly specified it\n");
```

## Quickstart

```
// ----- QUICKSTART -----
    // semicolon language
    // strongly statically typed with explicit type annotations for variables and functions
    // hybrid evaluation combining classicial control flow (conditionals and loops) with quantum operations
    // seamless integration with .NET languages
    // note that by default Q# variables are immutable 
    // : => declares the datatype of a given variable or function, effectively acting as type declaration and annotations within Q#
    // mutable => specifies that a given variable stores a mutable value whose value can be reassigned and modified after initalisation, the equivalent of mut in Rust
    // let => variable binding for a classical variable of immutable value, where the variable value cannot be reassigned after initalisation
    // set => used to update the value of a mutable variable within an operation or function
    // Allocate() => requests and allocates quantum resources (like qubits) for use in quantum computations, receiving an integer number value as an argument that specifies the number of qubits required for usage and returns the allocated resources
    // Release() => releases previously allocated resources (like qubits), receiving an integer number value as an argument that specifies the number of qubits required for release and returns Unit to indicate succesful release

operation AllocateQubits(numQubits : Int) : Qubit[] {
    return Allocate(numQubits);
}

operation ReleaseQubits(qubits : Qubit[]) : Unit {
    for (q in qubits) {
        Release(q);
    }
}
```

## Types

```
// ----- TYPE -----

// --- PRIMITIVE DATATYPES ---
    // Bool => true, false
    // Int => stores a signed 32-bit integer number value
    // BigInt => stores a signed arbitrary-precision integer number value
    // Double => stores a double-precision floating-point number value
    // String => stores a sequence of Unicode characters, declared within "" double quotation marks
    // Unit => special value representing the absence of a value, equivalent to void and null in other languages

// --- QUANTUM DATATYPES ---
    // Qubit => stores a quantum bit value, the foundational basic unit of quantum information
    // Result => stores the result of a quantum measurement
        // Zero
        // One
        // Plus
        // Minus
    // Pauli => stores the value of pauli matrices
        // PauliI
        // PauliX
        // PauliY
        // PauliZ
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

== // complete equality check for both value and type for primitive types, partial equality check for value for quantum types
!= // complete inequality check for both value and type for primitive types, partial inequality check for value for quantum types
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATOR ---

&& // logical and
|| // logical or
not // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE
    // note that the result of a conditional construct can be directly assigned to an operation or variable binding as seen below

operation ExampleIfElse(value : Int) : Unit {
    if (value > 0) {
        Message("Value is positive.");
    } else if (value < 0) {
        Message("Value is negative.");
    } else {
        Message("Value is zero.");
    }
}

// WHEN
    // used in the context of newtypes to specify a condition that instances of the newtype must satisfy

newtype NegativeInt = Int when value < 0;
newtype PositiveEvenInt = Int when value > 0 && value % 2 == 0;

// MATCH CASE => 
    // provides a degree of basic pattern-matching in Q# similar to Rust, the equivalent of switch case constructs in other languages
    // note that each predicate case condition is ; semicolon-delimited
    // similar to the above conditional construct, the result of a match case construct can be assigned to an operation or variable binding as seen below

operation ExampleMatchCase(result : Result) : Unit {
    match result {
        case Result.Zero => Message("Result is Zero.");
        case Result.One => Message("Result is One.");
        case Result.Plus => Message("Result is Plus.");
        case Result.Minus => Message("Result is Minus.");
    }
}

// --- LOOPS ---

// FOR IN 
    // functions similarly to for in and foreaach loops in other programming languages like Python and PHP
    // .. => dynamically creates an iterable range structure that allows traversal and iteration over each element of the iterable structure

operation ExampleLoop() : Unit {
    mutable sum = 0;
    for (i in 1 .. 5) {
        set sum += i;
    }
    Message($"Sum of numbers from 1 to 5: {sum}");
}

// WHILE 
    // functions similarly to while loops in other programming languages like Python

operation ExampleWhileLoop() : Unit {
    mutable count = 0;
    while (count < 5) {
        Message($"Count: {count}");
        set count += 1;
    }
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => dynamically-size ordered collection of elements of the same datatype
    // tuple => fixed-size ordered collection of elements of multiple datatypes
    // map => dynamically-sized unordered collection of specified named key-value pairs of multiple datatypes, the equivalent of dictionaries in Python
    // range => iterable range of integer values, defined from the rangeStartValue, rangeStepValue and rangeEndValue
    // struct => user-defined collection of specified named fields and their respective datatypes, affording representation of modelled data via type aliases, the equivalent of structs in Rust and Go
    // newtype => specifies a new type that is based on an existing declared datatype, except this new type has a distinct identity, used particularly to ensure type safety by distinguishing between similar types
        // when => used in the context of newtypes to specify a condition that instances of the newtype must satisfy
        // value => keyword identifier that specifies the value being evaluated against the specified condition

mutable anExampleArray = [1, 2, 3, 4, 5, 6]; 

let anExampleTuple = (name = "Alice", age = 30, isActive = true); 

let anExampleMap = [
    "name" => "Bob",
    "age" => 25,
    "isActive" => false
]; 

let anExampleRange = Range(1, 2, 10);

struct anExampleStruct {
    mutable firstName : String;
    mutable lastName : String;
}

struct twoDimensionalCoordinate {
    mutable X : Int;
    mutable Y : Int;
}

newtype anExampleNewTypeThatIsAPositiveInteger = Int when value > 0;
```

## Operations and Functions

```
// ----- OPERATION -----
    // represents quantum operations that perform actions or computations and DO NOT return any value, the equivalent of void functions in other programming languages
    // operation <operationName> () : Unit { <operationDefinitionBody> } => definition and declaration of an operation or function
        // Unit => the operation return datatype is Unit since operations by definition do not return a value

operation HelloQuantum() : Unit {
    Message("Hello, Quantum!");
}

// ----- FUNCTION -----
    // represents classical functions that return a value, working similarly to value-return functions in other programming languages
    // note that there are no void functions in Q# by definition since those are written as operations
    // function <functionName> ( <functionParameterName(s)> : <functionParameterDatatype(s)> ) : <functionReturnDatatype(s)> { <functionDefinitionBody> } => definition and declaration of a named function
        // return => note that Q# specifies the explicit return keyword for the value(s) to be returned from the function within the function definition body

function Square(x : Int) : Int {
    return x * x;
}
```

## More on

### Core reading

* [Q# documentation](https://learn.microsoft.com/en-us/azure/quantum/)
* [learn Q# in y minutes](https://learnxinyminutes.com/docs/qsharp/)

### Additional reading

* [Quipper documentation](https://hackage.haskell.org/package/quipper-language)
* [Silq documentation](https://www.sri.inf.ethz.ch/publications/bichsel2020silq)
* [Qiskit documentation](https://www.ibm.com/quantum/qiskit)
