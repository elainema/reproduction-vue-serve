<template>
    <div id="app" class="app " :class="loggedIn || $route.path.match(/Advertiser\/sign-up/) ? '':'login'">
      <div v-if="loggedIn && !$route.path.match(/Advertiser\/sign-up/)" v-show="loggedIn"><!--tmp-->
        <header id="main-navbar" class="navbar">
          <nav_inner></nav_inner>
          <nav_vue></nav_vue>
        </header><!-- /header -->
      </div>
      <div v-if="$route.path.match(/Advertiser\/sign-up/)">
        <header id="main-navbar" class="navbar">
          <div class="navbar-inner navbar-default">
            <div class="container">
              <router-link to="/" class="logo" style="position: relative;"></router-link>
            </div>
          </div>
        </header>
      </div>
      <template v-if="$route.matched.length">
        <div v-if="loggedIn  && !$route.path.match(/Advertiser\/sign-up/)" v-show="loggedIn" class="main_wrapper">
          <div class="container" >
              <transition :name="transitionName"  mode="out-in">
                <router-view ></router-view>
              </transition>
          </div>
        </div>


        <div v-if="!loggedIn  && !$route.path.match(/Advertiser\/sign-up/)" class="height_100 login" id="login">
          <router-view ></router-view>

        </div>


        <div v-if="$route.path.match(/Advertiser\/sign-up/)"  class="main_wrapper">
          <div class="container" >
            <transition name="fade"  mode="out-in">
              <router-view ></router-view>
            </transition>
          </div>
        </div>

      </template>
      <template v-else>
        <div class="ajax_loading" style="height:300px;"></div>
      </template>
      <div id="footer">
        <div class="container">
          <p class="mb15 mt15">© <span v-text="currentYear"></span> YeahMobi.com All Rights Reserved.</p>
        </div>
    </div>

  </div>
</template>

<style>
@import "~@css/newUI.css";
.fadeNow-enter-active, .fadeNow-leave-active {
  transition: opacity .0.01s ease;
}
.fadeNow-enter, .fadeNow-leave-active {
  opacity: 0
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.app {
  color: #666;
  background: rgb(238, 238, 238);
}

.loggedIn {
  background: #fff
}
.nav .spliter  {
    border-right: 1px solid #a46e11;
}

.nav .profile-dropdown-menu {
  position: absolute;
  top: 100%;
  float: left;
  list-style: none;
  text-shadow: none;
  padding: 0px;
  margin: 10px 0px 0px 0px;
  background-color: #ffffff;
  box-shadow: 5px 5px rgba(102, 102, 102, 0.1);
  border: 1px solid #eee;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.main_wrapper {
  min-height: 500px;
  height: 100%;
  background: rgb(238, 238, 238);
  margin: 0 auto -25px;
}


</style>
<script>
import { mapGetters, mapActions } from 'vuex'
import nav_vue from '@/components/TheNavigator.vue'


import nav_inner from '@/components/TheNavigatorInner.vue'

import add_to_home_screen from '@/components/TheAddToHomeScreen.vue'



export default {
  data(){
    return {
      currentYear:new Date().getFullYear(),
      transitionName:"fade"
    }
  },


  computed: {
    ...mapGetters({
      loggedIn:"loggedIn",
      userInfo:"userInfo",
      pmNotice:"pmNotice",
      billingLogoutUrl:"billingLogoutUrl",
    })
  },
  methods: {
    ...mapActions([
      'getUserInfo',
      'getPmNotice',
      'getCookieHash',
    ])
  },
  watch:{
    loggedIn:function(val ,oldval){
        if(val && !oldval) this.getUserInfo();
    },
    userInfo:function(val, oldVal){
        if(this.$route.path !== "/p_profile"){
            if (val.expire_pass  && process.env.NODE_ENV !== "development") { //successful password check
                this.$router.push("p_profile" + (this.$route.query.show_tab ? "?show_tab="+this.$route.query.show_tab : "?show_tab=password_tab"))
                return false;
            }
        }
    },
    "$route":function(newVal, oldval){
      if(this.loggedIn && oldval.path.match(/\/login/g)) {
        this.transitionName = "fadeNow"
      } else {
        this.transitionName = "fade"
      }
    }
  },
  components: {nav_vue, nav_inner, add_to_home_screen},
  created () {
    if(this.loggedIn) {
      this.getUserInfo()
      this.getCookieHash()
    }

    this.getPmNotice()
  }
}
</script>
 