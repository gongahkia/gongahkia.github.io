---
category: Tech
---
# Mercury

# `Mercury`

Functional language for complex algorithm implementation and formal verification.

## Comments

```
% ----- COMMENT -----

% this is a single-line comment

/* this is a
multi-line 
comment */
```

## Printing

```
% ----- PRINTING -----
    % io.write_string() => receives a string argument that is then printed to the stdout and does not include a newline by default
        % !IO => provided as the second argument to the io.write_string() function
    % note there is no built-in implementation for printing to the stdout with a newline included automatically

io.write_string("this does not have a newline", !IO).
io.write_string("this includes a newline but only because we explicitly specify its inclusion\n", !IO).
```

## Quickstart

```
% ----- QUICKSTART -----
    % period-delimited programming language
    % strongly, statically typed
    % encourages declarative programming with a sophisticated determinism system 
    % supports concurrency and automatic garbage collection
    % main(!IO) => specifies the entry point of a Mercury program wherein all execution code is written, the equivalent of the main function in many other programming languages within the C family
    % import_module => brings other user-defined and Mercury built-in modules into the current module's local scope
    % module => declares the beginning of a module
    % :- => general-purpose syntax used for variable declaration, directives, and clauses
```

## Types

```
% ----- TYPE -----
    % int => stores signed and unsigned integer number values
    % float => stores signed and unsigned floating-point number values
    % char => stores a single Unicode character value, declared within '' single quotation marks
    % bool => true, false
    % string => stores a string value, declared within "" double quotation marks

:- type int.
:- type float.
:- type char.
:- type bool.
:- type string.
```

## Operators

```
% ----- OPERATOR -----

% --- ARITHMETIC OPERATOR ---

+ % addition
- % subtraction
* % multiplication
/ % division
% % modulo

% --- COMPARISON OPERATOR ---

= % partial equality check for value but not type
\= % partial inequality check for value but not type
> % comparison operator
< % comparison operator
>= % comparison operator
<= % comparison operator

% --- LOGICAL OPERATOR ---

, % conjunction operator, used as logical and
; % disjunction operator, used as logical or
not % negation operator, used as logical not
```

## Control structures

```
% ----- CONTROL STRUCTURE -----

% --- CONDITIONALS ---

% IF ELSE IF ELSE 

:- pred check_age(int::in) is semidet.
check_age(Age) :-
    ( if Age >= 18 then
        io.write_string("Adult\n")
    else if Age >= 13 then
        io.write_string("Teenager\n")
    else
        io.write_string("Child\n") ).

% CASE = ->
    % provides basic pattern-matching similar to Rust and other programming languages

:- type color ---> red ; blue ; green.
:- pred describe_color(color::in, io::di, io::uo) is det.
describe_color(Color, !IO) :-
    ( Color = red ->
        io.write_string("Color is Red\n", !IO)
    ; Color = blue ->
        io.write_string("Color is Blue\n", !IO)
    ; Color = green ->
        io.write_string("Color is Green\n", !IO)
    ).

% --- LOOPS ---
    % Mercury lacks coventional for and while loop constructs as in other programming languages
    % instead, recursion can be used as seen below to iterate over and traverse an iterable data structure similar to Clojure and other Lisp dialects in a manner similar to for loops
    % while loops can also be effected by including a recursive construct and adding a conditional predicate check that breaks out of the loop when the predicate condition is met

% RECURSION TO ITERATE OVER ITERABLE STRUCTURE

:- pred sum_list(list(int)::in, int::out, io::di, io::uo) is det.
sum_list(List, Sum, !IO) :-
    sum_list_loop(List, 0, Sum, !IO).

:- pred sum_list_loop(list(int)::in, int::in, int::out, io::di, io::uo) is det.
sum_list_loop([], Acc, Acc, !IO).
sum_list_loop([Head | Tail], Acc, Sum, !IO) :-
    NewAcc = Acc + Head,
    sum_list_loop(Tail, NewAcc, Sum, !IO).

% RECURSION WITH EXIT PREDICATE CONDITION

:- pred count_down(int::in, io::di, io::uo) is det.
count_down(N, !IO) :-
    ( if N > 0 then
        io.write_string(string.format("Counting down: %d\n", [i(N)]), !IO),
        count_down(N - 1, !IO)
    else
        io.write_string("Countdown complete!\n", !IO)
    ).
```

## Data structures

```
% ----- DATA STRUCTURE -----
    % list => dynamically-sized ordered collection of elements of the same datatype
    % array => fixed-size ordered collection of elements of the same datatype
    % type => used to specify one of the following user-defined datatypes
        % user-defined set of named constants, the equivalent of enums in other languages
        % user-defined collection of named fields and their specified corresponding datatypes, the equivalent of structs in Rust and Go allowing for the modelling of structured data
        % option() => creates a nullable datatype that can either store a value of the specified datatype as some() or the special value none
        % some() => represents the presence of a value stored in a variable that is nullable and could be storing the none value
        % none => represents the absence of a value
        % alias => special keyword that creates a type alias for existing datatypes, from which that aliased datatype can then be called

:- type list(T).
:- type array(T, N).
:- type color. % enum equivalent
:- type person. % struct equivalent
:- type option(T).
:- type alias Name == string. % alias Name for the existing datatype string
```

## Functions and Predicates

```
% ----- FUNCTION -----
    % used for computation and deterministic, producing a single output for a given number of inputs
    % Mercury function definitions bear many similarities to functional languages like Haskell, where the function's type signature is specified first and function implementation within the function body is specified after
    % bearing hallmarks of the functional paradigm, Mercury's functions feature implicit return of the last expression within the function definition, and each function returns a single value
    % func <functionName> ( <functionParameterDatatype(s)> ) = <functionReturnDatatype> . <functionName> ( <functionParameterName(s)> ) <functionBody> => function declaration and definition of type signature of a named function

:- func add(int, int) = int. % named function's type signature
add(X, Y) = X + Y. % named function's function body

:- func multiply(int, int) = int. % another named function's type signature
multiply(X, Y) = X * Y. % named function's function body

:- func factorial(int) = int. % a final named function's type signature
factorial(N) = ( if N =< 0 then 1 else N * factorial(N - 1) ). % that named function's function body

% ----- PREDICATE -----
    % used for logical assertions that can succeed or fail, with the following determinism categories such as the following
        % det => always succeeds exactly once
        % semidet => succeeds at most once and may fail
        % nondet => can succeed multiple times
        % multi => must succeed at least once, but can succeed multiple times
    % pred <predicateName> ( <predicateParameterDatatype(s)> :: <predicateModeParameterDescriptions>) is <determinismCategory> . <predicateName> ( <predicateParameterName(s)> ) :- <predicateBody> => predicate declaration and definition for a named predicate
    % predicate mode parameter descriptions are used to specify how parameters are passed to and from predicates
        % in => the predicate parameter will be read by the predicate but will not be modified by it
        % di => the predicate parameter will be consumed (destroyed) by the predicate
        % uo => the predicate parameter will be used to produce an output returned value

:- pred is_even(int::in) is semidet. % type signature for a predicate
is_even(N) :- N mod 2 = 0. % predicate implementation

:- pred check_age(int::in, io::di, io::uo) is det. % type signature for a more complex predicate
check_age(Age, !IO) :- % predicate implementation
    ( if Age >= 18 then
        io.write_string("Adult\n", !IO)
    else if Age >= 13 then
        io.write_string("Teenager\n", !IO)
    else
        io.write_string("Child\n", !IO)
    ).
```

## More on

* [mercury documentation](https://mercurylang.org/documentation/documentation.html)
* [learn mercury in y minutes](https://learnxinyminutes.com/docs/mercury/)
