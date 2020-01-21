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
import store from './store.js'
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
  store: store,
  components: { App },
  template: '<App/>'
})
