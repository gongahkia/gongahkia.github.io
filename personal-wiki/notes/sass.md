# Sass

# `Sass`

Syntactically awesome style sheets.

## Introduction

* preprocessor scripting language that enhances CSS syntax with modern programming language constructs
* `.scss` transpiles to `.css`
* SassScript has two different syntax options
  1. `.scss`: enhances existing `.css` syntax with Sass features, covered below
  2. `.sass`: original Sass syntax, features indentation in place of {} curly braces and ; semicolons

## Quickstart

```
# ----- QUICKSTART -----

$ npm install -g sass # install Sass with npm via node.js
$ sass styles.scss styles.css # transpiles .scss files to .css files
```

## Syntax overview

```
// ----- SYNTAX OVERVIEW -----

// --- COMMENT ---

// this is a single-line comment

/* this is a 
multi-line
comment */

// --- VARIABLE ---
    // $ => declares a variable that stores CSS values for subsequent quick reference, similar to $ in PHP
    // all intermediary Sass code here is transpiled to vanilla CSS eventually, so redeclaring variables is also worry-free and will not cause unexpected issues
    // tldr: USE VARIABLES MORE!!!

$primary-color: #A3A4FF;
$secondary-color: #51527F;
$body-font: 'Roboto', sans-serif;

body {
    background-color: $primary-color;
    color: $secondary-color;
    font-family: $body-font;
}

// --- CONTROL STRUCTURES --- 
    // note all the control structure construct keywords are prefixed with @ an ampersand character
        // @if
        // @else if
        // @else
        // @for
        // @while
        // @each

// IF ELSE IF ELSE 
    // interesting to observe how we can just place if else if else constructs within the HTML element declaration, similar to how many functional languages handle expression evaluation

$theme: dark;
body {
    @if $theme == light {
        background: white;
        color: black;
    } @else if $theme == dark {
        background: black;
        color: white;
    } @else {
        background: gray;
        color: black;
    }
}

// FOR LOOPS
    // closer to a C-style for loop (start;stop;step) which iterates over an integer-defined range
    // most commonly used to set styles on a collection of items

// FOR FROM TO
    // for from to => excludes the last element of the integer-defined range

@for $c from 1 to 4 {
    div:nth-of-type(#{$c}) {
        left: ($c - 1) * 900 / 3;
    }
}

// FOR FROM THROUGH
    // for from through => includes the last element of the integer-defined range

@for $c from 1 through 3 {
    .myclass-#{$c} {
        color: rgb($c * 255 / 3, $c * 255 / 3, $c * 255 / 3);
    }
}

// WHILE LOOPS
    // operates as you'd expect, exactly the same as while loops in most other programming languages

$columns: 4;
$column-width: 80px;
@while $columns > 0 {
    .col-#{$columns} {
        width: $column-width;
        left: $column-width * ($columns - 1);
    }
    $columns: $columns - 1;
}

// EACH LOOPS
    // closer to for in loops in Python and foreach loops in PHP
    // traverses and iterates through each element of an iterable data structure (most commonly a list)
    // list items are whitespace-delimited

$social-links: facebook twitter linkedin reddit; // peep the whitespace between each list element, how bold and innovative
.social-links {
    @each $sm in $social-links {
        .icon-#{$sm} {
            background-image: url("images/#{$sm}.png");
        }
    }
}

// --- MIXIN ---
    // @mixin => declares a mixin under the specified name, where a mixin is effectively a variable that can store multiple CSS styles, declared within {} curly braces
    // @include => specifies the use of the mixin within the desired CSS element in your Sass file
    // mixins are best for generating CSS 'code literals' (actual .css code)

@mixin center {
    display: block;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
}

div {
    @include center;
    background-color: $primary-color;
}

// --- FUNCTION ---
    // @function <functionName> ( $<functionParameterName(s)> ) { <functionDefinitionBody> } => definition and declaration of a named function
    // @return => explicit return keyword specifies the return value or expression of the named function
    // functions are best for handling logic that might be used repeatedly in your Sass file

@function calculate-percentage($target-size, $parent-size) {
    @return $target-size / $parent-size * 100%;
}

$main-content: calculate-percentage(600px, 960px);
.main-content {
    width: $main-content;
}

.sidebar {
    width: calculate-percentage(300px, 960px);
}
```

## More on

* [debug](https://sass-lang.com/documentation/at-rules/debug/)
* [extend](https://sass-lang.com/documentation/at-rules/extend/)
* [use](https://sass-lang.com/documentation/at-rules/use/)
* [placeholder selectors](https://sass-lang.com/documentation/style-rules/placeholder-selectors/)
* [sass-lang.com](https://sass-lang.com/)
* [sass documentation](https://sass-lang.com/documentation/)
* [learn sass in y minutes](https://learnxinyminutes.com/docs/sass/)
* [try sass with sassmeister](https://www.sassmeister.com/)
