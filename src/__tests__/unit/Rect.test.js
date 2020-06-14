const Rect = require('../../algorithms/Rect');
const Point = require('../../algorithms/Point');

describe('Create', () => {
  it('Create Rect success', () => {
    const rect = new Rect(new Point([0, 0]), new Point([1, 1]));
    expect(rect.minPoint.d).toEqual([0, 0]);
    expect(rect.maxPoint.d).toEqual([1, 1]);
  });

  it('Create Rect Error', () => {
    let err = false;
    try {
      err = !!new Rect(new Point([1, 0]), new Point([0, 1]));
    } catch (e) {
      err = true;
    }
    expect(err).toBe(true);
  });
});

describe('min, max and delta', () => {
  const min = [0.12, 0.22];
  const max = [0.62, 0.72];
  const rect = new Rect(new Point(min), new Point(max));
  it('min', () => {
    expect(rect.min(0)).toBe(min[0]);
    expect(rect.min(1)).toBe(min[1]);
    expect(rect.min(2)).toBe(undefined);
  });

  it('max', () => {
    expect(rect.max(0)).toBe(max[0]);
    expect(rect.max(1)).toBe(max[1]);
    expect(rect.max(2)).toBe(undefined);
  });

  it('delta', () => {
    expect(rect.delta(0)).toBe(max[0] - min[0]);
    expect(rect.delta(1)).toBe(max[1] - min[1]);
    expect(rect.delta(2)).toBe(NaN);
  });
});

describe('Intersect', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('No intercect', () => {
    const rectA = new Rect(new Point([0.51, 0.51]), new Point([1, 1]));
    expect(rect.intersects(rectA)).toBe(false);
  });

  it('Intercect one point', () => {
    const rectA = new Rect(new Point([0.5, 0.5]), new Point([1, 1]));
    expect(rect.intersects(rectA)).toBe(true);
  });

  it('Intercect', () => {
    const rectA = new Rect(new Point([0, 0]), new Point([1, 1]));
    expect(rect.intersects(rectA)).toBe(true);
  });
});

describe('distanceSquaredTo', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('distanceSquaredTo I', () => {
    const point = new Point([0, 0]);
    expect(rect.distanceSquaredTo(point)).toBe(0.020000000000000004);
  });

  it('distanceSquaredTo II', () => {
    const point = new Point([1, 1]);
    expect(rect.distanceSquaredTo(point)).toBe(0.5);
  });

  it('distanceSquaredTo III', () => {
    const point = new Point([0.1, 0.1]);
    expect(rect.distanceSquaredTo(point)).toBe(0);
  });
});

describe('distanceTo', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('distanceTo I', () => {
    const point = new Point([0, 0]);
    expect(rect.distanceTo(point)).toBe(Math.sqrt(0.020000000000000004));
  });

  it('distanceTo II', () => {
    const point = new Point([1, 1]);
    expect(rect.distanceTo(point)).toBe(Math.sqrt(0.5));
  });

  it('distanceTo III', () => {
    const point = new Point([0.1, 0.1]);
    expect(rect.distanceTo(point)).toBe(0);
  });
});

describe('contains', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('contains I', () => {
    const point = new Point([0.3, 0.2]);
    expect(rect.contains(point)).toBe(true);
  });

  it('contains II', () => {
    const point = new Point([1, 1]);
    expect(rect.contains(point)).toBe(false);
  });

  it('contains III', () => {
    const point = new Point([0.1, 0.1]);
    expect(rect.contains(point)).toBe(true);
  });
});

describe('equals', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('equals', () => {
    const rectA = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));
    expect(rect.equals(rectA)).toBe(true);
  });

  it('equals ref', () => {
    const rectA = rect;
    expect(rect.equals(rectA)).toBe(true);
  });

  it('Not equal', () => {
    const rectA = new Rect(new Point([0.1, 0.2]), new Point([0.5, 0.5]));
    expect(rect.equals(rectA)).toBe(false);
  });

  it('Not equal undefined', () => {
    expect(rect.equals(undefined)).toBe(false);
  });

  it('Not equal not rect', () => {
    expect(rect.equals(new Point([0, 0]))).toBe(false);
  });
});

describe('toString', () => {
  const rect = new Rect(new Point([0.1, 0.1]), new Point([0.5, 0.5]));

  it('toString I', () => {
    expect(rect.toString()).toBe('[0.1, 0.5] x [0.1, 0.5]');
  });
});

describe('Trim', () => {
  const rect = new Rect(new Point([0, 0]), new Point([1, 1]));

  it('trimLeft', () => {
    const point = new Point([0.5, 0.5]);
    expect(rect.trimLeft(point, 0)).toEqual(new Rect(new Point([0, 0]), new Point([0.5, 1])));
  });

  it('trimRight', () => {
    const point = new Point([0.5, 0.5]);
    expect(rect.trimRight(point, 0)).toEqual(new Rect(new Point([0.5, 0]), new Point([1, 1])));
  });

  it('trimLeft', () => {
    const point = new Point([0.5, 0.5]);
    expect(rect.trimLeft(point, 1)).toEqual(new Rect(new Point([0, 0]), new Point([1, 0.5])));
  });

  it('trimRight', () => {
    const point = new Point([0.5, 0.5]);
    expect(rect.trimRight(point, 1)).toEqual(new Rect(new Point([0, 0.5]), new Point([1, 1])));
  });
});
