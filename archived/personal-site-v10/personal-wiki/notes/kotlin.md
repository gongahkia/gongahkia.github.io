---
category: Tech
---
# Kotlin

# `Kotlin`

Language for native android development and the browser.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is a 
multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // print => prints a string to the stdout and does not include a newline
    // println => prints a string to the stdout and appends a newline to the output
    // $ => allows for string interpolation to embed values within a formatted string

print("this does not include a newline and one must be explicitly specified\n")
println("this already includes a newline")

val x:String = "okay"
print("$x thanks") // allows for string interpolation
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // package => declares a namespace for code within the current source file
    // all kotlin code runs within the main function

package learningKotlin

fun main() {
    // add your code here
}
```

## Variables

```
// ---------- VARIABLE ----------
    // variable values are non-nullable by default
    // val => declares and assigns a variable that cannot be reassigned after assignment
    // var => declares and assigns a variable that can be reassigned after assignment
    // : => specifies data type of a given variable
    // ? => specified a variable can store a null value
        // ?. => access an attribute of a nullable variable
        // ?: => specifies a default value to use if the variable value is null

val permInt:Int = 10 // cannot be reassigned
var tempInt:Int = 100 
tempInt = 5 // this is valid kotlin and tempInt can continue to be reassigned later

val stringButNullable:String? = "watermelon but could also be null"
print(stringButNullable?.length) // this prints 33 to the stdout

val blud:String? = null
print(blud?.length ?: -1) // this prints -1 to the stdout since blud's value is null so it defaults to -1 when getting null for blud's length
```

## Types

```
// ---------- TYPE ----------
    // Byte => 8-bit integer number
    // Short => 16-bit integer number
    // Int => 32-bit integer number
    // Long => 64-bit integer number
    // Float => 32-bit single-precision floating point number
    // Double => 64-bit double-precision floating point number
    // Boolean => true, false
    // Char => '' single quotation marks
    // String => "" double quotation marks
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => divison
    // % => modulo operator
    // += => addition and reassignment
    // -= => subtraction and reassignment
    // *= => multiplication and reassignment
    // /= => divison and reassignment
    // %= => modulus and reassignment

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => partial equality check for structural equality in value
    // != => partial inequality check for structural equality in value
    // === => complete equality check for referential equality in value and type by pointing to the same object in memory
    // !== => complete inequality check for referential equality in value and type by pointing to the same object in memory
    // < > <= >= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// ---------- CONDITIONALS ----------

// IF ELSE IF ELSE 

val x = 10
if (x > 10) {
    print("x is bigger than 10")
} else if (x < 10) {
    print("x is smaller than 10")
} else {
    print("x equals to 10")
}

// WHEN 
    // Kotlin's powerful pattern-matching construct similar to switch case statements in other languages, which can be embedded in expressions as well
    // -> => specifies the relationship between each case statement and the expression block to be run, note that indentation and line breaks matter
    // else => specifies the default case if all other conditions fail to be met

val dayOfWeek = 3
when (dayOfWeek) {
    1 -> print("Monday")
    2 -> print("Tuesday")
    3 -> print("Wednesday")
    4 -> print("Thursday")
    5 -> print("Friday")
    6, 7 -> print("Weekend")
    else -> print("Invalid day")
} // when block evaluating to a value

fun getDayType(dayOfWeek: Int): String {
    return when (dayOfWeek) {
        1, 2, 3, 4, 5 -> "Weekday"
        6, 7 -> "Weekend"
        else -> "Invalid day"
    }
} // when block within a function expression

// ---------- LOOPS ----------

// WHILE LOOP

var count = 0
while (count < 5) {
    print(count)
    count++
} // prints 01234 to the stdout

// DO WHILE LOOP

var i = 0
do {
    println(i)
    i++
} while (i < 3) // prints 012 to the stdout

// FOR LOOP
    // for in => iteration over an iterable data structure, including ranges

for (i in 1..5) {
    print(i)
} // this prints 12345 to the stdout

// RANGES
    // .. => creates an inclusive range on both ends that can be iterated over

val rangeList = (10..15).toList() // evaluates to [10, 11, 12, 13, 14, 15]
val checkIfInRange = 3 in 1..5 // evaluates to boolean true
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // fixed-sized ordered sequence of elements of the same type, limited functionality for array manipiulation but kotlin arrays are mutable by default so array values can be reassigned after initial declaration and assignment, although their size cannot be changed
    // arrayOf => declares and creates an array literal with the type Array<{ELEMENT TYPE}>

val array: Array<Int> = arrayOf(1, 2, 3, 4, 5)
array[2] = 10 // arrays are inherently mutable so we can reassign existing values, but cannot modify the size of the array

// LIST
    // fixed-size or dynamically-sized ordered sequence of elements of the same type, higher-order functions like filter, map and reduce can be called on lists
    // listOf => declares and creates an immutable list with the type List<{ELEMENT TYPE}> that cannot be modified after declaration and initial assignment
    // mutableListOf => declares and creates a mutable list with the type MutableList<{ELEMENT TYPE}> that can be modified after declaration and initial assignment

val numbers: List<Int> = listOf(1, 2, 3, 4, 5)

val mutableNumbers: MutableList<Int> = mutableListOf(1, 2, 3, 4, 5)
mutableNumbers.add(6) // this and other list functions exist to interact with lists

// MAP
    // fixed-size or dynamically-sized unordered collections of key-value pairs
    // mapOf => declares and creates an immutable map with the type Map<{KEY TYPE}, {VALUE TYPE}> that cannot be modified after declaration and initial assignment, immutable maps are read-only
    // mutableMapOf => declares and creates a mutable map with the type MutableMap<{KEY TYPE}, {VALUE TYPE}> that can be modified after declaration and initial assignment
    // to => specifies the relationship between a key and a value in a Map

val map: Map<String, Int> = mapOf("one" to 1, "two" to 2, "three" to 3)

val mutableMap: MutableMap<String, Int> = mutableMapOf("one" to 1, "two" to 2, "three" to 3)
val valueOne:Int = mutableMap["one"] // this retreives the Int value 1 stored at the corresponding String key "one" and assigns it to a variable
mutableMap["four"] = 4 // this adds a new key-value pair
mutableMap["two"] = 20 // this updates an existing value
mutableMap.remove("three") // this removes a key-value pair

// SET
    // fixed-size or dynamically-sized unordered collections of unique elements
    // setOf => declares and creates an immutable set with the type Set<{ELEMENT TYPE}> that cannot be modified after declaration and initial assignment
    // mutableSetOf => declares and creates a mutable set with the type MutableSet<{ELEMENT TYPE}> that can be modified after declaration and initial assignment

val uniqueNumbers: Set<Int> = setOf(1, 2, 3, 4, 5)

val uniqueFruits: MutableSet<String> = mutableSetOf("apple", "banana", "orange")
uniqueFruits.add("grape")
uniqueFruits.remove("banana")
```

## Functions

```
// ---------- FUNCTION ----------
    // functions are first-class citizens, allowing for higher-order functions like map, filter and reduce
    // fun => declares and creates a function and specifies its parameter and return type with : colon
    // return => specifies the return expression, though kotlin functions support implicit return of the last expression provided
    // vararg => allows for a variable number of arguments to be passed to a function
    // functions that are a single expression can be expressed as a single-line expression with an = assignment operator

fun hello(name: String): String {
    return "Hello, $name!"
}

fun varargExample(vararg names: Int) {
    print("argument has ${names.size} elements")
} // takes in a variable number of arguments and prints out the number of arguments provided

fun odd(x: Int): Boolean = x % 2 == 1 // a single-line expression
```

## More on

* anonymous functions
* with
* is
* enum
* object
* operator
* OOP
* data classes
* destructuring
* [kotlin playground](https://play.kotlinlang.org/#eyJ2ZXJzaW9uIjoiMS45LjIxIiwicGxhdGZvcm0iOiJqYXZhIiwiYXJncyI6IiIsIm5vbmVNYXJrZXJzIjp0cnVlLCJ0aGVtZSI6ImlkZWEiLCJjb2RlIjoiLyoqXG4gKiBZb3UgY2FuIGVkaXQsIHJ1biwgYW5kIHNoYXJlIHRoaXMgY29kZS5cbiAqIHBsYXkua290bGlubGFuZy5vcmdcbiAqL1xuZnVuIG1haW4oKSB7XG4gICAgcHJpbnRsbihcIkhlbGxvLCB3b3JsZCEhIVwiKVxufSJ9)
* [kotlin documentation](https://kotlinlang.org/docs/home.html)
* [learn kotlin in y minutes](https://learnxinyminutes.com/docs/kotlin/)
* [app development in kotlin](https://developer.android.com/codelabs/build-your-first-android-app-kotlin#0)
* [fact app in kotlin](https://tjah.medium.com/lets-build-an-android-app-with-kotlin-6fa0fe977e1c)
