<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Query Offer Approval</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

    <div class="box">
        <div class="box-header">
            <h2>Query Offer Approval</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            </div>
        </div>
        <div class="box-container" id="box_container">
            <div class="box-content">
                <div class="row well" id="searchForm">
                    <div class="col-md-12" role="main">
                        <form class="form-inline form-horizontal form-query" ref="form" @submit.prevent="onSubmit">

                            <div class="form-group-block mt15">
                                <div class="col-md-8">
                                    <span class="col-md-6">
                                        <span class="control-label col-md-4">DevApp ID</span>
                                        <input class="col-md-8" name="developerAppId" type="text">
                                    </span>
                                    <span class="col-md-6">
                                        <span class="control-label  col-md-4">Offer ID</span>
                                        <input class="col-md-8" name="offerId" type="text">
                                    </span>
                                </div>
                                <div class="col-md-2 ">
                                    <button type="submit" fef-click="resetFormParam" class="col-md-5 btn btn-primary col-md-offset-1">Query</button>
                                </div>
                                <div class="col-md-2">
                                    <label class="checkbox-inline">
                                        <input type="checkbox" name="forceUpdate" value="1" id="checkbox_active" />Force Refresh
                                    </label>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="btn-group pager pager_head" id="pager_head"></div>
                <div class="overflow_scroll">
                <table id="pageTable" class="mt40  table table-bordered table-hover">
                    <thead class="">
                    <tr>
                        <th width="15%">Last Update Time</th>
                        <th width="15%">Type</th>
                        <th width="50%">Cause</th>
                        <th >Status</th>
                        <th style="white"></th>
                    </tr>
                    </thead>
                    <tbody style="">
                        <tr v-for="(val, key) in query_list">
                            <td>{{getDate(val)}}</td>
                            <td>{{key}}</td>
                            <td style="color:red">{{getCodeMsgMap(key)}}</td>
                            <td><i class="fa fa-remove" style="color:red;"></i></td>
                        </tr>
                    </tbody>
                </table>
                 </div>
                <div class="btn-group pager pager_foot" id="pager_foot"></div>

            </div>
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

import pagination from '@/components/Pagination.vue'
import mixin_modal from "@/mixins/modal"

export default {
  data(){
    return {
            loadingZone:"",
            query_list:"",

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{pagination, AlertPop},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    onSubmit(){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Offer2/queryOfferApproval',{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.renderTable = true
            this.query_list = data 
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    getDate(timestamp){
        return moment().format('YYYY-MM-DD HH:mm:ss')
    },
    getCodeMsgMap(code) {
      let codeMsgMap = {
          "1": "DevApp No Access for Offer.",
          "2": "Offer already exist Common Caps.",
          "3": "Offer status is not active or mana setting is not zero or Advertiser appId is 0.",
          "4": "Advertiser App does not exists",
          "5": "filter Offer because query param",
          "11": "DevApp access status is not active",
          "12": "Offer status is not active or mana setting is not zero or Advertiser appId is 0.",
          "13": "Advertiser App Offer status is not active",
          "14": "Offer info does not match approval",
          "15": "Advertiser info does not match approval"
      };

      return codeMsgMap[code]
    }
  },
  created () {

  },
  mounted() {



  }
}
</script>