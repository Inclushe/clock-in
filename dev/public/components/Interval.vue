<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header()
      img(src="../images/Icon/Interval.svg" alt="Interval Icon")
      h2 Interval
    
    #clock(v-if="interval.state === 'running' || interval.state === 'paused'").time-style
      transition(name="tick")
        div.number(v-if="interval.currentProgress.format('mm')[0] !== '0'" :key="interval.currentProgress.format('mm')[0]") {{ interval.currentProgress.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('mm')[1]") {{ interval.currentProgress.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('ss')[0]") {{ interval.currentProgress.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="interval.currentProgress.format('ss')[1]") {{ interval.currentProgress.format('ss')[1] }}
    #fab(@click="startInterval" v-if="interval.state === 'waiting'")
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
  computed: {
    ...mapState(['interval'])
  },
  methods: {
    ...mapMutations({pauseInterval: 'interval/pauseInterval'}),
    ...mapActions({
      startInterval: 'interval/startInterval',
      unpauseInterval: 'interval/unpauseInterval',
      resetInterval: 'interval/resetInterval'
    })
  }
}
</script>
