<template>
  <div class="mPlayer-player">
    <div class="mPlayer-player-cover">
      <img :src="param('cover')" width="40" height="40">
    </div>
    <div class="mPlayer-player-meta">
      <div class="mPlayer-player-title">{{param('title')}}</div>
      <div class="mPlayer-player-progress">{{parseTime(currentTime)}}/{{parseTime(duration)}}</div>
    </div>
    <div class="mPlayer-player-controller">
      <div class="mPlayer-player-button" @click="showPlaylistView">
        <i class="mPlayer-icon mPlayer-icon-playlist"></i>
      </div>
      <div class="mPlayer-player-button" @click="tooglePlay">
        <i class="mPlayer-icon mPlayer-icon-play" v-show="!playState.playing"></i>
        <i class="mPlayer-icon mPlayer-icon-play-pause" v-show="playState.playing"></i>
      </div>
      <div class="mPlayer-player-button" @click="playNext">
        <i class="mPlayer-icon mPlayer-icon-play-next"></i>
      </div>
    </div>
  </div>
</template>
<style>
  .mPlayer-player {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    padding: 5px 15px;
    width: 100%;
    height: 50px;
    background-color: rgba(255,255,255,.9);
  }

  .mPlayer-player-cover,
  .mPlayer-player-controller{
    position: absolute;
    top: 5px;
  }

  .mPlayer-player-cover {
    left: 15px;
  }

  .mPlayer-player-cover img {
    border-radius: 50%
  }

  .mPlayer-player-meta {
    margin-right: 100px;
    margin-left: 50px;
    font-size: 14px;
    line-height: 1.3
  }

  .mPlayer-player-cover {
    left: 15px
  }

  .mPlayer-player-controller {
    right: 15px
  }

  .mPlayer-player-button {
    display: inline-block;
    padding: 5px;
    width: 30px;
  }

  .mPlayer-player-title{
    line-height: 20px;
    overflow: hidden;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import Event from '../Event'
  import Audio from '../Audio'

  export default {
    data () {
      return {
        audio: null,
        currentTime: null,
        duration: null
      }
    },
    computed: mapGetters({
      playState: 'PlayState',
      playList: 'PlayList'
    }),
    mounted () {
      this.audio = new Audio()

      Event.$on('play', (songId) => {
        if (songId) {
          this.$store.dispatch('showView', 'player')
          this.playList.forEach((song, current) => {
            if (song.id === songId) {
              this.$store.dispatch('setPlayState', {
                songId,
                current
              })
            }
          })
          this.audio.play(this.param('src'))
        } else {
          this.audio.play()
        }
      })

      Event.$on('pause', () => {
        this.audio.pause()
      })

      Event.$on('stop', () => {
        this.audio.stop()
        this.$store.dispatch('dismissView', 'player')
      })

      this.audio.on('play', () => {
        this.$store.dispatch('setPlayState', {
          'playing': true
        })
      })

      this.audio.on('pause', () => {
        this.$store.dispatch('setPlayState', {
          'playing': false
        })
      })

      this.audio.on('timeupdate', () => {
        this.currentTime = this.audio.currentTime()
        this.duration = this.audio.duration()
      })

      this.audio.on('ended', () => {
        this.playNext()
      })
    },
    methods: {
      showPlaylistView () {
        this.$store.dispatch('showView', 'playlist')
      },

      tooglePlay () {
        if (this.playState.playing) {
          Event.$emit('pause')
        } else {
          Event.$emit('play')
        }
      },

      playNext () {
        let next = this.playState.current + 1
        if (next >= this.playList.length) {
          next = 0
        }

        next = this.playList[next].id

        Event.$emit('play', next)
      },

      param (key) {
        return this.playState.current > -1 ? this.playList[this.playState.current][key] : null
      },

      parseTime (sec) {
        sec = Number.parseInt(sec)

        if (Number.isNaN(sec) || sec < 0) {
          return '00:00'
        } else {
          let hours
          let date = ''

          if (sec > 60 * 60) {
            hours = Math.floor(sec / (60 * 60))
            hours = ('0' + hours).slice(-2)
            date += hours + ':'
          }

          let minutes = Math.floor(sec / 60)
          let seconds = Math.floor(sec) % 60

          date += ('0' + minutes).slice(-2) + ':'
          date += ('0' + seconds).slice(-2)

          return date
        }
      }
    }
  }
</script>
