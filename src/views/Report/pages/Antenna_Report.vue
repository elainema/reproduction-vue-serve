<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Antenna Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Antenna Report</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container ">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content" id="antennaReportForm">
                <form class="form-horizontal" action="" method="" @submit.stop.prevent="submitForm" ref="antennaReportForm">
                    <div class="box-sub-header">
                        <h3>Options</h3>
                        <div class="box-action">
                            <i class="icon-chevron-up" title="Fold"></i>
                            <i class="icon-chevron-down hide" title="Unfold"></i>
                        </div>
                    </div>
                    <div class="form-group-content mt10">
                        <div class="form-group field-required">
                            <label for="checkbox_by_aff" class="col-md-2 control-label">Offer</label>
                            <div class="col-md-3">
                                <input type="checkbox" fef-change="toggleAffBlock" value="active" id="checkbox_by_aff" v-model="toggleAffBlock">
                                <label for="checkbox_by_aff">By Affiliate</label>
                                <div class="mt10" id="affBlock" v-if="toggleAffBlock">
                                    <select2Aff :aff_name="'filters[aff_id]'" :placeholder="'Search for affiliate'" :select2_class="'form-control'" :select2_mode="'simple'" :select_api="'affiliate_4Ocpa'" :select2CallBack="affSelect2CallBack" :select2_multiple="false"></select2Aff>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label for="checkbox_by_off" class="col-md-2 control-label">Offer</label>
                            <div class="col-md-3">
                                <input type="checkbox" fef-change="toggleOffBlock" value="active" id="checkbox_by_off" v-model="toggleOffBlock">
                                <label for="checkbox_by_off">By Offer</label>
                                <div class="mt10" id="offBlock" v-if="toggleOffBlock">
                                    <select2Offer :select2_name="'filters[offer_id]'" :placeholder="'Search for offer'" :select2_class="'form-control'" :select2_api="'offer2_4Ocpa'" :select2_mode="'simple'" :select2CallBack="offerSelect2CallBack" :adv_id="true"></select2Offer>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb30">
                            <label class="col-md-2 control-label">Detail </label>
                            <div class="col-md-10">
                                <div class="">
                                    <input type="checkbox" fef-change="toggleDetailBlock" name="detail" value="1" id="checkbox_by_detail" v-model="checkbox_by_detail">
                                    <label for="checkbox_by_detail">Show Detail </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group " id="dateRange">
                            <label class="col-md-2 control-label">Date Range</label>
                            <div class="col-md-10">
                                <div class="a1" data-base="a">
                                    <div class="controls ">
                                        <div>
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-10'"></dateTimePicker_range>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions form-group">
                        <div class="col-md-offset-2 col-md-4">
                            <input type="hidden" name="page" value="1"/>
                            <input type="hidden" name="limit" value="20"/>
                            <button type="submit" class="btn btn-primary" id="submit_btn">Run Report</button>
                            <button type="button" class="btn btn-default resetPage" @click.prevent="resetPage">Reset</button>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="btn btn-default pull-right" id="export_report" @click.prevent="export_report"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Result</h2>
            <div class="box-action"><span class="icon-chevron-up" title="Fold"></span> <span class="icon-chevron-down hide" title="Unfold"></span></div>
        </div>
        <div class="box-container">
            <div class="box-content customScrollBar-vertical" id="antennaReport">
                <ul id="chartTab" class="nav nav-tabs">
                    <li class="active chartTab_item"><a href="#online_table" data-toggle="tab">Online Table</a></li>
                    <li class=" chartTab_item"><a href="#offline_table" data-toggle="tab">Export Offline Table</a></li>
                    <li class=" chartTab_item"><a href="#schedule_offline_table" data-toggle="tab" @click.prevent="showScheduledOfflineData">Schedule Offline Table</a></li>
                </ul>
                <div class="tab-content" id="report_result_block">

                    <div class="btn-group pager pager_head" id="pager_head"></div>

                    <div class="tab-pane active" id="online_table">
                        <div id="report_container_online" class="overflow_scroll">
                            <table class="list-table table table-hover tablesorter" id="report_list_online">
                                <thead class="cap" id="online_thead" v-if="renderThead">
                                    <tr>
                                        <th v-if="type.day" data-nowrap="true">Date</th>
                                        <th v-if="type.aff_id" data-nowrap="true">Affiliate ID</th>
                                        <th v-if="type.offer_id" data-nowrap="true">Offer ID</th>
                                        <th v-if="type.conversion" data-nowrap="true">Conversion</th>
                                        <th v-if="type.risk_count" data-nowrap="true">Risk Count</th>
                                        <th v-if="type.transaction_id"　data-nowrap="true">Transaction<br>ID</th>
                                        <th v-if="type.aff_sub8" data-nowrap="true">aff_sub8</th>
                                        <th v-if="type.click_ip" data-nowrap="true">IP<br>Proxy</th>
                                        <th v-if="type.click_ip" data-nowrap="true">IP<br>Repeat</th>
                                        <th v-if="type.time_diff" data-nowrap="true">CV Time</th>
                                        <th v-if="type.user_agent" data-nowrap="true">UserAgent</th>
                                        <th v-if="type.device_os" data-nowrap="true">DeviceOS</th>
                                        <th v-if="type.reason" data-nowrap="true">Reason</th>
                                        <th v-if="type.risk" data-nowrap="true">Risk</th>
                                    </tr>
                                </thead>
                                <tbody id="online_tbody" v-if="renderTbody">
                                    <p v-if="!list.length" data-nowrap="true" class="noResult">no result.</p>
                                    <tr v-for="i in list">
                                        <td v-if="type.day" v-html="setNAWhileEmpty(i.day)"></td>
                                        <td v-if="type.aff_id" v-html="setNAWhileEmpty(i.aff_id)"></td>
                                        <td v-if="type.offer_id" v-html="setNAWhileEmpty(i.offer_id)"></td>
                                        <td v-if="type.conversion" v-html="setNAWhileEmpty(i.conversion)"></td>
                                        <td v-if="type.risk_count">
                                           <div data-toggle="tooltip" data-placement="auto" title="" data-original-title="">
                                                <div class="progress" rowmark="info">
                                                    <div v-if="i.conversion && i.ok" class="progress-bar progress-bar-success" data-toggle="tooltip" data-placement="auto" :style="'width:' + calPercent(true,i.conversion,i.ok.count)" :title="'ok = ' + calPercent(false,i.conversion,i.ok.count)">
                                                    </div>
                                                    <div v-if="i.conversion && i.low" class="progress-bar progress-bar-info" data-toggle="tooltip" data-placement="auto" :style="'width:' + calPercent(true,i.conversion,i.low.count)" :title="'low = ' + calPercent(false,i.conversion,i.low.count)">
                                                    </div>
                                                    <div v-if="i.conversion && i.middle" class="progress-bar progress-bar-warning" data-toggle="tooltip" data-placement="auto" title="" :style="'width:' + calPercent(true,i.conversion,i.middle.count)" :title="'middle = ' + calPercent(false,i.conversion,i.middle.count)">
                                                    </div>
                                                    <div v-if="i.conversion && i.high" class="progress-bar progress-bar-danger" data-toggle="tooltip" data-placement="auto" :style="'width:' + calPercent(true,i.conversion,i.high.count)" :title="'high = ' +　calPercent(false,i.conversion,i.high.count)">
                                                    </div>
                                                    <div v-if="!i.conversion" class="progress-bar progress-bar-success" data-toggle="tooltip" data-placement="auto" title="" style="width:100%" :title="'ok = 100%(' + setNAWhileEmpty(i.conversion) + ')'">
                                                    </div>
                                                </div>
                                           </div>
                                        </td>
                                        <td v-if="type.transaction_id" v-html="setNAWhileEmpty(i.transaction_id)"></td>
                                        <td v-if="type.aff_sub8"  v-html="setNAWhileEmpty(i.aff_sub8)"></td>
                                        <td v-if="type.click_ip" v-html="setNAWhileEmpty(i.click_ip)"></td>
                                        <td v-if="type.click_ip">{{ truncateIp(i.click_ip, -1) }}</td>
                                        <td v-if="type.time_diff" v-html="setNAWhileEmpty(i.time_diff)"></td>
                                        <td v-if="type.user_agent" v-html="setNAWhileEmpty(i.user_agent)"></td>
                                        <td v-if="type.device_os" v-html="setNAWhileEmpty(i.device_os)"></td>
                                        <td v-if="type.reason" v-html="setNAWhileEmpty(i.reason)"></td>
                                        <td v-if="type.risk">
                                            <button v-if="i.risk == 'ok'" type="button" class="btn btn-success">OK</button>
                                            <button v-if="i.risk == 'low'" type="button" class="btn btn-info">Low</button>
                                            <button v-if="i.risk == 'middle'" type="button" class="btn btn-warning">Middle</button>
                                            <button v-if="i.risk == 'high'" type="button" class="btn btn-danger">High</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane " id="offline_table">
                        <div id="report_container">
                            <div class="btn-group pager_head" id="offline_div"></div>
                            <div class="overflow_scroll">
                                <table class="list-table table table-hover tablesorter" id="report_list">
                                    <thead class="cap" id="offline_thead">
                                        <tr>
                                            <th v-if="offlineType.ID" data-nowrap="true">ID</th>
                                            <th v-if="offlineType.Name"　data-nowrap="true">Name</th>
                                            <th v-if="offlineType.Status" data-nowrap="true">Status</th>
                                            <th v-if="offlineType.Create_Time" data-nowrap="true">Create_Time</th>
                                            <th v-if="offlineType.failed_reason" data-nowrap="true">Failed_Reason</th>
                                            <th v-if="offlineType.Download_URL" data-nowrap="true">Download_URL</th>
                                        </tr>
                                    </thead>
                                    <tbody id="offline_tbody" valign="">
                                        <p v-if="!offlineList.length" data-nowrap="true" class="noResult">no result.</p>
                                        <tr v-for="i in offlineList">
                                            <td v-if="offlineType.ID" v-html="setNAWhileEmpty(i.ID)"></td>
                                            <td v-if="offlineType.Name" v-html="setNAWhileEmpty(i.Name)"></td>
                                            <td v-if="offlineType.Status" v-html="setNAWhileEmpty(i.Status)"></td>
                                            <td v-if="offlineType.Create_Time">{{ translateDateStrToDate(i.Create_Time) }}</td>
                                            <td v-if="offlineType.failed_reason" v-html="setNAWhileEmpty(i.failed_reason)"></td>
                                            <td v-if="offlineType.Download_URL">
                                                <a v-if="i.Status == 'complete'" :href="setNAWhileEmpty(i.Download_URL)">Download URL</a>
                                                <span v-else>Not Complete...</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="btn-group pager_foot" id="pager_1"></div>
                        </div>
                    </div>
                    <div class="tab-pane " id="schedule_offline_table">
                        <div id="report_container_schedule_offline">
                            <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                            <div class="overflow_scroll">
                                <table class="list-table table table-hover tablesorter" id="schedule_report_list">
                                    <thead class="cap" id="schedule_offline_thead">
                                    <tr>
                                        <th v-if="offlineType.ID" data-nowrap="true">ID</th>
                                        <th v-if="offlineType.Name"　data-nowrap="true">Name</th>
                                        <th v-if="offlineType.Status" data-nowrap="true">Status</th>
                                        <th v-if="offlineType.Create_Time" data-nowrap="true">Create_Time</th>
                                        <th v-if="offlineType.failed_reason" data-nowrap="true">Failed_Reason</th>
                                        <th v-if="offlineType.Download_URL" data-nowrap="true">Download_URL</th>
                                    </tr>
                                    </thead>
                                    <tbody id="schedule_offline_tbody" valign="">
                                        <p v-if="!scheduleOfflineList.length" data-nowrap="true" class="noResult">no result.</p>
                                        <tr v-for="i in scheduleOfflineList">
                                            <td v-if="offlineType.ID" v-html="setNAWhileEmpty(i.ID)"></td>
                                            <td v-if="offlineType.Name" v-html="setNAWhileEmpty(i.Name)"></td>
                                            <td v-if="offlineType.Status" v-html="setNAWhileEmpty(i.Status)"></td>
                                            <td v-if="offlineType.Create_Time">{{ translateDateStrToDate(i.Create_Time) }}</td>
                                            <td v-if="offlineType.failed_reason" v-html="setNAWhileEmpty(i.failed_reason)"></td>
                                            <td v-if="offlineType.Download_URL">
                                                <a v-if="i.Status == 'complete'" :href="setNAWhileEmpty(i.Download_URL)">Download URL</a>
                                                <span v-else>Not Complete...</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                        </div>
                    </div>

                    <div class="btn-group pager pager_foot" id="pager_foot"></div>

                </div>
            </div>
        </div>
    </div>
    <!-- <export_antenna_detail_modal :modalState="modalState" :hideModal="hideModal" :onConfirm="onConfirm"></export_antenna_detail_modal> -->
    <modal
        :dialogVisible.sync="modalState"
        :title="dialogTitle"
        :showCancelText="false"
        :dialogBody="dialogBody"
        :onConfirm="onConfirm">
    </modal>
</div>
</template>

<script>
import Vue from 'vue'


import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import pagination from '@/components/Pagination.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import select2Adv from '@/components/Select2Adv.vue'
import select2Offer from '@/components/Select2Offer.vue'
import select2Aff from '@/components/Select2Aff.vue'
//import export_antenna_detail_modal from '@/components/ExportAntennaDetailModal.vue'

import mixin_alert_msg from '@/mixins/alert_msg'
import template_util from '@/mixins/templateUtil'

import alert_pop_util from '@/util/alert_pop'
import cors_config from '@/util/config'

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');


export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        modalState:'hide',
        alertType:"info",
        alertPop:"hide",
        kpi:"retention",
        by_aff:false,
        by_offer:false,
        renderThead:false,
        renderTbody:false,
        toggleAffBlock:false,
        toggleOffBlock:false,
        aff_id:'',
        offer_id:'',
        type:{},
        list:[],
        checkbox_by_detail:false,
        offlineType:{},
        offlineList:[],
        scheduleOfflineList:[],
        pageLimit:20,
        dataPage:{},
        currentPage:1,
        dialogBody:'The system will export the data for you to download. please check offline table.',
        dialogTitle: 'Please Waiting...'
    }
  },
  mixins: [mixin_alert_msg,template_util],
  watch:{
    userInfo:function(val, oldVal){

    }
  },
  computed: {
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: { dateTimePicker_range, pagination, AlertPop, select2Adv, select2Offer, select2Aff,Modal},
  methods: {
    onChangePage(page){
        this.currentPage = page;
        this.$nextTick(function(){
            var query = {
                page:page,
                limit:20,
                type:'antenna_offline_scheduled_report'
            };
            this.loadOfflineReportList(query)
        })
    },
    onChangeLimit(limit){
        this.pageLimit = limit;
        this.currentPage = 1;
        this.$nextTick(function(){
            var query = {
                page:1,
                limit:limit,
                type:'antenna_offline_scheduled_report'
            };
            this.loadOfflineReportList(query)
        })
    },
    resetPage() {
        location.reload();
    },
    hideModal:function() {
      this.modalState = "hide"
    },
    affSelect2CallBack(val) {
        this.aff_id = val
    },
    offerSelect2CallBack(val) {
        this.offer_id = val
    },
    onConfirm() {
        this.hideModal()
    },
    showScheduledOfflineData() {
        var query = {
            page:1,
            limit:20,
            type:'antenna_offline_scheduled_report'
        };
        this.loadOfflineReportList(query)
    },
    loadOfflineReportList (query) {
        let that = this
        that.loadingZone = true
        Vue.http.get('Report/getJobOfflineReportList', {params:query}).then(response => {
            var data =  response && response.body && response.body.data
            if(!data.data || data.data.length < 1){
                return;
            }
            var types = data.data.shift();
            var type_dict = {};
            var dataKeys = [];
            for(var i=0; i<types.length; i++){
                var key = types[i].replace(" ","_");
                type_dict[key] = '1';
                dataKeys.push(key);
            }
            var dataList = [];
            for(var i=0;i<data.data.length;i++){
                var tmpList = data.data[i];
                var list = {};
                for(var j=0;j<tmpList.length;j++){
                    list[dataKeys[j]] = tmpList[j];
                }
                dataList.push(list);
            }
            that.offlineType = type_dict
            that.offlineList = dataList
            that.dataPage = data && data.page
            that.loadingZone = ''
        }, response => {
            that.showAlert(response.body.msg, "error")
            that.loadingZone = ''
        })
    },
    offline_report_load() {
        var that = this
        var d = new Date();
        var ymd = (d.getMonth()>9?'':'0') + (d.getMonth()+1) + (d.getDate()>9?'':'0') + d.getDate() + (d.getHours()>9?'':'0') + d.getHours()+
            (d.getMinutes()>9?'':'0') + d.getMinutes()+(d.getSeconds()>9?'':'0') + d.getSeconds();
        var name = 'AntennaReport@' + $("[name='start']").val() + '~' + $("[name='end']").val() +'-'+ ymd;
        var query = $(that.$refs.antennaReportForm).getFormQuery();
        var new_params = {
            run_type:'offline',
            report_type:'manage_antenna_detail',
            name:encodeURIComponent(name),
        }
        var params = $.extend(query, new_params);
        that.loadingZone = true
        /*if (typeof(query) != 'string')
            query = '';
        query = query.replace('aff_id','affiliate_id');//jobOfflineReport接口aff_id不支持*/
        that.$http.post('Report/jobOfflineReport', params).then(response => {
            that.loadingZone = ""
            if(response.body.flag != "success"){
                that.showAlert(response.body.msg, "error")
            } else {
                that.activeTabPane('offline_table');
            }
            that.loadingZone = ""
        }, response => {
            that.loadingZone = ""
        })

        var query = {
            page:1,
            limit:20
        };
        setTimeout(function () {
            that.loadOfflineReportList(query);
        }, 1000);
        setInterval(function() {
            that.loadOfflineReportList(query);
        }, 60000);
    },
    export_report: function () {
        let that = this
        var p = that.formValidation();
        p.then(function (error, result) {
            if (error) {
               that.showAlert(error, 'info')
            }
            if (that.checkbox_by_detail) {
                that.modalState = 'show'
                that.offline_report_load();
            } else {
                window.open(cors_config.api_protocal + "//" + cors_config.api_host + "/" + cors_config.app_name + "/Report/antennaReport?" + $(that.$refs.antennaReportForm).serialize() + "&export=1", "_blank");
            }
        })
    },
    formValidation: function () {
        var p = new promise.Promise();
        var affiliate = this.aff_id;
        if (/\,/.test(affiliate)) {
            affiliate = affiliate.replace(/all,/, "");
            $('[data-name="affiliate"]').val(affiliate);
        }
        p.done(null, "")
        return p;
    },
    activeTabPane(tabId){
        $('.nav-tabs a[href="#' + tabId + '"]').tab('show');
    },
    antennaReport() {
        let that = this
        var query = $(that.$refs.antennaReportForm).getFormQuery()
        that.loadingZone = true
        that.$http.get('Report/antennaReport', {params: query}).then(response => {
            that.loadingZone = ""
            if(response.body.flag != "success"){
                that.showAlert(response.body.msg, "error")
            } else {
                var data = response.body && response.body.data;
                var options = {};
                var field = data.field;
                for (var k in field) {
                    options[field[k]] = 1;
                }
                var pageData = {};
                pageData['list'] = data.data;
                data.paginator['page_range'] = [1];
                if (data.paginator.page > 4) {
                    data.paginator['page_range'].push("...");
                }
                for (var i = 2; i >= 0; i--) {
                    var pageIndex = data.paginator.page - i;
                    if (pageIndex > 1) {
                        data.paginator['page_range'].push(pageIndex);
                    }
                }
                data.paginator['page_range'].push("...");

                if (data.paginator.page > 1) {
                    data.paginator['has_previous'] = true;
                }
                pageData['paginator'] = data.paginator;
                that.list = data && data.data
                that.type = options
                that.renderThead = true
                that.renderTbody = true
            }
        }, response => {
            that.loadingZone = ""
        })
    },
    submitForm(){
        var that = this;
        var p = that.formValidation();
        that.activeTabPane('online_table');
        p.then(function (error, result) {
            if (error) {
                that.showAlert(error, 'info')
                return
            }
            that.antennaReport()
        })
    },
  },
  created () {
  },
  mounted () {
    
  }
}
</script>

<style scoped>
.table tbody tr td{
    box-sizing: border-box;
}
.nav>li>a{
    padding: 10px 2px;    margin-right: 1px;
}
</style>