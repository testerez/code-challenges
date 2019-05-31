// # Discounts

// ## Description

// The marketing team for a local grocery store wants to boost sales. To do so, they want to start using automatic discounts during checkout. The automatic discounts that they would like to have are:

// - Buy one bags of grapes and get another bag of grapes for free ("Two for the price of one")
// - Buy at least two apples and get a 20% discount on apples

// The products that are currently available in their store are:

// - Bag of grapes priced at $5 per bag
// - Apples priced at $3 per apple
// - Peaches priced at $7 per peach

// Your task: Build a program to calculate the total price at checkout for a customer, taking discounts into consideration.

// ## Behaviour

// The input to your solution should match the following schema: `[ [ <product>, <quantity> ],...]`

// The output of your solution should be a number representing the total price at checkout after discounts.

// Your solution should work for any combination of products listed above, in any quantities equal to or above 0.

// ## Input/Output Expectations

// Here are some example inputs and outputs:

//`
//  [ ['grapes', 1], ['apples', 1], ['peaches', 1]] => 15
//  [ ['grapes', 2], ['apples', 2], ['peaches', 1]] => 16.8
//  [ ['grapes', 3], ['apples', 5], ['peaches', 2]] => 36
// 

import * as assert from 'assert';

const prices = {
  grapes: 5,
  apples: 3,
  peaches: 7,
}

const getProductTotalWithoutDiscount = ([product, n]) =>
  n * prices[product];

const discounts = [
  // - Buy one bags of grapes and get another bag of grapes for free ("Two for the price of one")
  {
    product: 'grapes',
    apply: n => getProductTotalWithoutDiscount(['grapes', Math.ceil(n / 2)]),
  },
  // - Buy at least two apples and get a 20% discount on apples
  {
    product: 'apples',
    apply: n => getProductTotalWithoutDiscount(['apples', n]) * (n > 1 ? 0.8 : 1),
  },
];

const getProductTotalWithDiscount = ([product, n]) => {
  const discount = discounts.find(d => d.product === product);
  return discount
    ? discount.apply(n)
    : getProductTotalWithoutDiscount([product, n]);
}

const getTotalWithDiscounts = (products) => products
  .map(getProductTotalWithDiscount)
  .reduce((price, total) => price + total, 0)

assert.equal(getTotalWithDiscounts([ ['grapes', 1], ['apples', 1], ['peaches', 1]]), 15);
assert.equal(getTotalWithDiscounts([ ['grapes', 2], ['apples', 2], ['peaches', 1]]), 16.8);
assert.equal(getTotalWithDiscounts([ ['grapes', 3], ['apples', 5], ['peaches', 2]]), 36);
assert.equal(getTotalWithDiscounts([ ['grapes', 4], ['apples', 5], ['peaches', 2]]), 36);
