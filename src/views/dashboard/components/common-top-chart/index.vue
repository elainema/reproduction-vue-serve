<template>
<div :class="roleName == 'manager' ? 'offer-top-manage' : 'offer-top-block'">
  <el-row >
      <el-col :span="16" class="left-block">
        <div class="offer-top-table">
          <el-table
            :data="tableData"
            empty-text=" "
            ref="singleTable"
            highlight-current-row
            @current-change="handleCurrentChange"
            @row-click="setCurrent"
            >
            <el-table-column
              v-for="(item,index) in labels" :key="index"
              :width="index==0 ? 214 : (item.prop == 'reportlink' ? 28 : (item.prop == 'cr' ? 60 : ''))" 
              :min-width="item.prop=='conversion' ? 96 : (item.prop == 'cap_reach' ? 84 : '')"
              :prop="item.prop"
              :label="item.label">
              <template slot-scope="scope">
                  <span v-if="index==0" :title="scope.row[item.prop]">{{scope.row[item.prop]}}</span>
                  <el-dropdown v-else-if="item.prop=='reportlink'" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      <i class="ym-font icon-more"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" placement="bottom" class="dark-dropdown">
                      <el-dropdown-item :command="itemObj.item1">{{itemObj.item1}}</el-dropdown-item>
                      <el-dropdown-item :command="itemObj.item2">{{itemObj.item2}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <span v-else-if="item.prop=='up' || item.prop=='down'"><i :class="item.prop=='up' ? 'green' : 'red'">{{Math.abs(scope.row[item.prop])}}</i></span>
                  <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="empty-img" v-if="tableData.length < 1">
          <img src="@/assets/image/empty.png" />
        </div>
        
      </el-col>
      <el-col :span="8" v-if="tableData.length > 0">
        <div class="offer-top-chart">
          <common-line-chart
          ref="lineChart"
          :fetchApi='fetchApi'
          :apiParam='apiParam'
          :title='title'
          :profitType="profitType"
          @hideLinkCallback="hideLinkCallback"
          >
          </common-line-chart>
        </div>
        
      </el-col>
  </el-row>
  <el-row v-if="tableData.length > 0">
    <el-col :span="16" >
      <div class="common-top-router" >
        <router-link class="router-link" target="_blank" :to="linkToL" @click.native="logPoint('l')">View All</router-link>
      </div>
    </el-col>
    <el-col :span="8" >
      <div class="common-top-router" v-if="!hideLink">
          <router-link class="router-link" target="_blank" @click.native="logPoint('r')" :to="linkToR">Detail</router-link>
        </div>
    </el-col>
  </el-row>
</div>
      
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { Table, TableColumn,Row,Col} from 'element-ui'
import commonLineChart from "../common-line-chart/index.vue"
import { CacheService } from '@/util/cacheService'
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)

export default {
  name: 'chart-top-offer',
  data(){
    return {
      viewOpt: {},
      offerData: [],
      apiParam:{},
      title:"",
      linkToR:'/report',
      lastWeek:"",
      paraKey:"",
      paraVal:"",
      logView:'',
      logAction:'',
      hideLink: false,
      currentRow: '',
      itemObj:{
        item1: '',
        item2: ''
      },
      type_id:'',
    }
  },
  props: {
    sourceData:{
      type: Array,
      default(){
        return []
      }
    },
    labels:{
      type: Array,
      default(){
        return []
      }
    },
    tableData:{
      type: Array,
      default(){
        return []
      }
    },
    linkToL:'',
    fetchApi:'',
    roleName: {
      type: String,
      default: ''
    },
    sDate: {
      type: String,
      default: ''
    },
    modalName: {
      type: String,
      default: ''
    },
    profitType: {
      type: String,
      default: ''
    }
  },
  watch: {
    tableData (newVal){
      this.setCurrent(newVal[0])
    },
    deep: true
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
    })
  },
  components: {commonLineChart},
  created () {
      
  },
  
  methods:{
    hideLinkCallback(){
      this.hideLink = true
    },
    setWidth(item){
      if (item.props == 'offer_name' || item.props == 'adv_name' || item.props == 'aff_name'){
        return 130
      }
      else return ''
      
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
      if (this.fetchApi.indexOf('Advertiser') !== -1){
        this.$ga && this.$ga.event(this.roleName, 'topadv', 'trend')
      }
      else if (this.fetchApi.indexOf('Publisher') !== -1){
        this.$ga && this.$ga.event(this.roleName, 'toppub', 'trend')
      }
      else if (this.fetchApi.indexOf('Offer') !== -1){
        this.$ga && this.$ga.event(this.roleName, 'topoffer','trend')
      }
    },
    handleCommand(cmd){
      let lastDay = {
        start: moment(this.sDate)
          .add(0, "day")
          .format("YYYY-MM-DD"),
        end: moment(this.sDate)
          .add(1, "day")
          .format("YYYY-MM-DD")
      };
      let routerLink = ''
      if (cmd == 'ByOffer'){
        routerLink = `report?${this.type_id}=${this.currentRow[this.type_id]}&offer_id=all&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`;
      }
      else if (cmd == 'ByPublisher'){
        routerLink = `report?${this.type_id}=${this.currentRow[this.type_id]}&aff_id=all&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`;        
      }
      else if (cmd == 'ByAdvertiser'){
        routerLink = `report?${this.type_id}=${this.currentRow[this.type_id]}&adv_id=all&profit=-1&raw_data=1&startDate=${lastDay.start}&endDate=${lastDay.end}`;                
      }
      window.open(routerLink)
    },
    handleCurrentChange(val) {
      this.currentRow = val ? val : {};
      
      Object.keys(this.currentRow).map((key)=>{
      　　if (key.indexOf('_id') !== -1){
            this.paraKey = key
            this.paraVal = val[key]
          }
          if (key.indexOf('_name') !== -1){
            this.title = val[key]
          }
      }) 
      this.apiParam.date = this.sDate
      this.$set(this.apiParam, this.paraKey, this.paraVal)
      this.setRLink()
    },
    logPoint(val){
      if (val == 'l'){
        if (this.modalName == 'Advertisers'){
          this.$ga && this.$ga.event(this.roleName, 'topadv', 'viewall')
        }
        else if (this.modalName == 'Publishers'){
          this.$ga && this.$ga.event(this.roleName, 'toppub','viewall')
        }
        else if (this.modalName == 'Offers'){
          this.$ga && this.$ga.event(this.roleName, 'topoffer', 'viewall')
        }
      }
      else if (val == 'r'){
        if (this.modalName == 'Advertisers'){
          this.$ga && this.$ga.event(this.roleName, 'topadv', 'detail')
        }
        else if (this.modalName == 'Publishers'){
          this.$ga && this.$ga.event(this.roleName, 'toppub', 'detail')
        }
        else if (this.modalName == 'Offers'){
          this.$ga && this.$ga.event(this.roleName, 'topoffer', 'detail')
        }
      }
    },
    setRLink(){
      this.lastWeek = {
        start: moment(this.sDate).add(-6, 'day').format("YYYY-MM-DD"),
        end: moment(this.sDate).add(1,'day').format("YYYY-MM-DD")
      }
      //生成Detail链接
      if (this.modalName == 'Offers'){
        this.linkToR = `report?offer_id=${this.paraVal}&raw_data=1&interval_day=1&startDate=${this.lastWeek.start}&endDate=${this.lastWeek.end}`
      }
      else if (this.modalName == 'Advertisers'){
        this.linkToR = `report?advertiser_id=1&adv_id=${this.paraVal}&interval_day=1&raw_data=1&startDate=${this.lastWeek.start}&endDate=${this.lastWeek.end}`
      }
      else if (this.modalName == 'Publishers'){
        this.linkToR = `report?aff_id=${this.paraVal}&interval_day=1&raw_data=1&startDate=${this.lastWeek.start}&endDate=${this.lastWeek.end}`
      }
    },
    getItem() {
      if (this.modalName == 'Advertisers'){
        this.itemObj.item1 = 'ByOffer'
        this.itemObj.item2 = 'ByPublisher'
        this.type_id = 'adv_id'
      }
      else if (this.modalName == 'Publishers'){
        this.itemObj.item1 = 'ByOffer'
        this.itemObj.item2 = 'ByAdvertiser'
        this.type_id = 'aff_id'
      }
      else if (this.modalName == 'Offers'){
        this.itemObj.item2 = 'ByPublisher'
        this.type_id = 'offer_id'
      }
    }
  },
  mounted(){
      this.getItem()
  }
}

</script>
<style lang="less" >
.offer-top-manage{
  padding:0 30px;
  .empty-img{
    display: flex;
    justify-content: center;
    align-items:flex-start;
    height:260px;
    img{
      width: 510px;
    }
  }
  .el-table .cell {
    line-height: 1.5
  }
  .el-table::before{
    height:0
  }
  .el-table__header-wrapper{
    font-size:16px;
    color:rgba(1,4,9,1);

  }
  .el-table__header th {
    border-top:none;
    text-align: left;
  }
  .el-table__header th .cell{
    //padding:0 5px;
    //height:24px;
    padding-left:5px;
    padding-right:5px;
    width:100%;
    height:24px;
    font-weight: 500
  }
  .el-table__row td .cell{
    text-align: left;
    padding-left:5px;
    padding-right:5px;
    color:rgba(1,4,9,0.6);
  }
  .el-table__row td span {
    display: block;
    //  max-height:38px;
     height:18px;
     white-space: nowrap;
     overflow:hidden; 
     text-overflow:ellipsis;
    //  display:-webkit-box; 
    //  -webkit-box-orient:vertical;
    //  -webkit-line-clamp:2; 
  }
  .el-table__row td:first-child span {
    color:rgba(1,4,9,1);
  }
  .el-table td, .el-table th.is-leaf{
      border-bottom:1px solid #D8D8D8
  }
  .el-table__body tr.current-row>td{
    background-color: #F7F8FB;
    .icon-more{
      color: #7F8D92;
    }
  }
  .el-table td:nth-last-child(2) {
    color:red
  }
  .el-table td{
    padding:6px 0;
    text-align: left;
    //color: '#010409';
    font-size:12px;
  }
  .el-table td:last-child{
    padding:2px 0;
  }
  .el-table__row{
    height:34px !important;
  }
  .offer-top-table .el-table{
    max-height:400px;
    font-size:12px;
    //color:#010409;
  }
  .el-table thead{
    color:#010409
  }
  .offer-top-chart{
    width:100%;
    padding-top:14px;
    height:390px;
  }
}
.offer-top-block{
  padding:0 30px;
  .empty-img{
    display: flex;
    justify-content: center;
    align-items:flex-start;
    height:260px;
    img{
      width: 510px;
    }
  }
  .el-table .cell {
    line-height: 1.5
  }
  .el-table::before{
    height:0
  }
  .el-table__header-wrapper{
    font-size:16px;
    color:rgba(1,4,9,1);

  }
  .el-table__header th {
    border-top:none;
    text-align: left;
  }
  .el-table__header th .cell{
    //padding:0 5px;
    //height:24px;
    padding-left:5px;
    padding-right:5px;
    width:100%;
    height:24px;
    font-weight: 500
  }
  .el-table__row td .cell{
    text-align: left;
    padding-left:5px;
    padding-right:5px;
    color:rgba(1,4,9,0.6);
  }
  .el-table__row td:first-child span {
     color:rgba(1,4,9,1);
     max-height:38px;
     overflow:hidden; 
     text-overflow:ellipsis;
     display:-webkit-box; 
     -webkit-box-orient:vertical;
     -webkit-line-clamp:2; 
  }
  .el-table__row td:first-child span::after {
    
  }
  .el-table td, .el-table th.is-leaf{
      border-bottom:1px solid #D8D8D8
  }
  .el-table__body tr.current-row>td{
    background-color: #F7F8FB;
    .icon-more{
      color: #7F8D92;
    }
  }
  .el-table td:first-child {
    
  }
  .el-table td{
    padding:6px 0;
    text-align: left;
    color: '#010409';
    font-size:14px;
  }
  .el-table__row{
    height:54px !important;
  }
  .offer-top-table .el-table{
    max-height:350px;
    font-size:12px;
    color:#010409;
  }
  .el-table thead{
    color:#010409
  }
  .offer-top-chart{
    width:100%;
    height:350px;
  }

}
.common-top-style{
  header {
      display: flex;
      justify-content: space-between;
      padding:30px 30px 10px 30px;
      .title{
        height: 26px;
        color:rgba(1,4,9,1);
        line-height:26px;
        font-size:22px;
        font-weight: 800;
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
    .left-block{
      padding-right:30px;
    }
    .common-top-router {
      width:100%;   
      text-align: center;
      margin-top:6px;
    }
    .common-top-router a{
        color:#61ABFF;
    }
    .green {
      color: #5ED899
    }
    .red {
      color: #D11D25
    }
    .icon-more{
      font-size:18px;
      color: #CCD1D3;
    }
    .el-dropdown-menu li {
      line-height:24px
    }
    .el-dropdown {
      font-size:18px;
    }
    // .el-dropdown span {
    //   font-size:18px;
    // }
}

  .dark-dropdown li {
    line-height:24px;
  }
  .dark-dropdown {
    .el-dropdown-menu__item {
      color:#66b1ff !important;
      padding:0 16px
    }
    .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
      background:#293134 !important;
    }
  }
  .dark-dropdown[x-placement^=bottom]{
    margin-top:6px;
    background: #293134
  }
  .dark-dropdown[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: #293134 !important;
  }
  .dark-dropdown .popper__arrow {
    border-width: 6px;
    border-right-width: 6px;
    border-left-width: 6px;
    border-bottom: 6px;
    border-bottom-color: #293134 !important;
  }
</style>