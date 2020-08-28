import {
  FIELD_HEIGHT,
  PLAYER_PEKORA_START_POINT,
} from '~/components/constants/index.js'
import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   *
   * @param {*} x
   */
  spawn() {
    this._image.src = require('~/assets/images/objects/pekora.gif')
    this._move(PLAYER_PEKORA_START_POINT)
  }

  /**
   * 現在位置の再計算
   *
   * @param {*} x
   * @param {*} y
   */
  _calcCurrentPosition(x, y) {
    this._x = x || 0
    this._y = y || FIELD_HEIGHT / 2 - this._height / 2
  }
}
