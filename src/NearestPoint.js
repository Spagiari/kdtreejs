class NearestPoint {
    constructor(p, distance) {
      this.pointsInRadius = [];
      this.p = p;
      this.distance = distance;
    }
  
    set(p, distance) {
      if (distance < this.distance) {
        this.p = p;}
        this.distance = distance;
    }
  }
  
  module.exports = NearestPoint;
  