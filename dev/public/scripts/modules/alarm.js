import router from '../router'
import dayjs from 'dayjs'
import uuidv4 from 'uuid/v4'

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
    },
    calculateRingTime (state, id) {
      let alarmIndex = state.alarms.findIndex((el) => {
        return (el.id === id)
      })
      let alarm = state.alarms[alarmIndex]
      let inputArray = alarm.relativeTime.split(':')
      let hours = parseInt(inputArray[0])
      hours = alarm.relativeMeridiem === 'PM' && hours !== 12 ? hours + 12 : hours
      hours = hours.toString()
      hours = hours.length === 1 ? '0' + hours : hours
      let minutes = parseInt(inputArray[1])
      let alarmTime = dayjs(dayjs().format(`YYYY-MM-DDT${hours}:${minutes}:00.000`))
      let diff = alarmTime.diff(dayjs())
      if (diff <= 0) {
        alarmTime = alarmTime.add(1, 'day')
      }
      console.log(alarmTime.format(`YYYY-MM-DD hh:mm A`))
      state.alarms[alarmIndex].ringTime = alarmTime
    }
  },
  actions: {
    addAlarm (context, alarm) {
      alarm.id = uuidv4()
      context.state.alarms.push(alarm)
      context.commit('calculateRingTime', alarm.id)
      if (context.state.alarmInterval == null) {
        context.dispatch('alarmIntervalFn')
      }
      console.log(context.state.alarms)
    },
    alarmIntervalFn (context) {
      context.commit('updateAlarmIntervalFn', setInterval(function () {
        let currentTime = dayjs()
        context.state.alarms.forEach((alarm) => {
          let diff = alarm.ringTime.diff(currentTime)
          console.log(diff)
          if (diff <= 0) {
            if (alarm.enabled === false) {
              context.commit('calculateRingTime', alarm.id)
            } else if (context.state.state !== 'done') {
              context.state.state = 'done'
              context.commit('enableAlert', null, { root: true })
              router.push('alarm')
              // Recalculate ring time for the next day
              context.commit('calculateRingTime', alarm.id)
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