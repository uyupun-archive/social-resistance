export default ({ from, redirect }) => {
  if (
    !['recruit', 'join-public', 'join-private', 'gohome'].includes(from.name)
  ) {
    redirect('/')
  }
}
