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
    this.initWorld()
  },
  methods: {
    initWorld() {
      this.createCanvas()
      this.createJudge()
      this.initFieldLayer()
      this.initPlayerLayer()
    },
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
    movePekora(word) {
      this.pekora.depart(word.move.x, word.move.y)
    },
    moveBaikinKun(word) {
      this.baikinKun.depart(word.move.x, word.move.y)
    },
    judgeWinner() {
      if (this.judge.isHit(this.pekora.position, this.baikinKun.position)) {
        return 'ばいきんくん'
      }
      if (this.judge.isGoal(this.pekora.position.x)) {
        return 'うさぎさん'
      }
      return null
    },
    freshWorld() {
      this.pekora.clear()
      this.baikinKun.clear()
      this.initWorld()
    },
  },
}
