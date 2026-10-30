---
category: Tech
---
# Web Assembly

# `Web Assembly`

Binary instruction format enabling high-performance code across many browser platforms.

## Comments

```
;; ----- COMMENT -----

;; this is a single-line comment 

;; there is no built-in implementation 
;; for multi-line comments in web assembly
;; but the same effect can be achieved as seen
;; here
```

## Quickstart

```
;; ----- QUICKSTART -----
    ;; designed to provide a portable compilation target for web browsers, with increasing adoption by modern browser engines
    ;; note that web assembly has multiple representative formats with their own file extensions
        ;; .wasm => web assembly binary format, used for direct execution by web assembly engines and for transmission over networks
        ;; .wat => web assembly text format, transcription of the .wasm format into text, closely mimicking .wasm's semantics
        ;; .wast => superset of .wat, providing a further abstracted higher-level textual representation of web assembly code (covered in this document)

;; --- SYNTAX OVERVIEW ---
    ;; export => specifies the name for which a given entity (such as a function, memory, table, global) is exported by, under which it can then be accessed as a module in JavaScript or via other web assembly modules
    ;; module => imports standard library and user-defined modules into the local scope of the present file, including their corresponding functionality 
    ;; local => defines local variables with a specified name for use within a locally scoped variable, often used within functions, whose values can be reassigned after initial assignment
    ;; global => defines global variable with a specified name for use within the global scope of the program, whose values can be reassigned after initial assignment
    ;; .set => assigns a value to a previously defined variable or global
    ;; .get => retrieves a value from a previously defined and assigned variable or global
    ;; .const => defines constants whose value cannot be reassigned after initial assignment
    ;; mut => specifies a given local or global variable whose value can be reassigned after initial declaration
    ;; $ => prefixes all variable and constant names, similar to PHP's variable declaration

;; --- PRINTING ---
    ;; web assembly does not have direct printing capabilities to the stdout as in other conventional programming languages
    ;; instead, web assembly modules interact directly with their host environments such as web browsers or servers
    output is handled via host environments such as JavaScript
```

## Types

```
;; ----- TYPE -----
    ;; i32 => 32-bit signed integer
    ;; i64 => 64-bit signed integer
    ;; f32 => 32-bit single-precision floating-point number
    ;; f64 => 64-bit double-precision floating-point number
    ;; memory => stores raw bytes in linear memory, defined with the initial and maximum allocated size in bytes
```

## Operators

```
;; ----- OPERATOR -----

;; --- ARITHMETIC OPERATORS ---

.add ;; addition
.sub ;; subtraction
.mul ;; multiply
.div ;; unsigned division 
.div_s ;; signed division 
.rem ;; unsigned modulo
.rem_s ;; signed modulo

;; --- COMPARISON OPERATORS ---

.eq ;; complete equality check for both value and type
.ne ;; complete inequality check for both value and type
.lt ;; less than for unsigned comparisons
.lt_s ;; less than for signed comparisons
.le ;; less than or equal for unsigned comparisons
.le_s ;; less than or equal for signed comparisons
.gt ;; greater than for unsigned comparisons
.gt_s ;; greater than for signed comparisons
.ge ;; greater than or equal for unsigned comparisons
.ge_s ;; greater than or equal for signed comparisons

;; --- BITWISE (LOGICAL) OPERATORS ---

.and ;; bitwise and
.or ;; bitwise or
.xor ;; bitwise xor
.eqz ;; bitwise not (wherein eqz checks if the specified value is equal to zero)
```

## Control structures

```
;; ----- CONTROL STRUCTURE -----

;; --- CONDITIONALS ---

;; IF THEN ELSE 
    ;; note that web assembly does not provide a elseif construct as in other languages
    ;; instead, the same effect can be achieved with nested if else loops as seen below

(if (result i32)
    (i32.eq (local.get $a) (i32.const 0)) 
(then
    (i32.const 1) 
)
(else
    (i32.const 0) 
)
)

(if (result i32)
(i32.eq (local.get $a) (i32.const 0)) 
(then
    (i32.const 1) 
)
(else
    (if (result i32)
    (i32.eq (local.get $a) (i32.const 1)) 
    (then
        (i32.const 2) 
    )
    (else
        (i32.const 0) 
    )
    )
)
)

;; --- LOOPS ---
    ;; note that web assembly does not provide default for, foreach and while loop constructs as in other programming languages
    ;; instead, these higher-level loops can be created and user-defined using the loop keyword
    ;; loop => specifies the beginning of a loop construct, the equivalent of the loop keyword construct in Rust
    ;; br <labelName> => branch, used to unconditionally jump to the specified label within the current function or codeblock
    ;; br_if <labelName> (<specifiedPredicateCondition>) => branch if, used to indicate a conditional jump to the specified label within the current function or codeblock if the specified predicate condition is fulfilled
    ;; nop => no operation, used as a placeholder and the equivalent of pass in other programming languages like Python

(loop $loopLabel
    (i32.const 0) 
    (local.get $counter) 
    (i32.eqz) 
    (br_if $loopEnd) 
    (i32.const 1) 
    (local.set $counter) 
    (br $loopLabel) 
    (nop) 
)
(local.get $result) 

;; USER-DEFINED FOR LOOP

(local $i i32) 
(local.set $i (i32.const 0)) 
(loop $loopLabel
    (local.get $i) 
    (local.get $n) 
    (i32.lt_s) 
    (if (result i32)
        (then
            (local.get $i)
            (call $printInt)
            (local.get $i)
            (i32.const 1)
            (i32.add)
            (local.set $i)
            (br $loopLabel)
        )
        (else
            (nop)
        )
    )
)

;; USER-DEFINED WHILE LOOP

(local $i i32) 
(local.set $i (i32.const 0)) 
(loop $loopLabel
    (local.get $i) 
    (local.get $n) 
    (i32.lt_s) 
    (br_if $loopEnd) 
    (local.get $i)
    (call $printInt)
    (local.get $i)
    (i32.const 1)
    (i32.add)
    (local.set $i)
    (br $loopLabel)
)
(local $loopEnd)
```

## Functions

```
;; ----- FUNCTION -----
    ;; func => declares a named function and specifies the function body definition within a web assembly module
    ;; param => specifies the input parameters and their datatype used within a function definition
    ;; result => specifies the return datatype of a function definition
    ;; call => calls the specified previously declared named function

(module
    (func (export "add")
        (param $a i32) 
        (param $b i32) 
        (result i32) 
        (i32.add 
            (local.get $a)
            (local.get $b)
        )
    )
)

(module
    (func $add
        (param $a i32)
        (param $b i32)
        (result i32)
        (i32.add
            (local.get $a)
            (local.get $b)
        )
    )

    (func (export "add")
        (param $a i32)
        (param $b i32)
        (result i32)
        (call $add 
            (local.get $a)
            (local.get $b)
        )
    )
)
```

## More on

* [tables in web assembly](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Table)
* [c data structures in web assembly](https://docs.wasmtime.dev/c-api/annotated.html)
* [webassembly.org](https://webassembly.org/)
* [web assembly documentation](https://developer.mozilla.org/en-US/docs/WebAssembly)
* [learn web assembly in y minutes](https://learnxinyminutes.com/docs/wasm/)
