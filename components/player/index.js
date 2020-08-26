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
   * 座標のゲッター
   */
  get coordinate() {
    return { x: this._x, y: this._y }
  }

  /**
   * 必須のメソッドが実装されているかのチェック機構
   * 擬似的な抽象メソッドみたいな
   */
  checkIsImplemented() {
    if (!(this.spawn && this._drawPlayer && this._recalcCurrentPosition)) {
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
      this._clear()
      this._drawSocialDistance(x, y)
      this._drawPlayer(x, y)
      this._recalcCurrentPosition(x, y)
    }
    // ２回目以降(移動時)
    if (y) {
      this._clear()
      this._drawSocialDistance(x, y)
      this._drawPlayer(x, y)
      this._recalcCurrentPosition(x, y)
    }
  }

  /**
   * 移動前の画像の削除
   */
  _clear() {
    if (this._x !== null && this._y !== null) {
      this._ctx.globalCompositeOperation = 'destination-out'
      this._drawCircle(this._x, this._y, '#fff', 61)
      this._ctx.globalCompositeOperation = 'source-over'
    }
  }

  /**
   * 移動後の画像の描画
   *
   * @param {*} x
   * @param {*} y
   */
  _drawPlayer(x, y) {
    this._ctx.drawImage(
      this._image,
      x,
      y || 250 - this._height / 2,
      this._width,
      this._height
    )
  }

  /**
   * ソーシャルディスタンスゾーンの描画
   *
   * @param {*} x
   * @param {*} y
   */
  _drawSocialDistance(x, y) {
    this._drawCircle(x, y, '#ef857d')
  }

  /**
   * 円の描画
   *
   * @param {*} x
   * @param {*} y
   * @param {*} color
   * @param {*} radius
   */
  _drawCircle(x, y, color = 'red', radius = 60) {
    this._ctx.fillStyle = color
    this._ctx.beginPath()
    this._ctx.arc(
      x + this._width / 2,
      y ? y + this._height / 2 : 250,
      radius,
      0,
      2 * Math.PI
    )
    this._ctx.fill()
    this._ctx.closePath()
  }

  /**
   * 現在位置の再計算
   */
  _recalcCurrentPosition() {}
}
