import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import Album from './modules/album'
import Library from './modules/library'
import Player from './modules/player'
import View from './modules/view'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    Album,
    Library,
    Player,
    View
  },
  strict: debug
})
