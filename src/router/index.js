import Vue from 'vue'
import Router from 'vue-router'
import {
  layout
} from '../layout'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['../login'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../login'], resolve)
    },
    {
      path: '/setting',
      name: 'setting',
      component: layout,
      children: [{
        path: 'echart',
        name: 'echart',
        component: (resolve) => require(['../views/echart.vue'], resolve)
      }, {
        path: 'video',
        name: 'video',
        component: (resolve) => require(['../views/video.vue'], resolve)
      }]
    }
  ]
})
