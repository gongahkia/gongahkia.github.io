# Arturo

# `Arturo`

The Swiss Army Knife programming language.

## Comments

```
# ----- COMMENT -----

# this is a single-line comment

##
this is a
multi-line
comment
##
```

## Printing

```
# ----- COMMENT -----
    # print() => receives a string as an argument and prints it to the stdout, with the output not including a newline by default
    # println() => receives a string as an argument and prints it to the stdout, including a newline automatically at the end of the output

print("this does not have a newline and one must be explicitly specified to be included as here\n")
println("this includes a newline automatically")
```

## Quickstart

```
# ----- QUICKSTART -----
    # dynamically-typed with clean and expressive code 
    # supports further functional programming paradigms if desired
    # extensive interoperability with existing systems and frameworks
    # in fact, Arturo's syntax bears many similarities to Python, particularly in its simplicity and indentation-based scope
    # Arturo is suitable for the following and more
        # scripting and automation
        # data cleansing and analysis
        # web development through server-side logic
        # rapid prototyping 
        # introduction to programming
```

## Types

```
# ----- TYPE -----
    # Integer => stores an integer number value
    # Float => stores a floating-point number value
    # String => stores a string value declared within "" double quotation marks, note that characters are handled as single-character long strings
    # Boolean => true, false
```

## Operators

```
# ----- OPERATOR -----

# --- ARITHMETIC OPERATORS ---

+ # addition
- # subtraction
* # multiplication
/ # division
% # modulo

# --- COMPARISON OPERATORS ---

== # complete equality check for both type and value
!= # complete inequality check for both type and value
> # comparison operators
< # comparison operators
>= # comparison operators
<= # comparison operators

# --- LOGICAL OPERATORS ---

and # logical and
or # logical or
not # logical not
```

## Control structures

```
# ----- CONTROL STRUCTURE -----

# --- CONDITIONALS ---

# IF ELIF ELSE

x = 10
if x > 10:
    print("x is greater than 10")
elif x < 10:
    print("x is less than 10")
else:
    print("x is equal to 10")

# MATCH CASE _
    # provides a degree of pattern-matching in Arturo, the equivalent of switch case in other programming languages
    # _ => specifies the default fall-through case within the match-case construct which runs when all other predicate case conditions have not been met

x = 42
match x:
    case 0:
        println("x is zero")
    case 1:
        println("x is one")
    case 42:
        println("x is the answer")
    case _:
        println("x doesn't match any known pattern")

# --- LOOPS ---

# FOR IN 
    # operates exactly the same as in Python, the equivalent of foreach loops in PHP
    # enabling iteration and traversal of an iterable data structure

for i in range(1, 5):
    print(i)

q = [1,2,3,4,5,6,7,8,9,10]
for elem in q:
    print(elem)

# WHILE
    # operates the same as while loop constructs in other programming languages

x = 10
while x > 0:
    print(x)
    x = x - 1
```

## Data structures

```
# ----- DATA STRUCTURE -----
    # list => dynamically-sized ordered collection of elements of the same datatype, the equivalent of arrays in other programming languages
    # dictionary => dynamically-sized unordered collection of key-value pairs of multiple datatypes with unique keys, the equivalent of maps in other programming languages

anExampleArray = [1, 2, 3, 4, 5]
anotherExampleArray = ["Alice", "Bob", "Charlie"]

anExampleDictionary = {
    "name": "Alice", 
    "age": 30, 
    "city": "New York", 
    "hobby": "Bouldering"
}
```

## Functions

```
# ----- FUNCTION -----
    # def <functionName> ( <functionParameterName(s)> ): <functionDefinitionBody> => definition and declaration of a named function
    # return => explicit return of the function's return value or expression

def add(a, b):
    return a + b

result = add(10, 20) # calling the named function
print(result)
```

## More on

* [arturo documentation](https://arturo-lang.io/documentation/getting-started/)
* [arturo github repo](https://github.com/arturo-lang/arturo)
* [learn arturo in y minutes](https://learnxinyminutes.com/docs/arturo/)
