<template>
  <div class="dynamicModal">
    <el-dialog title=""
               :visible="openModel"
               :fullscreen='true'
               :show-close='false'>
      <div slot="title">
        <div class="fl"
             @click="closeModel"
             style="font-weight:600;color:#909399;margin-left:40px;">返回</div>
        <div class="fr">
          <el-button type="primary"
                     round
                     class="save">保存</el-button>
        </div>
      </div>
      <div class="body">
        <div class="body-left fl">
          <div class="left-title"></div>
          <div class="left-content">
            <div class="module">
              <div style="overflow: hidden;">
                <i class="el-icon-menu fl mt5 mr10"></i>
                <span class="fl"
                      style="color:#fff;font-size:22px;line-height:30px;display:block">{{moudleName}}</span>
              </div>
              <div class="divider mt15 mb20"></div>
              <div class="chart-instance">
                <!-- <template v-if="echartInit"> -->
                  <div id="echartExample" :style="{display:echartInit?'block':'none'}"></div>
                <template v-if="!echartInit">
                  <div class="fl"
                       style="color:rgba(255,255,255,0.3);font-size:21px;">{{chartType}}</div>
                  <div class="clearfix"></div>
                  <div class="no-msg">{{chartType}}:缺少度量项</div>
                </template>

              </div>
            </div>
          </div>
        </div>
        <div class="body-right fl">
          <div class="rt mb40">模块设计</div>
          <div class="metrics">
            <div style="text-align:left;">
              名称: <el-input v-model="echartName"
                        placeholder="请输入"></el-input>
            </div>
            <div class="mb20 tl">
              X轴<span class="auto-msg">自动导入无锡市所有区</span>
            </div>
            <div class="mb40 tl">
              Y轴<span class="auto-msg">自动导入对比项值</span>
            </div>
            <div class="select-option">
              <div class="so-title">
                <div class="fl">度量项</div>
                <div class="fr">
                  <el-button type="primary"
                             @click="metricModel=true">添加</el-button>
                </div>
              </div>
              <div class="so-table">
                <el-table :data="tableData"
                          stripe
                          style="width: 100%">
                  <el-table-column prop="name"
                                   label="度量项"
                                   width="185"
                                   :show-overflow-tooltip='true'>
                  </el-table-column>
                  <el-table-column prop="value"
                                   label="值"
                                   width="55">
                  </el-table-column>
                  <el-table-column prop="color"
                                   label="自定义颜色"
                                   width="85">
                    <template slot-scope="scope">
                      <el-popover placement="bottom"
                                  title="自定义颜色"
                                  width="225"
                                  trigger="click">
                        <div style="overflow:hidden;">
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#48DD7C")'
                                 style="background:#48DD7C;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#FF4A67")'
                                 style="background:#FF4A67;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#6D6CDB")'
                                 style="background:#6D6CDB;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#008EFC")'
                                 style="background:#008EFC;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#62D1FA")'
                                 style="background:#62D1FA;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#FFD528")'
                                 style="background:#FFD528;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#FFA81E")'
                                 style="background:#FFA81E;"></div>
                          </div>
                          <div class="bor-round fl">
                            <div class="round fl"
                                 @click='changeColor(scope.$index, tableData,"#FF5640")'
                                 style="background:#FF5640;"></div>
                          </div>
                        </div>
                        <div style="width:12px;height:12px;"
                             :style="{background:scope.row.color}"
                             slot="reference">
                        </div>
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column prop="operate"
                                   label="操作"
                                   width="55">
                    <template slot-scope="scope">
                      <el-button @click.native.prevent="deleteRow(scope.$index, tableData)"
                                 type="text"
                                 size="small">
                        移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="r-footer"
               @click="updateChart">
            更新左侧
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="添加度量项"
               :visible="metricModel"
               width="910px"
               custom-class="add-metric"
               :center="false">
      <div v-for="(item, index) in pieOptionData"
           :key="index"
           style="overflow:hidden;">
        <div class="fl"
             style="width:40%">{{item.name}}</div>
        <div class="fl ml30">{{item.value}}</div>
        <div class="fr">
          <el-checkbox v-model="item.check"></el-checkbox>
        </div>
      </div>
      <div slot="footer">
        <el-button round
                   @click="metricModel = false">取 消</el-button>
        <el-button round
                   type="primary"
                   @click="updataTable">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    openModel: {
      type: Boolean,
      default: false
    },
    chartType: {
      type: String,
      default: '堆积柱状图'
    }
  },
  data () {
    return {
      moudleName: '模块未命名',
      myEchart: '',
      echartInit: false,
      echartName: '',
      tableData: [],
      metricModel: false,
      optionData: [{
        name: '学校所处区域是否是老城区',
        value: 11,
        data: [11, 22, 32, 12, 321, 23, 21],
        check: false,
        color: '#FFA81E'
      }, {
        name: '小学部当年班级总数',
        value: 23,
        data: [11, 22, 32, 12, 321, 23, 21],
        check: false,
        color: '#FF4A67'
      }, {
        name: '小学部当年年级数',
        value: 12,
        data: [11, 22, 32, 12, 321, 23, 21],
        check: false,
        color: '#62D1FA'
      }, {
        name: '小学在校学生总数（单位：人）',
        value: 3242,
        data: [11, 22, 32, 12, 321, 23, 21],
        check: false,
        color: '#48DD7C'
      }], // 增加柱状图度量项数据
      pieOptionData: [{
        name: '学校所处区域是否是老城区',
        value: 11,
        data: [{value: 11, itemStyle: {color: '#FFA81E'}, name: '学校所处区域是否是老城区'}],
        check: false,
        color: '#FFA81E'
      }, {
        name: '小学部当年班级总数',
        value: 23,
        data: [{value: 23, itemStyle: {color: '#FF4A67'}, name: '小学部当年班级总数'}],
        check: false,
        color: '#FF4A67'
      }, {
        name: '小学部当年年级数',
        value: 12,
        data: [{value: 12, itemStyle: {color: '#62D1FA'}, name: '小学部当年年级数'}],
        check: false,
        color: '#62D1FA'
      }, {
        name: '小学在校学生总数',
        value: 32,
        data: [{value: 32, itemStyle: {color: '#48DD7C'}, name: '小学在校学生总数'}],
        check: false,
        color: '#48DD7C'
      }],
      // 堆积柱状图数据
      barOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: [],
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        series: [
        ]
      },
      barOptions1: {
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['Forest', 'Steppe', 'Desert', 'Wetland'],
          textStyle: {
            color: '#fff'
          }
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {show: false},
            data: ['2012', '2013', '2014', '2015', '2016']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
        ]
      },
      pieOption: {
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          color: '#fff',
          data: [],
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    // 更新表格数据
    updataTable () {
      this.pieOptionData.forEach(res => {
        if (res.check) {
          let num = 0
          this.tableData.forEach(item => {
            if (item.name == res.name) {
              num++
            }
          })
          if (num == 0) {
            this.tableData.push(res)
          }
        }
      })
      if (this.tableData.length > 0) {
        this.echartInit = true
        // 生成图表
        setTimeout(this.updateChart(), 500)
      }
      this.metricModel = false
      // this.updateChart()
    },
    // 更新echart图表
    updateChart () {
      if (this.echartName != '') {
        this.moudleName = this.echartName
      }
      this.pieOption.series[0].data = []
      this.pieOption.legend.data = []
      this.tableData.forEach(res => {
        // let series = {
        //   type: 'pie',
        //   radius: '55%',
        //   center: ['50%', '60%'],
        //   data: []
        // }

        // series.name = res.name
        // series.data.push(res.data[0])
        // series.color = res.color
        this.pieOption.series[0].data.push(res.data[0])
        this.pieOption.legend.data.push(res.name)
      })
      console.log(this.pieOption)
      this.myEchart = this.$echarts.init(document.getElementById('echartExample'))
      this.myEchart.clear()
      this.myEchart.setOption(this.pieOption)
    },
    // 更改颜色
    changeColor (index, row, val) {
      row[index].color = val
      row[index].data[0].itemStyle.color = val
      // 生成图表
      this.updateChart()
    },
    // 删除当前行
    deleteRow (index, rows) {
      this.pieOptionData.forEach(res => {
        if (res.name == rows[index].name) {
          res.check = false
        }
      })
      rows.splice(index, 1)
      // 生成图表
      this.updateChart()
    },
    // 关闭模态框
    closeModel () {
      this.moudleName = '模块未命名'
      this.echartName = ''
      this.echartInit = false
      this.tableData = []
      this.myEchart.clear()
      this.$emit('closeModel', false)
    }
  }
}
</script>

<style>
</style>
