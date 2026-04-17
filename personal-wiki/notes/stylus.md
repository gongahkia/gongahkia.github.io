---
category: Tech
---
# Stylus

# `Stylus`

Preprocessor scripting language that transpiles to CSS.

## Comments

```
// ----- COMMENT -----

// this is a single-line comment

/*
this is 
a multi-line
comment
*/
```

## Quickstart

```
// ----- QUICKSTART -----
    // flexible, maintainable, concise syntax allowing for dynamic variable declaration and subsequent assignment of CSS styles
    // used for rapid prototyping in web development, alongside seamless integration with web frameworks (such as Node.js, React, Vue.js)
    // Stylus is often aided by build tools like Webpack to further streamline and automate its transpilation
    // ; semicolons and {} curly braces are optional and often unused, rendering Stylus more readable than CSS
    // @import => receives a string argument specifying other Stylus files that can be brought into the local scope of the current file to enable added modular functionality
    // $ => specifies a variable declaration, operating exactly the same as $ in PHP

@import 'variables'
@import 'mixins'

$base-font-size = 14px
$base-line-height = 1.5

body
  font $base-font-size Helvetica, Arial, sans-serif
  line-height $base-line-height

header
  background #333
  color #fff

a
  text-decoration none
  &:hover
    text-decoration underline
```

## Types

```
// ----- TYPE -----
    // Stylus does not offer datatypes in the conventional programming language sense (such as integers, floats etc.)
    // instead, Stylus offers the following style elements as datatypes below used to specify different CSS styles

// ----- STYLE ELEMENTS -----
    // colors => color values are specified in one of the following ways
        // hex => represented as a hexadecimal number
        // RGB => declared with rgb()
        // RGBA => declared with rgba()
        // HSL => declared with hsl()
        // HSLA => declared with hsla()
    // font names => declared as a string with '' single quotation marks
    // font size => declared as a number suffixed by one of the following units
        // px
        // %
        // em
        // rem
    // URLs => declared as a string with '' single quotation marks
    // boolean values => true, false
    // null => special null value representing the absence of a value
    // raw CSS code => CSS literal declared within {} curly braces

$primary-color = #3498db
$secondary-color = rgba(46, 204, 113, 0.5)
$font-family = 'Helvetica Neue', Helvetica, Arial, sans-serif
$image-url = 'https://example.com/images/logo.png'
$base-font-size = 16px
$is-responsive = true
$not-set = null
$box-shadow = {0 1px 3px rgba(0, 0, 0, 0.12)}
```

## Operators

```
// ----- OPERATOR -----

// --- ARITHMETIC OPERATOR ---

+ // addition
- // subtraction
* // multiplication
/ // divison
% // modulo

// --- COMPARISON OPERATOR ---

== // partial equality check for value but not type, wherein type coercion is performed as required
!= // partial inequality check for value but not type, wherein type coercion is performed as required
> // comparison operator
< // comparison operator
>= // comparison operator
<= // comparison operator

// --- LOGICAL OPERATOR ---

&& // logical and
|| // logical or
! // logical not
```

## Control structures

```
// ----- CONTROL STRUCTURE -----

// --- CONDITIONALS ---

// IF ELSE IF ELSE
    // Stylus' syntax does afford it a great degree of flexibility in assigning an entire conditional construct as below to a single HTML element
    // this interestingly ends up bearing great similarity to functional expressive programming paradigms

$color-mode = 'dark'
body
  if $color-mode == 'dark'
    background #000
    color #fff
  else if $color-mode == 'light'
    background #fff
    color #000
  else if $color-mode == 'blue'
    background #00f
    color #fff
  else
    background #ccc
    color #333

// TERNARY OPERATOR
    // <predicateCondition> ? <executeIfTrue> : <executeIfFalse> => the ternary operator is also provided as an alternative to conventional if else if else constructs in Stylus

$is-dark-mode = true
$background-color = $is-dark-mode ? #000 : #fff

// --- LOOPS --- 

// FOR IN
    // enables basic iteration and traversal over an iterable data structure
    // operates similarly to for in loops in Python and foreach loops in PHP

$colors = red, green, blue
for color in $colors
  .bg-{color}
    background color

// WHILE 
    // operates similarly to while loops in most other programming languages
    // most often used in Stylus to perform repetitive tasks

$i = 0
while $i < 5
  .item-{$i}
    width: $i * 20%
  $i++
```

## Data structures

```
// ----- DATA STRUCTURE -----
    // list => fixed-size ordered collection of comma-delimited elements of the same style datatype
        // note that lists are not declared within [] square brackets or () round brackets as in most other programming languages
    // hash => fixed-size unordered collection of comma-delimited key-value pairs of multiple style datatypes declared within {} curly braces, wherein specific values are called by their unique key via . dot syntax

$font-sizes = 12px, 14px, 16px, 18px
for size in $font-sizes
  .font-size-{size}
    font-size size

$fonts = {
  primary: 'Helvetica',
  secondary: 'Arial',
  code: 'Courier New'
}
body
  font-family $fonts.primary
code
  font-family $fonts.code
```

## Functions

```
// ----- FUNCTION -----
    // <functionName> ( <functionParameterName(s)> = <functionOptionalDefaultParameterAssignment(s)> ) <functionDefinitionBody> => declaration and definition of a named function, note that indentation matters in Stylus
    // most often used for performance of a repeated common tasks
    // observe that default parameters can also be specified within function declaration

add(a, b)
  a + b

multiply(a, b)
  a * b

body
  margin add(10px, 5px)
  padding multiply(2, 10px)

border-radius(n = 5px) // specified default parameter
  -webkit-border-radius n
  -moz-border-radius n
  border-radius n

button
  border-radius()
  &:hover
    border-radius(10px)
```

## More on

* [install stylus](https://stylus-lang.com/docs/executable.html)
* [mixins in stylus](https://stylus-lang.com/docs/mixins.html)
* [nested selectors in stylus](https://stylus-lang.com/docs/selectors.html)
* [stylus documentation](https://stylus-lang.com/)
* [learn stylus in y minutes](https://learnxinyminutes.com/docs/stylus/)
