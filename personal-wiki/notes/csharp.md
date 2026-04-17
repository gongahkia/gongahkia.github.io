---
category: Tech
---
# C#

# `C#`

## Comments

```
// single-line comments
/* multi-line
comments
look
like
this */
```

## Namespaces

```
// ---------- NAMESPACE ----------
    // operates similarly to importing Python modules
    // these are all part of C#'s standard .NET Framework Class Library
    // using brings in relevant namespaces referenced in source code 

using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.IO;
```

## Main method

```
// ---------- MAIN METHOD ----------
    // since CS is heavily-OOP, each CS file should contain at least 1 class with the same name as the file, below we assume the file name is CS.cs
    // within said class, there must be a main method, from which all console applications run when the program is executed on the CLI
    // web applications and games might have a different entry point
    // similar to Java

public class CS {

    public static void Main() {
        Console.Write("ass"); // this will print when the CS file is run
    }

}
```

## Printing

```
Console.WriteLine("Hello world"); // prints to the console with a newline
Console.Write("Hello "); // prints without a newline
Console.Write("World"); // prints without a newline
```

## Types, Variables and Constants

```
// ---------- TYPES and VARIABLES ----------
    // INTEGER
        // sbyte => signed 8-bit integer, -128..127
        // byte => unsigned 8-bit integer, 0..255
        // short => signed 16-bit integer, -32,768..32,767
        // ushort => unsigned 16-bit integer, 0..65,535
        // int => signed 32-bit integer, -2,147,483,648..2,147,483,647
        // uint => unsigned 32-bit integer, 0..4,294,967,295
        // long => signed 64-bit integer, -9,223,372,036,854,775,808..9,223,372,036,854,775,807
        // ulong => unsigned 64-bit integer, 0..18,446,744,073,709,551,615
    // FLOAT
        // double => double-precision 64-bit floating point number, 15-16 digit precision
        // float => single-precision 32-bit floating point number, 7 digit precision
        // decimal => greatest-precision 128-bit floating point number, used for financial and monetary calculations
    // BOOLEAN => true, false
    // CHAR => single quotation marks, 16-bit unicode character
    // STRING => double quotation marks, immutable, reference type (can be set to null) unlike all previous types which are value types

sbyte fooSbyte = 100;
byte fooByte = 100;
short fooShort = 10000;
ushort fooUshort = 10000;
int fooInt = 1;
uint fooUint = 1;
long fooLong = 100000L; // L is used to denote the variable value is of type long or ulong
ulong fooUlong = 100000L;

double fooDouble = 123.4;
float fooFloat = 234.5f;
decimal fooDecimal = 150.3m;

boolean fooBoolean = true; // or false

char fooChar = 'A';
string fooString = "awesome possum"; // a reference type, so it can be set to null

// ---------- STRING METHODS ----------

// INDEXING
    // can access characters from a string via index, similar to Python
    // strings are immutable upon instantiation, so stuff like fooString[1] = 'X' is not possible

char charFromString = fooString[1]; // evaluates to the character of index 1, 'w'

// ---------- CONSTANT ----------
    // const makes a variable immutable 
    // so does read-only
    // const values that require calacultion are evaluated at compile time

const int HoursPerWeek = 9001;
const int CalculatedHoursPerWeek = 60 * 60 * 24 * 7;
```

## Data structures

```
// ---------- ARRAY ----------
    // zero-indexed
    // array size must be statically declared at declaration
    // arrays are mutable, their values can be altered even after initial declaration and assignment
    // can store elements of multiple types
    // can be assigned as null

int[] intArray = new int[10]; // instantiates an int array that can store 10 integers
int[] y = {9000, 1000, 1337}; // can also declare an array literal like this

// ---------- ARRAY METHODS ----------

// INDEXING
    // can access array elements via index, similar to Python

intArray[1] = 1; // reassigning the second element of the int array of index 1 to the int value 1

// ----------- LIST ----------
    // zero-indexed
    // list size is dynamic, so it does not need to be declared at declaration, similar to Vector in Rust
    // usually instantiated with a single type, like conventional C arrays
    // used more commonly than arrays as lists are more flexible
    // can never be assigned as null
    // <> are generics, elaborated on below

List<Int> intList = new List<int>(); // instantiates an int list that can store a dynamic number of ints
List<string> stringList = new List<string>();
List<int> z = new List<int> {9000, 1000, 1337}; // a List literal, though since its dynamically sized this basically doesn't matter

// ---------- LIST METHODS ----------

intList.Add(1); // same as .append() in Python

// ---------- OTHER DATA STRUCTURES ----------
    // Dictionary (hash-map implementation in C#)
    // Stack, Queue
    // HashSet
    // Read-only Collections
    // Tuple (from .NET 4+)
```

## Operators

```
// ---------- ARITHMETIC OPERATOR ----------

int i1 = 1, i2 = 2 // shorthand for multiple declaration and assignment
i1 + i2; // addition
i1 - i2; // subtraction
i1 * i2; // multiplication
i1 / i2; // division
i1 % i2; // modulo
i1++; // post-increment, increment by one after returning value
++i1; // pre-increment, increment by one before returning value
i1--; // post-decrement, decrement by one after returning value
--i1; // pre-decrement, decrement by one before returning value

// ---------- COMPARISON OPERATOR ----------

i1 == i2; // complete equality operator
i1 != i2; // complete inequality operator
i1 > i2; // comparison operator
i1 < i2; // comparison operator
i1 >= i2; // comparison operator
i1 <= i2; // comparison operator

// ---------- LOGICAL OPERATOR ----------
boolean a = true;
boolean b = false;
a && b; // logical AND operator
a || b; // logical OR operator
```

## Control structures

```
// ---------- IF ELSE IF ELSE ----------

int j = 10;
if (j == 10) {
    Console.WriteLine("I am invincible");
} else if (j > 10) {
    Console.WriteLine("Neato");
} else {
    Console.WriteLine("Pronto");
}

// ---------- TERNARY OPERATOR ----------
    // <condition> ? <run if true> : <run if false>

int toCompare = 17;
string isTrue = toCompare == 17 ? "yes it is 17" : "no it is not 17";

// ---------- WHILE LOOP ----------
    // while and do while loops are both available
    // continue skips the current iteration
    // break breaks from the current loop completely

int fooWhile = 0;
while (fooWhile < 100) {
    fooWhile++;
}

int fooDoWhile = 0;
do {
    fooDoWhile++;
} while (fooDoWhile < 100);

// ----------- FOR LOOP ----------
    // conventional C-style for loops exist
    // foreach loops also exist

for (int i = 0; i < 10; i++) {
    Console.Write(i);
}

foreach (char character in "Hello World!".ToCharArray()) {
    // iterates over every element of the char array created from the string "Hello World!"
    Console.Write(character);
}

// ---------- SWITCH CASE GOTO DEFAULT ----------
    // remember to include the break statement to prevent logic from falling through
    // goto can transfer logic flow from one case statement to another, and any code below it in the same case will be skipped similar to a break statement
    // default cas can be included as well

int month = 3;
string monthString; // you can declare a variable first and assign it later
switch (month) {
    case 1:
        monthString = "January";
        goto case 3; // continues logic flow in case 3
    case 2:
        monthString = "February";
        break;
    case 3:
        monthString = "March";
        break;
    default:
        monthString = "Some other month";
        break;
}
```

## Classes

```
// ---------- DEFINITION ----------
    // ACCESS MODIFIERS 
        // public => members are globally accessible from any part of the program
        // private => members are only accessible from within the class or struct they are declared in
        // protected => members are only accesible from within the class or from derived subclasses, unaccessible from outside the class hierachy
    // static => class members that belong to the class instead of instances of the class
    // get => a method to retrieve a value
    // set => a method to set a value

// ---------- CLASS ----------
    // a class can inherit from only one parent class
    // a class can inherit from any number of interfaces
    // a parent class is listed first before interfaces if applicable
    // methods can share the same name as long as at least the parameter type signature is unique to differentiate the two methods

public class Bicycle {
    public int Cadence {
        get {
            return _cadence;
        }
        set {
            _cadence = value;
        }
    }
    private int _cadence;
    public void SpeedUp(int increment = 1) {
        _speed += increment;
    }
    public void SlowDown(int decrement = 1) {
        _speed -= decrement;
    }
}

// ---------- INHERITANCE ----------

// the subclass MountainBike inherits from the parent class Bicycle and the type signatures of members from interfaces IJumpable and IBreakable
class MountainBike: Bicycle, IJumpable, IBreakable {
    int damage = 0;
    public void Jump(int meters) {
        damage += meters;
    }

    public bool Broken {
        get {
            return damage > 100;
        }
    }
}
```

## Subclasses

```
// ---------- SUBCLASS ----------
    // : allows for subclasses to inherit from their parent classes
    // override can be used to override certain members (generally methods) of the parent class as desired

class PennyFarthing: Bicycle {
    // the PennyFarthing class now inherits all the members of the parent Bicycle class besides those overriden
}
```

## Interfaces

```
// ---------- INTERFACE ----------
    // : allows for classes to inherit any number of interfaces
    // interface declares an interface
    // interfaces contain the type signatures of class members and drop the implementation
    // interface members are implictly public

interface IJumpable {
    void Jump(int meters);
}

interface IBreakable {
    bool Broken {
        get;
    }
}
```

## Objects

```
// ---------- OBJECT -----------
    // new instantiates a new object off a class
    // object methods can be called with . dot notation
    // it is good convention to use getter and setter methods

Bicycle trek = new Bicycle();
trek.SpeedUp(3);
trek.Cadence = 100; 

PennyFarthing funbike = new PennyFarthing(1,10);
```

## More on

* generics
* optional parameters for methods
* yield
* ref for references
* default and specific constructors
* enum
* exception handling
* internal
* protected internal
* virtual
* partial
* delegate
* parallel framework
* asynchronous programming
* web dev with ASP .NET core
* [microsoft C# documentation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/)
* [web dev with .NET](https://dotnet.microsoft.com/en-us/learn)
