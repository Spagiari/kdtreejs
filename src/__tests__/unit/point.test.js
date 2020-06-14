const Point = require('../../Point');

describe('Commom uses', () => {
  it('Create point', () => {
    const p = new Point([0, 0]);
    expect(typeof p).toEqual('object');
    expect(p.D).toBe(2);
  });

  it('Distance to', () => {
    const p = new Point([0, 0]);
    const q = new Point([1, 1]);

    const dist = p.distanceTo(q);
    expect(dist).toBe(Math.sqrt(2));
  });

  it('Distance to II', () => {
    const p = new Point([1, 1]);
    const q = new Point([0, 0]);

    const dist = p.distanceTo(q);
    expect(dist).toBe(Math.sqrt(2));
  });

  it('Distance square to', () => {
    const p = new Point([0, 0]);
    const q = new Point([2, 2]);

    const dist = p.distanceSquaredTo(q);
    expect(dist).toBe(8);
  });
});
