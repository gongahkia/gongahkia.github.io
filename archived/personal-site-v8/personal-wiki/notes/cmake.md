---
category: Tech
---
# CMake

# `CMake`

Makes Makefiles.

## Introduction

* cross-platform project build-system generator to create platform-specific build files (most commonly [Makefiles](https://www.gnu.org/software/make/manual/make.html))
* flexibly handles dependancy configurations across different platforms at any scale
* `CMakeLists.txt` defines CMake's build process
* syntax has a higher degree of abstraction and is easier to write than Make
* encourages out-of-source builds (keeping build files separate from source files)
* used for project configuration, building and testing

## Quickstart

```
# ----- QUICKSTART -----
    # this is a comment in CMake

# ----- SYNTAX OVERVIEW -----
    # project(<name> [<programmingLanguage(s)>]) => defines the project name and possible programming languages to be used
    # cmake_minimum_required(VERSION <versionNumber>) => specifies the minimum required CMake version
    # set(<variableIdentifier> <variableValue>) => sets a specified value to a given variable
    # option(<variableIdentifier> "<optionalDescription>" <defaultSpecifiedValue>) => creates an option with a description and a default value
    # add_executable(<executableName> [<sourceFilePath(s)>]) => adds an executable target under the specified name and source file path
    # add_library(<libraryName> [<STATIC, SHARED, MODULE>] [sourceFilePath(s)]) => adds library targets at the specified file paths under the given name
    # target_include_directories(<targetName> [SYSTEM] [<AFTER, BEFORE>] <INTERFACE, PUBLIC, PRIVATE> [directoryInternalItem(s)]) => specifies a given target file path is to be included, effectively highlighting the givne file as a dependancy for building
    # target_link_libraries(<targetName> [<INTERFACE, PUBLIC, PRIVATE>] <libraryName(s)>) => links all the specified libraries to the provided target
    # find_package(<packageName> [<packageVersion>] [REQUIRED] [COMPONENTS]) => finds and loads settings for external packages
    # add_custom_command() => adds the specified custom command to a given target
    # add_custom_target() => adds the specified custom target that can be built using previously declared custom commands

# ----- EXAMPLE CMAKELISTS.TXT FILE -----
    # CMakeLists.txt files generally follow the below structure

# minimum CMake version required
cmake_minimum_required(VERSION 3.10)

# project name and version
project(HelloWorld VERSION 1.0)

# specify C++ standard to be used
set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# add executables
add_executable(hello_world main.cpp)

# specify directories to be included
target_include_directories(hello_world PRIVATE ${PROJECT_SOURCE_DIR}/include)

# find and link external libraries 
find_package(Boost 1.65 REQUIRED)
target_link_libraries(hello_world PRIVATE Boost::Boost)
```

## More on

* [cmake packages](https://cmake.org/cmake/help/latest/manual/cmake-packages.7.html)
* [cmake project structure](https://cliutils.gitlab.io/modern-cmake/chapters/basics/structure.html)
* [testing with ctest](https://cmake.org/cmake/help/book/mastering-cmake/chapter/Testing%20With%20CMake%20and%20CTest.html)
* [cmake.org](https://cmake.org/)
* [cmake documentation](https://cmake.org/documentation/)
* [learn cmake in y minutes](https://learnxinyminutes.com/docs/cmake/)
