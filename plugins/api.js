import { axios } from './axios'

/**
 * ルールの取得
 */
const fetchRules = () => {
  return axios.$get('rules')
}

/**
 * 募集
 *
 * @param {*} params
 */
const recruit = (params) => {
  return axios.$get('recruit', {
    params,
  })
}

/**
 * 参加
 *
 * @param {*} params
 */
const join = (params) => {
  return axios.$get('join', {
    params,
  })
}

/**
 * 検索
 *
 * @param {*} params
 */
const search = (params) => {
  return axios.$get('search', {
    params,
  })
}

/* eslint-disable */

export default ({}, inject) => {
  inject('fetchRules', fetchRules)
  inject('recruit', recruit)
  inject('join', join)
  inject('search', search)
}

/* eslint-enable */
