<template>
  <div class="web-aside">
    <div v-for="(item,index) in list"
         :key="index"
         class="item"
         :class="item.acitve?'active':''"
         @click="chooseItem(index,item)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
        name: '图表',
        acitve: true,
        path: '/setting/echart'
      }, {
        name: '拖动',
        acitve: false,
        path: '/setting'
      }, {
        name: '设置',
        acitve: false,
        path: '/setting'
      }, {
        name: '视频',
        acitve: false,
        path: '/setting/video'
      }] // 菜单列表
    }
  },
  methods: {
    chooseItem (index, item) {
      this.list.forEach((res, num) => {
        if (index == num) {
          console.log(res.path)
          res.acitve = true
          this.$emit('childAside', res.path)
          this.$router.push({'path': res.path})
        } else {
          res.acitve = false
        }
      })
    },
    changeRouter () {

    }
  }
}
</script>

<style lang="less" scoped>
.web-aside {
  .item {
    height: 40px;
    line-height: 40px;
    &:hover {
      background: #f1f1f1;
    }
  }
  .active {
    background: #f1f1f1;
  }
}
</style>>

</style>
