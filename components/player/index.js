export default class Player {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
    this._width = null
    this._height = null
    this._x = null
    this._y = null
  }

  /**
   * 初回(スポーン時)
   */
  spawn() {
    this._image.src = require('~/assets/images/characters/pekora.gif')
    this._move()
  }

  /**
   * ２回目以降(移動時)
   */
  depart() {
    const x = Math.round(Math.random() * 500)
    const y = Math.round(Math.random() * 500)
    this._move(x, y)
  }

  /**
   * 移動前の画像の削除、移動後の画像の描画、現在位置の再計算の呼び出し
   *
   * @param {*} x
   * @param {*} y
   */
  _move(x = null, y = null) {
    // 初回(スポーン時)
    this._image.onload = () => {
      this._width = this._image.naturalWidth * 0.15
      this._height = this._image.naturalHeight * 0.15
      this._clear(this._width, this._height)
      this._draw(x, y)
      this._recalcCurrentPosition(x, y)
    }
    // ２回目以降(移動時)
    if (x && y) {
      this._clear(this._width, this._height)
      this._draw(x, y)
      this._recalcCurrentPosition(x, y)
    }
  }

  /**
   * 移動前の画像の削除
   *
   * @param {*} width
   * @param {*} height
   */
  _clear(width, height) {
    if (this._x !== null && this._y !== null) {
      this._ctx.clearRect(this._x, this._y, width, height)
    }
  }

  /**
   * 移動後の画像の描画
   *
   * @param {*} x
   * @param {*} y
   */
  _draw(x, y) {
    this._ctx.drawImage(
      this._image,
      x || 0,
      y || 250 - this._height / 2,
      this._width,
      this._height
    )
  }

  /**
   * 現在位置の再計算
   *
   * @param {*} x
   * @param {*} y
   */
  _recalcCurrentPosition(x, y) {
    this._x = x || 0
    this._y = y || 250 - this._height / 2
  }
}
