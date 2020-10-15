export default class Skin {
  /**
   * スキンをローテーションさせる
   *
   * @param {*} img
   * @param {*} key
   * @param {*} pattern
   */
  rotate(img, key, pattern = '') {
    let isCached = false
    let timerId = null
    let n = 0

    const rotate = () => {
      if (!isCached) {
        const url = this._makeUrl(key, pattern, n)
        this._cacheSkin(key, n, url)
        img.src = url
      } else img.src = this._getCachedSkin(key, n)

      if (!isCached && n === 2) isCached = true
      if (n === 2) n = 0
      else ++n

      clearTimeout(timerId)
      timerId = setTimeout(rotate, 200)
    }
    rotate()
  }

  /**
   * スキンの画像URLの生成
   *
   * @param {*} key
   * @param {*} pattern
   * @param {*} n
   */
  _makeUrl(key, pattern = '', n) {
    if (pattern !== '') pattern = `${pattern}/`
    const url = `${process.env.MITSU_URL}/images/objects/${key}/${pattern}${
      n + 1
    }.png`
    return url
  }

  /**
   * スキンをキャッシュする
   *
   * @param {*} key
   * @param {*} n
   * @param {*} url
   */
  _cacheSkin(key, n, url) {
    let caches = sessionStorage.getItem(key)
    if (!caches || n === 0) caches = []
    else caches = JSON.parse(caches)
    this._onLoadCacheSkin(url).then((img) => {
      const base64 = this._convertImgToBase64(img)
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
  _onLoadCacheSkin(url) {
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
  _convertImgToBase64(img) {
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
   * @param {*} key
   * @param {*} n
   */
  _getCachedSkin(key, n) {
    let caches = sessionStorage.getItem(key)
    caches = JSON.parse(caches)
    return caches[n]
  }
}
