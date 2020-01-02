<template>
  <div class="login">
    <vue-canvas-nest :config='bgConfig'></vue-canvas-nest>
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
      pwd: ''
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
        }
      })
    }
  }
}
</script>
