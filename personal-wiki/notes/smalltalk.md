# Smalltalk

# `Smalltalk`

Everything is an object in Smalltalk.

## Introduction

* [dynamically-typed](https://developer.mozilla.org/en-US/docs/Glossary/Dynamic_typing)
* [fully object-oriented](https://en.wikipedia.org/wiki/Object-oriented_programming)
* [reflective programming](https://en.wikipedia.org/wiki/Reflective_programming)
* used for [educational purposes](http://bitsavers.informatik.uni-stuttgart.de/pdf/xerox/parc/techReports/SSL-77-2_Teaching_Smalltalk.pdf) and [constructionist learning](https://www.pi-top.com/blog/2018/11/06/defining-constructionist-learning)

## Quickstart

1. every statement is . period-delimited
2. there are NO function calls, instead, *messages* are sent to *objects* which then run a *method* in response which themselves return an *object*
3. a basic operation is to send a message to an object in the format `<objectName> <desiredMessage>`
4. there are three types of messages
  1. Unary: a single symbol comprised of several words in camelCase with **no arguments**
    * here are some examples
      * *size*
      * *reverseBytes*
      * *convertToLargerFormatPixels*
  2. Binary: small set of reserved symbols often used for arithmetic operations in most other programming languages, that receive a **single argument**
    * note there is no traditional arithmetic precendece in binary messages
    * here are some examples
      * *3 + 4*
      * *10 - 5*
      * *6 * 7*
      * *20 / 4*
      * *15 // 4*
      * *15 \ 4*
      * *5 = 5*
      * *5 ~= 4*
      * *5 < 10*
      * *10 > 5*
      * *5 <= 5*
      * *10 >= 5*
      * *true & false*
      * *true | false*
      * *true not*
  3. Keyword: general form in camelCase that receives **multiple arguments** which are : colon-delimited
    * here are some examples
      * *setTemperature:*
      * *at:put:*
      * *drawFrom:to:lineWidth:fillColor:*

```
" ----- QUICKSTART ----- "
    " below is some annotated Smalltalk code "
    " honestly if you're struggling to understand, don't worry because I am too "

" --- CLASS DEFINITION --- "

Object subclass: Person [ " define a new class Person which is a subclass of Object "

    | name age | " define instance variables for the class "

    Person class >> newName: aName age: anAge [ " class method to create a new Person instance with a name and age and return it "
        ^ self new setName: aName; setAge: anAge; yourself.
    ]

    setName: aName [ " method to set the name of the person "
        name := aName.
    ]
    setAge: anAge [ " method to set the age of the person "
        age := anAge.
    ]

    printPerson [ " method to print the details of the person "
        Transcript show: 'Name: ', name; cr.
        Transcript show: 'Age: ', age printString; cr.
    ]

]

" --- EXECUTION CODE --- " 

| person |
person := Person newName: 'Alice' age: 30. " create an instance of the Person class with the name 'Alice' and age 30 "
person printPerson. " print the details of the person instance by calling the printPerson method "
```

## More on

* [smalltalk documentation](https://www.gnu.org/software/smalltalk/manual/gst.html)
* [smalltalk cheatsheet](https://www.angelfire.com/tx4/cus/notes/smalltalk.html)
* [learn smalltalk in y minutes](https://learnxinyminutes.com/docs/smalltalk/)
