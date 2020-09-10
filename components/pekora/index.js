import {
  FIELD_HEIGHT,
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_PEKORA_START_POINT,
} from '~/components/constants/index.js'
import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    this._image.src = require('~/assets/images/objects/pekora.gif')
    super.spawn(
      PLAYER_PEKORA_START_POINT + SOCIAL_DISTANCE_ZONE_RADIUS,
      FIELD_HEIGHT / 2
    )
  }
}
