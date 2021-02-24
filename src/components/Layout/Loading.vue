<template>
  <div class="loader loader4">
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data () {
    return {}
  },

  methods: {}
}
</script>
<style lang='less' scoped>
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: rotate(0deg);
    border-top-color: rgba(0, 0, 0, 0.5);
  }
  50% {
    transform: rotate(180deg);
    border-top-color: rgba(0, 0, 255, 0.5);
  }
  100% {
    transform: rotate(360deg);
    border-top-color: rgba(0, 0, 0, 0.5);
  }
}
* {
  box-sizing: border-box;
}

body {
  background: #f9f9f9;
  padding-bottom: 100px;
}

h1,
h3 {
  display: block;
  margin: 0px auto;
  text-align: center;
  font-family: "Tahoma";
  font-weight: lighter;
  color: rgba(0, 0, 0, 0.5);
  letter-spacing: 1.5px;
}

h1 {
  margin: 50px auto;
}

.loader {
  position: relative;
  margin: 75px auto;
  width: 150px;
  height: 150px;
  display: block;
  overflow: hidden;
}
.loader div {
  height: 100%;
}

/* loader 4 */
.loader4,
.loader4 div {
  border-radius: 50%;
  padding: 8px;
  border: 2px solid transparent;
  animation: rotate linear 3.5s infinite;
  border-radius: 50%;
  padding: 4px;
  animation: rotate2 4s infinite linear;
}

div:hover {
  animation-play-state: paused;
}

.loader,
.loader * {
  will-change: transform;
}
</style>
