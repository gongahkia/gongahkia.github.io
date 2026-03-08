# Raku

# `Raku`

Perl 6.

## Comments

```
# ----- COMMENT -----

# this is a single-line comment

#=begin comment

this is a 
multi-line
comment

#=end comment
```

## Printing

```
# ----- PRINTING -----
    # print => receives a string argument which is then printed to the stdout and this does not include a newline by default
    # say => receives a string argument which is then printed to the stdout including a newline at the end of the output automatically

print "this does not have a newline and we must explicitly specify its inclusion as here\n";
say "this does have a newline";
```

## Quickstart

```
# ----- QUICKSTART -----
    # Raku does not transpile to Perl, but is a distinct language with its own specifications and runtime on MoarVM (the Raku Virtual Machine)
    # Raku can therefore also run on other backends like JVM or JavaScript
    # semicolon-delimited high-level programming language
    # supports high-performance concurrency features
    # flexible powerful type system affording strong, optional and dynamic typing depending on the context and usage 
    # Raku's use cases range from casual scripting to large-scale software development
    # my => declares a lexically scoped local variable 
    # lexical scoping => the specified variable is only accessible within the block or scope in which it is declared, where for context variables in Python are lexically scoped based on indentation level
```

## Types

```
# ----- TYPE -----
    # Raku variables are declared with the following syntax, regardless of whether its a scalar, collection or another specialised type
        # my <datatype> <variableName> = <value>

# --- SCALAR TYPES ---
    # Str => stores string value declared within "" double quotation marks
    # Int => stores integer number values
    # Rat => stores rational number values
    # Num => stores floating-point number values
    # Complex => stores complex number values
    # Bool => True, False
    # Any => special datatype from which all other datatypes are derived, affording a degree of type inference in Raku for dynamic typing

# --- COLLECTION TYPES ---
    # @ => declares an array data structure
    # % => declares a hash data structure
    # % => declares a set data structure 
    # $ => declares a bag data structure
    # $ => declares a mix data structure 
    # @ => declares a range data structure
    # $ => declares a tuple data structure

# --- SPECIALISED TYPES ---
    # Signature => specifies the type signature of parameters fed to a routine
    # $ => declares a pair, which represents a single key-value pair (observe that a hash therefore comprises multiple pairs)
    # Capture => represents the actual arguments that are to be passed to a routine, the Capture literal declared within ( and )
    # $ => declares a junction, which represents a variable that can be one of multiple possible specified datatypes and in a state of superposition of those datatypes where each possible datatype is delimited by the | pipe-operator, the equivalent of a union type in Typescript
    # $ => declares a promise, which represents a value that will become available in the future, noting the promise literal is declared within start { and }

my Str $name = "Alice";
my Int $age = 30;
my Rat $half = 0.5;
my Num $pi = 3.14;
my Complex $c = 1+2i;
my Bool $is_valid = True;
my Any $value;

my @array = (1, 2, 3, 4, 5);
my %hash = 'name' => 'Alice', 'age' => 30;
my %set = set('apple', 'banana', 'cherry');
my $bag = bag('apple' => 3, 'banana' => 2);
my $mix = mix('apple' => 1.5, 'banana' => 2.5);
my @range = 1..10;
my $tuple = (1, "two", 3.0);

my Signature $sig = :(Int $x, Str $y);
my $pair = 'name' => 'Alice';
my Capture $capture = (1, 2, 3);
my $any = 1 | 2 | 3; 
my $promise = start { sleep 2; 42 };
```

## Operators

```
# ----- OPERATOR -----

# --- ARITHMETIC OPERATORS ---

+ # addition
- # subtraction
* # multiplication
/ # division
% # modulo

# --- COMPARISON OPERATORS ---

== # partial equality check for value but not type
!= # partial inequality check for value but not type
> # comparison operator
< # comparison operator
>= # comparison operator
<= # comparison operator

# --- LOGICAL OPERATORS ---

&& # logical and
|| # logical or
! # logical not
```

## Control structures

```
# ----- CONTROL STRUCTURE -----

# --- CONDITIONALS ---

# IF ELSIF ELSE 

my $x = 10;
if $x > 5 {
    say "$x is greater than 5";
} elsif $x == 5 {
    say "$x is equal to 5";
} else {
    say "$x is less than 5";
}

# GIVEN WHEN DEFAULT
    # provides a basic degree of pattern-matching in Raku, the equivalent of match case or switch case constructs in most other programming languages
    # default => specifies the fall-through default case that executes if all other predicate case conditions fail

my $value = 42;
given $value {
    when 1 {
        say "Value is 1";
    }
    when 42 {
        say "Value is 42";
    }
    when 100 {
        say "Value is 100";
    }
    default {
        say "Value is something else";
    }
}

# --- LOOPS ---

# WHILE
    # operates the same as while loops in most other programming languages

my $count = 0;
while $count < 5 {
    say $count;
    $count++;
}

# FOR ->
    # allows for iteration and traversal over an iterable data structure in Raku
    # the equivalent of a for in loop in Python and foreach loops in PHP

for 1..5 -> $i {
    say $i;
}

# REPEAT WHILE
    # the equivalent of a do while loop in most other programming languages

my $count = 0;
repeat {
    say $count;
    $count++;
} while $count < 5;
```

## Data structures

```
# ----- DATA STRUCTURE -----
    # array => dynamically-sized mutable ordered collection of elements of multiple datatypes, declared within <> angle brackets
    # tuple => fixed-size immutable ordered collection of elements of multiple datatypes, declared within () round brackets
    # hash => dynamically-sized mutable unordered collection of key-value pairs of multiple datatypes, each , comma-delimited key-value pair declared with '' single quotation marks and => an arrow
    # set => fixed-size immutable unordered collection of unique elements of multiple datatypes, supporting special set-specific operations , declared within set()
    # bag => fixed-size immutable unordered collection of key-value pairs, where each key is a specified named value and each value is an integer number count, declared within bag()
    # mix => fixed-size immutable unordered collection of key-value pairs, where each key is a specified named value and each value is a fractional number count, declared within mix()
    # range => dynamically-generated iterable data structure representing a sequence of values (mostly numbers) defined by the range's start and end value, within which values are lazily evaluated with a default increment of 1 if not specified, declared with .. the range operator delimiting the range's start and end value

my @anExamplefruitArray = <apple banana cherry>;
my $anExampleABCTuple = (1, 2, 3);
my %anExampleCapitalsHash = 'France' => 'Paris', 'Germany' => 'Berlin';
my %anExampleZestySet = set('apple', 'banana', 'cherry');
my $anExampleVitaminBag = bag('apple' => 3, 'banana' => 2);
my $anExampleCabbageShopMix = mix('apple' => 1.5, 'banana' => 2.5);
my @anExampleNumberRange = 1..10; 
```

## Functions

```
# ----- FUNCTION -----
    # sub <functionName> ( <functionParameterName(s)> = <optionalFunctionDefaultParameterValue(s)> ) { <functionDefinitionBody> } => declaration and definition of a named function with an optional default parameter specification
    # sub <functionName> ( :<functionParameterName(s)> ) { <functionDefinitionBody> } => declaration and definition of a named function with named parameters
        # named parameters allow for arguments to be passed to a function under the specified parameter name instead of purely relying on the position of the function parameters in the function declaration and call

sub add($a, $b) { # function definition and declaration
    return $a + $b;
}
my $result = add(2, 3); # 5

sub greet($name = "World") { # default parameter specified within function definition
    say "Hello, $name!";
}
greet("Alice"); # Hello, Alice!
greet(); # Hello, World!

sub print_info(:$name, :$age) { # named parameters within a function definition
    say "Name: $name, Age: $age";
}
print_info(:name("Bob"), :age(25)); # function call with named parameters
```

## More on

* [subset datatype](https://docs.raku.org/language/typesystem)
* [routines](https://docs.raku.org/routines)
* [raku documentation](https://docs.raku.org/)
* [learn raku in y minutes](https://learnxinyminutes.com/docs/raku/)
