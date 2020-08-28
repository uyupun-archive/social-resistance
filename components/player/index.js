import {
  FIELD_HEIGHT,
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_SIZE_SCALE,
  PLAYER_MOVE_SCALE,
  PLAYER_MOVABLE_FIELD_WIDTH,
} from '~/components/constants/index.js'

export default class Player {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
    this._width = null
    this._height = null
    this._x = null
    this._y = null
    this._spawned = false
    this.checkIsImplemented()
  }

  /**
   * 座標のゲッター
   */
  get coordinate() {
    return { x: this._x, y: this._y }
  }

  /**
   * 必須のメソッドが実装されているかのチェック機構
   * 擬似的な抽象メソッドみたいな
   */
  checkIsImplemented() {
    if (!(this.spawn && this._drawPlayer && this._calcCurrentCoordinate)) {
      throw new Error('Necessary methods are not implemented.')
    }
  }

  /**
   * 初回(スポーン時)
   */
  spawn() {}

  /**
   * ２回目以降(移動時)
   */
  depart(x, y) {
    this._move(x, y)
  }

  /**
   * 移動前の画像の削除、移動後の画像の描画、現在位置の計算の呼び出し
   *
   * @param {*} x
   * @param {*} y
   */
  _move(x, y) {
    // 初回(スポーン時)
    this._image.onload = () => {
      this._width = this._image.naturalWidth * PLAYER_SIZE_SCALE
      this._height = this._image.naturalHeight * PLAYER_SIZE_SCALE
      this._spawned = true
      this._drawSocialDistance(x, y)
      this._drawPlayer(x, y)
      this._calcCurrentCoordinate(x, y)
    }
    // ２回目以降(移動時)
    if (this._spawned) {
      const newX = this._correctCoordinateX(this._x + x * PLAYER_MOVE_SCALE)
      const newY = this._correctCoordinateY(this._y + y * PLAYER_MOVE_SCALE)
      this._clear()
      this._drawSocialDistance(newX, newY)
      this._drawPlayer(newX, newY)
      this._calcCurrentCoordinate(newX, newY)
    }
  }

  /**
   * プレイヤーがワールドからはみ出していたらはみ出さないように補正する(x座標)
   *
   * @param {*} x
   */
  _correctCoordinateX(x) {
    // xのマイナス方向の限界値を超えていないか
    if (x < SOCIAL_DISTANCE_ZONE_RADIUS) x = SOCIAL_DISTANCE_ZONE_RADIUS
    // xのプラス方向の限界値を超えていないか
    else if (x > PLAYER_MOVABLE_FIELD_WIDTH - SOCIAL_DISTANCE_ZONE_RADIUS)
      x = PLAYER_MOVABLE_FIELD_WIDTH - SOCIAL_DISTANCE_ZONE_RADIUS
    return x
  }

  /**
   * プレイヤーがワールドからはみ出していたらはみ出さないように補正する(y座標)
   *
   * @param {*} y
   */
  _correctCoordinateY(y) {
    // yのマイナス方向の限界値を超えていないか
    if (y < SOCIAL_DISTANCE_ZONE_RADIUS) y = SOCIAL_DISTANCE_ZONE_RADIUS
    // yのプラス方向の限界値を超えていないか
    else if (y > FIELD_HEIGHT - SOCIAL_DISTANCE_ZONE_RADIUS)
      y = FIELD_HEIGHT - SOCIAL_DISTANCE_ZONE_RADIUS
    return y
  }

  /**
   * 移動前の画像の削除
   */
  _clear() {
    this._ctx.globalCompositeOperation = 'destination-out'
    this._drawCircle(this._x, this._y, '#fff', SOCIAL_DISTANCE_ZONE_RADIUS + 1)
    this._ctx.globalCompositeOperation = 'source-over'
  }

  /**
   * 移動後の画像の描画
   *
   * @param {*} x
   * @param {*} y
   */
  _drawPlayer(x, y) {
    this._ctx.drawImage(
      this._image,
      x - this._width / 2,
      y - this._height / 2,
      this._width,
      this._height
    )
  }

  /**
   * ソーシャルディスタンスゾーンの描画
   *
   * @param {*} x
   * @param {*} y
   */
  _drawSocialDistance(x, y) {
    this._drawCircle(x, y, '#ef857d')
  }

  /**
   * 円の描画
   *
   * @param {*} x
   * @param {*} y
   * @param {*} color
   * @param {*} radius
   */
  _drawCircle(x, y, color = 'red', radius = 60) {
    this._ctx.fillStyle = color
    this._ctx.beginPath()
    this._ctx.arc(x, y, radius, 0, 2 * Math.PI)
    this._ctx.fill()
    this._ctx.closePath()
  }

  /**
   * 現在位置の再計算
   *
   * @param {*} x
   * @param {*} y
   */
  _calcCurrentCoordinate(x, y) {
    this._x = x
    this._y = y
  }
}
