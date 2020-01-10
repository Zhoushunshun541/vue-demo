<template>
  <div class="web-header">
    周顺顺的小玩意
    <el-dropdown trigger='click' @command='changeStatus'>
      <i class="el-icon-setting" ></i>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command='1'>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    changeStatus (e) {
      if (e == 1) {
        this.$router.push({path: '/'})
        this.$message({
          message: '退出成功',
          type: 'success'
        })
        this.$store.commit('del_token')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.web-header{
  color: #fff;
  font-size: 26px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  background: #79C4D3;
  height: 60px;
  width: 100%;
  min-width: 1000px;
  .el-dropdown{
    float: right;
    font-size: 26px;
    color: #fff;
    margin-right: 20px;
  }
}
</style>
