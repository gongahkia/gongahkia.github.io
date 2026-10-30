---
category: Tech
---
# Scheme

# `Scheme`

Baby's first Lisp dialect.

## Comments

```
; ----- COMMENT -----

; this is a single-line comment

#|
this is a 
multi-line 
comment a.k.a 
a block comment
|#
```

## Printing

```
; ----- PRINT -----
    ; (display) => receives a string argument which is then displayed to the stdout, this does not include a newline by default
    ; (write) => receives a string argument which is then displayed to the stdout and includes the quotation marks around the string
    ; (newline) => displays a newline to the stdout

(display "this does not have a newline and if required must have its inclusion explicitly specified like here\n")
(write "when this is printed, it will show the two double quotation marks surrounding this string")
(newline)
```

## Quickstart

```
; ----- QUICKSTART -----
    ; minimalist, lexically scoped Lisp dialect with small core of powerful features
    ; functional language with first-class procedures and support for recursive algorithms
    ; emphasizes simple and consistent syntax with a focus on expressions rather than statements
    ; commonly used for educational purposes, language research, and writing interpreters and compilers
    ; define => creates variable bindings and used in function defintions

(define x 10) ; creates the variable binding assigning the number value 10 to the variable x

(define (square x) ; defines the named function square that receives a single number argument and multiplies it against itself
    (* x x))
```

## Types

```
; ----- TYPE -----
    ; Number => covers the following number types
        ; integer
        ; rational number
        ; real number (floating-point number)
        ; complex number
    ; Boolean => #t, #f
    ; Character => declared with #\ to prefix the character
    ; String => declared within "" double quotation marks
    ; Symbol => declared with ' 

(define int 42)
(define rational 3/4)
(define real 3.14)
(define complex 3+4i)
(define truthy #t)
(define falsey #f)
(define char #\a)
(define newlineCharacter #\newline)
(define str "hello, world!")
(define sym 'foo)
```

## Operators

```
; ----- OPERATOR-----

; --- ARITHMETIC OPERATORS ----

(+) ; addition
(-) ; subtraction
(*) ; multiplication
(/) ; division
(modulo) ; modulo operator

; --- COMPARISON OPERATORS ----

(=) ; equality operator
(>) ; comparison operator
(<) ; comparison operator
(>=) ; comparison operator
(<=) ; comparison operator

; --- LOGICAL OPERATORS ---

(and) ; Logical AND
(or) ; Logical OR
(not) ; Logical NOT
```

## Control structures

```
; ----- CONTROL STRUCTURE -----

; --- CONDITIONALS ---

; IF 
    ; the equivalent of a if else conditional constructs in other programming languages

(if (> 5 3)
    (display "True branch")
    (display "False branch"))

; COND
    ; the equivalent of if else if else conditional constructs in other programming languages
    ; affords more than the two conditions allowed within the basic IF predicate construct covered above
    ; else => specifies the final else case that runs if none of the other specified predicate conditions are met

(cond
    ((= x 1) (display "x is 1"))
    ((= x 2) (display "x is 2"))
    (else (display "x is something else")))

; CASE 
    ; the equivalent of match case statements in most other programming languages
    ; provides a degree of pattern-matching within Scheme, similar to Rust 
    ; else => specifies the fall-through case that executes when all other predicate case conditions fail to be met, similar to _ in Rust and other functional languages

(case (+ 2 2)
    ((2 3) (display "2 or 3"))
    ((4 5 6) (display "4, 5, or 6"))
    (else (display "something else")))

; --- LOOPS ---
    ; Scheme does not feature conventional for or while loop constructs as in most other programming languages
    ; this inherits from hallmarks of the functional programming paradigm

; RECURSION
    ; instead, recursion allows for the equivalent iteration and traversal over iterable data structures
    ; below is the definition of a recursive function

(define (factorial n) ; recursive function definition
    (if (= n 0)
        1
        (* n (factorial (- n 1)))))

(factorial 5) ; this returns 120
```

## Data structures

```
; ----- DATA STRUCTURE -----
    ; List => ordered collection of elements, typically of the same type, but can contain elements of different types, note that lists are linked and mutable, commonly used in functional programming
    ; Pair => fundamental building block of lists, representing a cons cell with two elements: `car` (first) and `cdr` (rest), note that pairs are mutable
    ; Vector => mutable, fixed-size indexed collection of elements, offering efficient random access, note that elements can be of different types
    ; Hashtable => collection of key-value pairs with unique keys, providing efficient lookup, insertion, and deletion operations, note that keys and values can be of any type
    ; Record => custom data structure with named fields, similar to structs in other languages, allowing the grouping of related data under a single identifier

(define exampleList '(1 2 3 4 5))
(car exampleList)
(cdr exampleList) 
(cons 0 exampleList) 

(define examplePair (cons 1 2))
(car examplePair) 
(cdr examplePair) 

(define exampleVec (vector 1 2 3 4))
(vector-ref exampleVec 2)

(define exampleHashtable (make-hashtable))

(define-record-type point
    (make-point x y)
    point?
    (x point-x)
    (y point-y))
```

## Functions

```
; ----- FUNCTION -----
    ; (define (<function_name> <function_parameter(s)>) <function_body>) => defines a named function
    ; (lambda (<function_parameter(s)>) <function_body>) => defines an anonymous function, which can be passed around or assigned to a variable

(define (square x) ; named function definition
  (* x x))

(define (map f lst) ; we can also define higher-order functions common in other functional languages
  (if (null? lst)
      '()
      (cons (f (car lst)) (map f (cdr lst)))))

(lambda (x) (* x x)) ; anonymous function definition
```

## More on

* [scheme.org](https://www.scheme.org/)
* [Scheme Documentation](https://docs.scheme.org/)
* [A Complete Environment for Learning Scheme](https://jaredkrinke.github.io/learn-scheme/)
* [Comparison of Scheme and Common Lisp](https://docs.scheme.org/guide/common-lisp/)
* [Why is Scheme my first language in university?](https://softwareengineering.stackexchange.com/questions/115252/why-is-scheme-my-first-language-in-university)
* [What are the actual differences between Scheme and Common Lisp?](https://stackoverflow.com/questions/5368090/what-are-the-actual-differences-between-scheme-and-common-lisp-or-any-other-tw)
* [Benefits of learning scheme?](https://stackoverflow.com/questions/98641/benefits-of-learning-scheme)
* [Introduction to Scheme Programming](https://youtu.be/6k78c8EctXI?si=eHNUfCLjGkpHhkZM) by BP Learning
* [Why Learn Scheme](https://irreal.org/blog/?p=10339) by Irreal
* [racket-lang.org](https://racket-lang.org/books.html)
* [Racket Documentation](https://docs.racket-lang.org/)
* [CS3540: Programming Languages and Paradigms](https://www.cs.uni.edu/~wallingf/teaching/cs3540/resources.html) by Eugene Wallingford
