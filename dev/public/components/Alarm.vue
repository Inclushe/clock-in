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
      img(src="../images/Icon/Alarm.svg" alt="Alarm Icon")
      h2 Alarm
    .alarms(v-if="alarm.state === 'waiting'")
      ul
        li(v-for="alarm in alarm.alarms") {{ alarm.time }}
    .alarm-section(v-if="alarm.state === 'waiting'")
      .alarm-section_header
        h2 ADD ALARM
    .input.input--alarm(v-if="alarm.state === 'waiting'")
      input#input(v-model="input")
    .meridiem-radio-section(v-if="alarm.state === 'waiting'")
      input.meridiem-radio.am(v-model="meridiem" type="radio" name="meridiem" value="AM" checked)
      input.meridiem-radio.pm(v-model="meridiem" type="radio" name="meridiem" value="PM")
    #fab(@click="addAlarm" v-if="alarm.state === 'waiting'")
      img(src="../images/Icon/Add.svg" alt="Add Icon")
    #fab(@click="stopAlarm" v-if="alarm.state === 'done'")
      img(src="../images/Icon/Stop.svg" alt="Stop Icon")
</template>

<script>
import { mapState, mapActions } from 'vuex'
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
      let inputArray = this.input.split(':')
      let hours = parseInt(inputArray[0])
      // @TODO: Possible bug handling 12 hour
      // @TODO: Time should not be handled as dayjs (from today)
      hours = this.meridiem === 'AM' ? hours : hours + 12
      hours = hours.toString()
      hours = hours.length === 1 ? '0' + hours : hours
      let minutes = parseInt(inputArray[1])
      let alarmTime = dayjs(dayjs().format(`YYYY-MM-DDT${hours}:${minutes}:00.000`))
      let diff = alarmTime.diff(dayjs())
      if (diff <= 0) {
        alarmTime = alarmTime.add(1, 'day')
      }
      console.log(alarmTime.format(`YYYY-MM-DD hh:mm A`))
      this.$store.dispatch('alarm/addAlarm', {
        time: alarmTime,
        enabled: true
      })
    },
    ...mapActions({ stopAlarm: 'alarm/stopAlarm' })
  }
}
</script>
