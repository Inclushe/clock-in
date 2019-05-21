<template lang="pug">
  .settings(v-show="settingsToggle")
    h1
      include ../images/Icon/Settings.svg
      span Settings
    h2 General
    h2 Clock
    input(type="checkbox" v-model="settings.showSeconds" id="showSeconds")
    label(for="showSeconds") Show Seconds
    h3 
      a(@click="toggleSettings") Close
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: mapState(['settingsToggle', 'settings']),
  methods: mapMutations(['toggleSettings'])
}
</script>
