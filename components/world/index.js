import Field from '~/components/field/index.js'
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'
import Judge from '~/components/judge/index.js'
import {
  PLAYER_PEKORA_NAME,
  PLAYER_PEKORA_ALIAS_NAME,
  PLAYER_BAIKINKUN_NAME,
} from '~/components/constants/index.js'

export default {
  data() {
    return {
      ctx: {
        field: null,
        player: null,
      },
      field: null,
      house: null,
      pekora: null,
      baikinKun: null,
      judge: null,
      positions: {
        pekora: {
          x: 0,
          y: 0,
        },
        baikinKun: {
          x: 0,
          y: 0,
        },
      },
    }
  },
  mounted() {
    this.initWorld()
  },
  methods: {
    initWorld() {
      this.createCanvas()
      this.createJudge()
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
      this.field.drawGrid()
      this.field.drawGoalLine()
      this.house.draw()
    },
    createPlayerLayer() {
      const player = document.getElementById('player-layer')
      this.ctx.player = player.getContext('2d')
    },
    createJudge() {
      this.judge = new Judge()
    },
    createPekora(baseWord) {
      this.pekora = new Pekora(this.ctx.player, {
        x: this.positions.pekora.x,
        y: this.positions.pekora.y,
        baseWord,
      })
      this.pekora.spawn()
    },
    createBaikinKun(baseWord) {
      this.baikinKun = new BaikinKun(this.ctx.player, {
        x: this.positions.baikinKun.x,
        y: this.positions.baikinKun.y,
        baseWord,
      })
      this.baikinKun.spawn()
    },
    movePekora(word) {
      this.pekora.depart(word)
    },
    moveBaikinKun(word) {
      this.baikinKun.depart(word)
    },
    judgeWinner() {
      if (this.judge.isHit(this.pekora.position, this.baikinKun.position))
        return PLAYER_BAIKINKUN_NAME
      if (this.judge.isGoal(this.pekora.position.x))
        return PLAYER_PEKORA_ALIAS_NAME
      return null
    },
    refreshWorld() {
      this.pekora.clear()
      this.baikinKun.clear()
      this.initWorld()
    },
    getBaseWord(player) {
      if (player === PLAYER_PEKORA_NAME) return this.pekora?.baseWord
      return this.baikinKun?.baseWord
    },
    setPosition(player, x, y) {
      if (player === PLAYER_PEKORA_NAME) {
        this.positions.pekora.x = x
        this.positions.pekora.y = y
      } else {
        this.positions.baikinKun.x = x
        this.positions.baikinKun.y = y
      }
    },
  },
}
