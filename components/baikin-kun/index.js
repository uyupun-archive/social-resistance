import { SOCIAL_DISTANCE_ZONE_RADIUS } from '../constants'
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
    this._move(
      PLAYER_BAIKINKUN_START_POINT + SOCIAL_DISTANCE_ZONE_RADIUS,
      FIELD_HEIGHT / 2
    )
  }
}
