---
category: Tech
---
# C

# `C`

## Comments

```
// single-line comments
/* multi-line
comments
look
like 
this */
```

## Importing headers

```
// ---------- HEADER ----------
    // headers are the equivalent of Python's modules
    // their contents are syntatically similar to C source files but the file format ends in .h

#include <stdlib.h>
#include <stdio.h>
#include <string.h>
```

## Printing

```
// ---------- PRINT ----------
    // printf is print formatted, it does not print a newline by default
        // %c for char
        // %s for strings (char[])
        // %d or %I for short signed
        // %u for short unsigned
        // %ld for long signed
        // %lu for long unsigned
        // %x for unsigned hexadecimal
        // %o for unsigned octal
        // %f for float
        // %lf for double
        // %p for pointer
        // %% to print out %

printf("watermelon\n");
printf("%d\n", 0); // prints 0

// ---------- RECEIVE INPUT ----------
    // scanf takes in an input
    // &input specifies the memory address where we store the input value of type int

int input;
scanf("%d", &input);

// ---------- SPECIAL CHARACTERS ----------

'\n'; // newline character
'\t'; // tab character (left justifies text)
'\v'; // vertical tab
'\a'; // alert (bell) character
'\f'; // new page (form feed)
'\r'; // carriage return
'\b'; // backspace character
'\0'; // NULL character. Usually put at end of strings in C.
'\\'; // backslash
'\?'; // question mark
'\''; // single quote
'\"'; // double quote
'\xhh'; // hexadecimal number. Example: '\xb' = vertical tab character
'\0oo'; // octal number. Example: '\013' = vertical tab character
```

## Types

```
// ---------- TYPE ----------
    // sizeof() operator returns the size of a given data type
    // char => 1 byte, but can be larger, single quotation marks, also known as a character literal
    // char[] => C's version of strings, take 1 byte * length of array, double quotation marks
    // int => 4 bytes, integer types may be signed or unsigned like in Rust
        // short => 2 bytes
        // long => 4 - 8 bytes
        // long long => 8 bytes or more
    // float => 32-bit 
        // double => larger float, 64-bit
    // 1 or 0 => C's version of booleans, 0 being false, 1 being true (though technically any non-0 value is true)

char x_char = 'y'; // char literals are single quoted
char x_str[20] = "This is a string"; // strings are double quoted
int x_int = 0;
short x_short = 0;
long x_long = 0;
long long x_long_long = 0;
unsigned int y_int = 10;
signed short z_int = -5;
signed long long a_int = -1009;
float x_float = 0.01;
double x_double = 0.0;

// VARIABLES
    // declared once, value can be reassigned later

// CONST
    // declared once, value can only be assigned once
    // const stated before type of constant value

const float eg_float = 5.8;
const char eg_char = 'a';
const char *str_literal = "this is good practice"; // for string literals you don't intend to change, it is good practice to declare them as a constant and a pointer to a char (first element of the char array), which represents a char array
```

## Data structures

```
// ---------- ARRAY ----------
    // ordered list of elements of the same data type
    // initialized with a fixed size and type, though array elements are mutable
    // character array is a string (C has no built-in string type)
    // arrays are curly-braced in C

char my_char_array[20]; // allocates 1 * 20 = 20 bytes of space for the char array in memory
char my_int_array[20]; // allocates 4 * 20 = 80 bytes of space for the int array in memory
int an_eg_int_array[10] = {1,2,3,4,5,6,7,8,9,10}; // note the curly braces
char an_eg_char_array[5] = {'a','b','c','d','e'}; // another valid char array, although this also evaluates to "abcde"

// ARRAY INITIALIZER
    // {} initializes an array with default value of 0 past the specified values

int my_array[20] = {0}; // this initializes an int array of 80 bytes with each int being 0
int another_array[10] = {1,2}; // this initializes an int array [1,2,0,0,0,0,0,0,0,0], the remaining 8 unspecified values being 0
int yet_another_array[] = {0}; // note that not specifying the size of the array will result in an array of [0] with length 1

// ARRAY INDEXING 

my_array[0]; // returns 0, the element at index 0 is 0
my_array[10] = 2; // reassigns the element at index 10 to be 2
printf("%d\n", my_array[10]); // returns 2
char a_string[20] = "This is a string";
printf("%d\n", a_string[16]); // returns 0 (as will byte 17-19) since the string only has chars initialized up to index 15

// MULTI-DIMENSIONAL ARRAYS

int multi_array[2][5] = {
    {1,2,3,4,5},
    {6,7,8,9,10}
};
multi_array[0][2]; // returns 3

// ---------- TYPE DEF ----------
    // typedef creates a type alias

typedef int my_type; // creates a type alias for int called my_type 
my_type wow_everyone_so_creative = 10; // declare and assigns an int value to a my_type variable

// ---------- STRUCT ----------
    // struct creates what is basically a javascript object
    // stores key-value pairs
    // note struct fields (attributes) are separated by semicolons, not commas

struct rectangle {
    int width;
    int height;
};

// INITALIZING STRUCT FIELDS

struct rectangle my_rect = {1,2}; // struct fields can be intialized immediately

// ACCESS STRUCT FIELDS
    // dot notation

my_rect.width; // returns 1
my_rect.height; // returns 20

// typedefs can be assigned to structs for convenience (and also can be done during struct definition)

typedef struct rectangle rect; // this is valid

int area(rect r) {
    return r.width * r.height;
}

typedef struct {
    int width;
    int height;
} rect; // this is also valid
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC

int i1 = 1, i2 = 2; // valid shorthand for multiple declaration
float f1 = 1.0, f2 = 2.0; // same here as well

i1 + i2; // addition
i1 - i2; // subtraction
i1 * i2; // multiplication
i1 / i2; // division, though in this case evaluates to 0.5 is truncated towards 0
11 % 3; // modulo, be careful when arguments are negative though

int j = 0;
int s = j++; // increment by 1 operator, returns j then increments it
int z = ++j; // increment by 1 operator, increments j then returns it
int e = j--; // decrement by 1 operator, decrements j then returns it
int f = --j; // decrement by 1 operator, decrements j then returns it

(float)i1/i2; // evaluates to 0.5f since we need to cast at least one integer to a float to get a floating-point result
i1/(double)i2; // does the same for doubles
f1 / f2; // evaluates to 0.5 since both are floats here so fulfills the above requirement of at least one operand being a float

// COMPARISON 

3 == 2; // complete equality in value and type, returns 0
3 != 2; // complete inequality in value and type, returns 1
3 > 2; // comparison operator, returns 1 
3 < 2; // comparison operator, returns 0
2 <= 2; // comparison operator, returns 1
2 >= 2; // comparison operator, returns 1

// LOGICAL

!3; // logical not, returns 0
0 && 1; // logical and, returns 0
0 || 1; // logical or, returns 1
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// IF ELSE IF ELSE

int x = 5;
if (x > 5) {
    printf("x is bigger than 5\n");
} else if (x < 5) {
    printf("x is smaller than 5\n")
} else {
    printf("x is 5\n");
}

// LOOPS

// WHILE DO WHILE

int ii = 0;
while (ii < 10) {
    printf("%d, ", ii++); // recall that ii++ will increment ii after it retruns it, so this prints the string "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "
}

int kk = 0; // do while loops exist too
do {
    printf("%d, ", kk);
} while (++k < 10);

// FOR

for (int jj = 0; jj < 10; jj++) {
    printf("%d, ", jj);
} // prints the string "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "

// SWITCH CASE 
    // remember to include break after each case, otherwise the logic falls through
    // default case exists

switch (a) {
    case 0:
        // do something
        break;
    case 1:
        // do something else:
        break;
    case 2:
        // do another thing
        break;
    default:
        // accounts for the default case like the catch-all operator _ in Rust
        break;
}
```

## Functions

```
// ---------- CALL BY VALUE vs CALL BY REFERENCE ----------
    // CALL BY VALUE
        // a copy of the actual variable's value is called, so we are calling by value (how conventional functions with return values work)
    // CALL BY REFERENCE
        // the actual memory address of the variable is called and any changes are made to the variable itself, so we are calling by reference (how conventional object methods work)

// ---------- FUNCTION ----------
    // main function
    // function RETURN type specified at the front, followed by the function name and its arguments with their return types
    // functions are call by value by default, and a copy of the actual arguments are passed to a function (ie. the original argument values are not changed when the function is called) and a value has to be returned
    // pointers should be used if you want to edit the actual argument value
        // arrays are passed in as pointers by default
    // RETURN_TYPE FUNCTION_NAME(FUNCTION_ARGUMENTS_AND_TYPE);

int main(void) {
    // this is every C program's entry point, all C code must run within the main function
    return 0;
}

void function_1(); // you can declare a function ahead of time like this
int function_2(void); // or like this
int add_two_ints(int x1, int x2); // this is also valid function declaration
```

## Pointers

```
// --------- POINTER ----------
    // pointer is a variable declared that stores a memory address
        // pointers variables are declared with * (once)
        // pointer declaration will also specify the type of the variable it points to
        // by convention, pointer variables are named p{variable name}
    // memory addressed of variables can be accessed and played with
        // memory addresses are accessed with &

int x = 0;
int *px = &x; // stores the memory address of int variable x in pointer variable px (subsequent reference to pointer variable px can be done without the *, that's used once on declaration only)

// DEREFERENCE A POINTER
    // to access the actual value at the memory address a pointer variable is pointing to, use the derefernce operator *
    // it is slightly confusing and odd that the dereference and declaration operator are the same, but just go with it

int value_at_px = *px; // evaluates to 0, the int value of variable x previously declared, and note how the * is not seen since that was only declared once on declaration
(*px)++; // changes the actual value of the variable stored at memory address stored in pointer variable px
printf("%d\n", *px); // prints 1, accessing the value stored at the memory address in the pointer variable px via the derefencing operator *
printf("%d\n", x); // this will also print 1

// ARRAYS AND POINTERS
    // in memory, an array is just a special chunk of memory that is reserved upon declaration with a fixed size
    // when pointing to an array, pointer variable points to the memory address of the first element of the array even without the & memory address accessing operator
    // this is as arrays are implictly type converted into a pointer (stores a memory address of the first element of the array) when they are assigned to functions or to a pointer variable

int x_array[3] = {1,2,3}; // declares and initializes an int array [1,2,3] of 12 bytes
int* px_array = x_array; // notice we don't need to use the & mem address accesing operator due to implicit type conversion of the array into its pointer (also known as decay)

// STRINGS AND POINTERS
    // strings are char arrays, but they can also be represented as a pointer to a char (pointer to the first element of the char array as established above)
    // this is done by convention, and should be practised as far as possible when creating const string literals 

const char *my_str = "This is my very own string literal"; // creates a string literal which should not be modified

char foo[] = "foo"; // this is valid if the length of the string or its contents are meant to be changed later on in writable memory
foo[0] = 'a'; // this is legal C code, char array foo variable now stores the char array "aoo" which is also represnted as {'a','o','o'}

// there are some exceptions to these rules, but in general they are as defined above
```

## More on

* malloc
* calloc
* free
* enums
* macros
* function prototypes
* [c documentation](https://devdocs.io/c/)
* [learn c in y minutes](https://learnxinyminutes.com/docs/c/)
* [learn c the hard way](https://learncodethehardway.org/c/)
