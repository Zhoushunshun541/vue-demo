<template>
  <div class="custom half" @click="customContent">
    <div class="center">
      <i class="el-icon-plus"></i>
      <div style="margin-top:10px;color:#8D9DBC;">自定义模块内容</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom',
  props: {
    switch: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    customContent () {
      this.$emit('switchModel', true)
    }
  }
}
</script>

<style>

</style>
