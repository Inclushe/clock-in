<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #meridiem(v-if="alarm.state === 'done'") {{ currentTime.format('A') }}
    #clock.time-style(v-if="alarm.state === 'done'" :class="{'alert': alert}")
      transition(name="tick")
        div.number(v-if="currentTime.format('hh')[0] !== '0'" :key="currentTime.format('hh')[0]") {{ currentTime.format('hh')[0] }}
      transition(name="tick")
        div.number(:key="currentTime.format('hh')[1]") {{ currentTime.format('hh')[1] }}
      div.colon :
      transition(name="tick" :key="currentTime.format('mm')[0]")
        div.number(:key="currentTime.format('mm')[0]") {{ currentTime.format('mm')[0] }}
      transition(name="tick" :key="currentTime.format('mm')[1]")
        div.number(:key="currentTime.format('mm')[1]") {{ currentTime.format('mm')[1] }}
    #header(v-if="alarm.state === 'waiting'")
      div
        img(src="../images/Icon/Alarm.svg" alt="Alarm Icon")
        h2 Alarm
    .alarms(v-if="alarm.state === 'waiting'")
      ul
        transition-group(name="list" mode="out-in")
          li(v-if="alarm.alarms.length === 0" v-bind:key="1")
            h3 Add an alarm on the right.
          li(v-for="alarm in alarm.alarms" v-bind:key="alarm.id")
            label.alarm-toggle(:for="alarm.id")
              input(type="checkbox" :id="alarm.id" v-model="alarm.enabled")
              span
            span.time-style {{ alarm.relativeTime }}
            span.meridiem {{ alarm.relativeMeridiem }}
            a(@click="removeAlarm(alarm.id)")
              img.icon.icon--delete(src="../images/Icon/twotone-delete-24px.svg" alt="Delete Icon")
    .alarm-section(v-if="alarm.state === 'waiting'")
      .alarm-section_header
        h2 ADD ALARM
    .input.input--alarm(v-if="alarm.state === 'waiting'")
      input#input(v-model="input")
    .meridiem-radio-section(v-if="alarm.state === 'waiting'")
      label.label.label--am(for="am")
        input.meridiem-radio#am(v-model="meridiem" type="radio" name="meridiem" value="AM" checked)
        span AM
      label.label.label--pm(for="pm")
        input.meridiem-radio#pm(v-model="meridiem" type="radio" name="meridiem" value="PM")
        span PM
    #fab(@click="addAlarm" v-if="alarm.state === 'waiting'")
      img(src="../images/Icon/Add.svg" alt="Add Icon")
    #fab(@click="stopAlarm" v-if="alarm.state === 'done'")
      img(src="../images/Icon/Stop.svg" alt="Stop Icon")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import dayjs from 'dayjs'

export default {
  data () {
    return {
      input: '5:34',
      meridiem: 'PM'
    }
  },
  computed: {
    ...mapState(['currentTime', 'alarm', 'alert'])
  },
  methods: {
    addAlarm () {
      this.$store.dispatch('alarm/addAlarm', {
        relativeTime: this.input,
        relativeMeridiem: this.meridiem,
        enabled: true
      })
      this.input = ''
    },
    ...mapActions({ stopAlarm: 'alarm/stopAlarm' }),
    ...mapMutations({removeAlarm: 'alarm/removeAlarm'})
  }
}
</script>
