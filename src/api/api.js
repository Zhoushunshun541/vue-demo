import qs from 'qs'
import axios from 'axios'
import store from '../store'
var instance = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

axios.defaults.headers.common['Authentication-Token'] = store.state.token

export const getAllUser = params => {
  return instance.post('/login/login', qs.stringify(params))
}

export const testName = params => {
  return instance.post('/login/testName', qs.stringify(params))
}
