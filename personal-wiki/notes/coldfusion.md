---
category: Tech
---
# ColdFusion

# `ColdFusion`

Adobe's server-side scripting language.

## Comments

```
<!--- ----- COMMENT ----- -->

<!--- this is a single-line comment --->

<cfcomment>
this is a 
multi-line
comment
</cfcomment>
```

## Printing

```
<!--- ----- PRINTING ----- -->
    <!--- <cfoutput> => a string argument is provided within the cfoutput tags which is then displayed to the browser without a newline by default --->
    <!--- <br> => since ColdFusion displays to the browser, the equivalent of the newline character \n is the <br> HTML element --->

<cfoutput>this does not display with a newline</cfoutput>
<cfoutput>this displays with a newline but only because we explicitly specify the break tag here<br></cfoutput>
```

## Quickstart

```
<!--- ----- QUICKSTART ----- -->
    <!--- CFML stands for ColdFusion Markup Language --->
    <!--- tag-based language inheriting much of its syntax from HTML --->
    <!--- supports easy integration with databases and productive web development with robust support for HTML, JavaScript etc. --->
    <!--- used for building dynamic websites, APIs, web services and Adobe enterprise-level applications --->
    <!--- for all the syntax covered in this rundown of ColdFusion, the closing tag should automatically be assumed unless the example displays otherwise given that ColdFusion inherits many of its tag-based conventions from HTML including matching pairs of opening and closing tags --->
    <!--- <cfset> => declares and assigns a mutable variable whose value can be modified and reassigned even after initial assignment --->
    <!--- ## => used to interpolate a value within a ColdFusion string to display it within the browser, generally paired with the <cfoutput> tag --->

<cfset myVar = "ColdFusion"> <!--- variable assignment --->
<cfoutput>#myVar#</cfoutput> <!--- retrieving the previously declared variable --->
```

## Types

```
<!--- ----- TYPE ----- -->
    <!--- string => stores a string value declared within '' single quotation marks or "" double quotation marks, note that characters are handled as single-character long strings --->
    <!--- int => stores an integer number value --->
    <!--- double => stores a floating-point number value --->
    <!--- boolean => true, false --->
    <!--- date => stores a date value without time --->
    <!--- time => stores a time value without date --->
    <!--- timestamp => stores a date-time value --->
    <!--- binary => stores binary data like images and files --->
    <!--- object => stores a ColdFusion object, the equivalent of objects in other languages that support object-oriented programming --->
    <!--- component => stores a ColdFusion component, the equivalent of classes in other languages that support object-oriented programming --->
```

## Operators

```
<!--- ----- OPERATOR ----- -->

<!--- --- ARITHMETIC OPERATORS --- --->

+ <!--- addition --->
- <!--- subtraction --->
* <!--- multiplication --->
/ <!--- divison --->
% <!--- modulo--->

<!--- --- COMPARISON OPERATORS --- --->
    <!--- <cfif> => declares that a comparison operator is being called and accompanies any of the specifiers below --->

EQ <!--- complete equality check for both value and type -->
NEQ <!--- complete inequality check for both value and type -->
GT <!--- comparison operator --->
LT <!--- comparison operator --->
GTE <!--- comparison operator --->
LTE <!--- comparison operator --->

<!--- --- LOGICAL OPERATORS --- --->
    <!--- <cfif> => similarly declares that a logical operator is being called and accompanies any of the specifiers below --->

AND <!--- logical and --->
OR <!--- logical or --->
NOT <!--- logical not --->
```

## Control structures

```
<!--- ----- CONTROL STRUCTURE ----- -->

<!--- --- CONDITIONALS --- --->

<!--- IF ELSE IF ELSE --->
    <!--- operates the same as conditional constructs in most other programming languages --->

<cfset num = 75>
<cfif num LT 50>
    <cfoutput>#num# is less than 50</cfoutput>
<cfelseif num GTE 50 AND num LTE 100>
    <cfoutput>#num# is between 50 and 100</cfoutput>
<cfelse>
    <cfoutput>#num# is greater than 100</cfoutput>
</cfif>

<!--- --- LOOPS --- --->
    <!--- <cfloop> => specifies that a loop construct is about to be declared in ColdFusion --->

<!--- FROM TO INDEX --->
    <!--- the equivalent of a conventional C-style integer-based for loop with the startIndex;endIndex;step specifier --->
    <!--- index => automatically assigns itself to the iteration variable of the loop --->

<cfloop from="1" to="5" index="i">
    <cfoutput>#i#</cfoutput>
</cfloop>

<!--- ARRAY INDEX --->
    <!--- provides iteration and traversal of elements over an iterable data structure --->
    <!--- the equivalent of a for in loop in Python and a foreach loop in PHP --->
    <!--- index => automatically assigns itself to the iteration variable of the loop --->

<cfloop array="#myArray#" index="item">
    <cfoutput>#item#</cfoutput>
</cfloop>

<!--- CONDITION --->
    <!--- condition => specifies the predicate break condition that when hit, will cause the exit and termination of the while loop --->
    <!--- the equivalent of a while loop in most other programming languages --->

<cfset i = 1>
<cfloop condition="#i LTE 5#">
    <cfoutput>#i#</cfoutput>
    <cfset i = i + 1>
</cfloop>
```

## Data structures

```
<!--- ----- DATA STRUCTURE ----- -->
    <!--- array => mutable dynamically-sized ordered collection of elements of multiple datatypes --->
    <!--- struct => mutable dynamically-sized user-defined unordered collection of key-value pairs with unique keys and values of multiple datatypes --->
    <!--- query => immutable fixed-sized set of predefined rows and columns retrieved from a database, used to represent stored SQL data --->

<cfset anExampleArray = ["one", "two", "three"]>
<cfset anExampleStruct = {name="John", age=30}>

<cfquery name="getUsers" datasource="myDataSource">
    SELECT * FROM users
</cfquery> <!--- an example query --->
```

## Functions

```
<!--- ----- FUNCTION ----- -->
    <!--- <cffunction> => definition and declaration of a named function --->
        <!--- name => specifies the function name --->
        <!--- returnType => specifies the datatype of the function return value or expression --->
    <!--- <cfargument> => specifies the function parameter --->
        <!--- name => specifies the function parameter name --->
        <!--- type => specifies the datatype of the function parameter --->
        <!--- required => specifies whether a given function parameter is optional or required --->
    <!--- <cfreturn> => specifies the function return value --->
    <!--- <functionName>(<functionArguments>) => specifies a function call, where functions are called similarly as in most other programming languages --->

<cffunction name="myFunction" returnType="string"> 
    <cfargument name="arg1" type="string" required="true">
    <cfreturn "Hello, " & arguments.arg1>
</cffunction> <!--- function definition --->

<cfoutput>#myFunction("World")#</cfoutput> <!--- call the previously declared function --->
```

## More on

* [coldfusion-family.html](https://www.adobe.com/sg/products/coldfusion-family.html)
* [coldfusion documentation](https://cfdocs.org/)
* [learn coldfusion in y minutes](https://learnxinyminutes.com/docs/coldfusion/)
* [links-lang.org](https://links-lang.org/)
