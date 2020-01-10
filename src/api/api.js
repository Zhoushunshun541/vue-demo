import qs from 'qs'
import axios from 'axios'
var instance = axios.create({
  baseURL: process.env.BASE_API
})

export const getAllUser = params => {
  return instance.post('/login/login', qs.stringify(params))
}
