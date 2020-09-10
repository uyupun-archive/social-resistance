export default class Turn {
  constructor() {
    this._count = 1
    this._timeLimit = 30
    this._timerId = null
    this._active = {
      pekora: true,
      baikinKun: false,
    }
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
   * どちらのプレイヤーのターンかを返すゲッター
   */
  get active() {
    return this._active
  }

  /**
   * ターンの進行
   */
  proceed() {
    if (this._timerId) this._prepare()
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._countdown().then(() => {
          resolve()
        })
      }, 2500)
    })
  }

  /**
   * 持ち時間のカウントダウン
   */
  _countdown() {
    return new Promise((resolve, reject) => {
      if (this._timeLimit > 0) {
        this._timerId = setTimeout(() => {
          this._timeLimit -= 1
          resolve(false)
        }, 1000)
      } else {
        resolve(true)
      }
    }).then((isTimeLimit) => {
      if (!isTimeLimit) return this._countdown()
    })
  }

  /**
   * 次ターンへの準備
   */
  _prepare() {
    clearTimeout(this._timerId)
    this._timeLimit = 30
    this._count++
    this._active.pekora = !this._active.pekora
    this._active.baikinKun = !this.active.baikinKun
  }
}
