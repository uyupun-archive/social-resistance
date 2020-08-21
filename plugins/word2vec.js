import word2vec from '@/assets/json/word2vec.json'

/**
 * 最初の１単語を返す
 */
const getFirstWord = () => {
  const idx = _getRandomIdx()
  const word = word2vec[idx]
  word.index = idx
  return word
}

/**
 * ８単語をランダムに返す
 *
 * @param {*} word
 */
const getWords = (baseWord) => {
  const words = []
  for (let i = 0; i < 8; i++) {
    const idx = _getRandomIdx()
    const word = word2vec[idx]
    word.index = idx
    word.correct_x = _getCorrectX(baseWord, word)
    words.push(word)
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

/**
 * ベースとなる単語のxの値よりも比較対象の単語のxの値が小さい場合、
 * 後退してしまうのでそのための措置
 * TODO: 猟犬サイドの場合は計算が逆転する。修正が必要
 *
 * @param {*} baseWord
 * @param {*} word
 */
const _getCorrectX = (baseWord, word) => {
  if (word.x < baseWord.x) {
    const correctX = baseWord.x + (Math.abs(word.x) - Math.abs(baseWord.x))
    return correctX
  }
  return word.x
}

/* eslint-disable */

export default ({}, inject) => {
  inject('getFirstWord', getFirstWord)
  inject('getWords', getWords)
}

/* eslint-enable */
