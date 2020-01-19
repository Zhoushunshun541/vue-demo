// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import Video from 'video.js'
import Axios from 'axios'
import store from './store'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
Vue.prototype.$store = store
Vue.prototype.$echarts = echarts
Vue.use(ElementUI)
window.$ = window.jQuery = jquery
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
Axios.defaults.headers.common['token'] = store.state.token
// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    if (store.state.token) {
      config.headers.common['token'] = store.state.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// http response 拦截器
Axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token')
          router.replace({
            path: '/setting/echart',
            query: { redirect: router.currentRoute.fullPath } // 登录成功后跳入浏览的当前页面
          })
      }
    }
    return Promise.reject(error.response.data)
  }
)
