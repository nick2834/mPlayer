import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

const libraryUrl = window.mPlayer.libraryUrl
const albumUrl = window.mPlayer.albumUrl

export default {
  getAlbumList: function () {
    return Vue.http.get(libraryUrl)
  },

  getAlbumSongs: function (albumId) {
    return Vue.http.get(`${albumUrl}?=albumId=${albumId}`)
  }
}
