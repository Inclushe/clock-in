<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header(v-if="stopwatch.state === 'waiting'")
      img(src="../images/Icon/Stopwatch.svg")
      h2 Stopwatch
    #clock(v-if="stopwatch.state === 'running' || stopwatch.state === 'paused'")
      transition(name="tick")
        div.number 0
      transition(name="tick")
        div.number 0
      div.colon :
      transition(name="tick")
        div.number 0
      transition(name="tick")
        div.number 0
    #clock(v-if="stopwatch.state === 'done'" :class="{'alert': alert}")
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    #fab.up(@click="startStopwatch" v-if="stopwatch.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="unpauseStopwatch" v-else-if="stopwatch.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab.up(@click="pauseStopwatch" v-else-if="stopwatch.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    .time-button.lap
      span Lap
    .time-button.reset
      span Reset
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['stopwatch'])
  },
  methods: {
    startStopwatch () {

    },
    unpauseStopwatch () {

    },
    pauseStopwatch () {

    }
  }
}
</script>
