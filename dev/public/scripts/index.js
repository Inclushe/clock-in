import Vue from 'vue'
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
  components: { Settings },
  store,
  router,
  // computed: mapState(['currentTime']),
  data: {
    fadeTimeout: null,
    fade: false
  },
  computed: mapState(['settingsToggle', 'alert', 'settings']),
  mounted () {
    let self = this
    setInterval(function () {
      self.$store.commit('updateCurrentTime')
    }, 100)
    this.$store.commit('loadAlertSound')
    this.fadeDebounce()
  },
  methods: {
    toggleFullscreen () {
      if (fscreen.fullscreenElement !== null) {
        fscreen.exitFullscreen(this.$el)
      } else {
        fscreen.requestFullscreen(this.$el)
      }
    },
    fadeDebounce () {
      clearTimeout(this.fadeTimeout)
      if (this.fade === true) {
        this.fade = false
      }
      if (this.$store.state.settings.fadeWhileInactive) {
        let self = this
        this.fadeTimeout = setTimeout(function () {
          self.fade = true
        }, this.$store.state.settings.secondsToFade * 1000)
      }
    },
    ...mapMutations(['toggleSettings'])
  }
})

console.log('hello')
