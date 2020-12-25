<template>
  <div class="music-list-page">
    <vxe-table
      :data="tableData"
      border="none"
      class="mytable-style"
      empty-text="无数据"
      highlight-hover-row
    >
      <vxe-table-column
        v-for="(item,index) in tableHead"
        :key="index"
        show-overflow="ellipsis"
        :field="item.name"
        :title="item.title"
      >
        <template
          v-if="item.name == 'musicName'"
          v-slot="{row}"
        >
          <div class="music-name-td" @dblclick="playMusic(row)">
            <!-- 是否为用户所收藏-->
            <i :class="['is-love','iconfont',row['isLove'] ? 'iconico-love-on' : 'iconico-love-off']" />
            <!-- 歌曲名 -->
            <span class="name">{{ row['musicName'] }}</span>
            <!-- 是否为VIP歌曲 -->
            <span
              v-if="row['isVIP']"
              class="is-VIP"
            >{{ row['isVIP'] }}</span>
            <!-- 音质类别 -->
            <span
              v-if="row['musicQuality']"
              :class="['quality',row['musicQuality']]"
            >{{ row['musicQuality'] }}</span>
            <!-- 是否存在MV片段-->
            <i
              v-if="row['isMV'] "
              class="is-MV iconfont iconvideo2"
            />
          </div>
        </template>
        <template
          v-else
          v-slot="{row}"
        >
          <div class="music-list-td">
            <span>{{ row[item.name] }}</span>
          </div>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
// import { filterChapters } from '@/utils/tools'
export default {
  name: 'MusicList',
  data () {
    return {
      tableData: [
        /*         {
          musicName: '有谁共鸣',
          musicSinger: '张国荣',
          musicAlbum: '张国荣纪念金唱片',
          musicQuality: 'SQ',
          isLove: true
        },
        {
          musicName: '有谁共鸣',
          musicSinger: '张国荣',
          musicAlbum: '张国荣纪念金唱片',
          musicQuality: 'HQ',
          isMV: true
        } */
      ],
      tableHead: [
        {
          title: '歌曲',
          name: 'musicName'
        },
        {
          title: '歌手',
          name: 'musicSinger'
        },
        {
          title: '专辑',
          name: 'musicAlbum'
        }
      ]
    }
  },
  watch: {
    '$store.state.musicList.musicListData': {
      handler (newVal) {
        this.tableData = newVal.map(item => {
          return {
            id: item.id,
            cid: item.copyrightId,
            musicName: item.songName,
            musicSinger: item.singerName,
            musicAlbum: item.albumName,
            musicQuality: item.hasSQqq ? 'SQ' : (item.hasHQqq ? 'HQ' : null),
            albumSrc: item.cover,
            musicSrc: item.mp3,
            lycSrc: item.lyrics,
            hasMv: item.hasMv,
            isLove: false
          }
        })
      },
      immediate: true
    }
  },
  methods: {
    playMusic (data) {
      this.$store.commit('playBar/TOGGLE_MUSIC', {
        id: data.id,
        cid: data.cid,
        name: data.musicName,
        src: data.musicSrc,
        imgSrc: data.albumSrc,
        singer: data.musicSinger,
        album: data.musicAlbum,
        duration: '',
        lrcSrc: data.lycSrc
      })
    }
  }
}
</script>
<style lang='less' scoped>
.music-list-page {
  .mytable-style {
    .music-name-td {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        cursor: pointer;
      }
      .is-love {
        position: relative;
        top: 1px;
        margin-right: 5px;
        cursor: pointer;
        color: #ff6a6a;
      }
      .quality {
        display: inline-block;
        font-size: 8px;
        font-weight: 900;
        line-height: 8px;
        padding: 0 1px;
        border: 1px solid #ff6600;
        position: relative;
        top: -2px;
        margin: 0 5px;
        cursor: pointer;
        &.SQ {
          color: #ff6600ad;
          border-color: #ff6600ad;
        }
        &.HQ {
          color: #1ecc94;
          border-color: #1ecc94;
        }
      }
      .is-MV {
        font-size: 14px;
        cursor: pointer;
        color: #535252;
      }
    }
    .music-list-td {
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
