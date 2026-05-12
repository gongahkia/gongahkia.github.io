---
category: Tech
---
# Logtalk

# `Logtalk`

Object-oriented language based on Prolog.

## Comments

```
% ----- COMMENT -----

% this is a single-line comment

/* 
this is a 
multi-line 
comment
*/

/**
* this is a 
* documentation 
* comment used to
* with mention of 
* function parameters 
* and return values below
* 
* @param <paramValue>
* @return <returnValue>
*/
```

## Printing

```
% ----- PRINTING -----
    % write() => receives a string argument which is then printed to the stdout and does not include a newline automatically
    % writeln() => receives a string argument which is then printed to the stdout and includes a newline by default

?- write('this does not have a newline and we must explicitly specify its inclusion\n').
?- writeln('this does have a newline by default').
```

## Quickstart

```
% ----- QUICKSTART -----
    % Logtalk programs are comprised of objects, protocols, and categories
        % objects => encapsulate data and procedures, equivalent to classes in OOP
        % protocols => define interfaces that objects can implement
        % categories => reusable components that can be imported by objects
    % this encourages consistent code reuse and neater modular programming
    % often used in knowledge representation, artificial intelligence, and complex data modeling
    % seamless integration with existing Prolog implementations
    % :- => neck which helps specify a directive or declaration
        % used for predicate definition, module loading, rule and fact definitions, initalisation and compiler directives
```

## Types

```
% ----- TYPE -----
    % Logtalk features the same basic datatypes as Prolog with extended OOP constructs
    % atom => symbolic constants, same as Prolog
    % number => integers and floating-point numbers, same as Prolog
    % string => lists of character codes, same as Prolog
    % variable => mutable values, same as Prolog
    % compound term => structured data, same as Prolog with functors and arguments
    % object => encapsulated data and procedures
    % protocol => defines interfaces for objects
    % category => reusable components for objects
```

## Operators

```
% ----- OPERATOR -----

% --- ARITHMETIC OPERATORS ---

+ % addition
- % subtraction
* % multiplication
/ % division
// % integer division
mod % modulo
** % exponentiation 

% --- COMPARISON OPERATORS ---

= % unification operator, the equivalent of variable assignment in most other programming languages
=:= % partial equality check for value but not type, but note that this is purely for arithmetic comparison and so only checks for equality in value of evaluated numbers at both ends of the operator
=\= % partial inequality check for value but not type, but note that this is purely for arithmetic comparison and so only checks for inequality in value of evaluated numbers at both ends of the operator
< % comparison operator
> % comparison operator
<= % comparison operator
>= % comparison operator

% --- LOGICAL OPERATORS ---

, % conjunction operator, the equivalent of the logical and operator
; % disjunction operator, the equivalent of the logical or operator
\+ % logical not operator
```

## Control structures

```
% ----- CONTROL STRUCTURE -----

% --- CONDITIONALS ---

% IF ELSE IF ELSE
    % Logtalk does not provide conventional if else if else conditional constructs available in most other programming languages
    % instead, the logical operators (specifically the , conjunction and ; disjunction operators) and pattern-matching can both be used to achieve the same effect of conditional constructs

% CONJUNCTION DISJUNCTION OPERATORS

member_of_family(john) :- writeln('John is a family member.'), !. % Cut (!) to prevent backtracking
member_of_family(mary) :- writeln('Mary is a family member.'), !.
member_of_family(_).

% PATTERN-MATCHING
    % Logtalk's powerful pattern-matching is powered by unification which helps evaluate logical queries blazingly fast
    % unification => where the compiler finds substitutions for variables that make two terms identical during evaluation

animal_sound(dog) :- writeln('Woof!').
animal_sound(cat) :- writeln('Meow!').
animal_sound(_) :- writeln('Unknown animal sound!').

% --- LOOPS ---
    % as a declarative language, Logtalk similarly does not provide conventional for, foreach, for in or while loop constructs as in most other programming languages
    % instead, recursion is the default choice when explicit traversal or iteration over elements in an iterable data structure is required

% RECURSION

iterate_through_list([]). % iterating through a list with a recursive functor call
iterate_through_list([Head | Tail]) :- % compound term definition
    writeln(Head),
    iterate_through_list(Tail).
```

## Data structures

```
% ----- DATA STRUCTURE -----
    % note that in Logtalk, all data structures are represented by terms (comprised of functors and arguments) and objects
    % this flexible syntax allows for the user to implement both standard data structures that would be built-in in most other programming languages, as well as other user-defined data structures
    % below are some of the more common data structures implemented in Logtalk
        % list => ordered collection of elements of multiple datatypes declared within [] square brackets
        % dictionary => unordered collection of key-value pairs of multiple datatypes declared within dict{} where keys and their corresponding values are separated by a : colon
            % note that Logtalk provides for a default implementation of the dictionary as a shipped data structure

% LIST

anExampleEmptyList = [].
anExampleNumberList = [1, 2, 3, 4, 5].
anExampleAtomList = [apple, banana, cherry].
anExampleVariableList = [X, Y, Z].
anExampleNestedList = [1, [a, b, c], 3.14, [X, Y]].

% DICTIONARY

anExampleDictionary = dict{name: "Alice", age: 30}.
```

## More on

* [methods](https://logtalk.org/manuals/refman/methods/index.html)
* [logtalk.org](https://logtalk.org/)
* [logtalk documentation](https://logtalk.org/documentation.html)
* [learn logtalk in y minutes](https://learnxinyminutes.com/docs/logtalk/)
* [learn prolog in y minutes](https://learnxinyminutes.com/docs/prolog/)
