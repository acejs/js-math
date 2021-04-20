function toRawType(target: unknown): string {
  return Object.prototype.toString.call(target).slice(8, -1)
}

function autoGen(fn: Function, ...args) {
  const ctx = this
  return new Promise((resolve, reject) => {
    if (typeof fn === 'function') fn = fn.apply(ctx, args)
    if (toRawType(fn) !== 'Generator') return resolve(fn)

    onFullfilled()
    function onFullfilled(data = undefined) {
      let res
      try {
        res = fn.next(data)
      } catch (error) {
        return reject(error)
      }
      next(res)
    }

    function onRejected(err) {
      let res
      try {
        res = fn.throw(err)
      } catch (error) {
        return reject(error)
      }
      next(res)
    }

    function next(result: unknown) {
      if (result && result.done) return resolve(result.value)
    }
  })
}
