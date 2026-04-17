---
category: Tech
---
# Bash

# `Bash`

Shell scripting language to pimp out your Arch-Neovim-Tmux development setup.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

:'
this is a 
multi-line
comment
'
```

## Printing

```
# ---------- PRINT ----------
    # echo => prints a string and appends a newline to the output by default
        # -n => flag specifies not to include a newline in the output

echo "i want to play dead space and this includes a newline automatically"
echo -n "this does not include a newline by default and we must explicitly specify it\n"
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # running a bash file requires us to first convert it to an executable using => chmod +x {FILENAME}, then run it using => ./{FILENAME}
    # within the cli, the one input source is stdin and the two outputs sourced are stdout and stderr comprising the three streams
        # stdin => 0, standard input, where user input taken in using read goes
        # stdout => 1, standard output to the console in response to a command by the programmer running succesfully
        # stderr => 2, standard error to the console when a command by the programmer results in an error
    # Bash is powerful because most unix-compatible cli commands are valid commands that can be used within a Bash script
```

## Variables

```
# ---------- VARIABLE ----------
    # $ => inserted in front of variable names whenever a variable is called similar to PHP
```

## Types

```
# ---------- TYPE ----------
    # String => strings and chars, declared with "" double quotation marks
    # Number => integers and floats, though numbers are treated as Strings by default
    # Boolean => Bash has no default true or false values, instead the success and failure of commands model boolean values
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

# LOGICAL OPERATORS
    # && => logical and
    # || => logical or
    # ! => logical not

# COMPARISON OPERATORS
    # == => partial equality check for string values, not type
    # != => partial inequality check for string values, not type
    # -eq => partial equality check for numeric values, not type
    # -ne => partial inequality check for numeric values, not type
    # > < >= <= are also valid comparison operators
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# ---------- CONDITIONALS ----------

# IF ELIF ELSE
    # predicate is surrounded by [] square brackets

peepee = 10
if [$peepee -eq 10]; then
    echo "peepee is equal to 10!"
elif [$peepee -ne 10]; then
    echo "peepee is not equal to 10!"
else
    echo "logically speaking this should not be possible"
fi

# CASE IN *
    # case in => declares a case block similar to switch case statements in other languages
    # ) => appends every case statement's specified value
    # ;; => append every case statement's logic, acting as the equivalent of a break statement to ensure logic breaks out after a given case is hit
    # * => specifies the default case should all other conditions fall through

car = 10
case $car in
    "BMW" )
        echo "your kar is a BMW";;
    "Toyota" )
        echo "aigh bet";;
    "Honda" )
        echo "your car is a Hoonda";;
    "Toyota" )
        echo "car ni na";;
    * )
        echo "this is the default case";;
esac

# ---------- LOOPS ----------
    # break => breaks out of the current loop
    # condition => skips to the next iteration of the given loop

# WHILE DO LOOPS
    # loop condition specified within [] square brackets

number = 1
while [ $number -lt 10 ]
do
    echo "$number"
    number = $((number+1))
done

# UNTIL LOOPS
    # loop condition specified within [] square brackets
    # equivalent of a while false loop in Bash

number = 1
until [ $number -ge 10 ]
do
    echo $number
    number $((number+1))
done

# FOR LOOPS
    # allows for rudimentary for loops with an explicit start, step and end

for (( i=0; i<5; i++ )) 
do
    echo $i
done

# FOR IN LOOPS
    # allows for iteration over a specified range
    # .. => allows for creation of implicit ranges with the syntax => {START..END..STEP}

for i in 1 2 3 4 5
do
    echo $i
done # prints 1\n2\n3\n4\n5\n to the stdout

for i in {0..20..2}
do
    echo $i
done # prints 0\n2\n4\n6\n8\n10\n12\n14\n16\n18\n20\n
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# ARRAY
    # dynamically-sized ordered sequence of space-delimited elements of the same type declared with () brackets
    # [] => access elements within the array via their index and assigning new elements to the array using square bracket notation
    # @ => used as an index to access all elements within the array
    # # => returns the length of the array
    # unset => removes an element from the array

cars = ("BMW" "Toyota" "Honda")
echo "${cars[1]}" # prints out Toyota, the element of index 1
cars[3] = "Tesla" # adds the element of value "Tesla" to the cars array at index 3
echo "${cars[@]}" # prints out all the elements within the array
echo "${#cars[@]}" # prints out the length of the array, 3
unset cars[1] # removes the element Toyota of index 1

# ASSOCIATIVE ARRAY
    # dynamically-sized unordered sequence of key-value pairs of different types similar to associative arrays in PHP or tables in Lua
    # declare -A => used to specify a declaration and creation of an associative array at a given name
    # [] => used to assign and retrieve key-value pairs from the asssociative array

declare -A my_assoc_array
my_assoc_array["name"]="John"
my_assoc_array["age"]=25
echo "${my_assoc_array["name"]}"
```

## Functions

```
# ---------- FUNCTION ----------
    # bash functions don't list function parameters within the bracket after the function name, but within the function logic
    # $ => accompanied with a number starting from 1 to indicate the function parameters
    # function => declares and creates a new function of a specified name

function test_function() 
{
    echo -n "this is a new function"
}

function test_function()
{
    echo -n "hello $1, $2, $3, $4" # function takes in 4 arguments and prints them sequentially to the stdout
}
```

## Bash tooling

```
# ---------- TOOLING ----------
    # cat => returns all text within a specified file
        # > => writes the specified output to a given file
        # >> => appends the specified output to a given file
    # mkdir => creates a folder within the local directory
        # -p => prevents an error if the Bash executable runs more than once
        # -d => checks for the existence of a file directory at the specified name
    # touch => creates a file within the local directory
        # -f => checks for the existence of a file at the specified name
    # curl => client url that makes a call request from a local client device to the server
        # -O => specifies the downloaded file should inherit the name assigned to it by the remote server
        # -o => specifies the downloaded file should be saved under a specified name as provided by the programmer
        # -I => retrieves downloaded file metadata
    # grep => powerful search construct within files that supports regular expressions in the syntax grep {SEARCH PARAMETERS} {FILENAME}
        # -i => removes case sensitivity
        # -n => adds line numbers to each returned matched pattern
        # -c => return matched pattern and the number of matches found
        # -v => return number of lines within the specified file that don't have the pattern

echo "directory name: "
read directory_name
if [ -d "$directory_name" ]
then
    mkdir -p $directory_name
fi

echo "file name: "
read file_name
if [ -f "$file_name" ]
then 
    touch $file_name
fi

url = "https://proof.ovh.net/files/1Mb.dat"
curl ${url}

echo "filename: "
read file_name
if [ -f "$file_name" ]
then
    echo "search parameters: "
    read search_param
    grep -i -n -c -v $search_param $file_name
else
    echo "$file_name does not exist"
fi
```

## More on

* select in
* ^
* ^^
* export
* IFS
* user input
* file IO
* heredoc delimiter
* string concatenation
* sed
* [bash documentation](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
* [learn bash in y minutes](https://learnxinyminutes.com/docs/bash/)
