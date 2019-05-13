<template>
<div :class="ajax_loading ? 'ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li><router-link to="p_offer_category">Categories</router-link></li>
            <li class="active">Manage Category</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="box">
        <div class="box-header">
            <h2>Manage Category</h2>
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
            <form class="form-horizontal frm-entity" action="" method="post" ref="cc_dd" id="cc_dd"  @submit.stop.prevent="submitForm">
                <div class="box-content">
                    <div class="control-group">
                        <label class="control-label" for="name">Category</label>
                        <div class="controls">
                            <input class="col-md-6" name="name" id="name" maxlength="200" type="text" required v-model="name" />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="remark">Remark</label>
                        <div class="controls">
                            <textarea id="remark" name="remark" rows="5" class="col-md-6" v-model="remark"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn">Cancel</button>
                    <input v-model="cat_id" type="hidden" name="id" id="cat_id" />
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
            renderData:[],
            name:'',
            remark:'',
            cat_id: this.$route.query.id,
        }
    },
    components: {AlertPop},
    mixins: [mixin_alert_msg],
    methods:{
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        getCatInfo() {
            let that = this
            let id = that.cat_id
            that.ajax_loading = true
            Vue.http.get('Category/getById?id=' + id).then(response => {
                var data = response && response.body && response.body.data
                that.name = data.name
                that.remark = data.remark
                that.ajax_loading = false
            }, response => {
                that.showAlert(response && response.data && response.data.msg)
                that.ajax_loading = false
            })
        },
        submitForm() {
            let that = this
            that.ajax_loading = true
            var param = $(that.$refs.cc_dd).getFormQuery()
            Vue.http.post('Category/edit', param).then(response => {
                that.showAlert('success','success')
                that.ajax_loading = false
            }, response => {
                that.showAlert(response && response.data && response.data.msg)
                that.ajax_loading = false
            })
        }
    },
    created() {
        this.getCatInfo()
    },

}
</script>