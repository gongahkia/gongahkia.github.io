# Zig

# `Zig`

Safe, robust programming language enabling low-level control with high-level performance.

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
    // std.debug.print() => prints the specified string to the stdout without including a newline 

std.debug.print("hello zig!\n", .{});
```

## Quickstart

```
// ----- QUICKSTART -----
    // strongly, statically-typed language
    // all code must be executed within the main function
    // @import() => imports the specified standard library or user-defined module into your local zig file
    // : => used to specify the datatype of a given variable or constant as type annotation
    // var => declares a mutable variable whose value can be reassigned after initialisation
    // const => declares an immutable variable or constant whose value cannot be reassigned after initialisation

const std = @import("std"); // calls the zig standard library for printing to the stdout

pub fn main() void {
    var x: i32 = 10;
    x = 30; // this is valid
    const y: i32 = 30; // this value cannot be reassigned since it is a constant
    std.debug.print("hello Ziggler!\n", .{});
}
```

```
# ----- RUNNING A ZIG PROGRAM -----

zig run main.zig # transpiles zig to C and runs the zig program
```

## Types

```
// ----- TYPE -----
    // i8, i16, i32, i64, i128 => signed integer (positive and negative) with size of integer specified in number of bits
    // u8, u16, u32, u64, u128 => unsigned integer (positive) with size of integer specified in number of bits
    // f16, f32, f64, f128 => short, single-precision, double-precision and long floating point numbers
    // bool => true, false
    // null => type for the special null value
    // ? => specifies an optional datatype where a value can either be the specified datatype or null
    // * => pointer to a given variable, pointing to the location of the value stored within the variable in memory
    // [<numElements>]<elementDatatype> => specifies an array of immutable size and datatype, specified at initialisation
    // []<elementDatatype> => specifies a slice of mutable size and immutable datatype, where datatype is specified at initialisation
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

// --- LOGICAL OPERATOR ---

&& // and
|| // or
! // not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE 

const x = 10;
if (x > 5) {
    std.debug.print("x is greater than 5\n", .{});
} else if (x < 5) {
    std.debug.print("x is smaller than 5\n", .{});
} else {
    std.debug.print("x is 5\n", .{});
}

// SWITCH ELSE
    // equivalent of case when and match case in other languages
    // else used to indicate the default case
    // note there is NO requirement for a break statement in zig's switch, and each option is comma-delimited
    // allows for powerful pattern-matching extremely similar to Rust

const grade: u8 = 85;
switch (grade) {
    90...100 => std.debug.print("Grade: A\n", .{}),
    80...89 => std.debug.print("Grade: B\n", .{}),
    70...79 => std.debug.print("Grade: C\n", .{}),
    60...69 => std.debug.print("Grade: D\n", .{}),
    else => std.debug.print("Grade: F\n", .{}),
}

// --- LOOPS ---
    // break and continue can be used as in other programming languages

// WHILE LOOP

var i: i32 = 0;
while (i < 5) : (i += 1) {
    std.debug.print("i is {}\n", .{i});
}

// FOR LOOP
    // zig for loops provide for both the conventional C-style for loops and the equivalent of for-each loops in PHP, ultimately acting very similarly to Python
    // for (iterableStructure) |<currentIterationVariable>| => used to iterate through each iteration variable of an iterable data structure

for (var i: i32 = 0; i < 5; i += 1) { // conventional C-style for loop
    std.debug.print("i is {}\n", .{i});
}

const array = [_]i32{1, 2, 3, 4, 5};
for (array) |item| { // effectively a for each loop
    std.debug.print("item is {}\n", .{item});
}
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => fixed-size collection of elements of the same type
    // slice => dynamically-sized collection of elements of the same type
    // struct => composite datatype that is a collection of specified fields, effectively functioning as type aliases similar to Typescript
    // enum => providing enumerations in Zig, a datatype that allows for a range of predefined values often used to model states and options in zig
        // note the declared enum is its own unique datatype
        // enumeration values are called with the . dot syntax

var numbers: [5]i32 = [1, 2, 3, 4, 5];

const slice: []const u8 = "Hello, Zig!"; // a string is a char slice

const Coordinate = struct {
    x: i32,
    y: i32,
};

const Day = enum {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
};
var today: Day = Day.Wednesday;
```

## Functions

```
// ----- FUNCTION -----
    // fn <functionName>(<parameterName>:<parameterDatatype>) <returnType> => declares a named function with the specified function name, parameter and its datatypes, and the function's return type
    // fn(<parameterName>:<parameterDatatype>) <returnType> => declares an anonymous function that can be assigned to a variable or constant

fn add(a: i32, b: i32) i32 { // a named function
    return a + b;
}

const multiply = fn(a: i32, b: i32) i32 { // an anonymous function
    return a * b;
};
const result = multiply(3, 4); // calling the anonymous function
```

## More on

* [download zig](https://ziglang.org/download/)
* [generics in zig](https://www.openmymind.net/learning_zig/generics/)
* [error handling in zig](https://www.aolium.com/karlseguin/4013ac14-2457-479b-e59b-e603c04673c8)
* [zig documentation](https://ziglang.org/documentation/0.7.0/)
* [learn zig in y minutes](https://learnxinyminutes.com/docs/zig/)
* [my zig experiences](https://youtu.be/SBe8DgBCjTc?si=nREZs0J3JRDFBdQA) by theprimeagen
