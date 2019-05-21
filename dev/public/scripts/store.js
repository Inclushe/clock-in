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
    }
  },
  mutations: {
    updateCurrentTime (state) {
      state.currentTime = dayjs()
    },
    updateSettings (state, settings) {
      state.settings = settings
    },
    toggleSettings (state) {
      state.settingsToggle = !state.settingsToggle
    }
  }
})