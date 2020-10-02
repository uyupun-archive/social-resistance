import Player from '~/components/player/index.js'

export default class Pekora extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    this._image.src = `${process.env.MITSU_URL}/images/objects/pekora.gif`
    super.spawn(this._position.x, this._position.y)
  }
}
