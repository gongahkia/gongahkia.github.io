# TypeScript

# `TypeScript`

JavaScript with type safety.

## Installation and Usage

```
# ---------- INSTALLATION ----------
    # always install typescript as a local dependancy

npm install typescript --save-dev # installs typescript as a local dependancy within your project directory
npx tsc --init # initializes the tsconfig.json file

# ---------- USAGE ----------

npx tsc # transpiles a typescript file to javascript
npx tsc -w # puts typescript compiler in watchmode and it will recompile the typescript project whenever a change is detected
node helloWorld.js # node runs the compiled javascript file
```

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is 
a multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // console.log => prints a string to the stdout and appends a newline to the output
    // process.stdout.write() => prints a string to the stdout and does not include a newline

process.stdout.write("this does not include a newline by default and we must explicitly specify it\n");
console.log("this prints to the stdout and automatically includes a newline");
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // let => declares and creates a variable with a mutable value, whose value can be reassigned after initial assignment
    // const => declares and creates a constant with an immutable value, whose value cannot be reassigned after initial assignment
    // : => used to specify the type of a variable or constant upon declaration

// ---------- CALLING API ----------
    // await fetch() => fetches a specified url and waits for the values stored at said url to be determined prior to advancing with the code
    // await response.json() => parses the retrieved data as a typescript object, similarly waits for values to be read in as an object before proceeding

async function getData (targetUrl:string) {
    const response = await fetch(targetUrl);
    const data = await response.json();
    console.log(data);
}
```

## Types

```
// ---------- TYPE ----------
    // typescript can infer datatypes, but it is good practice to declare them for readibility
    // typeof => returns the datatype of the specified value
    // string => declared with "" double quotation marks
    // number => covers int, float and double 
    // boolean => true, false
    // any => flexible datatype that ignores type checking for the specified value
    // null, undefined => special value representing absence of a value
    // | => declares and creates a union datatype with the | pipe separating each possible type, a variable with multiple possible datatypes with different behaviours for each
        // never => when all possible options in a union are eliminated

const numOfDoors: string | string[]; // declares a union datatype, where numOfDoors can either hold a string or an array of strings

onReceiveData(data: string | number) {
    console.log(typeof data);
    if (typeof data === "number") {
        return data + 12;
    } else if (typeof data === "string") {
        return data.toUpperCase();
    }
} // union datatypes can also be applied to function parameters within the function definition
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

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => partial equality check for value
    // != => partial inequality check for value
    // === => complete equality check for value and type
    // !== => complete inequality check for value and type
    // > < >= <= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS
    // break and continue operate as you'd expect in other programming languages

// IF ELSE IF ELSE

let x:number = 10;
if (x > 5) {
    console.log("x is greater than 5");
} else if (x < 5) {
    console.log("x is smaller than 5");
} else {
    console.log("x is equals to 5");
}

// SWITCH CASE DEFAULT BREAK 
    // remember to include break below each case statement, otherwise logic will fall through to the next condition
    // default => specifies the default case if all other cases fall through

let day:string = "Monday";
switch (day) {
    case "Monday":
        console.log("Monday");
        break;
    case "Tuesday":
        console.log("Tuesday");
        break;
    default:
        console.log("not Monday or Tuesday");
}

// LOOPS

// FOR LOOP
    // rudimentary for loop implementation as in other languages

for (let i:number = 0; i < 5; i++) {
    console.log(i);
}

// FOR OF LOOP
    // used to iterate over elements within an iterable data structure

let numbers:number[] = [1, 2, 3, 4, 5];
for (let num of numbers) {
    console.log(num);
}

// FOREACH LOOP
    // also used to iterate over elements within an iterable data structure

let numbers:number[] = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
    console.log(num);
});

// WHILE LOOP

let counter:number = 0;
while (counter < 5) {
    console.log(counter);
    counter++;
}

// DO WHILE LOOP

let num:number = 0;
do {
    console.log(num);
    num++;
} while (num < 5);
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // [] => declares and creates an array of a specified data type, a dynamically-sized ordered sequence of elements of multiple types
    // Array<{ELEMENT TYPE}> => this is an alternative syntax to initialize an array
    // Any => used to specify an array that stores elements of multiple datatypes

const myArray:number[] = [1,2,3,4,5];
const myArray2:Array<number> = [2.13,4.50,1];
const anyArray: Array<any> = [12,"thirteen",false]; // initializes an array with multiple data types

// TUPLE
    // [] => declares and creates a tuple of specified data types, a fixed-size ordered sequence of elements of multiple types
    // tuple elements can be reassigned, as long as there are no type errors caused by reassignment and values cannot be added or removed from a tuple after intialization

let myTuple:[number, string] = [2000,"ok bet"]; // notice each element of the tuple has their type specified
myTuple[0] = 14;
myTuple[1] = "steve"; // value reassignment is allowed in tuples as long as no conflict in datatype is caused by the reassignment

// ENUM
    // enum => declares and creates an enum data structure within {} curly braces, operates similarly to an implict associative array like in PHP or a table in Lua, where an integer value is then assigned to each enum member

enum foods {"bacon","tomato","lettuce"};
console.log(foods[1]); // this prints out "tomato" to the console
console.log(foods.lettuce); // this prints out 2 to the console
console.log(foods["bacon"]); // this prints out 0 to the console

// TYPE
    // type => creates a custom datatype that can later be specified as a type of a variable or constant, often used similarly to structs in other languages
    // types can specify fields of a given type and methods and their parameter and return types
    // types cannot be redeclared to add more properties and methods after initial declaration

type calculator = {
    names: string[],
    hobbies: string[],
    output: (test:booelan) => string[]; // methods can be included in a created type, wherein the method parameter and return type are specified
}

let instrument:calculator = {
    names: ["ah","shit","here","we","go"],
    hobbies: ["having fun","talk cock sing song"],
    output: (test) => {
        return test + this.hobbies;
    }
} // this creates a new variable off the previously declared type

// INTERFACE
    // interface => creates a custom datatype as a template that can then be extended, including interface attributes and methods
    // extend => copies attributes and methods from one interface to another interface
    // implements => implements a specified interface's attributes and methods on a class
    // ? => specifies an optional paramater within an interface
    // interfaces can be extended to allow for further inclusion of properties and methods after initial declaration

interface exampleInterface {
    x: number,
    y: number,
    z?: string,
    output: (test:boolean) => string[];
}

const obj1: exampleInterface {
    x: 123;
    y: 456;
    output: (test) => {
        if (test) {
            return ["ok", "ok", "okok", "kanye"];
        } else {
            return ["aight", "poopy pants"];
        }
    }
}

const obj2; exampleInterface {
    x: 789;
    y: 101112;
    z: "ah shit";
    output: (test) => {
        return [test.toString() + "okie", "ok"];
    }
}
```

## Functions

```
// ---------- FUNCTION ----------
    // function => declares and creates a named function with its parameter and return types specified within the function definition
    // => => declares and creates a lambda anonymous function (arrow function) with its parameter types specified within the function definition

function subtract(x: number, y: number): number {
    return x - y;
} // creating a named function subtract with its parameter and return types specified

function voidLog(): void {
    console.log("shit");
} // a named function with void as its return type

const add = (x: number, y: number) => x + y; // creating an anonymous function where the return type is inferred

subtract(100, 10);
voidLog(); 
add(1000, 2.1238); // function calls operate as you'd expect
```

## More on

* overloaded functions
* generics
* destructuring
* intersection types
* OOP
* typecasting
* [learn typescript in y minutes](https://learnxinyminutes.com/docs/typescript/)
* [typescript cheatsheet](https://www.typescriptlang.org/cheatsheets)
