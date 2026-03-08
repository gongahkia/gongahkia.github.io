# Ada

# `Ada`

Systems language for transportation, aerospace and defense.

## Comments

```
-- ----- COMMENT -----

-- this is a single line comment

/*
this is 
a multiline 
comment
*/
```

## Printing

```
-- ----- PRINTING -----
    -- Put_Line() => procedure that takes in an argument and prints it to the stdout with a newline included by default
    -- Put() => procedure that takes in an argument and prints it to the stdout without a newline
    -- New_Line => prints out a newline to the stdout, the equivalent of Put("\n")

Put_Line("this includes a newline");
Put("this does not include a newline\n");
New_Line; -- also prints out a newline
```

## Quickstart

```
-- ----- QUICKSTART -----
    -- strongly, statically typed
    -- semicolon language
    -- similar to Lua (and unlike many conventional programming languages), Ada arrays are 1-indexed
    -- declare => declares local variables within a nested block (eg. procedure, function) that are only visible within that local scope 
    -- : => specifies the datatype of a given variable via type annotations
    -- := => simultaneous declaration and initialisation of a variable, similar to Go lang
    -- <variableDatatype>'Image(<variableValue>) => converts values of various types to their corresponding string representations, often used for printing values to the stdout

declare
    A : Integer := 5; -- simultaneous declaration and initialisation of A as an Integer
    B : Integer; -- declaration of B's type as an Integer
    C : Float := 3.14; -- simultaneous declaration and initialisation of C as a Float
begin
    B := A * 2; -- assign the value of 2A to B after B's variable declaration above
end;
```

## Types

```
-- ----- TYPE -----
    -- Integer => integer values
    -- Float => floating point values
    -- Boolean => true, false
    -- Character => single character value, represented within '' single quotes
    -- String(<MinIndex> .. <MaxIndex>) => handled as an array of characters, with the bounds of the string declared within the brackets
```

## Operators

```
-- ----- OPERATOR -----

-- --- ARITHMETIC OPERATOR ---

+ -- addition
- -- subtraction
* -- multiplication
/ -- division
mod -- modulo

-- --- COMPARISON OPERATOR ---
    -- note there is no need for a complete equality operator as in other languages since Ada already performs strict type checking by default

= -- partial equality of value only
/= -- partial inequality of value only
< -- comparison operator
> -- comparison operator
<= -- comparison operator
>= -- comparison operator

-- --- LOGICAL OPERATOR ---

and 
or
not
```

## Control structures

```
-- ----- CONTROL STRUCTURE -----

-- --- CONDITIONALS ---

-- IF ELSIF ELSE
    -- note that its elsif and note elseif or elif

declare
    A : Integer := 10;
begin
    if A > 5 then
        Put_Line("A is greater than 5");
    elsif A = 5 then
        Put_Line("A is 5");
    else
        Put_Line("A is less than 5");
    end if;
end;

-- CASE WHEN OTHERS
    -- the equivalent of switch case or match case statements in other programming languages, affording Ada a bare degree of basic pattern-matching
    -- see that => specifies the relationship between each condition's fulfilled predicate and the execution code for that scenario
    -- | => allows for multiple value pattern matching
    -- others => the default fall-through case for if every other predicate when check is not fulfilled, the equivalent of the catch-all operator _ in Rust

declare
    X : Integer := 2;
begin
    case X is
        when 1 =>
            Put_Line("X is 1");
        when 2 =>
            Put_Line("X is 2");
        when 3 | 4 => -- here, this pattern will be matched as long as X is 3 or 4
            Put_Line("X is 3 or 4");
        when others =>
            Put_Line("X is something else");
    end case;
end;

-- --- LOOPS ---
    -- exit when <exitCondition> => Ada does not have the keyword break, but affords the exit when construct which effectively serves the same purpose by allowing termination of the current iteration cycle at the programmer's discretion

-- FOR IN LOOPS
    -- Ada does not have traditional C-style for loops, but the for in loop construct allows similar iteration over any iterable structure
    -- .. => range operator allows for dynamic generation of a range literal that can be iterated over
    -- reverse => iterates over the specified range in reverse
    -- step => further augments the loop by specifying the increment in each iteration cycle

declare
    Sum : Integer := 0;
begin
    for I in 1 .. 10 loop
        Sum := Sum + I;
    end loop;
    Put_Line("Sum of 1 to 10: " & Integer'Image(Sum));
end;

begin
    for J in reverse 1 .. 5 loop -- reversing a range to iterate over
        Put_Line("Iteration: " & Integer'Image(J));
    end loop;
end;

begin
    for K in 1 .. 10 step 2 loop -- specifies to step by 2 each iteration cycle of the loop
        Put_Line("Iteration: " & Integer'Image(K));
    end loop;
end

-- WHILE LOOPS
    -- Ada while loops are more in line with the standard while loop formula we are used to in other programming languages

declare
    Counter : Integer := 0;
begin
    while Counter < 10 loop
        Put_Line("Counter: " & Integer'Image(Counter));
        Counter := Counter + 1;
    end loop;
end;
```

## Data structures

```
-- ----- DATA STRUCTURE -----
    -- array => where the .. range operator can be used to dynamically generate values over a range to create an iterable data structure
    -- record => equivalent of a struct in Go and programming languages, effectively allowing a type alias for user-defined types with specified fields that are semicolon-delimited
    -- enum => specified by listing all the possible enumeration values within () brackets, comma-delimited

type IntArray is array (1 .. 10) of Integer;
Numbers : IntArray := (1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

type Person is record
    Name : String (1 .. 20);
    Age  : Integer;
end record;

type Coordinate is record
    X: Integer;
    Y: Integer;
end record;

type Day is (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday);
```

## Procedures and Functions

```
-- ----- PROCEDURE -----
    -- Ada procedures are effectively void functions, are are used to store reusable execution code that does not return a value 
    -- procedures can also be thought of as 'OOP methods' in the sense that they perform specific operations while not returning any explicit value

procedure Print_Message is
begin
    Put_Line("Hello from a procedure!");
end Print_Message;

begin
    Print_Message;
end;

-- ----- FUNCTION -----
    -- Ada functions operate similarly as in any other programming language, with the notable exception that they must return a value (void functions are written as procedures in Ada)
    -- function <functionName> (<parameter(s)>:<parameterType(s)>) return <returnType> is => function declaration for a named function

function Add (A, B : Integer) return Integer is
begin
    return A + B;
end Add;

begin
    Put_Line("Sum: " & Integer'Image(Add(5, 3)));
end;
```

## More on

* [ada documentation](https://ada-lang.io/docs/arm)
* [learn ada in y minutes](https://learnxinyminutes.com/docs/ada/)
