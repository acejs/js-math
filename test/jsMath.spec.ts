import jsMath from '../src'

// multiply
test('jsMath multiply', () => {
  expect(jsMath.multiply(0.1, 0.2)).toBe(0.02)
})

test('jsMath chain multiply', () => {
  expect(
    jsMath
      .chain(0.1)
      .multiply(10, 20, 0.054)
      .done()
  ).toBe(1.08)
})

// add
test('jsMath add', () => {
  expect(jsMath.add(0.1, 0.2)).toBe(0.3)
})

test('jsMath chain add', () => {
  expect(
    jsMath
      .chain(0.1)
      .add(0.2, 0.3, 10)
      .done()
  ).toBe(10.6)
})

// devide
test('jsMath devide', () => {
  expect(jsMath.devide(0.3, 0.1)).toBe(3)
})

test('jsMath chain devide', () => {
  expect(
    jsMath
      .chain(0.3)
      .devide(0.1, 0.2, 0.2)
      .done()
  ).toBe(75)
})

// subtract
test('jsMath subtract', () => {
  expect(jsMath.subtract(0.3, 0.1)).toBe(0.2)
})

test('jsMath chain subtract', () => {
  expect(
    jsMath
      .chain(0.1)
      .subtract(0.2, 0.3)
      .done()
  ).toBe(-0.4)
})

// single round
test('jsMath single round', () => {
  expect(jsMath.round(2, 1.231412424)).toBe(1.23)
})

// mixin
test('jsMath mixin', () => {
  expect(
    jsMath
      .chain(0.1)
      .multiply(0.2, 10, 100)
      .add(1, 2, 3, 5, 10, 1000)
      .subtract(0.1, 0.3, 0.4)
      .devide(2, 5, 5, 20)
      .round(2)
      .done()
  ).toBe(1.04)
})
