export default ({ from, redirect }) => {
  console.log(from.name)
  if (!['recruit', 'join'].includes(from.name)) {
    redirect('/')
  }
}
