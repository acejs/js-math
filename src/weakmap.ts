interface IWeakMap<K extends object, V> {
  delete(key: K): boolean
  get(key: K): V | undefined
  has(key: K): boolean
  set(key: K, value: V): this
}
interface IWeakMapConstructor {
  new <K extends object = object, V = any>(
    entries?: readonly [K, V][] | null
  ): WeakMap<K, V>
  readonly prototype: WeakMap<object, any>
}

// demo

class _WeakMap<K extends object = object, V = any> implements IWeakMap<K, V> {
  private uid: symbol
  constructor(entries?: readonly [K, V][] | null | undefined) {
    this.uid = Symbol('_WeakMap')
    if (entries !== undefined && entries !== null) {
      if (typeof entries[Symbol.iterator] === 'function') {
        try {
          for (const [key, value] of entries) {
            this.set(key, value)
          }
        } catch {
          throw TypeError(`Iterator value a is not an entry object`)
        }
      } else {
        throw TypeError(
          `${entries} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      }
    }
  }
  // legal
  private isLegal(o: unknown): o is object {
    return Object(o) === o
  }
  // done
  public delete(key: K) {
    if (!this.isLegal(key)) return false
    if (!key.hasOwnProperty(this.uid)) return false
    delete key[this.uid]
    return true
  }
  // done
  public get(key: K): undefined | V {
    if (!this.isLegal(key)) return undefined
    if (!key.hasOwnProperty(this.uid)) return undefined
    const entry = key[this.uid]
    return entry[1]
  }
  // done
  public has(key: K) {
    if (!this.isLegal(key)) return false
    if (key.hasOwnProperty(this.uid)) return true
    return false
  }
  public set(key: K, value: V): this {
    if (!this.isLegal(key)) {
      throw TypeError('Invalid value used as weak map key')
    }
    if (this.uid in key) {
      const entry = key[this.uid]
      entry[1] = value
      return this
    }
    Object.defineProperty(key, this.uid, {
      value: [key, value],
      configurable: true,
      writable: true,
      enumerable: false
    })
    return this
  }
}
Object.defineProperty(_WeakMap.prototype, Symbol.toStringTag, {
  value: 'WeakMap'
})

export default _WeakMap
