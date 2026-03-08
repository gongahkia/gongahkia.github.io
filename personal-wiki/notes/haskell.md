# Haskell

# `Haskell`

Strict statically-typed functional language.

## Comments

```
-- ---------- COMMENT ----------

-- this is a single-line comment

{-
this 
is a 
multi-line
comment
-}
```

## Printing

```
-- ---------- PRINT ----------
    -- putStrLn => prints a string to the stdout and appends a newline to the output
    -- putStr => prints a string to the stdout and does not include a newline
    -- print => prints a value of the Show typeclass to the stdout and appends a newline to the output

main :: IO ()
main = do 
    putStrLn "this watermelon statement includes a newline at the end automatically"
    putStr "this pineapple statement does not include a newline at the end and must be specified explicitly by us\n"
```

## Quickstart

```
-- ---------- QUICKSTART ----------
    -- functional programming language with no side-effects, where everything is an expression that must evaluate to a value, including function definitions
    -- lazy evaluation, where functions will only be evaluated when called 
    -- executable files require a main function to be called, which serves as the entry point for the program allowing for file IO (classified as a side-effect in pure functional languages)

main :: IO ()
main = putStr "fear and hunger truly is a game"
```

## Functions and Definitions

```
-- ---------- FUNCTION ----------
    -- as a functional language, Haskell revolves around functions, which are all expressions that evaluate to a value
    -- function defined with the syntax => {FUNCTION NAME} {FUNCTION PARAMETERS SPACE DELIMITED} = {FUNCTION BODY}
    -- functions called with the syntax => {FUNCTION NAME} {FUNCTION ARGUMENTS SPACE DELIMITED}
    -- function parameter and return type type signatures are optionally declared before function defintion, but encouraged for clear code

max 100 101 -- this evaluates to the Int value 101

doubleMe :: Int -> Int
doubleMe x = x + x

doubleUs :: Int -> Int -> Int
doubleUs x y = x*2 + y*2

-- ---------- DEFINITION ----------
    -- as a functional language, Haskell has no concept of 'variables' and every binding is immutable by default since modification of a value binding entails side-effects and instead, every value can be modified through a function expression which evaluates to a transformed return value
    -- these are called definitions, the equivalent of constant bindings in other languages
    -- where => adds a local definition to an existing definition
    -- let ... in => creates a local binding for expressions within a specified lexical scope
        -- both 'where' and 'let ... in' achieve the same purpose, just that their positional syntax is different when used
        -- note that functions can also be locally defined 
    -- raw definition creates a global binding that can be accessed anywhere in the program

circleArea :: Double -> Double -- a function's type signature

-- this is a function defined with 'where' to create local bindings that can only be accessed within the function circleArea
circleArea r = pi * rsquare
    where pi = 3.1415926 -- pi is a local binding 
          rsquare = r * r -- rsquare is also a local binding 

-- this is the same function if defined with 'let ... in' that can only be accessed within the function circleArea
circleArea r = let pi = 3.1415926 -- pi is a local binding here as well
                   rsquare = r * r -- rsquare here is also a local binding
               in pi * rsquare

-- using 'where' 
circleArea r = pi * square r
    where pi = 3.1415926
          square x = x * x -- square is a function locally defined within circleArea

-- using 'let .. in'
circleArea r = let pi = 3.1415926
                   square x = x * x -- square here is also a local function defined within circleArea
               in pi * square r

conanOBrien = "It's a me, Conan O'Brien!" -- this creates a global binding
```

## Types

```
-- ---------- TYPE ----------
    -- Int => bounded integer number with a minimum and maximum value
    -- Integer => unbounded integer number with no minimum and maximum value
    -- Float => single precision floating point number, 32 bits
    -- Double => double precision floating point number, 64 bits
    -- Bool => True, False
    -- Char => single quotation marks
    -- String => double quotation marks, a string list
    -- Maybe <a> => specifies a special nullable datatype where the value stored within the variable can either be of the specified type declared after the Maybe specifier or Nothing
        -- Nothing => special constant value representing the absence of a value
        -- Just <literal value of a> => special value that takes a parameter, the literal value of the non-null value stored within the Maybe <a> datatype
    -- Either <a> <b> => specifies a datatype that could one of two specified datatypes, referred to with Left and Right
        -- Left <literal value of a> => special value that takes a parameter, the literal value of the left-defined datatype a
        -- Right <literal value of b> => special value that takes a parameter, the literal value of the right-defined datatype b

-- Here's an example of Maybe in use

login :: String -> Maybe String -- type signature of a function that returns the username if login is succesful, and nothing if otherwise
login "f4bulous!" = Just "unicorn73" -- function definition via pattern-matching
login "swordfish" = Just "megahacker"
login _ = Nothing

-- Maybe can also be called on function paramters

perhapsMultiply :: Int -> Maybe Int -> Int -- type signature
perhapsMultiply i Nothing = i -- if empty argument provided
perhapsMultiply i (Just j) = i*j   -- where non-empty argument provided

-- Here's an example of Either in use

readInt :: String -> Either String Int -- type signature
readInt "0" = Right 0
readInt "1" = Right 1
readInt s = Left ("Unsupported string: " ++ s)

-- Either can also be called on function parameters

iWantAString :: Either Int String -> String -- type signature
iWantAString (Right str) = str
iWantAString (Left number) = show number

-- Either allows for flexible definitions of the given datatype within a list as well

lectureParticipants :: [Either String Int]
lectureParticipants = [Left "lecturer was sick", Left "easter vacation", Right 3, Right 10, Right 13, Right 17]

-- TYPE SIGNATURES
    -- functions have their parameter and return type's type signatures explicitly declared before the function definition
    -- :: => means "has the type of"
    -- -> => seperates each parameter type and return type with a syntax very similar to Clojure

removeNonUppercase :: [Char] -> [Char] -- this function removes all uppercase characters
removeNonUppercase st = [ c | c <- st, c `elem` ['A'..'Z']]

addThree :: Int -> Int -> Int -> Int -- this function receives three arguments of type Int and returns a value of type Int
addThree x y z = x + y + z

-- TYPE VARIABLES
    -- used in type signatures for functions that don't have type-specific behaviour and accept arguments of multiple types, Haskell's equivalent of generics in other languages
    -- these functions are called polymorphic functions
    -- type variables are specified with single-character names like 'a' as seen below by convention

head :: [a] -> a -- the type signature of the head function employs a type variable since its behaviour could apply to tuples of Int, Char, Bool, Float or any other type
tail :: [a] -> [a] -- the same logic applies for the type signatures of the tail function, which take in a list of any datatype and return a list of that same datatype
fst :: (a,b) -> a -- similarly, the type signature of the fst function employs a type variables since its behaviour is not type-specific

-- TYPECLASSES
    -- specify behaviour for types by prescribing them within the typeclass, allowing for a degree of meta-programming similar to interfaces in other languages and metatables in Lua
    -- behaviours specified through class constraints which are decalred in () brackets within the function's type signature before the function's parameter and return types
    -- => => seperates class constraints from the function's parameters and return types

(==) :: (Eq a) => a -> a -> Bool -- the equality function's type signature (a -> a) specifies that it receives any two values that are the same type as arguments and returns a Boolean, while the typeclass specifies that the argument's type must be a member of the Eq class (Eq a)
(>) :: (Ord a) => a -> a -> Bool -- the comparison function's type signature (a -> a) specifies that it receives any two values that are the same type as arguments and returns a Boolean, while the typeclass specifies that the argument's type must be a member of the Ord class (Ord a)

-- ADDITIONAL TERMINOLOGY
    -- type parameter => refers to a within the type [a]
    -- parameterized type => refers to data structure types like the list that require a type parameter
    -- polymorphism => where a function can receive many different types of arguments
    -- parametric polymorphism => refers to the use of type variables within functions
```

## Operators

```
-- ---------- OPERATOR ----------

-- ARITHMETIC OPERATORS
    -- + => addition
    -- - => subtraction
    -- * => multiplication
    -- / => division
    -- div => floor divison
    -- mod => modulo operator

-- LOGICAL OPERATORS
    -- && => and
    -- || => or
    -- not => logical not

-- COMPARISON OPERATORS
    -- == => partial equality check for value but not type
    -- /= => partial inequality check for value but not type
    -- > < <= >= are also comparsion operators
```

## Data structures

```
-- ---------- DATA STRUCTURE ----------

-- LIST
    -- ordered sequence of elements of the same type, declared with [] square brackets where elements are comma-delimited 
    -- therefore a String is a type alias for [Char], which means all list operations can also be run on Strings
    -- observe that Haskell lists are implemented as singly-linked lists on the backend
    -- .. => creates an inclusive integer range that is an iterable data structure beginning from the start index and ending at the specified end index

lostNumbers :: [Int] -- type signature
anotherRange :: [Int] -- also a type signature
lostNumbers = [1,2,3,4,5] -- an Int list literal in Haskell
anotherRange = [1..10] -- evaluates to [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

-- LIST OPERATIONS
    -- Haskell is pure and all variables are immutable by default (including lists), so list operations return the value of the modified list and do NOT modify the list itself in memory
    -- ++ => concatenates two lists together, though Haskell has to traverse the entire left list before processing the concatenation
    -- : => inserts a value to the start of the list immediately, much faster than concatenation
    -- !! => extracts a list element by index, the equivalent of [] square bracket indexing in Python
    -- < > == => compares list elements in lexographical order
    -- head => returns the first element of a list
    -- tail => returns everything but the list's head
    -- last => returns the last element of a list
    -- init => returns everything but the list's last element
    -- length => returns the length of the list
    -- null => checks whether a list is empty and returns a Boolean
    -- reverse => returns a reversed copy of a list
    -- take => extracts a specified number of elements from the start of a list
    -- drop => drops a specified number of elements from the start of a list and returns the remaining elements as a sublist
    -- maximum => returns the element of maximum value in a list
    -- minimum => returns the element of minimum value in a list
    -- sum => returns the sum of all elements in a list
    -- product => returns the product of all elements in a list
    -- elem => checks whether a specified element is part of a list and returns a Boolean
    -- further list operations can be found within the module Data.List

yesList = [1,2,3,4,5] ++ [6,7,8,9,10] -- evaluates to the list value [1,2,3,4,5,6,7,8,9,10]
yesGreeting = "hello" ++ " " ++ "uncle" -- evaluates to the String (Char list) value "hello uncle"
observation = 'a':" small cat" -- evaluates to the String (Char list) value "a small cat"
theHero = "Steve Buscemi" !! 6 -- evaluates to the Char value 'B', which has an index of 6 in the String (Char list)
booleanYesOrNo = [3,4,2] > [3,2] -- evaluates to Boolean True
theHead = head [5,4,3,2,1] -- evaluates to the Int value 5
theTail = tail [5,4,3,2,1] -- evaluates to the Int list of [4,3,2,1] 
theLastElement = last [1,2,3,4,5] -- evaluates to the Int value 5
theInit = init [5,4,3,2,1] -- evaluates to the Int list of [5,4,3,2]
theLength = length [1,2,3,4,5] -- evaluates to the Int value 5
theNullCheck = null [] -- evaluates to Boolean True
anotherNullCheck = null [1,2,3] -- evaluates to Boolean False
theReversedList = reverse [5,4,3,2,1] -- evaluates to the Int list of [1,2,3,4,5]
extractedList = take 3 [1,2,3,4,5] -- evaluates to the Int list of [1,2,3]
anotherExtractedList = take 0 [6,6,6] -- evaluates to the empty list of [] since 0 elements were extracted
yetAnotherExtractedList = take 5 [1,2] -- evaluates to the Int list of [1,2] since the entire list was extracted
droppedList = drop 3 [1,2,3,4,5,6,7,8] -- evaluates to the Int list of [4,5,6,7,8]
anotherDroppedList = drop 0 [1,2,3,4] -- evaluates to the Int list of [1,2,3,4] since no values were dropped
yetAnotherDroppedList = drop 100 [1,2,3,4] -- evaluates to the empty list of [] since all the values were dropped
maximumValue = maximum [1,2,3,4,5,83,10] -- evaluates to the Int value of 83
minimumValue = minimum [0,2,200,1,7] -- evaluates to the Int value of 0
sumOfValues = sum [2,3,5,129] -- evaluates to the Int value of 139
productOfValues = product [2,3,10,4] -- evaluates to the Int value of 240
isItPartOfList = 4 `elem` [3,4,5,6] -- evaluates to Boolean True
isItAlsoPartOfList = 10 `elem` [3,4,5,6] -- evaluates to Boolean False

-- we can also combine multiple list operations as seen below

f :: [a] -> [a]
f xs = take 2 xs ++ drop 4 xs -- function that discards the 3rd and fourth element of a list

g :: [a] -> [a]
g xs = tail xs ++ [head xs] -- function that rotates a list by taking the first element and moving it to the back of the list

-- TUPLE
    -- ordered sequence of elements of a fixed size that can store different types
    -- declared with () brackets, elements are comma-delimited

someTuple = (8, 11) -- an Int tuple in Haskell

-- TUPLE OPERATIONS
    -- fst => receives a pair (tuple with two elements) as an argument and returns the first element
    -- snd => receives a pair (tuple with two elements) as an argument and returns the second element
    -- zip => takes two lists and returns a list of pairs comprised of elements of corresponding positions in the input lists

firstElement = fst (1, 2) -- this evaluates to the Int value 1
secondElement = snd (1, 2) -- this evaluates to the Int value 2
list1 = [1, 2, 3]
list2 = ["one", "two", "three"]
zippedList = zip list1 list2 -- this evaluates to the Int tuple list value of [(1, "one"), (2, "two"), (3, "three")]
```

## Control structures

```
-- ---------- CONTROL STRUCTURE ----------

-- CONDITIONALS

-- IF THEN ELSE
    -- else => required in every if statement since every expression (including conditional expressions) must evalaute to a value

doubleSmallNumber :: (Int a, Ord a) => a -> a
doubleSmallNumber x = if x > 100
                      then x 
                      else x*2 

-- PATTERN-MATCHING WITHIN DEFINITION
    -- pattern-matching is most commonly executed on functions within the function definition
    -- a function definition can consist of multiple equations, where each equation is matched in order against the arguments until a suitable one is found
    -- here _ serves the same role as the catch-all operator where it evaluates when all other predicate equations fail to be matched

greet :: String -> String -> String -- type annotation
greet "Finland" name = "Hei, " ++ name -- case 1
greet "Italy"   name = "Ciao, " ++ name -- case 2
greet "England" name = "How do you do, " ++ name -- case 2
greet _ name = "Hello, " ++ name -- default case

-- the logical extension is that pattern-matching can occur on any number of arguments as seen below

login :: String -> String -> String
login "unicorn73" "f4bulous!" = "unicorn73 logged in"
login "unicorn73" _ = "wrong password"
login _ _ = "unknown user"

-- GUARDED DEFINITIONS
    -- provided as an alternative to the cumbersome IF THEN ELSE conditional constructs especially when there are multiple predicate cases
    -- instead, Haskell provides conditional definitions, AKA guarded definitions
    -- these operate similarly to pattern-matching by providing multiple equations that run based on specified predicate case conditions, and are particularly useful in recursive function call definitions
    -- | => pipe operator specifies the predicate case condition to be fulfilled 
    -- = => specifies the relationship between a defined case condition and the arbitrary equation to be run when that case condition is fulfilled
    -- otherwise => acts as the default fall-through case, the equivalent of the _ catch-all operator in match-case constructs in most other programming languages

-- a simple conditional definition
describe :: Int -> String
describe n
    | n == 2 = "Two"
    | even n = "Even"
    | n == 3 = "Three"
    | n > 100 = "Big!!"
    | otherwise = "The number " ++ show n -- default fall-through case

-- recursive function call with conditional definitions
factorial :: Int -> Int
factorial n
    | n < 0 = -1
    | n == 0 = 1
    | otherwise = n * factorial (n-1)

-- guards can even be COMBINED with existing pattern-matching constructs as below
guessAge :: String -> Int -> String
guessAge "Griselda" age
    | age < 47 = "Too low!"
    | age > 47 = "Too high!"
    | otherwise = "Correct!"
guessAge "Hansel" age
    | age < 12 = "Too low!"
    | age > 12 = "Too high!"
    | otherwise = "Correct!"
guessAge name age = "Wrong name!"

-- CASE OF _
    -- Haskell features extremely powerful pattern-matching construct similar to the match case statements in other languages
    -- pattern cases are checked in order from top to bottom so arrangement matters
    -- this effectively enables pattern-matching within expressions as opposed to merely within definitions, as well as pattern-matching against function outputs
    -- _ => wildcard catch-all operator that acts as the equivalent of the default statement in other languages

numberAsString :: Int -> String -- static type declaration of an expression prior to expression initialisation
numberAsString num = case num of
    1 -> "One"
    2 -> "Two"
    3 -> "Three"
    _ -> "Unknown but also the catch-call wildcard operator"

-- LOOPS DON'T EXIST
    -- higher-order functions, recursion and list comprehension are used in place of imperative loop constructs like for or while loops, which Haskell does not have
    -- this is in line with most other functional programming paradigms that Haskell adheres to

-- HIGHER-ORDER FUNCTIONS
    -- map => applies a specified function on each element of an iterable structure and returns the transformed data structure
    -- filter => applies a specified predicate to each element of an iterable structure and returns the data structure with elements that fulfil the predicate
    -- foldl, foldr => reduces a list to a single value by repeatedly applying a specified binary function to each element of the list, the equivalent of reduce in Haskell
    -- zipWith => combines two lists with a specified function
    -- compose => declared with a . period, combines two functions into a new function
    -- flip => receives a function, reverses its first two arguments and returns that new function

squareList :: Int a => [a] -> [a]
squareList xs = map (\x -> x * x) xs -- calling map function

evenNumbers :: Integral a => [a] -> [a]
evenNumbers xs = filter even xs -- calling filter function

sumList :: Int a => [a] -> a
sumList xs = foldl (+) 0 xs -- calling reduce function

addLists :: Int a => [a] -> [a] -> [a]
addLists xs ys = zipWith (+) xs ys -- calling zipWith function

squareAndDouble :: Int a => a -> a
squareAndDouble = (*2) . (^2) -- calling compose function

subtractFrom :: Int a => a -> a -> a
subtractFrom = flip (-) -- calling flip function

-- RECURSION
    -- Haskell function calls are very efficient, so performance is rarely a concern when it comes to recursion
    -- in reality recursion is merely a natural application of Haskell's powerful pattern-matching construct that occurs even in definitions
    -- helper functions are also very useful to declutter and simplify the visible logic of a recursive call, wherein helper functions are named originalFunctionName' which is read as originalFunctionNamePrime by convention
    -- a simple way to think about recursion is always 
        -- 1. FIRST define what the base case of a recursive function call that the call recurses to should be
        -- 2. THEN write out the otherwise case that runs when the base case is not yet called
        -- 3. WORK it out on paper if need be to visualise each iteration of the function call

-- to find the factorial! of a given number, noting the definition of factorial is n! = n * (n-1) * … * 1
factorial :: Int -> Int
factorial 1 = 1 -- base case
factorial n = n * factorial (n-1)

-- to find the sum of squares of all numbers from 1 to the given number, noting the definition of the squared sum is 1^2 + 2^2 + 3^2 + ... + n^2
squareSum :: Int -> Int
squareSum 0 = 0 -- base case
squareSum n = n^2 + squareSum (n-1)

-- to sum the elements of a list
sumList :: Int a => [a] -> a 
sumList [] = 0 -- base case
sumList (x:xs) = x + sumList xs 

-- helper function 
repeatHelper :: Int -> String -> String -> String -- type signature
repeatHelper n str result = if (n==0) 
                            then result
                            else repeatHelper (n-1) str (result++str)

-- helper function that has the same type signature as above but now we use pattern-matching INSTEAD of the if else construct within the function definition
repeatHelper 0 _   result = result -- as long as n == 0, then it does not matter what the string is, this first case will run
repeatHelper n str result = repeatHelper (n-1) str (result++str)

-- actual recursive function call
repeatString :: Int -> String -> String -- type signature
repeatString n str = repeatHelper n str ""

-- LIST COMPREHENSION
    -- given Haskell's mathematical roots, concepts like list comprehension originate from set theory
    -- list comprehension syntax => [{OUTPUT FUNCTION} | {VARIABLE AND INPUT SET}, {PREDICATE}]
        -- output function => function applied on each element
        -- variable => element iterated over within the input set, commas can be used to delimit multiple variables
        -- input set => iterable collection over which the variable iterates over, can be expressed as a range in Haskell, commas can be used to delimit multiple input sets
        -- predicate => specifies conditional check on the variable that limits what values from the input set can have the output function applied to them, the equivalent of a filter in other programming languages, commas can be used to delimit multiple predicates
    -- <- => specifies the relationship between the variable and input set
    -- _ => catch-all operator also acts as a throwaway variable that is not needed later

multiplyByTwo = [x*2 | x <- [1..10]] -- this evaluates to the Int list of [2,4,6,8,10,12,14,16,18,20] using list comprehension
multiplyByTwoWithPredicate = [x*2 | x <- [1..10], x*2 >= 12] -- this evaluates to the Int list of [12,14,16,18,20] using list comprehension when x fulfills the predicate of 2 * x is bigger or equals to 12
applyAnotherPredicate = [x | x <- [50..100], x `mod` 7 == 3]  -- this evaluates to the Int list of [52,59,66,73,80,87,94] using list comprehension where x fulfills the predicate of x mod 7 == 3
applyMultiplePredicates = [x | x <- [10..20], x /= 13, x /= 15, x /= 19] -- commas are used to delimit multiple predicates that specify x cannot be equals to 13, 15, 19
applyMultipleVariableAndInputSets = [x*y | x <- [2,5,10] , y <- [8,10,11], x*y > 50] -- commas are used to delimit multiple variable and inpiut sets to evaluate to a list of all the possible products from a list that are more than 50, which is [55,80,100,110]
removeNonUppercase inputString = [ c | c <- inputString, c `elem` ['A'..'Z']] -- Strings are just Char lists so we can use list comprehension to removes all non-uppercase letters from a string
length` xs = sum [1 | _ <- xs] -- _ catch-all wildcard operator used to signify throwing away that variable, so this function evaluates to the length of the list where every element of the list is replaced with 1 and the value of the Int list is summed up
squareList :: Int a => [a] -> [a] -- note this employs typeclasses for a generic function that does not have type-specific behaviour
squareList xs = [x * x | x <- xs] -- list comprehension can also be used with functions to generate an Int list where each value is its value squared
```

## More on

* shadowing
* tail recursion
* Data.List
* show
* enumeration
* [haskell mooc](https://haskell.mooc.fi/)
* [learn you a haskell for great good](https://learnyouahaskell.com/chapters)
* [a gentle introduction to haskell version 98](https://www.haskell.org/tutorial/)
* [install haskell](https://www.haskell.org/downloads/)
* [haskell.org](https://www.haskell.org/)
* [haskell documentation](https://www.haskell.org/documentation/)
* [learn haskell in y minutes](https://learnxinyminutes.com/docs/haskell/)
* [haskell programming from first principles](https://haskellbook.com/)
* [the haskell school of expression](https://www.cs.yale.edu/homes/hudak/SOE/index.htm)
* [haskell wiki on functional programming](https://wiki.haskell.org/Functional_programming)
* [the fuss about || haskell || scala || f#](https://www.slideshare.net/slideshow/the-fuss/44059475)
* [the quipper language](https://www.mathstat.dal.ca/~selinger/quipper/)
