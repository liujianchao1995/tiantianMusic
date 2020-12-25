export default {
  namespaced: true,
  state: {
    musicListType: '00', // 00:搜索列表 01:专辑列表
    musicListData: []
  },
  getters: {
    musicListType: state => state.musicListType,
    musicListData: state => state.musicListData
  },
  mutations: {
    musicListData (state, val) {
      state.musicListData = val
    },
    'SET_MUSIC_LIST_TYPE' (state, val) {
      state.musicListType = val
    }
  },
  actions: {

  }
}
