---
category: Tech
---
# Moonscript

# `Moonscript`

Dynamically-typed scripting language that transpiles to Lua for application and game development.

## Comments

```
-- ----- COMMENT -----

-- this is a single-line comment

--<span class="broken-wikilink">this is a 
multi-line
comment</span>
```

## Printing

```
-- ----- PRINTING -----
    -- io.write() => receives a string argument that is then printed to the stdout without including a newline by default
    -- print() => receives a string argument that is then printed to the stdout and this includes a newline automatically

io.write("this does not include a newline automatically and we must explicitly specify its inclusion\n")
print("this already has a newline and we don't need to mention it")
```

## Types

```
-- ----- TYPE -----
    -- number => stores both integer and floating-point number values
    -- string => stores string values declared within "" double quotation marks, note that characters are handled as single-character long strings
    -- boolean => true, false
    -- nil => special value that represents the absence of a value, the equivalent of null or void in other programming languages
```

## Operators

```
-- ----- OPERATOR -----

-- --- ARITHMETIC OPERATORS --- 

+ -- addition
- -- subtraction
* -- multiplication
/ -- divison
% -- modulo

-- --- COMPARISON OPERATORS --- 

== -- partial equality check for value but not type
~= -- partial inequality check for value but not type
is -- thorough physical equality check for whether two objects have the same memory address
< -- comparison operator
> -- comparison operator
<= -- comparison operator
>= -- comparison operator

-- --- LOGICAL OPERATORS --- 

and -- logical and
or -- logical or
not -- logical not

-- --- BITWISE OPERATORS ---

& -- bitwise and
| -- bitwise or
~ -- bitwise not
<< -- bitwise left shift
>> -- bitwise right shift
```

## Control structures

```
-- ----- CONTROL STRUCTURE -----

-- --- CONDITIONALS ---

-- IF THEN ELSEIF THEN ELSE END
    -- observe the necessary inclusion of the end to signify termination of the conditional if elseif else construct

x = 10
if x > 10 then
    print("x is greater than 10")
elseif x < 10 then
    print("x is less than 10")
else
    print("x is equal to 10")
end

-- --- LOOPS ---

-- WHILE END
    -- observe the necessary inclusion of the end to signify termination of the while loop construct

x = 1
while x <= 5 do
    print(x)
    x = x + 1
end

-- FOR DO END
    -- observe the necessary inclusion of the end to signify termination of the for loop construct

for i = 1, 5 do -- by default, there is a step of +1 for each iteration of the for loop if it is left unspecified
    print(i)
end

for i = 10, 1, -2 do -- here there is a step of -2 for each iteration of the for loop
    print(i)
end
```

## Data structures

```
-- ----- DATA STRUCTURE -----
    -- Array => dynamically-sized ordered collection of elements of the same datatype, the equivalent of lists in Python, but note that since Moonscript transpiles to Lua, arrays are really just tables with implicit assignemnt of indexes as the table keys to each table value
    -- Dictionary => dynamically-sized unordered collection of key-value pairs of multiple datatypes, the equivalent of dictionaries in Python, and handled simply as tables in Lua via direct mapping

anExampleArray = {1, 2, 3, 4}
anExampleDictionary = {name = "Alice", age = 30}
```

## Functions

```
-- ----- FUNCTION -----
    -- <functionName> = (<functionParameter(s)>) -> <functionDefinitionBody> => declaration and definition of a named function
    -- note there is implicit return of the last expression within the function, a feature Moonscript adopts from the functional programming paradigm

square = (x) -> x * x -- definition of a named function
result = square(5) -- function call
```

## More on

* [moonscript.org](https://moonscript.org/)
* [moonscript documentation](https://moonscript.org/reference/)
* [learn moonscript in y minutes](https://learnxinyminutes.com/docs/moonscript/)
