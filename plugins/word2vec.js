import word2vec from '@/assets/json/word2vec.json'
import { WORD_COUNT } from '@/components/constants/index.js'

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
  for (let i = 0; i < WORD_COUNT; i++) {
    const idx = _getRandomIdx()
    const word = word2vec[idx]
    word.index = idx
    word.direction = _getDirection(baseWord, word)
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
 * 単語の選択によって現在の位置から大まかにどの方向へ移動するかのガイド
 * 四象限で表現
 *
 * @param {*} baseWord
 * @param {*} word
 */
const _getDirection = (baseWord, word) => {
  const direction = {
    top_right: false,
    top_left: false,
    bottom_left: false,
    bottom_right: false,
  }
  if (word.move.x > baseWord.move.x) {
    if (word.move.y > baseWord.move.y) direction.bottom_right = true
    direction.top_right = true
  } else {
    if (word.move.y > baseWord.move.y) direction.bottom_left = true
    direction.top_left = true
  }
  return direction
}

/* eslint-disable */

export default ({}, inject) => {
  inject('getFirstWord', getFirstWord)
  inject('getWords', getWords)
}

/* eslint-enable */
