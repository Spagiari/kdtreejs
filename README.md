# Red-Black BST
Implementation of [k-dimensional tree](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.160.335&rep=rep1&type=pdf) with no dependencies for multi purpose. Common uses are: search in multisemensional spaces (range searches and nearest neighbor searches).

# Introduction
k-dimensional tree in data structure is a type of binary tree in which each leaf of the tree represents a point in a space of k dimensions.

This structure allows for very useful kinds of operations with an interesting computational cost. For instance, finding the post office closest to a certain point can be a hard task if the number of post offices is very large. A search for the nearest neighbor in a k-dimensional solves this problem with a computational cost of O (log n) in the average case.

## Usage

```bash
$ npm i red-black-bst
```

```javascript
const KdTree = require('kdtreejs');

// makes a KdTree for two dimensions
const kdTree = new KdTree(2);

bst.put('my key', {mydata: 'is this'})

console.log(bst.get('my key'))
```

## API

#### Insert point

#### Check if point exists

#### Tree size

#### Check if tree is empty

#### Get all points

#### Nearest neibhor

#### Range searchs

###### Query points in a retangle

###### Query points in a radius