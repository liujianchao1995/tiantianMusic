<template>
  <div class="menu-list-page">
    <div
      v-for="(item,index) in leftListData"
      :key="index"
      class="list-group"
    >
      <span class="ul-tilte">{{ item.ulTitle }}</span>
      <ul>
        <li
          v-for="(itemc,indexc) in item.list"
          :key="indexc"
          :class="{'active':itemc.active}"
          @click="clickLi(itemc.name)"
        >
          <i :class="['iconfont',itemc.icon]" />
          <span>{{ itemc.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuList',
  data () {
    return {
      leftListData: [
        {
          ulTitle: '在线音乐',
          list: [
            {
              name: 'Music',
              title: '音乐馆',
              icon: 'iconmusic'
            },
            {
              name: 'Video',
              title: '视频',
              icon: 'iconvideo'
            },
            {
              name: 'Fm',
              title: '电台',
              icon: 'iconFM'
            }
          ]
        },
        {
          ulTitle: '在线音乐',
          list: [
            {
              name: 'music1',
              title: '音乐馆',
              icon: ''
            },
            {
              name: 'video1',
              title: '视频',
              icon: ''
            },
            {
              name: 'fm1',
              title: '电台',
              icon: ''
            }
          ]
        },
        {
          ulTitle: '在线音乐',
          list: [
            {
              name: 'music2',
              title: '音乐馆',
              icon: ''
            },
            {
              name: 'video2',
              title: '视频',
              icon: ''
            },
            {
              name: 'fm2',
              title: '电台',
              icon: ''
            }
          ]
        },
        {
          ulTitle: '在线音乐',
          list: [
            {
              name: 'music3',
              title: '音乐馆',
              icon: ''
            },
            {
              name: 'video3',
              title: '视频',
              icon: ''
            },
            {
              name: 'fm3',
              title: '电台',
              icon: ''
            }
          ]
        },
        {
          ulTitle: '在线音乐',
          list: [
            {
              name: 'music4',
              title: '音乐馆',
              icon: ''
            },
            {
              name: 'video4',
              title: '视频',
              icon: ''
            },
            {
              name: 'fm4',
              title: '电台',
              icon: ''
            }
          ]
        }
      ]
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler (newVal, oldVal) {
        // eslint-disable-next-line prefer-const
        for (let item of this.leftListData) {
          for (const itemc of item.list) {
            if (itemc.name === newVal.name) itemc.active = true
            else itemc.active = false
          }
        }
      }
    }
  },
  methods: {
    clickLi (name) {
      console.log(name)
    }
  }
}
</script>
<style lang='less' scoped>
.list-group {
  margin-bottom: 30px;
  &:first-child {
    padding-top: 20px;
  }
  .ul-tilte {
    font-size: 12px;
    color: #9a9a9a;
    display: block;
    margin-bottom: 20px;
    padding: 0 10px;
  }
  li {
    width: 160px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #303030;
    margin-bottom: 10px;
    border-radius: 5px;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background: #d9d9d9;
    }
    &.active {
      color: #d2f6ee;
      background: linear-gradient(to right,#1ed3ae ,#1ecc94);
    }
    i {
      position: relative;
      top: 1px;
      margin-right: 8px;
    }
  }
}
</style>
