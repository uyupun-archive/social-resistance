export default class Skin {
  constructor() {
    this._isCached = false
    this._timerId = null
    this._n = 0
  }

  rotate(img, key, pattern = '') {
    const rotate = () => {
      if (!this._isCached) {
        const url = `${
          process.env.MITSU_URL
        }/images/objects/${key}/${pattern}/${this._n + 1}.png`
        this._cacheSkin(url, this._n, key)
        img.src = url
      } else {
        img.src = this.getCachedSkin(this._n, key)
      }

      if (!this._isCached && this._n === 2) this._isCached = true
      if (this._n === 2) this._n = 0
      else ++this._n

      clearTimeout(this._timerId)
      this._timerId = setTimeout(rotate, 200)
    }
    rotate()
  }

  /**
   * スキンをキャッシュする
   *
   * @param {*} url
   * @param {*} n
   * @param {*} key
   */
  _cacheSkin(url, n, key) {
    let caches = sessionStorage.getItem(key)
    if (!caches || n === 0) caches = []
    else caches = JSON.parse(caches)
    this.onLoadCacheSkin(url).then((img) => {
      const base64 = this.convertImgToBase64(img)
      caches.push(base64)
      caches = JSON.stringify(caches)
      sessionStorage.setItem(key, caches)
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
}
