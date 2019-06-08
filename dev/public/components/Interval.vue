<template lang="pug">
  div.section-container
    #border
      include ../images/border.svg
    #header(v-if="interval.state === 'waiting'")
      div
        img(src="../images/Icon/Interval.svg" alt="Interval Icon")
        h2 Interval
    .constant-section
      label(for="constant" class="intervalRadio")
        input(type="radio" name="type" value="constant" id="constant" v-model="interval.type")
        span.input
        span.text Constant
      .input.input--interval(v-if="interval.state === 'waiting'" @keydown.enter="startInterval" :disabled="interval.type !== 'constant'")
        input#input(type="text" v-model="interval.config.constant.intervalLength" :disabled="interval.type !== 'constant'")
      .repeatInterval
        span Repeat
        input(type="number" v-model="interval.config.constant.intervalCount" min="1" :disabled="interval.type !== 'constant'")
        span Times
    .variable-section
      label(for="variable" class="intervalRadio")
        input(type="radio" name="type" value="variable" id="variable" v-model="interval.type")
        span.input
        span.text Variable
      button(@click="addVariableInterval") Add Interval
      ul.variableIntervals
        li(v-for="int in interval.config.variable.intervals" :key="int.id")
          input(v-model="int.time")
          button(@click="removeVariableInterval(int.id)") delet this
    
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
    ...mapMutations({
      pauseInterval: 'interval/pauseInterval',
      addVariableInterval: 'interval/addVariableInterval',
      removeVariableInterval: 'interval/removeVariableInterval'
    }),
    ...mapActions({
      startInterval: 'interval/startInterval',
      unpauseInterval: 'interval/unpauseInterval',
      resetInterval: 'interval/resetInterval'
    })
  }
}
</script>
