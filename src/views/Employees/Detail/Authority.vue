<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div class="box">
        <div class="box-header">
            <h2>Authority</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail" id="authority">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Title</label>
                    <div class="controls">
                        <!-- //role = manager时 Role，Title选项只读 -->
                        <editable_select2_offer :showAlert="showAlert" :source="titles" :offer_name="'role_id'" :offer_val="authInfo.role_id" :savenochange="true" :renderOffer="renderOffer" :offer_api="p_edit_api" :showConfirmModal="false" :getCustomParam="getCustomParam" :editable_disable="editable_disable_title_role" :setText="true" :text="authInfo.title"></editable_select2_offer>
                    </div>
                </div>
                        <!-- //role = manager时 Role，Title选项只读 -->
                <div class="control-group form-group" id="role" v-show="userInfo.role_id != 14">
                    <label class="control-label col-md-2">Role</label>
                    <div class="controls">
                        <editable_select2_offer :setText="true"  :text="authInfo.item_role_name" :showAlert="showAlert" :source="roles" :offer_name="'item_role_id'" :offer_val="authInfo.item_role_name" :savenochange="true" :renderOffer="renderOffer" :offer_api="edit_entity_role"  :showConfirmModal="false" :getCustomParam="getCustomParam" :editable_disable="editable_disable_title_role"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Team</label>
                    <div class="controls">
                        <!-- //role为 team leader或者manager或者director，Team不可编辑-->
                        <editable_select2_offer  :setText="true" :text="authInfo.team_name" :showAlert="showAlert" :source="teams" :offer_name="'group_id'" :offer_val="authInfo.team_id" :savenochange="true" :renderOffer="renderOffer" :offer_api="changeUsersGroup" :showConfirmModal="false" :getCustomParam="getCustomParam" :editable_disable="editable_disable"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Team Leader</label>
                    <div class="controls">
                        <span class="text" id="team_leader">{{ authInfo.team_leader_name }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue"
import editable_select2_offer from '@/components/Editable_Select2_Offer.vue'

import common from '@/util/common'
/*import eventProxy from '@/assets/js/eventproxy'

let ep = new eventProxy()*/
let EventProxy = require('eventproxy');
let ep = new EventProxy()

import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            id:this.$route.query.id,
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            titles:[],
            roles:[],
            teams:[],
            statisticsInfo:{},
            render_titles:false,
            render_roles:false,
            render_teams:false,
            edit_entity_role:'Item/editEntityRoleId',
            p_edit_api:'Employee/edit',
            changeUsersGroup:'Employee/changeUsersGroup',
            authInfo:{},
            authority_type:'',
            id:this.$route.query.id,
            renderOffer:false,
            loadingZone:'',

        }
    },
    props:{
        userInfo:{},
        showAlert:{},
    },
    computed:{
        editable_disable_title_role() {
            let userInfo = this.userInfo
            let authInfo = this.authInfo
            if ((userInfo.item_role_id == 5 || userInfo.item_role_id == 6) && userInfo.role_id != 2) {
                return true
            } else {
                return false
            }
        },
        editable_disable() {
            let userInfo = this.userInfo
            let authInfo = this.authInfo
            if ((userInfo.role_id == 2 || userInfo.item_role_id == 5) && authInfo.item_role_id == 3 ) {
                return false
            } else {
                return true
            }
        }
    },
    components: {editable_select2_offer},
    methods: {
        getCustomParam: function(params, $editable){
            var authority_type = params.name;
            var that = this
            that.authority_type = authority_type
            switch (authority_type) {
                case "role_id":
                    var new_params = {id:params.pk};
                    new_params[params.name] = params.value;
                    return new_params;
                    break;
                case "item_role_id":
                    var new_params = {passport_id:params.pk};
                    new_params[params.name] = params.value;
                    return new_params;
                    break;
                case "group_id":
                    var new_params = {passport_ids:params.pk};
                    new_params[params.name] = params.value;
                    return new_params;
                    break;
                default:
                    break;
            }
        },
        get_title() {
            Vue.http.get('Role/getSelectAllList').then(response => {
                var data = response.body && response.body.data && response.body.data.list;
                if (data) {
                    var source = data.map(function (c_obj) {
                        return {id: c_obj.id, text: c_obj.name};
                    })
                    this.titles = source;

                    ep.emit("title_ready", data)
                }
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        get_role() {
            Vue.http.get('Employee/getAllItemRole').then(response => {
                var data = response.body && response.body.data;
                if (data) {
                    var source = data.map(function (c_obj) {
                        return {id: c_obj.id, text: c_obj.name};
                    })
                    this.roles = source;
                    ep.emit("roles_ready", data)
                }
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        get_team() {
            var authInfo = this.authInfo
            var typeName = authInfo.title || authInfo.role_id;
            var type = common.getType(typeName);
            Vue.http.get('Employee/getGroupByType', {params:{type: type}}).then(response => {
                var data = response.body && response.body.data;
                if (data) {
                    var source = data.map(function (c_obj) {
                        return {id: c_obj.id, text: c_obj.name};
                    })
                    this.teams = source;
                }
                ep.emit("teams_ready")
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        getAuthority() {
            this.loadingZone = true
            Vue.http.get('Employee/getAuthority', {params:{passport_id: this.id}}).then(response => {
                var data = response.body && response.body.data;
                this.authInfo = data
                this.get_title()
                this.get_role()
                this.get_team()
                ep.emit("auth_ready", data)
                this.loadingZone = false
            }, response => {
                this.showAlert(response.body.msg)
                this.loadingZone = false
            })
        },
    },
    watch:{
        authority_type() {
            let that = this
            var authority_type = that.authority_type
            switch (authority_type) {
                case "role_id":
                    that.url = 'Employee/edit'
                    break;
                case "item_role_id":
                    that.url = 'Item/editEntityRoleId'
                    break;
                case "group_id":
                    that.url = "Employee/changeUsersGroup"
                    break;
                default:
                    break;
            }
        },
    },
    created() {
        let that = this
        this.getAuthority()
        this.loadingZone = true
        ep.all("auth_ready", "title_ready", "roles_ready", "teams_ready", function(auth, title, roles,teams) {
            that.renderOffer = true
            that.loadingZone = false
        })
    },
    mounted () {
    }
}
</script>
