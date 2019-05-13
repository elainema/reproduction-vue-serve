<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class=""><router-link to="admin_employees">Employee</router-link></li>
            <li>Employee Management</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <submodule_personalinfo :empInfo="empInfo" :showAlert="showAlert"></submodule_personalinfo>


    <submodule_dynamictoken :empInfo="empInfo" :showAlert="showAlert"></submodule_dynamictoken>


    <submodule_authority :userInfo="userInfo" v-if="!(userInfo.item_role_id == 4 && userInfo.role_id != 2)" :showAlert="showAlert"></submodule_authority>

    <submodule_activity :empInfo="empInfo"></submodule_activity>

    <submodule_statistics :empInfo="empInfo" :showAlert="showAlert"></submodule_statistics>

</div>
</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
import submodule_personalinfo from './Detail/PersonalInfo.vue'
import submodule_dynamictoken from './Detail/DynamicToken.vue'
import submodule_authority from './Detail/Authority.vue'
import submodule_activity from './Detail/Activity.vue'
import submodule_statistics from './Detail/Statistics.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            loadingZone:false,
            id:this.$route.query.id,
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            empInfo:{},
            offer_api:'Employee/edit',
        }
    },
    components: {submodule_personalinfo,submodule_dynamictoken,submodule_authority,submodule_activity,submodule_statistics,AlertPop},
    mixins: [mixin_alert_msg],
    methods: {
        hideAlertPop() {
          this.alertPop = "hide"
        },
        getDetail() {
            let that = this
            that.loadingZone = true
            let query = {
                id: that.id
            }
            Vue.http.get('Employee/getDetail', {params:query}).then(response => {
                var data = response.body && response.body.data;
                that.empInfo = data
                this.loadingZone = false
            }, response => {
                this.showAlert(response.body.msg, 'error')
                this.loadingZone = false
            })
        },
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    created () {
        this.getDetail()
    },
    mounted () {
        this.id = this.$route.query.id
    }
}
</script>