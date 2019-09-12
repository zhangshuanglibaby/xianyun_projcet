//管理攻略页面的数据

export const state = () => ({
  //定义存储草稿箱标题
  draftsTitle : []
})

export const mutations = {
  //设置草稿箱标题
  setDraftsTitle(state,data) {
    state.draftsTitle = data
  }
}
