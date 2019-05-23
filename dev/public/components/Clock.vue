<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #meridiem {{ currentTime.format('A') }}
    #clock
      transition(name="tick")
        div.number(v-if="currentTime.format('hh')[0] !== '0'" :key="currentTime.format('hh')[0]") {{ currentTime.format('hh')[0] }}
      transition(name="tick")
        div.number(:key="currentTime.format('hh')[1]") {{ currentTime.format('hh')[1] }}
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
