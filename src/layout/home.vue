<template>
  <div class="base-layout">
    <el-container>
    <el-header>
      <web-header></web-header>
    </el-header>
    <el-container>
      <el-aside :width="leftP">
        <web-aside @childAside="changeRouter"></web-aside>
      </el-aside>
      <!-- 拖动分割线 -->
      <div class="drag" @mousedown="touchstart"></div>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  </div>
</template>
<script>
import webHeader from './header'
import webAside from './aside'
export default {
  components: {
    webHeader,
    webAside
  },
  data () {
    return {
      rightP: '',
      leftP: '200px',
      positionX: 0,
      positionY: 0,
      screenWidth: ''
    }
  },
  methods: {
    touchstart (e) {
      let odiv = e.target// 获取目标元素
      // 算出鼠标相对元素的位置
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e) => {       // 鼠标按下并移动的事件
        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        let left = e.clientX - disX
        let top = e.clientY - disY
        // 绑定元素位置到positionX和positionY上面
        this.positionX = left
        // 移动当前元素
        odiv.style.left = left + 'px'
        this.leftP = (this.positionX / this.screenWidth) * 100 + '%'
        this.rightP = (1 - (this.positionX / this.screenWidth)) * 100 + '%'
      }
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    // 路由跳转
    changeRouter (data) {

    }
  },
  // 监听浏览器大小变化
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
      return (() => {
        this.screenWidth = document.body.clientWidth
      })()
    }
  }
}
</script>
<style lang="less" scoped>
  .drag{
    position: absolute;
    left: 200px;
    cursor: move;
    width: 2px;
    height: 500px;
    background: #000;
  }
  .el-main{
    background: #f1f1f1;
  }
</style>