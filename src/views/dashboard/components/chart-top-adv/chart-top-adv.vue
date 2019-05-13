<template>
  <div class="common-top-style">
    <header>
      <p class="title">Top Advertisers</p>
      <el-radio-group v-model="profitType" class='radio-group'>
          <el-radio-button label="profit">Profit</el-radio-button>
          <el-radio-button label="profit_down">Profit Down</el-radio-button>
          <el-radio-button label="profit_up">Profit Up</el-radio-button>          
      </el-radio-group>
    </header>
    <commonTopChart
    :tableData="tableData" :labels="labels" :linkToL="linkToL" :sDate="sDate" modalName="Advertisers"
    :fetchApi="'Dashboard/getAdvertiserProfitDetail'" :profitType="profitType" :roleName="roleName">
    </commonTopChart>
  </div>
</template>

<script>
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { Table, TableColumn, Row, Col } from "element-ui";
import viewOptConf from "./conf";
import commonTopChart from "../common-top-chart/index.vue";
import { CacheService } from "@/util/cacheService";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Row);
Vue.use(Col);

export default {
  name: "chart-top-offer",
  data() {
    return {
      tableData: [],
      viewOpt: {},
      pubData: [],
      linkToL: "/report",
      labels: [],
      sDate: "",
      profitType: "profit",
      labelName: "Margin"
    };
  },
  props: {
    roleName: ""
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  watch:{
    profitType (val){
      if (val === 'profit'){
        this.labelName = "Margin"
      }
      else if (val === 'profit_down'){
        this.labelName = "Down"
      }
      else if (val === 'profit_up'){
        this.labelName = "Up"
      }
      this.setLabels();
      this.fetchData();
    },
  },
  components: { commonTopChart },
  created() {
    this.viewOpt = viewOptConf;
    this.fetchData();
    this.setLabels()
  },

  methods: {
    setLabels(){
      if (this.roleName == "am") {
        //am
        this.labels = [
          { label: "Advertiser", prop: "adv_name" },
          { label: "Conversion", prop: "conversion" },
          { label: "Revenue", prop: "revenue" },
          { label: "Profit", prop: "profit" },
          { label: this.labelName, prop: this.labelName.toLowerCase()},
          { label: "", prop: "reportlink" }
        ];
      } else if (this.roleName == "amLeader") {
        // am leader
        this.labels = [
          { label: "Advertiser", prop: "adv_name" },
          { label: "AM", prop: "am" },
          { label: "Conversion", prop: "conversion" },
          { label: "Revenue", prop: "revenue" },
          { label: "Profit", prop: "profit" },
          { label: this.labelName, prop: this.labelName.toLowerCase()},
          { label: "", prop: "reportlink" }
        ];
      } else if (this.roleName == "manager") {
        // manager
        this.labels = [
          { label: "Advertiser", prop: "adv_name" },
          { label: "Team", prop: "team" },
          { label: "Conversion", prop: "conversion" },
          { label: "Revenue", prop: "revenue" },
          { label: "Profit", prop: "profit" },
          { label: this.labelName, prop: this.labelName.toLowerCase()},
          { label: "", prop: "reportlink" }
        ];
      }
    },
    fetchData() {
      let params = {type : this.profitType}
      CacheService.fetchData("Dashboard/getAdvertiserProfit",params)
        .then(data => {
          this.tableData = data.data ? data.data : []
          this.sDate = data.date;
          this.getSettings()
          for (let item of this.tableData) {
            if (item["adv_name"]) {
              item["adv_name"] = item["adv_id"] + "-" + item["adv_name"];
            }
            if (item["cr"]) {
              item["cr"] = item["cr"] + "%";
            }
            if (item['margin']){
              item['margin'] = item['margin'] + '%'
            }
            if (item["cap_reach"]) {
              item["cap_reach"] = item["cap_reach"] + "%";
            }
            item["profit_margin"] =
              parseFloat(item["profit"] / item["revenue"] * 100).toFixed(2) +
              "%";
          }
        })
        .catch(err => {});
    },
    getSettings() {
      let lastDay = {
        start: moment(this.sDate)
          .add(0, "day")
          .format("YYYY-MM-DD"),
        end: moment(this.sDate)
          .add(1, "day")
          .format("YYYY-MM-DD")
      };
      if (this.roleName == "am") {
        //am
        this.linkToL = `report?advertiser_id=1&profit=-1&raw_data=1&startDate=${
          lastDay.start
        }&endDate=${lastDay.end}`;
      } else if (this.roleName == "amLeader") {
        // am leader
        this.linkToL = `report?advertiser_id=1&am=1&profit=-1&raw_data=1&startDate=${
          lastDay.start
        }&endDate=${lastDay.end}`;
      } else if (this.roleName == "manager") {
        // manager
        this.linkToL = `report?advertiser_id=1&am=1&profit=-1&raw_data=1&startDate=${
          lastDay.start
        }&endDate=${lastDay.end}`;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.offer-top-block {
  .offer-top-table {
    padding-right: 20px;
    height: 350px;
  }
  .offer-top-chart {
    width: 100%;
    height: 360px;
  }
}
</style>
