<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">AM Send Email to Publishers</li>
        </ul>
    </div>
    <ul class="nav nav-pills mb10">
        <li ><router-link to="p_email_am">Send Email</router-link></li>
        <li  class="active"><router-link to="p_am_history">History</router-link></li>
    </ul>
    <div class="box">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        <div class="box-header">
            <h2>History Email</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <div class="filter-form well" id="email_history">
                    <form class="form-inline" ref="form" @submit.prevent="onSubmit">
                        <div class="row-fluid">
                            <div class="col-md-6 form-inline input-daterange input-group" id="datepicker">
                                <dateTimePicker_range  :from_date="'lmonth_2d'"  :show_date_shortcut=false :no_hour=true class="col-md-12" :start_class="'start_time'" :end_class="'end_time'"></dateTimePicker_range>

                                <button type="submit" class="btn btn-primary hide">Go</button>
                            </div>
                            <div class="col-md-6 search_div nopadding">
                                <select class=" form-control col-md-3 pull-left mr10" name="type">
                                    <option value="email_to">Email To</option>
                                    <option value="subject">Subject</option>
                                </select>
                                <input class="col-md-6 pull-left mr10" type="text" name="keywords" autocomplete="off" placeholder="Please Input Keywords" />
                                <button type="submit" class="btn btn-primary">Search</button>
                                <!-- <button type="reset" class="btn" id="reset_page">Reset</button> -->
                                <button type="reset" class="btn" id="reset_page">Reset</button>
                                <input type="hidden" name="page" :value="currentPage">
                                <input type="hidden" name="limit" :value="currentLimit">

                                <div id="hidden_sort"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="btn-group" id="pager_head"></div>
                <table class="table table-hover tablesorter list-table" id="email_table">
                    <colgroup>
                        <col width="80" />
                        <col width="250" />
                        <col width="150" />
                        <col width="150" />
                        <col width="400" />
                        <col width="" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th class="sorting" data-sort="id">ID</th>
                            <th>Email To</th>
                            <th class="sorting" data-sort="send_time">Send Time</th>
                            <th class="sorting" data-sort="send_time">Status</th>
                            <th class="sorting" data-sort="title">Subject</th>
                            <th class="sorting" data-sort="remark">Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in email_list" v-if="email_list.length">
                            <td>{{item.id}}</td>
                            <td><a href="javascript:;"  @click="showMailTo(item)" class="underline">{{item.list_to.split(";").length}} Recipients</a></td>
                            <td>{{item.send_time}}</td>
                            <td>{{item.current_status}}</td>
                            <td class="underline">
                                <a href="javascript:;" @click="showContent(item)" class="underline">{{item.title}}</a>
                            </td>
                            <td>
                                <editable-textarea-publisher  :editable_id="'note'" :editable_mode="'pop_up'" :emptytext="'Edit'" :showAlert="showAlert"  :publisher_name="'remark'" :publisher_val="item.remark" :dynamic_render=true  :getCustomParam="customParam" :publisher_id="item.id" :publisher_api="'Email/editSystemEmailRemark'" :action_type="'get'"></editable-textarea-publisher>
                            </td>
                        </tr>
                        <tr v-if="renderTable && !email_list.length"><td colspan="11"><strong>No Results Found.</strong></td></tr>   
                    </tbody>
 
                </table>
                <pagination :page="email_list_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="email_list_page"></pagination>

                <div class="clearfix"></div>
            </div>
        </div>
    </div>
   <!--  <mailContentModal :modalState="modalState" :hideModal="hideModal" :sysTemEmail="sysTemEmail"></mailContentModal> -->
    <mail-content-modal
        :modalState.sync="modalState"
        :sysTemEmail="sysTemEmail"
        :dialogName="'modalState'"
    ></mail-content-modal>

   <!--  <mailToModal :modalState="modalState_MailTo" :hideModal="hideModal_MailTo" :mailToList="mailToList"></mailToModal> -->
    <mail-to-modal
        :modalState.sync="modalState_MailTo"
        :mailToList="mailToList"
        :dialogName="'modalState'"
    ></mail-to-modal>
  </div>


</template>
<script>
import Vue from 'vue'
import pagination from '@/components/Pagination.vue'
//import editable_textarea_publisher from '@/components/Editable_TextArea_Publisher.vue'
import EditableTextareaPublisher from '@/components/business/editable-textarea-publisher/'
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_modal from "@/mixins/modal"
//import mailContentModal from '@/components/MailContentModal.vue'
//import mailToModal from '@/components/MailToModal.vue'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
//al
const MailContentModal = () => import(
/* webpackChunkName: "MailContentModal" */ '../components/mail-content-modal/'
);
const MailToModal = () => import(
/* webpackChunkName: "MailToModal" */ '../components/mail-to-modal/'
);

export default {
    data(){
        return {
            loadingZone:"",
            email_list:[],
            mailToList:[],
            renderTable:false,
            email_list_page:"",
            currentPage:1,
            currentLimit:20,
            sysTemEmail:{},
            modalState_MailTo:"hide",

        }
    },
    computed: {
        startDate(){
            return moment().add(-1, "month").format("YYYY-MM-DD")
        },
        endDate(){
            return moment().format("YYYY-MM-DD")
        }
    },
    components: {pagination, EditableTextareaPublisher, AlertPop, MailContentModal, MailToModal, dateTimePicker_range},
    mixins: [mixin_alert_msg, mixin_modal],
    methods: {
        hideModal_MailTo(){
            this.modalState_MailTo = "hide"
        },
        onSubmit(){
            this.loadingZone = "ajax_loading"


            this.$nextTick(function(){

                let start_time = $(this.$refs.form).find("[name='start_time']")
                let end_time = $(this.$refs.form).find("[name='end_time']")
                start_time.val(start_time.val() + " 00:00")
                end_time.val(end_time.val() + " 23:59")

                Vue.http.get('Email/getHistoryEmailList',{params:$(this.$refs.form).getFormQuery()}).then(response => {
                    let data  = response.body.data 
                    this.loadingZone = ""
                    this.renderTable = true
                    this.email_list = data && data.list || []
                    this.email_list_page = data && data.paginator
                }, response => {
                    this.loadingZone = ""
                    this.showAlert(response.body.msg)
                })
            })

        },
        onChangeLimit(limit){
            this.currentLimit = limit;
            this.currentPage = 1;
            this.$nextTick(function(){
              this.onSubmit()
            })
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
              this.onSubmit()
            })
        },
        customParam(param){
            return {
                email_to_id:param.pk,
                remark:param.value
            }
        },
        getEmailToListByEmailId(item, callback){
            let params = {
                email_to_id: item.id,
                status:"all",
                start_time: moment().add(-1, "month").format("YYYY-MM-DD") + " 00:00",
                end_time:moment().format("YYYY-MM-DD") + " 23:59"

            }
            Vue.http.get('Email/getEmailToListByEmailId',{params:params}).then(response => {
                let data  = response.body.data 

                callback && callback(data)
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        showMailTo(item) {
            let that = this
            this.getEmailToListByEmailId(item, function(data){
                that.modalState_MailTo = "show"

                that.mailToList = data.list
            })
        },
        showContent(item){
            let that = this
            this.getEmailToListByEmailId(item, function(data){
                that.modalState = "show"
                let email_arr = []
                _.each(data.list, function(_item) {
                    email_arr.push(_item.email)
                })
                that.sysTemEmail = {
                    email:email_arr.join(","), 
                    content:item.content,
                    title:item.title
                }
            })
        }
    },
    props:{

    },
    created () {
        let that = this

    },
    mounted () {
        this.onSubmit()

    }
}
</script>