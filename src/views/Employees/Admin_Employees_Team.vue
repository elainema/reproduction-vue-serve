<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
<div id="breadcrumb_container">
    <ul class="breadcrumb">
        <li><router-link to="./">Home</router-link></li>
        <li class="active">Employee Team</li>
    </ul>
</div>
<div class="box">
    <div class="box-header" v-box-action-resize>
        <h2>Employee Team</h2>
        <div class="box-action">
            <i class="icon-resize-full fa fa-expand" title="Max"></i>
            <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
        </div>
    </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">
                <router-link to="add_employees_team" class="btn btn-primary pull-right">Add</router-link>
                <table class="table table-hover tablesorter list-table" id="emps_list">
                    <colgroup>
                        <col width="20" />
                        <col width="80" />
                        <col width="100" />
                        <col width="100" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Team Leader</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody id="team_list">
                        <tr v-for="i in renderData">
                            <td></td>
                            <td><router-link :to="'./add_employees_team?id=' + i.id">{{i.name}}</router-link></td>
                            <td>{{i.leader_name}}</td>
                            <td>{{i.type == 1 ? "AM" : "BD"}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue"
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import mixin_alert_msg from '@/mixins/alert_msg'
import common from '@/util/common'

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            loadingZone:false,
            renderData:[],
        }
    },
    components: {AlertPop},
    mixins: [mixin_alert_msg],
    methods: {
        get_group() {
            var userInfo = this.userInfo
            var typeName = userInfo.general_role_name || userInfo.role_id
            var type = common.getType(typeName);
            this.loadingZone = true
            Vue.http.get('Employee/getGroupByType', {params:{type: type}}).then(response => {
                var data = response.body && response.body.data && response.body.data;
                this.renderData = data
                this.loadingZone = false
            }, response => {
                this.showAlert(response.body.msg)
                this.loadingZone = false
            })
        }
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    created () {
        let that = this
        that.get_group()
    },
    watch:{

    },
    mounted () {

    }
}
</script>


<style scoped>
.table th, .table td{
    text-align: left;
}
.btn{
    margin-bottom: 30px;
    padding: 5px 20px;
}
.name:hover{
    cursor: pointer;
};
#emps_list tbody tr:hover{
    cursor: pointer;
};
</style>