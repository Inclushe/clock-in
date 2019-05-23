<template lang="pug">
  div.section-container
    #border(:style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)` }")
      include ../images/border.svg
    #outlineBorder
      include ../images/intersect.svg
    #header(v-if="timer.state === 'waiting'")
      img(src="../images/Icon/Timer.svg")
      h2 Timer
    transition(name="bolden")
      #clock(v-if="timer.state === 'running'")
        transition(name="tick")
          div.number(v-if="timer.differenceTimestamp.format('mm')[0] !== '0'" :key="timer.differenceTimestamp.format('mm')[0]") {{ timer.differenceTimestamp.format('mm')[0] }}
        transition(name="tick")
          div.number(:key="timer.differenceTimestamp.format('mm')[1]") {{ timer.differenceTimestamp.format('mm')[1] }}
        div.colon :
        transition(name="tick")
          div.number(:key="timer.differenceTimestamp.format('ss')[0]") {{ timer.differenceTimestamp.format('ss')[0] }}
        transition(name="tick")
          div.number(:key="timer.differenceTimestamp.format('ss')[1]") {{ timer.differenceTimestamp.format('ss')[1] }}
    #clock(v-if="timer.state === 'done'")
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    transition(name="timer-fade-out")
      #input(v-if="timer.state === 'waiting'")
        input(type="text" v-model="timerInput" autofocus)
    #fab(@click="startTimer" v-if="timer.state === 'waiting'")
      img(src="../images/Icon/Play.svg")
    #fab(@click="unpauseTimer" v-else-if="timer.state === 'paused'")
      img(src="../images/Icon/Play.svg")
    #fab(@click="pauseTimer" v-else-if="timer.state === 'running'")
      img(src="../images/Icon/Pause.svg")
    #fab(@click="resetTimer" v-else-if="timer.state === 'done'")
      img(src="../images/Icon/Stop.svg")
</template>

<script>
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { mapState } from 'vuex'

dayjs.extend(utc)

export default {
  data () {
    return {
      timerInput: '0:05'
    }
  },
  computed: {
    ...mapState(['settings', 'timer']),
    percent () {
      if (this.timer.startTimestamp == null || this.timer.endTimestamp == null || this.timer.state === 'waiting') {
        return 1
      } else if (this.timer.state === 'done') {
        return 0
      } else {
        console.log(this.timer.differenceTimestamp.unix() - 1, this.timer.endTimestamp.unix() - this.timer.startTimestamp.unix())
        return (this.timer.differenceTimestamp.unix() - 1) / (this.timer.endTimestamp.unix() - this.timer.startTimestamp.unix())
      }
    }
  },
  methods: {
    startTimer () {
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
      let self = this
      this.timer.timeInterval = setInterval(function () {
        self.$store.commit('updateTimerDifference')
      }, 100)
    },
    unpauseTimer () {
      // @TODO:
    },
    pauseTimer () {
      // @TODO:
    },
    resetTimer () {
      // @TODO:
    }
  }
}
</script>
