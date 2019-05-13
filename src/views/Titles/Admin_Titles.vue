<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li>Titles</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Titles</h2>
            <div class="box-action" v-box-action-full-small>
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <div class="filter-form well" id="qf_offer">
                    <form class="form-inline" ref="qf_offer" @submit.stop.prevent="list_titles">
                        <input class="col-md-5 pull-left mr10" type="text" name="q" autocomplete="off" placeholder="Keywords of Titles" v-model="q" @keyup.enter="list_titles" />
                        <button type="submit" class="btn btn-primary">Search</button>
                        <input type="hidden" v-model="page" name="page">
                    </form>
                    <a href="admin_titles" class="btn btn-default">Reset</a>
                </div>
                <div class="overflow_scroll">
                <table class="table table-hover tablesorter" id="title_list">
                    <colgroup>
                        <col width="50" />
                        <col width="250" />
                        <col width="100" />
                        <col width="100" />
                        <col width="300" />
                        <col width="300" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Employees</th>
                            <th>Authorites</th>
                            <th>Description</th>
                            <th>Create Date</th>
                        </tr>
                    </thead>
                    <tbody id="cp_list">
                        <tr v-for="i in renderData">
                            <td class="no-wrap">{{ i.id }}</td>
                            <td><router-link :to="'admin_manage_title?id='+ i.id">{{ i.name }}</router-link></td>
                            <td>{{ i.employee_count }}</td>
                            <td>{{ i.authority_count }}</td>
                            <td>{{ i.remark }}</td>
                            <td>{{ i.create_time }}</td>
                        </tr>
                    </tbody>
                </table>
                </div>

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
        list_titles(){
            let that = this
            var search_query = $(that.$refs.qf_offer).getFormQuery();
            that.ajax_loading = true
            Vue.http.get('Role/getAllList', {params:search_query}).then(response => {
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
        that.list_titles()
    },
    mounted() {
        let that = this
        /*$(window).on('hashchange', function() {
            var query_obj = $.query.load(window.location.href).keys;
            if ( !_.isEmpty(query_obj)) {
                $.each(query_obj, function(i, n){
                    var val = (n === true) ? '' : n;
                    if(i != 'page'){
                        that[i] = val
                    }
                })
                that.list_titles();
            } else {
                that.$router.push('admin_titles');
            }
        })*/
    }

}
</script>
<style scoped>
    .well {
        min-height: 20px;
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 0;
    }
    .form-inline{
        display: inline;
    }
</style>