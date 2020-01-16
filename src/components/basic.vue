<template>
  <div class="basic-statistic">
    <module-title :title="title" :icon="icon"></module-title>
    <sample-table :table-header="tableHeader" :table-data="newData" go-more @update:goMore="goRegion"></sample-table>
  </div>
</template>

<script>
import moduleTitle from './wiget/moduleTitle'
import sampleTable from './wiget/sampleTable'
export default {
  name: 'Basic',
  components: {
    moduleTitle,
    sampleTable
  },
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
    },
    tableHeader: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    goRegion(val) {
      this.$router.push('/region_index?region_id=' + this.tableData[val].region_id)
    }
  },
  computed: {
    newData: function () {
      return this.tableData.map(list => {
        return {
          region_name: list.region_name,
          school_number: list.school_number,
          teacher_number: list.teacher_number,
          student_number: list.student_number,
          cover: list.cover,
          floorage: list.floorage
        }
      })
    }
  }
}
</script>
<style lang='less'>
.basic-statistic {
  padding-bottom: 10px;
  max-height: 480px;
  overflow: hidden;
  &:hover{
    overflow-y: scroll;
  }
}
.basic-statistic::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(255, 255, 255, 0) !important;
  }
.basic-statistic::-webkit-scrollbar-thumb {
  background-color: #0090FF !important;
}
</style>
