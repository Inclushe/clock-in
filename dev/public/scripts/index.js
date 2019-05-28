import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapMutations } from 'vuex'
import VueRouter from 'vue-router'
import dayjs from 'dayjs'
import store from './store'
import router from './router'
import Settings from '../components/Settings.vue'

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

Vue.config.productionTip = false

Vue.use(VueRouter)

var test = new Vue({
  el: '#app',
  store,
  router,
  // computed: mapState(['currentTime']),
  mounted () {
    let self = this
    setInterval(function () {
      self.$store.commit('updateCurrentTime')
    }, 100)
  },
  computed: mapState(['settingsToggle', 'alert']),
  methods: mapMutations(['toggleSettings']),
  components: { Settings }
})

console.log('hello')
