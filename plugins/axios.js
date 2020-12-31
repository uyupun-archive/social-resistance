/* eslint-disable */

export let axios

/* eslint-enable */

export default ({ store, redirect, $axios }) => {
  $axios.defaults.baseURL = '/api/v1/'

  $axios.onRequest((config) => {
    config.headers.common.Accept = 'application/json'
    if (store.state.auth.token)
      config.headers.Authorization = `Bearer ${store.state.auth.token}`
  })

  $axios.onResponse((response) => {
    return Promise.resolve(response)
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      store.commit('auth/reset')
      redirect('/login')
    }
    return Promise.reject(error.response)
  })

  axios = $axios
}
