<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #meridiem {{ currentTime.format('A') }}
    #clock
      div.number(v-if="currentTime.format('hh')[0] !== '0'") {{ currentTime.format('hh')[0] }}
      div.number {{ currentTime.format('hh')[1] }}
      div.colon :
      div.number {{ currentTime.format('mm')[0] }}
      div.number {{ currentTime.format('mm')[1] }}
    #seconds(v-show="settings.showSeconds") {{ currentTime.format('ss') }}
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
