# Lua

# `Lua`

## Comments

```
-- single-line comment

--<span class="broken-wikilink">this is 
a 
multi-line
comment</span>--
```

## Printing

```
-- ---------- PRINTING ----------
    -- print() appends a newline to the output by default
    -- io.write() does not append a newline to the output
    -- io.read() takes in user input from the stdin
    -- .. for string concatenation

print("this is just like python, it comes with a newline")
io.write("this also works, defaults to the standard out\n")

watermelon = io.read("Waiting for your input lah: ") -- assigns user input to the string variable watermelon

stringOne = "Hello "
stringTwo = "World!"

print(stringOne .. stringTwo) -- this prints "Hello World!" to the console
```

## Types

```
-- ---------- VARIABLE ----------
    -- variables are global by default
    -- local makes them local

iAmGlobal = "Gojo Satoru"
local iAmLocal = "Geto Suguru"

-- ---------- TYPE ----------
    -- number (integers, floats, doubles)
    -- string (single, double-quoted, [[]] square brackets; strings are immutable like python)
    -- boolean (true, false; only nil and false evaluate to false, everything else evalautes to true including 0 and '')
    -- nil (no data; undefined variables evalaute to nil, no error is hit)

aNumber = 42
anotherNumber = 12.890
aString = "watermelon"
aMultilineString = <span class="broken-wikilink">Double brackets for 
                      multi-line
                      string</span>
aBoolean = true
aNil = nil
foo = anUndefinedVariable -- this evaluates to nil and the program continues running

-- TYPE CONVERSION 

tostring() 
tonumber()
.. -- string concatenation have implicit type conversion from number to string, though for greater readability we try to avoid this as far as possible
+ - * / -- arithmetic operations have implicit type conversion from boolean to number, true => 1 and false => 0, though for greater readability we try to avoid implicit type conversions as far as possible
```

## Operators

```
-- ---------- OPERATOR ----------

-- ARITHMETIC OPERATOR

+ -- addition
- -- subtraction
* -- multiplication
/ -- divison
% -- modulo
^ -- exponentiation (to the power of)

-- RELATIONAL OPERATOR

== -- complete equality check of type and value
~= -- complete inequality check of type and value
< -- comparison operator
> -- comparison operator
<= -- comparison operator
>= -- comparison operator

-- LOGICAL OPERATOR

and -- logical and
or -- logical or
not -- logical not
```

## Control structures

```
-- ---------- BLOCK -----------
    -- lua takes a page from bash's syntax by seperating its code blocks with do/end and indentation 

-- ---------- IF ELSEIF ELSE THEN ----------
    -- standard conditionals
    -- there are no switch case statements in lua

if num > 40 then 
    print("Over 40")
elseif num == 20 then
    print("It's 20")
else 
    print("Lovely")

-- ---------- LOOP ----------

-- FOR LOOP
    -- for {VARIABLE BEGINNING}, {VARIABLE END}, {STEP}
    -- ranges are inclusive on both ends

for i=10, 1, -1
do 
    print(i) -- prints 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 to the console
end

for q=1,100 do 
    print(q) -- prints the numbers 1 to 100 to the console
end

-- FOR IN LOOP
    -- useful when looping over iterable data structures

for key,value in pairs(aTable) 
do
    aTable[key] = "i am jujutsu kaisen"
end

-- WHILE LOOP
    -- while do loop

while num < 50 do 
    num = num + 1
end

-- REPEAT UNTIL LOOP
    -- basically a do while loop

breakCase = 10
repeat
    print("watermelon")
    breakCase = breakCase - 1
until breakCase == 0
```

## Data structures

```
-- --------- WARNING ---------
    -- indice count starts at 1 in lua, important for indexing

-- ---------- TABLE ----------
    -- lua's only data structure is the table, similar to PHP's associative arrays (both a dictionary and a list)
    -- initialised using {} curly braces
    -- table keys are string values by default so quotation marks are unnecessary
    -- table keys can also be non-string values, and are declared via literal notation
    -- table values can be accessed via . dot notation or [] square bracket notation
    -- can assign functions to a table, wherein the function name is the key and the function body is the value (using both named function / anonymous function syntax are valid)
    -- table functions are called using the same . dot notation as other table values

aTable = {key1 = "value1", key2 = false}
print(aTable.key1) -- prints the value associated with the key key1 in aTable
aTable.key3 = 200 -- adds a new key value pair to aTable of key key3 and value 200
aTable.key2 = nil -- removes key2 from the table

anotherTable = {["@!#"] = 'qbert', [{}] = 1729, [6.29] = "tau"} -- initialise a table with non-string non-nil keys
print(anotherTable[6.29]) -- prints the string value "tau"

-- ---------- TABLE FUNCTION ----------
    -- note either of the below 2 syntax are valid and achieve the same result

-- NAMED FUNCTION SYNTAX

function anotherTable.aFunction() 
    print("Hello from a function!")
end

anotherTable.aFunction() -- calls the table function, printing "Hello from a function!"

-- ANONYMOUS FUNCTION SYNTAX

anotherTable.anAnonFunction() = function() 
    print("Hello from an anonymous function!")
end

anotherTable.anAnonFunction() -- calls the table function similarly, printing "Hello from an anonymous function!"

-- ---------- TABLE 'LIST' ----------
    -- 'lists' are really just tables with implicit indice keys associated with each value upon initalisation
    -- # for length of table (number of key value pairs)

aListButActuallyATable = {"value1", 'value2', 1.21, true}
print(#aListButActuallyATable) -- # returns the size of the table, this works on strings too
for i = 1, #aListButActuallyATable do  -- recall that indices start at 1 in lua
    print(v[i]) -- this syntax works since we're technically using tables with implicit indice keys 
end

-- ---------- GLOBAL TABLE ----------
    -- every lua program has a special _G global table that stores all global variables and functions (global functionality)
    -- _G is the table name, and it has similar functionality as every other table

aNumber = 42

function aFunction() 
    print("Hello my function!")
end

print(_G.aNumber) -- prints 42
_G.aFunction -- calls the function, printing "Hello my function!"
_G.aNewBoolean = true -- assigns the key aNewBoolean with value true to the global table, though this is not recommended unless explicitly necessary for the sake of producing readable code

-- ---------- METATABLE -----------
    -- metatables are tables that define and customise table behaviour
    -- setmetatable() sets a metamethod on a specified table, creating a metatable

-- ---------- METAMETHOD ----------
    -- functions that define specific operations on tables, lua has a set of predefined metamethods as below
    -- __add => define behaviour when adding 2 tables
    -- __sub => define behaviour when subtracting 2 tables
    -- __mul => define behaviour when multiplying 2 tables
    -- __div => define behaviour when dividing 2 tables
    -- __mod => define behaviour when calling modulo operator on 2 tables
    -- __pow => define behaviour when calling exponentiation operator on 2 tables
    -- __len => define behaviour when calling the # length operator on a table or string
    -- __unm => define behaviour when calling the unary minus operator in a table, used for negating a table
    -- __concat => define behaviour when calling concatenation operator on 2 tables
    -- __call => define behaviour when calling a table as a function
    -- __index => define a fallback method when accessing a table key that no longer exists
    -- __newindex => define behaviour when assigning a value to a table key that no longer exists
    -- __eq, __lt, __le => define behaviour for == equality, < less than and <= less than or equal to operators
    -- __tostring => define behaviour when converting a table to a string

-- attempting to simulate behaviour of fractions via tables
numeratorTable = {a = 1, b = 2}
denominatorTable = {a = 2, b = 3}

metaFraction = {} -- metaFraction is just another table for now

function metaFraction.__add(numeratorTable, denominatorTable) -- __add is the metamethod called on the metaFraction table to define behaviour when adding 2 tables together
    sum = {}
    sum.b = numeratorTable.b * denominatorTable.b
    sum.a = numeratorTable.a * denominatorTable.b + denominatorTable.a * numeratorTable.b
    return sum
end

setmetatable(numeratorTable, metaFraction) -- by pairing the table on which the metamethod __add is called with the 2 other tables, we prescribe behaviour and thus crete metatables using the setmetatable() function
setmetatable(denominatorTable, metaFraction)

newSum = numeratorTable + denominatorTable -- this now calls __add(numeratorTable, denominatorTable) on numeratorTable's metatable

-- ---------- CLASS-LIKE TABLE ----------
    -- lua has no built-in classes, though OOP behaviour can be simulated with tables and metatables
    -- function {TABLE NAME}:{FUNCTION NAME}() is the same as function {TABLE NAME}.{FUNCTION NAME}(self), the : just adds the self as the first argument 
    -- self works as you would expect it to in conventional OOP, so here aDog is an object and Dog is the class

Dog = {} -- Dog might act like a class, but remember its just a table with a metatable and metamethods prescribed on it

function Dog.new(self)
    newObject = {sound = "Woof"}
    self.__index = self
    return setmetatable(newObject, self)
end

function Dog.makeSound()
    print("I say" .. self.sound)
end

aDog = Dog:new()
aDog:makeSound() -- "I say Woof"

-- ---------- INHERITANCE ----------
    -- inheritance can be simulated by creating a new table off the original table and assigning new methods to that table, which is then used as a template for further tables
    -- since we're effectively copying keys and values off the original table, the new table template 'inherits' the keys values and methods off the old table which aren't overriden
    -- remember that everything here is a table

loudDog = Dog:new()

function loudDog.makesound()
    sound = self.sound .. " "
    print(sound .. sound .. sound)
end

aSuperLoudDog = loudDog:new()
aSuperLoudDog:makesound() -- "Woof Woof Woof "
```

## Functions

```
-- ---------- FUNCTIONS ----------
    -- function/end declares a function block
    -- return works as expected
    -- closures and anonymous functions are allowed
    -- functions are first-class and can be fed into other functions
    -- fuction scope can be specified using the local/global keyword

function fib(n)
    if n < 2 then 
        return 1 
    end 
    return fib(n-2) + fib(n-1)
end

function adder(x)
    return function (y) return x + y end -- returns an anonymous function which retains the value of x
end
```

## Modules

```
-- ---------- MODULE ----------
    -- require() allows for global functionality from the specified file to be brought into global scope of current file
        -- require()'s return values are cached so a file is only run ONCE even if require() is run multiple times
    -- dofile() is like require() but without caching, so a file is run EVERYTIME dofile() is run
    -- loadfile() loads a lua file into the variable but does not run it, the variable is called again as a function to have it run
    -- load() is loadfile() for strings, the variable is called again as a function to have it run
    -- local functionality that is only ever within local scope and never brought into global scope from the specified file will be treated as invisible and unretrievable
    -- functionality is called using . dot notation

-- eg. the below code is in seperate.lua

local M = {}

local function sayMyName() 
    print("You're Heisenberg")  
end

function M.sayHello()
    print("Why hello there")
    sayMyName()
end

return M

-- eg. the below code is in main.lua

local mod = require("seperate") -- require() brings in all globally scoped functionality from seperate.lua, accessed via the variable mod
mod.sayHello() -- prints "Why hello thereYou're Heisenberg", because sayHello() is in the global scope and it brings in sayMyName() despite that being only within local scope in seperate.lua
mod.sayMyName() -- this FAILS because sayMyName() is in the local scope only
```

## More on

* [learn lua in y minutes](https://learnxinyminutes.com/docs/lua/)
* [lua book](http://www.lua.org/pil/contents.html)
* [lua cheatsheet](https://devhints.io/lua)
