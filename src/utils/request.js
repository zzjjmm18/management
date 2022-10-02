import axios from 'axios'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基地址
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use()

export default service
