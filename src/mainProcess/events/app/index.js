/**
 * 应用状态
 */
import { app, session } from 'electron'

class AppEvents {
  constructor () {
    this.development = process.env.NODE_ENV !== 'production'
  }

  create (appManager) {
    // 窗口管理器
    const windowManager = appManager.windowManager

    app.allowRendererProcessReuse = true // 取消警告因版本升级造成API默认值不一致的警告，现在允许渲染器进程重用。

    // 只允许应用拥有单个实例，不得多次启动程序。
    const gotTheLock = app.requestSingleInstanceLock()
    if (!gotTheLock) {
      app.quit()
    } else {
      app.on('second-instance', (event, commandLine, workingDirectory) => {
        // 当尝试启动第二个实例时,会触发second-instance事件，并聚焦到已获得实例锁的应用主窗口上。
        if (windowManager.mainWindow) {
          if (windowManager.mainWindow.win) {
            if (windowManager.mainWindow.win.isMinimized()) windowManager.mainWindow.win.restore()
            windowManager.mainWindow.win.focus()
            windowManager.mainWindow.win.show()
          } else {
            windowManager.mainWindow.createWindow()
          }
        }
      })
      // 创建 myWindow, 加载应用的其余部分, etc...
      // app.on('ready', () => {
      // })
    }
    app.on('activate', () => {
      if (windowManager.mainWindow.win === null) {

      }
    })

    // 忽略https不安全证书错误
    // app.commandLine.appendSwitch('--ignore-certificate-errors', 'true')

    // 重要！初始化程序
    app.on('ready', async () => {
      appManager.initApp()

      // 全局请求拦截器
      const filter = {
        urls: ['https://*.cn/*', 'https://*.com/*', 'http://*.cn/*', 'http://*.com/*']
      }
      session.defaultSession.webRequest.onBeforeSendHeaders(filter, function (details, callback) {
        if (details.method === 'GET') details.requestHeaders.Referer = details.url.split('?')[0]
        // eslint-disable-next-line standard/no-callback-literal
        callback({ cancel: false, requestHeaders: details.requestHeaders })
      })
    })

    // app退出之前
    app.on('before-quit', () => {
      appManager.tray.destroy()
    })

    // 所有窗口都被关闭
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        windowManager.mainWindow.win = null

        // 设置app托盘菜单 / Set the app tray
        appManager.tray.setToolTip('窗口被关闭了！\nWindow is closed!')
        appManager.tray.displayBalloon({
          title: '嗨~',
          content: '我在这里哦，并没有退出',
          noSound: true
        })
      }
    })

    // 处于开发环境下，保存主进程文件（mainProcess.js）时会自动重载，这里可以加快重载过程
    // with the development environment, when you save the main process file (mainProcess.js),
    // it will be automatically reloaded. This can speed up the reloading process.
    if (this.development) {
      if (process.platform === 'win32') {
        process.on('message', data => {
          if (data === 'graceful-exit') {
            app.quit()
          }
        })
      } else {
        process.on('SIGTERM', () => {
          app.quit()
        })
      }
    }
  }
}

export default new AppEvents()
