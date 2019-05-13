
<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Affiliate Commission</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Affiliate Commission</h2>
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
                            <label for="" class="col-md-2 control-label">Referring Affiliate</label>
                            <div class="col-md-10">
                                <select2Aff   :select2_mode='"simple"':select2_class="'col-md-7 nopadding'" class="nomargin" :select_api="'referral'" :aff_name="'aff_id'"></select2Aff>
                                <div class="checkbox col-md-10 clearfix">
                                    <ul>
                                        <li>    
                                            <input type="hidden" name="display" :value="display_referred_aff ? 1:0">
                                            <input type="checkbox" v-model="display_referred_aff" value="active" id="checkbox_by_adv">
                                            <label for="checkbox_by_adv" class="nopadding ml20">Display referred affiliate</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <div class="form-group">
                            <label for="" class="col-md-2 control-label">Date Range</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 ">
                                <dateTimePicker_range  :init_date="'week'" :no_hour=true :start_class="'start_time'" :end_class="'end_time'"></dateTimePicker_range>
                            </div>
                        </div>
                        <div class="form-actions col-md-offset-2">
                            <input type="hidden" name="limit" v-model="limit">
                            <input type="hidden" name="page" v-model="page">
                            <button type="submit" class="btn btn-primary" id="onlineReport">Run Report</button>
                            <button type="button" class="btn btn-default pull-right" id="RunReportBtn" @click.stop.prevent="ExportReportShow" :disabled="export_report_disabled" ><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
                            <a type="btn" href="affiliate_commission" class="btn btn-default" id="">Reset</a>

                        </div>
                    </div>
                    
                </div>

            </form>
        </div>
    </div>
    <div class="box">
    <div class="box-header">
        <h2>Result</h2>
        <div class="box-action">
            <!-- <i class="icon-resize-full fa fa-expand" title="Max"></i>
            <i class="icon-resize-small hide fa fa-compress" title="Min"></i> -->
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content">
            <div class="tab-content" id="report_result_block">
                <div class="tab-pane active" id="res_table">
                    <div id="report_container">
                        <pagination  v-if="dataPage" :pageLimit="limit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="page"></pagination>
                        <div class="box-content overflow_scroll">
                            <table class="list-table table table-hover tablesorter" id="report_list">
                                <colgroup>
                                    <col/>
                                    <col/>
                                    <col v-if="display_referred_aff" />
                                    <col v-if="display_referred_aff" />
                                    <col/>
                                    <col/>
                                </colgroup>
                                <thead class="cap">
                                    <tr>
                                        <th class="tl-left">Referring Affiliate ID</th>
                                        <th class="tl-left">Referring Affiliate Name</th>
                                        <th class="tl-left" v-if="display_referred_aff">Referred Affiliate ID</th>
                                        <th class="tl-left" v-if="display_referred_aff">Referred Affiliate Name</th>
                                        <th class="tl-left">Commission</th>
                                        <th class="tl-left">Base Amount</th>

                                    </tr>
                                </thead>
                                <tbody v-if="renderData && reportData.length == 0">
                                    <tr><td colspan="4"><strong>No Results Found.</strong></td></tr>
                                </tbody>
                                <tbody id="rp_list" v-if="reportData.length > 0">
                                    <tr v-if="display_referred_aff" v-for="i in reportData">
                                        <td>{{ i.presenter_id }}</td>
                                        <td>{{ i.presenter_name }}</td>
                                        <td>{{ i.presentee_id }}</td>
                                        <td>{{ i.presentee_name }}</td>
                                        <td>$ {{ i.commission }}</td>
                                        <td>$ {{ i.revenue }}</td>
                                    </tr>
                                    <tr  v-if="!display_referred_aff" v-for="i in reportData">
                                        <td>{{ i.presenter_id }}</td>
                                        <td>{{ i.presenter_name }}</td>
                                        <td>$ {{ i.commission }}</td>
                                        <td>$ {{ i.revenue }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <pagination  v-if="dataPage" :pageLimit="limit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="page"></pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- <report_download_modal :downloadUrl="downloadUrl" :href="href" :modalState="modalState" :hideModal="hideModal"></report_download_modal> -->
<modal 
    :dialogVisible.sync="modalState"
    :title="'Export'"
    :confirmText="confirmText"
    :showCancelText="false">
    <template slot="dialogBody">
        <p>Download URL: <span id="downloadUrl"> {{ downloadUrl }}</span></p>
        <span>Expiration in one day</span>
    </template>
</modal>
 </div>
</template>

<script>
import Vue from 'vue'


import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import pagination from '@/components/Pagination.vue'
import select2Aff from '@/components/Select2Aff.vue'
//import report_download_modal from '@/components/Report_Download_Modal.vue'

import mixin_alert_msg from '@/mixins/alert_msg'
import report_util from '@/util/report'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);

export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        alertType:"info",
        alertPop:"hide",
        display_referred_aff:0,
        export_report_disabled:false,
        reportData:[],
        dataPage:{},
        limit:20,
        page:1,
        renderData:false,
        modalState:'false',
        downloadUrl:'',
        confirmText:''
    }
  },
  mixins: [mixin_alert_msg],
  watch:{
    userInfo:function(val, oldVal){

    }
  },
  computed: {

    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: { dateTimePicker_range, pagination, AlertPop, select2Aff,pagination,Modal},
  methods: {
    hideModal() {
        this.modalState = 'hide'
    },
    onChangeLimit(limit){
        this.limit = limit;
        this.page = 1;
        this.$nextTick(function(){
            this.submitForm('')
        })
    },
    onChangePage(page){
        this.page = page;
        this.$nextTick(function(){
            this.submitForm('')
        })
    },
    ExportReportShow() {
        let that = this
        that.loadingZone = true
        that.export_report_disabled = true
        let param = $(this.$refs.form_report).getFormQuery()
        Vue.http.post('Report/getExportReferralFee', param).then(response => {
            that.loadingZone = ""
            if(!response.body.data){
                that.showAlert("export report failed.","info")
                return;
            }
            that.modalState = 'show'
            that.downloadUrl = response.body && response.body.data
            let href = response.body && response.body.data
            that.export_report_disabled = false
            that.confirmText = `<a class="btn-primary" id="download" target="_blank" href="${href}" @click="hideModal">Download</a>`
        }, response => {
            that.loadingZone = ""
            that.showAlert(response.body.msg)
        })
    },
    hideAlertPop:function() {
      this.alertPop = "hide"
    },
    submitForm:function(){
        let param = $(this.$refs.form_report).getFormQuery()
        let that = this
        that.loadingZone = true
        //this.resetReportCal()
        Vue.http.post('Report/getAffReferralFee', param).then(response => {
            that.loadingZone = ""
            if(!response.body.data){
                that.showAlert(response.body.msg,"info")
                return;
            }
            if (response.body.data.length == 0) {
                that.showAlert("No record!","info")
                return;
            }
            let somedata = response.body;
            that.reportData = somedata && somedata.data && somedata.data.list
            that.dataPage = somedata && somedata.data && somedata.data.paginator
            that.renderData = true
        }, response => {
            that.loadingZone = ""
            that.showAlert(response.body.msg)
        })
    }
  },
  created () {
  },
  mounted () {
    
  }
}
</script>
<style>
#report_list thead th {
    text-decoration: none;
    cursor: default;
}
</style>