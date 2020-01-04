interface isTrue {
  (x: any): boolean
}

export const isUndefined: isTrue = u => u === void 0

export const isObject: isTrue = o => typeof o === 'object' && o !== null

export const isNaN: isTrue = n => Object.is(n, NaN)

export const isArray: isTrue = a => Array.isArray(a)
