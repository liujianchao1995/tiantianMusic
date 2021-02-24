<template>
  <div :class="['desktop-notice-page', isShow ? 'isShow' : 'isHide']">
    <div :class="['desktop-notice-content notice shake-little',{'is-animation-play' : isShake}]">
      <div class="notice__icon">
        <i
          v-if="noticeData.type == 'success'"
          class="iconfont iconsuccess"
          style="color:#66c23a"
        />
        <i
          v-else-if="noticeData.type == 'error'"
          class="iconfont iconerror"
          style="color:#f56c6c"
        />
        <i
          v-else-if="noticeData.type == 'warn'"
          class="iconfont iconwarning"
          style="color:#e6a13c"
        />
        <i
          v-else
          class="iconfont iconmessage"
          style="color:#909399"
        />
      </div>
      <div class="notice__group is-with-icon">
        <h2 class="notice__title">
          {{ noticeData.title }}
        </h2>
        <div class="notice__content">
          <p>{{ noticeData.message }}</p>
        </div>
        <i
          class="notice__closeBtn iconfont iconRectangle"
          @click="closeWindow"
        />
      </div>
    </div>
    <audio
      ref="audioSound"
      :src="audioSrc"
      autoplay
    />
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'DesktopNotice',
  data () {
    return {
      noticeData: {
        type: '',
        title: '提示消息',
        message: '这是一条提示消息'
      },
      isShow: false,
      isShake: false,
      noticeNum: 0
    }
  },
  computed: {
    audioSrc () {
      return this.isShow
        ? require('../assets/audios/alertnotice.mp3')
        : require('../assets/audios/closenotice.mp3')
    }
  },
  created () {
    ipcRenderer.on('noticeMessageData', (e, res) => {
      this.noticeData = res
      if (this.isShow) {
        this.isShake = true
        setTimeout(() => (this.isShake = false), 500)
      } else this.isShow = true
      this.noticeNum++
      if (this.$refs.audioSound) this.$refs.audioSound.play()
    })
  },
  methods: {
    closeWindow () {
      this.isShow = false
      this.noticeNum = 0
      setTimeout(() => {
        if (!this.isShow) ipcRenderer.send('closeNotice')
      }, 1000 * 60 * 1)
    }
  }
}
</script>
<style lang='less' scoped>
@import url('~@/styles/shakeAnimation.css');
.desktop-notice-page {
  width: 350px;
  height: 100%;
  padding: 10px 10px;
  position: relative;
  transform: translateX(500px);
  transition: transform 0.7s;
  &.isShow {
    transition: transform 0.7s;
    transform: translateX(0px);
  }
  &.isHide {
    transition: transform 0.2s;
    transform: translateX(500px);
  }
  .desktop-notice-content {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
    display: flex;
    padding: 14px 26px 14px 13px;
    box-sizing: border-box;
    border: 1px solid #ebeef5;
    .notice__group {
      margin-left: 13px;
      margin-right: 8px;
      cursor: pointer;
    }
    .notice__icon {
      transform: scale(1.2);
      position: relative;
      top: 3px;
    }
    .notice__title {
      font-weight: 700;
      font-size: 16px;
      color: #303133;
      margin: 0;
    }
    .notice__content {
      font-size: 14px;
      line-height: 21px;
      margin: 6px 0 0;
      color: #606266;
      text-align: justify;
    }
    .notice__closeBtn {
      width: 20px;
      height: 20px;
      padding-left: 2.5px;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      color: #909399;
      font-size: 16px;
      &:hover {
        color: #fff;
        border-radius: 50%;
        background: #799ee8;
      }
    }
  }
}
</style>
