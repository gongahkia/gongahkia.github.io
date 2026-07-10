---
category: Tech
---
# Standard ML

# `Standard ML`

Functional language for research and programming language design.

## Comments

```
(* ----- COMMENT ----- *)

(* this is a single-line comment *)

(* 
there is no separate implementation 
for multi-line comment syntax but 
this is accepted
*)
```

## Printing

```
(* ----- PRINTING ----- *)
    (* print => receives a string argument to be printed to the stdout, without including a newline by default *)

print "this does not have a newline";
print "this has a newline but we need to explicitly define it\n";
```

## Quickstart

```
(* ----- QUICKSTART ----- *)
    (* semicolon language *)
    (* strong type system but does not enforce static typing *)
    (* since Standard ML is a pure functional language, every expression evaluates to a value, and most things are expressions excluding imperative constructs, exception handling and module definitions *)
    (* shares many of the hallmarks of functional programming including variable immutability and pure functions that take in and return a value *)
    (* open => imports a standard or user-defined library and brings it within the local scope of the present file *)
```

## Types

```
(* ----- TYPE ----- *)
    (* int => integer value *)
    (* real => floating point value *)
    (* string => declared with "" double quotation marks *)
    (* char => declared with #"" hashtag and double quotation marks *)
    (* bool => true, false *)
    (* unit => declares the absence of a value as (), the equivalent of void in other programming languages *)
```

## Operators

```
(* ----- OPERATOR ----- *)

(* --- ARITHMETIC OPERATORS --- *)

+ (* addition *)
- (* subtraction *)
* (* multiplication *)
div (* division *)
mod (* modulo *)

(* --- COMPARISON OPERATORS --- *)

= (* complete equality check for both type and value *)
<> (* complete inequality check for both type and value *)
> (* comparison operator *)
< (* comparison operator *)
>= (* comparison operator *)
<= (* comparison operator *)

(* --- LOGICAL OPERATORS --- *)

andalso (* and *)
orelse (* or *)
not (* not *)
```

## Control structures

```
(* ----- CONTROL STRUCTURE ----- *)

(* --- CONDITIONALS --- *)

(* IF ELSE IF ELSE *)

val x = 10;
val result =
    if x > 10 then
        "greater than 10"
    else if x = 10 then
        "equal to 10"
    else
        "less than 10";

(* CASE OF _ *)
    (* provides advanced pattern matching capabilities similar to Rust *)
    (* note that | separates each case condition *)
    (* _ => acting as the default catch-all operator for when all other case predicate conditions fall through *)

fun describeNumber n = 
  case n of
    1 => "one"
  | 2 => "two"
  | _ => "many";

(* --- LOOPS --- *)
    (* since Standard ML is a functional language, conventional imperative for and while loop constructs are not provided *)
    (* instead, higher order functions are used for traversal and interacting with iterable data structures *)
    (* some degree of looping can also be achieved with recursion *)

(* HIGHER ORDER FUNCTIONS *)
    (* map => applies a specified function to each element of a list *)
    (* foldl => left fold that reduces a list from the left using a specified binary function and a specified initial accumulator *)
    (* foldr => right fold that reduces a list from the right using a specified binary function and a specified initial accumulator *)
    (* filter => selects elements from a list that satisfy a specified predicate *)

val numbers = [1, 2, 3, 4, 5, 6];

val squares = List.map (fn x => x * x) numbers; (* [1, 4, 9, 16, 25, 36] *)

val sum = List.foldl (op +) 0 numbers; (* 15 *)

val evens = List.filter (fn x => x mod 2 = 0) numbers; (* [2, 4, 6] *)

val strings = ["Hello", " ", "World", "!"];
val concatenated = List.foldr (op ^) "" strings; (* "Hello World!" *)

(* RECURSION *)

fun factorial 0 = 1
  | factorial n = n * factorial (n - 1); 
```

## Data structures

```
(* ----- DATA STRUCTURE ----- *)
    (* list => dynamically sized ordered collection of elements of the same datatype, declared with [] square brackets *)
    (* tuple => fixed-size collection of elements of multiple datatypes, declared with () round brackets *)
    (* record => collection of comma-delimited named fields and their respective datatypes serving as the equivalent of Typescript and Go structs in Standard ML via type aliases, declared with {} curly braces *)
    (* option => unique type specifying a given variable could possibly store a value of the specified type or no value, equivalent of nullable values in other languages *)
        (* SOME => declares the presence of a value where a given variable can store a value *)
        (* NONE => delares the absence of a value where a given variable does not store a value *)

val anExampleList = [1, 2, 3, 4];
val anExampleTuple = ("Alice", 30);
type anExampleRecord = {name: string, age: int};
type coordinate = {X: int, Y: int};
val anExampleOptionVariable = SOME 42;
val anotherExampleOptionVariable = NONE;
```

## Functions

```
(* ----- FUNCTION ----- *)
    (* fun <functionName> (<parameterName> : <parameterDatatype>) : <returnDatatype> = <functionDefinition> => function definition for a named function *)
    (* fn <parameterName> => <functionDefinition> => function definition for an anonymous function, which is then normally assigned to a named variable *)
    (* Standard ML functions also have implicit return of the final expression within the function definition, another hallmark of functional programming languages *)
    (* Standard ML also provides for user-defined higher-order functions and anonymous functions *)

fun square (x : int) : int = x * x; (* named function definition *)
val double = fn x => x * 2; (* anonymous function definition *)
fun applyTwice (f, x) = f (f x); (* higher order function *)
val result = applyTwice (double, 3);
```

## More on

* [standard ml documentation](https://smlhelp.github.io/book/)
* [learn standard ml in y minutes](https://learnxinyminutes.com/docs/standard-ml/)
* [rationale for learning standard ml](https://www.reddit.com/r/functionalprogramming/comments/pu7tam/is_it_worth_to_learn_standard_ml/)
