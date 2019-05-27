<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header(v-if="stopwatch.state === 'waiting'")
      img(src="../images/Icon/Stopwatch.svg")
      h2 Stopwatch
    .time-thing(v-if="stopwatch.state !== 'waiting'") {{ stopwatch.timeSinceStart.format('h:mm:ss.SSS') }}
    .lap-section
      ul
        li(v-for="lap in stopwatch.lapTimestamps") {{ lap.format('h:mm:ss.SSS') }}
    #fab.up(@click="startStopwatch" v-if="stopwatch.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="unpauseStopwatch" v-else-if="stopwatch.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="pauseStopwatch" v-else-if="stopwatch.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    .time-button.lap(@click="lap")
      span Lap
    .time-button.reset(@click="resetStopwatch")
      span Reset
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import dayjs from 'dayjs'

export default {
  computed: {
    ...mapState(['stopwatch'])
  },
  methods: {
    startStopwatch () {
      this.stopwatch.startTimestamp = dayjs().utc()
      this.$store.dispatch('stopwatchIntervalFn')
      // this.stopwatch.state = 'running'
    },
    ...mapMutations(['unpauseStopwatch', 'pauseStopwatch', 'resetStopwatch', 'lap'])
  }
}
</script>
