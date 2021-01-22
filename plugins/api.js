import { axios } from './axios'

/**
 * 登録
 *
 * @param {*} data
 */
const register = (data) => {
  return axios.$post('register', data)
}

/**
 * ログイン
 *
 * @param {*} data
 */
const login = (data) => {
  return axios.$post('login', data)
}

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

/**
 * ランクの取得
 */
const fetchRanks = () => {
  return axios.$get('ranks')
}

/**
 * ランキングの取得
 */
const fetchRanking = () => {
  return axios.$get('ranking')
}

/**
 * アバターの取得
 */
const fetchAvatar = () => {
  return axios.$get('avatar')
}

/**
 * プロフィールの取得
 *
 * @param {*} data
 */
const fetchProfile = (data) => {
  return axios.$get('profile', data)
}

/**
 * プロフィールの変更
 *
 * @param {*} data
 */
const updateProfile = (data) => {
  return axios.$patch('profile', data)
}

/**
 * スキンの取得
 *
 * @param {*} params
 */
const fetchSkins = (params) => {
  return axios.$get('skins', {
    params,
  })
}

/**
 * スキンの変更
 *
 * @param {*} data
 */
const updateSkins = (data) => {
  return axios.$patch('skins', data)
}

/* eslint-disable */

export default ({}, inject) => {
  inject('register', register)
  inject('login', login)
  inject('fetchRules', fetchRules)
  inject('recruit', recruit)
  inject('join', join)
  inject('search', search)
  inject('fetchRanks', fetchRanks)
  inject('fetchRanking', fetchRanking)
  inject('fetchAvatar', fetchAvatar)
  inject('fetchProfile', fetchProfile)
  inject('updateProfile', updateProfile)
  inject('fetchSkins', fetchSkins)
  inject('updateSkins', updateSkins)
}

/* eslint-enable */
