import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import App from './components/App.vue'
import store from './vuex/store'

/* lazy loading images */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  try: 2
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
