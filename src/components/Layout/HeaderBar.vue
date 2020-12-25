<template>
  <div :class="['header-bar', { 'no-drag': isShowSearchPanel }]">
    <div class="search-group">
      <div class="history-navigation">
        <i class="iconfont" />
        <i class="iconfont" />
      </div>
      <div class="search-input">
        <input
          ref="searchIpt"
          v-model="searchKeyword"
          class="search-input-box"
          type="text"
          :placeholder="defaultKeyword"
          @focus="searchIptEvent('focus', $event)"
          @blur="searchIptEvent('blur', $event)"
          @input="searchIptEvent('input', $event)"
          @keydown.enter="searchMusicBtn"
        >
        <i class="iconfont iconsousuo" @click="searchMusicBtn" />
        <div
          v-if="isShowSearchPanel && !searchKeyword"
          v-click-outside="{func:hideSearchPanel,param:'searchPanel'}"
          class="search-result-panel defult-keyword"
        >
          <div class="search-result-list">
            <div class="search-panel-title">
              热门搜索
            </div>
            <div class="search-panel-content">
              <p v-for="(item, index) in searchPanelData.result" :key="index" @click="clickSearchPanel(item)">
                <span>{{ item.word }}</span>
                <span>{{
                  (item.note - (item.note % 1000)) / 10000 + "万"
                }}</span>
              </p>
            </div>
          </div>
          <div class="search-history-list">
            <div class="search-panel-title">
              搜索历史
            </div>
            <div class="search-panel-content">
              <p v-for="(item, index) in searchPanelData.history" :key="index" @click="clickSearchPanel(item)">
                <span>{{ item.word }}</span>
              </p>
            </div>
            <div class="search-history-clear">
              清空
            </div>
          </div>
        </div>
        <div
          v-else-if="isShowSearchPanel && searchKeyword"
          v-click-outside="{func:hideSearchPanel,param:'searchPanel'}"
          class="search-result-panel has-keyword"
        >
          <div v-show="searchResultData.songs.length" class="has-keyword-panel">
            <div class="has-keyword-title">
              <i class="iconfont iconmusic" /> <span>歌曲</span>
            </div>
            <div class="has-keyword-result">
              <div v-for="(item, index) in searchResultData.songs" :key="index" @click="clickSearchPanel(item)">
                {{ `${item.name} - ${item.singerName}` }}
              </div>
            </div>
          </div>
          <div v-show="searchResultData.singers.length" class="has-keyword-panel">
            <div class="has-keyword-title">
              <i class="iconfont iconyonghu" /> <span>歌手</span>
            </div>
            <div class="has-keyword-result">
              <div
                v-for="(item, index) in searchResultData.singers"
                :key="index"
                @click="clickSearchPanel(item)"
              >
                {{ item.name }}
              </div>
            </div>
          </div>
          <div v-show="searchResultData.albums.length" class="has-keyword-panel">
            <div class="has-keyword-title">
              <i class="iconfont iconzhuanjiguangpan" /> <span>专辑</span>
            </div>
            <div class="has-keyword-result">
              <div
                v-for="(item, index) in searchResultData.albums"
                :key="index"
                @click="clickSearchPanel(item)"
              >
                {{ `${item.name} - ${item.singerName}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-action">
      <div class="app-action-button" @click="win.minimize()">
        <svg-icon icon-class="app-hidden" />
      </div>
      <div class="app-action-button" @click="autoMaximize()">
        <svg-icon icon-class="app-fullsize" />
      </div>
      <div class="app-action-button button-red" @click="win.close()">
        <svg-icon icon-class="app-exit" />
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from 'electron'
export default {
  name: 'HeaderBar',
  data () {
    return {
      win: remote.getCurrentWindow(),
      originSize: true,
      searchKeyword: '',
      defaultKeyword: '周杰伦',
      isShowSearchPanel: false,
      searchPanelData: {
        result: [],
        history: [
          {
            word: '撒打算大所多撒多所大多'
          },
          {
            word: '撒打算大'
          },
          {
            word: '撒打算大所多撒多所大多啊实打实多奥术大师多撒多'
          }
        ]
      },
      searchResultData: {
        songs: [],
        singers: [],
        albums: []
      }
    }
  },
  mounted () {
    ipcRenderer.send('updateApp')
    ipcRenderer.on('updateAppReturn', (e, res) => {
      console.log(res)
      if (res.status === 'isUpdateNow') {
        if (confirm('检测到应用有更新版本，是否现在更新？')) {
          ipcRenderer.send('updateAppNow')
        }
      }
    })
  },
  methods: {
    hideSearchPanel (e) {
      if (e.param === 'searchPanel' && e.event.toElement.className !== 'search-input-box') this.isShowSearchPanel = false
    },
    async searchIptEvent (e, target) {
      switch (e) {
        case 'focus':
        /* falls through */
        case 'input':
          this.isShowSearchPanel = true
          if (!this.searchKeyword) {
            const hotSearch = await this.$axios.get('https://music.migu.cn/v3/api/search/hotwords')
            this.searchPanelData.result = hotSearch.data.hotwords[0].hotwordList.map(({ note, word }) => ({ note, word }))
            this.searchPanelData.result.splice(0, 1)
            this.searchPanelData.result.splice(11, this.searchPanelData.result.length)
          } else {
            const searchResult = await this.$axios.get(
              'https://music.migu.cn/v3/api/search/suggest',
              {
                params: {
                  keyword: this.searchKeyword
                }
              }
            )
            this.searchResultData = {
              songs: searchResult.data.songs ? searchResult.data.songs.map(({ id, name, singerName }) => ({ id, name, singerName })) : [],
              singers: searchResult.data.singers ? searchResult.data.singers.map(({ id, name }) => ({ id, name })) : [],
              albums: searchResult.data.albums ? searchResult.data.albums.map(({ id, name, singerName }) => ({ id, name, singerName })) : []
            }
          }
          break
      }
    },
    async clickSearchPanel (data) {
      this.searchKeyword = data.name || data.word
      this.isShowSearchPanel = false
      this.searchMusicBtn()
    },
    async searchMusicBtn () {
      this.searchKeyword = this.searchKeyword || this.defaultKeyword
      const searchResultList = await this.$axios.get(
        'https://m.music.migu.cn/migu/remoting/scr_search_tag',
        {
          params: {
            rows: 20, // 每页长度
            type: 2, // 1: 歌手图片 2: 歌曲列表
            keyword: this.searchKeyword,
            pgc: 1 // 当前页码
          }
        }
      )
      this.$store.commit('musicList/musicListData', searchResultList.musics || [])
    },
    autoMaximize () {
      if (this.originSize) this.win.maximize()
      else this.win.restore()
      this.originSize = !this.originSize
    }
  }
}
</script>
<style lang="less" scoped>
.header-bar {
  flex: 1;
  background: #f6f6f6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  &.no-drag {
    -webkit-app-region: no-drag;
  }
  .layout-action {
    font-size: 16px;
    display: flex;
    -webkit-app-region: no-drag;
    text-align: center;

    .app-action-button {
      padding: 0 8px;
      color: #7b7b7b;
      transition: 0.2s ease;
      opacity: 0.7;
      line-height: 32px;
      &:hover {
        background-color: #436677;
        opacity: 1;
      }
      &:active {
        background-color: #3a4a52;
      }
    }
    .button-red {
      &:hover {
        background-color: red;
      }
      &:active {
        background-color: #c11818;
      }
    }
  }
  .search-group {
    padding-left: 10px;
    -webkit-app-region: no-drag;
    .search-input {
      position: relative;
      input {
        width: 195px;
        background: #e3e3e3;
        border: none;
        border-radius: 20px;
        padding: 8px 15px;
        padding-right: 30px;
      }
      & > i {
        position: absolute;
        right: 10px;
        top: 6px;
        cursor: pointer;
      }
      .search-result-panel {
        position: absolute;
        z-index: 2;
        top: 35px;
        background: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 15px #ccc;
        font-size: 13px;
      }
      .search-result-panel.defult-keyword {
        width: 476px;
        height: 376px;
        display: flex;
        & > div {
          flex: 1;
          color: #4b4b4b;
          line-height: 29px;
          overflow: hidden;
          .search-panel-title {
            padding: 3px 0;
            border-bottom: 1px solid #eee;
          }
          .search-panel-content {
            p {
              display: flex;
              justify-content: space-between;
              cursor: pointer;
              &:hover {
                background: #f3f3f3;
              }
              span:first-child {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
              }
            }
          }
        }
        .search-result-list {
          border-right: 1px solid #eee;
          .search-panel-title {
            margin-left: 10px;
            padding-left: 10px;
          }
          .search-panel-content {
            padding: 5px 0px 20px 0px;
            p {
              padding: 0px 10px 0px 20px;
              span:first-child {
                max-width: 60%;
              }
            }
          }
        }
        .search-history-list {
          position: relative;
          .search-panel-title {
            margin-right: 10px;
            padding-left: 10px;
          }
          .search-panel-content {
            padding: 5px 0px 20px 0px;
            p {
              padding: 0px 20px 0px 10px;
              span:first-child {
                max-width: 100%;
              }
            }
          }
          .search-history-clear {
            position: absolute;
            top: 3px;
            right: 20px;
            color: #808080;
            cursor: pointer;
          }
        }
      }
      .search-result-panel.has-keyword {
        width: 300px;
        max-height: 647px;
        color: #666;
        .has-keyword-panel {
          padding-top: 5px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
          .has-keyword-title {
            padding: 8px 10px;
            i {
              font-size: 13px;
              margin-right: 3px;
            }
          }
          .has-keyword-result {
            padding: 5px 0;
            padding-left: 30px;
            padding-right: 10px;
            cursor: pointer;
            &:hover {
              background: #f7e8e8;
            }
          }
        }
      }
    }
  }
}
</style>
