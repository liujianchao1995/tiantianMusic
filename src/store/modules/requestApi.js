export default {
  namespaced: true,
  state: {
    search: {
      Migu: 'https://m.music.migu.cn/migu/remoting/scr_search_tag',
      QQ: '',
      NeteaseCloud: '',
      KuGou: '',
      KuWo: ''
    },
    searchInstant: {
      Migu: 'https://music.migu.cn/v3/api/search/suggest',
      QQ: '',
      NeteaseCloud: '',
      KuGou: '',
      KuWo: ''
    },
    hotwords: {
      Migu: 'https://music.migu.cn/v3/api/search/hotwords',
      QQ: '',
      NeteaseCloud: '',
      KuGou: '',
      KuWo: ''
    },
    getLrc: {
      Migu: 'https://music.migu.cn/v3/api/music/audioPlayer/getLyric',
      QQ: '',
      NeteaseCloud: '',
      KuGou: '',
      KuWo: ''
    },
    getMP3: {
      Migu: '',
      QQ: '',
      NeteaseCloud: '',
      KuGou: '',
      KuWo: ''
    }
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
