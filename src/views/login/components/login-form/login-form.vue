<template>
   <div class="">
      <div class="login-img-bg">
      </div>
      <div id="login_panel" class="login_panel">
          <div class="login-head">
          </div>
          <div class="login-body">
              <section id="msg_placeholder"></section>
              <alert-message :hideErrorMsg="hideErrorMsg" :error="error"></alert-message>
              <div class="login-content">
                  <form class="form-horizontal" id="login_form" action="/Session/login" @submit.prevent="login">
                      <div class="control-group">
                          <label class="control-label" for="id_name">Email</label>
                          <div class="controls input-prepend">
                              <span class="add-on gradient"><i class="icon-user"></i></span>
                              <input type="text" class="login-input" name="email" v-focus v-model.trim="email" id="id_name" placeholder="Email" autocomplete="off" autofocus="" required="">
                          </div>
                      </div>
                      <div class="control-group">
                          <label class="control-label" for="id_password">Password</label>
                          <div class="controls input-prepend">
                              <span class="add-on gradient"><i class="icon-lock"></i></span>
                              <input type="password" class="login-input" v-model.trim="pass" name="password" id="id_password" placeholder="Password" required="">
                          </div>
                      </div>
                      <div class="control-group token-input" v-if="token">
                          <label class="control-label" for="id_dynamic_token">Dynamic Token</label>
                          <div class="controls input-prepend">
                              <span class="add-on gradient"><i class="icon-lock"></i></span>
                              <input type="password" class="login-input" name="dynamic_token" v-model.trim="dynamic_token" id="id_dynamic_token" placeholder="Dynamic Token">
                          </div>
                      </div>
                      <div class="control-group token-input" v-if="verification">
                          <label class="control-label" for="verificationCode">Verification Code</label>
                          <div class="controls input-prepend flexMiddle">
                              <input type="text" class="login-input mr20" name="verification_code" v-model.trim="verificationCode" id="verificationCode" placeholder="Verification Code">
                              <img id="verication_img" :src="verication_img" @click="ramdom_val=!ramdom_val">
                          </div>
                      </div>
                      <div class="control-group action-group clearfix">
                          <div class="controls mt20">
                              <button type="submit" class="btn btn-ym-orange  btn-login pull-right" id="login">Login</button>
                          </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>

     </div>
</template>

<script>
import Vue from 'vue'

import { mapActions } from 'vuex'
import auth from '@/util/auth'
import config from "@/util/config"

const AlertMessage = () => import(/* webpackChunkName: "AlertMessage" */ '../alert-message/');

export default {
  data () {
    return {
      email: '',
      pass: '',
      error: "",
      dynamic_token:"",
      token:false,
      verification:false,
      ramdom_val:false,
      verificationCode:''
    }
  },
  components: { AlertMessage  },
  computed: {
    verication_img(){
      return document.location.protocol + "//" + config.api_host + "/" + config.app_name + "/Session/vcode?t=" + this.ramdom_val
    },
  },
  methods: {
    ...mapActions([
    'logOut'
    ]),
    hideErrorMsg () {
      this.error=""
    },
    login () {
      let that = this
      that.token = false;
      let query = {email:this.email, password:this.pass, dynamic_token:this.dynamic_token}
      if (that.verification ) {
        query.verification_code = this.verificationCode
      }
      this.$store.dispatch('loginIn', {query, cb: data => {
        if (data.flag === "fail") {
          if(data.msg === 'fail:login is fail'){
            data.msg = 'Login failed, please check your email and password.'
          }
          this.error = data.msg
          if(data.data && data.data.status === 9){
            that.token = true
          }
          if(data.data && data.data.status === 10){
            that.verification = true
          }
        } else {
          auth.setToken(this.email)
          var o = data.data
          var roledata = o.user_role && o.user_role.toLowerCase() || "";
          if (roledata == 'pm') {
              that.$router.push('notice')
              return;
          } else if(roledata == 'affiliate') {
            this.error = 'Your Account does not allowed to login Manage system.'
          }
          if (o.expire_pass ) { //successful password check
              localStorage.setItem("expirePass", 1);
              that.$router.push('/?redirect=p_profile?show_tab=password_tab')
              return
          } else if (o.simple_pass) {
              that.$router.push('/?redirect=p_profile?show_tab=password_tab')
              localStorage.setItem("simplePass", 1);
              return
          }
          let _redirect = that.$route.query.redirect ? '/?redirect=' + ( that.$route.query.redirect || "") : "" 
          if(_redirect.match(/logout|login/gi)){
            _redirect = ""
          }
          that.$router.push(_redirect || '/')
        }
      }})
    }
  }
  ,
  created () {

    if(localStorage.getItem("mtlLogin")){
      this.error = "This account has been logged in elsewhere, for this login session will be terminated."
    }
    localStorage.removeItem("mtlLogin")

    this.logOut()
    auth.logout()

  }
}
</script>
<style scoped>
.error {
  color: red;
}
.control-group {
    margin-bottom: 5px;
}
.flexMiddle{
  display: flex;
  justify-content: center;
  align-items: center;
}
@media (max-width: 768px) {

    .login .login-content {
        top: 65px;
    }
    .login .alert.alert-error{
        padding-right: 10px;
        top: -25px;
    }
    .login .login-head {
       height:100px
    }
    .alert {
      padding: 5px
    }
}
</style>