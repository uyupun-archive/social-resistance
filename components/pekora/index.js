import Player from '~/components/player/index.js'
import { PLAYER_PEKORA } from '~/components/constants/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    super.spawn(this._position.x, this._position.y, PLAYER_PEKORA)
  }
}
