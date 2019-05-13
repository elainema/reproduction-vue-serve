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
        <div class="tab-box">
            <div class="box-content">
            <ul class="nav nav-tabs">
                <li><router-link to="p_register_list">register application</router-link></li> 
                <li class="active"><router-link to="p_register_history">History</router-link></li>
            </ul>
            <div class="condition-box form-group mt10">
                <form class="form-inline" ref="form" @submit.prevent="getRigisterList">
                    <input type="text" class="form-control col-md-2 condition mr15 pull-left" name="keywords" id="condition" placeholder="Keywords of Email"/>
                    <button class="btn btn-primary " id="search-btn">Search</button>
                </form>
            </div>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <div class="filter-form well hide" id="qf_register">

                        <div class="row-fluid">
                            <div class="col-md-6">
                                <input class="col-md-8 form-control" type="text" name="q" placeholder="Keywords of Affiliate" />
                                <button type="submit" class="btn btn-primary">Search</button>
                                <button type="reset" class="btn" id="reset_page">Reset</button>
                                <input type="hidden" name="page" :value="currentPage">
                                <input type="hidden" name="limit" :value="currentLimit">
                            </div>
                        </div>
                </div>
                <pagination :page="rigister_list_page" :onChangeLimit="onChangeLimit" :onChangePage="onChangePage" :currentPage="currentPage" v-if="rigister_list_page"></pagination>

                <table class="table table-hover tablesorter" id="affs_list">
                    <colgroup>

                    </colgroup>
                    <thead>
                        <tr>
                            <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                            <th class="tl-left">Email</th>
                            <th class="tl-left">First Name</th>
                            <th class="tl-left" width="10%">Last Name</th>
                            <th class="tl-left" width="10%">Country</th>
                            <th class="tl-left"><a href="#" class="sort sign-time-sort" data-sort="0">Sign Up Time</a></th>
                            <th class="tl-left"><a href="#" class="sort approvals-time-sort" data-sort="0">Approvals Time</a></th>
                            <th class="tl-left" width="12%">Phone</th>
                        </tr>
                    </thead>
                    <tbody id="register_list">
    
                        <tr v-for="item in rigister_list">
                            <td><a :href="'p_manage_approve?pageType=history&id=' + item.id">{{item.email}}</a></td>
                            <td>{{item.first_name}}</td>
                            <td>{{item.last_name}}</td>
                            <td>{{item.country}}</td>
                            <td>
                                {{item.create_time}}
                            </td>
                            <td>{{item.approval_time}}</td>
                            <td>{{item.phone}}</td>
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
    components: {pagination, AlertPop},
    mixins: [mixin_alert_msg],
    methods: {
        getRigisterList(){
            this.loadingZone = "ajax_loading"
            this.currentPage = 1
            this.$nextTick(function(){
                Vue.http.get('Affiliate/getHistory',{params:$(this.$refs.form).getFormQuery()}).then(response => {
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
        }
    },
    props:{

    },
    created () {
        let that = this

    },
    mounted () {
        this.getRigisterList()

    }
}
</script>