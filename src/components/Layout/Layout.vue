<template>
  <div class="layout">
    <div class="layout-bar">
      <div class="layout-title">
        <img src="~@/assets/logo.png">
        <span>{{ this.$config.appShowName }}</span>
      </div>
      <header-bar />
    </div>

    <div class="layout-content">
      <perfect-scrollbar
        ref="Scrollbar"
        class="layout-left-list"
      >
        <menu-list />
      </perfect-scrollbar>
      <div class="layout-right-main">
        <router-view class="content-page" />
        <play-bar class="play-bar" />
      </div>
      <!--  <locale-changer style="position: fixed; right: 30px; top: 50px;" /> -->
    </div>
  </div>
</template>

<script>
import MenuList from './MenuList'
import HeaderBar from './HeaderBar'
import PlayBar from './PlayBar'
// import localeChanger from '@/components/localeChanger'

export default {
  name: 'Layout',
  components: {
    MenuList,
    HeaderBar,
    PlayBar
  },
  data () {
    return {}
  },
  mounted () {
    if (this.$route.path === '/') this.$router.push({ name: 'Music' })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  width: 100%;
  color: #b2ccd6;
}
.layout-bar {
  color: #b2ccd6;
  display: flex;
  -webkit-app-region: drag;
  height: 70px;
}
.layout-title {
  width: 200px;
  height: 100%;
  font-size: 20px;
  color: #393939;
  background: #f0f0f0;
  padding-left: 30px;
  display: flex;
  align-items: center;
  img {
    width: 25px;
    height: 25px;
    border-radius: 10px;
    margin-right: 10px;
  }
}
.layout-content {
  width: 100%;
  height: ~"calc(100% - 70px)";
  display: flex;
  .layout-left-list {
    width: 200px;
    height: 100%;
    background: #f0f0f0;
    padding: 0 20px;
  }
  .layout-right-main {
    flex: 1;
    background: #f6f6f6;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .play-bar {
      width: 100%;
      height: 80px;
    }
    .content-page {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
