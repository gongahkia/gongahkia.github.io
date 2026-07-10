---
category: Tech
---
# Lisp

# `Lisp`

The programmable programming language.

## Quickstart

```
;;; ----------- QUICKSTART ----------
    ; everything in Common Lisp is comprised of atoms or s-expressions
    ; functional expression-based programming language, so all expressions evaluate to a value
    ; mutation and side-effects are avoided as far as possible, where possible, rely on function returns to return a copy of data instead of modifying existing data

;; ATOM
    ; symbols or numbers
        ; symbol => general concept representing a name or identifier (variable names, function names, entity names)
        ; number => integer, floating-point

;; S-EXPRESSION
    ; function or operator and its arguments enclosed in () parantheses
    ; arguments can be atoms or lists
        ; list => collection of s-expressions enclosed in () parentheses, that contain atoms or other lists
```

## Comments

```
;;; ----------- COMMENT ----------

;; SINGLE-LINE COMMENTS
    ; 4 semicolons for file-level comments
    ; 3 semicolons for section-level descriptions
    ; 2 semicolons for definitions within code
    ; 1 semicolon for definitions outside code

;; MULTI-LINE COMMENTS
    ;; delimited by #| and |#
```

## Printing

```
;;; ---------- PRINTING ----------
    ; format => prints formatted text to stdout, t is included for true
    ; print => prints text to stdout as a string literal with "" double quotation marks
    ; princ => prints text to stdout without double quotation marks

(format t "Hello, World!") ; prints "Hello, World!" to the stdout
(print "Hello") ; prints "Hello" to the stdout
(princ "Hello") ; prints Hello to the stdout
```

## Variables and Constants

```
;;; ---------- VARIABLE ----------
    ; a variable is an instance of a symbol that is associated with a value stored in memory (value assignment for a variable)
    ; let => creates a local variable within the given () lexical scope, and returns the last value specified in the let scope
    ; defvar => creates a global variable whose value does not change upon re-evaluation, global variable names are ** (earmuff) asterisk delimited
    ; defparameter => creates a global variable whose value does change upon re-evaluation, global variable names are ** (earmuff) asterisk delimited

(let ((me "dance with you")) me) ; creates the local variable me and assigns the string value of "dance with you" to it, then evaluates to "dance with you"

(defparameter *a_var* 5) ; assigns the global variable *a_var* the number value of 5
*a_var* ; evaluates to 5

;;; ---------- CONSTANT ----------
    ; a constant stores a piece of immutable data
    ; defconstant => creates a constant

(defconstant PI 3.141592) ; creates the constant PI which stores the number value of 3.141592, the value is immutable and cannot be changed
```

## Types

```
;;; ---------- TYPE -----------

;; PRIMITIVE DATATYPE
    ; all these below values can be assigned to variables
    ; symbol => uppercased automatically upon evaluation
        ; intern => intern operator creates a symbol from a string
    ; number => integer, binary, octal, hexadecimal, single, double, ratio, complex numbers
        ; quote / ' => quote operator creates literal data without evaluating it (it has the ' shorthand)
    ; boolean => any non-nil value is t (true) including expressions, nil (false) and () empty list evaluates to nil
    ; char => char literals declared with #\
    ; string => fixed-length char array, declared with "" double quotation marks

'foo ; evaluates to FOO, symbol literal
(intern "abc") ; create the symbol |abc| from a string
(intern "EFG") ; create the symbol EFG from a string

9999 ; number integer
#b111 ; number binary
#o111 ; number octal
#x111 ; number hexadecimal
3.14159s0 ; number single
3.14159d0 ; number double
1/2 ; number ratio
#C(1 2) ; complex number

(quote (+ 1 2)) ; quote creates literal data, and does not evaluate this function (+ 1 2)
'(+ 1 2) ; ' is the shorthand for quote, and it does the same thing, creating a literal data

t ; evaluates to t (true)
nil ; evaluates to nil (false)
() ; evaluates to nil (false)

#\A ; char literal 

"Hello, world!" ; string
```

## Operators

```
;;; ---------- OPERATOR -----------

;; ARITHMETIC OPERATORS
    ; + => addition
    ; - => subtraction
    ; * => multiplication
    ; / => division
    ; expt => exponentiation
    ; mod => modulo
    ; #C => creates a complex number

(+ 1 1) ; evaluates to 2
(- 8 1) ; evaluates to 7
(* 10 2) ; evaluates to 20
(expt 2 3) ; evaluates to 8
(mod 5 2) ; evaluates to 1
(/ 35 5) ; evaluates to 7
(/ 1 3) ; evaluates to 1/3
(+ #C(1 2) #C(6 -4)) ; evaluates to #C(7 -2)

;; COMPARISON OPERATORS
    ; = => complete equality check for numbers
    ; /= => complete inequality check for numbers
    ; < > <= >= are also comparison operators for numbers
    ; equal => complete equality check for structure (value) for lists, strings, bit-vectors
    ; eql => stricter than equal, complete equality check for object identity (whether two arguments refer to the same object in memory)

(= 3 3.0) ; evaluates to t
(= 2 1) ; evaluates to nil
(/= 2 1) ; evaluates to t
(< 1 2) ; evalutes to t
(> 3 1) ; evaluates to t
(<= 1 1) ; evaluates to t
(>= 2 1) ; evaluates to t

(equal (list 3) (list 3)) ; this evaluates to t since equal checks for structural equality and compares the value of the contents of the lists instead of their place in memory
(equal (list 'a 'b) (list 'b 'a)) ; evaluates to nil

(eql 3 3) ; evaluates to t
(eql 3 3.0) ; evaluates to nil
(eql (list 3) (list 3)) ; this evaluates to nil since not same object in memory despite having structural equality

;; LOGICAL OPERATORS
    ; and 
    ; or
    ; not

(and t t) ; evaluates to t
(and t nil) ; evaluates to nil
(or t nil) ; evaluates to t
(or nil nil) ; evaluates to nil
(not t) ; evaluates to nil
(not nil) ; evaluates to t
```

## Control structures

```
;;; ---------- CONTROL STRUCTURE ----------

;; CONDITIONALS
    ; as established previously, only nil is false (and () empty list which evaluates to nil), everything else is true (t)
    ; conditional syntax => (if {TEST EXPRESSION} {IF TEST EXPRESSION TRUE} {ELSE EXPRESSION})
    ; cond => chains a series of conditional checks to arrive at a final result
    ; typecase => switch case statement but for type of value

(if t 
    "this is true" 
    "this is false") ; evaluates to "this is true"

(member 'Groucho '(Harpo Groucho Zeppo)) ; evaluates to '(GROUCHO ZEPPO)
(if (member 'Groucho '(Harpo Groucho Zeppo)) 
    'yep 
    'nope) ; evaluates to 'YEP since all non-nil values including '(GROUCHO ZEPPO) are t

(cond ((> 2 2) (error "wrong!")) 
      ((< 2 2) (error "wrong again!")) 
      (t 'ok)) ; evaluates to 'OK symbol since the first 2 checks were incorrect

(typecase 1 
    (string :string) 
    (integer :int)) ; evaluates to :int since 1 is of type integer

;; LOOPS
    ; loop => creates a loop iteratively that can be augmented with different keywords (:for :from :to :then :finally :across :collect)
    ; there is no while loop implementation by default

;; ITERATION

(defun fact (n)
  (loop :for result = 1 :then (* result i)
     :for i :from 2 :to n
     :finally (return result)))

(fact 5) ; evaluates to 120

(loop :for x :across "abcd" :collect x) ; evaluates to (#\a #\b #\c #\d)

(dolist (i '(1 2 3 4))
  (format t "~A" i)) ; evaluates to 1234

;; RECURSION
    ; recursion allows us to achieve the same effect as an iterative loop without actually using a loop

(defun fact (n)
  (if (< n 2)
      1
    (* n (fact(- n 1))))) ; function defintion for a recursive function

(fact 5) ; similarly evaluates to 120
```

## Data structures

```
;;; ---------- DATA STRUCTURE -----------

;; STRUCT
    ; defstruct => creates a struct
    ; defparameter => used to assign struct field values

(defstruct dog name breed age) ; defining dog struct
(defparameter *rover* 
    (make-dog : name "rover"
              : breed "collie"
              : age 5)) ; assigning struct field values

*rover* ; evaluates to #S(DOG :NAME "rover" :BREED "collie" :AGE 5)
(dog-name *rover*) ; evaluates to "rover"

;; PAIR
    ; cons => creates a pair
    ; car => returns the head of a pair
    ; cdr => returns the tail of a pair

(cons 'SUBJECT 'VERB) ; evaluates to '(SUBJECT . VERB)
(car (cons 'SUBJECT 'VERB)) ; evaluates to SUBJECT
(cdr (cons 'SUBJECT 'VERB)) ; evaluates to VERB

;; LIST
    ; every list is a linked-list comprised of cons pairs, the final element ending in a nil or '() to mark the end of the list
    ; list => convenient constructor to create a list 
    ; append => join two lists
    ; concatenate => join two lists when used alongside 'list
    ; mapcar => equivalent of .map
    ; remove-if-not => equivalent of .reduce
    ; every => checks if every list element fulfills a predicate
    ; some => checks if at least one list element fulfills a predicate
    ; butlast => returns a list but removes the last element

(cons 1 (cons 2 (cons 3 nil))) ; evaluates to '(1 2 3)
(list 1 2 3) ; evaluates to '(1 2 3)

(cons 4 '(1 2 3)) ; this syntax therefore is the equivalent of inserting an element at the front of a list, and evaluates to '(4 1 2 3)
(append '(1 2) '(3 4)) ; evaluates to '(1 2 3 4)
(concatenate 'list (1 2) '(3 4)) ; evaluates to '(1 2 3 4)
(mapcar #'1+ '(1 2 3)) ; evaluates to '(2 3 4)
(mapcar #'+ '(1 2 3) '(10 20 30)) ; evaluates to '(11 22 33)
(remove-if-not #'evenp '(1 2 3 4)) ; evaluates to '(2 4)
(every #'evenp '(1 2 3 4)) ; evaluates to () which is nil
(some #'oddp '(1 2 3 4)) ; evaluates to t
(butlast '(subject verb object)); evaluates to (SUBJECT VERB)

;; VECTOR
    ; vector literals are fixed-length arrays
    ; #() => declares a vector literal
    ; concatenate => joins two vectors

#(1 2 3) ; evaluates to #(1 2 3)
(concatenate 'vector #(1 2 3) #(4 5 6)) ; evaluates to #(1 2 3 4 5 6)

;; SET
    ; sets are just lists that you call set functions on
    ; operates the same as you'd expect in other languages like Python
    ; set-difference => returns the difference between two lists
    ; intersection => returns the similar elements between two lists
    ; union => returns two lists and removes duplicates
    ; adjoin => adds a specified element to the front of the list if element not already present and returns that list

(set-difference '(1 2 3 4) '(4 5 6 7)) ; evaluates to (3 2 1)
(intersection '(1 2 3 4) '(4 5 6 7)) ; evaluates to 4
(union '(1 2 3 4) '(4 5 6 7)) ; evaluates to (3 2 1 4 5 6 7)
(adjoin 4 '(1 2 3 4)) ; evaluates to (1 2 3 4)

;; HASH TABLE
    ; equivalent of dictionary 
    ; make-hash-table => creates a hash table, used alongside defparameter
    ; setf => sets a hash value
    ; gethash => retrieves a value at a specified hash and returns both the stored value and a boolean (t, nil) depending on whether a value can be found, used for assignment and simple retrieval

(defparameter *m* (make-hash-table)) ; creates a global hash table *m*
(setf (gethash 'a *m*) 1) ; sets a number value of 1 to the hash 'a
(gethash 'a *m*) ; retrieves the value stored at the hash 'a in the global hash table *m*, evaluating to 1, T
```

## Functions

```
;;; ---------- FUNCTION -----------
    ; functions always return the evaluated value of the last expression
    ; function call syntax where f is function name and x y z are arguments is (f x y z)
    ; defun => creates a function, () is a list accepting arguments to the function
    ; &optional => specifies optional arguments to a function

;; FUNCTION CREATION

(defun hello-world () "Hello World") ; creates the function hello-world that evaluates to the string "Hello World"
(hello-world) ; evaluates to "Hello World"

(defun hello (name) (format nil "Hello, ~A" name)) ; creates the function hello that accepts the argument name
(hello "Steve") ; evaluates to "Hello, Steve"

;; OPTIONAL ARGUMENTS

(defun hello (name &optional from)
  (if from
      (format t "Hello, ~A, from ~A" name from)
      (format t "Hello, ~A" name))) ; optional function arguments (from) default to nil
(hello "Jim" "Alpacas") ; evaluates to "Hello, Jim, from Alpacas"

(defun hello (name &optional (from "The world"))
   (format nil "Hello, ~A, from ~A" name from)) ; default values (from's default value is the string "The World") can also be specified 
(hello "Steve") ; default value invoked, evaluates to "Hello, Steve, from The world"
(hello "Steve" "the alpacas") ; default value not invoked, evaluates to "Hello, Steve, from the alpacas"

;; ANONYMOUS FUNCTIONS
    ; lambda => creates an anonymous function
    ; funcall => calls an anonymous function with specified known arguments
    ; apply => calls an anonymous function when arguments are not known

(lambda () "Hello World") ; creation of anonymous function evaluates to #<FUNCTION (LAMBDA ()) {1004E7818B}>
(funcall (lambda () "Hello World")) ; => evaluates to "Hello World"
(apply (lambda () "Hello World") nil) ; evaluates to "Hello World"
```

## Macros

```
;;; ---------- MACRO ----------
    ; macros let us extend the syntax of our language (imagine writing and calling your own functions, except that works for any other part of the language)
    ; macros are incredibly complex and a lot of detail has been omitted here

(defmacro while (condition &body body) ; this macro implements a while loop in common lisp
  `(loop while ,condition
         do
         (progn
            ,@body)))
```

## More on

* format
* array
* adjustable vector
* values
* &key
* classes and objects
* macros
* [lisp-lang.org](https://lisp-lang.org/)
* [practical common lisp](https://gigamonkeys.com/book/)
* [lisp recipes](http://weitz.de/cl-recipes/)
* [awesome common lisp](https://github.com/CodyReichert/awesome-cl)
* [learn common lisp in y minutes](https://learnxinyminutes.com/docs/common-lisp/)
* [learn emacs elisp in y minutes](https://learnxinyminutes.com/docs/elisp/)
* [learn lisp flavoured erlang in y minutes](https://learnxinyminutes.com/docs/lfe/)
