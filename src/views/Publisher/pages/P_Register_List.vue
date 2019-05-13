<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Register Application</li>
        </ul>
    </div>
    <div class="box">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        <div class="box-header">
            <h2>Register Application</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <!--
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="tab-box clearfix">
            <div class="box-content">
                <ul class="nav nav-tabs">
                    <li class="active"><router-link to="p_register_list">register application</router-link></li> 
                    <li><router-link to="p_register_history">History</router-link></li>
                </ul>
                <div class="condition-box">
                    <form class="form" ref="form" @submit.prevent="onSubmit">
                        <div class="condition-controls form-group">
                            <div class="col-md-12 form-group ">

                            <chosen  v-if="geoChosen" :chosen="geoChosen"  :chosen_name="'country'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All Country -'"></chosen>


                            </div>

                            <div class="col-md-12 form-group ">
                                <input type="text" class="form-control condition mr15 col-md-5 pull-left" name="keywords" id="condition" placeholder="Keywords of Email"/>
                                <input type="hidden" name="page" :value="currentPage">
                                <input type="hidden" name="limit" :value="currentLimit">
                                <button class="btn btn-primary" id="search-btn" type="submit">Search</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>

        </div>
        <div class="box-container">
            <div class="box-content">
                <pagination :page="rigister_list_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="rigister_list_page"></pagination>

                <table class="table table-hover tablesorter" id="affs_list">
                    <colgroup>

                    </colgroup>
                    <thead>
                        <tr>
                            <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                            <th class="tl-left" width="15%">Email</th>
                            <th class="tl-left" width="12%">First Name</th>
                            <th class="tl-left">Last Name</th>
                            <th class="tl-left" width="10%">Country</th>
                            <th class="tl-left" width="15%"><a href="#" data-sort="0" style="text-decoration:underline" class="sort sign-time-sort">Sign Up Time</a></th>
                            <th class="tl-left" width="10%">Phone</th>
                            <th class="tl-left" width="18%">Referral</th>
                            <th class="tl-left" width="20%">Abnormal</th>
                        </tr>
                    </thead>
                    <tbody id="register_list">
                        <tr v-for="item in rigister_list">
                            <td><a :href="'p_manage_approve?pageType=list&id=' + item.id">{{item.email}}</a></td>
                            <td>{{item.first_name}}</td>
                            <td>{{item.last_name}}</td>
                            <td>{{item.country_name}}</td>
                            <td>
                                {{item.create_time}}
                            </td>
                            <td>{{item.phone}}</td>
                            <td>{{item.referral_name}}</td>
                            <td>{{item.abnormal.join(",")}}</td>
                        </tr>
                        <tr v-if="renderTable && !rigister_list.length"><td colspan="11"><strong>No Results Found.</strong></td></tr>

                    </tbody>
                </table>
                <pagination :page="rigister_list_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="rigister_list_page"></pagination>

                <div class="clearfix"></div>
            </div>
        </div>
    </div>
  </div>


</template>

<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"

import commonDataAPI from '@/api/commonData'
import chosen from '@/components/Chosen.vue'
import pagination from '@/components/Pagination.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'

export default {
    data(){
        return {
            loadingZone:"",
            geoChosen:"",
            rigister_list:[],
            renderTable:false,
            rigister_list_page:"",
            currentPage:1,
            currentLimit:20
        }
    },
    computed: {
    },
    components: {chosen, pagination, AlertPop},
    mixins: [mixin_modal,mixin_alert_msg],
    methods: {
        getRigisterList(){
            this.loadingZone = "ajax_loading"
            
            this.$nextTick(function(){
                Vue.http.get('Affiliate/getPending',{params:$(this.$refs.form).getFormQuery()}).then(response => {
                    let data  = response.body.data 
                    this.loadingZone = ""
                    this.renderTable = true
                    this.rigister_list = data && data.list || []
                    this.rigister_list_page = data && data.paginator
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
              this.getRigisterList()
            })
        },
        onChangePage(page){
            this.currentPage = page;
            this.$nextTick(function(){
              this.getRigisterList()
            })
        },
        onSubmit() {
            this.currentPage = 1
            this.getRigisterList()
        }
    },
    props:{

    },
    created () {
        let that = this
        commonDataAPI.getGeos(function(data){

          that.geoChosen = { name: "geo", trans_name:"",  full_name: "geo", data: data }
        })
        
    },
    mounted() {

        this.getRigisterList()
    }
}
</script>