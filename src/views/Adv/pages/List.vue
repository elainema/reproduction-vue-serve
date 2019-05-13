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
            <h2>Advertisers</h2>
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

            <div class="box-content form-horizontal frm-entity frm-detail" >
                <form class="form-inline form-actions" ref="form" @submit.prevent="onSubmit">
                    <div class="aff_filter col-md-12 mb10 row">
                        <chosen  v-if="amChosen" :chosen="amChosen"  :chosen_name="'bd_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All AMs -'"></chosen>
                        <button  class="btn btn-primary show_aff">Search</button>
                    </div>
                    <chosen  v-if="geoChosen" :chosen="geoChosen"  :chosen_name="'country'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All Country -'"></chosen>
                    <input class="col-md-5 form-control" type="text" name="q" autocomplete="off" placeholder="Keywords of Advertisers" />
                    <button type="submit" class="btn btn-primary" >Search</button>
                    <button type="reset" class="btn btn-default" id="reset_page">Reset</button>
                    <input type="hidden" name="page" id="" v-model="currentAdvListPage" />
                    <input type="hidden" name="limit" id="" v-model="currentAdvListLimit" />
                </form>

                <pagination :page="advListTablePage" :onChangeLimit="onChangeAdvListLimit" :onChangePage="onChangeAdvListPage" :currentPage="currentAdvListPage" v-if="advListTablePage"></pagination>
                <div class="overflow_scroll">
                  <table class="table table-hover tablesorter mt20" id="advs_list">
                      <colgroup>
                          <!-- <col width="25" /> -->
                          <col width="80" />
                          <col width="200" />
                          <col width="120" />
                          <col width="150" />
                          <col width="100" />
                          <col width="100" />
                          <col width="100" />
                          <col width="200" />
                          <col width="60" />
                          <col />
                      </colgroup>
                      <thead>
                          <tr>
                              <!-- <th><input type="checkbox" id="check_all" /></th> -->
                              <th>Adv ID</th>
                              <th>Company Name</th>
                              <th>AM Name</th>
                              <th>Phone</th>
                              <th>Fax</th>
                              <th>Country</th>
                              <th>Region</th>
                              <th>City</th>
                              <th>Address</th>
                              <!-- <th>Login</th> -->
                          </tr>
                      </thead>
                      <tbody id="cp_list">
                        <tr v-for="(item,index ) in advs_list">
                            <td class="no-wrap">
                                <router-link :to="'p_manage_adv?id=' + item.id">{{item.id}}</router-link>
                            </td>
                            <td>
                                <router-link :to="'p_manage_adv?id=' + item.id">{{item.company}}</router-link>
                            </td>
                            <td>{{item.bd_first_name}} {{item.bd_last_name}}</td>
                            <td>{{item.phone}}</td>
                            <td>{{item.fax}}</td>
                            <td>{{item.country}}</td>
                            <td>{{item.region}}</td>
                            <td>{{item.city}}</td>
                            <td style="min-width:200px">{{item.address1}}</td>
                            <!-- <td class="bd_show">
                                <a  href="#" v-if="item.is_filter != 1" class="pointer " :data-id="item.id" @click.prevent="advLogin(item.id)">{{item.virtual_login == 0 ? '' : 'Login'}}</a>
                            </td> -->
                        </tr>

                        <tr v-show="!advs_list.length && renderTable"><td colspan="10"><strong>No Results Found.</strong></td></tr>



                      </tbody>
                  </table>
                </div>

                <pagination :page="advListTablePage" :onChangeLimit="onChangeAdvListLimit" :onChangePage="onChangeAdvListPage" :currentPage="currentAdvListPage" v-if="advListTablePage"></pagination>

            </div>
        </div>
    </div>



</div>
</template>
<script>
import alert_pop_util from '@/util/alert_pop'
import { mapGetters, mapActions } from 'vuex'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import chosen from '@/components/Chosen.vue'
import mixin_alert_msg from '@/mixins/alert_msg'
import Vue from 'vue'

import commonDataAPI from '@/api/commonData'

import pagination from '@/components/Pagination.vue'


export default {
  data(){
    return {
            loadingZone:"",
            geoChosen:"",
            advs_list:"",
            amChosen:"",
            renderTable:false,
            advListTablePage:false,
            currentAdvListPage:1,
            currentAdvListLimit:20
        }
    },
  mixins: [mixin_alert_msg],
  computed: {

  },
  components:{pagination, chosen, AlertPop},
  computed:{

  },
  watch:{

  },
  methods: {
    onSubmit(){
        this.currentAdvListPage = 1;
        this.currentAdvListLimit = 20;
        this.$nextTick(function(){
          this.getAllList()
        })
    },
    getAllList(){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Advertiser/getAllList',{params:$(this.$refs.form).getFormQuery()}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.renderTable = true
            this.advs_list = data && data.list || []
            this.advListTablePage = data && data.paginator
        }, response => {
            this.loadingZone = ""
            this.showAlert(response.body.msg)
        })
    },
    onChangeAdvListLimit(limit){
        this.currentAdvListLimit = limit;
        this.currentAdvListPage = 1;
        this.$nextTick(function(){
          this.getAllList()
        })
    },
    onChangeAdvListPage(page){
        this.currentAdvListPage = page;
        this.$nextTick(function(){
          this.getAllList()
        })
    },
    advLogin(id) {
        Vue.http.get('Session/virtualEmployee2Adv',{params:{adv_id:id}}).then(response => {
            let data  = response.body.data 
            var host = window.location;
            window.location.href = host.protocol + '//' + host.host;
        }, response => {
            this.showAlert(response.body.msg)
        })
    }
  },
  mounted () {
    let that = this
    commonDataAPI.getGeos(function(data){

      that.geoChosen = { name: "geo", trans_name:"country",  full_name: "geos", data: data }
    })
    commonDataAPI.getAMs(function(data){

      that.amChosen = { name: "am", trans_name:"",  full_name: "am_id", data: data }
    })

    this.onSubmit()

  }
}
</script>