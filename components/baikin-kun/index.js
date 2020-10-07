import Player from '~/components/player/index.js'
import { PLAYER_BAIKINKUN } from '~/components/constants/index.js'

export default class BaikinKun extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    super.spawn(this._position.x, this._position.y, PLAYER_BAIKINKUN)
  }
}
