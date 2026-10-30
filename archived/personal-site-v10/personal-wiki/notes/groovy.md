---
category: Tech
---
# Groovy

# `Groovy`

A powerful, optionally-typed and dynamic language for the Java platform.

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
    // println => prints a string to the console, followed by a newline
    // print => prints a string to the console without a newline

println "Hello, Groovy!"
print "This does not have a newline."
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Groovy is a superset of Java, so Java code is valid Groovy code.
    // It can be used as a scripting language.
    // Semicolons are optional.

println "Hello from a Groovy script!"
```

## Variables

```
// ---------- VARIABLE ----------
    // def => defines a variable with dynamic typing
    // You can also use static typing like in Java.

def myVar = 10 // dynamically typed
int myInt = 20 // statically typed
```

## Types

```
// ---------- TYPE ----------
    // Groovy supports all Java types.
    // It also has its own types for convenience.
    // int, float, boolean, String, etc.
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // +, -, *, /, % (same as Java)
    // ** => power operator

// LOGICAL OPERATORS
    // &&, ||, ! (same as Java)

// COMPARISON OPERATORS
    // ==, !=, >, <, >=, <= (same as Java)
    // <=> => spaceship operator (returns -1, 0, or 1)

// GROOVY-SPECIFIC OPERATORS
    // ?. => safe navigation operator (avoids NullPointerException)
    // ?: => Elvis operator (shorthand for ternary)
    // ==~ => find operator (for regular expressions)
    // === => identity operator (for object reference equality)
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// IF / ELSE

def x = 10
if (x > 5) {
    println "x is greater than 5"
} else {
    println "x is not greater than 5"
}

// SWITCH

def mySwitch = "test"
switch (mySwitch) {
    case "test":
        println "it's a test"
        break
    case "prod":
        println "it's prod"
        break
    default:
        println "default case"
}

// FOR LOOP

for (i in 0..4) {
    println i
}

// EACH (for collections)

def myList = [1, 2, 3]
myList.each {
    println it
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// LIST

def myList = [1, 2, 'hello'] // can contain mixed types

// MAP

def myMap = [name: 'John', age: 30]

// RANGE

def myRange = 1..10
```

## Functions

```
// ---------- FUNCTION ----------
    // Functions are defined with the `def` keyword, or with a specific return type.
    // `return` is optional for the last statement.

def myFunc(name) {
    "Hello, $name"
}

println myFunc('Groovy')
```

## More on

* [Groovy Documentation](https://groovy-lang.org/documentation.html)
* [Groovy vs. Java](https://www.baeldung.com/groovy-vs-java)
* [Groovy Tutorial](https://www.tutorialspoint.com/groovy/index.htm)
