//封装了所有的自定义指令


//表格的控件聚焦
export const myfocus = {
  inserted (el) {
    el.children[0].focus()
  }
}
