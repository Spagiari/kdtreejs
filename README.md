# k-dimensional tree
Implementation of [k-dimensional tree](http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.160.335&rep=rep1&type=pdf) with no dependencies for multi purpose. Common uses are: search in multisemensional spaces (range searches and nearest neighbor searches).

# Introduction
k-dimensional tree in data structure is a type of binary tree in which each leaf of the tree represents a point in a space of k dimensions.

This structure allows for very useful kinds of operations with an interesting computational cost. For instance, finding the post office closest to a certain point can be a hard task if the number of post offices is very large. A search for the nearest neighbor in a k-dimensional solves this problem with a computational cost of O (log n) in the average case.

## Usage

```bash
$ npm i k-dimensional_tree
```

```javascript
const {KdTree, Point, Rect} = require('k-dimensional_tree');

// makes a KdTree for two dimensions
const kdt = new KdTree(2);

kdt.insert(new Point([0.5, 0.3]));
kdt.insert(new Point([0.4, 0.01]));

console.log(kdt.nearest(new Point([0.01, 2])));
console.log(kdt.range(new Rect(new Point([0.01, 0.1]), new Point([0.5, 0.35]))));
console.log(kdt.pointsInRadius(new Point([0.01, 2]), 0.075));

```

## API

#### insert
Create point in tree
```javascript
kdt.insert(new Point([0.5, 0.3]));
```
#### contains 
Check if point p exists in k-dimention tree
```javascript
kdt.contains(new Point([0.5, 0.3]));
```
#### size 
Get numbet of points in k-dimentional tree
```javascript
kdt.contains();
```
#### isEmpty
Check if k-dimention tree is empty
```javascript
kdt.isEmpty();
```
#### nodes
Get all points in k-dimentional tree
```javascript
kdt.nodes();
```
#### nearest
Get nearest neighbor point of p point
```javascript
kdt.nearest(new Point([0.01, 2]));
```
#### Range searchs

###### range
Query points inside rectangle
```javascript
kdt.range(new Rect(new Point([0.01, 0.1], new Point([0.5, 0.35]))));
```
###### pointsInRadius
Query all points inside radius from a p point
```javascript
kdt.pointsInRadius(new Point([0.01, 2]), 0.075)
```