<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li>Create Authority</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal frm-entity" action="" method="post" id="cc_add" ref="cc_add" @submit.stop.prevent="submitForm">
                <div class="box-content">
                    <div class="control-group">
                        <label class="control-label col-md-2" for="display_name">Name</label>
                        <div class="controls">
                            <input v-model="display_name" class="col-md-3 form-control" name="display_name" id="display_name" maxlength="200" type="text" autocomplete="off" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="module">Module</label>
                        <div class="controls">
                            <input v-model="module" class="col-md-3 form-control " name="module" id="module" maxlength="200" type="text" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="class_name">Class</label>
                        <div class="controls">
                            <input v-model="class_name" class="col-md-3 form-control " name="class_name" id="class_name" maxlength="200" type="text" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="method_name">Method</label>
                        <div class="controls">
                            <input v-model="method_name" class="col-md-3 form-control " name="method_name" id="method_name" maxlength="200" type="text" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="remark">Remark</label>
                        <div class="controls">
                            <textarea v-model="remark" rows="3" class="col-md-5" name="remark" id="remark"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-actions col-md-offset-2">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-default">Cancel</button>
                    <input v-if="id" id="auth_id" name="id" type="hidden" v-model="id"/>
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
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false,
            id:this.$route.query.id,
            display_name:'',
            class_name:'',
            method_name:'',
            module:'',
            remark:'',
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
    },
    computed:{
    },
    components: {AlertPop},
    methods:{
        submitForm(){
            let that = this
            var search_query = $(that.$refs.cc_add).getFormQuery();
            that.ajax_loading = true
            Vue.http.get('Authority/create', {params:search_query}).then(response => {
                var id = response.body.data && response.body.data.id
                that.$router.push('admin_manage_auth?id=' + id);
                that.ajax_loading = false
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        },
        getById(){
            let that = this
            that.ajax_loading = true
            Vue.http.get('Authority/getById', {params:{id: that.id}}).then(response => {
                var data = response && response.body && response.body.data
                _.forEach(data, function(n, key) {
                      that[key] = n
                });
                that.ajax_loading = false
            }, response => {
                that.showAlert(response.body.msg, 'info')
                that.ajax_loading = false
            })
        },
    },
    created() {
        if(this.id) {
            this.getById()
        }
    },
    mounted() {
    }

}
</script>