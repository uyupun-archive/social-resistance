export default ({ from, redirect }) => {
  if (from.name !== 'index') {
    redirect('/')
  }
}
