
<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li><router-link to="./p_offers">Offers</router-link></li>
            <li class="active">Create Offer</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header"  v-box-action-resize>
            <h2>Create Offer</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <form class="form-horizontal frm-entity" id="cc_add" ref="cc_add" @submit.stop.prevent="submitForm">
                <div class="box-sub-header" v-box-action-resize>
                    <h3>Basic <small class="required">Basic offer details, required</small></h3>
                    <div class="box-action">
                        <i class="icon-chevron-up" title="Fold"></i>
                        <i class="icon-chevron-down hide" title="Unfold"></i>
                    </div>
                </div>
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <div class="box-content">
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="offerType">Offer Type<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select class=" form-control col-md-4" name="offer_type" id="offerType" fef-change="changeSelect" v-model="offer_type" @change="onChangeType">
                                <option data-target=".a1" data-target-base="a" data-name="app_download" value="app_download">APP Download</option>
                                <option data-target=".a2" data-target-base="a" data-name="mobile_content" value="mobile_content">Mobile Content</option>
                                <option data-target=".a3" data-target-base="a" data-name="cps" value="cps">CPS</option>
                                <option data-target=".a4" data-target-base="a" data-name="cpe" value="cpe">CPE</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="advertiser_id">Advertiser<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <chosen_container_offer class="mr10" :placeholder="option0" :option0="option0" :chosenInfo="sourceAdv" :chosenCallback="chosenCallback" :renderOffer="sourceAdv" :chosenName="'advertiser_id'" :defaultVal="defaultAdv" ref="advertiser_id" id="advertiser_id" :chosen_container_class="chosen_container_class"></chosen_container_offer>
                            <router-link to="p_create_adv?from=offer" id="create_adv_btn_clicked" class="btn " target="_blank">Create Advertiser</router-link>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="name">Offer Name<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input class="col-md-6" name="name" id="name" maxlength="500" type="text" v-model.trim="name" />
                        </div>
                    </div>

                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="description">Description</label>
                        <div class="controls col-md-10 nopadding description">
                            <ckeditor :descriptions="description"></ckeditor>
                        </div>
                    </div>

                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="offer_url">Offer URL<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input class="col-md-8 form-control" name="offer_url" id="offer_url" type="text" required v-model.trim="offer_url" />
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="is_s2s_notify">Check Redirect Pattern</label>
                        <div class="controls">
                            <label class="checkbox-inline">
                                <input type="checkbox" data-checkboxAsInput='1' name="is_s2s_notify" id="is_s2s_notify" :value="is_s2s_notify ? 1 : 0" v-model="is_s2s_notify"/> S2S Async
                            </label>
                        </div>
                    </div>
                    <div :class="'control-group form-group field-required ' + (is_s2s_notify ? '' : 'hide')" id="notify_url_div">
                        <label class="control-label col-md-2" for="notify_url">Notification URL</label>
                        <div class="controls">
                            <input class="col-md-8 form-control" id="notify_url" v-model.trim="notify_url" :required="is_s2s_notify ? true : false" type="text" :name="is_s2s_notify ? 'notify_url' : ''"/>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="preview_url">Preview Link<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <input class="col-md-8 form-control" name="preview_url" id="preview_url" type="text" required @focus="setInitVal" v-model.trim="preview_url" />
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="conversion_tracking">Conversion Tracking<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select class=" form-control col-md-3" id="conversion_tracking" readonly="readonly">
                                <option selected="selected" value="Server Postback w/ Transaction ID">Server Postback w/ Transaction ID</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="tracking_system">Tracking System<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select name="tracking_system" class="col-md-3" id="tracking_system" @change="change_tracking_system">
                                <option value="" selected="selected"></option>
                                <option value="Adjust" :selected="tracking_system === 'Adjust' ? true: false">Adjust</option>
                                <option value="Appsflyer" :selected="tracking_system === 'Appsflyer' ? true: false">Appsflyer</option>
                                <option value="MAT" :selected="tracking_system === 'MAT' ? true: false">MAT</option>
                                <option :value="otherTracking ? otherTracking: ''" :selected="trackingSystemSelectedIndex == 4 || otherTracking ? true: false" data-name="other">Other 3rd Party System</option>
                                <option value="Self-Tracking" :selected="tracking_system === 'Self-Tracking' ? true: false">Self-Tracking</option>
                            </select>
                            <span class="other"></span>
                            <input class="form-control col-md-4" v-show="trackingSystemSelectedIndex == 4 || otherTracking" id="otherTracking" type="text"  v-model.trim="otherTracking" />
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="status">Status<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select class=" form-control col-md-2" name="status" id="status" v-model="status">
                                <option value="active">Active</option>
                                <option value="pending" selected="selected">Pending</option>
                                <option value="paused">Paused</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="adv_identifier">Adv Identifier<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select class=" form-control col-md-2" name="adv_identifier" id="adv_identifier" v-model="adv_identifier">
                                <option value="" selected="selected">empty</option>
                                <option value="googleAdvId">gaid</option>
                                <option value="idfa">idfa</option>
                            </select>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="expiration_date">Expiration Date<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <!-- <dateTimePicker :startDate="calcu_expiration_date()" :name="'expiration_date'"></dateTimePicker> -->
                            <date-picker-single :defaultDate.sync="calcu_expiration_date" :name="'expiration_date'"></date-picker-single>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="category">Category<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <select2_mutiple :renderOffer="sourceCategories" :placeholder="'- Categories -'" :selectName="'category_ids[]'" :id="'category'" :multiple="true" :defaultVal="category_ids" :selectInfo="sourceCategories" :callBack="callBackCategory"></select2_mutiple>
                            <span class="help-block">Type category name to filter.</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="note">Note</label>
                        <div class="controls">
                            <textarea class="col-md-6" rows="5" name="note" id="note" v-model="note"></textarea>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="is_private">Permission<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <common-switch
                                id="is_private"
                                :updateState="false"
                                :default_val="is_private"
                                :switch_param='"is_private"'
                                :yes_text="'Private'" 
                                :no_text="'Public'"
                                :onChange="switchCallBack"
                            />
                        </div>
                    </div>
                    <div :class="'control-group form-group ' +　(is_private == 1 ? 'hide': '')" id="require_approval_div">
                        <label class="control-label col-md-2" for="is_require_approval">Require Approval</label>
                        <div class="controls">
                            <common-switch
                                id="is_require_approval"
                                :updateState="false"
                                :default_val="is_require_approval"
                                :switch_param='"is_require_approval"'
                                :onChange="switchCallBack"
                            />
                        </div>
                    </div>
                    <div class="control-group form-group" v-show="is_require_approval == 1 && is_private == 0"　id="app_questions">
                        <label class="control-label col-md-2" for="">Application Questions</label>
                        <application-questions :defaultQuestions="app_questions" :renderOffer="app_questions || show_app_questions" :removeCallback="removeCallback" :is_require_approval="is_require_approval" :is_private="is_private" :classList="'col-md-offset-2 clearfix'" :required="is_require_approval == 1 && is_private == 0 ? true: false"></application-questions>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="">Allow Traffic<i class="icon-exclamation red"></i><br><span class="info">(Check "√" for Allowed Traffic "x" for Restricted Traffic)</span></label>
                        <div class="controls a1  col-md-10 nopadding" data-base="a">
                            <allowed-traffic :type="offer_type" :defaulVal="traffic_ids" :from="from" :renderOffer="sourceTraffics" :source="sourceTraffics"></allowed-traffic>
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="is_exclusive">Exclusive<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <common-switch
                                id="is_exclusive"
                                :updateState="false"
                                :default_val="is_exclusive"
                                :switch_param='"is_exclusive"'
                                :onChange="switchCallBack"
                            />
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                        <label class="control-label col-md-2" for="is_incentive">Incentive<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <common-switch
                                id="is_incentive"
                                :updateState="false"
                                :default_val="is_incentive"
                                :switch_param='"is_incentive"'
                                :onChange="switchCallBack"
                            />
                        </div>
                    </div>
                    <div class="control-group form-group field-required">
                       <!--  "conversion_flow['" + name_conversion_flow + "']" -->
                        <label class="control-label col-md-2 pt0" for="">Conversion Flow<i class="icon-exclamation red"></i>
                            <br><span class="info">(Lead Flow)</span>
                        </label>
                        <div class="controls">
                            <conversionFlow :type="offer_type" :defaultConversionFlow="conversionFlowId" :chosen="sourceConversionFlow" :renderOffer="sourceConversionFlow" :changeCallback="selectCallback"></conversionFlow>
                        </div>
                        <div class="controls">
                            <textarea v-model="conversion_flow_description" class=" col-md-6 mt20" rows="5" name="" id="conversion_flow_desc" maxlength="1000" placeholder="Write detailed Conversion Flow Description here"></textarea>
                        </div>
                    </div>
                </div>
               <div class="box-sub-header"  v-box-action-resize>
                   <h3>Payment <small>Offer payment settings, can be left blank at first</small></h3>
                   <div class="box-action">
                       <i class="icon-chevron-up" title="Fold"></i>
                       <i class="icon-chevron-down hide" title="Unfold"></i>
                   </div>
               </div>
               <div class="box-content" id="payment">
                   <div class="a4" v-if="offer_type == 'cpe'" data-base="a">
                       <div class="control-group form-group field-required">
                           <label class="control-label col-md-2" for="payment_event">Payment Event<i class="icon-exclamation red"></i></label>
                           <div class="controls">
                               <input class="col-md-6" data-control-name="payment_event" id="payment_event"  name="payment_event" maxlength="30" type="text" v-model="payment_event" />
                           </div>
                       </div>
                   </div>
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="revenue_type">Revenue Type</label>
                       <div class="controls">
                           <select id="revenue_type" name="revenue_type" class="col-md-2" readonly="readonly">
                               <option selected="selected" value="cpa_flat">Revenue per Conversion (RPA)</option>
                           </select>
                       </div>
                   </div>
                   <div class="control-group form-group field-required">
                       <label class="control-label col-md-2" for="is_dynamic_revenue">Dynamic Revenue<i class="icon-exclamation red"></i></label>
                       <div class="controls">
                            <common-switch
                                id="is_dynamic_revenue"
                                :updateState="false"
                                :default_val="is_dynamic_revenue"
                                :switch_param='"is_dynamic_revenue"'
                                :onChange="switchCallBack"
                            />
                       </div>
                   </div>
                   <div class="control-group form-group field-required" v-show="offer_type != 'cps'" id="revenue_per_conversion_box">
                       <label class="control-label col-md-2" for="revenue_per_conversion">Revenue per Conversion<i class="icon-exclamation red"></i></label>
                       <div class="controls">
                           <div class="input-group">
                               <!-- <select name="currency" id="currency" class="col-md-2" v-model="currency">
                                   <option value="USD" :selected="currency === 'USD'">USD ($)</option>
                                   <option value="EUR" :selected="currency === 'EUR'">EUR (€)</option>
                                   <option value="GBP" :selected="currency === 'GBP'">GBP (￡)</option>
                               </select> -->
                               <span class="input-group-addon">$</span>
                               <input class="col-md-1 form-control" name="revenue_per_conversion" id="revenue_per_conversion" maxlength="200" type="text" value="0.00" v-model.number.trim="revenue_per_conversion" required/>
                           </div>
                       </div>
                   </div>
                   <!-- <div :class="'control-group form-group field-required ' + (offer_type == 'cps' && is_dynamic_revenue == 0 ? 'show' : 'hide')"id="revenue_per_conversion_box2">
                       <label class="control-label col-md-2" for="cps_revenue_per_conversion">Revenue per Conversion</label>
                       <div class="controls">
                           <div class="input-group">
                               <input class="col-md-1 form-control" name="cps_revenue_per_conversion" id="cps_revenue_per_conversion" maxlength="200" type="text" value="0.00" v-model="cps_revenue_per_conversion"/><span class="input-group-addon">%</span>
                           </div>
                           <span>of order amount</span>
                       </div>
                   </div> -->
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="payout_type">Payout Type</label>
                       <div class="controls">
                           <select id="payout_type" name="payout_type" class="col-md-2" readonly="readonly">
                               <option selected="selected" value="cpa_flat">Cost per Conversion (CPA)</option>
                           </select>
                       </div>
                   </div>
                   <div class="control-group form-group field-required" id="static_payout_box" v-if="offer_type != 'cps' && is_dynamic_revenue == 0">
                       <label class="control-label col-md-2" for="payout_per_conversion">Payout per Conversion<i class="icon-exclamation red"></i></label>
                       <div class="controls">
                           <div class="input-group">
                               <span class="input-group-addon">$</span>
                               <input class="col-md-1 form-control" name="payout_per_conversion" id="payout_per_conversion" maxlength="200" type="text"  v-model.trim.number="payout_per_conversion" required="true"/>
                           </div>
                       </div>
                   </div>
                   <div :class="'control-group form-group field-required ' +  (offer_type != 'cps' && is_dynamic_revenue == 0 ? 'hide' : 'hide')" id="static_payout_box2">
                       <label class="control-label col-md-2" for="cps_payout_per_conversion">Payout per Conversion<i class="icon-exclamation red"></i></label>
                       <div class="controls">
                           <div class="input-group">
                               <input class="col-md-1 form-control" name="cps_payout_per_conversion" id="cps_payout_per_conversion" maxlength="200" type="text" v-model.trim="cps_payout_per_conversion" />
                               <span class="input-group-addon">%</span>
                           </div>
                           <span>of order amount</span>
                       </div>
                    </div>
                    <div class="control-group field-required" v-if="is_dynamic_revenue == 1" id="dynamic_payout_box">
                        <label class="control-label col-md-2" for="dynamic_payout">Payout per Conversion<i class="icon-exclamation red"></i></label>
                        <div class="controls">
                            <div class="input-append">
                                <input class="col-md-2 form-control" name="dynamic_revenue_value" id="" type="number" value="0" min="0" v-model.trim="dynamic_payout_default" required>
                                <span class="add-on">% of dynamic revenue</span>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group nest-clone cloneya-wrap" v-if="offer_type == 'cps'" id="multiple_events_box">
                        <mutiplle_events :offer_type="offer_type" :showSubmit="false" :renderOffer="offer_type == 'cps'"  :showAlert='showAlert' :default_dynamic_revenue="is_dynamic_revenue"></mutiplle_events>
                    </div>
               </div>
               <div class="box-sub-header" v-show="offer_type != 'cps'" id="caps_header" v-box-action-resize >
                   <h3>Caps <small>Left blank if not needed</small></h3>
                   <div class="box-action">
                       <i class="icon-chevron-up hide" title="Fold"></i>
                       <i class="icon-chevron-down" title="Unfold"></i>
                   </div>
               </div>
               <div class="box-content" v-show="offer_type != 'cps'" id="caps_content">
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="is_caps">Caps</label>
                       <div class="controls">
                            <common-switch
                                id="is_caps"
                                :updateState="false"
                                :default_val="is_caps"
                                :switch_param='"is_caps"'
                                :onChange="switchCallBack"
                            />
                       </div>
                   </div>
                   <div id="cap_fields" v-if="is_caps == 1">
                       <!-- cap fields -->
                        <div id="cap_fields_outter">
                            <div class="cap-fields-inner">
                                <table width="100%">
                                    <tr>
                                        <td>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="daily_conversions">Daily Conversions</label>
                                                <div class="col-md-8">
                                                    <input v-model="daily_conversions" class="span2 form-control" name="daily_conversions" id="daily_conversions" maxlength="20" type="text" value="0" />
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="daily_payout">Daily Payout</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">$</span><input class="span2 form-control" name="daily_payout" id="daily_payout" maxlength="20" type="text" value="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="daily_revenue">Daily Revenue</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">{{currency}}</span><input class="span2 form-control" name="daily_revenue" id="daily_revenue" maxlength="20" type="text" value="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="daily_alarm">Daily Alarm</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <input class="span1" name="daily_alarm" id="daily_alarm" type="number" value="0"
                                                        :disabled="daily_conversions == 0" @blur="check_daily_alarm"/>
                                                        <span class="input-group-addon">%</span>
                                                    </div>
                                                    <span class = 'caps-span'>(e.g. 10,20,30...)</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="monthly_conversions">Monthly Conversions</label>
                                                <div class="col-md-8">
                                                    <input class="span2 form-control" name="monthly_conversions" id="monthly_conversions" maxlength="20" type="text" value="0" v-model="monthly_conversions" />
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="monthly_payout">Monthly Payout</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">$</span><input class="span2 form-control" name="monthly_payout" id="monthly_payout" maxlength="20" type="text" value="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="monthly_revenue">Monthly Revenue</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <span class="input-group-addon">{{currency}}</span><input class="span2 form-control" name="monthly_revenue" id="monthly_revenue" maxlength="20" type="text" value="0.00" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="control-group form-group">
                                                <label class="control-label col-md-4" for="monthly_alarm">Monthly Alarm</label>
                                                <div class="col-md-8">
                                                    <div class="input-group">
                                                        <input :disabled="monthly_conversions == 0" @blur="check_monthly_alarm" class="span1" name="monthly_alarm" id="monthly_alarm" type="number" value="0"
                                                        v-model="monthly_alarm" />
                                                        <span class="input-group-addon">%</span>
                                                    </div>
                                                    <span class = 'caps-span'>(e.g. 10,20,30...)</span>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-2">Redirect</label>
                                    <CreateOfferSelect2RedirectOffer></CreateOfferSelect2RedirectOffer>
                                </div>
                            </div>
                        </div>
                   </div>
               </div>
               <div class="box-sub-header"   v-box-action-resize>
                   <h3>Targeting <small>Left blank if not needed</small></h3>
                   <div class="box-action">
                       <i class="icon-chevron-up hide" title="Fold"></i>
                       <i class="icon-chevron-down" title="Unfold"></i>
                   </div>
               </div>
               <div class="box-content hide box-content-country">
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="country">Geo Targeting</label>
                        <div class="controls country_controls" v-if="from">
                            <editable_select2_offer :source="sourceCounries" :offer_name="'country'" :offer_val="geo_country_ids" :renderOffer="true" :onfocus="onfocus" :type="'geo_city'" id="geo_country_ids" :init="'initClick'" :editable_send="'always'" v-if="dynamic_geo_render "  :onSelectChange="callBackGeoTargeting"  ></editable_select2_offer>
                        </div>
                        <div class="controls country_controls" v-else>
                            <editable_select2_offer :source="sourceCounries" :offer_name="'country'" :offer_val="geo_country_ids" :renderOffer="renderGeoTargeting" :onfocus="onfocus" :type="'geo_city'" id="geo_country_ids" :init="'initClick'" :editable_send="'always'" :onSelectChange="callBackGeoTargeting"></editable_select2_offer>
                        </div>
                   </div>
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="is_geo_targeting">Enforce Geo Targeting</label>
                       <div class="controls">
                            <common-switch
                                id="is_geo_targeting_top"
                                :updateState="false"
                                :default_val="is_geo_targeting"
                                :switch_param='"is_geo_targeting"'
                                :disabled="is_enforce_geo_targeting"
                                :onChange="switchCallBack"
                                :setOffWhenDisabled="true"
                            />
                       </div>
                   </div>
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="device">Platform Targeting</label>
                       <div class="controls">
                            <select2_mutiple :option0="'All'"  :renderOffer="renderOffer" :placeholder="'- Platform -'" :selectName="'device_names[]'" :id="'device'" :multiple="true"  :defaultVal="devices" :selectInfo="sourcePlatforms" :callBack="callBackPlatformTargeting"></select2_mutiple>
                           <span class="help-block">Type Platform name to filter.</span>
                       </div>
                   </div>
                   <div class="control-group form-group">
                       <label class="control-label col-md-2" for="is_device_targeting">Enforce Platform Targeting</label>
                       <div class="controls">
                            <common-switch
                                id="is_device_targeting_top"
                                :updateState="false"
                                :default_val="is_device_targeting"
                                :switch_param='"is_device_targeting"'
                                :disabled="is_enforce_device_targeting"
                                :onChange="switchCallBack"
                                :setOffWhenDisabled="true"
                            />
                       </div>
                   </div>
               </div>
               <div class="box-sub-header"  v-box-action-resize>
                   <h3>Tracking</h3>
                   <div class="box-action">
                       <i class="icon-chevron-up hide" title="Fold"></i>
                       <i class="icon-chevron-down" title="Unfold"></i>
                   </div>
               </div>
               <div class="box-content hide">
                   <div class="control-group form-group">
                       <label class="control-label col-md-2">Advertiser Conversion White List</label>
                       <div class="controls">
                            <div id="adv_white_list">
                                <span v-for="i in advertiser_white_ip">{{ i }}<br /></span>
                            </div>
                       </div>
                   </div>
                   <div class="control-group form-group">
                       <label class="control-label col-md-2">Offer Conversion White List</label>
                       <div class="controls">
                            <!-- <offerConversionWhiteList :showAlert="showAlert" :successCallback="successCallback"></offerConversionWhiteList> -->
                            <conversion-white-list
                                :showAlert="showAlert" 
                                :successCallback="successCallback"
                            ></conversion-white-list>
                       </div>
                   </div>
               </div>
               <div class="box-sub-header"  v-box-action-resize>
                   <h3>Certificate</h3>
                   <div class="box-action">
                       <i class="icon-chevron-up hide" title="Fold"></i>
                       <i class="icon-chevron-down" title="Unfold"></i>
                   </div>
               </div>
               <div class="box-content form-horizontal frm-entity frm-detail hide" id="creative_filesC">
                    <!-- <creativeCertificate :showAlert="showAlert" :fileInfo="fileInfoC" :render="render" :del_file="del_file"  :onUploadFileChange="file_change" :chosenCallback="creativeFilesChosenCallback" :btnName="'Upload Certificate'" :isWriteable="true"></creativeCertificate> -->
                    <creative-certificate 
                        :showAlert="showAlert" 
                        :fileInfo="fileInfoC" 
                        :render="render" 
                        :del_file="del_file"  
                        :onUploadFileChange="file_change"
                        :chosenCallback="creativeFilesChosenCallback" 
                        :btnName="'Upload Certificate'" 
                        :isWriteable="true"
                    ></creative-certificate>
                </div>

               <div class="box-sub-header"  v-box-action-resize>
                   <h3>Creative Files</h3>
                   <div class="box-action">
                       <i class="icon-chevron-up hide" title="Fold"></i>
                       <i class="icon-chevron-down" title="Unfold"></i>
                   </div>
               </div>

            <div class="box-content form-horizontal frm-entity frm-detail hide" id="creative_files">
                <!-- <creativeFiles :showAlert="showAlert" :fileInfo="fileInfo" :render="render" :del_file="del_file"  :multiple="'multiple'"  :onUploadFileChange="file_change" :chosenCallback="creativeFilesChosenCallback" :btnName="'Upload File'"></creativeFiles> -->
                <creative-files 
                    :showAlert="showAlert" 
                    :fileInfo="fileInfo" 
                    :render="render" 
                    :del_file="del_file"  
                    :multiple="'multiple'"  
                    :onUploadFileChange="file_change" 
                    :chosenCallback="creativeFilesChosenCallback" 
                    :btnName="'Upload File'"
                ></creative-files>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn btn-primary create_back_btn" @click="setSubmitType('create_back_btn')">Create</button>
                <button type="submit" class="btn btn-primary create_add_details" @click="setSubmitType('create_add_details')">Create & Add Details</button>
                <button type="submit" class="btn btn-primary create_and_another" @click="setSubmitType('create_and_another')">Create & Add Another</button>
                <a class="btn pull-right btn-default" href="p_create_offer">Cancel</a>
            </div>

            <!-- hidden inputs-->
            <input type="hidden" name="currency" value="USD" />
            <input type='hidden' name="offer_white_ip" :value="new_ips.join(',')" />
            <input type='hidden' name="tracking_domain" :value="tracking_domain" />
            <input type='hidden' name="country_ids[]" :value="country_ids.join(',')" />
            <input type="hidden"  :name="'conversion_flow[\'' + conversionFlowId + '\']'"  :value="conversion_flow_description">
        </form>
        </div>
    </div>

    <chooseCitysModal :modalState="modalState" :hideModal="hideModal" :source="geoCountryList" :states="sourceGeoState" :renderOffer="renderGeoTargeting && renderDeviceModels" :title="countryTitles" :modalType="'geoTargeing'" :btnName="btnName"  :classList="'col-md-2 control-label'"></chooseCitysModal>

    <!-- <winWndModal :modalState="winWndModalState" :hideModal="hideModal" :formSubmit="hideModal"></winWndModal> -->
    <modal :dialogVisible.sync="winWndModalState" :classList="'red'" :title="'Warning'" :dialogBody="defaultModalBody"></modal>

    <!-- <virusScanningModal :modalState.sync="virusScanningModal" :hideModal="hideModal" :riskRate="risk_rate" :setTrackingDomain="set_tracking_domain"></virusScanningModal> -->
    <virus-scanning-modal
        :modalState.sync="virusScanningModal"
        :riskRate="risk_rate" 
        :setTrackingDomain="set_tracking_domain"
        :dialogName="'modalState'"
    ></virus-scanning-modal>

</div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixin_alert_msg from '@/mixins/alert_msg'
import ckeditor from '@/components/Ckeditor.vue'
//import dateTimePicker from '@/components/DateTimePicker.vue'
const DatePickerSingle = () => import(
/* webpackChunkName: "DatePickerSingle" */ '@/components/common/date-picker-single/'
);
import conversionFlow from '@/components/ConversionFlow.vue'
import CreateOfferSelect2RedirectOffer from '@/components/CreateOfferSelect2RedirectOffer.vue'
/*import winWndModal from '@/components/WinWndModal.vue'*/
import category from '@/components/OfferCategory.vue'
import AllowedTraffic from '../components/allowed-traffic/'
//import virusScanningModal from '@/components/VirusScanningModal.vue'
/*import creativeFiles from '@/components/File.vue'*/
import ApplicationQuestions from '../components/application-questions/'
import chosen_container_offer from '@/components/Chosen_Container_Offer.vue'
import select2_mutiple from '@/components/Select2_Mutiple.vue'

import chooseCitysModal from '@/components/Editable_Chosen_Offer_Onfocus.vue'
import editable_select2_offer from '@/components/Editable_Select2_Offer.vue'
//import offerConversionWhiteList from '@/components/OfferConversionWhiteList.vue'
import mutiplle_events from '@/components/MutipleEvents.vue'
import CreativeCertificate from '../components/certificate/'
import common from '@/util/common'
import commonDataAPI from '@/api/commonData'
import config from '@/util/config'
import Vue from 'vue'
const ConversionWhiteList = () => import( /* webpackChunkName: "ConversionWhiteList" */ '@/components/business/conversion-white-list/');
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
const CreativeFiles = () => import(
/* webpackChunkName: "CreativeFiles" */ '../components/creative-files/'
);
const VirusScanningModal = () => import(
/* webpackChunkName: "VirusScanningModal" */ '../components/virus-scanning-modal/'
);

var EventProxy = require('eventproxy');
let ep = new EventProxy()


export default {
    data() {
        return {
            defaultModalBody:'Payout is more than revenue',
            loadingZone: false,
            risk_rate:'',
            alertPop:"hide",
            alertMsg:"",
            alertType: 'info',
            offer_url:'',
            preview_url:'',
            defaultAdv:'',
            description:'',
            traffic_ids:'',
            notify_url:'',
            is_private: 1,
            is_dynamic_revenue: 0,
            is_exclusive :0,
            is_incentive:0,
            is_require_approval:0,
            category_ids:[],
            is_enforce_geo_targeting: true,
            is_enforce_device_targeting:true,
            is_caps:0,
            modalState: 'hide',
            createOfferWhiteIPModalState:'hide',
            winWndModalState: false,
            virusScanningModal: 'hide',
            geo_country_ids: ['all'],
            btn_type:'',
            new_ips: [],
            editVal: [],
            selectedIP:'',
            IPType: 'ip_address',
            offer_file_language: '',
            otherTracking:'',
            trackingSystemSelectedIndex: '',
            advRelatedData: {},
            advertiser_white_ip: [],
            payment_event:'',
            dynamic_payout_default: '',
            GBP_CURRENC: '',
            EUR_CURRENCY: '',
            daily_alarm:'',
            monthly_alarm:0,
            daily_conversions:0,
            monthly_conversions:0,
            daily_alarm_tips:'',
            cur_question_type:'',
            question_type:'',
            app_questions: '',
            boxes: ['box1'],
            from: $.query.get('from'),
            offer_obj:{},
            conversion_flow_description:'',
            submitType:'create_back_btn',
            offer_type: 'app_download',
            name: '',
            description: '',
            is_s2s_notify: false,
            tracking_system:'',
            status:'pending',
            adv_identifier:'',
            note:'',
            revenue_type:'cpa_flat',
            currency:'USD',
            revenue_per_conversion:'0.00',
            cps_revenue_per_conversion:'',
            payout_type:'cpa_flat',
            payout_per_conversion:'0.00',
            cps_payout_per_conversion:'',
            conversionFlowId:1,
            devices:'All',
            tracking_domain:'',
            files:{},
            filesC:{},
            country_ids:[],

            renderOffer:false,
            option0:'- Advertiser -',
            sourceAdv:[],
            sourceCategories:[],
            sourceTraffics:[],
            sourceConversionFlow:[],
            sourceGeoCountry:[],
            sourceGeoState:[],
            sourcePlatforms:[],
            renderGeoTargeting:false,
            renderDeviceModels:true,
            sourceCounries:[],
            geoCountryList:[],
            titles:'',
            countryTitles:{
                title:'Choose City',
                subTitle1:'Country:',
                subTitle2:'Area: ',
                subTitle3:'City:',
            },
            type:'geoTargeing',
            btnName:'Load City',
            data_source_country:'',
            sourceDeviceModels:'',
            show_app_questions:false,
            advertiser_id:'',
            file_id:'',
            fileInfo:[],
            fileInfoC:[],
            render:true,
            fileList:{},
            fileListC:{},
            switch_disable:false,
            category:[],
            GBP_CURRENCY:'',
            EUR_CURRENCY:'',
            dynamic_geo_render:false,
            is_device_targeting:false,
            is_geo_targeting:false,
            expiration_date:"",
            revenue:'0.00',
            chosen_container_class:'display:block',
            isFile:true, //上传凭证时为false
            kpi_settings : [],
            editIndex:-1,
            kpi_name: "cr"
        }
    },
    components: {
        AlertPop,ckeditor,DatePickerSingle,conversionFlow,CreateOfferSelect2RedirectOffer,chooseCitysModal,Modal,category,AllowedTraffic,VirusScanningModal,CreativeFiles,ApplicationQuestions,chosen_container_offer,select2_mutiple,editable_select2_offer,ConversionWhiteList,mutiplle_events,CreativeCertificate,CommonSwitch
    },
    computed: {
        ...mapGetters({
          add_adv:"add_adv",
          cookieHash:"cookieHash",
        }),
        box_len() {
            return this.boxes && this.boxes.length - 1
        },
        calcu_expiration_date () {
            return moment().add(1, 'year').format("YYYY-MM-DD");
        },
    },
    mixins: [mixin_alert_msg],
    watch:{
        devices(newVal, oldVal) {
            this.is_enforce_device_targeting = newVal == 'all' ? true: false
        },
        geo_country_ids(newVal, oldVal) {
            if (newVal) {
                let that = this
                this.getGeoCountryList(function(){
                    that.dynamic_geo_render = true
                })
            }
            this.is_enforce_geo_targeting = newVal == 'all' ? true: false
        },
        is_require_approval(newVal, oldVal) {
            if (newVal) {
                this.getInitQuestions()
            }
        },
        add_adv(newVal, oldVal){
            if(newVal) {
                console.log(newVal)
                newVal.text = newVal.name
                this.sourceAdv.push(newVal)
                
                this.defaultAdv = newVal.id
            }
        },
        renderOffer(newVal,oldVal){
            if(newVal){
                if(this.from) {
                    this.get_offer_obj();
                }

            }
        },
        country_ids(newVal,oldVal) {
            this.is_enforce_geo_targeting = newVal == 'all' ? true: false
        }
    },
    methods: {
        successCallback(ips) {
            this.new_ips = ips
        },
        checkIfDisabled($editable, name) {
            var that = this
            var val = []
            $editable.find(".select2-search-choice").each(function() {
                val.push($(this).data("select2Data").id);
            })
            this[name] = val == 'all' ? true: false
        },
        onSelectChange: function(e, $editable){
            this.checkIfDisabled($editable, 'is_enforce_geo_targeting')
        },
        getExchangeRateFromGBPToUSD() {
            let that = this
            that.$http.get('Invoice/getExchangeRateFromGBPToUSD').then(response => {
                that.GBP_CURRENCY = response && response.body && response.body.data || ''
            }, response => {
                // error callback
            });
        },
        getExchangeRateFromEURToUSD() {
            let that = this
            that.$http.get('Invoice/getExchangeRateFromEURToUSD').then(response => {
                that.EUR_CURRENCY = response && response.body && response.body.data || ''
            }, response => {
                // error callback
            });
        },
        callBackCategory(val) {
            if (!_.isEmpty(val) ) {
                this.category.push(val)
            }
        },
        callBackPlatformTargeting(val) {
            if(typeof(val) === 'undefined') return
            this.is_enforce_device_targeting = !_.isEmpty(val) ? false : true
            if(_.isEmpty(val)){
                this.is_device_targeting = false
            }

        },
        callBackGeoTargeting(e){
            if(typeof(e.val) === 'undefined') return
            this.is_enforce_geo_targeting = !_.isEmpty(e.val) ? false : true
            if(_.isEmpty(e.val)){
                this.is_geo_targeting = false
            }
        },
        setInitVal() {
            let _val_preview = this.preview_url
            if (_.isEmpty(_val_preview)) {
                this.preview_url = this.offer_url
            }
        },
        selectCallback(val) {
            this.conversionFlowId = val
        },
        creativeFilesChosenCallback(v, text) {
            this.offer_file_language = v;
        },
        transfer(path, ext, file) {
            var that = this;
            var md5path = md5(path);
            var fil = {}
            if (!this.isFile){
                that.fileListC[md5path] = file;
            }
            else{
                that.fileList[md5path] = file;
            }
            fil.path = path
            fil.md5path = md5path
            fil.ext = ext
            fil.language = that.offer_file_language
            fil.image = file.type.indexOf('image') == -1 ? '' : path
            fil.size = humanize.filesize(file.size)
            fil.name = file.name
            if (!this.isFile){
                that.fileInfoC.push(fil)
                that.filesC = that.fileListC
            } else {
                that.fileInfo.push(fil);
                that.files = that.fileList
            }
            
        },
        file_change(file,btn) {
            if (btn === 'certificate'){
                this.isFile = false;
            }
            else {
                this.isFile = true;
            }
            var that = this
            var errorInfo = '';
            var acceptExt = 'jpg、jpeg、png、gif、bmp、txt、doc、ppt、pdf、rar、zip、mp4';
            var ext = file.type.split('/')[1];
            var tr = '';
            file.language = that.offer_file_language
            var path = (window.URL && window.URL.createObjectURL(file));
            if (path) {
                that.transfer(path, ext, file);
            } else {
                var reader = new FileReader();
                reader.onload = function(e) {
                    that.transfer(file.name, ext, file);
                }
                reader.readAsDataURL(file);
            }
        },
        del_file(path) {
            let that = this;
            var md5path = path
            that.fileInfo = _.remove(that.fileInfo, function(n) {
                return n.md5path != md5path;
            });
            //为凭证时删除临时文件
            that.fileInfoC = _.remove(that.fileInfoC, function(n) {
                return n.md5path != md5path;
            });
        },
        getInitQuestions(defaultVal) {
            var o = defaultVal || ''
            var that = this
            var questions = false;
            var defaultQA = '{"question":{"0" : ""}, "answer":{"0" : ""}}'
            try {
                questions = JSON.parse(o || defaultQA);
                that.question_type = 3
            } catch (e) {
                console.log('application_questions JSON.parse error, field is not a JSON string.');
            }
            if (questions) {
                that.app_questions = questions
            }
        },
        removeCallback() {
            this.is_require_approval = false;
            this.show_app_questions = false
        },
        switchCallBack(val, param) {
            this[param] = val
        },
        getDevices(devices){
            let that = this
            var data = that.offerInfo
            var data_source = that.getDeviceModels()
            devices.unshift({
                id: 'all',
                device: 'All'
            });
            var source = devices.map(function(c_obj) {

                if (c_obj.id == 'all') return {
                    id: 'all',
                    text: 'All',
                    locked: true
                };
                return {
                    id: c_obj,
                    text: c_obj
                };
            })

            if (!_.isEmpty(data_source) && data_source !== "all") {
                data_source = data_source.split(",")
                data_source.map(function(each) {
                    source.push({
                        id: each,
                        text: each
                    })
                })
            }
            return source
        },
        getGeoCountryList (callback) {
            let that = this
            commonDataAPI.getGeoCountryList(function(countries) {
                var data_source_country = that.geo_country_ids;
                var data_arr = []
                var source_arr = []
                that.all_countries = countries;
                if (!countries) return
                countries.all = 'All'
                var source = _.map(countries, function(value, key) {
                    if (key == 'all') {
                        return {
                            id: 'all',
                            text: 'All',
                            country: "",
                            locked: true
                        };
                    }
                    //case1:all city for one country
                    if (_.indexOf(data_source_country, key) !== -1) {
                        var text = key + " - " + value + " (All)"
                        return {
                            id: key,
                            text: text,
                            country: key
                        }
                    } else {
                        return {
                            id: key,
                            text: value
                        }
                    }
                })
                _.map(countries, function(value, key) {
                    if (key == 'all') {
                        source_arr.push({
                            id: 'all',
                            text: 'All',
                            name:'All',
                            country: "",
                            locked: true
                        })
                    } else {
                        var text = key + ' ' + value
                        source_arr.push({
                            id: key,
                            text: text,
                            name:text,
                            key:text
                        })
                    }
                })
                data_source_country.map(function(each_value) {
                    var temp_arr = each_value.split("_");
                    var temp_arr_len = temp_arr.length;
                    //case2: all city for one state
                    if (temp_arr_len === 2) {
                        var text = temp_arr[0] + " - " + countries[temp_arr[0]] + "(" + temp_arr[1] + ")"
                        data_arr.push({
                            id: each_value,
                            text: text,
                            country: each_value
                        })
                        //case3: specific city for one state
                    } else if (temp_arr_len === 3) {
                        var text = temp_arr[0] + " - " + countries[temp_arr[0]] + "(" + temp_arr[2] + ")"
                        data_arr.push({
                            id: each_value,
                            text: text,
                            country: each_value
                        })
                    }
                })
                that.sourceCounries = source.concat(data_arr);
                that.geoCountryList = source_arr;
                that.renderGeoTargeting = true
                ep.emit("geoCountry", source)
                callback && callback()
            })
        },
        onfocus: function(offer_name) {
            $("#select2-drop").hide();
            $('#420multiselect').empty();
            $('#420multiselect').multiSelect('refresh');
            //this.is_enforce_geo_targeting = false
            this.modalState = "show"
        },
        chosenCallback(v,text){
            let that = this;
            that.$http.get('Advertiser/getById?id=' + v).then(response => {
                var _data = {}
                if (response.body.data && response.body.data.advertiser_white_ip) {
                    _data.advertiser_white_ip = response.body.data.advertiser_white_ip
                } else {
                    _data.advertiser_white_ip = []
                }
                if ('tracking_system' in response.body.data) {
                    var tracking_system = response.body.data.tracking_system 
                    _data.trackingSystem = tracking_system
                }
                that.advertiser_id = v
                that.calcuAdvRelatedData(_data)
            }, response => {
                // error callback
                that.advertiser_id = v
            });
        },
        getCreateParam () {
            _.map($("#cc_add .ivu-switch"),function(item,key){
                if (!$(item).hasClass("ivu-switch-checked")) {
                    $(item).find("input").attr("type","checkbox") 
                } else {
                    $(item).find("input").attr("type","hidden") 
                }
            })
            var query = $(this.$refs.cc_add).getFormQuery()
            if (this.offer_type == 'cps') {
                var events = common.CPS_Offer_multipleEvents_settings.getEventsParams($(this.$refs.cc_add), this.is_dynamic_revenue);
                query.event = events
            }
            delete query.kpis
            return query;

        },
        assignAttrFromSimilarOffer(offer_obj) {
            var o = offer_obj;
            var that = this;
            //$('#offer_id').val(o.id); //what?
            $.each(o, function(i, n) {
                if (i.indexOf('daily_') !== -1 || i.indexOf('monthly_') !== -1) {
                    $('#' + i).val(n);
                    if (i == 'daily_conversions' && n != 0) {
                        that.daily_conversions = n
                    } else if (i == 'monthly_conversions' && n != 0) {
                        that.monthly_conversions = n
                    }
                }
                if (i == 'traffic_ids') {
                    that.traffic_ids = o.traffic_ids
                } else if (i == 'category_ids') {
                    that.category_ids = o.category_ids;
                    that.category = o.category_ids;
                } else if (i == "country") {
                    if (o['country']) {
                        if (_.isEmpty(o['country'][0])) {
                            that.geo_country_ids = ['all']
                        } else {
                            that.geo_country_ids = o.country
                        }
                    } else {
                        that.geo_country_ids = ['all']
                    }
                    that.renderGeo(function() {
                        $("#geo_country_ids").trigger("click")
                        //that.is_enforce_geo_targeting = false
                    })

                } else if (i == 'device_names') {
                    that.devices = _.isEmpty(o.device_names) ? 'All' : o.device_names
                } else if (i.indexOf('is_') !== -1) {
                    that[i] = n
                    /*if (n == 1 ) {
                        $('#' + i).removeAttr("disabled")
                        $('#' + i + '_top').bootstrapSwitch('setState', true);
                        $('#' + i + '_top').bootstrapSwitch('setActive', true);
                    } else {
                        $('#' + i + '_top').bootstrapSwitch('setState', false);
                    }*/
                    if (i == 'is_require_approval') {
                        that.getInitQuestions(o.application_questions);
                    }
                } else if (i == 'status' || i == 'advertiser_id') {
                    if (n && i == 'advertiser_id') {
                        that.defaultAdv = n;
                    }
                } else if (i == 'currency') {
                    that.currency = n
                } else if (i == 'revenue_type' || i == 'payout_type' || i == 'offer_url' || i == 'preview_url' || i == 'device_names') {

                } else {
                        that[i] = n
                }
            })
            that.offer_type = o.offer_type
            that.conversionFlowId = _.find(that.sourceConversionFlow, {name:o.conversion_flow}).id;
            that.conversion_flow_description = o.conversion_flow_description;
            that.name = o.name
            that.description = o.description
            that.is_device_targeting = o.is_device_targeting
            that.is_enforce_device_targeting = !o.is_device_targeting
            that.is_enforce_geo_targeting = !o.is_geo_targeting
            that.is_geo_targeting = o.is_geo_targeting
            that.tracking_system = o.tracking_system;
            that.calcu_tracking_system(o.tracking_system)
        },
        check_monthly_alarm(e) {
            var value = e.target.value,
                that = this;
            if (!value) {
                value = 0
            }
            that.monthly_alarm_tips = '';
            var val = parseInt(value);
            if (isNaN(val) || val != value || val >= 100 || val < 0) {
                that.monthly_alarm_tips = 'Monthly Alarm: positive integer less than 100 only.';
                that.showAlert(that.monthly_alarm_tips, "info")
                $("#monthly_alarm").focus();
                return false;
            } else {
                that.monthly_alarm = val;
            }
        },
        check_daily_alarm(e) {
            var value = e.target.value,
                that = this;
                if (!value) {
                    value = 0;
                }
            that.daily_alarm_tips = '';
            var val = parseInt(value);
            if (isNaN(val) || val != value || val >= 100 || val < 0) {
                that.daily_alarm_tips = 'Daily Alarm: positive integer less than 100 only.';
                that.showAlert(that.daily_alarm_tips, "info")
                $("#daily_alarm").focus();
                return false;
            } else {
                that.daily_alarm = val;
            }
        },
        get_offer_obj(callback) {
            var that = this;
            that.$http.get('Offer2/getById?id=' + that.from)
                .then(response => {
                    var offer_obj = response.body && response.body.data
                    that.loadingZone = ""
                    that.$nextTick(function(){
                        that.assignAttrFromSimilarOffer(offer_obj);
                        that.offer_obj = offer_obj
                    })
                }, response => {
                    this.loadingZone = ""
                    console.log("getById?id")
                    callback && callback()
                })
        },
        addBox() {
            var boxes = this.boxes;
            var added = this.box_len + 2
            boxes.push('box' + added)
        },
        deletebox(box) {
            var boxes = this.boxes;
            var new_boxes = _.filter(boxes, function(item) {
                return item != box
            });
            this.boxes = new_boxes;
        },
        set_tracking_domain(tracking_domain_val) {
            let that = this
            var p = new promise.Promise();
            p.done(null, tracking_domain_val);
            that.tracking_domain = tracking_domain_val
            return false;
        },
        asyncVirusScanning () {
            var that = this
            var p = new promise.Promise();
            var offer_name = that.name;
            var offer_url = that.offer_url
            if (!offer_name.match(/ddl/gi)) {
                p.done(null, "");
                return p;
            }
            that.$http.get('Offer2/scanOfferUrl?url=' + common.Base64.encode(offer_url))
                .then(response => {
                    that.loadingZone = ""
                    if(response.body.flag != "success"){
                        that.showAlert(response.body.msg)
                    } else {
                        if (response.body.data && response.body.data && (!parseFloat(response.body.data.risk_rate) < 0.4)) {
                            that.virusScanningModal = 'show';
                            that.risk_rate = response.body.data.risk_rate * 100 + '%';
                        } else {
                            p.done(null, "");
                        }
                    }
                }, response => {
                    p.done(null, "");
                    that.loadingZone = ""
                    that.showAlert(response.body.msg)
                })

            return p;
        },
        setSubmitType(type) {
            this.submitType = type
        },
        submit_set_geo() {
            var that = this
            var val_geo = []
            $(".country_controls .select2-search-choice").each(function() {
                val_geo.push($(this).data("select2Data").id);
            })
            that.country_ids = val_geo
        },
        submit_check_tracking_system() {
            var that = this,
                selected = that.trackingSystemSelectedIndex,
                otherTracking = that.otherTracking,
                tracking_system = that.tracking_system
            //tracking system == other ,other input 为空
            if(selected == 4 &&  otherTracking== "") {
                that.showAlert("Please input or select the tracking system")
                $('#otherTracking').focus();
                return false;
            }

            //未选择tracking system
            if((tracking_system == "" || tracking_system == undefined) && selected != 4) {
                that.showAlert("Please select the tracking system")
                $('#tracking_system').focus();
                return false;
            }

            //other tracking不能超过50个字符
            if (otherTracking != "" && otherTracking.length >= 50) {
                var msg = "The tracking system name should be no more than 50 characters."
                that.showAlert(msg)
                $('#otherTracking', "body").focus();
                return false;
            }
            return true
        },
        submit_check_currency() {
            var that = this,
                _currency = that.currency,
                dynamic_payout_default = that.dynamic_payout_default,
                payout_default = parseFloat(that.payout_per_conversion),
                revenue_default = parseFloat(that.revenue_per_conversion);
            //if currency is empty, use this default value
            if(that.GBP_CURRENCY == ''){
                that.GBP_CURRENCY = '1.6418';
                var GBP_CURRENCY = that.GBP_CURRENCY
            }
            if(that.EUR_CURRENCY == ''){
                that.EUR_CURRENCY = '1.3669';
                var EUR_CURRENCY = that.EUR_CURRENCY
            }
            if (that.is_dynamic_revenue == 1) { //动态payout
                if (_currency == 'GBP'){
                    if ((dynamic_payout_default - 0) / 100 * (revenue_default - 0) * GBP_CURRENCY > (revenue_default - 0) * GBP_CURRENCY){
                        that.winWndModalState = true
                        return false;
                    }
                } else if (_currency == 'EUR'){
                    if((dynamic_payout_default - 0) / 100 * (revenue_default - 0) * EUR_CURRENCY > (revenue_default - 0) * EUR_CURRENCY){
                        that.winWndModalState = true
                        return false;
                    }
                } else if (_currency == 'USD'){
                    if((dynamic_payout_default - 0) / 100 *(revenue_default - 0) > (revenue_default - 0)){
                        that.winWndModalState = true
                        return false;
                    }
                }
            } else { //非动态payout
                if(_currency == 'GBP'){
                    if((payout_default - 0) > (revenue_default - 0) * GBP_CURRENCY){
                        that.winWndModalState = true
                        return false;
                    }
                }else if(_currency == 'EUR'){
                    if((payout_default - 0) > (revenue_default - 0) * EUR_CURRENCY){
                        that.winWndModalState = true
                        return false;
                    }
                }else if(_currency == 'USD'){
                    if((payout_default - 0) > (revenue_default - 0)){
                        that.winWndModalState = true
                        return false;
                    }
                }
            }
            return true
        },
        submit_check_advertiser() {
            var that = this
            var advertiser_id = that.advertiser_id
            if (!advertiser_id) {
                var msg = 'Please choice an advertiser'
                $('#advertiser_id_chosen').find('input').focus();
                that.showAlert(msg)
                return false
            }
            return true
        },
        submit_check_category() {
            var that = this
            var category = that.category
            if (_.isEmpty(category)) {//that.categories && that.categories.length == 0
                $("#s2id_category").find('input.select2-input').focus();
                that.showAlert('Please choice category')
                return false;
            }
            return true
        },
        showAlertAndReturn(tag, msg) {
            var msg = msg || "Price must be greater than 0.00"
            if (tag) {
                $('#' + tag).focus();
            }
            this.showAlert(msg, "info")
        },
        submit_check_revenue_payout() {
            var that = this;
            var payout_per_conversion = parseFloat(that.payout_per_conversion),
                revenue_per_conversion = parseFloat(that.revenue_per_conversion),
                revenue = $("input[name='revenue']").is(":visible") &&  parseFloat(that.revenue);
            if ($('#revenue_per_conversion').is(":visible") && revenue_per_conversion <= 0) {
                that.showAlertAndReturn('revenue_per_conversion')
                return false;
            }
            /*var revenue_default = $('#revenue_per_conversion').is(":visible") && that.revenue_per_conversion,
                cps_revenue_per_conversion = $('#cps_revenue_per_conversion').is(":visible") && parseFloat(that.cps_revenue_per_conversion),
                payout_default = $('#payout_per_conversion').is(":visible") && that.payout_per_conversion,
                dynamic_payout_default = $("#dynamic_payout_default").is(":visible") && that.dynamic_payout_default,
                cps_payout_per_conversion = $('#cps_payout_per_conversion').is(":visible") && parseFloat(that.cps_payout_per_conversion),
                offer_type = that.offer_type,
                revenue = $("#revenue").is(":visible") &&  parseFloat(that.revenue),
                eventName = [];
            //check revenue and payout
            if ((revenue_default && revenue_default <= 0) || (cps_revenue_per_conversion && cps_revenue_per_conversion <=0)) {
                if(revenue_default <= 0) $('#revenue_per_conversion').focus();
                if(cps_revenue_per_conversion <= 0) $('#cps_revenue_per_conversion').focus();
                that.showAlert("Price must be greater than 0.00", "info")
                return false;
            }
            if ((payout_default && payout_default <= 0) || (cps_payout_per_conversion && cps_payout_per_conversion <=0)) {
                if(payout_per_conversion <= 0) $('#payout_per_conversion').focus();
                if(cps_payout_per_conversion <= 0) $('#cps_payout_per_conversion').focus();
                that.showAlert("Price must be greater than 0.00", "info")
                return false;
            }
            if (cps_revenue_per_conversion < cps_payout_per_conversion ) {
                $('#cps_payout_per_conversion').focus();
                that.showAlert("Payout must be less than revenue", "info")
                return false;
            }
            if (that.is_dynamic_revenue && dynamic_payout_default && dynamic_payout_default <= 0) {
                $('#dynamic_revenue_value').focus();
                that.showAlert("Price must be greater than 0%", "info")
                return false;
            }
            if(revenue && revenue <= 0){
                $('#revenue').focus();
                that.showAlert("Price must be greater than 0.00", "info")
                return false;
            }*/
            return true
        },
        submit_check_multiple_events() {
            var that = this
            var eventName = [];
            if (this.offer_type == 'cps') {
                var forms = $(".multiple_events_box");
                var event_name_flag = false;
                $(forms).each(function(index, form) {
                    var _this = form;
                    var name = $.trim($(".event_name", _this).val());
                    if (name != "") {
                        eventName.push($.trim($(".event_name", _this).val()))
                    }
                })

                if (eventName.length > 1) {
                    var len = eventName.length;
                    for (var i = 0; i < len; i++) {
                        for (var j = 1; j < len; j++) {
                            if (i != j && eventName[i] == eventName[j]) {
                                that.showAlert("Event Name can't cannot be the same", "info")
                                return false
                            }
                        }
                    }
                }
            }
            return true
        },
        submit_check_notify_url() {
            var that = this
            if (that.notify_url != "" && notify_url.length >= 500) {
                var msg = "The tracking system name should be no more than 500 characters."
                that.showAlert(msg)
                $('#notify_url', "body").focus();
                return false;
            }
            return true
        },
        submitForm(event) {

            event && event.preventDefault()
            var that = this;
            var revenue_default = that.revenue_per_conversion,
                cps_revenue_per_conversion = parseFloat(that.cps_revenue_per_conversion),
                payout_default = that.payout_per_conversion,
                dynamic_payout_default = that.dynamic_payout_default,
                cps_payout_per_conversion = parseFloat(that.cps_payout_per_conversion),
                offer_type = that.offer_type,
                eventName = [];

            var arg = that.submit_check_tracking_system() && that.submit_check_advertiser() && that.submit_check_category() && that.submit_check_currency() && that.submit_check_revenue_payout() && that.submit_check_multiple_events() && that.submit_check_notify_url();

            that.submit_set_geo();
            if (arg) {
                $('#description').val(editor.getData());
                that.winWndModalState = false
                if (that.daily_alarm_tips) {
                    $('#daily_alarm').focus();
                    that.showAlert(that.daily_alarm_tips)
                    return false;
                }
                if (that.monthly_alarm_tips) {
                    $('#monthly_alarm').focus();
                    that.showAlert(that.monthly_alarm_tips)
                    return false;
                }
                if (that.offer_type === "cpe" && (!that.payment_event || !/^([a-zA-Z]|_|[0-9])+$/.test(that.payment_event))) {
                    $('#payment_event').focus();
                    that.showAlert('Please input english letters , interger ,underline')
                    return false;
                }
                if (!(that.fileInfoC.length > 0)) {
                    that.showAlert('Please upload the certificate!')
                    return false;
                }
                var p = that.asyncVirusScanning();
                var offer_name = that.name;
                var offer_url = that.offer_url;
                Vue.nextTick(function () {
                    var query =  that.getCreateParam()
                    that.loadingZone = true
                    p.then(function(error, result) {
                        Vue.http.post('Offer2/create', query)
                            .then(response => {
                                that.loadingZone = ""
                                if(response.body.flag != "success"){
                                    that.showAlert(that, "show", "error", response.body.msg)
                                } else {
                                    var offer_id = response.body.data.id
                                    that.uploadFile(offer_id, that.cookieHash, function() {
                                        setTimeout(function() {
                                            switch (that.submitType) {
                                                case 'create_back_btn':
                                                default:
                                                    that.$router.push('/p_offers')
                                                    break;
                                                case 'create_add_details':
                                                    that.$router.push('/p_manage_offer?id=' + response.body.data.id);
                                                    break;

                                                case 'create_and_another':
                                                    window.location.href = '/p_create_offer?from=' + response.body.data.id;
                                                    break;
                                            }
                                            that.submitType = null;
                                        }, 2000);
                                    })
                                }
                            }, response => {
                                that.loadingZone = ""
                                that.showAlert(response.body.msg)
                            })
                    })
                })
            }
        },
        uploadFile (offer_id, cookieHash, callback) {
            var ajaxs = [];
            var errorInfo = [];
            var fileListEmpty = true;
            var that = this
            for (let i in that.files) {
                fileListEmpty = false;
                var singleData = new FormData();
                singleData.append('upload', that.files[i]);
                singleData.append('PHPSESSID', cookieHash['PHPSESSID']);
                singleData.append('offer_id', offer_id);
                singleData.append('language', that.files[i].language);
                that.$http.post(config.swfupload.upload_url.uploadFile, singleData)
                    .then(response => {
                        var data = response.body.data
                        try {
                            data = $.parseJSON(data);
                            if (response.body.msg == 'success' && response.body.flag == 'success') {
                                $('#creative_files_list').find('tr[data-md5path=' + i + ']').find('.file_link').attr('href', data.data.file_path);
                            } else {
                                errorInfo.push(that.files[i].name);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }, response => {
                        errorInfo.push(that.files[i].name);
                    })


            }

            for (let i in that.filesC) {
                fileListEmpty = false;
                var singleDataC = new FormData();
                singleDataC.append('upload', that.filesC[i]);
                singleDataC.append('PHPSESSID', cookieHash['PHPSESSID']);
                singleDataC.append('offer_id', offer_id);
                that.$http.post(config.swfupload.upload_url.uploadCertificate, singleDataC)
                    .then(response => {
                        var data = response.body.data
                        try {
                            data = $.parseJSON(data);
                            if (response.body.msg == 'success' && response.body.flag == 'success') {
                                $('#creative_files_list').find('tr[data-md5path=' + i + ']').find('.file_link').attr('href', data.data.file_path);
                            } else {
                                errorInfo.push(that.filesC[i].name);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    }, response => {
                        errorInfo.push(that.filesC[i].name);
                    })
            }

            if (errorInfo.length) {
                setTimeout(function() {
                    if (errorInfo) {
                        that.showAlert('upload file failed, ' + errorInfo.join(' '), "info")
                    }
                }, 300);
            }

            this.getOfferStatus(this.saveOfferKPI,offer_id)
            setTimeout(callback && callback(), 500);
        },
        calcu_tracking_system(trackingSystem) {
            var choices = ["Adjust", "Appsflyer", "MAT", "Self-Tracking"];
            var that = this
            that.tracking_system = trackingSystem || that.tracking_system
            if (trackingSystem && choices.indexOf(trackingSystem) == '-1') {
                that.otherTracking = trackingSystem
            } else {
                that.otherTracking = ''
                that.trackingSystemSelectedIndex = '';
            }
        },
        calcuAdvRelatedData(data) {
            if (data) {
                this.advertiser_white_ip = data.advertiser_white_ip && data.advertiser_white_ip.length > 1 && data.advertiser_white_ip.split(',')
                this.calcu_tracking_system(data.trackingSystem)
            }
        },
        change_tracking_system(e) {
            var that = this;
            this.calcu_tracking_system(e.target.value)
            if (e.target.selectedIndex == 4) {
                that.trackingSystemSelectedIndex = 4
            }
        },
        hideModal () {
            this.modalState = "hide"
            this.createOfferWhiteIPModalState = "hide"
            this.virusScanningModal = "hide"
            this.winWndModalState = 'hide'
            this.editVal = []
            this.submit_set_geo()
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        renderGeo (callback) {
            callback &&　callback()
        },
        onChangeType(){
            let obj = {}
            obj[this.offer_type] = "1"
            this.conversionFlowId =  (_.find(this.sourceConversionFlow, obj) || {}).id || ""
        },
        onAddKPIForm(){
            let that = this;
            let $form = $(this.$refs.kpiForm)
            if ($form.find("[name='kpis[wighting]']").val() == ''){
                return that.showAlert("KPI weighting cant't be empty")
            }
            if ($form.find("[name='kpis[quality]']").val() == ''){
                return that.showAlert("KPI index cant't be empty")
            }
            if ($form.find("[name='kpis[wighting]']").val() <= 0){
                return that.showAlert("KPI weight must be greater than 0")
            }

            if(!_.find(that.kpi_settings, {type: $form.find("[name='kpis[type]']").val()})) {
                that.kpi_settings.push(
                    {
                        type: $form.find("[name='kpis[type]']").val(),
                        event_name: this.getEventName($form.find("[name='kpis[type]']").val()),
                        event_param: $form.find("[name='kpis[event_param]']").val() ? $form.find("[name='kpis[event_param]']").val() : 0,
                        wighting: $form.find("[name='kpis[wighting]']").val(),
                        quality: $form.find("[name='kpis[quality]']").val()*100 / 10000               
                    }
                )
            } else {
                that.showAlert("You have added the type  " + $form.find("[name='kpis[type]']").val(),"info")
            }
            $form[0].reset()

        },
        getEventName(type){
            let obj = {
                'cr': 'gt_cr',
                'retention': 'retention',
                'click_hijacking': 'lt_ctit',
                'click_flood': 'gt_ctit'
            }
            return obj[type] || type;
        },
        transType(key) {
            let obj = {
                'cr': 'CR',
                'retention': 'Retention Rate',
                'click_hijacking': "Click Injection </br> Max CTIT: 10s",
                'click_flood': "Click Flood </br> Min CTIT: 3600s"
            }
            return obj[key] || key;
        },
        getOfferStatus(callback,offer_id) {
            let that = this;
            let params = {
                offer_id: offer_id
            }
            Vue.http.get("Ocpa/datastatusofferocpakpi", {params:params}).then(response => {
                let data =  response.body && response.body.data
                if(data && data.status) {
                    callback && callback(offer_id)
                } else {
                    return that.showAlert("Please wait, the kpi setting is saving.")
                }
            }, response => {
                // error callback
                this.setting_switch = false
                that.showAlert(response.body.msg);
            })
        },
        saveOfferKPI(offer_id) {
            let that = this
            let arr = _.pluck(this.kpi_settings, "wighting") || []
            
            let params = {
                offer_id: offer_id,
                kpis: []
            }
            
             var key;
             _.each(this.kpi_settings, function(item, key){
                  params.kpis.push({
                      type:item.type,
                      wighting:item.wighting,
                      quality:item.quality,
                      event_name: item.event_name,
                      event_param: item.event_param
                  })
             })

             if (this.kpi_settings.length == 0) params.kpis = ''

            this.loadingZone = "ajax_loading"
            Vue.http.post("Ocpa/addofferocpakpi", params).then(response => {
                let data =  response.body && response.body.data
                that.showAlert("Save Success!", "success")
                this.loadingZone = ""
                this.setting_switch = false
            }, response => {
                // error callback
                this.loadingZone = ""
                this.setting_switch = false
                that.showAlert(response.body.msg);
            })
        },
    },
    created() {
        let that = this
        ep.all("adv","categories","traffics","conversionFlow","geoCountry", "geoState", "platforms", function(adv,categories,traffics,conversionFlow,geoCountry, geoState, platforms){
            that.renderOffer = true
        })
        commonDataAPI.getAdvertisers(function(advertisers) {
            that.sourceAdv = advertisers.map(function(c_obj) {
                return { id: c_obj.id, text: c_obj.name, name: c_obj.name};
            })
            ep.emit("adv", advertisers)
        })
        commonDataAPI.getCategories(function(data) {
            that.sourceCategories = data
            ep.emit("categories", data)
        })
        commonDataAPI.getTraffics(function(data) {
            that.sourceTraffics = data
            ep.emit("traffics", data)
        })
        commonDataAPI.getConversionFlow(function(data) {
            that.sourceConversionFlow = data
            ep.emit("conversionFlow", data)
        })
        commonDataAPI.getGeoStateList(function(data) {
            that.sourceGeoState = data
            ep.emit("geoState", data)
        })
        commonDataAPI.getPlatforms(function(data) {
            that.sourcePlatforms = data.map(function(c_obj) {
                return { id: c_obj.device_names, name: c_obj.device_names };
            })
            ep.emit("platforms", data)
        })
        that.getGeoCountryList()
        that.getExchangeRateFromGBPToUSD()
        that.getExchangeRateFromEURToUSD()
    },
    mounted () {
        var that = this
        $('.field-required').find('input:visible').attr("required", true)

    }
}
</script>


<style scoped>
.col-md-8{
    padding-left: 0
}
.content-country .editable-buttons {
    display: none;
}
.col-md-6 {
    width: 50% !important;
}
.events_box_content{
    margin-top: 5%;
}
.form-horizontal select{
    text-align: left;
    text-align-last: left;
    padding-top: 2px;
    padding-bottom: 2px;
    height: 30px;
    padding: 6px 12px;
    font-size: 14px;
}
/* .field-required .control-label:after{
    font-size: 8px;
    position: absolute;
    right: 8px;
    top: 10px;
    content: "\f12a";
    color: red;
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
} */
.field-required i.red{
    position: relative;
    top: 0;
    padding-left: 15px;
}
.box-sub-header h3 {
    font-size: 18px;
    color: #4F3912;
    font-weight: 800;
    border-bottom: 1px solid #999;
}

.box-content {
    margin-left: 15px;
}

.caps-span {
    vertical-align: bottom;
    color: #ccc;
    font-size: 12px;
    float: none;
}

#adv_white_list {
    font-weight: 700;
    margin-top: 6px;
}

#creative_files .swf-control {
    position: absolute;
    right: 15px;
    top: 15px;
}

#recommend_status .modal-body .form-horizontal .control-label {
    width: auto;
    line-height: 30px;
}

#recommend_status .modal-body .form-horizontal,
#recommend_status .modal-body .form-horizontal .control-group.form-group {
    margin-bottom: 0
}

#recommend_status .modal-body .form-horizontal .controls {
    margin-left: 50px;
}

#recommend_status .modal-body .content_ip {
    display: none;
}

#recommend_status .modal-body .content_ip p {
    font-size: 12px;
    padding-left: 50px;
    margin-top: -4px;
}

#recommend_status .modal-body .content_ip span.spliter {
    margin: 0 8px;
    font-size: 20px;
}



.modal_virus_scanning .modal-header h3 {
    font-size: 16px;
}

.modal_virus_scanning .modal-header h3 span {
    font-size: 12px;
    margin-left: 20px;
    font-weight: normal;
}



.modal_virus_scanning .modal-body p.desc_risk_rate {
    margin: 20px 0 30px 0;
}

.modal_virus_scanning .modal-body p.desc_risk_rate strong {
    font-size: 24px;
    margin-left: 14px;
}

.modal_virus_scanning .modal-body p.desc_risk_level {
    line-height: 28px;
}

.modal_virus_scanning .modal-body p.tracking_domain {
    margin: 40px 0 0 0;
}


.modal_virus_scanning .red {
    color: #c00
}
.hvr-fade{
    display: inline-block;
    width: 280px;
    cursor: pointer;
}

/**
* check list
*/

.checkList {
    margin: 0;
}

.checkList li {
    display: block;
    list-style-type: none;
    line-height: 30px;
}

.checkList li span {
    display: inline-block;
    width: 280px;
    cursor: pointer;
}

.checkList li span .icon_zone {
    margin-right: 5px;
    font-size: 16px;
    width: 16px;
    display: inline-block;
    position: relative;
}

.icon_zone {
    color: green;
}

.icon_zone.not-check {
    color: red;
}

.icon_zone .icon:before {
    content: "\f00c";
}

.icon_zone.not-check .icon:before {
    content: "\f00d";
}

.icon_zone .icon-check-empty {
    font-size: 16px;
    opacity: 0.4;
}

.icon_zone .icon {
    position: absolute;
    top: 4px;
    left: 0px;
    font-size: 16px;
}

.control-label .info {
    white-space: normal;
    font-size: 13px;
    color: #666;
}

a[data-type="select2"] {
   /*  background: url(../../asset/static/libs/img/loading.gif ); */
    display: inline-block;
    min-width: 16px;
    min-height: 16px;
}


.ms-container {
    min-width: 560px;
    margin: 0 auto;
}

.modal-body {
    max-height: 600px;
}

#preselect_action {
    text-align: center;
}


.tab-content {
    overflow: initial;
}

.country_ids[data-type="select2"] {
    background: none;
}

.control-group .form-group-geo .select2-search-choice div {
    word-break: break-all;
    line-height: 20px;
}


.geo_country_ids[data-type="select2"]{
    background: none;
}

.box-content-country .editable-buttons {
    display: none;
}


.file_upload_tips a {
    color: #08c;
}


.multiple_events_box{
    border: 1px #ccc solid;
    padding: 10px;
}
.multiple_events_box .editable-cancel{
    background: #d0c5a5;
    color: #4b3817;
}
.multiple_events_box{
    background: transparent;
    border-radius: 5px;
    border: 1px #ddd solid;
    padding: 10px 10px 0 10px;
    position: relative;
    margin: 10px 0;
}
.multiple_events_box .box{
    box-shadow: none;
}
.multiple_events_box .box-header{
    background: transparent;
    padding-left: 0;
    padding-bottom: 15px;
}
.frm-entity .controls .btn_delete{
    margin-left: 50px;
    cursor: pointer;
}
.multiple_events_box button[type=submit] {
    margin-left: 100px;
}
.multiple_events_box .btn_Add,
.multiple_events_box .btn_delete，
.multiple_events_box .icon-remove,
.multiple_events_box [class*="icon"]{
    cursor: pointer;
}
.multiple_events_box [class*="icon"]:hover{
    opacity: 1;
    -webkit-transition: opacity .2s;
    transition: opacity .2s;
}
.multiple_events_box .btn-add-box,
.multiple_events_box .btn-delete-box,
.multiple_events_box .btn-submit{
    position: absolute;
    top: 10px;
    z-index: 1000;
}
.multiple_events_box .btn-add-box,
.multiple_events_box .btn-delete-box{
    right: 10%;
}
.multiple_events_box .editable-submit{
    left: 65%;
    height: 30px;
}
/* .global_pixel_type .btn-delete-box{
    left: 56%;
} */
.multiple_events_box .icon-plus-sign,
.multiple_events_box .icon-remove{
    font-size: 20px;
}
.multiple_events_box .icon-plus-sign{
    display: block;
    margin: 0 0 5px 0
}
.multiple_events_box .dynamicHide{
}
.multiple_events_box .row-editable input{
    width:200px;
}
.type-action{
    text-align: right;
}
.advanced{
    z-index: 10000;
    width: 90%;
}
.publisher_group_white_black_list textarea {
    width: 560px;
    height: 160px;
}

.publisher_group_white_black_list .tips {
    vertical-align: top;
    margin-top: 20px;
}
.form-control {
    float: none;
}
#cc_add .description {
    margin-top: 0px;
}
</style>