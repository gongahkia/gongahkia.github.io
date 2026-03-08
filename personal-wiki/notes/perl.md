# Perl

# `Perl`

The language for powerful string parsing.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

# there is no built-in 
# syntax for multi-line 
# comments
```

## Printing

```
# ---------- PRINT ----------
    # print => prints a string to the stdout and appends a newline to the output
    # printf => prints formatted strings to the stdout and does not append a newline to the output

print "this will include a newline automatically";
printf "this will not include a newline and we need to specify its inclusion\n";
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # all Perl scripts include these lines at the start
    # strict => module that causes compilation to fail when variable names are misspelt 
    # warnings => module that prints pre-emptive warning messages to the stdout for common pitfalls

use strict;
use warnings;
```

## Types

```
# ---------- TYPE ----------
    # scalar => Integer, Float, String, Reference, declared with $
    # array => ordered sequence of scalar values, declared with @
    # hash => unordered sequence of key-value pairs, declared with %
    # scalar reference => declared with \$
    # array reference => declared with \@
    # hash reference => declared with \%
    # code reference => declared with \&
    # glob => represents an entire symbol table entry like scalars, arrays and hashes, declared with *
```

## Variables

```
# ---------- VARIABLE ----------
    # variable names start with a sigil specifying their variable type
        # $ => specifies a scalar variable containing a single value, can be an Integer, Float, String, Reference
        # @ => specifies an array variable containing an ordered sequence of values of different types, similar to lists in other languages
        # % => specifies a hash variable containing an unordered sequence of comma-delimited key-value pairs, similar to hashmaps in other languages
        # \ => placed in front of another data type to create a reference to it, allowing creation of nested arrays and hashes, note that a Reference is of the scalar data type

# SCALAR

my $a_string = "camel";
my $an_integer = 42;
my $a_floating_point = 2.312;
my $a_reference_to_a_hash = \%imagine_a_hash;

# ARRAY

my @a_string_array = ("camel", "llama", "owl");
my @an_integer_array = (1, 21, 321);
my @a_mixed_array = ("camel", 42, 1.2378);

# HASH
    # => => specifies the relationship between a key and value in a key-value pair

my @a_fruity_hash = {
    apple  => "red",
    banana => "yellow", 
};

# REFERENCES
    # $, @, % => dereference a given reference by prefixing it with the appropriate sigil
    # -> => dereferences and access a single value

my $scalar_ref = \$a_string; # creates a reference to a scalar variable
my $array_ref = \@a_string_list; # creates a reference to an array variable
my $hash_ref = \%a_fruity_hash; # creates a reference to a hash variable

my @string_array = @$array_ref; # dereference a reference to an array
my %fruity_hash = %$hash_ref; # dereference a reference to a hash

my $first_value_string_array = $array_ref->[0]; # access array element by index
my $banana_value_fruity_hash = $hash_ref->{banana} # access hash value by its corresponding key
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => divison
    # % => modulo operator
    # ** => exponentiation operator
    # += => increment by specified value and reassign
    # -= => decrement by specified value and reassign

# LOGICAL OPERATORS
    # && => logical and
    # || => logical or
    # ! => logical not

# COMPARSION OPERATORS
    # eq => complete equality check for value and type
    # ne => complete inequality check for value and type
    # == => partial equality check for value
    # != => partial inequality check for value
    # >, <, >=, <= are also comparison operators
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONALS

# IF ELSIF ELSE

my $x = 10;
if ($x > 10) {
    print "x is bigger than 10";
} elsif ($x < 10) {
    print "x is smaller than 10";
} else {
    print "x is equals to 10";
}

# UNLESS
    # equivalent of if (!predicate)

unless ($x == 10) {
    print "x is not equals to 10";
}

# LOOPS
    # imperative-style loops are available, however Perl also provides higher-order functions like map, grep (similar to filter in other languages), reduce

# FOR LOOPS AND FOREACH LOOPS
    # for, foreach => allows for iteration over a specified iterable collection of data
    # for and foreach are equivalent in Perl

my $max = 5;
for my $i (0 .. $max) { # iterates over elements within a specified range
  print "index is $i";
}

for my $element (@elements) { # iterates over elements within an existing array
  print $element;
}

# WHILE LOOPS

my $y = 5;
while ($y > 1) {
    print "y is not 1";
    $y -= 1;
}
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# ARRAY
    # @ => declares an array variable that can store an array value within () brackets
    # array elements accessed by index using [] square bracket notation
    # array size accessed by assigning the array to a scalar variable
    # scalar() => returns the size of an array

my @numbers = (23, 42, 69); # creates an array numbers
my $second = $animals[1]; # this evaluates to 42
my $num_numbers = @numbers; # this returns 3, the size of the array
my $also_num_numbers = scalar(@numbers); # this also returns 3 for the size of the array

# HASH
    # % => declares a hash variable that can store a hash value within () brackets
    # hash elements accessed by key using {} curly brace notation
    # keys => returns all the keys of an array
    # values => returns all the values of an array

my %parklane_dishes = (
    fish => 2.50,
    chicken => 2.00,
    vegetable => 1.00,
    egg => 0.50,
);
my $parklane_fish = $parklane_dishes{fish}; # access the value stored at the fish key within the parklane_dishes hash
my $all_dishes = keys %parklane_dishes; # returns all the keys stored within the parklane_dishes hash
my $all_costs = values %parklane_dishes; # returns all the values stored within the parklane_dishes hash
```

## Functions

```
# ---------- FUNCTION ----------
    # sub => declares and creates a function
    # return => specifies the return expression, similar to return in other languages
    # shift => procedurally retrieves the arguments passed to the function
    # @_ => assigns function arguments to an array which then allows their retrieval via index or implicit deconstruction
    # function parameters are not explicitly declared and must be assigned within the function

sub greet {
    my $name = shift;  # retrieves the first argument passed to the function and assigns it to the scalar variable name
    print "Hello, $name!";
}
greet("Alice"); # this prints "Hello, Alice!" to the stdout

sub multiply {
    my ($num1, $num2) = @_; # deconstructs and assigns the arguments passed to the function to the scalar variables num1 and num2
    my $result = $num1 * $num2;
    return $result;
}
my $product = multiply(3, 4); # this evaluates to the scalar value 12
```

## More on

* regular expressions
* subroutines
* anonymous arrays and hashes
* modules
* objects
* [learn perl in y minutes](https://learnxinyminutes.com/docs/perl/)
* [perl documentation](https://perldoc.perl.org/)
* [perl regex cheatsheet](https://www.cheat-sheets.org/saved-copy/perl-regexp-refcard-a4.pdf)
