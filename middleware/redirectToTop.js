export default ({ from, redirect }) => {
  if (!['recruit', 'join'].includes(from.name)) {
    redirect('/')
  }
}
