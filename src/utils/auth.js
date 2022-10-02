import Cookies from 'js-cookie'

const TokenKey = 'manage_token' // 设置一个独一无二的token

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
