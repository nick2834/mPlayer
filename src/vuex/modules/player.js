import * as types from '../mutation-types'

const state = {
  state: {
    albumId: null,
    songId: null,
    playing: false,
    current: -1
  },
  list: []
}

const mutations = {
  [types.SET_PLAY_STATE] (state, data) {
    for (let key in data) {
      if (key in state.state) {
        state.state[key] = data[key]
      }
    }
  },
  [types.SET_PLAY_LIST] (state, data) {
    state.list = data
  }
}

export default {
  state,
  mutations
}
