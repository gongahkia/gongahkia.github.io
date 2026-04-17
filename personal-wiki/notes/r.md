---
category: Tech
---
# R

# `R`

Domain-specific language for statistical computing, data analysis and visualization.

## Comments

```
# ----- COMMENT -----

# this is a single-line comment

# there is no default 
# implementation for multi-line comments
# but the following syntax will achieve 
# the same effect
```

## Printing

```
# ----- PRINTING -----
    # print() => receives a string argument that is then printed to the stdout, with a newline automatically included at the end of the output
    # cat() => receives a string argument to be printed to the stdout and does not include a newline by default

print("this has a newline automatically included")
cat("this does not have a newline included and it must be explicitly specified as such\n")
```

## Quickstart

```
# ----- QUICKSTART -----
    # dynamically-typed interpreted language
    # weak type system with implicit type conversion
    # optimized for operations on vectors and matrices 
    # supports functional programming paradigms
    # <- => R uniquely uses <- as the default preferred assignment operator assigning a variable to a value or named function, although it is noteworthy that = is a valid alternative syntax

x <- 10

square <- function(a) {
    result <- a * a
    return(result)
}
print(square(x)) # this displays 100 to the stdout
```

## Types

```
# ----- TYPE -----
    # numeric => stores numbers with and without decimal points, covering both integers and floating point value numbers
    # integer => stores an integer number value
    # complex => stores a complex number value with real and imaginary parts
    # character => stores single character and string data, declared within "" double quotation marks
    # raw => stores char values as raw bytes
    # logical => stores boolean TRUE and FALSE values
    # Date => stores a date value in the format YYYY-MM-DD
    # POSIXct => stores a datetime timestamp value in the format YYYY-MM-DD HH:MM:SS
```

## Operators

```
# ----- OPERATOR ----- 

# --- ARITHMETIC OPERATOR ---

+ # addition
- # subtraction
* # multiplication
/ # division
%% # modulo
^ # exponentiation

# --- COMPARISON OPERATOR ---

== # partial equality check for value but not type
!= # partial inequality check for value but not type
> # comparison operator
< # comparison operator
>= # comparison operator
<= # comparison operator

# --- LOGICAL OPERATOR ---

& # logical and
| # logical or
! # logical not
```

## Control structures

```
# ----- CONTROL STRUCTURE -----

# --- CONDITIONALS ---

# IF ELSE IF ELSE 

x <- 5
if (x > 0) {
    print("x is positive number")
} else if (x < 0) {
    print("x is non-positive number")
} else {
    print("this is just for edge-guarding but should logically never run")
}

# SWITCH()
    # the switch() construct allows for a degree of pattern-matching in R, the equivalent of switch case and match case statements in other programming languages
    # each comma-delimited predicate case condition listed within the switch() construct has its relationship specified with =
    # first argument in switch() is the value to be checked
    # final argument in switch() is the default fall-through value returned if all other specified predicate case conditions are unmet
    # the result of switch() constructs can be directly assigned to a variable, reminiscent of other functional languages

x <- 3
result <- switch(x,
                "1" = "one",
                "2" = "two",
                "3" = "three",
                "4" = "four",
                "invalid number")

# --- LOOPS ---

# FOR IN 
    # equivalent of foreach loops in PHP and similar to loops in Python, allowing iteration over each element within an iterable structure
    # <startingRangeValueInclusive> : <endRangeValueInclusive> => dynamic creation of an iterable range structure that includes the inclusive start and end value

for (i in 1:5) {
    print(i)
}

# WHILE 
    # operates exactly the same as in other programming languages

count <- 1
while (count <= 5) {
    print(count)
    count <- count + 1
}

# REPEAT
    # creates an infinite loop construct, similar to the loop keyword in Rust
    # remember to include a break condition within a conditional predicate check as below to prevent unintentional infinite loops in your R program

count <- 1
repeat {
    print(count)
    count <- count + 1
    if (count > 5) {
        break
    }
}
```

## Data structures

```
# ----- DATA STRUCTURE -----
    # vector => one-dimensional ordered collection of elements of the same datatype
    # matrix => two-dimensional ordered collection of elements of the same datetype
    # array => multi-dimensional ordered collection of elements of the same datatype
    # list => ordered mapped collection of elements of multiple datatypes and their corresponding named fields, where elements can be accessed by their names or indices, effectively a hybrid between a hashmap and an arraya and the equivalent of an indexmap in rust
    # data frame => two-dimensional literal table-like structure where named columns can be of multiple datatypes
    # factor => stores categorical data which is stored within level, R's rough equivalent of enums in Rust that allows for more expressive statistical modelling

anExampleVector <- c(1, 2, 3, 4, 5)
anExampleMatrix <- matrix(1:9, nrow = 3)
anExampleArray <- array(1:12, dim = c(3, 2, 2))
anExampleList <- list(name = "John", age = 30, married = TRUE)
anExampleDataFrame <- data.frame(name = c("Alice", "Bob"), age = c(25, 30))
anExampleFactorWithLevels <- factor(c("low", "medium", "high"))
```

## Functions

```
# ----- FUNCTION -----
    # <functionName> <- function(<functionParameters(s)>) { <functionBodyDefinition> } => function declaration and definition of a named function, despite the slightly odd syntax that appears to suggest an anonymous function
    # return => note that R features explicit returns using the return keyword

add <- function(x, y) {
    return(x + y)
}
result <- add(5, 3) # the value stored in result is 8
```

## Data visualisation

```
# ----- DATA VISUALISATION -----
    # library() => loads in the specified libraries required for data visualisation, bringing them into local scope within the present R file
    # set.seed() => assigns an integer number value as a seed that can later be called for reproducability of the same result set
    # ggplot() => generic function to call the visualisation library, within which various augmenters can be specified to determine the type of visualisation, as well as further aesthetic specifications
    # geom_point => plots a scatter plot to visualise the initialised dataframe data
    # geom_bar => plots a bar plot to visualise the initialised dataframe data
    # geom_line => plots a line plot to visualise the initialised dataframe data
    # geom_boxplot => plots a box plot to visualise the initialised dataframe data
    # geom_histogram => plots a histogram to visualise the initialised dataframe data

library(ggplot2) # loads in the ggplot2 library for plotting data

# creation of a given dataframe with designated values
data <- data.frame(
    x = 1:10,
    y = rnorm(10, mean = 0, sd = 1)
) 

# plots a scatter plot
ggplot(data, aes(x = x, y = y)) +
    geom_point() +
    labs(title = "Scatter Plot", x = "X Axis", y = "Y Axis")

# plots a bar plot
ggplot(data, aes(x = x, y = y)) +
    geom_bar(stat = "identity", fill = "skyblue") +
    labs(title = "Bar Plot", x = "X Axis", y = "Y Axis")

# plots a line plot
ggplot(data, aes(x = x, y = y)) +
    geom_line(color = "red") +
    labs(title = "Line Plot", x = "X Axis", y = "Y Axis")

# plots a box plot
ggplot(data, aes(y = y)) +
    geom_boxplot() +
    labs(title = "Box Plot", y = "Y Axis")

# plots a histogram
ggplot(data, aes(x = y)) +
    geom_histogram(fill = "lightgreen", color = "black", bins = 10) +
    labs(title = "Histogram", x = "Y Axis", y = "Frequency")
```

## More on

* [install r gui](https://cran.r-project.org/bin/windows/base/)
* [vector attributes in r](https://adv-r.hadley.nz/vectors-chap.html)
* [data.tables in r](https://cran.r-project.org/web/packages/data.table/vignettes/datatable-intro.html)
* [r documentation](https://www.r-project.org/other-docs.html)
* [learn r in y minutes](https://learnxinyminutes.com/docs/r/)
