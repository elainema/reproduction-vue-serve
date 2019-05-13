<template>
  <div :class="loadingZone ? 'ajax_loading' : '' " @click="closeReportFilter()">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">oCPA Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>oCPA Report</h2>
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
                            <label for="inputEmail4" class="col-md-2 control-label">Advertiser</label>
                            <div class="col-md-10 controls">
                                <select2Adv :select2_mode='"simple"' :select2_class="'col-md-7 nopadding form-control'" :adv_name='"filters[adv_id]"' class="nomargin" :select2CallBack="advSelect2CallBack" :data_name="'adv'" :select2_api="'Advertiser_4Ocpa'"></select2Adv>
                            </div>
                        </div>
                        <div class="form-group field-required ">
                            <label for="inputEmail3" class="col-md-2 control-label">Offer<i class="icon-exclamation red"></i></label>
                            <div class="col-md-10 controls">
                                <select2Offer  :select2_mode='"simple"' :select2_class="'col-md-7 nopadding form-control'" class="nomargin" :select2CallBack="offerSelect2CallBack" :data_name="'offer'" :select2_api="'offer2_4Ocpa'" :singleVal="offer_id" :placeholder="placeholder"></select2Offer>
                            </div>
                        </div>
                        <div class="form-group ">
                            <label for="inputPassword3" class="col-md-2 control-label">Affiliate</label>
                            <div class="col-md-10 controls">
                                <div class="checkbox nopadding">
                                    <ul>
                                        <li>
                                            <input type="checkbox" v-model="by_aff" value="active" id="checkbox_by_aff">
                                            <label for="checkbox_by_aff" class="nopadding">By Affiliate</label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="mt10" id="affBlock" v-if="by_aff">
                                    <select2Aff  :select2_mode='"simple"' :select2_class="'col-md-7 nopadding'"  :aff_name='"filters[aff_id]"' class="mb10"  :select_api="'affiliate_4Ocpa'"></select2Aff>
                                    <div class="checkbox col-md-10">
                                        <ul>
                                            <li>
                                                    <input type="checkbox" data-name="group[aff_sub8]" data-c-name="group[aff_sub8]"  value="1" id="checkbox_by_sub_aff" :name="toggleSubAff ? 'group[aff_sub8]': ''" v-model="toggleSubAff">
                                                    <label for="checkbox_by_sub_aff" class="nopadding">Sub Affiliate</label>
                                                    &nbsp;&nbsp;&nbsp;&nbsp; 
                                                    <input type="checkbox" v-if="userInfo.is_allow_blend_ops" data-name="shadow"  value="1" id="checkbox_by_shadow" name="shadow">
                                                    <label for="checkbox_by_shadow" v-if="userInfo.is_allow_blend_ops" class="nopadding">Shadow</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group field-required mb30">
                            <label for="inputPassword3" class="col-md-2 control-label">KPI <i class="icon-exclamation red"></i></label>
                            <div class="col-md-10 controls">
                                <div class="col-md-12 row">
                                    <select class="form-control col-md-5 " @change="changeSelect" v-model="select_kpi_name">
                                        <option data-value="retention" data-name="kpi_name" value="retention">Retention</option>
                                        <option data-value="unique_events" data-name="kpi_name" value="unique_events">Unique Events</option>
                                        <option data-value="repeated_events" data-name="kpi_name" value="repeated_events">Repeated Events</option>
                                        <option data-value="all_events" data-name="kpi_name" value="all_events">All Events</option>
                                    </select>
                                </div>
                                <div v-if="kpi_name === 'retention'">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-view-bind="true" data-checkbox="kpi[]" data-name="kpi_retained_user" name="kpi[retention][retention_users]" data-control-name="kpi[retention][retention_users]" value="1" id="checkbox_retained_users" v-model="kpi_retained_user">Retained Users
                                    </label>
                                    <label class="checkbox-inline">
                                        <input checked=true   data-view-bind="true" type="checkbox" data-checkbox="kpi[]" data-name="kpi_retention_rate" name="kpi[retention][retention_rate]" data-control-name="kpi[retention][retention_rate]"value="1" id="checkbox_retention_rate"  v-model="kpi_retention_rate">Retention Rate
                                    </label>
                                </div>
                                <div v-if="kpi_name === 'unique_events'">
                                    <label class="checkbox-inline">
                                        <input checked=true type="checkbox"  data-view-bind="true" data-checkbox="kpi[]"  name="kpi[unique_events][guide]" data-name="guide" data-control-name="" value="1" id="unique_event_1" v-model="guide">Tutorial Complete
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox"  data-view-bind="true"  data-checkbox="kpi[]"  name="kpi[unique_events][loyaluser]" data-control-name="" data-name="loyaluser" value="1" id="unique_event_2" v-model="loyaluser">Loyal User
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox"   data-view-bind="true" data-checkbox="kpi[]"  name="kpi[unique_events][register]" data-control-name="" data-name="register" value="1" id="unique_event_3" v-model="register">Registration
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-view-bind="true" data-checkbox="kpi[]" name="kpi[unique_events][firstpay]" data-name="firstpay" value="1" id="unique_event_5" v-model="firstpay">First Order
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox" data-view-bind="true" data-checkbox="kpi[]" name="kpi[unique_events][level]" data-name="level" value="1" id="unique_event_6" v-model="level">Level X
                                    </label>
                                </div>
                                <div  v-if="kpi_name === 'repeated_events'">
                                    <label class="checkbox-inline">
                                        <input checked=true type="checkbox"  data-view-bind="true" data-checkbox="kpi[]"  name="kpi[repeated_events][action_count]" data-name="action_count" value="1" id="repeated_events_1" v-model="action_count">Event Counts
                                    </label>
                                    <label class="checkbox-inline">
                                        <input type="checkbox"  data-view-bind="true"  data-checkbox="kpi[]"  name="kpi[repeated_events][action_amount]" data-name="action_amount" value="1" id="repeated_events_2" v-model="action_amount">Event Amount
                                    </label>
                                    <!-- <div class="form-group" style="margin-top: 16px">
                                        <label class="col-md-1 control-label">Post Days</label>
                                        <div class="col-md-10 controls">
                                            <input type="number" class="col-md-2" min="1" max="30" v-model="post_days" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))" name="post_days" data-view-bind="true" date-name="post_days" id="repeated_events_3" />
                                        </div>
                                    </div> -->
                                </div>
                                <div  v-if="kpi_name === 'all_events'">
                                    <label class="checkbox-inline">
                                        <input checked="true" type="checkbox"  data-view-bind="true" data-checkbox="kpi[]"  name="kpi[all_events][event_count]"  value="1" id="all_events_1">All Event
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb10" id="dateRange">
                            <label for="inputPassword3" class="col-md-2 control-label">Date Range</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 row">
                                <div class="a1" v-show="kpi_name === 'retention'">
                                    <div class="col-lg-12 col-md-12 col-sm-12 row" v-if="kpi_name === 'retention'">
                                        <div class="col-md-10 row-sm">
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'"></dateTimePicker_range>
                                        </div>
                                        <div class=" inline_block ml15 pull-left">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-if="kpi_name === 'retention'" v-model="interval_date" />By Date
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="a1" v-show="kpi_name === 'all_events'">
                                    <div class="col-lg-12 col-md-12 col-sm-12 row" v-if="kpi_name === 'all_events'">
                                        <div class="col-md-10 row-sm">
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'"></dateTimePicker_range>
                                        </div>
                                        <div class=" inline_block ml15 pull-left">
                                            <label class="checkbox-inline">
                                                <input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-if="kpi_name === 'all_events'" v-model="interval_date" />By Date
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="a2 col-md-12 row-sm" v-show="kpi_name === 'unique_events'">
                                    <select class="form-control " fef-change="changeSelect" data-view-bind="true" @change="changeSelect">
                                        <option data-name="unique_events_name" data-value="event_date">Event Date</option>
                                        <option data-name="unique_events_name" data-value="install_date">Install Date</option>
                                    </select>
                                    <div class="b1" data-base="b" v-show="kpi_name === 'unique_events' && unique_events_name === 'event_date'">
                                        <div class="col-md-10 row">
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'" v-if="kpi_name === 'unique_events' && unique_events_name === 'event_date'"></dateTimePicker_range>
                                        </div>
                                        <div class=" inline_block ml15 pull-left" v-if="kpi_name === 'unique_events' && unique_events_name === 'event_date'">
                                            <label class="checkbox-inline" v-if="kpi_name === 'unique_events' && unique_events_name === 'event_date'"><input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-model="interval_date">By Date</label>
                                        </div>
                                    </div>
                                    <div class="b2 mt10" data-base="b" v-show="kpi_name === 'unique_events' && unique_events_name === 'install_date'">
                                        <div class="">
                                            <div class="col-md-10 row">
                                                <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'" v-if="kpi_name === 'unique_events' && unique_events_name === 'install_date'"></dateTimePicker_range>
                                            </div>
                                            <div class="inline_block ml15 pull-left" v-if="kpi_name === 'unique_events' && unique_events_name === 'install_date'">
                                                <label class="checkbox-inline" v-if="kpi_name === 'unique_events' && unique_events_name === 'install_date'"><input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-model="interval_date">By Date</label>
                                            </div>
                                            <br />
                                            <div class="clearfix col-md-10 ml14 row">Post events within
                                                <select class=" form-control selectpicker mini " style="display:inline_block !important" :name="kpi_name === 'unique_events' && unique_events_name === 'install_date' ? 'post_days': ''" data-control-name="post_days" data-view-bind="true">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="7">7</option>
                                                    <option value="14">14</option>
                                                    <option value="30">30</option>
                                                </select>  days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="a3 col-md-12 row-sm " v-show="kpi_name === 'repeated_events'">
                                    <select class="form-control selectpicker" @change="changeSelect">
                                        <option data-value="event_date" data-name="repeated_events_name">Event Date</option>
                                        <option data-value="install_date" data-name="repeated_events_name">Install Date</option>
                                    </select>
                                    <div class="c1" data-base="c" v-show="kpi_name === 'repeated_events' && repeated_events_name === 'event_date'">
                                        <div class="col-md-10 row">
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'" v-if="kpi_name === 'repeated_events' && repeated_events_name === 'event_date'"></dateTimePicker_range>
                                        </div>
                                        <div class="inline_block ml15 pull-left">
                                            <label class="checkbox-inline" v-if="kpi_name === 'repeated_events' && repeated_events_name === 'event_date'"><input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-model="interval_date">By Date</label>
                                        </div>
                                    </div>
                                    <div class="c2 mt10 clearfix" data-base="c" v-show="kpi_name === 'repeated_events' && repeated_events_name === 'install_date'">
                                        <div class="col-md-10 row">
                                            <dateTimePicker_range :no_hour="true" :from_date="'week'" :classList="'col-md-12'" v-if="kpi_name === 'repeated_events' && repeated_events_name === 'install_date'"></dateTimePicker_range>
                                        </div>
                                        <div class="inline_block ml15 pull-left">
                                            <label class="checkbox-inline" v-if="kpi_name === 'repeated_events' && repeated_events_name === 'install_date'"><input type="checkbox" data-name="interval_date" data-view-bind="true" name="interval[day]" data-control-name="interval[day]" value="1" id="date1" v-model="interval_date">By Date</label>
                                        </div>
                                        <br />
                                        <div class="col-md-6 ml14 row clearfix">Post events within
                                            <select class=" form-control selectpicker mini" :name="kpi_name === 'repeated_events' && repeated_events_name === 'install_date' ? 'post_days': ''" data-control-name="post_days" data-view-bind="true">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="7">7</option>
                                                <option value="14">14</option>
                                                <option value="30">30</option>
                                            </select>  days
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="form-group mb30  rawData " id="rawData">
                            <label for="checkbox_by_rawdata" class="col-md-2 control-label"></label>
                            <div class="col-md-3 row-sm">
                                <label  class="checkbox-inline"><input  type="checkbox" id="checkbox_by_rawdata" name="filters[show_hide]" data-name="filters[show_hide]" data-alive="1" value="1"/> Raw Data</label>
                            </div>
                        </div>

                        <div class="form-actions col-md-offset-2">
                            <button type="submit" class="btn btn-primary" id="onlineReport">Run Report</button>
                            <button type="button" class="btn btn-default pull-right" id="RunReportBtn" @click.stop.prevent="export_report"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
                            <a type="btn" href="ocpa_report" class="btn btn-default" id="">Reset</a>
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
            <div class="box-content customScrollBar-vertical" id="ocpaReport">
                <div class="ocpa-report-table-filter" v-if="listData.length > 0">
                    <el-tooltip class="item ocpa-report-table-filter" effect="dark" content="Customize Columns" placement="top">
                        <i class="fa fa-sun-o mr10" aria-hidden="true" @click.stop="toggleReportFilterVisible($event)"></i>
                    </el-tooltip>
                    <transition name="fade">
                        <ul v-show="reportFilterVisible" class="report-filter-wrap">
                            <li @click.stop.prevent="toggleResultCellShowStatus('all')">
                                <span> all </span> <i v-show="allReportTableCellShow" class="fa fa-check" aria-hidden="true"></i>
                            </li>
                            <li v-for="(item, index ) in titles" :key="index" @click.stop.prevent="toggleResultCellShowStatus(index)">
                            <span> {{ item.label }} </span> <i v-show="item.isShow == true" class="fa fa-check" aria-hidden="true"></i>
                            </li>
                        </ul>
                    </transition>
                </div>
                <div class="overflow_scroll ocpa-report-table">
                    <el-table
                        v-if="listData.length > 0"
                        :data="listData"
                        border
                        style="width: 100%"
                        :max-height='tableHeight'
                        empty-text='no result'
                        >
                        <el-table-column
                            v-for="(item, index ) in titles"
                            v-if="item.isShow && index !=='list_by_day'"
                            :key="index"
                            :label="item.label"
                            :fixed="item.isFixed"
                            :show-overflow-tooltip="item.isShowToolTip"
                            :min-width='item.minWidth || 150'
                            >
                            <template slot-scope="scope"> 
                                <span v-if="item.isFormData" class="cell-common"> {{ scope.row[item.prop] | translateDateStrToDate }}</span>
                                <span v-else class="cell-common"> {{ scope.row[item.prop] | setEmpty2NA }} </span>
                            </template>
                        </el-table-column>
                         <el-table-column
                            v-for="(item1, index1 ) in listData[0].list_by_day"
                            v-if="titles.list_by_day && titles.list_by_day.isShow"
                            :key="index1"
                            :label="`Day${index1 + 1}`"
                            align='center'
                            >
                            <el-table-column
                                v-for="(item2, index2 ) in item1"
                                :key="index2"
                                :label="titles.list_by_day.children[index2].label "
                                :min-width='titles.list_by_day.children[index2].minWidth || 100'
                                >
                                
                                <template slot-scope="scope">
                                    <span v-if="Array.isArray((listData[scope.$index].list_by_day[index1])[index2])" class="cell-include">
                                        <div 
                                            v-for="(item3, index3 ) in (listData[scope.$index].list_by_day[index1])[index2]"
                                            :key="index3">
                                            {{ item3 | setEmpty2NA }}
                                        </div>
                                    </span>
                                    <span v-else class="cell-common"> {{ (listData[scope.$index].list_by_day[index1])[index2] | setEmpty2NA}} </span> 
                                </template>
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                    <div v-else>  
                        no result.
                    </div>
                    <!-- <table id="pageTable" class="  table table-bordered table-hover">
                        <thead class="" v-if="renderThead">
                            <tr>
                                <th v-if="type.install_date && listData && listData[0] && listData[0].install_date" data-nowrap="true">Install Date</th>
                                <th v-if="type.event_date && type.interval_date" data-nowrap="true">Event Date</th>
                                <th v-if="type.all_event && type.interval_date" data-nowrap="true">Date</th>
                                <th data-nowrap="true">Offer ID</th>
                                <th data-nowrap="true">Offer Name</th>
                                <th data-nowrap="true">BD Name</th>
                                <th v-if="type.affiliate && listData && listData[0] && listData[0].aff_id" data-nowrap="true">Affiliate ID</th>
                                <th v-if="type.affiliate && listData && listData[0] && listData[0].aff_id" data-nowrap="true">Affiliate Name</th>
                                <th v-if="type.affiliate && listData && listData[0] && listData[0].aff_id"data-nowrap="true">AM Name</th>
                                <th v-if="type['group[aff_sub8]']" data-nowrap="true">Sub Affiliate ID</th>
                                <th v-if="type.interval_date && type.retention" data-nowrap="true">Install Date</th>
                                <th v-if="type.unique_events || type.repeated_events" data-nowrap="true">Install</th>
                                <th v-if="type.action_count || type.action_amount"　data-nowrap="true">Event</th>
                                <th v-if="type.action_count" data-nowrap="true">Event Counts</th>
                                <th v-if="type.action_amount" data-nowrap="true">Event Amount</th>
                                <th v-if="type.post_days" data-nowrap="true">Post Days</th>
                                <th v-if="type.guide" data-nowrap="true">Tutorial Complete</th>
                                <th v-if="type.loyaluser" data-nowrap="true">Loyal User</th>
                                <th v-if="type.register" data-nowrap="true">Registration</th>
                                <th v-if="type.firstpay" data-nowrap="true">First Order</th>
                                <th v-if="type.level" data-nowrap="true">Level 4 </th>
                                <th v-if="type.kpi_retained_user && type.retention_day0">Retained User Day 0</th>
                                <th v-if="type.kpi_retained_user && type.retention_day1">Retained User Day 1</th>
                                <th v-if="type.kpi_retained_user && type.retention_day2">Retained User Day 2</th>
                                <th v-if="type.kpi_retained_user && type.retention_day3">Retained User Day 3</th>
                                <th v-if="type.kpi_retained_user && type.retention_day4">Retained User Day 4</th>
                                <th v-if="type.kpi_retained_user && type.retention_day5">Retained User Day 5</th>
                                <th v-if="type.kpi_retained_user && type.retention_day6">Retained User Day 6</th>
                                <th v-if="type.kpi_retained_user && type.retention_day7">Retained User Day 7</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day0_rate">Retention Rate Day 0</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day1_rate">Retention Rate Day 1</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day2_rate">Retention Rate Day 2</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day3_rate">Retention Rate Day 3</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day4_rate">Retention Rate Day 4</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day5_rate">Retention Rate Day 5</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day6_rate">Retention Rate Day 6</th>
                                <th v-if="type.kpi_retention_rate && type.retention_day7_rate">Retention Rate Day 7</th>
                            </tr>
                        </thead>
                        <tbody v-if="renderTbody">
                            <p  v-if="listData && listData.length == 0" data-nowrap="true" class="noResult">no result.</p>
                            <tr v-else v-for="i in listData">
                                <td v-if="type.install_date && i.install_date">{{ translateDateStrToDate(i.install_date) }}</td>
                                <td v-if="type.event_date && type.interval_date">{{ translateDateStrToDate(i.day) }}</td>
                                <td v-if="type.all_event && type.interval_date">{{ translateDateStrToDate(i.day) }}</td>
                                <td>{{ i.offer_id }}</td>
                                <td>{{ i.offer_name }}</td>
                                <td>{{ i.bd_name }}</td>
                                <td v-if="type.affiliate && i.aff_id" v-html="setNAWhileEmpty(i.aff_id)"></td>
                                <td v-if="type.affiliate && i.aff_id">{{i.aff_name }}</td>
                                <td v-if="type.affiliate && i.aff_id">{{i.am_name}}</td>
                                <td v-if="type['group[aff_sub8]']" v-html="setNAWhileEmpty(i.aff_sub)"></td>
                                <td v-if="type.interval_date && type.retention">{{ translateDateStrToDate(i.install_date)}}</td>
                                <td v-if="type.unique_events || type.repeated_events" v-html="setNAWhileEmpty(i.install)"></td>
                                <td v-if="type.action_count || type.action_amount" v-html="setNAWhileEmpty(i.action)"></td>
                                <td v-if="type.action_count" v-html="setNAWhileEmpty(i.action_count)"></td>
                                <td v-if="type.action_amount" v-html="setNAWhileEmpty(i.action_amount)"></td>
                                <td v-if="type.post_days" v-html="setNAWhileEmpty(i.post_days)"></td>
                                <td v-if="type.guide" v-html="setNAWhileEmpty(i.guide)"></td>
                                <td v-if="type.loyaluser" v-html="setNAWhileEmpty(i.loyaluser)"></td>
                                <td v-if="type.register" v-html="setNAWhileEmpty(i.register)">{{  }}</td>
                                <td v-if="type.firstpay" v-html="setNAWhileEmpty(i.firstpay)">{{  }}</td>
                                <td v-if="type.level" v-html="setNAWhileEmpty(i.level)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day0)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day1)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day2)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day3)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day4)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day5)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day6)"></td>
                                <td v-if="type.kpi_retained_user" v-html="setNAWhileEmpty(i.retention_day7)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day0_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day1_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day2_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day3_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day4_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day5_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day6_rate)"></td>
                                <td v-if="type.kpi_retention_rate" v-html="setNAWhileEmpty(i.retention_day7_rate)"></td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>
    </div>
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

import mixin_alert_msg from '@/mixins/alert_msg'
import template_util from '@/mixins/templateUtil'
import cors_config from '@/util/config'


import { Table, TableColumn, Tooltip} from 'element-ui';
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip);

export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        alertType:"info",
        alertPop:"hide",
        kpi:"retention",
        by_aff:false,
        export_report_disabled:false,

        adv_id:[],
        offer_id:'',
        type:{},
        kpi_name:'retention',
        unique_events_name: 'event_date',
        repeated_events_name:'event_date',
        select_kpi_name:'retention',

        renderThead:false,
        renderTbody:false,
        tableHeight: '600',
        listData:[],
        titles: {},
        titlesConf: {
            day: {
                prop: 'day',
                label: 'Event Date',
                isFixed: true,
                isShow: true,
                isShowToolTip: false,
                isFormData: true,
            },
            offer_id: {
                prop: 'offer_id',
                label: 'Offer ID',
                isFixed: true,
                isShow: true,
                isShowToolTip: false
            },
            offer_name: {
                prop: 'offer_name',
                label: 'Offer Name',
                isFixed: true,
                isShow: false,
                isShowToolTip: true
            },
            bd_name: {
                prop: 'bd_name',
                label: 'BD Name',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            aff_id: {
                prop: 'aff_id',
                label: 'Affiliate ID',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            aff_name: {
                prop: 'aff_name',
                label: 'Affiliate Name',
                minWidth: '150',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            aff_sub: {
                prop: 'aff_sub',
                label: 'Sub Affiliate ID',
                minWidth: '150',    
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            am_name: {
                prop: 'am_name',
                label: 'AM Name',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            install_date: {
                prop: 'install_date',
                label: 'Install Date',
                isFixed: true,
                isShow: true,
                isShowToolTip: false,
                isFormData: true,
            },
            install: {
                prop: 'install',
                label: 'Install',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
           
            register: {
                prop: 'register',
                label: 'Registration',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            loyaluser: {
                prop: 'loyaluser',
                label: 'Loyal User',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            firstpay: {
                prop: 'firstpay',
                label: 'First Order',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            level: {
                prop: 'level',
                label: 'Level 4',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            guide: {
                prop: 'guide',
                label: 'Tutorial Complete',      
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            action: {
                prop: 'action',
                label: 'Event',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            action_amount: {
                prop: 'action_amount',
                label: 'Event Amount',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            action_count: {
                prop: 'action_count',
                label: 'Event Counts',
                isFixed: false,
                isShow: true,
                isShowToolTip: false
            },
            post_days: {
                prop: 'post_days',
                label: 'Post Days',
                isFixed: false,
                isShow: true,
                isShowToolTip: false 
            },
            revenue_amount: {
                prop: 'revenue_amount',
                label: 'revenue_amount',
                isShow: true,
            },
            list_by_day: {
                prop: 'dayData',
                label: 'dayDate',
                isFixed: false,
                isShow: true,
                isShowToolTip: false,
                children: {
                    install: {
                        prop: 'install',
                        label: 'Install',
                    },
                    Revenue: {
                        prop: 'Revenue',
                        label: 'Revenue',
                    },
                    action: {
                        prop: 'action',
                        label: 'Action',
                    },
                    action_count: {
                        prop: 'action_count',
                        label: 'Action_count',
                    },
                    action_amount: {
                        prop: 'action_amount',
                        label: 'Action_amount',
                    },
                    ROI: {
                        prop: 'ROI',
                        label: 'ROI',
                    },
                    ROAS: {
                        prop: 'ROAS',
                        label: 'ROAS',
                    },
                    purchase_counts: {
                        prop: 'purchase_counts',
                        label: 'purchase_counts',
                        minWidth: 200
                    },
                    event: {
                        prop: 'event',
                        label: 'Event',
                    },
                    event_counts: {
                        prop: 'event_counts',
                        label: 'Event counts',
                    },
                    amount: {
                        prop: 'amount',
                        label: 'Amount',
                    }
                }
            },
            retention_day0: {
                prop: 'retention_day0',
                label: 'Retained User Day 0',
                isShow: true,
            },
            retention_day1: {
                prop: 'retention_day1',
                label: 'Retained User Day 1',
                isShow: true,
            },
            retention_day2: {
                prop: 'retention_day2',
                label: 'Retained User Day 2',
                isShow: true,
            },
            retention_day3: {
                prop: 'retention_day3',
                label: 'Retained User Day 3',
                isShow: true,
            },
            retention_day4: {
                prop: 'retention_day4',
                label: 'Retained User Day 4',
                isShow: true,
            },
            retention_day5: {
                prop: 'retention_day5',
                label: 'Retained User Day 5',
                isShow: true,
            },
            retention_day6: {
                prop: 'retention_day6',
                label: 'Retained User Day 6',
                isShow: true,
            },
            retention_day7: {
                prop: 'retention_day7',
                label: 'Retained User Day 7',
                isShow: true,
            },
            retention_day0_rate: {
                prop: 'retention_day0_rate',
                label: 'Retention Rate Day 0',
                isShow: true,
            },
            retention_day1_rate: {
                prop: 'retention_day1_rate',
                label: 'Retention Rate Day 1',
                isShow: true,
            },
            retention_day2_rate: {
                prop: 'retention_day2_rate',
                label: 'Retention Rate Day 2',
                isShow: true,
            },
            retention_day3_rate: {
                prop: 'retention_day3_rate',
                label: 'Retention Rate Day 3',
                isShow: true,
            },
            retention_day4_rate: {
                prop: 'retention_day4_rate',
                label: 'Retention Rate Day 4',
                isShow: true,
            },
            retention_day5_rate: {
                prop: 'retention_day5_rate',
                label: 'Retention Rate Day 5',
                isShow: true,
            },
            retention_day6_rate: {
                prop: 'retention_day6_rate',
                label: 'Retention Rate Day 6',
                isShow: true,
            },
            retention_day7_rate: {
                prop: 'retention_day7_rate',
                label: 'Retention Rate Day 7',
                isShow: true,
            },
        },
        reportFilterVisible: false,
        allReportTableCellShow: false,
        toggleSubAff:0,
        placeholder:'Search for an offer',
        interval_date:false,
        kpi_retained_user:false,
        kpi_retention_rate:true,
        action_amount:false,
        action_count:true,
        post_days:"",
        guide:true,
        loyaluser:false,
        register:false,
        firstpay:false,
        level:false,
    }
  },
  mixins: [mixin_alert_msg,template_util],
  watch:{
    userInfo:function(val, oldVal){

    },
    listData() {
       if(this.listData && this.listData.length > 0) {
            this.titles = this.mergeTitlesConf(Object.keys(this.listData[0]),  this.titlesConf)
       }
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: { dateTimePicker_range, pagination, AlertPop, select2Adv, select2Offer, select2Aff},
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
  methods: {
    mergeTitlesConf(headsMap, defaultConf) {
        var result = {}
        headsMap.map(key => {
            defaultConf[key] && (result[key] = defaultConf[key])
       })
        return result
    },
    changeSelect(e) {
        var that = this
        var $this = e.target;
        var name = $(e.target).find("option:selected").attr("data-name")
        var value =  $(e.target).find("option:selected").attr("data-value")
        if (name === 'kpi_name') {
            that.kpi_name = value
            return
        }
        if (name === 'unique_events_name') {
            that.unique_events_name = value
            return
        }
        if (name === 'repeated_events_name') {
            that.repeated_events_name = value
            return
        }
    },
    export_report: function() {
        this.$ga && this.$ga.event('report', 'ocpareport', 'exportreport')
        var p = this.formValidation();
        var that = this
        p.then(function(error, result) {
            if (error) {
                that.showAlert(error)
                return
            }
            window.open(cors_config.api_protocal + "//" + cors_config.api_host + "/"　+ cors_config.app_name +  "/Report/ocpaReport?" + $(that.$refs.form_report).serialize() + "&export=1", "_blank");
        })
    },
    advSelect2CallBack(val) {
        if (!_.isEmpty(val)) {
            this.adv_id.push(val)
            this.offer_id = 'all'
            this.placeholder = 'All'
            $('[data-name="offer"]').val("all");
        } else {
            this.offer_id = ''
            this.placeholder = 'Search for an offer'
        }
    },
    offerSelect2CallBack(val) {
        if (val) {
            this.offer_id = val
            this.placeholder = ''
        } else {
            this.offer_id = ''
            this.placeholder = 'Search for an offer'
        }
    },
    formValidation: function() {
        var p = new promise.Promise();
        var adv = this.adv_id
        var offer = this.offer_id
        if (/\,/.test(offer)) {
            offer = offer.join(',').replace(/all,/, "");
            $('[data-name="offer"]').val(offer);
        }
        if (!offer) {
            p.done("The offer can not be empty", "");
        } else if (!$('[data-checkbox="kpi[]"]:checked:visible').length && this.kpi_name !== 'all_events') {
            p.done("the KPI can not be empty", "")

        } else {
            p.done(null, "")
        }
        return p;
    },
    /*    getRenderReportOptions: function(arr) {
        var options = {};
        var that = this;
        _.each(arr, function(name) {
            var $control = $(that.$refs.form_report).find("[data-name='" + name + "']");
            if ($control.attr("type") === "text" && $control.is(":visible")) {
                options[name] = $control.attr("name") ? 1 : 0;

            } else if ($control.attr("type") === "checkbox" && $control.is(":visible")) {
                options[name] = $control.is(":checked") ? 1 : 0;
            } else if ($control.is("option") && $control.parent().siblings(".bootstrap-select").is(":visible")) {
                options[name] = $control.is(":selected") ? 1 : 0;
            }
        })
        if (that[name]) {
            options[name]= true
        }
        if (event_date) {

        }
        return options;
    },*/
    getIsVisible(name) {
        let that = this
        var val = false
        var $control = $(that.$refs.form_report).find("[data-name='" + name + "']");
        if ($control.attr("type") === "text" && $control.is(":visible")) {
            val = $control.attr("name") ? 1 : 0;
        } else if ($control.attr("type") === "checkbox" && $control.is(":visible")) {
            val = $control.is(":checked") ? 1 : 0;
        } else if ($control.is("option") && $control.parent().siblings(".bootstrap-select").is(":visible")) {
            val = $control.is(":selected") ? 1 : 0;
        }
        return val
    },
    getRenderReportOptions: function(arr) {
        let that = this
        var option = {}
        var kpi_name = that.kpi_name,
            unique_events_name = that.unique_events_name,
            repeated_events_name = that.repeated_events_name;
        var all_event = kpi_name === 'all_events';
        var event_date = (kpi_name === 'unique_events' && unique_events_name === 'event_date') || (kpi_name === 'repeated_events' && repeated_events_name === 'event_date') || ''
        var guide = (that.getIsVisible('guide')|| kpi_name === 'all_events')
        var loyaluser = (that.getIsVisible('loyaluser')|| kpi_name === 'all_events')
        var register = (that.getIsVisible('register')|| kpi_name === 'all_events')
        var firstpay = (that.getIsVisible('firstpay')|| kpi_name === 'all_events')
        var level = (that.getIsVisible('level')|| kpi_name === 'all_events')
        var guide = (that.getIsVisible('guide')|| kpi_name === 'all_events')
        var interval_date = that.getIsVisible('interval_date')
        var retention = kpi_name === 'retention' ? true: false
        var count = (kpi_name === 'repeated_events' || kpi_name === 'all_events') ? true: false
        var unique_events = (kpi_name === 'unique_events'|| kpi_name === 'all_events')  ? true: false
        var repeated_events = (kpi_name === 'repeated_events' || kpi_name === 'all_events')  ? true: false
        var action_count = count && that.action_count || ''
        var action_amount = count && that.action_amount || ''
        var post_days = count && that.post_days || ''
        var install_date = (kpi_name === 'unique_events' && unique_events_name === 'install_date') || (kpi_name === 'repeated_events' && repeated_events_name === 'install_date');
        var kpi_retention_rate = (that.getIsVisible('kpi_retention_rate') || kpi_name === 'all_events')
        var kpi_retained_user = (that.getIsVisible('kpi_retained_user') || kpi_name === 'all_events')
        var aff_sub8 = that.by_aff ? that.toggleSubAff: false
        _.each(arr, function(n, key) {
            option[key] = key
        })
        var option1 = {
            kpi_retention_rate:kpi_retention_rate,
            kpi_retained_user: kpi_retained_user,
            affiliate:that.by_aff,
            install_date:install_date,
            event_date:event_date,
            'group[aff_sub8]':aff_sub8,
            unique_events:unique_events,
            repeated_events:repeated_events,
            retention:retention,
            action_amount:action_amount,
            action_count:action_count,
            post_days:post_days,
            interval_date:interval_date,
            guide:guide,
            loyaluser:loyaluser,
            register:register,
            firstpay:firstpay,
            level:level,
            all_event: all_event,
        };
        option = $.extend(option, option1);
        return option
    },
    submitForm(){
        this.$ga && this.$ga.event('report', 'ocpareport', 'runreport')
        var that = this;
        var p = that.formValidation();
        that.listData = []
        p.then(function(error, result) {
            if (error) {
                return that.showAlert(error)
            }
            that.loadingZone = true;
            var query = $(that.$refs.form_report).getFormQuery()
            that.$http.get('Report/ocpaReport', {params: query})
                .then(response => {
                    that.loadingZone = ""
                    that.$nextTick(function(){ 
                        if(response.body.flag != "success"){
                            that.showAlert(response.body.msg)
                        } else {
                            var data = response.body && response.body.data;
                            var thead = data && data[0]
                            var options = that.getRenderReportOptions(thead)
                            that.type = options
                            that.renderThead = true
                            that.renderTbody = true
                            if (data) {
                                that.listData = data
                            }
                        }
                    })
                }, response => {
                    that.loadingZone = ""
                    that.showAlert(response.body.msg)
                })
        })
    },
    
    toggleReportFilterVisible (e) {
        // if( !this.reportDataKeyList || this.reportDataKeyList.length < 1)  return 
        this.reportFilterVisible = this.reportFilterVisible == true 
                                 ? this.closeReportFilter()
                                 : true
    },

    closeReportFilter() {
        this.reportFilterVisible = false
    },

    toggleResultCellShowStatus(key) {
        if (key !== 'all') {
            let allStatus = true
            this.titles[key].isShow = !this.titles[key].isShow
            Object.keys(this.titles).forEach((index) => {
                allStatus = this.titles[index].isShow
                if (allStatus == false) return true
            })
            this.allReportTableCellShow = allStatus
        } else {
            this.allReportTableCellShow = !this.allReportTableCellShow
            Object.keys(this.titles).forEach((index) => {
                this.titles[index].isShow = this.allReportTableCellShow
            })
        }
    },
  },
  created () {
      this.tableHeight = document.body.offsetHeight - 100
      window.onresize = () => {
        this.tableHeight = document.body.offsetHeight - 100
      }
  },
  mounted () {
    $('.selectpicker').selectpicker();
  }
}
</script>

<style lang="less" scoped>
.ocpaReportForm .chosen-filter {
    min-height: auto !important;
}
.form-report .chosen-filter {
    width: 100% !important;
}
.checkbox input[type=checkbox]{
    position: relative;
}
.ocpa-report-table-filter{
    position: relative;
    .fa-sun-o{
        margin: 6px;
        float: right;
        font-size: 22px;
        cursor: pointer;
    }
    ul{
        position: absolute;
        top: 27px;
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
</style>
<style>
.ocpa-report-table .el-table td, .ocpa-report-table .el-table th{
    padding: 5px 0!important;
}
.ocpa-report-table .el-table td .cell{
    padding: 0!important;
}
.ocpa-report-table .el-table th .cell{
    padding: 5px!important;
}
.ocpa-report-table .cell-common{
    margin: 0 5px;
}
.cell-include div {
    border-bottom: 1px solid #ebeef5;
    padding: 0 5px;
}

.cell-include div:last-child {
    border-bottom: none;
}

.bootstrap-select{
    width: 240px!important;
}
</style>
