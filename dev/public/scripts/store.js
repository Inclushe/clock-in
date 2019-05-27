import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTime: dayjs(),
    clockInterval: null,
    settingsToggle: false,
    alert: false,
    settings: {
      showSeconds: true
    },
    timer: {
      state: 'waiting',
      timeInterval: null,
      startTimestamp: null,
      endTimestamp: null,
      differenceTimestamp: null,
      pausedTimestamp: null
    },
    stopwatch: {
      state: 'waiting',
      stopwatchInterval: null,
      startTimestamp: null,
      pausedTimestamp: null,
      lapTimestamps: null
    }
  },
  mutations: {
    updateCurrentTime (state) {
      state.currentTime = dayjs()
    },
    updateTimerDifference (state) {
      let differenceTimestamp = dayjs(state.timer.endTimestamp.diff(dayjs().utc())).utc()
      console.log(differenceTimestamp.valueOf())
      if (differenceTimestamp.valueOf() <= 1000) {
        clearInterval(state.timer.timeInterval)
        state.timer.state = 'done'
        state.alert = true
      } else {
        state.timer.differenceTimestamp = differenceTimestamp
        state.timer.state = 'running'
      }
    },
    pauseTimer (state) {
      clearInterval(state.timer.timeInterval)
      state.timer.pausedTimestamp = dayjs().utc()
      state.timer.state = 'paused'
    },
    unpauseTimer (state) {
      // console.log(state.timer.differenceTimestamp)
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - state.timer.pausedTimestamp.valueOf()
      console.log(difference)
      console.log(state.timer.startTimestamp.valueOf())
      console.log(state.timer.endTimestamp.valueOf())
      state.timer.startTimestamp = dayjs(state.timer.startTimestamp.valueOf() + difference).utc()
      state.timer.endTimestamp = dayjs(state.timer.endTimestamp.valueOf() + difference).utc()
      state.timer.state = 'running'
      this.dispatch('intervalFn')
    },
    resetTimer (state) {
      clearInterval(state.timer.timeInterval)
      state.timer.state = 'waiting'
      state.alert = false
    },
    updateSettings (state, settings) {
      state.settings = settings
    },
    updateTimer (state, timer) {
      state.timer = timer
    },
    updateTimerIntervalFn (state, fn) {
      state.timer.timeInterval = fn
    },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    }
  },
  actions: {
    intervalFn (context) {
      context.commit('updateTimerIntervalFn', setInterval(function () {
        context.commit('updateTimerDifference')
      }, 100))
    }
  }
})