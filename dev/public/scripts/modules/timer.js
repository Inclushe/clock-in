import router from '../router'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    state: 'waiting',
    timeInterval: null,
    startTimestamp: null,
    endTimestamp: null,
    differenceTimestamp: null,
    pausedTimestamp: null
  },
  mutations: {
    pauseTimer (state) {
      clearInterval(state.timeInterval)
      state.pausedTimestamp = dayjs().utc()
      state.state = 'paused'
    },
    updateTimerIntervalFn (state, fn) {
      state.timeInterval = fn
    }
  },
  actions: {
    timerIntervalFn (context) {
      context.commit('updateTimerIntervalFn', setInterval(function () {
        context.dispatch('updateTimerDifference')
      }, 100))
    },
    updateTimerDifference (context) {
      let differenceTimestamp = dayjs(context.state.endTimestamp.diff(dayjs().utc())).utc()
      console.log(differenceTimestamp.valueOf())
      if (differenceTimestamp.valueOf() <= 1000) {
        clearInterval(context.state.timeInterval)
        context.state.state = 'done'
        context.commit('enableAlert', null, { root: true })
        router.push('timer')
      } else {
        context.state.differenceTimestamp = differenceTimestamp
        context.state.state = 'running'
      }
    },
    unpauseTimer (context) {
      // console.log(state.differenceTimestamp)
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - context.state.pausedTimestamp.valueOf()
      console.log(difference)
      console.log(context.state.startTimestamp.valueOf())
      console.log(context.state.endTimestamp.valueOf())
      context.state.startTimestamp = dayjs(context.state.startTimestamp.valueOf() + difference).utc()
      context.state.endTimestamp = dayjs(context.state.endTimestamp.valueOf() + difference).utc()
      context.state.state = 'running'
      context.dispatch('timerIntervalFn')
    },
    resetTimer (context) {
      clearInterval(context.state.timeInterval)
      context.state.state = 'waiting'
      context.commit('disableAlert', null, { root: true })
    }
  }
}
