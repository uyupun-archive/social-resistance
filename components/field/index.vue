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
      this.drawCharacter()
    },
    moveCharacter() {
      const x = Math.round(Math.random() * 500)
      const y = Math.round(Math.random() * 500)
      this.drawCharacter(x, y)
    },
    drawCharacter(x = null, y = null) {
      this.character.src = require('~/assets/images/characters/pekora.gif')
      this.character.onload = () => {
        const width = this.character.naturalWidth * 0.15
        const height = this.character.naturalHeight * 0.15
        this.clearUnnecessaryCharacter(width, height)
        this.ctx.drawImage(
          this.character,
          x || 0,
          y || 250 - height / 2,
          width,
          height
        )
        this.x = x || 0
        this.y = y || 250 - height / 2
      }
    },
    clearUnnecessaryCharacter(width, height) {
      if (this.x !== null && this.y !== null) {
        this.ctx.clearRect(this.x, this.y, width, height)
      }
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
