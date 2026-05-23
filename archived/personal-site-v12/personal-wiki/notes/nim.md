---
category: Tech
---
# Nim

# `Nim`

Programming language that brings together the efficiency of C and the productivity of Python.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

#[
this is a 
multi-line
comment
#]
```

## Printing

```
# ---------- PRINT ----------
    # write => prints a string and does not include a newline
    # echo => prints a string and appends a newline to the output

write("this does not include a newline and we must explicitly specify it\n")
echo "this automatically includes a newline"
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # var => declares and creates a mutable variable whose value can be reassigned after initial assignment at runtime
    # let => declares and creates an immutable variable whose value cannot be reassigned after initial assignment at runtime
    # const => declares and creates an immutable constant whose value cannot be reassigned after initial assignment at compile-time
    # : => used to specify the datatype of a given value

var string1:string = "nim is"
string1.add("handsome")

let age:int = 10

const fibonacci:int = fib(30)
```

## Types

```
# ---------- TYPE ----------
    # int => integer number
    # float => floating point number
    # string => declared with "" double quotation marks
    # char => declared with '' single quotation marks
    # bool => true, false
    # .type => returns the datatype of a given variable or constant
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => division
    # mod => modulo operator

# LOGICAL OPERATORS
    # and => logical and
    # or => logical or
    # not => logical not

# COMPARISON OPERATORS
    # == => complete equality check for value and type
    # != => complete inequality check for value and type
    # > < >= <= are also comparison operators
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONALS

# IF ELIF ELSE

if 10 > 5:
    echo ("10 is larger than 5")
if "Hello" != "Hello":
    echo ("both strings are the same")
elif 27.123.type == true.type:
    echo ("they have the same data type")
else:
    echo ("none of the prior conditions met")

# CASE OF ELSE STATEMENT
    # else => functions as the default statement in the case of block

case a:
    of 0:
        echo ("a is 0")
    of 1:
        echo ("a is 1")
    of 2:
        echo ("a is 2")
    else:
        echo ("none of the previous conditions were met")

# RANGES
    # .. => creates an inclusive range on both ends that can be iterated over

echo ("Enter a number: ")
let userNumber = stdin.readLine().parseInt

case userNumber:
    of 0 .. 10:
        echo "Your number is smaller than 10"
    of 11 .. 100 
        echo "Your number is from 11 to 100"
    else:
        echo "Your number is larger than a 100"

# LOOPS

# FOR IN LOOPS
    # allows for iteration over an iterable data structure like an array or a range
    # .low => returns the lowest index within an iterable data structure
    # .high => returns the largest index within an iterable data structure

a: array[3, int] = [1, 2, 5]
for i in a:
    stdout.write(i) # this prints out 1, 2 and 5 to the stdout on the same line

for i in a.low .. a.high:
    stdout.write(a[i]) # this prints out 1, 2 and 5 to the stdout on the same line, achieved by referencing list elements by index

# WHILE LOOPS

while true:
    stdout.write("A") # an infinite loop since there is no break condition

var i = 0
while i < 10:
    if i mod 2 == 0:
        echo (i) # this will only print out even numbers
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# ARRAY
    # array[{SIZE OF ARRAY}, {ELEMENT TYPE}] => creates and declares a fixed-size ordered sequence of elements of the same type within [] square brackets
    # [..] => creates an inclusive range of indexes that can be used to slice an array

var testArray: array[3, int] = [1, 2, 3]
var anotherArray = [4.23, 5.00, 6.19] # the nim compiler can infer the data type of an array even without type annotations
var thelastArray: array[2, string]

var array1 = [0, 2, 4, 6, 8, 10]
echo (array1[0 .. 2]) # this will print out the sliced array, containing the integers 0, 2 and 4 to the stdout

# SEQUENCE
    # seq[{ELEMENT TYPE}] => creates and declares a dynamically-sized ordered sequence of elements of the same type within @[] at symbol and square brackets
    # .add() => appends a specified element to a sequence
    # .del() => deletes an element at a specified index from the sequence
    # .len() => returns the length of a specified sequence
    # [..] => creates an inclusive range of indexes that can be used to slice a sequence

var testSequence: seq[int] = @[1, 2, 3, 4, 5]
var anotherSequence = @[6.239, 7.432, 8.412, 9.312, 10.123] # the nim compiler can also infer the data type of sequences
var thelastSequence: seq[string]

var thefirstofAnotherSequence: seq[int] = @[1, 2, 3, 4]
thefirstofAnotherSequence.add(10) # this appends the int value 10 to the sequence
stdout.write(thefirstofAnotherSequence[4]) # this prints out the int 10 to the stdout

var yetanotherArray: seq[int] = @[1, 2, 3]
yetanotherArray.del(0) # this deletes the element of index 0 in the sequence
stdout.write(yetanotherArray[0]) # this prints out the number 2 to the stdout

var aSequence: seq[string] = @["aight bet", "aigh beh", "good morning", "peepl"]
echo aSequence.len() # this prints out 4, which is the length of the sequence above

var sequence1 = @[1, 3, 5, 7, 9]
echo (sequence1[0 .. 2]) # this prints out a sliced sequence containing the integers 1, 3 and 5 to the stdout

# TUPLE
    # tuple[{DATA TYPE OF EACH ELEMENT}] => creates and declares a named tuple, a fixed-size ordered sequence of key-value pairs of different types within () brackets, where the datatype of each key and value is specified within the [] square brackets, similar to dictionaries in Python
        # . => dot notation is used to access tuple values by their key
    # anonymous tuples are tuples with no named fields
    # () => creates and declares an anonymous tuple, a fixed-size ordered sequence of elements of different types within () brackets, where the datatype of each element is specified within the () brackets

var someTuple = (10, 0.55, "hello", true)
var lastTuple: (string, int, bool, float) = ("ok", 20, false, 30.21) # both of these are named tuples

var emptyTuple: tuple[name: string, age: int] # this will initialize an empty tuple with the fields name and age
var namedTuple: tuple[name: string, age: int] = ("Adam", 100) # this creates a named tuple
echo(namedTuple.name) # this will print out the string "Adam" to the stdout
namedTuple.age = 421 # reassign the int value of 421 to the field age within the namedTuple tuple variable
echo(namedTuple.age) # this will now print out the integer 421 to the stdout

# TABLE
    # .toTable => declares and creates a dynamically-sized unordered sequence of key-value pairs within {} curly braces, similar to dictionaries in Python and tables in Lua
    # .toOrderedTable => declares and creates a dynamically-sized ordered sequence of key-value pairs within {} curly braces, similar to hashmaps in other languages
    # tables are brought into the present namespace using import tables

var ioTable = {"output": stdout, "input": stdin}.toTable # note that this table is just an example, just make a note of the .toTable() procedure
var romanDigits = {'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1}.toOrderedTable

# TYPE
    # type => declares and creates a custom datatype that we can then specify as a variable or constant type, similar to structs in other languages

type 
    customTuple = tuple
        name: string
        age: int

var aTuple: customTuple = ("Andrew", 3000) # this will automatically assign the value of string "Andrew" to the field name, and the integer 3000 to the field age
```

## Procedures

```
# ---------- PROCEDURE ----------
    # nim procedures are the equivalent of functions in other programming languages
    # proc => declares and creates a procedure, with the procedure parameters and return type specified in the procedure definition
    # result => a special variable within a procedure that is returned automatically, similar to return but assigned to an explicit variable within the procedure
    # varargs[{ELEMENT TYPE}] => allows a procedure to receive a variable number of arguments of a specified type as an array

proc hello() = 
    echo ("Hello world!") # procedures can be run purely for their side-effects

proc bet(): int = 
    return 2 

proc aight(): int = 
    result = 2 # these two procedures return the same thing

proc okLah(water: string): string = 
    result =  fmt"{water} is ok"

proc payLah(water: string): string = 
    return fmt"{water} is ok" # these two procedures also return the same thing

proc multiSum(numbers: varargs[int]): int=
    var sum: int
    for num in numbers:
        sum += num
    return sum # this procedure takes in a variable number of integers as arguments, which it reads as an array 
```

## More on

* enum
* procedure overloading
* OOP
* [install nim](https://nim-lang.org/install.html)
* [nim documentation](https://nim-lang.org/documentation.html)
* [learn nim in y minutes](https://learnxinyminutes.com/docs/nim/)
