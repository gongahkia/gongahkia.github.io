---
category: Tech
---
# Lobster

# `Lobster`

Lighweight language with terse syntax for real-time graphics and games.

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
    // print() => receives a string argument that is then printed to the stdout without including a newline by default
    // println() => receives a string argument that is then printed to the stdout and this includes a newline automatically at the end of the output

print("this does not include a newline and we must explicitly specify its inclusion\n");
println("this includes a newline");
```

## Quickstart

```
// ----- QUICKSTART -----
    // statically-typed language with expressive type system that is easy to pick up
    // compile-time memory management
    // semicolon-delimited language inheriting from the syntax of both Python and languages from the C family
    // : => specifies the datatype of a variable or constant, providing the equivalent of type declaration in Lobster
    // var => declares a mutable variable whose value can be reassigned even after initial assignment
    // const => declares an immutable constant whose value cannot be reassigned even after initial assignment
```

## Types

```
// ----- TYPE -----
    // int => stores integer number value
    // float => stores floating-point number values
    // bool => true, false
    // string => string value declared within "" double quotation marks, note that characters are also handled as single-character long strings
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATORS ---

+ // addition
- // subtraction
* // multiplication
/ // divison
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

var num: int = 10;
if num > 0 {
    println("num is positive");
} else if num < 0 {
    println("num is negative");
} else {
    println("num is zero");
}

// MATCH CASE => ELSE
    // provides a degree of basic pattern-matching in Lobster, the equivalent of switch case as in other programming languages
    // observe that => specifies the relationship between the predicate case condition and the code to be executed if that case condition matches
    // else => specifies the fall-through case that executes if all other predicate case conditions fail, the equivalent of the default case in other programming languages

var option: int = 2;
match option {
    case 1 => {
        println("Option 1 selected");
    }
    case 2 => {
        println("Option 2 selected");
    }
    case 3 => {
        println("Option 3 selected");
    }
    else => {
        println("Invalid option");
    }
}

// --- LOOPS ---

// FOR IN 
    // used to iterate over a dynamically created iterable range construct, or over an array literal as seen below
    // operates similarly to for in loops in other programming languages and foreach loops in PHP

for i in range(1, 6) {
    println(i);
}

var numbers = [1, 2, 3, 4, 5];
for num in numbers {
    println(num);
}

// WHILE
    // operates similarly to while loops in other programming languages

var count: int = 0;
while count < 5 {
    println(count);
    count = count + 1;
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => dynamically-sized ordered collection of elements of the same datatype
    // dictionary => dynamically-sized unordered collection of key-value pairs, where every key must be a unique string and values can be of multiple datatypes

var anExampleArray = [1, 2, 3, 4, 5];
var anExampleDictionary = { "key1": value1, "key2": value2 };
```

## Functions

```
// ----- FUNCTION -----
    // function <functionName> ( <functionParameterName(s)> : <functionParameterDatatype(s)> ) : <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of a named function
    // fn ( <functionParameterName(s)> : <functionParameterDatatype(s)> ) -> <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of an anonymous function, which is normally then assigned to a named variable or constant identifier
    // return => explicit return keyword that specifies the return expression or value

function greet(name: string) {
    println("Hello, " + name + "!");
}
greet("Alice");

function add(a: int, b: int): int {
    var result = a + b;
    return result;
}
var sum = add(3, 5);

var addButAnon = fn(a: int, b: int) -> int {
    return a + b;
};
var result = addButAnon(3, 5);
```

## More on

* [lobster.github.io](https://aardappel.github.io/lobster/README_FIRST.html)
* [lobster documentation](https://aardappel.github.io/lobster/language_reference.html)
* [lobster for c developers](https://aardappel.github.io/lobster/C_style%20language%20Cheat%20Sheet%20for%20Lobster.html)
