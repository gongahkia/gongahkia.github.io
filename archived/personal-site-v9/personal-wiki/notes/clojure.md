---
category: Tech
---
# Clojure

# `Clojure`

A Lisp dialect with a stronger emphasis on functional programming than Common Lisp.

## Comments

```
; ---------- COMMENT -----------
    ; single-line comments begin with a semicolon
    ; there is no built-in implementation for multi-line comments
```

## Printing

```
; ---------- PRINT ----------
    ; println => prints strings to stdout and appends a newline to the output
    ; prn => prints a more readable representation of data structures to the stdout and appends a newline to the output

(println "Hello world!") ; prints "Hello world!" to the console with a newline
(prn {:cereal-chicken 2.50 :thai-fish 3.00 :egg 1.25}) ; prints the array map in a human-readable format to the console with a newline
```

## Quickstart

```
; ----------- QUICKSTART -----------
    ; clojure is comprised of forms (list of whitespace delimited things surrounded by () parantheses, similar to expressions)
    ; clojure assumes the first thing is a function or macro call, and the remaining things are arguments
    ; clojure types are immutable, so remember to reassign returned values (functional programming!)
    ; ns => first call in a clojure file to set the namespace

(ns parklane-cai-fan) ; sets everything in the file to be within the parklane-cai-fan namespace
```

## Variables

```
; --------- VARIABLE ----------
    ; def => creates a global variable and assigns a corresponding value
    ; let => creates a local variable lexically scoped to the current scope of () brackets and assigns a corresponding value, and has an implicit return of the last expression

(def an-int 1) ; global-binding of a variable (global variable)
(def a-float 2.2) ; global-binding of a variable (global variable)
(def a-string "cereal chicken") ; global-binding of a variable (global variable)
(def a-bool true) ; global-binding of a variable (global variable)

(let [a 1 b 2]
  (> a b)) ; this creates local bindings, then evaluates to false from the last expression
```

## Types

```
; ---------- TYPE -----------
    ; integer 
    ; float => floating point numbers
    ; string => double quotation marks
    ; boolean => true, false
    ; nil => special value to represent the absence of data
    ; keyword => strings with efficiency bonuses, declared with : colon in front of keyword

1 ; integer
1.23 ; float
"watermelon" ; string
false ; boolean
nil ; special value nil
:a ; keyword

; USEFUL TYPE FUNCTIONS
    ; quote => prevents literal data from being evaluated, has a shorthand '
    ; ' => prevents literal data from being evaluated, the shorthand for quote
    ; eval => evaluates a literal list

(quote (+ 1 2)) ; this literal list of data won't be evaluated and will evaluate to value of (+ 1 2)
'(+ 1 2) ; this literal list of data won't be evaluated, evaluates to value of (+ 1 2)
(eval '(+ 3 4)) ; this forces an evaluation on a quoted list, thus evaluating this to the value of 7
```

## Operators

```
; ---------- OPERATOR ----------

; ARITHMETIC OPERATORS
    ; + => addition
    ; - => subtraction
    ; * => multiplication
    ; / => division
    ; mod => modulo

; LOGICAL OPERATORS
    ; and
    ; or
    ; not

; COMPARISON OPERATORS
    ; = => partial equality check for value
    ; not= => partial inequality check for value
    ; == => complete equality check for type and value
    ; not== => complete inequality check for type and value
    ; < > <= >= for other comparison checks

(+ 1 1) ; evaluates to 2
(- 2 1) ; evaluates to 1
(* 1 2) ; evaluates to 2
(/ 2 1) ; evaluates to 2
(mod 5 2) ; evaluates to 1

(not true) ; evaluates to false
(false and true) ; evaluates to false
(false or true) ; evaluates to true

(= 1 1) ; evaluates to true
(= 2 1) ; evaluates to false
(= 1 "1") ; evaluates to true
(== 1 "1") ; evaluates to false
```

## Control structures

```
; ---------- CONTROL STRUCTURE ----------

; CONDITIONAL CHECKS
    ; if => operates as you'd expect, called as a function like everything else in clojure
        ; general syntax is (if {CONDITIONAL CHECK} {THEN EXPRESSION} {ELSE EXPRESSION})
    ; cond => evaluates each specified predicate in order and evaluates to the value of the first true condition, equivalent to an if elseif else chain in other languages
        ; :else => added as the final else case in a cond chain
    ; case => equivalent to match-case chain in other languages
        ; :else => added as the final default case in a case chain

(def x 10)
(if (> x 5)
  "Greater than 5"
  "Less than or equal to 5") ; this evaluates to "Greater than 5"

(def y 10)
(cond
  (> y 15) "Greater than 15"
  (> y 10) "Greater than 10"
  :else "10 or less") ; this evaluates to "10 or less"

(def day-of-week 3)
(case day-of-week
  1 "Sunday"
  2 "Monday"
  3 "Tuesday"
  :else "Unknown day") ; this evaluates to "Tuesday"

; LOOPS
    ; for most iterative solutions, clojure's functional programming constructs are encouraged instead of loops (map, reduce, filter)
    ; loop => creates and defines the lexical scope of a loop, used alongside recur
    ; recur => indicates to initiate another iteration of the current loop with recursion
    ; doseq => creates a loop that iterates over a specified structure, achieved without explicit recursion

(defn countdown-recur [n]
  (loop [i n]
    (if (<= i 0)
      "Blast off!"
      (do
        (println i)
        (recur (dec i)))))) ; function definition for a function that contains a recursive loop which counts down from n to 0, then prints blast off, here recur is used to decrement i by 1 and initiate another iteration of the loop

(defn countdown-iter [n]
  (doseq [i (range n 0 -1)]
    (println i))
  (println "Blast off!")) ; function defintion for a function that achieves the same thing as the above function, but does it using doseq to create a loop that does not rely on explicit recursion but instead iterates over a vector created using the range function
```

## Data structures

```
; ---------- DATA STRUCTURE -----------
    ; collection => groups of data (lists, vectors)
    ; sequence => abstract descriptions of lists of data (lists)

; LIST
    ; linked-list data structure
    ; declared with () brackets, must be quoted as a literal with ' to prevent clojure from thinking its a function
    ; list => creates a list literal, an alternative to declaring a list literal with '
    ; range => creates a list of range 0 to a specified length, no specification results in an infinite series
    ; take => retrieve a slice of a list based on length from the front
    ; cons => insert an item to the start of a list
    ; conj => inserts an item to the start of a list (the most efficient method of insertion for a list)
    ; concat => concatenates collections (both lists and vectors) together and returns them as a list
    ; map => apply a specified function on every item within the list
    ; filter => apply a specified function on every item within the list and keep those that meet the specified function predicate
    ; reduce => aggregate multiple items within a list to a single result by applying the specified function to each item and accumulating the result, can take an initial argument value also

(list 1 2 3) ; creates a list literal of value (1 2 3), the equivalent of '(1 2 3)
(range) ; creates an infinite series of value (0 1 2 3 4 ...)
(range 4) ; creates a list of value (0 1 2 3) with length 4
(take 4 (range)) ; retrieves a slice of length 4 from an infinite list, evaluating to (0 1 2 3)
(cons 4 '(1 2 3)) ; this evaluates to (4 1 2 3)
(conj '(1 2 3) 4) ; this evaluates to (4 1 2 3) also by inserting the element at the start of the list
(concat '(1 2) '(3 4)) ; this evaluates to (1 2 3 4)
(concat [1 2] '(3 4)) ; this also evaluates to (1 2 3 4)
(map inc '(1 2 3)) ; this evaluates to (2 3 4)
(filter even? '(1 2 3)) ; this evaluates to (2)
(reduce + '(1 2 3 4)) ; this evaluates to 10
(reduce conj [] '(3 2 1)) ; this evaluates to [3 2 1]

; VECTOR
    ; array-backed vector
    ; declared with [] square brackets
    ; cons => insert an item to the start of a vector
    ; conj => appends an item to the end of a vector (the most efficient method of insertion for a vector)
    ; concat => concatenates collections (both lists and vectors) together and returns them as a list
    ; map => apply a specified function on every item within the vector
    ; filter => apply a specified function on every item within the vector and keep those that meet the specified function predicate
    ; reduce => aggregate multiple items within a vector to a single result by applying the specified function to each item and accumulating the result, can take an initial argument value also

[1 2 3] ; creates a vector literal of value [1 2 3]
(cons 4 [1 2 3]) ; this evaluates to (4 1 2 3)
(conj [1 2 3] 4) ; this evaluates to [1 2 3 4] by appending the element to the end of the vector
(concat [1 2] [3 4]) ; this evaluates to (1 2 3 4)
(concat [1 2] '(3 4)) ; this also evaluates to (1 2 3 4)
(map inc [1 2 3]) ; this evaluates to (2 3 4)
(filter even? [1 2 3]) ; this evaluates to (2)
(reduce + [1 2 3 4]) ; this evaluates to 10
(reduce conj [] [3 2 1]) ; this evaluates to [3 2 1]

; ARRAY MAP
    ; declared with {} curly braces
    ; assoc => adds new key-value pairs to an array map and returns the new array map
    ; dissoc => removes key-value pairs from an array map and returns the new array map
    ; retains key-value pair order, slower lookups than hash maps
    ; keys can be any hashable type, but keywords are used as keys by convention
    ; array maps are automatically converted to hash maps when their size gets big enough
    ; retrieve a value from its key by calling the array map as a function, retrieving an absent key returns nil

{:a 1 :b 2 :c 3} ; an array map literal
(def watermelon-array-map {"a" 4 "cd" 10 "ef" 100}) ; creates an array map and assigns it to a variable
(watermelon-array-map "cd") ; evaluates to the integer value 10
(def new-watermelon-array-map (assoc watermelon-array-map "watermelon-pie" 2000)) ; adds a new key-value pair to watermelon-array-map, then assigns the new array map value to the variable new-watermelon-array-map since clojure types are immutable
(def edited-watermelon-array-map (dissoc new-watermelon-array-map "a" "cd")) ; removes the key-value pairs of key "a" and "cd" from the new-watermelon-array-map and returns the new array map, then assigns that value to the variable edited-watermelon-array-map since clojure types are immutable

; HASH MAP
    ; hash-map => creates a hash map literal
    ; assoc => adds new key-value pairs to a hash map and returns the new hash map
    ; dissoc => removes key-value pairs from a hash map and returns the new hash map
    ; does not retain key-value pair order, faster lookups than array maps
    ; keys can be any hashable type, but keywords are used as keys by convention
    ; retrieve a value from its key by calling the hash map as a function, retrieving an absent key returns nil

(hash-map :a 1 :b 2 :c 4) ; a hash map literal
(def apple-hash-map (hash-map :z 100.00 :in 6 :kl 2)) ; creates a hash map and assigns it to a variable
(apple-hash-map :z) ; evaluates to the float value of 100.00
(def new-apple-hash-map (assoc apple-hash-map :apple-pie 10)) ; adds a new key-value pair to apple-hash-map, then assigns the new hash map value to the variable new-apple-hash-map since clojure types are immutable
(def edited-apple-hash-map (dissoc new-apple-hash-map :z :kl)) ; removes the key-value pairs of key :z and :kl from new-apple-hash-map and returns the new hash map, then assigns that value to the variable edited-apple-hash-map since clojure types are immutable

; SET
    ; declared with #{} 
    ; set => creates a set, alongside [] square brackets
    ; conj => appends a specified member to the set
    ; disj => removes a member from a set by value
    ; test for set members by calling the set as a function
    ; similar to sets in other languages, with a range of functions for operation (see clojure.sets namespace)

#{1 2 3} ; creates a set literal
(set [1 2 3 4]) ; also creates a set literal which evaluates to the value #{1 2 3 4}
(conj #{1 2 3} 4) ; this evaluates to #{1 2 3 4}
(disj #{1 2 3} 1) ; this evaluates to #{2 3}
(#{1 2 3} 1) ; this evaluates to 1, which evaluates to boolean true
(#{1 2 3} 4) ; this evaluates to nil, which evaluates to boolean false
```

## Functions

```
; ---------- FUNCTION -----------
    ; functions have implicit return on their last statement
    ; functions can take multiple kinds of arguments and evaluate differently, just specify them with separate [] square brackets and () brackets
    ; fn => creates a new anonymous function, where [] square brackets list function arguments
        ; anonymous functions are called with (()) double brackets
    ; def => assigns an anonymous function to a variable to create a named function
    ; defn => creates a named function, where [] square brackets list function arguments
    ; & => recieves extra arguments and packs them in a list, can be mixed with normal arguments

; ANONYMOUS FUNCTIONS

(fn [] "Hello World") ; evaluates to fn 
((fn [] "Shit ass")) ; calls the anonymous function, evaluating to the string "Shit ass"
(def hello-world-ass (fn [] "Hello World Ass")) ; creates the anonymous function which returns the string "Hello World Ass" then assigns it to the variable hello-world-ass to make it a named function
(hello-world-ass) ; this calls the named function, evaluating to the string "Hello World Ass"

; NAMED FUNCTIONS

(defn watermelon [] "watermelon") ; creates a named function watermelon which evaluates to the string value "watermelon"
(watermelon) ; calls the specified function, evaluating to the string value "watermelon"

(defn hello [name]
  (str "Hello " name)) ; another function definition
(hello "Steve") ; calls the specified function, evaluating to string value "Hello Steve"

; MULTI-VARIADIC FUNCTIONS

(defn hello-flexible
  ([] "Hello World")
  ([name] (str "Hello " name))) ; a multi-variadic function definition that can take different arguments and evaluates differently based on arguments provided
(hello-flexible "Jake") ; this will evaluate to "Hello Jake"
(hello-flexible) ; this will evaluate "Hello World"

; VARIABLE NUMBER OF FUNCTION ARGUMENTS

(defn count-args [& achoo]
  (str "You passed " (count achoo) " arguments: " achoo)) ; function definition for a function that accepts multiple arguments under the argument name achoo
(count-args 1 2 3) ; this evaluates to the string value of "You passed 3 args: (1 2 3)"

(defn hello-count [name & orange]
  (str "Hello " name ", you passed " (count orange) " extra arguments")) ; function definition for a function that mixes a variable number of arguments with other named arguments
(hello-count "Finn" 1 2 3) ; this evaluates to the string value of "Hello Finn, you passed 3 extra args"
```

## Modules

```
; ----------- MODULE -----------
    ; use => brings all functions from the specified module into the current global scope, does not requires namespace qualification
    ; require => imports a module and its functions but requires namespace qualification when calling module functions
    ; ns => namespaces can be used to require a module as well, doing so means we don't need to quote the module 

(use 'clojure.set) ; brings all set functions within the global scope
(intersection #{1 2 3} #{2 3 4}) ; we can now call set functions, this evaluates to #{2 3}

(require 'clojure.string) ; imports the clojure string module within the global scope but namespace qualfiication required when calling string functions
(clojure.string/blank? "") ; we can now call string functions but must reference the clojure.string namespace, this evaluates to true

(ns test
  (:require
    [clojure.string :as str]
    [clojure.set :as set])) ; this has the same effect as above and gives the modules shorter names, note there is no need to quote ' the module here
```

## More on

* ->
* ->>
* as->
* [clojure STM](https://clojure.org/reference/refs)
* [clojure java standard library](https://clojure.org/reference/libs)
* [learn clojure macros in y minutes](https://learnxinyminutes.com/docs/clojure-macros/)
* [clojure exercises](https://4clojure.oxal.org/)
* [clojure quick reference](https://clojuredocs.org/quickref)
* [learn clojure in y minutes](https://learnxinyminutes.com/docs/clojure/)
* [clojure documentation](https://clojure-doc.org/)
