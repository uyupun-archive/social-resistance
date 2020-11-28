export default function ({ route, redirect, store }) {
  if (store.state.auth.token) {
    if (['login', 'register'].includes(route.name)) redirect('/')
  } else if (!['index', 'login', 'register', 'custom'].includes(route.name)) {
    redirect('/login')
  }
}
