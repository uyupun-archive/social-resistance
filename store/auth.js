export const state = () => ({
  token: '',
})

export const mutations = {
  update(state, payload) {
    state.token = payload.token
  },
  reset(state) {
    state.token = ''
  },
}
