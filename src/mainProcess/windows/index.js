import MainWindow from './mainWindow'
import TrayWindow from './trayWindow'
import NoticeWindow from './noticeWindow'

class WindowManager {
  constructor () {
    this.mainWindow = new MainWindow()
    this.trayWindow = new TrayWindow()
    this.noticeWindow = new NoticeWindow()
  }

  // 创建所有窗口
  createAll () {
    this.mainWindow.createWindow()
  }
}
export default WindowManager
