<template lang="pug">
  div.section-container
    #border(:style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)` }")
      include ../images/border.svg
    #outlineBorder
      include ../images/intersect.svg
    #header(v-if="timer.state === 'waiting'")
      div
        img(src="../images/Icon/Timer.svg" alt="Timer Icon")
        h2 Timer
    #clock(v-if="timer.state === 'running' || timer.state === 'paused'").time-style
      transition(name="tick")
        div.number(v-if="timer.differenceTimestamp.format('mm')[0] !== '0'" :key="timer.differenceTimestamp.format('mm')[0]") {{ timer.differenceTimestamp.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="timer.differenceTimestamp.format('mm')[1]") {{ timer.differenceTimestamp.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="timer.differenceTimestamp.format('ss')[0]") {{ timer.differenceTimestamp.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="timer.differenceTimestamp.format('ss')[1]") {{ timer.differenceTimestamp.format('ss')[1] }}
    #clock(v-if="timer.state === 'done'" :class="{'alert': alert}").time-style
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    .input.input--timer(v-if="timer.state === 'waiting'" @keydown.enter="startTimer")
      input#input(type="text" v-model="timerInput")
    .time-button-section.time-button-section--short
      .time-button(@click="resetTimer" v-if="timer.state !== 'waiting'")
        span Reset
    #fab(@click="startTimer" v-if="timer.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="unpauseTimer" v-else-if="timer.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="pauseTimer" v-else-if="timer.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    #fab(@click="resetTimer" v-else-if="timer.state === 'done'")
      img(src="../images/Icon/Stop.svg" alt="Stop Icon")
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { mapState, mapMutations, mapActions } from 'vuex'

dayjs.extend(utc)

export default {
  data () {
    return {
      timerInput: '0:05'
    }
  },
  computed: {
    ...mapState(['settings', 'timer', 'alert']),
    percent () {
      if (this.timer.startTimestamp == null || this.timer.endTimestamp == null || this.timer.state === 'waiting') {
        return 1
      } else if (this.timer.state === 'done') {
        return 0
      } else {
        // console.log('per')
        // console.log(this.timer.differenceTimestamp.valueOf() - 1000, this.timer.endTimestamp.valueOf() - this.timer.startTimestamp.valueOf())
        // console.log('perend')
        return ((this.timer.differenceTimestamp.valueOf() - 1000) / (this.timer.endTimestamp.valueOf() - this.timer.startTimestamp.valueOf()))
      }
    }
  },
  methods: {
    startTimer () {
      if (this.timer.state == 'waiting') {
        // Add one second to the current time so that the timer starts at the input
        let calculatedTime = dayjs().utc().add(1, 's')
        this.timer.startTimestamp = calculatedTime
        // Parse end time from input
        let timerArray = this.timerInput.split(':').reverse().slice(0, 3)
        let units = 'smh'
        timerArray.forEach((value, index) => {
          calculatedTime = calculatedTime.add(value, units[index])
        })
        this.timer.endTimestamp = calculatedTime
        this.$store.dispatch('timer/timerIntervalFn')
      }
    },
    ...mapMutations({pauseTimer: 'timer/pauseTimer'}),
    ...mapActions({resetTimer: 'timer/resetTimer', unpauseTimer: 'timer/unpauseTimer'})
  },
  mounted () {
    console.log('timer')
    if (this.timer.state === 'waiting') {
      this.$el.querySelector('input#input').focus()
    }
  }
}
</script>
