import Vue from 'vue'
import Router from 'vue-router'
import directorTree from '@/pages/directorTree'
import calendarSelect from '@/pages/calendarSelect'
import vuePagination from '@/pages/vuePagination'

Vue.use(Router)

export default new Router({
  mode: 'history', //去掉路径中的#号
  routes: [{
      path: "/",
      name: "directorTree",
      redirect: "directorTree",
      component: directorTree,
      //路由重定向
    },
    {
      path: '/directorTree',
      name: 'directorTree',
      component: directorTree,
    },
    {
      path: '/calendarSelect',
      name: 'calendarSelect',
      component: calendarSelect
    },
     {
      path: '/vuePagination',
      name: 'vuePagination',
      component: vuePagination
    }
  ]
})
