# F*

# `F*`

Functional language for writing formal verification of programs.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

(* this is a 
multi-line 
comment *)
```

## Printing

```
// ----- PRINTING -----
    // print_string => receives a string argument that is then printed to the stdout with no inclusion of a newline by default
    // note that there is no default implementation for a print function that automatically includes a newline

let _ = print_string "this does not include a newline"
let _ = print_string "this has a newline but only because we explicitly specified it's inclusion\n"
```

## Quickstart

```
// ----- QUICKSTART -----
    // strong formal verification capabilities through specification of preconditions, postconditions and invariants allow writing of formal proofs to verify program correctness
    // modular programming with namespaces
    // various transpilation targets including OCaml, C and WASM
    // module => defines a module used to organise code, required as a module definition at the beginning of every F* file, the equivalent of namespaces in other languages
    // let => begins variable or function declaration within a given local scope, alongside being used for pattern-matching
        // note that values within F* are IMMUTABLE by default unless explicitly specified otherwise, a hallmark of the functional paradigm
    // : => declares the type of a value stored within a variable, providing type declaration within F*
    // _ => placeholder, wildcard operator that represents a variable or module binding that is to be discarded, as well as affording anonymous immediate function calls

module Quickstart

let add (x:int) (y:int) : Tot int =
    x + y

let _ =
    let result = add 3 4 in
    print_string (string_of_int result)

let (_, onlyKeepThisValue) = (1, 2) 
let unusedVarExample = _ 
module _ = anExampleModuleToBeDiscarded
```

## Types

```
// ----- TYPE -----
    // int => stores an integer number value
    // float => stores a floating number value
    // string => stores a string value declared within "" double quotation marks
    // bool => true, false

let anExampleInt : int = 42
let anExampleFloat : float = 3.14
let anExampleString : string = "Hello, F*!"
let anExampleBool : bool = true
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

= // complete equality check for both type and value
<> // complete inequality check for both type and value
< // comparison operator
> // comparison operator
<= // comparison operator
>= // comparison operator

// --- LOGICAL OPERATOR ---

&& // logical and
|| // logical or
not // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE =====

// --- CONDITIONALS ---

// IF THEN ELSE IF THEN ELSE
    // note the use of then to suffix every predicate condition following the if and else if statements similar to Bash
    // the result of a conditional statement can be directly assigned as a function definition or a value as below, a hallmark of the functional paradigm

let classify_number (n:int) : string =
    if n < 0 then
        "Negative"
    else if n = 0 then
        "Zero"
    else
        "Positive"

// MATCH WITH |
    // the equivalent of match case statements in other programming languages, providing powerful pattern matching capabilities in F* similar to Rust
    // match with => specifies the predicate variable to be matched
    // | => prefixes every possible matching predicate case condition 

type shape =
    | Circle of float 
    | Rectangle of float * float
    | Triangle of float * float * float 

let describe_shape (s:shape) : string =
    match s with
        | Circle r -> Printf.sprintf "Circle with radius %f" r
        | Rectangle (w, h) -> Printf.sprintf "Rectangle with width %f and height %f" w h
        | Triangle (a, b, c) -> Printf.sprintf "Triangle with sides %f, %f, %f" a b c

// --- LOOPS ---
    // as a functional programming language, F* does not provide conventional loop constructs
    // instead, higher-order functions and recursion are two ways in which iteration and traversal of iterable data structures can be achieved in F*

// HIGHER-ORDER FUNCTIONS
    // note that F* itself does not provide a default implementation for common higher-order functions like map, filter, lfold and rfold
    // however, first-class functions mean that the programmer can easily implement these themselves
    // the below is merely one way to implement these higher order functions, and there are many alternative methods to achieve the same effect
    // in fact, many higher-order function implementations in F* are also recursive, as seen below

let rec map (f:'a -> 'b) (lst:list 'a) : list 'b =
    match lst with
        | [] -> []
        | x::xs -> f x :: map f xs

let rec filter (p:'a -> bool) (lst:list 'a) : list 'a =
    match lst with
        | [] -> []
        | x::xs -> if p x then x :: filter p xs else filter p xs

let rec lfold (f:'b -> 'a -> 'b) (acc:'b) (lst:list 'a) : 'b =
    match lst with
        | [] -> acc
        | x::xs -> lfold f (f acc x) xs

let rec rfold (f:'a -> 'b -> 'b) (acc:'b) (lst:list 'a) : 'b =
    match lst with
        | [] -> acc
        | x::xs -> f x (rfold f acc xs)

// RECURSION
    // rec => specifies that a given function contains a recursive call

let rec factorial n =
    if n = 0 then 1
    else n * factorial (n - 1)
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // list => ordered collection of ; semicolon-delimited elements of the same datatype, declared within [] square brackets
    // tuple => ordered collection of , comma-delimited elements of multiple datatypes, declared within () round brackets wherein each tuple's type signature is a composite unique datatype
        // note that the type declaration of a tuple sees its elements' datatypes being * asterisk-delimited
    // record => user-defined collection of named fields and their respective datatypes, declared within {} curly braces, effectively allowing modelling of representative data through type aliases
    // algebraic datatype => ordered collection of | pipe-delimited constructor datatypes that can store multiple types of values
        // of => used to specify the datatype of each possible form within the algenbraic datatype
    // option => nullable datatype that specifies a given variable might either store the special value Some or the null-equivalent value None 
        // Some => specifies the presence of a value
        // None => specifies the absence of a value
    // result => stores a value that is either the special value Ok or the special value Error
        // Ok => succesful result
        // Error => error was hit 
    // variant => ordered collection of named | pipe-delimited constructors each holding values of different types

let anExampleList : list int = [1; 2; 3; 4]
let anExampleTuple : (int * string * bool) = (1, "one", true)

type anExampleRecord : {
    name : string;
    age : int;
}

type threeDimensionalCoordinate {
    X : int;
    Y : int;
    Z : int;
}

type anExampleAlgebriacDatatype =
    | Circle of float
    | Rectangle of float
let myCircle : anExampleAlgebriacDatatype = Circle 3.0
let myRectangle : anExampleAlgebriacDatatype = Rectangle (3.0, 4.0)

let anExampleOptionValue1 : option int = Some 42
let anExampleOptionValue2 : option int = None

type anExampleResultValue 'a 'e =
    | Ok of 'a
    | Error of 'e
let successful : anExampleResultValue int string = Ok 42
let failed : anExampleResultValue int string = Error "Something went wrong"

type anExampleVariantValue =
    | IntValue of int
    | StringValue of string
    | BoolValue of bool
let variantExample : anExampleVariantValue = IntValue 42
```

## Functions

```
// ----- FUNCTION -----
    // functions in F* are first-class citizens, allowing for the creation of higher-order functions, a hallmark of the functional paradigm
    // similar to many other functional languages, F* functions also feature implicit return of the last expression within the function
    // as previously mentioned above, F* features an extremely strong type system, seem below in the multiple function annotations within a single function definition
    // let <functionAnnotation1> <functionName> ( <functionParameterName(s)> : <functionParamterDatatype(s)> ) : <functionAnnotation2> <returnValueDatatype> = <functionDefinitionBody> => declaration and definition of a named function

// --- FUNCTION ANNOTATION ---

// FUNCTION ANNOTATION 1
    // rec => specifies that a given function contains a recursive call
    // ghost => specifies that a given function is intended for verification purposes only and should not be used in proper runtime execution
    // lemma => specifies that a given function is meant as an intermediate step in a formal proof and should not be used in proper runtime execution

// FUNCTION PARAMETER DATATYPE
    // Decrease => within recursive function calls, function parameter datatypes(s) can sometimes be specified as "Decrease" where a metric decreases with each recursive call, ensuring further guarantee of termination of a recursive function
        // in these cases, the function annotation 2 of the function would be "Tot" since there is certainty of termination of the function with no possibility of an infinite occuring

// FUNCTION ANNOTATION 2
    // Tot => specifies that a given function will terminate with the specified return datatype and will not enter an infinite loop
    // !Tot => specifies that a given function might not terminate and resultingly might not produce a result for certain inputs
    // Erased => specifies that a given function should be ignored and erased during compilation of the F* file, meaning it does not have any runtime representation and thus is used for static checks and proofs only

let add (x:int) (y:int) : Tot int =
    x + y

let rec div_by_zero (x:int) : !Tot int =
    1 / (x - 1)

let ghost function_for_verification (x:int) : Tot int =
    x + 1

let lemma example_lemma (x:int) : Tot int =
    x + 1

let rec factorial (x:int) (decr:Decrease x) : Tot int =
    if x = 0 then 
        1
    else 
        x * factorial (x - 1) (decr x)

let erased_function (x:int) : Erased int =
    x + 1
```

## More on

* [F* documentation](https://fstar-lang.org/)
* [learn F* through example](https://fstar-lang.org/tutorial/)
* [proof-oriented programming in F*](https://fstar-lang.org/tutorial/proof-oriented-programming-in-fstar.pdf)
