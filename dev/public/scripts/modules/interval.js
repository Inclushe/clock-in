import router from '../router'
import dayjs from 'dayjs'
import uuidv4 from 'uuid/v4'

export default {
  namespaced: true,
  state: {
    state: 'waiting',
    type: 'constant',
    config: {
      constant: {
        intervalCount: 5,
        intervalLength: '0:05'
      },
      variable: {
        intervals: []
      }
    },
    currentInterval: 0,
    intervalTimestamps: [],
    currentProgress: '',
    startTimestamp: null,
    pausedTimestamp: null,
    intervalInterval: null
  },
  mutations: {
    pauseInterval (state) {
      clearInterval(state.intervalInterval)
      state.pausedTimestamp = dayjs().utc()
      state.state = 'paused'
    },
    addVariableInterval (state) {
      let interval
      if (state.config.variable.intervals.length > 0) {
        interval = {
          time: state.config.variable.intervals[state.config.variable.intervals.length - 1].time
        }
      } else {
        interval = {
          time: '5:00'
        }
      }
      interval.id = uuidv4()
      console.log(interval)
      state.config.variable.intervals.push(interval)
    },
    removeVariableInterval (state, id) {
      let intervalIndex = state.config.variable.intervals.findIndex((el) => {
        return (el.id === id)
      })
      state.config.variable.intervals.splice(intervalIndex, 1)
    }
  },
  actions: {
    startInterval (context) {
      context.state.intervalTimestamps = []
      context.state.currentInterval = 0
      // Add one second to the current time so that the timer starts at the input
      let calculatedTime = dayjs().utc().add(1, 's')
      context.state.startTimestamp = calculatedTime
      if (context.state.type === 'constant') {
        // Parse end time from input
        let timerArray = context.state.config.constant.intervalLength.split(':').reverse().slice(0, 3)
        let units = 'smh'
        console.log(timerArray)
        for (let i = 0; i < context.state.config.constant.intervalCount; i++) {
          timerArray.forEach((value, index) => {
            calculatedTime = calculatedTime.add(value, units[index])
          })
          console.log(calculatedTime)
          context.state.intervalTimestamps.push(calculatedTime)
        }
      } else if (context.state.type === 'variable') {
        // Parse end time from input
        let units = 'smh'
        for (let i = 0; i < context.state.config.variable.intervals.length; i++) {
          let timerArray = context.state.config.variable.intervals[i].time.split(':').reverse().slice(0, 3)
          timerArray.forEach((value, index) => {
            calculatedTime = calculatedTime.add(value, units[index])
          })
          context.state.intervalTimestamps.push(calculatedTime)
        }
      }
      context.dispatch('updateIntervalIntervalFn')
    },
    unpauseInterval (context) {
      let currentTime = dayjs()
      let difference = currentTime.valueOf() - context.state.pausedTimestamp.valueOf()
      console.log(difference)
      for (let i = 0; i < context.state.intervalTimestamps.length; i++) {
        console.log('before')
        console.log(context.state.intervalTimestamps[i])
        context.state.intervalTimestamps[i] = dayjs(context.state.intervalTimestamps[i].utc().valueOf() + difference).utc()
        console.log('after', context.state.intervalTimestamps[i].valueOf())
      }
      context.dispatch('updateIntervalIntervalFn')
    },
    resetInterval (context) {
      clearInterval(context.state.intervalInterval)
      context.state.state = 'waiting'
      context.commit('disableAlert', null, { root: true })
    },
    updateIntervalIntervalFn (context) {
      context.state.intervalInterval = setInterval(function () {
        let currentTime = dayjs()
        let timeUntilNextInterval = context.state.intervalTimestamps[context.state.currentInterval].diff(currentTime)
        // Ring when timer hits one second to account for added second
        if (timeUntilNextInterval.valueOf() <= 1000) {
          // Alert when last interval is done
          console.log(context.state.currentInterval)
          if (!((context.state.currentInterval + 1) < context.state.intervalTimestamps.length)) {
            clearInterval(context.state.intervalInterval)
            context.state.state = 'done'
            context.commit('enableAlert', null, { root: true })
            router.push('interval')
          } else {
            context.state.currentInterval++
            timeUntilNextInterval = context.state.intervalTimestamps[context.state.currentInterval].diff(currentTime)
          }
        } else {
          context.state.currentProgress = dayjs(timeUntilNextInterval).utc()
          context.state.state = 'running'
        }
      }, 100)
    }
  }
}
