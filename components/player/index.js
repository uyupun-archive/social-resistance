import {
  SOCIAL_DISTANCE_ZONE_RADIUS,
  PLAYER_SIZE_SCALE,
  PLAYER_BAIKINKUN,
} from '~/components/constants/index.js'

export default class Player {
  constructor(ctx, position) {
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
    let playerName = 'pekora'
    if (player === PLAYER_BAIKINKUN) playerName = 'baikinkun'

    const skinPatterns = ['a', 'b']
    const skinPatternIdx = Math.floor(Math.random() * 2)
    const skinPattern = skinPatterns[skinPatternIdx]
    let skinNum = 0
    let timerId = null
    let isCached = false
    const rotateSkinPath = () => {
      if (!isCached) {
        const url = (this._image.src = `${
          process.env.MITSU_URL
        }/images/objects/${playerName}/${skinPattern}/${skinNum + 1}.png`)
        this.cacheSkin(url, skinNum, playerName)
        this._image.src = url
      } else this._image.src = this.getCachedSkin(skinNum, playerName)

      if (!isCached && skinNum === 2) isCached = true
      if (skinNum === 2) skinNum = 0
      else ++skinNum

      clearTimeout(timerId)
      timerId = setTimeout(rotateSkinPath, 200)
    }
    rotateSkinPath()
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
   * スキンをキャッシュする
   *
   * @param {*} url
   * @param {*} n
   * @param {*} player
   */
  cacheSkin(url, n, player) {
    let caches = sessionStorage.getItem(player)
    if (!caches || n === 0) caches = []
    else caches = JSON.parse(caches)
    this.onLoadCacheSkin(url).then((img) => {
      const base64 = this.convertImgToBase64(img)
      caches.push(base64)
      caches = JSON.stringify(caches)
      sessionStorage.setItem(player, caches)
    })
  }

  /**
   * キャッシュ用スキンのロード
   * Promiseで返したいのでラップした
   *
   * @param {*} url
   */
  onLoadCacheSkin(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = url
      img.onload = () => resolve(img)
      img.onerror = (e) => reject(e)
    })
  }

  /**
   * スキンを画像からBase64に変換する
   * SessionStorageはテキストデータしか保持できないため
   *
   * @param {*} img
   */
  convertImgToBase64(img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    ctx.drawImage(img, 0, 0)
    const base64 = canvas.toDataURL()
    return base64
  }

  /**
   * キャッシュされたスキンの取得
   *
   * @param {*} n
   * @param {*} player
   */
  getCachedSkin(n, player) {
    let caches = sessionStorage.getItem(player)
    caches = JSON.parse(caches)
    return caches[n]
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
