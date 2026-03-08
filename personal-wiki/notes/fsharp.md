# F#

# `F#`

## Quickstart

* functional
* supports object-oriented patterns
* foss
* runs on linux, osx, windows

## Comments

```
// single line comment

(* multi
line
comment, 
similar
to 
OCaml *)
```

## Printing

```
// ---------- PRINT ----------
    // printf and printfn can be used to directly print string literals

printf "hello world\n" // printf prints without the newline
printfn "hello world" // printfn prints with a newline character

// ---------- FORMATTED STRING ----------
    // $ and {} used for string interpolation
    // both printf and printfn can print formatted strings with format specifiers using the syntax of {PRINT FUNCTION} {STRING WITH FORMAT SPECIFIFERS} {VARIABLES}
        // %s => string
        // %d => decimal
        // %i => integer
        // %x => hexadecimal
        // %f => floating point number
        // %e => exponential
        // %g => general format (automatically chooses between %f and %e)
        // %b => boolean
        // %c => character
        // %A => prints values using F#'s default formatting
        // %Ns => specifies a minimum field width of N characters for strings
        // %Nd => specifies a minimum field width of N characters for decimals
        // %Ni => specifies a minimum field width of N characters for integers
        // %N.Mf => specifies a minimum field width of N characters and M decimal places for floating point numbers

let dish = "cereal chicken"
let cost = 2.50
let finSentence = $"This {dish} costs {cost}"
printfn "%s" finSentence // printing of a string variable using string interpolation
```

## Variables

```
// ---------- VARIABLE ----------
    // let defines an immutable variables 
    // type declaration is not required

let anInt = 5
let myFloat = 3.14
let myString = "smacks"

// NOTE

= // both the assignment operator AND equality check operator (for equality checks similar to == or === in other languages)
```

## Types

```
// ---------- TYPE ----------
    // expressions and values are immutable by default
    // int => 32-bit signed int (42)
    // int64 => 64-bit signed int (10000)
    // float => 64-bit floating point number (3.42)
    // char => single unicode character, single-quoted ('a')
    // string => sequence of characters, double-quoted ("watermelon")
    // bool => boolean value (true, false)
```

## Data structures

```
// ---------- LIST ----------
    // lists are immutable, so any functions or operators that are called on the list return a copy or must be reassigned
    // ordered collections of elements of the same type
    // lists are wrapped with [] square brackets, and ; semicolon delimited (instead of the usual commas)

let aList = [2; 3; 4; 5]

// LIST METHODS
    // see below for other list functions

let addedToList = 1 :: aList // :: adds an element to the front of the list, so this evaluates to [1; 2; 3; 4; 5]
let concatTwoLists = [0; 1] @ addedToList // @ concatenates two lists together, so this evaluates to [0; 1; 1; 2; 3; 4; 5]
let aListOfRange = [1..10] // .. defines an inclusive range within the list, so this evaluates to [1; 2; 3; 4; 5; 6; 7; 8; 9; 10]
let aListFromSeqExp = [for i in 1..10 -> i * i] // lists can be defined with sequence expressions as well, as seen here this creates a list of squares of integers 1 to 10, which evaluates to [1; 4; 9; 16; 25; 36; 49; 64; 81; 100]
let aListFromListComprehension = [for i in 1..10 do yield i * i] // basically the same as above but achieved via list comprehension

// --------- ARRAY ----------
    // arrays are mutable and considered more efficient
    // ordered collection of elements of the same type
    // arrays are wrapped with [||] square brackets with bars and ; semicolon delimited

let anArray = [|"a"; "b"|]

// ---------- SEQUENCE ----------
    // infinite sequence of elements
    // basically an enumerator
    // sequences are wrapped with {} curly braces and ; semicolon delimited and accompanied with seq
    // yield is used to generate sequence values where required

let aSequence = seq {yield "a"; yield "b"}

// ---------- TUPLE ----------
    // collecton of elements of any data type
    // tuples are anonymous by default
    // , comma delimited
    // can be unpacked with pattern matching similar to Rust

let aTuple = 1,2
let anotherTuple "a", 2, true

let x,y = aTuple // this unpacks the tuple and sets the value of x = 1, y = 2
```

## Functions

```
// ---------- FUNCTION ----------
    // let defines a function, which is defined similar to a variable (since we're in functional land where every statement is an expression that evaluates to a value including functions)
    // no brackets and implicit return of last expression similar to Haskell
    // functions are first class entitites and can be chained to create powerful constructs
    // let {FUNCTION NAME} {FUNCTION PARAMETERS} = {FUNCTION PROCEDURES which are implicitly returned}
    // multiline functions can be defined with indents
    // () brackets can be used to define function precedence
    // |> pipe operator also available to pipe the output of one operation to another, this is very common in F#
    // anonymous functions (lambdas) can be defined with the fun keyword
    // modules group functions together (indentation necessary for each nested module)

let square x = x * x // note that parameter and return values are effectively non-distinguishable
square 3 // evaluates to the value of 9

let add x y = x + y // implicit return of the x + y calculated value
add 2 3 // runs the function, evaluates to the value of 5

// MULTILINE FUNCTION
    // mainly used for greater readibility

let evens list = 
    let isEven x = x % 2 = 0 // defining the sub function isEven within the multiline function evens so that it can only be referenced within the evens function, also the first = is an assignment of an expression, the second = is an equality check 
    List.filter isEven list // built-in function List.filter then called on each value of the list parameter received by evens function based on the conditional check laid out in the defined sub function isEven

evens [1; 2; 3; 4; 5] // this runs the above function as expected

// FUNCTION PRECEDENCE
    // () define function precedence, and help readibility

let sumOfSquaresTo100 = List.sum ( List.map square [1..100] ) // here, the brackets specify the contents of List.map is to be called on the in t list defined for range 1-100, mapping the square function on each value, the returned value then being passed to List.sum 

// PIPING 
    // |> lets you pipe

let sumOfSquaresTo100WithPipes = [1..100] |> List.map square |> List.sum // this does the same thing as above

// ANONYMOUS FUNCTIONS
    // fun defines a lambda function for a one-time use function

let sumOfSquaresTo100ButLambda = [1..100] |> List.map (fun x -> x * x) |> List.sum // this does the same as the above code except it defines its own anonymous function using the fun keyword

// MODULES
    // module and indentation groups functions together
    // note there is no let when defining a module, just module

module SimpleMathThingies = 

    let add x y = x + y

    let subtract x y = x - y

    let multiply x y = x * y

    let divide x y = x / y

    let modulo x y = x % y

    let square x = x * x
```

## Control structures

```
// ---------- PATTERN MATCHING ----------
    // match with | -> allows for supercharged case switch statement, just like Rust
    // _ is the catch-all operator also similar to Rust
    // everything is still an expression, so everything evaluates to a value and is defined with let, even pattern matches
    // nested definition of expression!
    // pattern matching works for lists and other data structures as well

let simplePatternMatch = 
    let x = "a"
    match x with 
        | "a" -> printfn "x is a"
        | "b" -> printfn "x is b"
        | _ -> printfn "catch all operator hit" // F# does not allow nulls by default, an Option type must be used for pattern matching, although None is a valid value

// ---------- IF ELIF ELSE THEN ----------
    // F# also has the standard conditional checks, which work as expected
    // you can assign boolean expressions to variables and functions

let test x y =
    if x = y then "they are equals"
    elif x < y then "x is less than y"
    else "x is greater than y"
```

## Loops

```
// ---------- LOOP ----------
    // for in do allows you to iterate over a collection of elements
    // indentation matters
    // loops can be used to iterate over different patterns as well

let list1 = [1; 5; 100; 450; 788]
for i in list1 do
    printfn "%d" i

let seq1 = seq {for i in 1..10 -> (i, i*i)}
for (a, asqr) in seq1 do
    printfn "%d squared is %d" a asqr
```

## Helpful functions

```
// ----------- USEFUL ----------
    // note that these work for arrays as well, simply replace the List with Array
    // so Array.map, Array.filter and Array.iter are all valid

yield // yield allows for lazy evaluation of variables within loop expressions, often used in F# sequences to generate values only when they are required and called
yield! // yield! adds a whole subsequence to a sequence, allowing for concise expressions like yield! [5..10]
List.map // applies a function to each element in the list and returns a copy of the new list
List.iter // applies a function to each element in the list, and used for its side effects, like printing out each element of the list
List.filter // filters elements of a list based on a specified predicate (conditional check)
List.fold // applies a binary function to elements of the list from an initial defined accumalator value
List.reduce // similar to .fold but without an explicit defined accumulator
List.length // returns length of list
List.head // returns first list element of index 0
List.tail // returns last list element of index List.length-1
List.append // concatenates two lists together
List.concat // concatenates a list of lists into a single list, basically flattening it
List.rev // reverses order of elements in the list
List.sort // sorts the elements of the list by value
List.max // returns the element of max value in the list
List.min // returns the element of min value in the list

// read F# documentation for many others
```

## More on

* ref
* map
* set
* type
* union types
* active patterns (if, elif, else, then)
* rec
* async
* .NET compatibility
* OOP extensibility
* [try fsharp](https://try.fsharp.org/)
