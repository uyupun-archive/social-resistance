/* eslint-disable */

export let axios

/* eslint-enable */

export default ({ store, $axios }) => {
  $axios.defaults.baseURL = '/api/v1/'

  $axios.onRequest((config) => {
    config.headers.common.Accept = 'application/json'
  })

  $axios.onResponse((response) => {
    return Promise.resolve(response)
  })

  $axios.onError((error) => {
    return Promise.reject(error.response)
  })

  axios = $axios
}
