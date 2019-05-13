<template>
<div class="team-goals-block" v-yeah-loading='loading'>
  
  <el-row v-if="barData.length > 0">
      <el-col :span="16">
        <p class="title">{{modelTitle}}</p>
        <div class="team-goals-bar" >
          <echarts
            ref="goalBar"
            :viewOpt='viewOpt'
            :modelOpt='modelOpt'
            >
          </echarts>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="team-goals-line">
           <common-line-chart
            :fetchApi="fetchApi"
            :apiParam="apiParam"
            :actionType="actionType"
            :label="title"
            :title="title"
            @hideLinkCallback="hideLinkCallback"
            :roleName="roleName">
          </common-line-chart>
        </div> 
        <div class="team-goals-router" v-if="this.roleName !== 'manager' && !hideLink">
          <router-link class="router-link" @click.native="logPoint" target="_blank" :to="linkToR">Detail</router-link>
        </div>
      </el-col>
  </el-row>
  <div style="height:100%" v-if="barData.length < 1 && !loading" >
    <p class="title">{{modelTitle}}</p>
    <div class="empty-img">
      <img src="@/assets/image/empty.png" />
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Table, TableColumn,Row,Col} from 'element-ui'
import { barConf} from "./conf"
import { Echarts } from '@/components/common'
import commonLineChart from "../common-line-chart/index.vue"
import { CacheService } from '@/util/cacheService'
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'chart-team-goals',
  data(){
    return {
      viewOpt:{},
      barData:[],
      donePercent:'',
      current_goal:[],
      members:[],
      title:'',
      apiParam:{},
      linkToR:'/report',
      fetchApi:"",
      actionType:"",
      hideLink: false,
      am_name:"",
      pm_name:"",
      load_tag:false,
      loading:true
    }
  },
  props: {
    modelTitle:'',
    roleName:''
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      dashboardMonthState: 'dashboardMonthState'
    }),
    modelOpt(){
      if (this.barData.length == 0){
        return
      }
      const len = this.current_goal.length
      return {
        title: {
            /*text: this.modelTitle,
            textStyle :{
              color: '#010409',
              fontSize:20,
              fontWeight: 'bold'
            },
            top:10,
            left:10*/
            show: false
        },
        dataset: {
          dimensions: ['name', 'current_goal', 'shadow','goal','old_goal','show_goal'],
          source: this.barData.reverse()
        },
        xAxis: {
            type: 'value',
            axisLine:{ 
                show: false
            },
            splitLine:{
                show: false
            },
            axisLabel:{
                show: false
            },
            axisTick:{
                show: false
            },
           
        },
        yAxis: {
            axisLine:{ 
                show: false
            },
            axisTick:{
                show: false
            },
            type: 'category',  
        },
        series: [
            {
                type: 'bar',
                label:{
                    show:true,
                    position: [226, '30%'],
                    color :'#000',
                    formatter: '{@show_goal}%'
                },
                barMaxWidth :38,
                color:'#57A4FF',
                z: 3,
                markLine: {
                    silent: true,
                    data: [{
                        xAxis: this.donePercent
                    }],
                    lineStyle :{
                        color:'red',
                        type :'dotted'
                    },
                    symbol:'none',
                    label:{
                        show:false
                    }
                }
            },
            { // For shadow
                type: 'bar',
                barMaxWidth :38,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0.05)',
                    }
                },
                label:{
                    show:true,
                    position:'right',
                    color :'#000',
                    formatter: '{@old_goal}/{@goal}'
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: false
            }
        ]
      }
    }
  },
  components: {Echarts,commonLineChart},
  created () {
     this.viewOpt = barConf
     this.donePercent = this.getDone()
     this.fetchData()
  },
  mounted() {
    
  },
  watch: {
    load_tag(newVal){
          let that = this
          this.$nextTick(function () {
            if (that.$refs.goalBar != undefined && newVal){
              that.$refs.goalBar.bindEvent('click','series',function(param){
                that.title = param.value.name
                if (that.roleName == 'amLeader'){
                  that.am_name = param.value.passport_id
                }
                else if (that.roleName == 'pmLeader'){
                  that.pm_name = param.value.passport_id
                }
                that.apiParam = Object.assign({}, that.apiParam, {
                  type: "7day",
                  passport_id: param.value.passport_id,
                  team_id: param.value.team_id
                })
                //ga
                if (that.modelTitle == 'Team Goals'){
                  that.$ga && that.$ga.event(that.roleName, 'team', 'trend')
                }
                else if (that.modelTitle == 'Member Goals'){
                  that.$ga && that.$ga.event(that.roleName, 'member', 'trend')
                }
              })
            }
          })
    },
    dashboardMonthState (){
      this.donePercent = this.getDone()
      this.fetchData()
    }
  },
  updated: function () {
    this.load_tag = true
  },
  methods:{
    getDone(){
      let date = new Date()
      if (this.dashboardMonthState == 'monthly'){
        let allDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        let curDay = (date.getDate() -1) > 0 ? (date.getDate() -1) : 0
        return (100/allDays)*curDay.toFixed(1)
      }
      else if (this.dashboardMonthState == 'quarterly'){
         let quarter = moment().quarter()
         let quarterDay,curDay
         if (quarter ===1){
           quarter = 90
           curDay = moment().format('DDD')
         }
         else if (quarter ===2){
           quarter = 91
           curDay = moment().format('DDD') - 90
         }
         else if (quarter ===3){
           quarter = 92
           curDay = moment().format('DDD') - (90 + 91)
         }
         else {
           quarter = 92
           curDay = moment().format('DDD') - (90 + 91 + 92)
         }
         return ((curDay-1)*100/quarter).toFixed(1)
      }
    },
    logPoint(){
      if (this.modelTitle == 'Team Goals'){
        this.$ga && this.$ga.event(this.roleName, 'team', 'detail')
      }
      else if (this.modelTitle == 'Member Goals'){
        this.$ga && this.$ga.event(this.roleName, 'member', 'detail')
      }
    },
    getLinkR(){
      let lastWeek = {
      start: moment().add(-7, 'day').format("YYYY-MM-DD"),
      end: moment().add(0,'day').format("YYYY-MM-DD")
      }
      if (this.roleName == 'amLeader'){
        this.linkToR = `report?am=1&am_id=${this.am_name}&raw_data=1&interval_day=1&startDate=${lastWeek.start}&endDate=${lastWeek.end}`
      }
      else if (this.roleName == 'pmLeader'){  //pm leader
        this.linkToR = `report?pm=1&pm_id=${this.pm_name}&raw_data=1&interval_day=1&startDate=${lastWeek.start}&endDate=${lastWeek.end}`
      }
    },
    formatBarData(){
      let real_goal = 0
      let item_goal = 0
      this.barData.map((item,index)=>{
        item.old_goal = item.current_goal
        item_goal = parseFloat(item.goal).toFixed(1)
        real_goal = ((parseFloat(item.current_goal)/item_goal)*100).toFixed(1)
        if (real_goal > 100){
          item.current_goal = 100
        }
        else if (real_goal < 0){
          item.current_goal = 0
        }
        else {
          item.current_goal = real_goal
        }
        item.show_goal = real_goal
        item.shadow = 100
      })
    },
    hideLinkCallback(){
      this.hideLink = true
    },
    fetchData() {
     /* this.barData = [
        {
          team_id:10,
          name:'aaa',
          goal:800,
          current_goal:1000
        },
        {
          team_id:11,
          name:'bbb',
          goal:6000,
          current_goal:9000,
        },
      ]*/

      if (['amLeader','pmLeader'].find(v => v == this.roleName)){
        this.loading = true
        this.fetchApi = 'Dashboard/getTaskCompleteRateByMember'
        this.actionType = 'member'
        let params = {type:'yesterday',team_id: this.userInfo.group_id,time_type:this.dashboardMonthState}
        CacheService.fetchData('Dashboard/getTaskCompleteRateByMember', params)
        .then(data => {
          this.loading = false
          this.barData = data ? data : []
          this.title = this.barData[0]['name']
          if (this.roleName == 'amLeader'){
            this.am_name = data[0].passport_id
          }
          else if (this.roleName == 'pmLeader'){
            this.pm_name = data[0].passport_id
          }
          this.formatBarData()
          this.getLinkR()
          //默认选择第一个数据
          this.apiParam = Object.assign({}, this.apiParam, {
            type: "7day",
            passport_id: data[0].passport_id,
            time_type: this.dashboardMonthState
          })
        })
        .catch(err => {
          this.loading = false
        })
      }
      else if(this.roleName == 'manager'){
        this.loading = true
        this.fetchApi = 'Dashboard/getTaskCompleteRateByTeam'
        this.actionType = "team"
        let params = {type:'yesterday',time_type:this.dashboardMonthState}
        CacheService.fetchData('Dashboard/getTaskCompleteRateByTeam', params)
        .then(data => {
          this.loading = false
          this.barData = data ? data : []
          this.title = this.barData[0]['name']
          this.formatBarData()
          //默认选择第一个数据
          this.apiParam = Object.assign({}, this.apiParam, {
            type: "7day",
            team_id: data[0].team_id,
            time_type: this.dashboardMonthState
          })
        })
        .catch(err => {
          this.loading = false
        })
      }

    },
  }
}

</script>
<style lang="less" >
.team-goals-block{
  padding:15px 20px;
  height:100%;
  .title {
        font-size: 20px;
        color:#010409;
        line-height: 24px;
        padding:15px 0 10px 10px;
        font-weight: 800
    }
  .team-goals-bar {
    width:96%;
    height:340px;
  }
  .team-goals-line{
    width:100%;
    height:370px;
  }
  .team-goals-router {
    width:100%;  
    height:40px;  
    text-align: center;

  }
  .team-goals-router a {
      color:#61ABFF;
  }
  .empty-img{
    display: flex;
    justify-content: center;
    align-items:center;
    height:80%;
    img{
      height: 212px
    }
  }
}
</style>