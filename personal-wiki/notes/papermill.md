# Papermill

# `Papermill`

If Jupyter notebooks were functions.

## Introduction

* Python library
* CLI tool
* tool for parameterizing and executing of Jupyter Notebooks programatically
* affords the easy replacement of inputs, which allows the reexecution of Jupyter notebooks with different parameters
* used for batch processing, pipeline automation, and report generation
* transpilation outputs include
  * `.ipynb` *(Jupyter notebooks)*: native Jupyter notebook format that allows execution of cells and evaluation of results
  * `.html` *(HTML)* : web-friendly format for viewing executed notebooks in the browser
  * `.pdf` *(PDF)* : universal printable document format of the executed notebook for formal reports
  * `.md` *(Markdown)*: markdown format for simpler text-based documentation and inclusion in Markdown-based systems
  * `.tex` *(LaTeX)* : LaTeX format for high-quality typesetting of academic documents

## Quickstart

A sample Python file that uses Papermill will look like this.

```
import papermill as pm

# define input and output Jupyter notebook paths
input_notebook = 'input_notebook.ipynb'
output_notebook = 'output_notebook.ipynb'

# define parameters to inject into the Jupyter notebook
parameters = {
    'param1': 10,
    'param2': 'some_value'
}

# execute the Jupyter notebook with the provided parameters
pm.execute_notebook(
    input_path=input_notebook,
    output_path=output_notebook,
    parameters=parameters
)
```

Then the sample Jupyter notebook which will be executed via Papermill will look like this.

```
{
    "cells": [
        {
            "cell_type": "code",
            "execution_count": null,
            "id": "a1b2c3d4",
            "metadata": {},
            "outputs": [],
            "source": [
                "import papermill as pm\n",
                "import matplotlib.pyplot as plt\n",
                "import numpy as np\n",
                "\n",
                "# Define parameters\n",
                "param1 = 10\n",
                "param2 = 'some_value'\n",
                "\n",
                "# Display the parameters\n",
                "print(f'Parameter 1: {param1}')\n",
                "print(f'Parameter 2: {param2}')\n",
                "\n",
                "# Generate some data\n",
                "x = np.linspace(0, 10, 100)\n",
                "y = param1 * np.sin(x)\n",
                "\n",
                "# Create a plot\n",
                "plt.figure(figsize=(10, 6))\n",
                "plt.plot(x, y, label=f'Sin curve with param1={param1}')\n",
                "plt.xlabel('x')\n",
                "plt.ylabel('y')\n",
                "plt.title('Plot of y = param1 * sin(x)')\n",
                "plt.legend()\n",
                "plt.grid(True)\n",
                "plt.show()"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# Analysis\n",
                "\n",
                "This notebook demonstrates the use of Papermill to parameterize and execute a Jupyter notebook. The parameters `param1` and `param2` are injected into the notebook, affecting the output. The plot above shows the effect of `param1` on the sine curve."
            ]
        }
    ],
    "metadata": {
        "kernelspec": {
            "display_name": "Python 3",
            "language": "python",
            "name": "python3"
        },
        "language_info": {
            "codemirror_mode": {
                "name": "ipython",
                "version": 3
            },
            "file_extension": ".py",
            "mimetype": "text/x-python",
            "name": "python",
            "nbconvert_exporter": "python",
            "pygments_lexer": "ipython3",
            "version": "3.8.5"
        }
    },
    "nbformat": 4,
    "nbformat_minor": 4
}
```

## More on

* [papermill.io](https://papermill.io/#why-papermill)
* [papermill](https://github.com/nteract/papermill) Github repository
* [Papermill documentation](https://papermill.readthedocs.io/en/latest/)
* [Introduction to Papermill](https://towardsdatascience.com/introduction-to-papermill-2c61f66bea30) by Gabriel dos Santos Gonçalves
* [Automating Jupyter notebooks with Papermill](https://medium.com/y-data-stories/automating-jupyter-notebooks-with-papermill-4b8543ece92f) by Gleb Ivashkevich
* [Papermill strengths and weaknesses](https://docs.nersc.gov/jobs/workflow/papermill/) by National Energy Research Scientific Computing Center
* [Notebooks as Functions with Papermill | Netflix](https://youtu.be/3FmBJ847_y8?si=qzoQtZlfx4vbwxJD) by Data Council
* [jupyter.org](https://jupyter.org/)
* [Jupyter notebook documentation](https://docs.jupyter.org/en/latest/)
* [nbconvert](https://github.com/jupyter/nbconvert)
