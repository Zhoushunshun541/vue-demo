<template>
  <div class="dynamicEchart">
    <div class="left">
      <basic-statistic
        :title="'基础统计'"
        :table-header="tableHeader"
        :table-data="tableData"
        class="half">
      </basic-statistic>
      <custom
        @switchModel="openModel">
      </custom>
    </div>
    <dynamic-Modal
      :openModel='customModule1'
      @closeModel='closeModel'
      ></dynamic-Modal>
  </div>
</template>

<script>
import basicStatistic from '../components/basic'
import custom from '../components/custom'
import dynamicModal from '../components/dynamic/dynamicModal'
export default {
  name: 'dynamicEchart',
  components: {
    basicStatistic,
    custom,
    dynamicModal
  },
  data () {
    return {
      tableHeader: [
        '区名称',
        '学校总个数(个)',
        '教师总人数(人)',
        '学生总人数(人)',
        '占地总面积(平方)',
        '建筑总面积(平方)'
      ],
      tableData: [],
      customModule1: false
    }
  },
  methods: {
    openModel (val) {
      this.customModule1 = val
    },
    closeModel (val) {
      this.customModule1 = val
    }
  }
}
</script>

<style>

</style>
