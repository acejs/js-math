class JSMath {
  private result = NaN
  private isChain = false
  private precision = 12
  private needCheck = false

  /**
   * 重置精度
   * @param precision 精度值
   */
  setPrecision(precision: number): void {
    this.precision = precision
  }

  /**
   * 是否开启检测
   * @param check
   */
  enableCheck(check: boolean): void {
    this.needCheck = check
  }

  /**
   * 检测数字是否在安全范围内
   * @param number 被检测的数字
   */
  private check(number: number): void {
    if (this.needCheck) {
      if (
        number < Number.MIN_SAFE_INTEGER ||
        number > Number.MAX_SAFE_INTEGER
      ) {
        console.warn(
          `${number} is beyond boundary when transfer to integer, the results may not be accurate`
        )
      }
    }
  }

  /**
   * 对浮点数精确指定位数
   * @param float 浮点数
   * @param precision 小数位数
   */
  strip(float: number, precision: number = this.precision): number {
    return Number.parseFloat(float.toPrecision(precision))
  }

  /**
   * 计算浮点数小数位数
   * @param float 浮点数
   */
  private digitDecimalLength(float: number): number {
    const eSplit: string[] = String(float).split(/[eE]/) // 兼容科学计数法
    const len: number =
      (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)
    return len > 0 ? len : 0
  }

  /**
   * 将小数转化成整数
   * @param float 浮点数
   */
  private floatToInteger(float: number): number {
    if (!String(float).includes('e')) {
      return Number(String(float).replace('.', ''))
    }
    const len: number = this.digitDecimalLength(float)

    return len > 0 ? this.strip(float * 10 ** len) : float
  }

  /**
   * 设置链式调用
   * @param init 初始值 默认 0
   */
  chain(init = 0): JSMath {
    this.result = init
    this.isChain = true
    return this
  }

  /**
   * 结束链式调用并返回最终值
   */
  done(): number {
    const result = this.result
    this.result = NaN
    this.isChain = false
    return result
  }

  /**
   * 链式调用统一的处理
   * @param rest 参数数组
   * @param fn 具体方法
   */
  private _handle(rest: number[], fn: Function): number | JSMath {
    if (this.isChain) rest.unshift(this.result)

    const res = fn.call(this, rest[0], rest[1], ...rest.slice(2))

    if (this.isChain) {
      this.result = res
      return this
    } else {
      return res
    }
  }

  /**
   * 实现乘的链式调用
   * @param n1 数字1
   * @param n2 数字2
   * @param rest 数字数组
   */
  private _multiply(n1: number, n2: number, ...rest: number[]): number {
    if (rest.length > 0) {
      return this._multiply(this._multiply(n1, n2), rest[0], ...rest.slice(1))
    }

    // 获取小数的总位数
    const total = this.digitDecimalLength(n1) + this.digitDecimalLength(n2)
    // 转成整数后相乘的结果
    const value = this.floatToInteger(n1) * this.floatToInteger(n2)

    this.check(value)

    return value / 10 ** total
  }

  /**
   * 乘
   * @param rest 参数
   */
  multiply(...rest: number[]): number | JSMath {
    return this._handle(rest, this._multiply)
  }

  /**
   * 实现加的链式调用
   * @param n1 数字1
   * @param n2 数字2
   * @param rest 数字数组
   */
  private _add(n1: number, n2: number, ...rest: number[]): number {
    if (rest.length > 0) {
      return this._add(this._add(n1, n2), rest[0], ...rest.slice(1))
    }

    // 获取较大位数的小数个数
    const max: number =
      10 ** Math.max(this.digitDecimalLength(n1), this.digitDecimalLength(n2))

    return (this._multiply(n1, max) + this._multiply(n2, max)) / max
  }

  /**
   * 加
   * @param rest 参数
   */
  add(...rest: number[]): number | JSMath {
    return this._handle(rest, this._add)
  }

  /**
   * 实现减的链式调用
   * @param n1 数字1
   * @param n2 数字2
   * @param rest 数字数组
   */
  private _subtract(n1: number, n2: number, ...rest: number[]): number {
    if (rest.length > 0) {
      return this._subtract(this._subtract(n1, n2), rest[0], ...rest.slice(1))
    }

    // 获取较大位数的小数个数
    const max: number =
      10 ** Math.max(this.digitDecimalLength(n1), this.digitDecimalLength(n2))

    return (this._multiply(n1, max) - this._multiply(n2, max)) / max
  }

  /**
   * 减
   * @param rest 数字数组
   */
  subtract(...rest: number[]): number | JSMath {
    return this._handle(rest, this._subtract)
  }

  /**
   * 实现除的链式调用
   * @param n1 数字1
   * @param n2 数字2
   * @param rest 数字数组
   */
  private _devide(n1: number, n2: number, ...rest: number[]): number {
    if (rest.length > 0) {
      return this._devide(this._devide(n1, n2), rest[0], ...rest.slice(1))
    }

    // 转换成整数后计算除
    const intDevide: number = this.floatToInteger(n1) / this.floatToInteger(n2)

    // 小数的个数差
    const digitDecimal =
      10 ** (this.digitDecimalLength(n2) - this.digitDecimalLength(n1))

    return this._multiply(intDevide, digitDecimal)
  }

  /**
   * 除
   * @param rest 数字数组
   */
  devide(...rest: number[]): number | JSMath {
    return this._handle(rest, this._devide)
  }

  /**
   * 四舍五入
   * @param ratio 四舍五入精度
   * @param float 需要精确的小数
   */
  round(ratio = 2, float?: number): JSMath | void | number {
    const base: number = 10 ** ratio

    if (this.isChain) {
      const int = this.multiply(base) as JSMath
      this.result = Math.round(int.result)
      return this.devide(base)
    } else {
      if (typeof float === 'number') {
        return this.devide(Math.round(this._multiply(base, float)), base)
      } else {
        console.warn('round function should has two arguments but got one')
      }
    }
  }
}

export default JSMath
