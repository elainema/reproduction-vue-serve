<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
<div id="breadcrumb_container">
    <ul class="breadcrumb">
        <li><router-link to="./">Home</router-link></li>
        <li class="active">Team Info</li>
    </ul>
</div>
<div class="box">
    <div class="box-header">
        <h2><h2>Team Info</h2></h2>
        <div class="box-action"></div>
    </div>
    <div class="box-container">
        <div class="box-content">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal" id="q_form" ref="q_form" @submit.prevent.stop="formSubmit">
                <div class="control-group">
                    <label class="control-label col-md-2">Name</label>
                    <div class="controls">
                        <input class="col-md-3" name="name" type="text" v-model="name"/>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label col-md-2">Team Leader</label>
                    <div class="controls">
                        <chosen_container_offer class="mr10" :placeholder="option0" :option0="option0" :chosenInfo="sourceEmp" :chosenCallback="chosenCallback" :renderOffer="sourceEmp" :chosenName="'leader_passport_id'" :defaultVal="leader_passport_id"></chosen_container_offer>
                        <span class="icon-building icon-large" id="StatusShowLog"></span>
                    </div>
                </div>
                <div class="control-group hide">
                    <input type="text" name="type" :value="type" />
                    <input type="text" name="group_id" :value="group_id" v-if="group_id">
                </div>
                <div class="col-md-offset-2">
                    <button class="btn btn-primary" type="submit" :disabled="leader_passport_id == ''">Submit</button>
                    <button class="btn secondary" data-dismiss="modal">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</div>
</div>
</template>

<script>
import Vue from "vue"

import chosen_container_offer from '@/components/Chosen_Container_Offer.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import common from '@/util/common'
import mixin_alert_msg from '@/mixins/alert_msg'
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            loadingZone:false,
            option0:' - Please select a team leader - ',
            sourceEmp:[],
            leader_passport_id:'',
            group_id:'',
            name:'',
        }
    },
    components: {AlertPop,chosen_container_offer},
    mixins: [mixin_alert_msg],
    methods: {
        chosenCallback(v, text) {
            this.leader_passport_id = v
        },
        formSubmit() {
            var query = $(this.$refs.q_form).getFormQuery()
            var url = this.group_id != '' ? "Employee/groupEdit": 'Employee/createGroup';
            Vue.http.post(url, query).then(response => {
                this.showAlert(response.body.msg, 'success')
                this.$router.replace('/admin_employees_team');
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        getTeamLeader() {
            var userInfo = this.userInfo
            var typeName = userInfo.general_role_name || userInfo.role_id
            var type = common.getType(typeName);
            this.type = type
            Vue.http.get('Employee/getIdAndName', {params:{type:type}}).then(response => {
                var data = response.body && response.body.data || []
                this.sourceEmp = data.map(function(c_obj) {
                    return { id: c_obj.id, text: c_obj.id + ' - ' + c_obj.name };
                })
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        getGroupById() {
            Vue.http.get('Employee/getGroupById', {params:{group_id:this.group_id}}).then(response => {
                var data = response.body && response.body.data || []
                var leader_passport_id = data && data.leader_passport_id
                var leader_name = (data && data.leader_passport_id) + ' - ' + (data && data.leader_name)
                var option = {id:leader_passport_id, text: leader_name}
                this.sourceEmp.unshift(option)
                this.leader_passport_id = leader_passport_id
                this.name = data && data.name
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    created () {
        let that = this
        let group_id = this.$route.query.id
        this.getTeamLeader()
        if (group_id) {
            this.group_id = group_id
            this.getGroupById()
        }

    },
    watch:{

    },
    mounted () {
    }
}
</script>


<style scoped>
#im_container .im-base {
    margin-top: 20px;
}
</style>