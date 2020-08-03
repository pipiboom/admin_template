export default {
  visitedViews: [],
  cachedViews: [],
  token: sessionStorage.getItem('username') ? sessionStorage.getItem('username') : '',
  password: sessionStorage.getItem('password') ? sessionStorage.getItem('password') : ''
}
