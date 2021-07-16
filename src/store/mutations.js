export default {
  putTags (state, { data }) {
    if (state.visitedViews.some(v => v.path === data.path)) return
    state.visitedViews.push(
      Object.assign({}, data, {
        title: data.meta.title || 'no-name'
      })
    )
    if (state.cachedViews.includes(data.name)) return
    if (!data.meta.noCache) {
      state.cachedViews.push(data.name)
    }
  },
  deleteView (state, data) {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === data.path) {
        state.visitedViews.splice(i, 1)
        break
      }
    }
  },
  delCachedView (state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews.splice(index, 1)
        break
      }
    }
  },
  delOthersViews (state, view) {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  },
  delOthersCachedViews (state, view) {
    for (const i of state.cachedViews) {
      if (i === view.name) {
        const index = state.cachedViews.indexOf(i)
        state.cachedViews = state.cachedViews.slice(index, index + 1)
        break
      }
    }
  },
  delAllVisitedViews (state) {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  delAllCachedViews (state) {
    state.cachedViews = []
  },
  updateVisitedView: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  }
}
