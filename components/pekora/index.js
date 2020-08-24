import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   *
   * @param {*} x
   */
  spawn(x = null) {
    this._image.src = require('~/assets/images/characters/pekora.gif')
    this._move(x)
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
