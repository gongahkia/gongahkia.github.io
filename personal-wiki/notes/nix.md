# Nix

# `Nix`

Powerful Linux and Unix package manager for reliable, reproducible configurations.

## Comments

```
# ----- COMMENT -----

# this is a single-line comment

/*
this is a
multi-line
comment
*/
```

## Printing

```
# ----- PRINTING -----
    # builtins.trace => receives a string argument and a second optional argument that is then printed to the stdout and includes a newline depending on the arguments provided

builtins.trace "this does not have a newline" ""; # specifying an empty string as the second argument will omit the newline 
builtins.trace "this has a newline but only because we explicitly specified it\n";
```

## Quickstart

```
# ----- QUICKSTART -----
    # pure functional language, where everything is an expression and every expression must evaluate to a single value
    # all values in Nix are immutable by default
    # powerful, expressive syntax used for configuration management, package deployment, and software reproducibility within NixOS
    # semicolon-delimited language
    # let => provides variable binding of an immutable value to the specified named variable identifier

# --- EXAMPLE NIX PACKAGE ---
    # below is an example of a nix package definition

{ stdenv, fetchurl }:
stdenv.mkDerivation {
    name = "hello-2.10";
    src = fetchurl {
        url = "http://ftp.gnu.org/gnu/hello/hello-2.10.tar.gz";
        sha256 = "0ssi1wpaf7plaswqqjwigppsg5fyh99vdlb9kzl7c9lng89nd3fi";
    };
    buildInputs = [ ];
    meta = {
        description = "A program that produces a familiar, friendly greeting";
        license = stdenv.lib.licenses.gpl3;
    };
}
```

## Types

```
# ----- TYPE -----
    # Integer => stores an integer number value
    # Float => stores a floating-point number value
    # String => stores a string value declared within "" double quotation marks, note that characters are handled as single-character long strings
    # Boolean => true, false
    # null => represents the absence of a value, the equivalent of void in other programming languages
```

## Operators

```
# ----- OPERATOR -----

# ----- ARITHMETIC OPERATORS ----- 

+ # addition
- # subtraction
* # multiplication
/ # division
% # modulo

# ----- COMPARISON OPERATORS -----

== # complete equality check for both value and type
!= # complete inequality check for both value and type
> # comparison operator
< # comparison operator
>= # comparison operator
<= # comparison operator

# ----- LOGICAL OPERATORS -----

&& # logical and
|| # logical or
! # logical not
```

## Control structures

```
# ----- CONTROL STRUCTURE -----

# --- CONDITIONALS ---

IF ELSE IF ELSE

let
    age = 25;
in
    if age < 13 then
        "Child"
    else if age < 20 then
        "Teenager"
    else if age < 65 then
        "Adult"
    else
        "Senior"

# --- LOOPS ---
    # there are no traditional loop constructs in Nix as in other programming languages
    # instead, Nix relies on recursion and other higher-order functions to handle iteration and traversal of iterable data structures

# RECURSION

let
    factorial = n: if n == 0 then 1 else n * factorial (n - 1);
in
    factorial 5

# HIGHER-ORDER FUNCTIONS
    # below are examples of some higher-order functions in Nix such as 
        # map => applies a specified function to each element of the iterable data structure
        # filter => selects elements of a list that satisfy the specified predicate condition
        # fold => reduces a list to a single value using a specified binary function, the equivalent of reduce in other programming languages

let
    myList = [1 2 3 4 5];
    square = x: x * x;
    squaredList = map square myList;
in
    squaredList 

let
    myList = [1 2 3 4 5];
    isEven = x: x % 2 == 0;
    evenList = filter isEven myList;
in
    evenList

let
    myList = [1 2 3 4 5];
    sum = foldl (acc: x: acc + x) 0 myList;
in
    sum 
```

## Data structures

```
# ----- DATA STRUCTURE -----
    # list => fixed-size immutable ordered collection of elements of multiple datatypes, declared within [] square brackets, featuring lazy evaluation
    # attribute set => fixed-size immutable unordered collection of key-value pairs with string keys and values of multiple datatypes, the equivalent of dictionaries in Python and maps in other programming langauges, declared within {} curly braces

let
    anExampleAttributeSet = {
        name = "example";
        version = "1.0";
    };
in
    anExampleAttributeSet.name # evaluates to "example" string literal

let
    anExampleList = [1 2 3];
in
    anExampleList # evaluates to [1 2 3] list literal
```

## Functions

```
# ----- FUNCTION -----
    # <functionName> = <functionParameter1Name : functionParameter2Name : etc...> : <functionDefinitionBody> => definition and declaration of a named function
    # as a functional language, Nix features implicit return of the last expression within a function body

myFunction = x: x + 1; # named function with a single argument
myFunction 5 # evaluates to 6

myAdd = a: b: a + b; # named function with multiple arguments
myAdd 2 3 # evaluates to 5
```

## More on

* [nixos.org](https://nixos.org/)
* [nix documentation](https://nix.dev/reference/nix-manual.html)
* [learn nix in y minutes](https://learnxinyminutes.com/docs/nix/)
* [zero to nix](https://zero-to-nix.com/)
* [nix by example](https://ops.functionalalgebra.com/nix-by-example/)
* [a gentle introduction to the nix family](https://web.archive.org/web/20210121042658/https://ebzzry.io/en/nix/#nix)
