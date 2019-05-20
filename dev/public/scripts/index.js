import Vue from 'vue'

if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload()
  })
}

Vue.config.productionTip = false

var test = new Vue({
  el: '#app',
  data: {
    message: 'Hello world!'
  }
})

console.log('hello')
