import jsMath from './jsMath'

console.log(jsMath.multiply(0.1, 0.3))
let a = jsMath
  .chain(0.1)
  .multiply(0.2, 0.3, 0.4, 100)
  .done()
console.log(a)
