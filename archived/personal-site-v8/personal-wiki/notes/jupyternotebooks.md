---
category: Tech
---
# Jupyter notebooks

# `Jupyter notebooks`

Learn and run Python anywhere.

## Introduction

* Jupyter notebooks end with the `.ipynb` file extension *(standing for interactive python notebook)*
* open-source web app for creating and sharing documents that contain Python code
* widely used in data science, academic research, and machine learning for exploring and visualizing data
* notebooks can be exported to various target outputs *(`.html`, `.pdf`, `.py`, etc.)*
* Jupyter also supports other programming languages through various kernels

## Installation

```
$ pip install notebook # installs Jupyter notebook 
$ jupyter notebook # starts the notebook server locally
```

## Quickstart

Jupyter notebooks can run simple Python code snippets

```
x = 10
y = 20
example_equation = x + y
example_name = "keshi"

print("testing out my Jupyter notebook!")
print(f"my name is {example_name} and i calculate the total sum of x and y to be {example_equation}")
```

and more complex Python scripts for data science and visualisation.

```
import matplotlib.pyplot as plt
import numpy as np

# generate some data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# plot the data
plt.plot(x, y)
plt.title("Sine Wave")
plt.xlabel("X-axis")
plt.ylabel("Y-axis")
plt.show()
```

## More on

* [jupyter.org](https://jupyter.org/)
* [anaconda.com](https://www.anaconda.com/)
* [Jupyter Notebooks in VS Code](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
* [python.org](https://www.python.org/)
* [learn Python in y minutes](https://learnxinyminutes.com/docs/python/)
* [Updated Jupyter Kernels page](https://gist.github.com/chronitis/682c4e0d9f663e85e3d87e97cd7d1624)
