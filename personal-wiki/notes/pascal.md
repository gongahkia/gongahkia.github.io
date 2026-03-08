# Pascal

# `Pascal`

Small language encouraging structured programming and data structuring.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

{
this is a 
multi-line
comment
}
```

## Printing

```
// ---------- PRINT ----------
    // Write => prints a string and does not include a newline in the output
    // WriteLn => prints a string and appends a newline to the output

Write('this does not include a newline by default and we must explicitl specify it\n');
WriteLn('this includes a newline automatically');
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // executable program code is written within the main program block, an indented block of code that is the equivalent of the main function in other languages
    // program => declares a pascal program name, included at the start of a pascal source file
    // begin => specifies the beginning of the main program block
    // end. => specifies the end of the main program block and must end in a period

program learning_pascal;
begin 
    // add your code here within the main program block
end.
```

## Variables and Constants

```
// ---------- VARIABLE ----------
    // conventionally variables and their types are declared before the main program, and have values assigned to them within the main program
    // var => declares and creates a variable or a variable block, where a variable's value can be reassigned after initial assignment and at runtime
    // : => used to specify a variable's data type
    // := => assignment operator, to assign a value to a previously declared variable, normally used within the main program

var a:integer;
var b:integer; // this is valid pascal code to declare a variable by itself

var 
    c:string;
    d:string; // this is also valid pascal code by declaring variables within a variable block

var e,f:boolean; // this is also valid pascal code to declare mutliple variables of the same type together

begin 
    a := 1;
    b := 255;
    c := 'watermelon';
    d := 'ok thanks';
    e := true;
    f := false;
end. // variable declaration occurs outside the main program block within the variable block, and variable assignment occurs within the main program block

// ---------- CONSTANT ----------
    // const => declares and creates a constant or a constant block, whose value cannot be reassigned after initial assignment or at runtime
    // constant names are uppercase by convention

const 
    PI = 3.141519252654;
    HARRY = 'watermelon sugar low';
```

## Types

```
// ---------- TYPE ----------
    // integer => 16-bit integer number limited within the range -32,768 to 32,767
        // byte => integer number limited within the range 0 to 255
        // shortint => integer number limited within the range -128 to 127
        // smallint => integer number that is the standard int when the integer type is assigned
        // word => integer number limited within the range 0 to 65,535
        // longint => integer number limited within the range -2,147,483,648 to 2,147,483,647
        // longword => integer number limited within the range 0 to 4,294,967,295
        // cardinal => longword
        // int64 => integer number limited within the range -9223372036854775808 to 9223372036854775807
        // qword => integer number limited within the range 0 to 18,446,744,073,709,551,615
    // real => real number limited within the range 3.4E-38 to 3.4E38
        // single => real number limited within the range 1.5E-45 to 3.4E38
        // double => real number limited within the range 5.0E-324 to 1.7E308
        // extended => real number limited within the range 1.9E-4932 to 1.1E4932
        // comp => real number limited within the range -2E64+1 to 2E63-1
    // boolean => true, false
    // char => 8-bit char, declared using '' single quotation marks
    // string => char array with a default length of 255
        // [] => specifies the maximum length of the string by the maximum number of char allocated for the string, minimizing memory usage overall
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => division
    // div => floor division
    // mod => modulo operator

// LOGICAL OPERATORS
    // and => logical and
    // or => logical or
    // not => logical not

// COMPARISON OPERATORS
    // = => complete equality check for value and type
    // <> => complete inequality check for value and type
    // < > <= >= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// ---------- CONDITIONALS ----------

// IF ELSE IF ELSE

var 
    age:Integer;

begin

    age := 20;
    if age < 20 then
        WriteLn('age is smaller than 20');
    else if age > 20 then
        WriteLn('age is larger than 20');
    else
        WriteLn('age is equals to 20');

// CASE OF ELSE END
    // case of => declares a case block, pascal's equivalent to match case statements in other languages, with of beginning the case statements block
    // else => used to specify the default case if logic falls through all other cases
    // end => specifies the end of the case block

    case age of
        1: WriteLn('Monday');
        2: WriteLn('Tuesday');
        3: WriteLn('Wednesday');
        4: WriteLn('Thursday');
        5: WriteLn('Friday');
        6: WriteLn('Saturday');
        7: WriteLn('Sunday');
    else
        WriteLn('Invalid day');
    end;

end.

// ---------- LOOPS ----------

// FOR LOOP
    // for => creates a for loop that iterates over a specified range of values
    // to => specifies the loop range and seperates the starting and ending value 
    // do => specifies the logic within each iteration of the loop

for age := 1 to 5 do
    Write(age); // prints out 12345 to the stdout

// WHILE LOOP
    // while => specifies the while loop condition
    // do => specifies the logic within each iteration of the while loop
    // begin, end => used to mark the beginning and end of the while loop block

age := 1;
while age <= 5 do
begin
    write(age);
    Inc(age); // increments the value of the integer variable age by one
end; // prints out 12345 to the stdout

// REPEAT UNTIL LOOP
    // pascal's equivalent of a do while loop in other languages
    // repeat => marks the beginning of a repeat until loop block
    // until => specifies the repeat until loop condition and marks the end of a repeat until loop block

age := 1;
repeat
    write(age);
    Inc(age); // increments the value of the integer variable age by one
until age > 5; // prints out 12345 to the stdout
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // ordered sequence of elements of the same type
    // array => declares and creates an array of a specified range and element type

var
    numbers: array[1..5] of integer;

// SET
    // collection of unique elements of the same type
    // set => declares and creates a set and specifies all possible values that can be found within the set

var
    colors: set of (Red, Green, Blue);

// RECORD
    // user-defined collection of elements of different types under a specified name
    // record => declares and creates a record within which all its fields and their respective types are specified

type
    Person = record
        FirstName: String;
        LastName: String;
        Age: Integer;
    end;
```

## Functions

```
// ---------- FUNCTION ----------
    // pascal functions do not have implicit return, instead the function name is the variable name to be returned within the function
    // function => declares and creates a function block where the parameter and return types are specified
    // begin, end => used to mark the beginning and end of a function block

function Square(x:integer):integer;
begin
    Square := x * x; // here, Square is the variable to be returned given the function name is also specified to be Square
end;

function Add(x,y:integer):integer;
begin
    Add := x + y; // here, Add is the variable to be returned and that is specified in the function name
end;
```

## More on

* type
* enumerations
* pointers
* ranges
* procedure
* [learn pascal in y minutes](https://learnxinyminutes.com/docs/pascal/)
* [pascal documentation](https://www.freepascal.org/docs.html)
