<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header(v-if="timer.state === 'waiting'")
      img(src="../images/Icon/Timer.svg")
      h2 Timer
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
    #clock(v-else-if="timer.state === 'done'")
      div.number 0
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
    ...mapState(['settings', 'timer'])
  },
  methods: {
    startTimer () {
      // Add one second to the current time so that the timer starts at the input
      let calculatedTime = dayjs().utc().add(1, 's')
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
