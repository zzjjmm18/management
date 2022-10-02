import Layout from '@/layout'
export default {
  path: '/attendances', // 路径
  name: 'attendances', // 给路由规则加一个name
  component: Layout, // 组件
  // 配置二级路的路由表
  children: [{
    path: '', // 二级路由的默认路由
    component: () => import('@/views/attendances'),
    // 路由元信息  其实就是存储数据的对象
    meta: {
      title: '考勤',
      icon: 'skill'
    }
  }]
}
