<template>
  <div class="field-bg">
    <canvas id="field" width="1000" height="500"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      player: {
        image: new Image(),
        width: null,
        height: null,
        x: null,
        y: null,
      },
    }
  },
  mounted() {
    this.createCanvas()
    this.drawGrid()
    this.spawnCharacter()
  },
  methods: {
    createCanvas() {
      const field = document.getElementById('field')
      this.ctx = field.getContext('2d')
    },
    drawGrid() {
      for (let x = 0; x < 1000; x += 10) {
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, 500)
      }
      for (let y = 0; y < 500; y += 10) {
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(1000, y)
      }
      this.ctx.strokeStyle = '#eee'
      this.ctx.stroke()
    },
    spawnCharacter() {
      this.player.image.src = require('~/assets/images/characters/pekora.gif')
      this.moveCharacter()
    },
    departCharacter() {
      const x = Math.round(Math.random() * 500)
      const y = Math.round(Math.random() * 500)
      this.moveCharacter(x, y)
    },
    moveCharacter(x = null, y = null) {
      // 初回(スポーン時)
      this.player.image.onload = () => {
        this.player.width = this.player.image.naturalWidth * 0.15
        this.player.height = this.player.image.naturalHeight * 0.15
        this.clearUnnecessaryCharacter(this.player.width, this.player.height)
        this.drawCharacter(x, y)
        this.recalcCurrentPosition(x, y)
      }
      // ２回目以降(移動時)
      if (x && y) {
        this.clearUnnecessaryCharacter(this.player.width, this.player.height)
        this.drawCharacter(x, y)
        this.recalcCurrentPosition(x, y)
      }
    },
    drawCharacter(x, y) {
      this.ctx.drawImage(
        this.player.image,
        x || 0,
        y || 250 - this.player.height / 2,
        this.player.width,
        this.player.height
      )
    },
    clearUnnecessaryCharacter(width, height) {
      if (this.player.x !== null && this.player.y !== null) {
        this.ctx.clearRect(this.player.x, this.player.y, width, height)
      }
    },
    recalcCurrentPosition(x, y) {
      this.player.x = x || 0
      this.player.y = y || 250 - this.player.height / 2
    },
  },
}
</script>

<style scoped lang="scss">
.field-bg {
  background: white;
  width: 1000px;
  height: 500px;
}
</style>
