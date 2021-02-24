import { Tray, screen } from 'electron'

// management
import EventManager from './events'
import WindowManager from './windows'
import MenuManager from './menus'

// plugins
import Translator from './plugins/translator'

class AppManager {
  constructor () {
    // 翻译器
    this.translator = new Translator()

    // 窗口管理器，主要负责管理、创建窗口
    // Window manager, mainly responsible for managing and creating windows
    this.windowManager = new WindowManager(this)

    // 菜单管理器，主要负责获取菜单对象
    // Menu manager, mainly responsible for get the menu object
    this.menuManager = new MenuManager(this)

    // 事件管理器，主要负责初始化ipc、app事件
    // Event manager, mainly responsible for initializing ipc, app events
    this.eventManager = new EventManager(this)
  }

  // 初始化app，创建窗口及托盘
  // Initialize the app, create windows and tray
  initApp () {
    this.windowManager.createAll()
    this.createAppTray()
  }

  languageChange (lang) {
    this.translator.changeLang(lang)

    // 重新设置托盘菜单（为了变更语言）
    // Reset the language of the tray menu
    this.createAppTray()
  }

  // 创建托盘
  createAppTray () {
    if (!this.tray) {
      // eslint-disable-next-line no-undef
      this.tray = new Tray(`${__static}/app.ico`)
      this.tray.setToolTip('发现音乐')
      if (process.platform === 'win32') this.setAppTrayWindow()
      else this.setAppTrayMenu()
    }
  }

  // 创建托盘窗口
  setAppTrayWindow () {
    const trayBounds = this.tray.getBounds()
    const trayWindow = this.windowManager.trayWindow
    trayWindow.createWindow(trayBounds)
    this.tray.on('right-click', (event, bounds) => {
      setTimeout(() => {
        const [trayMenuWidth, trayMenuHeight] = trayWindow.win.getSize()
        const { x, y } = screen.getCursorScreenPoint()
        if (x + trayMenuWidth > screen.getPrimaryDisplay().size) {
          trayWindow.win.setPosition(x - trayMenuWidth, y - trayMenuHeight)
        } else {
          trayWindow.win.setPosition(x, y - trayMenuHeight - 6)
        }
        trayWindow.win.show()
      }, 100)
    })
    this.tray.on('click', (event, bounds) => {
      if (!this.windowManager.mainWindow.win) {
        this.windowManager.mainWindow.createWindow()
      }
      this.windowManager.mainWindow.win.show()
      this.windowManager.mainWindow.win.moveTop()
    })
  }

  // 创建托盘菜单
  setAppTrayMenu () {
    const menu = this.menuManager.AppTrayMenu()
    this.tray.setContextMenu(menu)
  }
}

export default AppManager
