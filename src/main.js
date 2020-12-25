// vue入口文件 / vue entry file
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './styles/index.less'
import SvgIcon from 'components/svgIcon/index.vue'
import 'components/svgIcon/index.js'
import i18n from '@/utils/i18n'
import db from '@/utils/db'
import config from '@/config'
import axios from '@/utils/axios'
import { deepClone } from '@/utils/tools'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import './styles/scrollbar.less'
import 'xe-utils'
import './plugins/vxeTable'
import clickOutside from './directives/v-click-outside'
import cheerio from 'cheerio'

Vue.component('svg-icon', SvgIcon)
Vue.use(PerfectScrollbar).use(clickOutside)

Vue.prototype.$cheerio = cheerio
Vue.prototype.$axios = axios
Vue.prototype.$db = db
Vue.prototype.$config = config
Vue.prototype.$deepClone = deepClone
Vue.config.productionTip = false

// Navigation guard (interceptor) , executes code before each jump of the router
// 导航守卫（拦截器），在router每次跳转前执行
router.beforeEach((to, from, next) => {
  // code
  next()
})

// executes code every time a jump is completed
// 在router每次跳转完成后执行
router.afterEach(() => {
  // code
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
