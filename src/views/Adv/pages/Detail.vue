<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class=""><router-link to="p_advertisers">Advertisers</router-link></li>
            <li class="active">Register Applications Detail</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="box">
        <div class="box-header">
            <h2>Register Application</h2>
            <div class="box-action">
                <!--
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <div class="box-content max_ht">
                <div class="tabbable account-tab">
                    <ul id="opt_tabs" class="nav nav-tabs">
                        <li class="active"><a href="#application" data-toggle="tab">Register Application</a></li>
                    </ul>
                    <div class="tab-content form-horizontal frm-detail frm-entity" >
                        <div class="tab-pane active" id="application" style="min-height: 360px;">
                            <div class="" id="advertiserDetail">
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4">Company Name </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.company_name }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Address 1 </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.address }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Address 2</label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.address_2||"" }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >City  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.city }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Country  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.country.code}} - {{registerDetail.country.name}}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Region </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.region||"" }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Zipcode  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.zipcode }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Phone  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.phone }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Email  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.email }}</span>
                                    </div>
                                </div>

                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Tracking System</label>
                                    <div class="controls">
                                        <span class="text">{{ registerDetail.tracking_system }}</span>
                                    </div>
                                </div>

                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >What is your website?  </label>
                                    <div class=" col-md-offset-4">
                                        <span class="text break-all" >{{registerDetail.questions.a }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >Which countries you are targeting? </label>
                                    <div class="controls">
                                        <span class="text " >{{registerDetail.questions.b }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4" >What's kind of offers you are mainly provide?  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.questions.c }}</span>
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-4">What is your payment term? Can you do prepayment?  </label>
                                    <div class="controls">
                                        <span class="text">{{registerDetail.questions.d }}</span>
                                    </div>
                                </div>

                                <div class="control-group form-group" id="bdListContain">
                                    <label class="control-label col-md-4">Account Manager </label>
                                    <div class="controls">
                                        <span v-if="registerDetail.status == 'approve' || registerDetail.status == 'reject'">
                                          {{registerDetail.manager.first_name}} {{registerDetail.manager.last_name}}
                                        </span>
                                    </div>
                                </div>


                                <div class="control-group form-group form-group">
                                    <label class="control-label col-md-4">Note </label>
                                    <div class="col-md-offset-4" v-if="registerDetail.status">
                                        <textarea class="text act col-md-8" id="note" rows="5" v-disabled="registerDetail.status == 'approve' || registerDetail.status == 'reject'">{{registerDetail.note}}</textarea>
                                    </div>
                                </div>
                                <div class="control-group form-group" >
                                    <label class="control-label col-md-4"></label>
                                    <div class="controls">
                                        <a v-if="!act && registerDetail.status !== 'approve' && registerDetail.status !== 'reject' " class="btn btn-primary act bd_act" id="assign" v-show="registerDetail.level === 1">Assign</a>
                                        <a v-if="!act && registerDetail.status !== 'approve' && registerDetail.status !== 'reject' " class="btn btn-primary act bd_act" id="approve" @click="onApprove">Approve</a>
                                        <a  v-if="!act && registerDetail.status !== 'approve' && registerDetail.status !== 'reject' "  class="btn btn-primary act bd_act" id="reject"  @click="onReject">Reject</a>
                                        <router-link  to="bd_high_advertiser" class="btn btn-primary">Cancel</router-link>
                                    </div>
                                </div>
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
import Vue from 'vue'
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import commonDataAPI from '@/api/commonData'


export default {
  data(){
    return {
            loadingZone:"",
            act:false,
            registerDetail:{questions:{}, country:{}, manager:{}}
        }
    },
  mixins: [mixin_alert_msg],
  computed: {

  },
  components:{AlertPop},
  computed:{

  },
  watch:{

  },
  methods: {
    getApplicationDetail(){
        this.loadingZone = "ajax_loading"
        Vue.http.get('Advertiser/getApplicationDetail',{params:{id:this.$route.query.id}}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.registerDetail = _.extend({questions:{}, country:{}, manager:{}} , data)
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    onReject(){
      this.applicationEdit("reject")
    },
    onApprove(){
      this.applicationEdit("approve")
    },
    applicationEdit(type){
        this.loadingZone = "ajax_loading"
        let that = this
        Vue.http.get('Advertiser/ApplicationEdit',{params:{pid:this.$route.query.id, act:type, note: $("#note").val()}}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.act = true
            this.showAlert(_.capitalize(type) + " success!", "success")
            setTimeout(function(){
                that.$router.push("/bd_high_advertiser")
            },2000)
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    }
  },
  created () {
    let that = this
    that.getApplicationDetail()

  }
}
</script>
