<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header(v-if="pomodoro.state === 'waiting'")
      div
        img(src="../images/Icon/Pomodoro.svg" alt="Pomodoro Icon")
        h2 Pomodoro
      div
        span Edit your preferred intervals in Settings.
    #pomodoroPreview.time-style(v-if="pomodoro.state === 'waiting'")
      div.number {{ pomodoro.config.workLength.toString()[0] }}
      div.number {{ pomodoro.config.workLength.toString()[1] }}
      div.colon :
      div.number 0
      div.number 0
    #clock(v-if="pomodoro.state === 'running' || pomodoro.state === 'paused'").time-style
      transition(name="tick")
        div.number(v-if="pomodoro.currentProgress.format('mm')[0] !== '0'" :key="pomodoro.currentProgress.format('mm')[0]") {{ pomodoro.currentProgress.format('mm')[0] }}
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('mm')[1]") {{ pomodoro.currentProgress.format('mm')[1] }}
      div.colon :
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('ss')[0]") {{ pomodoro.currentProgress.format('ss')[0] }}
      transition(name="tick")
        div.number(:key="pomodoro.currentProgress.format('ss')[1]") {{ pomodoro.currentProgress.format('ss')[1] }}
    #fab(@click="startPomodoro" v-if="pomodoro.state === 'waiting'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="unpausePomodoro" v-else-if="pomodoro.state === 'paused'")
      img(src="../images/Icon/Play.svg" alt="Play Icon")
    #fab(@click="pausePomodoro" v-else-if="pomodoro.state === 'running'")
      img(src="../images/Icon/Pause.svg" alt="Pause Icon")
    #fab(@click="resetPomodoro" v-else-if="pomodoro.state === 'done'")
      img(src="../images/Icon/Stop.svg" alt="Stop Icon")
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['pomodoro'])
  },
  methods: {
    ...mapMutations({pausePomodoro: 'pomodoro/pausePomodoro'}),
    ...mapActions({
      startPomodoro: 'pomodoro/startPomodoro',
      unpausePomodoro: 'pomodoro/unpausePomodoro',
      resetPomodoro: 'pomodoro/resetPomodoro'
    })
  }
}
</script>
