class PointsInRadios {
  constructor(radius) {
    this.pointsInRadius = [];
    this.radius = radius;
  }

  set(p, distance) {
    if (distance <= this.radius) this.pointsInRadius.push(p);
  }
}

module.exports = PointsInRadios;
