export default ({ app, from, store }) => {
  app.router.beforeEach((to, from, next) => {
    if (store.state.dealer.openModal) {
      store.state.dealer.openModal()
      next(false)
    } else {
      next()
    }
  })
}
