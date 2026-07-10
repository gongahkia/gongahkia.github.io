---
category: Tech
---
# Rust

# `Rust`

Stack Overflow's favourite programming language.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/*
this is
a multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // print! => prints a string to the stdout and does not include a newline
    // println! => prints a string to the stdout and appends a newline to the output
    // eprint! => prints a string to the stderr and does not include a newline
    // eprintln! => prints a string to the stderr and appends a newline to the output
    // {} => allow for string interpolation with values embedded in a formatted string

let message:&str = "yes ok thank you";
print!("watermelon and this does not include a newline by default and we must specify it explicitly\n");
println!("this does include a newline automatically so there is no issue");
println!("{}", message);

let error_message:&str = "help me this is an error message";
eprint!("this is an error message which does not include a newline by default and we have to specify it explicitly\n");
eprintln!("this error message does include a newline automatically so there is no issue");
eprintln!("{}", error_message);
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // statically-typed compiled language developed by Mozilla research used for systems programming and web development
    // compile time vs runtime
        // compile time => source file is currently compiling, syntax errors, type errors, compiler crashes can occur, binary executable created if compilation succesful
        // runtime => executable binary and program logic is run, logical errors, memory errors, file path errors can occur, whatever the programmer intended for runs if no runtime errors

// NAMESPACES
    // :: => specifies the relationship between rust crates, modules and symbols within a given namespace
    // use => bring names from other namespaces into local scope
    // {} => a glob that allows us to import multiple names into a namespace easily
    // * => wildcard operator that imports every name from a namespace

let least:i16 = std::cmp::min(3,8); // std is a crate, cmp is a module, min is a function

use std::cmp::min;
let least = min(7,1); // this assigns i32 value of 1 to the variable least by bringing the function min into local scope

use std::cmp::min;
use std::cmp::max;
use std::cmp::{min, max}; // this is the equivalent of the two lines above

use std::{cmp::min, cmp::max}; // this is also valid rust code

use std::cmp::*; // this brings min, max and many other names from the std::cmp namespace into local scope

// BLOCKS AND SCOPE
    // all rust code is an expression that evaluates to a value indicated by the omission of a semicolon (expression tail), allowing for implicit return of values within functions
    // expressions can have multiple declaration and assignment statements within them, enclosed by {} curly braces

let x = {
    let y = 1;
    let z = 20;
    y + z // y + z is the expression tail, which evaluates to the int32 integer value of 21, assigned to x
};
```

## Usage

```
# ---------- USAGE ----------
    # rustc => compiles the individual source file and creates a binary executable under the same name
    # cargo new => creates a new rust project under the specified name, source code to be written in src/main.rs 
    # cargo build => compiles the rust project, creating a binary executable under the same name in target/debug
    # cargo run => compiles and runs the rust project immediately
    # cargo check => checks whether rust can compile the source file without errors

$ rustc main.rs # rust compiler compiles an executable file
$ ./main # run the created executable

$ cargo new exampleProject # creates a new rust project called exampleProject
$ cargo build # compiles the project

$ cd exampleProject/target/debug
$ ./exampleProject # runs the compiled executable

$ cd ../../ 
$ cargo run # recompiles and runs the executable binary file
$ cargo check # checks for any issues with the source file without compiling
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => division
    // % => modulo operator

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => partial equality check for value
    // != => partial inequality check for value
    // eq => complete equality check for value and type
    // ne => complete inequality check for value and type
    // > < >= <= are also comparison operators
```

## Variables and Constants

```
// ---------- VARIABLE ----------
    // variables in rust are immutable by default
    // let => declares and initialies a variable whose value and type are immutable at runtime
    // : => explicitly specify a variable's type
    // mut => specifies a variable can be mutable and that its value can be reassigned later at runtime

// ---------- CONSTANT ----------
    // const => declares and initializes a constant whose value and type are immutable at compile time
    // constant names are capitalised by convention

let x; // variable declaration and 
x = 100; // assignment can occur on two different lines
let y:i32 = 10; // variables are immutable by default at runtime

let mut z:i32 = 45; // mut creates a mutable variable
z = 100; // this mutable variable can then have its value reassigned
println!("y is {}", y);

const SECONDS_IN_MINUTES:u32 = 60; // const creates a constant, whose value is immutable at compile time
println!("{}", SECONDS_IN_MINUTES);
```

## Types

```
// ---------- TYPE ----------
    // i8, i16, i32, i64, i128 => signed integer (positive and negative) with size of integer specified in number of bits
    // u8, u16, u32, u64, u128 => unsigned integer (positive) with size of integer specified in number of bits
    // f32, f64 => single-precision and double-precision floating point numbers
    // bool => true, false
    // char => character declared with '' single quotation marks
    // &str => immutable string literal, stored on the stack with "" double quotation marks
    // String => mutable string vector, stored as a Vec<u8> on the heap with "" double quotation marks
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// ---------- CONDITIONALS ----------

// IF ELSE IF ELSE

let number:i16 = 42;
if number < 0 {
    println!("number is negative");
} else if number == 0 {
    println!("number is zero");
} else {
    println!("number is positive");
}

// MATCH EXPRESSION
    // rust's powerful pattern-matching construct similar to switch case in other languages
    // match and => define a match expression, where every match expression evaluates to a single value since matches are exhaustive and each match-arm (=>) points to an expression
    // _ => match-all pattern which acts as the default case for match expressions, required in every match expression to cover every possible match-arm since matches are exhaustive

fn im_feeling_lucky(feeling_lucky:bool) -> i32 {
    match feeling_lucky {
        true => 100,
        false => 0,
    }
} // a match expression within a function

enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
} // create the enum Coin

fn value_in_cents(coin:Coin) {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            1
        },
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
} // match expressions can be used alongside enums to leverage on powerful pattern-matching capabilities

let some_u8_value = 0u8;
match some_u8_value {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => (),
}

// UNDERSCORE
    // _ => catch-all pattern that specifies a value to be discarded and can be used for destructuring, also a match-all pattern in match expressions
    // prefixing a variable with _ will indicate to the compiler to ignore it even if its unused

let _ = get_thing(); // calls the function get_thing but throws away the returned value
let _unused = 42; // the rust compiler will not warn about this variable even if its unused
let (_, right) = slice.split_at(middle); // throw away the left side of the destructured tuple and only return the right

// ---------- LOOPS ----------
    // continue => skips to the next iteration of the loop
    // break => exits the loop 

// WHILE LOOPS

while 1 == 1 {
    println!("this operates as you'd expect, but this is an infinite loop my guy");
}

// FOR IN LOOPS
    // for in => allows for iteration over a specified iterable collection of data, including ranges

let an_array:[i32;3] = [1,2,3];
for i:i32 in an_array { 
    print!("{}", i);
} // this prints 123 to the stdout

for i in 0u32..10 {
    print!("{}", i); 
} // this prints 0123456789 to the stdout

// LOOP
    // loop => shorthand to create an infinite loop

loop {
    println!("alahoo"); 
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // fixed-length ordered sequence of elements of the same type
    // declared with [] square brackets and size and data type specified

let int_array:[i32; 10] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
println!("{}", int_array[7]); // prints 8 to the stdout

// VECTOR
    // dynamic length ordered sequence of elements of the same type
    // vec![] => declares and creates a vector with size and data type specified

let mut int_vector:Vec<i32> = vec![1,2,3,4,5,59,132];
vector.push(5); // appends the i32 integer of value 5 to the vector int_vector

// TUPLE
    // fixed-length ordered sequence of elements of different types
    // declared with () brackets and size and data type of each element specified

let mixed_tuple:(i32, bool, char) = (1, true, 'A');
println!("{}", mixed_tuple.1); // prints true to the stdout

// STRUCT
    // collections of data and functions in rust where each new struct is its own data type, similar to objects in javascript or tables in lua
    // struct => declares and creates a new struct with struct data and functions within {} curly braces
    // impl => implements methods, associated functions and traits on a specified struct
        // &self always fed as the first parameter to a struct method to reference the given instance of a struct, with methods called using . dot notation
    // associated functions are functions that don't take &self as a parameter and thus don't require an instance of a struct to be called, but are still associated with the struct
        // associated functions called using the {STRUCT NAME}::{ASSOCIATED FUNCTION NAME}

struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
} // declares and creates a struct

let user1 = User {
    email: String::from("hotman@hotmail.com"),
    username: String::from("someusername123"),
    active: true,
    sign_in_count: 1,
} // initialization of a struct literal with its values assigned

struct Vec2 { 
    x:f64,
    y:f64,
} // declares and creates another struct

impl Vec2 { 
    fn is_strictly_positive(&self) -> bool {
        self.x > 0
    }
} // implements the method is_strictly_positive on the struct Vec2

let v1 = Vec2 { x:1.0, y:3.0 }; // initialization of a struct literal
let v2 = Vec2 { y:2.0, x:4.0 }; // initialization of another struct literal

println!("{}", v1.is_strictly_positive()); // specified method is called using . dot notation on an instance of the struct, a struct literal

impl Rectangle {
    fn square(size: u32) -> Rectangle { // notice the return type is specified as the struct Rectangle, which is considered its own type
        Rectangle { width: size, height: size } // omission of semicolon for implicit return
    }
} // here, the associated function acts as a constructor that returns the struct Rectangle

let square1 = Rectangle::square(3); // calls the associated function

// TRAITS
    // specifies attributes and methods a type must have without defining them, similar to interfaces in Java
    // trait => declares and creates a trait with a specified name to be implemented on a struct
    // impl for => implement a specified trait on a struct
    // rust's orphan rules
        // can implement one of your traits on foreign and primitive types
        // can implement other rust-defined traits on one of our types
        // cannot implement a foreign trait on a foreign type

struct Number { 
    odd: bool;
    value: i32;
} // declare and create a struct

trait Signed {
    fn isStrictlyNegative(&self) -> bool; 
} // all this does is specify that the type must have a method called isStrictlyNegative that returns a boolean

impl Signed for Number { 
    fn isStrictlyNegative(&self) -> (bool) {
        self.value < 0
    }
} // this implements the trait Signed on the struct Number and we see the implementation of the method within the struct defintiion

let n = Number { odd:false, value:-44 }; // struct literal initialization
println!("{}", n.isStrictlyNegative()); // calling the method on the instance of the struct

// ENUMS
    // enums allow for powerful state-modelling in rust to make invalid states unrepresentable, especially powerful since enums are their own type in rust
    // enum => declares and creates an enum and its many possible states
    // :: => namespace operator specifies the relationship between an enum and an enum member
    // instance of an enum is created using let {ENUM_INSTANCE_NAME} = {ENUM NAME}::{ENUM VARIANT NAME}

enum IP_address_type {
    V4(u8,u8,u8,u8), // V4 variant is able to store a value of (127,0,0,1)
    V6(String), // V6 variant is able to store a String of value "::1"
} // declares and creates an enum IP_address_type and its respective variants, V4 and V6, where an ip address can only ever be V4 or V6

let four = IP_address_type::V4; // creates an instance of an enum
let five = IP_address_type::V4(127,0,0,1); // we can also specify the value of the enum member upon initialization
```

## Functions

```
// ---------- FUNCTION ----------
    // rust functions have implicit return of the value the last expression evaluates to, specified by omitting the ; semicolon
    // fn => declares and creates a function with their parameter and return type specified
    // -> => specifies the relationship between the function name and return type and function body
    // return => specifies the return expression but not madantory due to implicit return

fn a_fair_dice_roll() -> i32 {
    return 4;
}

fn unfair_dice_roll() -> i32 {
    10 // this is valid since 10 is implicitly returned
}
```

## Ownership

```
// ---------- OWNERSHIP ----------
    // variables, constants and references have a fixed lifetime specified by the lexical scope of the {} curly braces they are enclosed within
    // rust ownership hinges on the concept that it automatically returns memory once the variable that owns said value in memory goes out of scope

// STACK VS HEAP
    // both the stack and heap are part of computer memory for program usage at runtime
    // stack
        // blazingly fast, last-in first-out structure with operations like pushing and popping of data
        // stack only ever has to refer to the top of the stack for storage and retrieval
        // stack data is of a fixed-size at compile time
    // heap
        // less fast, values stored at different memory addresses in the heap allocated based on the amount of space required for each value
        // values retrieved via a pointer that stores the memory address of a given value
        // heap data is of an unknown size at compile time

// OWNERSHIP RULES
    // each value belongs to a variable (its owner)
    // there can only be one owner at a time
    // when the owner goes out of scope, the value will be dropped

// here is an example of ownership rules in action
// variable s is not valid here, it has not been declared yet
{
    let s:String = "hello"; // variable s is valid from this point forward till the end of the local lexical scope (curly braces), s is a string vector and is heap-allocated
}
// the lexical scope is now over and the variable s is no longer valid, rust returns the space the variable s took up with its value in heap memory

// REFERENCES
    // references are immutable by default
    // & => specifies a given variable is a reference, allowing us to refer to a value without taking ownership of it
    // having a reference as a function parameter is called borrowing

fn main() {
    let s1 = String::from("hello"); // string vector of dynamic length, heap-allocated created
    let len = calculate_length(&s1); // pass the heap-allocated string vector s1 by reference to the function calculate_length(), to prevent the string s1 from being moved after the function runs
    println!("length of {} is {}", s1, le);
}

fn calculate_length(s:&String) -> usize { // this function recieves a parameter of type reference to a string vector type by borrowing it, x is also brought into local scope as a function parameter
    s.len() // s is within lexical scope here
}
// s goes out of scope here, but since it does not have ownership of what it refers to, nothing happens
```

## More on

* enum functions
* enum methods
* Option type
* copy
* clone
* mutable references
* slices as references
* smart pointers
* struct update syntax
* tuple structs
* lifetimes
* macros
* if let
* result
* option
* packages
* generics
* error handling
* concurrency
* modules
* [install rust](https://www.rust-lang.org/tools/install)
* [rust playground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021)
* [learn rust in y minutes](https://learnxinyminutes.com/docs/rust/)
* [rust in 30 minutes](https://fasterthanli.me/articles/a-half-hour-to-learn-rust)
* [rust lang book](https://doc.rust-lang.org/stable/book/)
* [rust by example](https://doc.rust-lang.org/stable/rust-by-example/)
