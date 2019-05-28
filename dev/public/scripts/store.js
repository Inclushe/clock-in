import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'
import timer from './modules/timer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    timer
  },
  state: {
    currentTime: dayjs(),
    clockInterval: null,
    settingsToggle: false,
    alert: false,
    settings: {
      showSeconds: true
    },
    stopwatch: {
      state: 'waiting',
      stopwatchInterval: null,
      startTimestamp: null,
      timeSinceStart: null,
      pausedTimestamp: null,
      lapTimestamps: []
    }
  },
  mutations: {
    updateCurrentTime (state) {
      state.currentTime = dayjs()
    },
    pauseStopwatch (state) {
      clearInterval(state.stopwatch.stopwatchInterval)
      state.stopwatch.pausedTimestamp = dayjs().utc()
      state.stopwatch.state = 'paused'
    },
    unpauseStopwatch (state) {
      console.log('test')
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - state.stopwatch.pausedTimestamp.valueOf()
      state.stopwatch.startTimestamp = dayjs(state.stopwatch.startTimestamp.valueOf() + difference).utc()
      this.dispatch('stopwatchIntervalFn')
    },
    lap (state) {
      let currentTime = state.stopwatch.timeSinceStart
      let hours = (((currentTime.date() - 1) * 24) + currentTime.hour()).toString()
      let hoursString = hours.length === 1 ? (0 + hours) : hours
      state.stopwatch.lapTimestamps.push(hoursString + currentTime.format(':mm:ss.SSS'))
    },
    resetStopwatch (state) {
      console.log()
      clearInterval(state.stopwatch.stopwatchInterval)
      state.stopwatch.state = 'waiting'
      state.stopwatch.lapTimestamps = []
    },
    // updateSettings (state, settings) {
    //   state.settings = settings
    // },
    // updateTimer (state, timer) {
    //   state.timer = timer
    // },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    },
    enableAlert (state) {
      state.alert = true
    },
    disableAlert (state) {
      state.alert = false
    },
    updateStopwatchIntervalFn (state) {
      state.stopwatch.stopwatchInterval = setInterval(function () {
        state.stopwatch.timeSinceStart = dayjs(dayjs().diff(state.stopwatch.startTimestamp)).utc()
        state.stopwatch.state = 'running'
      }, 10)
    }
  },
  actions: {
    stopwatchIntervalFn (context) {
      context.commit('updateStopwatchIntervalFn')
    }
  }
})