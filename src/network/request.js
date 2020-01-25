import axios from 'axios'

export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://106.54.54.237:8000/api/hy',
    timeout: 5000
  })

  // 2.创建拦截器 请求拦截
  instance.interceptors.request.use(config => {
    return config
  },err => {
    console.log(err)
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}