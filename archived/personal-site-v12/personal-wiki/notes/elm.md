---
category: Tech
---
# Elm

# `Elm`

Functional language that compiles to native JavaScript for web development.

## Comments

```
-- ----- COMMENT -----

-- this is a single-line comment

{- this 
is a multi-line
comment -}
```

## Printing

```
-- ----- PRINTING -----
    -- Debug.log => prints the specified string arguments to the stdout without a newline included, generally used for debugging purposes

Debug.log "Message with newline" "Hello, Elm!\n"
```

## Quickstart

```
# ----- QUICKSTART -----

sudo apt install nodejs npm # Elm is installed via node and requires nodejs and npm installed as dependancies
sudo npm install -g elm # installs Elm globally
elm make Main.elm # compiles Elm code to JS and outputs main.js
```

## Types

```
-- ----- TYPE -----
    -- variable type annotations in Elm are specified by the : colon operator
    -- Int => integer values
    -- Float => floating point values that cover both single and double-precision
    -- Bool => True, False
    -- String => declared within "" double quotes, all characters are handled as one-character-long strings
    -- List <listElementType> => specifies a list of the given element, where a list literal is declared within [] straight brackets
    -- (<tupleDataType(s)>) => specifies a composite datatype of the unique combination of datatypes comprising the tuple, where a tuple literal is declared within () round brackets
    -- type alias <recordName> => specifies a record under the given name, where a record's fields are comma-delimited and specified within {} curly braces
```

## Operators

```
-- ----- OPERATOR -----

-- --- ARITHMETIC OPERATOR ---

+ -- addition
- -- subtraction
* -- multiplication
/ -- division
% -- modulo

-- --- COMPARISON OPERATOR ---

== -- complete equality check for type and value
/= -- complete inequality check for type and value
< -- comparison operator
> -- comparison operator
<= -- comparison operator
>= -- comparison operator

-- --- LOGICAL OPERATOR ---

&& -- and
|| -- or
not -- not
```

## Control Structures

```
-- ----- CONTROL STRUCTURE -----

-- --- CONDITIONALS ---

-- IF ELSE IF ELSE 
    -- operates the same as in other programming languages

isAdult : Int -> String
isAdult age =
    if age >= 18 then
        "Adult"
    else if age >= 13 then
        "Teenager"
    else
        "Child"

-- CASE OF _
    -- equivalent of match case in other programming languages
    -- provides strong pattern-matching constructs in Elm
    -- _ => acts as the default catch-all operator should all other predicate checks fall through similar to Rust

getType age =
    case age of
        0 -> "Baby"
        1 -> "Toddler"
        2 -> "Child"
        _ -> "Unknown"

startsWithA word =
    case word of
        'A' :: rest -> True
        _ -> False

-- --- LOOPS ---
    -- Elm adheres to functional programming paradigms, and so there are no conventional loop constructs
    -- iterable data structures can still be parsed and traversed using higher-order functions

-- --- HIGHER ORDER FUNCTIONS ----
    -- these higher order functions operate as you'd expect in any functional programming language
        -- List.map
        -- List.filter
        -- List.foldl

numbers = [1, 2, 3, 4, 5]
doubledNumbers = List.map (\x -> x * 2) numbers -- double each element in the list

numbers = [1, 2, 3, 4, 5]
evenNumbers = List.filter (\x -> x % 2 == 0) numbers -- filtering out even numbers within the list

numbers = [1, 2, 3, 4, 5]
sum = List.foldl (+) 0 numbers -- summing all the elements in the list

-- --- RECURSION ---
    -- Elm also further supports recursion for more complex solutions as required

sumList : List Int -> Int -- summing list elements by recursive function calls
sumList list =
    case list of
        [] -> 0
        head :: tail -> head + sumList tail

numbers = [1, 2, 3, 4, 5]
sum = sumList numbers
```

## Data structures

```
-- ----- DATA STRUCTURE -----
    -- List => immutable ordered collection of elements of the same datatype, higher-order functions often called on lists for multiple purposes
    -- Tuple => immutable ordered collection of elements of multiple datatypes
    -- Record => equivalent of structs in Go and Rust and records in Ada, allowing type aliases for user-defined types where specified fields provide clear representation of structured data

aList = [1, 2, 3, 4, 5]

aTuple = ("Alice", 30)

type alias aRecord = {
    firstName: String,
    lastName: String 
}

type alias Coordinate = {
    x : Float,
    y : Float
}
```

## Functions

```
-- ----- FUNCTION -----
    -- Elm's function definition bears many similarities to Haskell's function definition given both are functional programming languages
    -- these include value immutability, implicit return of the last expression within the function, space-delimited function parameters and return values
    -- Elm also further supports user-defined higher order functions for more complex function calls

-- --- NAMED FUNCTION ---
    -- <functionName> <functionArguments> = <functionDefinition> => function definition for a named function in Elm features implicit returns of the final expression, and function call is invoked without brackets

add a b = a + b -- declares the add named function
result = add 3 5 -- calling the previously declared function

-- --- ANONYMOUS FUNCTION ---
    -- \ => declares the start of an anonymous function
    -- \<anonymousFunctionArguments> -> <functionDefinition> => function definition for an anonymous function, where the anonymous function is normally assigned to a named variable

addButAnonymous = \a b -> a + b -- same as the named add function above, but as an anonymous function
square = \x -> x * x -- anonymous function that squares the function parameters
```

## More on

* [elm-lang.org](https://elm-lang.org/)
* [elm documentation](https://elm-lang.org/docs)
* [learn elm in y minutes](https://learnxinyminutes.com/docs/elm/)
* [higher order functions in elm](https://learnyouanelm.github.io/pages/06-higher-order-functions.html)
