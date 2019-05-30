import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapMutations } from 'vuex'
import VueRouter from 'vue-router'
import fscreen from 'fscreen'
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

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  store,
  router,
  // computed: mapState(['currentTime']),
  mounted () {
    let self = this
    setInterval(function () {
      self.$store.commit('updateCurrentTime')
    }, 100)
    this.$store.commit('loadAlertSound')
  },
  computed: mapState(['settingsToggle', 'alert']),
  methods: {
    toggleFullscreen () {
      if (fscreen.fullscreenElement !== null) {
        fscreen.exitFullscreen(this.$el)
      } else {
        fscreen.requestFullscreen(this.$el)
      }
    },
    ...mapMutations(['toggleSettings'])
  },
  components: { Settings }
})

console.log('hello')
