<template>
  <div>
    <div class="progress-bar">
      <div class="progress-bar-bg-line">
        <div
          class="progress-bar-front-line"
          :style="{ width: `${progressVal}%` }"
        >
          <div class="progress-bar-spot-line" />
        </div>
        <input
          v-model.number="progressVal"
          type="range"
          class="progress-bar-input"
          @input="clickBtn('progressInput')"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  data () {
    return {}
  },

  methods: {}
}
</script>
<style lang='less' scoped>
.progress-bar {
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
  .progress-bar-bg-line {
    width: 100%;
    height: 2px;
    background: #dadada;
    position: relative;
    .progress-bar-front-line {
      width: 30%;
      height: 100%;
      background: #1ecc94;
      position: relative;
    }
    .progress-bar-input {
      width: 100%;
      height: 100%;
      position: absolute;
      opacity: 0;
    }
  }
  &:hover {
    .progress-bar-spot-line {
      width: 10px;
      height: 10px;
      position: absolute;
      top: -4px;
      right: -5px;
      border-radius: 50%;
      background: #1ecc94;
    }
  }
}
</style>
