# Dart

# `Dart`

Single-threaded language that supports web and app development for multiple platforms.

## Quickstart

```
// ---------- COMPILE TIME VS RUNTIME ----------
    // compile time
        // when program is compiling to byte code or machine code
        // syntax errors, typechecking errors, compiler crashes occur at this stage
        // code compiles to assembly, object code or executable file that can be run
    // runtime
        // when executable file is run
        // logical errors, memory errors, file path errros, URL errors etc occur at this stage
        // executable file will output what was intended in the program if successful

// ---------- QUICKSTART -----------
    // dart is used in the Fluttr framework for cross-platform application and web development
    // all dart code runs within the void main() function
    // dart is dynamically typed but types can be statically specified

void main() {
    // add your code here
}
```

## Printing

```
// ---------- PRINT ----------
    // print() => prints a string to the stdout and appends a newline to the end of the output
    // ${} => allows for string interpolation to create a formatted string

const int numWatermelon = 10;
print("You have ${numWatermelon} watermelons."); // prints "You have 10 watermelons." to the stdout
```

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is 
a multi-line
comment in 
dart 
*/
```

## Variables, Final and Constants

```
// ---------- VARIABLE ----------
    // variable data types are immutable after variable assignment
    // default value of an unassigned variable is null
    // var => declares and creates a variable
    // dynamic => specifies a variable can change its data type after initial assignment

var String songLyric = "watermelon sugar"

// ---------- FINAL -----------
    // final => declares and creates a constant (immutable value after assignment) whose value is assigned and initialised at runtime when executable file is run
    // used when a costant value is unknown at compile-time and will be assigned later (user input, requesting API data)

final String userInput = stdin.readLineSync()!;

// ---------- CONSTANT -----------
    // const => declares and creates a constant (immutable value after assignment) whose value is already assigned and initialised at compile-time when dart script is written
    // used when a constant value is known by the programmer at compile-time and can be assigned definitively without need for reassignment during runtime

const double pi = 3.14;
```

## Types

```
// ---------- TYPE ----------
    // int => integer number
    // double => long floating point number
    // String => double quotation marks
    // bool => true, false 
    // dynamic => allows for type inference of a given value's type
    // List<DATA_TYPE> => an ordered sequence of elements
    // Map<KEY_DATA_TYPE, VALUE_DATA_TYPE> => a collection of key-value pairs
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => divison
    // ~/ => floor divison
    // % => modulo
    // ++ => increment by 1
    // -- => decrement by 1

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => complete equality check for value and type
    // != => complete inequality check for value and type
    // is => mostly used to check if object is of a specific type
    // !is => mostly used to check if object is not of a specific type
    // >, <, >=, <= are comparison operators and operate as you'd expect

// ASSIGNMENT OPERATORS
    // = => simple assignment
    // ??= => assigns value only if variable is null
    // += => increment by specified value and reassign
    // -= => decrement by specified value and reassign
    // *= => multiply by specified value and reassign
    // /= => divide by specified value and reassign
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONAL CHECKS
    // if 
    // else if
    // else

if (booleanExpression0) {
    // do something
} else if (booleanExpression1) {
    // do something else
} else {
    // do another thing
}

// SWITCH CASE DEFAULT
    // break => included at the end of each case statement to prevent logic from dropping through

switch (variableExpression) {
    case constantExpression1: {
        // do something
    }
    break;
    case constantExpression2: {
        // do something else
    }
    break;
    default: {
        // do another thing
    }
    break;
}

// LOOPS
    // for loop
    // while loop

for (var i=0; i<3; i++){
    print("Loop:${i}");
}

var num = 3;
while (num >= 1){
    print("New count:${num}");
    num--;
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// LIST
    // declared with [] square brackets, a comma-delimited ordered sequence of elements of variable length 

List<int> listOfIntegers = [1,2,3,4,5,6,7,8,9,10];

// MAP
    // declared with {} curly braces, a comma-delimited collection of key-value pairs similar to a Javascript object

Map<String, String> userDetails = {
    "Username": "cheers", 
    "Password": "Password123"
};
```

## Functions

```
// ---------- FUNCTION ----------
    // specify return value and parameter data type in function declaration
    // void => used to prefix functions that don't return any value
    // return => used to specify the return value of the function

// NAMED FUNCTIONS

int addSum (int a, int b) {
    return a + b;
};

double calculateGST (double itemCost) {
    return itemCost/100 * 108;
};

String aString () {
    return "here's a default string";
};

bool twoBooleans (bool a, bool b) {
    return a && b;
};

// ANONYMOUS FUNCTIONS
    // written as a single line by convention 
    // both below syntax are valid
        // with the syntax {RETURN TYPE} {FUNCTION NAME} ({PARAMETERS}) => FUNCTION EXPRESSION 
        // {RETURN TYPE} {FUNCTION NAME} ({PARAMETERS}) {{FUNCTION EXPRESSION}}

int test() => 123;
String anotherTest () {return "apple juice is delicious";};
```

## OOP

```
// ---------- OOP ----------

// ---------- CONSTRUCTOR ----------

// DEFAULT CONSTRUCTOR

class Cat {
    DateTime birthday; // default constructor is here even if not explicitely mentioned
}

// NAMED CONSTRUCTOR

class Cat {
    DateTime birthday; // named constructor
    Cat.baby() {
        birthday = DateTime.now();
    }
}

// REDIRECTING CALL TO MAIN CONSTRUCTOR

class Cat {
    DateTime birthday;
    Cat(this.birthda); // main constructor
    Cat.withBirthday(DateTime Birthday): this(birthday); // delegating call to main constructor
}

// ---------- OBJECT ----------

// CREATING AN IMMUTABLE OBJECT

class CatTreat {
    final num quantity;
    constant CatTreat(this.quantity)
}

// ---------- GENERATOR ----------
    // lazily produces a sequence of values

// SYNCHRONOUS GENERATOR 
    // returns an iterable object

Iterable<Cat> kittens(int toSpawn) sync* {
    int kittenIndex = 0;
    while (kittenIndex < n) {
        kittenIndex++;
        yield Cat.baby();
    }
}

// ASYNCHRONOUS GENERATOR
    // returns a stream object

Stream<Cat> kittens(int toSpawn) async* {
    int kittenIndex = 0;
    while (kittenIndex < n) {
        kittenIndex++;
        yield Cat.baby();
    }
}

// ---------- ENCAPSULATION ----------
    // encapsulation occurs at a library level and not class level
    // dart has no access-modifier keywords like public, protected or private
    // _ => specifies a variable, constant or final is private to its library

// ---------- INTERFACE ----------
    // implements => allows interfaces to be implemented for a specific class, comma delimited if more than one

class identifier implements interface-1, interface-2, interface-3
```

## Null-safety

```
// ----------- NULL-SAFETY ----------
    // variable values are non-nullable by default, null has to be explicitly allowed and stated
    // ? => used alongside a value's type declaration to indicate that variable, final or constant can have a null value
    // ! => appended to a value to indicate a variable will never store the value null

int? thisIntMightBeNull = null; // no error will be thrown at compile time
String? country = "USA"; // variable country might store a null value
String myCountry = country!; // throws an error as myCountry is non-nullable by definition, but country might store a null value

// LATE
    // late => specifies a value will be initialised later upon access, despite not being initialised upon declaration
    // late final => a value that will be initialised later upon access but can only be assigned once

late String country; // late variable that is by default non-nullable
print(value); // this throws a runtime error if you try to run it
country = "USA"; // subsequent assignment of country late variable

late final String anotherCountry; // a late final variable that is by default non-nullable but can only have a value assigned once
anotherCountry = "USA";
print(anotherCountry); // this is working since value assigned already, no error is thrown
anotherCountry = "India"; // an error is thrown since the final local variable cannot be reassigned 
```

## More on

* abstract classes
* mixins
* asynchronous programming
* future
* async
* await
* isolates & concurrency
* dart run
* dart compile
* [install dart](https://dart.dev/get-dart)
* [dart documentation](https://dart.dev/tutorials)
* [learn dart in y minutes](https://learnxinyminutes.com/docs/dart/)
* [learn dart in 30 minutes](https://medium.com/nerd-for-tech/dart-for-dummies-learn-dart-in-30-minutes-e212328b81f0)
