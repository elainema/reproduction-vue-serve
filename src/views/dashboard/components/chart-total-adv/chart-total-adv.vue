<template>
  <el-table
    class="wrap-total-adv"
    :data="tableData"
    header-cell-class-name='header-cell'
    row-class-name='tr-row'
    cell-class-name='td-cell'
    empty-text='  '
    v-yeah-loading='hisLoading || newLoading'
    style="width: 100%; height:100%">
    <el-table-column
      label="Time"
      prop='date'
      >
    </el-table-column>
    <el-table-column
      label="Conversion"
      >
      <template slot-scope="scope">
        <count-to :startVal="0" :endVal="scope.row.conversion" :duration="2000"></count-to>
        <span v-if="scope.row.conversionRate === ''" class="red">
        </span>

        <span v-else-if="scope.row.conversionRate < 0" class="red">
          <i class="ym-font icon-down " />
          <span class="cell-value">{{ `${Math.abs(scope.row.conversionRate)}` }}</span>
        </span>

        <span v-else-if="scope.row.conversionRate == 0" class="gray">
          <span class="bar0"></span>
          <span class="cell-value">{{ `${scope.row.conversionRate}` }}</span>
        </span>

        <span v-else class="green">
          <i class="ym-font icon-up" />
         
          <span class="cell-value">{{ `${scope.row.conversionRate}` }}</span>
        </span>
      </template>
    </el-table-column>
     <el-table-column
      label="Revenue"
      >
      <template slot-scope="scope">
        <count-to :startVal="0" :endVal="scope.row.revenue" :duration="2000" :decimals='1'></count-to>
        <span v-if="scope.row.revenueRate === ''" class="red">
        </span>
        <span v-else-if="scope.row.revenueRate < 0" class="red">
          <i class="ym-font icon-down " />
          <span class="cell-value">{{ `${Math.abs(scope.row.revenueRate)}` }}</span>
        </span>
        <span v-else-if="scope.row.revenueRate == 0" class="gray">
          <span class="bar0"></span>
          <span class="cell-value">{{ `${scope.row.revenueRate}` }}</span>
        </span>
        <span v-else class="green">
          <i class="ym-font icon-up" />
          <span class="cell-value">{{ `${scope.row.revenueRate}` }}</span>
        </span>
      </template>
    </el-table-column>
    <el-table-column
      label="Profit"
      >
      <template slot-scope="scope">
        <count-to :startVal="0" :endVal="scope.row.profit" :duration="2000" :decimals='1'></count-to>
        <span v-if="scope.row.profitRate === ''" class="red">
        </span>

        <span v-else-if="scope.row.profitRate < 0" class="red">
          <i class="ym-font icon-down " />
          <span class="cell-value">{{ `${Math.abs(scope.row.profitRate)}` }}</span>
        </span>
        <span v-else-if="scope.row.profitRate == 0" class="gray">
          <span class="bar0"></span>
          <span class="cell-value">{{ `${scope.row.profitRate}` }}</span>
        </span>
        <span v-else class="green">
          <i class="ym-font icon-up" />
          <span class="cell-value">{{ `${scope.row.profitRate}` }}</span>
        </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Vue from "vue"
  import CountTo from 'vue-count-to'
  import { CacheService } from '@/util/cacheService'
  import { fetchProfitUpDownRate } from '@/api/dashboard'
  import { formatDate } from '@/util/date'

  export default {
    name: 'chart-total-adv',
    props: {
      roleName: {
        type: String,
        default: ''
      }
    },
    
    data() {
      return {
        hisLoading: true,
        newLoading: true,
        historyData: [],
        newData: []
      }
    },

    components: { CountTo },

    watch: {
    },

    computed: {
      loading() {
        return  !(this.newData.length > 0 && this.historyData.length > 0)
      },
      tableData() {
        return this.newData.concat(this.historyData)
      }
    },

    created() {
      this.fetchHisoryData()
      this.fetchNewData()
      
    },


    mounted() {
      setInterval(getNewData, 1000 * 60 * 60)

      let _this = this
      function getNewData() {
        _this.fetchNewData()
      }
      
    },

    methods: {
      fetchHisoryData() {
        // let data = {
        //   yesterday_conversion:123,
        //   yesterday_revenue:123,
        //   yesterday_profit:123,
        //   yesterday_conversion_rate: -0.01,
        //   yesterday_revenue_rate:0.01,
        //   yesterday_profit_rate:0.01,
        //   month_conversion:123,
        //   month_revenue:123,
        //   month_profit:123,
        //   month_conversion_rate:0.01,
        //   month_revenue_rate:-0.01,
        //   month_profit_rate:0.01
        // }
        // this.historyData = this.formatHisoryData(data)
        // return 
        this.hisLoading = true
        CacheService.fetchData('Dashboard/getProfitUpDownRate')
          .then(data => {
            this.historyData = this.formatHisoryData(data)
            this.hisLoading = false
          })
          .catch(err => {
            this.historyData = []
            this.hisLoading = false
          })
      },

      formatHisoryData(data) {
        return [{
          date: data.yesterday_date,
          conversion: data.yesterday_conversion,
          conversionRate: data.yesterday_conversion_rate,
          revenue: data.yesterday_revenue,
          revenueRate: data.yesterday_revenue_rate,
          profit: data.yesterday_profit,
          profitRate: data.yesterday_profit_rate,
        }, {
          date: data.month_date,
          conversion: data.month_conversion,
          conversionRate: data.month_conversion_rate,
          revenue: data.month_revenue,
          revenueRate: data.month_revenue_rate,
          profit: data.month_profit,
          profitRate: data.month_profit_rate,
        }]
      },

      fetchNewData() {
        this.newLoading = true
        this.$http.get('Dashboard/getProfitUpDownRateToday')
          .then( res => {
            this.newData = this.formatNewData(res.body.data)
            this.newLoading = false
          })
          .catch(err => {
            this.newData = []
            this.newLoading = false
          })
      },

      formatNewData(data) {
        return [{
          date: data.today_date,
          conversion: data.today_conversion,
          conversionRate: data.today_conversion_rate,
          revenue: data.today_revenue,
          revenueRate: data.today_revenue_rate,
          profit: data.today_profit,
          profitRate: data.today_profit_rate,
        }]
      }
    },

  }; 
</script>
<style lang="less">
.wrap-total-adv{
  .header-cell{
    font-size:16px;
    color:rgba(1,4,9,1);
    line-height:24px;
    padding: 30px 0 11px!important;
    border-top: none;
    font-weight: 500;
    border-bottom: 1px solid #d8d8d8!important;
  }
  .td-cell{
    padding: 15px 0px!important;
    font-size:14px;
    font-family:Helvetica;
    color:rgba(1,4,9,0.6);
    border-bottom: 1px solid #d8d8d8!important;
  }
  .el-table__header-wrapper{ 
  }
  .el-table::before{
    height: 0!important;
  }
  .el-table__body{
  }
  .tr-row .td-cell:first-child,{
  }
  .tr-row .td-cell:last-child{
  }
  .td-date{
    font-size:16px;
    font-family:Helvetica;
    color:rgba(1,4,9,1);
    line-height:19px;
  }
  .td-num{
    font-size:18px;
    font-family:Helvetica;
    color:rgba(1,4,9,0.6);
    line-height:22px;
  }
  .ym-font{
    font-size: 16px;
  }
  .green{
    color: #5ED899;
  }
  .red{
    color: #D11D25;
  }
  .gray{
    color:rgba(1,4,9,0.3);
  }
  .bar0{
    width: 6px;
    height: 1px;
    background: #010409;
    display: inline-block;
    margin: 0 3px;
    opacity: .3;
    margin-bottom: 4px
  }
}

</style>
