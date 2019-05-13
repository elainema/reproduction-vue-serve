<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
<div id="breadcrumb_container">
    <ul class="breadcrumb">
        <li><router-link to="./">Home</router-link></li>
        <li class="active">Employees</li>
    </ul>
</div>
<div class="box">
    <div class="box-header">
        <h2>Employees</h2>
        <div class="box-action"></div>
    </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">
                <div class="filter-form well" id="qf_offer" v-show="!(userInfo.item_role_id == 4 && userInfo.role_id != 2)">
                    <form class="form-inline" ref="qf_offer" @submit.stop.prevent="onSubmit">
                        <select name="role_id" id="role_id" class="form-control">
                            <option value="">- All Job Titles -</option>
                            <option :value="n.id" v-for="n in roles">{{n.name}}</option>
                        </select>
                        <input class="col-md-3 form-control " type="text" name="q" autocomplete="off" placeholder="Keywords of Employee" />
                        <button type="submit" class="btn btn-primary">Search</button>
                        <button type="reset" class="btn" id="reset_page" @click.prevent="resetPage">Reset</button>
                        <input type="hidden" name="limit" id="id_limit" value="20" />
                        Status:
                        <label class="checkbox">
                            <input type="checkbox" name="status[]" value="active" checked="checked" /> Active
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" name="status[]" value="pending" /> Pending
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" name="status[]" value="deleted" /> Deleted
                        </label>
                        <div class="row-fluid" id="action_float" m_top="505">
                            <span>Action:</span>
                            <div class="btn-group">
                                <button class="btn" id="team_action" @click.prevent="team_action">
                                    Change Team
                                </button>
                            </div>
                        </div>
                        <input type="hidden" name="page" :value="currentPage">
                        <input type="hidden" name="item_type" :value="type">
                    </form>
                </div>
                <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                <div class="overflow_scroll">
                    <table class="table table-hover tablesorter list-table" id="emps_list">
                        <colgroup>
                            <col width="40" />
                            <col width="100" />
                            <col width="180" />
                            <col width="150" />
                            <col width="280" />
                            <col width="100" />
                            <col width="100" />
                            <col width="80" />
                            <col width="80" />
                            <col width="180" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="check_all"  v-model="toggleAll" @click="selectchange" /></th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Title</th>
                                <th>Role</th>
                                <th>Team</th>
                                <th>Status</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody id="cp_list" ref="cp_list">
                            <tr v-for="i in renderData" :id="i.id" :itemValue="i.item_role_name || ''">
                                <td><input v-model="selected_id" v-show="!(userInfo.item_role_id == 4 && userInfo.role_id != 2)" type="checkbox" :value="i.id" name="id[]" class="check-box"/></td>
                                <td class="no-wrap"><a :href="'admin_manage_emp?id=' + i.id">{{i.id}}</a></td>
                                <td><a :href="'admin_manage_emp?id=' + i.id">{{i.first_name }}  {{i.last_name }} </a></td>
                                <td class="tl-center">{{ i.phone || ''}}</td>
                                <td class="tl-center">{{ i.email || '' }}</td>
                                <td class="tl-center">{{ i.role_name || '' }}</td>
                                <td class="tl-center role" :data-type="i.role_name" :data-id="i.id">{{ i.item_role_name || '' }}</td>
                                <td class="tl-center">{{ i.group_name || '' }}</td>
                                <td :class="'tl-center capt ' + i.status ">{{ i.status }}</td>
                                <td class="tl-center">{{ dateToLocal(i.create_time) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                <div class="clearfix"></div>

            </div>
        </div>
    </div>
    <!-- <change_team_dialog :modalState="modalState" :hideModal="hideModal" :confirmBtn="confirmBtn" :modal_body="teams"></change_team_dialog> -->
    <modal
        :dialogVisible.sync="modalState"
        :title="'Change Team'"
        :disabled="is_disabled"
        :onConfirm="confirmBtn">
        <template slot="dialogBody">
            <form class="form-horizontal">
                <div class="control-group row">
                  <label class="control-label col-md-2">Team</label>
                      <div class="controls">
                          <select id="role" class="col-md-5" name="group_id" v-model="group_id">
                            <option value="">- Please select a team -</option>
                            <option :value="n.id" v-for="n in teams"> {{ n.id}} - {{ n.name }}</option>
                          </select>
                      </div>
                </div>
              </form>
        </template>
    </modal>
</div>
</template>

<script>
import Vue from "vue"
import pagination from '@/components/Pagination.vue'
//import change_team_dialog from '@/components/Change_Team_Modal.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import user from '@/api/user'
import common from '@/util/common'
const Modal = () => import( /* webpackChunkName: "Modal" */ '@/components/common/modal/');
let EventProxy = require('eventproxy');
let ep = new EventProxy()
import { mapGetters, mapActions } from 'vuex'

export default {
    data () {
        return {
            loadingZone:false,
            typeName:'',
            id:"",
            roles:[],
            dataPage:{},
            renderData:[],
            currentPage: 1,
            pageLimit: 20,
            selected_id:[],
            modalState:"hide",
            query:'',
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            hasTeam:false,
            teams:[],
            type:'',
            toggleAll :false,
            title:'Change Team',
            confirmText:'Confirm',
            is_disabled:true,
            group_id:'',
        }
    },
    components: {pagination,Modal,AlertPop},
    mixins: [mixin_alert_msg],
    methods: {
        selectchange (e) {
            var selectall = e.target.checked
            this.toggleAll = selectall
            if (selectall) {
                this.selected_id = []
                for (var i = 0; i < this.renderData.length; i++) {
                    this.selected_id.push(this.renderData[i].id)
                }
            } else {
                this.selected_id = []
            }
        },
        hideModal () {
            this.modalState = "hide"
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        onSubmit(){
            this.currentPage = 1;
            this.pageLimit = 20;
            this.list_emps()
        },
        changeUsersGroup(params) {
            this.loadingZone = true
            Vue.http.post('Employee/changeUsersGroup', params).then(response => {
                this.loadingZone = false
                this.list_emps();
            }, response => {
                this.loadingZone = false
                this.showAlert(response.body.msg)
            })
        },
        confirmBtn() {
            var group_id  = this.group_id
            var query =  {
                passport_ids:this.selected_id.join(","),
                group_id:group_id
            }
            this.hideModal()
            this.changeUsersGroup(query);
        },
        get_team() {
            Vue.http.get('Employee/getGroupByType', {params: {type: this.type}}).then(response => {
                var data = response.body && response.body.data;
                if (data) {
                    var hasTeam = true;
                    this.teams = data
                    this.hasTeam = hasTeam
                }
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        team_action() {
            var checkId = this.selected_id
            var that = this
            if (checkId.length < 1) {
                this.showAlert('Please choose an employee to change team.', 'info');
                return;
            } else {
                var flag = true;
                var _query = [];
                var query = "";
                for (var i = 0, len = checkId.length; i <  len; i++) {
                    var id = checkId[i] * 1
                    var itemValue = $(this.$refs.cp_list).find("#" + checkId[i] + "").attr("itemValue")
                    if (itemValue.toLowerCase() != "member") {
                        flag = false;
                        var msg = "Please select users with role of member only.";
                        that.showAlert(msg, 'error');
                        return false;
                    } else {
                        _query.push(checkId[i]);
                        that.query = _query
                        flag = true;
                    }
                }

                if (flag) {
                    if (that.hasTeam) {
                        that.modalState = "show"
                    } else {
                        var msg = "No available team to change. Please add a team first.";
                        that.showAlert(msg, 'error');
                        return;
                    }
                }
            }
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
                this.list_emps()
            })
        },
        onChangeLimit(limit){
            this.pageLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
                this.list_emps()
            })
        },
        dateToLocal(timestamp) {
            var createTime = moment(timestamp).add("m",-1*(new Date).getTimezoneOffset()).format("YYYY-MM-DD HH:MM:SS");
            return createTime;
        },
        getRoleList() {
            Vue.http.get('Role/getSelectAllList').then(response => {
                var data = response.body && response.body.data && response.body.data.list;
                this.roles = data
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        getUserInfo() {
            var that = this
            user.getUserInfo(function (data) {
                var o = data && data.data
                var typeName = ''
                if (o &&  o.general_role_name) {
                    typeName = o.general_role_name;
                } else {
                    typeName = o.role_id;
                }
                var id = o.id;
                that.typeName = typeName
                that.id = id
                that.type = common.getType(typeName)
                that.$nextTick(function() {
                    ep.emit("get_user_info_ready");
                })
            })
        },
        list_emps() {
            this.loadingZone = true
            var query = $(this.$refs.qf_offer).getFormQuery()
            //window.location.hash = $(this.$refs.qf_offer).serialize();
            Vue.http.get('Employee/getAll', {params:query}).then(response => {
                var data = response.body && response.body.data && response.body.data;
                this.renderData = data && data.list
                this.dataPage = data && data.paginator
                this.loadingZone = false
            }, response => {
                this.showAlert(response.body.msg)
                this.loadingZone = false
            })
        },
        resetPage() {
            this.$router.push('admin_employees')
        },
    },
    computed: {
        userInfo(){
          return this.$store.state.app.userInfo
        },
    },
    created () {
        let that = this
        that.getUserInfo()
        ep.all("get_user_info_ready", function(){

            that.getRoleList()
            that.get_team()
            that.list_emps()
        })
    },
    watch:{
        selected_id() {
            this.toggleAll = this.renderData.length > 0 && (this.selected_id.length == this.renderData.length)
        },
        group_id(newVal, oldVal){
          if (!_.isEmpty(newVal)) {
            this.is_disabled = false
          } else {
            this.is_disabled = true
          }
        },
    },
    mounted () {

    }
}
</script>


<style scoped>
.table th, .table td{
    text-align: left;
}
#action_float{
    margin-top: 20px;
}
.btn-group>.btn:first-child {
    color: #000;
}
</style>