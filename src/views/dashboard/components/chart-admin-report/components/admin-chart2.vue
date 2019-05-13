<template>
  <div style="height: 100%">
    <echarts
      v-if="reportData.length"
      :viewOpt='viewOpt'
      :modelOpt='modelOpt'
      renderer='svg'>
    </echarts>
    <p v-else>{{ emptyText }}</p>
  </div>
  
</template>

<script>
  import { Echarts } from '@/components/common'
  import viewOptConf from "./admin-chart.conf";
  export default {
    name: 'AdminReport',
    props: {
      reportData: [ Array ],
      emptyText: {
        type: String,
        default: 'There is no data in recent 7 days.'
      }
    },

    data() {
      return {
        viewOpt: {}
      }
    },

    watch: {
    },

    computed: {
      modelOpt() {
        if(!this.reportData.length) {
          return
        }

        this.reportData.shift()

        let nameList = this.reportData.map(data => {
          return data[0]
        })

        let clickData = this.reportData.map(data => {
          return data[1]
        })

        let convData = this.reportData.map(data => {
          return data[2]
        })

        let maxClickData = Math.ceil(Math.max(...clickData)/10)*10,
            maxConvData = Math.ceil(Math.max(...convData)/10)*10

        return {
          // dataset: {
          //   source: this.reportData.map(data => {
          //     return [].concat(data)
          //   })
          // },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: nameList
            } 
          ],
          yAxis: [
              {
                name: 'Clicks',
                min: 0,
                max: maxClickData,
                interval: Math.ceil(maxClickData / 5)
              },
              {
                name: 'Conversions',  
                min: 0,
                max: maxConvData,
                interval: Math.ceil(maxConvData / 5)
              }
          ],
          series: [
            {
              type:'line',
              data: clickData
            },
            {
              type:'line',
              data: convData,
              yAxisIndex: 1,
            }
          ],
        }
      }
    },

    components: { Echarts },

    created() {
      this.viewOpt = viewOptConf
    },

    methods: {
    },

    mounted() {
      
    }
  };
</script>
