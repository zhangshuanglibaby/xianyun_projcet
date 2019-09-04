export const state = () => ({
  userInfo : {
    token : '',
    user : {}
  }
})

export const mutations = {
  //设置用户信息
  setUserInfo(state,data) {
    state.userInfo = data
  },

  //清除用户信息
  clearUserInfo(state) {
    state.userInfo = {
      token : '',
      user : {}
    }
  }
}

// export const actions = {
//   login({commit},data) {
//     return this.$axios({
//       url : '/accounts/login',
//       method : 'post',
//       data : data
//     }).then(res => {
//       const data = res.data
//       commit('setUserInfo',data)
//       return data
//     })
//   }
// }
