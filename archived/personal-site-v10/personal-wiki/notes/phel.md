---
category: Tech
---
# Phel

# `Phel`

A dialect of lisp that compiles to PHP 8.0 and up.

## Comments

```
# ---------- COMMENT ----------
    # this is a single-line comment
    # there is no built-in implementation for multi-line comments
```

## Printing

```
# ---------- PRINT ----------
    # print => prints one or more arguments without appending a newline
    # println => prints one or more arguments and appends a newline behind

(print "hello world\n") # prints "hello world" with a newline behind because we specified it
(println "hello world") # prints "hello world" with a newline behind automatically
```

## Bindings and Variables

```
# ---------- BINDINGS -----------
    # let => creates a local binding within the given lexical scope, last value of the let expression is evaluated and returned (otherwise nil is returned), immutable upon definition
    # def => creates a definition, a global binding which associates a value with a global symbol, immutable upon definition
        # (def name meta? value)
        # definition metadata (keyword, string, map) can be attached with augmenter keywords like :private and :doc

(let [x 1
      y 2]
  (+ x y)) # this creates a local variable x of value 1 and y of 2 and evaluates the expression (+ x y) to 3

(let [x 1
      y (+ x 2)]) # this creates a local variable x of value 1 and y of (+ x 2) but evaluates to nil since there is no expression to be returned

(def my-name "phel") # creates a definition
(def sum-of-three (+ 1 2 3)) # creates another definition
(def my-private-definition :private 12) # creates a definition that stores metadata

# ---------- VARIABLE ----------
    # def => assigns a variable name to a variable value
    # var => creates a mutable variable value
    # deref => extracts value from a variable
    # set! => reassign a new value to a variable
    # swap! => update a variable with a new value that uses a function

(def foo (var 10)) # create a variable with value 10 and assign it to the variable name foo
(deref foo) # this extracts the value assigned to the variable name foo and evaluates to 10
(set! foo 20) # this sets the value of the variable name foo to number value 20
(swap! foo + 2) # this sets the value of the variable name foo to + 2 opereation, which evaluates to 12
```

## Types

```
# ---------- TYPE ----------
    # symbol => used for variable names and function names
    # keyword => special symbols prefixed with a :
    # number => integers, floats, binary, octal, hexadecimal
    # string => double quotation marks
    # boolean => true, false (only false and nil evaluate to false)
    # special values => nil, nan (literal constants)

# SYMBOLS

snake_case_symbol # this variable name is a symbol
my-module/my-function # this function name is also a symbol

# KEYWORDS

:range # this is a keyword

# NUMBERS

1337 # this is a number, positive integer
-1337 # this is a number, negative integer
1.234 # this is a number, float
-1.234 # this is a number, negative float
1.2e3 # this is a number, float
7E-10 # this is a number, float
0b10100111001 # this is a number, binary number
-0b10100111001 # this is a number, negative binary number
0x539 # this is a number, hexadecimal number
-0x539 # this is a number, negative hexadecimal number
02471 # this is a number, octal number
-02471 # this is a number, negative octal number

0b101_0011_1001 # binary numbers can use underscores for greater readability
-0x5_39 # hexadecimal numbers can use underscores for greater readability
024_71 # octal numbers can use underscores for greater readability

# STRINGS

"hello world" # this is a string

# BOOLEAN

true # boolean true
false # boolean false

# SPECIAL VALUES

nil # equivalent to null in other languages
nan # undefined unrepresentable values resulting from numeric operations
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # some operators support multiple arguments
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => divison
    # % => modulo
    # ** => exponentiation

(+ 1 2) # this evaluates to 3
(+ 1 2 3 4 5 6 7 8 9) # this evaluates to 45

(- 2 1) # this evaluates to 1
(- 3 2 1) # this evaluates to 0

(* 2) # this evaluates to 2
(* 2 3 4) # this evaluates to 24

(/ 2) # this evaluates to 0.5 (since this evaluates to the reciprocal of 2)
(/ 24 4 2) # this evaluates to 3

(% 10 3) # this evaluates to 1

(** 2 5) # this evaluates to 32

# LOGICAL OPERATORS
    # truthy? => evaluates whether a statement is true or false
    # and
    # or
    # not

# COMPARISON OPERATORS
    # id => stricter complete equality check for type and value, the equivalent of identical object identity in Common Lisp, (keywords and symbols with the same name evaluate to true, vectors maps and sets with the same name evaluate to true only if they point to the same reference)
    # = => looser complete equality check for structural equality in type and value
    # <= < >= > all operate as expected for numeric comparisons, evaluate to a boolean

(id true true) # this evaluates to true
(id true false) # this evaluates to false
(id 5 "5") # this evaluates to false
(id :test :test) # this evaluates to true
(id 'sym 'sym') # this evaluates to true
(id '() '()) # this evaluates to false
(id [] []) # this evaluates to false
(id {} {}) # this evaluates to false

(= true true) # this evaluates to true
(= true false) # this evaluates to false
(= 5 "5") # this evaluates to false
(= 5 5) # this evaluates to true
(= 5 5.0) # this evaluates to false
(= :test :test) # this evaluates to true
(= 'sym 'sym') # this evaluates to true
(= '() '()) # this evaluates to true
(= [] []) # this evaluates to true
(= {} {}) # this evaluates to true
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONAL CHECKS
    # (if test then else)

(if true 10) # this evaluates to 10 since true so truth form is evaluated 
(if false 10) # this evaluates to nil since the else form is evaluated and here there is no else form
(if true (print 1) (print 2)) # this prints 1 but not 2 since (print 2) is the else form
(if nil (print 1) (print 2)) # this prints 2 since nil evaluates to false which hits the else form
(if [] (print 1) (print 2)) # this prints 2 since an empty list evaluates to nil which hits the else form

# CASE 
    # (case test & pairs)
    # case => provides a terse syntax for powerful pair-based pattern-matching with match-case like statements

(case (+ 7 5)
  3 :small
  12 :big) # this evaluates to :big

(case (+ 7 5)
  3 :small
  15 :big) # this evaluates to nil

(case (+ 7 5)) # this evalutes to nil

# COND
    # (cond & pairs)
    # cond => used as an alternative to case in situations where when the first expression evaluates to boolean true, the second expression is evaluated, and if no matches are found, evaluates to nil

(cond
  (neg? 5) :negative
  (pos? 5) :positive)  # this evaluates to :positive

(cond
  (neg? 5) :negative
  (neg? 3) :negative) # this evaluates to nil

(cond) # this evaluates to nil

# LOOPS
    # loop => creates its own internal lexical scope to loop within
        # (loop [bindings] expression)
    # recur => creates a recursive loop
        # (recur expression)
    # foreach => allows for iteration over data structures
        # (foreach [value valueExpression] expression)
        # (foreach [key value valueExpression] expression)
    # for => allows for flexible powerful iteration, augmented with different bindings
        # (for loopHead loopBody)
        # :range => loops over a range
        # :in => loops over values of a collection
        # :keys => loops over keys (indexes) of a collection
        # :pairs => loops over key-value pairs of a collection
        # :while => breaks the loop after the while expression evaluates to false
        # :let => defines additional bindings
        # :when => only evaluates the loop body if the when expression evaluates to true

(loop [sum 0
       cnt 10]
  (if (= cnt 0)
    sum
    (recur (+ cnt sum) (dec cnt)))) # loop expression that utilises recursion

(foreach [v [1 2 3]]
  (print v)) # foreach loop, prints 1, 2 and 3

(for [x :range [0 3]] x) # this evaluates to [0 1 2]

# EXCEPTION HANDLING
    # throw => throws the specified expression
    # try catch finally => operates as you'd expect, similar to try except in Python

(try
  (throw (php/new Exception))
  (catch Exception e "error")
  (finally (print "test"))) # this evaluates to "error" and prints "test"
```

## Data structures

```
# ---------- DATA STRUCTURE -----------
    # list
    # vector
    # map
    # set

# LISTS
    # basically a linked list, a sequence of white space delimited values surrounded by () brackets
    # list => creates a list
    # list functions => cons count get first second next rest 

(do 1 2 3) # this is a list literal
(list 1 2 3 4) # this creates a new list

# VECTORS
    # indexed collection of data, sequence of white space delimited values surrounded by [] square brackets
    # vector => creates a vector
    # vector methods => get first second push put count

[1 2 3] # this is a vector literal
(vector 1 2 3 4) # this creates a new vector

# MAPS
    # unordered sequence of white space delimited key-value pairs surrounded by {} curly braces
    # stores key-value pairs, keys can be of any data type of the syntax => {key1 value1 key2 value2}
    # hash-map => creates a map 
    # map methods => get put unset count

{(1 2 3) (4 5 6)} # this is a map literal where the key is (1 2 3) and (4 5 6) is the value
(hash-map (1 2) (3 4)) # this creates a new map

# SETS
    # unordered sequence of white space delimited values that you can call set operations on, declared with set and surrounded by () brackets
    # set => creates a set
    # set methods => push unset count union intersection difference symmetric-difference

(set 1 2 3) # this is a set
```

## Functions

```
# ---------- FUNCTION ----------

# GLOBAL FUNCTIONS
    # defn => create a named global function
        # (defn functionName [parameters] expression)
        # docstring and attributes can be optionally added within the global function defintion 
    # apply => calls a named function on space delimited arguments within a list
        # (apply functionName arguments)

(defn my-add-function [a b]
  (+ a b)) # this creates a global function called my-add-function that returns the sum of 2 arguments

(defn my-private-add-function
  "adds value a and b"
  {:private true}
  [a b]
  (+ a b)) # global functions can be augmented with docstrings and attributes, often specified after the function name

(apply + [1 2 3]) # this evaluates to 6
(apply my-add-function [1 2]) # this evaluates to 3

# ANONYMOUS FUNCTIONS
    # fn => defines an anonymous function within its own lexical scope, last expression of function implicitly returned
        # (fn [parameters] expression)
        # & => used to specify an infinite number of arguments to be received

(fn [] 1 2 3) # this function just returns 3 since it returns the last expression of the function, the number value 3
(fn [a b] (+ a b)) # this function returns the sum of parameters a and b
(fn [& args] (count args)) # this function takes in an indeterminate number of parameters and returns a count of the number of arguments
```

## More on

* struct
* transient
* :reference
* destructuring
* macros
* namespaces
* interfaces
* [web programming](https://phel-lang.org/documentation/http-request-and-response/)
* [installing phel](https://phel-lang.org/documentation/getting-started/)
* [phel documentation](https://phel-lang.org/)
