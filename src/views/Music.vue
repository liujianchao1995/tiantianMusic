<template>
  <div class="music-page">
    <album-detail />
  </div>
</template>

<script>
import AlbumDetail from '@/components/Layout/AlbumDetail.vue'
const ipc = require('electron').ipcRenderer
export default {
  components: { AlbumDetail },
  data () {
    return {

    }
  },
  methods: {
    get () {
      console.log()
    },
    openDialogByRemote () {
      const { dialog } = require('electron').remote
      dialog.showMessageBox({ title: '你好', message: '来自主进程的消息：', detail: '我是来自主进程的dialog，使用remote过来的！', type: 'info' })
    },
    openDialogByIpc () {
      ipc.send('showDialog', `<${this.$t('a message')}>`)
    }
  }

}
</script>

<style lang="less" scoped>
</style>
