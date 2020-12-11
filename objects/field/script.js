import {
  FIELD_HEIGHT,
  FIELD_GRID_INTERVAL,
  PLAYER_MOVABLE_FIELD_WIDTH,
} from '~/objects/constants/script.js'

export default class Field {
  constructor(ctx) {
    this._ctx = ctx
  }

  /**
   * グリッドの描画
   */
  drawGrid() {
    this._ctx.beginPath()
    for (let x = 0; x < PLAYER_MOVABLE_FIELD_WIDTH; x += FIELD_GRID_INTERVAL) {
      this._ctx.moveTo(x, 0)
      this._ctx.lineTo(x, FIELD_HEIGHT)
    }
    for (let y = 0; y < PLAYER_MOVABLE_FIELD_WIDTH; y += FIELD_GRID_INTERVAL) {
      this._ctx.moveTo(0, y)
      this._ctx.lineTo(PLAYER_MOVABLE_FIELD_WIDTH, y)
    }
    this._ctx.strokeStyle = '#eee'
    this._ctx.stroke()
    this._ctx.closePath()
  }

  /**
   * ゴールのラインの描画
   */
  drawGoalLine() {
    this._ctx.beginPath()
    this._ctx.strokeStyle = '#ccc'
    this._ctx.moveTo(PLAYER_MOVABLE_FIELD_WIDTH, 0)
    this._ctx.lineTo(PLAYER_MOVABLE_FIELD_WIDTH, FIELD_HEIGHT)
    this._ctx.stroke()
    this._ctx.closePath()
  }
}
