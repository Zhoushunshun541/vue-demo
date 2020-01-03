<template>
  <div class="login">
    <div :class="changeBg == 1?'your-name':''">
      <template v-if="changeBg == 0" >
        <vue-canvas-nest :config='bgConfig'></vue-canvas-nest>
      </template>
      <div class="login-model">
        <div class="mb10 login-title" style="color:#fff;">登录</div>
        <div class="mb20 bb-color">
          <input type="text" v-model="name" placeholder="请输入账户" class="login-input">
        </div>
        <div class="mb20 bb-color">
          <input type="password" v-model="pwd" placeholder="请输入密码" class="login-input">
        </div>
        <el-button type="primary" round @click="login">登录</el-button>
      </div>
      <div class="change-bg">
        <el-button @click="changeBg = 0" :style="{'color':changeBg==0?'#000':'#fff'}">动态</el-button>
        <el-button @click="changeBg = 1" :style="{'color':changeBg==0?'#000':'#fff'}">星空</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import vueCanvasNest from 'vue-canvas-nest'
import {getAllUser} from '@/api/api'
export default {
  components: {
    vueCanvasNest
  },
  data () {
    return {
      bgConfig: {
        color: '85,168,248', // 线条颜色
        pointColor: '85,168,248',
        opacity: 1, // 透明度
        count: 500 // 线条数量500
      },
      name: '',
      pwd: '',
      changeBg: 1// 切换登录背景图  动态图过于消耗内存
    }
  },
  methods: {
    login () {
      let params = {
        name: this.name,
        pwd: this.pwd
      }
      getAllUser({
        ...params
      }).then(response => {
        if (response.data.success === 'success') {
          this.$message({
            message: response.data.message,
            type: 'success'
          })
          this.$router.push({path: '/success'})
        } else {
          this.$message({
            message: response.data.message,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
