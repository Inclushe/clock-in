<template lang="pug">
  .settings(v-show="settingsToggle")
    .settings-header
      h1
        include ../images/Icon/Settings.svg
        span Settings
      a(@click="toggleSettings")
        include ../images/Icon/baseline-close-24px.svg
        span Close
    h2 General
    label.settings-toggle(for="24hr")
      input(type="checkbox" id="24hr" v-model="clockType")
      span Use 24 Hour Clock
    label.settings-toggle(for="autoAdd")
      input(type="checkbox" id="autoAdd" v-model="settings.autoAddColons")
      span Automatically Insert Colons
    label.settings-toggle(for="fade")
      input(type="checkbox" id="fade" v-model="settings.fadeWhileInactive")
      span Fade while Inactive
    label(for="fadeAmount" v-if="settings.fadeWhileInactive")
      span Fade Amount
      br
      input(type="number" id="workLength" v-model="settings.fadeAmount" :disabled="!settings.fadeWhileInactive" min="0" max="1" step="0.1")
    label(for="secondsToFade" v-if="settings.fadeWhileInactive")
      span Seconds to Fade
      br
      input(type="number" id="workLength" v-model="settings.secondsToFade" :disabled="!settings.fadeWhileInactive" min="1")
    h2 Clock
    label.settings-toggle(for="showSeconds")
      input(type="checkbox" id="showSeconds" v-model="settings.showSeconds")
      span Show Seconds
    h2 Pomodoro
    label(for="workLength")
      span Work Break Length
      br
      input(type="number" id="workLength" v-model="pomodoro.config.workLength" min="10" max="60")
      span Minutes
    label(for="shortBreakLength")
      span Short Break Length
      br
      input(type="number" id="shortBreakLength" v-model="pomodoro.config.shortBreakLength" min="1" max="60")
      span Minutes
    label(for="longBreakLength")
      span Long Break Length
      br
      input(type="number" id="longBreakLength" v-model="pomodoro.config.longBreakLength" min="1" max="60")
      span Minutes
    label(for="workIntervalsUntilLongBreak" min="1")
      span Intervals until Long Break
      br
      input(type="number" id="workIntervalsUntilLongBreak" v-model="pomodoro.config.workIntervalsUntilLongBreak" min="1")
    label(for="sessionIntervals")
      span Session Intervals
      br
      input(type="number" id="sessionIntervals" v-model="pomodoro.config.sessionIntervals" min="1" :disabled="pomodoro.config.workForever")
    label.settings-toggle(for="workForever")
      input(type="checkbox" id="workForever" v-model="pomodoro.config.workForever")
      span Work Forever
    label.settings-toggle(for="pausing")
      input(type="checkbox" id="pausing" v-model="pomodoro.config.pausing")
      span Enable Pausing
    p.about.
      Created by <a href="https://inclushe.com" target="_blank">Inclushe</a>
      <br>
      Built using <a href="https://vuejs.org/" target="_blank">Vue</a>, Vuex, and Vue Router
      <br>
      Icons and sounds from <a href="https://material.io/" target="_blank">Material</a>
      <br>
      <i>Graduate</i> variable font by <a href="https://tipo.net.ar/" target="_blank">Eduardo Tunni</a>
      <br>
      <i>Inter UI</i> font by <a href="https://rsms.me/" target="_blank">Rasmus Andersson</a>
      <br>
      Source on <a href="https://gitlab.com/Inclushe/clock-in" target="_blank">Gitlab</a>
    p.about.
      This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
    div.inclushe-logo
      a(href="https://inclushe.com" target="_blank")
        include ../images/inclushe_logo.svg
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      clockType: false
    }
  },
  computed: mapState(['settingsToggle', 'settings', 'pomodoro']),
  methods: mapMutations(['toggleSettings']),
  watch: {
    clockType () {
      if (this.clockType) {
        this.$store.state.settings.clockType = 24
      } else {
        this.$store.state.settings.clockType = 12
      }
    }
  }
}
</script>
