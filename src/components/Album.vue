<template>
  <div class="mPlayer-album" :class="{'selected': selected}">
    <div class="mPlayer-album-backgroud" :style="{'background-image': 'url(' + currentAlbum.cover + ')'}"></div>
    <div class="mPlayer-album-main">
      <div class="mPlayer-album-header">
        <div class="mPlayer-album-info">
          <button class="mPlayer-button mPlayer-album-back" @click="dismissAlbumView">
            <i class="mPlayer-icon mPlayer-icon-back"></i>
          </button>
          <span>{{currentAlbum.title}}</span>
        </div>
        <div class="mPlayer-album-playall" @click="playAll()">
          <i class="mPlayer-icon mPlayer-icon-play-all"></i>
          播放全部
          <span>(共{{currentAlbum.count}}首)</span>
        </div>
      </div>
      <div class="mPlayer-album-body">
        <div class="mPlayer-loader" v-if="fetching">
          <div class="mPlayer-loader-spinner">
            <div class="mPlayer-loader-spinner-icon">
            </div>
          </div>
        </div>
        <div class="mPlayer-reload" v-if="fetchError" @click="fetchSongs">获取数据失败，点击重新加载。</div>
        <div class="mPlayer-song" v-for="(song, index) in albumSongs" :class="{'playing': isPlaying(song.id)}" @click="play(currentAlbum.id, song)">
          <span class="mPlayer-song-index">{{index + 1}}</span>
			    <span class="mPlayer-song-status">
            <i class="mPlayer-icon mPlayer-icon-volume-max"></i>
          </span>
          <div class="mPlayer-song-title">{{song.title}}</div>
          <div class="mPlayer-song-author">{{song.author}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  .mPlayer-album {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    display: block;
    overflow: auto;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0;
    background-color: rgba(255,255,255,.9)
  }

  .mPlayer-album-backgroud,
  .mPlayer-album.selected{
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }

  .mPlayer-album-main,
  .mPlayer-album-backgroud{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    display: block;
    overflow: auto;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0;
  }

  .mPlayer-album-main{
    background: rgba(255, 255, 255, 0.95);
    z-index: 901;
  }

  .mPlayer-album-backgroud {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .mPlayer-album-body,
  .mPlayer-album-header {
    position: absolute;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0
  }

  .mPlayer-album-header {
    top: 0;
    height: 100px;
  }

  .mPlayer-album-info {
    height: 55px;
    padding: 0 55px;
    overflow: hidden;
    line-height: 55px;
    font-size: 16px;
    text-align: center;
    position: relative;
  }

  .mPlayer-album-back{
    position: absolute;
    left: 0;
    top: 0;
    width: 45px;
    height: 55px;
  }

  .mPlayer-icon-back {
    background-size: 24px;
  }

  .mPlayer-album-playall {
    padding: 8px 15px;
    border-top: 1px solid rgba(0,0,0,.05);
    border-bottom: 1px solid rgba(0,0,0,.05);
  }

  .mPlayer-album-playall .mPlayer-icon{
    margin-right: 5px;
    width: 20px;
    height: 20px;
  }

  .mPlayer-album-body {
    top: 100px;
    bottom: 0;
    overflow-y: auto;
    padding-bottom: 50px;
    -webkit-overflow-scrolling: touch;
  }

  .mPlayer-song {
    position: relative;
    padding-left: 40px;
    height: 50px;
    border-bottom: 1px solid rgba(0,0,0,.05);
    line-height: 1.4;
  }

  .mPlayer-song-index,
  .mPlayer-song-status {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    color: #999;
    text-align: center;
    font-size: 16px;
    line-height: 50px;
  }

  .mPlayer-song.playing .mPlayer-song-index,
  .mPlayer-song-status {
    display: none
  }

  .mPlayer-song.playing .mPlayer-song-status {
    display: inherit
  }

  .mPlayer-song-status .mPlayer-icon-volume-max {
    margin-left: 10px;
  }

  .mPlayer-song-title {
    padding-top: 5px;
    font-weight: 400;
    font-size: 16px
  }

  .mPlayer-song-author {
    color: #666;
    font-size: 12px
  }

  @-webkit-keyframes scale-fade {
    0% {
      opacity: 0;
      -webkit-transform: scale(.8) rotateX(-40deg);
      transform: scale(.8) rotateX(-40deg)
    }

    50% {
      opacity: 1
    }

    70% {
      -webkit-transform: scale(1.05) rotateX(0);
      transform: scale(1.05) rotateX(0)
    }

    100% {
      -webkit-transform: scale(1) rotateX(0);
      transform: scale(1) rotateX(0)
    }
  }

  @keyframes scale-fade {
    0% {
      opacity: 0;
      -webkit-transform: scale(.8) rotateX(-40deg);
      transform: scale(.8) rotateX(-40deg)
    }

    50% {
      opacity: 1
    }

    70% {
      -webkit-transform: scale(1.05) rotateX(0);
      transform: scale(1.05) rotateX(0)
    }

    100% {
      -webkit-transform: scale(1) rotateX(0);
      transform: scale(1) rotateX(0)
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import Event from '../Event'

  export default {
    props: ['selected'],
    data () {
      return {
        fetching: false,
        fetchError: null
      }
    },
    computed: mapGetters({
      currentAlbum: 'CurrentAlbum',
      albumSongs: 'AlbumSongs',
      songsFetchError: 'SongsFetchError',
      playState: 'PlayState'
    }),
    mounted () {
      this.fetchSongs()
    },
    methods: {
      dismissAlbumView () {
        this.$store.dispatch('dismissView', 'album')
        this.$store.dispatch('setCurrentAlbum', null)
        this.$store.dispatch('setCurrentAlbumSongs', [])
      },

      fetchSongs () {
        this.fetching = true
        this.$store.dispatch('getCurrentAlbumSongs', {
          albumId: this.currentAlbum.id,
          after: () => {
            this.fetching = false
          },
          error: () => {
            this.fetching = false
            this.fetchError = true
          }
        })
      },

      play (albumId, song) {
        this.$store.dispatch('setPlayList', this.albumSongs)
        this.$store.dispatch('setPlayState', {
          albumId: albumId,
          songId: song.id
        })

        Event.$emit('play', song.id)
      },

      isPlaying (songId) {
        return this.playState.songId === songId
      }
    }
  }
</script>
