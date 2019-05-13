<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Publisher Management</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="row-fluid row">
        <div class="col-md-6">
            <submodule_basic    :showAlert="showAlert"></submodule_basic>
            <submodule_contact    :showAlert="showAlert"></submodule_contact>
            <submodule_settings    :showAlert="showAlert"></submodule_settings>
            <submodule_question    :showAlert="showAlert"></submodule_question>
            <submodule_radar    :showAlert="showAlert"></submodule_radar>
        </div>
        <div class="col-md-6">
            <submodule_block_adv    :showAlert="showAlert"></submodule_block_adv>
            <submodule_block_sub_aff    :showAlert="showAlert"></submodule_block_sub_aff>
            <submodule_settings_yeahmobi    :showAlert="showAlert"></submodule_settings_yeahmobi>
            <submodule_offline_api    :showAlert="showAlert"></submodule_offline_api>
            <submodule_realtime_api    :showAlert="showAlert"></submodule_realtime_api>
            <submodule_sdk_integration    :showAlert="showAlert"></submodule_sdk_integration>
            <submodule_dsp_integration    :showAlert="showAlert"></submodule_dsp_integration>
            <submodule_cps_api    :showAlert="showAlert"></submodule_cps_api>
            <submodule_publisher_app    :showAlert="showAlert"></submodule_publisher_app>
            <submodule_billing    :showAlert="showAlert"></submodule_billing>
            <submodule_note    :showAlert="showAlert"></submodule_note>
            <submodule_statistics    :showAlert="showAlert"></submodule_statistics>


        </div>
    </div>




</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'

import commonDataAPI from '@/api/commonData'


import submodule_settings_yeahmobi from "./Manage/Settings_Yeahmobi.vue"
import submodule_offline_api from "./Manage/Settings_Offline_API.vue"
import submodule_realtime_api from "./Manage/Settings_Realtime_API.vue"
import submodule_sdk_integration from "./Manage/Settings_SDK_Integration.vue"
import submodule_dsp_integration from "./Manage/Settings_DSP_Integration.vue"
const submodule_settings = () => import(
/* webpackChunkName: "submodule_settings" */ "./Manage/Settings.vue"
);

const submodule_block_adv = () => import(
/* webpackChunkName: "submodule_block_adv" */ "./Manage/Block_Adv.vue"
);

const submodule_block_sub_aff = () => import(
/* webpackChunkName: "submodule_block_sub_aff" */ "./Manage/Block_Sub_Aff.vue"
);



const submodule_publisher_app = () => import(
/* webpackChunkName: "submodule_publisher_app" */ "./Manage/Publisher_App.vue"
);

const submodule_note = () => import(
/* webpackChunkName: "submodule_note" */ "./Manage/Note.vue"
);

const submodule_billing = () => import(
/* webpackChunkName: "submodule_billing" */ "./Manage/Billing.vue"
);

const submodule_cps_api = () => import(
/* webpackChunkName: "submodule_cps_api" */ "./Manage/Settings_CPS_API.vue"
);

const submodule_basic = () => import(
/* webpackChunkName: "submodule_basic" */ "./Manage/Basic.vue"
);

const submodule_contact = () => import(
/* webpackChunkName: "submodule_contact" */ "./Manage/Contact.vue"
);


const submodule_question = () => import(
/* webpackChunkName: "submodule_question" */ "./Manage/Question.vue"
);

const submodule_statistics = () => import(
/* webpackChunkName: "submodule_statistics" */ "./Manage/Statistics.vue"
);

const submodule_radar = () => import(
    /* webpackChunkName: "submodule_question" */ "./Manage/RadarMap.vue"
);



export default {
  data(){
    return {
            loadingZone:"",
            publisherInfo:{},

        }
    },
  mixins: [mixin_alert_msg],
  computed: {
    ...mapGetters({
      chosens:"chosens"
    })
  },
  components:{AlertPop, submodule_basic, submodule_contact, submodule_settings, submodule_block_adv, submodule_block_sub_aff, submodule_settings_yeahmobi, submodule_offline_api, submodule_realtime_api, submodule_sdk_integration,submodule_dsp_integration, submodule_cps_api,submodule_billing, submodule_note, submodule_statistics,submodule_publisher_app,submodule_question, submodule_radar},
  computed:{

  },
  methods: {
    ...mapActions([ 
      'getChosen'
    ])
  },
  created () {
    let that = this


  }
}
</script>
