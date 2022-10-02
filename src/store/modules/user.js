import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

// 状态
const state = {
  token: getToken() // 设置token初始状态
}

// 修改状态
const mutations = {
  // 设置token
  setToken(state, token) {
    state.token = token // 设置token
    setToken(token) // vuex和 缓存数据的同步
  },
  // 删除缓存token
  removeToken(state) {
    state.token = null // 删除vuex的token
    removeToken() // vuex和 缓存数据的同步
  }
}

// 异步操作
const actions = {
  // 登录
  async login(context, data) {
    const result = await login(data)
    // axios默认给数据加了一层data
    // if (result.data.success) { // 执行到此时已经经过了响应拦截器
    // 登录接口调用成功
    // 有用户token
    // actions通过mutations修改state
    context.commit('setToken', result)
    // }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

