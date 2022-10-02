import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'
import { login, getUserInfo, getUserDetailById } from '@/api/user'

// 状态
const state = {
  token: getToken(), // 设置token初始状态
  userInfo: {} // 设置用户基本信息的对象
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
  },
  // 设置用户基本信息
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  // 删除用户基本信息
  removeUserInfo(state) {
    state.userInfo = {} // 重置为空对象
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
    // 写入时间戳
    setTimeStamp()
    // }
  },
  // 获取用户资料
  async getUserInfo(context) {
    const baseInfo = await getUserInfo() // 获取用户基本信息
    const baseAvater = await getUserDetailById(baseInfo.userId) // 为了获取头像
    const result = { ...baseInfo, ...baseAvater } // 将两个接口结果合并
    context.commit('setUserInfo', result)
    return result
  },
  // 登出
  logout(context) {
    // 删除token
    context.commit('removeToken')
    // 删除用户资料
    context.commit('removeUserInfo')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

