<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Offers Daily Exception Monitoring</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

    <div class="box">
        <div class="box-header">
            <h2>STATISTICS</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <!-- Nav tabs -->

                <!-- Tab panes -->
                <div class="mt10">

                    <div id="conversion_exception">
                        <div id="" class="cont">
                            <div class="form-horizontal frm-entity frm-detail">
                                <p class="col-md-6">Top 20 Offers  Conversion exception</p>
                                <div class="fright control-group hourSelect col-md-6" id="hourSelect">
                                    <label class="control-label col-md-6" for="">Select Time : GMT </label>
                                    <span class="col-md-6">
                                        <select class=" form-control " data-type="Click" @change="getConv" v-model="hour">
                                            <option v-for="num in todayHour" :value="num-1" > {{'0' + (num-1) + ':00'}} </option>
                                        </select>
                                    </span>
                                </div>

                            </div>
                            <div class="overflow_scroll">
                            <table class="table table-hover  tablesorter" id="conversionTable">
                                <colgroup>
                                    <!-- <col width="25" /> -->
                                    <col width="200" />
                                    <col width="100" />
                                    <col width="250" />
                                    <col width="100" />
                                    <col width="150" />
                                    <col width="250" />
                                </colgroup>
                                <thead>
                                    <tr>
                                        <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                                        <th class="tl-left">Advertiser Name</th>
                                        <th class="tl-left">Advertiser ID</th>
                                        <th class="tl-left">Offer Name</th>
                                        <th class="tl-left">Offer ID</th>
                                        <th class="tl-left">Conversion Success</th>
                                        <th class="tl-left">Exception</th>
                                    </tr>
                                </thead>
                                <tbody id="conversionList">
                                  <tr v-if="!clickList.length"> <td colspan="6">no result.</td> </tr>
                                  <tr v-for="item in clickList">
                                      <td>{{item.adv_name}}</td>
                                      <td>{{item.adv_id}}</td>
                                      <td>{{item.offer_name}}</td>
                                      <td>{{item.offer_id}}</td>
                                      <td>{{item.currentValue}}</td>
                                      <td>{{item.err_info}}</td>
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



</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'
import commonDataAPI from '@/api/commonData'

import mixin_modal from "@/mixins/modal"

export default {
  data(){
    return {
            loadingZone:"",
            clickList:[],
            hour:(new Date()).getUTCHours() - 1,
            todayHour:(new Date()).getUTCHours()

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{AlertPop},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    getOfferEagleInfo(params, callback){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Info/getOfferEagleInfo',{params:params}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            callback && callback (data)
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    getConv(){
        let that = this
        this.getOfferEagleInfo({hour:this.hour}, function(data) {
            that.conversionList = data.list
        })
    }


  },
  created () {

  },
  mounted() {
    this.getConv()

  }
}
</script>