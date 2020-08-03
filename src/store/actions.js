export default {
  deleteView ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('deleteView', view)
      commit('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersViews ({ commit, state }, view) {
    return new Promise(resolve => {
      commit('delOthersViews', view)
      commit('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('delAllVisitedViews', view)
      commit('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  updateVisitedView({ commit }, view) {
    commit('updateVisitedView', view)
  },
  // 登录权限操作
  LoginByUsername({ commit }, userInfo) {
    return new Promise(resolve => {
      commit('SET_TOKEN', userInfo)
      resolve()
    })
  }
}
