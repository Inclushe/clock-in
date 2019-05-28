import VueRouter from 'vue-router'
import Clock from '../components/Clock.vue'
import Timer from '../components/Timer.vue'
import Stopwatch from '../components/Stopwatch.vue'
import Alarm from '../components/Alarm.vue'
import Pomodoro from '../components/Pomodoro.vue'
import Interval from '../components/Interval.vue'

const routes = [
  { path: '/', component: Clock },
  { path: '/timer', component: Timer },
  { path: '/stopwatch', component: Stopwatch },
  { path: '/alarm', component: Alarm },
  { path: '/pomodoro', component: Pomodoro },
  { path: '/interval', component: Interval },
]

export default new VueRouter({ routes })