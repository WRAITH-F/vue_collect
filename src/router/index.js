import Vue from 'vue'
import Router from 'vue-router'
import directorTree from '@/pages/directorTree'
import calendarSelect from '@/pages/calendarSelect'
import vuePagination from '@/pages/vuePagination'
import imageUploader from '@/pages/imageUploader'
import imgUpload from '@/pages/imgUpload'
import orgTree from '@/pages/orgTree'
import downExcel from '@/pages/downExcel'
import wraithToast from '@/pages/wraithToast'
import test from '@/pages/test'

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
    },
    {
      path: '/imageUploader',
      name: 'imageUploader',
      component: imageUploader
    },
    {
      path: '/imgUpload',
      name: 'imgUpload',
      component: imgUpload
    },
    {
      path: '/orgTree',
      name: 'orgTree',
      component: orgTree
    },
    {
      path: '/downExcel',
      name: 'downExcel',
      component: downExcel
    },
    {
      path: '/wraithToast',
      name: 'wraithToast',
      component: wraithToast
    },
    {
      path: '/test',
      name: 'test',
      component: test
    }
  ]
})
