<template>
<div>
    <modal 
      :dialogVisible.sync="outerVisible"
      :onConfirm="onConfirm"
      :disabled="disabledBtn"
      :title="title"
      :onCancel="handleClose">
      <template slot="dialogBody">
         <form class="form-horizontal form-report" ref="form">
            <div class="control-group form-group">
                <div class="col-md-6">
                    <select2Aff :select2_mode="'simple'" :showSelectAll="false" :aff_name="'publisher_ids'" :select2_class="' nopadding col-xs-12'" :classList="classList1" ref="publisher_ids" :select2CallBack="select2CallBack"></select2Aff>
                </div>
                <div class="col-md-6">
                    <div class="new-group row">
                        <label class="control-label col-md-6">Caps:</label>
                        <div class="controls col-md-6">
                            <div class="input-append">
                                <select :name="is_caps != '' ? 'is_caps': ''" v-model="is_caps" @change="onChangeCaps">
                                    <option value="">Empty</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="new-group row">
                        <label class="control-label col-md-6">Daily Conversion</label>
                        <div class="controls col-md-6">
                            <div class="input-append">
                                <input type="number" class="txt-value" :name="daily_conversions ? 'daily_conversions' : ''" v-model="daily_conversions">
                            </div>
                        </div>
                    </div>
                    <div class="new-group row">
                        <label class="control-label col-md-6">Monthly Conversion</label>
                        <div class="controls col-md-6">
                            <div class="input-append">
                                <input type="number" class="txt-value" :name="monthly_conversions ? 'monthly_conversions' : ''" v-model.trim="monthly_conversions">
                            </div>
                        </div>
                    </div>
                    <div class="new-group row">
                        <label class="control-label col-md-6">Hide</label>
                        <div class="controls col-md-6">
                            <div class="input-append">
                                <input type="number" class="txt-value" :name="hide_conv ? 'hide_conv' : ''" v-model.trim="hide_conv">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" name="offer_ids" :value="selected_id && selected_id.join(',')">
            <input type="hidden" name="confirm" value="1" v-if="confirm">
        </form>
      </template>
    </modal>

    <modal
        :dialogVisible.sync="secondConfirmModalState"
        :onConfirm="setConfirm" 
        :title="editable_modal_title"
        :classList="classList"
        :onCancel="hideConfirmModal">
        <template slot="dialogBody">
            <div class="overflow_scroll" id="aff_payment_container">
                <table class="table tablesorter defaultTable" style="color: #333;">
                    <colgroup>
                        <col width="150" />
                        <col width="140" />
                        <col width="" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>Offer ID</th>
                            <th>Affiliate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="">
                        <tr v-for="i in no_authorize_data">
                            <td>{{ i.offer_id }}</td>
                            <td>{{ i.publisher_id }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </template>
    </modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

const Select2Aff = () => import(
/* webpackChunkName: "Select2Aff" */ '@/components/Select2Aff.vue'
);
export default {
    data(){
        return {
            title:'Batch Affiliate Caps',
            outerVisible:false,
            secondConfirmModalState:'hide',
            daily_conversions:'',
            monthly_conversions:'',
            hide_conv:'',
            confirm:false,
            editable_modal_title:'Unauthorized affiliate,please authorize again after operation',
            no_authorize_data:[],
            classList:'red',
            classList1:'filter-affiliate_id chosen-filter nopadding',
            is_use_advanced_pixel:'1',
            init:'',
            is_caps:'',
            disabledBtn:true,
            publisher_id:'',
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,Select2Aff
    },
    props:{
        selected_id:{
            type: Array,
            required: true,
            default: ''
        },
        showAlert:{
            type:Function,
            required: true,
        },
        renderOffer:{
            type:[Boolean,String],
            required:true
        },
        modalState:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
    },
    watch:{
        monthly_conversions(newVal, oldVal) {
            this.setBtnDisable()
        },
        daily_conversions (newVal, oldVal) {
            this.setBtnDisable()
        },
        modalState () {
            this.outerVisible = this.modalState
        }
    },
    methods:{
        setBtnDisable() {
            var publisher_id = this.publisher_id
            var is_caps = this.is_caps
            var monthly_conversions = this.monthly_conversions
            var daily_conversions = this.daily_conversions
            if (publisher_id.length == 0 || (publisher_id.length > 0 && is_caps == 1) && !(monthly_conversions || daily_conversions)) {
               this.disabledBtn = true
            } else {
                this.disabledBtn = false
            }
        },
        onChangeCaps(e) {
            var val = e.target.value
            this.is_caps = val
            this.setBtnDisable()
        },
        setConfirm(){
            this.confirm = true
            this.hideConfirmModal()
        },
        hideConfirmModal() {
            this.secondConfirmModalState = 'hide'
        },
        setInit() {
            this.daily_conversions = ''
            this.monthly_conversions = ''
            this.hide_conv = ''
            this.is_caps = ''
            this.disabledBtn = true
            this.publisher_id = ''
            $(".select2-container").filter(":visible").select2('val', '')
        },
        select2CallBack(val) {
            this.publisher_id = val;
            this.setBtnDisable()
        },
        validator(){
            var that = this
            var p = new promise.Promise();
            var daily_conversions = that.daily_conversions
            var monthly_conversions = this.monthly_conversions
            var is_caps = that.is_caps
            var publisher_id = this.publisher_id
            if(monthly_conversions && monthly_conversions <= 0) {
                that.showAlert("The Monthly Conversion must be more than 0, please check!", 'info')
            } else if (daily_conversions && daily_conversions <= 0) {
                that.showAlert("The Daily Conversion must be more than 0, please check!", 'info')
            } else if (is_caps == '' && (monthly_conversions || daily_conversions)) {
                that.showAlert("The caps must be Yes, please check!", 'info')
            } else if (publisher_id == '') {
                that.showAlert("Please select at least one publisher!", 'info')
            } else {
                p.done(null, "");
            }
            return p;
        },
        onConfirm() {
            let that = this
            var query = $(this.$refs.form).getFormQuery();
            var p = that.validator();
            p.then(function(error, result) {
                that.$http.post('Offer2/batchEditPublisherOfferAccessInfo', query).then(response => {
                    var data = response && response.body
                    if (data.data && data.data.no_authorize) {
                        that.no_authorize_data = data.data.no_authorize
                        that.$nextTick(function() {
                            that.secondConfirmModalState = "show"
                        })
                        return
                    }
                    if (data.flag == 'success' && !(data.data && data.data.no_authorize)) {
                        that.setInit()
                        that.onSuccess && that.onSuccess();
                        that.showAlert(response.body.msg, 'success')
                        that.handleClose()
                    }
                }, response => {
                    that.loadingZone = ""
                    // error callback
                    that.showAlert(response.body.msg)
                })
            })
            that.confirm = false
        },
    }
}
</script>

<style scoped>
.new-group{
    margin-bottom: 20px;
}
</style>