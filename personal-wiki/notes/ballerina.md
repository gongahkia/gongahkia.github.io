# Ballerina

# `Ballerina`

Versatile language designed for microservice integration and developing cloud-native applications.

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
    // io:print() => receives a string argument which is then printed to the stdout and does not include a newline by default
    // io:println() => receives a string argument which is then printed to the stdout and includes a newline automatically at the end of the output

io:print("this does not include a newline and one must be explicitly specified\n");
io:println("this includes a newline by default");
```

## Quickstart

```
// ----- QUICKSTART -----
    // semicolon-delimited curly brace language, inheriting from the family of C-style languages
    // as such, Ballerina's syntax bears many similarities to C and C++
    // strongly statically-typed with a comprehensive type system
    // robust support for network and concurrent programming
    // import => brings the specified standard library or user-defined modules into the local scope of the current file
    // : => used to bring imported modules and their internal functionality into the current namespace
    // public function main() => entry-point of the program within which all execution code is written, the equivalent of the main function or method in other programming languages
```

## Types

```
// ----- TYPE -----
    // int => stores a 32-bit signed integer number value
    // float => stores a 64-bit floating-point number value
    // decimal => stores a arbitrary-precision decimal number value
    // boolean => true, false
    // string => stores string values declared within "" double quotation marks, note that characters are handled as single-character strings
    // byte => stores a 8-bit unsigned integer number value

int age = 30;
float height = 5.9;
decimal salary = 12345.67;
boolean isStudent = true;
string name = "John Doe";
byte b = 255;
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
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE

int age = 25;
if (age < 18) {
    io:println("Underage");
} else if (age >= 18 && age < 60) {
    io:println("Adult");
} else {
    io:println("Senior");
}

// MATCH => _
    // provides powerful pattern-matching capabilities in Ballerina, similar to match constructs in Rust where multiple fields and complex data structures can also have their values matched
    // _ => acts as the default fall-through case for the match construct where all other predicate conditions fail to be met

int anExampleNumber = 2;
match anExampleNumber {
    1 => {
        io:println("One");
    }
    2 => {
        io:println("Two");
    }
    3 => {
        io:println("Three");
    }
    _ => {
        io:println("Other number");
    }
}

json anExampleJSONValue = { name: "Alice" };
match anExampleJSONValue {
    { name: "Alice" } => {
        io:println("Hello Alice");
    }
    { name: "Bob" } => {
        io:println("Hello Bob");
    }
    _ => {
        io:println("Hello stranger");
    }
}

[int, string] anExampleTuple = [1, "Ballerina"];
match anExampleTuple {
    [1, "Ballerina"] => {
        io:println("Matched tuple: [1, Ballerina]");
    }
    [2, "Ballerina"] => {
        io:println("Matched tuple: [2, Ballerina]");
    }
    _ => {
        io:println("No match for tuple");
    }
}

// --- LOOPS ---

// FOREACH IN LOOP
    // operates similarly to foreach loops in other programming languages like PHP

string[] fruits = ["Apple", "Banana", "Cherry"];
foreach var fruit in fruits {
    io:println(fruit);
}

// WHILE 
    // operates similarly to while loops in most other programming languages

int count = 0;
while (count < 5) {
    io:println(count);
    count += 1;
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => fixed-size ordered collection of elements of the same datatype, declared within [] square brackets
    // tuple => fixed-sized ordered collection of elements of multiple datatypes, with each tuple declared as its own unique composite datatype within [] square brackets
    // map => dynamically-sized unordered collection of key-value pairs where keys must be unique and of the string datatype and values can be of multiple datatypes declared within {} curly braces
    // record => user-defined collection of named fields and their corresponding datatypes, allowing for the modelling of representative data through type aliases, the equivalent of structs in Go and TypeScript declared within {} curly braces

int[] anExampleArray = [1, 2, 3, 4, 5];
[int, string, boolean] anExampleTuple = [1, "Ballerina", true];
map<string> anExampleMap = {
    name: "John Doe",
    city: "New York"
};

type anExampleRecord record {
    string name;
    int age;
};

type ThreeDimensionalCoordinate record {
    X int;
    Y int;
    Z int;
};

ThreeDimensionalCoordinate c = {
    X: 10,
    Y: 0, 
    Z: 5
};
```

## Functions

```
// ----- FUNCTION -----
    // function <functionName> (<functionParameterDatatype(s)> , <functionParameterName(s)>) returns <functionReturnDatatype(s)> { <functionDefinitionBody> } => definition and declaration of a named function
    // returns => used when specifying the function return value's datatype, omitted when the function is a void function
    // return => explicit return keyword that specifies the final return value or expression within the function definition body

function add(int x, int y) returns int { // an integer function that returns an integer
    return x + y;
}

function greet(string name) { // a void function with no return datatype
    io:println("Hello, ", name);
}
```

## More on

* [union types in ballerina](https://ballerina.io/learn/by-example/unions/)
* [optionals in ballerina](https://ballerina.io/learn/by-example/optional-fields/)
* [all ballerina datatypes](https://ayesh9303.medium.com/ballerina-data-types-c3d5b4166cd8)
* [ballerina documentation](https://ballerina.io/learn/by-example/documentation/)
* [learn ballerina in y minutes](https://learnxinyminutes.com/docs/ballerina/)
