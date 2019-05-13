<template>
<div class="navbar-inner navbar-default">
<div class="container">

<div class="navbar-header"><button type="button" data-toggle="collapse" data-target="#inner_nav_collapse" aria-expanded="false" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button>     <router-link class="logo" to="/" style="position:relative"></router-link></div>
<div class=" collapse navbar-collapse" id="inner_nav_collapse">
    <div class="nav-collapse collapse">
      <ul class="nav pull-right">
          <li v-if='["am", "bd", "super_bd", "am-bd"].indexOf((userInfo.name || "").toLowerCase().replace(/\s/gi, "_")) !== -1'> <notice_bar></notice_bar> </li>
          <li class="dropdown profile_dropdown">
              <a href="#" class="dropdown-toggle usermenu" data-toggle="dropdown" id="user_infomation">
                  <img src="@/assets/image/avatar80.png" width="40" height="40" alt="avatar" class="avatar">
                  <span class="name" :title="userInfo.email" :user_id="userInfo.id" :type="userInfo.name" :item_role_id="userInfo.item_role_id" :role_id="userInfo.role_id" v-text="userInfo.email"></span>
              </a>
              <ul class="dropdown-menu profile-dropdown-menu" id="profile-dropdown-menu">
                  <li><router-link to="p_profile?show_tab=info_tab">Edit Profile</router-link></li>
                  <li><router-link to="p_profile?show_tab=password_tab">Change Password</router-link></li>
              </ul>
          </li>
          <li class="non-dropdown nav_choice nav_choice_helpCenter"><router-link to="/help_center_detail" class="spliter"><span class="icon-smile"></span> Help Center</router-link></li>
          <li class="non-dropdown "><router-link to="/logout" id="main_logout"><span class="icon-off"></span> Logout</router-link></li>
      </ul>

    </div>  
  </div>
</div>
</div>
</div>

</template>
<script>
import notice_bar from './TheNoticeBar.vue'

export default {
  methods: {

  },
  components: { notice_bar},
  computed: {
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  created() {
  },
  mounted () {
  }
}
</script>