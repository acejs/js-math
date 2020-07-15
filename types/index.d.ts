import JSMath from './jsMath';
declare const jsMath: JSMath;
/**
 * 加
 * @param rest 入参
 */
export declare const add: (...rest: number[]) => number;
/**
 * 减
 * @param rest 入参
 */
export declare const subtract: (...rest: number[]) => number;
/**
 * 乘
 * @param rest 入参
 */
export declare const multiply: (...rest: number[]) => number;
/**
 * 除
 * @param rest 入参
 */
export declare const devide: (...rest: number[]) => number;
/**
 * 四舍五入
 * @param ratio 四舍五入精度
 * @param float 需要精确的小数
 */
export declare const round: (ratio: number, float: number) => number;
export default jsMath;
