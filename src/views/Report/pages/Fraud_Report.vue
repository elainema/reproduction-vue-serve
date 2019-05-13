<template>
    <div :class="loadingZone ? 'ajax_loading' : ''" @click="closeReportFilter()">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="/">Home</router-link></li>
                <li class="active">Fraud Report</li>
            </ul>
        </div>
        <div class="box" ref="box_form">
            <div class="box-header" v-box-action-resize>
                <h2>Fraud Report</h2>
                <div class="box-action">
                    <span class="icon-chevron-up" title="Fold"></span>
                    <span class="icon-chevron-down hide" title="Unfold"></span>
                </div>
            </div>
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <form class="form-horizontal frm-entity frm-detail form-report" id="qf_offer" ref="form_report" @submit.stop.prevent="submitForm">
                    <div class="box-sub-header"  v-box-action-resize>
                        <h3>Basic Options</h3>
                        <div class="box-action">
                            <span class="icon-chevron-up" title="Fold"></span>
                            <span class="icon-chevron-down hide" title="Unfold"></span>
                        </div>
                    </div>
                    <div class="box-content">
                        <div class="form-group">
                            <label class="col-md-2 control-label">Offer</label>
                            <div class="col-md-10 controls">
                                <div class="checkbox nopadding">
                                    <ul>
                                        <li>
                                            <input style="position:relative" type="checkbox" v-model="by_offer" value="active" id="checkbox_by_offer" name="checkbox_by_offer">
                                            <label for="checkbox_by_offer" class="nopadding">By Offer</label>
                                        </li>
                                    </ul>
                                </div>
                                
                            </div>
                        </div>
                        <div class="form-group ">
                            <label for="inputPassword3" class="col-md-2 control-label">Publisher</label>
                            <div class="col-md-10 controls">
                                <div class="checkbox nopadding">
                                    <ul>
                                        <li class="publisher-by_pub">
                                            <input style="position:relative" type="checkbox" v-model="by_aff" value="active" id="checkbox_by_aff" name="checkbox_by_aff">
                                            <label for="checkbox_by_aff" class="nopadding">By Publisher</label>
                                        </li>
                                        <li class="checkbox publisher-by_sub" v-if="by_aff">
                                            <input type="checkbox" data-name="group[aff_sub8]" data-c-name="group[aff_sub8]"  value="1" id="checkbox_by_sub_aff" :name="toggleSubAff ? 'group[aff_sub8]': ''" v-model="toggleSubAff">
                                            <label for="checkbox_by_sub_aff" class="nopadding">Sub Publisher</label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2" for="">Offer Information</label>
                            <div class="col-md-10" id="data_chk_box"> 
                                <span  id="bd_user">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="advertiser_id"  v-model="advertiser_id"> Advertiser
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="advertiser_manager_id" v-model="am"> AM
                                    </label>
                                </span>
                                <span id="am_user">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="affiliate_manager_id" v-model="pm"> PM
                                    </label>
                                </span>
                                <!-- <label class="checkbox-inline">
                                    <input type="checkbox" value="" name="filters[publisher_app_id]" data-name="publisher_app_id">Publisher App
                                </label> -->
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2" for="">Fraud Data</label>
                            <div class="col-md-10" id="fraud_data_box">
                                <span id="ctit">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="fraud[ctit_lt]" name="fraud[ctit_lt]"> Click Injection
                                    </label>
                                    
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="fraud[ctit_gt]" name="fraud[ctit_gt]"> Click Flood
                                    </label>
                                    
                                </span>
                                <span id="cr">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="fraud[cr]" name="fraud[cr]"> CR 
                                    </label>
                                    
                                </span>
                                <span id="statistic">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="fraud[abnormal_ip]" name="fraud[abnormal_ip]"> Abnormal IP
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="fraud[conflicting_device_region]" name="fraud[conflicting_device_region]"> Conflict Device Region
                                    </label>
                                </span>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="fraud[conflicting_device_info]" data-name="fraud[conflicting_device_info]">Conflict Device Info
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="ocpa" name="fraud[incentive_user]"> Incentive User
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="fraud[out_of_store]" name="fraud[out_of_store]"> Out Of Store
                                </label>
                                <!-- <label class="checkbox-inline">
                                    <input type="checkbox" name="fraud[sleepy_users]" data-name="ocpa" >Sleepy Users
                                </label> -->
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="fraud[rejected_install]" data-name="fraud[rejected_install]"> Rejected Rate
                                </label>

                                <label class="checkbox-inline">
                                    <input type="checkbox" name="fraud[ip_vpn]" data-name="fraud[ip_vpn]"> Ip Vpn
                                </label>

                                <label class="checkbox-inline">
                                    <input type="checkbox" name="fraud[wrong_language]" data-name="fraud[wrong_language]" :disabled='!by_offer && (by_aff || advertiser_id)'> Wrong Language
                                </label>
                                
                            </div>
                        </div>
                    </div>
                    <div class="isShow">
                        <div class="box-sub-header" id="advanced_options" v-box-action-resize >
                            <h3>Advanced Options</h3>
                            <div class="box-action">
                                <span class="icon-chevron-up hide" title="Fold"></span>
                                <span class="icon-chevron-down " title="Unfold"></span>
                            </div>
                        </div>
                        <div class="box-content hide" id="advanced_options_content">
                            <p>**If you select any advanced options, it will cost longer time to generate the report. Please go to offline report to get the result.</p>
                            <div class="form-group">
                                <label class="control-label col-md-2" for="">Suspicious</label>
                                <div class="col-md-10" id="geo_chk_box">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-name="suspicious_os" name="suspicious_os"> Suspicious OS
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="statistic[device_brand_name]" data-name="statistic[device_brand_name]" value="1"> Suspicious Device
                                    </label>
                                </div>
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
                    <div class="box-content box-content-filter">
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-2 clearfix" id="chosen_datas">
                                <div class=" chosen-filter  nopadding col-xs-12" id="offerBlock" style="margin:0" v-if="by_offer">
                                    <p> Offer </p>
                                    <select2Offer ref="offerChose" style="300px;min-height:auto" :select2_mode='"simple"' :select2_class="'nopadding form-control'" :select2CallBack="offerSelect2CallBack" :singleVal='offer_id'></select2Offer>
                                </div>
                                <div class="chosen-filter  nopadding col-xs-12 filterAM" id="affBlock" style="margin:0" v-if="by_aff">
                                    <p> Publisher </p>
                                    <select2Aff style="width:100%;min-height:auto" :select2_mode='"simple"' :select2_class="'nopadding'"  :aff_name='"filters[affiliate_id]"'  placeholder="Search for an Publisher"></select2Aff>
                                    
                                </div>
                                <chosen v-if="advertiser_id" :chosen="advChosen" :multiple_vue=true></chosen>
                                <!-- <chosen v-if="am" :chosen="amChosen"  :multiple_vue=true></chosen>
                                <chosen v-if="pm" :chosen="pmChosen"  :multiple_vue=true></chosen> -->
                            </div>
                        </div>
                        <div class="form-group data-source hide">
                            <label class="control-label col-md-2" for="data-yeahmobi">Date Source</label>
                            <div class="col-md-10">
                                <label class="checkbox-inline">
                                    <input type="checkbox" id="data-yeahmobi" :name="currentReportType==='online' ? 'source[yeahmobi]' : 'source[yeahmobi2]' " data-name="yeahmobi" value="on" checked> YeahMobi
                                </label>
                            </div>
                        </div>
                        <div class="form-group mb10">
                        <label for="inputPassword3" class="col-md-2 control-label">Date Range</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 row">
                                <div class="a1">
                                    <div class="col-lg-12 col-md-12 col-sm-12 row">
                                        <div class="col-md-10 row-sm">
                                            <dateTimePicker_range :cal_day="cal_day" :detaultStartDate='startDate' :defaultEndDate='endDate' :limitRange="limitRange" :classList="'col-md-12'" :no_hour="true"></dateTimePicker_range>
                                        </div>
                                        <!--<div class=" inline_block ml15 pull-left">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-model="interval_date" />By Date
                                            </label>
                                        </div>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-10 col-md-offset-2">
                                <div v-if="currentReportType === 'offline' ">
                                    <input type="hidden" name="report_type" value="manage_fraud">
                                    <input type="hidden" name="limit"  v-model="currentOfflineLimit">
                                    <input type="hidden" name="page" v-model="currentOfflinePage" >
                                    <input type="hidden" name="name"  :value="offlineReportName" >
                                </div>
                                <input type="hidden" name="druid2" value="1">
                                <div v-if="currentReportType === 'online' ">
                                    <input type="hidden" name="limit" value="50">
                                    <input type="hidden" name="page" :value="currentPage">

                                </div>
                                <div v-if="report_sort.name">
                                    <input type="hidden" :name="'sort[' + report_sort.name + ']'" :value="report_sort.value">
                                </div>
                            </div>
                        </div>
                        <div class="form-actions col-md-offset-2">
                            <button type="submit" class="btn btn-primary" id="onlineReport">Run Report</button>
                            <button type="button" class="btn btn-default pull-right" id="RunReportBtn"   @click.stop.prevent="exportReportOffline" :disabled="export_report_disabled"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
                            <a type="btn" href="fraud_report" class="btn btn-default" id="">Reset</a>
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
                <div class="box-content">
                    <ul id="chartTab" class="nav nav-tabs">
                        <li class="" :class="currentReportType==='online' ? 'active' : ''" @click="currentReportType='online'"><a href="#res_table" data-toggle="tab" aria-expanded="true" ref="res_table">Table</a></li>
                        <li v-if="isAccessExportReport" class="" :class="currentReportType==='offline' ? 'active' : ''" @click.prevent="currentReportType='offline';offlineTableRefresh()"><a href="#offline_table" data-toggle="tab" id="offline_table_href" aria-expanded="false" ref="offline_table">Offline Table</a></li>
                        <li class="report-filter"> 
                            <el-tooltip class="item" effect="dark" content="Customize Columns" placement="top">
                                <i class="fa fa-sun-o mr10" aria-hidden="true" @click.stop="toggleReportFilterVisible($event)"></i>
                            </el-tooltip>
                            <transition name="fade">
                                <ul v-show="reportFilterVisible" class="report-filter-wrap">
                                    <li @click.stop.prevent="toggleResultCellShowStatus('all')">
                                    <span> all </span> <i v-show="allReportTableCellShow" class="fa fa-check" aria-hidden="true"></i>
                                    </li>
                                    <li v-for="item in reportDataKeyList" :key="item" @click.stop.prevent="toggleResultCellShowStatus(item)">
                                    <span> {{ reportTableCellConf[item].label }} </span> <i v-show="reportTableCellConf[item] && reportTableCellConf[item].isShow" class="fa fa-check" aria-hidden="true"></i>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                    </ul>
                    <div id="report_result_block" class="tab-content report_result_block">
                        <div class="tab-pane" :class="currentReportType==='online' ? 'active' : ''" id="res_table">
                            <div id="report_container" class="overflow_scroll fraud-report">
                                <pagination :page="page" :no_limit="true" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page"></pagination>
                                <el-table
                                    :data="reportData"
                                    style="width: 100%"
                                    border
                                    empty-text=' '
                                    :max-height='tableHeight'
                                    @sort-change = "sortChange"
                                    >
                                    <el-table-column
                                    v-for="(item, index ) in reportDataKeyList" v-if="reportTableCellConf[item] && reportTableCellConf[item].isShow"
                                    :key="index"
                                    :prop="item"
                                    :label="reportTableCellConf[item].label"
                                    :fixed="reportTableCellConf[item].fixed"
                                    :resizable="!reportTableCellConf[item].fixed"
                                    :min-width="reportTableCellConf[item].minWidth"
                                    :max-width="reportTableCellConf[item].maxWidth"
                                    :sortable="reportTableCellConf[item].isSort"
                                    >
                                    <template slot-scope="scope">
                                        <div class="cell-wrap">
                                            <span v-if="reportTableCellConf[item].isMark" class="re-tooltip" :style="{background: resultCellBgc(scope.row[item], item, scope.row) }"> &nbsp</span>
                                            <span>
                                                <router-link v-if="item === 'offer_id'" style="color:#3a8bcc"  :to="'p_manage_offer?id=' + scope.row[item]" title="" target="_blank"  > {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="item === 'offer_name'" style="color:#3a8bcc"  :to="'p_manage_offer?id=' + scope.row['offer_id']" target="_blank"  title="" > {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="item === 'aff_name'" style="color:#3a8bcc"  :to="'p_manage_aff?id=' + scope.row['aff_id']" target="_blank"  title=""> {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="item === 'aff_id'" style="color:#3a8bcc"  :to="'p_manage_aff?id=' + scope.row[item]" target="_blank"  title=""> {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="item === 'adv_name'" style="color:#3a8bcc"  :to="'p_manage_adv?id=' + scope.row['adv_id']" target="_blank"  title="" > {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="item=== 'adv_id'" style="color:#3a8bcc"  :to="'p_manage_adv?id=' + scope.row[item]" target="_blank"  title="" > {{ scope.row[item] }} </router-link>
                                                <span v-else>{{ scope.row[item] }}</span>   
                                            </span>
                                        </div>
                                    </template>
                                    </el-table-column>
                                </el-table>
                                <!-- <table class="list-table table table-hover tablesorter" id="report_list">
                                    <thead class="cap" >
                                        <tr id="report-head">
                                            <th v-for="(item,index ) in reportDataKeyList" v-show="reportTableCellConf[item].isShow" :class="item === 'ctit_lt' || item === 'ctit_gt' || item === 'abnormal_ip'|| item === 'conflicting_device_region'|| item === 'conflicting_device_info'|| item === 'rejected_install'|| item === 'out_of_store'|| item === 'sleepy_users' || item === 'incentive_user' || item === 'total_install' || item === 'cr' ? '' : 'no_sort' " @click.stop.prevent="onClickTh(item, $event)" > {{ reNames[item] ? reNames[item] : item | capitalize}}</th>
                                        </tr>

                                    </thead>
                                    <tbody class="report-body" id="report-body">
                                        <tr v-for="(item,index ) in reportData" class="reult-tr">
                                            <td v-for="(_item,_index ) in item"  class="result-cell" v-show="reportTableCellConf[_index].isShow"> 
                                                <router-link style="color:#3a8bcc" :to="'p_manage_aff?id=' + _item" title="" target="_blank" v-if="_index === 'aff_id'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_offer?id=' + _item" title="" target="_blank"  v-else-if="_index === 'offer_id'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_aff?id=' + item[reportDataKeyList.indexOf('aff_id')]" target="_blank"  title="" v-else-if="_index === 'affiliate'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_offer?id=' + item[reportDataKeyList.indexOf('offer_id')]" target="_blank"  title="" v-else-if="_index === 'offer_name'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_adv?id=' + item[reportDataKeyList.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="_index === 'advertiser'"> {{_item}} </router-link>
                                                <router-link style="color:#3a8bcc"  :to="'p_manage_adv?id=' + item[reportDataKeyList.indexOf('advertiser_id')]" target="_blank"  title="" v-else-if="_index=== 'advertiser_id'"> {{_item}} </router-link>
                                                <span v-if="_index != 'offer_id' && _index != 'offer_name' && _index != 'total_install' && _index != 'aff_id' && _index != 'adv_id' && _index != 'am_id' && _index != 'pm_name' && _index != 'am_name' && _index != 'pm_id'" class="re-tooltip" :style="{background: resultCellBgc(_item, _index, item) }"> &nbsp</span><span>{{item[_index]}}</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table> -->
                                <pagination :no_limit="true" :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page"></pagination>
                            </div>
                        </div>
                        <div class="tab-pane"  v-if="isAccessExportReport" :class="currentReportType==='offline' ? 'active' : ''" id="offline_table">
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
          :runOfflineReport="runOffline"
          :dialogName="'modalState'"
        ></offline-report-modal>
    </div>
</template>
<script>
import auth from "@/util/auth";

import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import dateTimePicker_range from "@/components/DateTimePicker_range.vue";
import select2Aff from "@/components/Select2Aff.vue";
import chosen from "@/components/Chosen.vue";
import select2Offer from "@/components/Select2Offer.vue";
//import offlineReportModal from "@/components/OfflineReportModal.vue";
import pagination from "@/components/Pagination.vue";
import AlertPop from "@/components/common/alert-pop/";
import mixin_alert_msg from "@/mixins/alert_msg";
import pagination_report from "@/components/Pagination_report.vue";
import cors_config from '@/util/config'
const OfflineReportModal = () => import(
/* webpackChunkName: "OfflineReportModal" */ '@/components/business/offline-report-modal/'
);

export default {
  data() {
    return {
      limitRange:['yesterday','week','month'],
      loadingZone: "",
      affiliate_id: "",
      pm: "",
      advertiser_id: false,
      am: "",
      am_team: "",
      bd_team: "",
      creative: "",
      creative_id: "",
      interval_date: false,
      offer_id: "",
      export_report_disabled: false,
      currentReportType: "online",
      modalState: "hide",
      offlineReportName: "",
      isAccessExportReport: true,
      offlineTableData: [],
      offlineTableDataName: [],
      offlineTablePage: false,
      offer_id: "",
      by_aff: false,
      by_offer: false,
      msgKpiRef: {
        click_hijacking: 'ctit_lt',
        click_flood: 'ctit_gt',
        cr: 'cr',
        cdr: 'conflicting_device_region',
        abnormal_ip: 'abnormal_ip',
        cdi: 'conflicting_device_info',
        incentive_user: 'incentive_user',
        out_of_store: 'out_of_store',
        rejected_install: 'rejected_install',
      },
      startDate: '',
      endDate: '',
      toggleSubAff: 0,
      currentPage: 1,
      page:false,
      currentOfflineLimit: 20,
      currentOfflinePage: 1,
      dateChecked: true,
      cal_day: true,
      chartData: [],
      reportTableHeadNameList: [],
      reportDataKeyList: [],
      reportTableCellConf: {
          offer_id: {
            fixed: true,
            isShow: true,
            minWidth: '90',
            maxWidth: '90',
            label: 'Offer Id',
          },
          offer_name: {
            fixed: true,
            isShow: false,
            minWidth: '200',
            maxWidth: '300',
            label: 'Offer Name',
          },
          aff_id: {
            fixed: true,
            isShow: true,
            minWidth: '80',
            maxWidth: '80',
            label: 'Pub Id',
          },
          aff_name: {
            fixed: true,
            isShow: false,
            minWidth: '75',
            maxWidth: '100',
            label: 'Pub Name',
          },
          sub_aff_id: {
            fixed: true,
            isShow: true,
            minWidth: '100',
            maxWidth: '100',
            label: 'Sub Pub',
          },
          adv_id: {
            fixed: true,
            isShow: true,
            minWidth: '75',
            maxWidth: '75',
            label: 'Adv Id',
          },
          adv_name: {
            fixed: true,
            isShow: true,
            minWidth: '75',
            maxWidth: '100',
            label: 'Adv Name',
          },
          am_id: {
            fixed: true,
            isShow: false,
            minWidth: '75',
            maxWidth: '75',
            label: 'Am Id',
          },
          am_name: {
            fixed: true,
            isShow: true,
            minWidth: '75',
            maxWidth: '100',
            label: 'Am Name',
          },
          pm_id: {
            fixed: true,
            isShow: false,
            minWidth: '75',
            maxWidth: '75',
            label: 'Pm Id',
          },
          pm_name: {
            fixed: true,
            isShow: true,
            minWidth: '75',
            maxWidth: '100',
            label: 'Pm Name',
          },
          total_install: {
            fixed: false,
            isShow: true,
            minWidth: '140',
            maxWidth: '200',
            isSort: 'custom',
            label: 'Total Install',
          },
          ctit_lt: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '300',
            isSort: 'custom',
            isMark: true,
            label: 'Click Injection(10s)',
          },
          ctit_gt: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '300',
            isSort: 'custom',
            isMark: true,
            label: 'Click Flood(7200s)',
          },
          cr: {
            fixed: false,
            isShow: true,
            minWidth: '100',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'CR',
          },
          high_cr: {
            fixed: false,
            isShow: true,
            minWidth: '100',
            maxWidth: '200',
            isSort: 'custom',
            label: 'High CR(20%)',
          },
          low_cr: {
            fixed: false,
            isShow: true,
            minWidth: '100',
            maxWidth: '200',
            isSort: 'custom',
            label: 'Low CR(0.05%)',
          },
          conflicting_device_info: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'CDI',
          },
          out_of_store: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Out Of Store',
          },
          abnormal_ip: {
            fixed: false,
            isShow: true,
            minWidth: '140',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Abnormal IP',
          },
          conflicting_device_region: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'CDR',
          },
          rejected_rate: {
            fixed: false,
            isShow: true,
            minWidth: '140',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Rejected Rate',
          },
          incentive_user: {
            fixed: false,
            isShow: true,
            minWidth: '160',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Incentive User',
          },
          sleepy_users: {
            fixed: false,
            isShow: true,
            minWidth: '140',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Sleepy Users',
          },
          ip_vpn: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Ip Vpn',
          },
          wrong_language: {
            fixed: false,
            isShow: true,
            minWidth: '180',
            maxWidth: '200',
            isSort: 'custom',
            isMark: true,
            label: 'Wrong Language',
          },
        },
      reportData: [],
      report_sort: { name: "", value: "" },
      reportFilterVisible: false,
      tableResizable: true, // 表格是否可拖动调整宽度
      allReportTableCellShow: false, // 显示全部表格列
      tableHeight: '600',
      runOffline: () => {}
    };
  },
  components: {
    AlertPop,
    dateTimePicker_range,
    select2Aff,
    chosen,
    select2Offer,
    OfflineReportModal,
    pagination
  },
  mixins: [mixin_alert_msg],
  watch: {
    by_aff() {
        this.disAbledWrongLang(this.by_aff)
    },
    advertiser_id() {
        this.disAbledWrongLang(this.advertiser_id)
    },
    by_offer() {
        this.disAbledWrongLang(true)
    }
    // allReportTableCellShow() {
    //     if(this.allReportTableCellShow) {
            
    //     } 
    // }
  },
  computed: {
    ...mapGetters({
      chosens: "chosens",
      userRole: "userRole"
    }),
    userInfo() {
      return this.$store.state.app.userInfo;
    },
    advChosen() {
      return _.find(this.chosens, { name: "adv" });
    },
    amChosen() {
      return _.find(this.chosens, { name: "am" });
    },
    pmChosen() {
      return _.find(this.chosens, { name: "pm" });
    },
    resultCellBgc() {
        return (value, key, map) => {
            value = value.split('(')[0]
            try {

                if(!this.reportTableCellConf[key].isMark) return

                // 非数字形式的值不标色
                if(isNaN(parseFloat(value))) return 

                // rejected_rate是小数形式，颜色计算统一转换为百分比
                // if (key == 'rejected_rate') {
                //     value = `${value * 100}%`
                // }

                let col = this.getRgbColorArr(parseFloat(value), key, map)
                return `rgb(${col[0]},${col[1]},${col[2]})`
            } catch(e) {
                console.error(e)
                return `rgb(238, 233, 233)`
            }
        }
    }
  },

   created() {
    this.getChosen();
    this.initResuleTableConf()
    this.setTableHeight()
  },
  mounted() {
    this.initGeoChkBox()
    this.getUrlQuery()
  },

  methods: {
    ...mapActions(["getChosen"]),
    setTableHeight() {
        this.tableHeight = document.body.offsetHeight - 128
        window.onresize = () => {
            this.tableHeight = document.body.offsetHeight - 128
        }
    },

    initGeoChkBox() {
        $('#geo_chk_box input[type=checkbox]').on('change',function(event){
           $('#geo_chk_box input[type=checkbox]').not(event.target).prop("checked",false)
        })

        $('#event_data_box input[type=checkbox]').on('change',function(e){
            if ($('#event_data_box input[type=checkbox]:checked').length > 0){
                $(".isShow").addClass('hide')
                $('#geo_chk_box input[type=checkbox]').prop("checked",false)
            }
            else {
                $(".isShow").removeClass('hide')
            }
        })
    },

    getUrlQuery() {
        let { offer_id, offer_name, kpiDmnsn, startDate, endDate } = this.$route.query

        if(offer_id && kpiDmnsn) {
            this.offer_id = offer_id
            this.by_offer = true
            this.by_aff = true
            $('input[name="checkbox_by_offer"]').prop("checked",true);
            $('input[name="checkbox_by_aff"]').prop("checked",true);

            $(`input[name='fraud[${kpiDmnsn}]']`).prop("checked",true);

            this.startDate = startDate
            this.endDate = endDate

            this.submitForm()
        }
    },
    disAbledWrongLang(status) {
        if(status && !this.by_offer) {
            $("input[name='fraud[wrong_language]']").prop('checked', false)
        }
    },
    offerSelect2CallBack(val) {
      this.offer_id = val;
    },
    decideOfflineNew() {
      return !!$("#advanced_options_content input[type='checkbox']:checked")
        .length;
    },
    getOfflineReport() {
      this.modalState = "show";
      this.runOffline = this.runOfflineReport
    },
    hideModal() {
      this.modalState = "hide";
    },
    initResuleTableConf() {
        this.reportTableHeadNameList = []
        this.reportDataKeyList = []
        this.reportData = []
        this.reportFilterVisible = false
        this.allReportTableCellShow = false
    },
    runOfflineReport(name) {
      let that = this;
      this.hideModal();
      this.offlineReportName = name;
      if (!this.decideOfflineNew()) {
        this.offline_query = "basic";
      } else {
        this.offline_query = "";
      }

      this.$nextTick(function() {
        let param = $(that.$refs.form_report).getFormQuery();
        this.showAlert("Please wait to prepare your offline report.", "info");
        Vue.http.post("Report/jobOfflineReport", param).then(
          response => {
            if (!response.body.data) {
              this.showAlert(response.body.msg, "info");
              return;
            }
            let someData = response.body;
            that.offlineTableRefresh();
          },
          response => {
            this.showAlert(response.body.msg);
            that.offlineTableRefresh();
          }
        );
      });
    },
    dateChange(startdate, enddate) {
      this.cal_day = false;
      let moment_a = moment(startdate);
      let moment_b = moment(enddate);
      if (moment_b.diff(moment_a, "months", true) > 1) {
        this.dateChecked = false;
      } else {
        this.dateChecked = true;
      }
    },
    submitForm($event, isOffline, isSort) {
      let param = $(this.$refs.form_report).getFormQuery();
      // if (param['ocpa'] && !param['filters[offer_id]']){
      //     this.showAlert("The offerId is needed!",'info')
      //     return
      // }
      console.log($(this.$refs.form_report).getFormQuery())

      if (!param["checkbox_by_aff"] && !param["checkbox_by_offer"]) {
        this.showAlert("The offerId or affilateId is needed!", "info");
        return;
      }
      if (!this.dateChecked) {
        this.showAlert(
          "Please select a time range of not more than one month",
          "info"
        );
        return;
      }
      if (this.decideOfflineNew() || isOffline) {
        this.export_report_disabled = false;
        this.currentReportType = "offline";
        this.getOfflineReport();
        this.$ga && this.$ga.event('report', 'fraudreport', 'exportreport')
      } else {
        this.currentPage = 1;
        this.chartData = [];
        this.page = false;
        this.reportTableHeadNameList = [];
        this.reportDataKeyList = []
        this.reportData = [];
        if (!isSort) this.report_sort = { name: "", value: " " };
        this.currentReportType = "online";

        this.$nextTick(function() {
          this.getOnlineReport();
        });
        this.$ga && this.$ga.event('report', 'fraudreport', 'runreport')
      }
    },
    onClickTh(name, $event) {
    //   console.log(name, $event)
    //   if ($($event.target).hasClass("no_sort")) return;
      if (this.report_sort.name === name) {
        this.report_sort.value = this.report_sort.value === -1 ? 1 : -1;
      } else {
        this.report_sort.value = -1;
        this.report_sort.name = name;
      }
      console.log(this.report_sort);
      this.submitForm("", "", true);
    },
    renderReport(data) {
      let nameArr = data.data[0];
      let _data  = data.data.slice(1,data.data.length+1);
      let dataArr = _data;
    //   let dataArr = [];
      
    //       for (let i=0;i<_data.length;i++){
    //           var oldObj = _data[i];
    //           var newObj = {};
    //           for (let j=0;j < nameArr.length;j++){
    //               newObj[nameArr[j]] = oldObj[nameArr[j]]
    //           }
    //           dataArr.push(newObj)
    //       }
      
      if (dataArr.length === 0) return this.showAlert("no result.", "info");

      this.reportTableHeadNameList = nameArr;
      this.reportDataKeyList = Object.keys(data.data[1])
      this.reportData = dataArr;
    //    data.page = {
    //        "has_next":true,
    //        "has_previous":false,
    //        "page_num":3,
    //        "page":1,
    //        "page_range":["1","2","3"]
    //    }
          
      this.page = data.page
      
      $.scrollToDom($("#report_result_block"));
    },

    export_report: function() {
        let param = $(this.$refs.form_report).getFormQuery();
        this.am && (param['filters[advertiser_manager_id][]'] = '')
        this.pm && (param['filters[affiliate_manager_id][]']= '')

        let query = $(this.$refs.form_report).serialize();
        if (!param["checkbox_by_aff"] && !param["checkbox_by_offer"]) {
          this.showAlert("The offerId or affilateId is needed!", "info");
          return;
        }
        if (this.decideOfflineNew()) {
          this.export_report_disabled = false;
          this.currentReportType = "offline";
          this.getOfflineReport();
          return
        }
        if (Object.keys(param).join(',').indexOf("fraud") == -1) {
          this.showAlert("Please choose one or more fraud data.", "error");
          return;
        }
        window.open(cors_config.api_protocal + "//" + cors_config.api_host + "/"　+ cors_config.app_name +  "/Report/FraudReportExport?" + query + "&export=1", "_blank");
    },

    runFraudReport(name) {
        let that = this;
        let param = $(that.$refs.form_report).getFormQuery();
        param.name = name

        this.am && (param['filters[advertiser_manager_id][]'] = '')
        this.pm && (param['filters[affiliate_manager_id][]']= '')
   
        this.hideModal()

        this.$nextTick(function() {
            Vue.http.post("Report/FraudReportExport", param).then(
            response => {
                if (!response.body.data) {
                this.showAlert(response.body.msg, "info");
                return;
                }
                let someData = response.body;
                that.offlineTableRefresh();
            },
            response => {
                this.showAlert(response.body.msg);
                that.offlineTableRefresh();
            }
            );
        });
    },

    exportReportOffline(){
        let that = this;
        let param = $(that.$refs.form_report).getFormQuery();
        if (Object.keys(param).join(',').indexOf("fraud") == -1) {
          this.showAlert("Please choose one or more fraud data.", "error");
          return;
        }
        this.export_report_disabled = false;
        this.currentReportType = "offline";
        
        this.modalState = true
        this.runOffline = this.runFraudReport
    },
    getOnlineReport() {
      console.log("getOnlineReport");
      let param = $(this.$refs.form_report).getFormQuery();

      // add by lyon.yang rejected_rate字段后端要求请求参数为rejected_install， 返回字段为rejected_rate，在这里做一下适配
      if (param.hasOwnProperty("sort[rejected_rate]")) {
        param['sort[rejected_install]'] = param['sort[rejected_rate]']
        delete param['sort[rejected_rate]']
      }
      
      this.am && (param['filters[advertiser_manager_id][]'] = '')
      this.pm && (param['filters[affiliate_manager_id][]']= '')
      
      this.loadingZone = true;
      Vue.http.post("Report/fraudReport", param).then(
        response => {
          this.loadingZone = "";

          // get body data
          if (!response.body.data) {
            this.showAlert(response.body.msg, "info");
            return;
          }

          let somedata = response.body;
        //   this.initResuleTableConf()
          this.renderReport(somedata.data);
        },
        response => {
          this.loadingZone = "";
          // error callback
          this.showAlert(response.body.msg);

          // error callback
        }
      );
    },

    onChangePage(page,index,pageRange) {
        //解决省略号传值错误问题
        let curPage = index+1;

         if (page === '&hellip;'){
             
             this.currentPage = parseInt(pageRange[index-1]) + 1
         }else {
             this.currentPage = page;
         }
        this.$nextTick(() => {
            this.getOnlineReport()
        })
    },
    offlineTableRefresh(page, limit) {
      this.loadingZone = true;

      Vue.http
        .get(
          "Report/getJobOfflineReportList?type=manage_fraud&limit=" +
            (limit || this.currentOfflineLimit) +
            "&page=" +
            (page || this.currentOfflinePage)
        )
        .then(
          response => {
            this.loadingZone = "";
            // get body data
            if (!response.body.data) {
              this.showAlert(response.body.msg);

              return;
            }
            this.renderOfflineTable(response.body.data);
          },
          response => {
            this.loadingZone = "";
            // error callback
            this.showAlert(response.body.msg);
          }
        );
    },
    cancelOffline(report_id, index) {
      Vue.http.get("Report/cancelJobOfflineReport?id=" + report_id).then(
        response => {
          if (!response.body.data) {
            this.showAlert(response.body.msg, "info");

            return;
          }
          this.offlineTableData[index].splice(2, 1, "cancelled");
        },
        response => {
          // error callback
          this.showAlert(response.body.msg);
        }
      );
    },
    renderOfflineTable(data) {
      let that = this;
      let _data = _.cloneDeep(data);
      this.offlineTableDataName = _data.data.shift();
      this.offlineTableData = _data.data;
      this.offlineTablePage = data.page;

      let is_refresh = false;
      $.each(_data.data, function(i, v) {
        if (
          v[2] === "preparing" ||
          v[2] === "queueing" ||
          v[2] === "resolving"
        ) {
          is_refresh = true;
        }
      });
      if (is_refresh) {
        clearTimeout(window.timeout_offline);
        window.timeout_offline = setTimeout(function() {
          that.offlineTableRefresh();
        }, 10000);
      }
    },
    onChangeOfflinePage(page) {
      this.currentOfflinePage = page;
      this.offlineTableRefresh(page);
    },
    onChangeOfflineLimit(limit) {
      this.currentOfflineLimit = limit;
      this.currentOfflinePage = 1;
      this.offlineTableRefresh(1, limit);
    },
    getReportExportAccess() {
      Vue.http.get("Report/getExportReportAccess").then(
        response => {
          if (!response.body.data) {
            that.showAlert(response.body.msg, "info");
            return;
          }
          this.isAccessExportReport = response.body.data.is_access;
        },
        response => {
          this.showAlert(response.body.msg);
        }
      );
    },
    uniqueCheck(event) {
      let elem = event.target;
      let targetName = $(elem).attr("name");

      $("#fraud_data_box input[type=checkbox]:checked").prop("checked", false);
      this.ctit_lt = false;
      this.ctit_gt = false;
      if (targetName === "ctit[lt]") this.ctit_lt = true;
      if (targetName === "ctit[gt]") this.ctit_gt = true;
      $(elem).prop("checked", true);
    },

    /**
     * @returns like [255, 13, 13]
     */
    getRgbColorArr(value, key, map) {
        const colors = {
            red: [255, 1, 1],
            green: [1, 255, 1],
            white: [238, 233, 233]
        }
        switch(key) {
            case 'ctit_gt':
            case 'ctit_lt':{
                return this.getColorByInterval(20, colors.red, 5, colors.green, value)
            }
            break;
            case 'abnormal_ip': {
                return this.getColorByInterval(20, colors.red, 5, colors.white, value)
            }
            break;
            case 'conflicting_device_region': {
                return this.getColorByInterval(50, colors.red, 15, colors.white, value)
            }
            break;
            case 'sleepy_users': {
                return this.getColorByInterval(70, colors.red, 30, colors.green, value)
            }
            break;
            case 'out_of_store': {
                return this.getColorByInterval(30, colors.red, 5, colors.white, value)
            }
            break;
            case 'conflicting_device_info': {
                return this.getColorByInterval(30, colors.red, 5, colors.white, value)
            }
            break;
            case 'incentive_user': {
                return this.getColorByInterval(80, colors.red, 50, colors.white, value)
            }
            break;
            case 'cr': {
                if(value > 10) {
                    return this.getColorByInterval(25, colors.red, 10, colors.white, value)
                } else {
                   
                    // cr到精度会到0.05 
                    return this.getColorByInterval(1 * 100, colors.white, 0.05 * 100, colors.red, value * 100)
                }
            }
            break;
            case 'rejected_rate': {
                return this.getColorByInterval(60, colors.red, 0, colors.white, value)
            }
            break;
            case 'ip_vpn': {
                return this.getColorByInterval(40, colors.red, 0, colors.white, value)
            }
            break;
            case 'wrong_language': {
                return this.getColorByInterval(40, colors.red, 0, colors.white, value)
            }
            break;
            default: return colors.white
        }
    },

    /**
     * @returns
     */
    getColorByInterval(more, moreColor, less, lessColor, value) {
        if(value >= more) {
            return moreColor
        }

        if(value <= less) {
            return lessColor
        }

        value = parseInt(value)
        let white = [238, 233, 233]
        let step = parseInt((more - less)/2)
        
        if( value < (less + step)) {
            return this.gradientColor(lessColor, white, step, value - less, value)
        } else {
            return this.gradientColor(white, moreColor, step, value - step - less)
        }
    },
    gradientColor(startColor,endColor,step, index, value){
        var startR = startColor[0],
            startG = startColor[1],
            startB = startColor[2]

        var endR = endColor[0],
            endG = endColor[1],
            endB = endColor[2]

        var sR = (endR-startR)/step;//总差值
        var sG = (endG-startG)/step;
        var sB = (endB-startB)/step;
        return [parseInt((sR*index+startR)), parseInt((sG*index+startG)), parseInt((sB*index+startB))]
    },

    toggleReportFilterVisible (e) {
        if( !this.reportDataKeyList || this.reportDataKeyList.length < 1)  return 
        this.reportFilterVisible = this.reportFilterVisible == true 
                                 ? this.closeReportFilter()
                                 : true
    },

    addScrollForReportHead() {
        // document.getElementById('report-head').scrollTop = 0
       
        // if (this.reportTableHeadNameList.length < 1) {
        //     document.getElementById('report-head').removeEventListener('scroll', scrollEvent)
        // }
        // else {
            // window.addEventListener('scroll', scrollEvent)
        // }
    },

    toggleResultCellShowStatus(key) {
        if (key !== 'all') {
            let allStatus = true
            this.reportTableCellConf[key].isShow = !this.reportTableCellConf[key].isShow
            this.reportDataKeyList.some((index) => {
                allStatus = this.reportTableCellConf[index].isShow
                if (allStatus == false) return true
            })
            this.allReportTableCellShow = allStatus
        } else {
            this.allReportTableCellShow = !this.allReportTableCellShow
            Object.keys(this.reportTableCellConf).forEach((index) => {
                this.reportTableCellConf[index].isShow = this.allReportTableCellShow
            })
        }
    },

    closeReportFilter() {
        this.reportFilterVisible = false
    },

    sortChange(data) {
        this.onClickTh(data.prop)
    }
  },
 
};
</script>
<style lang="less" scoped>
.result-cell{
    position: relative;
    border-left: 1px solid #d4d4d4;
    background: transparent!important;
    
}  
.reult-tr:hover{
    background: #eee!important;
}
.form-group{
    margin-bottom: 0;
}
.report-filter{
    float: right;
}
.report-filter{
    position: relative;
    .fa-sun-o{
        cursor: pointer;
        font-size: 22px;
    }
    ul{
        position: absolute;
        top: 100%;
        right: 0;
        width: 250px;
        height: 220px;
        overflow-y: scroll;
        overflow-x: hidden;
        z-index: 30;
        transform-origin: center top 0px;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-sizing: border-box;
        margin: 5px 0;
        padding: 6px 0;
        li{
            font-size: 14px;
            padding: 0 20px;
            height: 34px;
            line-height: 34px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #606266;
            cursor: pointer;
            &:hover{
                background-color: #f5f7fa;
            }
            .fa-check{
                float: right;
                cursor: pointer;
                font-size: 15px;
                line-height: 34px;
            }
        }
    }
}
.box{
    position: relative;
    // z-index: 1;
}
#report-head{
    
    top: 0;
    z-index: 10;
    background: #fff;
}
.report-head-fixed{
    position: fixed;
}
.report-body{
    position: relative;
    z-index: 1;
}
.re-tooltip{
    display: inline-block;
    height: 14px;
    width: 14px;
    margin-right: 5px;
    border-radius: 50%;
}
.publisher-by_pub{
    display: inline-block;
    margin-right: 20px;
}
.publisher-by_sub{
    display: inline-block;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.cell-wrap{
    display: flex;
    align-items: center;
}
</style>
<style>
.fraud-report .el-table td, .fraud-report .el-table th{
    padding: 5px 0!important;
}
</style>
