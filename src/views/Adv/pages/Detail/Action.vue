<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box">
        <div class="box-header">
            <h2>Action</h2>
        </div>
        <div class="box-container form-horizontal">
            <div class="box-sub-header">
                <h3>Budget Action</h3>
            </div>
            <div class="box-container">
                <div class="box-content">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="fixed_cap_exceed">Offer Action<help-box :content="offer_action"></help-box></label>
                        <div class="controls col-md-4">
                            <editable_select2_adv class="inline-block" :showAlert="showAlert" :source="sourceOfferAction" :adv_name="'offer_expiration_action'" :adv_val="advData.offer_expiration_action" :getCustomParam="getCustomParam" :onShown="onShown" :onHidden="onHidden" :onSelectChange="onSelectChange" :savenochange="true" :needConfirmModal="false"  :onSuccess="onSuccess" :renderAdv="renderAdv"></editable_select2_adv>
                            <select class="mt10 mb20" v-show="currentOfferAction === 'RENEW'" v-model="renew_offset">
                              <option value="ONE_WEEK">One Week</option>
                              <option value="ONE_MONTH">One Month</option>
                            </select>
                        </div>
                    </div>

                    <div class="control-group form-group">
                        <label class="control-label col-md-2" for="fixed_cap_exceed">Fixed Cap Exceed<help-box :content="fixed_cap_exceed"></help-box></label>
                        <div class="controls col-md-4">
                            <editable_select2_adv class="inline-block" :showAlert="showAlert" :source="sourceFixedCapExceed" :adv_name="'caps_exceed_action'" :adv_val="advData.caps_exceed_action" :savenochange="true" :needConfirmModal="false"  :renderAdv="renderAdv"></editable_select2_adv>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import editable_select2_adv from '@/components/Editable_Select2_Adv.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import { mapGetters, mapActions } from 'vuex'
import alert_pop_util from '@/util/alert_pop'

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');


import Vue from 'vue'


export default {
  data(){
    return {
            loadingZone:"",
            sourceOfferAction:[
                {"id":"1", "value":"DO_NOTHING", "text":"Do Nothing"},
                {"id":"3", "value":"SUSPEND_OFFER","text":"Suspend Offer"},
                {"id":"4", "value":"RENEW","text":"Renew"}
            ],
            currentOfferAction:"",
            renew_offset:"ONE_WEEK",
            sourceFixedCapExceed:[
                {"id":"1", "value":"DO_NOTHING", "text":"Do Nothing"},
                {"id":"2", "value":"EMAIL","text":"Email"},
                {"id":"3", "value":"SUSPEND_OFFER","text":"Suspend Offer"},
            ],
            offer_action: "Do Nothing：System won’t change offer’s status after this adv’s budget is exhausted.</br>Suspend offer：System will change offer’s status from active to suspend after this adv’s budget is exhausted.</br>Renew： System will extend the expiration date of active offers for one week/month after this adv’s budget is exhausted.",
            fixed_cap_exceed: "Do Nothing：System won’t change anything about this adv’s offer after cap is exceed.Email：System will send email automatically to affiliates to notice that offer’s cap is exceed </br>Suspend offer：System will change offer’s status from active to suspend after this adv’s cap is exceed."
        }
    },
  mixins: [mixin_alert_msg],
  computed: {
  },
  components:{editable_select2_adv,HelpBox},
  methods: {
    onSelectChange(e, $dom){
      this.currentOfferAction = e.val
    },
    onShown(){
      this.currentOfferAction = this.advData.offer_expiration_action
      this.renew_offset = this.advData.renew_offset || "ONE_WEEK"
    },
    getCustomParam(){
      let params = {offer_expiration_action: this.currentOfferAction}
      if(this.currentOfferAction === "RENEW") {
        params.renew_offset = this.renew_offset
      }
      return params;
    },
    onHidden(){
        this.currentOfferAction = ""
    },
    onSuccess(){
      this.advData.offer_expiration_action = this.currentOfferAction
      this.advData.renew_offset = this.renew_offset
    }
  },
  created () {
  },
  props:{
    advData:{},
    renderAdv:{default:false},
  },
}
</script>
<style scoped>
.box-sub-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    border-bottom: 1px solid #ccc;
    padding: 0 0 0 10px;
    font-weight: bold;
}
.box-content {
    min-height: 50px;
}
</style>
