import {
  FIELD_HEIGHT,
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_BAIKINKUN_START_POINT,
} from '~/components/constants/index.js'
import Player from '~/components/player/index.js'

export default class BaikinKun extends Player {
  /**
   * 初回(スポーン時)
   *
   * @param {*} baseWord
   */
  spawn(baseWord) {
    const n = Math.ceil(Math.random() * 2)
    this._image.src = require(`~/assets/images/objects/baikinkun_${n}.gif`)
    const position = {
      x: PLAYER_BAIKINKUN_START_POINT + SOCIAL_DISTANCE_ZONE_RADIUS,
      y: FIELD_HEIGHT / 2,
    }
    const movement = {
      x: baseWord.move.x,
      y: baseWord.move.y,
    }
    this._move(position, movement)
  }
}
