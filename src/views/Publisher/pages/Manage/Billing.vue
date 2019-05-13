<template>
    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Billing<help-box :content="helpTips"></help-box></h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="tab-pane" id="billing_tab">
                    <form class="form-horizontal" action="" method="post" id="ac_billing">
                        <fieldset>
                            <div class="control-group form-group">
                                <label class="control-label col-md-4" for="pay_to">Pay To
                                    <span class="red">*</span>
                                </label>
                                <div class=" col-md-8">
                                    <editable_text_publisher  :editable_id="'pay_to'" :showAlert="showAlert"  :publisher_name="'profile[pay_to]'" :publisher_val="paymentInfo.pay_to" :renderPublisher="renderPublisher"></editable_text_publisher>

                                </div>
                            </div>
                            <div class="control-group form-group">
                                <label class="control-label col-md-4" for="pay_to">Pay Fee
                                </label>
                                <div class=" col-md-8">
                                    <common-switch
                                        :showAlert='showAlert'
                                        :default_val="paymentInfo.is_pay_fee"
                                        :switch_param='"is_pay_fee"'
                                        :render="renderPublisher"
                                        :switchDefaultAPI="'Payment/amSetInvoicePayFee'"
                                    />
                                </div>
                            </div>

                            <div class="control-group form-group">
                                <label class="control-label col-md-4" for="invoice_frequence">Invoice Frequency</label>
                                <div class=" col-md-8">
                                    <!-- <editable_select2_publisher :id="'payment_frequency'" :showAlert="showAlert" :source="sourceFrequency" :publisher_name="'payment_frequency'" :publisher_val="paymentInfo.payment_frequency"  :editable_api="'Payment/amSetInvoiceFrequency'" :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                                    <editable-select2-publisher
                                        :id="'payment_frequency'" 
                                        :showAlert="showAlert" 
                                        :source="sourceFrequency" 
                                        :publisher_name="'payment_frequency'" 
                                        :publisher_val="paymentInfo.payment_frequency"  
                                        :editable_api="'Payment/amSetInvoiceFrequency'" 
                                        :renderPublisher="renderPublisher">
                                    </editable-select2-publisher>
                                </div>
                            </div>

                            <div class="control-group form-group">
                                <label class="control-label col-md-4" for="payment">Payment Method</label>
                                <div class=" col-md-8">
                                    <span  class="col-md-3 text" name="payment_method" id="payment"> {{paymentInfo.payment_method}}</span>
                                </div>
                            </div>
                            <div id="payment_box" v-show="paymentInfo.payment_method">
                                <div id="mtd_wire" v-show="paymentInfo.payment_method==='wire'">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="account_name">Account Name</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="account_name"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="bank_name">Bank Name</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="bank_name"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="wire_address">Bank Address</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="wire_address"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="wire_city">Bank City</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="wire_city"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="state_province_region">Bank State/Province/Region</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="state_province_region"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="bank_country">Bank Country</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="bank_country"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="account_number">Recipient Account Number/IBAN</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="account_number"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="swift_code">Swift code</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="swift_code"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="wire_detail">Other Details</label>
                                        <div class=" col-md-8">
                                        <span class="text col-md-10" id="wire_detail"></span>
                                        </div>
                                    </div>
                                </div>
                                <div id="mtd_paypal"  v-if="paymentInfo.payment_method==='paypal'">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="email">Paypal Email</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="">{{paymentInfo.payment_detail.email | safeStr}}</span>
                                        </div>
                                    </div>
                                </div>
                                <div id="mtd_alipay"  v-show="paymentInfo.payment_method==='alipay'">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="email">Alipay Account</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="email"></span>
                                        </div>
                                    </div>
                                </div>
                                <div id="mtd_bank"  v-show="paymentInfo.payment_method==='bank'">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="bank_name">Bank Name</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="bank_name"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="account_name">Account Name</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="account_name"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="opening_bank">Bank Branch</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="opening_bank"></span>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-4" for="account_num">Account Number</label>
                                        <div class=" col-md-8">
                                            <span class="text col-md-10" id="account_num"></span>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </fieldset>
                        <div class="form-actions" id="div_prove" v-if="paymentInfo.status == 'pending'">
                            <span>Affiliate apply for modify the pay method, whether confirm?</span>
                            <button type="button" class="btn btn-primary" id="prove" @click="prove">Approve</button>
                            <button type="button" class="btn btn-primary" id="unprove" @click="unprove">Unapprove</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- <reason_modal :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></reason_modal> -->
        <unprove-reason-modal
            :modalState.sync="modalState" 
            :onConfirm="onConfirm"
            :dialogName="'modalState'"
        ></unprove-reason-modal>
    </div>
</template>
<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"

import publisherAPI from '@/api/publisher'
//import editable_select2_publisher from '@/components/Editable_Select2_Publisher.vue'
const EditableSelect2Publisher = () => import(
/* webpackChunkName: "EditableSelect2Publisher" */ '../../components/editable-select2-publisher/'
);
import editable_text_publisher from '@/components/Editable_Text_Publisher.vue'
import CommonSwitch from '@/components/common/common-switch/'
//import reason_modal from '@/components/Reason_Modal.vue'
import HelpBox from '@/components/common/help-box/'

//import eventProxy from '@/assets/js/eventproxy'
import commonDataAPI from '@/api/commonData'
const UnproveReasonModal = () => import(
/* webpackChunkName: "UnproveReasonModal" */ '../../components/unprove-reason-modal/'
);


//let ep = new eventProxy()
let EventProxy = require('eventproxy');
let ep = new EventProxy()
export default {
    data(){
        return {
                paymentInfo:{},
                renderPublisher:false,
                sourceFrequency:[
                            {value: 'weekly', text: 'Weekly'},
                            {value: 'fortnightly', text: 'Fortnightly'},
                            {value: 'monthly', text: 'Monthly'}
                        ],
                helpTips: "Here to modify the payment info for this publisher.</br>NOTICE:  1.Payment info in publisher system and manage system will be synchronized to each other’s system in the wee hours of the next day.</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2. If affiliate modified payment info in publisher system, it will be unavailable to create bill for the updated payment info is synced up to manage system."
            }
    },
    filters:{
        safeStr (str) {
            return str.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        }
    },
    computed: {
    },
    mixins: [mixin_modal],
    components:{EditableSelect2Publisher, editable_text_publisher, UnproveReasonModal,HelpBox,CommonSwitch},
    methods: {
        prove(){
            if(_.isEmpty($("#payment_frequency").editable('getValue').payment_frequency)){
                this.showAlert('Please Select Invoice Frequency')
                return false;
            }
            if(_.isEmpty($("#pay_to").editable('getValue')['profile[pay_to]'])){
                this.showAlert('Pay To can not be empty')
                return false;
            }

            let that = this
            publisherAPI.provePayment({id:this.$route.query.id},function(data){
                that.paymentInfo.status = "prove"
            })

        },
        unprove(){
            this.modalState = "show"
        },
        onConfirm(val){
            Vue.http.post("/Payment/unprovePayment", {id:this.$route.query.id, account_problems:val}).then(response => {
                this.showAlert("success","success");
                this.paymentInfo.status = "prove"
            }, response => {
                this.showAlert(response.body.msg);
            })
            this.hideModal()
        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        let that = this
        publisherAPI.getPaymentInfoById({id:this.$route.query.id},function(data){
            that.paymentInfo = data.data
            that.renderPublisher = true
            if(that.paymentInfo.payment_detail) {
                $.each(that.paymentInfo.payment_detail, function(i, n){
                    $('#'+ i, '#payment_box').html(n);
                })
            }


        })


    }
}
</script>