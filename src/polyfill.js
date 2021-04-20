// Object.create
Object._create = (o, property) => {
  function F() {}
  F.prototype = o
  return new F()
}

// new
function _new(fn, ...args) {
  const o = Object.create(null) // 或者 {} 因为后面会覆盖原型链
  const res = fn.apply(o, args)
  Reflect.setPrototypeOf(o, fn.prototype)
  return typeof res === 'object' && res !== null ? res : o
}

// call apply

// bind

// instanceof
function _instanceof(left, right) {
  if (typeof left !== 'object' || left === null) return false
  if (typeof right !== 'object' || right === null) {
    throw Error('Right-hand side of _instanceof is not an object')
  }
  let proto = Reflect.getPrototypeOf(left)
  while (proto) {
    if (proto === right.prototype) return true
    proto = Reflect.getPrototypeOf(proto)
  }
  return false
}

// debounce

// throttle

// _reduce/_forEach/_map
Array.prototype._reduce = function(callback, init) {
  let start = 0
  if (init === undefined) {
    start = 1
    init = this[0]
  }
  const n = this.length
  for (let i = start; i < n; i++) {
    init = callback(init, this[i], i, this)
  }
  return init
}

Array.prototype._forEach = function() {
  const callback = Array.prototype.slice.call(arguments)[0]
  const n = this.length
  for (let i = 0; i < n; i++) {
    callback(this[i], i, this)
  }
}

Array.prototype._map = function(callback) {
  const n = this.length
  const ans = []
  for (let i = 0; i < n; i++) {
    ans.push(callback(this[i], i, this))
  }
  return ans
}

Array.prototype._some = function() {
  const callback = Array.prototype.slice.call(arguments)[0]
  const n = this.length
  for (let i = 0; i < n; i++) {
    if (callback(this[i], i, this)) return true
  }
  return false
}

Array.prototype._every = function() {
  const callback = Array.prototype.slice.call(arguments)[0]
  const n = this.length
  for (let i = 0; i < n; i++) {
    if (!callback(this[i], i, this)) return false
  }
  return true
}

Array.prototype._splice = function() {
  // this
  const [start, deleteCount, ...items] = Array.prototype.slice.call(arguments)
  const insert = Array.isArray(items) ? items.length : 0

  const result = []
}

// promise

// eventEmitter
