<template>
  <div class="canvas-wrapper">
    <canvas id="field-layer" width="1200" height="500"></canvas>
    <canvas id="player-layer" width="1000" height="500"></canvas>
  </div>
</template>

<script>
import Field from '~/components/field/index.js'
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'
import Judge from '~/components/judge/index.js'

export default {
  data() {
    return {
      ctx: {
        field: null,
        player: null,
      },
      field: null,
      pekora: null,
      baikinKun: null,
      judge: null,
    }
  },
  mounted() {
    this.createCanvas()
    this.createJudge()
    this.initFieldLayer()
    this.initPlayerLayer()
  },
  methods: {
    createCanvas() {
      this.createFieldLayer()
      this.createPlayerLayer()
    },
    createFieldLayer() {
      const field = document.getElementById('field-layer')
      this.ctx.field = field.getContext('2d')
      this.field = new Field(this.ctx.field)
      this.house = new House(this.ctx.field)
    },
    createPlayerLayer() {
      const player = document.getElementById('player-layer')
      this.ctx.player = player.getContext('2d')
      this.pekora = new Pekora(this.ctx.player)
      this.baikinKun = new BaikinKun(this.ctx.player)
    },
    initFieldLayer() {
      this.field.drawGrid()
      this.field.drawGoalLine()
      this.house.draw()
    },
    initPlayerLayer() {
      this.pekora.spawn()
      this.baikinKun.spawn()
    },
    createJudge() {
      this.judge = new Judge()
    },
    movePekora(baseWord, word) {
      this.pekora.depart(word.move.x, word.move.y)
    },
    moveBaikinKun(baseWord, word) {
      this.baikinKun.depart(word.move.x, word.move.y)
    },
    isHit() {
      return this.judge.isHit(this.pekora.coordinate, this.baikinKun.coordinate)
    },
    isGoal() {
      return this.judge.isGoal(this.pekora.coordinate.y)
    },
  },
}
</script>

<style scoped lang="scss">
.canvas-wrapper {
  position: relative;
  width: 1200px;
  height: 500px;
  background: $white;
}

.canvas-wrapper canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
