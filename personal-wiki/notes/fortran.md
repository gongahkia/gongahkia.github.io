# Fortran

# `Fortran`

High-level language for numerical computation and mathematical simulations.

## Comments

```
! ----- COMMENT -----

! this is a single-line comment

! there is no default implementation
! for multi-line comments within Fortran
! but this syntax is generally used to achieve
! the same intended effect
```

## Printing

```
! ----- PRINTING -----
    ! WRITE(*,*) => receives multiple strings as comma-delimited arguments that are printed to the stdout, automatically including a newline in the displayed output
    ! WRITE(*,'(A)', ADVANCE='NO') => receives multiple strings as comma-delimited arguments that are printed to the stdout, and does not include a newline by default due to the augmenter specifier ADVANCE='NO'

WRITE(*,*) "this incldues a newline by default"
WRITE(*,'(A)',ADVANCE='NO') "there is no newline here by default and it must be explicitly specified"
WRITE(*,'(A)',ADVANCE='NO') "like so \n"
```

## Quickstart

```
! ----- QUICKSTART -----
    ! strong statically typed language with explicit variable declaration
    ! :: => specifies datatype of variables and dimensions, providing type declaration in Fortran where the datatype is specified, followed by ::, followed by the variable or dimension name
    ! PROGRAM <programName> => prefixes a program unit of the given name
    ! END PROGRAM <programName> => suffixes the program unit of the given name 

PROGRAM HelloWorld
    CHARACTER(len=20) :: name
    name = "John Doe"
    WRITE(*,*) "hello world from this Fortran program, sent by", name
END PROGRAM HelloWorld
```

## Types

```
! ----- TYPE -----
    ! note that the size of integers, real numbers and complex numbers can be specified with the KIND=<integerNumberOfBytes> syntax as below for 1, 2, 4 and 8 bytes
    ! INTEGER(KIND=4) => declares a 4-byte integer value
    ! INTEGER(KIND=8) => declares an 8-byte integer value
    ! REAL(KIND=4) => declares a real number value of 4-bytes
    ! REAL(KIND=8) => declares a real number value of 8-bytes
    ! COMPLEX(KIND=4) => declares a complex number value of 4-bytes
    ! COMPLEX(KIND=8) => declares a complex number value of 8-bytes
    ! LOGICAL => the equivalent of boolean values in Fortran with the two possible .TRUE. and .FALSE.
    ! CHARACTER(len= <integerNumber> ) => declares a fixed-length string of the specified length
    ! CHARACTER(len=*) => declares a variable-length string of dynamic size
    ! <variableBeingPointedAtDatatype> , POINTER => declares a pointer type that points to a variable of the specified datatype
```

## Operators

```
! ----- OPERATOR -----

! --- ARITHMETIC OPERATORS ---

+ ! addition
- ! subtraction
* ! multiplication
/ ! division
** ! exponentiation

! --- COMPARISON OPERATORS ---

== ! partial equality check for value but not type
/= ! partial inequality check for value but not type
< ! comparison operator
> ! comparison operator
<= ! comparison operator
>= ! comparison operator

! --- LOGICAL OPERATORS ---

.AND. ! logical and
.OR. ! logical or
.NOT. ! logical not
```

## Control structures

```
! ----- CONTROL STRUCTURE -----

! --- CONDITIONALS ---
    ! note the THEN and END IF statements similar to Bash when declaring a conditional construct

! IF ELSE IF ELSE END IF 

IF (condition) THEN
    ! statements
ELSE IF (another_condition) THEN
    ! more statements
ELSE
    ! default statements
END IF

! SELECT CASE END SELECT 
    ! provides the equivalent of switch and match case constructs in Python and other programming languages
    ! effectively provides basic pattern-matching in Fortran
    ! CASE DEFAULT => acts as the default fall-through case for situations where all other predicate conditions are not met within the select case construct, wherein the logic specified within CASE DEFAULT will run

SELECT CASE (variable)
    CASE (value1)
        ! add statement logic for value1 here
    CASE (value2)
        ! add statement logic for value2 here
    CASE DEFAULT
        ! add statement logic for the default value here
END SELECT

! --- LOOPS ---
    ! Fortran provides syntax to create both conventional C-style for loops, as well as while loops as in other programming languages
    ! DO <iterationVariableStartValueDeclaration> , <iterationVariableEndValue> => prefixes the specified loop construct's logic, declaring the beginning of a C-style for loop, where both the start and end values are inclusive 
    ! DO WHILE <whileLoopPredicate> => prefixes the specified loop construct's logic, declaring the beginning of a traditional while loop
    ! END DO => suffixes the specified loop construct's logic

DO i = 1, 10
    ! loop statements
END DO

DO WHILE (condition)
    ! Loop statements
END DO
```

## Data structures

```
! ----- DATA STRUCTURE -----
    ! array => both fixed-size and dynamically-sized ordered collections of elements of the same datatype
        ! note that dynamic arrays are created using pointers
    ! type => user-defined collection of named fields with their specified datatypes, the equivalent of structs in Typescript and Go via type aliases
        ! note both the TYPE and END TYPE syntax required for declaration of the user-defined type

INTEGER, DIMENSION(5) :: staticArrayExample ! this is a static array
INTEGER, POINTER :: dynamicArrayExample(:) ! this is a dynamic array created using pointers
ALLOCATE(dynamicArray(10)) ! allocates space for 10 elements
DEALLOCATE(dynamicArray) ! deallocates space taken up by the array in memory

TYPE :: Person
    CHARACTER(len=30) :: name
    INTEGER :: age
END TYPE Person

TYPE :: Address
    CHARACTER(len=50) :: street
    CHARACTER(len=30) :: city
    CHARACTER(len=2) :: state
    CHARACTER(len=5) :: zip
END TYPE Address
```

## Functions

```
! ----- FUNCTION -----
    ! FUNCTION <functionName> => prefixes the declaration and definition of a named function
    ! END FUNCTION <functionName> => suffixes the declaration and definition of a named function, after the function body

FUNCTION factorial(n)
    INTEGER :: n
    IF (n == 0) THEN
        factorial = 1
    ELSE
        factorial = n * factorial(n-1)
    END IF
END FUNCTION factorial
```

## More on

* [fortran documentation](https://www.fortran90.org/)
* [learn fortran in y minutes](https://learnxinyminutes.com/docs/fortran/)
