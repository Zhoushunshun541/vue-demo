import Vue from 'vue'
import Router from 'vue-router'
import store from '../store.js'
import {
  layout
} from '../layout'
Vue.use(Router)

// 此Router是自己自定义引入暴露出来的，即是自定义的，以下的Router同样是这样
// 解决两次访问相同路由地址报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['../login'], resolve),
      meta: {
        title: '登录',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['../login'], resolve),
      meta: {
        title: '登录',
        keepAlive: false // 不需要被缓存
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: layout,
      children: [{
        path: '/echart',
        name: 'echart',
        component: (resolve) => require(['../views/echart.vue'], resolve)
      }, {
        path: '/video',
        name: 'video',
        component: (resolve) => require(['../views/video.vue'], resolve)
      }, {
        path: '/dynamicEchart',
        name: 'dynamicEchart',
        component: (resolve) => require(['../views/dynamicEchart.vue'], resolve)
      }]
    }
  ]
})
// 页面刷新时，重新赋值token
if (localStorage.getItem('token')) {
  store.commit('set_token', localStorage.getItem('token'))
}

// 路由跳转之前 对下一页  to 所去的路由界面判断   如果是login  就继续  next
// 如果不是login  就先判断是否有token   有 继续  无 到login
routes.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/') {
    store.commit('del_token')
    next()
  } else {
    let token = localStorage.getItem('token')
    if (token === null || token === '') {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  }
})

export default routes
