<template>
<div class="navbar-default nav-items">
<div class="container">

<div class="navbar-header"><button type="button" data-toggle="collapse"  ref="collapse" data-target="#top_collapse" aria-expanded="false" class="navbar-toggle collapsed"><span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span></button> </div>
<div class="nav-items collapse navbar-collapse nopadding" id="top_collapse" ref="top_collapse" >
        <ul class="nav" id="nav_menu_container" v-show="role_id">
            <li class="non-dropdown" id="snapShop">
                <router-link to="/" class="active"><span class="fa fa-dashboard"></span><span>Dashboard</span></router-link>
            </li>
            <li class="dropdown" v-if="role_id !== '13'">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-arrows"></span><span>Offers<b class="caret"></b></span></a>
                <ul class="dropdown-menu">

                    <li><router-link to="p_create_offer" v-if="['2','3','6','11'].indexOf(role_id) !== -1">Create Offer</router-link></li>
                    <li><router-link to="p_offers"  v-if="['2','3','5', '6','11','14'].indexOf(role_id) !== -1">Manage Offers</router-link></li>
                    <li><router-link to="p_offer_group"  v-if="['2','3','5', '6','11','14'].indexOf(role_id) !== -1">Rotate Group</router-link></li>
                    <!-- <li><router-link to="p_offer_applications"   v-if="['2','5', '11'].indexOf(role_id) !== -1">Offers Applications</router-link></li> -->
                    <li><router-link to="p_create_category"  v-if="['2', '6'].indexOf(role_id) !== -1">Create Category</router-link></li>
                    <li><router-link to="p_offer_category"  v-if="['2', '6'].indexOf(role_id) !== -1">Manage Categories</router-link></li>
                    <li><router-link to="offer_top"  v-if="['2','3','5', '6','11','14'].indexOf(role_id) !== -1">Top Offers</router-link></li>
                    <li><router-link to="p_products">Manage Products</a></router-link></li>
                </ul>
            </li>
           <!--  <li class="dropdown"  v-if="['2','3', '6','11','12'].indexOf(role_id) !== -1">
               <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-filter"></span><span>File Application<b class="caret"></b></span></a>
               <ul class="dropdown-menu">
                   <li><router-link to="./file_application"  v-if="['2','3', '6','11','12'].indexOf(role_id) !== -1">File Application</router-link></li>
               </ul>
           </li> -->
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-database"></span><span>Report<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="report"  v-if="['2','3','5', '6','10', '11','14'].indexOf(role_id) !== -1">Report</router-link></li>
                    <li><router-link to="report_referral"  v-if="['2','3','5', '6','11','14'].indexOf(role_id) !== -1">Referral</router-link></li>
                    <li><router-link to="ocpa_report"  v-if="role_id !== '12' ">oCPA Report</router-link></li>
                    <li><router-link to="event-report"  v-if="role_id !== '12' ">Event Report</router-link></li>
                    <li><router-link to="fraud_report"  v-if="role_id !== '12' ">Fraud Report</router-link></li>
                    <li><router-link to="cps_report"  v-if="role_id !== '12' ">CPS Report</router-link></li>
                    <li><router-link to="history_report"  v-if="['2','3','5', '6','10','11','14'].indexOf(role_id) !== -1" >History Report</router-link></li>
                    <li><router-link to="adv_report"  v-if="role_id === '12'">Advertiser Report</router-link></li>
                    <li><router-link to="affiliate_commission"  v-if="['2','5','11','14'].indexOf(role_id) !== -1">Publisher Commission</router-link></li>
                    <li><router-link to="manager_commission"  v-if="['2','5','11','14'].indexOf(role_id) !== -1">Manager Commission</router-link></li>
                    <!-- <li><router-link to="antenna_report"  v-if="['11','14'].indexOf(role_id) !== -1">Antenna Report</router-link></li> -->
                </ul>
            </li>
            <li class="dropdown" v-if="['2','3','6','11','14'].indexOf(role_id) !== -1">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-puzzle-piece"></span><span>Advertisers<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="./p_create_adv"  v-if="['2','3','6','11'].indexOf(role_id) !== -1">Create Advertiser</router-link></li> 
                    <li><router-link to="./p_advertisers"  v-if="['2','3','6','11','14'].indexOf(role_id) !== -1">Manage Advertiser</router-link></li>
                    <li><router-link to="./bd_high_advertiser"  v-if="['2','3','6','11','14'].indexOf(role_id) !== -1">Register Applications</router-link></li>
                </ul>
            </li>
            <li class="dropdown" v-if="['2','3','5','6','10','11','13','14'].indexOf(role_id) !== -1">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-user-md"></span><span>Publishers<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="p_affs"  v-if="['2','5', '11','14'].indexOf(role_id) !== -1">Manage Publishers</router-link></li>
                    <li><router-link to="p_create_aff"  v-if="['2','5','11'].indexOf(role_id) !== -1 && !((item_role_id == '4' || item_role_id == '3') && role_id != '2')">Create Publisher</router-link></li>
                    <li><router-link to="p_feedback"  v-if="['1','2','5','11','14'].indexOf(role_id) !== -1">Publishers Feedback</router-link></li>
                    <li><router-link to="p_daily_warning"  v-if="['2','5','11','13','14'].indexOf(role_id) !== -1">Publishers Daily Warning</router-link></li>
                    <li><router-link to="p_email_am" v-if="['2','5','11'].indexOf(role_id) !== -1">PM Send Email To Publishers</router-link></li>
                    <li><router-link to="p_email_bd" v-if="['2','3','6','11'].indexOf(role_id) !== -1">AM Send Email To Publishers</router-link></li>
                    <li><router-link to="p_email_admin"  v-if="['2'].indexOf(role_id) !== -1">Admin Send Email To Publishers</router-link></li>
                    <li><router-link to="p_register_list"  v-if="['2','5','11'].indexOf(role_id) !== -1">Register Applications</router-link></li>
                    <li><router-link to="p_email_history"  v-if="['2','3','5','6','10','11','14'].indexOf(role_id) !== -1">System Email History(30d)</router-link></li>
                    <li><router-link to="manage_affiliate_account"   v-if="['2','13'].indexOf(role_id) !== -1">Manage Publisher Account</router-link></li>
                    <li><router-link to="affiliate_notice" v-if="role_id == '2'">Publishers Notice</router-link></li>
                </ul>
            </li>
            <li class="dropdown" v-if="role_id !=='12' ">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-wrench"></span><span>Tools<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="notice" v-if="role_id === '13'">Publish Notice</router-link></li>
                    <li><router-link to="offer_audit_log">Offer Audit Log(30d)</router-link></li>
                    <li><router-link to="offer_approval_query">Offer Approval Query</router-link></li>
                    <li><router-link to="update_help_center" v-if="role_id === '2' || role_id==='11'">Update&nbsp;Help&nbsp;Center</router-link></li>
                    <li><router-link to="update_support_center" v-if="role_id === '2'">Update&nbsp;Support&nbsp;Center</router-link></li>

                    <li><router-link to="offer_daily_exception_monitoring" v-if="['3','6','11'].indexOf(role_id) !== -1">Offers Daily Exception Monitoring</router-link></li>
                    <li><router-link to="affiliate_daily_exception_monitoring" v-if="['5','11'].indexOf(role_id) !== -1">Affiliates Daily Exception Monitoring</router-link></li>
                    <li><router-link  to="adv_offer_id" v-if="['2','3','5','6','11'].indexOf(role_id) !== -1">Advertiser Offer Query</router-link></li>
                    <li><router-link  to="hide_conversion_setting" v-if="id === '4'">Hide Conversion Setting</router-link></li>
                    <li><router-link  to="settings" v-if="id === '4'">System Parameter Setting</router-link></li>
                </ul>
            </li>
            <li class="dropdown" v-if="['2','3','5','6', '11'].indexOf(role_id) !== -1 && !(general_role_name && (item_role_id == '3')) && item_role_id !== '4'">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-group"></span><span>Employee<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="./admin_create_emp" v-if="['2'].indexOf(role_id) !== -1 && !(item_role_id === '4' && role_id !== '2')">Create Employee</router-link></li>
                    <li><router-link to="./admin_employees" v-if="(['2','3','5','6'].indexOf(role_id) !== -1 || item_role_id === '6' || item_role_id === '5')">Manage Employee</router-link></li>
                    <li><router-link to="./admin_employees_team" v-if="item_role_id === '5' && role_id !== '2'">Employee Team</router-link></li>
                </ul>
            </li>
            <li class="dropdown" v-if="['2'].indexOf(role_id) !== -1">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-book"></span><span>Titles<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="./admin_create_title" v-if="['2', '14'].indexOf(role_id) !== -1">Create Title</router-link></li>
                    <li><router-link to="./admin_titles" v-if="['2', '14'].indexOf(role_id) !== -1">Manage Titles</router-link></li>
                    <li class="divider"></li>
                    <li><router-link to="./admin_create_auth" v-if="role_id === '2'">Create Authority</router-link></li>
                    <li><router-link to="./admin_auths" v-if="['2', '14'].indexOf(role_id) !== -1">Manage Authorities</router-link></li>
                </ul>
            </li>
            <li class="non-dropdown"  v-if="['14', '13' , '12'].indexOf(role_id) === -1">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;" @click="gotoBilling"><span class="fa fa-university"></span><span>Billing</span></a>
            </li>

            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-bullseye"></span><span>BI<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link v-if="['14', '13' , '12'].indexOf(role_id) === -1" to="/bi" >PM BI</router-link></li>
                    <li><router-link v-if="['3', '6','2','11'].indexOf(role_id) !== -1"  to="/bi_adv" >Advertiser BI</router-link></li>
                </ul>
            </li>
            <li class="dropdown"  v-if="role_id === '2'">
                <a class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" href="javascript:;"><span class="fa fa-wrench"></span><span>Settings<b class="caret"></b></span></a>
                <ul class="dropdown-menu">
                    <li><router-link to="./admin_settings"  v-if="role_id === '2'">Setting Customise</router-link></li>
                </ul>
            </li>
        </ul>
        <!-- <ul class="nav pull-right">
            <li class="non-dropdown"><a href="#" id="main_logout"><span class="icon-off"></span> Logout</a></li>
        </ul> -->
        <div class="clearfix"></div>
    </div>
</div>
</div>


</template>

<script>
import Vue from 'vue'

export default {
  data(){
    return {
        role_id:"",
        id:"",
        item_role_id:"",
        general_role_name:""
    }
  },
  props: [],
  watch: {
    userInfo: function (val) {
      this.role_id = val.role_id
      this.id = val.id
      this.item_role_id = val.item_role_id
      this.general_role_name = val.general_role_name
    }
  },
  computed: {
    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  methods: {
     gotoBilling(){
        Vue.http.get('Session/loginBilling').then(response => {
            // get body data
            window.location.href = response.body.data.url;
        }, response => {
            // error callback
        });
     }
  },
  mounted () {
    let that = this
    if(_.isMobile()) {
        $(this.$refs.top_collapse).on("click",".dropdown-menu a", function(){
            $(that.$refs.collapse).click()
        })
    } else {
        $(this.$refs.top_collapse).on("click",".dropdown-menu a", function(){
            $(this).closest(".dropdown-menu").fadeOut("normal")
        })

        $(this.$refs.top_collapse).on("mouseover",".dropdown", function(){
            $(this).find(".dropdown-menu").show()
        })
        
    }

  }
}
</script>
<style>

</style>
