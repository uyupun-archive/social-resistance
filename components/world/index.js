import Field from '~/components/field/index.js'
import Pekora from '~/components/pekora/index.js'
import BaikinKun from '~/components/baikin-kun/index.js'
import House from '~/components/house/index.js'
import { PLAYER_PEKORA } from '~/components/constants/index.js'

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
      this.house.build()
    },
    createPlayerLayer() {
      const player = document.getElementById('player-layer')
      this.ctx.player = player.getContext('2d')
    },
    spawnPekora(position) {
      this.pekora = new Pekora(this.ctx.player, position)
      this.pekora.spawn()
    },
    spawnBaikinKun(position) {
      this.baikinKun = new BaikinKun(this.ctx.player, position)
      this.baikinKun.spawn()
    },
    movePekora(position) {
      this.pekora.depart(position)
    },
    moveBaikinKun(position) {
      this.baikinKun.depart(position)
    },
    setBaseWord(player, baseWord) {
      if (player === PLAYER_PEKORA) this.pekora.baseWord = baseWord
      else this.baikinKun.baseWord = baseWord
    },
    getBaseWord(player) {
      if (player === PLAYER_PEKORA) return this.pekora?.baseWord
      return this.baikinKun?.baseWord
    },
    isSpawned() {
      if (this.pekora && this.baikinKun) return true
      return false
    },
  },
}
