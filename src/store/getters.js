const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token, // 设置token的映射
  name: state => state.user.userInfo.username, // 设置用户名称的映射
  staffPhoto: state => state.user.userInfo.staffPhoto // 设置用户头像的映射
  // companyId: state => state.user.userInfo.companyId // 设置companyId的映射

}
export default getters
