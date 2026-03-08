# PyTorch

# `PyTorch`

Deep learning in Python.

## Introduction

### Definitions

1. Deep learning: program infers relationships between user-defined *inputs* and *outputs* (supervised learning)
2. Deep learning is good for
  * problems with long lists of rules that would be difficult to hardcode
  * continually changing environments
  * large unstructured datasets with unclear patterns
3. Deep learning is mostly achieved through a multilayered neural network *(hence deep)*
4. Neural networks work by
  1. **Input layer**: *inputs* are numerically encoded into multi-dimensional vectors
  2. **Hidden layer**: vectors are processed by the many hidden layers, program finds patterns in the vectors
  3. **Output layer**: *output* is returned in the form of multi-dimensional vectors
5. There are multiple types of neural networks
  * convolutional neural network (images)
  * transformer (NLP)
6. There are a few kinds of learning
  * supervised learning: BOTH *inputs* and *outputs* are specified for the program
  * unsupervised / self-supervised learning: ONLY *input* is specified for the program
  * transfer learning: one program's *output* is FED to another program as *input*
  * reinforcement learning: program is REWARDED for *ideal* behaviour and discouraged from *unideal* behaviour
7. General workflow of building a deep learning program is
  1. convert raw data to *input tensors*
  2. build a model
    * pick a loss function and optimizer
    * create the training loop
  3. tweak the model to fit the *data* and make a prediction with *output tensors*
  4. evaluate the model
  5. improve the model through iterative experimentation
  6. save and reload
8. Tensor: any numerical representation of data *(most commonly multi-dimensional vectors)*
9. There are different kinds of tensors
10. scalar: a single number of *0 dimensions*
11. vector: a number with a direction of *1 dimension*
12. matrix: a *2-dimensional* array of numbers
13. tensor: a *n-dimensional* array of numbers
14. Random tensors: important because neural networks take in tensors full of *random numbers* and then adjust those numbers via tensor operations (addition, subtraction, simple, element and matrix multiplication, division) to **better represent** data

### Quickstart

```
# ----- QUICKSTART -----
    # %%time => CPU time and Wall time for the execution of a given Jupyter notebook cell
    # torch.__version__ => current PyTorch version
    # torch.tensor() => initialises a tensor object literal, and can receive additional arguments
        # dtype => specifies the datatype of each element of the tensor
            # None
            # .bool => True, False
            # .float16
            # .float32 (assigned by default)
            # .float64
            # .complex32
            # .complex64
            # .complex128
            # .int8
            # .int16
            # .int32
            # .int64
            # .uint8
            # .uint16
            # .uint32
            # .uint64
            # .quint8
            # .qint8
            # .qint32
            # .quint4x2
            # .float8_e4m3fn
            # .float8_e5m2
        # device => specifies the device each tensor lives on
            # cpu
            # cuda
            # mps
            # xpu
            # xla
            # meta
        # requires_grad => specifies whether PyTorch should track the gradient of a tensor when it undergoes numerical calculations
            # True
            # False
    # torch.rand() => initialises a random tensor object of the specified torch.Size()
    # torch.zeros() => initialises a tensor of all zeros of the specified torch.Size(), most commonly used to create a mask
    # torch.ones() => initialises a tensor of all ones of the specified torch.Size(), most commonly used to create a mask
    # torch.zeros_like => initialises a tensor of all zeros of the torch.Size() from another specified tensor
    # torch.ones_like => initialises a tensor of all ones of the torch.Size() from another specified tensor
    # torch.arange(start, end, step) # initialises a tensor object literal from a range created from the specified start, end and step
    # .item() => called on a tensor object, which is then returned as a value literal (integer, list literal etc.)
    # .ndim => called on a tensor object to return the number of dimensions a given tensor has
        # observe that the rule of thumb is one dimension is added for every degree of [] square bracket nesting within a tensor object
    # .shape => recursive call on a tensor object to return the number of list elements within a given tensor
    # .dtype => method that returns the datatype of the specified variable it is called upon, PyTorch assigns the default datatype of .float32 if unspecified
    # .device => method that returns the current device of a given tensor object

# --- DATA SCIENCE PACKAGES TO IMPORT ---

import torch 
import pandas
import numpy
import matplotlib.pyplot as p

print(torch.__version__) # display the current PyTorch version

# --- USER-DEFINED TENSORS ---

scalar = torch.tensor(7) # initialise a scalar tensor object
scalar.item() # returns 7
scalar.ndim # returns 0 dimensions
scalar.shape # returns torch.Size([]) to indicate that there are no list elements

vector = torch.tensor([7, 7]) # intialise a vector tensor object
vector.item() # returns [7, 7]
vector.ndim # returns 1 dimension
vector.shape # returns torch.Size(2) to indicate 2 elements

# - NOTE -
    # by convention, scalar and vector variables are declared in lowercase while matrix and tensor variables are declared in UPPERCASE

MATRIX = torch.tensor(
    [[7, 8], 
    [9, 10]]
)
MATRIX.ndim() # returns 2 dimensions
MATRIX.shape # returns torch.Size([2, 2]) to indicate 2 list elements each containing 2 elements

TENSOR = torch.tensor(
    [[[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]]]
)
TENSOR.ndim # returns 3 dimensions
TENSOR.shape # returns torch.Size([1, 3, 3]) to indicate 1 list element which contains 3 list elements which contain 3 elements each

WATERMELON = torch.tensor(
    [[[[1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
    [11, 12]]]]
)
WATERMELON.ndim # returns 4 dimensions
WATERMELON.shape # returns torch.Size([1, 1, 6, 2]) to indicate 1 list element that contains 1 list element that contains 6 list elements which then contains 2 elements each

# --- RANDOM TENSOR ---

RANDOM_TENSOR = torch.rand(3, 4) # initialises a random tensor of torch.Size([3, 4])
RANDOM_TENSOR.ndim # returns 2 dimensions

RANDOM_IMAGE_SIZE_TENSOR = torch.rand(size=(224, 224, 3)) # initialises a random tensor with a similar shape to an image tensor, specifying the height, width and color channel
RANDOM_IMAGE_SIZE_TENSOR.ndim # returns 3 dimensions as we specified above
RANDOM_IMAGE_SIZE_TENSOR.shape # returns torch.Size([224, 224, 3]) as we specified above

# --- TENSOR OF ALL 0s ---

ZERO_TENSOR = torch.zeros(size=(3, 4)) # initialises a tensor of all zeros of the torch.Size([3, 4])

# --- TENSOR OF ALL 1s ---

ONE_TENSOR = torch.ones(size=(3, 4)) # initialises a tensor of all ones of the torch.Size([3, 4])

# --- RANGE TENSOR ---

zero_to_nine = torch.arange(0, 10) # initialises the tensor object literal tensor([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
two_to_eleven = torch.arange(start=2, end=11, step=1) # initialises the tensor object literal tensor([2, 3, 4, 5, 6, 7, 8, 9, 10, 11])

# --- TENSORS LIKE ---

ten_zeroes = torch.zeros_like(input=zero_to_nine) # initialises a zero tensor of the same shape as the specified input tensor
ten_ones = torch.ones_like(input=zero_to_nine) # initialises a one tensor of the same shape as the specified input tensor
```

### Tensor operations

```
# ----- TENSOR OPERATIONS -----

# --- ARITHMETIC METHODS ---
    # + => addition applied to each element of the tensor
    # - => subtraction applied to each element of the tensor
    # * => simple multiplication of a matrix against a scalar number
    # / => division applied to each element of the tensor
    # * => ELEMENT multiplication of two matrices, where each element of a matrix is multipled against its corresponding element in the other matrix
    # torch.matmul() => MATRIX multiplication that finds the DOT PRODUCT of two specified matrices by multiplying them together
        # observe that matrix multiplication must satisfy the following 2 rules
            # 1. inner dimensions of the two matrices must match
                # torch.matmul(torch.rand(2, 3), torch.rand(2, 3)) WON'T work
                # torch.matmul(torch.rand(2, 3), torch.rand(3, 2)) WILL work
                # torch.matmul(torch.rand(3, 2), torch.rand(2, 3)) WILL work
            # 2. result matrix must have the shape of the outer dimensions
                # torch.matmul(torch.rand(2, 3), torch.rand(3, 2)) results in torch.Size([2, 2]) so this WILL work
                # torch.matmul(torch.rand(3, 2), torch.rand(2, 3)) results in torch.Size([3, 3]) so this WILL work

# --- AGGREGATOR METHODS ---
    # torch.min() => finds the element with the minimum value in a given tensor 
    # torch.max() => finds the element with the maximum value in a given tensor 
    # torch.mean() => finds the average value of all elements within a given tensor, note the element datatype must be a floating or complex type
    # torch.sum() => finds the sum of all elements within a given tensor
    # torch.argmin() => finds the index of the element with the minimum value in a given tensor 
    # torch.argmax() => finds the index of the element with the maximum value in a given tensor 

# --- MANIPULATION METHODS ---
    # one of the most common issues relating to tensors arises due to shape and dimension, which is combated by
        # reshaping => reshaping an input tensor to a specified shape
        # view => returns a view of an input tensor in a specified shape while pointing to the same place in memory as the original tensor
        # stacking => combine multiple tensors together in a vertical (vstack) or horizontal (hstack) stack
        # squeeze => remove all 1 dimensions from a given tensor
        # unsqueeze => add a 1 dimension to a given tensor
        # permute => returns a view of an input tensor with its dimensions swapped in a certain way
    # the PyTorch methods are as follows
        # .T => method that tranposes the shape of the specified tensor by switching its dimensions (axis), particularly useful for when tensor shape errors occur
        # .reshape() => method that reshapes a specified tensor to the new provided dimensions, note that the total corresponding number of elements must stay the same across a reshape
        # .view() => method that merely displays an existing tensor differenly according to the new provided dimensions whilst pointing to the original tensor's memory address (which means changing the new tensor variable assigned to a view changes the value of the original tensor being viewed)
        # torch.stack() => method that stacks multiple provided tensors together, with an optional dim argument that further allows augmentation of the desired number of dimensions within the new tensor
            # torch.vstack
            # torch.hstack
        # torch.squeeze() => method that removes all SINGLE dimensions from a given tensor
        # torch.unsqueeze() => method that adds a SINGLE dimension to a given tensor, with a dim argument that further specifies which dimension to add the single dimension at
        # torch.permute() => method that rearranges the dimensions of a given tensor to a new specified order and returns a VIEW of that new tensor (which means changing the new tensor variable assigned to a permute changes the value of the original tensor being permuted)

# --- SELECTION METHODS ---
    # [] => indexing in PyTorch is similar to indexing in Python and NumPy, where list values are zero-indexed and can have nested calls
    # : => specifies to select ALL of a given target dimension

# - NOTE -
    # recall that we have to reassign the result of a tensor operation to a variable for the value to be stored, similar to anywhere else in Python and most other programming languages really
    # the examples below are selected samples of the above methods and are not comprehensive, more detailed use cases can be found in PyTorch's documentation

import torch

# intialisation of tensor object literals
tensor = torch.tensor([1, 2, 3]) 
another_tensor = torch.tensor(
    [[7, 8],
    [9, 10],
    [11, 12]]
)
yet_another_tensor = torch.arange(1, 10) # initialises the tensor object literal tensor([1, 2, 3, 4, 5, 6, 7, 8, 9])
final_tensor = torch.arange(1, 10).reshape(1, 3, 3) # initialises the tensor object literal tensor([[[1, 2, 3], [4, 5, 6], [7, 8, 9]]]) 

tensor + 10 # addition that evaluates to the tensor object literal tensor([101, 102, 103])
tensor - 10 # subtraction that evaluates to the tensor object literal tensor([-9, -8, -7])
tensor * 10 # simple multiplication evaluates to the tensor object literal tensor([10, 20, 30])
tensor / 10 # divison evaluates to the tensor object literal tensor([0.1, 0.2, 0.3])

tensor * tensor # element multiplication evaluates to the tensor object literal tensor([1, 4, 9])
torch.matmul(tensor, tensor) # matrix multiplication evalutes to the dot product value torch(14)

another_tensor.T # transpose operation that evaluates to the tensor object literal tensor([[7, 9, 11], [8, 10, 12]])
another_tensor.T.shape # transpose operation means this will now return the torch.Size([2, 3])

yet_another_tensor.shape # returns torch.Size([9])
reshaped_tensor = yet_another_tensor.reshape(9, 1)
reshaped_tensor.shape # returns torch.Size([9, 1])

view_tensor = yet_another_tensor.view(9, 1)
view_tensor.shape # returns torch.Size([9, 1]), but note that modifying view_tensor will also modify the value of yet_another_tensor

stack_tensor = torch.stack([yet_another_tensor, yet_another_tensor, yet_another_tensor, yet_another_tensor], dim = 0) # restacks the tensor according to dimension 0
stack_tensor = torch.stack([yet_another_tensor, yet_another_tensor, yet_another_tensor, yet_another_tensor], dim = 1) # restacks the tensor according to dimension 1

final_tensor.shape # unmodified tensor will return torch.Size([1, 3, 3])
final_tensor[0] # evaluates to tensor([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
final_tensor[0][0] # evaluates to tensor([1, 2, 3])
final_tensor[0][0][0] # evaluates to tensor(1)
```

### PyTorch and NumPy

```
# ----- NUMPY -----
    # torch.from_numpy() => receives NumPy data and converts it to a PyTorch tensor
    # torch.Tensor.numpy() => receives a PyTorch tensor and converts it to NumPy data
    # observe that NumPy's default datatype is float64 while PyTorch's default datatype is float32

import torch
import numpy

array = numpy.arange(1.0, 8.0) # initialise a NumPy array
tensor = torch.from_numpy(array) # convert that NumPy array to a PyTorch tensor
back_to_array = torch.Tensor.numpy(tensor) # converting that PyTorch tensor back to a NumPy array
```

### Reproducibility

Introduce a **random seed** to flavour the randomness of `torch.rand()`.

```
# ----- REPRODUCIBILITY -----
    # torch.manual_seed() => sets the provided value as the seed for generating the next random tensor value to ensuring reproducibility
        # note that this method must be called EVERY TIME we want to invoke the torch.rand() method to reassign the user-defined seed value

import torch

RANDOM_SEED = 42
torch.manual_seed(RANDOM_SEED) # assign a seed value
random_tensor_1 = torch.rand(3, 4)
torch.manual_seed(RANDOM_SEED) # assign a seed value
random_tensor_2 = torch.rand(3, 4)

random_tensor_1 == random_tensor_2 # this evaluates to True
```

## Doing actual things with Tensors

*"Enough yapping, I want to build something."*

### Encode an Image to a Tensor

The model will be trained on the [CIFAR-10 dataset](https://www.cs.toronto.edu/~kriz/cifar.html).

1. Split the image into its RGB *(red green blue)* color channels.
2. Represent that as a tensor with the shape *(`color_channels`, `image_height`, `image_width`)*.
3. Train the model using a basic convolutional neural network (CNN).

```
# ----- PREPARATION WORK -----

# --- required imports ---

import torch
import torch.nn as nn
import torch.optim as optim
import torchvision
import torchvision.transforms as transforms
import torch.nn.functional as F

# --- preprocess the CIFAR-10 image dataset ---
    # defines transformations for the training set
    # flips the images randomly for additional fed data
    # load the actual training set and test set

transform = transforms.Compose([
    transforms.RandomHorizontalFlip(),  # randomly flip the image horizontally
    transforms.RandomCrop(32, padding=4),  # crop the image to 32x32 with padding
    transforms.ToTensor(),  # convert the image to a PyTorch tensor
    transforms.Normalize((0.4914, 0.4822, 0.4465), (0.2023, 0.1994, 0.2010)),  # normalize the image
])

trainset = torchvision.datasets.CIFAR10(root='./data', train=True, download=True, transform=transform)  # download and transform training data
trainloader = torch.utils.data.DataLoader(trainset, batch_size=100, shuffle=True, num_workers=2)  # create data loader for training
testset = torchvision.datasets.CIFAR10(root='./data', train=False, download=True, transform=transform)  # download and transform test data
testloader = torch.utils.data.DataLoader(testset, batch_size=100, shuffle=False, num_workers=2)  # create data loader for testing

classes = ('plane', 'car', 'bird', 'cat', 'deer', 'dog', 'frog', 'horse', 'ship', 'truck')  # class labels

# --- specifying CNN architecture ---

class SimpleCNN(nn.Module):  
    def __init__(self):
        super(SimpleCNN, self).__init__()  # initialize the parent class
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)  # first convolutional layer
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)  # second convolutional layer
        self.pool = nn.MaxPool2d(kernel_size=2, stride=2, padding=0)  # max pooling layer
        self.fc1 = nn.Linear(64 * 8 * 8, 512)  # first fully connected layer
        self.fc2 = nn.Linear(512, 10)  # second fully connected layer

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))  # apply first conv layer + ReLU + pooling
        x = self.pool(F.relu(self.conv2(x)))  # apply second conv layer + ReLU + pooling
        x = x.view(-1, 64 * 8 * 8)  # flatten the tensor
        x = F.relu(self.fc1(x))  # apply first FC layer + ReLU
        x = self.fc2(x)  # apply second FC layer
        return x

# ----- EXECUTION CODE -----

net = SimpleCNN()  # instantiate an instance of the CNN model

criterion = nn.CrossEntropyLoss()  # define the loss function
optimizer = optim.SGD(net.parameters(), lr=0.001, momentum=0.9)  # define the optimizer

# --- training loop ---

for epoch in range(10):  # loop over the dataset multiple times
    running_loss = 0.0  # initialize loss
    for i, data in enumerate(trainloader, 0):  # iterate through batches

        inputs, labels = data  # get the inputs and labels

        optimizer.zero_grad()  # zero the parameter gradients

        outputs = net(inputs)  # forward pass
        loss = criterion(outputs, labels)  # compute loss
        loss.backward()  # backward pass
        optimizer.step()  # update weights

        running_loss += loss.item()  # accumulate loss

        if i % 100 == 99:  # print every 100 mini-batches
            print(f'[{epoch + 1}, {i + 1}] loss: {running_loss / 100:.3f}')  # print loss
            running_loss = 0.0  # reset running loss

print('we have finished training the model hooray!')  # indicate end of training loop

# --- evaluate accuracy of the model ---

correct = 0
total = 0
with torch.no_grad():  # turn off gradient computation
    for data in testloader:  # iterate through test data
        images, labels = data  # get the images and labels
        outputs = net(images)  # forward pass
        _, predicted = torch.max(outputs.data, 1)  # get the predicted labels
        total += labels.size(0)  # update total count
        correct += (predicted == labels).sum().item()  # update correct count

print(f'accuracy of the network on the 10000 test images: {100 * correct / total} %')  # model accuracy
```

## More on

### Core resources

* [install pytorch locally](https://pytorch.org/get-started/locally/)
* [getting setup with pytorch](https://github.com/mrdbourke/pytorch-deep-learning/blob/main/SETUP.md)
* [pytorch.org](https://pytorch.org/)
* [pytorch documentation](https://pytorch.org/docs/stable/index.html)
* [papers with code trends](https://paperswithcode.com/trends)
* [why pytorch over tensorflow](https://www.reddit.com/r/MLQuestions/comments/112sege/pytorch_vs_tensorflow/)
* [zero to mastery: learn pytorch for deep learning](https://www.learnpytorch.io/)

### Additional resources

* [colab.google](https://colab.google/)
* [aws.amazon](https://aws.amazon.com/)
* [tensorflow.org](https://www.tensorflow.org/)
* [keras.io](https://keras.io/)
* [llama2](https://github.com/meta-llama/llama)

### Prerequisite knowledge

* [learn python in y minutes](https://learnxinyminutes.com/docs/python/)
* [numpy](https://numpy.org/)
* [pandas](https://pandas.pydata.org/)
* [matplotlib](https://matplotlib.org/)
* [how to find dot product](https://www.mathsisfun.com/algebra/matrix-multiplying.html)
* [what is cloud computing](https://aws.amazon.com/what-is-cloud-computing/)
