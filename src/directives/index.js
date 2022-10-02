// 定义图片指令
export const imageerror = {
  inserted(dom, options) {
    dom.onerror = function() {
      // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
      dom.src = options.value
    }
  }
}
