<template>
  <div class="play-bar-page">
    <div class="progress-bar">
      <div class="progress-bar-bg-line">
        <div
          class="progress-bar-front-line"
          :style="{ width: `${progressVal}%` }"
        >
          <div class="progress-bar-spot-line" />
        </div>
        <input
          v-model.number="progressVal"
          type="range"
          class="progress-bar-input"
          @input="clickBtn('progressInput')"
        >
      </div>
    </div>
    <div class="music-control-bar">
      <div class="left-group">
        <div class="music-img">
          <div class="up-lrc-detail-page" @click="clickBtn('showPlayPage')">
            <i class="iconfont iconxiangshangzhanhang" />
          </div>
          <img v-show="musicPlayData.imgSrc" :src="musicPlayData.imgSrc">
        </div>
        <div class="music-img-right">
          <div class="music-info">
            <span class="music-name" :title="musicPlayData.name">
              {{ musicPlayData.name }}
            </span>
            <span style="margin: 0 2px">
              -
            </span>
            <span class="music-singer">
              {{ musicPlayData.singer }}
            </span>
          </div>
          <div class="music-action">
            <i
              :class="[
                'action-love iconfont',
                musicPlayData.isLove ? 'iconico-love-on' : 'iconico-love-off',
              ]"
              title="我喜欢"
              @click="clickBtn('toggleLove')"
            />
            <i
              class="iconfont icondownload action-download"
              title="下载该歌曲"
            />
            <i
              class="iconfont iconmore-square-circle-s-o action-more"
              title="更多"
            />
          </div>
        </div>
      </div>
      <div class="center-group">
        <!-- 循环类型 -->
        <template>
          <span class="ctrl-loop-type-group" @click="clickBtn('loopType')">
            <i
              v-if="ctrlStatus.loopType == '00'"
              :class="['ctrl-loop-type iconfont icondanquxunhuan']"
            />
            <i
              v-else-if="ctrlStatus.loopType == '01'"
              :class="['ctrl-loop-type iconfont iconsuiji']"
            />
            <i
              v-else-if="ctrlStatus.loopType == '02'"
              :class="['ctrl-loop-type iconfont iconbaocunshunxu']"
            />
          </span>
        </template>
        <!-- 上一曲 -->
        <i
          :class="['ctrl-last-song iconfont iconlast']"
          @click="clickBtn('lastMusic')"
        />
        <!-- 播放状态-->
        <i
          :class="[
            'ctrl-play-status iconfont',
            ctrlStatus.isPlay ? 'iconsuspend' : 'iconsuspended',
          ]"
          @click="clickBtn('playStatus')"
        />
        <!-- 下一曲 -->
        <i
          :class="['ctrl-next-song iconfont iconnext']"
          @click="clickBtn('nextMusic')"
        />
        <!-- 音量 -->
        <i
          :class="[
            'ctrl-volume iconfont',
            !ctrlStatus.volume ? 'iconjingyin' : 'iconyinliangdefuben',
          ]"
          @click="clickBtn('showVolumePanel')"
        >
          <div v-show="isShowVolumePanel" v-click-outside="{func:hideVolumePanel,param:'volumePanel'}" class="ctrl-volume-popover">
            <div class="ctrl-volume-bar">
              <div
                class="volume-bar-front-line"
                :style="{ width: `${ctrlStatus.volume}%` }"
              >
                <div class="volume-bar-spot-line" />
              </div>
              <input
                v-model.number="ctrlStatus.volume"
                type="range"
                class="volume-bar-input"
              >
            </div>
            <div class="ctrl-volume-text">
              {{ `${ctrlStatus.volume}%` }}
            </div>
            <div class="ctrl-volume-icon">
              <i
                :class="[
                  'iconfont',
                  !ctrlStatus.volume ? 'iconjingyin' : 'iconyinliangdefuben',
                ]"
                @click="ctrlStatus.volume ? ctrlStatus.volume = 0 : ctrlStatus.volume = 25"
              />
            </div>

          </div>
        </i>
      </div>
      <div class="right-group">
        <div class="play-time">
          <span>{{ nowTime }}</span>
          /
          <span>{{ totalTime }}</span>
        </div>
        <div :class="['is-decktop-lrc', { show: ctrlStatus.isDesktopLrc }]">
          词
        </div>
        <div class="play-queue-list">
          <i class="iconfont iconliebiao" />
          <span>{{ ctrlStatus.playQueueNum }}</span>
        </div>
      </div>
    </div>
    <audio
      ref="audioDom"
      crossOrigin="anonymous"
      :src="musicPlayData.src"
      @canplay="audiocCanplay"
      @timeupdate="audiocTimeupdate"
    />
    <div :class="['play-detail-page', { 'is-show': isShowPlayDetail }]">
      <div class="play-detail-page-bg" :style="{ background: `none` }">
        <img :src="musicPlayData.imgSrc">
      </div>
      <div class="play-detail-page-main">
        <div class="play-detail-top">
          <div class="left">
            <i
              class="iconfont iconxiangxia"
              @click="clickBtn('showPlayPage')"
            />
          </div>
          <div class="right">
            这是右边
          </div>
        </div>
        <div class="play-detail-center">
          <div class="music-img">
            <img :src="musicPlayData.imgSrc">
          </div>
          <div class="music-lrc">
            <!--             <div class="music-title">
              这是标题
            </div> -->
            <div ref="musicLrcContent" class="music-lrc-content">
              <template v-for="(item,index) in (lyricInstance && lyricInstance.lines) || []">
                <p v-if="index" :key="index" :class="[{'highlight':$store.state.playBar.current_lyric_line == index}]">
                  {{ item.txt }}
                </p>
              </template>
            </div>
          </div>
        </div>
        <div class="play-detail-bottom">
          这里又是控制台
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lyric from '@/utils/Lyric.js'
function durationTrans (a) {
  a = a / 1000
  let b = ''
  let h = parseInt(a / 3600)
  let m = parseInt((a % 3600) / 60)
  let s = parseInt((a % 3600) % 60)
  if (h > 0) {
    h = h < 10 ? '0' + h : h
    b += h + ':'
  }
  m = m < 10 ? '0' + m : m
  s = s < 10 ? '0' + s : s
  b += m + ':' + s
  return b
}
export default {
  name: 'PlayBar',
  data () {
    return {
      musicPlayData: {
        /*         id: '23232656',
        name: '北京颂歌',
        imgSrc:
          'https://y.gtimg.cn/music/photo_new/T002R300x300M000000ViyZs3b6UBX.jpg?n=1',
        singer: '戴玉强',
        isLove: false,
        isDownload: true */
      },
      ctrlStatus: {
        isPlay: false,
        loopType: '00',
        volume: 20,
        duration: 0,
        currentTime: 0,
        isDesktopLrc: true,
        playQueueNum: '806'
      },
      progressVal: 0,
      nowTime: 0,
      isShowPlayDetail: false,
      isShowVolumePanel: false,
      lyricInstance: null
    }
  },
  computed: {
    totalTime () {
      return durationTrans(this.ctrlStatus.duration * 1000)
    }
  },
  watch: {
    '$store.state.playBar.current_lyric_line': {
      handler (newVal) {
        this.$refs.musicLrcContent.addEventListener('scroll', function () {
          console.log('滚动了')
        })
      }
    },
    'ctrlStatus.volume' (newVal, oldVal) {
      if (newVal && this.$refs.audioDom.volume) {
        this.$refs.audioDom.muted = false
        this.$refs.audioDom.volume = newVal ? (newVal / 100).toFixed(2) : (oldVal || 0.1)
      } else if (!newVal && this.$refs.audioDom.volume) {
        this.$refs.audioDom.muted = true
        this.$refs.audioDom.volume = oldVal || 0.1
      }
    },
    'ctrlStatus.currentTime' (newval) {
      this.nowTime = durationTrans(newval)
      this.progressVal = (
        (100 / (this.ctrlStatus.duration * 1000)) *
        newval
      ).toFixed(2)
      if (this.nowTime === this.totalTime) this.ctrlStatus.isPlay = false
    },
    'ctrlStatus.isPlay' (newVal) {
      if (newVal) {
        this.$refs.audioDom.play()
      } else {
        this.$refs.audioDom.pause()
      }
    },
    '$store.state.playBar.currentMusic': {
      async handler (newVal) {
        if (newVal) {
          const { id, cid, name, src, imgSrc, singer, album, lrcSrc } = newVal
          this.musicPlayData = {
            id,
            cid,
            name,
            src,
            imgSrc,
            singer,
            album,
            lrcSrc,
            isLove: false,
            isDownload: true
          }
          this.ctrlStatus.isPlay = false
          if (this.$refs.audioDom) this.$refs.audioDom.load()
          this.resetLyric()
          this.getLyric()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    hideVolumePanel (e) {
      if (e.param === 'volumePanel' && e.event.toElement.className !== 'ctrl-volume') this.isShowVolumePanel = false
    },
    audiocCanplay (e) {
      if (e.srcElement.duration) this.ctrlStatus.duration = this.$refs.audioDom.duration
      this.ctrlStatus.isPlay = true
      this.lyricInstance && this.lyricInstance.seek(this.$refs.audioDom.currentTime * 1000)
    },
    async getLyric () {
      if (this.musicPlayData.cid) {
        const lrcObj = await this.$axios.get(`https://music.migu.cn/v3/api/music/audioPlayer/getLyric?copyrightId=${this.musicPlayData.cid}`)
        this.musicPlayData.lrcText = lrcObj && lrcObj.lyric
        if (this.musicPlayData.lrcText) {
          this.$store.commit('playBar/SET_LYRIC', this.musicPlayData.lrcText)
          this.lyricInstance = new Lyric(this.musicPlayData.lrcText, ({ lineNum, txt }) => {
            this.$store.commit('playBar/SET_CURRENT_LYRIC', txt)
            this.$store.commit('playBar/SET_CURRENT_LYRIC_LINE', lineNum)
          })
          this.lyricInstance.play()
        }
      }
    },
    resetLyric () {
      this.lyricInstance && this.lyricInstance.stop()
      this.lyricInstance = null
      this.$store.commit('playBar/SET_LYRIC', '')
      this.$store.commit('playBar/SET_CURRENT_LYRIC', '')
      this.$store.commit('playBar/SET_CURRENT_LYRIC_LINE', 0)
    },
    audiocTimeupdate (e) {
      if (this.$refs.audioDom.currentTime) {
        this.ctrlStatus.currentTime = this.$refs.audioDom.currentTime * 1000 || 0
      } else {
        this.resetLyric()
      }
    },
    clickBtn (e) {
      switch (e) {
        case 'progressInput':
          if (this.$refs.audioDom.currentTime) {
            this.$refs.audioDom.currentTime =
              (this.progressVal * this.ctrlStatus.duration) / 100
            this.lyricInstance && this.lyricInstance.seek(this.$refs.audioDom.currentTime * 1000)
          }
          break
        case 'toggleLove':
          this.musicPlayData.isLove = !this.musicPlayData.isLove
          break
        case 'playStatus':
          this.ctrlStatus.isPlay = !this.ctrlStatus.isPlay
          break
        case 'showPlayPage':
          this.isShowPlayDetail = !this.isShowPlayDetail
          break
        case 'showVolumePanel':
          this.isShowVolumePanel = true
          break
      }
    }
  }
}
</script>
<style lang='less' scoped>
.play-bar-page {
  display: flex;
  flex-direction: column;
  .progress-bar {
    width: 100%;
    height: 20px;
    display: flex;
    align-items: center;
    .progress-bar-bg-line {
      width: 100%;
      height: 2px;
      background: #dadada;
      position: relative;
      .progress-bar-front-line {
        width: 30%;
        height: 100%;
        background: #1ecc94;
        position: relative;
      }
      .progress-bar-input {
        width: 100%;
        height: 100%;
        position: absolute;
        opacity: 0;
      }
    }
    &:hover {
      .progress-bar-spot-line {
        width: 10px;
        height: 10px;
        position: absolute;
        top: -4px;
        right: -5px;
        border-radius: 50%;
        background: #1ecc94;
      }
    }
  }
  .music-control-bar {
    flex: 1;
    margin-top: -5px;
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left-group {
      display: flex;
      .music-img {
        position: relative;
        img {
          width: 40px;
          height: 40px;
          border-radius: 5px;
        }
        .up-lrc-detail-page {
          width: 40px;
          height: 40px;
          position: absolute;
          display: none;
          justify-content: center;
          align-items: center;
          color: #fff;
          background-color: rgba(fade(#000, 30%));
          cursor: pointer;
          i {
            font-size: 18px;
            position: relative;
            top: 1px;
          }
        }
        &:hover {
          .up-lrc-detail-page {
            display: flex;
          }
        }
      }
      .music-img-right {
        margin-left: 10px;
        .music-info {
          font-size: 12px;
          display: flex;
          align-items: center;
          .music-name {
            max-width: 15vw;
            display: inline-block;
            color: #000;
            cursor: pointer;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .music-singer {
            color: #7b7b7b;
            cursor: pointer;
          }
        }
        .music-action {
          i {
            color: #828181;
            font-size: 18px;
            margin-right: 15px;
            cursor: pointer;
            &.action-more {
              font-size: 16px;
            }
            &:hover {
              color: #1ecd98;
              &.action-love {
                color: #f45555;
              }
            }
          }
        }
      }
    }
    .center-group {
      i {
        margin: 0 7px;
        cursor: pointer;
        color: #000000;
        &:hover:not(.ctrl-play-status) {
          color: #1ecd9a;
        }
      }
      .ctrl-loop-type,
      .ctrl-volume {
        font-size: 17px;
        position: relative;
        .ctrl-volume-popover {
          width: 70px;
          height: 250px;
          position: absolute;
          left: -30px;
          bottom: 40px;
          background: #ffffff;
          box-shadow: 0 0 10px #ccc;
          border-radius: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #000;
          cursor: default;
          &::before {
            content: ' ';
            width: 15px;
            height: 15px;
            position: absolute;
            left: 28px;
            bottom: -8px;
            background: #ffffff;
            transform: rotate(45deg);
            box-shadow: 0 0 10px #ccc;
          }
          &::after {
            content: ' ';
            width: 40px;
            height: 10px;
            position: absolute;
            left: 15px;
            bottom: 0px;
            background: #ffffff;
          }
          .ctrl-volume-bar {
            width: 150px;
            height: 3px;
            transform: rotate(270deg);
            background: #dadada;
            position: relative;
            top: 100px;
            .volume-bar-front-line {
              width: 30%;
              height: 100%;
              background: #1ecc94;
              position: relative;
            }
            .volume-bar-input {
              width: 100%;
              height: 100%;
              position: absolute;
              opacity: 0;
                            cursor: pointer;
            }
          }
          .ctrl-volume-text {
            font-size: 14px;
            margin-top: 180px;
          }
          .ctrl-volume-icon {
            margin-top: 10px;
          }
          .volume-bar-spot-line {
            width: 11px;
            height: 11px;
            position: absolute;
            top: -4px;
            right: -5px;
            border-radius: 50%;
            background: #1ecc94;
          }
        }
      }
      .ctrl-play-status {
        width: 35px;
        height: 35px;
        font-size: 17px;
        font-weight: 900;
        display: inline-block;
        color: #fff;
        background: #1ece9d;
        text-align: center;
        line-height: 37px;
        border-radius: 50%;
      }
    }
    .right-group {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: #7b7b7b;
      & > div {
        margin-left: 10px;
        cursor: pointer;
      }
      .play-time {
        font-size: 12px;
      }
      .is-decktop-lrc {
        font-size: 15px;
        &.show {
          color: #1ece9d;
        }
      }
      .play-queue-list {
        font-size: 12px;
        position: relative;
        top: 1px;
        color: #1ece9d;
        i {
          font-size: 13px;
          margin-right: 3px;
        }
      }
    }
  }
}
.play-detail-page {
  position: fixed;
  width: 100vw;
  height: 100vh;
  bottom: -100vh;
  left: 0;
  z-index: 3;
  transition: bottom 0.3s;
  background: #000;
  overflow: hidden;
  &.is-show {
    bottom: 0;
  }
  .play-detail-page-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    overflow: hidden;
    filter: blur(30px) opacity(40%);
    img {
      width: 100%;
      height: 100%;
    }
  }
  .play-detail-page-main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    -webkit-app-region: drag;
    i {
      -webkit-app-region: no-drag;
      cursor: pointer;
    }
    .play-detail-top {
      width: 100%;
      height: 53px;
      padding: 0 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .play-detail-bottom {
      width: 100%;
      height: 68px;
      border: 1px solid #ccc;
    }
    .play-detail-center {
      flex: 1;
      padding: 90px 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      overflow: hidden;
      .music-img img {
        width: 350px;
        height: 350px;
      }
      .music-lrc{
        height:80%;
        overflow-y: auto;
        -webkit-app-region: no-drag;
        &::-webkit-scrollbar {
          width: 0;
          display: none;
        }
        .music-lrc-content {
          font-size: 14px;
          line-height: 25px;
          .highlight {
            color: sandybrown;
          }
        }
      }
    }
  }
}
</style>
