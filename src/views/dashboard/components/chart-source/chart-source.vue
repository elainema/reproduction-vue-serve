<template>
  <div class ='chart-source-content'>
    <header>
      <div class="title">
        Source
      </div>
      <div>
        <el-button  class="down-btn"  @click="downLoadSource"><i class="el-icon-download"></i> Download</el-button>
        <el-radio-group v-model="type" class='radio-group'>
        <el-radio-button label="appsflyer">Appsflyer</el-radio-button>
        <el-radio-button label="adjust">Adjust</el-radio-button>
        <el-radio-button label="mat">Mat</el-radio-button>
        <el-radio-button label="Yandex">Yandex</el-radio-button>
        </el-radio-group>
      </div>
    </header>
    <echarts
        v-yeah-loading='loading'
        class='zindex0 box-chart-source'
        :viewOpt='viewOpt'
        :modelOpt='modelOpt'
        >
    </echarts>
    <div v-if="sourceData.length < 1 && !loading" class="empty-image">
        <img src="@/assets/image/empty.png" />
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import { mapGetters, mapActions } from 'vuex'
  import viewOptConf from "./conf";
  import { CacheService } from '@/util/cacheService'
  import { Echarts } from '@/components/common'
  import cors_config from '@/util/config'

  export default {
    name: 'chart-total-adv',
    props: {
      emptyText: {
        type: String,
        default: 'There is no data in recent 7 days.'
      },
      roleName: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        type: 'appsflyer',
        loading: true,
        reportData: [],
        viewOpt: {},
        sourceData: []
      }
    },

    components: { Echarts },
    
    watch: {
      type(val) {
        this.fetchSourceData()
        this.$ga && this.$ga.event(this.roleName, 'source', this.type)
      }
    },

    computed: {
      ...mapGetters({
        userInfo: 'userInfo',
      }),
      modelOpt() {
        let xAxisData = this.sourceData.map(item => {
          return item.day
        })

        let lineData = this.sourceData.map(item => {
            return item.rejected_rate
        })
        
        let total = this.sourceData.map(item => {
            return Number(item.confirmed_install) + Number(item.rejected_install)
        })

        // let maxLineData = Math.max(...lineData)
        // let maxBarData = Math.max(...total)
        
        let maxLineData = Math.ceil(Math.max(...lineData)/10)*10,
            maxBarData = Math.ceil(Math.max(...total)/10)*10
    
        let installBarData = this.sourceData.map(item => {
            return item.confirmed_install
        })

        let rejectBarData = this.sourceData.map(item => {
          return item.rejected_install
        })

        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: (params) => {
                    let item = this.sourceData[params[0].dataIndex]
                    let result = `<p>Rejected Install: ${item.rejected_install}</p>`
                    item.rejected_reasons.map(item => {
                        result += `<p> · ${item.reason}: ${item.rate}%`
                    })
                    return result
                }
            },
            yAxis:[{
                min: 0,
                max: maxBarData,
                interval: Math.ceil(maxBarData / 5)
            }, {
                min: 0,
                max: maxLineData,
                interval: Math.ceil(maxLineData / 5)
            }],
            xAxis: {
                data: xAxisData,
                axisTick: {
                    alignWithLabel: true,
                },
                axisLine:{
                    lineStyle :{ color:'#E7EBED'},
                },
                axisLabel:{
                    rotate:40,
                    margin: 10,
                    color:'#646F76',
                },
                nameRotate: 260
            },
            
            series: [{
                type: 'line',
                data: lineData
            }, 
            {
                type: 'bar',
                barMaxWidth : 13,
                data: rejectBarData,
                
            },
            {
                type: 'bar',
                barMaxWidth : 13,
                data: installBarData
            }]
        }
      }
    },

    created() {
      this.viewOpt = viewOptConf
      this.fetchSourceData()
    },

    methods: {
        downLoadSource(){
          window.open(cors_config.api_protocal + "//" + cors_config.api_host + "/"　+ cors_config.app_name +  "/Dashboard/exportAdvRejectBySource?" + "type="+ this.type +"&export=1", "_blank");
        },
      fetchSourceData() {
        this.loading = true

        CacheService.fetchData('Dashboard/getConversionBySource', { type: this.type })
          .then(data => {
            if(data) {
                this.sourceData = data
            } else {
                this.sourceData = []
            }
            this.loading = false
          })
          .catch(err => {
            this.sourceData = []
            this.loading = false
          })
      },
    },

    mounted() {
      
    }
  };
</script>

<style lang="less">
.chart-source-content{
    position: relative;
    height: 100%;
    width: 100%;
    padding: 30px 30px 20px 30px;
    header{
      display: flex;
      justify-content: space-between;
      align-items:center;
      .title{
        height: 26px;
        color:rgba(1,4,9,1);
        line-height:26px;
        font-size:22px;
        font-weight: 800;
      }
      .radio-group{
        // height: 26px;
        .radio-group label{
            margin-bottom:0 !important;
        }
        .el-radio-button__inner{
            padding: 5px 11px!important;
            border-radius:0px;
            font-size:14px!important;
            color: rgba(1,4,9,0.3);
        }
      }
      .down-btn{
        margin-right:20px;
        padding: 5px 11px;
        
      }
    }
    .zindex0{
      z-index: 0;
    }
    .box-chart-source{
        height: 311px!important;
    }
    .empty-image{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #fff;
        height: 308px;
        transform: translate(0,-100%);
        img{
           width: 510px;
        }
    }
}
.el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background-color: #57A4FF!important;
    border-radius: 2px!important;
    color: #fff!important;
    border:1px solid #57A4FF!important;
}
</style>

