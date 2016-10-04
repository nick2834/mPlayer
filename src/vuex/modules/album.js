import * as types from '../mutation-types'

const state = {
  album: null,
  list: []
}

const mutations = {
  [types.SET_CURRENT_ALBUM] (state, data) {
    state.album = data
  },
  [types.SET_CURRENT_ALBUM_SONGS] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
