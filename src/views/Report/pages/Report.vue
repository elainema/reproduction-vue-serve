<template>
  <div id="default_report">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Report</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Report</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container" v-yeah-loading="loadingZone">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <!-- <div id="shortcut-button" class="shortcut-button">
                <span class="label label-orange label-filter clickLabel" id="aff-summary-report" :class="is_trigger_shotcut ==='aff_summary_report' ? 'clickLabel_click' : ''" @click="runShortCutReport('aff_summary_report')">Affiliate Summary Report</span>
                <span class="label label-orange label-filter clickLabel"  :class="is_trigger_shotcut ==='aff_hourly_report' ? 'clickLabel_click' : ''" id="aff-hourly-report" @click="runShortCutReport('aff_hourly_report')">Affiliate Hourly Report</span>
                <span class="label label-orange label-filter clickLabel"  :class="is_trigger_shotcut ==='aff_daily_report' ? 'clickLabel_click' : ''" id="aff-daily-report" @click="runShortCutReport('aff_daily_report')"> Affiliate Daily Report</span>
                <span class="label label-orange label-filter clickLabel"  :class="is_trigger_shotcut ==='aff_by_offer_report' ? 'clickLabel_click' : ''"  id="aff-by-offer-report" @click="runShortCutReport('aff_by_offer_report')"> Affiliate by Offer Report</span>
            </div> -->
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
                        <label class="control-label col-md-2" for="">Offer Information</label>
                        <div class="col-md-10" id="data_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="individual_offer" v-model="individual_offer" data-name="individual_offer" >Offer
                            </label>
                            <span id="am_user"  >
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="affiliate_id"  v-model="affiliate_id" > Affiliate
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="affiliate_manager_id" v-model="pm"> PM
                                </label>
                            </span>
                            <span  id="bd_user"  >
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="advertiser_id"  v-model="advertiser_id"> Advertiser
                                </label>
                                <label class="checkbox-inline">
                                    <input type="checkbox" data-name="advertiser_manager_id" v-model="am"> AM
                                </label>
                            </span>
                            <span class="" id="am_team" v-show="(userInfo.role === 'AM-BD' || userInfo.item_role_id === 6 || userRole==='super' || userRole==='am' || userRole === 'super am' || userRole === 'tech support' ) " >
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="" name="filters[am_team]" data-name="am_team" v-model="am_team">PM Team
                                </label>
                            </span>
                            <span class="" id="bd_team" v-show="(userInfo.role === 'AM-BD' || userInfo.item_role_id === 6 || userRole==='super' || userRole==='bd' || userRole === 'super bd' || userRole === 'tech support')" >
                                <label class="checkbox-inline">
                                    <input type="checkbox" value="" name="filters[bd_team]" data-name="bd_team"  v-model="bd_team">AM Team
                                </label>
                            </span>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[cpa]" data-name="filters[cpa]" value="1" v-model="cpa"> CPA
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[rpa]" data-name="filters[rpa]" value="1" v-model="rpa" > RPA
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" data-name="publisher_app_id" v-model="publisher_app_id">Publisher App
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[bd_manager_id][]" value="1" data-name="bd_manager_id" v-model="bd_manager_id"> BD
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[creative_id]" data-name="creative_id" v-bind:value="creative_id" v-model="creative"> Creative Id
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="pkg_name" v-model="pkgCheck"> Pkg Name
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[slot_id]" value="" > Slot
                            </label>
                        </div>
                    </div>
                    <div class="form-group" id="tracking_source">
                        <label class="control-label col-md-2" for="">Tracking Source</label>
                        <div class="col-md-10" id="traffic">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="normal_traffic" data-name="sl_normal" v-model="sl_normal"> Normal Traffic
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="smart_link" data-name="sl_utr" v-model="sl_utr"> Smart Link Traffic
                            </label>
                            <input type="hidden" data-name="filters[traffic_source]" :value="traffic_source" :name="( sl_normal || sl_utr) ? 'filters[traffic_source]' : ''">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Tracking Statistics</label>
                        <div class="col-md-10" id="stat_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" value=""  name="statistic[click]" data-name="statistic[click]" :disabled="carrier ? 'disabled' : false "   v-model="click"> Gross Clicks
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[unique_click]" data-name="statistic[unique_click]" :disabled="carrier ? 'disabled' : false " v-model="unique_click" > Unique Clicks
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[conversion]" data-name="statistic[conversion]" v-model="conversion"> Conversion
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[cost]" data-name="statistic[cost]" v-model="cost" > Cost
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[revenue]" data-name="statistic[revenue]" v-model="revenue"> Revenue
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[profit]" data-name="statistic[profit]" v-model="profit"> Profit
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="statistic[impressions]" data-name="statistic[impressions]" v-model="impressions"> Impression
                            </label>
                             <label class="checkbox-inline">
                                 <input type="checkbox" value="" name="statistic[cpe]" data-name="statistic[cpe]" v-model="cpe"> CPE
                             </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Data Calculations</label>
                        <div class="col-md-10" id="calcus_chk_box">
                            <label class="checkbox-inline">
                                <input   type="checkbox" value="" name="calcus[cr]" data-name="calcus[cr]" :disabled="carrier ? 'disabled' : false "  v-model="cr"> CR(Gross)
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[cpc]" data-name="calcus[cpc]" :disabled="carrier ? 'disabled' : false " v-model="cpc"> CPC
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[rpc]" data-name="calcus[rpc]" :disabled="carrier ? 'disabled' : false " v-model="rpc" > RPC
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[acpa]" data-name="calcus[acpa]" v-model="acpa"> aCPA
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[arpa]" data-name="calcus[arpa]" v-model="arpa"> aRPA
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[ctr]" data-name="calcus[ctr]" v-model="ctr"> CTR
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="" name="calcus[ecpm]" v-model="ecpm"> eCPM
                            </label>
                        </div>
                    </div>
                    <div class="form-group ">
                        <label class="control-label col-md-2 " for="">Targeting</label>
                        <div class="col-md-10" id="calcus_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="country"  v-model="country"> Country
                            </label>
                        </div>
                    </div>
                </div>

                <div class="box-sub-header" id="advanced_options" v-box-action-resize>
                    <h3>Advanced Options</h3>
                    <div class="box-action">
                        <span v-show="isHide" class="icon-chevron-up" title="Fold"></span>
                        <span v-show="!isHide" class="icon-chevron-down " title="Unfold"></span>
                    </div>
                </div>
                <div class="box-content" v-bind:class="{ hide: isHide }" id="advanced_options_content">
                    <p>**If you select any advanced options, it will cost longer time to generate the report. Please go to offline report to get the result.</p>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Targeting</label>
                        <div class="col-md-10" id="geo_chk_box">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="state" name="filters[state][]" value="" v-model="state"> Area
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="city" name="filters[city][]" value="" v-model="city"> City
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="platform"  v-model="platform"> Platform
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="browser"  v-model="browser"> Browser
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="device_type"  v-model="device"> Device Type
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" data-name="carrier" v-model="carrier"> Carrier
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Sub IDs</label>
                        <div class="col-md-10" id="sub_ids">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id1]" data-name="data[sub_id1]" value="1" v-model="sub_id1"> Sub ID
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id2]" data-name="data[sub_id2]" value="1" v-model="sub_id2"> Sub ID 2
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id3]" data-name="data[sub_id3]" value="1" v-model="sub_id3"> Sub ID 3
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id4]" data-name="data[sub_id4]" value="1" v-model="sub_id4"> Sub ID 4
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id5]" data-name="data[sub_id5]" value="1" v-model="sub_id5"> Sub ID 5
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id6]" data-name="data[sub_id6]" value="1" v-model="sub_id6"> Sub ID 6
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_id7]" data-name="data[sub_id7]" value="1" v-model="sub_id7"> Sub ID 7
                            </label>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Sub Aff</label>
                        <div class="col-md-10" id="sub_ids">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_aff_id]" data-name="data[sub_id1]" value="1" v-model="sub_aff_id" /> Sub Aff
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[sub_aff_id_encrypted]" data-name="data[sub_aff_id_encrypted]" value="1" /> Sub Aff Id Encrypted
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[site_name]" data-name="data[sub_id2]" value="1" v-model="site_name" /> Site Name
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for=""></label>
                        <div class="col-md-10" id="">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="data[idfa]" data-name="data[idfa]" value="1" v-model="idfa" /> Idfa
                            </label>
                            <label class="checkbox-inline">
                            </label>

                            
                                <input type="checkbox" name="data[google_adv_id]" data-name="data[google_adv_id]" value="1" v-model="google_adv_id" /> Gaid
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
                        <div class="col-md-10 col-md-offset-2 clearfix" id="chosen_offer" v-if="individual_offer" >
                            <select2Offer v-if="individual_offer" :singleVal="offer_id" :select2_multiple=true  :changeAggregationFilters="changeAggregationFilters" ref="offerMultiDom"></select2Offer>
                        </div>
                        <div class="col-md-10 col-md-offset-2  mb20 clearfix" id="chosen_cr">
                            <label class="checkbox-inline ">
                                <input type="checkbox" value="0" id="zero_cr" name="calcus[cr][$gt]" v-model="cr_gt"> None-Zero CR
                            </label>
                        </div>
                        <div class="col-md-10 col-md-offset-2 clearfix mt20" id="chosen_smart_link" v-show="sl_utr">
                            <select2SmartLink v-if="sl_utr" :changeAggregationFilters="changeAggregationFilters"></select2SmartLink>
                        </div>
                        <div class="col-md-10 col-md-offset-2 clearfix " id="chosen_datas">
                            <chosen v-if="am" :chosen="amChosen"  :multiple_vue=true :afterRender="afterRender"></chosen>
                            <chosen v-if="pm" :chosen="pmChosen"  :multiple_vue=true :afterRender="afterRender"></chosen>
                            <chosen v-if="country" :chosen="geoChosen"  :multiple_vue=true :afterRender="afterRender"></chosen>
                            <chosen v-if="platform" :chosen="platformChosen"  :multiple_vue=true ></chosen>
                            <chosen v-if="browser" :chosen="browserChosen"  :multiple_vue=true ></chosen>
                            <chosen v-if="device" :chosen="deviceChosen"  :multiple_vue=true ></chosen>
                            <chosen v-if="advertiser_id" :chosen="advChosen"  :multiple_vue=true :changeAggregationFilters="changeAggregationFilters" :afterRender="afterRender"></chosen>
                            <select2Aff v-if="affiliate_id" :singleVal="aff_id" :isShadow="userInfo.is_allow_blend_ops" :changeAggregationFilters="changeAggregationFilters" ref="affMultiDom"></select2Aff>
                            <select2Pkg v-if="pkgCheck"></select2Pkg>
                            <select2App v-if="publisher_app_id" :select2_name="'filters[publisher_app_id]'" ref="appMultiDom"></select2App>
                            <label v-if="creative">
                                Creative id: <input id="creative_input" v-model="creative_id">
                            </label>
                        </div>
                        <div class="col-md-10 col-md-offset-2" id="chosen_stats"></div>
                        <div class="col-md-10 col-md-offset-2" id="chosen_calcus"></div>
                        <div class="aggregation_filters_zone" v-if="aggregation_filters.length">

                            <input type='hidden' v-for="item in aggregation_filters" name='aggregation_filters[]'  :value="item"/>
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
                </div>

                <div class="form-actions">
                    <div class="form-group">
                        <label class="control-label col-md-2" for="">Time Interval</label>
                        <div class="col-md-10">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[year]" data-name="interval[year]" value="1" v-model="interval_year"> Year
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[month]" data-name="interval[month]" value="1" v-model="interval_month"> Month
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[week]" data-name="interval[week]" value="1" v-model="interval_week"> Week
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[day]" data-name="interval[day]" value="1" v-model="interval_day"> Date
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" name="interval[hour]" data-name="interval[hour]" value="1" v-model="interval_hour"> Hour
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label col-md-2" for="time_zone">Timezone</label>
                        <div class="col-md-10">
                            <time-zone-component
                                :name="'timezone'"
                                :classList="'form-control col-md-6'"
                                :defaultVal="timezone"
                                :cal_day.sync="cal_day"
                            ></time-zone-component>
                            <!-- <select name="timezone" class="form-control col-md-6" id="timezone" v-model="timezone" @change="cal_day=true">
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
                            </select> -->
                        </div>
                    </div>
                    <div class="form-group mb10">
                        <label class="col-lg-2 col-md-2 col-sm-2 control-label" for="start">Date Range</label>
                        <div class="col-lg-10 col-md-10 col-sm-10 ">
                            <dateTimePicker_range :cal_day="cal_day" :dateChange="dateChange" :limitRange="'one_month'"
                            :detaultStartDate='startDate'
                            :defaultEndDate='endDate'
                            :defaultStartHour="startHour"
                            :defaultEndHour="endHour">
                            </dateTimePicker_range>
                        </div>
                    </div>
                    <div class="form-group " id="rawData">
                        <div class="col-md-10 col-md-offset-2 mb40">
                            <label class="checkbox-inline">
                                <input type="checkbox" name="filters[show_hide]" data-name="filters[show_hide]" data-alive="1" value="1" v-model="raw_data" /> Raw Data
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-10 col-md-offset-2">
                            <div v-if="currentReportType === 'offline' ">
                                <input type="hidden" name="report_type" value="manage_general">
                                <input type="hidden" name="limit"  v-model="currentOfflineLimit">
                                <input type="hidden" name="page" v-model="currentOfflinePage" >
                                <input type="hidden" name="name"  :value="offlineReportName" >
                                <input type="hidden" name="query" :value="offline_query"  v-if="offline_query">

                            </div>
                            <div v-if="carrier">
                                <input type="hidden" name="filters[carrier][]" value="">
                            </div>
                            <input type="hidden" name="druid2" value="1">
                            <div v-if="url_auto_sub && report_sort.name">
                                <input type="hidden" :name="'sort[' + report_sort.name + ']'" :value="report_sort.value">
                            </div>
                            <button type="submit" class="btn btn-primary" id="RunReportBtn">Run Report</button>
                            <a href="report" class="btn btn-default" id="resetPage">Reset</a>
                            <button type="button" v-if="isAccessExportReport" class="btn btn-default pull-right" id="export_report"  @click.stop.prevent="submitForm('','offline')" :disabled="export_report_disabled"><i class="fa fa-download mr10" aria-hidden="true"></i>Export Report</button>
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
        <div class="box-container" v-yeah-loading="loadingZone">
            <div class="box-content">
                <div id="chartTab">
                    <ul  class="nav nav-tabs">
                        <li class="" 
                            :class="currentReportType==='online' ? 'active' : ''"
                            @click="currentReportType='online'">
                            <a href="#res_table" data-toggle="tab" aria-expanded="true" ref="res_table">Table</a>
                        </li>
                        <li v-for="(item,index) in tabOrder" :key="index"
                            :class="currentReportType===item ? 'active' : ''"
                            @click="currentReportType=item">
                            <a :href="item | getTab" data-toggle="tab" aria-expanded="true" :ref="item | getTab">{{tabMap[item] | capitalize}}</a>
                        </li>
                        <li style="display:none"><a href="#date_chart" data-toggle="tab">Date</a></li>
                        <li style="display:none"><a href="#hour_chart" data-toggle="tab">Hour</a></li>
                        <li style="display:none"><a href="#am_chart" data-toggle="tab">PM</a></li>
                        <li style="display:none"><a href="#advertiser_id_chart" data-toggle="tab">Advertiser</a></li>
                        <li style="display:none"><a href="#bd_chart" data-toggle="tab">AM</a></li>
                        <li style="display:none"><a href="#offer_id_chart" data-toggle="tab">Offer</a></li>
                        <li style="display:none"><a href="#country_chart" data-toggle="tab">Country</a></li>
                        <li style="display:none"><a href="#platform_chart" data-toggle="tab">Platform</a></li>
                        <li style="display:none"><a href="#browser_chart" data-toggle="tab">Browser</a></li>
                        <li style="display:none"><a href="#device_type_chart" data-toggle="tab">Device Type</a></li>
                        <li :class="currentReportType==='aff_chart' ? 'active rightTab' : 'rightTab'" v-show="affiliate_id && chartData.data" @click="currentReportType='aff_chart'"><a href="#aff_id_chart" data-toggle="tab">Affiliate</a></li>
                        <li  v-if="isAccessExportReport" class="" :class="currentReportType==='offline' ? 'active rightTab' : 'rightTab'" @click.prevent="currentReportType='offline';offlineTableRefresh()"><a href="#offline_table" data-toggle="tab" id="offline_table_href" aria-expanded="false" ref="offline_table">Offline Table</a></li>
                        <li v-show="(userInfo.item_role_id == 5 || userInfo.item_role_id == 6)" class="" :class="currentReportType==='schedule_offline' ? 'active rightTab' : 'rightTab'" @click.prevent="currentReportType='schedule_offline';scheduleOfflineTableRefresh()"><a href="#schedule_offline_table" data-toggle="tab" id="schedule_offline_table_href" aria-expanded="false" ref="schedule_offline_table">Schedule Offline Table</a></li>
                    </ul>
                </div>
                
                <div class="tab-content report_result_block" id="report_result_block">
                    <div class="tab-pane" :class="currentReportType==='online' ? 'active' : ''" id="res_table">
                        <pare-result-report :orgReportData="orgReportData.online"
                            @renderChart="renderChart" :showAlert="showAlert"
                            @changeGroupByHandler="changeGroupByHandler"
                            @getMoreReportData="getMoreReportData"
                            @onClickTh="onClickTh"></pare-result-report>
                    </div>
                    <div class="tab-pane" :class="currentReportType==='offer_id' ? 'active' : ''" id="res_offer_id">
                        <pare-result-report :orgReportData="orgReportData.offer_id" :showAlert="showAlert"
                        @changeGroupByHandler="changeGroupByHandler"
                        :listOrder="listOrder['offer_id']" :tabIds="tabIds"
                        @getMoreReportData="getMoreReportData"
                        @onClickTh="onClickTh"></pare-result-report>
                    </div>
                    <div class="tab-pane" :class="currentReportType==='aff_id' ? 'active' : ''" id="res_aff_id">
                        <pare-result-report :orgReportData="orgReportData.aff_id"
                        :listOrder="listOrder['aff_id']" :tabIds="tabIds"
                        @changeGroupByHandler="changeGroupByHandler"
                        @getMoreReportData="getMoreReportData"
                        @onClickTh="onClickTh" :showAlert="showAlert" 
                        @renderChart="renderChart"></pare-result-report>
                    </div>
                    <div class="tab-pane" :class="currentReportType==='publisher_app_id' ? 'active' : ''" id="res_publisher_app_id">
                        <pare-result-report :orgReportData="orgReportData.publisher_app_id"
                        :listOrder="listOrder['publisher_app_id']" :tabIds="tabIds"
                        @changeGroupByHandler="changeGroupByHandler"
                        @getMoreReportData="getMoreReportData"
                        @onClickTh="onClickTh" :showAlert="showAlert"></pare-result-report>
                    </div>
                    <div class="tab-pane" id="date_chart">
                        <div class="chartshow"></div>
                    </div>
                    <div class="tab-pane" id="hour_chart">
                        <div class="chartshow"></div>
                    </div>
                    <div class="tab-pane" id="aff_id_chart" :class="currentReportType==='aff_chart' ? 'active' : ''">
                        <highchart v-if="affiliate_id" :chartData="chartData"></highchart>
                    </div>
                    <div class="tab-pane" id="am_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="advertiser_id_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="bd_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="offer_id_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="country_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="platform_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="browser_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
                    </div>
                    <div class="tab-pane" id="device_type_chart">
                        <div class="piechart_click"></div>
                        <br />
                        <div class="piechart_conversion"></div>
                        <br />
                        <div class="piechart_revenue"></div>
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

                    <div class="tab-pane" :class="currentReportType==='schedule_offline' ? 'active' : ''" id="schedule_offline_table">
                        <div id="schedule_offline_container " class="overflow_scroll">
                            <table class="list-table table table-hover tablesorter"  id="schedule_offline_list">
                                <thead class="cap">
                                <tr>
                                    <th v-for="(item,index ) in scheduleOfflineTableDataName" v-if="item.toLowerCase()!=='id' && item.toLowerCase()!=='type' && item.toLowerCase()!=='failed_reason'"> {{item | capitalize}}</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index ) in scheduleOfflineTableData">
                                    <td v-for="(_item,_index ) in item"  data-nowrap="true" v-if="_index !== 0 && _index !== item.length -1 && _index !== item.length - 2">
                                        <a v-if="_index === 4 && _item" title="" target="_blank" download="" :href="_item">Download</a>
                                        <span v-text="_item" v-else></span>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <offline-report-modal
      :modalState.sync="modalState" 
      :runOfflineReport="runOfflineReport"
      :dialogName="'modalState'"
    ></offline-report-modal>
    <!-- <offlineReportModal :modalState="modalState" :hideModal="hideModal" :runOfflineReport="runOfflineReport"></offlineReportModal> -->
  </div>
</template>

<script>
import auth from '@/util/auth'
import alert_pop_util from '@/util/alert_pop'

import { mapGetters, mapActions } from 'vuex'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import select2Aff from '@/components/Select2Aff.vue'
import select2Offer from '@/components/Select2Offer.vue'
import select2SmartLink from '@/components/Select2SmartLink.vue'
import select2Pkg from '@/components/Select2Pkg.vue'
import select2App from '@/components/Select2App.vue'
import pagination_report from '@/components/Pagination_report.vue'
import pagination from '@/components/Pagination.vue'
//import offlineReportModal from '@/components/OfflineReportModal.vue'
import chosen from '@/components/Chosen.vue'
import highchart from '@/components/Highchart.vue'

import Vue from 'vue'

import mixin_alert_msg from '@/mixins/alert_msg'

const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

const OfflineReportModal = () => import(
/* webpackChunkName: "OfflineReportModal" */ '@/components/business/offline-report-modal/'
);
const TimeZoneComponent = () => import(
/* webpackChunkName: "TimeZoneComponent" */ '../components/time-zone/'
);
const PareResultReport = () => import(
/* webpackChunkName: "PareResultReport" */ '../components/pane-result-report.vue'
);

export default {
  data(){
    return {
        offer_id: "",
        aff_id: "",
        isHide: true,
        advertiser_id_tmp:"",
        url_auto_sub: false,
        tabOrder:[],
        checkAll: false,
        checkModel: [],
        orgReportData:{
            offer_id:{},
            aff_id:{},
            publisher_app_id:{},
            online:{}
        },
        // orgReportOfferData:{},
        // orgReportPubData: {},
        // orgReportPubAppData: {},
        tabQuene:[], //传给后端的参数，当前tab之前的tab
        queryMorePara:{}, //获取某tab更多页参数对象
        clearFlag: false,//需要清缓存时使用,新数据取回时清
        isGroupby: false,
        listOrder:{},
        tabMap:{
            'publisher_app_id': 'publisher app',
            'aff_id': 'publisher',
            'offer_id': 'offer'
        },
        tabIds:{},
        //offerInfo
        individual_offer: "",
        affiliate_id: "",
        adv_id:"",
        am:"",
        pm:"",
        am_id:"",
        pm_id:"",
        geo_id:"",
        am_tmp:"",
        pm_tmp:"",
        am_team:"",
        bd_team:"",
        bd_manager_id: "",
        publisher_app_id: "",
        cpa: "",
        rpa: "",
        creative:"",
        pkgCheck: '',
        advertiser_id:"",
        creative_id:"",
        //Tracking Source
        sl_utr:"",
        sl_normal:"checked",
        //Tracking Statistics
        click: "checked",
        unique_click: "",
        conversion: "checked",
        cost: "checked",
        profit: "checked",
        revenue: "checked",
        cpe: "",
        impressions: "",
        //Data Calculations
        cr: "checked",
        cpc: "",
        rpc: "checked",
        acpa: "",
        arpa: "",
        ctr: "",
        ecpm: '',
        //Targeting
        country:"",
        country_tmp:"",
        //Advance
        platform:'',
        browser:'',
        device:"",
        carrier:"",
        state: false,
        city: false,
        sub_id1: false,
        sub_id2: false,
        sub_id3: false,
        sub_id4: false,
        sub_id5: false,
        sub_id6: false,
        sub_id7: false,
        sub_aff_id: false,
        site_name: false,
        idfa: false,
        google_adv_id: false,
        //Advance check Arr
        advance_arr:[
            'state',
            'city' ,
            'sub_id1',
            'sub_id2',
            'sub_id3',
            'sub_id4',
            'sub_id5',
            'sub_id6',
            'sub_id7',
            'sub_aff_id',
            'site_name',
            'idfa',
            'google_adv_id',
            'platform_id',
            'browser_id',
            'device_id',
            'creative_id'
        ],
        //filter
        cr_gt:"",
        interval_year: "",
        interval_month: "",
        interval_week: "",
        interval_day: "",
        interval_hour: "",
        startDate: '',
        endDate: '',
        startHour: "",
        endHour: "",
        raw_data:"",
        offline_query:"",
        loadingZone:"",
        offlineReportName:"",
        report_sort:{name:"",value:""},
        aggregation_filters:[],
        init_checked:['statistic[click]', 'statistic[conversion]', 'statistic[cost]', 'statistic[profit]', 'statistic[revenue]',  'calcus[cr]', 'calcus[rpc]','source[yeahmobi]'],
        aff_summary_report:false,
        aff_hourly_report:false,
        aff_daily_report:false,
        aff_by_offer_report:false,
        is_trigger_shotcut:false,
        cal_day:true,
        dateChecked:true,
        export_report_disabled:false,
        modalState:"hide",
        currentReportType:"online",
        short_cut_options: {
            'aff_summary_report': ['affiliate_id', 'statistic[click]', 'statistic[conversion]', 'statistic[cost]', 'calcus[cr]', 'calcus[rpc]'],
            'aff_hourly_report': ['affiliate_id', 'statistic[click]', 'statistic[conversion]', 'statistic[cost]', 'calcus[cr]', 'calcus[rpc]', 'interval[hour]'],
            'aff_daily_report': ['affiliate_id', 'statistic[click]', 'statistic[conversion]', 'statistic[cost]', 'calcus[cr]', 'calcus[rpc]', 'interval[day]'],
            'aff_by_offer_report': ['affiliate_id', 'offer_id', 'statistic[click]']
        },
        chartData:[],
        page:{},
        currentPage:1,
        currentOfflinePage:1,
        currentOfflineLimit:20,
        offlineTableData:[],
        offlineTableDataName:[],
        scheduleOfflineTableData:[],
        scheduleOfflineTableDataName:[],
        offlineTablePage:false,
        isAccessExportReport:false,
        timezone:"0",
        noRecord:'',

    }
  },
  mixins: [mixin_alert_msg],
  watch:{
    is_trigger_shotcut:function(val ,oldval){
        
        if(val) this.affiliate_id = true;
    },
    userInfo:function(val, oldVal){
        this.timezone = this.$store.state.app.userInfo && this.$store.state.app.userInfo.timezone || "0"
    },
    bd_team:function(val, oldVal){
        if(val) {
            this.individual_offer = true;
        }
    },
    am_team:function(val, oldVal){
        if(val) {
            this.affiliate_id = true;
        }
    },
    carrier:function(val, oldVal){
        if(val) {
            let carrier_checked = ['statistic[click]','statistic[unique_click]','calcus[cr]','calcus[cpc]','calcus[rpc]']
            let that = this;
            $.each(carrier_checked, function(i, v){
                $(that.$refs.form_report).find("[name='" + v + "']").prop("checked",false)
            })
        }
    },
    chosens:function(newVal){
        if(newVal){
            if (this.advertiser_id_tmp){
                this.advertiser_id = this.advertiser_id_tmp
            }
            if (this.country_tmp){
                this.country = this.country_tmp
            }
            if (this.am_tmp){
                this.am = this.am_tmp
            }
            if (this.pm_tmp){
                this.pm = this.pm_tmp
            }
        }
    },
    ecpm(val){
        if (val){
            this.revenue= true
            this.impressions= true
        }
    },
    deep:true
  },
  filters: {
      getTab: function(value){
          return '#res_' + value
      }
  },
  components: { dateTimePicker_range, select2Aff, select2Offer, select2SmartLink,  chosen , AlertPop, OfflineReportModal, pagination_report, pagination, highchart, select2Pkg,select2App,TimeZoneComponent, PareResultReport},
  computed: {
    ...mapGetters({
      chosens:"chosens",
      userRole:"userRole"
    }),
    advChosen(){
        return _.find(this.chosens, { name:'adv' });
    },
    geoChosen(){
        return _.find(this.chosens, { name:'geo' });
    },
    amChosen(){
        return _.find(this.chosens, { name:'am' });
    },
    pmChosen(){
        return _.find(this.chosens, { name:'pm' });
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
    },
    traffic_source(){
        let arr = [];
        //this.individual_offer && arr.push('individual_offer')
        this.sl_utr && arr.push('smart_link')
        this.sl_normal && arr.push('normal_traffic')
        return arr.join(",")
    }
  },
  methods: {
    ...mapActions([
      'getChosen',
      'getUserRole'
    ]),
    changeGroupByHandler(type,lastType,checkModel){
        //重新groupby要清该tab之后的数据
        let delIndex = this.tabOrder.indexOf(lastType)
        if (delIndex != -1 || this.currentReportType =='online'){
            let delArr = this.tabOrder.splice(delIndex+1)
            delArr.forEach((item,index)=>{
                this.listOrder[item] = []
                this.tabIds[item] = []
                this.queryMorePara[item] = {}
                this.orgReportData[item] = {}
                this.orgReportData[item].flag = true
                if (item == 'publisher_app_id'){
                    this.publisher_app_id = false
                }
                else if (item == 'offer_id'){
                    this.individual_offer = false
                }
                else if (item == 'aff_id'){
                    this.affiliate_id = false
                }
            })
        }
        if (this.currentReportType=='online'){
            this.tabQuene = []
        }
        else {
            let queneIndex = this.tabQuene.indexOf(this.currentReportType)
            if (queneIndex != -1) this.tabQuene.splice(queneIndex)
        }

        this.isGroupby = true //submit触发还是group by触发,是否修改请求字段
        this.tabOrder.push(type)
        
        this.currentReportType = type
        if (type == 'publisher_app_id'){
            this.publisher_app_id= true
        }
        if (type == 'offer_id'){
            this.individual_offer = true
        }
        if (type == 'aff_id'){
            this.affiliate_id = true
        }
        this.tabQuene.push(lastType)
        this.listOrder[type] = _.cloneDeep(this.tabQuene)
        let ids = []
        for(let item of checkModel){
            ids.push(item.id)
        }
        this.tabIds[lastType] = ids

        if (lastType=='advertiser_id'){
            let adv_id = []
            checkModel.forEach((item) =>{
                adv_id.push(item.id)
            })
            this.adv_id = checkModel.length == 0 ?  "all" : adv_id.join(',')
        }
        if (lastType == 'aff_id'){
            this.$refs.affMultiDom.setValue(checkModel)
        }
        if (lastType == 'offer_id'){
            this.$refs.offerMultiDom.setValue(checkModel)
        }
        if (lastType == 'publisher_app_id'){
            this.$refs.appMultiDom.setValue(checkModel)
        }
        this.groupByRender()
    },
    groupByRender(){
        this.validateForm()
        if (this.advertiser_id==1){
            let advDom = $("select[name='filters[advertiser_id][]']")
            advDom.val(this.adv_id.split(','))
            advDom.trigger('chosen:updated')
        }
        this.$nextTick(function(){
            this.getOnlineReport()
        })
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
    convertSortKey(_key, convert_arr) {
        return convert_arr[_key] || _key
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
        let sortObj = {}
        sortObj['sort['+ this.report_sort.name+']'] = this.report_sort.value
        this.$set(this.orgReportData, this.currentReportType, {})
        this.orgReportData[this.currentReportType].flag = true
        this.getOnlineReport(sortObj)
        //this.submitForm("", "",true)

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
                    this.showAlert(response.body.msg, 'info')

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

        Vue.http.get('Report/getJobOfflineReportList?type=manage_general&limit='+ (limit || this.currentOfflineLimit) +'&page='+ (page || this.currentOfflinePage) ).then(response => {
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

    scheduleOfflineTableRefresh(){
        this.loadingZone = true
        Vue.http.get('Report/getJobOfflineReportList?page=1&limit=20&type=quality_offline_scheduled_report' ).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg)

                return;
            }
            this.renderScheduleOfflineTable(response.body.data);
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

                this.showAlert(response.body.msg,'info')

                return;
            }
            this.offlineTableData[index].splice(2,1,"cancelled")

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    //判断是否弹窗引导进入离线报表
    decideOfflineNew(){
        return  !! $("#advanced_options_content [type='checkbox']:checked").length
    },
    validateForm(){
        if(!this.dateChecked) {
            this.showAlert("Please select a time range of not more than one month",'info')
            return;
        }
        var $checkbox = $("#stat_chk_box input[type='checkbox']:checked,#calcus_chk_box input[type='checkbox']:checked")
        if ($checkbox.length == 0) {
            this.showAlert("Please select at least one item in Tracking Statistics or Data Calculations to get the result",'info')
            return;
        }
    },
    submitForm ($event, isOffline, isSort){
        this.validateForm()
        if(this.decideOfflineNew() || isOffline){
            this.export_report_disabled = false;
            this.currentReportType = "offline"
            this.getOfflineReport();
            this.$ga && this.$ga.event('report', 'report', 'exportreport')
        }else{
            this.$ga && this.$ga.event('report', 'report', 'runreport')

            this.orgReportData = {
                offer_id:{flag: true},
                aff_id:{flag: true},
                publisher_app_id:{flag: true},
                online:{flag: true}
            },
            this.tabIds = {}
            this.listOrder = {}
            this.tabQuene = []
            this.tabOrder = []
            this.currentReportType = "online"
            if(!isSort) this.report_sort = {name:"",value:""}
            this.$nextTick(function(){
                this.getOnlineReport()
            })
        }
    },
    renderChart(data){
        this.chartData = data
    },
    getMoreReportData(page){
        this.getOnlineReport(page)
    },
    getOnlineReport(para){
        this.noRecord = ''
        let param = para ? Object.assign(this.queryMorePara[this.currentReportType], para) : $(this.$refs.form_report).getFormQuery()
        
        if (this.isGroupby) {
            //请求需要adv_id字段
            let tmpArr = []
            this.tabQuene.forEach((item)=>{
                tmpArr.push(item=='advertiser_id' ? 'adv_id' : (item=='publisher_app_id' ? 'app_id' : item))
            })
            Object.assign(param,{ungroup: tmpArr.join(',')})
        }
        this.isGroupby = false
        if (param['filters[traffic_source]'] === undefined){
            this.showAlert('Tracking Source can not be empty!', 'info')
            return
        }
        this.loadingZone = true
        Vue.http.post('Report/adminReport', param).then(response => {
            this.loadingZone = ""
            this.url_auto_sub = false
            let somedata = response.body.data;
            if(!response.body.data){
                this.showAlert(response.body.msg, 'info')
                if (response.body.format_msg && response.body.format_msg.code && response.body.format_msg.code.includes("YM_10050")) {
                    //YM_10050代表没有数据
                    this.noRecord = response.body.msg
                }
                somedata = {}
            }

            if (Object.keys(this.tabMap).includes(this.currentReportType) || this.currentReportType == "online"){
                this.$set(this.orgReportData, this.currentReportType, somedata)
                this.orgReportData[this.currentReportType]['render'] = true
            }
            if (para == undefined){
                this.queryMorePara[this.currentReportType] = param
            }
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
    changeAggregationFilters(action, name){
        switch(action){
            case "add":
                this.aggregation_filters.indexOf(name)  === -1 && this.aggregation_filters.push(name)
                break;
            case "remove":
                this.aggregation_filters = _.filter(this.aggregation_filters, function(o){ return o !== name})
                break;
        }
    },
    hideModal:function() {
      this.modalState = "hide"
    },
    runShortCutReport(msg){
        $(this.$refs.form_report).find("[type=checkbox]:visible").each(function(){$(this).prop("checked", true).click()});
        this.is_trigger_shotcut = msg;
        switch(msg){
            case "aff_summary_report":
                this.aff_summary_report = true
                break;
            case "aff_hourly_report":
                this.aff_hourly_report = true
                break;
            case "aff_daily_report":
                this.aff_daily_report = true
                break;
            case "aff_by_offer_report":
                this.aff_by_offer_report = true
                break;
        }
        this.cal_day = true;
        $(this.$refs.form_report).find(".icon-chevron-up:not(.hide)").trigger('click');
        this.setCheckedDom()
        this.submitForm()
    },
    setCheckedDom(){
        let that = this;
        $.each(this.short_cut_options[this.is_trigger_shotcut], function(i, v){
            $(that.$refs.form_report).find('[data-name="'+v+'"]').prop("checked", true)
        })
    },
    getReportExportAccess(){
        Vue.http.get('Report/getExportReportAccess').then(response => {

            // get body data
            if(!response.body.data){

                this.showAlert(response.body.msg,'info')

                return;
            }
            this.isAccessExportReport = response.body.data.is_access 

        }, response => {
            // error callback
            this.showAlert(response.body.msg)

        })
    },
    afterRender(){
        if (!this.url_auto_sub){
            return
        }
        if (this.am_tmp==1){
            let amDom = $("select[name='filters[advertiser_manager_id][]']")
            amDom.val(this.am_id.split(','))
            amDom.trigger('chosen:updated')
        }
        if (this.pm_tmp==1){
            let pmDom = $("select[name='filters[affiliate_manager_id][]']")
            pmDom.val(this.pm_id.split(','))
            pmDom.trigger('chosen:updated')
        }
        if (this.advertiser_id_tmp==1){
            let advDom = $("select[name='filters[advertiser_id][]']")
            advDom.val(this.adv_id.split(','))
            advDom.trigger('chosen:updated')
            
        }
        if (this.country_tmp==1){
            let countryDom = $("select[name='filters[country][]']")
            countryDom.val(this.geo_id.split(','))
            countryDom.trigger('chosen:updated')
        }

        if (this.am_tmp==1 || this.pm_tmp==1 || this.advertiser_id_tmp==1 || this.country_tmp==1){
            if (this.report_sort.name == 'profit' && this.report_sort.value == -1){
                this.submitForm("","",1)
            }
            else {
                this.submitForm()
            }
        }
    },
    getUrlQuery(){
        let that = this
        const queryObj = this.$route.query
        if (JSON.stringify(queryObj) == "{}"){
            return
        }
        else {
            this.url_auto_sub = true
            this.sl_utr = true
        }
        
        let {advertiser_id,adv_id,offer_id,aff_id,am_id,pm_id,geo_id,am,pm,country,profit,startDate,endDate,raw_data,interval_day} = queryObj
        this.advertiser_id_tmp = advertiser_id
        this.raw_data = raw_data
        this.interval_day = interval_day
        this.am_tmp = am
        this.pm_tmp = pm
        if (adv_id){
            this.adv_id = adv_id
            this.advertiser_id_tmp = true
        }
        if (am_id){
            this.am_id = am_id
        }
        if (pm_id){
            this.pm_id = pm_id
        }
        if (geo_id){
            this.geo_id =geo_id
        }
        if (offer_id){
            this.individual_offer = true
            this.offer_id = offer_id == "all" ?  "" : offer_id
        }
        if (aff_id){
            this.affiliate_id = true
            this.aff_id = aff_id == "all" ?  "" : aff_id
        }
        
        if (profit){
            this.report_sort.name = "profit"
            this.report_sort.value = profit
        }

        this.startDate = startDate
        this.endDate = endDate
        this.country_tmp = country

        if (this.am_tmp==1 || this.pm_tmp==1 || this.advertiser_id_tmp==1 || this.country_tmp==1){
            console.log('wait callback afterRender')
        }
        else {
            if (profit){
                that.submitForm("","",1)
            }
            else {
                that.submitForm()
            }
        }
    }
  },
  created () {
    console.log("report page!!")
    this.getChosen()
    this.getReportExportAccess()
    this.getUserRole()
  },
  mounted () {
    this.getUrlQuery()
  }
}
</script>
<style lang="less">
#default_report{
    .noRecord{
    border-top: 0;
    padding: 20px 0;
    height: auto;
    }
    .table thead tr th{
        text-indent: 0px;
    }
    #chartTab{
        display: flex;
        justify-content: space-between;
        .nav-tabs{
            width:100%
        }
        .rightTab{
            float:right;
        }
    }
}

</style>
