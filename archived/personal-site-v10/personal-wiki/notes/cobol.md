---
category: Tech
---
# COBOL

# `COBOL`

Business-oriented language created in 1960 for enterprise and financial applications.

## Comments

```
* ----- COMMENT -----

* this is a single-line comment
*> this is an alternative valid syntax for single-line comments

* there is no default COBOL implementation
* for multi-line comments
* but writing them like this
* achieves the same effect
```

## Printing

```
* ----- PRINTING -----
    * DISPLAY => takes whitespace-delimited string argument(s) that are printed to the stdout and includes a newline by default

DISPLAY "hello, this is a COBOL program".
DISPLAY "name: " WS-NAME " age: " WS-AGE. * this assumes the variables have already been declared and initialised within the DATA DIVISON
```

## Quickstart

```
* ----- QUICKSTART -----
    * english-like Common Business Oriented Language
    * imperative, procedural and supports object oriented programming paradigms
    * every line in COBOL is . period delimited, equivalent to the ; semicolon in other programming languages
    * every COBOL program is structured into the following divisions
        * IDENTIFICATION DIVISION => stores COBOL program metadata 
            * PROGRAM-ID => takes a string argument that specifies the COBOL program name
            * identification division also stores other data like AUTHOR, INSTALLATION, DATE-WRITTEN and DATE-COMPILED
        * DATA DIVISION => used for declaration and initialisation of variables, constants, and data structures that the program will use
            * WORKING-STORAGE SECTION => specifies declaration of variables and constants with immutable values
            * FILE SECTION => designates the file structures and data files used by the COBOL program
            * LOCAL-STORAGE SECTION => similar to WORKING-STORAGE but stores declaration of variables that are reinitialized whenever the given COBOL program is invoked
            * LINKAGE SECTION => specifies data items that can be passed between programs or different parts of the same program
        * PROCEDURE DIVISION => contains the actual programe execution code, acting as the equivalent of the main function in other languages
            * procedure division consists of a series of procedures comprised of paragraphs and sections that segment and organise main COBOL program logic
                * section: groups of related paragraphs
                * paragraph: named block of code within the PROCEDURE DIVISION
            * STOP RUN => equivalent of the exit keyword in Python, where the COBOL program will cease running immediately when STOP RUN is hit, called within the procedure division

IDENTIFICATION DIVISION.
    PROGRAM-ID. SampleProgram.

DATA DIVISION.
    WORKING-STORAGE SECTION.
        01 WS-NAME PIC X(20) VALUE 'John Doe'.
        01 WS-AGE  PIC 99 VALUE 30.

PROCEDURE DIVISION.
    DISPLAY "Program Starting...".
    DISPLAY "Name: " WS-NAME.
    DISPLAY "Age: " WS-AGE.
    DISPLAY "Program Ending...".
    STOP RUN.
```

## Types

```
* ----- TYPE -----
    * INTEGER => stores an integer value
    * FLOATING-POINT => stores a floating-point value with the specified decimal precision
    * CHARACTER => stores a single character
    * ALPHABETIC => stores a series of alphabetic characters as a string of specified length
    * ALPHANUMERIC => stores a series of alphanumeric characters as a string of specified length
    * BOOLEAN => '0' for false, '1' for true
    * DATE => stores a date value in YYYYMMDD format
    * TIME => stores a time value in HHMMSS format
    * TIMESTAMP => stores a timestamp value comprising both date and time
    * POINTER => stores a memory address in the form of a pointer, similar to pointers in other programming languages 
    * NATIONAL => stores a series of national characters such as Unicode
    * DISPLAY => stores numeric values with leading spaces supressed
    * COMP => stores binary data
    * COMP-3 => stores packed decimal data, enabling further compacted storage for performance
```

## Operators

```
* ----- OPERATOR -----

* --- ARITHMETIC OPERATORS ---

ADD * addition
SUBTRACT * subtraction
MULTIPLY * multiplication
DIVIDE * division

* --- COMPARISON OPERATORS ---

EQUAL TO * partial equality check for equality in value but not type
NOT EQUAL TO * partial inequality check for inequality in value but not type
GREATER THAN * comparison operator
LESS THAN * comparison operator
GREATER THAN OR EQUAL TO * comparison operator
LESS THAN OR EQUAL TO * comparison operator

* --- LOGICAL OPERATORS ---

AND * logical and 
OR * logical or 
NOT * logical not
```

## Control Structures

```
* ----- CONTROL STRUCTURE -----

* --- CONDITIONALS ---

* IF ELSE IF ELSE END-IF
    * note the necessary inclusion of the end-if similar to Bash

IF WS-AGE >= 18 * assume these variables have been defined earlier in DATA DIVISION
    DISPLAY "Adult"
ELSE IF WS-AGE >= 13
    DISPLAY "Teenager"
ELSE
    DISPLAY "Child"
END-IF

* --- LOOPS ---
    * PERFORM => declares creation of a while loop in your COBOL program and prefixes that loop's code
        * PERFORM UNTIL <whileLoopPredicateCondition> => specifies creation of while loop that runs infinitely until the specified predicate condition is hit
        * PERFORM <integerNumber> TIMES => specifies creation of a loop that iterates the specified number of times before automatically exiting and continuing with the below code after the designated number has been hit
    * END-PERFORM => suffixes the previously declared while loop's code
    * note that COBOL does not have an explicit for-in or for-each loop construct that allows direct iteration over elements within an iterable structure

PERFORM UNTIL WS-COUNTER > 5
    DISPLAY "Counter: " WS-COUNTER
    ADD 1 TO WS-COUNTER
END-PERFORM

PERFORM 5 TIMES
    DISPLAY "Counter: " WS-COUNTER
    ADD 1 TO WS-COUNTER
END-PERFORM
```

## Data Structures

```
* ----- DATA STRUCTURE -----
    * TABLE => dynamically-sized ordered collection of elements of the same datatype, the equivalent of an array in other programming languages and tables in Lua
    * RECORD => user-defined collection of fields with specified datatypes allowing the modelling of logically-related data, the equivalent of structs in Typescript and Go via type aliases

01 WS-TABLE.
    05 WS-ELEMENT OCCURS 10 TIMES PIC X(10).

01 WS-EMPLOYEE-RECORD.
    05 WS-EMPLOYEE-ID    PIC 9(5).
    05 WS-EMPLOYEE-NAME  PIC X(20).
    05 WS-EMPLOYEE-AGE   PIC 9(3).
```

## More on

* [subroutines in cobol](https://www.tutorialspoint.com/cobol/cobol_subroutines.html)
* [cobol documentation](https://devdocs.io/gnu_cobol/)
* [learn cobol in y minutes](https://learnxinyminutes.com/docs/cobol/)
