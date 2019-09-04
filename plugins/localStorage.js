//这个插件可以把store保存到本地

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
// console.log(obj)
  window.onNuxtReady(() => {
    createPersistedState({
        key: 'store',
        paths: []
    })(store)
  })
}