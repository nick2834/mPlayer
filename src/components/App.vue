<template>
  <div class="mPlayer">
    <library-view :selected="librarySelected"></library-view>
    <transition name="mPlayer-push">
      <album-view v-if="albumViewOpened" :selected="albumSelected"></album-view>
    </transition>
    <transition name="mPlayer-slideup">
      <player-view v-show="playerViewOpened"></player-view>
    </transition>
    <transition name="mPlayer-popup">
      <playlist-view v-if="playlistViewOpened"></playlist-view>
    </transition>
  </div>
</template>
<style>
  body.selected {
    overflow: hidden;
  }

  .mPlayer, .mPlayer *, .mPlayer:after, .mPlayer:before, .mPlayer *:after, .mPlayer *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box
  }

  .mPlayer-clear:after,
  .mPlayer-clear:before {
    display: table;
    content: ""
  }

  .mPlayer-clear:after {
    clear: both;
    overflow: hidden
  }

  .mPlayer-clear {
    zoom: 1
  }

  .mPlayer{
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

  .mPlayer-icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px 20px;
  }

  .mPlayer-icon-play-all {
    background-image: url('../assets/play-all.png');
  }

  .mPlayer-icon-playlist {
    background-image: url('../assets/play-list.png');
  }

  .mPlayer-icon-play {
    background-image: url('../assets/play.png');
  }

  .mPlayer-icon-play-pause {
    background-image: url('../assets/play-pause.png');
  }

  .mPlayer-icon-play-next {
    background-image: url('../assets/play-next.png');
  }

  .mPlayer-icon-play-prev {
    background-image: url('../assets/play-prev.png');
  }

  .mPlayer-icon-volume-max {
    background-image: url('../assets/volume-max.png');
  }

  .mPlayer-icon-cross {
    background-image: url('../assets/cross.png');
  }

  .mPlayer-icon-back{
    background-image: url('../assets/back.png');
  }

  .mPlayer-button{
    border: none;
    border-radius: 0;
    background: 0 0;
    box-shadow: none;
    color: rgba(0,0,0,.3);
    white-space: normal;
    letter-spacing: 0;
    font-weight: 300;
    font-style: normal;
  }

  .mPlayer-reload,
  .mPlayer-loader{
    position: absolute;
    top: 45%;
    z-index: 99;
  }

  .mPlayer-reload{
    left: 0;
    width: 100%;
    line-height: 25px;
    padding: 0 20px;
    text-align: center;
  }

  .mPlayer-loader {
    left: 50%;
    z-index: 99;
    margin-right: -10px;
    margin-left: -10px
  }

  .mPlayer-push-enter-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: push-enter .3s;
    animation: push-enter .3s
  }

  .mPlayer-push-leave-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: push-leave .3s;
    animation: push-leave .3s
  }

  .mPlayer-slideup-enter-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: slideup-enter .3s;
    animation: slideup-enter .3s
  }

  .mPlayer-slideup-leave-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: slideup-leave .3s;
    animation: slideup-leave .3s
  }

  .mPlayer-popup-enter-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: popup-enter .3s;
    animation: popup-enter .3s
  }

  .mPlayer-popup-leave-active {
    -webkit-transform-origin: right center;
    transform-origin: right center;
    -webkit-animation: popup-leave .3s;
    animation: popup-leave .3s
  }

  @-webkit-keyframes push-enter {
    0% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      transform: translateX(100%)
    }

    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  @keyframes push-enter {
    0% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      transform: translateX(100%)
    }

    100% {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }
  }

  @-webkit-keyframes push-leave {
    0% {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }

    100% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      transform: translateX(100%)
    }
  }

  @keyframes push-leave {
    0% {
      opacity: 1;
      -webkit-transform: translateX(0);
      transform: translateX(0)
    }

    100% {
      opacity: 0;
      -webkit-transform: translateX(100%);
      transform: translateX(100%)
    }
  }

  @-webkit-keyframes slideup-enter {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 50px, 0);
      transform: translate3d(0, 50px, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideup-enter {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 50px, 0);
      transform: translate3d(0, 50px, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @-webkit-keyframes slideup-leave {
    0% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 50px, 0);
      transform: translate3d(0, 50px, 0);
    }
  }

  @keyframes slideup-leave {
    0% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 50px, 0);
      transform: translate3d(0, 50px, 0);
    }
  }

  @-webkit-keyframes popup-enter {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes popup-enter {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    100% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @-webkit-keyframes popup-leave {
    0% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }

  @keyframes popup-leave {
    0% {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }

  .mPlayer-loader-spinner {
    width: 20px;
    height: 20px
  }

  .mPlayer-loader-spinner-icon {
    width: 20px;
    height: 20px;
    border: solid 2px transparent;
    border-radius: 50%;
    border-top-color: #157efb;
    border-left-color: #157efb;
    -webkit-animation: loader-spinner 400ms linear infinite;
    animation: loader-spinner 400ms linear infinite
  }

  @-webkit-keyframes loader-spinner {
    0% {
      -webkit-transform: rotate(360deg)
    }

    100% {
      -webkit-transform: rotate(0)
    }
  }

  @keyframes loader-spinner {
    0% {
      transform: rotate(360deg)
    }

    100% {
      transform: rotate(0)
    }
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  import LibraryView from './Library.vue'
  import AlbumView from './Album.vue'
  import PlayerView from './Player.vue'
  import PlaylistView from './Playlist.vue'

  export default {
    computed: {
      ...mapGetters({
        albumViewOpened: 'AlbumViewOpened',
        playerViewOpened: 'PlayerViewOpened',
        playlistViewOpened: 'PlaylistViewOpened'
      }),
      librarySelected () {
        return this.albumViewOpened || this.playlistViewOpened
      },
      albumSelected () {
        return this.albumViewOpened && this.playlistViewOpened
      }
    },
    components: {
      LibraryView,
      AlbumView,
      PlayerView,
      PlaylistView
    }
  }
</script>
