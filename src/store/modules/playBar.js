export default {
  namespaced: true,
  state: {
    currentMusic: {
      id: '',
      cid: '',
      name: '',
      src: '',
      imgSrc: '',
      singer: '',
      album: '',
      duration: '',
      lrcSrc: ''
    },
    playList: [],
    playCtrl: {
      volume: 0,
      isPlay: false,
      progress: 0,
      playedTime: 0
    },
    lyric: '',
    current_lyric: null, // 当前播放歌词
    current_lyric_line: 0 // 当前播放歌词索引
  },
  getters: {
    currentPlay: state => state.currentPlay,
    playList: state => state.playList,
    lyric: state => state.lyric,
    current_lyric: state => state.current_lyric,
    current_lyric_line: state => state.current_lyric_line
  },
  mutations: {
    'SET_VOLUME' (state, val) {
      state.playCtrl.volume = val
    },
    'IS_PLAY' (state, val) {
      state.playCtrl.isPlay = val
    },
    'SET_PROGRESS' (state, val) {
      state.playCtrl.progress = val
    },
    'TOGGLE_MUSIC' (state, val) {
      state.currentMusic = val
    },
    'SET_LYRIC' (state, lyric) {
      state.lyric = lyric
    },
    'SET_CURRENT_LYRIC' (state, lyric) {
      state.current_lyric = lyric
    },
    'SET_CURRENT_LYRIC_LINE' (state, line) {
      state.current_lyric_line = line
    }
  },
  actions: {
    setLyric ({ commit }, lyric) {
      commit('SET_LYRIC', lyric)
    }
  }
}
