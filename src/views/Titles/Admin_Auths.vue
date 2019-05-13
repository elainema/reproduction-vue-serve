<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li>Authorities</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Authorities</h2>
            <div class="box-action" v-box-action-full-small>
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="overflow_scroll">
            <table class="table table-hover tablesorter" id="title_list">
                <colgroup>
                    <col width="50" />
                    <col width="300" />
                    <col width="150" />
                    <col width="150" />
                    <col width="260" />
                    <col width="260" />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Module</th>
                        <th>Class</th>
                        <th>Method</th>
                        <th>Remark</th>
                    </tr>
                </thead>
                <tbody id="cp_list">
                    <tr v-for="i in renderData">
                        <td class="no-wrap">{{ i.id }}</td>
                        <td><router-link :to="'admin_manage_auth?id='+ i.id">{{ i.display_name }}</router-link></td>
                        <td>{{ i.module }}</td>
                        <td>{{ i.class_name }}</td>
                        <td>{{ i.method_name }}</td>
                        <td>{{ i.remark }}</td>
                    </tr>
                </tbody>
            </table>
            </div>

        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false,
            dataPage:{},
            renderData:[],
            page:1,
            q:'',
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
    },
    computed:{
    },
    components: {AlertPop},
    methods:{
        list_auths(){
            let that = this
            var search_query = $(that.$refs.qf_offer).getFormQuery();
            that.ajax_loading = true
            Vue.http.get('Authority/getAllList', {params:search_query}).then(response => {
                var o = response.body && response.body.data
                that.renderData = o.list
                that.dataPage = o.paginator
                that.ajax_loading = false
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        },
    },
    created() {
        let that = this
        that.list_auths()
    },
    mounted() {
        let that = this
    }

}
</script>