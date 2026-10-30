---
category: Tech
---
# Alloy

# `Alloy`

Lightweight modeling language for software modeling and language specification.

## Introduction

Alloy comes in two parts.

1. [Alloy language](#alloy-language)
  * file extension `.als`
  * declarative language that specifies what a system should do
  * runs on relational logic with models expressed as sets and relations
  * intuitively expresses complex structures and behaviors
2. [Alloy analyser](#alloy-analyser)
  * tool that checks the properties of a user-specified model
  * visualization capabilities

## Alloy language

```
// ----- ALLOY LANGUAGE SYNTAX OVERVIEW -----

// --- GENERAL ---

// // => declares a single-line comment which is ignored by the alloy analyser, note there is no built-in implementation for multi-line comments

// --- CORE FORMS ---

// sig <signatureName> { <signatureBody> } => declares a signature as the basic type or set in the model within {} curly braces
// <fieldName> : <datatype> => found within the signature body, named fields specify the relationship between signatures via their corresponding datatype
// fact <factName> { <factConstraintBody> } => declares a fact, which is an invariant constraint that must ALWAYS be held within the model
// assert <assertionName> { <assertionProperties> } => declares an assertion, which is a property that MUST be checked by the alloy analyser
// pred <predicateName>[ <predicateArgument(s)> ] { <predicateBody> } => specifies a predicate, which is a reusable chunk of logic that can be called with provided arguments but do not return a value, equivalent to a void function in conventional programming languages
// fun <functionName> [ <functionArgument(s)> ]: <functionReturnDatatype> { <functionDefinitionBody> } => specifies a function with a return value
// run <commandName> for <commandScope> => direct instructions to the alloy analyser to run the specified predicate
// check <commandName> for <commandScope> => direct instructions to the alloy analyser to check the specified assertion

// --- FIELD AUGMENTERS ---

// set => declares a given field is a set
// in => indicates an entity has membership within a set or relation
// extends => specifies that one signature is a subset of another
// one => declares a field has exactly ONE element
// lone => declares a field has either ZERO or ONE element
// some => declares a field has at least ONE element

// --- SET / RELATION AUGMENTERS ---

// no => specifies a set is empty
// one => specifies a set has exactly ONE element
// some => specifies a set has at least ONE element
// lone => specifies a set has either ZERO or ONE element
// + => UNION of sets
// & => INTERSECTION of sets
// - => DIFFERENCE between sets
// -> => CARTESIAN PRODUCT of sets
// . => Navigation through relations
// ~ => Inverse of a relation
// ^ => Transitive closure of a relation
// * => Reflexive transitive closure of a relation
// | => separates the set or relation in question from the constraint or predicate condition being applied to it

// --- DATATYPES ---
  // there are only two primitive datatypes in alloy language for purely representative purposes

// Int => stores an integer number value
// String => stores a string value 

// --- LOGICAL OPERATORS ---

// and => logical and
// or => logical or
// not => logical not
// implies => logical implication
// iff => logical equivalence

// --- OTHERS ---

// let => introduces a local variable binding
// disj => specifies that elements are DISTINCT
// all => universal quantifier
// some => existential quantifier
```

### Specifying the model

```
// ----- SPECIFYING THE MODEL -----

// --- EXAMPLE 1: SMALL EXPRESSION LANGUAGE --- 
    // abstract syntax definition for a small expression-based language with Expression, Literal and BinaryOperation
    // specify a constraint that no binary operation has the same left and right expression.
    // assert and check there are no cyclic expressions within the language

// ABSTRACT SYNTAX DEFINITIONS (via signatures, fields and extends)

sig Expression {}
sig Literal extends Expression {
  value: Int
}
sig BinaryOperation extends Expression {
  left: Expression,
  right: Expression
}

// SPECIFY A CONSTRAINT (via a fact)

fact WellFormedBinaryOperation {
  all b: BinaryOperation | b.left != b.right
}

// CHECK A PROPERTY (via an assertion and explicit check)

assert NoCyclicExpressions {
  no e: Expression | e in e.^(left + right)
}
check NoCyclicExpressions

// --- EXAMPLE 2: FILE SYSTEM --- 
    // abstract syntax definition for a file
    // abstract syntax definition for a folder, where each folder can contain a set of files or subfolders
    // specify a constraint that no folder can be its own subfolder
    // specify a constraint that there should be no cyclical folder structure
    // predicate check to determine whether a folder contains a specific file
    // assertion check to determine that no file exists without being contained in some folder
    // assert and check there are no cyclic expressions within the language
    // runs the assertion to check the model with the scope of 5 folders and 10 files

// ABSTRACT SYNTAX DEFINITIONS (via signatures and fields)

sig File {}
sig Folder {
    files: set File,
    subfolders: set Folder
}

// SPECIFY CONSTRAINTS (via facts)

fact NoFolderIsItsOwnSubfolder {
    all f: Folder | f !in f.subfolders
}

fact NoCyclicFolders {
    all f: Folder | f !in f.^(subfolders)
}

// CHECK PROPERTIES (via a predicate, assertion and explicit check)

pred folderContainsFile[f: Folder, fl: File] {
    fl in f.files or fl in f.*(subfolders).files
}

assert AllFilesInFolders {
    all fl: File | some f: Folder | fl in f.*(subfolders).files + f.files
}

check AllFilesInFolders for 5 Folder, 10 File

// --- EXAMPLE 3: SMALL SOCIAL NETWORK ---
    // abstract syntax definition for a Person
    // specify a constraint that no person is their own friend
    // specify a constraint that friendship is always mutual
    // helper function to retrieve the number of friends a person has
    // assert and check whether two given persons are friends
    // assert and check there are no cyclic friendships

// ABSTRACT SYNTAX DEFINITIONS (via signatures and fields)

sig Person {}
sig Person {
    name: one String, 
    age: one Int, 
    friends: set Person 
}

// SPECIFY CONSTRAINTS (via facts)

fact NoSelfFriend {
    all p: Person | p !in p.friends
}

fact MutualFriendship {
    all p, q: Person | p in q.friends iff q in p.friends
}

// HELPER FUNCTION

fun numFriends[p: Person]: Int {
    #p.friends
}

// CHECK PROPERTIES (via a predicate, assertion and explicit check)

pred isFriend[p1, p2: Person] {
    p2 in p1.friends
}

assert NoCyclicFriendship {
    no p: Person | p in p.^friends
}

check NoCyclicFriendship for 5
```

## Alloy analyser

### Checking the model

1. Save the model or language specification as an `.als` file
2. Open the `.als` file from step 1 in the alloy analyser application
3. Set the scope of the check under the *Execute* pane
4. Run the check
5. Then
  * if the model's assertion holds, the alloy analyser will indicate the check passed with no counterexamples found
  * if the model's assertion fails, the alloy analyser will provide a counterexample of a scenario where the assertion does not hold

## More on

* [install alloy analyser](https://alloytools.org/download.html)
* [alloytools.org](https://alloytools.org/)
* [alloy documentation](https://alloy.readthedocs.io/en/latest/)
* [alloy language reference](https://alloytools.org/download/alloy-language-reference.pdf)
