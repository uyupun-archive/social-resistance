import word2vec from '@/assets/json/word2vec.json'

/**
 * 最初の１単語を返す
 */
const getFirstWord = () => {
  const idx = _getRandomIdx()
  return word2vec[idx]
}

/**
 * ８単語をランダムに返す
 *
 * @param {*} word
 */
const getWords = (word) => {
  const words = []
  for (let i = 0; i < 8; i++) {
    const idx = _getRandomIdx()
    words.push(word2vec[idx])
  }
  return words
}

/**
 * 0〜JSONファイルの配列長の間でランダムな値を返す
 */
const _getRandomIdx = () => {
  const len = word2vec.length
  return Math.floor(Math.random() * len)
}

/* eslint-disable */

export default ({}, inject) => {
  inject('getFirstWord', getFirstWord)
  inject('getWords', getWords)
}

/* eslint-enable */
