<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Manage Publishers</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Manage Publishers</h2>
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
                            <chosen  v-if="amChosen" :chosen="amChosen"  :chosen_name="'am_id'" :chosen_type="'simple'" style="width:auto"  :default_option="'- All PMs -'"></chosen>
                            <!-- <select id="role" style="width:132px" name="q_level" >
                                <option value="">Quality Level</option>
                                <option v-for = "(value, key) in levelChosen" :key="key" :value="value" > {{ key }}</option>
                            </select> -->
                            <button  class="btn btn-primary show_aff">Show</button>
                        </div>
                        <div class="row-fluid clearfix ">

                            <div class="col-md-6">

                                <input class="col-md-8 form-control" type="text" name="q" autocomplete="off" placeholder="Keywords of Publisher" />

                                <button type="submit" class="btn btn-primary">Search</button>
                                <button type="reset" class="btn btn-default" id="reset_page" @click="resetForm">Reset</button>
                                <input type="hidden" name="page" id="" v-model="currentPublisherListPage" />
                                <input type="hidden" name="limit" id="" v-model="currentPublisherListLimit" />
                                <input type="hidden" name="sort_field" :value="sort_field" />
                                <input type="hidden" name="sort_type" :value="sort_type" />
                                <div id="hidden_sort"></div>

                                <div class="form-inline">
                                    <span>Status: </span>
                                    <label class="checkbox ">
                                        <input type="checkbox" name="status[]" value="pending" checked="checked" /> Pending
                                    </label>
                                    <label class="checkbox ">
                                        <input type="checkbox" name="status[]" value="active" checked="checked" /> Active
                                    </label>
                                </div>
                                <br />
                                <!-- <div class="form-inline" id="action_float">
                                    Action: 
                                    <div class="btn-group">
                                        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                                            Set Level
                                            <span class="caret"></span>
                                        </a>
                                        <ul class="dropdown-menu" id="action_level">
                                            <li><a class="pointer" data-value="1">Level1</a></li>
                                            <li><a class="pointer" data-value="2">Level2</a></li>
                                            <li><a class="pointer" data-value="3">Level3</a></li>
                                        </ul>
                                    </div>
                                </div> -->
                            </div>
                            <div class="col-md-6 form-inline">
                                <dateTimePicker_range  :from_date="''" :no_hour=true class="col-md-12" :start_class="'from'" :end_class="'to'"></dateTimePicker_range>
                            </div>
                        </div>
                    </form>
                </div>

                <pagination :page="publisherListTablePage" :onChangeLimit="onChangePublisherListLimit" :onChangePage="onChangePublisherListPage" :currentPage="currentPublisherListPage" v-if="publisherListTablePage"></pagination>

                <div class="overflow_scroll">
                    <table class="table table-hover tablesorter mt20" id="advs_list">
                        <colgroup>
                            <col width="25" />
                            <col width="100" />
                            <col width="180" />
                            <col width="120" />
                            <col width="30" />
                            <col width="50" />
                            <col width="140" />
                            <col width="70" />
                            <col width="140" />
                            <col width="210" />
                            <col width="180" />
                            <col width="130" />
                            <col width="60" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th class="tl-left"></th>
                                <th class="tl-left sorting" data-sort="aff_id" @click="changeSortField('aff_id')">ID</th>
                                <th class="tl-left sorting" data-sort="affiliate" @click="changeSortField('affiliate')">Publisher</th>
                                <th class="tl-left">PM</th>
                                <th class="tl-left">level</th>
                                <th class="tl-left">Quality Level</th>
                                <th class="tl-left sorting" data-sort="company" @click="changeSortField('company')">Company</th>
                                <th class="tl-left">Status</th>
                                <th class="tl-left">Country</th>
                                <th class="tl-left">Email</th>
                                <th class="tl-left">IM</th>
                                <th class="tl-left">Phone</th>
                                <!-- <th class="tl-left">Login</th> -->
                            </tr>
                        </thead>
                        <tbody id="cp_list">

                          <tr v-for="(item,index ) in publisher_list">
                              <td class="no-wrap"></td>
                              <td class="no-wrap" v-if="item.aff_detail_url === '***' ">{{item.id}}</td>
                              <td class="no-wrap" v-else> <router-link :to="'p_manage_aff?id=' + item.id">{{item.id}}</router-link></td>
                              <td class="no-wrap" v-if="item.aff_detail_url === '***' ">{{item.first_name}}  {{item.last_name}}</td>
                              <td class="no-wrap" v-else> <router-link :to="'p_manage_aff?id=' + item.id">{{item.first_name}}  {{item.last_name}}</router-link></td>

                              <td class="no-wrap">
                                  {{item.am_first_name}}  {{item.am_last_name}}
                              </td>
                              <td class="no-wrap">{{item.level || 1}}</td>
                              <td class="no-wrap">{{item.quality_level}}</td>
                              <td class="no-wrap">{{item.company_name}}</td>
                              <td class="no-wrap">{{item.status | capitalize}}</td>
                              <td class="no-wrap">{{item.country}}</td>
                              <td class="no-wrap">{{item.email}}</td>
                              <td class="no-wrap">
                                <ul>
                                    <li v-if="item.qq">QQ: {{item.qq}}</li>
                                    <li v-if="item.msn">Msn: {{item.msn}}</li>
                                    <li v-if="item.skype">Skype: {{item.skype}}</li>
                                    <li v-if="item.gtalk">Gtalk: {{item.gtalk}}</li>
                                    <li v-if="item.wechat">Wechat: {{item.wechat}}</li>
                                </ul>
                              </td>
                              <td  class="no-wrap">{{item.phone}}</td>
                              <td class="bd_show">
                                  <a  href="#" v-if="item.is_filter != 1" class="pointer " :data-id="item.id" @click.prevent="publisherLogin(item.id)">Login</a>
                              </td>
                          </tr>

                          <tr v-show="!publisher_list.length && renderTable"><td colspan="10"><strong>No Results Found.</strong></td></tr>

                        </tbody>
                    </table>
                </div>

                <pagination :page="publisherListTablePage" :onChangeLimit="onChangePublisherListLimit" :onChangePage="onChangePublisherListPage" :currentPage="currentPublisherListPage" v-if="publisherListTablePage"></pagination>

            </div>
        </div>
    </div>



</div>
</template>
<script>
import alert_pop_util from '@/util/alert_pop'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import chosen from '@/components/Chosen.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'

import commonDataAPI from '@/api/commonData'

import pagination from '@/components/Pagination.vue'
import dateTimePicker_range from '@/components/DateTimePicker_range.vue'


export default {
  data(){
    return {
            loadingZone:"",
            amChosen:"",
            publisher_list:"",
            renderTable:false,
            publisherListTablePage:false,
            currentPublisherListPage:1,
            currentPublisherListLimit:20,
            sort_field:"",
            sort_type:"",
            levelChosen: {
                'level 1' : 1,
                'level 2' : 2,
                'level 3' : 3,
                'level 4' : 4,
            }
        }
    },
  mixins: [mixin_alert_msg],
  computed: {

  },
  components:{pagination, chosen, AlertPop, dateTimePicker_range},
  computed:{

  },
  watch:{
    sort_field: function(newVal, oldVal){
        this.sort_type = 1
    }
  },
  methods: {
    onSubmit(){
        this.currentPublisherListLimit = 20;
        this.currentPublisherListPage = 1;
        this.$nextTick(function(){
          this.getList()
        })
    },
    getList(){
        this.loadingZone = "ajax_loading"
        Vue.http.get('Affiliate/getList',{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.renderTable = true
            this.publisher_list = data && data.list || []
            this.publisherListTablePage = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    changeSortField(field){
        this.sort_field = field;
        this.sort_type = this.sort_type  == 1 ? -1 : 1
        this.$nextTick(function(){
            this.getList()
        })
    },
    resetForm(){
        $(this.$refs.form).find("input").val("")
    },
    onChangePublisherListLimit(limit){
        this.currentPublisherListLimit = limit;
        this.currentPublisherListPage = 1;
        this.$nextTick(function(){
          this.getList()
        })
    },
    onChangePublisherListPage(page){
        this.currentPublisherListPage = page;
        this.$nextTick(function(){
          this.getList()
        })
    },
    publisherLogin(id){
        Vue.http.get('Employee/vLoginAff',{params:{aff_id:id}}).then(response => {
            let data  = response.body.data 
            let host = window.location;
            window.location.href = host.protocol + '//' + host.host.replace('manage', 'affiliate');
        }, response => {
            this.showAlert(response.body.msg)
        })
    }
  },
  created () {
    let that = this
    commonDataAPI.getAMList(function(data){

      that.amChosen = { name: "am", trans_name:"",  full_name: "am_id", data: data }
    })

  },
  mounted() {
    this.onSubmit()
  }
}
</script>