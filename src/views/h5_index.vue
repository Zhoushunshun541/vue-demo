
<template>
  <div>
    <el-button type="primary" @click="openCamera">打开摄像头</el-button>
    <div class="test">
    <video autoplay
           playsinline
           ref="video"
           id="video"></video>
    </div>
    <canvas id="canvas"
            width="500"
            height="400"
            class="canvas"></canvas>
    <div @click="submit">上传照片</div>
  </div>
</template>
<script>
import '@/assets/js/face-min.js'
export default {
  name: 'componentName',
  data () {
    return {
      videoEle: null
    }
  },
  methods: {
    openCamera () {
      let tracker = new window.tracking.ObjectTracker('face')
      tracker.setStepSize(2)
      // //  转头角度影响识别率
      tracker.setEdgesDensity(0.13)
      tracker.setInitialScale(5)
      this.trackerTask = window.tracking.track('#video', tracker, {camera: true})
      tracker.on('track', (event) => {
        if (event.data.length > 0) {
          console.log('有头像')
          // 人脸位置矩形顶点
          console.log(event.data)
        } else {
          console.log('没有头像')
        }
      })
    }
  },
  mounted () {
    this.videoEle = this.$refs.video
  },
  destroyed () {
    // 停止侦测
    this.trackerTask.stop()
    // 关闭摄像头
    window.tracking.closeCamera()
  }
}
</script>
<style lang="less" scoped>
.test{
  background: rgba(0, 0, 0,0.1);
}
</style>