# Prolog

# `Prolog`

Logic programming language from 1972 that has inspired many modern languages.

## Comments

```
% ----- COMMENT -----

% this is a single-line comment

/* 
this is a 
multi-line 
comment
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
    % declarative programming language
    % Prolog programs are composed of sets of logical rules and facts written as terms
        % terms => statements composed of atoms and compound structures
        % atoms => constants, variables
        % compound structures => functors, arguments
    % Prolog code is . period-delimited
    % excellent at representing and reasoning about logical relationships and symbolic data
    % most commonly used for natural language processing in AI, expert systems, symbolic mathematics, theorem proving and formal verification
    % features backtracking, which enables Prolog to explore alternative solutions to a given query in an execution-safe, controlled manner
```

## Types

```
% ----- TYPE -----
    % atom => symbolic constants declared as unquoted lowercase words, special characters or quoted strings, the equivalent of atoms in Lisp and Erlang and symbols in Ruby
    % number => covers both integer number values and floating-point number values
    % string => stored as a list of character codes
    % variable => stores an unknown or mutable value declared as beginning with an uppercase letter or an _ underscore, the equivalent of variable declaration in most other programming languages
        % note that _ underscore-prefixed variables create only a TEMPORARY variable binding
    % compound term => represents user-defined structured data, consisting of both a functor and an argument, called similarly to function calls in most other programming languages
        % functor => the equivalent of functions in most other programming languages
        % argument => arguments provided to a functor, the equivalent of function parameters or arguments in most other programming languages

atom_example :- 
    A1 = atom, % simple lowercase atom
    A2 = 'Hello World', % atom with spaces, requiring quotes
    A3 = +, % special character atom
    writeln(A1),
    writeln(A2),
    writeln(A3).

numbers_example :- 
    N1 = 42, % an integer
    N2 = -7, % a negative integer
    N3 = 3.14, % a floating-point number
    writeln(N1),
    writeln(N2),
    writeln(N3).

variables_example :- 
    X = 10, % variable X bound to the number value 10
    Result = X + 5, % variable result stores the value X + 5
    _Temp = Result * 2, % temporary variable _Temp stores the value Result * 2
    writeln(X),
    writeln(Result),
    writeln(_Temp).

compound_terms_example :- 
    Term1 = person(john, 25), % compound term with the functor `person` and provided arguments `john` and `25`
    Term2 = point(3, 4), % compound term with the functor `point` and provided arguments `3` and `4`
    Term3 = tree(node, left_subtree, right_subtree), % compound term representing a tree
    writeln(Term1),
    writeln(Term2),
    writeln(Term3).

strings_example :- 
    S = "Hello, Prolog!", % example of a string
    writeln(S).
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

arithmetic_operators_example :-
    A is 5 + 3, % an example of addition
    B is 10 - 2, % an example of subtraction
    C is 4 * 7, % an example of multiplication
    D is 8 / 2, % an example of division
    E is 8 // 2, % an example of integer division
    F is 5 mod 2, % an example of modulus
    G is 2 ** 3, % an example of exponentiation
    writeln(A),
    writeln(B),
    writeln(C),
    writeln(D),
    writeln(E),
    writeln(F),
    writeln(G).

% --- COMPARISON OPERATORS ---

= % assignment operator, the equivalent of variable assignment in most other programming languages
=:= % partial equality check for value but not type, but note that this is purely for arithmetic comparison and so only checks for equality in value of evaluated numbers at both ends of the operator
=\= % partial inequality check for value but not type, but note that this is purely for arithmetic comparison and so only checks for inequality in value of evaluated numbers at both ends of the operator
< % comparison operator
> % comparison operator
<= % comparison operator
>= % comparison operator

comparison_operators_example :-
    X = 5, % variable assignment 
    Y = 10, % variable assignment
    (X =:= 5 -> writeln('X is equal to 5'); writeln('X is not equal to 5')), % equality
    (X =\= Y -> writeln('X is not equal to Y'); writeln('X is equal to Y')), % inequality
    (X < Y -> writeln('X is less than Y'); writeln('X is not less than Y')), % less than
    (X =< Y -> writeln('X is less than or equal to Y'); writeln('X is greater than Y')), % less than or equal
    (X > Y -> writeln('X is greater than Y'); writeln('X is not greater than Y')), % greater than
    (X >= 5 -> writeln('X is greater than or equal to 5'); writeln('X is less than 5')). % greater than or equal

% --- LOGICAL OPERATORS ---

, % conjunction operator, the equivalent of the logical and operator
; % disjunction operator, the equivalent of the logical or operator
\+ % logical not operator

logical_operators_example :-
    (true, writeln('Logical AND (true and true)')),
    (fail; writeln('Logical OR (fail or true)')),
    (\+ fail -> writeln('Logical NOT (not fail)')).
```

## Control structures

```
% ----- CONTROL STRUCTURE -----

% --- CONDITIONALS ---

% IF ELSE IF ELSE
    % Prolog does not provide conventional if else if else conditional constructs available in most other programming languages
    % instead, the logical operators (specifically the , conjunction and ; disjunction operators) and pattern-matching can both be used to achieve the same effect of conditional constructs

% CONJUNCTION DISJUNCTION OPERATORS

member_of_family(john) :- writeln('John is a family member.'), !. % Cut (!) to prevent backtracking
member_of_family(mary) :- writeln('Mary is a family member.'), !.
member_of_family(_).

% PATTERN-MATCHING
    % Prolog's powerful pattern-matching is powered by unification which helps evaluate logical queries blazingly fast
    % unification => where the compiler finds substitutions for variables that make two terms identical during evaluation

animal_sound(dog) :- writeln('Woof!').
animal_sound(cat) :- writeln('Meow!').
animal_sound(_) :- writeln('Unknown animal sound!').

% --- LOOPS ---
    % as a declarative language, Prolog similarly does not provide conventional for, foreach, for in or while loop constructs as in most other programming languages
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
    % note that in Prolog, all data structures are represented by terms (comprised of functors and arguments)
    % this flexible syntax allows for the user to implement both standard data structures that would be built-in in most other programming languages, as well as other user-defined data structures
    % below are some of the more common data structures implemented in Prolog
        % list => ordered collection of elements of multiple datatypes declared within [] square brackets
        % dictionary => unordered collection of key-value pairs of multiple datatypes declared within dict{} where keys and their corresponding values are separated by a : colon
            % note that SWI-Prolog provides for a default implementation of the dictionary as a shipped data structure
        % record => user-defined collection of named fields and their corresponding interior values allowing for modelling of representative data, note that this implementation of records is equivalent to a struct LITERAL in Typescript and Go and not a struct itself (there is only one instance of the struct in Prolog, which is as defined, therefore a struct literal and not a conventional struct that you can template off)
        % tree => user-defined recursive data structure that facilitates hierarchical representation of data
        % graph => user-defined data structure composed of nodes which are connected by edges, facilitating representation of data involving relationships and networks

% LIST

anExampleEmptyList = [].
anExampleNumberList = [1, 2, 3, 4, 5].
anExampleAtomList = [apple, banana, cherry].
anExampleVariableList = [X, Y, Z].
anExampleNestedList = [1, [a, b, c], 3.14, [X, Y]].

% DICTIONARY

anExampleDictionary = dict{name: "Alice", age: 30}.

% RECORD

% Facts representing records
employee(john_doe, 50000, 'IT').
employee(jane_smith, 60000, 'HR').

% TREE

Tree = tree(tree(leaf, 1, leaf), 2, tree(leaf, 3, leaf)).

% GRAPH
    % below are facts representing each node and edge of the graph

edge(a, b).
edge(b, c).
edge(c, a).
node(a).
node(b).
node(c).
```

## More on

* [functors](https://stackoverflow.com/questions/19115712/in-prolog-is-a-fact-the-same-as-a-functor)
* [swi-prolog.org](https://www.swi-prolog.org/)
* [swi-prolog documentation](https://www.swi-prolog.org/pldoc/index.html)
* [learn prolog in y minutes](https://learnxinyminutes.com/docs/prolog/)
* [introduction to prolog](https://www.sfu.ca/~tjd/383summer2019/prolog_intro.html)
* [what is declarative programming](https://stackoverflow.com/questions/129628/what-is-declarative-programming)
* [learn logtalk in y minutes](https://learnxinyminutes.com/docs/logtalk/)
* [learn clojure in y minutes](https://learnxinyminutes.com/docs/clojure/)
* [learn erlang in y minutes](https://learnxinyminutes.com/docs/erlang/)
* [learn mercury in y minutes](https://learnxinyminutes.com/docs/mercury/)
* [learn haskell in y minutes](https://learnxinyminutes.com/docs/haskell/)
* [learn common lisp in y minutes](https://learnxinyminutes.com/docs/common-lisp/)
* [learn ruby in y minutes](https://learnxinyminutes.com/docs/ruby/)
* [datalog documentation](https://clojure.github.io/clojure-contrib/doc/datalog.html)
* [curry documentation](https://www-ps.informatik.uni-kiel.de/currywiki/)
