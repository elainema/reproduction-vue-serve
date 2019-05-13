<template>
  <div style="height: 100%">
    <p v-show='reportData === "empty"'>There is no data in recent 7 days.</p>
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
      reportData(data) {
        if(data) {
          let data_date = []
          let data_clicks = []
          let data_conversion = []
          for (let i = 1; i < data.length ; i++) {
              data_date.push(data[i][0]);
              data_clicks.push(data[i][1]);
              data_conversion.push(data[i][2]);
          }
          this.renderHighchart(data_date,data_clicks,data_conversion )
        }
      }
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
      renderHighchart(data_date,data_clicks,data_conversion) {
        $(this.$el).highcharts({
            credits: {
                enabled:0
            },
            chart: {
                type: 'line',
                // , zoomType: 'x'
            },
            title: {
                text: 'Offer Report',
                x: -20 //center
            },
            subtitle: {
                // text: 'Click and drag in the plot area to zoom in. Source: YeahMobi.com',
                text: 'Source: YeahMobi.com',
                x: -20
            },
            xAxis: {
                type: 'datetime',
                categories: data_date
            },
            yAxis: {
                title: {
                    text: 'Counts'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                startOnTick: false
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            series: [
                {
                    name: 'Clicks',
                    data: data_clicks
                }, {
                    name: 'Conversions',
                    data: data_conversion
                }
            ]
        });
      },
    },

    mounted() {
      
    }
  };
</script>
