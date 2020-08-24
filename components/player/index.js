export default class Player {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
    this._width = null
    this._height = null
    this._x = null
    this._y = null
    this.checkIsImplemented()
  }

  /**
   * 必須のメソッドが実装されているかのチェック機構
   * 擬似的な抽象メソッドみたいな
   */
  checkIsImplemented() {
    if (!(this.spawn && this._draw && this._recalcCurrentPosition)) {
      throw new Error('Necessary methods are not implemented.')
    }
  }

  /**
   * 初回(スポーン時)
   */
  spawn() {}

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
   */
  _draw() {}

  /**
   * 現在位置の再計算
   */
  _recalcCurrentPosition() {}
}
