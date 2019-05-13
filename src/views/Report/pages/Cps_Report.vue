
<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">CPS Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>CPS Report</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container ">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <form class="form-horizontal frm-entity frm-detail form-report ocpaReportForm" ref="form_report" action="" method="post" id="qf_offer" @submit.stop.prevent="submitForm">
                <div class="box-container" id="filter_check_box">

                    <div class="box-sub-header" v-box-action-resize>
                        <h3>Options</h3>
                        <div class="box-action">
                            <span class="icon-chevron-up" title="Fold"></span> 
                            <span class="icon-chevron-down hide" title="Unfold"></span>
                        </div>
                    </div>
                    <div class="box-content">
                        <div class="form-group field-required mt15">
                            <label for="" class="col-md-2 control-label">Advertiser</label>
                            <div class="col-md-10">
                                <div class="checkbox">
                                    <ul>
                                        <li>
                                            <input type="checkbox" v-model="by_adv" value="active" id="checkbox_by_adv">
                                            <label for="checkbox_by_adv" class="nopadding">By Advertiser</label>
                                        </li>
                                    </ul>
                                </div>
                                <select2Adv  v-if="by_adv" :select2_mode='"simple"':select2_class="'col-md-7 nopadding'"   :adv_name='"filters[adv_id]"' class="nomargin"></select2Adv>
                            </div>
                        </div>
                        <div class="form-group field-required ">
                            <label for="" class="col-md-2 control-label">Offer</label>

                            <div class="col-md-10">
                                <div class="checkbox">
                                    <ul>
                                        <li>
                                            <input type="checkbox" v-model="by_offer" value="active" id="checkbox_by_offer">
                                            <label for="checkbox_by_offer" class="nopadding">By Offer</label>
                                        </li>
                                    </ul>
                                </div>
                                <select2Offer  v-if="by_offer" :select2_mode='"simple"' :select2_class="'col-md-7 nopadding'" class="nomargin"></select2Offer>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label for="" class="col-md-2 control-label">Affiliate</label>
                            <div class="col-md-10">
                                <div class="checkbox">
                                    <ul>
                                        <li>
                                            <input type="checkbox" v-model="by_aff" value="active" id="checkbox_by_aff">
                                            <label for="checkbox_by_aff" class="nopadding">By Affiliate</label>
                                        </li>
                                    </ul>
                                </div>
                                <select2Aff  v-if="by_aff" :select2_mode='"simple"' :select2_class="'col-md-7 nopadding'" :aff_name='"filters[aff_id]"' class="mb10"></select2Aff>
                            </div>

                        </div>
                        <div class="form-group">
                            <label for="" class="col-md-2 control-label">Date Range</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 ">
                                <dateTimePicker_range  :init_date="'week'" :no_hour=true class="pull-left"></dateTimePicker_range>
                                <div class="checkbox inline_block ml15 pull-left">
                                    <ul>
                                        <li>
                                            <input type="checkbox"  data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1">
                                            <label for="date1" class="nopadding">By Date</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            

                        </div>
                        <div class="form-actions col-md-offset-2">

                            <button type="submit" class="btn btn-primary" id="onlineReport">Run Report</button>
                            <button type="button" class="btn btn-default pull-right" id="RunReportBtn" @click.stop.prevent="getExportReport" :disabled="export_report_disabled" ><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button> <a type="btn" href="/cps_report" class="btn btn-default" id="">Reset</a>

                        </div>
                    </div>
                    
                </div>

            </form>
        </div>

    </div>

    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Result</h2>
            <div class="box-action"><span class="icon-chevron-up" title="Fold"></span> <span class="icon-chevron-down hide" title="Unfold"></span></div>
        </div>
        <div class="box-container">
            <div class="box-content overflow_scroll">
                <table id="pageTable" class="table table-bordered table-hover">
                    <thead class="" v-show='reportName.length'>
                        <tr>
                            <th></th>
                            <th v-for="(item,index )  in reportName"> 
                                <span>{{item.replace(/_/,' ')  | capitalize}}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr v-for="(item,index ) in reportData">
                            <td></td>
                            <td v-if="reportName.indexOf('day') !== -1">{{moment(item.day).format("YYYY-MM-DD")}}</td>
                            <td v-if="reportName.indexOf('adv_id') !== -1">{{item.adv_id}}</td>
                            <td v-if="reportName.indexOf('adv_name') !== -1">{{item.adv_name}}</td>
                            <td v-if="reportName.indexOf('offer_id') !== -1">{{item.offer_id}}</td>
                            <td v-if="reportName.indexOf('offer_name') !== -1">{{item.offer_name}}</td>
                            <td v-if="reportName.indexOf('aff_id') !== -1">{{item.aff_id}}</td>
                            <td v-if="reportName.indexOf('aff_name') !== -1">{{item.aff_name}}</td>
                            <td>{{item.click}}</td>
                            <td>{{item.conversions}}</td>
                            <td>${{item.revenue.toFixed(3)}}</td>
                            <td>${{item.cost.toFixed(3)}}</td>
                            <td>${{(item.revenue - item.cost).toFixed(3)}}</td>
                            <td>{{item.event}}</td>
                        </tr>
                    </tbody>
                    <tfoot v-show='reportData.length'>
                        <tr>
                            <td>Page Total</td>
                            <td v-if="reportName.indexOf('day') !== -1"></td>
                            <td v-if="reportName.indexOf('adv_id') !== -1"></td>
                            <td v-if="reportName.indexOf('adv_name') !== -1"></td>
                            <td v-if="reportName.indexOf('offer_id') !== -1"></td>
                            <td v-if="reportName.indexOf('offer_name') !== -1"></td>
                            <td v-if="reportName.indexOf('aff_id') !== -1"></td>
                            <td v-if="reportName.indexOf('aff_name') !== -1"></td>
                            <td>{{report_cal.click}}</td>
                            <td>{{report_cal.conversions}}</td>
                            <td>${{report_cal.revenue.toFixed(3)}}</td>
                            <td>${{report_cal.cost.toFixed(3)}}</td>
                            <td>${{(report_cal.revenue - report_cal.cost).toFixed(3)}}</td>
                            <td></td>
                        </tr>
                    </tfoot>
                </table>

            </div>
        </div>
    </div>

 </div>
</template>
<style scoped>
    .form-report .chosen-filter{
        min-height: 40px;
    }
</style>
<script>
import Vue from 'vue'
import config from "@/util/config"


import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import pagination from '@/components/Pagination.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import select2Adv from '@/components/Select2Adv.vue'
import select2Offer from '@/components/Select2Offer.vue'
import select2Aff from '@/components/Select2Aff.vue'

import alert_pop_util from '@/util/alert_pop'
import report_util from '@/util/report'


export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        alertType:"info",
        alertPop:"hide",
        by_aff:false,
        by_offer:false,
        by_adv:false,
        reportData:[],
        reportName:[],
        report_cal:{
            click:0,
            conversions:0,
            revenue:0,
            cost:0
        },
        export_report_disabled:false,
    }
  },
  watch:{
    userInfo:function(val, oldVal){

    }
  },
  computed: {

    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: { dateTimePicker_range, pagination, AlertPop, select2Adv, select2Offer, select2Aff},
  methods: {
    hideAlertPop:function() {
      this.alertPop = "hide"
    },
    isCheked:function(item){
        return this[item]
    },
    moment: function (date) {
        return moment(date);
    },
    getReportName:function(nameArr){
        nameArr.splice(nameArr.length - 1, -1 , "profit")
        return nameArr
    },
    resetReportCal:function(){
        let that = this
        _.map(that.report_cal, function(val, key){
            that.report_cal[key] = 0;
        })
    },
    setReportCal:function(data){
        let that = this;
        _.each(data, function(item,index){
            that.report_cal.click += item.click;
            that.report_cal.conversions += item.conversions;
            that.report_cal.revenue += item.revenue;
            that.report_cal.cost += item.cost;

        })
    },
    submitForm:function(){
        let param = $(this.$refs.form_report).getFormQuery()

        this.loadingZone = true
        this.reportData = [];
        this.reportName = [];
        this.resetReportCal()
        Vue.http.get('Report/cpsReport', {params:param}).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){

                this.showAlert("No record!",'info')

                return;
            }
            if (response.body.data.length == 0) {
                this.showAlert("No record!",'info')
                return;
            }
            let somedata = response.body;
            this.reportData = somedata.data
            this.setReportCal(somedata.data)
            this.reportName = this.getReportName(report_util.convertItemText(_.keys(this.reportData[0])) )
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert( response.body.msg)

            // error callback
        })
    },
    getExportReport:function(){
        window.open(config.api_protocal + "//" + config.api_host + "/"　+ config.app_name + "/Report/cpsReport?" + $(this.$refs.form_report).serialize() + "&export=1", "_blank");
    }
  },
  created () {
    console.log("ocpa report page!!")   


  },
  mounted () {

  }
}
</script>