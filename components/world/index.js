import Field from '~/components/field/index.js'
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'
import { PLAYER_PEKORA_NAME } from '~/components/constants/index.js'

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
      this.pekora.depart(this.positions.pekora.x, this.positions.pekora.y, word)
    },
    moveBaikinKun(word) {
      this.baikinKun.depart(
        this.positions.baikinKun.x,
        this.positions.baikinKun.y,
        word
      )
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
    setBaseWord(player, baseWord) {
      if (player === PLAYER_PEKORA_NAME) {
        this.pekora.baseWord = baseWord
      } else {
        this.baikinKun.baseWord = baseWord
      }
    },
  },
}
