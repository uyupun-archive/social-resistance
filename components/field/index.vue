<template>
  <div class="field-bg">
    <canvas id="field" width="1200" height="500"></canvas>
  </div>
</template>

<script>
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'

export default {
  data() {
    return {
      ctx: null,
      pekora: null,
      baikinKun: null,
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
      const field = document.getElementById('field')
      this.ctx = field.getContext('2d')
      this.pekora = new Pekora(this.ctx)
      this.baikinKun = new BaikinKun(this.ctx)
      this.house = new House(this.ctx)
    },
    drawGrid() {
      this.ctx.beginPath()
      for (let x = 0; x < 1000; x += 50) {
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, 500)
      }
      for (let y = 0; y < 1000; y += 50) {
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(1000, y)
      }
      this.ctx.strokeStyle = '#eee'
      this.ctx.stroke()
      this.ctx.closePath()
    },
    drawGoalLine() {
      this.ctx.beginPath()
      this.ctx.strokeStyle = '#ccc'
      this.ctx.moveTo(1000, 0)
      this.ctx.lineTo(1000, 500)
      this.ctx.stroke()
      this.ctx.closePath()
    },
    movePekora() {
      this.pekora.depart()
      this.drawGrid()
    },
    moveBaikinKun() {
      this.baikinKun.depart()
      this.drawGrid()
    },
  },
}
</script>

<style scoped lang="scss">
.field-bg {
  background: white;
  width: 1200px;
  height: 500px;
}
</style>
