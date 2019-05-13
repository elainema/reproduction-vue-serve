<template>
<div :class="ajax_loading ? ' ajax_loading' : ''">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li><router-link to="p_offer_category">Categories</router-link></li>
            <li class="active">Create Category</li>
        </ul>
    </div>
    <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
    <div class="box">
        <div class="box-header">
            <h2>Create Category</h2>
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
            <form class="form-horizontal frm-entity" action="" method="post" id="cc_add"  ref="cc_dd" @submit.stop.prevent="submitForm">
                <div class="box-content">
                    <div class="control-group">
                        <label class="control-label col-md-2" for="name">Category</label>
                        <div class="controls">
                            <input class="col-md-6" name="name" id="name" maxlength="200" type="text" required />
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label col-md-2" for="remark">Remark</label>
                        <div class="controls">
                            <textarea id="remark" name="remark" rows="5" class="col-md-6"></textarea>
                        </div>
                    </div>
                </div>
                <div class="form-actions col-md-offset-2">
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <button type="reset" class="btn btn-default">Cancel</button>
                </div>
            </form>
        </div>
    </div>
 </div>


</template>

<script>
import Vue from "vue"
import mixin_alert_msg from '@/mixins/alert_msg'
export default {
    data() {
        return {
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            ajax_loading:false
        }
    },
    mixins: [mixin_alert_msg],
    methods:{
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        submitForm() {
            let that = this
            that.ajax_loading = true
            var param = $(that.$refs.cc_dd).getFormQuery()
            Vue.http.post('Category/create', param).then(response => {
                var id = response && response.body && response.body.data && response.body.data.id
                setTimeout(function(){
                    that.$router.push('p_manage_category?id=' + id);
                },100)

                that.ajax_loading = false
            }, response => {
                that.showAlert(response && response.data && response.data.msg)
                that.ajax_loading = false
            })
        }
    }

}
</script>