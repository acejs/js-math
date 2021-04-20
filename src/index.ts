import JSMath from './jsMath'
const jsMath = new JSMath()
// import('./sort')

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
 * @param float 需要精确的小数
 * @param ratio 四舍五入精度
 */
export const round = function(float: number, ratio: number): number {
  return jsMath
    .init(float)
    .round(ratio)
    .value()
}

export default jsMath

// function myPow(x: number, n: number): number {
//   if (n === 0) return 1
//   const digit = (String(x).split('.')[1] || '').length
//   let loop = Math.abs(n)
//   let loop2 = digit
//   let floor = 1
//   while (loop2-- > 0) {
//     floor *= 10
//   }
//   x = digit > 0 ? x * floor : x
//   let ans = x
//   const xFloor = floor
//   const mod = 10 ** 9 + 7
//   while (--loop > 0) {
//     ans = (ans * x) % mod
//     floor = (floor * xFloor) % mod
//   }
//   console.log(ans, floor)
//   if (n < 0) ans = 1 / ans
//   if (digit > 0) {
//     if (n < 0) {
//       ans *= floor
//     } else {
//       ans /= floor
//     }
//   }
//   return ans
// }

const rawWindow = window

type PropertyKey = string | number | symbol

type FakeWindow = Window & Record<PropertyKey, any>

function createFakeWindow(global: Window) {
  const propertiesWithGetter = new Map<PropertyKey, boolean>()
  const fakeWindow = {} as FakeWindow

  Object.getOwnPropertyNames(global)
    .filter(p => {
      const descriptor = Object.getOwnPropertyDescriptor(global, p)
      return !descriptor!.configurable // 过滤掉可配置的
    })
    .forEach(p => {
      const descriptor = Object.getOwnPropertyDescriptor(global, p)
      if (descriptor) {
        Object.defineProperty(fakeWindow, p, Object.freeze(descriptor))
      }
    })

  return {
    fakeWindow,
    propertiesWithGetter
  }
}
// const { fakeWindow, propertiesWithGetter } = createFakeWindow(rawWindow)
// console.log(fakeWindow)

class Counter {
  private total: number
  constructor(total: number) {
    this.total = total
  }

  [Symbol.iterator]() {
    let current = 0
    const total = this.total
    return {
      next() {
        return current <= total
          ? { done: false, value: current++ }
          : { done: true, value: undefined }
      },
      return() {
        console.log('return')
        return { done: true, value: undefined }
      },
      throw() {
        console.log('throw')
        return { done: true, value: undefined }
      }
    }
  }
}
// const count = new Counter(10)

// for (const c of count) {
//   if (c === 3) break
//   console.log(c)
// }

// abs(nums[i] - nums[j]) <= t
// abs(i - j) <= k
// function containsNearbyAlmostDuplicate(
//   nums: number[],
//   k: number,
//   t: number
// ): boolean {
//   const n = nums.length
//   const map = new Map<number, number>()

//   for (let i = 0; i < n; i++) {
//     const x = nums[i]
//     const id = getID(x, t + 1)
//     if (
//       map.has(id) ||
//       (map.has(id - 1) && Math.abs(x - map.get(id - 1)!) <= t) ||
//       (map.has(id + 1) && Math.abs(x - map.get(id + 1)!) <= t)
//     ) {
//       return true
//     }
//     map.set(id, x)
//     if (i >= k) map.delete(getID(nums[i - k], t + 1))
//   }

//   return false
// }
// function getID(x: number, w: number): number {
//   return x < 0 ? Math.floor((x + 1) / w) - 1 : Math.floor(x / w)
// }
// // n * k ^ 2
// console.log(containsNearbyAlmostDuplicate([1, 2, 3, 1], 3, 0))
// console.log(containsNearbyAlmostDuplicate([1, 0, 1, 1], 1, 2))
// console.log(containsNearbyAlmostDuplicate([1, 5, 9, 1, 5, 9], 2, 3))

class MaxQueue {
  private queue: number[] = [1, 9, 7, 2, 5, 3]
  private maxQueue: number[] = [9, 7, 5, 3, 2, 1]
  // 获取最大值
  max_value(): number {
    return !this.queue.length ? -1 : this.maxQueue[0]
  }
  // 队尾 添加元素
  push_back(value: number): void {
    this.queue.push(value)
    let lo = 0
    let hi = this.maxQueue.length
    // 找到第一个比插入元素大的值
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (this.queue[mid] < value) {
        hi = mid - 1
      } else {
        lo = mid + 1
      }
    }
    console.log(lo, hi)
    this.maxQueue.splice(lo, 0, value)
  }
  // 队头 删除元素
  pop_front(): number {
    const n = this.queue.length
    if (!n) return -1
    const first = this.queue.shift()!
    let lo = 0
    let hi = n
    while (lo <= hi) {
      const mid = (lo + hi) >> 1
      if (this.maxQueue[mid] > first) {
        lo = mid + 1
      } else {
        hi = mid - 1
      }
    }
    this.maxQueue.splice(lo, 1)
    return first
  }
}

const max = new MaxQueue()
// max.push_back(8)
max.push_back(0)
console.log(max)
// console.log(max.pop_front())
// console.log(max.pop_front())
//
