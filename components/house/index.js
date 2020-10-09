import {
  FIELD_HEIGHT,
  PLAYER_MOVABLE_FIELD_WIDTH,
  PLAYER_SIZE_SCALE,
} from '~/components/constants/index.js'

export default class House {
  constructor(ctx) {
    this._ctx = ctx
    this._image = new Image()
  }

  /**
   * 家の描画
   */
  build() {
    this._rotateSkin()
    this._image.onload = () => {
      const x = PLAYER_MOVABLE_FIELD_WIDTH + 50
      const y =
        FIELD_HEIGHT / 2 - (this._image.naturalHeight * PLAYER_SIZE_SCALE) / 2
      const w = this._image.naturalWidth * PLAYER_SIZE_SCALE
      const h = this._image.naturalHeight * PLAYER_SIZE_SCALE
      this._clear(x, y, w, h)
      this._draw(x, y, w, h)
    }
  }

  /**
   * スキンをローテーションさせる
   */
  _rotateSkin() {
    let skinNum = 0
    let timerId = null
    let isCached = false
    const rotateSkinPath = () => {
      if (!isCached) {
        const url = `${process.env.MITSU_URL}/images/objects/house/${
          skinNum + 1
        }.png`
        this.cacheSkin(url, skinNum)
        this._image.src = url
      } else this._image.src = this.getCachedSkin(skinNum)

      if (!isCached && skinNum === 2) isCached = true
      if (skinNum === 2) skinNum = 0
      else ++skinNum

      clearTimeout(timerId)
      timerId = setTimeout(rotateSkinPath, 200)
    }
    rotateSkinPath()
  }

  /**
   * スキンをキャッシュする
   *
   * @param {*} url
   * @param {*} n
   */
  cacheSkin(url, n) {
    let caches = sessionStorage.getItem('house')
    if (!caches || n === 0) caches = []
    else caches = JSON.parse(caches)
    this.onLoadCacheSkin(url).then((img) => {
      const base64 = this.convertImgToBase64(img)
      caches.push(base64)
      caches = JSON.stringify(caches)
      sessionStorage.setItem('house', caches)
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
   */
  getCachedSkin(n) {
    let caches = sessionStorage.getItem('house')
    caches = JSON.parse(caches)
    return caches[n]
  }

  /**
   * 画像のクリア
   *
   * @param {*} x
   * @param {*} y
   * @param {*} w
   * @param {*} h
   */
  _clear(x, y, w, h) {
    this._ctx.globalCompositeOperation = 'destination-out'
    this._ctx.fillStyle = 'fff'
    this._ctx.beginPath()
    this._ctx.rect(x, y, w, h)
    this._ctx.fill()
    this._ctx.closePath()
    this._ctx.globalCompositeOperation = 'source-over'
  }

  /**
   * 画像の描画
   *
   * @param {*} x
   * @param {*} y
   * @param {*} w
   * @param {*} h
   */
  _draw(x, y, w, h) {
    this._ctx.drawImage(this._image, x, y, w, h)
  }
}
