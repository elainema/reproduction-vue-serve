<template>
<div class="box">
  <div class="box-header">
      <h2>Settings</h2>
      <div class="box-action">
      </div>
  </div>
  <div class="box-container">
      <div class="box-content form-horizontal frm-entity frm-detail">
          <div class="control-group form-group">
              <label class="control-label col-md-2">Account Manager</label>
              <div class="controls col-md-10">
                  <editable_select2_adv class="inline-block" :showAlert="showAlert" :source='sourceAdvManager'
                                        :adv_name="'manager_passport_id'"
                                        :adv_val="advData.manager_passport_id"
                                        :renderAdv="renderAdv"></editable_select2_adv>


              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">BD Manager</label>
              <div class="controls col-md-10">
                  <editable_select2_adv class="inline-block" :showAlert="showAlert" :source='sourceAdvManager'
                                        :adv_name="'bd_manager_passport_id'"
                                        :adv_val="advData.bd_manager_passport_id"
                                        :renderAdv="renderAdv"></editable_select2_adv>

              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Collections Manager</label>
              <div class="controls col-md-10">
                  <editable_select2_adv 
                      class="inline-block" 
                      :showAlert="showAlert" 
                      :source='sourceAdvManager'
                      :adv_name="'collections_manager'"
                      :adv_val="advData.collections_manager"
                      :renderAdv="renderAdv">
                  </editable_select2_adv>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Account Status</label>
              <div class="controls col-md-10">
                  <editable_select2_adv class="inline-block" :showAlert="showAlert" :source='sourceStatus'
                                        :adv_name="'status'" :adv_val="advData.status" :otherParams="syncOffer"
                                        :renderAdv="renderAdv" confirmAgain="true" :editable_modal_body="adv_modal_body"></editable_select2_adv>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Email</label>
              <div class="controls col-md-10">
                  <editable_text_adv :editable_id="'login_email'" :showAlert="showAlert"
                                     :adv_name="'login_email'" :adv_val="advData.login_email"
                                     :renderAdv="renderAdv"></editable_text_adv>

              </div>
          </div>


          <div class="control-group form-group">
              <label class="control-label col-md-2">Password</label>
              <div class="controls col-md-10">
                  <a href="#" class="btn" id="change_psw" @click.prevent="changePass"> Change Password</a>
                  <span v-if="newPass">New Password is: {{newPass}}</span>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Create Time</label>
              <div class="controls col-md-10">
                  <span class="text" id="create_time">{{advData.create_time}}</span>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Create Account</label>
              <div class="controls col-md-10">
                  <span class="text" id="email">{{advData.email}}</span>
              </div>
          </div>

          <div class="control-group form-group">
              <label class="control-label col-md-2">Conversion White List<help-box :content="notice.conversion_white_list"></help-box></label>
              <!-- <offerConversionWhiteList :originIPS="new_ips" class="col-md-10"
                                        :white_list_name="'advertiser_white_ip'" :showAlert="showAlert"
                                        :editConversionWhiteList="switchDefaultAPI"
                                        :ADVWHITEIP="ADVWHITEIP"
                                        :query_param_name="'advertiser_white_ip'"></offerConversionWhiteList> -->
              <conversion-white-list
                  :originIPS="new_ips" 
                  class="col-md-10"
                  :white_list_name="'advertiser_white_ip'" 
                  :showAlert="showAlert"
                  :editConversionWhiteList="switchDefaultAPI"
                  :ADVWHITEIP="ADVWHITEIP"
                  :query_param_name="'advertiser_white_ip'"
              ></conversion-white-list>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Disable Caps Retro<help-box :content="notice.disable_caps_retro"></help-box></label>
              <div class="controls col-md-10">

                <!--   <switch_adv :switch_param='"disable_caps_retro"' :switch_val="advData.disable_caps_retro"
                            :showAlert='showAlert' :renderAdv="renderAdv"></switch_adv>
                 -->
                  <common-switch
                      :showAlert='showAlert'
                      :default_val="advData.disable_caps_retro"
                      :switch_param='"disable_caps_retro"'
                      :render="renderAdv"
                      :switchDefaultAPI="switchDefaultAPI">
                  </common-switch>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Report API<help-box :content="notice.report_api"></help-box></label>
              <div class="controls col-md-10">
                 <!--  <switch_adv :switch_param='"report_api_info"' class="pull-left mr10"
                             :getCustomParam="getCustomParam_ReportApi"
                             :switchDefaultAPI="'Advertiser/saveReportApi'"
                             :onSuccess="onReportApiSwitchSuccess"
                             :switch_val="report_api_info.status == 'active' ? '1':'' "
                             :showAlert='showAlert' :renderAdv="renderAdv"></switch_adv>
                              -->
                      <common-switch
                          class="pull-left mr10"
                          :showAlert='showAlert'
                          :default_val="report_api_info.status == 'active' ? 1: 0"
                          :switch_param='"report_api_info"'
                          :render="renderAdv"
                          :switchGetCustomParam="getCustomParam_ReportApi"
                          :switchDefaultAPI="'Advertiser/saveReportApi'"
                          :onSuccess="onReportApiSwitchSuccess">
                      </common-switch>
                  <span v-show="report_api_info.status === 'active'" class="text pull-left">API Key: {{report_api_info.api_key}}</span>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Disable Internal Tuning<help-box :content="notice.disable_internal_tuning"></help-box></label>
              <div class="controls col-md-10">
                 <!--  <switch_adv :switch_param='"disable_internal_tuning"'
                             :switch_val="advData.disable_internal_tuning" :showAlert='showAlert'
                             :renderAdv="renderAdv"></switch_adv> -->
                  <common-switch
                      :showAlert='showAlert'
                      :default_val="advData.disable_internal_tuning"
                      :switch_param='"disable_internal_tuning"'
                      :render="renderAdv"
                      :switchDefaultAPI="switchDefaultAPI">
                  </common-switch>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Third Party</label>
              <div class="controls col-md-10">
                 <!--  <switch_adv :switch_param='"is_3rd"'
                             :switch_val="advData.is_3rd" :showAlert='showAlert'
                             :renderAdv="renderAdv"></switch_adv> -->
                  <common-switch
                      :showAlert='showAlert'
                      :default_val="advData.is_3rd"
                      :switch_param='"is_3rd"'
                      :render="renderAdv"
                      :switchDefaultAPI="switchDefaultAPI">
                  </common-switch>
              </div>
          </div>
          <div class="control-group form-group">
              <label class="control-label col-md-2">Click Limit<help-box :content="notice.click_limit"></help-box></label>
              <div class="controls col-md-10">
                  <editable_text_adv class="inline-block" :editable_mode="'pop_up'"
                                     :adv_api="'Advertiser/saveNoRevenueClick'" :onShown="onShowClickLimit"
                                     :showAlert="showAlert" :adv_name="'click_num'"
                                     :adv_val="advData.click_num" :renderAdv="renderAdv"></editable_text_adv>

              </div>
          </div><div class="control-group form-group" >
                        <label class="control-label col-md-2">Net Cycle</label>
                        <div class="controls col-md-10">
                        <common-switch
                            :disabled="(userInfo.id == '4' || userInfo.id == '101498') ? false : 'disabled'"
                            :showAlert='showAlert'
                            :default_val="advData.collection_begin_type == 2 ? 1 : 0"
                            :switch_param='"collection_begin_type"'
                            :render="renderAdv"
                            :switchGetCustomParam="getCollectionCyclePara"
                            :switchDefaultAPI="switchDefaultAPI">
                        </common-switch>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Collection Cycle</label>
                        <div class="controls col-md-10">
                            <common-switch
                                :disabled="(userInfo.id == '4' || userInfo.id == '101498') ? false : 'disabled'"
                                :showAlert='showAlert'
                                :default_val="advData.collection_cycle_settype == 2 ? 1 : 0"
                                :switch_param='"collection_cycle_settype"'
                                :render="renderAdv"
                                yes_text="Manual"
                                no_text="Automatic"
                                :switchGetCustomParam="getCollectionCyclePara"
                                :switchDefaultAPI="switchDefaultAPI"
                                :onSuccess="onCycleSwitchSuccess">
                            </common-switch>
                        </div>
                        <div class="controls col-md-7">
                            <span v-show="collection_cycle_settype == 1">{{advData.collection_cycle ==''? 'Empty' : advData.collection_cycle}}</span>
                            <editable_text_adv 
                            :isDisabled="(userInfo.id == '4' || userInfo.id == '101498') ? false : true"
                            v-show="collection_cycle_settype == 2"
                            class="inline-block" :editable_mode="'pop_up'"
                            :onShown="onShowCollectionCycleEdit"
                            :showAlert="showAlert" :adv_name="'collection_cycle'"
                            :adv_val="advData.collection_cycle" :renderAdv="renderAdv"></editable_text_adv>
                        </div>
                    </div>
                    <div class="control-group form-group" v-if="userInfo.id == 4">
                        <label class="control-label col-md-2">Sync Ymboss</label>
                        <div class="controls col-md-10">
                            <button class="btn btn_block" @click.prevent="sendYMBoss" :disabled="btnDisabled">Send</button>
                        </div>
                    </div>

      </div>
  </div>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
//import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
const Modal = () => import( /* webpackChunkName: "Modal" */ '@/components/common/modal/');

import Vue from 'vue'
import editable_text_adv from '@/components/Editable_Text_Adv.vue'
import editable_select2_adv from '@/components/Editable_Select2_Adv.vue'
import CommonSwitch from '@/components/common/common-switch/'

import ConversionWhiteList from '@/components/business/conversion-white-list/'
// const ConversionWhiteList = () => import(
//  webpackChunkName: "ConversionWhiteList"  '@/components/business/conversion-white-list/'
// );
const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/'
);

export default {
  data () {
    return {
      modalState:false,
      switchDefaultAPI:'Advertiser/edit',
      sourceStatus: [{
          id: 'active',
          text: 'Active'
      }, {
          id: 'pending',
          text: 'Pending'
      }, {
          id: 'deleted',
          text: 'Deleted'
      }],
      adv_modal_body: "Whether to update the offer status?", 
      newPass: "",
      ADVWHITEIP: "",
      report_api_info: {},
      btnDisabled: false,

    }
  },
  computed: {
    new_ips() {
      return this.advData && this.advData.advertiser_white_ip && this.advData.advertiser_white_ip.split(',') || []
    },
    syncOffer(){
      return {
          is_manual_close: this.advData.is_manual_close,
          is_3rd: this.advData.is_3rd,
          ids: this.advData.pause_offers
      }
    }
  },
  props: {
    collection_cycle_settype:{

    },
    notice:{
      type: Object,
      required: true,
    },
    advData: {
      type: Object,
      required: true,
    },
    userInfo:{
      type: Object,
      required: true,
    },
    getCustomParam_ReportApi:{
      type: Function,
      required: true,
    },
    renderAdv:{
      type: Boolean,
      required: true,
    },
    sourceAdvManager: {
    	type:Array,
      required: true,
    },
    showAlert:{}
  },
  mixins: [mixin_dialog],
  components:{
    Modal,
    AlertPop,
    editable_text_adv,
    editable_select2_adv,
    ConversionWhiteList,
    HelpBox,
    CommonSwitch
  },
  methods: {
    onShowCollectionCycleEdit($el) {
        if (!$el.find(".append").length) {
            $el.find(".editable-input input").attr("type", "number")
            $el.find(".editable-input input").attr("min", "0")
        }
    },
    onCycleSwitchSuccess(param,value){
        this.collection_cycle_settype = value == 1 ? 2 : 1
    },
    getCollectionCyclePara(param, value){
        if (value == 1){
            value = 2
        }
        else if (value == 0){
            value = 1
        }
        let params={}
        params.id = this.$route.query.id
        params[param] = value
        return params
    },
    onShowClickLimit($el) {
        if (!$el.find(".append").length) {
            $el.find(".editable-input input").attr("type", "number")
            $el.find(".editable-input input").attr("min", "0")
            $el.find(".editable-input").after("<p class='append inline-block ml5'> (For All Affiliate)</p>")
        }
    },
    onReportApiSwitchSuccess(param,value) {
        if (param) {
            this.report_api_info.status = value == 1 ? "active" : "block";
            this.report_api_info.api_key = this.report_api_info.api_key || this.api_key
        }
    },
    changePass() {
        let newPass = this.generate_password()
        Vue.http.post('Advertiser/edit', {id: this.$route.query.id, password: newPass}).then(response => {

            this.newPass = newPass;

        }, response => {
            this.showAlert(response.body.msg)
        })
    },
    onShown: function ($editable) {
      if (this.is_other_tracking_system) {
        if ($editable.find("#otherTracking").length == 0) {
            $editable.find(".editable-buttons").before('<input id="otherTracking" class="form-control" type="text" value="' + this.advData.tracking_system + '" />');
        } else {
            $editable.find("#otherTracking").show()
        }
      }
    },
    onEditableSubmit() {
      this.modalState = true;
      return false
    },
    onSelectChange: function (e, $editable) {
        //如果tracking system选择的是other，显示输入框，允许用户自己输入
        if (e.val == "other") {
            if ($editable.find("#otherTracking").length <= 0) {
                $editable.find(".editable-buttons").before('<input id="otherTracking" class="form-control" type="text" value="" />');
            } else {
                $editable.find("#otherTracking").show();
            }
        } else {
            $editable.find("#otherTracking").empty().hide();
        }
    },
    generate_password(length) {
        var x = '23456789abcdefghijkmnpqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXY',
            tmp = '',
            length = length || 6;

        for (var i = 0; i < length; i++) {
            tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
        }

        return tmp;
    },
    changePass() {
        let newPass = this.generate_password()
        Vue.http.post('Advertiser/edit', {id: this.$route.query.id, password: newPass}).then(response => {

            this.newPass = newPass;

        }, response => {
            this.showAlert(response.body.msg)
        })
    },
  }
}
</script>