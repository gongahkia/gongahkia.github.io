# Julia

# `Julia`

Python-like language for numerical and scientific computing.

## Comments

```
# ----- COMMENT -----

# this is a single-line comment

"""
this is a 
multi-line
comment
"""
```

## Printing

```
# ----- PRINT -----

# print() => receives a string argument which is then displayed to the stdout without including a newline by default
# println() => receives a string argument which is then displayed to the stdout and automatically includes a newline

print("this does not have a newline and its inclusion must be explicitly specified as here\n")
println("this does have a newline automatically included already")
```

## Quickstart

```
# ----- QUICKSTART -----
    # dynamically typed language that also supports type annotations for further performance optimization
    # high-level, high-performance language for technical computing, 
    # provides familiar syntax which bears many similarities to Python
    # for quick prototyping and large-scale software development
    # ships with a JIT (just-in-time) compiler that efficiently transpiles Julia source code into native machine code
```

## Types

```
# ----- TYPE -----
    # :: => specifies the datatype of a given variable, providing type annotations within Julia

# --- SCALAR TYPES ---
    # Int => stores an integer value
    # Float64 => stores a floating-point number value
    # Bool => true, false
    # Char => stores a single Unicode character declared within '' single quotation marks

# --- COLLECTION TYPES ---
    # Array => a multi-dimensional array, the equivalent of lists in Python, declared within [] square brackets
    # Tuple => an immutable ordered collection, operating the same as tuples in Python, declared within () round brackets
    # Dict => a dictionary storing key-value pairs, operating the same as hash tables in other programming languages, declared within Dict() and () round brackets with => specifying the relationship between a given key-value pair
    # Set => an unordered collection of unique elements, operating the same as sets in Python, declared within Set([]) with a mixture of round and nested square brackets

x::Int = 10
y::Float64 = 3.14
flag::Bool = true
letter::Char = 'A'

arr = [1, 2, 3, 4, 5]
tup = (1, "two", 3.0)
dct = Dict("key1" => 10, "key2" => 20)
st = Set([1, 2, 3])
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

== # equality operator
!= # inequality operator
> # comparison operator
< # comparison operator
>= # comparison operator
<= # comparison operator

# --- LOGICAL OPERATORS ---

&& # logical AND
|| # logical OR
! # logical NOT
```

## Control structures

```
# ----- CONTROL STRUCTURE -----

# --- CONDITIONALS ---

# IF ELSE IF ELSE
    # operates the same as in Python
    # note that end is used to specify the end of the if else if else conditional construct, similar to Bash

x = 10
if x > 5
    println("x is greater than 5")
elseif x == 5
    println("x is equal to 5")
else
    println("x is less than 5")
end

# --- LOOPS ---

# FOR LOOP
    # operates the same as in Python
    # note that similar to above, end delimits the end of the for loop construct

for i in 1:5
    println(i)
end

# WHILE LOOP
    # operates the same as in Python
    # note that similar to above, end delimits the end of the while loop construct

i = 1
while i ≤ 5
    println(i)
    i += 1
end
```

## Data structures

```
# ----- DATA STRUCTURE -----
    # array: mutable indexed multi-dimensional collection of elements of the same datatype
    # tuple: immutable ordered collection of elements of multiple datatypes
    # dictionary: mutable collection of key-value pairs of the same established type signature
    # set: mutable collection of unique elements

example_arr = [1, 2, 3, 4]
example_tup = (1, "two", 3.0)
example_dict = Dict("key1" => 10, "key2" => 20)
example_set = Set([1, 2, 3])
```

## Functions

```
# ----- FUNCTION -----
    # function <function_name> (<function_parameter(s)>) <function_body> end => specifies and declares a named function
    # return => explicitly specifies the return value or expression of a function within the function body

function add(a, b) # function definition
    return a + b
end
result = add(2, 3) # calling the above defined named function add

function greet(name="World") # functions can also be called with default parameters
    println("Hello, $name!")
end
greet("Alice") # this evaluates to "Hello, Alice!"
greet() # this evaluates to "Hello, World!"
```

## More on

* [learn Julia in y minutes](https://learnxinyminutes.com/docs/julia/)
* [Julia documentation](https://docs.julialang.org/en/v1/)
* [julialang.org](https://julialang.org/)
