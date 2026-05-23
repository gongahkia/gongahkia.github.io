---
category: Tech
---
# Onyx

# `Onyx`

Modern systems programming language focused on simplicity and performance.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is a
multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // print() => prints values to stdout without newline
    // println() => prints values to stdout with newline
    // printf() => formatted printing similar to C

println("Hello, Onyx!")
print("No newline here")
printf("Formatted: %d\n", 42)
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Onyx is a systems language with modern syntax
    // statically typed with type inference
    // memory safe with optional manual memory management
    // : => type annotation
    // := => type inference and assignment
    // = => assignment to existing variable

main :: () {
    message := "Hello, World!"  // type inferred as string
    number: i32 = 42           // explicit type annotation
    println(message)
}
```

## Types

```
// ---------- TYPE ----------
    // i8, i16, i32, i64 => signed integers
    // u8, u16, u32, u64 => unsigned integers
    // f32, f64 => floating-point numbers
    // bool => true, false
    // char => Unicode character
    // str => string slice
    // string => owned string
    // void => absence of value

age: i32 = 25
height: f64 = 5.9
is_active: bool = true
initial: char = 'A'
name: str = "Alice"
owned_name: string = "Bob"
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => division
    // % => modulo

// COMPARISON OPERATORS
    // == => equality
    // != => inequality
    //  = => comparison operators

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// BITWISE OPERATORS
    // & => bitwise and
    // | => bitwise or
    // ^ => bitwise xor
    // ~ => bitwise not
    // > => left and right shift
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS

// IF ELSE IF ELSE
x := 10
if x > 10 {
    println("greater than 10")
} else if x == 10 {
    println("equals 10")
} else {
    println("less than 10")
}

// SWITCH CASE DEFAULT
day := "Monday"
switch day {
    case "Monday" {
        println("Start of work week")
    }
    case "Friday" {
        println("TGIF!")
    }
    default {
        println("Another day")
    }
}

// LOOPS

// FOR LOOPS
for i in 0..5 {
    println(i)
}

for item in  {[3][4][1][2]
    println(item)
}

// WHILE LOOPS
counter := 0
while counter  fixed-size arrays of N elements of type T
    // []T => dynamic arrays (slices)

numbers: i32 =[5][4][9][1][2][3]
dynamic_numbers: []i32 = make([]i32, 0, 10)

// STRINGS
message: str = "Hello"
owned_message: string = "World"

// STRUCTS
    // struct => custom data types with named fields

Person :: struct {
    name: str
    age: i32
    is_active: bool
}

person: Person = Person{
    name = "Alice"
    age = 30
    is_active = true
}

// ENUMS
    // enum => enumerated types

Status :: enum {
    Pending
    Active
    Inactive
}

current_status: Status = Status.Active

// UNIONS
    // union => tagged unions for type-safe variants

Result :: union {
    Success: i32
    Error: str
}

result: Result = Result{Success = 42}

// MAPS
    // map[K]V => hash maps with key type K and value type V

scores: map[str]i32 = make(map[str]i32)
scores["Alice"] = 95
scores["Bob"] = 87

// POINTERS
    // ^T => pointer to type T
    // & => address-of operator
    // * => dereference operator

value: i32 = 42
ptr: ^i32 = &value
dereferenced: i32 = *ptr
```

## Functions

```
// ---------- FUNCTION ----------
    // function_name :: (parameters) -> return_type { body }
    // :: => function declaration operator
    // -> => return type separator

// BASIC FUNCTIONS
add :: (a: i32, b: i32) -> i32 {
    return a + b
}

// FUNCTIONS WITH MULTIPLE RETURNS
divide :: (a: i32, b: i32) -> (i32, bool) {
    if b == 0 {
        return 0, false
    }
    return a / b, true
}

result, success := divide(10, 2)

// PROCEDURES (NO RETURN VALUE)
greet :: (name: str) {
    printf("Hello, %s!\n", name)
}

// FUNCTION POINTERS
operation :: (a: i32, b: i32) -> i32

multiply :: (a: i32, b: i32) -> i32 {
    return a * b
}

operation = multiply
result := operation(5, 3)

// GENERIC FUNCTIONS
    // $T => generic type parameter

max :: ($T: type, a: T, b: T) -> T {
    if a > b {
        return a
    }
    return b
}

max_int := max(i32, 10, 20)
max_float := max(f64, 3.14, 2.71)

// CLOSURES
    // functions can capture variables from their environment

make_counter :: () -> () -> i32 {
    count := 0
    return () -> i32 {
        count += 1
        return count
    }
}

counter := make_counter()
println(counter())  // prints 1
println(counter())  // prints 2
```

## More on

* memory management
* error handling
* generics
* metaprogramming
* package system
* foreign function interface
* concurrency
* [onyx documentation](https://onyxlang.io/docs)
* [onyx language guide](https://onyxlang.io/guide)
* [onyx github](https://github.com/onyx-lang/onyx)
