import axios from 'axios'


// 封装的好处是：只需要在这里导入一次axios
// 并且，所有的请求都是在这一个函数里面进行的
// 如果更换请求插件的话，将会非常方便
export function request(config) {
  // 1. 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/wh',
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