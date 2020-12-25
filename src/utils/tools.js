import cheerio from 'cheerio'
export function filterChapters (html) {
  var $ = cheerio.load(html) // 加载需要的html，然后就可以愉快地使用类似jQuery的语法了
  var chapters = $('.billboard-item.songlist-item') // 在html里寻找需要的资源的class
  var courseData = [] // 创建一个数组，用来保存资源
  chapters.each(function (item, index) {
    // 遍历我们的html文档
    var chapter = $(this)
    var musicName = chapter.find('.song-name-text a').attr('title')
    var tvUrl = chapter.find('.song-name-text a').attr('href')
    var imgUrl = chapter.find('.song-cover-pic .lazy-img').attr('src')
    var musicSinger = chapter
      .find('.song-singer')
      .text()
      .replace(/\n/g, '')
    var songLength = chapter.find('.song-length').text()
    if (musicName) {
      var id = tvUrl.split('/')[tvUrl.split('/').length - 1]
      courseData.push({ musicName, id, imgUrl, musicSinger, songLength })
    }
  })
  return courseData // 返回需要的资源
}

// 定义一个深拷贝函数  接收目标target参数
export function deepClone (target) {
  // 定义一个变量
  let result
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === 'object') {
  // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = [] // 将result赋值为一个数组，并且执行遍历
      for (const i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]))
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {}
      for (const i in target) {
        result[i] = deepClone(target[i])
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target
  }
  // 返回最终结果
  return result
}
