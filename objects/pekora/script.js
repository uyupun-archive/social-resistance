import Player from '~/objects/player/script.js'
import { PLAYER_PEKORA } from '~/objects/constants/script.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    super.spawn(this._position.x, this._position.y, PLAYER_PEKORA)
  }
}
