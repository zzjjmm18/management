// 导出员工的路由规则
// 子模块 外层是layout  组件位于layout的二级路由里面
import Layout from '@/layout'
export default {
  path: '/employees', // 路径
  name: 'employees', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/employees'),
    // 路由元信息  其实就是存储数据的对象
    meta: {
      title: '员工管理',
      icon: 'people'
    }
  }]
}
