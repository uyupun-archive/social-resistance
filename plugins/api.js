import { axios } from './axios'

/**
 * ルールの取得
 */
const fetchRules = () => {
  return axios.$get('rules')
}

/**
 * ワールドIDの取得
 */
const generateWorldId = () => {
  return axios.$get('worldId')
}

/* eslint-disable */

export default ({}, inject) => {
  inject('fetchRules', fetchRules)
  inject('generateWorldId', generateWorldId)
}

/* eslint-enable */
