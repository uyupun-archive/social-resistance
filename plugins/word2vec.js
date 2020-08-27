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
    word.about_direction = _getAboutDirection(baseWord, word)
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
  if (word.move.x < baseWord.move.x) {
    const correctX =
      baseWord.move.x + (Math.abs(word.move.x) - Math.abs(baseWord.move.x))
    return correctX
  }
  return word.move.x
}

/**
 * 単語の選択によって今の場所から大まかに上に移動するか、下に移動するか、ほぼ真っすぐ移動するかを返す
 * TODO: 小数点までピッタリ合うことは無いので、keepの幅にもう少し余裕を持たせる
 *
 * @param {*} baseWord
 * @param {*} word
 */
const _getAboutDirection = (baseWord, word) => {
  if (word.move.y > baseWord.move.y) {
    return 'left'
  }
  if (word.move.y < baseWord.move.y) {
    return 'right'
  }
  return 'straight'
}

/* eslint-disable */

export default ({}, inject) => {
  inject('getFirstWord', getFirstWord)
  inject('getWords', getWords)
}

/* eslint-enable */
