# Swift

# `Swift`

Language for native IOS and OSX development.

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
    // print() => takes string argument(s) that are printed to the stdout with a newline automatically appended
    // terminator => argument to print() used to specify another terminator string, if unspecified will be a "\n" newline character by default

print("this includes a newline by default")
print("there isn't a newline following this since we specify an empty string as the terminator", terminator: "")
```

## Quickstart

```
// ----- QUICKSTART -----
    // import => brings modules and frameworks into the local scope within the present file
    // let => declares and initialises a constant, whose value cannot be reassigned after initialisation
    // var => declares and initialises a variable, whose value can be reassigned and mutated even after intialisation
    // : => allows for type annotations of a variable or constant, specified within variable or constant declaration
```

## Types

```
// ----- TYPE -----
    // Int => 32-bit integer value
    // Int64 => 64-bit integer value
    // Float => 32-bit single-precision floating point value 
    // Double => 64-bit double-precision floating point value
    // Bool => true, false
    // String => declared with "" double quotation marks, characters in Swift are treated as single-character Strings
    // [<arrayElementDatatype>] => declares an array of the given datatype
    // [<keyDatatype> : <valueDatatype>] => declares a dictionary (map) comprised of key-value pairs of the specified datatype
    // (<tupleElementDatatype(s)>) => declares a tuple of the specified composite datatypes
    // ? => declares a variable is an Optional, where the given variable could either be the specified datatype or the special value nil
    // nil => special value nil to represent the absence of data
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATOR ---

+ // addition
- // subtraction
* // multiplication
/ // division

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

// --- NIL-COALESCING OPERATOR ---

?? // nil-coalescing operator that can be called on an Optional datatype, where a default user-designated value is assigned to an Optional variable if its value is nil
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE 

if age >= 18 {
    print("Adult")
} else if age >= 13 {
    print("Teenager")
} else {
    print("Child")
}

// SWITCH CASE DEFAULT
    // provides some degree of basic pattern-matching as an alternative to if else if else constructs
    // default => the fall-through default case if all other predicate case conditions are unmet

let color = "red"
switch color {
case "red":
    print("The color is red")
case "blue":
    print("The color is blue")
default:
    print("Unknown color")
}

// --- LOOPS ---

// FOR IN LOOP
    // Swift's for in loops do allow for iteration over an iterable data structure
    // Swift does not provide for conventional C-style for loops, but the C-style output to the stdout can be replicated using the range operator
    // .. => range operator dynamically generates an iterable data structure from the given minimum to maximum range

var numbers: [Int] = [1, 2, 3, 4, 5]
for number in numbers {
    print(number)
}

for i in 0..<10 {
    print(i)
}

// WHILE LOOP

var counter = 0
while counter < 5 {
    print(counter)
    counter += 1
}

// REPEAT WHILE LOOP
    // the equivalent of a do while loop in Swift

repeat {
    print(counter)
    counter -= 1
} while counter > 0
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // array => dynamically-sized ordered collection of elements of the same datatype
    // dictionary => dynamically-sized unordered collection of key-value pairs of multiple datatypes
    // set => unordered collection of unique elements of the same datatype
    // struct => user-defined datatype that groups specified fields together under a type alias, allowing for more expressive data-modelling
    // enum => user-defined datatype that defines the possible enumerations of a given value, which can then be called using . dot syntax

var anArray: [String] = ["Apple", "Banana", "Cherry"]

var aUniqueSet: Set<Int> = [1, 2, 3, 1]

var aDictionary: [String: String] = ["name": "Alice", "city": "Wonderland"]

struct anExampleStruct {
    var name: String
    var age: Int
}

struct Coordinate {
    var X: Int
    var Y: Int 
}

enum anExampleEnum {
    case imagine
    case the
    case possibilities
}

enum Direction {
    case north
    case south
    case east
    case west
}
var heading = Direction.north
```

## Functions

```
// ----- FUNCTION -----
    // func <functionName>(<parameterName(s)> : <parameterDatatype(s)>) -> (<returnDatatype(s)>) => function declaration for a named function
    // return => explicit return statement within the function definition
    // functions can also receive default values for named parameters with the = assignment operator within the function definition

func add(a: Int, b: Int) -> Int {
    return a + b
}

func getFullName(firstName: String, lastName: String) -> (String, Int) {
    let fullName = "(firstName) (lastName)"
    let length = fullName.count
    return (fullName, length)
}

func greet(name: String, greeting: String = "Hello") { // default parameters
    print("(greeting), (name)!")
}
```

## More on

* [oop in swift](https://www.programiz.com/swift-programming/classes-objects)
* [protocols in swift](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/)
* [closures in swift](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/closures/)
* [error handling in swift](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/errorhandling/)
* [swift documentation](https://www.swift.org/documentation/)
* [swift for ios development](https://developer.apple.com/swift/)
* [learn swift in y minutes](https://learnxinyminutes.com/docs/swift/)
