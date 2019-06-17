import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import timer from './modules/timer'
import stopwatch from './modules/stopwatch'
import alarm from './modules/alarm'
import interval from './modules/interval'
import pomodoro from './modules/pomodoro'
import sounds from '../audio/*.ogg'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timer,
    stopwatch,
    alarm,
    interval,
    pomodoro
  },
  state: {
    currentTime: dayjs(),
    clockInterval: null,
    settingsToggle: false,
    alert: false,
    alertAudio: {},
    alertInterval: null,
    settings: {
      showSeconds: true,
      autoAddColons: true,
      clockType: 12,
      fadeWhileInactive: false
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
      state.alertAudio['alert_simple'].currentTime = 0
      state.alertAudio['alert_simple'].play()
      state.alertInterval = setInterval(function () {
        state.alertAudio['alert_simple'].currentTime = 0
        state.alertAudio['alert_simple'].play()
      }, 1000)
    },
    disableAlert (state) {
      state.alert = false
      clearInterval(state.alertInterval)
    },
    playSound (state, sound) {
      state.alertAudio[sound].currentTime = 0
      state.alertAudio[sound].play()
    },
    loadAlertSound (state) {
      Object.keys(sounds).forEach((el) => {
        state.alertAudio[el] = new Audio(sounds[el])
        state.alertAudio[el].load()
      })
    }
  }
})
