import qs from 'qs'
import axios from 'axios'
var instance = axios.create({
  baseURL: '/',
  timeout: 10000
})
instance.defaults.headers.common['Token'] = window.localStorage.getItem('token')

// 添加请求拦截器
instance.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 判断是否存在token，如果存在将每个页面header都添加token
    // if (store.state.token) {
    config.headers.common['Token'] = window.localStorage.getItem('token')
    console.log(config)
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http response 拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error)
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token')
      }
    }
    return Promise.reject(error.response.data)
  }
)
export const getAllUser = params => {
  return instance.post('/api/login/login', qs.stringify(params))
}

export const testName = params => {
  return instance.post('/api/login/testName', qs.stringify(params))
}
