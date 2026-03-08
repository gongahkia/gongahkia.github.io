# D

# `D`

Modern programming language that supports both low-level features and high-level abstractions.

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
    // writeln => prints a string to the stdout and appends a newline to the output
    // writef => prints a formatted string to the stdout and does not include a newline at the end of the output

writeln("watermelon with a newline automatically appended");
writef("this does not include a newline by default, we have to include it\n")
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // D heavily borrows C-style syntax, so code is written within the main void function
    // D supports garbage collection (automatic memory management) so malloc and free are rarely used
    // D has built-in support for dynamic arrays and strings, preventing buffer overflow errors from C

void main() {
    // add code here
}
```

## Types

```
// ---------- TYPE ----------
    // int => integer number
    // float => floating point number
    // char => '' single quotation marks
    // string => "" double quotation marks
    // bool => true, false
    // void => absence of a type
    // auto => allows for dynamic type inference of a given value
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => division
    // % => modulo operator
    // ++ => increment by one operator, position of the increment operator and the operand affects whether increment occurs before or after value access
    // -- => decrement by one operator, position of the decrement operator and the operand affects whether decrement occurs before or after value access

// LOGICAL OPERATORS
    // && => and
    // || => or
    // ! => not

// COMPARISON OPERATORS
    // == => complete equality check for value and type
    // != => complete inequality check for value and type
    // > < >= <= are also comparsion operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS

// IF ELSE IF ELSE

int x = 10;
if (x < 10) {
    writeln("x is smaller than 10");
} else if (x > 10) {
    writeln("x is bigger than 10");
} else {
    writeln("x is equals to 10");
}

// SWITCH CASE DEFAULT
    // break => remember to include break below each case, otherwise logic will flow through after each case statement
    // default => represents the default case

int y = 5;
switch (y) {
    case 1:
        println("y is equals to 1");
        break;
    case 2:
        println("y is equals to 2");
        break;
    case 3:
        println("y is equals to 3");
        break;
    case 4:
        println("y is equals to 4");
        break;
    case 5:
        println("y is equals to 5");
        break
    default:
        println("welcome to the default case where y isn't 1 to 5");
}

// LOOPS

// FOR LOOPS

for (int i=0; i<1000; i++) { // allows creation of basic for loops
    writeln(i);
}

// FOREACH LOOPS
    // .. => creates a continuous range that is first-value inclusive and last-value exclusive
    // foreach => allows for iteration over a created loop or iterable data structure
    // foreach_reverse => allows for iteration over a created loop or iterable data structure in reverse order

foreach (n;1..1000) {
    if (n % 2 == 0) {
        writeln(n);
    }
}

foreach_reverse (n;1..1000) {
    if (n % 2 == 1) {
        writeln(n); // odd
    } else {
        writeln("even!");
    }
}

// WHILE LOOPS

int n = 1;
while (n < 10000) {
    n += n;
}

// DO WHILE LOOPS

do {
    n -= (n/2);
} while (n>0);
```

## Data structures

```
// ---------- DATA STRUCTURE ----------
    // ref => specifies a parameter is to be passed by reference
    // alias => operates similarly to Bash aliases, creating specified abbreviations for other existing types

// STRUCT
    // passed by value (value is shallowly-copied) to functions
    // stack-allocated with automatic memory management
    // struct visibility can be augmented with public, private and protected keywords
    // struct => declares and creates a struct, whose values can be declared first or initialised immediately, struct instances are immutable by default
    // mutable => declares and creates a mutable struct, whose value can be declared first or initilaised immediately, and can be reassigned later

struct LinkedList(T) { // T is a type parameter that declares a generic type for the LinkedList struct
    T data = null;
    LinkedList!(T)* next; // ! instantiates a parametized type, here T
}

// CLASS
    // passed by reference to functions
    // heap-allocated and manual memory management required
    // class visibility can be augmented with public, private and protected keywords
    // class => declares and creates a class, where a class instance is mutable by default
    // : => indicates the relationship between child and parent class, where one child class can inherit from a list of parent classes to support single and multiple inheritance

class BinTree(T) {
    T data = null;
    BinTree!T left;
    BinTree!T right;
}

class Matrix(uint m, uint n, T = int) { // we can also parametize on values
    T[m] rows;
    T[n] columns;
}

// ENUM
    // enum => declares and creates an enum, operates similarly to enums in other languages, with enum values listed within {} curly braces

enum Day {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
}
```

## Functions

```
// ---------- FUNCTION ----------
    // specify parameter and return value types within the function definition
    // return => specifies the expression or value to be returned

void helloLah() {
    writeln("Neato pronto!");
}

int twoSum(int a, int b) {
    return a + b;
}
```

## More on

* module
* std.algorithm
* std.parallelism
* properties
* getter and setter methods
* union
* templates
* function templates
* templates
* contracts
* [uniform function call syntax](https://www.drdobbs.com/cpp/uniform-function-call-syntax/232700394)
* [learn d in y minutes](https://learnxinyminutes.com/docs/d/)
* [d-lang documentation](https://dlang.org/)
