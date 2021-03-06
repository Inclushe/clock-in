<template lang="pug">
  div.section-container
    #border(:style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)`, transition: 'clip-path 100ms linear' }")
      include ../images/border.svg
    #outlineBorder
      include ../images/intersect.svg
    #header(v-if="timer.state === 'waiting'")
      div
        img(src="../images/Icon/Timer.svg" alt="Timer Icon")
        h1 Timer
      div
        h2 Colons {{ settings.autoAddColons ? 'are automatically' : 'must be manually' }}  inserted.<br>Change this behavior in Settings.
    #clock(v-if="timer.differenceTimestamp !== null && (timer.state === 'running' || timer.state === 'paused')", :class="{'show-hours': timer.hours !== '00'}").time-style
      transition(name="tick")
        div.number(v-if="timer.hours[0] !== '0'" :key="timer.hours[0]") {{ timer.hours[0] }}
      transition(name="tick")
        div.number(v-if="timer.hours !== '00'" :key="timer.hours[1]") {{ timer.hours[1] }}
      div.colon(v-if="timer.hours !== '00'") :
      transition(name="tick")
        div.number(v-if="differenceTimestamp.format('mm')[0] !== '0' || timer.hours !== '00'" :key="differenceTimestamp.format('mm')[0]") {{ differenceTimestamp.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="differenceTimestamp.format('mm')[1]") {{ differenceTimestamp.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="differenceTimestamp.format('ss')[0]") {{ differenceTimestamp.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="differenceTimestamp.format('ss')[1]") {{ differenceTimestamp.format('ss')[1] }}
    #clock(v-if="timer.state === 'done'" :class="{'alert': alert}").time-style
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    .input.input--timer(v-if="timer.state === 'waiting'" @keydown.enter="startTimer" :class="{'invalid': !validInput}")
      input#input(type="text" inputmode="numeric" v-model="timerInput")
    .time-button-section.time-button-section--short
      .time-button(@click="resetTimer" v-if="timer.state !== 'waiting'")
        span Reset
    #fab(@click="startTimer" v-if="timer.state === 'waiting'" :class="{'disabled': !validInput}")
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
    differenceTimestamp () {
      try {
        this.timer.differenceTimestamp.format('hh')
        return this.timer.differenceTimestamp
      } catch (e) {
        
        return dayjs(this.timer.differenceTimestamp)
      }
    },
    percent () {
      if (this.timer.startTimestamp == null || this.timer.endTimestamp == null || this.timer.differenceTimestamp == null || this.timer.state === 'waiting') {
        return 1
      } else if (this.timer.state === 'done') {
        return 0
      } else {
        // console.log('per')
        // console.log(this.timer.differenceTimestamp.valueOf() - 1000, this.timer.endTimestamp.valueOf() - this.timer.startTimestamp.valueOf())
        // console.log('perend')
        return ((this.timer.differenceTimestamp.valueOf() - 1100) / (this.timer.endTimestamp.valueOf() - this.timer.startTimestamp.valueOf()))
      }
    },
    validInput () {
      let validInput = true
      let timerArray = this.timerInput.split(':').reverse().slice(0, 3)
      timerArray.forEach((value) => {
        if (isNaN(Number(value))) {
          validInput = false
        }
      })
      return validInput
    }
  },
  methods: {
    startTimer () {
      if (this.timer.state === 'waiting' && this.validInput) {
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
        this.$store.commit('playSound', 'timer_start', { root: true })
      }
    },
    ...mapMutations({ pauseTimer: 'timer/pauseTimer' }),
    ...mapActions({ 
      resetTimer: 'timer/resetTimer',
      unpauseTimer: 'timer/unpauseTimer'
    })
  },
  watch: {
    timerInput () {
      this.timerInput = this.timerInput.slice(0, 9)
      if (this.$store.state.settings.autoAddColons) {
        // auto-insert colons
        let numberIndex = 0
        let str = this.timerInput.split('').reverse().reduce((r, v) => {
          if (isNaN(Number(v)) === false) {
            if (numberIndex % 2 === 0 && numberIndex !== 0) {
              r += ':'
            }
            r = r + v
            numberIndex++
          }
          return r
        }, '')
        this.timerInput = str.split('').reverse().join('')
      }
    }
  },
  mounted () {
    console.log('timer')
    console.log(dayjs(this.timer.differenceTimestamp).format('hh'))
    if (this.timer.state === 'waiting') {
      this.$el.querySelector('input#input').focus()
    }
  }
}
</script>
