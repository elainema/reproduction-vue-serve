<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box">
        <div class="box-header">
            <h2>Predict Level</h2>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <polarChart></polarChart>
        </div>
    </div>
</div>
</template>
<script>

import { mapGetters, mapActions } from 'vuex'
import AlertPop from '@/components/common/alert-pop/'
import polarChart from '@/components/PolarChart.vue'

import mixin_alert_msg from '@/mixins/alert_msg'


import Vue from 'vue'


export default {
  data(){
    return {
        loadingZone:""
        }
    },
  mixins: [mixin_alert_msg],
  computed: {
  },
  components:{polarChart,AlertPop},
  methods: {

  },
  props:{
    advData:{},
    renderAdv:{default:false},
  },
  created () {
  },
  watch:{
  },
  mounted() {
  },
}
</script>
