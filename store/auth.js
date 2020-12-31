export const state = () => ({
  userId: '',
  token: '',
})

export const mutations = {
  update(state, payload) {
    state.userId = payload.userId
    state.token = payload.token
  },
  reset(state) {
    state.userId = ''
    state.token = ''
  },
}
