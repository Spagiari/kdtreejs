const Point = require('./Point');

class Rect {
  constructor(minPoint, maxPoint) {
    if (
      !minPoint.d
        .map((d, i) => d < maxPoint.d[i])
        .reduce((acc, cur) => acc && cur, true)
    )
      throw new Error('Invalid rectangle');

    this.minPoint = minPoint;
    this.maxPoint = maxPoint;
  }

  min(d) {
    return this.minPoint.d[d];
  }

  max(d) {
    return this.maxPoint.d[d];
  }

  delta(d) {
    return this.max(d) - this.min(d);
  }

  intersects(that) {
    return this.maxPoint.d
      .map((max, d) => max >= that.min(d) && that.max(d) >= this.min(d))
      .reduce((acc, cur) => acc && cur, true);
  }

  distanceSquaredTo(p) {
    return p.d
      .map((value, d) => {
        if (value < this.min(d)) return value - this.min(d);
        if (value > this.max(d)) return value - this.max(d);
        return 0;
      })
      .reduce((acc, cur) => acc + cur ** 2, 0);
  }

  distanceTo(p) {
    return Math.sqrt(this.distanceSquaredTo(p));
  }

  contains(p) {
    return p.d
      .map((value, d) => value >= this.min(d) && value <= this.max(d))
      .reduce((acc, cur) => acc && cur, true);
  }

  equals(that) {
    if (this === that) return true;
    if (!that) return false;
    if (!(that instanceof Rect)) return false;
    return that.maxPoint.d
      .map(
        (_value, d) =>
          that.min(d) === this.min(d) && that.max(d) === this.max(d)
      )
      .reduce((acc, cur) => acc && cur, true);
  }

  toString() {
    return this.minPoint.d
      .map((_value, d) => `[${this.min(d)}, ${this.max(d)}]`)
      .join(' x ');
  }

  trimLeft(p, d) {
    const minPoint = this.minPoint.d.slice(0);
    const maxPoint = this.maxPoint.d.slice(0);
    maxPoint[d] = p.d[d];

    return new Rect(new Point(minPoint), new Point(maxPoint));
  }

  trimRight(p, d) {
    const minPoint = this.minPoint.d.slice(0);
    const maxPoint = this.maxPoint.d.slice(0);
    minPoint[d] = p.d[d];

    return new Rect(new Point(minPoint), new Point(maxPoint));
  }
}

module.exports = Rect;
