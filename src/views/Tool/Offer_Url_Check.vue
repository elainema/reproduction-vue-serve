<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Offer Url Check</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

    <div class="box">
        <div class="box-header">
            <h2>Offer Url Check</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container" id="box_container">
            <div class="box-content">
                <form class="form-horizontal" ref="form">
                    <div class="form-group">
                        <label for="inputEmail3" class="col-md-2 control-label">Advertiser </label>
                        <div class="col-md-3">

                            <chosen  v-if="advChosen" :chosen="advChosen"  :chosen_name="'adv_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All Advs -'" :onChange="getResult"></chosen>

                        </div>
                    </div>

                    <div class="form-group">
                        <label for="inputEmail3" class="col-md-2 control-label">Type </label>
                        <div class="col-md-3">
                            <select name="type" id="type" class="form-control" @change="getResult">
                                <option value="url_error" selected>Url Error</option>
                                <option value="no_conversion">No Convertion</option>
                            </select>
                        </div>
                    </div>
                    <input type="hidden" name="page" value="1" >
                </form>
                <div class="btn-group pager pager_head" id="pager_head"></div>
                <div class="overflow_scroll">
                <table class="table table-bordered  mt80">
                    <thead>
                        <tr>
                            <th data-nowrap="true">Offer ID</th>
                            <th data-nowrap="true">Offer Name</th>
                            <th >Adv ID</th>
                            <th >Adv Name</th>
                            <th >AM ID</th>
                            <th >AM Name</th>
                            <th>Result</th>
                            <th>Type</th>
                             <!-- <th>Option</th>
                              -->
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in offer_url_list">
                        <td>{{item.offer_id}}</td>
                        <td>{{item.offer_name}}</td>
                        <td>{{item.adv_id}}</td>
                        <td>{{item.adv_name}}</td>
                        <td>{{item.bd_id}}</td>
                        <td>{{item.bd_name}}</td>
                        <td v-html="translateResponse(item.checkedResultReason, item)"></td>
                        <td>{{item.type}}</td>



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
import chosen from '@/components/Chosen.vue'

import pagination from '@/components/Pagination.vue'
import mixin_modal from "@/mixins/modal"
import config from "@/util/config"
export default {
  data(){
    return {
            loadingZone:"",
            offer_url_list:[],
            advChosen:""

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{pagination, AlertPop, chosen},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    getResult(){
        this.loadingZone = "ajax_loading"

        Vue.http.get(this.getUrl('Show/result'),{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.renderTable = true
            this.feedback_list = data && data.list || []
            this.feedback_page = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    getUrl (url){
        return config.api_protocal + "//" + config.api_host + "/tool/" + url
    },
    getAdv() {
        this.loadingZone = "ajax_loading"

        Vue.http.get(this.getUrl('Show/advList'),{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.advChosen = { name: "tool_adv", trans_name:"",  full_name: "adv_id", data: data }
            this.loadingZone = ""
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    responseUrlErrorMapping(id, response) {
        switch (id) {
            case "final_response_length_invalid":
                return "URL response invalid <ul><li>Unable to get response source or return to empty<ul><li>(Please contact adv checking landing page.)</li></ul></li><li>Geo country is not targeted country<ul><li>(Please make sure geo setting of the offer matching adv’s requirement.)</li></ul></li></ul>"
                break;
            case "final_http_code_not_200":
                return "URL Response code error <ul><li>Return error code 404 Not Found<ul><li>(Please contact adv checking landing page.)</li></ul></li><li>Return error code 500 server error<ul><li>(Please contact adv checking landing page.)</li></ul></li></ul>"
                break;
            case "first_request_failed":
                return "URL Request Failed  <ul><li>" + response.firstResponseBody + "<ul><li>(Please make sure the offer status is active.)</li></ul></li></ul>"
                break;
            case "invalid_offer_url":
            default:
                return "<ul><li>Invalid Offer URL<ul><li>(Please check offer URL format.)</li></ul></li></ul>"
                break;
        }
    },
    translateResponse(id , response) {
        if (response.type === "Url Error") {
            return this.responseUrlErrorMapping(id, response)

        } else {
            return '<ul><li>click: ' + (response.click || 0) + '</li><li>conversion: ' + (response.conversion || 0) + '</li><li>lifeCycle: ' + (response.lifecycle) + 'Hour</li></ul>'
        }
    }
  },
  created () {

  },
  mounted() {
    this.getAdv()



  }
}
</script>