import router from '../router'
import dayjs from 'dayjs'

export default {
  namespaced: true,
  state: {
    state: 'waiting',
    alarms: [],
    alarmInterval: null
  },
  mutations: {
    removeAlarm (state, id) {
      let alarmIndex = state.alarms.findIndex((el) => {
        return (el.id === id)
      })
      state.alarms.splice(alarmIndex, 1)
      if (state.alarms === 0) {
        clearInterval(state.alarmInterval)
      }
    },
    updateAlarmIntervalFn (state, fn) {
      state.alarmInterval = fn
    }
  },
  actions: {
    addAlarm (context, alarm) {
      alarm.id = Math.random()
      context.state.alarms.push(alarm)
      if (context.state.alarmInterval == null) {
        context.dispatch('alarmIntervalFn')
      }
      console.log(context.state.alarms)
    },
    alarmIntervalFn (context) {
      context.commit('updateAlarmIntervalFn', setInterval(function () {
        let currentTime = dayjs()
        context.state.alarms.forEach((alarm) => {
          let diff = alarm.time.diff(currentTime)
          if (diff <= 0) {
            if (context.state.state !== 'done') {
              context.state.state = 'done'
              context.commit('enableAlert', null, { root: true })
              router.push('alarm')
            }
          }
        })
      }, 5000))
    },
    stopAlarm (context) {
      context.state.state = 'waiting'
      context.commit('disableAlert', null, { root: true })
    }
  }
}