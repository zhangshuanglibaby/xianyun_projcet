//管理历史查询的数据

export const state = () => ({
  airs : []
})

export const mutations = {
  setAirsData(state, data) {
    state.airs.push(data)
  }
}
