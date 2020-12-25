<template>
  <div class="album-page-list">
    <perfect-scrollbar
      ref="scrollbar"
      @ps-scroll-y="onScroll"
    >
      <div :class="['album-scrollbar',{fixed:navBarFixed}]">
        <div class="album-detail">
          <div class="album-left">
            <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000000ViyZs3b6UBX.jpg?n=1">
          </div>
          <div class="album-right">
            <template v-if="!navBarFixed">
              <div class="album-name">
                {{ albumData.name }}
              </div>
              <div class="album-user">
                <div><img :src="albumData.user.icon"></div>
                <div>{{ albumData.user.name }}</div>
                <div>
                  <span v-if="!albumData.label.length">添加标签</span>
                  <span v-else>{{ albumData.label }}</span>
                </div>
              </div>
              <div class="album-desc">
                {{ albumData.desc }}
              </div>
            </template>
            <div
              ref="fiexdSign"
              class="album-btn-group"
            >
              <div
                v-for="(item,index) in albumBtn"
                :key="index"
                class="album-btn"
                @click="clickBtn(item)"
              >
                <i :class="['iconfont',item.icon]" />
                <span>{{ item.text }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="album-operation">
          <div class="album-operation-content">
            <div class="album-tab-group">
              <div
                v-for="(item,index) in albumTabs"
                :key="index"
                :class="[{active:item.name == tabActived}]"
                @click="tabActived = item.name"
              >
                {{ item.text }}
              </div>
            </div>
            <div class="album-search-group">
              <div><i class="iconfont iconsousuo" /> 搜索</div>
              <div><i class="iconfont iconsort-desc" />排序</div>
            </div>
          </div>
        </div>
        <div class="music-list">
          <music-list v-if="tabActived == 'music'" />
          <div />
        </div>
      </div>
    </perfect-scrollbar>
  </div>
</template>

<script>
import MusicList from './MusicList'
import { ipcRenderer } from 'electron'
export default {
  name: 'AlbumDetail',
  components: { MusicList },
  data () {
    return {
      albumData: {
        name: '张国荣',
        user: {
          name: '余以为',
          icon:
            'http://thirdqq.qlogo.cn/g?b=sdk&k=VKAg0TJzI0NY0dnQSEJIjA&s=140&t=1579238791'
        },
        label: [],
        desc: ' 精心完善歌单信息撒打算大所多撒多撒多，sad撒大所大所大所多',
        musicList: []
      },
      albumBtn: [
        {
          name: 'playAll',
          text: '播放全部',
          icon: 'iconplay'
        },
        {
          name: 'download',
          text: '下载',
          icon: 'icondownload'
        },
        {
          name: 'batch',
          text: '批量操作',
          icon: 'iconicon-piliangcaozuo'
        },
        {
          name: 'share',
          text: '分享',
          icon: 'iconfenxiang_2'
        }
      ],
      albumTabs: [
        {
          name: 'music',
          text: '歌曲'
        },
        {
          name: 'collection',
          text: '最近收藏'
        },
        {
          name: 'comment',
          text: '评论'
        }
      ],
      tabActived: 'music',
      navBarFixed: false
    }
  },
  watch: {
    navBarFixed (val) {
      if (val) {
        this.$nextTick(() => {
          if (!document.querySelector('.copy-table')) {
            const musicListGroup = document.querySelector('.album-operation')
            const musicListHeader = document
              .querySelector('.vxe-table')
              .cloneNode(true)
            const removeNode = musicListHeader.querySelector(
              '.vxe-table--body-wrapper'
            )
            musicListHeader.classList.add('copy-table')
            removeNode.parentNode.removeChild(removeNode)
            musicListGroup.appendChild(musicListHeader)
          }
        })
      }
    }
  },
  methods: {
    onScroll (e) {
      if (
        this.$refs.fiexdSign.offsetTop <= this.$refs.scrollbar.$el.scrollTop
      ) {
        this.navBarFixed = true
      } else this.navBarFixed = false
    },
    async clickBtn (e) {
      switch (e.name) {
        case 'playAll':
          ipcRenderer.send('showNotice', {
            type: 'success',
            title: '成功',
            message: '这是一条成功的提示消息'
          })
          break
      }
    }
  }
}
</script>
<style lang='less'>
.album-page-list {
  width: 100%;
  height: 100%;
  padding: 0 3px;
  .album-detail {
    width: 100%;
    height: 190px;
    padding: 10px 0;
    display: flex;
    .album-left {
      width: 168px;
      height: 168px;
      margin-right: 20px;
      // transition: all 0.2s;
      img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
      }
    }
    .album-right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .album-name {
        color: #000;
        font-size: 30px;
        font-weight: 900;
      }
      .album-user {
        color: #8c8c8c;
        font-size: 13px;
        display: flex;
        align-items: center;
        & > div {
          cursor: pointer;
          margin-right: 10px;
        }
        img {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          position: relative;
          top: 1px;
        }
      }
      .album-desc {
        font-size: 13px;
        color: #7b7b7b;
      }
      .album-btn-group {
        display: flex;
        .album-btn {
          font-size: 14px;
          color: #000;
          padding: 6px 20px;
          padding-top: 5px;
          background: #e3e3e3;
          margin-right: 10px;
          border-radius: 25px;
          cursor: pointer;
          &:hover {
            background: #dbdbdb;
          }
          &:first-child {
            color: #fff;
            background: linear-gradient(
              to right,
              rgba(fade(#1cc9a6, 80%)),
              rgba(fade(#1cc38e, 80%))
            );
            &:hover {
              background: linear-gradient(
                to right,
                rgba(fade(#1cc9a6, 100%)),
                rgba(fade(#1cc38e, 100%))
              );
            }
          }
          i {
            font-size: 15px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .album-operation {
    .album-operation-content {
      padding: 20px 0;
      color: #000000;
      display: flex;
      justify-content: space-between;
      .album-tab-group {
        display: flex;
        font-size: 14px;
        & > div {
          margin-right: 30px;
          cursor: pointer;
          position: relative;
          &.active {
            color: #1ecc94;
            &:after {
              content: ".";
              width: 60%;
              height: 3px;
              overflow: hidden;
              background: #1ecc94;
              position: absolute;
              left: 15%;
              bottom: 2px;
              border-radius: 5px;
            }
          }
        }
      }
      .album-search-group {
        display: flex;
        font-size: 13px;
        position: relative;
        top: -5px;
        & > div {
          padding: 5px 10px;
          margin-left: 5px;
          cursor: pointer;
          i {
            font-size: 13px;
            margin-right: 3px;
          }
          &:hover {
            background: #f0f0f0;
          }
        }
      }
    }
  }
  .album-scrollbar {
    padding: 0 35px;
    .album-operation {
      .copy-table {
        display: none;
      }
    }

    &.fixed {
      width: 100%;

      .album-detail {
        width: 100%;
        height: auto;
        position: sticky;
        top: 0;
        z-index: 1;
        background: #f6f6f6;

        .album-left {
          width: 55px;
          height: 55px;

          img {
            border-radius: 3px;
          }
        }
      }

      .album-operation {
        width: 100%;
        height: auto;
        position: sticky;
        top: 75px;
        z-index: 1;
        background: #f6f6f6;

        .copy-table {
          margin-top: -10px;
          display: block;
        }
      }
    }
  }
}
</style>
