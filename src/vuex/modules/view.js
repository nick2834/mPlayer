import * as types from '../mutation-types'

const state = {
  albumViewOpened: false,
  playerViewOpened: false,
  playlistViewOpened: false
}

const mutations = {
  [types.SET_VIEW_OPENED] (state, data) {
    data.viewName += 'ViewOpened'
    state[data.viewName] = data.status
  }
}

export default {
  state,
  mutations
}
