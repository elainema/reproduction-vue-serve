<template>
  <div style="height: 100%; width:100%" class="wrap-my-goal" v-yeah-loading='loading'>
    <header>
      <div class="title">
        {{ this.modelTitle }}
        <i class="ym-font icon-edit" v-if="hasEditPrm" @click="toggleEditAble"/>
      </div>
      <el-radio-group v-model="timeType" class='radio-group' v-if="!isEdit">
        <el-radio-button label="monthly">Monthly</el-radio-button>
        <el-radio-button label="quarterly">Quarterly</el-radio-button>
      </el-radio-group>
    </header>
    <div style="height: 204px">
       <echarts
        :viewOpt='viewOpt'
        :modelOpt='modelOpt'
        >
      </echarts>
    </div>
    <transition name="el-fade-in-linear">
      <div class="goal-content" v-if="!isEdit">
        <div class="wrap-goal">
          <div class="goal-item">
            <span class="text">
              completion
            </span>
            <span class="cicle blue">
            </span>
          </div>
          <div class="percent" v-if='completeData.goal !== 0'>
            {{ completetion }}
          </div>
        </div>
        <div class="wrap-goal">
          <div class="goal-item">
            <span class="text">
              plan
            </span>
            <span class="cicle red">
            </span>
          </div>
          <div class="percent" v-if='completeData.goal !== 0'>
            {{ plan }}
          </div>
        </div>
        <div class="averagge">
          <div>
            Average by day
          </div>
          <div class="text">
            {{ this.completeData.real_average_profit || 0}}/{{ this.completeData.remain_average_profit || 0}}
          </div>
        </div>
      </div>
    </transition>
    <!-- <transition name="el-fade-in">
      <div class="my-goal-edit" v-if="isEdit && timeType=='monthly'">
        <div class="wrap-input">
          <input type="number" v-model="setGoal"/>
           <i class="ym-font icon-return" @click="toggleEditAble"/>
        </div>
        <button class="save-button" @click="handleSaveGoal">
          Save
        </button>
      </div>
     </transition> -->
     <transition name="el-fade-in">
      <div class="my-goal-edit" v-if="isEdit">
        <el-form ref="form" label-width="40px">
          <el-form-item :label="order[0]">
            <input type="text" v-model="month1" />
            <!-- <el-input v-model="formData.month1"></el-input> -->
            <i class="ym-font icon-return" @click="toggleEditAble"/>
          </el-form-item>
          <el-form-item :label="order[1]">
            <!-- <el-input v-model="formData.month2"></el-input> -->
            <input type="text" v-model="month2" />
            <i class="ym-font icon-return" @click="toggleEditAble"/>
          </el-form-item>
          <el-form-item :label="order[2]">
            <!-- <el-input v-model="formData.month3"></el-input> -->
            <input type="text" v-model="month3" />
            <i class="ym-font icon-return" @click="toggleEditAble"/>
          </el-form-item>
        </el-form>
        <button class="save-button" @click="handleSaveGoal">
          Save
        </button>
      </div>
     </transition>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import viewOptConf from "./conf";
  import { Echarts } from '@/components/common'
  import { CacheService } from '@/util/cacheService'
  export default {
    name: 'chart-total-adv',
    props: {
      roleName: {
        type: String,
        default: ''
      },
      modelTitle: {
        type: String,
        default: 'My Goal'
      }
    },

    data() {
      return {
        loading: true,
        reportData: [],
        viewOpt: {},
        isEdit: false,
        setGoal: 1,
        timeType: 'monthly',
        completeData: {
          current_goal: 0,
          goal: 1,
        },
        order:['JAN','FEB','MAR'],
        month1: '',
        month2: '',
        month3: '',

      }
    },

    components: { Echarts },
    
    watch: {
      timeType(){
        if (this.roleName !== 'am' || this.roleName !== 'pm'){
          this.$store.dispatch('setDashboardMonthState',this.timeType)
        }
        this.fetchTaskComplete()
      },
      deep: true
    },

    computed: {
      ...mapGetters({
        userInfo: 'userInfo'
      }),
      hasEditPrm() {
        return ['pm', 'am'].indexOf(this.roleName) > -1
      },
      completetion() {
        return `${((this.completeData.current_goal/this.completeData.goal) * 100).toFixed(1)}%`
      },

      plan() {
        if (this.timeType == 'monthly'){
          let now = new Date();
          now.setMonth(now.getMonth()+1);
          now.setDate(0);

          let monthDays = now.getDate();
          let passdays = new Date().getDate() -1
          return `${(((1/monthDays) * passdays) * 100).toFixed(1)}%`
        }
        else if (this.timeType == 'quarterly'){
          let quarterObj = this.getQuarter()
          return `${(((quarterObj.curDay -1)/quarterObj.quarter)*100).toFixed(1)}%`
        }
      },

      modelOpt() {
        // TODO 此处需求混乱，所以做了很多兼容.
        let monthDays,passdays
        if (this.timeType == 'monthly'){
          let now = new Date();
          now.setMonth(now.getMonth()+1);
          now.setDate(0);
          monthDays = now.getDate();
          passdays = new Date().getDate() -1
        }
        else if (this.timeType == 'quarterly'){
          let quarterObj = this.getQuarter()
          monthDays = quarterObj.quarter
          passdays = quarterObj.curDay - 1
        }
        
        // plan 待完成 current当前已完成 gray灰色区域
        let plan = (this.completeData.goal/monthDays) * passdays
        let current = this.completeData.current_goal
        let gray = this.completeData.goal - plan
        
        if(current < 0) {
          current = 0
        } else {
          plan = plan <= current
            ? 0
            : plan  - current

          gray = this.completeData.goal - plan - current
        }

        if(current >= this.completeData.goal) {
          gray = 0
          plan = 0
        }

        if(current ==0 && plan == 0) {
          gray = 1
        }
        console.log(plan)
        console.log(gray)
        return {
          series: [{
            type: 'pie',
            center: ['26%', '50%'],
            radius: ['62%', '72%'],
            data: [{
                value: current,
                name: '已完成',
                itemStyle: {
                    normal: {
                        color: '#4DA0FF',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        }
                    } 
                },
                label: {
                  normal: {
                      show: true,
                      position: 'center',
                      formatter: `${Math.round(this.completeData.current_goal)}/${Math.round(this.completeData.goal)}`,
                      color: '#010409',
                      fontSize: 12
                  } 
                },
            }, 
            {
                name: 'remain',
                value: plan,
                itemStyle: {
                    normal: {
                        color: '#FFA800',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        }
                    },
                },
                labelLine: {
                  emphasis: {
                      show: false
                  }
                },
            },
            {
                name: 'gray',
                value: gray,
                itemStyle: {
                    normal: {
                        color: '#DFDFDF',
                        label: {
                            show: false,
                        },
                        labelLine: {
                            show: false
                        }
                    } 
                },
                labelLine: {
                  emphasis: {
                      show: false
                  }
                },
            }]
        }]
        }
      }
    },

    created() {
      this.viewOpt = viewOptConf
      this.fetchTaskComplete()
    },

    mounted() {
    },

    methods: {
      fetchTaskComplete() {
        this.loading = true

        let { item_role_id, role_id } =  this.userInfo
        let team_id = this.userInfo.group_id
        let team_type = this.userInfo.group_type
        
        let params = { item_role_id, role_id, team_id, team_type,  time_type: this.timeType}
        this.$http.get('Dashboard/getTaskCompleteRate', { params })
          .then(res => {
            this.completeData = res.body.data
            this.setGoal = res.body.data.goal

            this.loading = false
          })
          .catch(err => {
            this.loading = false
          })
      },
      getQuarter() {
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
        return {quarter:quarter,curDay:curDay}
      },
      toggleEditAble() {
        this.isEdit = !this.isEdit
        this.getTaskSetting()
      },
      getTaskSetting(){
        let params = {type : this.profitType}
        CacheService.fetchData("Dashboard/getTaskSetting",params)
          .then(data => {
            this.order = data.order
            this.month1 = data[data.order[0]] == undefined ? '' : data[data.order[0]]
            this.month2 = data[data.order[1]] == undefined ? '' : data[data.order[1]]
            this.month3 = data[data.order[2]] == undefined ? '' : data[data.order[2]]
          })
          .catch(err => {});
      },
      handleSaveGoal() {
        if(this.month1 <= 0 || this.month2 <= 0 || this.month3 <= 0) {
          return this.$message.error('Goal cannot be less than 0');
        }
        let params = {}
        params[this.order[0]] = this.month1
        params[this.order[1]] = this.month2
        params[this.order[2]] = this.month3
        this.$http.post('Dashboard/setTaskCompleteRate', params)
          .then(res => {
            this.isEdit = !this.isEdit
            this.fetchTaskComplete()
            // todo reRender
          })
          .catch(err => {
            this.$message.error(err.body.msg);
          })
      }
    },

    
  };
</script>

<style lang="less">
.wrap-my-goal{
  position: relative;
  header{
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0 30px;
    .title{
      color:rgba(1,4,9,1);
      line-height:26px;
      font-size:22px;
      font-weight: 800;
      height: 26px;
      .icon-edit{
        font-size: 20px;
        color: #5ED899;
        cursor: pointer;
      }
    }
    .radio-group{
      height: 26px;
      .el-radio-button__inner{
        padding: 5px 11px!important;
        border-radius:0px;
        font-size:14px!important;
        color: rgba(1,4,9,0.3);
        border:1px solid rgba(204,206,207,1)
      }
    }
  }
  // .goal-content{
  //   padding-top: 84px;
  // }
  .goal-content{
    position: absolute;
    top:84px;;
    right: 0;
    width: 195px;
    height: 100%;
    .wrap-goal{
      margin-bottom: 8px;
      .goal-item{
        display: flex;
        align-items: center;
        .text{
          font-size:12px;
          color:rgba(1,4,9,0.8);
        }
        .cicle{
          display: inline-block;
          height: 10px;
          width: 10px;
          margin-left: 8px;
          border-radius: 50%;
          
        }
        .blue{
          border: 3px solid #4da0ff;
        }
        .red{
          border: 3px solid #FFA800;
        }
      }
      .percent{
        display: inline-block;
        color:rgba(1,4,9,1);
        line-height:19px;
        font-size:16px;
        border-bottom: 1px solid #EAEAEA;
      }
    }
    .averagge{
      padding-top: 5px;
      font-size:12px;
      color:rgba(1,4,9,0.7);
      line-height:14px;
      .text{
        display: inline-block;
        margin-top: 3px;
        border-bottom: 1px solid #EAEAEA;
      }
    }
  }
  .my-goal-edit{
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    height: 70%;
    background: #fff;
    padding:0 30px;
    .el-form-item__label{
      text-align: left
    }
    .el-form-item{
      margin-bottom: 0;
        i{
          position: absolute;
          right: 10px;
          top: 5px;
          font-size: 15px;
          line-height: 30px;position: absolute;
          cursor: pointer;
        }
    }
    .wrap-input{
      position: relative;
      width: 306px;
      margin: 30px 0 30px 0px;
      input{
        width: 306px;
        height: 30px;
        border-radius:2px;
        border:1px solid rgba(151,151,151,1)
      }
      i{
        position: absolute;
        right: 10px;
        top: 0;
        font-size: 15px;
        line-height: 30px;position: absolute;
        cursor: pointer;
      }
    }
    button{
      width:100px;
      height:30px;
      margin: 0px 0 0 0px;
      background:rgba(65,154,254,1);
      border-radius:2px;
      color: #fff;
      text-align: center;
      line-height: 30px;
      font-size:14px;
    }
  }
}
</style>
