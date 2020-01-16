<template>
  <div class="map">
    <div :id="documentId" :style="{height: '500px', width: '100%'}"></div>
  </div>
</template>

<script>
import axios from 'axios'
import 'echarts/map/js/china.js'
export default {
  name: 'WxMap',
  props: {
    documentId: {
      type: String,
      default: 'wx-map'
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
      mapJson: {}
    }
  },
  methods: {
    init() {
      axios({
        method: 'get',
        url: this.statisticData.geojson_url + '?random=' + Math.random()
      }).then(res => {
        if (res.status === 200) {
          this.mapJson = res.data
          this.drawChinaMap()
        }
      })
    },
    drawChinaMap() {
      let myChart = this.$echarts.init(document.getElementById(this.documentId))
      this.$echarts.registerMap('WX', this.mapJson)
      let wxMapOption = {
        geo: {
          map: 'WX',
          zoom: 1.2
        },
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          formatter: function(params) {
            let res = '学校个数' + '<br/>' + '全部 ' + params.value + '<br/>'
            params.data.child.forEach(child => {
              res += child.stage_name + ' ' + child.number + '<br/>'
            })
            return res
          }
        },
        series: [
          {
            name: '无锡市',
            type: 'map',
            mapType: 'WX',
            geoIndex: 1,
            aspectScale: 0.75,
            roam: false,
            zoom: 1.2,
            label: {
              normal: {
                textStyle: {
                  fontSize: 12,
                  color: '#fff'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 14
                }
              }
            },
            itemStyle: {
              normal: {
                // 正常样式
                borderColor: '#007AFF',
                areaColor: 'rgba(25,66,138,1)',
                borderWidth: 1,
                label: { show: true },
                normal: { label: { show: true } },
                emphasis: { label: { show: true } }
              },
              emphasis: {
                // 鼠标事件区块样式
                label: {
                  show: true,
                  color: '#AA600D'
                },
                areaColor: '#3d9ae8',
                borderWidth: 1,
                borderColor: '#58acf8',
                shadowBlur: 2,
                shadowColor: '#85E3FF'
              }
            },
            data: this.statisticData.list.map(list => {
              return {
                name: list.region_name,
                id: list.region_id,
                value: list.school_number,
                child: list.stage
              }
            })
          }
        ]
      }
      myChart.setOption(wxMapOption)
      myChart.on('click', param => {
        this.$router.push({
          path: '/region_index',
          query: {
            region_id: param.data.id
          }
        })
      })
    }
  }
}
</script>
<style lang='less'>
</style>
