const getters = {
  getTags: state => state.visitedViews,
  cachedViews: state => state.cachedViews,
  getToken: state => state.token,
  getPassword: state => state.password
}
export default getters
