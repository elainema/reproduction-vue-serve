
<template>

  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">Publishers Daily Warning</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>STATISTICS</h2>
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
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" id="nav_tab_list" role="tablist">
                    <li role="presentation" class="active" @click.prevent="getAffAnalysisInfo('1')"><a href="#revenue_up" role="tab" data-toggle="tab">Revenue UP</a>
                    </li>
                    <li role="presentation"  @click.prevent="getAffAnalysisInfo('-1')"><a href="#revenue_down" role="tab" data-toggle="tab">Revenue Down</a>
                    </li>

                    </li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active overflow_scroll" id="revenue_up">
                        <p class="mt10 mb10">Top 20 affiliates with high revenue raise.</p>
                        <table class="table table-hover  tablesorter" id="">
                            <colgroup>
                                <!-- <col width="25" /> -->
                                <col width="55" />
                                <col width="150" />
                                <col width="100" />
                                <col width="150" />
                                <col width="150" />
                                <col width="150" />
                                <col width="100" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                                    <th class="tl-left">Aff_ID</th>
                                    <th class="tl-left">Publisher</th>
                                    <th class="tl-left">Revenue</th>
                                    <th class="tl-left">CR</th>
                                    <th class="tl-left">Click</th>
                                    <th class="tl-left">Conversion</th>
                                    <th class="tl-left">Action</th>
                                </tr>
                            </thead>
                            <tbody id="revenue_up_list">
                                <tr v-for="item in analysisInfo">
                                    <td>{{item.affiliate_id}}</td>
                                    <td>{{item.affiliate}}</td>
                                    <td>{{item.revenue}}/{{item.revenue_range}}</td>
                                    <td>{{item.cr}}/{{item.cr_range}}</td>
                                    <td>{{item.click}}/{{item.click_range}}</td>
                                    <td>{{item.conversion}}/{{item.conversion_range}}</td>
                                    <td>
                                        <a @click="viewDetail(item)" href="javascript:;" class="view_detail">View Detail</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div role="tabpanel" class="tab-pane overflow_scroll" id="revenue_down">

                        <p class="mt10 mb10">Top 20 affiliates with high revenue loss.</p>
                        <table class="table table-hover  tablesorter" id="">
                            <colgroup>
                                <!-- <col width="25" /> -->
                                <col width="55" />
                                <col width="150" />
                                <col width="100" />
                                <col width="150" />
                                <col width="150" />
                                <col width="150" />
                                <col width="100" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                                    <th class="tl-left">Aff_ID</th>
                                    <th class="tl-left">Affiliate</th>
                                    <th class="tl-left">Revenue</th>
                                    <th class="tl-left">CR</th>
                                    <th class="tl-left">Click</th>
                                    <th class="tl-left">Conversion</th>
                                    <th class="tl-left">Action</th>
                                </tr>
                            </thead>
                            <tbody id="revenue_down_list">
                                <tr v-for="item in analysisInfo">
                                    <td>{{item.affiliate_id}}</td>
                                    <td>{{item.affiliate}}</td>
                                    <td>{{item.revenue}}/{{item.revenue_range}}</td>
                                    <td>{{item.cr}}/{{item.cr_range}}</td>
                                    <td>{{item.click}}/{{item.click_range}}</td>
                                    <td>{{item.conversion}}/{{item.conversion_range}}</td>
                                    <td>
                                        <a @click="viewDetail(item)" href="javascript:;" class="view_detail">View Detail</a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </div>




            </div>
        </div>
    </div>
    <daily-warning-modal :modalState="modalState" :hideModal="hideModal" :affInfo="affInfo" :offerAnalysisInfo="offerAnalysisInfo"></daily-warning-modal>
    <!-- <daily-warning-modal
        :modalState.sync="modalState"
        :affInfo="affInfo" 
        :offerAnalysisInfo="offerAnalysisInfo"
        :dialogName="'modalState'">
    </daily-warning-modal> -->


  </div>


</template>

<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"
import DailyWarningModal from '@/components/DailyWarningModal.vue'


export default {
    data(){
        return {
            loadingZone:"",
            analysisInfo:[],
            affInfo:{},
            offerAnalysisInfo:[],
            sort:"1"
        }
    },
    computed: {
    },
    components:{DailyWarningModal},
    mixins: [mixin_modal],
    methods: {
        getAffAnalysisInfo(sort){
            this.sort = sort
            this.loadingZone = "ajax_loading"
            Vue.http.get('Report/getAffAnalysisInfo',{params:{sort:sort}}).then(response => {
                let data  = response.body.data 
                this.loadingZone = ""
                this.analysisInfo = data && data.list || []
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        },
        viewDetail(item){
            Vue.http.get('Affiliate/getById',{params:{id:item.affiliate_id}}).then(response => {
                let data  = response.body.data 
                this.affInfo = data;
                this.modalState = "show"
            }, response => {
            })
            this.getOfferAnalysisInfo(item);
        },
        getOfferAnalysisInfo(item){
            Vue.http.get('Report/getOfferAnalysisInfo',{params:{aff_id:item.affiliate_id, sort: this.sort}}).then(response => {
                let data  = response.body.data 
                this.offerAnalysisInfo = data.list;
            }, response => {
            })
        }
    },
    props:{

    },
    created () {
        this.getAffAnalysisInfo(1)
    }
}
</script>
<style>
    .view_detail {
        color: #08c !important;
        cursor: pointer;
    }
</style>