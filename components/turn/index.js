export default class Turn {
  constructor() {
    this._count = 1
    this._timeLimit = 30
    this._timerId = null
  }

  /**
   * ターン数のゲッター
   */
  get count() {
    return this._count
  }

  /**
   * 持ち時間のゲッター
   */
  get timeLimit() {
    return this._timeLimit
  }

  /**
   * ターンの開始 ≒ 持ち時間のカウントダウン
   */
  start() {
    return new Promise((resolve, reject) => {
      if (this._timeLimit > 0) {
        this._timerId = setTimeout(() => {
          this._timeLimit -= 1
          resolve(false)
        }, 1000)
      } else {
        this._next()
        resolve(true)
      }
    }).then((isTimeLimit) => {
      if (!isTimeLimit) return this.start()
    })
  }

  /**
   * 次ターンへ移行
   */
  _next() {
    clearTimeout(this._timerId)
    this._timeLimit = 30
    this._count++
  }
}
