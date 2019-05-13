<template>
  <div class="box">
    <div class="box-header">
      <h2>STATISTICS</h2>
    </div>
    <div class="box-container">
      <div class="box-content">
        <div class="box-content">
          <ul id="myTab" class="nav nav-tabs">
              <li class="active"><a href="#chartshow" data-toggle="tab" aria-expanded="true">Chart</a></li>
              <li class=""><a href="#tableshow" data-toggle="tab" aria-expanded="false">Table</a></li>
          </ul>
          <div id="myTabContent" class="tab-content" >
              <div class="tab-pane fade active in" id="chartshow" align="center" style="height: 400px">
                  <admin-chart
                      :reportData='reportData'>
                  </admin-chart>
              </div>
              <div class="tab-pane fade overflow_scroll" id="tableshow" align="center">
                  <admin-report
                      v-yeah-loading='isFetchingAdminReportData'
                      :reportData='reportData'>
                  </admin-report>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import alert_pop_util from '@/util/alert_pop'
import VueScript2  from 'vue-script2'
import AdminReport from './components/admin-report'
import AdminChart from './components/admin-chart'

export default {
  data(){
    return {
      isFetchingAdminReportData: false,
      reportData:[{}]

    }
  },
  props: ['prmCmpnt'],
  computed: {
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: {
    AdminReport,
    AdminChart
  },
  
  created () {
   if(this.$route.query && this.$route.query.redirect){
        this.$router.push(this.$route.query.redirect)
    }

    this.fetchAdminReportData()
  },
  
  methods:{
    fetchAdminReportData() {
      let url = 'Report/adminReport'
      let param = {interval:{day:1},filters:{show_hide:1},druid2:1,snapshot:1, timezone:'default',statistic:{click:'',conversion:'',revenue:''},calcus:{cr:''},'start':moment().add(-1, 'week').add(1,'day').format("YYYY-MM-DD"),end:moment().add(1,'day').format("YYYY-MM-DD")}
      if(this.userInfo.role_id === "12") {
          url = "Report/advertiserReport"
          param = {interval:{day:1},filters:{show_hide:1},druid2:1,timezone:'default',statistic:{click:'',conversion:''},calcus:{cr:''},'start':moment().add(-1, 'week').add(1,'day').format("YYYY-MM-DD"),end:moment().add(1,'day').format("YYYY-MM-DD")}
      }

      this.isFetchingAdminReportData = true
      this.$http.post(url, param).then(response => {
          this.isFetchingAdminReportData = false
          
          let data = response.body.data && response.body.data.data
          this.reportData = data
      }, err => {
          this.isFetchingAdminReportData = false
          alert_pop_util.setAlertPop(this, "show", "error", err.body.msg)
      })
    }
  },
}

</script>
<style>
</style>
