import {
  FIELD_HEIGHT,
  PLAYER_MOVABLE_FIELD_WIDTH,
  PLAYER_SIZE_SCALE,
} from '~/components/constants/index.js'

export default class House {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
  }

  /**
   * 家の描画
   */
  draw() {
    this._rotate()
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
   * 画像をローテーションさせる
   */
  _rotate() {
    let avatarNum = 0
    let timerId = null
    const rotateAvatarPath = () => {
      if (avatarNum === 2) avatarNum = 0
      else ++avatarNum
      this._image.src = `${process.env.MITSU_URL}/images/objects/house/${
        avatarNum + 1
      }.png`
      clearTimeout(timerId)
      timerId = setTimeout(rotateAvatarPath, 200)
    }
    rotateAvatarPath()
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
