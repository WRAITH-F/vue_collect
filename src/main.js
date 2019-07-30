// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTree from './components/directorTree/index.js'
import calendar from './components/calendar/index.js'
import pagination from './components/vuePagination/index.js'
import ImageUploaderPlugin from './components/ImageUploader/index.js'
import OrgTree from './components/orgTree/index.js'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(VueTree)
Vue.use(calendar)
Vue.use(pagination)
Vue.use(ImageUploaderPlugin)
Vue.use(OrgTree)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
