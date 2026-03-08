# OCaml

# `OCaml`

## Comments

```
(* This is a comment *)
```

## Introduction

A strictly evaluated, functional language with imperative features.

```
(*** FUNCTIONAL LAND ***)

(* everything in OCaml is an expression *)
(* every expression (* variables, functions *) evaluates to a value *)
(* OCaml lacks "procedures" and every function must evaluate to a value, so functions that don't do that and are called for their side effects (* like print_endline *) return a value of "unit" type *)
```

## Expressions, Variables and Functions

* double semicolon language *(to separate expressions, though not always necessary)*
* `let` for function and variable declaration
* [currying](https://www.codingame.com/playgrounds/6196/explaining-currying-to-myself) and [type signatures](https://stackoverflow.com/questions/6005176/ocaml-explicit-type-signatures) like haskell
* optional type declaration *(OCaml compiler automatically infers types)*

```
(*** EXPRESSIONS ***)

(* Expressions can be separated by a double semicolon, though in production source code often omits the double semicolon for stylistic purposes. *)

(*** VARIABLES ***)

let x = 10;;  (* this is a variable *)

(* definitons can be chained together with "let ... in" constructs *)

let x = 10 in 
let y = 20 in
x + y ;; (* this expression evaluates to 30 *)

(*** FUNCTIONS ***)

let func_int(x:int):int = x + 1;; (* this is a function *)

(* invoking functions usually doesn't require brackets UNLESS the function argument is an expression *)

let func_int_10 = func_int 10;;
let func_inc_idk = func_int (11-1);;

(* every function must take at least one argument *)

let print_hlo_wrld() = print_endline "hello world";; (* when creating void functions, we need to specify the bracket to denote the empty function *)
print_hlo_wrld();; (* when calling void functions, we must specify the empty bracket *)

(* calling a function with an insufficient number of arguments creates a new function *)
let make_inc x y = x + y;; (* the type signature for make_inc is int -> int -> int *)
let inc_2 = make_inc 2;; (* this creates a new function inc_2 of type signature int -> int *)
inc_2 3;; (* this will evaluate to 5 *)

(* when there are multiple expressions in the function body, the last expression becomes the return value and all other expressions are of "unit" type *)

let print_and_return x = 
    print_endline (string_of_int x);
    x
;;

(*** RECURSIVE FUNCTIONS ***)

(* recursive functions must be marked with a rec*)

let rec factorial n = 
    if n = 0 then 1
    else n * factorial (n-1)
;;

(* note the above can also be written like this *)

let rec factorial n = if n = 0 then 1 else n * factorial (n-1);; (* just that this shit is really virtually unreadable so the above is preferred *)

(* the "let ... and ... in" construct is also available for mutually recursive functions *)

let rec 
    is_even = function 
    | 0 -> true
    | n -> is_odd(n-1)
and 
    is_odd = function
    | 0 -> false
    | n -> is_even(n-1)
;;

(*** ANONYMOUS FUNCTIONS ***)

(* anonymous functions are declared with the fun keyword *)

let my_lambda = fun x -> x * x;;
```

## Operators

```
(*** OPERATORS ***)

(* in functional programming land, every operator is a function and can be called as such *)
(+) 3 4;; (* evaluates the same way as 3 + 4 *)

(* OCaml DOESN'T ONLY refrain from implict type conversion between floats and integers, float arithmetic uses wholly different operators *)

12 + 3;; (* integer arithmetic, evaluates to 15 *)
12 / 3;; (* integer arithmetic, evalutes to 4 *)

12.0 +. 3.0;; (* float arithmetic, evaluates to 15.0 *)
12.0 /. 3.0;; (* float arithmetic, evaluates to 4.0 *)

5 mod 2;; (* modulo is universal across floats and integers *)

(* Unary minus (* the negation operator *) is a marked exception to this rule as it is polymorphic, although type-specific versions of it do exist as well *)

(* Unary operators are operators which are used to calculate the result on only one operand *)
(* Binary operators are operatores which are used to calculate the result on two operands *)

(* Polymorphic unary operator *)

-3;; (* evaluates to the integer value -3 *)
-4.5;; (* evaluates to the float value -4.5 *)

(* Type specific unary operators *)

~- 3;; (* applicable for integers only *)
~-. 3.4;; (* applicable for floats only *)
~- 3.4;; (* this results in a type error *)

(* You can also be sneaky and redefine your own operators for fun *)

let (~/) x = 1.0 /. x;; (* unary operators must start with ~ *)
~/ 4.0;; (* this evaluates to the float value of 0.25 *)
```

## Data structures

```
(*** DATA STRUCTURES ***)

(* LIST *)

(* square brackets, items are semi-colon separated *)
(* dynamically allocated space, size can be casually changed *)
(* dynamically allocated space, can store elements of different datat types *)

let my_list = [1;2;3];; (* of type "int list" *)

(* LIST METHODS *)

(* LIST INDEXING *)

List.nth my_list 1;; (* evaluates to integer 2, the second element in the list of index 1 *)

(* LIST MAP *)

(* List.map() calls an anonymous function that is user-defined *)

(* List.map() applies the given function to each iteration variablein the list *)

List.map(fun x -> x * 2)  [1;2;3];; (* this should evaulate to [2;4;6] *)

(* LIST FILTER *)

(* List.filter() also calls an anonymous function that is user-defined *)

(* List.filter() applies the specified conditonal check as a function to the list, and only those that pass said check are remaining in the list *)

List.filter (fun x -> x mod 2 = 0) [1;2;3;4];; (* this should evaulate to [2;4] *)

(* ADDING ELEMENTS *)

(* add an item to the FRONT of a list with the :: constructor which is often referred to as a "cons" *)

1 :: [2;3];; (* evaluates to [1;2;3] *)

(* TUPLES *)

(* (* optionally surrounded by *) round brackets, items are comma separated *)

let my_tuple = 3, 4;; (* of type "int * int" *)
let my_other_tuple = (5,6,7);; (* this is a much clearer more approved syntax *)

(* warning to not separate list items by commas, otherwise you'll accidentally create a list with a tuple inside *)

let bad_list = [1,2];; (* this shit becomes [(1,2)] *)

(* ARRAYS *)

(* "[| |]" surrounded, items are semicolon seperated *)
(* statically allocated space, size of array declared at initialization * )
(* statically allocated space, arrays can only contain same data type *)

let my_array = [| 1;2;3 |];;

(* ARRAY INDEXING *)

my_array.(0);; (* this evaluates to the integer 1, the first element of the array with index 0 *)
```

## Strings and Characters

```
(*** STRINGS and CHARACTERS ***)

(* double quotes for string literals *)
(* single quotes for character literals *)
(* single and double quotes are not interchangeable, effects may vary depending on how you mix them up *)

let my_str = "Hello world";; (* string literal *)
let my_char = 'a';; (* character literal *)
let unintended_effect = "w";; (* this creates a single character string, not a character *)
let syntax_error = 'syntax error';; (* this results in a syntax error *)

(* STRING CONCATENATION *)

(* ^ operator *)

let some_str = "hello" ^ "world";; (* evaluates to "helloworld" string *)

(* CAVEAT *)

(* strings are NOT arrays of characters, and the two data types cannot be mixed in expressions *)
(* characters are converted to strings with String.make 1 my_char *)

let ocaml = (String.make 1 'O') ^ "Caml";; (* this evaluates to the string value "OCaml" by type converting a character to a string and concatenating that single-character string with the "Caml" string *)

(* FORMATTED STRING *)

(* C or Bash-like syntax *)

Printf.printf "%d %s" 99 "bottles of beer";; (* evauates to the string value of "99 bottles of beer" *)

(* PRINT STATEMENTS *)

print_string "hello world\n";; (* prints string values without the newline character *)
print_endline "hello world";; (* prints string with a newline character *)

(* READ STRINGS *)

let line = read_line();; (* does what it says it does *)
```

## User-defined data types

```
(*** USER-DEFINED DATA TYPES ***)

(* defined using the type keyword *)

type my_int = int;; (* this is an incredibly useless type alias, refrain from doing this *)

(* there are also magic type constructors that must start with a capital letter, do google what these do for more detail *)

type ml = Ocaml | StandardML;; 
let lang = OCaml;; (* has the type "ml" *)

(* the below are also valid type constructors *)

type my_number = PlusInfinity | MinusInfinity | Real of float;;
let r0 = Real (-3.4);; (* of type my_number *)

(* type constructors can also be used to implement polymorphoc arithmetic *)

type number = Int of int | Float of float;; 

(* an example is of a point on a 2d plane *)

type point2d = Point of float * float;;
let my_point = Point (2.0, 3.0);;

(* types can also be parameterized, like in this type for "list of lists of anything really" where 'a can be substituted with any type *)

type 'a list_of_lists = 'a list list;;
type int_list_list = int list_of_lists;;

(* types can also mysteriously be recursive, like this type analogous to a built-in list of integers *)

type my_int_list = EmptyList | IntList of int * my_int_list;;
let l = IntList (1, EmptyList);;
```

## Pattern matching

```
(*** PATTERN MATCHING ***)

(* all hail the pattern matching statement *)
(* matches an argument against an exact value, a predicate or a type constructor *)
(* _ acts as the catch-all default statement similar to Rust *)

(* MATCHING against exact values *)

let is_zero x = 
    match x with 
    | 0 -> true
    | _  -> false
;;

let is_one = function  (* the function keyword is interchangeable with the match with *)
    | 1 -> true
    | _ -> false
;;

(* MATCHING predicates *)

(* basically guarded pattern matching aka pattern matching with a conditional check *)

let abs x = 
    match x with 
    | x when x < 0 -> -x
    | _ -> x
;;

abs 5;; (* evaluates to 5 *)
abs (-5);; (* also evaluates to 5 *)

(* MATCHING type constructors *)

type animal = Dog of string | Cat of string;;

let say x = 
    match x with 
    | Dog x -> x ^ " says woof" 
    | Cat x -> x ^ " says meow"
;;

say (Cat "Fluffy");; (* evaluates to the string "Fluffy says meow" *)

(* TRAVERSING DATA STRUCTURES with pattern matching *)

(* most commonly used for recursive types *)
(* built-in constructor operator :: covered previously can be matched like any other since its a type constructor *)

let rec sum_list l = 
    match l with 
    | [] -> 0
    | head :: tail -> head + (sum_list tail)
;;

sum_list [1;2;3];; (* evaluates to 6 *)
```

## More on

* [ocaml documentation](https://ocaml.org/)
* [eliom full stack](https://github.com/ocsigen/eliom)
* [web-based editor and interpreter](https://ocaml.org/play)
* [another tutorial](https://cs3110.github.io/textbook/cover.html)
