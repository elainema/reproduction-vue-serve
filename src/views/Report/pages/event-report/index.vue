<template>
    <div @click="closeReportFilter()">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="/">Home</router-link></li>
                <li class="active">Event Report</li>
            </ul>
        </div>
        <div class="box" ref="box_form">
            <div class="box-header" v-box-action-resize>
                <h2>Event Report</h2>
                <div class="box-action">
                    <span class="icon-chevron-up" title="Fold"></span>
                    <span class="icon-chevron-down hide" title="Unfold"></span>
                </div>
            </div>
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <form class="form-horizontal frm-entity frm-detail form-report" id="qf_offer" ref="form_report" @submit.stop.prevent="submitForm">
                    <div class="box-container">
                        <div class="form-group async-search-wraper">
                            <label class="control-label col-md-2" for="">Package Name</label>
                                <div class="package-name-wraper">
                                    <el-autocomplete
                                        :value='pkgName'
                                        popper-class="my-autocomplete"
                                        :fetch-suggestions="queryPkgNameSearchAsync"
                                        placeholder=""
                                        @select="handleAdvIdSelect"
                                        size='medium'
                                        clearable
                                        >
                                        <template slot-scope="{ item }">
                                            <div class="name">{{ item.value }} - {{pkgName}}</div>
                                        </template>
                                    </el-autocomplete>
                                </div>
                                <i class="el-icon-error" v-show="!hasAdvId"></i>
                        </div>
                        <div v-yeah-loading="isFetchedAppevent" style="min-height: 50px">
                            <div v-if="hasUserSession || hasUserEvent">
                                <div>
                                    <div class="box-sub-header"  v-box-action-resize>
                                        <h3>Basic Options</h3>
                                        <div class="box-action">
                                            <span class="icon-chevron-up" title="Fold"></span>
                                            <span class="icon-chevron-down hide" title="Unfold"></span>
                                        </div>
                                    </div>
                                    <div class="box-content">
                                        <div class="form-group">
                                            <label class="control-label col-md-2" for=""></label>
                                            <ul class="col-md-10" id="stat_chk_box">
                                                <li v-show="hasUserSession" class="label label-orange label-filter clickLabel " style="padding:5px 25px;margin-left:0" id="aff-summary-report" :class="kpiModule ==='userSession' ? 'clickLabel_click' : ''" @click="kpiModule='userSession'">User Session</li>
                                                <li v-show="hasUserEvent" class="label label-orange label-filter clickLabel" style="padding:5px 25px;" :class="kpiModule ==='userEvent' ? 'clickLabel_click' : ''" id="aff-hourly-report" @click="kpiModule='userEvent'">User Event</li>
                                            </ul>
                                        </div>
                                        <div class="form-group">
                                            <label class="control-label col-md-2" for="">Group By</label>
                                            <ul class="col-md-10" id="stat_chk_box">
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="by_offer" value="active"> Offer
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="by_aff" value="active"> Affiliate
                                                </label>
                                                <label class="checkbox-inline" v-show="by_aff">
                                                    <input type="checkbox" v-model="by_sub_aff" value="active"> Sub Aff
                                                </label>
                                            </ul>
                                        </div>
                                        <div class="form-group" v-show="kpiModule ==='userSession'">
                                            <label class="control-label col-md-2" for="">Session</label>
                                            <ul class="col-md-10" id="stat_chk_box">
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="isByRetenUser" value="active"> Retention User
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="isByRetenRate" value="active"> Retention Rate
                                                </label>
                                                <!-- <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="isByRoi" value="active"> ROI
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" v-model="isByRoas" value="active"> ROAS
                                                </label> -->
                                            </ul>
                                        </div>
                                        <div class="form-group" v-show="kpiModule ==='userEvent'">
                                            <label class="control-label col-md-2" for="">Event</label>
                                            <ul class="col-md-10" id="stat_chk_box">
                                                <li v-for="event in userEventList" :key="event.key" style='display:inline-block'>
                                                    <label class="checkbox-inline">
                                                        <input type="checkbox" v-model="event.value" value="active"> {{ event.label }}
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="box-sub-header"  v-box-action-resize>
                                            <h3>Filters</h3>
                                            <div class="box-action">
                                                <span class="icon-chevron-up" title="Fold"></span>
                                                <span class="icon-chevron-down hide" title="Unfold"></span>
                                            </div>
                                        </div>
                                        <div class="box-content">
                                            <div class="col-md-10 col-md-offset-2 clearfix" id="chosen_datas">
                                                <div class=" chosen-filter  nopadding col-xs-12" id="offerBlock" style="margin:0" v-if="by_offer">
                                                    <p> Offer </p>
                                                    <select2Offer 
                                                        ref="offerChose" 
                                                        style="300px;min-height:auto" 
                                                        :select2_mode='"simple"' 
                                                        :select2_class="'nopadding form-control'" 
                                                        :select2CallBack="offerSelect2CallBack" 
                                                        :singleVal='offer_id'>
                                                    </select2Offer>
                                                </div>
                                                <div class="chosen-filter  nopadding col-xs-12 filterAM" id="affBlock" style="margin:0" v-if="by_aff">
                                                    <p> Publisher </p>
                                                    <select2Aff 
                                                        style="width:100%;min-height:auto" 
                                                        :select2_mode='"simple"' 
                                                        :select2_class="'nopadding'"  
                                                        :aff_name='"filters[aff_id]"'  
                                                        placeholder="Search for a Publisher">
                                                    </select2Aff>
                                                </div>
                                            </div>
                                            <div class="form-group mb10 clearfix" id="dateRange">
                                                <label for="inputPassword3" class="col-md-2 control-label">Install Time</label>
                                                <div class="col-lg-10 col-md-10 col-sm-10 row">
                                                    <div class="a1">
                                                        <div class="col-lg-12 col-md-12 col-sm-12 row">
                                                            <div class="col-md-10 row-sm">
                                                                <dateTimePicker_range 
                                                                    :no_hour="true" 
                                                                    :from_date="'week'" 
                                                                    :classList="'col-md-12'"
                                                                    :detaultStartDate='startDate' 
                                                                    :defaultEndDate='endDate'>
                                                                </dateTimePicker_range>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group" v-show="kpiModule ==='userEvent'">
                                                <label class="control-label col-md-2" for="">Event Range</label>
                                                <ul class="col-md-10" id="stat_chk_box">
                                                    <li >
                                                        <label class="checkbox-inline" v-for="range in eventRangeList" :key="range.value" style="display:inline-block">
                                                            <input type="radio" v-model="eventRange" :value="range.value" @change="handleEventRangeChange()"> {{ range.label }}
                                                        </label>
                                                        <label class="checkbox-inline input-customer-range" v-if="eventRange == 'customer'">
                                                            <input type="number" step='1' v-model="customEventRange"> Days
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="box-content box-content-filter">
                                        <div class="form-actions col-md-offset-2">
                                            <button type="submit" class="btn btn-primary" id="onlineReport" :disabled='isFetchOcpaReport'>Run Report</button>
                                            <button type="button" class="btn btn-default pull-right" id="RunReportBtn"   @click.stop.prevent="fetchOfflineReport"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
                                            <a type="btn" href="event-report" class="btn btn-default" id="">Reset</a>
                                        </div>
                                    </div>
                                </div>
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
                <div class="box-content">
                    <ul id="chartTab" class="nav nav-tabs">
                        <li class="" :class="currentReportType==='online' ? 'active' : ''" @click="currentReportType='online'"><a href="#res_table" data-toggle="tab" aria-expanded="true" ref="res_table">Table</a></li>
                        <!-- <li v-if="isAccessExportReport" class="" :class="currentReportType==='offline' ? 'active' : ''" @click.prevent="currentReportType='offline';offlineTableRefresh()"><a href="#offline_table" data-toggle="tab" id="offline_table_href" aria-expanded="false" ref="offline_table">Offline Table</a></li> -->
                        <li class="report-filter" v-if="listData.length > 0"> 
                             <el-tooltip class="item ocpa-report-table-filter" effect="dark" content="Customize Columns" placement="top">
                                <i class="fa fa-sun-o mr10" aria-hidden="true" @click.stop="toggleReportFilterVisible($event)"></i>
                            </el-tooltip>
                            <transition name="fade">
                                <ul v-show="reportFilterVisible" class="report-filter-wrap">
                                    <li @click.stop.prevent="toggleResultCellShowStatus('all')">
                                        <span> All </span> <i v-show="allReportTableCellShow" class="fa fa-check" aria-hidden="true"></i>
                                    </li>
                                    <li v-for="(item, index ) in titlesOrderList" :key="index" v-if="titles[item]" @click.stop.prevent="toggleResultCellShowStatus(item)">
                                        <span> {{ titles[item].label }} </span> <i v-show="titles[item].isShow == true" class="fa fa-check" aria-hidden="true"></i>
                                    </li>
                                    <li v-for="(item, index ) in titles" :key="index" v-if="titlesOrderList.indexOf(index) == -1" @click.stop.prevent="toggleResultCellShowStatus(index)">
                                    <span> {{ item.label }} </span> <i v-show="item.isShow == true" class="fa fa-check" aria-hidden="true"></i>
                                    </li>
                                </ul>
                            </transition>
                        </li>
                    </ul>
                    <div id="report_result_block" class="tab-content report_result_block">
                        <div class="tab-pane" :class="currentReportType==='online' ? 'active' : ''" id="res_table">
                            <div id="report_container" class="overflow_scroll event-report" v-yeah-loading='isFetchOcpaReport'>
                                <pagination :page="page" :no_limit="true" :onChangePage="onChangePage" :currentPage="currentPage" v-if="page"></pagination>
                                <el-table
                                    v-if="listData.length > 0"
                                    :data="listData"
                                    border
                                    style="width: 100%"
                                    min-height='300'
                                    :max-height='tableHeight'
                                    empty-text='no result'
                                    >
                                    <!-- titlesOrderList -->
                                    <el-table-column
                                        v-for="(item, index ) in titlesOrderList"
                                        v-if="titles[item] && titles[item].isShow"
                                        :key="index"
                                        :label="titles[item].label"
                                        :fixed="titles[item].fixed"
                                        :show-overflow-tooltip="titles[item].isShowToolTip"
                                        :min-width='titles[item].minWidth || 150'
                                        >
                                        <template slot-scope="scope"> 
                                            <span>
                                                <router-link v-if="titles[item] === 'offer_id'" style="color:#3a8bcc"  :to="'p_manage_offer?id=' + scope.row[titles[item].prop]" title="" target="_blank"  > {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="titles[item] === 'offer_name'" style="color:#3a8bcc"  :to="'p_manage_offer?id=' + scope.row[titles['offer_id'].prop]" target="_blank"  title="" > {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="titles[item] === 'aff_name'" style="color:#3a8bcc"  :to="'p_manage_aff?id=' + scope.row[titles['aff_id'].prop]" target="_blank"  title=""> {{ scope.row[item] }} </router-link>
                                                <router-link v-else-if="titles[item] === 'aff_id'" style="color:#3a8bcc"  :to="'p_manage_aff?id=' + scope.row[titles[item].prop]" target="_blank"  title=""> {{ scope.row[item] }} </router-link>
                                                <span v-else class="cell-common" > {{ scope.row[titles[item].prop] | setEmpty2NA }} </span>
                                            </span>
                                        </template>
                                    </el-table-column>
                                    
                                    <el-table-column
                                        v-for="(item, index ) in titles"
                                        v-if="titlesOrderList.indexOf(index) == -1 && item.isShow"
                                        :key="index"
                                        :label="item.label"
                                        :fixed="item.fixed"
                                        :show-overflow-tooltip="item.isShowToolTip"
                                        :min-width='item.minWidth || 150'
                                        >
                                        <template slot-scope="scope"> 
                                            <span class="cell-common"> {{ scope.row[item.prop] | setEmpty2NA }} </span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <div v-else style="margin-top: 30px"> no result. </div>
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
    </div>
</template>
<script>
import auth from "@/util/auth";

import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import dateTimePicker_range from "@/components/DateTimePicker_range.vue";
import select2Aff from "@/components/Select2Aff.vue";
import chosen from "@/components/Chosen.vue";
import Select2OfferAndPack from "@/components/Select2OfferAndPack.vue";
import select2Offer from '@/components/Select2Offer.vue';
import pagination from "@/components/Pagination.vue";
import AlertPop from "@/components/common/alert-pop/";
import mixin_alert_msg from "@/mixins/alert_msg";
import pagination_report from "@/components/Pagination_report.vue";
import cors_config from '@/util/config'
import { eventRangeList, titlesOrderList, titlesConf} from './ref.js'
import UrlUtil from '@/util/urlUtil'
export default {
  data() {
    return {
      limitRange:['yesterday','week','month'],
      advId: '',
      pkgName: '',
      offer_id: '',
      isFetchedAppevent: false,
      hasAdvId: true,
      userEventList: [],
      eventRangeList: [
        {
            value: 7,
            label: '7 Days'
        },
        {
            value: 30,
            label: '30 Days'
        },
        // {
        //     value: 3,
        //     label: '3 Days'
        // },
        
        // {
        //     value: 15,
        //     label: '15 Days'
        // },
        // {
        //     value: 'customer',
        //     label: 'Customize Range'
        // },
      ],
      eventRange: 30,
      customEventRange: 1,
      hasUserSession: false,
      hasUserEvent: false,
      kpiModule: 'userSession',
      kpiDmnsn: '',
      currentReportType: "online",
      modalState: "hide",
      eventModalState: "hide",
      offlineReportName: "",
      isAccessExportReport: true,
      offlineTableData: [],
      offlineTableDataName: [],
      offlineTablePage: false,
      by_aff: false,
      by_sub_aff: false,
      isByRetenUser: false,
      isByRetenRate: false,
      isByRoi: false,
      isByRoas: false,
      by_offer: false,
      startDate: '',
      endDate: '',
      currentPage: 1,
      page:false,
      currentOfflineLimit: 20,
      currentOfflinePage: 1,
      dateChecked: true,
      cal_day: true,
      chartData: [],
      isFetchOcpaReport: false,
      listData:[],
      reportDataKeyList: [],
      titles: {},
      // 非数据列显示顺序
      titlesOrderList: [
        'offer_id', 'offer_name', 'aff_id', 'aff_name', 'aff_sub', 'bd_name', 'am_name', 'install'
      ],
      titlesConf: {
          offer_id: {
            prop: 'offer_id',
            fixed: true,
            isShow: true,
            minWidth: '90',
            maxWidth: '90',
            label: 'Offer Id',
          },
          offer_name: {
            prop: 'offer_name',
            fixed: true,
            isShow: false,
            minWidth: '200',
            maxWidth: '300',
            label: 'Offer Name',
          },
          bd_name: {
            prop: 'bd_name',
            fixed: true,
            isShow: false,
            minWidth: '100',
            maxWidth: '150',
            label: 'Am Name',
          },
          aff_id: {
            prop: 'aff_id',
            fixed: true,
            isShow: true,
            minWidth: '80',
            maxWidth: '80',
            label: 'Pub Id',
          },
          aff_name: {
            prop: 'aff_name',
            fixed: true,
            isShow: false,
            minWidth: '130',
            maxWidth: '180',
            label: 'Pub Name',
          },
          aff_sub: {
            prop: 'aff_sub',
            fixed: true,
            isShow: true,
            minWidth: '100',
            maxWidth: '100',
            label: 'Sub Aff',
          },
          adv_id: {
            prop: 'adv_id',
            fixed: false,
            isShow: false,
            minWidth: '75',
            maxWidth: '75',
            label: 'Adv Id',
          },
          adv_name: {
            fixed: false,
            isShow: false,
            minWidth: '75',
            maxWidth: '100',
            label: 'Adv Name',
          },
          am_name: {
            prop: 'am_name',
            fixed: true,
            isShow: false,
            minWidth: '100',
            maxWidth: '140',
            label: 'Pm Name',
          },
          install: {
            prop: 'install',
            fixed: true,
            isShow: true,
            minWidth: '140',
            maxWidth: '200',
            isSort: 'custom',
            label: 'Install',
          }
        },
      reportData: [],
      report_sort: { name: "", value: "" },
      reportFilterVisible: false,
      tableResizable: true, // 表格是否可拖动调整宽度
      allReportTableCellShow: false, // 显示全部表格列
      tableHeight: '600',
    };
  },
  components: {
    AlertPop,
    dateTimePicker_range,
    select2Aff,
    chosen,
    Select2OfferAndPack,
    select2Offer,
    pagination,
  },
  mixins: [mixin_alert_msg],
  watch: {
    listData() {
       if(this.listData && this.listData.length > 0) {
            this.titles = this.mergeTitlesConf(Object.keys(this.listData[0]),  this.titlesConf)
       }
    },
    pkgName() {
      this.clearForm() 
    },

    advId() {
      this.clearForm() 
    }
  },
   filters: {
    translateDateStrToDate(str) {
        try {
            if (str.match(/-/g)) return str
            var date = str.substr(0, 4) + "-" + str.substr(4, 2) + "-" + (parseInt(str.substr(6, 2)) < 10 && str.substr(6, 2).length === 1 ? "0" + str.substr(6, 2) : str.substr(6, 2))
        } catch (e) {
            var date = str
        }
        return date
    },

    setEmpty2NA(str) {
        return str !== "" ?  str : "N/A"
    }
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
    postDays() {
        return this.eventRange == 'customer'
            ? this.customEventRange
            : this.eventRange
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
        let { offer_id, offer_name, kpiDmnsn, pkg_name, adv_id, startDate, endDate } = this.$route.query
        if(!pkg_name || !adv_id) {
            return 
        }

        if(offer_id) {
            this.by_offer = true
            this.offer_id = offer_id
        }
        this.pkgName = pkg_name
        this.advId = adv_id
        this.kpiDmnsn = kpiDmnsn

        this.startDate = startDate
        this.endDate = endDate

        this.autoStart()
    },

    async autoStart() {
        this.by_aff = true

        await this.handleAdvIdSelect()

        if(this.kpiDmnsn.match(/retention/)) {
            this.kpiModule = 'userSession'
            this.isByRetenUser = true
            this.isByRetenRate = true
        } else {
            this.kpiModule = 'userEvent'
            for(let i =0; i < this.userEventList.length; i++) {
                let reg = new RegExp(this.userEventList[i].key)
                if(reg.test(this.kpiDmnsn)) {
                    this.userEventList[i].value = true
                } 
            }
        }
        
        this.submitForm()
    },

    mergeTitlesConf(headsMap, defaultConf) {
        var result = {}
        headsMap.map(key => {
            if(defaultConf[key]) {
                result[key] = defaultConf[key]
            } else {
                // 可变事件类型
                result[key] = {
                    prop: key,
                    fixed: false,
                    isShow: true,
                    minWidth: 170,
                    maxWidth: 220,
                    label: key.replace(/\_/g, ' ').replace(/\b[a-z]/g, char => char.toUpperCase())
                }
            }
       })
        return result
    },
    queryPkgNameSearchAsync(pkg_name, cb) {
        this.pkgName = pkg_name

        if(!pkg_name) {
            this.hasAdvId = true
            return cb([])
        }
        Vue.http.get("Advertiser/getAdvertiserAppSetting", {params:{ pkg_name }}).then(
            response => {
                let data = response.body.data.map(value => {
                    return { value }
                })
                cb(data)
                if(data.length < 1) {
                    this.hasAdvId = false
                } else {
                    this.hasAdvId = true
                }
            },
            err => {
                cb([])
                this.hasAdvId = false
            }
        );
    },

    handleAdvIdSelect(advId) {
        if(advId) {
            this.advId = advId.value
        }
       
        this.isFetchedAppevent = true
        return new Promise((resolve, reject) => {
            Vue.http.get("Advertiser/getAdvertiserAppEvent", {params:{ pkg_name:this.pkgName, adv_id: this.advId }}).then(
                response => {
                    this.setUserEvent(response.body.data)
                    this.isFetchedAppevent = false
                    resolve()
                },
                err => {
                    this.isFetchedAppevent = false
                    this.showAlert(err.body.msg);
                    reject()
                }
            );
        })
    },

    clearForm() {
        this.hasUserSession = false
        this.hasUserEvent = false
        this.reportFilterVisible = false
        this.kpiModule = 'userEvent'
        this.listData = []
        this.userEventList = []
    },

    setUserEvent({ events, session = {} }) {
        let userEventList = []
        for(let key in events) {
          userEventList.push({
            key: events[key],
            value: false,
            label: events[key].replace(/\_/g, ' ').replace(/\b[a-z]/g, char => char.toUpperCase())
          })
        }
        this.userEventList = userEventList

        if(this.userEventList.length > 0) {
            this.hasUserEvent = true
        }
        if(Object.keys(session).length !== 0) {
            this.hasUserSession = true
        }
    },
  
    handleEventRangeChange() {
    },
    initResuleTableConf() {
        this.reportDataKeyList = []
        this.reportData = []
        this.reportFilterVisible = false
        this.allReportTableCellShow = false
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
        if(!this.validate()) {
            return 
        }

        this.currentPage = 1;
        this.chartData = [];
        this.page = false;
        this.reportDataKeyList = []
        this.reportData = [];
        if (!isSort) this.report_sort = { name: "", value: " " };
        this.currentReportType = "online";

        this.fetchOnlineReport();
        this.$ga && this.$ga.event('report', 'eventreport', 'runreport')
    },

    validate() {
      if (!this.pkgName || !this.advId) {
        return this.showAlert("The package Name and Advertiser is needed!", "info");
      }
      
      if(this.kpiModule == 'userSession') {
        if(!this.isByRetenRate && !this.isByRetenUser) {
          return this.showAlert("Please choose one or more session data", "error");
        }
      }

      if(this.kpiModule == 'userEvent') {
        let chosenEvents = this.userEventList.filter(event => {
            if(event.value) {
                return true
            }
            return
        })

        if(chosenEvents.length < 1) {
            this.showAlert("Please choose one or more event data", "error");
            return 
        }
      }
      
      if(Math.floor(this.postDays) > 30 || Math.floor(this.postDays) < 1) {
        return this.showAlert("Please select a correct event range", "error");
      }
     
      if (!this.dateChecked) {
        this.showAlert(
          "Please select a time range of not more than one month",
          "info"
        );
        return;
      }
      return true
    },
    onClickTh(name, $event) {
      if (this.report_sort.name === name) {
        this.report_sort.value = this.report_sort.value === -1 ? 1 : -1;
      } else {
        this.report_sort.value = -1;
        this.report_sort.name = name;
      }
    
      this.submitForm("", "", true);
    },

    setFetchReportPrarms() {
        let p =  $(this.$refs.form_report).getFormQuery()
        let param = {
            'filters[adv_id]': this.advId,
            'filters[pkg_name]': this.pkgName,
        }

      this.by_offer && (param['group[offer_id]'] = 1)
      this.by_aff && (param['group[aff_id]'] = 1)
      this.by_aff && this.by_sub_aff && (param['group[aff_sub8]'] = 1)

      param = Object.assign(p, param)
      if(this.kpiModule == 'userSession') {
        param['user_session'] = '1'
        this.isByRetenUser && (param['kpi[retention][retention_users]'] = 1)
        this.isByRetenRate && (param['kpi[retention][retention_rate]'] = 1)
      } else {
        param['user_event'] = '1'
        param['user_event[events]'] = []
        this.userEventList.map(event => {
            if(event.value) {
               param['user_event[events]'].push(event.key)
            }
        })
        param.post_days = this.postDays
      }

      this.reportParams = param
    },

    fetchOfflineReport(){
      if(!this.validate()) {
        return 
      }
      this.$ga && this.$ga.event('report', 'eventreport', 'exportreport')
      this.setFetchReportPrarms()
      
      window.open(`//${cors_config.api_host}/${cors_config.app_name}/Report/nocpaReport?${encodeURI(UrlUtil.serialize(this.reportParams))}&export=1`, `_blank`);
    },

    fetchOnlineReport() {
      this.setFetchReportPrarms()

      this.isFetchOcpaReport = true
      this.listData = []

      $.scrollToDom($("#report_result_block"))

      Vue.http.get("Report/nocpaReport", { params: this.reportParams}).then(
        response => {
          this.isFetchOcpaReport = false
          // get body data
          if (!response.body.data) {
            this.showAlert('No record!', "info");
            return;
          }
          this.listData = response.body && response.body.data
        },
        err => {
          this.isFetchOcpaReport = false
          if(err.body.msg == 'empty result!') {
            return this.showAlert('No record!', "info");
          }
          this.showAlert(err.body.msg);
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
            this.fetchOnlineReport()
        })
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
    },
    onChangeOfflinePage(page) {
      this.currentOfflinePage = page;
    },
    onChangeOfflineLimit(limit) {
      this.currentOfflineLimit = limit;
      this.currentOfflinePage = 1;
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

      $("#event_data_box input[type=checkbox]:checked").prop("checked", false);
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
        this.reportFilterVisible = this.reportFilterVisible == true 
            ? this.closeReportFilter()
            : true
    },

    toggleResultCellShowStatus(key) {

        if(key === 'all') {
            this.allReportTableCellShow = !this.allReportTableCellShow
            Object.keys(this.titles).forEach((index) => {
                this.titles[index].isShow = this.allReportTableCellShow
            })
            return
        } else {
            let allStatus = true
            this.titles[key].isShow = !this.titles[key].isShow
            Object.keys(this.titles).forEach((index) => {
                if (!this.titles[index].isShow) {
                    allStatus = false
                    return true
                }
            })
            this.allReportTableCellShow = allStatus
        }
    },

    closeReportFilter() {
        this.reportFilterVisible = false
    },

    sortChange(data) {
        this.onClickTh(data.prop)
    },

    offerSelect2CallBack(val) {
      this.offer_id = val;
    },
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
input[type=radio] {
    outline: 0;
    width: 20px;
    height: 20px;
    color: #ff8400;
    background-color: #fff;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -o-appearance: none;
    border: 1px solid #ddd;
    font-weight: 400;
    margin-right: 10px;
    position: relative;
    top: 2px;
    left: 8px;
    cursor: pointer;
    position: absolute;
    margin-top: 4px\9;
    margin-left: -20px;
}
input[type=radio]:checked {
    background-image: url(../../../../assets/image/checked.png);
}
.input-customer-range{
    margin-left: 0;
    padding-left: 0;
    input{
        width: 80px;
    }
}
.package-name-wraper{
    display: inline-block;
    width: 380px;
    .el-autocomplete{
        box-sizing: border-box;
        width: 100%;
        padding-right: 5px;
    }
}
.el-icon-error{
    font-size: 15px;
    color: red;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
.async-search-wraper{
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    margin-left: 17px;
}

</style>
<style>
.event-report .el-table td, .event-report .el-table th{
    padding: 5px 0!important;
}
.el-autocomplete-suggestion__wrap{
    margin: 0!important;
}

</style>


