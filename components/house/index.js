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
    this._rotate()
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
   * 画像をローテーションさせる
   */
  _rotate() {
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
        // }
      } else {
        let caches = sessionStorage.getItem('house')
        caches = JSON.parse(caches)
        this._image.src = caches[skinNum]
      }

      if (!isCached && skinNum === 2) isCached = true
      if (skinNum === 2) skinNum = 0
      else ++skinNum

      clearTimeout(timerId)
      timerId = setTimeout(rotateSkinPath, 200)
    }
    rotateSkinPath()
  }

  cacheSkin(url, n) {
    let caches = sessionStorage.getItem('house')
    if (!caches) caches = []
    else caches = JSON.parse(caches)
    if (n === 0) caches = []
    this.onLoadSkin(url).then((img) => {
      const base64 = this.convertImgToBase64(img)
      caches.push(base64)
      caches = JSON.stringify(caches)
      sessionStorage.setItem('house', caches)
    })
  }

  onLoadSkin(url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = url
      img.onload = () => resolve(img)
      img.onerror = (e) => reject(e)
    })
  }

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
