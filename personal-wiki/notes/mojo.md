# Mojo

# `Mojo`

High-performance programming language for AI development with Python compatibility.

## Comments

```
# ---------- COMMENT ----------

# this is a single-line comment

"""
this is a
multi-line
comment using docstrings
"""
```

## Printing

```
# ---------- PRINT ----------
    # print() => prints values to stdout with newline by default
    # print() supports multiple arguments and formatting

print("Hello, Mojo!")
print("Value:", 42)
print("Multiple", "values", "at", "once")
print("No newline", end="")
```

## Quickstart

```
# ---------- QUICKSTART ----------
    # Mojo combines Python's usability with systems programming performance
    # fully compatible with Python ecosystem
    # def => defines Python-compatible functions
    # fn => defines Mojo functions with performance optimizations
    # var => declares mutable variables with type inference
    # let => declares immutable variables
    # struct => defines high-performance data structures

fn main():
    let message = "Hello, Mojo!"
    print(message)

def python_function():
    # Python-compatible function
    return "Python compatibility"

fn mojo_function() -> String:
    # High-performance Mojo function
    return "Mojo performance"
```

## Types

```
# ---------- TYPE ----------
    # Int => integer numbers
    # Float32, Float64 => floating-point numbers
    # Bool => True, False
    # String => text strings
    # SIMD[type, width] => SIMD vector types for performance
    # Pointer[type] => raw pointers
    # DTypePointer[type] => typed pointers

var age: Int = 25
var height: Float64 = 5.9
var is_active: Bool = True
var name: String = "Alice"

# SIMD types for vectorization
var vector: SIMD[DType.float32, 4] = SIMD[DType.float32, 4](1.0, 2.0, 3.0, 4.0)

# Memory management
var ptr: Pointer[Int] = Pointer[Int].alloc(10)
```

## Operators

```
# ---------- OPERATOR ----------

# ARITHMETIC OPERATORS
    # + => addition
    # - => subtraction
    # * => multiplication
    # / => division
    # // => floor division
    # % => modulo
    # ** => exponentiation

# COMPARISON OPERATORS
    # == => equality
    # != => inequality
    #  = => comparison operators

# LOGICAL OPERATORS
    # and => logical and
    # or => logical or
    # not => logical not

# BITWISE OPERATORS
    # & => bitwise and
    # | => bitwise or
    # ^ => bitwise xor
    # ~ => bitwise not
    # > => left and right shift
```

## Control structures

```
# ---------- CONTROL STRUCTURE ----------

# CONDITIONALS

# IF ELIF ELSE
var x = 10
if x > 10:
    print("greater than 10")
elif x == 10:
    print("equals 10")
else:
    print("less than 10")

# LOOPS

# FOR LOOPS
for i in range(5):
    print(i)

for item in :[2][3][4][1]
    print(item)

# WHILE LOOPS
var counter = 0
while counter  compile-time parameters
    # @unroll => loop unrolling for performance

@parameter
fn vectorized_add[size: Int](a: SIMD[DType.float32, size], b: SIMD[DType.float32, size]) -> SIMD[DType.float32, size]:
    return a + b

# PARALLELIZATION
from algorithm import parallelize

fn parallel_work():
    @parameter
    fn compute_chunk(i: Int):
        # Parallel computation
        pass

    parallelize[compute_chunk](1000, 8)  # 1000 tasks, 8 workers
```

## Data structures

```
# ---------- DATA STRUCTURE ----------

# LISTS
    # List[T] => dynamic arrays similar to Python lists

var numbers = List[Int]()
numbers.append(1)
numbers.append(2)
numbers.append(3)

# DICTIONARIES
    # Dict[K, V] => hash maps similar to Python dicts

var scores = Dict[String, Int]()
scores["Alice"] = 95
scores["Bob"] = 87

# STRUCTS
    # struct => high-performance data structures
    # @value => makes struct copyable and movable

@value
struct Point:
    var x: Float64
    var y: Float64

    fn __init__(inout self, x: Float64, y: Float64):
        self.x = x
        self.y = y

    fn distance_from_origin(self) -> Float64:
        return (self.x ** 2 + self.y ** 2) ** 0.5

var point = Point(3.0, 4.0)

# TUPLES
var coordinates = (10, 20)
var person = ("Alice", 25, True)

# BUFFERS
    # Buffer[type] => contiguous memory buffers
    # DTypePointer => typed memory pointers

var buffer = Buffer[DType.float32](1000)
```

## Functions

```
# ---------- FUNCTION ----------
    # def => Python-compatible functions (dynamic)
    # fn => Mojo native functions (static, optimized)
    # inout => parameters that can be modified
    # owned => transfer ownership of arguments
    # borrowed => immutable reference (default)

# PYTHON-COMPATIBLE FUNCTIONS
def py_function(x, y):
    return x + y

# MOJO NATIVE FUNCTIONS
fn add_ints(a: Int, b: Int) -> Int:
    return a + b

# PARAMETER PASSING
fn modify_value(inout x: Int):
    x += 1  # modifies original value

fn take_ownership(owned s: String) -> String:
    return s + " (owned)"

fn read_only(borrowed s: String) -> Int:
    return len(s)

# GENERIC FUNCTIONS
fn generic_add[T: AnyType](a: T, b: T) -> T:
    return a + b

# COMPILE-TIME PARAMETERS
@parameter
fn compile_time_square[value: Int]() -> Int:
    return value * value

# SIMD FUNCTIONS
fn vectorized_multiply(a: SIMD[DType.float32, 8], b: SIMD[DType.float32, 8]) -> SIMD[DType.float32, 8]:
    return a * b

# ASYNC FUNCTIONS
async fn async_computation() -> Int:
    # Asynchronous computation
    return 42
```

## More on

* SIMD vectorization
* memory management
* traits and protocols
* metaprogramming
* Python interoperability
* GPU computing
* autotuning
* [mojo documentation](https://docs.modular.com/mojo/)
* [mojo programming manual](https://docs.modular.com/mojo/manual/)
* [mojo playground](https://playground.modular.com/)
