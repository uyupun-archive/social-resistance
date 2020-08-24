import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    this._image.src = require('~/assets/images/characters/pekora.gif')
    this._move()
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
