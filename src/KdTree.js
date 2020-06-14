/**
 * k-dimensional tree.
 * Implementation of k-dimensional tree for general propouse.
 * @module kdtree
 * @author Eduardo Spagiari
 */

const Node = require('./Node');
const Rect = require('./Rect');
const Point = require('./Point');
const NearestPoint = require('./NearestPoint');
const PointsInRadius = require('./PointsInRadius');
const {
  put,
  contains,
  nodes,
  range,
  nearest,
  pointsInRadius,
  setK,
} = require('./helper/kdTree');

/**
 * Class representing a k-dimensional tree.
 */
class KdTree {
  /**
   * Create a k-dimensional tree.
   * @param {number} numberOfDimensions - (k) the number of dimensions in stored points
   */
  constructor(numberOfDimensions = 2) {
    this.N = 0;
    this.root = undefined;
    this.K = numberOfDimensions;
    setK(numberOfDimensions);
  }

  check(p) {
    if (!(p instanceof Point) || p.D !== this.K)
      throw new Error(
        `first argument to put() is not Point of ${this.K} dimentions`
      );
  }

  /**
   * Inserts the specified point p into the k dimensional tree.
   *
   * @param {Object<Point>} p - object representing a k-dimendsional point
   * @throws error if point wrong number of dimensions
   */
  put(p) {
    this.check(p);
    if (!this.root) this.root = new Node(p);
    else put(p, this.root, 0);
    this.N++;
  }

  /**
   * Check if point p exists in k-dimention tree.
   *
   * @param {Array.<number>} p - array representing a k-dimendsional point
   * @throws error if point wrong number of dimensions
   * @return {boolean} true if point exists in k-dimendsional tree
   */
  contains(p) {
    // does the set contain point p?
    if (!p) throw new Error('Null point on Contains');
    this.check(p);

    return contains(p, this.root, 0);
  }

  /**
   * Inserts the specified point p into the k dimensional tree.
   *
   * @param {Array.<number>} p - array representing a k-dimendsional point
   * @throws error if point wrong number of dimensions
   */
  insert(p) {
    // add the point to the set (if it is not already in the set)
    if (!p) throw new Error('Null point on insert');
    if (this.contains(p)) return;
    this.put(p);
  }

  /**
   * Get all points in k-dimentional tree.
   *
   * @return {Array.<Points>} all points in k-dimensional tree
   */
  nodes() {
    const list = [];
    nodes(this.root, list);
    return list;
  }

  /**
   * Check if k-dimention tree is empty.
   *
   * @return {boolean} true if k-dimendsional tree is empty
   */
  isEmpty() {
    // is the set empty?
    return this.N === 0;
  }

  /**
   * Get numbet of points in k-dimentional tree.
   *
   * @return {number} number os points inserted in k-dimensional tree
   */
  size() {
    // number of points in the set
    return this.N;
  }

  /**
   * Query points inside rect.
   *
   * @param {Object<Rect>} rect - object representing a rectangle
   * @throws error if not a Rect object
   * @return {Array<Points>} Points inside retangle
   */
  range(rect) {
    // all points that are inside the rectangle
    if (!rect) throw new Error('Null rect on range');

    const points = [];
    range(
      rect,
      this.root,
      new Rect(new Point([0, 0]), new Point([1, 1])),
      0,
      points
    );
    return points;
  }

  /**
   * Get nearest neighbor point of p point.
   *
   * @param {Object<Point>} p - object representing a k-dimendsional point
   * @return {Object<Point>} nearest neighbor point of p point
   */
  nearest(p) {
    // a nearest neighbor in the set to point p; null if the set is empty
    if (!p) throw new Error('Null point on nearst');
    if (this.isEmpty()) return null;

    const q = new NearestPoint(new Point([0, 0]), Number.POSITIVE_INFINITY);

    nearest(p, q, this.root, new Rect(new Point([0, 0]), new Point([1, 1])), 0);

    return q.p;
  }

  /**
   * Query all points inside radius from a p point.
   *
   * @param {Object<Point>} p - object representing a k dimensional point
   * @param {number} radius - radius size in the range 0 to 1
   * @throws error if not a Point object
   * @return {Array<Points>} Points inside radius
   */
  pointsInRadius(p, radius) {
    // a nearest neighbor in the set to point p; null if the set is empty
    if (!p) throw new Error('Null point on nearst');
    if (this.isEmpty()) return [];

    const q = new PointsInRadius(radius);

    pointsInRadius(
      p,
      q,
      this.root,
      new Rect(new Point([0, 0]), new Point([1, 1])),
      0
    );

    return q.pointsInRadius;
  }
}

module.exports = KdTree;
