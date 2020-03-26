<template>
  <div class="login">
  测试一下
    <vue-canvas-nest :config='bgConfig'></vue-canvas-nest>
    <div class="login-model">
      <div class="mb10 login-title" style="color:#fff;">登录</div>
      <div class="mb20 bb-color">
        <input type="text" v-model="name" placeholder="请输入账户" class="login-input">
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
        color: '107, 148, 244', // 线条颜色
        pointColor: '85,168,248',
        opacity: 1, // 透明度
        count: 500 // 线条数量500
      },
      username: '',
      passport: '',
      changeBg: 1, // 切换登录背景图  动态图过于消耗内存
      loginToken: '', // 登录token
      loading: false // 登录按钮loading状态
    }
  },
  methods: {
    login () {
      this.loading = true
      // 使用base64加密   md5加密不可逆 适合注册登录  暂时不做
      let Base64 = require('js-base64').Base64
      let passport = Base64.encode(this.passport)
      let params = {
        username: this.username,
        passport: passport
      }
      getAllUser({
        ...params
      }).then(response => {
        let _this = this
        if (response.data.success === 'success') {
          _this.$message({
            message: response.data.message,
            type: 'success'
          })
          _this.loginToken = response.data.data
          _this.$store.commit('set_token', response.data.data)
          // window.location.href = 'http://localhost:8081/setting/echart'
          // window.location.href = 'http://139.196.33.88:8088/setting/echart'
          _this.$router.push({path: '/echart'})
        } else {
        }
      }).catch(error => {
        console.log(error)
        this.loading = false
        this.$message({
          message: error.data.message,
          type: 'error'
        })
      })
    }
  },
  created () {
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      // 13是enter键盘事件
      if (key == 13) {
        this.login()
      }
    }
  }
}
</script>
