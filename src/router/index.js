import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: (resolve) => require(['../login'], resolve)
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../login'], resolve)
    }
  ]
})
