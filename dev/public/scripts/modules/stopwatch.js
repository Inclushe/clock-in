import router from '../router'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    state: 'waiting',
    stopwatchInterval: null,
    startTimestamp: null,
    timeSinceStart: null,
    pausedTimestamp: null,
    lapTimestamps: []
  },
  mutations: {
    pauseStopwatch (state) {
      clearInterval(state.stopwatchInterval)
      state.pausedTimestamp = dayjs().utc()
      state.state = 'paused'
    },
    lap (state) {
      let currentTime = state.timeSinceStart
      let hours = (((currentTime.date() - 1) * 24) + currentTime.hour()).toString()
      let hoursString = hours.length === 1 ? (0 + hours) : hours
      state.lapTimestamps.push(hoursString + currentTime.format(':mm:ss.SSS'))
    },
    resetStopwatch (state) {
      clearInterval(state.stopwatchInterval)
      state.state = 'waiting'
      state.lapTimestamps = []
    },
    updateStopwatchIntervalFn (state) {
      state.stopwatchInterval = setInterval(function () {
        state.timeSinceStart = dayjs(dayjs().diff(state.startTimestamp)).utc()
        state.state = 'running'
      }, 10)
    }
  },
  actions: {
    stopwatchIntervalFn (context) {
      context.commit('updateStopwatchIntervalFn')
    },
    unpauseStopwatch (context) {
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - context.state.pausedTimestamp.valueOf()
      context.state.startTimestamp = dayjs(context.state.startTimestamp.valueOf() + difference).utc()
      context.dispatch('stopwatchIntervalFn')
    }
  }
}
