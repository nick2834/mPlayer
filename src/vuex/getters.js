export const AlbumViewOpened = state => state.View.albumViewOpened
export const PlayerViewOpened = state => state.View.playerViewOpened
export const PlaylistViewOpened = state => state.View.playlistViewOpened

export const AlbumList = state => state.Library.list

export const CurrentAlbum = state => state.Album.album
export const AlbumSongs = state => state.Album.list
export const SongsFetchError = state => state.Album.error

export const PlayState = state => state.Player.state
export const PlayList = state => state.Player.list
