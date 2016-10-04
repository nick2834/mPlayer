import * as types from './mutation-types'
import api from '../services/api'

export const showView = ({ commit }, viewName) => {
  commit(types.SET_VIEW_OPENED, {
    viewName,
    status: true
  })
}

export const dismissView = ({ commit }, viewName) => {
  commit(types.SET_VIEW_OPENED, {
    viewName,
    status: false
  })
}

export const getAlbumList = ({ commit }) => {
  api.getAlbumList().then(response => {
    if (response.ok) {
      commit(types.SET_ALBUM_LIST, response.data)
    } else {
      commit(types.GET_ALBUM_LIST_ERROR, '获取数据失败，点击重新加载。')
    }
  }, response => {
    commit(types.GET_ALBUM_LIST_ERROR, '获取数据失败，点击重新加载。')
  })
}

export const setCurrentAlbum = ({ commit }, data) => {
  commit(types.SET_CURRENT_ALBUM, data)
}

export const getCurrentAlbumSongs = ({ commit }, data) => {
  api.getAlbumSongs(data.albumId).then(response => {
    if (response.ok) {
      data.after()
      commit(types.SET_CURRENT_ALBUM_SONGS, response.data)
    } else {
      data.error()
    }
  }, response => {
    data.error()
  })
}

export const setCurrentAlbumSongs = ({ commit }, data) => {
  commit(types.SET_CURRENT_ALBUM_SONGS, data)
}

export const setPlayState = ({ commit }, data) => {
  commit(types.SET_PLAY_STATE, data)
}

export const setPlayList = ({ commit }, data) => {
  commit(types.SET_PLAY_LIST, data)
}
