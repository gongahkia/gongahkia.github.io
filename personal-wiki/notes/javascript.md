---
category: Tech
---
# JavaScript

# `JavaScript`

## Comments

```
// single line comments
/* Multiline
comments
are 
like
this */
```

## Print statement

```
console.log("hello");
```

## Variable

* var
* const

```
// VAR
    // var creates a variable within the scope the variable is defined in
    // omission of var will create a variable within the global scope
    // a variable's value can be reassigned after assignment

var aVariable = 1500; 
aVariable = 10; // variable reassignment

// CONST
    // const creates a constant within the scope the constant is defined in
    // a constant's value cannot be reassigned after assignment

const water = "melon"; 
```

## Types

* number
* string
* boolean
* null
* undefined

```
// ---------- NUMBERS ----------
    // the number data type covers integers, floats and doubles
    // 64-bit IEEE 754 double, a 52-bit mantissa
    // stores integers up to 9x10^15 

a = 1; // this is a number
b = 1.5; // this is also a number

// ARITHMETIC OPERATORS

a + b; // addition
b - a; // subtraction
a * b; // multiplication
a / b; // division
a % b; // modulo
(a + b) * a; // parentheses
a += b; // addition and reassignment shorthand
a -= b; // subtraction and reassignment shorthand
a *= b; // multiplication and reassignment shorthand
a /= b; // division and reassignment shorthand
a %= b; // modulo and reassignment shorthand
a ++; // increment by one
a --; // decrement by one
Infinity; // result of 1/0
-Infinity; // result of -1/0
Nan; // Not a Number, result of 0/0

// ---------- BOOLEAN ----------

c = true;
d = false;

// ---------- STRINGS ----------
    // single ('') or double ("") quotes are both accepted

e = 'this is a string';
f = "this is also a string";

// STRING METHODS

// STRING CONCATENATION
    // + for string concatentation 
    // works for diff data types besides strings

i = "Hello " + "World"; // "Hello World"
j = "Hello " + 1 + " World"; // "Hello 1 World"
k = "Hello " + ["World ", 100]; // "Hello World 100"

// STRING SLICING
    // .charAt()
    // .substring()

"This is a string".charAt(0); // returns "T"
"Hello world!".substr(0,5); // returns "Hello"

// STRING LENGTH
    // .length

"Hello".length; // returns 5

// ---------- OTHERS ---------- 

l = null; // indicates deliberate non-value
m = undefined; // indicates a value is currently absent but intended to be filled later'

// false, null, undefined, NaN, 0, "" evaluate to false
// everything else evaluates to true

// ---------- LOGICAL OPERATORS ----------

g = !true; // false
h = !false; // true
1 === 1; // COMPLETE EQUALITY of value and type
1 !== 1; // COMPLETE INEQUALITY of value and type
1 == "1"; // PARTIAL EQUALITY of value
null != undefined; // PARTIAL EQUALITY of value

// COMPARISON OPERATOR

1 < 10; // true
1 > 10; // false
2 <= 2; // true 
2 >= 2; // true
```

## Data structures

* array
* object

```
// ---------- ARRAY ----------
    // Javascript arrays allow storing multiple values of different data types together with []

var myArray = ["Hello", 45, true];

// ARRAY METHODS

var yes = myArray[1]; // square bracket notation to obtain array elements via index, arrays are zero-indexed
myArray.length; // returns the length of the array
myArray.push("neat"); // appends an element to the array
myArray.unshift("ass"); // add value as first element to the array
myArray.shift(); // removes first element from array and returns it
myArray.pop(); // removes last element from array and returns it
myArray.join(";"); // joins all elements in an array with semicolon
myArray.slice(1,4); // allows indexing of multiple elements from an array to create a subarray
myArray.splice(2,4,"hello","the","world"); // removes 4 elements from the array from index 2, and inserts the subsequent specified 3 elements at index 2, then returns the removed subarray of 4 elements

// ---------- OBJECTS ----------
    // similar to Python dictionaries and C structs, storing key-value pairs
    // object keys are always strings, but they can be created without quotation marks
    // object values can be accessed via their keys using square bracket [] or . dot notation

var anObject = {
    key1: "hello",
    key2: "goodbye
    key3: 1000,
    key4: true
};

anObject["key1"]; // "hello"
anObject.key2; // "goodbye"
anObject.key5 = "lovely and thanks"; // can assign new keys to objects as well

// objects can contain functions

var myObject = {
    water:"melonsugarhigh";
    myFunc: function() {
        return "hello world";
    }
    harry: function() {
        return this.water; // .this operates similar to .self in python objects
    }
};

myObject.myFunc(); // returns "hello world"
myObject.harry(); // returns "melonsugarhigh"
```

## Logic and control structures

```
// CONDITIONAL CHECKS
    // if
    // else
    // else if
    // && logical and
    // || logical or 
    // switch case

var count = 1;
if (count === 3){
    // do something    
} else if (count === 4 || count === -500 && count < 0){
    // do something else
} else {
    // do something else instead
};

var grade = "B";
switch (grade) {
    case "A":
        // do something if A
        break; // REMEMBER to include the break statement otherwise the logic will fall through
    case "B":
        // do something if B
        break
    case "C":
        // do something if C
        break;
    default: // default case, similar to the catch-all operator in Rust _
        break;
};

// LOOPS
    // while
    // do while
    // for
    // for in
    // for of
    // break

while (true) {
    // do something that will create an infinite loop
};

do {
    count ++;
    break // breaks out of the loop
} while (count !== 3);

for (var i = 0; i < 5; i++){
    // do something 5 times
};

// FOR IN 
    // used to iterate over key-value pairs in an object

var anotherObject = {
    name: "Kirby",
    age: 18,
    old: false
};

for (var x in anotherObject) {
    console.log(x);
    // do something else for every key-value pair in the object
};

// FOR OF
    // used to iterate over elements in other iterable objects

var pets = ["cat", "dog", "hamter", "hedgehog"];
for (var pet of pets) {
    console.log(pet); 
    // do something else for every element in the array
};
```

## Functions

```
function myFunction() {
    console.log("ass");
}

function myOtherFunction(thing) {
    return thing.toUpperCase();
}
```

## Flavours

JavaScript also comes in many other flavours.

* TypeScript
* Elm
* CoffeeScript
* PureScript
* PogoScript
* [etc.](https://gist.github.com/matthiasak/c3c9c40d0f98ca91def1)

## More on

* constructors
* prototypes
* [javascript documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [learn javascript in y minutes](https://learnxinyminutes.com/docs/javascript/)
* [learn typescript in y minutes](https://learnxinyminutes.com/docs/typescript/)
* [learn elm in y minutes](https://learnxinyminutes.com/docs/elm/)
* [learn coffeescript in y minutes](https://learnxinyminutes.com/docs/coffeescript/)
* [learn purescript in y minutes](https://learnxinyminutes.com/docs/purescript/)
* [learn pogoscript in y minutes](https://learnxinyminutes.com/docs/pogo/)
