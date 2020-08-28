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
import Judge from '~/components/judge/index.js'
import {
  FIELD_HEIGHT,
  FIELD_GRID_INTERVAL,
  PLAYER_MOVABLE_FIELD_WIDTH,
} from '~/components/constants/index.js'

export default {
  data() {
    return {
      ctx: {
        field: null,
        player: null,
      },
      pekora: null,
      baikinKun: null,
      judge: null,
    }
  },
  mounted() {
    this.createCanvas()
    this.createJudge()
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
    createJudge() {
      this.judge = new Judge()
    },
    drawGrid() {
      this.ctx.field.beginPath()
      for (
        let x = 0;
        x < PLAYER_MOVABLE_FIELD_WIDTH;
        x += FIELD_GRID_INTERVAL
      ) {
        this.ctx.field.moveTo(x, 0)
        this.ctx.field.lineTo(x, FIELD_HEIGHT)
      }
      for (
        let y = 0;
        y < PLAYER_MOVABLE_FIELD_WIDTH;
        y += FIELD_GRID_INTERVAL
      ) {
        this.ctx.field.moveTo(0, y)
        this.ctx.field.lineTo(PLAYER_MOVABLE_FIELD_WIDTH, y)
      }
      this.ctx.field.strokeStyle = '#eee'
      this.ctx.field.stroke()
      this.ctx.field.closePath()
    },
    drawGoalLine() {
      this.ctx.field.beginPath()
      this.ctx.field.strokeStyle = '#ccc'
      this.ctx.field.moveTo(PLAYER_MOVABLE_FIELD_WIDTH, 0)
      this.ctx.field.lineTo(PLAYER_MOVABLE_FIELD_WIDTH, FIELD_HEIGHT)
      this.ctx.field.stroke()
      this.ctx.field.closePath()
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
