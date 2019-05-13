<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :confirmText="'Confirm &amp; Send Email'"
  :title="'Change Offer Payment'"
  :onConfirm="submitForm"
  :onCancel="onCancel">
  <template slot="dialogBody">
        <p class="red" v-if="isDynamicRevenue == 1">You have turned on "Dynamic Revenue". Please update the payout accordingly.</p>
        <p class="red" v-else>You have turned off "Dynamic Revenue". Please update the payout accordingly.</p>
        <form class="form-horizontal" ref="payment_dialog_form">
            <div class="control-group form-group" id="payout">
                <label class="control-label col-md-4">Payout</label>
                <div v-if="isDynamicRevenue == 1" class="controls" id="dynamic_payout">
                    <div class="input-append">
                        <input class="form-control col-md-5" name="dynamic_revenue_value" id="dynamic_revenue_value" type="number" min="0" value="" autofocus="autofocus" v-model="dynamic_revenue_value" ref="dynamic_revenue_value">
                        <span class="add-on">% of dynamic revenue</span>
                    </div>
                </div>
                <div v-else class="controls" id="static_payout">
                    <div class="input-append">
                        <input name="payout_per_conversion" class="form-control col-md-4" id="payout_per_conversion" type="text" value="" autofocus="autofocus" v-model="payout_per_conversion">
                    </div>
                </div>
            </div>
            <div class="control-group form-group" v-show="offer_type !== 'cps'">
                <label class="control-label col-md-4">Default Revenue</label>
                <div class="controls">
                    <input name="revenue_per_conversion" class="form-control col-md-5" id="revenue_per_conversion" maxlength="200" type="text" required="" v-model="revenue_per_conversion">
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-4">Effective Time (in GMT)</label>
                <div class="controls">
                    <select name="method"  class="form-control col-md-5" >
                        <option value="-1">Now</option>
                    </select>
                </div>
            </div>
        </form>
  </template>
</modal>
</template>

<script>
import { mapGetters } from 'vuex'
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');
export default {
    data(){
        return {
            dynamic_revenue_value:'',
            payout_per_conversion:'',
            outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    computed: {
        ...mapGetters({
          offerInfo:"offerInfo"
        }),
         revenue_per_conversion: {
            get (){
                return this.offerInfo.revenue_per_conversion
            },
            set (val){}
         },
    },
    props:{
        dialogName:{
            type: String,
            required: true,
        },
        payoutModal:{
            type:[Boolean,String],
            required:true
        },
        dynamicRevenueSetTask:{
            type:Function,
            required:true
        },
        isDynamicRevenue:{
            type:[Boolean,Number],
            required:true
        },
        editCancel:{
            type:Function,
            required:true
        },
        offer_type: {
            type: String,
            required: true,
        },
        offer_hide_conv:{
            type: Object,
            required: true,
        },
        showAlert:{
            type: Function,
            required: true,
        },
    },
    watch:{
        payoutModal () {
            this.outerVisible = this.payoutModal
        }
    },
    methods:{
        submitForm() {
            let that = this
            var pattern2 = /^[1-9]\d*$/;
            var pattern = /^\d+(\.\d+)?$/;
            var payout_per_conversion = that.payout_per_conversion
            var revenue_per_conversion= that.revenue_per_conversion
            if(_.isEmpty(that.offer_hide_conv) && that.dynamic_revenue_value) {
                //校验输入格式
                if (!pattern2.test(that.dynamic_revenue_value)) {
                    that.showAlert('The value is illegal, Please check.', 'info');
                    return;
                }
                //不小于0
                if (that.dynamic_revenue_value <= 0) {
                    $(that.$refs.dynamic_revenue_value).focus();
                     that.showAlert('Price must be greater than 0%', 'info');
                    return;
                }
                if (parseInt(that.dynamic_revenue_value ) > 100) {
                    that.showAlert("Can not larger than 100%", 'error', 'error')
                    return;
                }
            }
            if (!that.dynamic_revenue_value || !_.isEmpty(that.offer_hide_conv)) {
                if (!pattern.test(payout_per_conversion) || !pattern.test(revenue_per_conversion)) {
                    that.showAlert('The value is illegal, Please check.', 'info');
                    return;
                }
            }
            that.dynamicRevenueSetTask(that.getParams())
            that.handleClose()
        },
        getParams() {
            return  $(this.$refs.payment_dialog_form).getFormQuery()
        },
        onCancel:function(){
            this.handleClose()
            this.editCancel()
        }
    }
}
</script>