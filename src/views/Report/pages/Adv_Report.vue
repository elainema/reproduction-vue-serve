<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Advertiser Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Advertiser Report</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <form class="form-horizontal frm-entity frm-detail form-report" id="qf_offer" ref="form_report" @submit.stop.prevent="submitForm">
                <div class="box-sub-header"  v-box-action-resize>
                    <h3>Options</h3>
                    <div class="box-action">
                        <span class="icon-chevron-up" title="Fold"></span>
                        <span class="icon-chevron-down hide" title="Unfold"></span>
                    </div>
                </div>
                <div class="box-content">
                    <div class="control-group form-group">

                        <label class="control-label col-md-2" for="">Offer Information</label>
                        <div class="col-md-10 " id="data_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="offer_id" v-model="offer_id"/> Offer
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[revenue]" checked="" /> Payout
                            </label>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="">Geo Targeting</label>
                        <div class="col-md-10 " id="geo_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="country" v-model="country" offline=1 /> Country
                            </label>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="">UA Targeting</label>
                        <div class="col-md-10 " id="source_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="platform"  v-model="platform" offline=1 /> Platform
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="browser" v-model="browser"  offline=1 /> Browser
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="device_type" v-model="device" offline=1 /> Device Type
                            </label>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="">Tracking Statistics</label>
                        <div class="col-md-10 " id="stat_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[click]" checked="checked" /> Click
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[conversion]" checked="checked" /> Conversion
                            </label>
                        </div>
                    </div>
                    <div class="control-group form-group" >
                        <label class="control-label col-md-2" for="">Data Calculations</label>
                        <div class="col-md-10 " id="calcus_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[cr]" checked="checked" /> CR
                            </label>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="">Time Interval</label>
                        <div class="col-md-10">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[day]" value="1" checked="checked" /> Date
                            </label>
                            <label class="checkbox-inline">
                                <!-- <input type="checkbox" name="interval[hour]" value="1" checked="checked" /> Hour -->
                                <input type="checkbox" name="interval[hour]" value="1" /> Hour
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="time_zone">Timezone</label>
                        <div class="col-md-10">
                            <select name="timezone" class="form-control col-md-6" id="timezone" v-model="timezone" @change="cal_day=true">
                                <option value="" >- Timezone -</option>
                                <option value="-12">(GMT -12:00) Eniwetok, Kwajalein</option>
                                <option value="-11">(GMT -11:00) Midway Island, Samoa</option>
                                <option value="-10">(GMT -10:00) Hawaii</option>
                                <option value="-9">(GMT -9:00) Alaska</option>
                                <option value="-8">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
                                <option value="-7">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
                                <option value="-6">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
                                <option value="-5">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
                                <option value="-4">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
                                <option value="-3.5">(GMT -3:30) Newfoundland</option>
                                <option value="-3">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
                                <option value="-2">(GMT -2:00) Mid-Atlantic</option>
                                <option value="-1">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
                                <option value="0">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
                                <option value="1">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
                                <option value="2">(GMT +2:00) Kaliningrad, South Africa</option>
                                <option value="3">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
                                <option value="3.5">(GMT +3:30) Tehran</option>
                                <option value="4">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
                                <option value="4.5">(GMT +4:30) Kabul</option>
                                <option value="5">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
                                <option value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
                                <option value="5.75">(GMT +5:45) Kathmandu</option>
                                <option value="6">(GMT +6:00) Almaty, Dhaka, Colombo</option>
                                <option value="7">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                                <option value="8">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
                                <option value="9">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
                                <option value="9.5">(GMT +9:30) Adelaide, Darwin</option>
                                <option value="10">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
                                <option value="11">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
                                <option value="12">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group mb10">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="start">Date Range</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 ">
                            <dateTimePicker_range :cal_day="cal_day" :dateChange="dateChange" ></dateTimePicker_range>
                        </div>
                    </div>
                </div>



                <div class="box-sub-header" v-box-action-resize>
                    <h3>Filters</h3>
                    <div class="box-action">
                        <span class="icon-chevron-up" title="Fold"></span>
                        <span class="icon-chevron-down hide" title="Unfold"></span>
                    </div>
                </div>
                <div class="box-content  box-content-filter">
                    <div class="form-group">

                        <div class="col-md-10 col-md-offset-2 clearfix " id="chosen_datas">
                            <select2Offer v-if="offer_id" :select2_mode="'simple'" class="col-md-12" :select2_api="'Advertiser_offer'"></select2Offer>
                            <chosen v-if="country" :chosen="geoChosen"  :multiple_vue=true></chosen>
                            <chosen v-if="platform" :chosen="platformChosen"  :multiple_vue=true></chosen>
                            <chosen v-if="browser" :chosen="browserChosen"  :multiple_vue=true></chosen>
                            <chosen v-if="device" :chosen="deviceChosen"  :multiple_vue=true></chosen>



                        </div>

                    </div>

                </div>

                <div class="form-actions">


                    <div class="form-group">
                        <div class="col-md-10 col-md-offset-2">
                            <div v-if="currentReportType === 'offline' ">
                                <input type="hidden" name="report_type" value="advertiser_general">
                                <input type="hidden" name="limit"  v-model="currentOfflineLimit">
                                <input type="hidden" name="page" v-model="currentOfflinePage" >
                                <input type="hidden" name="name"  :value="offlineReportName" >
                                <input type="hidden" name="query" :value="offline_query"  v-if="offline_query">


                            </div>
                            <div v-if="currentReportType === 'online' ">
                                <input type="hidden" name="limit" value="150">
                                <input type="hidden" name="page" :value="currentPage+1"  v-if="currentPage > 1">
                            </div>
                            <input type="hidden" name="source[yeahmobi2]" value="on">

                            <input type="hidden" name="druid2" value="1">
                            <div v-if="report_sort.name">
                                <input type="hidden" :name="'sort[' + report_sort.name + ']'" :value="report_sort.value">
                            </div>
                            <button type="submit" class="btn btn-primary" id="RunReportBtn">Run Report</button>
                            <a href="adv_report" class="btn btn-default" id="resetPage">Reset</a>
                            <button type="button" class="btn btn-default pull-right" id="export_report"  @click.stop.prevent="submitForm('','offline')" :disabled="export_report_disabled"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    </div>


    <div class="box">
        <div class="box-header"  v-box-action-resize>
            <h2>Result</h2>
            <div class="box-action">
                <!-- <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i> -->
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <ul id="chartTab" class="nav nav-tabs">
                    <li class="" :class="currentReportType==='online' ? 'active' : ''" @click="currentReportType='online'"><a href="#res_table" data-toggle="tab" aria-expanded="true" ref="res_table">Table</a></li>

                    <li class="" :class="currentReportType==='offline' ? 'active' : ''" @click.prevent="currentReportType='offline';offlineTableRefresh()"><a href="#offline_table" data-toggle="tab" id="offline_table_href" aria-expanded="false" ref="offline_table">Offline Table</a></li>

                </ul>
                <div class="tab-content report_result_block" id="report_result_block">
                    <div class="tab-pane" :class="currentReportType==='online' ? 'active' : ''" id="res_table">
                        <div id="report_container">
                            <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page.total"></pagination_report>
                            <div class="overflow_scroll">
                                <table class="list-table table table-hover tablesorter"  id="report_list" >
                                    <thead class="cap">
                                        <tr>
                                            <th v-for="(item,index ) in reportDataName" :class="item === 'advertiser_id' || item === 'offer_id' || item === 'aff_id' || item === 'click' || item === 'conversion' || item === 'cost' || item === 'revenue' || item === 'profit'|| item === 'acpa'|| item === 'rpc'|| item === 'cpc'|| item === 'arpa'|| item === 'CR(Gross)' || item === 'Gross Clicks'|| item === 'Unique Clicks'|| item === 'hour'|| item === 'year'|| item === 'month'|| item === 'week'|| item === 'date'? '' : 'no_sort' " @click.stop.prevent="onClickTh(item, $event)" > {{item | capitalize}}</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index ) in reportData">
                                            <td v-for="(_item,_index ) in item"  >
                                                <router-link style="color:#3a8bcc" :to="'p_manage_aff.html?id=' + _item" title="" target="_blank" v-if="reportDataName[_index] === 'aff_id'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_offer.html?id=' + _item" title="" target="_blank"  v-else-if="reportDataName[_index] === 'offer_id'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_aff.html?id=' + item[reportDataName.indexOf('aff_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'affiliate'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_offer.html?id=' + item[reportDataName.indexOf('offer_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'offer_name'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_adv.html?id=' + item[reportDataName.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'advertiser'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_adv.html?id=' + item[reportDataName.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="reportDataName[_index] === 'advertiser_id'"> {{_item}} </router-link>

                                                <span v-else>{{_item}}</span>
                                            </td>
                                        </tr>
                                        <tr class="font-bold" v-if="reportData.length" >
                                            <td data-nowrap="true">Page Total</td>
                                            <td data-nowrap="true" v-for="(item,key,index ) in reportDataCal" v-text="item" v-if="index !== 0"></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page.total"></pagination_report>
                        </div>
                    </div>

                    <div class="tab-pane" :class="currentReportType==='offline' ? 'active' : ''" id="offline_table">
                        <div id="offline_container " class="overflow_scroll">
                            <pagination :page="offlineTablePage" :onChangeLimit="onChangeOfflineLimit" :onChangePage="onChangeOfflinePage" :currentPage="currentOfflinePage" v-if="offlineTablePage"></pagination>
                            <table class="list-table table table-hover tablesorter"  id="offline_list">
                                <thead class="cap">
                                    <tr>
                                        <th v-for="(item,index ) in offlineTableDataName" v-if="item.toLowerCase()!=='id' && item.toLowerCase()!=='type' && item.toLowerCase()!=='failed_reason'"> {{item | capitalize}}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item,index ) in offlineTableData">
                                        <td v-for="(_item,_index ) in item"  data-nowrap="true" v-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2">
                                            <a v-if="_index === 4 && _item" title="" target="_blank" download="" :href="_item">Download</a>
                                            <span v-text="_item" v-else></span>
                                        </td>
                                        <td data-nowrap="true">
                                            <a style="color:#3a8bcc" href="javascript:;" @click="cancelOffline(item[0],index)" v-if="item[2] === 'queueing' || item[2] === 'preparing'">Cancel</a>
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <pagination :page="offlineTablePage" :onChangeLimit="onChangeOfflineLimit" :onChangePage="onChangeOfflinePage" :currentPage="currentOfflinePage" v-if="offlineTablePage"></pagination>
                        </div>
                    </div>


                </div>

            </div>

        </div>

    </div>
    
    <!-- <offlineReportModal :modalState="modalState" :hideModal="hideModal" :runOfflineReport="runOfflineReport"></offlineReportModal> -->
    <offline-report-modal
      :modalState.sync="modalState" 
      :runOfflineReport="runOfflineReport"
      :dialogName="'modalState'"
    ></offline-report-modal>
  </div>
</template>
<script>
import auth from '@/util/auth'

import { mapGetters, mapActions } from 'vuex'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import select2Offer from '@/components/Select2Offer.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import pagination_report from '@/components/Pagination_report.vue'
import pagination from '@/components/Pagination.vue'
//import offlineReportModal from '@/components/OfflineReportModal.vue'
import chosen from '@/components/Chosen.vue'
const OfflineReportModal = () => import(
/* webpackChunkName: "OfflineReportModal" */ '@/components/business/offline-report-modal/'
);


import Vue from 'vue'

import mixin_alert_msg from '@/mixins/alert_msg'


let reportCache = []
let nameCache = []
let pageCache = {}

export default {
  data(){
    return {
        offer_id:true,
        country:"",
        platform:'',
        browser:'',
        device:"",
        offline_query:"",
        loadingZone:"",
        offlineReportName:"",
        report_sort:{name:"",value:""},
        init_checked:['statistic[click]', 'statistic[conversion]', 'statistic[cost]', 'statistic[profit]', 'statistic[revenue]',  'calcus[cr]', 'calcus[rpc]','source[yeahmobi]'],
        cal_day:true,
        dateChecked:true,
        export_report_disabled:false,
        modalState:"hide",
        currentReportType:"online",
        reportData:[],
        reportDataName:[],
        page:{},
        currentPage:1,
        currentOfflinePage:1,
        currentOfflineLimit:50,
        offlineTableData:[],
        offlineTableDataName:[],
        offlineTablePage:false,
        timezone:"0"
    }
  },
  mixins: [mixin_alert_msg],
  watch:{
    userInfo:function(val, oldVal){
        this.timezone = this.$store.state.app.userInfo && this.$store.state.app.userInfo.timezone || "0"
    }

  },
  components: { dateTimePicker_range, select2Offer,  chosen , AlertPop, OfflineReportModal, pagination_report, pagination},
  computed: {
    ...mapGetters({
      chosens:"chosens",
      userRole:"userRole"
    }),
    geoChosen(){
       return  _.find(this.chosens, { name:'geo' });
    },
    platformChosen(){
        return _.find(this.chosens, { name:'dev' });
    },
    browserChosen(){
        return _.find(this.chosens, { name:'browser' });
    },
    deviceChosen(){
        return _.find(this.chosens, { name:'device' });
    },
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  methods: {
    ...mapActions([
      'getChosen',
      'getUserRole'
    ]),
    dateChange(startdate, enddate){
        this.cal_day = false;
        let moment_a = moment(startdate)
        let moment_b = moment(enddate)
        if (moment_b.diff(moment_a, "months", true) > 1) {
            this.dateChecked = false
        } else {
            this.dateChecked = true
        }
    },
    getReportFromCache(){
        let obj = {
            page:pageCache
        }
        obj.data = [nameCache];
        obj.data = obj.data.concat(reportCache.slice((this.currentPage - 1)*50, (this.currentPage - 1)*50 + 50))
        return _.cloneDeep(obj)
    },
    setReportCache(data){
        let _name = data.data[0];
        let _page = data.page
        let _data  = data.data.slice(1,data.data.length+1);
        reportCache = reportCache.concat(_data);
        nameCache = _name;
        pageCache = _page
    },
    convertSortKey(_key, convert_arr) {
        return convert_arr[_key] || _key
    },
    onChangePage(page){
        console.log(page)
        let that = this;
        this.currentPage = page;

        if(page % 3 === 0 && (page / 3 - 1  === pageCache.pagenumber)) {
            this.$nextTick(function(){
                this.getOnlineReport()
            })

        }else {
            this.loadingZone = true
            setTimeout(function(){
                that.renderReport(that.getReportFromCache())
                that.loadingZone = ""
            },500)
        }
    },
    onChangeOfflinePage(page){
        this.currentOfflinePage = page;
        this.offlineTableRefresh(page)

    },
    onChangeOfflineLimit(limit){
        this.currentOfflineLimit = limit;
        this.currentOfflinePage = 1;
        this.offlineTableRefresh(1, limit)
    },
    onClickTh(name, $event){
        if($($event.target).hasClass("no_sort")) return;
        name = this.convertSortKey(name, { "Area": "state", "Gross Clicks": "click", "Unique Clicks": "unique_click", "CR(Gross)": "cr" })

        if(this.report_sort.name === name){
            this.report_sort.value = this.report_sort.value === -1 ? 1 : -1;
        } else {
            this.report_sort.value  = -1 ;
            this.report_sort.name = name;
        }
        console.log(this.report_sort)
        this.submitForm("", "",true)

    },
    runOfflineReport(name){
        console.log("runOfflineReport" + name)
        let that = this;
        this.hideModal()
        this.currentReportType = "offline"
        this.offlineReportName = name

        if(!this.decideOfflineNew()) {
            this.offline_query = "basic"
        }else{
            this.offline_query = ""
        }
        this.$nextTick(function () {
            let  param = $(that.$refs.form_report).getFormQuery()
            this.showAlert("Please wait to prepare your offline report.",'info')
            Vue.http.post('Report/jobOfflineReport', param).then(response => {

                // get body data
                if(!response.body.data){
                    this.showAlert(response.body.msg,'info')

                    return;
                }

                let somedata = response.body;
                that.offlineTableRefresh()
                console.log(that.someData)
            }, response => {
                // error callback
                this.showAlert(response.body.msg)

                that.offlineTableRefresh()
            })
        })

    },
    offlineTableRefresh(page, limit){
        this.loadingZone = true

        Vue.http.get('Report/getJobOfflineReportList?type=advertiser_general&limit='+ (limit || this.currentOfflineLimit) +'&page='+ (page || this.currentOfflinePage) ).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg)

                return;
            }
            this.renderOfflineTable(response.body.data);
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert(response.body.msg)

        })


    },
    renderOfflineTable(data){
        let that = this;
        let _data = _.cloneDeep(data);
        this.offlineTableDataName = _data.data.shift();
        this.offlineTableData = _data.data
        this.offlineTablePage = data.page

        let is_refresh = false;
        $.each(_data.data,function(i,v){
            if(v[2] === "preparing" || v[2] === "queueing" || v[2] === "resolving") {
                is_refresh = true;
            }
        })
        if(is_refresh) {
            clearTimeout(window.timeout_offline)
            window.timeout_offline = setTimeout(function(){
                that.offlineTableRefresh()
            },10000)
        }

    },
      renderScheduleOfflineTable(data){
          let that = this;
          let _data = _.cloneDeep(data);
          this.scheduleOfflineTableDataName = _data.data.shift();
          this.scheduleOfflineTableData = _data.data
      },
    cancelOffline(report_id, index){
        console.log(report_id)
        Vue.http.get('Report/cancelJobOfflineReport?id='+report_id).then(response => {

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg, 'info')

                return;
            }
            this.offlineTableData[index].splice(2,1,"cancelled")

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    setReportDataCal(nameArr, dataArr){
        let obj = {}
        //remove first element for page display
        for (let i = 0; i < nameArr.length ; i++) {
            let cal = this.getReportCal(nameArr[i], nameArr, dataArr);
            obj[nameArr[i]] = cal
            console.log(obj)
            if(nameArr[i] === "cr") obj.cr =  !obj.click ? "0.00%" : ((obj.conversion / obj.click) * 100).toFixed(2) + "%";
            if(nameArr[i] === "profit %") obj['profit %'] = (!obj.revenue ||  obj.revenue==='$0.000') ? "0.00%" : ((parseFloat(obj.profit.substr(1)) / parseFloat(obj.revenue.substr(1))) * 100).toFixed(2) + "%";

            if(nameArr[i] === "rpc") obj.rpc = "$" +  ((!obj.revenue || obj.revenue==='$0.000' )? "0.000" :  (parseFloat(obj.revenue.substr(1)) / obj.click).toFixed(3)) ;
            if(nameArr[i] === "cpc") obj.cpc = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.000" : (parseFloat(obj.cost.substr(1)) / obj.click).toFixed(3)) ;
            if(nameArr[i] === "acpa") obj.acpa = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.00" : (parseFloat(obj.cost.substr(1)) / obj.conversion).toFixed(2)) ;
            if(nameArr[i] === "arpa") obj.arpa = "$" +  ((!obj.cost || obj.cost==='$0.000' )? "0.00" : (parseFloat(obj.revenue.substr(1)) / obj.conversion).toFixed(2)) ;
        }

        return obj
    },
    getReportCal(name, nameArr, dataArr){
        let cal_name = ['click','unique_click','conversion','cost','revenue','profit','cr','cpc','cpa','rpc','rpa','acpa','arpa']
        let index = nameArr.indexOf(name)
        let report_length = dataArr.length
        let cal = 0;
        let is_dollar;
        let is_percent;
        if(cal_name.indexOf(name) !== -1 ) {
            for (let i = 0; i < report_length; i++) {
                let _num = dataArr[i][index].toString();
                is_dollar = _num.match(/^\$/);
                is_percent = _num.match(/%$/);
                _num = _num.match(/^\$/) ? _num.substr(1) : _num;
                _num = parseFloat(_num);
                cal += _num

            }
            if(is_dollar) cal = "$" + cal.toFixed(3);
            if(is_percent) cal = (cal/report_length).toFixed(2) + "%"
            return cal
        }else return ""
    },
    //判断是否弹窗引导进入离线报表
    decideOfflineNew(){
        return  !! $("[type='checkbox'][offline=1]:checked").length
    },

    submitForm ($event, isOffline, isSort){

  
        if(this.decideOfflineNew() || isOffline){

            this.export_report_disabled = false;
            this.currentReportType = "offline"
            this.getOfflineReport();

        }else{
            this.currentPage = 1;
            this.page = {};
            this.chartData = []
            this.reportDataName = []
            this.reportData = [];
            this.reportDataCal = []
            if(!isSort) this.report_sort = {name:"",value:" "}
            this.currentReportType = "online"
            reportCache = []
            nameCache = [];

            this.$nextTick(function(){
                this.getOnlineReport()
            })
        }
    },
    renderReport(data){
        this.renderChart(data);
        let nameArr = data.data[0]
        let dataArr = data.data.slice(1,data.data.length + 1)
        if(dataArr.length ===0) return this.showAlert("no result.", 'info')

        let is_aff_detail_url = nameArr.indexOf("aff_detail_url") !== -1 ;
        let is_adv_detail_url = nameArr.indexOf("adv_detail_url") !== -1 ;
        if(is_aff_detail_url) {
            nameArr.splice(nameArr.indexOf("aff_detail_url"),1)
        }
        if(is_adv_detail_url) {
            nameArr.splice(nameArr.indexOf("adv_detail_url"),1)
        }


        if(nameArr.indexOf("revenue") !== -1 && nameArr.indexOf("profit") !== -1 ) {
            let _index = _.max([nameArr.indexOf("revenue"), nameArr.indexOf("profit")])
            if(nameArr.indexOf("profit %") === -1) {
                nameArr.splice(_index+1, 0, 'profit %')
                for (var i = 0; i < dataArr.length ; i++) {
                     let profit = dataArr[i][nameArr.indexOf("profit")];
                     let revenue = dataArr[i][nameArr.indexOf("revenue")];
                     profit = parseFloat(profit.substr(1));
                     revenue = parseFloat(revenue.substr(1));
                     dataArr[i].splice(_index+1, 0 , _.isNaN(profit / revenue)  ?  "0.00%" :  ((profit / revenue)*100).toFixed(2) + "%")
                }
            }
        }
        $.each(dataArr, function(i, v){
            $.each(v, function(_i, _v){
                dataArr[i][_i] = _.isString(_v)&&_v.indexOf("$") === 0 ?  "$" + parseFloat(_v.substr(1)).toFixed(3) : _v
            })
            if(is_adv_detail_url) {
                dataArr[i].splice(nameArr.indexOf("adv_detail_url"),1)
            }
            if(is_aff_detail_url) {
                dataArr[i].splice(nameArr.indexOf("aff_detail_url"),1)
            }
        })


        this.reportDataName = this.convertItemText(nameArr)
        this.reportData = dataArr;
        this.reportDataCal = this.setReportDataCal(nameArr, dataArr);
        this.page =  data.page
    },
    renderChart(data){
        this.chartData = data
    },
    getOnlineReport(){
        console.log("getOnlineReport")
        let param = $(this.$refs.form_report).getFormQuery()
        console.log(param)
        this.loadingZone = true
        Vue.http.post('Report/advertiserReport', param).then(response => {
            this.loadingZone = ""

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg, 'info')

                return;
            }

            let somedata = response.body;
            this.setReportCache(somedata.data)
            this.renderReport(this.getReportFromCache())
            console.log(this.someData)
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert(response.body.msg)

            // error callback
        })
    },
    getOfflineReport(){
        console.log("getOfflineReport")
        this.showOfflineModal();
    },
    showOfflineModal(){
        this.modalState = "show"
    },
    hideModal:function() {
      this.modalState = "hide"
    },
    setCheckedDom(){
        let that = this;
        $.each(this.short_cut_options[this.is_trigger_shotcut], function(i, v){
            $(that.$refs.form_report).find('[data-name="'+v+'"]').prop("checked", true)
        })
    },
    convertItemText(nameArr){
        let arr = []
        let item = { "click": "Gross Clicks", "cr": "CR(Gross)", "state": "area", "unique_click": "Unique Clicks" };
        $.each(nameArr, function(i,v){
            if(item[v]) {
                arr.push(item[v])
            }else{
                arr.push(v)
            }
        })
        return arr
    }
  },
  created () {
    console.log("report page!!")
    this.getChosen()
    this.getUserRole()
  },
  mounted () {
    //this.initChecked()

  }
}
</script>

