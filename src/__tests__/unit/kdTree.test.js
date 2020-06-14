const Rect = require('../../Rect');
const Point = require('../../Point');
const KdTree = require('../../KdTree');

describe('Create', () => {
  it('Create', () => {
    const tree = new KdTree();
    expect(tree instanceof KdTree).toBe(true);
  });
});

describe('Contains', () => {
  it('Contains null', () => {
    const tree = new KdTree();
    let err;
    try {
      tree.contains(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
    expect(tree.isEmpty()).toBe(true);
  });
});

describe('Insert', () => {
  it('Insert Randon point', () => {
    const tree = new KdTree();
    const p = [Math.random(), Math.random()];
    tree.insert(new Point(p));
    expect(tree.contains(new Point(p))).toBe(true);
  });

  it('Insert null', () => {
    const tree = new KdTree();
    let err;
    try {
      tree.insert(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
    expect(tree.isEmpty()).toBe(true);
  });

  it('Insert doubled point', () => {
    const tree = new KdTree();
    const p = [Math.random(), Math.random()];
    tree.insert(new Point(p));
    tree.insert(new Point(p));
    expect(tree.contains(new Point(p))).toBe(true);
  });

  it('Insert two point', () => {
    const tree = new KdTree();
    const p = [Math.random(), Math.random()];
    const q = [Math.random(), Math.random()];
    tree.insert(new Point(p));
    tree.insert(new Point(q));
    expect(tree.contains(new Point(p))).toBe(true);
    expect(tree.contains(new Point(q))).toBe(true);
    expect(tree.size()).toBe(2);
    expect(tree.nodes().length).toBe(2);
  });

  it('Insert hundred point', () => {
    const tree = new KdTree();

    for (let i = 0; i < 100; ++i) {
      const p = [Math.random(), Math.random()];
      tree.insert(new Point(p));
    }

    expect(tree.size()).toBe(100);
    expect(tree.nodes().length).toBe(100);
  });
});

describe('Range', () => {
  const tree = new KdTree();
  tree.insert(new Point([0.1, 0.1]));
  tree.insert(new Point([0.25, 0.25]));
  tree.insert(new Point([0.5, 0.5]));
  tree.insert(new Point([0.75, 0.75]));
  tree.insert(new Point([0.99, 0.99]));

  it('Query all points', () => {
    const nodes = tree.range(new Rect(new Point([0, 0]), new Point([1, 1])));

    expect(nodes.length).toBe(5);
  });

  it('Query three points', () => {
    const nodes = tree.range(
      new Rect(new Point([0.5, 0.5]), new Point([1, 1]))
    );

    expect(nodes.length).toBe(3);
  });

  it('Query one points', () => {
    const nodes = tree.range(
      new Rect(new Point([0.24, 0.24]), new Point([0.26, 0.26]))
    );

    expect(nodes.length).toBe(1);
    expect(nodes[0]).toEqual(new Point([0.25, 0.25]));
  });

  it('Query none points', () => {
    const nodes = tree.range(
      new Rect(new Point([0.2, 0.2]), new Point([0.24, 0.24]))
    );

    expect(nodes.length).toBe(0);
  });

  it('Query null', () => {
    let err;

    try {
      tree.range(null);
    } catch (e) {
      err = !!e;
    }

    expect(err).toBe(true);
  });
});

describe('Nearest', () => {
  const tree = new KdTree();
  tree.insert(new Point([0.1, 0.1]));
  tree.insert(new Point([0.25, 0.25]));
  tree.insert(new Point([0.5, 0.5]));
  tree.insert(new Point([0.75, 0.75]));
  tree.insert(new Point([0.99, 0.99]));

  it('Nearest I', () => {
    expect(tree.nearest(new Point([0.11, 0.1]))).toEqual(new Point([0.1, 0.1]));
  });

  it('Nearest null', () => {
    let err;
    try {
      tree.nearest(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('Nearest empty', () => {
    const treeA = new KdTree();
    expect(treeA.nearest(new Point([0.11, 0.1]))).toBe(null);
  });
});

describe('PointsInRadius', () => {
  const tree = new KdTree();
  tree.insert(new Point([0.1, 0.1]));
  tree.insert(new Point([0.25, 0.25]));
  tree.insert(new Point([0.5, 0.5]));
  tree.insert(new Point([0.75, 0.75]));
  tree.insert(new Point([0.99, 0.99]));

  it('PointsInRadius I', () => {
    expect(tree.pointsInRadius(new Point([0.11, 0.1]), 0.02)[0]).toEqual(new Point([0.1, 0.1]));
  });

  it('PointsInRadius II', () => {
    expect(tree.pointsInRadius(new Point([0.11, 0.1]), 0.206).length).toEqual(2);
  });

  it('PointsInRadius III', () => {
    expect(tree.pointsInRadius(new Point([0.11, 0.1]), 0.008)).toEqual([]);
  });

  it('PointsInRadius null', () => {
    let err;
    try {
      tree.pointsInRadius(null);
    } catch (e) {
      err = !!e;
    }
    expect(err).toBe(true);
  });

  it('PointsInRadius empty', () => {
    const treeA = new KdTree();
    expect(treeA.pointsInRadius(new Point([0.11, 0.1]))).toEqual([]);
  });
});
