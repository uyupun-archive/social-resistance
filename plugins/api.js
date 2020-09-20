import { axios } from './axios'

/**
 * ルールの取得
 */
const fetchRules = () => {
  return axios.$get('rules')
}

/**
 * ワールドIDの取得
 *
 * @param {*} params
 */
const generateWorldId = (params) => {
  return axios.$get('worldId', {
    params,
  })
}

/**
 * ワールドIDの正当性を確認
 *
 * @param {*} params
 */
const checkWorldId = (params) => {
  return axios.$get('worldId/check', {
    params,
  })
}

/* eslint-disable */

export default ({}, inject) => {
  inject('fetchRules', fetchRules)
  inject('generateWorldId', generateWorldId)
  inject('checkWorldId', checkWorldId)
}

/* eslint-enable */
