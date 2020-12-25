<template>
  <div class="tray-page">
    <ul>
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
    </ul>
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
export default {
  name: 'Tray',
  data () {
    return {
    }
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
        case 'pushNotification': {
          const notification = {
            title: '附带图像的通知',
            body: '短消息附带自定义图片'
            // eslint-disable-next-line no-undef
            // icon: `${__static}/app.ico`
          }
          // ipcRenderer.send('pushNotification')
          const myNotification = new Notification(notification.title, notification)
          myNotification.onclick = () => {
            console.log('通知被点击')
          }
        }
          break
        case 'aboutapp':
          // eslint-disable-next-line no-undef
          ipcRenderer.send('showDialog', { title: '关于', message: '这是写内容的地方', icon: `${__static}/app.ico` })
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
  height:  calc(~"100% - 10px");
  width: calc(~"100% - 10px");
  background: #fafafc;
  box-shadow: 4px 4px 4px fade(#aaa,40%);
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
