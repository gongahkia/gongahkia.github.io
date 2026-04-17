---
category: General
---
# Mathematical analysis

# `Mathematical analysis`

Code snippets in Python.

## Limits

* Describes the value a function approaches as its input approaches a specified value
* Useful for understanding continuity and differentiability

```
import math

def limit(f, x, x_val):
    delta = 0.001
    while True:
        x_low = x_val - delta
        x_high = x_val + delta
        if f(x_low) == f(x_high):
            break
        delta *= 0.5
    return f(x_val)

f = lambda x: (x**2 - 1)/(x - 1)
x_val = 1
result = limit(f, 0.9999, x_val)
print(f"the limit of f(x) as x approaches {x_val} is {result}")
```

## Continuity

* Functions are continuous if there are no breaks or holes in the function range
* Useful for differentiation

```
def is_continuous(f, x, x_val, delta=1e-6):
    x_low = x_val - delta
    x_high = x_val + delta
    limit_exists = True
    try:
        lim = limit(f, x, x_val)
    except:
        limit_exists = False
    return limit_exists and (f(x_low) - lim)**2 < delta and (f(x_high) - lim)**2 < delta

f = lambda x: x**2
x_val = 2
print(is_continuous(f, lambda x: x, x_val))
```

## Differentiation

* A.K.A Derivative
* Measures a function's rate of change
* Useful for optimization, physics and other areas of applied mathematics

```
def derivative(f, x, h=1e-5):
    return (f(x+h) - f(x))/h

f = lambda x: x**3
x = 2
print(f"derivative of f(x)=x^3 at x={x} is {derivative(f, x)}")
```

## Derivatives of Polynomials

* Applying the [power rule](https://youtu.be/9Yz-RCdS2Tg?si=AXuFQ7r5kNW6cQzQ)

```
from math import factorial

def poly_deriv(coeffs):
    derived_coeffs = []
    for i, c in enumerate(coeffs[1:]):
        derived_coeffs.append(c * (len(coeffs) - i - 1))
    return derived_coeffs

f = [1, 2, 1, 3, 4] # 1 + 2x + x^2 + 3x^3 + 4x^4
print(f"f'(x) coefficients are {poly_deriv(f)}")
```

## Integration

* Applies the [Riemann sum](https://www.sfu.ca/math-coursenotes/Math%20158%20Course%20Notes/sec_riemann.html)
* Inverse of [differentiation](#differentiation)
* Measures the accumulated change of a function over a specified interval

```
import numpy as np

def riemann_sum(f, a, b, n=100):
    x = np.linspace(a, b, n+1)
    dx = (b - a) / n
    area = 0
    for i in range(n):
        area += f(x[i]) * dx
    return area

f = lambda x: x**2
a = 0
b = 2
print(f"integral of f(x)=x^2 from {a} to {b} is {riemann_sum(f, a, b)}")
```

## Numerical Integration Error

* [Riemann sum](https://www.sfu.ca/math-coursenotes/Math%20158%20Course%20Notes/sec_riemann.html) suffers from errors as the value of n decreases
* Higher n yields a lower error

```
actual_int = 4/3  # Integral of x^2 from 0 to 2
n_values = [10, 100, 1000, 10000]

for n in n_values:
    approx = riemann_sum(lambda x: x**2, 0, 2, n)
    error = abs(actual_int - approx)
    print(f"for n={n}, approx={approx:.6f}, error={error:.6f}")
```

## Sequences

* Ordered list of elements of finite or infinite length
* Sequence limits are useful for mathematical analysis

```
def seq_limit(seq, n):
    if n >= len(seq):
        return None

    s = seq[n]
    for i in range(n+1, len(seq)):
        if abs(seq[i] - s) > 1e-6:
            return None

    return s

seq = [1/n for n in range(1, 21)]
n = 5
limit = seq_limit(seq, n)
print(f"the limit of the sequence 1/n as n->inf is {limit}")
```

## Infinite Series

* Sums the terms of an infinite sequence
* Convergence is determined by the limits of a sequence of partial sums

```
def sum_series(seq, n):
    total = 0
    for i in range(n):
        total += seq[i]
    return total

def series_conv(seq, abs_tol=1e-6, max_terms=100):
    prev_sum = 0
    for n in range(1, max_terms+1):
        curr_sum = sum_series(seq, n)
        if abs(curr_sum - prev_sum) < abs_tol:
            return curr_sum
        prev_sum = curr_sum
    return None

harmonic = [1/n for n in range(1, 51)]
print(f"sum of harmonic series is {series_conv(harmonic)}")
```

## Power Series

* Series representation of a function as an infinite sum of terms calculated from the derivatives at a single point

```
from math import factorial

def power_series(f, a, n):
    coeffs = []
    for i in range(n+1):
        coeffs.append(derivative(f, a, i)/factorial(i))
    return coeffs

f = lambda x: 1 / (1 - x)
a = 0
print(f"power series of f(x)=1/(1-x) around x={a} is {power_series(f, a, 5)}")
```

## Taylor Series

* Representation of a function as an infinite sum of terms calculated from its derivatives at a single point

```
from math import factorial, exp

def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

def exp_taylor(x, n):
    approx = 0
    for i in range(n+1):
        approx += x**i / factorial(i)
    return approx

x = 1
n = 10
print(f"e^(x) approximated by the Taylor series expansion to {n} terms is {exp_taylor(x, n)}")
```

## Taylor Polynomial Error

* Taylor Polynomial approximates a function by truncating its Taylor Series
* Approximation error depends on the value of n and the function's smoothness

```
import sympy as sp
import numpy as np

def taylor_error(f, x0, n, interval):
    f_symb = sp.lambdify(f.args[0], f, 'numpy')
    exact_vals = f_symb(interval)
    taylor_vals = sp.lambdify(f.args[0], sp.series(f, x0, n).removeO(), 'numpy')(interval)
    max_err = 0
    for x_val, exact_val, taylor_val in zip(interval, exact_vals, taylor_vals):
        err = abs(exact_val - taylor_val)
        if err > max_err:
            max_err = err
    return max_err

f = sp.exp(sp.Symbol('x'))
x0 = 0
n = 10
interval = np.linspace(-1, 1, 101)
max_err = taylor_error(f, x0, n, interval)
print(f"maximum error in approximating exp(x) by a degree {n} Taylor polynomial around x={x0} on [-1, 1] is {max_err:.6f}")
```

## Fourier Series

* Represents a periodic function as an infinite sum of sines and cosines
* Useful for analysing functions as superpositions of simple waves

```
import numpy as np
from scipy import integrate

def fourier_series(f, L, n):
    coeffs = {}
    for k in range(-n, n+1):
        if k == 0:
            coeffs[k] = 1/L * scipy.integrate.quad(f, 0, L)[0]
        else:
            def int_func(x):
                return f(x) * np.cos(2*np.pi*k*x/L)
            coeffs[k] = 2/L * scipy.integrate.quad(int_func, 0, L)[0]
    return coeffs

def square_wave(x):
    return 1 if x < 0.5 else -1

L = 1
n = 10
coeffs = fourier_series(square_wave, L, n)
print(f"first {2*n+1} Fourier coefficients of square wave {coeffs}")
```

## Convergence of Fourier Series

* Converges pointwise to the periodic function for well-behaved functions
* Fourier Series might still diverge at certain points of discontinuity

```
import matplotlib.pyplot as plt

def plot_fourier_approx(f, L, coeffs, x_vals):
    approx = np.zeros(len(x_vals))
    for k, ak in coeffs.items():
        if k == 0:
            approx += ak
        else:
            approx += ak * np.cos(2*np.pi*k/L * x_vals)
    return approx

x_vals = np.linspace(0, 2*L, 1000)
approx = plot_fourier_approx(square_wave, L, coeffs, x_vals)
plt.plot(x_vals, [square_wave(x) for x in x_vals], label='Actual')
plt.plot(x_vals, approx, '--', label=f'Fourier Approx (n={n})')
plt.legend()
plt.show()
```

## More on

* [Introduction to Mathematical Analysis in Python](https://xbe.at/index.php?uid=08e094a068cbde4ecb3dda7b224e4eb8)
* [Calculus for Beginners and Artists](https://math.mit.edu/~djk/calculus_beginners/)
* [xbe.at](https://xbe.at/index.php?uid=08e094a068cbde4ecb3dda7b224e4eb8)
* [MIT Mathematics](https://math.mit.edu/)
