<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><a href="./">Home</a></li>
            <li class="active">Profile</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Profile</h2>

        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">

                <ul id="opt_tabs" class="nav nav-tabs">
                    <li class="" v-show="userRole.role !== 'finance' || userRole.role !== 'advertiser' "><a href="#info_tab" data-type="info_tab" data-toggle="tab" aria-expanded="true">Basic</a></li>
                    <li class=""><a href="#password_tab" data-type="password_tab" data-toggle="tab" aria-expanded="false">Password</a></li>
                    <li><a href="#refer_aff_tab" data-type="refer_aff_tab" data-toggle="tab" v-show="(userRole.role !== 'finance' || userRole.role !== 'advertiser') || (userInfo.role_id === 2 || userInfo.role_id === 5 || userInfo.role_id === 11) ">Refer affiliate</a></li>
                </ul>

                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane " id="info_tab">
                        <form class="form-horizontal  mt20" action="" method="post" id="ac_add" ref="infoForm" @submit.prevent="submitInfoForm">
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="account">Account</label>
                                <div class="controls col-md-6 nomargin">
                                    <span class="input-xlarge uneditable-input normal-cursor" id="account" v-text="userInfo.email"></span>
                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="first_name">First Name</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="text" class="input-xlarge" name="first_name" :value="userInfo.first_name"  id="first_name" required />
                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="last_name">Last Name</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="text" class="input-xlarge" name="last_name"  :value="userInfo.last_name" id="last_name" required />
                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="phone">Phone</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="text" class="input-xlarge" name="profile[phone]" :value="userInfo.phone" id="phone" />
                                </div>
                            </div>

                            <div class="form-actions col-md-offset-2 col-md-6">
                                <input type="submit" class="btn btn-primary btn-dytheme" value="Update" />
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane" id="password_tab">
                        <form class="form-horizontal mt20" action="" ref="passForm" method="post" id="ac_pass" @submit.prevent="submitPassForm">
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="password">Old Password</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="password" class="input-xlarge" name="old_password"  id="password" placeholder="Your old password" required />
                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="password1">New Password</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="password" class="input-xlarge" name="new_password" id="password1" placeholder="Your new password here and below" required />
                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-2" for="password2">New Password (Again)</label>
                                <div class="controls col-md-6 nomargin">
                                    <input type="password" class="input-xlarge" name="new_password_again" id="password2" required />
                                </div>
                            </div>

                            <div class="form-actions col-md-offset-2 col-md-6">
                                <input type="submit" class="btn btn-primary btn-dytheme" value="Change" />
                            </div>
                        </form>
                    </div>
                    <div  class="tab-pane" id="refer_aff_tab" v-show="userInfo.role_id == 2 || userInfo.role_id == 5 || userInfo.role_id == 11 ">
                        <p class="mt20">Refer Link: <a target="_blank" id="referUrl" :href="'https://affiliate.yeahmobi.com/sign-up.html?refer_am_id=' + userInfo.id" v-text="'https://affiliate.yeahmobi.com/sign-up.html?refer_am_id=' + userInfo.id"> </a></p>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<style  scoped="">
.form-horizontal .control-label{
    padding-left: 15px;
    padding-bottom: 5px;
}
</style>
<script>
import Vue from 'vue'
import alert_pop_util from '../util/alert_pop'
import { mapGetters, mapActions } from 'vuex'
import AlertPop from '../components/Alert_pop.vue'

export default {
  data(){
    return {
        loadingZone:"",
        alertMsg:"",
        alertType:"info",
        alertPop:"hide",
    }
  },
  computed: {
    ...mapGetters({
      userRole:"userRole"
    }),
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  watch: {
    "$route":function(newVal, oldVal){
        this.routeClick()
    }
  },
  mounted () {
    this.routeClick()
  },
  components: { AlertPop},
  methods: {
    routeClick(){
        if(this.$route.query.show_tab) {
            $('a[data-type="'+this.$route.query.show_tab+'"]', '#opt_tabs').trigger('click');
        }else{
            $('a[data-toggle="tab"]:visible:first', '#opt_tabs').trigger('click');
        }
    },
    hideAlertPop:function() {
      this.alertPop = "hide"
    },
    submitInfoForm(){
        let  that = this;
        let  param = $(that.$refs.infoForm).getFormQuery()
        that.loadingZone = true
        Vue.http.post('Session/editPassport', param).then(response => {


            let somedata = response.body;
            console.log(somedata)
            alert_pop_util.setAlertPop(this, "show", "success", "Save Success!")
            this.$store.dispatch('setUserInfo',param)
 
            that.loadingZone = false
        }, response => {
            that.loadingZone = false
            alert_pop_util.setAlertPop(that, "show", "error", response.body.msg)

        })
    },
    submitPassForm(){
        let  that = this;
        let  param = $(that.$refs.passForm).getFormQuery()
        that.loadingZone = true
        Vue.http.post('Session/changePassword', param).then(response => {


            let somedata = response.body;
            console.log(somedata)
            that.$router.push('/logout')
        }, response => {
            that.loadingZone = false
            alert_pop_util.setAlertPop(that, "show", "error", response.body.msg)

        })
    }
  }
}

</script>