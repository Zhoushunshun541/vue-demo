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
      path: '/success',
      name: 'success',
      component: layout,
      children: [{
        path: '/success',
        component: (resolve) => require(['../views/success.vue'], resolve)
      }]
    }
  ]
})
