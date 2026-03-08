# Elixir

# `Elixir`

Modern functional language to build high-traffic websites, systems and web apps.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

# there is no built-in
# implementation for 
# multi-line comments
```

## Printing

```
# ---------- PRINT ----------
    # printing to the stdout is handled with the IO module
    # IO.write => prints a string to the stdout and does not include a newline
    # IO.puts => prints a string to the stdout and appends a newline to the output

IO.write("this does not include a newline by default and we must explicitly specify it\n")
IO.puts("this comes with a newline by default")
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # elixir compiles to beam bytecode to run on the erlang virtual machine
    # functional language, so every expression must evaluate to a single value
    # = => not the assignment operator but the pattern-matching operator, allowing for powerful matching constructs like in other functional languages where the LHS pattern is matched against the RHS 

[head | tail] = [1,2,3] # here, the = is not an assignment operator but applies the pattern-matching construct
head # this evaluates to the integer value 1
tail # this evaluates to the remaining integer list values [2,3]
```

## Types

```
# ---------- TYPE ----------
    # integer => signed and unsigned integer number
    # float => signed and unsigned floating-point number
    # boolean => true, false
    # atom => constants whose value is their own name, declared with a : colon
    # string => declared with "" double quotation marks, covers chars also
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => floor division
    # div => integer division
    # rem => equivalent of the modulo operator

# LOGICAL OPERATORS
    # and => logical and
    # or => logical or
    # not => logical not

# COMPARISON OPERATORS
    # == => partial equality check for value
    # != or /= => partial inequality check for value
    # === => complete equality check for value and type
    # !== => complete inequality check for value and type
    # < > <= >= are also comparison operators
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONALS

# IF ELSE
    # elixir has no built-in implementation of elseif statements
    # do end => used to mark the start and end of the if else block

if false do
    "watermelon"
else
    "shit ass"
end # this evaluates to "shit ass"

# UNLESS ELSE
    # unless => provides for the negation of a specified condition
    # do end => used to mark the start and end of the unless else block

unless true do
  "this will never be seen"
else
  "this will shit"
end # this evaluates to "this will shit"

# PATTERN MATCHING
    # elixir's powerful pattern-matching construct rivals Rust in its conciseness and completeness
    # case => declares and creates a case statement, similar to switch case statements in other languages
    # do end => used to mark the start and end of a given case statement's cases, within which -> speciifes the relationship between a given case condition and the internal logic to run if said condition is satisfied
    # _ => catch-all operator used as the equivalent of a default statement in other languages

case {:one, :two} do
    {:four, :five} ->
        "this won't match"
    {:one, x} ->
        "this will match and bind `x` to `:two` in this clause"
    _ ->
        "this will match any value"
end # notice that pattern-matching can occur for tuples and other data structures

[head | _] = [1,2,3] # note the catch-all operator _ can be used to throw away any unwanted value, as seen here where only the head value is matched and assigned and the tail is thrown away
head # this evaluates to the integer value 1

# COND
    # cond => declares and creates a cond block, which runs mutliple conditional checks at the same time, equivalent to switch case statements in other languages and often used within elixir as a concise alternative to nesting mutliple if statements, with -> specifying the relationship between a condition and the internal logic to run if a given condition evaluates to true
    # do end => used to mark the start and end of the cond block 
    # true => it is convention to set the last condition as true to act as a default statement within a cond block

cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "me neither"
  1 + 2 == 3 ->
    "but I will"
end # this evaluates to "but I will"

cond do
  1 + 1 == 3 ->
    "I will never be seen"
  2 * 5 == 12 ->
    "me neither"
  true ->
    "but I will"
end # this evaluates to "but I will" as well due to the presence of the true condition which acts as a default statement

# TRY CATCH AFTER
    # try catch => declares a try catch block, similar to try except in other languages
    # after => specifies code that should execute regardless of whether a value is caught by the try catch block
    # rescue => used to handle specified errors
    # do end => used to mark the start and end of a try catch after block

try do
  throw(:hello)
catch
  message -> "got #{message}."
after
  IO.puts("I'm the after clause.")
end # this prints "I'm the after clause" to the stdout

# RANGES
    # .. => creates an inclusive range on both ends

1..10 # this evaluates to a range that stores integers from 1 to 10

# LOOPS
    # as a functional language, elixir does not have conventional imperative loops implemented, but offers higher-order functions, recursion and list comprehension that allow for the same effect in a concise manner
    # Enum module => provides Enum.each, Enum.map, Enum.reduce and other higher-order functions

# LIST COMPREHENSION
    # uses the syntax => for {PATTERN} <- {ITERABLE STRUCTURE}, {FILTER CONDITIONS}, do: {EXPRESSION}
        # pattern => applies a specified pattern-matching construct against elements from the iterable structure
        # iterable structure => data structure like a range, list etc
        # filter conditions => optional conditions to further filter elements
        # expression => does something to the given element and includes it in the resulting new list

numbers = [1, 2, 3, 4, 5]
doubled_numbers = for n <- numbers, do: n * 2 # this iterates over the list numbers, taking each value and multiplying it by 2, then reassigning it to a new list doubled_numbers
doubled_numbers # this evaluates to the integer list of value [2, 4, 6, 8, 10]
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# LIST
    # every list is essentially a linked list, where the head consists of the first element of the list and the tail comprises every other element behind the head, causing head operations to be fast but tail operations to be slow
    # [] => declares and creates a dynamically-sized ordered sequence of elements of the same type
    # [ | ] => specifies pattern-matching constrct that matches the head and a tail of a list

an_int_list = [1, 2, 3, 4, 5, 6]
[a_head | a_tail] = an_int_list
a_head # this evaluates to the integer value 1
a_tail # this evaluates to the integer list value [2, 3, 4, 5, 6]

# TUPLE
    # tuples allow for faster access to elements by index but are slower for frequent modification
    # {} => declares and creates a fixed size ordered sequence of elements of different types
    # elem => retrieves a specified element from a given tuple by its index

a_mixed_tuple = {:ok, "Success", 42}
first_el = elem(a_mixed_tuple, 0)
second_el = elem(a_mixed_tuple, 1)
third_el = elem(a_mixed_tuple, 2)

first_el # this evaluates to the atom value of :ok
second_el # this evaluates to the string value of "Success"
third_el # this evaluates to the integer value of 42

# MAPS
    # %{} => declares and creates a map which stores an unordered collection of key-value pairs, their relationship denoted by =>
    # [] => key-value pairs are created and retrieved by their keys using [] square bracket notation

genders = %{"david" => "male", "gillian" => "female"} // this declares and creates a new map genders which stores string key and string value pairs
genders["david"] # this evaluates to the string value "male"
```

## Functions

```
# ---------- FUNCTION ----------

# ANONYMOUS FUNCTIONS
    # fn => creates an anonymous lambda function with named parameters specified in () brackets 
    # -> => specifies the function body within the function definition
    # when => specifies a predicate that acts as a function guard for function parameters
    # end => marks the end of a function definition
    # invocation of anonymous functons requires . dot notation

square = fn(x) -> x * x end # declares and creates an anonymous function and assigns it to the variable square
square.(5) # invocation of the anonymous function

f = fn
    x, y when x > 0 -> x + y # specifies the pattern-matching construct that the anonymous function assigned to the variable x can receive before the actual function body
    x, y -> x * y
end

f.(1, 3) # this evaluates to the integer value of 4

# MODULE AND NAMED FUNCTIONS
    # functions that serve the same purpose are grouped together under modules
    # defmodule => declares and creates a module block
    # def => declares and creates a public function within the module block that can be called from other modules
    # defp => declares and creates a private function within the module that can only be called within the module
    # do end => marks the start and end of a function definition and module block

defmodule PrivateMath do # declares a module called PrivateMath
    def sum(a, b) do
        do_sum(a, b)
    end # declares a public function called sum that can be called from another module

    defp do_sum(a, b) do
        a + b
    end # declares a private function called do_sum that can only be called from within the module
end
```

## More on

* struct
* exceptions
* keyword list
* mapset
* hashset
* binary
* module visibility
* attribute
* |>
* concurrency
* agent
* Stream module
* [learn elixir in y minutes](https://learnxinyminutes.com/docs/elixir/)
* [elixir documentation](https://elixir-lang.org/docs.html)
* [elixir cheatsheet](https://media.pragprog.com/titles/elixir/ElixirCheat.pdf)
* [build something in elixir](https://medium.com/@clairedigitalogy/a-beginners-guide-to-elixir-906603251f06)
* [learn you some erlang for great good](https://learnyousomeerlang.com/)
