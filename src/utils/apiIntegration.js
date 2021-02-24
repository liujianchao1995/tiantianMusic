/* const miguMusic = {
  searchList: 'https://m.music.migu.cn/migu/remoting/scr_search_tag',
  searchInstant: 'https://music.migu.cn/v3/api/search/suggest',
  lrc: 'https://music.migu.cn/v3/api/music/audioPlayer/getLyric'
}

const qqMusic = {
  searchList: 'https://m.music.migu.cn/migu/remoting/scr_search_tag',
  searchInstant: 'https://music.migu.cn/v3/api/search/suggest',
  lrc: 'https://music.migu.cn/v3/api/music/audioPlayer/getLyric'
}

const neteaseCloudMusic = {
  searchList: 'https://m.music.migu.cn/migu/remoting/scr_search_tag',
  searchInstant: 'https://music.migu.cn/v3/api/search/suggest',
  lrc: 'https://music.migu.cn/v3/api/music/audioPlayer/getLyric'
} */

export const search = async ({ apiType = 'miguMusic', params = {}, method = 'get' }) => {
  switch (apiType) {
    case 'miguMusic':
      console.log(this)
      break
    case 'qqMusic':
      break
    case 'neteaseCloudMusic':
      break
  }
}
