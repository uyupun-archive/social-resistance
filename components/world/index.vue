<template>
  <div class="canvas-wrapper">
    <canvas id="field-layer" width="1200" height="500"></canvas>
    <canvas id="player-layer" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'
import HitBox from '~/components/hit-box/index.js'

export default {
  data() {
    return {
      ctx: {
        field: null,
        player: null,
      },
      pekora: null,
      baikinKun: null,
      hitBox: null,
    }
  },
  mounted() {
    this.createCanvas()
    this.drawGrid()
    this.drawGoalLine()
    this.pekora.spawn(0)
    this.baikinKun.spawn(900)
    this.house.draw()
  },
  methods: {
    createCanvas() {
      this.createFieldLayer()
      this.createPlayerLayer()
      this.createHitBox()
    },
    createFieldLayer() {
      const field = document.getElementById('field-layer')
      this.ctx.field = field.getContext('2d')
      this.house = new House(this.ctx.field)
    },
    createPlayerLayer() {
      const player = document.getElementById('player-layer')
      this.ctx.player = player.getContext('2d')
      this.pekora = new Pekora(this.ctx.player)
      this.baikinKun = new BaikinKun(this.ctx.player)
    },
    createHitBox() {
      this.hitBox = new HitBox()
    },
    drawGrid() {
      this.ctx.field.beginPath()
      for (let x = 0; x < 1000; x += 50) {
        this.ctx.field.moveTo(x, 0)
        this.ctx.field.lineTo(x, 500)
      }
      for (let y = 0; y < 1000; y += 50) {
        this.ctx.field.moveTo(0, y)
        this.ctx.field.lineTo(1000, y)
      }
      this.ctx.field.strokeStyle = '#eee'
      this.ctx.field.stroke()
      this.ctx.field.closePath()
    },
    drawGoalLine() {
      this.ctx.field.beginPath()
      this.ctx.field.strokeStyle = '#ccc'
      this.ctx.field.moveTo(1000, 0)
      this.ctx.field.lineTo(1000, 500)
      this.ctx.field.stroke()
      this.ctx.field.closePath()
    },
    movePekora() {
      this.pekora.depart()
      this.drawGrid()
    },
    moveBaikinKun() {
      this.baikinKun.depart()
      this.drawGrid()
    },
    checkIsHit() {
      return this.hitBox.isHit(
        this.pekora.coordinate,
        this.baikinKun.coordinate
      )
    },
  },
}
</script>

<style scoped lang="scss">
.canvas-wrapper {
  position: relative;
  width: 1200px;
  height: 500px;
  background: white;
}

.canvas-wrapper canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
