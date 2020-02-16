/* eslint-disable no-console */
export default function({ store, redirect }) {
  console.log('Is authenticated: ' + store.state.auth.loggedIn)
  if (!store.state.auth.loggedIn) {
    return redirect('/login')
  }
}
