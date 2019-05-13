<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Publishers FeedBack</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Publishers FeedBack</h2>
            <div class="box-action">
                <!-- 
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

            <div class="box-content form-horizontal frm-entity frm-detail " >
                <div class="filter-form well ">
                    <form class="form-inline" ref="form" @submit.prevent="onSubmit">
                        <div class="aff_filter col-md-12 mb10">
                            <chosen  v-if="amChosen" :chosen="amChosen"  :chosen_name="'am_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All PMs -'" :default_value="0"></chosen>
                            <button  class="btn btn-primary show_aff">Show</button>
                        </div>
                        <div class="row-fluid clearfix ">

                            <div class="col-md-6">

                                <input class="col-md-8 form-control" type="text" name="q" autocomplete="off" placeholder="Keywords of Feedback" />

                                <button type="submit" class="btn btn-primary">Search</button>
                                <button type="reset" class="btn btn-default" id="reset_page">Reset</button>
                                <input type="hidden" name="page" id="" v-model="currentPage" />
                                <input type="hidden" name="limit" id="" v-model="currentLimit" />
                                <input type="hidden" name="passport_id" id="id_passport_id" value="0" />
                                <div id="hidden_sort"></div>


                            </div>
                            <div class="col-md-6 form-inline">
                                <dateTimePicker_range   :show_date_shortcut=false class="col-md-12" :start_class="'from'" :end_class="'to'"></dateTimePicker_range>
                            </div>
                        </div>
                    </form>
                </div>

                <pagination :page="feedback_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="feedback_page"></pagination>

                <div class="overflow_scroll">
                <table class="table table-hover tablesorter mt20" id="advs_list">
                    <colgroup>

                    </colgroup>
                    <thead>
                        <tr>
                            <th class="tl-left">ID</th>
                            <th class="tl-left">Publisher</th>
                            <th class="tl-left">PM</th>
                            <th class="tl-left">Date</th>
                            <th class="tl-left">Content</th>
                            <th class="tl-left">Note</th>
                        </tr>
                    </thead>
                    <tbody id="cp_list">

                      <tr v-for="(item,index ) in feedback_list">
                          <td class="no-wrap">{{item.id}}</td>
                          <td class="no-wrap"><router-link :to="'p_manage_aff?id=' + item.passport_id">{{item.passport_id}}</router-link></td>
                          <td class="no-wrap">{{item.passport_id}} - {{item.am}}</td>
                          <td class="no-wrap">{{formatCreateDate(item.create_time)}}  ({{item.create_time}})</td>
                          <td class="no-wrap">{{item.content}}</td>
                          <td class="no-wrap">
                            <editable-textarea-publisher  :editable_id="'note'" :editable_mode="'pop_up'" :emptytext="'Edit'" :showAlert="showAlert"  :publisher_name="'content'" :publisher_val="item.reply" :dynamic_render=true  :getCustomParam="customParam" :publisher_id="item.id" :publisher_api="'Suggestion/reply'" :action_type="'get'"></editable-textarea-publisher>
                          </td>

                      </tr>

                      <tr v-show="!feedback_list.length && renderTable"><td colspan="10"><strong>No Results Found.</strong></td></tr>

                    </tbody>
                </table>
                </div>

                <pagination :page="feedback_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="feedback_page"></pagination>

            </div>
        </div>
    </div>



</div>
</template>
<script>
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import chosen from '@/components/Chosen.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'

//import editable_textarea_publisher from '@/components/Editable_TextArea_Publisher.vue'
import EditableTextareaPublisher from '@/components/business/editable-textarea-publisher/'

import commonDataAPI from '@/api/commonData'

import pagination from '@/components/Pagination.vue'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'
import mixin_modal from "@/mixins/modal"

export default {
  data(){
    return {
            loadingZone:"",
            amChosen:"",
            feedback_list:"",
            renderTable:false,
            feedback_page:false,
            currentPage:1,
            currentLimit:20,
            sort_field:"",
            sort_type:""

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{pagination, chosen, AlertPop, dateTimePicker_range, EditableTextareaPublisher},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    onSubmit(){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Suggestion/getAllList',{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.renderTable = true
            this.feedback_list = data && data.list || []
            this.feedback_page = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    customParam(param){
        return {
            id:param.pk,
            content:param.value
        }
    },
    formatCreateDate(time) {
        return moment(time).fromNow(); 
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
  },
  created () {

  },
  mounted() {
    let that = this
    commonDataAPI.getAMList(function(data){

        that.amChosen = { name: "am", trans_name:"",  full_name: "am_id", data: data }


        that.$nextTick(function(){
            that.onSubmit()
        })

    })



  }
}
</script>