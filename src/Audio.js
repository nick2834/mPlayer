export default class Audio {
  constructor () {
    this.audio = new window.Audio()
  }

  play (src) {
    if (src) {
      this.audio.src = src
    }

    this.audio.play()
  }

  pause () {
    this.audio.pause()
  }

  stop () {
    this.audio.currentTime = 0
    // this.audio.duration = 0
    this.audio.pause()
  }

  canPlayType (type) {
    return this.audio.canPlayType(type)
  }

  duration () {
    return this.audio.duration
  }

  currentTime () {
    return this.audio.currentTime
  }

  volume () {
    return this.audio.volume
  }

  setVolume (val) {
    this.audio.volume = val
  }

  readyState () {
    return this.audio.readyState
  }

  played () {
    return this.audio.played
  }

  paused () {
    return this.audio.paused
  }

  on (name, handler) {
    this.audio.addEventListener(name, handler.bind(this), false)
  }
}
