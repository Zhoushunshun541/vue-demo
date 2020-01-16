<template>
  <div class="module-title">
    <div class="clearfix">
      <i :class="icon"></i>
      <span class="title">{{ title }}</span>
      <i v-if="needMore" @click="goNext()" class="next el-icon-d-arrow-right fr"></i>
    </div>
    <div class="module-line"></div>
  </div>
</template>

<script>
export default {
  name: 'ModuleTitle',
  props: {
    title: {
      type: String,
      default: '模块名称'
    },
    icon: {
      type: String,
      default: 'el-icon-setting'
    },
    needMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    goNext() {
      this.$emit('goMore')
    }
  }
}
</script>
<style lang='less'>
.module-title {
  font-size: 14px;
  .module-line {
    margin-top: 10px;
    height: 1px;
    background-image: linear-gradient(
      270deg,
      rgba(238, 238, 238, 0) 0%,
      #00b1ff 100%
    );
  }
  .title {
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
  }
  i {
    margin-right: 5px;
    font-size: 14px;
    vertical-align: middle;
    color: #69AADD;
    &.next {
      margin-top: 3px;
      font-size: 20px;
      cursor: pointer;
    }
  }
}
</style>
