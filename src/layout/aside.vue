<template>
  <div class="web-aside">
    <div
      v-for="(item,index) in list"
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
        path: 'success'
      }, {
        name: '拖动',
        acitve: false,
        path: 'success'
      }, {
        name: '设置',
        acitve: false,
        path: 'success'
      }, {
        name: '呵呵哒',
        acitve: false,
        path: 'success'
      }] // 菜单列表
    }
  },
  methods: {
    chooseItem (index, item) {
      this.list.forEach((res, num) => {
        if (index == num) {
          res.acitve = true
          this.$emit('childAside', res.path)
        } else {
          res.acitve = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.web-aside{
  .item{
    height: 40px;
    line-height: 40px;
    &:hover{
      background: #f1f1f1;
    }
  }
  .active{
    background: #f1f1f1;
  }
}
</style>>

</style>