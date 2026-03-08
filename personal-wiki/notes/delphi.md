# Delphi

# `Delphi`

A powerful, object-oriented programming language and integrated development environment (IDE).

## Comments

```
// ---------- COMMENT ----------

// this is a single-line comment

{
this is a
multi-line
comment
}

(*
this is also
a multi-line
comment
*)
```

## Printing

```
// ---------- PRINT ----------
    // ShowMessage => displays a message in a simple dialog box
    // WriteLn => writes a string to the console, followed by a newline

ShowMessage('Hello, Delphi!');
WriteLn('This will be printed to the console.');
```

## Quickstart

```
// ---------- QUICKSTART ----------
    // Delphi is an object-oriented dialect of Pascal.
    // It is a strongly-typed, compiled language.
    // The IDE is a major part of the Delphi experience, providing visual design tools.

program Project1;

{$APPTYPE CONSOLE}

uses
  System.SysUtils;

begin
  WriteLn('Hello, World!');
  ReadLn;
end.
```

## Variables

```
// ---------- VARIABLE ----------
    // var => keyword to declare variables
    // := => assignment operator

var
  myInteger: Integer;
  myString: string;
begin
  myInteger := 10;
  myString := 'Hello';
end;
```

## Types

```
// ---------- TYPE ----------
    // Integer => 32-bit signed integer
    // Real => floating-point number
    // string => sequence of characters
    // Boolean => True or False
    // TDateTime => for date and time values
```

## Operators

```
// ---------- OPERATOR ----------

// ARITHMETIC OPERATORS
    // + => addition
    // - => subtraction
    // * => multiplication
    // / => division (floating-point)
    // div => integer division
    // mod => modulo

// LOGICAL OPERATORS
    // and => logical AND
    // or => logical OR
    // not => logical NOT

// COMPARISON OPERATORS
    // = => equality
    // <> => inequality
    // > => greater than
    // < => less than
    // >= => greater than or equal to
    // <= => less than or equal to
```

## Control structures

```
// ---------- CONTROL STRUCTURE ----------

// IF THEN ELSE

if (a > b) then
  result := a
else
  result := b;

// CASE OF

case MyChar of
  'a'..'z': WriteLn('Lowercase');
  'A'..'Z': WriteLn('Uppercase');
  '0'..'9': WriteLn('Number');
else
  WriteLn('Other');
end;

// FOR LOOP

for i := 1 to 10 do
begin
  WriteLn(i);
end;

// WHILE LOOP

while i <= 10 do
begin
  WriteLn(i);
  Inc(i);
end;

// REPEAT UNTIL

repeat
  WriteLn(i);
  Inc(i);
until i > 10;
```

## Data structures

```
// ---------- DATA STRUCTURE ----------

// ARRAY

var
  myArray: array[0..4] of Integer;

// DYNAMIC ARRAY

var
  myDynamicArray: TArray<Integer>;
begin
  SetLength(myDynamicArray, 5);
  myDynamicArray[0] := 1;
end;

// RECORD (similar to a struct)

type
  TPoint = record
    X, Y: Integer;
  end;

// CLASSES (for object-oriented programming)

type
  TMyClass = class(TObject)
  private
    FMyField: Integer;
  public
    procedure MyMethod;
  end;
```

## Functions

```
// ---------- FUNCTION ----------
    // function => defines a function that returns a value
    // procedure => defines a function that does not return a value

function Add(a, b: Integer): Integer;
begin
  Result := a + b;
end;

procedure SayHello(name: string);
begin
  WriteLn('Hello, ' + name);
end;
```

## More on

* [Embarcadero Delphi Documentation](https://docwiki.embarcadero.com/RADStudio/en/Main_Page)
* [Learn Delphi](https://learndelphi.org/)
* [Delphi Basics](http://www.delphibasics.co.uk/)
