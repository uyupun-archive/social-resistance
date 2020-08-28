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
    this._image.src = require('~/assets/images/objects/house.gif')
    this._image.onload = () => {
      this._ctx.drawImage(
        this._image,
        PLAYER_MOVABLE_FIELD_WIDTH + 50,
        FIELD_HEIGHT / 2 - (this._image.naturalHeight * PLAYER_SIZE_SCALE) / 2,
        this._image.naturalWidth * PLAYER_SIZE_SCALE,
        this._image.naturalHeight * PLAYER_SIZE_SCALE
      )
    }
  }
}
