<template>
    <div v-yeah-loading="loadingZone">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li class="active">System Parameter Setting</li>
            </ul>
        </div>
        <div class="box">
            <div class="box-header">
                <h2>System Parameter Setting</h2>
                <div class="box-action"></div>
            </div>
            <div class="box-container">
                <alert_pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert_pop>
                <div class="box-content">
                    <div class="filter-form well">
                        <form class="form-inline" @submit.prevent="onSubmit" ref="settingForm">
                            <input class="col-md-3 form-control" v-model.trim="searchData" type="text" name="q" autocomplete="off" placeholder="Keywords of Key" />
                            <button type="submit" class="btn btn-primary">Search</button>
                            <button type="button" class="btn btn-primary" @click.prevent="addSetting">Add</button>
                            <input type="hidden" name="page" v-model="currentPage">
                            <input type="hidden" name="limit" value="20" />
                        </form>
                    </div>
                    <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                    <div class="overflow_scroll">
                        <table class="table table-hover tablesorter list-table" id="emps_list">
                            <colgroup>
                                <col width="5%" />
                                <col width="30%" />
                                <col width="55%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Key</th>
                                    <th>Value</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="cp_list" ref="cp_list">
                                <tr v-for="(i,index) in dataList" :key="index">
                                    <td>{{i.id}}</td>
                                    <td class="no-wrap">{{i.key}}</td>
                                    <td>{{i.value}}</td>
                                    <td><u class="editableClass" @click="editSetting(i)">edit</u></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <pagination  :pageLimit="pageLimit" :page="dataPage" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage"></pagination>
                    <div class="clearfix"></div>
                </div>
                <!-- <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"
                    :editable_modal_title="curKey" :editable_modal_body="templeteModal"></confirmModal> -->
                    <modal
                        :dialogVisible.sync="modalState"
                        :title="curAction"
                        :onConfirm="onConfirm"
                        :closeOnClickModal="false"
                        :onCancel="hideModal"
                        :confirmText="'Save'">
                        <template slot="dialogBody">
                            <form class="form-horizontal" role="form">
                                <div class="control-group form-group">
                                    <label class="control-label col-md-3">Key:</label>
                                    <div class="controls col-md-9">
                                        {{curKey}}
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-3">Value:</label>
                                    <div class="controls col-md-9">
                                        <textarea class="col-md-9 form-control " type="text" name="q" autocomplete="off" v-model="curVal" ></textarea>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </modal>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from "vue"
import alert_pop from '@/components/Alert_pop.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import pagination from '@/components/Pagination.vue'
import { debug } from 'util';
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
//import ConfirmModal from '@/components/ConfirmModal.vue'
export default {
    data(){
        return {
            loadingZone:false,
            currentPage:1,
            demoData:[
                {key:'key1',value:'value1'},
                {key:'key2',value:'value2'},
                {key:'key3',value:'value3'}
            ],
            dataList: [],
            alertPop: 'hide',
            alertMsg:"",
            alertType:"info",
            pageLimit:20,
            dataPage:{},
            modalState:'hide',
            curKey:"",
            curVal:"",
            curId:"",
            searchData: "",
            curAction:""
        }
    },
    components:{
        alert_pop,
        pagination,
        Modal
    },
    mixins: [mixin_alert_msg],
    methods:{
        addSetting:function(){
            if (this.searchData == ""){
                this.showAlert("Key can't be empty!","info")
                return
            }
            if (this.searchData.length == 1){
                this.showAlert("More than one character!","info")
                return 
            }
            this.modalState = "show"
            this.curAction = "Add"
            this.curVal = ""
            this.curKey = this.searchData
        },
        onSubmit:function(){
            if (this.searchData.length == 1){
                this.showAlert("More than one character!","info")
                return 
            }
            this.currentPage = 1
            this.getSettings()
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        onChangeLimit(limit){
            this.pageLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
                this.getSettings()
            })
        },
        onChangePage(page) {
            this.currentPage = page;
            this.$nextTick(function(){
                this.getSettings()
            })
        },
        hideModal() {
            this.modalState = "hide"
        },
        onConfirm(){
            this.searchData = ""
            this.modalState = "hide"
            if (this.curAction == 'Add'){
                this.setAdd()
            }
            else if (this.curAction == 'Edit'){
                this.setEdit()
            }
        },
        setAdd(){
            let params = {
                key: this.curKey,
                value: this.curVal
            }
            Vue.http.post('Config/create', params).then(response => {
                this.loadingZone = false
                this.$nextTick(()=>{
                    this.getSettings()
                })
            }, response => {
                this.loadingZone = false
                this.showAlert(response.body.msg)
            })
        },
        setEdit(){
            let params = {
                id: this.curId,
                value: this.curVal
            }
            Vue.http.post('Config/edit', params).then(response => {
                this.loadingZone = false
                this.$nextTick(()=>{
                    this.getSettings()
                })
            }, response => {
                this.loadingZone = false
                this.showAlert(response.body.msg)
            })
        },
        editSetting(obj){
            this.modalState = "show"
            this.curAction = "Edit"
            this.curKey = obj.key
            this.curVal = obj.value
            this.curId = obj.id
        },
        getSettings(){
            this.loadingZone = true
            let query = {
                q: this.searchData,
                page: this.currentPage,
                limit: this.pageLimit
            }
            Vue.http.get('Config/getConfigList', {params: query}).then(response => {
                this.loadingZone = false
                var data = response.body && response.body.data && response.body.data;
                this.dataList = data && data.list
                this.dataPage = data && data.paginator
            }, response => {
                this.loadingZone = false
                this.showAlert(response.body.msg)
            })
        }
    },
    mounted(){
        this.getSettings()
    }
}
</script>
<style scoped>
.editableClass {
  text-decoration: underline;
  cursor: pointer;
}
</style>


