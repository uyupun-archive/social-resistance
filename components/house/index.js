export default class House {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
  }

  draw() {
    this._image.src = require('~/assets/images/objects/house.gif')
    this._image.onload = () => {
      this._ctx.drawImage(
        this._image,
        1050,
        250 - (this._image.naturalHeight * 0.15) / 2,
        this._image.naturalWidth * 0.15,
        this._image.naturalHeight * 0.15
      )
    }
  }
}
