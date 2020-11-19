export default ({ from, redirect }) => {
  if (!['recruit', 'join-public', 'join-private'].includes(from.name)) {
    redirect('/')
  }
}
