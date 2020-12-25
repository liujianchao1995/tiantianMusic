const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  assetsDir: 'assets',
  outputDir: 'dist',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 7895
    // https: true,
    // disableHostCheck: true
    /*     proxy: {
      '/migu': {
        target: 'https://music.migu.cn',
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/migu': '/'
        },
        // 突破host和origin的限制
        headers: {
          referer: 'https://music.migu.cn',
          origin: 'https://music.migu.cn'
        }
      } */
  },
  css: {
    sourceMap: true
  },
  chainWebpack: config => {
    // 路径别名，如用“@”指代“src”等
    // Path alias, such as "@" for "src", etc.
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('static', resolve('src/assets'))
      .set('views', resolve('src/views'))
      .set('svg', resolve('src/assets/svg'))
      .set('components', resolve('src/components'))
    // svg config
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('svg-sprite-loader').loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessWatch: ['src/mainProcess'], // 监听目标文件代码改动，自动重启项目。
      builderOptions: {
        /*         publish: [
          {
            provider: 'generic',
            url: 'http://192.168.31.154:8000/download/' // 可使用autoUpdater.setFeedURL动态配置
          }
        ], */
        productName: 'hahah',
        win: {
          icon: './public/app.ico' // 应用图标
          // artifactName: 'hahah.exe' // 安装文件名
        },
        mac: {
          icon: './public/app.png'
        },
        nsis: {
          oneClick: false, // 是否一键安装
          perMachine: true, // 布尔值-是否显示辅助安装程序的安装模式安装程序页面（选择按机器还是按用户）。或者是否始终按所有用户（每台计算机）安装。
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          installerIcon: './public/app.ico', // 安装图标
          uninstallerIcon: './public/app.ico', // 卸载图标
          installerHeaderIcon: './public/app.ico', // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: '测试软件' // 快捷方式名称
          // include: './public/nsis/installer.nsh' // 自定义nsis脚本 安装过程中自行调用  (可用于写入注册表 开机自启动等操作)
        }
      }
    },
    // i18n config
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
