export default class Player {
  constructor(ctx) {
    this.ctx = ctx
    this.image = new Image()
    this.width = null
    this.height = null
    this.x = null
    this.y = null
  }

  spawnPlayer() {
    this.image.src = require('~/assets/images/characters/pekora.gif')
    this.movePlayer()
  }

  departPlayer() {
    const x = Math.round(Math.random() * 500)
    const y = Math.round(Math.random() * 500)
    this.movePlayer(x, y)
  }

  movePlayer(x = null, y = null) {
    // 初回(スポーン時)
    this.image.onload = () => {
      this.width = this.image.naturalWidth * 0.15
      this.height = this.image.naturalHeight * 0.15
      this.clearUnnecessaryPlayer(this.width, this.height)
      this.drawPlayer(x, y)
      this.recalcCurrentPosition(x, y)
    }
    // ２回目以降(移動時)
    if (x && y) {
      this.clearUnnecessaryPlayer(this.width, this.height)
      this.drawPlayer(x, y)
      this.recalcCurrentPosition(x, y)
    }
  }

  drawPlayer(x, y) {
    this.ctx.drawImage(
      this.image,
      x || 0,
      y || 250 - this.height / 2,
      this.width,
      this.height
    )
  }

  clearUnnecessaryPlayer(width, height) {
    if (this.x !== null && this.y !== null) {
      this.ctx.clearRect(this.x, this.y, width, height)
    }
  }

  recalcCurrentPosition(x, y) {
    this.x = x || 0
    this.y = y || 250 - this.height / 2
  }
}
