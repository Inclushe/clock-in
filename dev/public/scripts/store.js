import Vue from 'vue'
import Vuex from 'vuex'
import dayjs from 'dayjs'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentTime: dayjs(),
    clockInterval: null,
    settingsToggle: false,
    settings: {
      showSeconds: true
    },
    timer: {
      timeStamp: null,
      timeInterval: null,
      state: 'waiting',
      endTimestamp: null,
      differenceTimestamp: null
    }
  },
  mutations: {
    updateCurrentTime (state) {
      state.currentTime = dayjs()
    },
    updateTimerDifference (state) {
      let differenceTimestamp = dayjs(state.timer.endTimestamp.diff(dayjs().utc()))
      console.log(differenceTimestamp.unix())
      if (differenceTimestamp.unix() <= 0) {
        clearInterval(state.timer.timeInterval)
        state.timer.state = 'done'
      } else {
        state.timer.differenceTimestamp = differenceTimestamp
        state.timer.state = 'running'
      }
    },
    updateSettings (state, settings) {
      state.settings = settings
    },
    updateTimer (state, timer) {
      state.timer = timer
    },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    }
  }
})