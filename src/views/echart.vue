<template>
  <div class="echart">
    <el-button type="primary"
               @click="selectEcharts = true">请选择</el-button>
    <button @click="testName">接口测试</button>
    <input type="file" @change="fileUpload" id="upload"></input>
    <el-dialog title="自定义设置"
               :visible='selectEcharts'
               width="1000px">
      <div class="step">
        <el-steps :active="stepActive"
                  finish-status="success"
                  align-center>
          <el-step title="选择表格类型"></el-step>
          <el-step title="设置数据"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="select-echart"
           v-if="stepActive == 0">
        <div class="line-echart ac fl mr15"
             style="width:305px;height:220px"
             :class="selectEchart == 0?'active':''"
             @click="selectEchartOption(0)">
          <div class="active"
               v-if="selectEchart == 0">✓</div>
        </div>
        <div class="bar-echart ac fl mr15"
             style="width:305px;height:220px"
             :class="selectEchart == 1?'active':''"
             @click="selectEchartOption(1)">
          <div class="active"
               v-if="selectEchart == 1">✓</div>
        </div>
        <div class="pie-echart ac fl"
             style="width:305px;height:220px"
             :class="selectEchart == 2?'active':''"
             @click="selectEchartOption(2)">
          <div class="active"
               v-if="selectEchart == 2">✓</div>
        </div>
      </div>
      <div v-if="stepActive == 1">
      </div>
      <div slot="footer">
        <el-button type="primary"
                   @click="stepActive+=1">下一步</el-button>
      </div>
    </el-dialog>
    <a :href="uploadFileUrl">下载文件</a>
  </div>
</template>

<script>
import {testName, uploadFile} from '../api/api'
export default {
  name: 'echart',
  data () {
    return {
      uploadFileUrl: '',
      selectEcharts: false, // 模态框开关
      selectEchart: -1, // 0:折线图 1: 柱状图 2:饼图
      stepActive: 0 // 步骤条
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
    },
    // 接口测试专用
    testName () {
      testName().then(res => {
      })
    },
    selectEchartOption (val) {
      switch (val) {
        case 0:
          this.selectEchart = 0
          break
        case 1:
          this.selectEchart = 1
          break
        case 2:
          this.selectEchart = 2
          break
      }
    },
    // 文件上传
    fileUpload (event) {
      // 上传文件
      console.log(event)

      let file = event.target.files
      let formData = new window.FormData(document.getElementById('upload')[0])
      formData.append('file', file[0])
      // 文件上传
      uploadFile(formData).then(res => {
        if (res.data.success) {
          this.uploadFileUrl = res.data.data
          this.$message({
            message: res.data.message,
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style></style>
