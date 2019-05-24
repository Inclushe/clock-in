import Vue from 'vue'
import Vuex from 'vuex'
import { mapState, mapMutations } from 'vuex'
import VueRouter from 'vue-router'
import dayjs from 'dayjs'
import store from './store'
import Clock from '../components/Clock.vue'
import Timer from '../components/Timer.vue'
import Stopwatch from '../components/Stopwatch.vue'
import Alarm from '../components/Alarm.vue'
import Pomodoro from '../components/Pomodoro.vue'
import Interval from '../components/Interval.vue'
import Settings from '../components/Settings.vue'

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

Vue.config.productionTip = false

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Clock },
  { path: '/timer', component: Timer },
  { path: '/stopwatch', component: Stopwatch },
  { path: '/alarm', component: Alarm },
  { path: '/pomodoro', component: Pomodoro },
  { path: '/interval', component: Interval },
]

const router = new VueRouter({ routes })

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
