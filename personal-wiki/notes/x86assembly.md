---
category: Tech
---
# x86 Assembly

# `x86 Assembly`

Instructions providing a low-level interface to computer hardware for systems-level programming and optimization.

## Comments

```
; ----- COMMENT -----

; this is a single-line comment

; there is no built-in implementation
; for multi-line comments in x86 assembly
; but the same effect can be achieved as 
; seen here
```

## Quickstart

```
; ----- QUICKSTART -----
    ; note that there are multiple kinds of assembly languages and each is tailored and optimised to their specific CPU or microcontroller architecture
    ; each processor architecture has its own instruction set with varying syntax and file extensions, denoted as the ISA (instruction set architecture)
    ; the more popular ISAs are as follows 
        ; x86 assembly => used for Intel and AMD processors
        ; ARM assembly => used for ARM processors in mobile devices and embedded systems
        ; MIPS assembly => used for MIPS processors in academic settings and specialized devices
        ; PowerPC assembly => used for PowerPC processors in older Apple computers and certain embedded systems
        ; SPARC assembly => used for SPARC processors developed by Sun Microsystems
        ; AVR assembly => used for AVR microcontrollers in Arduino systems
        ; PIC assembly => used for PIC microcontrollers in embedded systems
    ; this document covers x86 assembly, widely used in most laptop, desktop and server machines today

; ----- SYNTAX OVERVIEW -----
    ; variables are initialised and assigned values via data definition directives per the following syntax
        ; <valueOrConstantIdentifier> <dataDefinitionDirective> <valueToBeAssigned> => used to assign a specified value to the specified variable or constant identifier 
            ; db => defines a byte and null-terminated string value
            ; dt => defines a ten byte value
            ; dw => defines a word value
            ; dd => defines a double word value
            ; dq => defines a quad word value
            ; resb => reserves a byte without initializing it
            ; rest => reserves ten bytes without initializing it
            ; resw => reserves a word without initializing it
            ; resd => reserves a double word without initializing it
            ; resq => reserves a quad word without initializing it
    ; section => declares a section with an x86 assembly program, where different sections in the program serve different purposes
        ; .data => data section stores variable and constant declaration 
        ; .text => text section stores all code instructions
    ; _start => label marking the beginning of all execution code within the program, the equivalent of the main function or method in other programming languages inheriting from the C family
    ; global => brings a specified label or call into the global scope of the x86 assembly program
    ; mov <register> , <valueOrVariableOrConstant> => moves the specified value literal, variable or constant identifier into the specified register

; ----- REGISTER -----
    ; small, fast storage locations within the CPU that store data and their respective memory addresses
    ; often used for performance of quick operations within x86 assembly programs
    ; the types of registers are as follows
        ; general-purpose register
        ; segment register
        ; control register
        ; special-purpose register

; --- GENERAL-PURPOSE REGISTERS ---
    ; EAX => accumulator register, used for arithmetic operations, IO operations, and as a register that stores function return values
    ; EDX => data register, used for IO operations, arithmetic operations as a 64-bit extension of EAX
    ; EBX => base register, used to hold store memory addresses for memory access operations
    ; ECX => counter register, used as a loop counter and for shift/rotate operations
    ; ESI => source index, used to store pointers for string and array operations
    ; EDI => destination index, also used to store pointers for string and array operations similar to ESI
    ; EBP => base pointer, used to store the pointer which points to the bottom of the stack
    ; ESP => stack pointer, used to store the pointer which points to the top of the stack

; --- SEGMENT REGISTERS ---
    ; CS => code segment, storing the pointer that points to the segment containing current program code
    ; DS => data segment, storing the pointer that points to the segment containing data
    ; ES => extra segment, acting as an additional data segment register on top of the existing DS
    ; SS => stack segment, storing the pointer that points to the segment containing the stack
    ; FS => additional segment, used for thread-local storage
    ; GS => another additional segment, used for thread-local storage

; --- CONTROL REGISTERS ---
    ; CR0 => contains flags that control the CPU's operating mode
    ; CR2 => contains the page fault linear address
    ; CR3 => contains the physical address of the page directory required for paging
    ; CR4 => contains flags that control additional CPU features

; --- SPECIAL-PURPOSE REGISTERS ---
    ; EIP => instruction pointer, storing the pointer that points to the next instruction to be executed
    ; EFLAGS => flags register, containing status, control, and system flags

; ----- PRINTING -----
    ; printing in x86 assembly involves system calls to interact with the local machine's operating system

section .data
    hello db 'Hello, world!', 0 ; defines a null terminated string and assigns it to the variable hello

section .text
    global _start ; places the _start label within the program's global scope

_start:
    mov eax, 4 
    mov ebx, 1 
    mov ecx, hello 
    mov edx, 13 
    int 0x80 ; triggers a software interrupt to invoke a syetem call to the kernel
    mov eax, 1 
    xor ebx, ebx 
    int 0x80 ; triggers the same software interrupt as above
```

## Types

```
; ----- TYPE -----
    ; note that the data definition directives are different for each datatype as seen below
    ; byte => 1-byte value
    ; word => 2-byte value
    ; double word => 4-byte value
    ; quad word => 8-byte value
    ; ten byte => 10-byte value
    ; null-terminated string => string value declared within '' single quotation marks, comma-delimited and suffixed with a 0 (null character)

section .data
    anExampleByte  db  0x01
    anExampleWord  dw  0x1234
    anExampleDoubleword dd  0x12345678
    anExampleQuadword dq  0x123456789ABCDEF0
    anExampleTenByte dt 1.234567890123456789
    anExampleNullTerminatedString db 'Hello, world!', 0
```

## Operators

```
; ----- OPERATOR -----

; --- ARITHMETIC OPERATORS ---

add ; addition
sub ; subtraction
imul ; multiplication
div ; unsigned division
idiv ; signed division
inc ; increment by 1
dec ; decrement by 1

; --- COMPARISON OPERATOR ---
    ; x86 assembly does not feature direct comparison operators as in other programming languages
    ; the equivalent logical flow can be effected with a combination of cmp and conditional jumps 

cmp <operand1> , <operand2> ; compares the two specified , comma-delimited operands
jl ; jump if compared values are lesser than
jle ; jump if compared values are lesser than or equal
jg ; jump if compared values are greater than 
jge ; jump if compared values are greater than or equal
jb ; jump if compared values are below
jbe ; jump if compared values are below or equal
ja ; jump if compared values are above
jae ; jump if compared values are above or equal
je ; jump if compared values are equal
jmp ; unconditional jump used to jump to a specified label, bypassing any code in between
jnz ; jump if the given value is not zero

; --- BITWISE (LOGICAL) OPERATORS ---

and ; bitwise and
or ; bitwise or
xor ; bitwise xor
not ; bitwise not
shl ; shifts a given operand to the left by the specified number of bits 
shr ; shifts a given operand to the right by the specified number of bits 
```

## Control structures

```
; ----- CONTROL STRUCTURE -----

; --- CONDITIONALS ---
    ; there are no conventional conditional IF ELSE IF ELSE constructs in x86 assembly as in other programming languages
    ; instead, similar effects can be achieved with the use of the comparison operator and jumps (especially the unconditional jump operator) as mentioned above

; --- LOOPS ---
    ; similarly, there are no conventional loop constructs in x86 assembly as in other programming languages
    ; instead, similar effects can be achieved with the use of increment and decrement operators, as well as the jump operators specified above
```

## Data structures

```
; ----- DATA STRUCTURE -----
    ; x86 assembly and most assembly languages do not have built-in high-level data structures in the conventional sense as in other programming languages
    ; instead, these data structures can be user-defined as with some examples below

; --- ARRAY ---

section .data
    myArray db 1, 2, 3, 4, 5 ; array of bytes

section .text
    global _start

_start:
    lea esi, [myArray] ; load the address of myArray into esi register
    mov ecx, 5 ; set the counter to 5

array_loop:
    mov al, [esi] ; load a byte from the array into al
    inc esi ; move to next array element
    loop array_loop ; continue looping until ecx is zero

; --- STRUCTURE ---

section .data
    myStruct:
        db 1 ; declares a byte field
        dw 2 ; declares a word field
        dd 3 ; declares a double word field

section .text
    global _start

_start:
    lea esi, [myStruct] ; loads the memory address of myStruct into esi
    mov al, [esi] ; access stored first byte
    mov ax, [esi + 1] ; access stored word
    mov eax, [esi + 3] ; access stored double word
```

## Functions

```
; ----- FUNCTION -----
    ; note that functions are usually prefixed with global scope modifier to make them callable within the global scope of the program
    ; : => seperates the function name from the indented function definition body underneath
    ; ret => return instruction specifies the function return call or expression within the function body, and no value can be returned
    ; call => used to invoke a function call

section .text
    global _start
    global myFunction

_start:
    call myFunction ; calls the function

    ; exits the x86 assembly program
    mov eax, 1 
    xor ebx, ebx 
    int 0x80 

; named function declaration and definition 
myFunction:
    mov eax, 4 
    mov ebx, 1 
    mov ecx, message 
    mov edx, 13 
    int 0x80 
    ret

section .data
    message db 'hello and welcome from myFunction!', 0
```

## More on

* [x86 assembly documentation](https://docs.oracle.com/cd/E19253-01/817-5477/817-5477.pdf)
* [lets learn x86 assembly](https://gpfault.net/posts/asm-tut-0.txt.html)
* [x86 assembly quickstart guide](https://www.cs.virginia.edu/~evans/cs216/guides/x86.html)
* [ARM assembly documentation](https://iitd-plos.github.io/col718/ref/arm-instructionset.pdf)
* [learn MIPS assembly in y minutes](https://learnxinyminutes.com/docs/mips/)
* [PowerPC assembly documentation](https://www.ibm.com/docs/kk/aix/7.3?topic=reference-appendix-f-powerpc-instructions)
* [SPARC assembly documentation](https://docs.oracle.com/cd/E19641-01/802-1947/802-1947.pdf)
* [AVR assembly documentation](https://ww1.microchip.com/downloads/en/devicedoc/atmel-0856-avr-instruction-set-manual.pdf)
* [PIC assembly documentation](https://ww1.microchip.com/downloads/en/DeviceDoc/MPLAB%20XC8%20PIC%20Assembler%20User%27s%20Guide%2050002974A.pdf)
