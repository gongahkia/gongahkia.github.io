# Scala

# `Scala`

Hybrid functional and object-oriented programming language that compiles to Java bytecode.

## REPL

Scala features a REPL analogous to a commandline interpreter. Any Scala expression received will be evaluated and printed to the stdout.

```
# ----- Scala REPL -----

$ scala # initialises a Scala REPL as below
scala>

scala> 2 + 2 # each typed expression is automatically saved as a new numbered value
res0: Int = 4

scala> res0 + 2 # previously declared values can be called
res1: Int = 6

scala> :type (true, 2.0) # checking type of a literal without evaluating an expression
(Boolean, Double)

scala> :save /sites/repl-test.scala # saves a Scala REPL session

scala> :load /sites/repl-test.scala # load a Scala file into the REPL to automatically evaluate it
Loading /sites/repl-test.scala...
res2: Int = 4
res3: Int = 6

scala> :h? # browse REPL history to see past expressions entered
1 2 + 2
2 res0 + 2
3 :save /sites/repl-test.scala
4 :load /sites/repl-test.scala
5 :h?
```

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

/* 
this is a 
multi-line
comment
*/
```

## Printing

```
// ----- PRINT -----
    // print() => print text to the stdout without a newline
    // println() => print text to the stdout with a newline

print("there's no newline and we must explicitly specify it\n")
println("this includes a newline automatically")
```

## Imports

```
// ----- IMPORT -----
    // a Scala file can contain multiple classes and objects
    // import => specifies packages, sub packages and classes to bring into the local scope of the current Scala file
    // {} => group multiple import items together
    // => => rename an import item within the local scope for easier reference
        // _ => can be combined with above to exclude specific import items from being imported

import scala.collection.immutable.List
import scala.collection.immutable._ // this is a sub package
import scala.collection.immutable.{List, Map} // import multiple classes at once
import scala.collection.immutable.{List => ImmutableList} // rename the import from List to ImmutableList
import scala.collection.immutable.{Map => _, Set => _, _} // import all classes except the specified Map and Set
```

## Input and Output

```
// ----- INPUT AND OUTPUT -----
    // scala.io.Source => package containing read and write methods, has to be imported
        // .fromFile() => opens file at specified file path
        // .getLines() => retrieves all the lines within a file and stores them within an iterable structure that can be iterated over with a loop
    // PrintWriter() => initialses a new PrintWriter write object on the file at the specified file path
        // util.Properties => package containing further formatting options for writing to the specified file
        // .write() => writes the designated text as a string to the file
        // .close() => closes the PrintWriter object

// --- INPUT ---
    // performs read actions

import scala.io.Source // required import
for(line <- Source.fromFile("myfile.txt").getLines())
    println(line)

// --- OUTPUT ---
    // performs write actions

val writer = new PrintWriter("myfile.txt")
writer.write("Writing line for line" + util.Properties.lineSeparator)
writer.write("Another line here" + util.Properties.lineSeparator)
writer.close()
```

## Quickstart

```
// ----- QUICKSTART -----
    // Scala is statically typed but affords type inference (Scala compiler determines the type of a given variable if not explicitly defined)
    // a Scala program's entry point is defined within an object's main method
    // scalac => CLI command to compile the .scala file
    // val => declares an immutable value that cannot be reassigned
    // var => declares a mutable value that can be reassigned
    // : => declares the type of a variable

object Application { // object declaration
    def main(args: Array[String]): Unit = { // main method
        val x:Int = 10 
        x = 20 // this causes an error
        var y:Int = 10
        var z:Double = 1.0
        y = 20 // this is okay
        z = 2.5 // this is also okay
    }
}
```

## Types

```
// ----- TYPE -----
    // Scala features a rich type system consisting of both primitive and complex types

// --- PRIMITIVE TYPE --- 
    // Byte => 8-bit signed integer
    // Short => 16-bit signed integer
    // Int => 32-bit signed integer
    // Long => 64-bit signed integer
    // Float => 32-bit single-precision floating point number
    // Double => 64-bit double-precision floating point number
    // Char => 16-bit Unicode character declared with '' single quotes
    // Boolean => true or false
    // Unit => represents the absence of a value with only one instance (), equivalent to void in Java

// --- REFERENCE TYPE ---
    // String => sequence of Char primitives, immutable and backed by the Java String class, declared with "" double quotes
    // Option => datatype representing either an optional value or None
    // Tuple => data structure storing a fixed number of items of different types, declared with () round brackets
    // List => immutable linked list
    // Seq => ordered sequence of elements
    // Set => unordered sequence of unique elements
    // Map => collection of key-value pairs

// --- ANY ---
    // Any => root type of all datatypes in Scala, allowing for Scala's type inference
    // AnyVal => parent type of all primitive types
    // AnyRef => parent type of all reference types
```

## Operators

```
// ----- OPERATOR -----

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => divison
    // % => modulo

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => complete equality check for value and type
    // != => complete inequality check for value and type
    // .isInstanceOf[] => mostly used to check if object is of a specific type
    // >, <, >=, <= are comparison operators and operate as you'd expect

// ASSIGNMENT OPERATORS
    // = => simple assignment
    // += => increment by specified value and reassign
    // -= => decrement by specified value and reassign
    // *= => multiply by specified value and reassign
    // /= => divide by specified value and reassign
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// ----- CONDITIONAL -----
    // conditionals can be specified for later evaluation within function calls and assignment statements
    // conditionals, like many other things in Scala, can also flexibly be written in a single line
        // if 
        // else
        // else if

val x:Int = 10
if (x == 1) println("this won't run")
if (x == 10) println("this will run")
if (x == 11) println("meanwhile this won't run") else if (x == 12) println("this also won't run") else println("but this will")
println(if (x == 10) "yeah" else "nope") // conditionals can be nested within other functions
val text = if (x == 10) "yeah" else "nope" // as well as assignment

// ----- LOOP -----
    // Scala does not feature 'conventional' for loops, but rather employs special keywords like to and by to generate similar structures
        // to => creates an iterable structure, equivalent of range in Python
        // by => specifies the step within the given iterable structure being created
    // .foreach() => equivalent of map() as a signature of functional programming, applies the given function call on a given iterable structure
        // this can be called without dots and brackets also, Scala is generally quite lenient with the function call syntax
    // while loop
        // while => specifies the predicate condition upon which the while loop runs a check on every iteration
    // do while loop
        // do => specify the action to be executed every loop iteration
        // while => specifies the predicate condition upon which the while loop runs a check on every iteration

val r = 1 to 5 // creates an iterable structure with Int's from 1 to 5 and assigns it to r
r.foreach(println) // prints "1\n2\n3\n4\n5\n" to the stdout
(5 to 1 by -1) foreach (println) // initialises an iterable structure literal and iterates over it and prints out each item accordingly

var i = 0
while (i < 10) { // classic while loop
    println("i " + i)
    i += 1 
}

i = 0
do {
    println("i is still less than 10") // classic do while loop
    i += 1
} while (i < 10)
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // () => declares a tuple with its specified element datatypes
    // Option[] => declares an option type that could either be the specified datatype or None
    // List[] => declared a linked list with elements of the specified type
    // Set[] => declares a set with elements of the specified type
    // Map[] => declares a Map with key-value pairs of the specified types
        // -> => specifies the relationship between a key-value pair

val tuple: (Int, String, Boolean) = (1, "Scala", true)
val someValue: Option[Int] = Some(5)
val noValue: Option[Int] = None
val list: List[Int] = List(1, 2, 3)
val set: Set[String] = Set("apple", "banana", "cherry")
val map: Map[String, Int] = Map("a" -> 1, "b" -> 2, "c" -> 3)
```

## Functions

```
// ----- FUNCTION -----
    // Scala features implicit return of the last expression within a function block, so there is no return keyword
        // the {} surrounding the function body can be omitted if the entire function body is a single expression that evaluates to the function's return value
    // def => defines a function similar to Python
    // : => specifies the datatype of a function's arguments and return values
    // = => used to assign default values to certain function arguments

def sumOfSquares(x: Int, y: Int): Int = {
    val x2 = x * x
    val y2 = y * y
    x2 + y2 // this last expression is implicitly returned
}

def sumOfSquaresShort(x: Int, y: Int): Int = x * x + y * y // this one-line function evaluates to the single return expression
def addWithDefault(x: Int, y: Int = 5) = x + y // default argument provided to this function

// --- ANONYMOUS FUNCTION ---
    // a hallmark of functional programming languages, where anonymous functions can be assigned to variables
    // => => defines an anonymous function and the relationship between the anonymous function's parameters and its return value
        // def and function name are completly omitted in anonymous function declarations

(x: Int) => x * x // this is an anonymous function
val sq: Int => Int = x => x * x // datatype of the anonymous function's parameters and return type can also be specified with this syntax which appears nearly identical to Haskell
```

## Pattern Matching

```
// ----- PATTERN MATCHING -----
    // Scala features powerful pattern matching for multiple predicates that uniquely does not require breaks, fall-through simply does not occur
        // Scala even has regex support built in
    // match, case => creates a match-case expression that allows for pattern matching
        // => => specifies the relationship between a give case statement and the relevant execution code
        // _ => final catch-all character, equivalent of default in other languages

def matchPerson(person: Person): String = person match {
    case Person("George", number) => "We found George! His number is " + number
    case Person("Kate", number) => "We found Kate! Her number is " + number
    case Person(name, number) => "We matched someone : " + name + ", phone : " + number
}

def matchEverything(obj: Any): String = obj match { // this function's match statement takes in an object of any type
    case "Hello world" => "Got the string Hello world" // matches a value
    case x: Double => "Got a Double: " + x // match by type
    case x: Int if x > 10000 => "Got a pretty big number!" // matches a condition
    case Person(name, number) => s"Got contact info for $name!" // match the class of a case
    case email(name, domain) => s"Got email address $name@$domain" // match a regular expression
    case (a: Int, b: Double, c: String) => s"Got a tuple: $a, $b, $c" // multiple matching within a tuple
    case List(1, b, c) => s"Got a list with three elements and starts with 1: 1, $b, $c" // match a data structure
    case List(List((1, 2, "YAY"))) => "Got a list of list of tuple" // nested patterns
    case _ => "Got unknown object" // match any uncaught case
}
```

## More on

* Intersection types
* Union types
* Implicit
* Object Oriented Programming
* Combinators
* [learn scala in y minutes](https://learnxinyminutes.com/docs/scala/)
* [scala official documentation](https://www.scala-lang.org/)
