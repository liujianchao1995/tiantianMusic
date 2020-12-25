import { BrowserWindow, screen } from 'electron'

class NoticeWindow {
  constructor (win) {
    this.win = win
    this.messageData = null
  }

  initBrowserPage () {
    // this.win.webContents.openDevTools({ mode: 'detach' })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/desktopNotice')
    } else {
      this.win.loadURL('app://./index.html/#/desktopNotice')
    }

    this.win.on('closed', () => {
      this.win = null
    })
    this.win.webContents.on('did-finish-load', () => {
      this.win.webContents.send('noticeMessageData', this.messageData)
    })
  }

  createWindow (messageData) {
    if (messageData) this.messageData = messageData
    if (!this.win) {
      this.win = new BrowserWindow({
        customName: 'asd',
        height: 100,
        width: 370,
        x: screen.getPrimaryDisplay().workAreaSize.width - (370 - 10),
        y: screen.getPrimaryDisplay().workAreaSize.height - (100 + 10),
        frame: false,
        fullscreenable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        // parent: global.mainWindow,
        webPreferences: {
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          backgroundThrottling: false
        }
      })

      // 初始化窗口页面
      this.initBrowserPage()
    }
  }
}

export default NoticeWindow
