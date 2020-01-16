<template>
  <div class="region-statistic">
    <module-title :title="title" :icon="icon"></module-title>
    <react :react-list="reactList"></react>
    <div class="number mt50">
      <div>
        <div>学校总个数</div>
        <count-to
          :start-val="0"
          :end-val="statisticData.school_count"
          :duration="2600"
          class="card-panel-num"
        />
      </div>
      <div>
        <div>教师总人数</div>
        <count-to
          :start-val="0"
          :end-val="statisticData.teacher_count"
          :duration="2600"
          class="card-panel-num"
        />
      </div>
    </div>
  </div>
</template>

<script>
import moduleTitle from '../wiget/moduleTitle'
import react from '../wiget/react'
import CountTo from 'vue-count-to'
export default {
  name: 'Region',
  components: {
    moduleTitle,
    react,
    CountTo
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
    statisticData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    statisticData: function() {
      this.init()
    }
  },
  data() {
    return {
      reactList: []
    }
  },
  methods: {
    init() {
      this.reactList = [
        {
          name: '学生总人数 (人)',
          value: this.statisticData.student_count,
          last: this.statisticData.last_student_count,
          color: 'yellow'
        },
        {
          name: '占地总面积 (平方)',
          value: this.statisticData.cover,
          last: this.statisticData.last_cover,
          color: 'orange'
        },
        {
          name: '建筑总面积 (平方)',
          value: this.statisticData.floorage,
          last: this.statisticData.last_floorage,
          color: 'blue'
        }
      ]
    }
  }
}
</script>
<style lang='less'>
.region-statistic {
  margin-bottom: 50px;
}
.mt50 {
  margin-top: 50px;
}
.number {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  > div {
    display: flex;
    text-align: center;
    flex-direction: column;
    justify-content: center;
    color: #00d3fb;
    .card-panel-num {
      margin-top: 5px;
      font-size: 26px;
      font-weight: 500;
      color: #fff;
      background: #3d9ae8;
      border-radius: 5px;
      text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.3),
        0px -1px 0px rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
