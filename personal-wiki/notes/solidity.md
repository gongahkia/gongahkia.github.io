# Solidity

# `Solidity`

High-level programming language for writing smart contracts on the Ethereum blockchain.

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

/* 
this is a
multi-line
comment
*/
```

## Printing

```
// ---------- PRINT ----------
    // console.log() => prints a string to the console, requires importing console from hardhat
    // emit => emits events that can be logged by external applications

import "hardhat/console.sol";

console.log("this prints to the console during development");
console.log("value:", 42); // prints with value

// Event declaration and emission for production logging
event LogMessage(string message, uint256 value);
emit LogMessage("Transaction completed", 100);
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Solidity is a curly-bracket language similar to JavaScript and C++
    // all smart contracts must specify SPDX license and pragma version
    // contract => declares a smart contract, similar to a class in OOP languages
    // constructor => initializes contract state when deployed
    // payable => allows functions to receive Ether
    // view => functions that read state without modifying it
    // pure => functions that don't read or modify state

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    uint256 public value;

    constructor(uint256 _initialValue) {
        value = _initialValue;
    }
}
```

## Types

```
// ---------- TYPE ----------
    // bool => true, false
    // uint => unsigned integer, uint8 to uint256 (in steps of 8)
    // int => signed integer, int8 to int256 (in steps of 8)
    // address => Ethereum address (20 bytes)
    // bytes => dynamic byte array
    // bytesN => fixed-size byte array, bytes1 to bytes32
    // string => dynamic UTF-8 string
    // enum => user-defined type with finite set of values

bool public isActive = true;
uint256 public balance = 1000;
int256 public temperature = -10;
address public owner = 0x1234567890123456789012345678901234567890;
bytes32 public hash = "0x1234...";
string public name = "MyContract";

enum Status { Pending, Active, Inactive }
Status public currentStatus = Status.Pending;
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction  
    // * => multiplication
    // / => division
    // % => modulo
    // ** => exponentiation

// COMPARISON OPERATORS
    // == => equality
    // != => inequality
    //  = => comparison operators

// LOGICAL OPERATORS
    // && => logical and
    // || => logical or
    // ! => logical not

// BITWISE OPERATORS
    // & => bitwise and
    // | => bitwise or
    // ^ => bitwise xor
    // ~ => bitwise not
    // > => left and right shift
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// CONDITIONALS

// IF ELSE IF ELSE
uint256 x = 10;
if (x > 10) {
    // execute if x > 10
} else if (x == 10) {
    // execute if x equals 10
} else {
    // execute if x  validates conditions and reverts with error message if false
    // assert() => checks for internal errors, should never fail
    // revert() => unconditionally reverts with error message

require(msg.value > 0, "Must send Ether");
assert(balance >= amount);
revert("Custom error message");

// LOOPS

// FOR LOOPS
for (uint256 i = 0; i  0);
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAYS
    // dynamic arrays can change size
    // fixed arrays have predetermined size
    // [] => declares dynamic array
    // [n] => declares fixed array of size n

uint256[] public dynamicArray;
uint256 public fixedArray;[9]

// MAPPINGS
    // mapping() => creates key-value store
    // mappings are not iterable by default

mapping(address => uint256) public balances;
mapping(string => bool) public permissions;

// STRUCTS
    // struct => creates custom data type with multiple fields

struct User {
    string name;
    uint256 age;
    bool isActive;
}

User public user = User("Alice", 25, true);

// ENUMS
    // enum => creates type with finite set of named values

enum OrderStatus { Created, Paid, Shipped, Delivered }
OrderStatus public status = OrderStatus.Created;
```

## Functions

```
// ---------- FUNCTION ----------
    // function => declares a function
    // public/private/internal/external => visibility modifiers
    // view => function reads state but doesn't modify it
    // pure => function doesn't read or modify state
    // payable => function can receive Ether
    // returns => specifies return types

// BASIC FUNCTION
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}

// PAYABLE FUNCTION
function deposit() public payable {
    balances[msg.sender] += msg.value;
}

// VIEW FUNCTION
function getBalance(address user) public view returns (uint256) {
    return balances[user];
}

// MODIFIERS
    // modifier => reusable code that can modify function behavior

modifier onlyOwner() {
    require(msg.sender == owner, "Not the owner");
    _; // placeholder for function body
}

function sensitiveFunction() public onlyOwner {
    // only owner can call this
}

// EVENTS
    // event => declares an event for logging
    // emit => triggers an event

event Transfer(address indexed from, address indexed to, uint256 value);

function transfer(address to, uint256 amount) public {
    emit Transfer(msg.sender, to, amount);
}
```

## More on

* inheritance
* interfaces
* libraries
* fallback functions
* receive functions
* gas optimization
* security patterns
* [solidity documentation](https://docs.soliditylang.org/)
* [learn solidity in y minutes](https://learnxinyminutes.com/docs/solidity/)
* [solidity by example](https://solidity-by-example.org/)
* [ethereum development](https://ethereum.org/en/developers/)
* [remix IDE](https://remix.ethereum.org/)
