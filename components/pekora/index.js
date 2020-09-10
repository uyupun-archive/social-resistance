import {
  FIELD_HEIGHT,
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_PEKORA_START_POINT,
} from '~/components/constants/index.js'
import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   *
   * @param {*} baseWord
   */
  spawn(baseWord) {
    this._image.src = require('~/assets/images/objects/pekora.gif')
    const position = {
      x: PLAYER_PEKORA_START_POINT + SOCIAL_DISTANCE_ZONE_RADIUS,
      y: FIELD_HEIGHT / 2,
    }
    const movement = {
      x: baseWord.move.x,
      y: baseWord.move.y,
    }
    this._move(position, movement)
  }
}
