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
const generateWorldId = (params) => {
  return axios.$get('worldId', {
    params,
  })
}

/* eslint-disable */

export default ({}, inject) => {
  inject('fetchRules', fetchRules)
  inject('generateWorldId', generateWorldId)
}

/* eslint-enable */
