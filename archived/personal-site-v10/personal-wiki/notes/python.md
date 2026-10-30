---
category: Tech
---
# Python

# `Python`

If coding were natural.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

"""
this is a 
multi-line
comment
"""
```

## Printing

```
# ---------- PRINT ----------
    # print() => receives a string argument which is then displayed to the stdout and includes a newline by default  
        # end='' => second optional argument which specifies for a string to be printed without a newline
        # f"' => specifies a formatted string which affords interpolation of variables and values specified within {} curly braces in a string

print("this includes a newline by default and its inclusion must be specified as here\n")
print("this does not include a newline automatically", end='')

a_name = "keshi"
print(f"here, the name {a_name} is interpolated in the string")
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # Python scripts end in the .py file extension
    # loosely, dynamically-typed language
    # simple syntax that's easy to pick up and start writing code in 
    # Python generally adheres to the snake_case naming scheme 
    # mature community with extensive machine-learning packages allows Python to excel at data science tasks
```

## Types

```
# ---------- TYPE ----------
    # bool => True, False
    # int => stores an integer number value (eg. 1, 100, -100)
    # float => stores a floating-point number value (eg. 1.0, 100.5)
    # str => string value declared within "" double quotation marks
        # note that characters are handled as strings in Python
        # also note that strings are treated as character lists, so they can be iterated over with for loops and higher-order functions
    # list => an ordered mutable sequence of elements of the same datatype
    # tuple => an ordered immutable sequence of elements of multiple datatypes
    # dict => an unordered collection of key-value pairs of datatypes that follow the established type signature
    # set => an unordered collection of unique elements of the same datatype
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => division
    # // => integer division
    # % => modulo operator
    # ** => exponentiation operator
    # += => addition and reassignment operator
    # -= => subtraction and reassignment operator
    # *= => multiplication and reassignment operator
    # /= => division and reassignment operator
    # %= => modulo and reassignment operator
    # **= => exponentiation and reassignment operator

# LOGICAL OPERATORS
    # and => logical AND
    # or => logical OR
    # not => logical NOT

# COMPARISON OPERATORS
    # == => complete strict equality check for both value and type
    # != => complete strict inequality check for both value and type
    # is => exact identity check for whether two variables point to the same object in memory 
    # in => membership check for whether a specified element exists within a sequential data structure 
    # > => comparison operator 
    # < => comparison operator 
    # >= => comparison operator 
    # <= => comparison operator
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# ----- CONDITIONALS -----

# IF ELIF ELSE

age = 75
if age >= 75:
    print("you're a senior citizen")
elif age == 18:
    print("you're just an adult")
else:
    print("you're not even a senior")

# ----- LOOPS -----

# WHILE LOOPS

count = 0
while count < 5:
    print(count)
    count += 1

# FOR IN LOOPS
    # allows for iteration over iterable data structures like lists, tuples, or strings

for i in range(5):
    print(i)

animals = ["cat", "dog", "bird", "elephant"]
for animal in animals:
    print(animal)

# TRY EXCEPT FINALLY
    # try => wraps code that might raise exceptions
    # except => handles exceptions if they occur
    # finally => always executes at the end of a try except finally construct regardless of whether any exceptions occur

try:
    x = int(input("enter a number: "))
    y = int(input("enter another number: "))
    z = x / y
    print(f"result: {z}")
except ZeroDivisionError as e:
    print("cannot divide by zero!")
except ValueError as e:
    print("please enter a valid number!")
finally:
    print("this will always print!")
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# LIST
    # [] => declares and creates a mutable ordered sequence of elements of the same datatype
    # .append() => appends an element to the list
    # .remove() => removes the first matching element from the list
    # .pop() => removes an element at a specific index
    # .extend() => extends the list by appending elements from another list
    # .insert() => inserts an element at a specific index
    # .clear() => removes all elements from the list
    # len() => returns the length of the list

fruits = ["apple", "banana", "cherry"]
fruits.append("orange")
fruits.remove("banana")
print(fruits[1]) # prints "cherry"

# TUPLE
    # () => declares and creates an immutable ordered sequence of elements of multiple datatypes

coordinates = (10, 20)
print(coordinates[0]) # prints 10

# DICTIONARY
    # {} => declares and creates a collection of key-value pairs where the elements adhere to the previously established type signature
    # .get() => retrieves a value by its key
    # .keys() => returns all keys in the dictionary
    # .values() => returns all values in the dictionary
    # .items() => returns all key-value pairs as tuples
    # .update() => updates the dictionary with elements from another dictionary or iterable of key-value pairs
    # .pop() => removes a key-value pair by key

person = {"name": "John", "age": 30}
print(person["name"]) # prints "John"
print(person.get("age")) # prints 30

# SET
    # {} => declares and creates an unordered collection of unique elements of the same datatype
    # .add() => adds an element to the set
    # .remove() => removes a specified element from the set
    # .union() => returns the union of two sets
    # .intersection() => returns the intersection of two sets
    # .difference() => returns the difference between two sets

unique_numbers = {1, 2, 3, 3, 4}
unique_numbers.add(5)
print(unique_numbers) # prints {1, 2, 3, 4, 5}
```

## Functions

```
# ---------- FUNCTIONS ----------
    # def => declares a function
    # return => specifies the return value of the function

def greet(name): # named function definition
    return f"Hello, {name}!"

print(greet("Alice")) # prints "Hello, Alice!"

# DEFAULT PARAMETERS
    # default values can be specified in function arguments the same way as any other variable with the = assignment operator

def greet(name="Stranger"): # named function definition with default parameters
    return f"Hello, {name}!"

print(greet()) # prints "Hello, Stranger!"

# VARIABLE LENGTH ARGUMENTS
    # *args => allows passing a variable number of positional arguments
    # **kwargs => allows passing a variable number of keyword arguments

def print_args(*args): # named function definition with variable length positional arguments
    for arg in args:
        print(arg)

def print_kwargs(**kwargs): # named function definition with variable length keyword arguments
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_args(1, 2, 3) # prints 1, 2, 3 on separate lines
print_kwargs(name="Alice", age=30) # prints "name: Alice" and "age: 30" on separate lines

# LAMBDA FUNCTIONS
    # anonymous functions can also be defined with the `lambda` keyword
    # these are more useful for general shorthand utility throw-away functions
    # however, their inclusion mean higher-order functions are also theoretically supported and fully possible in Python

add = lambda x, y: x + y
print(add(2, 3)) # prints 5
```

## More on

* [python.org](https://www.python.org/)
* [Python 3.12.5 documentation](https://docs.python.org/3/)
* [learn Python in y minutes](https://learnxinyminutes.com/docs/python/)
* [object-oriented programming in Python](https://realpython.com/python3-object-oriented-programming/)
* [data science in Python](https://www.w3schools.com/datascience/ds_python.asp)
* [machine learning in Python](https://www.w3schools.com/python/python_ml_getting_started.asp)
* [NumPy](https://numpy.org/)
* [matplotlib](https://matplotlib.org/)
* [pandas](https://pandas.pydata.org/)
* [Python standard library](https://docs.python.org/3/library/index.html)
* [PyPI](https://pypi.org/)
