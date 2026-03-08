# Cogent

# `Cogent`

Language for hardware and software verification and co-design.

## Introduction

Cogent combines functional programming paradigms with system description languages.

1. [Cogent language](#specifying-the-model)
  * file extension `.cog`
  * dictates what software and hardware systems can do
2. [Cogent compiler](#cogent-compiler)
  * toolchain that compiles Cogent to binary executables *(and other formats)*
  * behaviour validation capabilities

### Specifying the model

```
// ----- SPECIFYING THE MODEL -----

// --- EXAMPLE 1: BASIC FUNCTIONAL PROGRAMMING ---

module ExampleFunctional {

    data List a = Nil | Cons a (List a)

    append : List a -> List a -> List a
    append Nil ys = ys
    append (Cons x xs) ys = Cons x (append xs ys)

    reverse : List a -> List a
    reverse xs = rev xs Nil where
        rev : List a -> List a -> List a
        rev Nil ys = ys
        rev (Cons x xs) ys = rev xs (Cons x ys)

    // mapping over a list
    map : (a -> b) -> List a -> List b
    map _ Nil = Nil
    map f (Cons x xs) = Cons (f x) (map f xs)

}

// --- EXAMPLE 2: HARDWARE DESCRIPTION ---

module ExampleHardware {

    data Signal = Low | High

    xorGate : Signal -> Signal -> Signal
    xorGate Low Low = Low
    xorGate High High = Low
    xorGate Low High = High
    xorGate High Low = High

    // represents a small multiplexer
    data Bit = Zero | One
    data MultiplexerOutput = MuxOutput1 Bit | MuxOutput2 Bit
    multiplexer : Signal -> Signal -> Bit -> MultiplexerOutput
    multiplexer Low Low Zero = MuxOutput1 Zero
    multiplexer Low High Zero = MuxOutput1 Zero
    multiplexer High Low Zero = MuxOutput1 One
    multiplexer High High Zero = MuxOutput2 Zero
    multiplexer _ _ One = MuxOutput2 One

    // represents a simple state machine
    data State = Idle | Active
    data Event = Start | Stop
    nextState : State -> Event -> State
    nextState Idle Start = Active
    nextState Active Stop = Idle
    nextState s _ = s  // this specifies to remain in the same state for other events

}

// --- EXAMPLE 3: SOFTWARE SYSTEM ---

module ExampleSoftware {

    // data structure that represents a person
    data Person = Person {
        name : String,
        age : Int,
        address : String
    }

    // function that updates a person's address
    updateAddress : Person -> String -> Person
    updateAddress person newAddress = person{ address = newAddress }

    // function that calculates the age of a person in dog years
    dogYears : Person -> Int
    dogYears person = person.age * 7

}

// --- EXAMPLE 4: COMPLEX SYSTEM INTEGRATION ---
    // below is an example of how to integrate functional programming, hardware description, and software systems
    // this uses the above multiplexer from example 2 and the software from example 3 to switch between different software components based on hardware signals

module ExampleIntegration {

    import ExampleFunctional
    import ExampleHardware
    import ExampleSoftware

    data SystemState = FuncState (List Int) | HardState (Signal, State)

    systemIntegration : Signal -> State -> SystemState -> SystemState
    systemIntegration Low _ (FuncState ints) = HardState (Low, Idle)
    systemIntegration High Active (HardState (High, Active)) = FuncState (map dogYears (Cons (Person "Alice" 35 "123 Main St") Nil))
    systemIntegration _ _ s = s  // this specifies to remain in the current system state for other cases

}
```

## Cogent compiler

### Compiling and verification

1. Save the model or hardware specification as a `.cog` file.
2. Convert the `.cog` file into a binary executable with the Cogent compiler.
3. Run the check.

## More on

* [download cogent](https://cogenttools.org/download.html)
* [cogent project](https://github.com/au-ts/cogent)
* [cogent documentation](https://cogent.readthedocs.io/en/latest/)
* [cogent language reference](https://cogentlang.org/docs/reference.pdf)
* [unsw.edu.au](https://www.unsw.edu.au/)
* [trustworthy systems](https://trustworthy.systems/projects/OLD/cogent/)
* [what is co-design](https://www.beyondstickynotes.com/what-is-codesign)
* [cogent: uniqueness types and certifying compilation](https://www.cambridge.org/core/services/aop-cambridge-core/content/view/47AC86F02534818B95A56FA1A283A0A6/S095679682100023Xa.pdf/cogent-uniqueness-types-and-certifying-compilation.pdf)
