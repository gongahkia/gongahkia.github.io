---
category: Tech
---
# C++

# `C++`

*"We have C at home, and it has classes."*

## Comments

```
// ---------- COMMENT ----------

// this a single-line comment

/* 
this is a
mutli-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // std::cout => prints a string to the stdout
    // std::endl => appends a newline to the given output
    // std::flush => does not include a newline with the given output

std::cout << "this does not include a newline by default and we must explicitly specify it" << std::flush;
std::cout << "this is printed with a newline automatically included at the end" << std::endl;
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // C++ is a superset of C that adds functionality for classes, so it shares many syntactic similarities to C
    // all runnable program code is enclosed within the int main function
    // variables and constants are declared with their datatypes
        // variables have mutable values and cannot be reassigned after initial assignment
        // const => declares and creates a constant whose value is immutable and cannot be reassigned after initial assignment, with constant names being capitalised by convention
    // #include => used to specify which header files and standard library utilities should be imported into the current C++ source file

int main() {

    int anIntVariable = 10; // a variable
    const int AN_INT_CONSTANT = 100; // a constant

    return 0;
}
```

## Types

```
// ---------- TYPE ----------
    // int => integer number
    // float => single-precision floating point number
    // double => double-precision floating point number
    // bool => true, false
    // char => character declared with '' single quotation marks
    // string => string from the standard namespace, declared with "" double quotation marks using std::string
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => divison
    // % => modulo operator

// LOGICAL OPERATORS
    // && => logical and 
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => complete equality check for type and value
    // != => complete inequality check for type and value
    // > < >= <= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS

// IF ELSE IF ELSE

int num = 42;
if (num > 50) {
    std::cout << "num is greater than 50" << std::endl;
} else if (num < 50) {
    std::cout << "num is smaller than 50" << std::endl;
} else {
    std::cout << "num is equals to 50" << std::endl;
}

// SWITCH CASE BREAK DEFAULT
    // remember to include a break statement at the end of each condition otherwise logic will fall through to the next case

char grade = 'B';
switch (grade) {
    case 'A':
        std::cout << "excellent!" << std::endl;
        break;
    case 'B':
        std::cout << "good job!" << std::endl;
        break;
    case 'C':
        std::cout << "you passed" << std::endl;
        break;
    default:
        std::cout << "invalid grade" << std::endl;
}

// LOOPS

// FOR LOOPS
    // rudimentary for loop implementation similar to other languages

for (int i = 0; i < 5; ++i) {
    std::cout << i << std::endl;
}

// WHILE LOOPS

int counter = 0;
while (counter < 5) {
    std::cout << counter << std::endl;
    ++counter;
}

// DO WHILE LOOPS

int num = 0;
do {
    std::cout << num << std::endl;
    ++num;
} while (num < 5);
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // [] => declares and creates a fixed-size ordered sequence of elements of the same type within {} curly braces, where the size of the array is specified within the [] square brackets

int myArray[5]; // declaration of an int array with 5 elements
int anotherArray[] = {1, 2, 3, 4, 5};

// VECTOR
    // std::vector<{DATA TYPE}> => declares and creates a dynamically-sized ordered sequence of elements of the same type within {} curly braces, where the size of the vector does not have to be specified
    // brought into the present namespace using #include <vector>

std::vector<int> myVector; // declaration of an empty int vector
std::vector<int> anotherVector = {1, 2, 3, 4, 5};

// MAP
    // std::map<{KEY TYPE}, {VALUE TYPE}> => declares and creates a dynamically-sized unordered collection of key-value pairs of multiple types, where the size of the map does not have to be specified
    // brought into the present namespace using #include <map>

std::map<std::string, int> myMap; // declaration of an empty map with std::string as its key type and int as its value type
myMap["one"] = 1;
myMap["two"] = 2;
```

## Functions

```
// ---------- FUNCTION ----------
    // functions are declared with their parameter and return types within the function definition
    // function declaration follows the syntax of => {RETURN TYPE} {FUNCTION NAME}({PARAMTER TYPE}){{FUNCTION BODY}}

int multiply(int x, int y) { // function declaration where the function multiply takes in two parameters of type int and returns an int
    return x * y;
}

int product = multiply(2, 5); // calling the function
```

## OOP

```
// ---------- OOP ----------
    // class => declares a class
    // this => assigns instance object attributes and variables
    // constructor methods are called within the class under the same name as the class
    // access modifiers
        // public => makes the specified attribute or method accesible from outside the class
        // private => makes the specified attribute or method inaccessible from outside the class, only accesible within the class
    // instance object attributes and methods are accessed via . dot notation

class Student{
    public: // these public attributes are accesible outside the class
        std::string name;
        int age;
        double gpa;

    Student(std::string name, int age, double gpa){ // the constructor method
        this -> name = name;
        this -> age = age;
        this -> gpa = gpa;
    }
}

// INHERITANCE
    // : => specifies the relationship between a child and parent class, often accompanied by the public access modifier for the parent class
    // child classes can override parent class attributes and methods

class faeces{ // parent class faeces
    public:
        bool alive = true;

    void sound(){
        std::cout << "Plop plop plop plop\n";
    }
}

class diarrhoea: public faeces{ // child class diarrhoea that inherits from the parent class faeces
    void waterfall(){
        std::cout << "Pshhhhhhhhhhhhhh\n";
    }
}

class constipation: public faeces{
    void sound(){
        std::cout << "You're gonna be here for a while buddy\n";
    } // child class constipation redefines the sound method of its parent class faeces
}
```

## More on

* namespaces
* typedef
* using
* getters and setters
* overloaded functions
* function templates
* auto
* overloaded constructors
* pointers
* references
* [C++ documentation](https://devdocs.io/cpp/)
* [learn C++ in y minutes](https://learnxinyminutes.com/docs/c++/)
