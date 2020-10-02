import Player from '~/components/player/index.js'

export default class BaikinKun extends Player {
  /**
   * 初回(スポーン時)
   */
  spawn() {
    const n = Math.ceil(Math.random() * 2)
    this._image.src = `${process.env.MITSU_URL}/images/objects/baikinkun_${n}.gif`
    super.spawn(this._position.x, this._position.y)
  }
}
