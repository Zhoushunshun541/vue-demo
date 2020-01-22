import qs from 'qs'
import axios from 'axios'
import store from '../store'
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
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加回应拦截器
instance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit('del_token')
          break
      }
    }
    return Promise.reject(error.response)
  }
)
export const getAllUser = params => {
  return instance.post('/api/login/login', qs.stringify(params))
}

export const testName = params => {
  return instance.post('/api/login/testName', qs.stringify(params))
}
// 文件上传
export const uploadFile = params => {
  console.log(instance.defaults)
  instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  return instance.post('/api/upload', params)
}
