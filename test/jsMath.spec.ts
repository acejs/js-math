import jsMath, { multiply, add, devide, subtract, round } from '../src'

// multiply
test('multiply', () => {
  expect(multiply(0.1, 0.2)).toBe(0.02)
})

test('single multiply', () => {
  expect(multiply(0.1)).toBe(0.1)
})

test('jsMath chain multiply', () => {
  expect(jsMath.multiply(10, 20, 0.054, 0.1, 0.2).value()).toBe(0.216)
})

// add
test('add', () => {
  expect(add(0.1, 0.2)).toBe(0.3)
})

test('jsMath chain add', () => {
  expect(jsMath.add(0.2, 0.3, 10, 0.1, 0.2).value()).toBe(10.8)
})

// devide
test('devide', () => {
  expect(devide(0.3, 0.1)).toBe(3)
})

test('jsMath chain devide', () => {
  expect(jsMath.devide(0.1, 0.2, 0.2).value()).toBe(2.5)
})

// subtract
test('subtract', () => {
  expect(subtract(0.3, 0.1)).toBe(0.2)
})

test('jsMath chain subtract', () => {
  expect(jsMath.subtract(0.1, 0.3).value()).toBe(-0.2)
})

// single round
test('single round', () => {
  expect(round(2, 1.231412424)).toBe(1.23)
})

// mixin
test('jsMath mixin', () => {
  expect(
    jsMath
      .multiply(0.2, 10, 100)
      .add(1, 2, 3, 5, 10, 1000)
      .subtract(0.1, 0.3, 0.4)
      .devide(2, 5, 5, 20)
      .round(2)
      .value()
  ).toBe(1.22)
})

test('jsMath single mixin', () => {
  expect(
    jsMath
      .multiply(10)
      .add(2)
      .devide(2)
      .value()
  ).toBe(6)
})
