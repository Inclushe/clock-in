import router from '../router'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    state: 'waiting',
    config: {
      workLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
      workIntervalsUntilLongBreak: 3,
      sessionIntervals: 1,
      autoStart: true,
      pausing: true,
      workForever: true
    },
    currentInterval: 0,
    intervalTimestamps: [],
    currentProgress: '',
    startTimestamp: null,
    pausedTimestamp: null,
    pomodoroInterval: null
  },
  mutations: {
    pausePomodoro (state) {
      clearInterval(state.pomodoroInterval)
      state.pausedTimestamp = dayjs().utc()
      state.state = 'paused'
    }
  },
  actions: {
    startPomodoro (context) {
      context.state.intervalTimestamps = []
      context.state.currentInterval = 0
      // Add one second to the current time so that the timer starts at the input
      let calculatedTime = dayjs().utc().add(1, 's')
      context.state.startTimestamp = calculatedTime
      for (let session = 0; session < context.state.config.sessionIntervals; session++) {
        for (let shortBreak = 0; shortBreak < (context.state.config.workIntervalsUntilLongBreak - 1); shortBreak++) {
          calculatedTime = calculatedTime.add(context.state.config.workLength, 'minute')
          context.state.intervalTimestamps.push({
            type: 'work',
            timestamp: calculatedTime
          })
          calculatedTime = calculatedTime.add(context.state.config.shortBreakLength, 'minute')
          context.state.intervalTimestamps.push({
            type: 'short',
            timestamp: calculatedTime
          })
        }
        // Calculate last work block and add long break
        calculatedTime = calculatedTime.add(context.state.config.workLength, 'minute')
        context.state.intervalTimestamps.push({
          type: 'work',
          timestamp: calculatedTime
        })
        calculatedTime = calculatedTime.add(context.state.config.longBreakLength, 'minute')
        context.state.intervalTimestamps.push({
          type: 'long',
          timestamp: calculatedTime
        })
      }
      console.log(JSON.stringify(context.state.intervalTimestamps, null, 4))
      context.dispatch('pomodoroIntervalFn')
    },
    unpausePomodoro (context) {
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - context.state.pausedTimestamp.valueOf()
      console.log(difference)
      for (let i = 0; i < context.state.intervalTimestamps.length; i++) {
        console.log('before')
        context.state.intervalTimestamps[i].timestamp = dayjs(context.state.intervalTimestamps[i].timestamp.utc().valueOf() + difference).utc()
      }
      console.log(JSON.stringify(context.state.intervalTimestamps, null, 4))
      context.dispatch('pomodoroIntervalFn')
    },
    resetPomodoro (context) {
      clearInterval(context.state.pomodoroInterval)
      context.state.state = 'waiting'
      context.commit('disableAlert', null, { root: true })
    },
    pomodoroIntervalFn (context) {
      context.state.pomodoroInterval = setInterval(function () {
        let currentTime = dayjs()
        let timeUntilNextInterval = context.state.intervalTimestamps[context.state.currentInterval].timestamp.diff(currentTime)
        // Ring when timer hits one second to account for added second
        if (timeUntilNextInterval.valueOf() <= 1000) {
          // Alert when last interval is done
          console.log(context.state.currentInterval)
          if (!((context.state.currentInterval + 1) < context.state.intervalTimestamps.length)) {
            if (context.state.config.workForever) {
              context.dispatch('startPomodoro')
            } else {
              clearInterval(context.state.pomodoroInterval)
              context.state.state = 'done'
              context.commit('enableAlert', null, { root: true })
              router.push('interval')
            }
          } else {
            context.state.currentInterval++
            timeUntilNextInterval = context.state.intervalTimestamps[context.state.currentInterval].timestamp.diff(currentTime)
          }
        } else {
          context.state.currentProgress = dayjs(timeUntilNextInterval).utc()
          context.state.state = 'running'
        }
      }, 100)
    }
  }
}
