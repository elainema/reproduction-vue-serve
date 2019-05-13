<template>
<div v-yeah-loading='loadingZone'>
    <div class="box" ref="payment_wrapper">
        <div class="box-header"  v-box-action-resize>
            <h2>Payment<help-box :content="helpTips.payment"></help-box></h2>
            <div class="box-action"><i class="icon-chevron-up" title="Fold"></i> <i class="icon-chevron-down hide" title="Unfold"></i></div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div v-show="offer_type === 'cpe'" class="control-group form-group">
                    <label class="control-label col-md-2"><a href="void(0)">Payment Event</a> <span class="red">*</span></label>
                    <div class="controls">
                        <editable_text_offer  class="inline-block"  :showAlert="showAlert"  :offer_name="'payment_event'" :offer_val="offerInfo.payment_event" :renderOffer="renderOffer"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Dynamic Revenue</label>
                    <common-switch 
                        :showAlert='showAlert'
                        :updateInfo="updateOfferInfo"
                        :default_val="offerInfo.is_dynamic_revenue"
                        :switch_param='"is_dynamic_revenue"'
                        :render="renderOffer"
                        :onChange="onChange"
                    />
                    <span class="hide"> (
                        <span id="afterValue"></span> after
                        <span id="alert_is_dynamic_revenue_time"></span> GMT)
                    </span>
                </div>
                <div  v-show="offer_type !== 'cps' || (offer_type === 'cps' && offerInfo.is_dynamic_revenue)" class="control-group form-group" id="payout_div">
                    <label class="control-label col-md-2">Default Payout</label>
                    <div class="controls">
                        <a href="#" class="editable editable-click " id="reserve_change_payout" @click.prevent="modalState = true;modalType='payout';modalVal=offerInfo.is_dynamic_revenue ? offerInfo.dynamic_revenue_value : offerInfo.payout_per_conversion"  data-value="payout"><span id="reserve_payout_per_conversion">{{offerInfo.is_dynamic_revenue ? offerInfo.dynamic_revenue_value : offerInfo.payout_per_conversion}}</span></a> <span v-show="offerInfo.alert_payout_time"> (<span id="alert_payout">{{offerInfo.alert_payout}}</span> after <span id="alert_payout_time">{{offerInfo.alert_payout_time}}</span> GMT)</span>
                        <span class="" id="is_dynamic_flag" v-show="offerInfo.is_dynamic_revenue">%</span>
                        <span class="" id="is_show" v-show="offerInfo.is_dynamic_revenue">&nbsp;of Dynamic Revenue</span>
                    </div>
                </div>
                <form v-show="offer_type== 'cps'" class="form-horizontal frm-entity" id="multiple_events_container">
                    <mutiplle_events :callBack="callBack" :offer_type="offer_type" :showSubmit="showSubmit" :offerInfo="offerInfo" :renderOffer="renderOffer"  :showAlert='showAlert' :showLoading="showLoading" :hideLoading="hideLoading"></mutiplle_events>
                </form>
                <div v-show="offer_type !== 'cps'">
                    <div class="control-group form-group" id="revenue_div">
                        <label class="control-label col-md-2">Default Revenue</label>
                        <div class="controls">
                            <span>{{offerInfo.currency}}</span>
                            <a href="#" class="editable editable-click ml5" id="reserve_change_revenue" @click.prevent="modalState = true;modalType='revenue';modalVal=offerInfo.revenue_per_conversion"  data-value="revenue"  style="display:inline"><span id="revenue_per_conversion">{{offerInfo.revenue_per_conversion}}</span> <span v-show="offerInfo.alert_revenue_time">(<span id="alert_revenue">{{offerInfo.alert_revenue}}</span> after <span id="alert_revenue_time">{{offerInfo.alert_revenue_time}}</span> GMT)</span></a>
                        </div>
                    </div>
                    <div class="control-group form-group caps-group">
                        <label class="control-label col-md-2">Caps</label>
                        <div class="controls">
                            <editable_caps_offer   v-if="" :is_offer_caps="true" :offer_val="JSON.stringify(offerInfo)" class="inline-block "  :showAlert="showAlert"   :renderOffer="renderOffer"></editable_caps_offer>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Redirect</label>
                        <div class="controls">
                            <editable_select2_redirect_offer class="inline-block" :select2_multiple="true"  :showAlert="showAlert"  :offer_name="'caps_redirect_offer_id'" :offer_val="offerInfo.caps_redirect_offer_id "  :renderOffer="renderOffer"></editable_select2_redirect_offer>
                            <span style="color: #888;padding: 0 4px;">search maximum show 50 search results</span>
                        </div>
      
                    </div>
                    <div class="control-group form-group">
                        <div class="  controls   col-md-offset-2" id="hideConv">
                            <span class="hidden">Hide</span>
                            <editable_text_offer  class="inline-block" :editable_mode="'pop_up'"  :onSuccess="setHideConv" :onShown="onShowHideConv" :displayOpt="displayOpt" :showAlert="showAlert"  :offer_name="'hide_conv'" :offer_val="offerInfo.hide_conv" :renderOffer="renderOffer" :confirmValidate="validateCC"></editable_text_offer>
                            <span id="least" class="red">{{offerHideConv}}</span>
                            <span class="hidden">Conversion(For all Affiliates)</span>
                        </div>
                    </div>

                    <div class="box-sub-header">
                       <h3>Set Payout for Yeahmobi Network Affiliate<help-box :content="helpTips.na"></help-box></h3>
                    </div>
                    <div class="box-content no-padding box-content-payout-aff" id="box-content-payout-aff">
                        <div class="control-group form-group">
                            <label class="control-label col-md-2 custom">Payouts - Affiliate</label>
                            <div class="">
                                <chosen_container_offer class="inline-block" :option0="option0" :renderOffer="approved" v-if="approved" :chosenInfo="approved" :chosenCallback="setSelectedVal" :classList="classList"></chosen_container_offer>
                                <a href="#" class="btn btn-primary btn_add_payout" data-control-name='bt-button' data-target="#aff_payment_container" @click.prevent="addAffiliatePayout">Add</a>
                            </div>
                            <br />
                            <div class="col-md-offset-2 overflow_scroll customOffset" id="aff_payment_container">
                                <table class="table tablesorter defaultTable">
                                    <colgroup>
                                        <col width="80" />
                                        <col width="90" />
                                        <col width="120" />
                                        <col width="100" />
                                        <col v-if="userInfo.role_id != 5" width="120" />
                                        <col width="400" />
                                        <col width="130" />
                                        <col width="120" />
                                        <col width="" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>Affiliate</th>
                                            <th>Default Payout</th>
                                            <th class="text-center">Payout</th>
                                            <th>Default Revenue</th>
                                            <th v-if="userInfo.role_id != 5" class="text-center">Revenue</th>
                                            <th>Caps</th>
                                            <th>Redirect</th>
                                            <th class="is_show"></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="aff_info">
                                         <tr class="affTr" v-show="payoutAndCapsInfo.length && offerInfo.id" :data-id="n.aff_id" v-for="n in payoutAndCapsInfo" :id="'id_payment_' + n.aff_id + id">
                                            <td>{{n.aff_id}} - {{ n.first_name }} {{n.last_name}} - {{n.pm}}</td>

                                            <td class="default_payout_value">{{offerInfo.is_dynamic_revenue ? offerInfo.dynamic_revenue_value + "%": '$' + offerInfo.payout_per_conversion }}</td>

                                            <td class="payout text-center" style="position: relative;"> 
                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_payout==='SYSTEM'" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Payout"/> -->
                                                <span id="payout_per_conversion" v-if="offerInfo.is_dynamic_revenue">Use Default</span>
                                                <editable_text_offer  
                                                    :key="'rPayout'+n.aff_id" 
                                                    :emptytext= "'Use Default'" 
                                                    :onSuccess="getPayoutAndCapsByOfferId" 
                                                    :onRenderAfter="setPayoutStyle" 
                                                    :offer_data="JSON.stringify(n)" 
                                                    :dynamic_render="true" v-else 
                                                    :editable_mode="'pop_up'" 
                                                    class="is_show" 
                                                    :offer_api="'Offer2/editPayoutAssign'" 
                                                    :data-aff-id="n.aff_id" 
                                                    :getCustomParam="getCustomParam_Payout"  
                                                    :showAlert="showAlert"  
                                                    :offer_name="'payout_per_conversion'" 
                                                    :offer_val="setUniformNum(n.payout) || ''"  
                                                    :editable_id="'rPayout'+n.aff_id"  
                                                    :displayOpt="displayOpt"
                                                ></editable_text_offer>
                                            </td>
                                            <td class="default_revenue_value">{{revenue_flag}}{{offerInfo.revenue_per_conversion}}</td>
                                            <td class="revenue text-center" v-if="userInfo.role_id != 5">

                                                <span id="revenue_per_conversion" v-if="offerInfo.is_dynamic_revenue">Use Default</span>
                                                <editable_text_offer  
                                                    v-else 
                                                    :key="'rRevenue'+n.aff_id" 
                                                    :emptytext= "'Use Default'" 
                                                    :onSuccess="getPayoutAndCapsByOfferId" 
                                                    :onRenderAfter="setPayoutStyle" 
                                                    :dynamic_render="true"
                                                    :editable_mode="'pop_up'" 
                                                    :offer_data="JSON.stringify(n)" 
                                                    class=" is_show" 
                                                    :offer_api="'Offer2/editPayoutAssign'" 
                                                    :data-aff-id="n.aff_id" 
                                                    :getCustomParam="getCustomParam_Revenue"  :showAlert="showAlert"  
                                                    :offer_name="'revenue_per_conversion'" 
                                                    :offer_val="setUniformNum(n.revenue) || ''"  
                                                    :editable_id="'rRevenue'+n.aff_id"  
                                                    :displayOpt="displayOpt"
                                            ></editable_text_offer>
                                            </td>
                                            <td style="position: relative;">

                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_caps==='SYSTEM'&& n.is_caps === 1" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Caps"/> -->

                                                <editable_caps_offer  
                                                    :key="'rCaps'+n.aff_id" 
                                                    :offer_api="'Offer2/editCapsAssign'" 
                                                    :editable_mode="'pop_up'" 
                                                    :onSuccess="getPayoutAndCapsByOfferId" 
                                                    :offer_val="JSON.stringify(n)" 
                                                    :aff_id="n.aff_id" 
                                                    class="inline-block caps_redirect_offer_id" 
                                                    :dynamic_render="true" :showAlert="showAlert"   
                                                ></editable_caps_offer>

                                            </td>

                                            <td>
                                                <editable_select2_payout_redirect_offer :emptytext= "'Use Default'" :aff_id="n.aff_id" class="inline-block caps_redirect_offer_id"   :showAlert="showAlert"  :offer_name="'caps_redirect_offer_id'" :offer_val="n.caps_redirect_offer_id "  :renderOffer="renderOffer"></editable_select2_payout_redirect_offer>

                                            </td>
                                            <td style="position: relative;">
                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_hide_conv==='SYSTEM'" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Hide Conv"/> -->
                                                <p class="least red no-wrap">{{getHideConv(n)}}</p>

                                                <editable_text_offer 
                                                    v-if="n.aff_id"  
                                                    :key="n.aff_id" 
                                                    :emptytext="'Use Default'" 
                                                    :editable_mode="'pop_up'" 
                                                    class="hide_conv is_show" 
                                                    :classList="'no-wrap'"
                                                    :offer_api="editPayoutAssign" 
                                                    :data-aff-id="n.aff_id"
                                                    :getCustomParam="getCustomParam_HideConv"  
                                                    :showAlert="showAlert"  
                                                    :offer_name="'hide_conv'" 
                                                    :offer_val="calcuHideConvRange(n)"  
                                                    :dynamic_render="true"  
                                                    :onRenderAfter="onRenderAfter" 
                                                    :onShown="onCCShown"
                                                    :savenochange="true"
                                                    :data-is-dynamic-hide-conv="n.is_dynamic_hide_conv || 0"
                                                    :data-hide-conv="n.hide_conv"
                                                    :data-min_hide_conv="n.min_hide_conv"
                                                    :data-max_hide_conv="n.max_hide_conv" 
                                                    :confirmValidate="validateOfferAffCC"
                                                    :onSuccess="onSuccessUpdateDynamicPayout">
                                                </editable_text_offer>
                                                <p v-if="n.is_dynamic_hide_conv == 1">{{n.hide_conv ? (n.hide_conv + "%"):''}}</p>
                                            </td>
                                            <td><a href="#" class="btn" data-control-name="bt-button" :data-aff-id="n.aff_id" :data-offer-id="id"  @click.prevent="removePayout($event, n.aff_id)"><i class="fa fa-remove icon-white"></i></a></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div class="box-sub-header">
                        <h3>Set Payout for Publisher's App<help-box :content="helpTips.pa"></help-box></h3>
                    </div>

                    <div class="box-content no-padding box-content-payout-app">
                        <div class="control-group form-group">
                            <label class="control-label col-md-2 custom">Payouts - App</label>
                            <div class="">
                                <chosen_container_offer class="inline-block" :option0="option0" :renderOffer="renderOffer" v-if="activeAppUser" :chosenInfo="activeAppUser" :onChange="setSelectedAffVal" :chosenCallback="getActiveApp" :classList="classList"></chosen_container_offer>

                                <chosen_container_offer class="inline-block"  :option0="option1" :renderOffer="renderOffer" v-if="activeApp" :chosenInfo="activeApp"  :chosenCallback="setSelectedAppVal" :classList="classList" >></chosen_container_offer>

                                <a href="#" class="btn btn-primary btn_add_payout" data-control-name='bt-button' data-target="#app_payment_container" is-app-payout="1" @click.prevent="addAppPayout">Add</a>
                            </div>
                            <br />
                            <div class="col-md-offset-2  overflow_scroll customOffset" id="app_payment_container">
                                <table class="table tablesorter defaultTable">
                                    <colgroup>
                                        <col width="100" />
                                        <col width="100" />
                                        <col width="100" />
                                        <col width="100" />
                                        <col width="100" />
                                        <col width="100" />
                                        <col width="100" v-if="userInfo.role_id != 5" />
                                        <col width="400" />
                                        <col width="120" />
                                        <col width="" />
                                    </colgroup>
                                    <thead>
                                        <tr>
                                            <th>Affiliate</th>
                                            <th>App ID</th>
                                            <th>App Name</th>
                                            <th>Default Payout</th>
                                            <th>Payout</th>
                                            <th>Default Revenue</th>
                                            <th v-if="userInfo.role_id != 5">Revenue</th>
                                            <th>Caps</th>
                                            <th class="is_show"></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody id="aff_info">
                                        <tr class="affTr" v-show="appPayoutInfo.length && offerInfo.id" :data-aff-id="n.aff_id" :data-app-id="n.app_id" :data-id="n.aff_id" v-for="n in appPayoutInfo" :id="'id_payment_' + n.app_id + id">
                                            <td>{{n.aff_id}} - {{ n.first_name }} {{n.last_name}} - {{n.pm}}</td>
                                            <td>{{n.app_id}}</td>
                                            <td>{{n.app_name}}</td>

                                            <td class="default_payout_value">{{offerInfo.is_dynamic_revenue ? offerInfo.dynamic_revenue_value + "%": '$' + offerInfo.payout_per_conversion }}</td>

                                            <td class="payout" :data-aff-id="n.aff_id" style="position: relative;">
                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_payout==='SYSTEM'" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Payout"/> -->
                                                <span id="payout_per_conversion" v-if="offerInfo.is_dynamic_revenue">Use Default</span>
                                                <editable_text_offer  
                                                    v-else
                                                    :key="'rPayout'+n.app_id" 
                                                    :emptytext= "'Use Default'" 
                                                    :onSuccess="getAppPayoutAndCaps" 
                                                    :offer_data="JSON.stringify(n)" 
                                                    :onRenderAfter="setPayoutStyle" 
                                                    :dynamic_render="true"
                                                    :editable_mode="'pop_up'" 
                                                    class=" is_show" 
                                                    :offer_api="'Offer2/editAppPayoutAssign'" 
                                                    :data-aff-id="n.aff_id" 
                                                    :data-app-id="n.app_id" 
                                                    :getCustomParam="getCustomParam_Payout"  
                                                    :showAlert="showAlert"  
                                                    :offer_name="'payout_per_conversion'" 
                                                    :offer_val="setUniformNum(n.payout) || ''"  
                                                    :editable_id="'rPayout'+n.app_id" 
                                                    :displayOpt="displayOpt"
                                                ></editable_text_offer>
                                            </td>
                                            <td class="default_revenue_value">{{revenue_flag}}{{offerInfo.revenue_per_conversion}}</td>
                                            <td class="revenue" v-if="userInfo.role_id != 5">
                                                <span id="revenue_per_conversion" v-if="offerInfo.is_dynamic_revenue">Use Default</span>
                                                <editable_text_offer
                                                    :key="'rRevenue'+n.app_id" 
                                                    :emptytext= "'Use Default'" 
                                                    :data-app-id="n.app_id"  
                                                    :offer_data="JSON.stringify(n)" 
                                                    :onSuccess="getAppPayoutAndCaps" 
                                                    :onRenderAfter="setPayoutStyle" 
                                                    :dynamic_render="true" v-else 
                                                    :editable_mode="'pop_up'" 
                                                    class=" is_show" 
                                                    :offer_api="'Offer2/editAppPayoutAssign'" 
                                                    :data-aff-id="n.aff_id" 
                                                    :getCustomParam="getCustomParam_Revenue"  
                                                    :showAlert="showAlert"  
                                                    :offer_name="'revenue_per_conversion'" 
                                                    :offer_val="setUniformNum(n.revenue) || ''"  
                                                    :editable_id="'rRevenue'+n.app_id" 
                                                    :displayOpt="displayOpt" 
                                                ></editable_text_offer>

                                            </td>
                                            <td style="position: relative;">
                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_caps==='SYSTEM'&& n.is_caps === 1" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Caps"/> -->
                                                <editable_caps_offer 
                                                    :key="'rCaps'+n.app_id"  
                                                    :offer_api="'Offer2/editAppCapsAssign'" 
                                                    :editable_mode="'pop_up'" 
                                                    :onSuccess="getAppPayoutAndCaps" 
                                                    :offer_val="JSON.stringify(n)" 
                                                    :caps_type="'caps_lite'" 
                                                    :aff_id="n.aff_id" 
                                                    :app_id="n.app_id" 
                                                    class="inline-block caps_redirect_offer_id" 
                                                    :dynamic_render="true" :showAlert="showAlert"   
                                                ></editable_caps_offer>

                                            </td>

                                            <td style="position: relative;">
                                                <!-- <img src="@/assets/image/toys.svg" v-if="n.operator_type_hide_conv==='SYSTEM'" aria-hidden="true" ref="tooltip"  data-toggle="tooltip" data-placement="top" title="System Hide Conv"/> -->
                                                <p class="least red no-wrap">{{getHideConv(n)}}</p>
                                                <editable_text_offer 
                                                    :onShown="onCCShown" 
                                                    :emptytext="'Use Default'"
                                                    :editable_mode="'pop_up'" 
                                                    class="hide_conv is_show"
                                                    :classList="'no-wrap'"
                                                    :offer_api="editAppPayoutAssign"  
                                                    :data-app-id="n.app_id" 
                                                    :data-aff-id="n.aff_id" 
                                                    :getCustomParam="getCustomParam_HideConv" 
                                                    :savenochange="true" 
                                                    :offer_name="'hide_conv'" 
                                                    :showAlert='showAlert' 
                                                    :offer_val="calcuHideConvRange(n)"  
                                                    :dynamic_render="true"  
                                                    :onRenderAfter="onRenderAfter"
                                                    :data-is-dynamic-hide-conv="n.is_dynamic_hide_conv || 0"
                                                    :data-hide-conv="n.hide_conv"
                                                    :data-min_hide_conv="n.min_hide_conv"
                                                    :data-max_hide_conv="n.max_hide_conv"
                                                    :confirmValidate="validateOfferAffCC"
                                                    :onSuccess="onSuccessUpdateDynamicPayout">
                                                </editable_text_offer>
                                                <p v-if="n.is_dynamic_hide_conv == 1">{{n.hide_conv ? (n.hide_conv + "%"):''}}</p>
                                            </td>
                                            <td><a href="#" class="btn" data-control-name="bt-button" :data-app-id="n.app_id" :data-offer-id="id"  @click.prevent="removeAppPayout($event, n.app_id)"><i class="fa fa-remove icon-white"></i></a></td>
                                        </tr> 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- <changeOfferPayoutRevenueModal :modalState="modalState" :hideModal="hideModal" :showAlert="showAlert" :type="modalType" :val="modalVal" :isDynamic="offerInfo.is_dynamic_revenue" :default_payout="offerInfo.payout_per_conversion" :default_revenue="offerInfo.revenue_per_conversion" :offer_hide_conv="offerInfo.hide_conv" :currency="offerInfo.currency"></changeOfferPayoutRevenueModal> -->
    <change-offer-payout-or-revenue-modal
        :outerVisible.sync="modalState"
        :showAlert="showAlert"
        :type="modalType"
        :val="modalVal"
        :isDynamic="offerInfo.is_dynamic_revenue"
        :default_payout="offerInfo.payout_per_conversion"
        :default_revenue="offerInfo.revenue_per_conversion"
        :offer_hide_conv="offerInfo.hide_conv" 
        :currency="offerInfo.currency"
        :dialogName="'outerVisible'">
    </change-offer-payout-or-revenue-modal>



    <div class="hide">
        <div ref="dynamic" id="dynamic">
            <div ref="editable_offer_aff_cc" id="editable_offer_aff_cc">
                <common-switch
                    :showAlert='showAlert'
                    :updateInfo="updateOfferInfo"
                    :yes_text="'Dynamic'"
                    :no_text="'Defined'"
                    :default_val="is_dynamic_hide_conv"
                    :switch_param='"is_dynamic_hide_conv"'
                    :render="render"
                    :onChange="switchOnOfferAffDynamicCC"
                />
            </div>
            <div class="cc mt10">
                <input class="nondynamic" name="hide_conv" v-show="is_dynamic_hide_conv == 0" :value.trim="hide_conv" type="number" />
                <input v-show="is_dynamic_hide_conv == 1" name="min_hide_conv" type="number" :value.trim="min_hide_conv" class="input-small form-control dynamic min" /> 
                <span class="dynamic" v-show="is_dynamic_hide_conv == 1">---</span>
                <input v-show="is_dynamic_hide_conv == 1" name="max_hide_conv" type="number" :value.trim="max_hide_conv" class="input-small form-control dynamic max" />
            </div> 
        </div>
    </div>

   <!--  <paymentDialog :modalState="payoutModal" :hideModal="hideModalAndCancelSwitch" :isDynamicRevenue="value" :dynamicRevenueSetTask="hideModalAndcomfirmEdit" :offer_type="offer_type" :editCancel="editCancel" :offer_hide_conv="offer_hide_conv" :showAlert="showAlert"></paymentDialog> -->
    <change-offer-payout-and-revenue-modal
        :payoutModal.sync="payoutModal"
        :isDynamicRevenue="value" 
        :dynamicRevenueSetTask="hideModalAndcomfirmEdit" 
        :offer_type="offer_type" 
        :editCancel="editCancel" 
        :offer_hide_conv="offer_hide_conv" 
        :showAlert="showAlert"
        :dialogName="'payoutModal'"
    ></change-offer-payout-and-revenue-modal>

</div>


</template>

<script>
import Vue from "vue"
import editable_select2_payout_redirect_offer from '@/components/Editable_Select2_PayoutRedirect_Offer.vue'
import editable_caps_offer from '@/components/Editable_Caps_Offer.vue'

/*import changeOfferPayoutRevenueModal from '@/components/change-offer-payout-revenue-modal/'*/
import ChangeOfferPayoutOrRevenueModal from  '../../components/change-offer-payout-or-revenue-modal/'

import {setReadOnlyFactory, setReadOnly} from '@/util/offerDetail'
import mutiplle_events from '@/components/MutipleEvents.vue'
import { paymentHelpTips } from '../../config/config'


const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
const editable_select2_redirect_offer = () => import(
/* webpackChunkName: "editable_select2_redirect_offer" */ '@/components/Editable_Select2_Redirect_Offer.vue');
/*const editable_select2_offer = () => import(
 webpackChunkName: "editable_select2_offer"  '@/components/Editable_Select2_Offer.vue');*/

const editable_text_offer = () => import(
/* webpackChunkName: "editable_text_offer" */ '@/components/Editable_Text_Offer.vue');

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

/*const paymentDialog = () => import(
 webpackChunkName: "paymentDialog"  '@/components/PaymentDialog.vue');*/

const ChangeOfferPayoutAndRevenueModal = () => import( /* webpackChunkName: "ChangeOfferPayoutAndRevenueModal" */ '../../components/change-offer-payout-and-revenue-modal/');

export default {
    data () {
        return {
            payoutModal:'hide',
            offer_hide_conv:{},
            value:'',
            option0:'- Select an Affiliate -',
            option1:'- Select an App -',
            selectedOptionValue:'',
            selectedOptionName:'',
            selectedOptionText:"",
            id:this.$route.query.id,
            classList:'chosenSelect affiliate_approved',
            showSubmit:true,
            selectedAff:"",
            selectedApp:"",
            selectedAffText:"",
            selectedAffName:"",
            selectedAppText:"",
            modalState:false,
            modalType:"",
            modalVal:"",
            activeApp:[],
            approved:[],
            activeAppUser:[],
            loadingZone:false,
            helpTips: {},
            is_dynamic_hide_conv:0,
            min_hide_conv:'',
            max_hide_conv:'',
            hide_conv:'',
            app_id:'',
            editAppPayoutAssign:"Offer2/editAppPayoutAssign",
            editPayoutAssign:"Offer2/editPayoutAssign",
            editDynamicPayoutAssign:'',
            render:false,
            offer_param:'',
            level4Info:[]
        }
    },
    components: { editable_select2_redirect_offer, editable_select2_payout_redirect_offer,mutiplle_events, editable_text_offer, editable_caps_offer, ChangeOfferPayoutOrRevenueModal,HelpBox,CommonSwitch,ChangeOfferPayoutAndRevenueModal},
    watch:{
        renderOffer(newVal, oldVal){
            if(newVal){
                this.setOfferEditAuthPayment()
                this.setAddPayoutAuth()
                this.getActiveAppUser()
                $(this.$refs.tooltip).tooltip()
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.payment_wrapper)
                })
            }
        },
        affAccessInfo(newVal, oldVal){
            if (newVal) {
                this.getAffAccessApproved()
            }
        },
        appAccessInfo(newVal, oldVal) {
            if (newVal) {
                this.getActiveAppUser()
                this.getActiveApp()
            }
        },
    },
    computed: {
        mutiplleEvents() {
            return this.offerInfo && this.offerInfo.event
        },
        offer_type() {
            return this.offerInfo && this.offerInfo.offer_type || ''
        },
        revenue_flag(){
            let revenue_flag = ""
            if (this.offerInfo['currency'] == 'USD') {
                revenue_flag = '$'
            } else if (this.offerInfo['currency'] == 'EUR') {
                revenue_flag = '€'
            } else if (this.offerInfo['currency'] == 'GBP') {
                revenue_flag = '￡'
            }
            return revenue_flag
        },
        currency(){
            let currency = ""
            if (this.offerInfo['currency'] == 'USD') {
                currency = 'USD($)';
            } else if (this.offerInfo['currency'] == 'EUR') {
                currency = 'EUR(€)';
            } else if (this.offerInfo['currency'] == 'GBP') {
                currency = 'GBP(￡)';
            }
            return currency
        },
        offerHideConv(){
            var revenue = this.offerInfo.revenue_per_conversion * 1,
                payout = this.offerInfo.payout_per_conversion * 1

            var is_dynamic = this.offerInfo.is_dynamic_revenue === "1";
            var _currencyType = this.currency;
            if (is_dynamic) {
                payout = (this.offerInfo.dynamic_revenue_value + "").replace("%", "") / 100 * revenue;
            }
            if (_currencyType == "EUR(€)") {
                revenue = revenue * this.EUR_CURRENCY;
            } else if (_currencyType == "GBP(￡)") {
                revenue = revenue * this.GBP_CURRENCY;
            }
            var count = 0;
            if (payout === "" || payout === "0" || payout === 0) {
                count = 0
            } else {
                var _val = (1 - revenue / payout) < 0 ? 0 : (1 - revenue / payout)
                count = (_val * 100).toFixed(0);
            }
            return "At least " + count + "%"
        },
    },
    methods: {
        hideModalAndCancelSwitch() {
            this.hideModal()
        },
        hideModalAndcomfirmEdit(new_param) {
            let commonQuery = {
                [this.offer_param]:this.value,
                id: this.$route.query.id
            }
            let query = {}
            if (!new_param) {
                query = this.getCustomParamNoDynamicRevenue() 
                query = $.extend(commonQuery,query)
            } else {
                query = $.extend(commonQuery,new_param)
            }
            let that = this
            Vue.http.post('Offer2/setTask', query).then(response => {
                that.showAlert(response.body.msg, "success");
                that.updateOfferInfo(query)
                that.onDynamicSwitchSuccess()
            }, response => {
                that.showAlert(response.body.msg);
                that.editCancel()
            })
        },
        onChange(value,offer_param) {
            /*
            * 展示模态框的场景(offer_param === 'is_dynamic_revenue'):
            * 1. 非cps类型的offer
            * 2. cps类型offer、开关开启时，
            */
            this.value = value
            this.offer_param = offer_param
            if (
                offer_param === 'is_dynamic_revenue' && 
                ((this.offer_type !== 'cps') || (this.offer_type === 'cps' && value))
            ) {
                this.payoutModal = 'show'
            } else {
                this.hideModalAndcomfirmEdit()
            }
        },
        switchOnOfferAffDynamicCC(value,param) {
           this.is_dynamic_hide_conv = value ? 1 : 0;
        },
        getLevel4Info() {
            let that = this
            Vue.http.get("Affiliate/getBestLevelAffs").then(response => {
                that.level4Info = response && response.body && response.body.data || []
            }, response => {
            })
        },
        onSuccessUpdateDynamicPayout() {
            let that = this
            if (this.app_id) {
                this.getAppPayoutAndCaps()
            } else {
                this.getPayoutAndCapsByOfferId()
            }
            this.app_id = ''
        },
        calcuHideConvRange(n) {
            let result = '';
            if (n.is_dynamic_hide_conv == 1) {
                result = `${n.min_hide_conv}% ~ ${n.max_hide_conv}%`
            } else {
                result = n.hide_conv != 0 ? n.hide_conv : ''
            }
            result = (result + '') || "Use Default"
            if(result !== "Use Default" &&  result !== "Empty" && result != '') {
                if (result.indexOf("%") == -1){
                   result = result + "%"
                }
            }
            return result
        },
        onCCShown($editable_zone) {
            let that = this
            this.is_dynamic_hide_conv = parseInt($editable_zone.attr("data-is-dynamic-hide-conv"))
            this.$store.dispatch('updateSwitchInfo', {is_dynamic_hide_conv:this.is_dynamic_hide_conv})
            this.hide_conv = $editable_zone.attr("data-hide-conv") || ''
            this.min_hide_conv = $editable_zone.attr("data-min_hide_conv") || ''
            this.max_hide_conv = $editable_zone.attr("data-max_hide_conv") || ''
            this.app_id = $editable_zone.attr("data-app-id") || ''
            this.aff_id = $editable_zone.attr("data-aff-id") || ''
            let clone = this.$refs.dynamic
            $editable_zone.find(".editable-input").empty().append(clone)
            if (this.app_id) {
                this.editDynamicPayoutAssign = this.editAppPayoutAssign
            } else {
                this.editDynamicPayoutAssign = this.editPayoutAssign
            }
            this.render = true
        },
        getCustomParamDynamicConv(params, $el) {
            let is_dynamic_hide_conv = this.is_dynamic_hide_conv
            let new_params = {is_dynamic_hide_conv}
            let dom = $el
            if (this.is_dynamic_hide_conv == 1) {
                let min_hide_conv = dom.find("[name=min_hide_conv]").trimVal()
                let max_hide_conv = dom.find("[name=max_hide_conv]").trimVal()
                this.min_hide_conv = min_hide_conv
                this.max_hide_conv = max_hide_conv
                new_params = _.extend(new_params, {min_hide_conv,max_hide_conv});
            } else {
                let hide_conv = dom.find("[name=hide_conv]").trimVal()
                new_params = _.extend(new_params,{hide_conv})
                this.hide_conv = hide_conv
            }
            return new_params
        },
        getCustomParam_switch_DynamicHideConv(params, $el) {
            let init = {
                offer_id:this.id,
                aff_id:this.aff_id,
                hide_conv:this.hide_conv
            }
            if (this.app_id) {
                init.app_id = this.app_id
            }
            return  _.extend(init, params);
            
        },
        showLoading() {
            this.loadingZone = true;
        },
        hideLoading(){
            this.loadingZone = false;
        },
        setUniformNum(num){
            if(!num) {
                return num
            } else {
                return num.toFixed(3)
            }
        },
        getCustomParamNoDynamicRevenue() {
            var query = {
                method:-1,
                cps_payout_percentage:'',
                cps_revenue_percentage:'',
            }
            return query
        },
        getActiveAppUser() {
            let publisher_ids = _.uniq(_.map(this.appAccessInfo, "publisher_id"))

            let arr = []
            let that = this
            _.each(publisher_ids, function(v,k){
                let _index = _.findIndex(that.activeUser, {id: v})
                if( _index !== -1){
                    arr.push(that.activeUser[_index])
                }
            })
            that.activeAppUser = arr
        },
        getAffAccessApproved() {
            var approved = this.affAccessInfo && this.affAccessInfo.approved || []
            approved = approved.map(function(c_obj) {
                var pm = c_obj.pm ? (' - ' + c_obj.pm) :'';
                var text =  c_obj.id + ' - ' + (c_obj.first_name || '') +  ' ' + (c_obj.last_name || '') + pm;
                var name = (c_obj.first_name || '') +  ' ' + (c_obj.last_name|| '');
                return { id: c_obj.id, name: name, text:text};
            })
            this.approved = approved
        },
        callBack() {
            //do somethig
        },
        onShowHideConv($el){
            if (!$el.find(".append").length){
                $el.find(".editable-input").after("<p class='append inline-block ml5'>% (For all Affiliates)</p>")
            }
        },
        onRenderAfter($el){
           /* let text = $el.text() || "Use Default"
            if( text !== "Use Default" &&  text !== "Empty" && text != '') {
                if (text.indexOf("%") == -1){
                    $el.text(text + "%")
                } else {
                    $el.text(text)
                }
            }*/
        },
        displayOpt:function(value, sourceData ,$el) {
            
            if (value !== "") {
                if ($el.attr('data-field-name') == 'revenue_per_conversion') {
                    $el.html(revenue_flag + value);
                } else if ($el.attr("data-name") === 'hide_conv') {
                    $el.html(value + '%');
                } else {
                    $el.html('$' + value);
                }
            }
        },
        setSelectedVal(val,name,text) {
            this.selectedOptionValue = val
            this.selectedOptionName = name
            this.selectedOptionText = text
        },
        setOfferEditAuthPayment(){
            if(this.offerInfo.is_import_offer === "1"){
                this.is_import_offer = 1
                setReadOnly($("#box-content-payout-aff .editable"), 500)
                setReadOnlyFactory(['button', 'switch', 'checkbox', 'select', 'text', ' textarea'],$("#box-content-payout-aff") )
            }
        },
        setAddPayoutAuth(){
            let support = this.userInfo.role_id;
            let is_writeable = this.offerInfo.is_writeable
            let AMTest = /AM/.test(this.userInfo.name)
            if ((!AMTest && (is_writeable == 0 || support == 14)) || (this.offerInfo.is_import_offer === "1")) {
                setReadOnly($(".btn_add_payout"), 500)
            }
        },
        setSelectedAffVal(val, name, text) {
            this.selectedAff =  val
            this.selectedAffName = name
            this.selectedAffText = text
        },
        setSelectedAppVal(val, text) {
            this.selectedApp =  val;
            this.selectedAppText =  text
        },
        addAffiliatePayout() {
            if(!this.selectedOptionValue || _.findIndex(this.payoutAndCapsInfo, {aff_id: this.selectedOptionValue}) !== -1 || _.findIndex(this.payoutAndCapsInfo, {aff_id: parseInt(this.selectedOptionValue)}) !== -1) return
            var pm =  (this.selectedOptionText.split(" - ") || [] )[2]

            var affiliatePayout = {
                aff_id:this.selectedOptionValue,
                first_name:this.selectedOptionName,
                last_name:"",
                pm:pm,
                payout:"",
                revenue:"",
                hide_conv:"",
                caps_redirect_offer_id:0
            }
            let newData = _.clone(this.payoutAndCapsInfo)
            newData.push(affiliatePayout)
            this.getPayoutAndCapsByOfferId(newData)
            //this.payoutAndCapsInfo.push(affiliatePayout)
        },
        addAppPayout(){
            if(!this.selectedApp || !this.selectedAff || _.findIndex(this.appPayoutInfo, {app_id: this.selectedApp}) !== -1 || _.findIndex(this.appPayoutInfo, {app_id: parseInt(this.selectedApp)}) !== -1) return;
            var pm =  (this.selectedAffText.split(" - ") || [] )[2]

            var appPayout = {
                aff_id:this.selectedAff,
                app_id:this.selectedApp,
                app_name:this.selectedAppText,
                first_name:this.selectedAffName, 
                last_name: "",
                pm:pm,
                payout:"",
                revenue:"",
                hide_conv:"",
            }
            let newData = _.clone(this.appPayoutInfo)
            newData.push(appPayout)  
            this.getAppPayoutAndCaps(newData)
            //this.appPayoutInfo.push(appPayout)
        },
        getActiveApp(publisher_id){
            let arr = []
            _.map(this.appAccessInfo, function(v,k){
                if(v.publisher_id == publisher_id){
                    arr.push(v)
                }
            })
            var info = arr.map(function(c_obj) {
                var text =  c_obj.id + ' - ' + c_obj.name;
                var name = c_obj.name;
                return { id: c_obj.id, name: name, text:text, publisher_id:c_obj.publisher_id};
            })
            this.activeApp =  info
        },
        getHideConv(n){
            let is_dynamic = this.offerInfo.is_dynamic_revenue === '1',
                default_payout = this.offerInfo.payout_per_conversion,
                default_revenue = this.offerInfo.revenue_per_conversion,
                revenue,payout
            if(is_dynamic) {
                revenue = default_revenue;
                default_payout = this.offerInfo.dynamic_revenue_value
                payout = default_payout.replace("%", "") / 100 * revenue;
            } else {
                revenue = n.revenue || default_revenue ;
                payout = n.payout || default_payout;
                let _currencyType = this.currency;
                if (_currencyType == "EUR(€)") {
                    revenue = revenue * this.EUR_CURRENCY;
                } else if (_currencyType == "GBP(￡)") {
                    revenue = revenue * this.GBP_CURRENCY;
                }
            }

            let count = 0;
            if (payout === "" || payout === "0" || payout === 0 || payout === '0.000') {
                count = 0
            } else {
                let _val = (1 - revenue / payout) < 0 ? 0 : (1 - revenue / payout)
                count = (_val * 100).toFixed(0)
            }
            return 'At least ' + count + "%";
        },
        getCustomParam_HideConv(params, $el){
            let custom = this.getCustomParamDynamicConv(params, $el)
            let init = this.getCustomParam(params, $el, {})
            let updateParams = _.extend(custom,init)
            return updateParams
        },
        getCustomParam_Revenue(params, $el){
            return this.getCustomParam(params, $el, {revenue_per_conversion : params.value})
        },
        getCustomParam_Payout(params, $el){
            return this.getCustomParam(params, $el, {payout_per_conversion : params.value})
        },
        getCustomParam(params, $el, extend) {
            let obj = {}
            obj.id = params.pk;
            obj.offer_id = params.pk
            if($el.attr("data-app-id")){
                obj.app_id = $el.attr("data-app-id")
            }
            if($el.attr("data-aff-id")){
                obj.aff_id = $el.attr("data-aff-id")
            }

            obj = _.extend(obj, extend)
            return  obj
        },
        setPayoutStyle($el){
            let revenue_flag = this.revenue_flag;
            let GBP_CURRENCY = this.GBP_CURRENCY;
            let EUR_CURRENCY = this.EUR_CURRENCY;
            let default_payout_value = this.offerInfo.is_dynamic_revenue === '1' ? this.offerInfo.dynamic_revenue_value : this.offerInfo.payout_per_conversion
            let default_revenue_value = this.offerInfo.revenue_per_conversion
            let n = $el.attr("offer_data")
            n = JSON.parse(n)
            let selector_id = n.app_id || n.aff_id 
            if (revenue_flag == '￡') {
                if ((default_payout_value - 0) > (default_revenue_value - 0) * GBP_CURRENCY) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (default_payout_value - 0) > (n.revenue - 0) * GBP_CURRENCY) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.payout - 0) > (default_revenue_value - 0) * GBP_CURRENCY) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (n.payout - 0) > (n.revenue - 0) * GBP_CURRENCY) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.revenue - 0) > (default_revenue_value - 0)) {
                    $('#rRevenue' + selector_id).addClass('red');
                }
                if ((n.payout - 0) > (default_payout_value - 0)) {
                    $('#rPayout' + selector_id).addClass('red');
                }
            } else if (revenue_flag == '€') {
                if ((default_payout_value - 0) > (default_revenue_value - 0) * EUR_CURRENCY) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (default_payout_value - 0) > (n.revenue - 0) * EUR_CURRENCY) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.payout - 0) > (default_revenue_value - 0) * EUR_CURRENCY) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (n.payout - 0) > (n.revenue - 0) * EUR_CURRENCY) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.revenue - 0) > (default_revenue_value - 0)) {
                    $('#rRevenue' + selector_id).addClass('red');
                }
                if ((n.payout - 0) > (default_payout_value - 0)) {
                    $('#rPayout' + selector_id).addClass('red');
                }
            } else {
                if ((default_payout_value - 0) > (default_revenue_value - 0)) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (default_payout_value - 0) > (n.revenue - 0)) {
                    $('#dPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.payout - 0) > (default_revenue_value - 0)) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if (n.revenue != "" && (n.payout - 0) > (n.revenue - 0)) {
                    $('#iPayout' + selector_id).addClass('red icon-arrow-up');
                }
                if ((n.revenue - 0) > (default_revenue_value - 0)) {
                    $('#rRevenue' + selector_id).addClass('red');
                }
                if ((n.payout - 0) > (default_payout_value - 0)) {
                    $('#rPayout' + selector_id).addClass('red');
                }
            }

        },
        hideModal:function() {
          this.modalState = false
          this.payoutModal = 'hide'
        },
        removePayout($event, aff_id){
            /*console.log($event)
            let $tr = $($event.target).closest("tr")
            $tr.hide("normal")
            let that = this
            that.resetPayout()
            //*/

            let that = this
            Vue.http.post("Offer2/deletePayoutAndCaps", {offer_id:this.id, aff_id:aff_id}).then(response => {
                that.getPayoutAndCapsByOfferId()
            }, response => {
                // error callback

            })
        },
        removeAppPayout($event, app_id){
/*
            console.log($event)
            let $tr = $($event.target).closest("tr")
            $tr.hide("normal")
            let that = this
            that.resetAppPayout()
            */
            let that = this
            Vue.http.post("Offer2/deleteAppPayoutAndCaps", {offer_id:this.id, app_id:app_id}).then(response => {
                that.getAppPayoutAndCaps()
            }, response => {
                // error callback

            })
        },
        onDynamicSwitchSuccess:function() {
            this.getPayoutAndCapsByOfferId()
            this.getAppPayoutAndCaps()
        },
        setHideConv:function(new_value){
            if(new_value === "0"){
                if(this.offerInfo.payout_per_conversion > this.offerInfo.revenue_per_conversion ) {
                    this.$store.dispatch('setOfferInfo', {payout_per_conversion:this.offerInfo.revenue_per_conversion})
                }
            }
            this.getPayoutAndCapsByOfferId && this.getPayoutAndCapsByOfferId()
        },
        validateCC(new_value) {
            if (Number(new_value) != NaN) {
                if (new_value >= 0 && new_value <= 100) return true
            }
            this.showAlert('This value is between 0 and 100');
        },
        
        validateOfferAffCC(new_value,$editable_zone) {
            /*
            * 渠道/app 单独设置cc
            * 限制cc为数字
            * 静态cc，不论渠道等级是几，都不允许设置负值
            */
            let affId = $($editable_zone).attr("data-aff-id")
            let appId = $($editable_zone).attr("data-app-id")
            let result = _.find(this.level4Info, function(ele) {
              return ele.id == affId
            })
            let $dom = $editable_zone
            let quality_level = result && result.quality_level || 1
            if (this.is_dynamic_hide_conv) {
                let min_hide_conv = $dom.find("[name=min_hide_conv]").trimVal()
                let max_hide_conv = $dom.find("[name=max_hide_conv]").trimVal()
                if (min_hide_conv == '' || max_hide_conv == '') {
                    this.showAlert('Value cannot be empty.');
                    return false
                }
                if (Number(min_hide_conv) != NaN && Number(max_hide_conv) != NaN && Number(min_hide_conv) >= Number(max_hide_conv)) {
                    this.showAlert('Min hide conv cannot larger than max hide conv');
                    return false
                }
                if (quality_level == 4) {
                    if (Number(min_hide_conv) != NaN && Number(max_hide_conv) != NaN && min_hide_conv <= 100 && max_hide_conv <= 100) {
                        return true
                    } else {
                       this.showAlert('This value is less than or equal to 100'); 
                        return false
                    }
                } else {
                    if (Number(min_hide_conv) != NaN && Number(max_hide_conv) != NaN) {
                        if (min_hide_conv >= 0 && min_hide_conv <= 100 && max_hide_conv >= 0 && max_hide_conv <= 100) {
                            return true   
                        }
                    }
                    this.showAlert('This value is between 0 and 100');
                    return false
                }
            } else {
                // 静态cc，不论渠道等级是几，都不允许设置负值
                let _value = $dom.find("[name=hide_conv]").trimVal()
                if (_value == '') {
                    this.showAlert('Value cannot be empty.');
                    return false
                }
                if (Number(_value) != NaN && _value >= 0 && _value <= 100) {
                    return true
                }
                this.showAlert('This value is between 0 and 100');
                return false
            }
        },
    },

    props:{
      renderOffer:{default:false},
      offerInfo:{},
      showAlert:{},
      affAccessInfo:{},
      payoutAndCapsInfo:{},
      appPayoutInfo:{},
      EUR_CURRENCY:{},
      GBP_CURRENCY:{},
      getPayoutAndCapsByOfferId:{},
      getAppPayoutAndCaps:{},
      appAccessInfo:{},
      activeUser:{},
      userInfo:{},
      setOfferEditAuth:{},
      updateOfferInfo:{},
      editCancel:{},
    },
    created () {
        this.helpTips = paymentHelpTips
        this.getLevel4Info();
    },
    mounted () {
    }
}
</script>


<style scoped>
.box-sub-header {
    padding: 0;
    margin: 30px 0;
}
.box-sub-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 0 0 0 10px;
    font-weight: bold;
}

[data-toggle="tooltip"] {
    font-size: 15px;
    position: absolute;
    left: -25px;
    width: 20px;
    margin-top: -10px;
    top: 50%;
}
.cc{
    display: flex;    
    align-items: center;
    width: 200px;
}
.editable-input .input-small.form-control {
    width: 45%;
    min-width: 45%;
}
.table>thead>tr>th,.table tbody tr td{
    padding-left: 0;
    padding-right: 0;
}
.default_payout_value,.default_revenue_value{
    text-align: center;
}
.custom{
    width: 15% !important;
}
.customOffset{
    margin-left: 15%;
}
</style>