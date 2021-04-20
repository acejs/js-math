type IConstructorArgu = (
  resolve: (value?: any) => void,
  reject: (reason?: any) => void
) => void

type IAnyFn = (...args: any) => any

function nextTick(func: IAnyFn) {
  if (global.setImmediate) {
    global.setImmediate(func)
  } else {
    setTimeout(func)
  }
}

function getThis() {
  return globalThis
}

enum State {
  pending = 0,
  resolving = 1,
  rejecting = 2,
  resolved = 3,
  rejected = 4
}

class _PromiseLike {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  then() {}
}

class _Promise {
  private state: State = 0
  private _reason: unknown = ''
  private _value: undefined | _PromiseLike = void 0
  private _next: _Promise[] = []
  private onFulfilled: IAnyFn | undefined
  private onRejected: IAnyFn | undefined

  constructor(resolver?: IConstructorArgu) {
    if (typeof resolver !== 'function' && resolver !== undefined) {
      throw TypeError()
    }
    try {
      if (typeof resolver === 'function') {
        resolver(this.resolve.bind(this), this.reject.bind(this))
      }
    } catch (error) {
      this.reject(error)
    }
  }
  // 调用该方法时，将 pending 状态转变成 resolving，并保存传入的值
  resolve(value: any) {
    if (this.state === State.pending) {
      this._value = value
      this.state = State.resolving

      nextTick(this._handleNextTick.bind(this))
    }
    return this
  }
  // 调用该方法时，将 pending 状态转变成 rejecting，并保存传入的值
  reject(reason: any) {
    if (this.state === State.pending) {
      this._reason = reason
      this.state = State.rejecting
      this._value = void 0

      nextTick(this._handleNextTick.bind(this))
    }
    return this
  }
  then(onFulfilled: IAnyFn | undefined, onRejected?: IAnyFn | undefined) {
    const promise = new _Promise()
    promise.onFulfilled = onFulfilled
    promise.onRejected = onRejected

    if (this.state === State.resolved) {
      promise.resolve(this._value)
    } else if (this.state === State.rejected) {
      promise.reject(this._reason)
    } else {
      this._next.push(promise)
    }
    return promise
  }
  catch(onRejected: IAnyFn) {
    return this.then(undefined, onRejected)
  }
  _handleNextTick() {
    let ref
    const count = 0

    try {
      ref = this._value && this._value.then
    } catch (error) {
      this.state = State.rejecting
      this._reason = error
      this._value = void 0

      return this._handleNextTick()
    }

    if (
      this.state !== State.rejecting &&
      (typeof this._value === 'object' || typeof this._value === 'function') &&
      typeof ref === 'function'
    ) {
      try {
        ref.call(
          this._value,
          value => {
            if (count++) return

            this._value = value
            this.state = State.resolving
            this._handleNextTick()
          },
          reason => {
            if (count++) return

            this._reason = reason
            this.state = State.rejecting
            this._value = void 0
            this._handleNextTick()
          }
        )
      } catch (error) {
        this.state = State.rejecting
        this._reason = error
        this._value = void 0
        this._handleNextTick()
      }
    } else {
      try {
        if (
          this.state === State.resolving &&
          typeof this.onFulfilled === 'function'
        ) {
          this._value = this.onFulfilled.call(getThis(), this._value)
        } else if (
          this.state === State.rejecting &&
          typeof this.onRejected === 'function'
        ) {
          this._value = this.onRejected.call(getThis(), this._reason)
          this.state = 1
        }
      } catch (e) {
        this.state = State.rejecting
        this._reason = e
        this._value = void 0
        this._finishThisTypeScriptPromise()
      }

      // if promise === x, use TypeError to reject promise
      // 如果promise和x指向同一个对象，那么用TypeError作为原因拒绝promise
      if (this._value === this) {
        this.state = State.rejecting
        this._reason = new TypeError()
        this._value = void 0
      }

      this._finishThisTypeScriptPromise()
    }
  }
  private _finishThisTypeScriptPromise() {
    if (this.state === State.resolving) {
      this.state = State.resolved
      this._next.map(nextTypeScriptPromise => {
        nextTypeScriptPromise.resolve(this._value)
      })
    } else {
      this.state = State.rejected
      this._next.map(nextTypeScriptPromise => {
        nextTypeScriptPromise.reject(this._reason)
      })
    }
  }
  static all() {
    //
  }
  static race() {
    //
  }
  static resolve() {
    //
  }
  static reject() {
    //
  }
  finally() {
    //
  }
}
