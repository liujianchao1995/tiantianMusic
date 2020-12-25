
import Vue from 'vue'
import {
  Table,
  Header,
  Column,
  Footer,
  Filter,
  Edit,
  Menu,
  Export,
  Keyboard,
  Validator

/*   Grid,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  Select,
  Switch,
  List */
} from 'vxe-table'

// 表格模块
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Edit)
Vue.use(Menu)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Column)

/* // 可选组件
Vue.use(Column)
Vue.use(Grid)
Vue.use(Tooltip)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Switch)
Vue.use(Input)
Vue.use(Select)
Vue.use(Button)
Vue.use(Modal)
Vue.use(List) */

// 安装表格
Vue.use(Table)

/* // 给 vue 实例挂载内部对象，例如：
Vue.prototype.$XModal = VXETable.modal
Vue.prototype.$XPrint = VXETable.print
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile */
