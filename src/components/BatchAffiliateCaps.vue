<template>
<div id="confirm_dialog" class="modal  fade" ref="confirm_dialog">
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3>Batch Affiliate Caps</h3>
            </div>
            <div class="modal-body">
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
                                        <!--<switch_offer :name='"is_caps"' :switchCallBack="switchCallBack" :offer_val="1"></switch_offer> -->
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
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary " @click.prevent="onConfirm" :disabled="disabledBtn">Confirm</button>
                <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
            </div>
        </div>
    </div>
    <div class="hidden" ref="no_authorize_table">
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
    </div>

    <confirmModal :modalState="secondConfirmModalState" :hideModal="hideConfirmModal" :onConfirm="setConfirm" :editable_modal_title="editable_modal_title" :editable_modal_body="editable_modal_body" :classList="classList"></confirmModal>
</div>
</template>
<script>
const select2Aff = () => import(
/* webpackChunkName: "select2Aff" */ './Select2Aff.vue'
);

/*const confirmModal = () => import(
 webpackChunkName: "confirmWnd"  './ConfirmModal.vue'
);
*/
import confirmModal from './ConfirmModal.vue'
export default {
  data(){
    return {
        secondConfirmModalState:'hide',
        daily_conversions:'',
        monthly_conversions:'',
        hide_conv:'',
        confirm:false,
        editable_modal_title:'Unauthorized affiliate,please authorize again after operation',
        editable_modal_body:'',
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
  watch:{
    modalState: function (val) {
      this.toggleModal(val)
    },
    monthly_conversions(newVal, oldVal) {
        this.setBtnDisable()
    },
    daily_conversions (newVal, oldVal) {
        this.setBtnDisable()
    },
  },
  props: {
    modalState:{},
    hideModal:{},
    selected_id:{},
    showAlert:{},
    renderOffer:{},
    onSubmitAction:{},
    onSuccess:{},
  },
  components:{select2Aff,confirmModal},
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.confirm_dialog).modal(msg)
    },
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
        this.$nextTick(function() {
            this.onConfirm()
        })
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
                        that.editable_modal_body = $(that.$refs.no_authorize_table).html();
                        that.secondConfirmModalState = "show"
                    })
                    return
                }
                if (data.flag == 'success' && !(data.data && data.data.no_authorize)) {
                    that.setInit()
                    that.onSuccess && that.onSuccess();
                    that.showAlert(response.body.msg, 'success')
                    that.hideModal();
                }
            }, response => {
                that.loadingZone = ""
                // error callback
                that.showAlert(response.body.msg)
            })
        })
        that.confirm = false
    },
  },
  mounted () {
  }
}
</script>
<style scoped>
.new-group{
    margin-bottom: 20px;
}
</style>