<template>
    
    <div style="height: 100%" v-yeah-loading='loading'>
      <echarts
      v-if="sourceData.length > 0"
      :viewOpt='viewOpt'
      :modelOpt='modelOpt'
      :clearOption="clearOption"
      >
      </echarts>
      <div v-if="sourceData.length < 1 && !loading" class="my-empty">
        <img src="@/assets/image/empty.png" />
      </div>
    </div>


</template>

<script>
import Vue from 'vue'
// import viewOptConf from "./conf"
import { Echarts } from '@/components/common'
import { CacheService } from '@/util/cacheService'

export default {
  name: 'chart-top-offer',
  data(){
    return {
      viewOpt: {},
      sourceData: [],
      loading:false,
      clearOption: true
    }
  },
  props: {
    fetchApi:'',
    apiParam:{
      type:Object,
      default(){
        return {}
      }
    },
    title:{
      type:String,
      default: ""
    },
    actionType:"",
    label:"",
    roleName:"",
    hideLinkCallback:{
      type: Function
    },
    profitType: {
      type: String,
      default: ""
    }
  },
  watch : {
    apiParam: 
      {
         handler: function(newVal) {
            if (newVal){
              this.fetchData()
            }
         },
         deep: true
      },
      profitType(val){
        if (val == 'profile'){
          this.clearOption = true
        }
      }
  },
  computed: {
    modelOpt() {
        if(!this.sourceData.length) {
          return
        }
        return this.getOption()
      }
  },
  components: {Echarts},
  created () {
    //this.viewOpt = viewOptConf
    this.fetchData()
  },
  methods:{
        fetchData() {
          this.loading = true
          if (this.profitType == 'profit') {
            this.apiParam.type = this.profitType
          }
          CacheService.fetchData(this.fetchApi, this.apiParam)
          .then(data => {
            this.loading = false
            this.sourceData =  data ? data : [] 
            if (this.sourceData.length < 1){
              this.$emit('hideLinkCallback')
            }
          })
          .catch(err => {
            this.loading = false
          })
        },
        getOption(value) {
          let xLine = [],cVal = [],rVal = [],pVal = [],mVal = []
          let yAxisObj,seriesObj,legendObj
          this.sourceData.map(data => {  //fix
                xLine.push(data.day)
                cVal.push(parseFloat(data.conversion))
                rVal.push(parseFloat(data.revenue))
                pVal.push(parseFloat(data.profit))
                if (this.profitType == 'profit') {
                  mVal.push(parseFloat(data.margin))
                }
          })
          seriesObj = [
                    {
                        name: 'Conversion',
                        type: 'line',
                        data: cVal,
                        smooth :true
                    },
                    {
                        name: 'Revenue',
                        type: 'line',
                        data: rVal,
                        smooth :true
                    },
                    {
                        name: 'Profit',
                        type: 'line',
                        data: pVal,
                        smooth :true
                    }
                ]
          
          legendObj = {
            left: 0,
            top:40,
            padding: [0, 0,60,0],
            bottom:30,
            itemWidth:20,
            itemHeight:4,
            itemGap:12,
            data: [{name:'Conversion',icon:'roundRect'},{name:'Revenue',icon:'roundRect'},{name:'Profit',icon:'roundRect'}]
          }
          if (this.profitType == 'profit'){
             yAxisObj = [{
                  type: 'value',
                  name:'',
                  axisTick: {
                    show:true
                  },
                  position: 'left',
                  axisLine:{
                    lineStyle :{ color:'#E7EBED'},
                  },
                  axisLabel:{
                    color:'#9BAEC0',
                    formatter: function(value, index){
                      if (Math.abs(value) < 1000 && value !==0){
                        return value
                      }
                      else {
                        return (value/1000) !==0 ? (value/1000).toFixed(1)+"k" : value/1000
                      }
                    }
                  },
                  splitLine: {
                    lineStyle:{
                      color: '#E7EBED'
                    }
                  }
                }
              ,{
                type: 'value',
                axisTick: {
                  show:true
                },
                position: 'right',
                axisLine:{
                  lineStyle :{ color:'#E7EBED'},
                },
                axisLabel:{
                  color:'#9BAEC0'
                },
                splitLine: {
                  show: false
                }
              }]
              
              seriesObj.push({
                  name: 'Margin',
                  yAxisIndex: 1,
                  type: 'line',
                  data: mVal,
                  smooth :true
              })
              legendObj.data.push({name:'Margin',icon:'roundRect'})
          }
          else {
            yAxisObj = {
                  type: 'value',
                  name:'',
                  axisTick: {
                    show:true
                  },
                  position: 'left',
                  axisLine:{
                    lineStyle :{ color:'#E7EBED'},
                  },
                  axisLabel:{
                    color:'#9BAEC0',
                    formatter: function(value, index){
                      if (Math.abs(value) < 1000 && value !==0){
                        return value
                      }
                      else {
                        return (value/1000) !==0 ? (value/1000).toFixed(1)+"k" : value/1000
                      }
                    }
                  },
                  splitLine: {
                    lineStyle:{
                      color: '#E7EBED'
                    }
                  }
                }
          }
          let tmpOption = {}
          tmpOption = {
              color: ['#4DA0FF', '#5ED899','#FFCB4E','#793CF9'],
              grid: {
                containLabel:true,
                top:"24%",
                bottom:12,
                right:0,
                left:0
              },
                title : {
                  text: this.title,
                  padding  :[5,5,5,0],
                  textStyle :{
                    fontSize:14,
                    color: '#010409',
                    fontWeight: 550
                  }
                },
                tooltip: {
                  trigger: 'axis',
                  formatter: function(params, ticket, callback){
                    if (params[3] !=undefined && params[3].seriesName == 'Margin'){
                      return `${params[0].name}</br>${params[0].marker+params[0].seriesName}: ${params[0].value}</br>
                              ${params[1].marker+params[1].seriesName}: ${params[1].value}</br>
                              ${params[2].marker+params[2].seriesName}: ${params[2].value}</br>
                              ${params[3].marker+params[3].seriesName}: ${params[3].value}%</br>`
                    }
                    return `${params[0].name}</br>${params[0].marker+params[0].seriesName}: ${params[0].value}</br>
                              ${params[1].marker+params[1].seriesName}: ${params[1].value}</br>
                              ${params[2].marker+params[2].seriesName}: ${params[2].value}</br>`
                  }
                },
                xAxis:{
                type: 'category',
                axisTick: {
                  show:false,
                  alignWithLabel: true,
                },
                data: xLine,
                axisLine:{
                  lineStyle :{ color:'#E7EBED'},
                },
                axisLabel:{
                  margin: 16,
                  interval:0,
                  color:'#646F76',
                  formatter: function (value, index) {
                    var date = new Date(value);
                    var month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)
                    var day = date.getDate() < 10 ? "0"+ date.getDate() : date.getDate()
                    var texts = [month, day];
                    return texts.join('-');
                  }
                }
              },
              yAxis: yAxisObj,
              series: seriesObj,
              legend: legendObj
          }
          return tmpOption
        }
  },
  
}

</script>
<style lang="less">
.common-line-chart{
  padding-top:6px;
  .my-empty{
    display: flex;
    align-items: center;
    width:100%;
    height:100%;
    padding-top:30px;
    img{
      width: 100%;
    }
  }
}

</style>
