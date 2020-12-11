import Skin from '~/objects/skin/script.js'
import {
  FIELD_HEIGHT,
  PLAYER_MOVABLE_FIELD_WIDTH,
  PLAYER_SIZE_SCALE,
} from '~/objects/constants/script.js'

export default class House {
  constructor(ctx) {
    this._skin = new Skin()
    this._ctx = ctx
    this._image = new Image()
  }

  /**
   * 家の描画
   */
  build() {
    this._skin.rotate(this._image, 'house')
    this._image.onload = () => {
      const x = PLAYER_MOVABLE_FIELD_WIDTH + 50
      const y =
        FIELD_HEIGHT / 2 - (this._image.naturalHeight * PLAYER_SIZE_SCALE) / 2
      const w = this._image.naturalWidth * PLAYER_SIZE_SCALE
      const h = this._image.naturalHeight * PLAYER_SIZE_SCALE
      this._clear(x, y, w, h)
      this._draw(x, y, w, h)
    }
  }

  /**
   * 画像のクリア
   *
   * @param {*} x
   * @param {*} y
   * @param {*} w
   * @param {*} h
   */
  _clear(x, y, w, h) {
    this._ctx.globalCompositeOperation = 'destination-out'
    this._ctx.fillStyle = 'fff'
    this._ctx.beginPath()
    this._ctx.rect(x, y, w, h)
    this._ctx.fill()
    this._ctx.closePath()
    this._ctx.globalCompositeOperation = 'source-over'
  }

  /**
   * 画像の描画
   *
   * @param {*} x
   * @param {*} y
   * @param {*} w
   * @param {*} h
   */
  _draw(x, y, w, h) {
    this._ctx.drawImage(this._image, x, y, w, h)
  }
}
