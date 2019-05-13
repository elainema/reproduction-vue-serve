<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Referral Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Referral Report</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <form class="form-horizontal frm-entity frm-detail form-report" ref="form_report" action="" method="post" id="qf_offer" @submit.stop.prevent="submitForm">
                <div class="box-container" id="filter_check_box">
                    <div class="shortcut-button" id="data_chk_box">
                        <span class="label label-orange label-filter clickLabel" id="userOpt_referralReport" @click="onClickShortCut('referral', $event)">Referral</span>
                        <span class="label label-orange label-filter clickLabel" id="userOpt_conversionReport" @click="onClickShortCut('conversions', $event)">Conversions</span> 
                        <span v-for="(item, index) in userOption"  class="label label-orange label-filter clickLabel"  @click="onClickShortCutUserOwn(item, $event)">{{item.title}}<i class="fa fa-remove  pull-right" @click="deleteReportOwnOptions(item.id,index, $event)"></i></span>
                        <span class="label label-orange label-filter" id="ADDUserOption" @click='modalState_userOption="show"'>Save Options</span>
                    </div>
                    <div class="box-sub-header" v-box-action-resize>
                        <h3>Options</h3>
                        <div class="box-action">
                            <span class="icon-chevron-up" title="Fold"></span> 
                            <span class="icon-chevron-down hide" title="Unfold"></span>
                        </div>
                    </div>
                    <div class="box-content">
                         <div class="form-group botLin control-group" id="supper_user_aff"><!-- v-show="user_level!== 'bd'" -->
                            <label class="control-label col-md-2" for="">Affiliate Data</label>
                            <div class="col-md-10">
                                <label class="checkbox-inline">
                                    <input type="checkbox" :name="filter_option==='aff' ? '' : 'filters[aff_id]' " value=""> Aff ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="output[aff_name]" value="1" checked="checked" onclick="return false"> Aff Name</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_manager]" value=""> Aff Manager</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub1]" value=""> Aff Sub 1</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub2]" value=""> Aff Sub 2</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub3]" value=""> Aff Sub 3</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub4]" value=""> Aff Sub 4</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub5]" value=""> Aff Sub 5</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub6]" value=""> Aff Sub 6</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[aff_sub7]" value=""> Aff Sub 7</label>

                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[sub_aff_id]" value=""> Sub Aff</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[site_name]" value=""> Site Name</label>
                            </div>
                        </div>
                        <div class="form-group botLin control-group" id="supper_user_adv">  <!-- v-show="user_level!== 'am'" -->
                            <label class="control-label col-md-2" for="">Advertiser Data</label>
                            <div class="col-md-10" id="geo_chk_box">
                                <label class="checkbox-inline">
                                    <input type="checkbox" :name="filter_option==='adv' ? '' : 'filters[adv_id]'" value=""> Adv ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="output[adv_name]" value="1" checked="checked" onclick="return false"> Adv Name</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[adv_manager]" value=""> Adv Manager</label><span id="bd_user_adv" class="" v-show="user_level==='bd'"><label class="checkbox-inline"><input type="checkbox" :name="filter_option==='aff' ? '' : 'filters[aff_id]' " value=""> Aff ID</label><label class="checkbox-inline"><input type="checkbox" name="filters[aff_manager]" value=""> Aff Manager</label></span>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[carrier]" value="">Carrier</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[android_id]" value="">Android ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[device_id]" value="">Device ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[idfa]" value="">IOS IDFA</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[google_adv_id]" value="">Google Advertising ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[mac]" value="">Mac Address</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[imei]" value="">IMEI</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[active_time]" value="">Active Time</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[oid]" value="">Adv OID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[bd_manager]" value="">BD Manager</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[adv_sub1]" value=""> Adv Sub 1</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub2]" value="1"> Adv Sub 2</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub3]" value="1"> Adv Sub 3</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub4]" value="1"> Adv Sub 4</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub5]" value="1"> Adv Sub 5</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub6]" value="1"> Adv Sub 6</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub7]" value="1"> Adv Sub 7</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_sub8]" value="1"> Adv Sub 8</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_os_version]" value=""> Adv OS Version</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[adv_language]" value=""> Adv Language</label> 
                            </div>
                        </div>
                        <div class="form-group botLin control-group">
                            <label class="control-label col-md-2" for="">Offer Data</label>
                            <div class="col-md-10" id="source_chk_box">
                                <label class="checkbox-inline">
                                    <input type="checkbox" :name="(filter_option==='offer' || filter_option_2 ==='offer') ? '' : 'filters[offer_id]'" value=""> Offer ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="output[offer_name]" value="1" checked="checked" onclick="return false"> Offer Name</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="output[offer_url]" value="1"> Offer URL</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[transaction_id]" value="" checked="checked" onclick="return false"> Transaction ID</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[ref_track_site]" value="1"> Tra-Referral Site</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[ref_track]" value=""> Tra-Referral URL</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[pkg_name]" value=""> Pkg Name</label>
                            </div>
                        </div>
                        <div class="form-group botLin">
                            <label class="control-label col-md-2" for="">Device Data</label>
                            <div class="col-md-10" id="">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[browser]" value=""> Browser</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[platform_id]" value="1"> Platform</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[device_brand]" value="1"> Device Brand</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[device_model]" value="1"> Device Model</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[device_os]" value="1"> Device OS</label>
                            </div>
                        </div>
                        <div class="form-group botLin">
                            <label class="control-label col-md-2" for="">Tracking Data</label>
                            <div class="col-md-10" id="stat_chk_box">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[country]" value=""> Country</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="conversion[cost]" value="1"> Payout</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="conversion[revenue]" value="1"> Revenue</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[user_agent]" value="1"> User Agent</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[click_time]" value="1"> User Session Time</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[conv_time]" value="1"> Adv Conversion Time</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="group[time_diff]" value="1"> Ses-Con Time Diff</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[conv_ip]" value=""> Adv Conversion IP</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[click_ip]" value=""> User Session IP</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[client_ip]" value=""> Client IP</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[state]" value=""> Area</label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[city]" value=""> City</label>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div class="box-sub-header">
                    <h3>
                        Filters   <span style="color: #888;padding: 0 15px;font-size:14px">search offer or affiliate maximum show 50 search results</span>
                    </h3>
                </div>
                <div class="box-content">
                    <div class="form-group field-required">
                        <label class="control-label col-md-2">Filter <i class="icon-exclamation red"></i></label>
                        <div class="col-md-10">
                            <div id="filter_title">
                                <div id="filter_select_1" class="filter_block col-md-2 nopadding mb10 mr20">
                                    <select data-type="clone" v-model='filter_option' :disabled="filter_option!==''">
                                        <option value="">Choose a variable</option>
                                        <option value="aff">Affiliates</option>
                                        <option value="adv">Advertisers</option>
                                        <option value="offer">Offers</option>
                                    </select>
                                </div>
                                <div id="filter_select_2" class="filter_block col-md-2 nopadding mb10">
                                    <select data-type="clone" v-if="filter_option === 'aff' || filter_option === 'adv'" v-model='filter_option_2'>
                                        <option value="">Choose a variable</option>
                                        <option value="offer">Offers</option>
                                    </select>
                                    
                                </div>
                                <div id="filter_select_3" class="filter_block"></div>
                                <div id="filter_select_4" class="filter_block"></div>
                                <div style="clear:both"></div>
                            </div>
                            <div id="filter_content_true">
                                <span id="filter_content_1" class="filterMargin mr20" v-show="filter_option==='aff' || filter_option==='adv'|| filter_option==='offer'">
                                    <select2Aff v-if="filter_option==='aff'"  :select2_class="'col-md-12 nopadding'" :select2_mode='"simple"' :aff_name='"filters[aff_id][]"' class="mr20"></select2Aff>
                                    <select2Adv v-if="filter_option==='adv'" :select2_class="'col-md-12 nopadding'"  :select2_mode='"simple"' class="mr20"></select2Adv>
                                    <select2Offer v-if="filter_option==='offer'" :select2_class="'col-md-12 nopadding'" :select2_name='"filters[offer_id][]"'  :select2_mode='"simple"' class="mr20"></select2Offer>

                                </span> 
                                <span id="filter_content_2" class="filterMargin " v-show="filter_option_2==='offer'">
                                    <select2Offer v-if="filter_option_2==='offer'" :select2_class="'col-md-12 nopadding'"  :select2_name='"filters[offer_id][]"' :select2_mode='"simple"'></select2Offer>
                                </span> 
                                <span id="filter_content_3" class="filterMargin hide"></span> 
                                <span id="filter_content_4" class="filterMargin hide"></span>
                            </div>
                            <div class="clearfix">
                                <a type="btn" class="btn btn-default" id="ResetFilterBtn" @click="resetFilterOption">Reset</a></div>
                            </div>
                    </div>
                    <div class="form-group">
                        <div class="form-group">
                            <label class="control-label col-md-2" for="time_zone">Timezone</label>
                            <div class="col-md-10">
                                <select name="timezone" class="form-control col-md-6" id="timezone" v-model="timezone">
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
                                    <option class="hide" value="-3.5">(GMT -3:30) Newfoundland</option>
                                    <option value="-3">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
                                    <option value="-2">(GMT -2:00) Mid-Atlantic</option>
                                    <option value="-1">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
                                    <option value="0">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
                                    <option value="1">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
                                    <option value="2">(GMT +2:00) Kaliningrad, South Africa</option>
                                    <option value="3">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
                                    <option class="hide" value="3.5">(GMT +3:30) Tehran</option>
                                    <option value="4">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
                                    <option class="hide" value="4.5">(GMT +4:30) Kabul</option>
                                    <option value="5">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
                                    <option class="hide" value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
                                    <option class="hide" value="5.75">(GMT +5:45) Kathmandu</option>
                                    <option value="6">(GMT +6:00) Almaty, Dhaka, Colombo</option>
                                    <option value="7">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
                                    <option value="8">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
                                    <option value="9">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
                                    <option class="hide" value="9.5">(GMT +9:30) Adelaide, Darwin</option>
                                    <option value="10">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
                                    <option value="11">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
                                    <option value="12">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group mb10">
                            <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="start">Date Range</label>
                            <div class="col-lg-10 col-md-10 col-sm-10 ">
                                <dateTimePicker_range :no_hour="true" :cal_day="cal_day" :dateChange="dateChange" :limitRange="'one_month'"></dateTimePicker_range>
                            </div>
                        </div>
                        <div class="control-group " id="rawData">
                            <div class="col-md-10 col-md-offset-2 mb40">
                                <label class="checkbox-inline">
                                    <input type="checkbox" name="filters[tunings]" data-name="filters[tunings]" data-alive="1" value="1"> Raw Data</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-actions col-md-offset-2">
                        <div v-if="currentReportType === 'offline' ">
                            <input type="hidden" name="report_type" value="manage_referral_cassandra">
                            <input type="hidden" name="limit"  v-model="currentOfflineLimit">
                            <input type="hidden" name="page" v-model="currentOfflinePage" >
                            <input type="hidden" name="name"  :value="offlineReportName" >

                        </div>
                        <div v-if="currentReportType === 'online' ">
                            <input type="hidden" name="limit" value="150">
                            <input type="hidden" name="run_type" value="online">
                            <input type="hidden" name="page" :value="currentPage === 1 ? 0 : currentPage+1"  >
                        </div>
                        <button type="submit" class="btn btn-primary" id="onlineReport">Run Report</button>
                        <button type="button" class="btn btn-default pull-right" id="RunReportBtn" @click.stop.prevent="submitForm('','offline')" :disabled="export_report_disabled" ><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button> <a type="btn" href="report_referral" class="btn btn-default" id="">Reset</a>

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
                    <li class="chartTab_item"   :class="currentReportType==='history' ? 'active' : ''" @click="currentReportType='history';getHistoryReport()" v-show="item_role_id === '5' || item_role_id === '6'"><a href="#history_table" data-toggle="tab" class="new_badge" aria-expanded="true">History Table<span class="new_badge_text">New</span></a></li>
                    <li class="chartTab_item" :class="currentReportType==='online' ? 'active' : ''" @click="currentReportType='online'"><a href="#online_table" data-toggle="tab" aria-expanded="false">Table</a></li>
                    <li class="chartTab_item" :class="currentReportType==='offline' ? 'active' : ''" @click.prevent="currentReportType='offline';offlineTableRefresh()"><a href="#res_table" data-toggle="tab" aria-expanded="false">Offline Table</a></li>
                </ul>
                <div class="tab-content" id="report_result_block">
                    <div class="tab-pane"  id="res_table" :class="currentReportType==='history' ? 'active' : ''" >
                        <table class="list-table table table-hover tablesorter" id="history_report_list">
                            <thead class="cap">
                                <tr>
                                    <th class="tl-left">Create Time</th>
                                    <th class="tl-left">Status</th>
                                    <th class="tl-left">Export</th>
                                </tr>
                            </thead>
                            <tbody id="history_list" valign="">
                                <tr v-if="historyReportData.length === 1"><td colspan="4" ><strong>No Results Found.</strong></td></tr>
                                <tr v-for="(item,index ) in historyReportData" v-if="index !== 0">
                                    <td v-for="(_item,_index ) in item"  data-nowrap="true" v-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2">
                                        <a v-if="_index === 4 && _item" title="" target="_blank" download="" :href="_item">Download</a>
                                        <span v-text="_item" v-else-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2"></span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div class="tab-pane online_table" :class="currentReportType==='online' ? 'active' : ''"  id="online_table">
                        <div id="report_container">
                            <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="typeof page.total !== 'undefined'"></pagination_report>
                            <div class="overflow_scroll">
                                <table class="list-table table table-hover "  id="report_list" >
                                    <thead class="cap">
                                        <tr>
                                            <th v-for="(item,index ) in reportDataName"   > {{item | capitalize}}</th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        <tr v-for="(item,index ) in reportData">
                                            <td v-for="(_item,_index ) in item" >
                                                <router-link :to="'/p_manage_aff?id='+_item" v-if="_index === 'aff_id'" target="_blank" style="color:#3a8bcc">{{_item}}</router-link>
                                                <router-link :to="'/p_manage_offer?id='+_item" v-else-if="_index === 'offer_id'" target="_blank" style="color:#3a8bcc">{{_item}}</router-link>
                                                <a :href="_item" v-else-if="_index === 'ref_track'" target="_blank" style="color:#3a8bcc">{{_item}}</a>
                                                <div  v-else>
                                                    {{_item == "null null" ? "" : _item}}
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>

                            <pagination_report :page="page" :onChangePage="onChangePage" :currentPage="currentPage" v-if="typeof page.total !== 'undefined'"></pagination_report>
                        </div>
                    </div>
                    <div class="tab-pane" :class="currentReportType==='offline' ? 'active' : ''" id="offline_table">
                        <div id="offline_container " class="overflow_scroll">
                            <pagination :page="offlineTablePage" :onChangeLimit="onChangeOfflineLimit" :onChangePage="onChangeOfflinePage" :currentPage="currentOfflinePage" v-if="offlineTablePage"></pagination>
                            <table class="list-table table table-hover tablesorter"  id="offline_list">
                                <thead class="cap">
                                    <tr>
                                        <th v-for="(item,index ) in offlineTableDataName" v-if="item.toLowerCase()!=='id' && item.toLowerCase()!=='type' && item.toLowerCase()!== 'failed_reason'"> {{item | capitalize}}</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="offlineTableData === 'empty' "><td colspan="4" ><strong>No Results Found.</strong></td></tr>
                                    <tr v-for="(item,index ) in offlineTableData" v-if="offlineTableData !== 'empty' ">
                                        <td v-for="(_item,_index ) in item"  data-nowrap="true" v-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2">
                                            <a v-if="_index === 4 && _item" title="" target="_blank" download="" :href="_item">Download</a>
                                            <span v-text="_item" v-else-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2"></span>
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
   <!--  <userOptionModal :modalState="modalState_userOption" :hideModal="hideModal_userOption" :addUserOption="addUserOption"></userOptionModal> -->
    <modal
        :dialogVisible.sync="modalState_userOption"
        :title="title"
        :confirmText="confirmText"
        :onConfirm="addUserOption"
        :onCancel="hideModal_userOption">
        <template slot="dialogBody">
            <div class="form-group row mt20 mb20">
                <label for="offline_input" class="control-label col-md-3">Option Name :
                </label>
                <div class="col-md-9">
                    <input id="offline_input" class="form-control"  v-model="report_name" type="text" value="" maxlength="255">
                </div>
            </div>
        </template>
    </modal>

 </div>
</template>
<style scoped>
.botLin {
    border-bottom: 1px dashed #ccc;
    padding: 10px;
    margin-bottom: 0;
}
.filterMargin .chosen-filter {
    width: 200px !important;
    min-height: auto;
}
.filterMargin .select2-container,
.filter_block  {
    width: 200px !important;
}
.online_table th {
    text-decoration: none !important;
    cursor: default !important;
}
</style>
<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'


import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import select2Aff from '@/components/Select2Aff.vue'
import select2Adv from '@/components/Select2Adv.vue'
import select2Offer from '@/components/Select2Offer.vue'
import pagination_report from '@/components/Pagination_report.vue'
import pagination from '@/components/Pagination.vue'
//import offlineReportModal from '@/components/OfflineReportModal.vue'
//import userOptionModal from '@/components/UserOptionModal.vue'


import alert_pop_util from '@/util/alert_pop'
import report_util from '@/util/report'

import mixin_alert_msg from '@/mixins/alert_msg'

const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
const OfflineReportModal = () => import(
/* webpackChunkName: "OfflineReportModal" */ '@/components/business/offline-report-modal/'
);
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
let AMReferral = ['filters[aff_id]', 'output[aff_name]', 'output[adv_name]', 'filters[offer_id]', 'output[offer_name]',
        'group[ref_track_site]', 'filters[ref_track]', 'click[unique_click]',
        'conversion[conversion]', 'interval[day]'
    ],
    AMConversion = ['filters[aff_id]', 'output[aff_name]', 'filters[aff_sub1]', 'filters[offer_id]',
        'output[offer_name]', 'filters[country]', 'output[referer]', 'filters[transaction_id]',
        'filters[ref_track]', 'group[click_time]', 'group[conv_time]', 'group[time_diff]',
        'filters[conv_ip]', 'filters[click_ip]'
    ],
    BDReferral = ['filters[offer_id]', 'output[offer_name]', 'output[adv_name]', 'output[aff_name]', 'group[ref_track_site]',
        'filters[ref_track]', 'click[unique_click]', 'conversion[conversion]',
        'interval[day]', 'filters[aff_id]'
    ],
    BDConversion = ['filters[adv_id]', 'output[adv_name]', 'output[aff_name]', 'output[offer_name]', 'filters[adv_sub1]', 'filters[offer_id]',
        'output[offer_name]', 'filters[country]', 'filters[transaction_id]', 'group[time_diff]',
        'filters[conv_ip]', 'filters[click_ip]', 'filters[aff_manager]', 'filters[aff_id]'
    ];
let reportCache = []
let nameCache = []
let pageCache = {}
export default {
  data(){
    return {
        loadingZone:"",
        user_level:"",
        item_role_id:"",
        filter_option:"",
        filter_option_2:"",
        userOption:[],
        timezone:"0",
        dateChecked:true,
        modalState:"hide",
        modalState_userOption:'hide',
        currentReportType:"online",
        cal_day:true,
        offlineReportName:"",
        offlineTableData:[],
        offlineTableDataName:[],
        offlineTablePage:false,
        export_report_disabled:false,
        reportData:[],
        chartData:[],
        historyReportData:[],
        reportDataName:[],
        page:{},
        currentPage:1,
        currentOfflinePage:1,
        currentOfflineLimit:20,
        reportDataCal:{},
        title:'Save Options',
        confirmText:'Apply',
        report_name:''
    }
  },
  watch:{
    userInfo:function(val, oldVal){
        this.timezone = this.$store.state.app.userInfo && this.$store.state.app.userInfo.referral_timezone || "0"
        this.item_role_id = this.$store.state.app.userInfo && this.$store.state.app.userInfo.item_role_id

        if(this.$store.state.app.userInfo.role_id === '3') {
            $("#rawData").hide()
        }

        if (this.item_role_id !== "6" && this.item_role_id !== "5") {
            $("#rawData").hide()

        }
        if (this.$store.state.app.userInfo.role_id === "3") {
            $("#rawData").show()
        }
        this.$nextTick(function(){
            $(".chartTab_item:visible:first ").click()
        })
        
    }
  },
  mixins: [mixin_alert_msg],
  computed: {
    ...mapGetters({
      chosens:"chosens",
      userRole:"userRole"
    }),
    userInfo(){
      return this.$store.state.app.userInfo
    },
    advChosen(){
        return _.find(this.chosens, { name:'adv' });
    }
  },
  components: { dateTimePicker_range, select2Aff, select2Adv, select2Offer, AlertPop, pagination_report, pagination,  OfflineReportModal, Modal},
  methods: {
    ...mapActions([
      'getChosen',
      'getUserRole'
    ]),
    hideModal:function() {
      this.modalState = "hide"
    },
    hideModal_userOption: function() {
      this.modalState_userOption = 'hide'
    },

    resetFilterOption() {
        this.filter_option = ""
        this.filter_option_2 = ""
    },
    config_checkbox(data_config) {
        $('#filter_check_box').find('input[type="checkbox"]').each(function() {
            $(this).prop('checked', '');
            for (var i = 0; i < data_config.length; i++) {
                if (data_config[i] == ($(this).attr("name"))) {
                    $(this).prop('checked', 'checked');
                }
            }
        })
    },
    onClickShortCut(type, $event){
        console.log($($event.target))
        switch(type){
            case "referral":
                if (this.user_level != '' && (this.user_level == 'am' || this.user_level == 'super')) {
                    this.config_checkbox(AMReferral);
                } else {
                    this.config_checkbox(BDReferral);
                }
                break;
            case "conversions":
                if (this.user_level != '' && (this.user_level == 'am' || this.user_level == 'super')) {
                    this.config_checkbox(AMConversion);
                } else {
                    this.config_checkbox(BDConversion);
                }
                break;
        }

    },
    onClickShortCutUserOwn(item, $event) {
        if(!$($event.target).hasClass("fa")){
            this.config_checkbox(item.param);
        }
        
    },
    onChangePage(page){
        console.log(page)
        let that = this;
        this.currentPage = page;

        if(page % 3 === 0 && (page / 3 - 1  === pageCache.pagenumber)) {
            this.$nextTick(function(){
                this.getOnlineReport({page:page})
            })
            
        }else {
            this.loadingZone = true
            setTimeout(function(){
                that.renderReport(that.getReportFromCache())
                that.loadingZone = ""
            },500)
        }
    },
    addUserOption(){
        if(this.userOption.length == 4) {
            return this.showAlert('Data can only increase 4','info')
        }

        let saveParam = [];

        $('input[type="checkbox"]:checked', '#filter_check_box').each(function() {
            saveParam.push($(this).attr('name'));
        })
        Vue.http.post('Report/saveReportOwnOptions', {title:this.report_name,param:saveParam }).then(response => {

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg,'info')

                return;
            }
            this.getUserOption()
            this.showAlert("success", 'success.')

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
        this.hideModal_userOption()
    },
    deleteReportOwnOptions(id, index, $event){
        Vue.http.get('Report/deleteReportOwnOptions?id='+id).then(response => {

            this.userOption.splice(index, 1)
            this.showAlert("success", 'success.')

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    getUserOption(){
        Vue.http.get('Report/getReportOwnOptions').then(response => {

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg)

                return;
            }
            this.userOption = response.body.data.list

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    cancelOffline(report_id, index){
        console.log(report_id)
        Vue.http.get('Report/cancelJobOfflineReport?id='+report_id).then(response => {

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg)

                return;
            }
            this.offlineTableData[index].splice(2,1,"cancelled")

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    setReportCache(data){
        let _name = _.keys(_.sortKeysBy(data.data[0]))
        let _page = data.page
        let _data  = data.data
        reportCache = reportCache.concat(_data);
        nameCache = _name;
        pageCache = this.getPage(_data, _page)
    },
    getPage(_data, _page){
        _page.hasMore =  !(_data.length < 150)
        _page.total = _page.hasMore ? 151 : _data.length
        _page.pagenumber = Math.round(_page.pagenumber / 3) 
        return _page
    },
    getHistoryReport(){
        Vue.http.get('Report/getDailyReferralReportList', {limit:20,page:1}).then(response => {

            let somedata = response.body.data;
            if(somedata.data){
                this.historyReportData = somedata.data
            }

            
        }, response => {
            // error callback
            this.showAlert(response.body.msg)

            this.offlineTableRefresh()
        })
    },
    runOfflineReport(name){
        console.log("runOfflineReport" + name)
        let that = this;
        this.hideModal()
        this.currentReportType = "offline"
        this.offlineReportName = name
        this.$nextTick(function () {
            let  param = $(that.$refs.form_report).getFormQuery()
            this.showAlert("Please wait to prepare your offline report.",'info')
            Vue.http.post('Report/jobOfflineReport', param).then(response => {

                // get body data
                if(!response.body.data){
                    this.showAlert(response.body.msg)

                    return;
                }

                let somedata = response.body;
                that.offlineTableRefresh()
                console.log(that.someData)
            }, response => {
                // error callback
                this.showAlert( response.body.msg)

                that.offlineTableRefresh()
            })
        })

    },
    offlineTableRefresh(page, limit){
        this.loadingZone = true

        Vue.http.get('Report/getJobOfflineReportList?type=manage_referral_cassandra&limit='+ (limit || this.currentOfflineLimit) +'&page='+ (page || this.currentOfflinePage) ).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){

                this.showAlert( response.body.msg)

                return;
            }
            this.renderOfflineTable(response.body.data);
        }, response => {
            this.loadingZone = ""
            // error callback
            this.showAlert( response.body.msg)

        })


    },
    renderOfflineTable(data){
        let that = this;
        let _data = _.cloneDeep(data);
        this.offlineTableDataName = _data.data.shift();
        this.offlineTableData = _data.data.length ? _data.data : 'empty'
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
    renderReport(data){
        let nameArr = _.keys(_.sortKeysBy(data.data[0]))
        let dataArr = _.sortKeysBy(data.data)


        $.each(dataArr, function(i, v){
            dataArr[i] = _.sortKeysBy(v)
            $.each(v, function(_i, _v){
                dataArr[i][_i] = _.isString(_v)&&_v.indexOf("$") === 0 ?  "$" + parseFloat(_v.substr(1)).toFixed(3) : _v
            })


        })


        this.reportDataName = report_util.convertItemText(nameArr)
        this.reportData = dataArr;
        console.log(data.page)
        this.page =  data.page
    },
    getReportFromCache(){
        let obj = {
            page:pageCache
        }
        obj.data = [];
        obj.data = obj.data.concat(reportCache.slice((this.currentPage - 1)*50, (this.currentPage - 1)*50 + 50))
        return _.cloneDeep(obj)
    },
    getOnlineReport(opts){
        console.log("getOnlineReport")
        let param = $(this.$refs.form_report).getFormQuery()

        this.loadingZone = true
        Vue.http.get('Report/referralReport', {params:param}).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg)

                return;
            }
            if (!(opts && opts.page)) {
                if (response.body.data.data.length == 0) {
                    this.showAlert("No record!",'info')
                    return;
                }
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
    submitForm ($event, isOffline){
        if(!this.dateChecked && !isOffline) {

            this.showAlert("Please select a time range of not more than one month",'info')

            return;
        }
        var $checkbox = $("#filter_content_true input[name^=filters]").allVal()
        if ($checkbox.length == 0 ) {

            this.showAlert("Please select at least one search filter",'info')

            return;
        }

        if(isOffline) {
            this.export_report_disabled = false;
            this.currentReportType = "offline"
            this.getOfflineReport();
            this.$ga && this.$ga.event('report', 'referral', 'runreport')
        }else{
            this.$ga && this.$ga.event('report', 'referral', 'exportreport')
            this.currentPage = 1;
            this.page = {};
            this.reportDataName = []
            this.reportData = [];
            this.currentReportType = "online"
            reportCache = []
            nameCache = [];

            this.$nextTick(function(){
                this.getOnlineReport()
            })
        }


    },
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
    onChangeOfflinePage(page){
        this.currentOfflinePage = page;
        this.offlineTableRefresh(page)

    },
    onChangeOfflineLimit(limit){
        this.currentOfflineLimit = limit;
        this.currentOfflinePage = 1;
        this.offlineTableRefresh(1, limit)
    },
    getReportRole(){
        let that = this;
        Vue.http.get('Session/getReportRole').then(response => {
            // get body data
            console.log(response.body)
            let o = response.body.data;
            that.user_level = o;

            if (o == 'am' || o == 'super' || o == 'super_am') {
                if (o == 'super_am') { //abby's role is super_am,her default options just like bd's
                    that.config_checkbox(BDConversion);
                } else {
                    that.config_checkbox(AMConversion);
                }
                if (o == 'super' || o == 'super_am') { //super
                    $('select', '#filter_select_1').find('option').each(function() {
                        $(this).prop('disabled', '');
                    });
                    $('option', '#searchAffSub').each(function() {
                        $(this).prop('disabled', '');
                    })
                } else { //am
                    $('select', '#filter_select_1').find('option').each(function() {
                        if ($(this).attr('value') == 'adv') {
                            $(this).prop('disabled', 'true');
                        } else {
                            $(this).prop('disabled', '');
                        }
                    });
                    $('option', '#searchAffSub').each(function() {
                        if ($(this).attr('value') == 'filters[adv_sub1]') {
                            $(this).prop('disabled', 'true');
                        } else {
                            $(this).prop('disabled', '');
                        }
                    })
                }
            } else if (o == 'bd') { //bd
                that.config_checkbox(BDConversion);
                $('option[value^="filters[aff_sub"]', '#searchAffSub').each(function() {
                    $(this).prop('disabled', 'true');
                })
            }
        }, response => {
            // error callback
        });
    },
  },
  created () {
    console.log("refer report page!!")   
    this.getUserRole();
    this.getChosen();
    this.getUserOption();
    this.getReportRole()

  },
  mounted () {
    
  }
}
</script>