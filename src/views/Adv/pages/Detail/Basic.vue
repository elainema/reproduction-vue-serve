<template>
<div class="box">
    <div class="box-header">
        <h2>Basic</h2>
        <div class="box-action">
        </div>
    </div>
    <div class="box-container">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Advertiser </label>
                <div class="controls col-md-10">
                    <span id="id" class="text" v-text="advData.id"></span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Company Name</label>
                <div class="controls col-md-10"> 
                  <editable_text_adv 
                    v-if="userInfo.id == 4" 
                    :editable_id="'company'" 
                    :showAlert="showAlert" 
                    :adv_name="'company'"
                    :adv_val="advData.company" 
                    :renderAdv="renderAdv"
                  ></editable_text_adv> 
                  <span v-else>{{advData.company}}</span>
                </div>
            </div>

            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Contract</label>
                <div class="controls col-md-10">
                    <editable_select2_adv 
                      v-if="userInfo.id == 4"
                      class="inline-block" 
                      :showAlert="showAlert" 
                      :source="sourceContract" 
                      :getCustomParam="getCustomParam_Contract" 
                      :adv_name="'contract_id'" 
                      :adv_val="advData.contract_id" 
                      :savenochange="true" 
                      :renderAdv="renderAdv" 
                    ></editable_select2_adv >
                    <span v-else>{{advData.contract_id}}</span>
                </div>
            </div>

            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Address 1</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'address1'" 
                      :showAlert="showAlert" 
                      :adv_name="'address1'"
                      :adv_val="advData.address1" 
                      :renderAdv="renderAdv"></editable_text_adv>
                    <span v-else>{{advData.address1}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Address 2</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'address2'" 
                      :showAlert="showAlert" 
                      :adv_name="'address2'"
                      :adv_val="advData.address2" 
                      :renderAdv="renderAdv"></editable_text_adv>
                    <span v-else>{{advData.address2}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Country</label>
                <div class="controls col-md-10">
                    <editable_select2_adv 
                      :isDisabled="userInfo.id == 4 ? false : true" 
                      class="inline-block" 
                      :showAlert="showAlert" 
                      :source="sourceGeo"
                      :adv_name="'country_id'" 
                      :adv_val="advData.country_id"
                      :savenochange="true" 
                      :renderAdv="renderAdv"></editable_select2_adv>                    
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Region</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'region'" 
                      :showAlert="showAlert" 
                      :adv_name="'region'"
                      :adv_val="advData.region" 
                      :renderAdv="renderAdv"></editable_text_adv>
                      <span v-else>{{advData.region}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">City</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'city'" 
                      :showAlert="showAlert" 
                      :adv_name="'city'"
                      :adv_val="advData.city" 
                      :renderAdv="renderAdv"></editable_text_adv>
                      <span v-else>{{advData.city}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Zipcode</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'zipcode'" 
                      :showAlert="showAlert" 
                      :adv_name="'zipcode'"
                      :adv_val="advData.zipcode" 
                      :renderAdv="renderAdv"></editable_text_adv>
                    <span v-else>{{advData.zipcode}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">phone</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'phone'" 
                      :showAlert="showAlert" 
                      :adv_name="'phone'"
                      :adv_val="advData.phone" 
                      :renderAdv="renderAdv"></editable_text_adv>
                    <span v-else>{{advData.phone}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Fax</label>
                <div class="controls col-md-10">
                    <editable_text_adv 
                      v-if="userInfo.id == 4" 
                      :editable_id="'fax'" 
                      :showAlert="showAlert" 
                      :adv_name="'fax'"
                      :adv_val="advData.fax" 
                      :renderAdv="renderAdv"></editable_text_adv>
                    <span v-else>{{advData.fax}}</span>
                </div>
            </div>

            <div class="control-group form-group" id="tracking">
                <label class="control-label col-md-2" for="tracking_system">Tracking System</label>
                <div class="controls col-md-10 ">
                    <editable_select2_adv 
                      v-if="userInfo.id == 4" 
                      class="inline-block" 
                      :showAlert="showAlert"
                      :source="sourceTrackingSystem" 
                      :adv_name="'tracking_system'"
                      :adv_val="tracking_system" 
                      :savenochange="true"
                      :needConfirmModal="true" 
                      :renderAdv="renderAdv" 
                      :onShown="onShown"
                      :getCustomParam="getCustomParam" 
                      :onSelectChange="onSelectChange"
                      :onSuccess="onTrackingSuccess"></editable_select2_adv>
                      <span v-else>{{tracking_system}}</span>
                    <span class="other" v-if="is_other_tracking_system">Other：{{advData.tracking_system}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Grade</label>
                <div class="controls col-md-10">
                    <editable_select2_adv 
                      v-if="userInfo.id == 4" 
                      class="inline-block" 
                      :showAlert="showAlert" 
                      :source='sourceAdvGrade'
                      :adv_name="'grade'" 
                      :adv_val="advData.grade"
                      :renderAdv="renderAdv"></editable_select2_adv>
                    <span v-else>{{advData.grade}}</span>
                </div>
            </div>
            <div class="control-group form-group form-group">
                <label class="control-label col-md-2">Level</label>
                <div class="controls col-md-10">
                    <span class="text">{{advData.level}}</span>
                </div>
            </div>

            <div v-if="matrix">
                <label class="control-label col-md-2">Predict Level</label>
                <div class="controls col-md-10">
                    <a href="javascript:;" @click="showPalarChart=!showPalarChart" class="editable-click">{{predict_level}}</a>
                    <polarChart 
                      v-if="showPalarChart" 
                      :predict_level="predict_level" 
                      :matrix="matrix"
                      :stats="stats"
                  ></polarChart>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
import alert_pop_util from '@/util/alert_pop'
import mixin_dialog from '@/mixins/dialog'
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import(
/* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/'
);
const Modal = () => import( /* webpackChunkName: "Modal" */ '@/components/common/modal/');

import Vue from 'vue'
import editable_text_adv from '@/components/Editable_Text_Adv.vue'
import editable_select2_adv from '@/components/Editable_Select2_Adv.vue'

export default {
  data () {
    return {
      alertMsg:"",
      alertType:"info",
      alertPop:"hide",
      modalState:false,
      sourceTrackingSystem: [
          {"id": "Adjust", "text": "Adjust"},
          {"id": "Appsflyer", "text": "Appsflyer"},
          {"id": "MAT", "text": "MAT"},
          {"id": "other", "text": "Other 3rd Party System"},
          {"id": "Self-Tracking", "text": "Self-Tracking"}],
    };
  },
  props: {
    advData: {
      type: Object,
      required: true,
    },
    userInfo:{
      type: Object,
      required: true,
    },
    sourceAdvGrade:{
      type: Array,
      required: true,
    },
    matrix:{
      type: String,
      required: true,
    },
    getCustomParam_Contract:{
      type: Function,
      required: true,
    },
    getCustomParam:{
      type: Function,
      required: true,
    },
    sourceGeo:{
      type: Array,
      required: true,
    },
    renderAdv:{
      type: Boolean,
      required: true,
    },
    sourceContract:{
      type: Array,
      required: true,
    },
    showPalarChart:{
      type: Boolean,
      required: true,
    },
    predict_level:{
      type: [Number,String],
      required: true,
    },
    stats:{
      type: [Number,String],
      required: true,
    },
    onTrackingSuccess:{
      type: Function,
      required: true,
    },
  },
  mixins: [mixin_alert_msg,mixin_dialog],
  components:{
    Modal,
    AlertPop,
    editable_text_adv,
    editable_select2_adv
  },
  computed: {
    is_other_tracking_system() {
        let id_arr = _.map(this.sourceTrackingSystem, "id")
        return this.advData.tracking_system && (id_arr.indexOf(this.advData.tracking_system) == -1 || this.advData.tracking_system === "other") || false
    },
    tracking_system() {
        let id_arr = _.map(this.sourceTrackingSystem, "id")

        if (!this.advData.tracking_system) {
            return ""
        } else if (id_arr.indexOf(this.advData.tracking_system) == -1 || this.advData.tracking_system === "other") {
            return "other"
        } else {
            return this.advData.tracking_system
        }

    },
  },
  methods: {
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
  }
}
</script>

<style scoped>
</style>
