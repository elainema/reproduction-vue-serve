<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box">
        <div class="box-header">
            <h2>Credit</h2>
        </div>

        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Allow Credit</label>
                    <div class="controls">
                        <switch_offer :offer_param='"use_advanced_pixel"' :offer_val="0" :showAlert='showAlert' :renderOffer="renderOffer"></switch_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Credit Revenue</label>
                    <div class="controls">
                        <editable_text_adv  :editable_id="'company'" :showAlert="showAlert"  :adv_name="'company'" :adv_val="'123'" :renderAdv="renderAdv"></editable_text_adv>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import auth from '@/util/auth'
import alert_pop_util from '@/util/alert_pop'

import { mapGetters, mapActions } from 'vuex'
import alert_pop from '@/components/Alert_pop.vue'
import switch_offer from '@/components/Switch_Offer.vue'
import editable_text_adv from '@/components/Editable_Text_Adv.vue'

import mixin_alert_msg from '@/mixins/alert_msg'


import Vue from 'vue'


export default {
  data(){
    return {
            loadingZone:"",
            renderOffer:false,
            renderAdv:false,
        }
    },
  mixins: [mixin_alert_msg],
  computed: {

  },
  components:{alert_pop,switch_offer,editable_text_adv},
  methods: {
  },
  created () {
  },
  mounted() {
    this.renderOffer = true
    this.renderAdv = true
  },
}
</script>
