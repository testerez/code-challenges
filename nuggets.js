// Mc Chicken sells nuggets in packs of 6, 9 and 20.
// Given a number of nuggets N, return the largest number
// of packs that Mc Chicken can sell to complete the order.
// If Mc Chicken can’t sell exactly N nuggets with those packs
// then return undefined.

const f = (n) => {
  if (n >= 0 && n % 6 === 0) return n / 6;
  for (var p of [9, 20]) {
    const r = n >= p && f(n - p) + 1;
    if (r) return r;
  }
}

// compact
// const f = n => n >= 0 && n % 6 === 0
//   ? n / 6
//   : [9, 20].map(p => n >= p && f(n - p) + 1).find(r => r);

const assert = require('assert');
assert.equal(f(26), 2);
assert.equal(f(9), 1);
assert.equal(f(0), 0);
assert.equal(f(6), 1);
assert.equal(f(27), 4);
assert.equal(f(5), undefined);
assert.equal(f(28), undefined);
assert.equal(f(-1), undefined);
