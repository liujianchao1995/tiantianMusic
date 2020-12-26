/**
 * 进程通信
 */
import { ipcMain, dialog, app } from 'electron'
import axios from 'axios'
import { autoUpdater } from 'electron-updater'

class IpcEvents {
  // 创建ipc事件
  create (appManager) {
    this.appManager = appManager
    this.windowManager = appManager.windowManager

    // 翻译器函数
    // Translator function
    const $t = appManager.translator.get()

    // ipc通信示例 / ipc demo
    ipcMain.on('showDialog', (sys, msg) => {
      dialog.showMessageBox({
        type: msg.type || 'none',
        title: msg.title || '收到消息！',
        icon: msg.icon || null,
        // 在任何能调用翻译器函数的地方都能使用多语言
        // Multi-language support where translator functions are available
        message: msg.message || $t('reciveFromRenderer'),
        detail: msg.detail || ''
      })
    })

    // 语言变更事件 / language change event
    ipcMain.on('appLanguageChange', (sys, lang) => {
      this.appManager.languageChange(lang)
    })

    // 关闭应用
    ipcMain.on('appExit', (sys) => {
      app.exit()
    })

    // 桌面通知
    ipcMain.on('showNotice', (e, data) => {
      if (!this.windowManager.noticeWindow.win) {
        this.windowManager.noticeWindow.createWindow(data)
      } else {
        this.windowManager.noticeWindow.win.webContents.send('noticeMessageData', data)
        this.windowManager.noticeWindow.win.show()
        this.windowManager.noticeWindow.win.moveTop()
      }
    })

    ipcMain.on('closeNotice', (e, data) => {
      if (this.windowManager.noticeWindow.win) this.windowManager.noticeWindow.win.close()
    })

    // 重启应用
    ipcMain.on('restartapp', () => {
      if (process.env.NODE_ENV === 'production') {
        app.relaunch()
        app.exit(0)
      }
      console.log(app.getPath('userData'))
    })

    // 显示主窗口
    ipcMain.on('showMainWindow', (sys, lang) => {
      if (!this.windowManager.mainWindow.win) {
        this.windowManager.mainWindow.createWindow()
      }

      // 执行electron窗口对象方法 / Execute electron window object method
      this.windowManager.mainWindow.win.restore()
      this.windowManager.mainWindow.win.moveTop()
    })

    // 主进程监听渲染进程传来的信息
    ipcMain.on('updateApp', (e, arg) => {
      checkForUpdates()
    })

    const checkForUpdates = async () => {
      // 获取github release最新版本信息
      const githubReleaseApi = await axios.get('https://api.github.com/repos/liujianchao1995/tiantianMusic/releases/latest')

      if (githubReleaseApi.data && githubReleaseApi.data.tag_name) {
        // 配置安装包远端服务器
        autoUpdater.setFeedURL(`https://github.com/liujianchao1995/tiantianMusic/releases/download/${githubReleaseApi.data.tag_name}/`)

        // 执行自动更新检查
        autoUpdater.checkForUpdates()
      }

      // autoUpdater.setFeedURL('https://github.com/liujianchao1995/tiantianMusic/releases/download/v0.0.1/')

      // 下面是自动更新的整个生命周期所发生的事件
      autoUpdater.on('error', message => {
        sendUpdateMessage('error', message)
      })
      // 监听开始检测更新事件
      autoUpdater.on('checking-for-update', message => {
        sendUpdateMessage('checking-for-update', message)
      })
      // 监听发现可用更新事件
      autoUpdater.on('update-available', message => {
        sendUpdateMessage('update-available', message)
      })
      // 监听没有可用更新事件
      autoUpdater.on('update-not-available', message => {
        sendUpdateMessage('update-not-available', message)
      })

      // 更新下载进度事件
      autoUpdater.on('download-progress', progressObj => {
        sendUpdateMessage('downloadProgress', progressObj)
      })
      // 更新下载完成事件
      autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) => {
        sendUpdateMessage('isUpdateNow', { event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate })
        ipcMain.on('updateAppNow', (e, arg) => {
          autoUpdater.quitAndInstall()
        })
      })
    }

    // 主进程主动发送消息给渲染进程函数
    const sendUpdateMessage = (status, data) => {
      this.windowManager.mainWindow.win.send('updateAppReturn', { status, data })
    }
  }
}

export default new IpcEvents()
