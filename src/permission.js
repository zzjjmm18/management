import router from '@/router' // 引入路由实例
import store from '@/store' // 引入vuex store实例
import NProgress from 'nprogress' // 引入进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面

// 路由的前置守卫
router.beforeEach(async function(to, from, next) {
  NProgress.start() // 开启进度条
  //  判断有无token
  if (store.getters.token) {
    // 有token
    // 判断是否去登录页
    if (to.path === '/login') {
      //  是登录页 跳到主页
      next('/')
    } else {
      // 不是登录页
      // 判断是否有用户id
      if (!store.getters.userId) {
        // 如果没有id这个值 才会调用 vuex的获取资料的action
        const { roles } = await store.dispatch('user/getUserInfo')
        // routes是当前用户的所拥有的的动态路由的权限
        const routes = await store.dispatch('permission/filterRoutes', roles.menus)
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      }
      // 直接放行
      next()
    }
  } else {
    // 没有token
    // 判断要去的页面是否在白名单里面
    if (whiteList.indexOf(to.path) > -1) {
      // 在白名单里面 直接放行
      next()
    } else {
      // 不在白名单里面，跳到登录页
      next('/login')
    }
  }
  // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
  NProgress.done()
})

// 路由的后置守卫
router.afterEach(function() {
  NProgress.done() // 关闭进度条
})
