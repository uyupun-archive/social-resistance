<template>
  <div class="field-bg">
    <canvas id="field" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'

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
    this.pekora.spawn()
    this.baikinKun.spawn()
  },
  methods: {
    createCanvas() {
      const field = document.getElementById('field')
      this.ctx = field.getContext('2d')
      this.pekora = new Pekora(this.ctx)
      this.baikinKun = new BaikinKun(this.ctx)
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
    movePekora() {
      this.pekora.depart()
    },
    moveBaikinKun() {
      this.baikinKun.depart()
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
