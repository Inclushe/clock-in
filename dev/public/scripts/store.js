import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import timer from './modules/timer'
import stopwatch from './modules/stopwatch'
import alertSound from '../audio/alert_simple.ogg'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timer,
    stopwatch
  },
  state: {
    currentTime: dayjs(),
    clockInterval: null,
    settingsToggle: false,
    alert: false,
    alertAudio: new Audio(alertSound),
    alertInterval: null,
    settings: {
      showSeconds: true
    }
  },
  mutations: {
    updateCurrentTime (state) {
      state.currentTime = dayjs()
    },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    },
    enableAlert (state) {
      state.alert = true
      state.alertAudio.currentTime = 0
      state.alertAudio.play()
      state.alertInterval = setInterval(function () {
        state.alertAudio.currentTime = 0
        state.alertAudio.play()
      }, 1000)
    },
    disableAlert (state) {
      state.alert = false
      clearInterval(state.alertInterval)
    },
    loadAlertSound (state) {
      state.alertAudio.load()
    }
  }
})
