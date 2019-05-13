<template>
  <div class="common-top-style">
    <header>
      <p class="title">Top Offers</p>
    </header>
    <commonTopChart
      :tableData="tableData" :labels="labels" :sDate="sDate" modalName="Offers"
      :fetchApi="fetchApi" :linkToL="linkToL" :roleName="roleName">
    </commonTopChart>
  </div>
</template>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Table, TableColumn,Row,Col} from 'element-ui'
import viewOptConf from "./conf"
import commonTopChart from '../common-top-chart/index.vue'
import { CacheService } from '@/util/cacheService'
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
      labels:[],
      fetchApi: "Dashboard/getOfferProfitDetail",
      apiParam:{},
      linkToL:"/report",
      sDate:''
    }
  },
  props: {
    roleName: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    }),
  },
  components: {commonTopChart},
  created () {
    this.viewOpt = viewOptConf
    this.fetchData()
   /*this.tableData = [{
            aff_id: 1,
            offer_name: '2016-05-02王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎王小虎aaaaa王小虎王小虎王小虎aaaaa',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_id: 2,
            offer_name: '2016-05-04王小虎王',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_id: 3,
            offer_name: '2016-05-01王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_id: 4,
            offer_name: '2016-05-03王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }, {
            aff_id: 5,
            offer_name: '2016-05-03王小虎王小虎王小虎王小虎王小虎',
            conversion: '王小虎',
            revenue: '上海',
            profit: 100,
            cr: 100
          }]*/

    if (this.roleName == 'am'){  //am
      this.labels = [
        {'label':'Offer','prop':'offer_name'},
        {'label':'Conversion','prop':'conversion'},
        {'label':'Cap reach','prop':'cap_reach'},
        {'label':'Revenue','prop':'revenue'},
        {'label':'Profit','prop':'profit'},
        {'label':'CR','prop':'cr'},
        {'label': "", 'prop': "reportlink" }
      ]
    }
    else if (this.roleName == 'pm'){  //pm
      this.labels = [
        {'label':'Offer','prop':'offer_name'},
        {'label':'Conversion','prop':'conversion'},
        {'label':'Revenue','prop':'revenue'},
        {'label':'Profit','prop':'profit'},
        {'label': "", 'prop': "reportlink" }
      ]
    }
    else if (this.roleName == 'amLeader'){ // am leader  amLeader
      this.labels = [
        {'label':'Offer','prop':'offer_name'},
        {'label':'AM','prop':'am'},
        {'label':'Conversion','prop':'conversion'},
        {'label':'Cap reach','prop':'cap_reach'},
        {'label':'Revenue','prop':'revenue'},
        {'label':'Profit','prop':'profit'},
        {'label':'CR','prop':'cr'},
        {'label': "", 'prop': "reportlink" }
      ]
    }
    else if (this.roleName == 'pmLeader'){ // pm leader
      this.labels = [
        {'label':'Offer','prop':'offer_name'},
        {'label':'Conversion','prop':'conversion'},
        {'label':'Revenue','prop':'revenue'},
        {'label':'Profit','prop':'profit'},
        {'label': "", 'prop': "reportlink" }
      ]
    }
  },
  watch: {
  },
  methods:{
    fetchData() {
      let param = {
        role_id: this.userInfo.role_id,
        item_role_id: this.userInfo.item_role_id,
        team_id: this.userInfo.team_id
      }
      CacheService.fetchData('Dashboard/getOfferProfit', param)
        .then(data => {
          this.tableData = data.data ? data.data : []
          this.sDate = data.date
          this.getSettings()
          for (let item of this.tableData){
            if (item['cr']){
              item['cr'] = item['cr'] + '%'
            }
            if (item['cap_reach']){
              item['cap_reach'] = item['cap_reach'] + '%'
            }
            if (item['offer_name']){
              item['offer_name'] = item['offer_id'] + '-' + item['offer_name']
            }
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
      if (this.roleName == 'am'){  //am
        this.linkToL = `report?offer_id=all&raw_data=1&profit=-1&startDate=${lastDay.start}&endDate=${lastDay.end}`
      }
      else if (this.roleName == 'pm'){  //pm
        this.linkToL = `report?offer_id=all&raw_data=1&profit=-1&startDate=${lastDay.start}&endDate=${lastDay.end}`
      }
      else if (this.roleName == 'amLeader'){ // am leader
        this.linkToL = `report?offer_id=all&am=1&raw_data=1&profit=-1&startDate=${lastDay.start}&endDate=${lastDay.end}`
      }
      else if (this.roleName == 'pmLeader'){ // pm leader
        this.linkToL = `report?offer_id=all&pm=1&raw_data=1&profit=-1&startDate=${lastDay.start}&endDate=${lastDay.end}`
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
