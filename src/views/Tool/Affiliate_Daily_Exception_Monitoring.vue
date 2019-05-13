<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Affiliates Daily Exception Monitoring</li>
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
                <ul class="nav nav-tabs" id="nav_tab_list" role="tablist">
                    <li role="presentation" class="active"><a href="#click_exception" role="tab" data-toggle="tab">Click</a>
                    </li>
                    <li role="presentation"><a href="#conversion_exception" role="tab" data-toggle="tab">Conversion</a>
                    </li>

                    </li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content mt10">
                    <div role="tabpanel" class="tab-pane active" id="click_exception">
                        <div id="" class="cont">
                            <div class="form-horizontal frm-entity frm-detail">
                                <p class="col-md-6">Top 20 Affiliates Click exception</p>
                                <div class="fright control-group hourSelect col-md-6" id="hourSelect">
                                    <label class="control-label col-md-6" for="">Select Time : GMT </label>
                                    <span class="col-md-6">
                                        <select class=" form-control " data-type="Click" @change="getClick" v-model="hour_click">
                                            <option v-for="num in todayHour" :value="num-1" > {{'0' + (num-1) + ':00'}} </option>
                                        </select>
                                    </span>
                                </div>

                            </div>
                            <div class="overflow_scroll">
                            <table class="table table-hover  tablesorter" id="clickTable">
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
                                        <th class="tl-left">Affiliate Name</th>
                                        <th class="tl-left">Affiliate ID</th>
                                        <th class="tl-left">Offer Name</th>
                                        <th class="tl-left">Offer ID</th>
                                        <th class="tl-left">Click Success</th>
                                        <th class="tl-left">Exception</th>
                                    </tr>
                                </thead>
                                <tbody id="clickList">
                                  <tr v-if="!clickList.length"> <td colspan="6">no result.</td> </tr>
                                  <tr v-for="item in clickList">
                                      <td>{{item.aff_name}}</td>
                                      <td>{{item.aff_id}}</td>
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
                    <div role="tabpanel" class="tab-pane" id="conversion_exception">
                        <div id="" class="cont">
                            <div class="form-horizontal frm-entity frm-detail">
                                <p class="col-md-6">Top 20 Affiliates Conversion exception</p>
                                <div class="fright control-group hourSelect col-md-6" id="hourSelect">
                                    <label class="control-label col-md-6" for="">Select Time : GMT </label>
                                    <span class="col-md-6">
                                        <select class=" form-control " data-type="Click" @change="getConv" v-model="hour">
                                            <option v-for="num in todayHour" :value="num-1" > {{'0' + (num-1) + ':00'}} </option>
                                        </select>
                                    </span>
                                </div>

                            </div>
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
                                        <th class="tl-left">Affiliate Name</th>
                                        <th class="tl-left">Affiliate ID</th>
                                        <th class="tl-left">Offer Name</th>
                                        <th class="tl-left">Offer ID</th>
                                        <th class="tl-left">Conversion Success</th>
                                        <th class="tl-left">Exception</th>
                                    </tr>
                                </thead>
                                <tbody id="conversionList">
                                  <tr v-if="!clickList.length"> <td colspan="6">no result.</td> </tr>
                                  <tr v-for="item in conversionList">
                                      <td>{{item.aff_name}}</td>
                                      <td>{{item.aff_id}}</td>
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
            conversionList:[],
            clickList:[],
            hour:(new Date()).getUTCHours() - 1,
            hour_click:(new Date()).getUTCHours() - 1,
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
    getAffEagleInfo(params, callback){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Info/getAffEagleInfo',{params:params}).then(response => {
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
        this.getAffEagleInfo({hour:this.hour, category:'Conversion'}, function(data) {
            that.conversionList = data.list
        })
    },
    getClick(){
        let that = this
        this.getAffEagleInfo({hour:this.hour_click, category:'Click'}, function(data) {
            that.clickList = data.list
        })
    },


  },
  created () {

  },
  mounted() {
    this.getClick()
    this.getConv()

  }
}
</script>