# GDScript

# `GDScript`

## Comments

```
# ---------- COMMENT ----------

# single-line comments

"""
multi-line comments
are written using
docstrings like 
this
"""
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # GDScript shares a lot of similarities syntax-wise with Python
    # file structure
    # inheritance
    # export

# every GDScript file is a class in itself
    # class_name defines a class for it explicitly

class_name MyClass

# extends specifies which node the GDScript file inherits behaviour from

extends Node2D

# export makes specified variables visible in the godot inspector
    # export variable data types are specified by convention
    # type hints are not required if a default value is set upon exporting

export(int) var age # type hints are required
export(float) var height
export var person_name = "Bob" # type specified since default value of "Bob" can be inferred to be a string upon exporting
```

## Printing

```
# ---------- PRINT STATEMENT ----------
    # print() works by default as in Python, does not separate elements by anything
    # printraw() prints the specified message to stdout with no fancy reformatting
    # prints() prints elements and separates them by spaces
    # printt() prints elements and separates them by tabs

print("This works as ", "you'd expect in Python") # "This works as you'd expect in Python"
printraw("This also works") # "This also works"
prints("This", "adds", "spaces", "between", "elements") # "This adds spaces between elements"
printt("This", "adds", "tabs", "between", "elements") # "This adds tabs between elements"
```

## Variables and Constants

```
# ---------- VARIABLE and CONSTANT ----------
    # var declares a variable
        # a variable's value can be changed after assignment
        # snake_case names by convention
    # const declares a constant
        # a constant's value cannot be changed after assignment
        # FULLY CAPITALISED names by convention

var a_variable:String = "i am a variable"
const BREAKFAST:String = "eggs and ham!"
```

## Types

```
# ---------- TYPE ----------
    # static typing is optional but encouraged, can be achieved with :
    # := allows for type inference based on value provided at assignment
    # int
    # float
    # bool (0 is false, every other non-0 integer is true)
    # String (chars are also strings)
    # NodePath (NodePath() or @ specifies the nodepath literal to another node)
        # specified nodepath is a relative path unless otherwise stated
        # @"/root" specifies an absolute path from the project's root folder
        # : allows us to access a variable's properties and subproperties via nodepath
    # null (absence of a value)
        # it has no data type specified for it since it represents the absence of a value, and is a special unique value

var x:int = 8
var y:float = 1.2
var b:bool = true # can also be false
var s:String = "hello world!"
var c:String = "a" # this is also a string
var relative_nodepath:NodePath = @"this is a nodepath literal" # note that this denotes the relative path
var absolute_nodepath:NodePath = @"/root/Main/Player/Sprite" # absolute path to the player's sprite
var firerate_properties:NodePath = @"Timers/Firerate:wait_time" # accessing properties
var player_position_subproperties:NodePath = @"Player:position:x" # accessing subproperties
var i_am_null = null # note there is no static typing since null is a special value by itself with no inherent data type

# TYPE CASTING
    # type casting refers to explicit type conversion
    # variables constructor (similar to Python)

var an_int_to_a_float = float(200) # 200 type casted to 200.0 through variable constructor syntax
var an_int_to_a_bool = bool(42) # 42 type casted to a true through variable constructor syntax
```

## Data structures

```
# ---------- DATA STRUCTURE ----------
    # array (dynamic list that can store variables of multiple types, similar to Python lists)
    # pool array (list that can only store variables of one type, more memory-efficient than an array)
        # declared with PoolStringArray() syntax
    # vector (dynamic list that can also store variables of multiple types similar to arrays, though arrays offer more functionality)
        # Vector2() specifies a 2D-vector
        # Vector3() specifies a 3D-vector
        # commonly used to represent positions of game entities on a 2D or 3D plane
    # dictionary (hash map that stores key-value pairs, similar to dictionaries in Python or tables in Lua)

var an_array = [1, false, "i can hold values of multiple types"]
var a_pool_array = PoolStringArray(["Hello", "there", "brother", "in", "Christ"])
var a_2d_vector = Vector2(1,2)
var a_3d_vector = Vector3(1,2,3)
var a_dictionary = {
    "key":"value",
    42: true,
    "i work how you'd expect as well": 4
}
```

## Functions

```
# ---------- FUNCTION ----------
    # func declares a function block
    # pass
    # return
    # functions can benefit from static typing too for argument and return values

func foo() -> void: # void functions return nothing
    pass # works the same as in Python

func add(first:int, second:int) -> int:
    return first + second
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATOR

    # + for addition
    # - for subtraction
    # * for multiplication
    # / for division
    # % for modulo
    # += for increment
    # -= for decrement
    # *= for multiplication and reassignment
    # /= for division and reassignment
    # %= for modulo and reassignment
    # pow() for exponentiation
    # sqrt() for squareroot of a value

var first = 8
var second = 4
first + second # evaluates to 12
first - second # evaluates to 4
first * second # evaluates to 32
first / second # evaluates to 2
first % second # evaluates to 0
first += first # evaluates to 16
first -= first # evaluates to 0
first *= first # evaluates to 64
first /= first # evaluates to 1
first %= first # evaluates to 0
pow(first, 2) # evaluates to 64
sqrt(second) # evaluats to 2

# LOGICAL OPERATOR
    # and
    # or
    # not

true and false or not false # evaluates to true
```

## Control structures

```
# ---------- CONTROL FLOW ----------
    # if elif else
    # for loop
    # while loop
        # continue
        # break
    # match case statement

# CONDITIONAL CHECK

x = 8
y = 2
if x < y:
    print("x is smaller than y")
elif x > y:
    print("x is bigger than y")
else:
    print("x is equals to y")

## LOOP

for el in ["two", 3, 1.0]:
    print(el)

x = 2
y = 10
while x < y:
    x += 1

## MATCH CASE
    # syntax similar to Rust's pattern matching
    # break statements are unnecessary after each case, continue is used to fallthrough to the next case
    # _ for default case

match x:
    1: 
        print("x is equals to 1")
    2: 
        print("x is equals to 2")
    3:
        print("x is equals to 3")
    _: 
        print("this is the default case")
```

## Useful tips

```
# ---------- TIP ----------
    # range() exists and operates similarly as in Python
        # you can also iterate over a number directly as an implicit range

for i in range(20): # this is valid, printing 0 to 19
    print(i)

for q in 20: # this does the exact same thing as the range() above, printing 0 to 19
    print(q)
```

## OOP

```
# ---------- OBJECT ORIENTED PROGRAMMING ----------
    # override
    # self specifies the variable is an object attribute unique to the specific object
    # extends allows for a child class to inherit a parent class' attributes and methods
    # .new() instantiates a new instance object off the class
    # func _init()
    # func _ready()
    # func _process(delta)
    # func _physics_process(delta)
    # signal system

# OVERRIDE 
    # built-in overridable functions are specified by starting with _ an underscore by convention
    # technically any function is overridable

# IMPORTANT FUNCTIONS

func _init(): # object constructor, specifies contents to be called when object is instantiated, similar to Python
    pass

func _ready(): # called when script's node and children nodes have entered scene tree
    pass

func _process(delta); # function called every single frame, delta is the number of seconds passed between the last frame and the current one, similar to love.update(dt) in Lua
    print("dt equals:", delta)

func _physics_process(delta): # function called on every physics frame, delta should be constant
    var direction = Vector2(1,0)
    var speed = 100.0
    self.global_position += direction * speed * delta

# SIGNAL
    # the signal system is godot's equivalent of the observer programming pattern
    # signal defines a signal with its name, () included in case of arguments to be accepted
    # emit_signal() used to call the specified signal with its arguments
    # .connect() connects a signal to a function 

class_name Player extends Node2D

var hp = 10

signal died() # defines the signal died with 0 arguments
signal hurt(hp_old, hp_new) # defines the signal died with 2 arguments

func apply_damage(dmg):
    var hp_old = hp
    hp -= dmg
    emit_signal("hurt", hp_old, hp) # emits the predefined signal with its arguments
    if hp <= 0:
        emit_signal("died") # emits the predefined signal

function _ready():
    self.connect("died"), self, "_on_death")

function _on_death(): # signal died() is called when the _on_death() function occurs
    self.queue_free() # destroys player on death by removing them from the queue
```

## More on

* as
* enum
* ternary operator
* . dot operator to call parent function's implementation of an overriden function
* onready
* $
* .free()
* .queue_free()
* [GDScript docs](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/index.html)
* [Godot docs](https://docs.godotengine.org/en/stable/)
