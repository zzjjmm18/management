import request from '@/utils/request'

/**
 * 登录
 */
export function login(data) {
  // 返回一个axios对象 promise对象
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request()
}

export function logout() {
  return request()
}
