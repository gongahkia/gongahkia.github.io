# Go

# `Go`

Google's programming language authored by the creator of C.

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
    // printing requires the fmt package which provides functions for file IO
    // Print => prints a string to the stdout and does not include a newline at the end of the output
    // Println => prints a string to the stdout and appends a newline to the output
    // Printf => allows for printing of formatted text augmented with format specifiers for different data types and does not include a newline at the end of the output
        // %c => character
        // %s => string
        // %d => integer
        // %f => floating point
        // %t => boolean
        // %p => pointer
        // %T => returns the data type of the specified value 
    // ``` => signposts the start and end of a multi-line string (does not interpret escape sequences)

fmt.Print("apple pie but also this does not include a newline at the end and we must specify its inclusion\n")
fmt.Println("this includes a newline at the end of the string by default")
fmt.Printf("the value of pi is approximately %f and we need to explicitly include a newline at the end\n", 3.14159)
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Go is not a semicolon language (semicolons are optional but the Go transpiler removes them and idiomatic Go does not use semicolons whatsoever)
    // every script file contains the main function within which all program code is run, acting as the entry point for the executable file
    // import => specifies library packages referenced within the present file, can include an alias in front of the package name as an alias for easier reference
    // package => required at the beginning of a script file, main is a special name declaring an executable for the main function

package main 

import (
    "fmt" // part of the Go standard library
    "io/ioutil" // introduces file IO utilties
    "os" // library to handle OS functions 
    "strconv" // string conversion library
    m "math" // math library with the local alias m
    n "net/http" // web server library with the local alias n
)

func main() {
    // add your code here
}
```

## Variables

```
// ---------- VARIABLE ----------
    // := => shorthand declaration and assignment operator
    // _ => catchall wildcard operator allows us to discard an unused variable, generally used within the context of functions

var name string // variable declaration
name = John // variable assignment

name := "John" // this both declares the string variable name and assigns the string value "John" to the variable name, being equivalent to the above two lines of code (note that variable type does not then need to be specified)

func giveTwoNames() (name1, name2 string) {
    return "johnny bravo", "chuck norris"
}
_, name2 := giveTwoNames() // the _ discards the first name returned by the giveTwoNames function, assigning the string value of "chuck norris" to the string variable name2
```

## Types

```
// ---------- TYPE ----------
    // int => signed integer number
    // uint => unsigned integer number
    // float32, float64 => single-precision and double-precision floating-point numbers
    // complex64, complex128 => complex numbers
    // byte (alias for uint 8) => stores any ASCII character which are normally single-byte, '' single quotation marks
    // rune (alias for int32) => stores any UNICODE character, allowing storage of multi-byte characters typically seen in characters from other languages, '' single quotation marks
    // string => "" double quotation marks
    // bool => true, false
    // pointer => pointer type declared with * asterisk in front of the data type of the specified variable the pointer points toward
        // & => address-of operator, used to retrieve the memory address of a specified variable
        // Go has garbage collection, so there is no pointer arithmetic although pointers are still valid
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
    // == => complete equality check for value and type
    // != => complete inequality check for value and type
    // > < >= <= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------
    // Go does not have brackets to segregate its predicate conditional and loop statements

// CONDITIONALS

// IF ELSE IF ELSE

x := 10
if x > 10 {
    fmt.Print("x is greater than 10")
} else if x < 10 {
    fmt.Print("x is smaller than 10")
} else {
    fmt.Print("x is equals to 10")
}

// SWITCH CASE DEFAULT  
    // note there is no break statement required for each case statement here unlike other languages
    // default => specifies the default case if logic falls through every other case statement within the switch clause

day := "Monday"
switch day {
    case "Monday":
        fmt.Print("it's Monday")
    case "Tuesday":
        fmt.Print("it's Tuesday")
    default:
        fmt.Print("it's another day and this is the default case")
}

// LOOPS
    // Go has no while loop construct, but the equivalent can be implemented with for loops

// FOR LOOP
    // for => allows for creation of simple and complex iteration-based for loops based on context of usage
    // range => allows for iteration over an iterable data structure (array, slice, string, map, channel) and supports multiple value deconstruction
    // break and continue operate similarly as in other languages

for i := 0; i < 5; i++ { // a basic for range-based for loop
    fmt.Print(i)
}

numbers := []int{1, 2, 3, 4, 5}
for index, value := range numbers { 
    fmt.Print(index, value)
}

// INFINITE FOR LOOP
    // specifying a for loop with no predicate or loop condition will result in an infinite loop
    // effectively creates a while true loop

for {
    fmt.Println("trapped in an infinite loop please help me") 
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // declared with [] square brackets, the array size and {} curly braces
    // fixed-size ordered sequence of elements of the same type

anArray := [5]int{1, 2, 3, 4, 5} // this declares and assigns an int array of size 5 elements

// SLICES
    // declared with [] square brackets, no specified array size and {} curly braces
    // dynamically-sized ordered sequence of elements of the same type, a more flexible array

aSlice := []int{6, 7, 8, 9, 10, 11} // this declares and assigns an int slice of dynamic size

// MAP
    // map => creates and declares a map storing key-value pairs of a specified type with [] square brackets and {} curly braces
    // : => specified the relationship between a key-value pair
    // dynamically-sized unordered sequence of key-value pairs, whose type we specify during declaration and assignment

aMap := map[string]int{
    "cerealChicken": 200,
    "thaiFish": 300,
    "vegetables": 150,
    "egg": 50,
} // this declares and assigns a string to int map of dynamic size

// STRUCT
    // type => creates a custom data type as a type definition that can be later referenced when instances of the type are created 
    // struct => creates and declares a struct that stores multiple values of different specified types within {} curly braces
    // Go's equivalent of structs in Rust, objects in Javascript, tables in Lua (Go does NOT support OOP and the closest analogue we can get are structs)

type Person struct {
    Name string
    Age int
} // this creates a type definition for the Person struct

// STRUCT METHODS
    // declare a specified method on a struct, where the attributes and methods of a struct instance can be called via . dot syntax
    // there are 2 kinds of struct methods
        // 1. VALUE RECEIVER METHOD => func (structAlias structName) methodName() { methodBody }
            // struct method operates on a COPY of the struct
            // method DOES NOT modify struct state
            // modifications made to the struct within the method are LOCAL to the method 
        // 2. POINTER RECEIVER METHOD => func (structAlias *structName) methodName() { methodBody } 
            // struct method operates DIRECTLY ON that original struct
            // method MODIFIES struct state
            // modifications made to the struct within the method WILL MODIFY original struct state

func (p Person) Introduce() {
    fmt.Printf("Hello, my name is %s and I am %d years old.\n", p.Name, p.Age)
} // this declares the value receiver Introduce method on the Person struct, appropriate since the method DOES NOT need to modify struct state at all (note the syntax to declare the function as a method on the struct Person)

func (p *Person) DrinkFromFountainOfYouth() {
    p.Age -= 10;
    fmt.Printf("You have drank from the fountain of youth and you are now %d years old.\n", p.Age)
} // this declares the pointer receiver DrinkFromFountainOfYouth method on the Person struct, appropriate since the method DOES need to modify struct state (note the syntax to declare the function as a method on the struct Person)

func main(){

    // --- actual execution of code ---

    john := Person{ // this declares and assigns an instance of the Person struct to the variable john
        Name: "John",
        Age: 30,
    }

    john.Introduce(); // calls the Introduce method on the john instance 
    john.DrinkFromFountainOfYouth(); // calls the DrinkFromFountainOfYouth method on the john instance, deaging john 10 years

}

// CHANNEL
    // backbone of concurrent programming that affords communication between goroutines to synchronise process execution 
    // make(chan desiredDatatype) => creates an unbuffered channel of a specified datatype 
    // make(chan desiredDatatype, bufferCapacity) => creates a buffered channel of a specified datatype with a specified buffer capacity
    // <- => sends and receives data through channels, arrow direction indicating flow of data from destination to origin
    // close() => closes a specified channel per the given channel name
    // select { case ... } => equivalent of switch-case statements but select is specifically designed for concurrent programming, to allow waiting on multiple channel simultaneously, where the select clause MATCHES one case when the communication operation (sending or receiving data) is ready to proceed
        // default => similarly specifies the default case if logic falls through every other case statement within the select clause

ch := make(chan int) // creates an unbuffered channel of integers and assigns it to the channel variable ch
ch := make(chan int, 3) // creates a buffered channel with a buffer capacity of 3 integers and assigns it to the channel variable ch

ch <- 42 // sends data (integer 42) to the channel variable ch
value := <-ch // receives data from a channel variable ch and returns that data to the variable value

close(ch) // closes the channel variable ch

select { // imagine the channels ch1 and ch2 exist
    case msg1 := <-ch1:
        fmt.Println("Received message from ch1:", msg1)
    case msg2 := <-ch2:
        fmt.Println("Received message from ch2:", msg2)
    default:
        fmt.Println("No channel ready")
} // whichever channel's communication operation of receiving data is first ready will be matched and have its resulting predicate logic executed
```

## Functions

```
// ---------- FUNCTION ----------
    // functions are first-class citizens in Go, allowing for implementation of higher-order functions common in functional programming 
    // func => declares and creates a function, and function definition specifies the parameter and return type (more than one return value to be specified within brackets)
    // return => specifies the return expression, functions can have multiple return values and named return values

func add(a, b int) int { // specifies that both parameters a and b are of type int, and the function's type signature specifies it returns an int
    return a + b
}

func receiveMultiple(x, y int) (sum, prod int) { // specifies that both parameters x and y are of type int, and returns two named values of type int
    return x + y, x * y // returns two values, allowing for immediate shorthand assignment via deconstruction when the function is called
}
sum, product := receiveMultiple(1,2) // this assigns the two results returned by the receiveMultiple function to the sum and product variable respectively

// FUNCTION LITERALS
    // anonymous functions, another cornerstone of functional programming
    // functionDefinition(){ functionBody }(functionArguments) => defines and calls function literals immediately

isXBig := func() bool {
    return x > 10000
} // function literals are effectively closures

fmt.Println("Add + double these two numbers: ", 
    func (a, b int) int {
        return (a + b) * 2
    }(10, 2) // immediately calls the function literal inline by providing it with the arguments a = 10 and b = 2
) // prints "Add + double these two numbers: 24" to the stdout

// DEFER
    // defer => pushes a function call onto a stack, where stacked functions are executed in last in, first out (LIFO) order after the surrounding parent function the defer statement is called within has been returned but before it exits
    // normally used to close files, unlock mutexes, release resources and run any cleanup actions after a function has been executed but before it exits

func usingDefer() (ok bool) {
    defer fmt.Println("deferred statements execute in LIFO order only after the parent function usingDefer() has been fully executed.")
    defer fmt.Println("this line is being printed first because")
    return true // after this value is returned, the above 2 lines execute in reverse lifo order
}
```

## More on

* ok
* pointer
* interface
* Goroutines
* [go playground](https://go.dev/play/p/tnWMjr16Mm)
* [go by example](https://gobyexample.com/)
* [go documentation](https://go.dev/doc/)
* [learn go in y minutes](https://learnxinyminutes.com/docs/go/)
* [golang university 101](https://youtube.com/playlist?list=PLEcwzBXTPUE9V1o8mZdC9tNnRZaTgI-1P&si=s8757iY2O_h2H6GM)
* [golang university 201](https://youtube.com/playlist?list=PLEcwzBXTPUE_5m_JaMXmGEFgduH8EsuTs&si=G_H7npEdjK5EB-KJ)
* [golang university 301](https://youtube.com/playlist?list=PLEcwzBXTPUE8KvXRFmmfPEUmKoy9LfmAf&si=1Y7Bn8Ez_k7lt1Ds)
