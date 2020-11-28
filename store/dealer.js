export const state = () => ({
  openModal: null,
})

export const mutations = {
  update(state, payload) {
    state.openModal = payload.openModal
  },
  reset(state) {
    state.openModal = null
  },
}
