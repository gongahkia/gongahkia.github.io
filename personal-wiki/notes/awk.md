# Awk

# `Awk`

Standard UNIX tool for text-processing that's more readable than Perl.

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
    # printf => prints a string to the stdout and does not include a newline, allows for format specifiers for further string interpolation
        # %s => string
        # %c => char
        # %d => integer number
        # %f => floating-point number
        # %x => hexadecimal number 
        # %o => octal number
        # %% => literal percent sign

printf "this does not include a newline and we must explicitly specify its inclusion\n";
a_number = 10;
printf "this too %d needs a newline explicitly specified\n", a_number;
print "this includes a newline automatically";
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # ; semicolons aren't required but encouraged for awk's one-liners
    # awk programs consist of a collection of patterns and actions that are iterated over for each white-space delimited file supplied
    # #!/usr/bin/awk -f => conventionally placed at the start of every awk script file, to specify awk is to be used to interpret this program
    # BEGIN => runs at the beginning of the program and typically used to setup any preliminary code before files are read, pattern that is true before any of the specified files are read
    # END => runs at the end of the program after all text files are processed, pattern that is true after an end-of-file from the last specified file is provided
    # variables are global by default

#!/usr/bin/awk -f

pattern1 { action; }
pattern2 { action; }

BEGIN {
    count = 0; # this is a global variable by default
}

END {
    print "all done";
}
```

## Types

```
# ---------- TYPE ----------
    # Integer
    # Float
    # Char => '' single quotation marks
    # String => "" double quotation marks
    # Boolean => 0 is false, any non-0 value is true
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => division
    # % => modulo operator
    # ^ => exponentiation operator
    # ++ => increment by one
    # -- => decrement by one
    # += => addition and reassignment
    # -= => subtraction and reassignment
    # *= => multiplication and reassignment
    # /= => division and reassignment
    # %= => modulus reassignment
    # ^= => exponentiation and reassignment

# LOGICAL OPERATORS
    # && => logical and
    # || => logical or
    # ! => logical not

# COMPARISON OPERATORS
    # == => partial equality check for value
    # != => partial inequality check for value
    # ~ => equality check for a match using regular expressions
    # !~ => inequality check for a match using regular expressions 
    # < > <= >= are also comparison operators
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONALS

# IF ELSE IF ELSE

if ($1 == "apple") {
    print "It's an apple!";
} else if ($1 == "banana") {
    print "It's a banana!";
} else if ($1 == "orange") {
    print "It's an orange!";
} else {
    print "It's something else.";
}

# TERNARY OPERATOR
    # ternary syntax is => {PREDICATE} ? {TRUE FORM} : {FALSE FORM}

result = ($1 == "apple") ? "It's an apple!" : "It's not an apple."

# LOOPS

# WHILE LOOPS

while (a < 10) {
    print "string concatenation is done" " with a series" " of" " space-delimited strings";
    print a;
    a++;
}

# FOR LOOPS
    # for => allows for a rudimentary for loop implementation
    # for in => allows for iteration of an element across an iterable data structure like an associative array

for (i = 0; i < 10; i++)
    print "we gonna keep looping until we hit 9";

an_arr[0] = "watermelon";
an_arr[1] = "sugar";
an_arr[2] = "low";

for (key in an_arr)
    print an_arr[key];
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# ASSOCIATIVE ARRAYS
    # combination of an array and a hash comprised of key-value pairs, similar to tables in Lua or associative arrays in PHP
    # split => splits a string by a specified delimiter and returns an associative array 
    # in => checks for an element's membership in a specified associative array

string_arr[0] = "foo";
string_arr[1] = "bar"; # creates an associative array called string_arr with two string values that have integer keys

string_assoc["foo"] = "bar";
string_assoc["bar"] = "baz"; # creates another associative array called string_assoc with two string values that have string keys

n = split("foo:bar:baz", arr, ":"); # split() also initializes an array, similar to Python

if ("foo" in assoc)
    print "Fooey!"; # checks for array membership
```

## Functions

```
# ---------- FUNCTION ----------
    # function => declares and creates a function
    # return => specifies the function return expression
    # only function parameters are local to the function, every other variable including those declared first within the function are global, so the workaround is to declare more function parameters than required and using those extra parameters as local variables

function hello() {
    print "hello world";
}
```

## More on

* file IO
* pipes
* ARGV
* ARGC
* [awk documentation](https://www.gnu.org/software/gawk/manual/gawk.html)
* [learn awk in y minutes](https://learnxinyminutes.com/docs/awk/)
* [awk one-liners](http://tuxgraphics.org/~guido/scripts/awk-one-liner.html)
* [awk libraries](https://github.com/dubiousjim/awkenough)
* [awk made easy](https://www.grymoire.com/Unix/Awk.html)
