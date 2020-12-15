import Skin from '~/objects/skin/script.js'
import {
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_SIZE_SCALE,
  PLAYER_BAIKINKUN,
} from '~/objects/constants/script.js'

export default class Player {
  constructor(ctx, position) {
    this._skin = new Skin()
    this._ctx = ctx
    this._image = new Image()
    this._width = null
    this._height = null
    this._baseWord = null
    this._position = position
    this.checkIsImplemented()
  }

  /**
   * 位置のゲッター
   */
  get position() {
    return this._position
  }

  /**
   * 前回選択した単語のゲッター
   */
  get baseWord() {
    return this._baseWord
  }

  /**
   * 前回選択した単語のセッター
   */
  set baseWord(baseWord) {
    this._baseWord = baseWord
  }

  /**
   * 必須のメソッドが継承先で実装されているかのチェック機構
   * 擬似的な抽象メソッドみたいな感じ
   */
  checkIsImplemented() {
    if (!this.spawn) throw new Error('Necessary methods are not implemented.')
  }

  /**
   * 初回(スポーン時)
   *
   * @param {*} x
   * @param {*} y
   * @param {*} player
   */
  spawn(x, y, player) {
    this._rotateSkin(player)
    this._onLoadSkin(() => {
      this._width = this._image.naturalWidth * PLAYER_SIZE_SCALE
      this._height = this._image.naturalHeight * PLAYER_SIZE_SCALE
      this._drawSocialDistance(x, y)
      this._drawPlayer(x, y)
    })
    this._calcPosition(x, y)
  }

  /**
   * ２回目以降(移動時)
   *
   * @param {*} position
   */
  depart(position) {
    this.clear()
    this._onLoadSkin(() => {
      this._drawSocialDistance(position.x, position.y)
      this._drawPlayer(position.x, position.y)
    })
    this._calcPosition(position.x, position.y)
  }

  /**
   * プレイヤーのスキンをローテーションさせる
   *
   * @param {*} player
   */
  _rotateSkin(player) {
    let key = 'pekora'
    if (player === PLAYER_BAIKINKUN) key = 'baikinkun'
    const skinPatterns = ['a', 'b']
    const skinPatternIdx = Math.floor(Math.random() * 2)
    const skinPattern = skinPatterns[skinPatternIdx]
    this._skin.rotate(this._image, key, skinPattern)
  }

  /**
   * スキンのロード時に行う処理
   */
  _onLoadSkin(f) {
    this._image.onload = () => {
      if (f) f()
    }
  }

  /**
   * 移動前の画像の削除
   */
  clear() {
    this._ctx.globalCompositeOperation = 'destination-out'
    this._drawCircle(
      this._position.x,
      this._position.y,
      '#fff',
      SOCIAL_DISTANCE_ZONE_RADIUS + 1
    )
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
   * 現在位置の計算
   *
   * @param {*} x
   * @param {*} y
   */
  _calcPosition(x, y) {
    this._position.x = x
    this._position.y = y
  }
}
