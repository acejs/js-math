import jsMath from '../src/jsMath'

test('jsMath multiply', () => {
  expect(jsMath.multiply(0.1, 0.3)).toBe(0.03)
})

// test('jsMath chain multiply', () => {
//   expect(
//     jsMath
//       .chain(0.1)
//       .multiply(10, 20, 0.054)
//       .done()
//   ).toBe(1.08)
// })

// test('jsMath add', () => {
//   expect(jsMath.add(0.1, 0.3)).toBe(0.4)
// })

// test('jsMath chain add', () => {
//   expect(jsMath.chain(0.1).add(0.3, 0.5)).toBe(0.9)
// })
