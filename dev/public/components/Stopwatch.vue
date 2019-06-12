<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header
      div
        img(src="../images/Icon/Stopwatch.svg" alt="Stopwatch Icon")
        h1 Stopwatch
    #stopwatchTime(v-if="stopwatch.state === 'running' || stopwatch.state === 'paused'").time-style
      transition(name="tick")
        div.number(:key="hours[0]") {{ hours[0] }}
      transition(name="tick")
        div.number(:key="hours[1]") {{ hours[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="stopwatch.timeSinceStart.format('mm')[0]") {{ stopwatch.timeSinceStart.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="stopwatch.timeSinceStart.format('mm')[1]") {{ stopwatch.timeSinceStart.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="stopwatch.timeSinceStart.format('ss')[0]") {{ stopwatch.timeSinceStart.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="stopwatch.timeSinceStart.format('ss')[1]") {{ stopwatch.timeSinceStart.format('ss')[1] }}
    #stopwatchTime(v-if="stopwatch.state === 'waiting'").time-style
      div.number 0
      div.number 0
      div.colon :
      div.number 0
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    #milliseconds(v-if="stopwatch.state === 'running' || stopwatch.state === 'paused'").time-style
      div.number {{ stopwatch.timeSinceStart.format('SSS')[0] }}
      div.number {{ stopwatch.timeSinceStart.format('SSS')[1] }}
      div.number {{ stopwatch.timeSinceStart.format('SSS')[2] }}
    #milliseconds(v-if="stopwatch.state === 'waiting'").time-style
      div.number 0
      div.number 0
      div.number 0
    .lap-section
      .lap-section_header
        h2 LAPS
      table
        tr(v-for="(lapTime, index) in stopwatch.lapTimestamps")
          td#lapNumber {{ index + 1 }}
          td#lapTime.time-style {{ lapTime }}
    #fab.up(@click="startStopwatch" v-if="stopwatch.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="unpauseStopwatch" v-else-if="stopwatch.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="pauseStopwatch" v-else-if="stopwatch.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    .time-button-section(v-if="stopwatch.state !== 'waiting'")
      .time-button(@click="lap")
        span Lap
      .time-button(@click="resetStopwatch")
        span Reset
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  computed: {
    ...mapState(['stopwatch']),
    hours () {
      let hours = (((this.stopwatch.timeSinceStart.date() - 1) * 24) + this.stopwatch.timeSinceStart.hour()).toString()
      return hours.length === 1 ? (0 + hours) : hours
    }
  },
  methods: {
    startStopwatch () {
      this.stopwatch.startTimestamp = dayjs().utc()
      this.$store.dispatch('stopwatch/stopwatchIntervalFn')
    },
    ...mapMutations({
      pauseStopwatch: 'stopwatch/pauseStopwatch',
      resetStopwatch: 'stopwatch/resetStopwatch',
      lap: 'stopwatch/lap'
    }),
    ...mapActions({
      unpauseStopwatch: 'stopwatch/unpauseStopwatch'
    })
  }
}
</script>
