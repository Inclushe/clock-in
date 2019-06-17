<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #meridiem(v-if="settings.clockType === 12") {{ currentTime.format('A') }}
    #clock.time-style
      transition(name="tick")
        div.number(v-if="settings.clockType === 24" :key="currentTime.format('HH')[0]") {{ currentTime.format('HH')[0] }}
      transition(name="tick")
        div.number(v-if="settings.clockType === 24" :key="currentTime.format('HH')[1]") {{ currentTime.format('HH')[1] }}
      transition(name="tick")
        div.number(v-if="settings.clockType === 12 && currentTime.format('hh')[0] !== '0'" :key="currentTime.format('hh')[0]") {{ currentTime.format('hh')[0] }}
      transition(name="tick")
        div.number(v-if="settings.clockType === 12" :key="currentTime.format('hh')[1]") {{ currentTime.format('hh')[1] }}
      div.colon :
      transition(name="tick" :key="currentTime.format('mm')[0]")
        div.number(:key="currentTime.format('mm')[0]") {{ currentTime.format('mm')[0] }}
      transition(name="tick" :key="currentTime.format('mm')[1]")
        div.number(:key="currentTime.format('mm')[1]") {{ currentTime.format('mm')[1] }}
    #seconds(v-show="settings.showSeconds")
      transition(name="tick")
        div(:key="currentTime.format('ss')[0]") {{ currentTime.format('ss')[0] }}
      transition(name="tick")
        div(:key="currentTime.format('ss')[1]") {{ currentTime.format('ss')[1] }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: mapState(['currentTime', 'settings'])
}
</script>
