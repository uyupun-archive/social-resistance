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
      x: null,
      y: null,
      width: null,
      height: null,
      character: new Image(),
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
      this.character.src = require('~/assets/images/characters/pekora.gif')
      this.moveCharacter()
    },
    departCharacter() {
      const x = Math.round(Math.random() * 500)
      const y = Math.round(Math.random() * 500)
      this.moveCharacter(x, y)
    },
    moveCharacter(x = null, y = null) {
      // 初回(スポーン時)
      this.character.onload = () => {
        this.width = this.character.naturalWidth * 0.15
        this.height = this.character.naturalHeight * 0.15
        this.clearUnnecessaryCharacter(this.width, this.height)
        this.drawCharacter(x, y)
        this.recalcCurrentPosition(x, y)
      }
      // ２回目以降(移動時)
      if (x && y) {
        this.clearUnnecessaryCharacter(this.width, this.height)
        this.drawCharacter(x, y)
        this.recalcCurrentPosition(x, y)
      }
    },
    drawCharacter(x, y) {
      this.ctx.drawImage(
        this.character,
        x || 0,
        y || 250 - this.height / 2,
        this.width,
        this.height
      )
    },
    clearUnnecessaryCharacter(width, height) {
      if (this.x !== null && this.y !== null) {
        this.ctx.clearRect(this.x, this.y, width, height)
      }
    },
    recalcCurrentPosition(x, y) {
      this.x = x || 0
      this.y = y || 250 - this.height / 2
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
