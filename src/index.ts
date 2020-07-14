import JSMath from './jsMath'
const jsMath = new JSMath()

/**
 * 加
 * @param rest 入参
 */
export const add = function(...rest: number[]): number {
  return jsMath.add(...rest).value()
}

/**
 * 减
 * @param rest 入参
 */
export const subtract = function(...rest: number[]): number {
  return jsMath.subtract(...rest).value()
}

/**
 * 乘
 * @param rest 入参
 */
export const multiply = function(...rest: number[]): number {
  return jsMath.multiply(...rest).value()
}

/**
 * 除
 * @param rest 入参
 */
export const devide = function(...rest: number[]): number {
  return jsMath.devide(...rest).value()
}

/**
 * 四舍五入
 * @param ratio 四舍五入精度
 * @param float 需要精确的小数
 */
export const round = function(ratio: number, float: number): number {
  return jsMath
    .init(float)
    .round(ratio)
    .value()
}

export default jsMath
