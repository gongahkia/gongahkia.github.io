# Java

# `Java`

Write once run anywhere.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is a 
multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // System.out.print() => prints a string and does not include a newline
    // System.out.println() => prints a string and appends a newline to the output
    // System.out.printf() => allows printing of a formatted string that can be augmented with further modifiers
        // % => specifies the position of the interpolated variable within the string
        // conversion character
            // %b => boolean
            // %c => character
            // %s => string
            // %d => integer
            // %f => float
        // flags
            // - => left-justify text
            // + => output + and - operators for numeric values
            // 0 => pads numeric values with zeros
            // , => separates groups of numbers exceeding 1000

System.out.print("this does not include a newline by default and we must explicitly specify it\n");
System.out.println("this includes a newline by default");

boolean myBool = true;
char myChar = '@';
String myString = "shit";
int myInt = 200;
double myDouble = 10.000;

System.out.printf("shit, %b", myBool);
System.out.printf("aight %c", myChar);
System.out.printf("this is the string, %s", myString);
System.out.printf("Good morning %d people", myInt);
System.out.printf("float and double heaven with %f", myDouble);
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // java programs which end in .java compile to bytecode (cross-platform intermediary code) which end in .class, then being compiled to machine code for each client device
    // usage
        // javac => compiles java program to a .class file as bytecode
        // java => runs bytecode on the java virtual machine
    // java enforces strict verbose object-oriented programming patterns, so all program code must run within the main method with the boilerplate => public static void main(String[] args)
    // the name of java file must be the same as the name of the main class
    // variables have mutable values that can be reassigned after initial assignment, and have its datatype specified upon declaration
    // final => declares and creates a constant with an immutable value that cannot be reassigned after initial assignment, and it has its datatype specified upon declaration

public class shit {

    public static void main(String[] args) { // main method
        System.out.println("pangsai walao eh");
    }

    int x = 123; // variable declaration and assignment
    String veryImportantMessage; // variable declaration and no assignment
    veryImportantMessage = "neato sheeto"

    final double PI = 3.14159; // final initialization

} // this has to be stored within a file named shit.java
```

## Types

```
// ---------- TYPE ----------
    // boolean => true, false
    // byte => -128 to 127, 1 byte in size
    // short => -32,768 to 32,767, 2 bytes in size
    // int => -2 billion to 2 billion, 4 bytes in size
    // long => -9 quintillion to 9 quintillion, 8 bytes in size, L to be appended after a long value
    // float => single-precision floating point number up to 7 digits, 4 bytes in size, f to be appended after a float value
    // double => double-precision floating point number up to 15 digits, 8 bytes in size
    // char => declared with '' single quotation marks, 2 bytes in size
    // String => declared with "" double quotation marks, variable size
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
    // += => addition and reassignment
    // ++ => increment by one
    // -= => subtraction and reassignment
    // -- => decrement by one
    // *= => multiplication and reassignment
    // /= => division and reassignment
    // %= => modulo and reassignment

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// COMPARISON OPERATORS
    // == => partial equality check for value
    // != => partial inequality check for value
    // instanceof => returns the type of a specified value
    // > < >= <= are also comparison operators
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS

// IF ELSE IF ELSE

int age = 75;
if (age >= 75) {
    System.out.prinln("aight bet");
} else if (age == 18) {
    System.out.println("this rose is very nice");
} else {
    System.out.println("You are an adult!");
} // this prints out "aight bet" to the stdout

// SWITCH CASE BREAK DEFAULT
    // remember to include break statement to prevent logic from falling through all cases
    // default => specifies the default case if all other conditional checks fail

switch(Day) {
    case "Sunday": System.out.println("Today is Sunday!");
    break;
    case "Monday": System.out.println("Today is Monday!");
    break;
    case "Tuesday": System.out.println("Today is Tuesday!");
    break;
    default: System.out.println("Ohh shittt");
}

// TRY CATCH FINALLY
    // try => try block surrounds any potentially dangerous code, similar to try except in Python
    // catch => code within the catch block runs if try block fails, otherwise this catch block is ignored if the try block runs succesfully, and can receive specific error messages and variable names as required, there can also be multiple catch statements
    // finally => finally block always executes regardless of whether an exception is caught or not, placed at the end of a try catch chain

try {
    Scanner scanner = new Scanner(System.in);
    System.out.println("Enter a whole number to divide: ");
    int x = scanner.nextInt();
    System.out.println("Enter a whole number to divide by: ");
    int y = scanner.nextInt();
    int z = x/y;
    System.out.println("result: " + z);
}

catch(ArithmeticExpression e) { // to handle the exception generated by the java error log in the stdout, "java.lang.ArithmeticExpression"
    System.out.println("Stop being clown please I beg");
}

catch(InputMismatchException e) { // to handle the exception generated by the java error log in the stdout, "java.lang.InputMismatchException"
    System.out.println("Enter a number you idiot!");
}

finally {
    System.out.println("This will alwyas print!");
    scanner.close();
}

// LOOPS

// WHILE LOOPS

while (true) {
    System.out.println("I'm trapped in an endless loop!");
} // a conventional while loop, though the while true has created an infinite loop

// DO WHILE LOOPS

String yes_or_no = "yes";
do {
    System.out.println("Eh ok");
} while (yes_or_no == "yes"); // also an infinite do while loop since no break condition set

// FOR LOOPS
    // allows for rudimentary implementation of a for loop like in other languages

for (int i=0; i <= 10; i++) {
    System.out.println(i); 
} // this prints out 0 to 10 to the stdout, separated by newlines

// FOR EACH LOOP
    // : => specifies the iteration variable over an iterable data structure

String[] animals = {"cat", "dog", "bird", "elephant"};
for (String animal: animals) {
    System.out.println(animal); // this would iterate over every element in the String Array animals, assigning each element to the String variable animal, and printing said variable to the stdout
}
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY
    // [] => declares and creates a fixed-size ordered sequence of elements of the same type within {} curly braces, where the datatype of elements are specified next to the [] square brackets
    // .length => returns the length of the specified array

String[] peepee = {"poopoo", "Aight", "full metal alchemist"}; // creates a string array
System.out.println(peepee[1]); // prints out the element of index 1 "Aight" to the stdout

// ARRAYLIST
    // ArrayLists stores reference datatypes
    // ArrayList<{ELEMENT TYPE}> => declares and creates a dynamically-sized ordered sequence of elements of the same type, where the datatype of elements are specified within the <> angled brackets
    // .add => appends new elements to the specified ArrayList
    // .get => retrieves an ArrayList element by the specified index
    // .set => reassigns a specified element at a specified index within an ArrayList
    // .size => returns the length of the ArrayList
    // .remove => removes an ArrayList element at the specified index
    // .clear => removes every single element in an ArrayList
    // brought into the present namespace using import java.util.ArrayList

ArrayList<String> food = new ArrayList<String>(); // creating a new ArrayList class object off the ArrayList class
food.add("cheese");
food.add("bayashi");
food.add("hamburger");

// HASHMAPS
    // HashMap<{KEY DATATYPE}, {VALUE DATATYPE}> => declares and creates an unordered collection of key-value pairs similar to tables in Lua and dictionaries in Python
    // .put => adds a key-value pair to a given HashMap
    // .putIfAbsent => adds a key-value pair to a given HashMap if the existing key does not already exist in the HashMap
    // .replace => replaces an existing key-value pair with a new specified key-value pair in a HashMap
    // .get => retrieves a value by its key from the HashMap
    // .getOrDefault => retrieves a value by its key from the HashMap, if the key does not exist, return a default value
    // .remove => removes a specified key-value pair by its key from a HashMap
    // .containsKey => checks whether a given key exists within a HashMap and returns a boolean value
    // .containsValue => checks whether a given value exists within a HashMap and returns a boolean value
    // .clear => removes every key-value pair in a HashMap
    // .size => returns the number of key-value pairs in a HashMap
    // .isEmpty => checks whether a specified HashMap is empty and returns a boolean value
    // .forEach => iterates over a given key-value pair in a HashMap
    // brought into the present namespace using import java.util.HashMap

HashMap<String, Integer> examScores = new HashMap<String, Integer>;
```

## OOP

```
// ---------- OBJECT-ORIENTED PROGRAMMING ----------
    // encapsulation means class attributes are private by default and instance attributes are accessed and modified via getter and setter methods
    // local scope refers to attributes and methods can only be called within a given method, although local variables can enter the global scope via constructor methods and use of return
    // global scope refers to attributes and methods that can be accessed outside a method within a class, visible to and accessible by all parts of a class
    // class => declares and creates a new class which has its own methods and attributes
        // constructor methods are given the same name as the class, automatically called when an instance object is first instantiated off a class
        // .this => assigns a specified argument to an object's instance attribute, often done within the constructor, the equivalent of .self in Python
    // new => intiializes a new instance object off a previously declared class 
        // . => object attributes and methods are called via . dot notation
        // it is possible to pass instance objects as arguments to a method and the datatype of the instance object (its class) is to be specified
    // extends => specifies the relationship between a parent class and child class
        // @Override => an annotation that marks an overriden method, which allows for a child class to redefine an inherited method by simply reimplementing it differently under the same name

// take it that the code below belongs in a few different files

// Main.java 
public class Main {

    public static void main(String[] args) {
        Streamer Emiru = new Streamer("water", 10, 20.12); // initialized an instance object off the streamer class called Emiru with some arguments for the constructor, and the String "Streamer has been instantiated!" is printed to the stdout
        System.out.println(Emiru.type); // this would print out the String value "Adin Ross" to the stdout, an instance attribute of the class object Streamer
        System.out.println(Emiru.price); // this would print out the double value 1.28843 to the stdout, an instance attribute of the class object Streamer

        Emiru.missTate(); // this would call the missTate() void class method on the Emiru instance object, printing the String "Man, Andrew I miss you so much man" to the stdout

        Homies central_c = new Homies();

        Homies.hug(Emiru); // this would print out the String "Where are all my homies at? Eh yo water" to the stdout

        Entertainer pyrocynical = new Entertainer; // child class instantiated
        pyrocynical.emote(); // this will print out the string "Its 202020203" to the stdout, an inherited method that the child Entertainer class inherited from the parent Streamer class
        System.out.println(pyrocyncial.shits_to_give); // this will print out the integer 20, an instance attribute that is unique to the child Entertainer class

        pyrocycnical.missTate(); // this will print the String "Man, I have nothing against the guy" to the stdout, as we have overriden the missTate() void method from the parent Streamer class in the Entertainer child class
    }

}

// Streamer.java
public class Streamer {

    // global scope within the Streamer class 
    String type = "Adin Ross";
    int year = 2023;
    double price = 1.28843;

    // an object's instance attributes for the constructor, remember to statically declare them first!
    String name;
    int age;
    float weight;

    Streamer(String name, int age, float weight){
        System.out.println("Streamer has been instantiated!");
        this.name = name;
        this.age = age;
        this.weight = weight;
        // technically, the name, age and weight arguments taken in by the constructor are local scoped, but because we assign them to the object's instance attributes with "this", they become global scoped
    }

    void emote() {
        System.out.println("Its 202020203");
    }

    void missTate() {
        System.out.println("Man, Andrew I miss you so much man");
    }

    public class Homies {

        void hug(Streamer streamer_obj) { // note that the data type of the void method called on the Homies class object here is Streamer, which is the class of the object taken in as an argument by this method
            System.out.println("Where all my homies at? Eh yo " + streamer_obj.name);
        }

    }

    public class Entertainer extends Streamer { // child class Entertainer inheriting the attributes and methods of the Streamer parent class

        int shits_to_give = 20; // unique instance attribute that is globally scoped

        @Override
        void missTate() { // method overriding to redefine the inherited missTate() void method from the Streamer parent class in the Entertainer child class
            System.out.println("Man, I have nothing against the guy");
        }
    }

}

// ---------- METHODS ----------
    // there are no functions in java, only methods, which are called alongside (not within) the main method
    // methods are declared with their parameter and return types specified in the method definition
    // return => specifies the return expression

public static void main(String[] args) {
    hello(); // note that the hello method can be called even though it is declared only after the main method

    int a = 10;
    int b = 200;
    addition(a,b); // this returns the int value 210
}

static void hello() { 
    System.out.println("Hello!");
} // note that this void method must be preceded with the static declaration, to allow for the main method to call it 

static int addition(int x, int y) {
    return x + y; // this is an int method that takes in 2 arguments that takes in 2 arguments of type int, and returns an int value
}

// OVERLOADED METHODS
    // methods that take in a variable number of parameters and parameters of different types but are declared under the same name, similar to overloaded functions in other languages, possible since each method has a distinct method type signature
    // overloaded methods are declared and created by simply adding method declarations for each version of the method, under the same name

public static void main(String[] args) {
    int a = 10;
    int b = 20;
    int c = 6.31249;
    int d = 70;

    addition(a, b); // this returns the integer value of 30
    addition(a, b, c, d); // this returns the integer value of 106 (since the addition method returns an integer value)
}

static int addition(int a, int b) {
    return a + b;
}

static int addition(int a, int b, double c, int d) {
    return a + b + c + d;
} // an example of an overloaded method, the integer method addition is able to take in 2 variations of arguments, which have a varying number of parameters

// ---------- SUPER ----------
    // super => allows the specified child class to access and customize its inherited attributes and methods from the parent superclass without any method overriding required, similar to .this but super references the parent class' members (attributes and methods)

// take it that the code below belongs in a few different files

// Main.java
public class Main {

    public static void main(String[] args) {
        Hero hero1 = new Hero("spongebob", 42, "$$$"); // we are still able to initialize our instance object hero1 with the constructor values from our child class Hero and the constructor values from our parent class person

        System.out.println(hero1.name); // this would print out the String "spongebob" to the stdout
        System.out.println(hero1.age); // this would print out the integer 42 to the stdout
        System.out.println(hero1.power); // this would print out the String "$$$" to the stdout
        System.out.println(hero1.toString); // this works due to the super keyword, which allows the child Hero class to access the toString method of the parent person class and copy its existing method, only modifying it by adding additional behaviours as desired
    }

}

// person.java
public class person {

    String name;
    int age;

    person(String name, int age){
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return this.name + "\n" + this.age + "\n";
    }

}

// Hero.java
public class Hero extends person {

    String power;

    Hero(String name, int age, String power){
        super(name, age); // input the variable names of the parent class's constructor values as arguments to the super keyword, allowing the Hero constructor to be called using the same constructor values as the parent class and more
        this.power = power;
    }

    public String toString() {
        return super.toString() + this.power;
    }

}
```

## More on

* generics
* serialization
* deserialization
* threads
* multithreading
* packages
* .jar file
* variable swapping
* 2d ArrayLists
* String methods
* file IO
* java GUI libraries
* wrapper classes
* autoboxing
* unboxing
* polymorphism
* abstract
* interface
* overloaded constructors
* array of objects
* access modifiers
* static
* [java documentation](https://docs.oracle.com/en/java/)
* [learn java in y minutes](https://learnxinyminutes.com/docs/java/)
* [explaining jvm architecture](https://medium.com/java-for-beginners/understanding-java-virtual-machine-jvm-architecture-e68d1c611026)
* [learn kotlin in y minutes](https://learnxinyminutes.com/docs/kotlin/)
* [learn ballerina in y minutes](https://learnxinyminutes.com/docs/ballerina/)
* [learn haxe in y minutes](https://learnxinyminutes.com/docs/haxe/)
* [learn mercury in y minutes](https://learnxinyminutes.com/docs/mercury/)
* [learn raku in y minutes](https://learnxinyminutes.com/docs/raku/)
* [learn groovy in y minutes](https://learnxinyminutes.com/docs/groovy/)
* [whiley.org](https://whiley.org/)
