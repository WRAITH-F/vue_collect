import Vue from 'vue'
import Router from 'vue-router'
import directorTree from '@/components/directorTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'directorTree',
      component: directorTree
    }
  ]
})
