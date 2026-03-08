# Make

# `Make`

Universal build tool.

## Quickstart and Usage

```
# ---------- QUICKSTART ----------
    # filename must be "Makefile"
    # Makefile rules follow the format => {COMMAND}: {FILE DEPENDANCY} {ACTUAL COMMAND TO RUN WHEN RULE CALLED}

# ---------- USAGE ----------
    # make {SPECIFIED COMMAND NAME} => calls the make command within your Makefile
    # = => assignment operator allows for variables to be declared and reused later
    # $() => retrieves a value stored at the specified variable, similar to PHP
    # all => augmenter that specifies that command will be run universally when "make" is inputted into the stdin
    # by convention, always add a "clean" rule to automate restoring a clean build of your project within your Makefile, although logic may vary

CC=clang

all: hello

hello: hello.c test.o
    $(CC) -o hello hello.c

test.o: test.c
    $(CC) -c test.c -o test.o

clean:
    rm hello test.o
```

## More on

* Rake
* Ant
* Maven
* [Makefile by example](https://makefiletutorial.com/)
