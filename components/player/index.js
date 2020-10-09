import {
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_SIZE_SCALE,
  PLAYER_BAIKINKUN,
} from '~/components/constants/index.js'

export default class Player {
  constructor(ctx, player) {
    this._ctx = ctx
    this._image = new Image()
    this._width = null
    this._height = null
    this._baseWord = null
    this._position = {
      x: player.x,
      y: player.y,
    }
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
   * 単語のセッター
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
    this._rotateAvatar(player)
    this._onLoadAvatar(() => {
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
   * @param {*} positions
   */
  depart(positions) {
    this.clear()
    this._onLoadAvatar(() => {
      this._drawSocialDistance(positions.x, positions.y)
      this._drawPlayer(positions.x, positions.y)
    })
    this._calcPosition(positions.x, positions.y)
    // this._baseWord = word
  }

  /**
   * プレイヤーのアバターをローテーションさせる
   *
   * @param {*} player
   */
  _rotateAvatar(player) {
    let playerPath = 'pekora'
    if (player === PLAYER_BAIKINKUN) playerPath = 'baikinkun'

    const avatarPatterns = ['a', 'b']
    const avatarPatternIdx = Math.floor(Math.random() * 2)
    const avatarPattern = avatarPatterns[avatarPatternIdx]
    let avatarNum = 0
    let timerId = null
    const rotateAvatarPath = () => {
      if (avatarNum === 2) avatarNum = 0
      else ++avatarNum
      this._image.src = `${
        process.env.MITSU_URL
      }/images/objects/${playerPath}/${avatarPattern}/${avatarNum + 1}.png`
      clearTimeout(timerId)
      timerId = setTimeout(rotateAvatarPath, 200)
    }
    rotateAvatarPath()
  }

  /**
   * アバターのロード時に行う処理
   */
  _onLoadAvatar(f) {
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
