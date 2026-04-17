---
category: Tech
---
# Venv

# `Venv`

Virtual environments.

This document discusses venvs specifically within the context of Python.

## What is a venv?

Python-native module that installs a directory comprised of the following files to your project repository.

1. Python interpreter
2. Set of installed packages
3. Scripts to activate and deactivate the environment

## Why use a venv?

Create and reproduce isolated Python environments within the local project, allowing for fuss-free management of project-specific dependencies without interfering with system-wide Python installations.

## How do I use a venv?

```
$ python3 -m venv venv
$ venv\Scripts\activate # for windows systems
$ source venv/bin/activate # for unix/linux systems
$ pip install package_name # install all your packages 
$ deactivate # close the virtual environment
```

You can also make your project reproducible with a `requirements.txt`.

```
$ pip3 freeze > requirements.txt
```

## A common question

### Do I commit my venv to git?

No. Please specify `venv` within your `.gitignore`.

### Should I use a venv if I'm not being forced to?

Yes. It is widely used in [production](https://stackoverflow.com/questions/45151146/are-python-virtual-environments-needed-in-production).

## More on

* [*Python and Virtual Environments*](https://csguide.cs.princeton.edu/software/virtualenv) by Princeton Department of Computer Science
* [*Create a Virtual Environment with Python*](https://gist.github.com/loic-nazaries/c25ce9f7b01b107573796b026522a3ad) by loic-nazaries on Github
* [*venv — Creation of virtual environments*](https://docs.python.org/3/library/venv.html) Python official docs
* [*How can I set up a virtual environment for Python in Visual Studio Code?*](https://stackoverflow.com/questions/54106071/how-can-i-set-up-a-virtual-environment-for-python-in-visual-studio-code/54107016) on Stack Overflow
* [*direnv*](https://github.com/direnv/direnv) Github Repository
