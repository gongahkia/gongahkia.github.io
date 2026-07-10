---
category: Tech
---
# Haxe

# `Haxe`

Versatile open-source language for cross-platform applications, games, and multimedia projects.

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
    // Sys.stdout.write() => receives a string argument that is then printed to the stdout and does not include a newline by default
    // trace() => receives a string argument that is then printed to the stdout and includes a newline automatically at the end of the output

Sys.stdout.write("this does not have a newline and one must be explicitly specified for its inclusion\n"); 
trace("this already has a newline");
```

## Quickstart

```
// ----- QUICKSTART -----
    // Haxe compiles to multiple target platforms (JavaScript, C++, Java, C#, Python, Lua) to write once deploy anywhere
    // strongly, statically-typed with type inference
    // used for both frontend (web apps) and backend (servers)
    // supports meta-programming via macros
    // wealth of functionality with external libraries 
    // provides syntax for both object-oriented and functional programming paradigms
    // class Main() => main class within which all methods including the main method must run, similar to Java's main class
    // static public function main() => static public main method which acts as the entry point for the Haxe program within which all execution code is run, equivalent to the main method in other programming languages like Java or the main function in C-style languages
    // : => specifies the datatype of the given variable, providing type annotations in Haxe
    // var => declares a mutable variable whose value can be reassigned and modified even after initial assignment
    // const => declares an immutable constant whose value cannot be reassigned and modified after initial assignment
```

## Types

```
// ----- TYPE -----
    // Int => stores a signed 32-bit integer number value if unspecified
    // UInt => stores an unsigned 32-bit integer number value if unspecified
    // Int32 => stores a signed 32-bit integer number value
    // UInt32 => stores an unsigned 32-bit integer number value
    // Int64 => stores a signed 64-bit integer number value
    // UInt64 => stores an unsigned 64-bit integer number value
    // Float => stores a 64-bit double-precision floating-point number value if unspecified
    // Float32 => stores a 32-bit single-precision floating-point number value
    // Float64 => stores a 64-bit double-precision floating-point number value 
    // Bool => true, false
    // Char => stores a single-character long value declared within '' single quotation marks
    // String => stores a string value declared within "" double quotation marks
    // Dynamic => represents a special datatype that can store any value, affording type inference in Haxe
    // null => special value representing the absence of a value
    // Null<specifiedDatatype> => represents a datatype that can either store a value of the specified datatype or be the special value null
    // Void => special datatype that represents the absencem of a value, most often used in the declaration of the type signature of void functions 
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

// --- BITWISE OPERATORS ---

& // bitwise and
| // bitwise or
^ // bitwise xor
~ // bitwise not
<< // bitwise left shift
>> // bitwise right shift
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE

var age = 25;
if (age < 13) {
    trace("Child");
} else if (age >= 13 && age < 20) {
    trace("Teenager");
} else if (age >= 20 && age < 65) {
    trace("Adult");
} else {
    trace("Senior");
}

// SWITCH CASE DEFAULT
    // the equivalent of match case and switch case in other programming languages, providing a degree of basic pattern-matching in Haxe
    // often combined with enums for state modelling and checking in Haxe similar to sophisticated pattern-matching in Rust
    // default => specifies the default fall-through case which executes when all other predicate case conditions fail

enum Color {
    Red;
    Green;
    Blue;
}

var color:Color = Color.Green;

switch (color) {
    case Color.Red:
        trace("Red");
    case Color.Green:
        trace("Green");
    case Color.Blue:
        trace("Blue");
}

// --- LOOPS ---

// FOR IN
    // allows for iteration and traversal over each element in an iterable data structure (such as a dynamically generated integer range construct)

for (i in 0...10) {
    trace(i);
}

// WHILE
    // operates similarly to while loops in most other programming languages

var i = 0;
while (i < 10) {
    trace(i);
    i++;
}

// DO WHILE
    // operates similarly to do while loops in most other programming languages

var j = 0;
do {
    trace(j);
    j++;
} while (j < 10);

// --- EXCEPTION HANDLING --- 

// THROW
    // throw => combined with if construct to act as the inline equivalent of try catch finally construct covered below
    // throws an exception if the specified predicate case condition is fulfilled, where the function call immediately exits

static function divide(a:Int, b:Int):Float {
    if (b == 0) throw "Division by zero is not allowed.";
    return a / b;
}

// TRY CATCH FINALLY
    // try => specifies execution code that is first run
    // catch => handles the exception situation where the code within the try block fails to be run, then the catch block executes
    // finally => block that always runs regardless of whether any exception has occured at the end of the try catch construct

try {
    var result = divide(10, 0);
    trace("Result: " + result);
} catch (e:Dynamic) {
    trace("An error occurred: " + e);
} finally {
    trace("Execution completed.");
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => dynamically-sized ordered collection of elements of the same datatype, declared with Array<> and the specified array element datatype within [] square brackets
    // map => dynamically-sized unordered collection of key-value pairs of multiple datatypes, declared with Map<> and the specified key-value datatypes within [] square brackets
    // enum => user-defined datatype where the datatype has a fixed set of predefined constant values, affording pattern-matching and operating similarly to enums in most other programming languages, declared with enum within {} curly braces

var anExampleArray:Array<Int> = [1, 2, 3];

var anExampleMap:Map<String, Int> = ["one" => 1, "two" => 2];

enum anExampleEnum {
  Red;
  Green;
  Blue;
}
```

## Functions

```
// ----- FUNCTION -----
    // function <functionName> ( <functionParamterName(s)> : <functionParameterDatatype(s)> = <functionParameterDefaultValue(s)> ) : <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of a named function
    // function ( <functionParamterName(s)> : <functionParameterDatatype(s)> = <functionParameterDefaultValue(s)> ) : <functionReturnDatatype(s)> { <functionDefinitionBody> } => declaration and definition of an anonymous function, which is then normally assigned to a named variable identifier
    // return => explicit return keyword that specifies the function's return expression or value

function add(a:Int, b:Int):Int { // named function
    return a + b;
}

function greet(name:String, greeting:String = "Hello") { // default arguments provided
    trace(greeting + ", " + name);
}

var multiply = function(a:Int, b:Int):Int { // anonymous function declaration and assignment
    return a * b;
};
```

## More on

* [inline functions](https://haxe.org/manual/class-field-inline.html)
* [classes](https://haxe.org/manual/types-class-instance.html)
* [anonymous struct](https://haxe.org/manual/types-anonymous-structure.html)
* [abstract](https://haxe.org/manual/types-abstract.html)
* [macros](https://haxe.org/manual/macro.html)
* [type parameters](https://haxe.org/manual/type-system-type-parameters.html)
* [haxe compiler features](https://haxe.org/manual/cr-features.html)
* [install haxe](https://haxe.org/download/)
* [haxe documentation](https://haxe.org/documentation/introduction/)
* [haxe libraries](https://lib.haxe.org/)
* [learn haxe in y minutes](https://learnxinyminutes.com/docs/haxe/)
