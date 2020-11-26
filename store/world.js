export const state = () => ({
  id: '',
  role: 1,
  token: '',
})

export const mutations = {
  update(state, payload) {
    state.id = payload.id
    state.role = payload.role
    state.token = payload.token
  },
}
