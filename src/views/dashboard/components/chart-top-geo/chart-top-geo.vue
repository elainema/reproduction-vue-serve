<template>
<div class="geo-top-block" v-yeah-loading='loading'>
    <p class="title">Geos</p>
     <el-row v-if="listData.length > 0">
        <el-col :span="10">
            <div class="country-list">
                <ul>
                    <li v-for="(item,index) in listData" :key="index">
                        <span class="country-flag flag" :class="iconClass(item.country)"></span>
                        <span class="country-code">{{item.country}}</span>
                        <span class="country-value">{{item.profit}}</span>
                        <span class="country-rate">{{item.rate}}%</span>
                    </li>
                </ul>
            </div>
        </el-col>
        <el-col :span="14">
            <div class="country-map">
                <echarts
                :viewOpt='viewOpt'
                :modelOpt='modelOpt'
                >
                </echarts>
            </div>
            <div class="country-router">
                <router-link  target="_blank" :to="rLink" @click.native="logGo">View All</router-link>
            </div>
        </el-col>
    </el-row> 
    <div v-if="listData.length < 1 && !loading" class="empty-img">
        <img src="@/assets/image/empty.png" />
    </div>
</div>
</template>

<script>
  import Vue from 'vue'
  import viewOptConf from "./conf"
  import { CacheService } from '@/util/cacheService'
  import { Echarts } from '@/components/common'
  import worldJson from  '@/assets/world.json'
  import globalJson from  '@/assets/global.json'
  import {Row,Col} from 'element-ui'
  import '@/assets/national_flag/flags.min.css'
    
    Vue.use(Row)
    Vue.use(Col)
    Echarts.registerMap('world',worldJson)
  

export default {
  data(){
    return {
        geoData: [],
        viewOpt: {},
        listData: [],
        queryData:[],
        startDay:"",
        endDay:"",
        rLink:"",
        loading:false,
        sDate:""
    }
  },
  props: {
      roleName: {
        type: String,
        default: ''
      }
  },
  computed: {
    modelOpt() {
        let resultData = []
        if (this.queryData.length){
            for (let row of this.queryData){
                if (globalJson[row.country]){
                    resultData.push({name: globalJson[row.country]['en'],value:row.profit})
                }
                else if (row.country === "other"){
                    resultData.push({name: "other",value:row.profit})
                }
            }
        }
        
        return {
          series: [
              {
                  name: 'country',
                  type: 'map',
                  mapType: 'world',
                  width:'70%',
                  left:0,
                  itemStyle:{
                      emphasis:{label:{show:true}},
                      normal: {
                        borderWidth:1,
                        borderColor:'#F0F2F5',
                        label: {
                            show: false
                        }
                      },
                  },
                  data: resultData
              }
          ]
        }
      }
  },
  components: {Echarts },
  
  created () {
      this.viewOpt = viewOptConf
      this.fetchData()
  },
  
  methods:{
      iconClass(name) {
          return `flag-${name.toLowerCase()}`
      },
      getLink(){
          return `report?country=1&raw_data=1&profit=-1&startDate=${moment(this.sDate).add(0, 'day').format("YYYY-MM-DD")}&endDate=${moment(this.sDate).add(1,'day').format("YYYY-MM-DD")}`
      },
      logGo(){
          this.$ga && this.$ga.event(this.roleName,'geo','view all')
      },
      fetchData() {
        this.loading = true
        CacheService.fetchData('Dashboard/getGeoProfit')
            .then(data => {
                this.loading = false
                this.queryData = data.data ? data.data : []
                this.sDate = data.date
                this.rLink = this.getLink()
                let len = this.queryData.length
                if (len >0){
                    let lastData = []
                    if (len > 9){
                        this.listData = this.queryData.slice(0,9)
                        lastData = this.queryData.slice(9,len)

                        let lastProfit=0,lastRate = 0
                        for (let i of lastData){
                            lastProfit += parseFloat(i.profit) 
                        }
                        for (let j of this.listData){
                            lastRate += parseFloat(j.rate) 
                        }
                        
                        lastRate = 100-lastRate
                        this.listData.push({
                            country: 'Others',
                            profit: lastProfit.toFixed(1),
                            rate: lastRate.toFixed(1)
                        })
                    }
                    else {
                        this.listData = this.queryData
                    }
                    
                    
                }
                
            })
            .catch(err => {
                this.loading = false
            })
        }
  },
  mounted (){
      
  }
}

</script>
<style lang="less">
.geo-top-block{
    height:100%;
    padding:0px 30px;
    .title {
        font-size: 20px;
        color:rgba(1,4,9,1);
        line-height: 24px;
        padding:30px 0 10px 0;
        font-weight: 800
    }

      .empty-img{
        display: flex;
        justify-content: center;
        align-items:center;
         height:80%;
         img{
             height: 212px;
         }
    }
}
.country-list {
        padding:8px 22px;
            li {
                float: left;
                //margin-left:10px;
                //margin-right:14px;
                width:215px;
                height:50px;
            }
            span {
                margin-right:12px;
                
            }
            .country-code,.country-value,.country-rate{
                display:inline-block;
                width:40px
            }
            .country-flag {
                vertical-align: middle;
            }
            .country-code {
                font-weight: 800;
                display: inline-block;
                width:38px;
            }
        
    }
    .country-map {
        width:100%;
        height:250px;
    }
    .country-router {
        width:100%;
        height:40px;
        text-align: center;
        margin-top:10px;
    }
    .country-router a {
        color:#61ABFF;
    }
    
</style>