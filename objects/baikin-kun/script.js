import Player from '~/objects/player/script.js'
import { PLAYER_BAIKINKUN } from '~/objects/constants/script.js'

export default class BaikinKun extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    super.spawn(this._position.x, this._position.y, PLAYER_BAIKINKUN)
  }
}
