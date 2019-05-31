const assert = require('assert');

const clone = input => {
  const nodes = new Map();
  
  const recurse = o => {
    const circularNode = nodes.get(o);
    if (circularNode) {
      return circularNode;
    }
    let copy;
    if (o instanceof Map) {
      copy = new Map();
      nodes.set(o, copy);
      for (let [k, v] of o) {
        copy.set(recurse(k), recurse(v));
      }
    } else if (o instanceof Array) {
      copy = [];
      nodes.set(o, copy);
      o.forEach(e => copy.push(recurse(e)));
    } else if (o instanceof Date) {
      copy = new Date(o);
      nodes.set(o, copy);
    } else if (typeof o === 'object') {
      copy = {};
      copy.__proto__ = o.__proto__;
      nodes.set(o, copy);
    } else {
      return o;
    }

    // copy all values for any object type
    Object.keys(o).forEach(k => copy[k] = recurse(o[k]));

    return copy;
  }

  return recurse(input);
}

// Tests ------------------------------------------

{ // class
  class C {
    constructor(foo) {
      this.foo = foo;
    }
    getFoo() {
      return this.foo;
    }
    setFoo(value) {
      this.foo = value;
    }
  }

  const c = new C('foo');

  const copy = clone(c);

  assert.equal(c.getFoo(), 'foo');
  c.setFoo('bar');
  assert.equal(c.getFoo(), 'bar');
  assert.equal(c instanceof C, true);
  
  assert.equal(copy.getFoo(), 'foo');
  copy.setFoo('bar');
  assert.equal(copy.getFoo(), 'bar');
  assert.equal(copy instanceof C, true);
}

{ // Map
  const input = new Map();
  input.set(input, input);
  input.foo = 'foo';
  input.self = input;
  assert.equal(input.get(input), input);
  assert.equal(input.self, input);
  assert.equal(input.foo, 'foo');
  
  const copy = clone(input);
  assert.equal(copy.get(copy), copy);
  assert.equal(copy.self, copy);
  assert.equal(copy.foo, 'foo');
}


{ // Symbol
  const symbol = Symbol();
  const input = new Map();
  input.set(symbol, symbol);
  assert.equal(input.get(symbol), symbol);

  const copy = clone(input);
  assert.equal(copy.get(symbol), symbol);
}

{ // Date
  const d = new Date(123);
  d.foo = 'foo';
  const input = { i: 1, a: { foo: 'f' }, d }
  input.self = input;
  input.arrayOfSelf = [input];
  input.selfArray = input.arrayOfSelf;

  const copy = clone(input);
  input.a.foo = 'f2';

  assert.equal(copy.arrayOfSelf[0].selfArray[0].arrayOfSelf[0].selfArray[0].a.foo, 'f')
  assert.equal(copy.self.d.getTime(), d.getTime())
  assert.equal(copy.self.d.foo, 'foo');
  assert.notEqual(copy.self.d, d)
}

{ // Array
  const array = [];
  array.push(array);
  array.push(array);
  
  const copy = clone(array);
  assert.deepEqual(array, copy);
  assert.notEqual(array[0], copy[0]);
  assert.notEqual(array[1], copy[1]);
}
