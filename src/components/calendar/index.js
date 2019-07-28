import calendar from './calendar.vue'

calendar.install = function (Vue) {
  Vue.component('vue-calendar', calendar)
}

export default calendar
