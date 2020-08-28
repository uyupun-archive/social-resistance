import {
  FIELD_HEIGHT,
  PLAYER_BAIKINKUN_START_POINT,
} from '~/components/constants/index.js'
import Player from '~/components/player/index.js'

export default class BaikinKun extends Player {
  /**
   * 初回(スポーン時)
   *
   * @param {*} x
   */
  spawn() {
    const n = Math.ceil(Math.random() * 2)
    this._image.src = require(`~/assets/images/objects/baikinkun_${n}.gif`)
    this._move(PLAYER_BAIKINKUN_START_POINT)
  }

  /**
   * 現在位置の計算
   *
   * @param {*} x
   * @param {*} y
   */
  _calcCurrentPosition(x, y) {
    this._x = x || 900
    this._y = y || FIELD_HEIGHT / 2 - this._height / 2
  }
}
