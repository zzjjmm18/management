import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
const TimeOut = 3600 // 定义超时时间

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基地址
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(config => {
  // 判断是否有token
  if (store.getters.token) {
    // 有token 检查时间戳是否超时
    if (IsCheckTimeOut()) {
      // 超时了 token没用了 登出操作
      store.dispatch('user/logout')
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }
    // 统一注入token
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  return config // 必须返回配置
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // 解构获得的响应数据
  const { success, message, data } = response.data
  // 判断是否获取成功
  if (success) {
    // 获取成功，返回数据
    return data
  } else {
    // 获取失败
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  Message.error(error.message) // 提示错误信息
  return Promise.reject(error) // 返回执行错误
})

// 是否超时
// 超时逻辑  (当前时间  - 缓存中的时间) 是否大于 时间差
function IsCheckTimeOut() {
  var currentTime = Date.now() // 当前时间戳
  var timeStamp = getTimeStamp() // 缓存时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

export default service
