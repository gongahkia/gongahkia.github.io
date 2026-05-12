---
category: Tech
---
# Crystal

# `Crystal`

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment
# there is no built-in syntax for multi-line comments
```

## Quickstart

```
# ---------- QUICKSTART ---------- 
    # ruby-like syntax with implicit static type-checking
    # transpiles to C code with native Crystal bindings, allowing for high-level features with low-level focus on performance
    # everything is an object in Crystal similar to Ruby, and it shares many similarities with Ruby especially in its syntax for handling OOP
```

## Printing

```
# ---------- PRINTING ----------
    # puts appends a newline character to the end of the value printed
    # print does not append a newline character to the end of the value printed

puts "this will print something with a newline"
print "this will also print something with a newline, but because we specified it\n"
```

## Types

```
# ---------- TYPE ----------
    # Integers (Signed/Unsigned)
        # Int8
        # Int16
        # Int32
        # Int64
        # Int129
        # UInt8
        # UInt16
        # UInt32
        # UInt64
        # UInt128
    # Floats
        # Float32
        # Float64
    # Char ('' single quotation marks)
    # String ("" double quotation marks, immutable)
    # Bool (true/false)
    # Symbol (immutable, reusable constants represented internally as Int32 to convey meaningful values, similar to Ruby)

1_i8 # Int8
1_i16 # Int16
1_i32 # Int32
1_i64 # Int64
1_i128 # Int128
1_u8 # UInt8
1_u16 # UInt16
1_u32 # UInt32
1_u64 # UInt64
1_u128 # UInt128
1.0_f32 # Float32
1.0_f64 # Float64

'a' # Char
"hello world" # String

true # Bool

:question? # Symbol
```

## Operators

```
# ---------- ARITHMETIC OPERATOR ----------

+ # addition
- # subtraction
* # multiplication
/ # divison
% # modulo
** # exponentiation

# ---------- COMPARISON OPERATOR ----------

== # complete equality, including type
!= # complete inequality, including type
< # comparison operator
> # comparison operator
<= # comparison operator
>= # comparison operator

# ---------- LOGICAL OPERATOR ----------

&& # and
|| # or
! # not
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# ---------- ARRAY ----------
    # initialized with [] square brackets
    # lists of dynamic size that can store values of different types
    # empty arrays should specify their data type

anArray = [1,2,3,4,5,6]
anotherArray = [1, "hello", 'x']
anIntArray = Array(Int32).new

# ARRAY METHODS

anArray[1] # returns 2, all data structures are zero-indexed
anArray[-1] # returns 6, negative indexing returns values from the back similar to Python
anArray[2,3] # returns [3,4,5], a start index and size returns a subarray starting from the specified index and counts to the specified size
anArray[1..3] # returns [2,3,4], a range returns a subarray comprising elements from the parent array of the specified indexes within the range
anArray << 7 # returns [1,2,3,4,5,6,7], appends a value to the array
anArray.pop # returns 7, pop operates the same as in Python and removes and returns the last element of the array
anArray.shift # returns 1, shift operates the same as in Python and removes and returns the first element of the array
anArray.includes? 3 # returns true, .includes? checks for the existence of a value within an array and returns a boolean value

# ---------- HASH ----------
    # equivalent to an associative array in PHP, a dictionary in Python or an object in Javascript
    # stores key-value pairs of any type, the key-value pairs can be of different types even within the same hash

aHash = {
    "color" => "green",
    "number" => 5,
    "watermelon" => false
}

# HASH METHODS

aHash["color"] # returns "green", lookup values by key
aHash.has_key? "color" # returns true, .has_key? checks for the existence of a given key in a hash and returns a boolean value

# ---------- RANGE ----------
    # creation of ranges is easy in Crystal similar to Rust
    # .. creates an inclusive array
    # ... creates an exclusive array (at the end)

aRange = 1..10 # evaluates to [1,2,3,4,5,6,7,8,9,10], creation of an inclusive range
anotherRange = 1...10 # evaluates to [1,2,3,4,5,6,7,8,9], creation of an exclusive range
(1..8).includes? 2 # returns true, .includes? can be similarly called on ranges

# ---------- TUPLE ----------
    # fixed-size immutable stack-allocated sequence of values which can be of different types

aTuple = {1, "hello", 'x'}

# TUPLE METHODS

aTuple[1] # returns "hello", access tuple values by their indexes
```

## Control structures

```
# ---------- CONDITIONAL CHECK -----------

# IF ELSIF ELSE END
    # note the elsif

if true
  "if statement"
elsif false
  "else-if statement"
else
  "else statement, don't forget the end!"
end

# CASE WHEN END
    # the equivalent of the switch case in other languages
    # allows for a degree of pattern-matching

cmd = "move"
case cmd 
    when "create"
        "Creating"
    when "copy"
        "Copying"
    when "move"
        "Moving"
end

# TERNARY OPERATOR (for the 1% who uses them)
    # syntax is (CONDITIONAL CHECK) ? (RUNS IF TRUE) : (RUNS IF FALSE)

a = 1 > 2 ? 3 : 4 # a evaluates to 4 

# ---------- LOOP ----------

# WHILE LOOP
    # works as you'd expect

index = 0
while index <= 3
  puts index
  index += 1
end

# UNTIL LOOP
    # basically the reverse of a while condition

index = 0
until index > 3 
  puts index # this prints out the exact same thing as the above while loop
  index += 1
end

# EACH DO END LOOP
    # similar to Ruby, the defacto prefereable replacement to for, while and until loops
    # notice it utilises a range to iterate over with the .each, which creates an iterable from a collection of elements

(1..3).each do |index|
  puts index
end
```

## Functions

```
# ---------- FUNCTION ----------
    # def and end declare a function block, similar to Python and Lua
    # functions have implicit return (the value of the last statement of a function is implicitly returned)
    # functions can be called without () brackets when the call is unambiguous
    # multiple method arguments are separated by commas

def double(x)
    x * 2 # this value is implicitly returned
end
double 3 # returns 6
double double 3 # returns 12

def sum(x,y)
    x + y # note the implicit return
end
sum 3,4 # returns 7
sum sum(3,4),5 # returns 12
```

## More on

* [OOP](Ruby.md) in Crystal (classes and objects)
* symbols
* proc
* yield
* [crystal documentation](https://crystal-lang.org/)
* [learn crystal in y minutes](https://learnxinyminutes.com/docs/crystal/)
