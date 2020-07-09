declare class JSMath {
    private result;
    private isChain;
    private precision;
    private needCheck;
    /**
     * 重置精度
     * @param precision 精度值
     */
    setPrecision(precision: number): void;
    /**
     * 是否开启检测
     * @param check
     */
    enableCheck(check: boolean): void;
    /**
     * 检测数字是否在安全范围内
     * @param number 被检测的数字
     */
    private check;
    /**
     * 对浮点数精确指定位数
     * @param float 浮点数
     * @param precision 小数位数
     */
    strip(float: number, precision?: number): number;
    /**
     * 计算浮点数小数位数
     * @param float 浮点数
     */
    private digitDecimalLength;
    /**
     * 将小数转化成整数
     * @param float 浮点数
     */
    private floatToInteger;
    /**
     * 设置链式调用
     * @param init 初始值 默认 0
     */
    chain(init?: number): JSMath;
    /**
     * 结束链式调用并返回最终值
     */
    done(): number;
    /**
     * 链式调用统一的处理
     * @param rest 参数数组
     * @param fn 具体方法
     */
    private _handle;
    /**
     * 实现乘的链式调用
     * @param n1 数字1
     * @param n2 数字2
     * @param rest 数字数组
     */
    private _multiply;
    /**
     * 乘
     * @param rest 参数
     */
    multiply(...rest: number[]): number | JSMath;
    /**
     * 实现加的链式调用
     * @param n1 数字1
     * @param n2 数字2
     * @param rest 数字数组
     */
    private _add;
    /**
     * 加
     * @param rest 参数
     */
    add(...rest: number[]): number | JSMath;
    /**
     * 实现减的链式调用
     * @param n1 数字1
     * @param n2 数字2
     * @param rest 数字数组
     */
    private _subtract;
    /**
     * 减
     * @param rest 数字数组
     */
    subtract(...rest: number[]): number | JSMath;
    /**
     * 实现除的链式调用
     * @param n1 数字1
     * @param n2 数字2
     * @param rest 数字数组
     */
    private _devide;
    /**
     * 除
     * @param rest 数字数组
     */
    devide(...rest: number[]): number | JSMath;
    /**
     * 四舍五入
     * @param ratio 四舍五入精度
     * @param float 需要精确的小数
     */
    round(ratio?: number, float?: number): JSMath | void | number;
}
export default JSMath;
