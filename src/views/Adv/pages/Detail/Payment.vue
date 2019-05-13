<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box">
        <div class="box-header">
            <h2>Payment<help-box :content="payment"></help-box></h2>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Budget</label>
                    <div class="controls overflow_scroll">
                        <editable_budget_adv :offer_val="JSON.stringify(advData)"  :savenochange=true :is_adv_caps="true" class="inline-block" :showAlert="showAlert" :renderAdv="renderAdv" :validate="validate"></editable_budget_adv>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"></label>
                    <div class="controls">
                      <input type="button" value="Start A New Budget Cycle" class="btn" @click.prevent="showModal">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <confirmModal :modalState="modalState" :hideModal="hideModal"  :onConfirm="fixed_cap_reset" :editable_modal_body="editable_modal_body" :classList="'red'"></confirmModal> -->
    <modal 
      :dialogVisible.sync="modalState" 
      :dialogBody="editable_modal_body" 
      :title="'Comfirm'"
      :classList="'red'"
      :closeOnClickModal="false"
      :onConfirm="fixed_cap_reset">
    </modal>
</div>
</template>
<script>
import alert_pop_util from '@/util/alert_pop'

import { mapGetters, mapActions } from 'vuex'
import AlertPop from '@/components/common/alert-pop/'
import editable_budget_adv from '@/components/Editable_Budget_Adv.vue'
//import confirmModal from '@/components/ConfirmModal.vue'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
import mixin_alert_msg from '@/mixins/alert_msg'
const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/'
);

import Vue from 'vue'
import VueScript2  from 'vue-script2'


export default {
  data(){
    return {
            loadingZone:"",
            modalState:'hide',
            editable_modal_body:'Are you sure you want to start a new budget cycle?',
            payment : "Set payment info at adv level.</br>Notice：If you set daily conversion info both at adv page and offer page, then the smaller one will take effect.",
        }
    },
  mixins: [mixin_alert_msg],
  computed: {
  },
  components:{AlertPop,editable_budget_adv,Modal,HelpBox},
  methods: {
    hideModal() {
        this.modalState = 'hide'
    },
    showModal() {
        this.modalState = 'show'
    },
    validate(value) {
        var msg = false;
        var $self = $(this);
        let that = this;
        $.each(value, function(i, v) {
            if (i == 'is_caps' && v == 1) {
              var flag = [];
              $.each(['daily_conversions', 'monthly_conversions', 'daily_payout', 'monthly_payout', 'daily_revenue', 'monthly_revenue', 'fixed_conversions', 'fixed_payout', 'fixed_revenue'], function(index, key) {
                  if (value[key] - 0 == 0) {
                      flag.push(0);
                  } else {
                      flag.push(1);
                  }
              })
              if (flag.indexOf(1) == -1) {
                  msg = 'Conversion, Payout, Revenue fields can not be "0" when you choose Caps as "Yes"'
                  return msg;
              }
            }
            if (isNaN(v - 0)) {
              var dom = $self.next().find('input[name=' + i + ']');
              var txt = dom.parent('td').prev('td').text();
              msg = txt + ' Only numbers are allowed.';
              return msg;
            }
        })
        if (msg) {
          that.showAlert(msg)
          return msg;
        }
    },
    fixed_cap_reset() {
        this.loadingZone = true
        Vue.http.post('Advertiser/edit',{fixed_cap_reset:1, id:this.$route.query.id}).then(response => {
            this.showAlert(response.body.msg, 'success')
            this.loadingZone = false
        }, response => {
            this.showAlert(response.body.msg)
            this.loadingZone = false
        })
        this.modalState = false
    }
  },
  props:{
    advData:{},
    renderAdv:{default:false},
  },
  created () {
    //VueScript2.load('/js/bootstrap-editable/input-ext/budget.js')
  },
  watch:{
  },
  mounted() {
  },
}
</script>
