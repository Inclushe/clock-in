<template lang="pug">
  div.section-container
    #border(:style="{ 'clip-path': `polygon(0% 0%, ${percent*100}% 0%, ${percent*100}% 100%, 0% 100%)`, transition: `${changed ? 'clip-path 0ms linear' : 'clip-path 100ms linear'}` }")
      include ../images/border.svg
    #outlineBorder
      include ../images/intersect.svg
    #header(v-if="interval.state === 'waiting'")
      div
        img(src="../images/Icon/Interval.svg" alt="Interval Icon")
        h1 Interval
    .indicator(v-if="interval.state === 'running' || interval.state === 'paused'")
      div
        img(src="../images/Icon/Interval.svg" alt="Interval Icon")
        h1 Interval
      div
        span.num {{ interval.currentInterval + 1 }}/{{ interval.intervalTimestamps.length }}
    .constant-section(v-if="interval.state === 'waiting'")
      .section-header
        label(for="constant" class="intervalRadio")
          input(type="radio" name="type" value="constant" id="constant" v-model="interval.type")
          span.input
          span.text Constant
      .input.input--interval(v-if="interval.state === 'waiting'" @keydown.enter="startInterval" :disabled="interval.type !== 'constant'" :class="{'invalid': !validInput && interval.type === 'constant'}")
        input#input(type="text" inputmode="numeric" v-model="interval.config.constant.intervalLength" :disabled="interval.type !== 'constant'")
      .repeatInterval
        span Repeat
        input(type="number" v-model="interval.config.constant.intervalCount" min="1" :disabled="interval.type !== 'constant'")
        span Times
    .variable-section(v-if="interval.state === 'waiting'")
      .section-header
        label(for="variable" class="intervalRadio")
          input(type="radio" name="type" value="variable" id="variable" v-model="interval.type")
          span.input
          span.text Variable
        img.icon(src="../images/Icon/AddWhite.svg" @click="addVariableInterval")
      ul.variableIntervals(:disabled="interval.type !== 'variable'" :class="{'invalid': !validInput && interval.type === 'variable'}")
        li(v-for="int in interval.config.variable.intervals" :key="int.id")
          input(v-model="int.time" :disabled="interval.type !== 'variable'").time-style
          img.icon(src="../images/Icon/twotone-delete-24px.svg" @click="removeVariableInterval(int.id)")
    #clock.clock-interval(v-if="interval.state === 'running' || interval.state === 'paused'" :class="{'show-hours': interval.hours !== '00'}").time-style
      transition(name="tick")
        div.number(v-if="interval.hours[0] !== '0'" :key="interval.hours[0]") {{ interval.hours[0] }}
      transition(name="tick")
        div.number(v-if="interval.hours !== '00'" :key="interval.hours[1]") {{ interval.hours[1] }}
      div.colon(v-if="interval.hours !== '00'") :
      transition(name="tick")
        div.number(v-if="interval.currentProgress.format('mm')[0] !== '0' || interval.hours !== '00'" :key="interval.currentProgress.format('mm')[0]") {{ interval.currentProgress.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('mm')[1]") {{ interval.currentProgress.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('ss')[0]") {{ interval.currentProgress.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('ss')[1]") {{ interval.currentProgress.format('ss')[1] }}
    #clock(v-if="interval.state === 'done'" :class="{'alert': alert}").time-style
      div.number 0
      div.colon :
      div.number 0
      div.number 0
    .time-button-section.time-button-section--short
      .time-button(@click="resetInterval" v-if="interval.state !== 'waiting'")
        span Reset
    #fab(@click="startInterval" v-if="interval.state === 'waiting'" :class="{'disabled': !validInput}")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="unpauseInterval" v-else-if="interval.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="pauseInterval" v-else-if="interval.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    #fab(@click="resetInterval" v-else-if="interval.state === 'done'")
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
    ...mapState(['interval', 'alert']),
    percent () {
      if (this.interval.startTimestamp == null || this.interval.state === 'waiting' || this.changed) {
        return 1
      } else if (this.interval.state === 'done') {
        return 0
      } else {
        let begin, end
        if (this.interval.currentInterval === 0) {
          begin = this.interval.startTimestamp
        } else {
          begin = this.interval.intervalTimestamps[this.interval.currentInterval - 1]
        }
        end = this.interval.intervalTimestamps[this.interval.currentInterval]
        return ((this.interval.currentProgress.valueOf() - 1100) / (end.valueOf() - begin.valueOf()))
      }
    },
    validInput () {
      let validInput = true
      if (this.$store.state.interval.type === 'constant') {
        let timerArray = this.$store.state.interval.config.constant.intervalLength.split(':').reverse().slice(0, 3)
        timerArray.forEach((value) => {
          if (isNaN(Number(value))) {
            validInput = false
          }
        })
      } else if (this.$store.state.interval.type === 'variable') {
        this.$store.state.interval.config.variable.intervals.forEach((value) => {
          value.time.split(':').slice(0, 3).forEach((num) => {
            if (isNaN(Number(num))) {
              validInput = false
            }
          })
        })
      }
      return validInput
    }
  },
  watch: {
    'interval.currentInterval': function () {
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
    ...mapMutations({
      pauseInterval: 'interval/pauseInterval',
      addVariableInterval: 'interval/addVariableInterval',
      removeVariableInterval: 'interval/removeVariableInterval'
    }),
    startInterval () {
      if (this.validInput) {
        this.$store.dispatch('interval/startInterval')
      }
    },
    ...mapActions({
      unpauseInterval: 'interval/unpauseInterval',
      resetInterval: 'interval/resetInterval'
    })
  }
}
</script>
