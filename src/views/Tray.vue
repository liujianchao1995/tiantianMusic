<template>
  <div class="tray-page">
    <!--     <ul>
      <li @click="trayMenuClick('showMainWindow')">
        显示主窗口
      </li>
      <li @click="trayMenuClick('bootUp')">
        开机启动
      </li>
      <li @click="trayMenuClick('pushNotification')">
        推送通知
      </li>
      <li @click="trayMenuClick('aboutapp')">
        关于
      </li>
      <li @click="trayMenuClick('restartapp')">
        重启程序
      </li>
      <li @click="trayMenuClick('exitapp')">
        退出程序
      </li>
    </ul> -->
    <div class="btn-group">
      <div class="top">
        <i class="iconfont iconmusic_beginning_button" />
        <i class="iconfont iconmusic_pause_button" />
        <i class="iconfont iconmusic_end_button" />
      </div>
      <div class="bottom">
        <i class="iconfont iconico-love-off" />
        <span class="music-name">花海</span>
        <i class="iconfont iconmusic_shuffle_button" />
      </div>
    </div>
    <div class="split-line" />
    <div class="volume-group">
      <div class="volume-opt" />
      <div class="tray-row">
        <i class="iconfont icongeci" />
        <span>关闭桌面歌词</span>
      </div>
      <div class="tray-row">
        <i class="iconfont" />
        <span>动态桌面</span>
      </div>
    </div>
    <div class="split-line" />
    <div class="setting-group">
      <div class="tray-row">
        <i class="iconfont iconsetting-copy" />
        <span>设置</span>
      </div>
    </div>
    <div class="split-line" />
    <div class="exit-group">
      <div class="tray-row">
        <i class="iconfont iconrestart" />
        <span>重启程序</span>
      </div>
      <div class="tray-row">
        <i class="iconfont" />
        <span>切换账号</span>
      </div>
      <div class="tray-row">
        <i class="iconfont iconrestart1" />
        <span>退出天天动听</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Tray',
  data () {
    return {}
  },

  methods: {
    trayMenuClick (e) {
      switch (e) {
        case 'bootup':
          break
        case 'restartapp':
          ipcRenderer.send('restartapp')
          break
        case 'showMainWindow':
          ipcRenderer.send('showMainWindow')
          break
        case 'pushNotification':
          {
            const notification = {
              title: '附带图像的通知',
              body: '短消息附带自定义图片'
              // eslint-disable-next-line no-undef
              // icon: `${__static}/app.ico`
            }
            // ipcRenderer.send('pushNotification')
            const myNotification = new Notification(
              notification.title,
              notification
            )
            myNotification.onclick = () => {
              console.log('通知被点击')
            }
          }
          break
        case 'aboutapp':
          // eslint-disable-next-line no-undef
          ipcRenderer.send('showDialog', {
            title: '关于',
            message: '这是写内容的地方'
            // icon: `${__static}/app.ico`
          })
          break
        case 'exitapp':
          ipcRenderer.send('appExit')
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.tray-page {
  height: 100%;
  width: 100%;
  background: #fafafc;
  box-shadow: 4px 4px 4px fade(#aaa, 40%);
  .split-line {
    width: 100%;
    height: 1px;
    background: rgb(212, 211, 211);
  }
  .btn-group {
    .top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 7px 10px;
      padding-bottom: 0;
      .iconfont {
        color: #929292;
        font-size: 27px;
        cursor: pointer;
        &:nth-child(2) {
          font-size: 37px;
        }
        &:hover {
          color: #444444;
        }
        &:active {
          position: relative;
          left: 2px;
          top: 2px;
        }
      }
    }
    .bottom {
      margin-top: -5px;
      margin-bottom: 5px;
      padding: 0 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .iconfont {
        font-size: 18px;
        cursor: pointer;
        color: #6d6c6c;
        &:hover {
          color: #302e2e;
        }
        &:active {
          position: relative;
          left: 1px;
          top: 1px;
        }
      }
      .music-name {
        position: relative;
        top: -3px;
        font-size: 15px;
      }
    }
  }
  .volume-group,.setting-group,.exit-group {
    margin: 7px 0;
  }
  .tray-row {
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 17px;
    font-size: 14px;
    color: #555353;
    overflow: hidden;
    .iconfont {
      width: 28px;
      font-size: 18px;
      position: relative;
      top: 3px;
    }
    &:hover {
      background: #e5e5e5;
    }
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    li {
      height: 21px;
      line-height: 21px;
      padding: 0 10px;
      cursor: default;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
