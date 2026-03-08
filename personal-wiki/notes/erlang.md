# Erlang

# `Erlang`

The inspiration for Elixir, Gleam and Haskell.

## Comments

```
% ----- COMMENT -----

% this is a single-line comment

%{
this is a
multi-line
comment
%}
```

## Printing

```
% ----- PRINT -----
    % io:format() => receives a format string as an argument which is then displayed to the stdout, and does not include a newline by default 
    % ~n => augmenter that specifies the inclusion of a newline character

io:format("this does not have a newline automatically")
io:format("this includes a newline but only because we explicitly specify its inclusion~n"). 
```

## Quickstart

```
% ----- QUICKSTART -----
    % statements in Erlang are . period-delimited
    % dynamically typed language with strong support for concurrency and distributed systems
    % functional programming language with strong pattern-matching and a focus on immutable data
    % provides lightweight process creation and message passing for concurrency
    % used to build large-scale systems with high fault-tolerance, like in telecommunications
```

## Types

```
% ----- TYPE -----

% --- SCALAR TYPES ---
    % integer => stores an integer value
    % float => stores a floating-point number value
    % atom => a constant whose name is its value, starts with a lowercase letter or is enclosed in single quotes (boolean true and false are atoms in Erlang)
    % boolean => true, false 
    % char => stores a single character prefixed by a $ dollarsign character, represented by its ASCII value in the backend
    % binary => stores a sequence of bytes declared within <<>> angle brackets and "" double quotation marks, the equivalent of a string in most other programming languages

% --- COMPOUND TYPES ---
    % tuple => an ordered collection of elements of fixed size, declared within {} curly braces
    % list => a linked list, declared within [] square brackets
    % map => a collection of key-value pairs, declared within #{key => value}
    % record => a named tuple, defined with a custom structure

exampleInteger = 10.
exampleFloat = 3.14.
exampleFlag = true.
exampleLetter = $A.
exampleBinaryData = <<"Hello">>.
exampleTuple = {1, 2, "three"}.
exampleList = [1, 2, 3, 4, 5].
exampleMap = #{name => "Erlang", type => "Functional"}.
```

## Operators

```
% ----- OPERATOR -----

% --- ARITHMETIC OPERATORS ---

+ % addition
- % subtraction
* % multiplication
/ % division
div % integer division
rem % modulo

% --- COMPARISON OPERATORS ---

== % complete equality operator for both value and type
=/= % complete inequality operator for both value and type 
> % comparison operator
< % comparison operator
>= % comparison operator
=< % comparison operator

% --- LOGICAL OPERATORS ---

and % logical AND
or % logical OR
not % logical NOT
```

## Control structures

```
% ----- CONTROL STRUCTURE -----

% --- CONDITIONALS ---

% IF TRUE END
    % operates using pattern matching and guards to perform the equivalent of if else if else constructs in most other programming languages
    % case and if are common structures
    % note that end is used to specify the end of the conditional construct

X = 10.
if X > 5 ->
    io:format("X is greater than 5~n");
X == 5 ->
    io:format("X is equal to 5~n");
true ->
    io:format("X is less than 5~n")
end.

% CASE OF -> 
    % operates similarly to switch-case constructs in other languages, providing a degree of pattern matching
    % -> => specifies the relationship between a given predicate case and the execution code to be run when that case is fulfilled
    % _ => catch-all operator that runs when all other case conditions fall through

case X of
    1 -> io:format("X is 1~n");
    10 -> io:format("X is 10~n");
    _ -> io:format("X is something else~n")
end.

% --- LOOPS ---

% FOR-LIKE LOOP
    % Erlang does not feature a traditional for loop construct as in most other functional programming languages
    % instead, it provides the below functions for data structure iteration and traversal 
        % lists:foreach/2 
        % lists:map/2 

lists:foreach(fun(I) -> io:format("~p~n", [I]) end, [1,2,3,4,5]).

% WHILE-LIKE LOOP
    % similarly, while loop constructs are traditionally handled with recursion in Erlang since loops aren't idiomatic
    % below is an example of a recursive function providing the equivalent utility of a while loop in most other programming languages

-module(loop).
-export([print_n/1]).
print_n(0) -> ok;
print_n(N) ->
    io:format("~p~n", [N]),
    print_n(N - 1).
```

## Data structures

```
% ----- DATA STRUCTURE -----
    % tuple: immutable ordered collection of elements of multiple datatypes, with a fixed size
    % list: mutable linked list of elements of the same datatype
    % map: collection of key-value pairs with unique keys that adhere to the established type signature
    % record: custom structure with named fields of multiple datatypes, the equivalent of structs in other programming languages

anotherExampleTuple = {1, "two", 3.0}.
anotherExampleList = [1, 2, 3, 4].
anotherExampleMap = #{key1 => 10, key2 => 20}.
-anotherExampleRecord(person, {name, age}).
```

## Functions

```
% ----- FUNCTION -----
    % <function_name> (<function_parameter(s)>) -> <function_body>. => defines a named function
    % fun (<function_parameter(s)>) -> <function_body> end. => defines an anonymous function which is then assigned to a named variable

-module(math).
-export([add/2]).
anotherWayToAdd(A, B) -> A + B. % this is a named Function
Add = fun(A, B) -> A + B end. % this is an anonymous Function
```

## More on

* [learn Erlang in y minutes](https://learnxinyminutes.com/docs/erlang/)
* [Erlang documentation](https://www.erlang.org/docs)
* [erlang.org](https://www.erlang.org/)
