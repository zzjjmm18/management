// 公共的组件的全局注册
import PageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ThemePicker from './ThemePicker'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools) // 注册工具栏组件
    Vue.component('UploadExcel', UploadExcel) // 注册导入excel组件
    Vue.component('ThemePicker', ThemePicker) // 注册修改主题颜色组件
  }
}
