const assert = require('assert');

const accum = input => [...input]
  .map((c, i) => c.toUpperCase() + c.toLowerCase().repeat(i))
  .join('-')

assert.equal(accum("abcd"), "A-Bb-Ccc-Dddd");    
assert.equal(accum("RqaEzty"), "R-Qq-Aaa-Eeee-Zzzzz-Tttttt-Yyyyyyy"); 
assert.equal(accum("cwAt"), "C-Ww-Aaa-Tttt");    
