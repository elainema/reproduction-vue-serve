<template>
<div class="common-top-style">
  <header>
    <p class="title">Top Publishers</p>
    <el-radio-group v-model="profitType" class='radio-group'>
        <el-radio-button label="profit">Profit</el-radio-button>
        <el-radio-button label="profit_down">Profit Down</el-radio-button>
        <el-radio-button label="profit_up">Profit Up</el-radio-button>          
    </el-radio-group>
  </header>
  <commonTopChart
    :tableData="tableData" :labels="labels" :linkToL="linkToL" :sDate="sDate" modalName="Publishers"
    :fetchApi="'Dashboard/getPublisherProfitDetail'" :profitType="profitType" :roleName="roleName">
  </commonTopChart>
</div>
</template>

<script>
import Vue from 'vue'
import { Table, TableColumn,Row,Col} from 'element-ui'
import viewOptConf from "./conf"
import commonTopChart from '../common-top-chart/index.vue'
import { CacheService } from '@/util/cacheService'
import { debug } from 'util';
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'chart-top-offer',
  data(){
    return {
      tableData:[],
      viewOpt: {},
      pubData: [],
      linkToL: '/report',
      labels:[],
      sDate: "",
      profitType: 'profit',
      labelName: "Margin"
    }
  },
  props: {
    roleName: {
      type: String,
      default: ''
    }
  },
  computed: {

  },
  watch: {
    profitType(val) {
      if (val === 'profit'){
        this.labelName = "Margin"
      }
      else if (val === 'profit_down'){
        this.labelName = "Down"
      }
      else if (val === 'profit_up'){
        this.labelName = "Up"
      }
      this.fetchData();
      this.setLabels()
    }
  },
  components: {commonTopChart},
  created () {
    this.viewOpt = viewOptConf
    this.fetchData()
    this.setLabels()
   /* this.tableData = [{
            aff_name: '2016-05-02王小虎王小虎王小虎王小虎王小虎aaaaaaaaaaaaaaaaaaaaaaaaaaaa王小虎王小虎王小虎aaaaa王小虎王小虎王小虎aaaaa',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_name: '2016-05-04王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_name: '2016-05-01王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_name: '2016-05-03王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_name: '2016-05-03王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }]*/
          
  },
  
  methods:{
    setLabels(){
      if (this.roleName == 'pm'){  //pm
            this.labels = [
              {'label':'Publisher','prop':'aff_name'},
              {'label':'Click','prop':'click'},
              {'label':'Conversion','prop':'conversion'},
              {'label':'Revenue','prop':'revenue'},
              {'label':'Profit','prop':'profit'},
              {'label': this.labelName, 'prop': this.labelName.toLowerCase()},
              {'label': "", 'prop': "reportlink" }
            ]
          }
          else if (this.roleName == 'pmLeader'){ // pm leader
            this.labels = [
              {'label':'Publisher','prop':'aff_name'},
              {'label':'PM','prop':'pm'},
              {'label':'Conversion','prop':'conversion'},
              {'label':'Revenue','prop':'revenue'},
              {'label':'Profit','prop':'profit'},
              //{'label':'Margin','prop':'profit_margin'},
              {'label': this.labelName, 'prop': this.labelName.toLowerCase()},
              {'label': "", 'prop': "reportlink" }
            ]
          }
          else if (this.roleName == 'manager'){ // manager
            this.labels = [
              {'label':'Publisher','prop':'aff_name'},
              {'label':'Team','prop':'team'},
              {'label':'Conversion','prop':'conversion'},
              {'label':'Revenue','prop':'revenue'},
              {'label':'Profit','prop':'profit'},
              {'label': this.labelName,'prop': this.labelName.toLowerCase()},
              {'label': "",'prop': "reportlink" }
            ]
          }
    },
    fetchData() {
      let params = {type : this.profitType}
      CacheService.fetchData('Dashboard/getPublisherProfit',params)
        .then(data => {
          this.tableData = data.data ? data.data : []
          this.sDate = data.date
          this.getSettings()
          for (let item of this.tableData){
            if (item['aff_name']){
              item['aff_name'] = item['aff_id'] + '-' + item['aff_name']
            }
            if (item['cr']){
              item['cr'] = item['cr'] + '%'
            }
            if (item['margin']){
              item['margin'] = item['margin'] + '%'
            }
            if (item['cap_reach']){
              item['cap_reach'] = item['cap_reach'] + '%'
            }
            item['profit_margin'] = parseFloat(item['profit'] / item['revenue']*100).toFixed(2) + '%'
          }
        })
        .catch(err => {
        })
    },
    getSettings(){
      let lastDay = {
            start: moment(this.sDate).add(0, 'day').format("YYYY-MM-DD"),
            end: moment(this.sDate).add(1,'day').format("YYYY-MM-DD")
          }
          if (this.roleName == 'pm'){  //pm
            this.linkToL = `report?aff_id=all&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`
          }
          else if (this.roleName == 'pmLeader'){ // pm leader
            this.linkToL = `report?aff_id=all&pm=1&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`
          }
          else if (this.roleName == 'manager'){ // manager
            this.linkToL = `report?aff_id=all&pm=1&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`
          }
    }
  },
}

</script>
<style lang="less" scoped>

.offer-top-block{
  .offer-top-table{
    padding-right:20px;
    height:350px;
  }
  .offer-top-chart{
    width:100%;
    height:360px;
  }
}

</style>
