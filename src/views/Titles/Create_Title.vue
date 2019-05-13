<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Create Title</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Create Title</h2>
            <div class="box-action">
                <span class="icon-chevron-up" title="Fold"></span>
                <span class="icon-chevron-down hide" title="Unfold"></span>
            </div>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal frm-entity" action="" method="post" id="cc_add"  ref="cc_add" @submit.stop.prevent="submitForm">
                <div class="box-sub-header">
                    <h3>Title</h3>
                </div>
                <div class="box-content">
                    <div class="control-group">
                        <label class="control-label col-md-2" for="name">Name</label>
                        <div class="controls">
                            <input type="text" class="col-md-3" name="name" id="name" required v-model="name" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="remark">Description</label>
                        <div class="controls">
                            <textarea name="remark" id="remark" class="col-md-5" rows="5" v-model="remark"></textarea>
                        </div>
                    </div>
                </div>
                <div class="box-sub-header">
                    <h3>Title Can</h3>
                </div>
                <div class="box-content">
                    <div class="accordion" id="auths_list">
                        <div class="accordion-group" v-for="(val, key) in renderData">
                            <div class="accordion-heading">
                                <a class="accordion-toggle" data-parent="#auths_list" data-toggle="collapse" :href="'#' + md5Id(key)"  aria-multiselectable="true">{{key}}</a>
                            </div>
                            <div class="accordion-body collapse overflow_scroll" :id="md5Id(key)" aria-expanded="true">
                                <div class="accordion-inner">
                                    <table class="table table-hover tablesorter list-table">
                                        <colgroup>
                                            <col width="25">
                                            <col width="300">
                                            <col>
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th><input type="checkbox" @click.stop="cickedOnThead"></th>
                                                <th>Authority</th>
                                                <th>Remark</th>
                                            </tr>
                                        </thead>
                                        <tbody class="tbody">
                                            <tr v-for="node in val" @click="cickedOnTr">
                                                <td><input type="checkbox" :value="node.id" name="authority_ids[]" class="check-box" @click.stop="cickedOnTbody" /></td>
                                                <td>{{ node.id }} - {{ node.class_name}} /  {{ node.method_name }}</td>
                                                <td>{{ node.remark }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-default">Cancel</button>
                    <input v-if="id" id="role_id" name="id" type="hidden" v-model="role_id" />
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import pagination from '@/components/Pagination.vue'
/*import eventProxy from '@/assets/js/eventproxy'

let ep = new eventProxy()*/

let EventProxy = require('eventproxy');
let ep = new EventProxy()
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false,
            dataPage:{},
            renderData:[],
            id:this.$route.query.id,
            role_id:'',
            remark:'',
            name:'',
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
    },
    computed:{
    },
    components: {AlertPop},
    methods:{
        submitForm() {
            let that = this
            that.ajax_loading = true
            let query = $(that.$refs.cc_add).getFormQuery();
            var api = that.id ? 'Role/edit': 'Role/create'
            Vue.http.post(api, query).then(response => {
                that.showAlert(response.body.msg,response.body.flag);
                if(!that.id) {
                    that.$router.push('admin_create_title?id=' + response.body.data && response.body.data.id);
                }
                that.ajax_loading = false
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        },
        cickedOnThead(e) {
            var tbody = $(e.target).parents('table').find('.tbody');
            var do_check = true;
            if( ! $(e.target).prop('checked'))
                do_check = false;
            tbody.find('input[type=checkbox]').prop('checked', do_check);
        },
        cickedOnTr(e) {
            $(e.target).find('input[type=checkbox]').trigger('click');
        },
        cickedOnTbody(e) {
            var checked = $(e.target).prop('checked');
            var thead = $(e.target).parents('table').find('thead');
            if (checked) {
                var tbody = $(e.target).parents('table').find('.tbody');
                var chk = tbody.find('input[type=checkbox]');
                chk.each(function(i, n){
                    if ( ! $(n).prop('checked')) {
                        checked = false;
                        return false;
                    }
                })
            }
            thead.find('input[type=checkbox]').prop('checked', checked);
        },
        md5Id(id) {
            return md5(id)
        },
        list_auths() {
            let that = this
            that.ajax_loading = true
            Vue.http.get('Authority/getAllList').then(response => {
                var data = response.body && response.body.data && response.body.data
                var data_count = data && data.list && data.list.length
                var auths = {};
                for(var i = 0; i < data_count; i++){
                    if( !auths[data.list[i].module]){
                        auths[data.list[i].module] = [];
                    }
                    auths[data.list[i].module].push(data.list[i]);
                }
                if(data){
                    that.renderData = auths
                    that.dataPage = data && data.paginator
                }
                that.ajax_loading = false
                ep.emit("list_ready");
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        },
        getById() {
            let that = this
            Vue.http.get('Role/getById', {params:{id: that.id}}).then(response => {
                var o = response.body && response.body.data
                that.role_id = o.id;
                $.each(o, function(i, n){
                    if(i == 'name'){
                        that.name = n
                    }else if(i == 'remark'){
                        that.remark = n
                    }else if(i == 'authoritys'){
                        $.each(n, function(auth_i,auth_id){
                            var checkbox = $('#auths_list').find('input[type=checkbox][value='+ auth_id +']');
                            checkbox.attr('checked', 'checked');
                            checkbox.parents('tr').addClass('active');
                        })
                    }
                })
                that.ajax_loading = false
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        }
    },
    created() {
        let that = this
        that.list_auths()
        if(that.id) {
            ep.all("list_ready", function(){
                that.getById()
            })

        }
    },
    mounted() {
    }

}
</script>