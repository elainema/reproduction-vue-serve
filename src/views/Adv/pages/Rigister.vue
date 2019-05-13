<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class=""><router-link to="p_advertisers">Advertisers</router-link></li>
            <li class="active">Advertiser</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>Register Application</h2>
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
            <div class="box-content max_ht">
                <div class="tabbable account-tab">
                    <ul id="opt_tabs" class="nav nav-tabs">
                        <li class="active"><a href="#application" data-toggle="tab" @click="getRegister">Register Application</a></li>
                        <li class=""><a href="#history" data-toggle="tab" @click="getRejectApplication">History</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="application" style="min-height: 360px;">
                          <div class="well hide-normal" ref="form">
                              <form id="bdFilter">
                                  <div class="control-group">
                                      <div class="controls">
                                          <select name="key[id]" id="bdList" class="form-control"></select>
                                          <select name="key[country]" id="country" class="form-control"></select>
                                      </div>
                                  </div>
                                  <div class="control-group">
                                      <div class="controls controls-row">
                                          <input type="text" class="col-md-4 form-control" name="key[query]" id="searchWord" placeholder="keywords of company name" />
                                          <button class="btn btn-primary col-md-1" type="button" id="searchRegister">Search</button>
                                      </div>
                                  </div>
                                  <div class="control-group">
                                      <div class="controls controls-row">
                                          <input type="hidden" name="sort" id="sort" value="desc"/>
                                          <input type="hidden" name="page" id="" v-model="currentAdvListPage" />
                                          <input type="hidden" name="limit" id="" v-model="currentAdvListLimit" />

                                      </div>
                                  </div>
                              </form>
                          </div>


                            <div id="registerTable" class="clearfix">
                                <pagination :page="advListTablePage" :onChangeLimit="onChangeAdvListLimit" :onChangePage="onChangeAdvListPage" :currentPage="currentAdvListPage" v-if="advListTablePage"></pagination>
                                <div class="overflow_scroll">
                                  <table class="table table-hover tablesorter list-table" id="register_list">
                                      <colgroup>
                                          <col width="16%">
                                          <col >
                                          <col width="16%">
                                          <col width="16%">
                                          <col width="16%">
                                          <col class="isManage" width="16%">
                                      </colgroup>
                                      <thead>
                                      <tr>
                                          <th class="tl-left">Company Name</th>
                                          <th class="tl-left">Email</th>
                                          <th class="tl-left">Phone Number</th>
                                          <th class="tl-left">Country</th>
                                          <th class="tl-left sorting">Sign Up Time</th>
                                          <th class="tl-left isManage" v-show="isManage">Account Manager</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="item in advs_list">
                                          <td><router-link :to="'bd_high_advertiser_detail?id=' + item.id" >{{item.company_name}}</router-link></td>
                                          <td><router-link :to="'bd_high_advertiser_detail?id=' + item.id" >{{item.email}}</router-link></td>
                                          <td>{{item.phone}}</td>
                                          <td>{{item.country.name}}</td>
                                          <td>{{item.create_time}}</td>
                                          <td v-show="isManage">{{item.manager && item.manager.first_name}} {{item.manager && item.manager.last_name}}</td>
                                        </tr>
                                      </tbody>
                                  </table>
                                </div>

                                <div class="btn-group" id="pager_foot"></div>
                            </div>
                        </div>

                        <div class="tab-pane" id="history">
                            <div class="well" style="display: none">
                                <form id="historyFilter" ref="form_history">

                                    <div class="control-group">
                                        <div class="controls controls-row">
                                            <input type="text" class="col-md-4" name="key[query]" id="history_searchWord" placeholder="keywords of company name" />
                                            <button class="btn btn-primary col-md-1" type="button" id="history_searchRegister">Search</button>
                                        </div>
                                    </div>
                                    <div class="control-group">
                                        <div class="controls controls-row">
                                            <input type="hidden" name="sort[key]" id="sort_key" value="desc"/>
                                            <input type="hidden" name="sort[value]" id="sort_value" value="desc"/>
                                            <input type="hidden" name="page" id="" v-model="currentAdvHistoryPage" />
                                            <input type="hidden" name="limit" id="" v-model="currentAdvHistoryLimit" />


                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div id="historyTable" class="clearfix">
                                <pagination :page="advHistoryPage" :onChangeLimit="onChangeAdvHistoryLimit" :onChangePage="onChangeAdvHistoryPage" :currentPage="currentAdvHistoryPage" v-if="advHistoryPage"></pagination>
                                <div class="overflow_scroll">
                                  <table class="table table-hover tablesorter list-table" id="history_list">
                                      <colgroup>
                                          <col width="14%">
                                          <col width="14%">
                                          <col width="14%">
                                          <col width="14%">
                                          <col width="14%">
                                          <col width="14%">
                                          <col width="14%">
                                      </colgroup>
                                      <thead>
                                      <tr>
                                          <th class="tl-left">Company Name</th>
                                          <th class="tl-left">Email</th>
                                          <th class="tl-left">Phone Number</th>
                                          <th class="tl-left">Country</th>
                                          <th class="tl-left sorting" id="signTime">Sign Up Time</th>
                                          <th class="tl-left sorting" id="approvalsTime">Approvals Time</th>
                                          <th class="tl-left">Account Manager</th>
                                      </tr>
                                      </thead>
                                      <tbody>
                                        <tr v-for="item in advs_history_list">
                                          <td ><router-link :to="'bd_high_advertiser_detail?id=' + item.id">{{item.company_name}}</router-link></td>
                                          <td><router-link :to="'bd_high_advertiser_detail?id=' + item.id">{{item.email}}</router-link></td>
                                          <td>{{item.phone}}</td>
                                          <td>{{item.country.name}}</td>
                                          <td>{{item.create_time}}</td>
                                          <td>{{item.manager && item.manager.operation_time}}</td>
                                          <td>{{item.manager && item.manager.first_name}} {{item.manager && item.manager.last_name}}</td>
                                        </tr>
                                      </tbody>
                                  </table>
                                </div>

                                <div class="btn-group" id="pager_foot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



</div>
</template>
<script>
import alert_pop_util from '@/util/alert_pop'
import chosen from '@/components/Chosen.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'
import pagination from '@/components/Pagination.vue'


export default {
  data(){
    return {
            loadingZone:"",
            geoChosen:"",
            advs_list:[],
            renderTable:false,
            advListTablePage:false,
            currentAdvListPage:1,
            currentAdvListLimit:20,
            advs_history_list:[],
            advHistoryPage:false,
            currentAdvHistoryPage:1,
            currentAdvHistoryLimit:20,
            isManage:false
        }
    },
  mixins: [mixin_alert_msg],
  computed: {

  },
  components:{pagination, chosen},
  computed:{

  },
  watch:{

  },
  methods: {
    getRegister(){
        this.loadingZone = "ajax_loading"
        Vue.http.get('Advertiser/getRegister',{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.isManage = !!data.level
            this.loadingZone = ""
            this.renderTable = true
            this.advs_list = data && data.list || []
            this.advListTablePage = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    getRejectApplication(){
        this.loadingZone = "ajax_loading"
        Vue.http.get('Advertiser/getRejectApplication',{params:$(this.$refs.form_history).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.advs_history_list = data && data.list || []
            this.advHistoryPage = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    onChangeAdvListLimit(limit){
        this.currentAdvListLimit = limit;
        this.currentAdvListPage = 1;
        this.$nextTick(function(){
          this.getRegister()
        })
    },
    onChangeAdvListPage(page){
        this.currentAdvListPage = page;
        this.$nextTick(function(){
          this.getRegister()
        })
    },
    onChangeAdvHistoryLimit(limit){
        this.currentAdvHistoryLimit = limit;
        this.currentAdvHistoryPage = 1;
        this.$nextTick(function(){
          this.getRegister()
        })
    },
    onChangeAdvHistoryPage(page){
        this.currentAdvHistoryPage = page;
        this.$nextTick(function(){
          this.getRegister()
        })
    },

  },
  created () {
    let that = this

    this.getRegister()

  }
}
</script>
<style>
  .link {
    padding: 0 !important;
  }
  .link a {
    display: block;
    height: 100%
  }
</style>