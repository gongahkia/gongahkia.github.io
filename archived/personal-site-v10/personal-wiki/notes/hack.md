---
category: Tech
---
# Hack

# `Hack`

PHP dialect developed by Facebook *(now [Meta](https://about.meta.com/) in 2024)*.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

/*
this is 
a multi-line 
comment
*/
```

## Printing

```
// ----- PRINTING -----
    // echo => language construct that receives one or more comma-delimited parameters to display to the stdout, and does not include a newline 
    // print => function that receives a single argument to print to the stdout, and does not include a newline

echo "hello", "world!", "\n";  
print "hello hack!\n";  
```

## Quickstart

```
# ----- QUICKSTART -----
    # semicolon language that provide strong interoperability with existing PHP code
    # statically, strongly typed  
    # variables are prefixed with the $ dollarsign character similar to PHP

sudo apt install hhvm # installs the HipHop Virtual Machine (HHVM)
hhvm main.hack # interprets and executes Hack code
```

## Types

```
// ----- TYPE -----
    // int => integer value
    // float => floating point value
    // bool => boolean value (true, false)
    // string => string value specified within "" double quotes, characters are also strings
    // null => type for the special null value (indicates an absence in value)
    // void => specifies a function that returns no value, similar to other C-style languages
    // mixed => any type, the hack interpreter will infer the type
    // num => union type that represents both an integer or float
    // ? => nullabe type indicates that a given value might be null or the specified datatype

$anInt = 25;
$aFloat = 19.99;
$aBool = true;
$aString = "watermelon";
$aNull = null;

function aMixedFunction(mixed $value): void {
    // code that does something with mixed type
}

function aNumFunction(num $a, num $b): num {
    return $a + $b;
}

function aNullableFunction(int $id): ?string {
    if ($id === 1) {
        return "Alice";
    }
    return null;
}
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATOR ---

+ // addition
- // subtraction
* // multiplication
/ // divison
% // modulo

// --- COMPARISON OPERATOR ---

=== // complete true equality, including type and place in memory
!== // complete true inequality, including type and place in memory
== // complete equality, including type
!= // complete inequality, including type
< // comparison operator
> // comparison operator
<= // comparison operator
>= // comparison operator

// --- LOGICAL OPERATOR ---

&& // and
|| // or
! // not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSEIF ELSE 

if ($a > $b) {
    echo "a is greater than b";
} elseif ($a < $b) {
    echo "b is greater than b";
} else {
    echo "a equals to b";
}

// SWITCH CASE DEFAULT 
    // equivalent of case when and match case in other languages
    // allows for some degree of pattern-matching
    // note the break statement at the end of each case

switch ($a) {
    case 10:
        echo "a is 10";
        break;
    default:
        echo "a is not 10";
}

// --- LOOPS ---

// WHILE LOOP
    // conventional C-style while loop with explicit break condition

$i = 0;
while ($i < 5) {
    echo $i;
    $i++;
}

// FOR LOOP
    // conventional C-style for loop

for ($j = 0; $j < 5; $j++) {
    echo $j;
}

// FOREACH AS LOOP
    // similar to PHP

$anArr = vec[1, 2, 3];
foreach ($anArr as $value) {
    echo $value;
}
```

## Data structures

```
// ----- DATA STRUCTURE -----

// --- COMPOSITE TYPES ---
    // array => collection of integer-indexed values, rarely used
        // array() => declares a new array literal
    // vec => ordered collection of values, similar to arrays in PHP
        // vec[] => declares a new vector literal
    // dict => unordered collection of key-value pairs with integer or string keys, where relationship between keys and values are specified with => similar to PHP
        // dict[] => declares a new dictionary literal
    // keyset => unordered set collection of unique values, equivalent to sets in Python
        // keyset[] => declares a new keyset literal

$anArray = array("apple", "banana", "cherry");
$aVec = vec[1, 2, 3];
$aDict = dict[
    "name" => "Alice",
    "age" => 30
];
$aKeyset = keyset[1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// --- COLLECTION TYPES ---
    // vector => mutable ordered collection of values
        // Vector{} => declares a vector literal
    // map => mutable unordered key-value collection of values where keys can be of ANY datatype, where relationship between keys and values are specified with => similar to PHP
        // Map{} => declares a map literal
    // set => mutable collection of unique values, equivalent to sets in Python
        // Set{} => declares a set literal

$aVector = Vector {1, 2, 3};  
$aMap = Map {'name' => 'Alice', 'age' => 30};  
$aSet = Set {1, 2, 3};  

// --- COMPLEX TYPES ---
    // shape => declares a user-defined datatype with a fixed collection of fields, equivalent to structs in Rust and Go and type aliases in Typescript, with the datatype of each field specified with a => and being comma-delimited
        // shape() => declares a struct literal
    // enum => declares an enumeration datatype with a fixed set of possible values, where each enumerated value is UPPERCASE by convention
        // enum() => declares an enum literal

type Coordinate = shape(
    "x" => int,
    "y" => int,
);

enum Day: int {
    MONDAY = 1;
    TUESDAY = 2;
    WEDNESDAY = 3;
    THURSDAY = 4;
    FRIDAY = 5;
    SATURDAY = 6;
    SUNDAY = 7;
}
```

## Functions

```
// ----- FUNCTION -----
    // function <functionName>(<parameterType> <parameterName>): <returnType> => declares a function with the function name, parameters and their datatypes, and function return datatype
    // function(<parameterType> <parameterName>): <returnType> => declares an anonymous function that can be assiged to a variable

function multiply(int $x, int $y): int {
    return $x * $y;
}

$anAnonymousFunction = function(int $z): int {
    return $z * $z;
};
```

## More on

* [hack documentation](https://hacklang.org/)
* [learn hack in y minutes](https://learnxinyminutes.com/docs/hack/)
* [generics in hack](https://docs.hhvm.com/hack/generics/introduction)
* [lambda functions in hack](https://docs.hhvm.com/hack/functions/anonymous-functions)
