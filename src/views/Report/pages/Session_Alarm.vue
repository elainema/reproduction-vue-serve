
<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">Session IP Alarm</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <div class="box-header" v-box-action-resize>
            <h2>Session IP Alarm</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container ">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">
                <div class="form-group well">
                    <form class="form-horizontal frm-entity frm-detail" id="q_aff"  ref="form" @submit.stop.prevent="submitForm">
                        <div class="row-fluid">
                            <div class="col-md-12 date">
                                <dateTimePicker_range_weeks :callBack="callBack"></dateTimePicker_range_weeks>
                            </div>
                            <div class="col-md-2 am_div hide">
                                <select id="chose_am" name="am">
                                    <option value="">-All AM-</option>
                                </select>
                            </div>
                            <div class="col-md-6 search mt10">
                                <div>
                                    <select2Aff  :select2_mode='"simple"' :select2_class="'col-md-7 nopadding'" :aff_name='"aff_ids"' class="mb10"></select2Aff>
                                </div>
                                <button type="submit" class="btn btn-primary mt10" id="search_page">Search</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>


        <div class="content">
            <div class="widget_div">
                <strong v-if="alarmContent.length == 0">No Results Found.</strong>
                <div v-else class="alarm_widget">
                    <table class="table table-hover tbl-fixed">
                        <thead>
                            <tr>
                                <th>
                                    <router-link to="session_alarm_detail?start_time=' + $('#start_time').val() + '&end_time=' + $('#end_time').val() + '&aff_name=' + n.aff_name + '&aff_id=' + n.aff_id + '&aff_manager=' + $('#chose_am').val() + '"> ((n.aff_name.length > 20) ? n.aff_name.substring(0, 20) + '...' : n.aff_name) + ' ' + n.aff_id + </router-link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> '#' + n.info[j].offer_id + ' has ' + n.info[j].nums + ' invalid IPs' +</td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="session_alarm_detail?start_time=' + $('#start_time').val() + '&end_time=' + $('#end_time').val() + '&aff_name=' + n.aff_name + '&aff_id=' + n.aff_id + '&aff_manager=' + $('#chose_am').val() + '" class="'+ _showMore +'">View More</router-link>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
 </div>
</template>

<script>
import Vue from 'vue'


import dateTimePicker_range_weeks from '@/components/DateTimePicker_range_weeks.vue'
import pagination from '@/components/Pagination.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import select2Aff from '@/components/Select2Aff.vue'

import mixin_alert_msg from '@/mixins/alert_msg'


export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        alertType:"info",
        alertPop:"hide",
        alarmContent:[],
        getAlarmInfo:false,
    }
  },
  mixins: [mixin_alert_msg],
  watch:{
    userInfo:function(val, oldVal){

    },
    getAlarmInfo(newVal, oldVal){
        if (newVal) {
            this.submitForm()
        }
    },
  },
  computed: {

    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  components: { dateTimePicker_range_weeks, pagination, AlertPop,select2Aff},
  methods: {
    callBack() {
        this.getAlarmInfo = true
    },
    hideAlertPop:function() {
      this.alertPop = "hide"
    },
    submitForm:function(){
        let param = $(this.$refs.form).getFormQuery()

        this.loadingZone = true
        this.alarmContent = [];
        Vue.http.get('Alarm/getAlarmInfo', {params:param}).then(response => {
            this.loadingZone = ""
            // get body data
            if(!response.body.data){
                this.showAlert(response.body.msg, "info")
                return;
            }
            let somedata = response.body;
            this.alarmContent = somedata.data && somedata.data.list
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<style>
.content {
    width: 1180px;
    padding-bottom: 20px;
}
.widget_div {
    margin-left: 30px;
}
</style>