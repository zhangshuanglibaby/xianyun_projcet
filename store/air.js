//管理历史查询的数据

export const state = () => ({
  airs : [],
  orderInfo : {
    seat_infos : {}
  },
  //总价钱
  allPrice : 0
})

export const mutations = {
  setAirsData(state, data) {
    state.airs.push(data)
  },
  setOrderInfo(state,data) {
    state.orderInfo = data
  },
  setAllPrice(state,data) {
    state.allPrice = data
  }
}
