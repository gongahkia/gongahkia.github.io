---
category: Tech
---
# Ruby

# `Ruby`

In Ruby, everything is an object.

## Printing

```
puts "this prints with a newline" # puts
print "this prints without a newline/n" # print
```

## Comment

```
# single-line comment

=begin
this
is
a
multi-line
comment
=end

# everything is an object in Ruby

3.class # Integer
"Hello".class # String
"Hello".method(:class).class # Method
:pending.class # Symbol
```

## Variables, Constants, Scope

```
# ---------- VARIABLE ----------
    # variable assignment returns the value assigned
    # by convention, snake_case used for variable names

a_variable = 25
another_variable = "awesome sauce"
yet_another_variable = true

x = y = 10 # this will assign 10 to y, and that will then return 10 which is assigned to x

# ---------- SCOPE ----------
    # $ for global variables
    # @ for instance scope 
    # @@ for class scope
    # capitalised variable names for constants

$var = "I'm a global variable"
@var = "I'm an instance variable"
@@var = "I'm a class variable"
Var = "I'm a constant"
```

## Types

```
# ---------- STRING ----------

eg_string = "hello world" 

# FORMATTED STRINGS

placeholder = "watermelon"
put "I really am the largest #{placeholder} in this County." # formatted string

# STRING CONCATENATION
    # + can concatenate two strings together but not with other types

"hello" + "world" # "hello world"
"hello" + 3.to_s # "hello3", this is okay because the number 3 undergoes type conversion
"hello#{3}" # "hello3"
"hello" << " world" # "hellow world", appends a string to a string

# STRING MULTIPLICATION
    # just like Python!

"hello" * 3 # evaluates to "hellohellohello"
"ok and " * 2 # evaluates to "ok and ok and "

# ---------- NUMBER ----------
    # covers integers, floats and doubles like Typescript

eg_number = 1000
another_eg_number = 1.23

# ARITHMETIC OPERATORS
    # arithmetic is just syntatic sugar for calling a method on an object

1 + 1 # addition
8 - 1 # subtraction
10 * 2 # multiplication
35 / 5 # division
2 ** 5 # power 
5 % 3 # modulo
1 < 10 # comparison operators
1 > 10 # comparison operators
1 <= 10 # comparison operators
1 >= 10 # comparison operators
1 == 1 # complete equality, of both type and value
1 != 1 # complete inequality, of both type and value

# ---------- BOOLEAN -----------

eg_bool = true # of the TrueClass
other_eg_bool = false # of the FalseClass

# LOGICAL OPERATORS

true && false # and, evaluates to false
true || false # or, evaluates to true

# by convention, all methods that return booleans end with a question mark
5.even? # returns false
5.odd? # returns true

# ---------- SYMBOL ----------
    # symbols are immutable reusable constants often used in place of strings to convey specific meaning
    # represented internally by an integer

status = :pending
status == :pending # returns true
status == "pending" # returns false
status == :approved # returns false
status == "pending".to_sym # returns true since type conversion of String to Symbol

# ---------- SPECIAL VALUES ----------
nil # evaluates to false, same as null, of the NilClass
```

## Data structures

```
# BOTH ARRAYS AND HASHES ARE ENUMERABLE!

# ---------- ARRAY ----------
    # similar to Javascript arrays, arrays can store multiple values of different types

eg_array = [1,2,3,4,5]
mixed_array = [1, "hello", true]
another_mixed_array = %w[foo bar baz] # this evaluates to ["foo", "bar", "baz"]

# ARRAY METHODS

# INDEXING and SLICES
    # similar to Python
    # this is also just syntatic sugar to call the method [] on the array object

eg_array[0] # returns 1
eg_array.first # also returns 1
eg_array[12] # returns nil since index out of range

eg_array[-1] # returns last element, 5
eg_array.last # also returns 5

eg_array[2,3] # returns subarray of start index and length, [3,4,5]
eg_array[1..3] # returns a subarray of indexes specified in a range, similar to Python, [2,3,4]

## APPEND VALUE

eg_array << 6 # eg_array is now [1,2,3,4,5,6]
eg_array.push(6) # this does the same as the above

## CHECK IF VALUE IN ARRAY

eg_array.include?(1) # evaluates to true
eg_array.include?(100) # evaluates to false

# REVERSE AN ARRAY

[1,2,3].reverse # evaluates to [3,2,1]

# ---------- HASH ---------- 
    # similar to PHP's associative arrays
    # the equivalent of Python's dictionaries or Javascript's objects
    # stores key-value pairs
    # you can use symbols for keys also

eg_hash = {
    "color" => "green",
    "number" => 5
}

eg_hash.keys # returns ["color", "number"]
eg_hash["color"] # returns "green"
eg_hash["number"] # returns 5
eg_hash["nothing here"] # returns nil since the key doesn't exist 

# to use symbol as keys
another_hash = {
    :defcon => 3,
    :action => true
}
another_hash.keys # returns [:defcon, :action]

# an alternative syntax when using symbols for keys

yet_another_hash = {
    defcon:3, 
    action:true
}
yet_another_hash.keys # also returns [:defcon, :action]

yet_another_hash.key?(:defcon) # checks the existence of keys in hash, evaluates to true
yet_another_hash.value?(3) # checks the existence of values in hash, evaluates to true
```

## Control structures and logic flow

```
# ---------- CONDITIONALS ----------
    # similar syntax to bash
    # postfix-if notation is available also

# if elsif else

if true
    "if statement"
elsif false
    "else if, optional"
else
    "else, also optional"
end

warnings = ["Patronimic is missing", "Address is too short"]
puts("Some warnings occured:\n" + warnings.join("\n")) if !warnings.empty? # postfix-if notation can be used for single statements with no code blocks
puts("Some warnings occured:\n" + warnings.join("\n")) unless warnings.empty? # unless can be used in place with if

# case when else
    # else functions as the default statement
    # cases can also use ranges!

grade = "B"
case grade
when "A"
    puts "lovely"
when "B"
    puts "ok but good job"
when "C"
    puts "watermelon sugar high"
else
    puts "Alternative grading system, eh?"
end

num_grade = 82
case num-grade
when 90..100
    puts "nice one"
when 80..90
    puts "lovely job"
else
    puts "You failed!"
end

# ---------- LOOPS ----------
    # traditional for loops aren't common
    # basic loops are implemented with each enumerable
    # also similar syntax to bash and rust
    # Ruby has other looping functions like map, reduce and inject

# .each DO AND .each_with_index DO LOOPS

# APPROVED SYNTAX AND COMMONLY SEEN
(1..5).each do |counter|
    puts "this is the ${counter}"
end

# this is also approved syntax since blocks can be wrapped in curly braces
(1..5).each {|counter| puts "this is also the #{counter}"}

# APPROVED SYNTAX BUT RARELY SEEN
for counter in 1..5
    puts "iteration #{counter}"
end

# you can also iterate over elements in data structrues like Hashes and Maps
array.each do |element|
    puts "this is an #{element}"
end
hash.each do |key,value|
    puts "this is a #{key} and this is a #{value}"
end

# .each_with_index returns an index with an iterable, similar to enumerate() in python
array.each_with_index do |element, index|
    puts "#{element} and this is an #{index}"
end

# WHILE DO LOOPS
counter = 1
while counter <= 5 do
    puts "iteration #{counter}"
    counter += 1
end
```

## Methods

Since Ruby is largely OOP, functions are methods called on objects.

```
# ---------- METHODS ----------
    # similar to Scala and Rust, methods implictly return the value of the last statement
    # def
    # yield

def double(x)
    x * 2 # x * 2 is returned
end

double(2) # this returns 4
double 3 # parantheses are optional when interpretation of methods is unambigious, this returns 6

double double 3 # this returns 12

def sum(x,y)
    x + y
end

sum 3,4 # method arguments are separated by commas, this returns 7
sum sum (3,4), 5 # this returns 12

# yield
    # implicit optional block parameter that can be returned

def surround 
    puts "{"
    yield
    puts "}"
end

surround {puts "hello world"} # this returns { hello world } with hello world being a variable

# by convention, if the method name ends with an exclamation mark, the method does something destructive like mutate the receiver
    # many methods have ! version that modifies the existing object, and a non-! version that returns a copy of the changed version
```

## Class

```
# ---------- CLASSES ----------
class Human # create a class

    @@species = "Homo Sapiens" # @@ creates a class variable that is shared across all instances of the Human class

    # INSTANCE METHODS

    def initialize(name, age=0) # default constuctor method, it can be named anything really and serves the purpose of assigning values to the attributes of the instance object
        @name = name
        @age = age
    end

    def name=(name) # basic setter method
        @name = name
    end

    def name # basic getter method
        @name
    end

    # CLASS METHODS
        # only be called on the class, not an instance object

    def self.say(msg) # the self. distinguishes a class method from an instance method
        puts msg
    end

    def species
        @@species
    end

end

# INSTANTIATING A NEW CLASS OBJECT
    # .new()

jim = Human.new("Jimmy Neutron")
dwight = Human.new("Dwight Howard")

# calling instance methods
jim.species
jim.name # returns the name as a String
jim.name = "Jim the science guy" # takes in the assigned String value as the new instance object attribute
dwight.species

# calling class methods
Human.say("Hello sir") # returns "Hello sir"

# INHERITANCE

class Worker < Human # class Worker inherits all attributes and methods of the Human class
end
```

## Exception handling

```
# ---------- EXCEPTION HANDLING ----------
    # begin
    # raise
    # rescue =>
    # ensure
    # else

begin
  raise NoMemoryError, 'You ran out of memory.' # raises an exception
rescue NoMemoryError => exception_variable
  puts 'NoMemoryError was raised', exception_variable
rescue RuntimeError => other_exception_variable
  puts 'RuntimeError was raised now'
else
  puts 'This runs if no exceptions were thrown at all'
ensure
  puts 'This code always runs no matter what'
end
```

## More on

* destructuring
* splat operator
* [try ruby](https://try.ruby-lang.org/)
* [ruby documentation](https://www.ruby-lang.org/en/documentation/quickstart/)
* [learn ruby in y minutes](https://learnxinyminutes.com/docs/ruby/)
* [rubygems package manager](https://rubygems.org/)
* [ruby version manager](https://rvm.io/)
* [rubymotion for ios development](http://www.rubymotion.com/)
* [bundler for ruby dependency management](https://bundler.io/)
* [learn ruby's ecosystem in y minutes](https://learnxinyminutes.com/docs/ruby-ecosystem/)
* [haml documentation](https://haml.info/docs.html)
* [learn haml in y minutes](https://learnxinyminutes.com/docs/haml/)
