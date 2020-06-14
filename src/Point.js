/**
 * Point
 * Point 
 * 
 * @module Point
 * @author Eduardo Spagiari
 */

 /**
 * Class representing a point.
 */
class Point {
    constructor(d) {
      this.d = d;
      this.D = d.length;
    }
  
    /**
     * Returns the Euclidean distance between this point and that point.
     * @param that the other point
     * @return the Euclidean distance between this point and that point
     */
    distanceTo(that) {
      return Math.sqrt(this.distanceSquaredTo(that));
    }
  
    /**
     * Returns the square of the Euclidean distance between this point and that point.
     * @param that the other point
     * @return the square of the Euclidean distance between this point and that point
     */
    distanceSquaredTo(that) {
      return this.d
        .map((d, i) => (d - that.d[i]) ** 2)
        .reduce((acc, cur) => acc + cur, 0);
    }
  
    isEqual(that) {
      return this.d.map((d, i) => d === that.d[i]).reduce((acc, cur) => acc && cur, true);
    }
  }
  
  module.exports = Point;
  