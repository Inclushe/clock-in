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
      timeSinceStart: null,
      pausedTimestamp: null,
      lapTimestamps: []
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
      this.dispatch('timerIntervalFn')
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
      state.stopwatch.lapTimestamps.push(state.stopwatch.timeSinceStart)
    },
    resetTimer (state) {
      clearInterval(state.timer.timeInterval)
      state.timer.state = 'waiting'
      state.alert = false
    },
    resetStopwatch (state) {
      clearInterval(state.stopwatch.timeInterval)
      state.stopwatch.lapTimestamps = []
      state.stopwatch.state = 'waiting'
    },
    updateSettings (state, settings) {
      state.settings = settings
    },
    updateTimer (state, timer) {
      state.timer = timer
    },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    },
    updateTimerIntervalFn (state, fn) {
      state.timer.timeInterval = fn
    },
    updateStopwatchIntervalFn (state) {
      state.stopwatch.stopwatchInterval = setInterval(function () {
        state.stopwatch.timeSinceStart = dayjs(dayjs().diff(state.stopwatch.startTimestamp)).utc()
        state.stopwatch.state = 'running'
      }, 10)
    }
  },
  actions: {
    timerIntervalFn (context) {
      context.commit('updateTimerIntervalFn', setInterval(function () {
        context.commit('updateTimerDifference')
      }, 100))
    },
    stopwatchIntervalFn (context) {
      context.commit('updateStopwatchIntervalFn')
    }
  }
})