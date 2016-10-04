<template>
  <div class="mPlayer-playlist">
    <div class="mPlayer-playlist-background" @click="hidePlaylistView"></div>
    <div class="mPlayer-playlist-container">
      <div class="mPlayer-playlist-toolbar">
        <div class="mPlayer-playlist-mount">播放列表 ({{ playList.length }})</div>
        <button class="mPlayer-button mPlayer-playlist-clearn" @click="cleanPlaylist">清空</button>
      </div>
      <div class="mPlayer-playlist-body">
        <div class="mPlayer-playlist-song" v-for="(song, index) in playList" :class="{'playing': song.id == playState.songId}">
          <div class="mPlayer-playlist-song-title" @click="play(song.id)">{{ song.title }}</div>
          <button class="mPlayer-button mPlayer-playlist-song-kickout" @click="remove(index)">
            <i class="mPlayer-icon mPlayer-icon-cross"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.mPlayer-playlist{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  margin: 0;
  padding: 0;
  width: 100%;
  border: 0;
}

.mPlayer-playlist-background,
.mPlayer-playlist-container,
.mPlayer-playlist-toolbar,
.mPlayer-playlist-body{
  position: absolute;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  border: 0;
}

.mPlayer-playlist-background{
  top: 0;
  bottom: 0;
}

.mPlayer-playlist-container{
  top: 40%;
  bottom: 0;
  background: rgba(255,255,255,.95);
}

.mPlayer-playlist-toolbar {
  top: 0;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(0,0,0,.05);
}

.mPlayer-playlist-mount{
  padding: 0 50px;
  text-align: center;
}

.mPlayer-playlist-clearn{
  position: absolute;
  top: 16px;
  right: 15px;
  font-size: 13px;
  color: #999;
}

.mPlayer-playlist-body {
  top: 50px;
  bottom: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.mPlayer-playlist-song{
  padding: 0 15px;
  line-height: 44px;
  height: 44px;
  border-bottom: 1px solid rgba(0,0,0,.05);
  position: relative;
}

.mPlayer-playlist-song-title{
  padding-right: 30px;
}

.mPlayer-playlist-song.playing .mPlayer-playlist-song-title{
  color: #157efb;
  padding-left: 20px;
  background: url('../assets/volume-max-active.png') 0 center no-repeat;
  background-size: 16px 16px;
}

.mPlayer-playlist-song-kickout{
  position: absolute;
  top: 0;
  right: 5px;
  width: 40px;
  height: 40px;
}

.mPlayer-playlist-song-kickout .mPlayer-icon-cross {
  background-size: 15px;
}
</style>
<script>
  import { mapGetters } from 'vuex'
  import Event from '../Event'

  export default {
    computed: mapGetters({
      playState: 'PlayState',
      playList: 'PlayList'
    }),
    mounted () {
      this.$el.getElementsByClassName('mPlayer-playlist-body')[0].scrollTop = this.playState.current * 44
    },
    methods: {
      hidePlaylistView () {
        this.$store.dispatch('dismissView', 'playlist')
      },

      cleanPlaylist () {
        Event.$emit('stop')
        this.hidePlaylistView()
        this.$store.dispatch('setPlayList', [])
        this.$store.dispatch('setPlayState', {
          albumId: null,
          songId: null,
          playing: false,
          current: -1
        })
      },

      play (songId) {
        Event.$emit('play', songId)
      },

      remove (index) {
        if (this.playList.length === 1) {
          this.cleanPlaylist()
        } else {
          if (index < this.playState.current) {
            this.$store.dispatch('setPlayState', {
              current: this.playState.current - 1
            })
          } else if (index === this.playState.current) {
            if (index === this.playList.length - 1) {
              this.$store.dispatch('setPlayState', {
                current: 0
              })
            }

            this.play(this.playList[this.playState.current].id)
          }

          let newList = this.playList.slice(0, this.playList.length)
          newList.splice(index, 1)

          this.$store.dispatch('setPlayList', newList)
        }
      }
    }
  }
</script>
