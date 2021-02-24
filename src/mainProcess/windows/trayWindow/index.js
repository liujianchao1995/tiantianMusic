import { BrowserWindow } from 'electron'

class TrayWindow {
  constructor (win) {
    // win代表electron窗口实例
    // win is this electron window instance
    this.win = win
  }

  initBrowserPage () {
    // this.win.webContents.openDevTools({ mode: 'detach' })
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      this.win.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/#/tray')
    } else {
      this.win.loadURL('app://./index.html/#/tray')
    }

    this.win.on('blur', () => {
      this.win.hide()
    })
    this.win.on('closed', () => {
      this.win = null
    })
  }

  createWindow (bounds) {
    this.bounds = bounds
    if (!this.win) {
      this.win = new BrowserWindow({
        height: 326,
        width: 196,
        x: bounds.x,
        y: bounds.y - 310,
        show: false,
        frame: false,
        fullscreenable: false,
        movable: false,
        minimizable: false,
        maximizable: false,
        resizable: false,
        // transparent: process.platform !== 'linux',
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

export default TrayWindow
