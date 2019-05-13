<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">CR Monitor</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

    <div class="box">
        <div class="box-header">
            <h2>CR Monitor</h2>
            <div class="box-action">
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <ul class="nav nav-tabs" id="nav_tab_list" role="tablist">
                    <li role="presentation" class="active" @click="sort=1"><a href="#cr_up" role="tab" data-toggle="tab">CR UP</a>
                    </li>
                    <li role="presentation" class="" @click="sort=0"><a href="#cr_down" role="tab" data-toggle="tab">CR Down</a>
                    </li>


                </ul>
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active " id="cr_up">
                        <table class="table table-hover tablesorter tbl2-fixed mt10" id="offers_list">
                            <colgroup>
                                <!-- <col width="25" /> -->
                                <col width="70" />
                                <col width="80" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="60" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Offer ID</th>
                                    <th>Offer Name</th>
                                    <th>Status-Hasoffers</th>
                                    <th>Status-YeahMobi</th>
                                    <th>Click-Hasoffers</th>
                                    <th>Click-YeahMobi</th>
                                    <th>Conv-Hasoffers</th>
                                    <th>Conv-YeahMobi</th>
                                    <th>CR-Hasoffers</th>
                                    <th>CR-YeahMobi</th>
                                    <th>Diff</th>
                                </tr>
                            </thead>
                            <tbody id="cp_list_down">
                                <tr v-for="item in cr_list">
                                    <td>{{item.offer_id}}</td>
                                    <td>{{item.offer_name}}</td>
                                    <td>{{item['status-hasoffer']}}</td>
                                    <td>{{item['status-yeahmobi']}}</td>
                                    <td>{{item['click-hasoffer']}}</td>
                                    <td>{{item['click-yeahmobi']}}</td>
                                    <td>{{item['conv-hasoffer']}}</td>
                                    <td>{{item['conv-yeahmobi']}}</td>
                                    <td>{{item['cr-hasoffer']}}</td>
                                    <td>{{item['cr-yeahmobi']}}</td>
                                    <td>{{item['diff']}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div role="tabpanel" class="tab-pane" id="cr_down">
                        <table class="table table-hover tablesorter tbl2-fixed mt10" id="offers_list">
                            <colgroup>
                                <!-- <col width="25" /> -->
                                <col width="70" />
                                <col width="80" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="100" />
                                <col width="60" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Offer ID</th>
                                    <th>Offer Name</th>
                                    <th>Status-Hasoffers</th>
                                    <th>Status-YeahMobi</th>
                                    <th>Click-Hasoffers</th>
                                    <th>Click-YeahMobi</th>
                                    <th>Conv-Hasoffers</th>
                                    <th>Conv-YeahMobi</th>
                                    <th>CR-Hasoffers</th>
                                    <th>CR-YeahMobi</th>
                                    <th>Diff</th>
                                </tr>
                            </thead>
                            <tbody id="cp_list_down">
                                <tr v-for="item in cr_list">
                                    <td>{{item.offer_id}}</td>
                                    <td>{{item.offer_name}}</td>
                                    <td>{{item['status-hasoffer']}}</td>
                                    <td>{{item['status-yeahmobi']}}</td>
                                    <td>{{item['click-hasoffer']}}</td>
                                    <td>{{item['click-yeahmobi']}}</td>
                                    <td>{{item['conv-hasoffer']}}</td>
                                    <td>{{item['conv-yeahmobi']}}</td>
                                    <td>{{item['cr-hasoffer']}}</td>
                                    <td>{{item['cr-yeahmobi']}}</td>
                                    <td>{{item['diff']}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div class="btn-group" id="pager_foot"></div>
                    <div class="clearfix"></div>
                </div>
            </div>

        </div>
    </div>



</div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mixin_alert_msg from '@/mixins/alert_msg'
import mixin_modal from "@/mixins/modal"
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import Vue from 'vue'


export default {
  data(){
    return {
            sort:1,
            cr_list:[],
            loadingZone:''

        }
    },
  mixins: [mixin_alert_msg, mixin_modal],
  computed: {

  },
  components:{AlertPop},
  computed:{

  },
  watch:{
    sort(newVal, oldVal) {
        this.getCrMonitor()
    }
  },
  methods: {
    getCrMonitor(){
        this.loadingZone = "ajax_loading"

        Vue.http.get('Offer2/getCrMonitor',{params:{sort:this.sort}}).then(response => {
            let data  = response.body.data 
            this.loadingZone = ""
            this.cr_list = data && data.list || [] 
        }, response => {
            this.loadingZone = ""
        })
    }

  },
  created () {

  },
  mounted() {
    this.getCrMonitor()
  }
}
</script>