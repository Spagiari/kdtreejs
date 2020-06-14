const Node = require('../Node');

let K = 2;

function setK(k) {
  K = k;
}

function nextD(d) {
  return ++d % K;
}

function put(p, node, d) {
  if (p.d[d] < node.p.d[d]) {
    if (!node.left) node.left = new Node(p);
    else put(p, node.left, nextD(d));
  } else if (!node.right) node.right = new Node(p);
  else put(p, node.right, nextD(d));
}

function contains(p, node, d) {
  if (node == null) return false;
  if (node.p.isEqual(p)) return true;

  if (p.d[d] < node.p.d[d]) return contains(p, node.left, nextD(d));
  return contains(p, node.right, nextD(d));
}

function nodes(node, list) {
  if (node) {
    list.push(node);
    nodes(node.left, list);
    nodes(node.right, list);
  }
}

function range(rectRange, node, rect, d, points) {
  if (!node) return;
  if (rectRange.contains(node.p)) points.push(node.p);
  if (rectRange.intersects(rect.trimLeft(node.p, d)))
    range(rectRange, node.left, rect.trimLeft(node.p, d), nextD(d), points);
  if (rectRange.intersects(rect.trimRight(node.p, d)))
    range(rectRange, node.right, rect.trimRight(node.p, d), nextD(d), points);
}

function nearest(p, nearestPoint, node, rect, d) {
  if (!node || rect.distanceTo(p) > nearestPoint.distance) return;

  nearestPoint.set(node.p, p.distanceTo(node.p));

  if (p.d[d] < node.p.d[d]) {
    nearest(p, nearestPoint, node.left, rect.trimLeft(node.p, d), nextD(d));
    nearest(p, nearestPoint, node.right, rect.trimRight(node.p, d), nextD(d));
  } else {
    nearest(p, nearestPoint, node.right, rect.trimRight(node.p, d), nextD(d));
    nearest(p, nearestPoint, node.left, rect.trimLeft(node.p, d), nextD(d));
  }
}

function pointsInRadius(p, points, node, rect, d) {
  if (!node || rect.distanceTo(p) > points.radius) return;

  points.set(node.p, p.distanceTo(node.p));

  if (p.d[d] < node.p.d[d]) {
    pointsInRadius(p, points, node.left, rect.trimLeft(node.p, d), nextD(d));
    pointsInRadius(p, points, node.right, rect.trimRight(node.p, d), nextD(d));
  } else {
    pointsInRadius(p, points, node.right, rect.trimRight(node.p, d), nextD(d));
    pointsInRadius(p, points, node.left, rect.trimLeft(node.p, d), nextD(d));
  }
}

module.exports = {
  nextD,
  put,
  contains,
  nodes,
  range,
  nearest,
  pointsInRadius,
  setK,
};
