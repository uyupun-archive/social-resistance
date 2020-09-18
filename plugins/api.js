import { axios } from './axios'

/**
 * ルールの取得
 */
const fetchRules = () => {
  return axios.$get('rules')
}

/* eslint-disable */

export default ({}, inject) => {
  inject('fetchRules', fetchRules)
}

/* eslint-enable */
