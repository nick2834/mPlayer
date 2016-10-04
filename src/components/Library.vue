<template>
  <div class="mPlayer-library" :class="{'selected': selected}">
    <ul class="mPlayer-library-ul mPlayer-clear">
      <li class="mPlayer-library-li" v-for="album in albumList" @click="showAlbumView(album)">
        <div class="mPlayer-library-cover">
          <img class="mPlayer-library-image" v-lazy="album.cover" width="125" height="125" />
        </div>
        <div class="mPlayer-library-meta">
          <div class="mPlayer-library-title">{{album.title}}</div>
          <div class="mPlayer-library-author">{{album.author}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
  .mPlayer-library{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
    display: block;
    overflow: auto;
    margin: 0;
    padding: 20px 15px;
    width: 100%;
    border: 0;
  }

  .mPlayer-library.selected{
    -webkit-filter: blur(10px);
    -moz-filter: blur(10px);
    -ms-filter: blur(10px);
    filter: blur(10px);
  }

  .mPlayer-library-ul {
    margin-top: 0;
    margin-bottom: 0;
    margin-right: -2%;
    margin-left: -2%;
    padding: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mPlayer-library-li {
    float: left;
    display: block;
    list-style: none;
    margin-right: 2%;
    margin-bottom: 20px;
    margin-left: 2%;
    width: 16%;
    font-size: 13px;
  }

  @media screen and (max-width: 768px) {
    .mPlayer-library-li {
      width: 29.33%
    }
  }

  .mPlayer-library-cover {
    min-height: 87px;
    overflow: hidden;
    position: relative;
    background: #fafafa;
  }

  .mPlayer-library-cover:before {
    content: "";
    display: block;
    padding-top: 100%;
  }

  .mPlayer-library-image{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
  }

  .mPlayer-library-meta {
    overflow: hidden;
    height: 45px;
  }

  .mPlayer-library-title{
    overflow: hidden;
    margin-top: 5px;
    color: #494949;
    word-wrap: break-word;
    font-size: 13px;
    height: 1.5em;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .mPlayer-library-author {
    color: #9b9b9b;
    font-size: 12px;
  }
</style>
<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['selected'],
    computed: mapGetters({
      albumList: 'AlbumList'
    }),
    methods: {
      showAlbumView (album) {
        this.$store.dispatch('showView', 'album')
        this.$store.dispatch('setCurrentAlbum', album)
      }
    },
    mounted () {
      this.$store.dispatch('getAlbumList')
    }
  }
</script>
