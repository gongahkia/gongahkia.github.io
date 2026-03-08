# Idris

# `Idris`

Dependently typed functional programming language with theorem proving capabilities.

## Comments

```
-- ---------- COMMENT ----------

-- this is a single-line comment

{- this is a
   multi-line
   comment -}
```

## Printing

```
-- ---------- PRINT ----------
    -- putStrLn => prints a string to stdout with newline
    -- putStr => prints a string to stdout without newline
    -- print => prints any showable value
    -- printLn => prints any showable value with newline

putStrLn "Hello, Idris!"
putStr "No newline here"
print 42
printLn[1][2][3]
```

## Quickstart

```
-- ---------- QUICKSTART ----------
    -- Idris is a purely functional language with dependent types
    -- types can depend on values, enabling very precise specifications
    -- : => type annotation operator
    -- = => definition operator
    -- totality checking ensures all functions terminate
    -- pattern matching and type inference are core features

module Main

-- Function with dependent type
vect : (n : Nat) -> Type
vect n = Vect n Int

-- Simple function definition
double : Int -> Int
double x = x * 2

main : IO ()
main = putStrLn "Hello, World!"
```

## Types

```
-- ---------- TYPE ----------
    -- Int => fixed-precision integers
    -- Integer => arbitrary-precision integers  
    -- Double => double-precision floating point
    -- Char => Unicode characters, enclosed in single quotes
    -- String => strings, enclosed in double quotes
    -- Bool => True, False
    -- Unit => () the unit type
    -- Nat => natural numbers (0, 1, 2, ...)
    -- Type => type of types
    -- Vect n a => vectors of length n containing elements of type a

age : Int
age = 25

name : String  
name = "Alice"

flag : Bool
flag = True

letter : Char
letter = 'x'

nothing : Unit
nothing = ()

count : Nat
count = 3

numbers : Vect 3 Int
numbers =[2][3][1]
```

## Operators

```
-- ---------- OPERATOR ----------

-- ARITHMETIC OPERATORS
    -- + => addition
    -- - => subtraction
    -- * => multiplication
    -- / => division (for Double)
    -- div => integer division
    -- mod => modulo

-- COMPARISON OPERATORS
    -- == => equality
    -- /= => inequality  
    --  = => comparison operators

-- LOGICAL OPERATORS
    -- && => logical and
    -- || => logical or
    -- not => logical negation

-- LIST OPERATORS
    -- :: => cons (prepend to list)
    -- ++ => list concatenation
```

## Control structures

```
-- ---------- CONTROL STRUCTURE ----------

-- CONDITIONALS

-- IF THEN ELSE
result : Int
result = if 5 > 3 then 1 else 0

-- PATTERN MATCHING
    -- pattern matching on constructors and values
    -- case expressions for multi-way branching

listLength : List a -> Nat
listLength [] = 0
listLength (x :: xs) = 1 + listLength xs

describe : Int -> String
describe x = case x of
    0 => "zero"
    1 => "one"  
    n => "many: " ++ show n

-- GUARDS
    -- | => guard syntax for conditional patterns

classify : Int -> String
classify n | n  0 = "positive"

-- LOOPS
    -- functional programming uses recursion instead of loops
    -- higher-order functions like map, filter, fold

-- RECURSION
factorial : Nat -> Nat
factorial Z = 1
factorial (S k) = (S k) * factorial k

-- MAP FILTER FOLD
doubled : List Int
doubled = map (*2)[3][4][1][2]

evens : List Int  
evens = filter even[4][5][6][1][2][3]

sum : List Int -> Int
sum = foldl (+) 0
```

## Data structures

```
-- ---------- DATA STRUCTURE ----------

-- LISTS
    -- List a => homogeneous lists
    -- [] => empty list
    -- :: => cons operator

myList : List Int
myList = [1, 2, 3,4]

-- VECTORS
    -- Vect n a => length-indexed vectors
    -- statically track length in type

myVector : Vect 3 String
myVector = ["a", "b", "c"]

-- MAYBE
    -- Maybe a => optional values
    -- Nothing or Just a

safeDivide : Double -> Double -> Maybe Double
safeDivide x 0 = Nothing
safeDivide x y = Just (x / y)

-- EITHER  
    -- Either a b => sum type for error handling
    -- Left a or Right b

parseNumber : String -> Either String Int
parseNumber s = case cast s of
    Nothing => Left "Not a number"
    Just n => Right n

-- PAIRS
    -- (a, b) => product types

point : (Int, Int)
point = (10, 20)

-- RECORDS
    -- record syntax for product types with named fields

record Person where
    constructor MkPerson
    name : String
    age : Nat

alice : Person
alice = MkPerson "Alice" 30

-- CUSTOM DATA TYPES
    -- data => defines algebraic data types

data Tree a = Leaf a | Node (Tree a) (Tree a)

exampleTree : Tree Int
exampleTree = Node (Leaf 1) (Leaf 2)
```

## Functions

```
-- ---------- FUNCTION ----------
    -- function_name : Type -> Type -> ... -> ReturnType
    -- function_name arg1 arg2 ... = expression
    -- functions are curried by default
    -- partial application is natural

-- SIMPLE FUNCTIONS
add : Int -> Int -> Int
add x y = x + y

square : Int -> Int
square x = x * x

-- HIGHER-ORDER FUNCTIONS
apply : (a -> b) -> a -> b
apply f x = f x

compose : (b -> c) -> (a -> b) -> (a -> c)
compose f g x = f (g x)

-- LAMBDA FUNCTIONS
    -- \arg => expression

increment : Int -> Int
increment = \x => x + 1

-- DEPENDENT FUNCTIONS
    -- functions where types depend on values

replicate : (n : Nat) -> a -> Vect n a
replicate Z x = []
replicate (S k) x = x :: replicate k x

-- PROOFS AS FUNCTIONS
    -- types as propositions, functions as proofs

plusCommutes : (n : Nat) -> (m : Nat) -> n + m = m + n
plusCommutes Z m = Refl
plusCommutes (S k) m = rewrite plusCommutes k m in Refl
```

## More on

* dependent types
* theorem proving
* totality checking
* elaborator reflection
* interfaces
* modules
* effects
* [idris documentation](https://docs.idris-lang.org/)
* [learn idris in y minutes](https://learnxinyminutes.com/docs/idris/)
* [type-driven development with idris](https://www.manning.com/books/type-driven-development-with-idris)
* [idris tutorial](https://docs.idris-lang.org/en/latest/tutorial/index.html)
