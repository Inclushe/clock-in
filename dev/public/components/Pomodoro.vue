<template lang="pug">
  div.section-container(:class="{green: isBreak}")
    #border(v-if="!isBreak" :style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)`, transition: `${changed ? 'clip-path 0ms linear' : 'clip-path 100ms linear'}` }")
      include ../images/border.svg
    #outlineBorder(v-if="!isBreak")
      include ../images/intersect.svg
    #border(v-if="isBreak" :style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)`, transition: `${changed ? 'clip-path 0ms linear' : 'clip-path 100ms linear'}` }")
      include ../images/border-green.svg
    #outlineBorder(v-if="isBreak")
      include ../images/intersect-green.svg
    //- #border(:style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)`, transition: `${changed ? 'clip-path 0ms linear' : 'clip-path 100ms linear'}` }")
    //-   include ../images/border-green.svg
    //- #outlineBorder
    //-   include ../images/intersect-green.svg
    #header(v-if="pomodoro.state === 'waiting'")
      div
        img(src="../images/Icon/Pomodoro.svg" alt="Pomodoro Icon")
        h1 Pomodoro
      div
        h2 Edit your preferred intervals in Settings.
    #pomodoroPreview.time-style(v-if="pomodoro.state === 'waiting'")
      div.number {{ pomodoro.config.workLength.toString()[0] }}
      div.number {{ pomodoro.config.workLength.toString()[1] }}
      div.colon :
      div.number 0
      div.number 0
    #clock(v-if="pomodoro.state === 'done'" :class="{'alert': alert}").time-style
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    .indicator(v-if="pomodoro.state === 'running' || pomodoro.state === 'paused'")
      div
        img(v-if="isBreak" src="../images/Icon/PomodoroGreen.svg" alt="Pomodoro Icon")
        img(v-else src="../images/Icon/Pomodoro.svg" alt="Pomodoro Icon")
        h1 Pomodoro
      div
        h2 {{ pomodoro.intervalTimestamps[pomodoro.currentInterval].type }} Interval
      div
        span.num {{ pomodoro.currentInterval + 1 }}/{{ pomodoro.intervalTimestamps.length }}
    #clock.clock-pomodoro(v-if="pomodoro.state === 'running' || pomodoro.state === 'paused'").time-style
      transition(name="tick")
        div.number(v-if="pomodoro.currentProgress.format('mm')[0] !== '0'" :key="pomodoro.currentProgress.format('mm')[0]") {{ pomodoro.currentProgress.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('mm')[1]") {{ pomodoro.currentProgress.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('ss')[0]") {{ pomodoro.currentProgress.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('ss')[1]") {{ pomodoro.currentProgress.format('ss')[1] }}
    .time-button-section.time-button-section--short
      .time-button(@click="resetPomodoro" v-if="pomodoro.state !== 'waiting'")
        span Reset
    #fab(@click="startPomodoro" v-if="pomodoro.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="unpausePomodoro" v-else-if="pomodoro.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="pausePomodoro" v-else-if="pomodoro.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    #fab(@click="resetPomodoro" v-else-if="pomodoro.state === 'done'")
      img(src="../images/Icon/Stop.svg" alt="Stop Icon")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      changed: false
    }
  },
  computed: {
    ...mapState(['pomodoro', 'alert']),
    percent () {
      if (this.pomodoro.startTimestamp == null || this.pomodoro.state === 'waiting' || this.changed) {
        return 1
      } else if (this.pomodoro.state === 'done') {
        return 0
      } else {
        let begin, end
        if (this.pomodoro.currentInterval === 0) {
          begin = this.pomodoro.startTimestamp
        } else {
          begin = this.pomodoro.intervalTimestamps[this.pomodoro.currentInterval - 1].timestamp
        }
        end = this.pomodoro.intervalTimestamps[this.pomodoro.currentInterval].timestamp
        return ((this.pomodoro.currentProgress.valueOf() - 1100) / (end.valueOf() - begin.valueOf()))
      }
    },
    isBreak () {
      if (this.pomodoro.state === 'waiting' || this.pomodoro.intervalTimestamps[this.pomodoro.currentInterval] === undefined) {
        return ''
      } else {
        return this.pomodoro.intervalTimestamps[this.pomodoro.currentInterval].type.includes('break')
      }
    }
  },
  watch: {
    'pomodoro.currentInterval': function () {
      this.changed = true
      console.log(this.changed)
      let self = this
      setTimeout(function () {
        self.changed = false
        console.log(self.changed)
      }, 100)
    }
  },
  methods: {
    ...mapMutations({ pausePomodoro: 'pomodoro/pausePomodoro' }),
    ...mapActions({
      startPomodoro: 'pomodoro/startPomodoro',
      unpausePomodoro: 'pomodoro/unpausePomodoro',
      resetPomodoro: 'pomodoro/resetPomodoro'
    })
  }
}
</script>
