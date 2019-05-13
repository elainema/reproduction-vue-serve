<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :confirmText="confirmText"
        :onConfirm="submitForm"
        :closeOnClickModal="false"
        :onCancel="handleClose">
        <template slot="dialogBody">
             <form class="form-horizontal">
                <div class="control-group form-group">
                    <label class="control-label col-md-4 label-title">{{type==='payout' ? 'Payout':'Revenue'}}</label>
                    <div class="controls col-md-6" id="static_default_payout" v-if="!isDynamic || (isDynamic && type !=='payout')">
                        <input type="text" class="txt-value" v-model="offer_val" ref="offer_val">
                    </div>
                    <div class="controls col-md-6" id="dynamic_default_payout" v-if="isDynamic && type ==='payout'">
                        <div class="input-append">
                            <input class="form-control txt-value col-md-5" v-model="offer_val" name="payout_per_conversion" type="number" value="0" autofocus="autofocus"> <span class="add-on">% of dynamic revenue</span></div>
                    </div>
                </div>
                <effective-time 
                    :defaultEffectiveDate.sync="startDate" 
                    :method.sync="method" 
                    :data="effectiveTime2" 
                    :time.sync="time"
                    :timeClassList="timeClassList"
                    :labelClassList="labelClassList">
                </effective-time>
            </form>
        </template>
    </modal>

    <modal :dialogVisible.sync="winWndModalState" :dialogBody="modalBody" :title="'Warning'" :classList="classList" append-to-body></modal>
</div>
</template>

<script>

import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
import { effectiveTime2 } from '../../config/config'
const EffectiveTime = () => import(
/* webpackChunkName: "EffectiveTime" */ '../effective-time/'
);
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);


export default{
    data() {
        return {
            method:"-1",
            offer_val:"",
            winWndModalState:false,
            modalBody:'',
            visible:false,
            effectiveTime1:{},
            time:'00:00',
            classList:'red',
            startDate:moment().format("YYYY-MM-DD"),
            timeClassList:'controls col-md-6',
            labelClassList:'control-label col-md-4'
        }
    },
    mixins:[mixin_dialog],
    components: {
        EffectiveTime,Modal
    },
    computed: {
        confirmText () {
            return this.type=='payout' ? 'Confirm & Send Email' : 'Confirm';
        },
        title() {
            return this.type==='payout' ? 'Change Offer Payout':'Change Offer Revenue';
        }
    },
    watch: {
        val(){
            this.offer_val = this.val
        },
        outerVisible () {
            this.visible = this.outerVisible
        }
    },
    methods:{
        checkHideConv() {
            var aff_hide_con = "0%";
            var affs = $("#aff_info .hide_conv");
            $.each(affs, function(i, aff) {
                if ($(aff).text() != "Use Default" || $(aff).text() != "0%") {
                    aff_hide_con = $(aff).text();
                }
            })
            return aff_hide_con;
        },
        comparePayoutRevenue(type) {
            var compare_flag = false;
            var that = this
            var _payoutValue = that.default_payout - 0;
            var _revenueValue = that.default_revenue - 0;
            var _currencyType = that.currency
            var conversion_num = that.offer_hide_conv
            var is_dynamic = that.isDynamic
            var type = type.toLowerCase()
            if (parseFloat(conversion_num) == 0) { //无扣量，不允许payout大于revenue
                if (!is_dynamic) {
                    var _targetValue = that.offer_val - 0;
                    if (type == 'payout') {
                        if (_currencyType == "EUR(€)") {
                            if (_targetValue > _revenueValue * EUR_CURRENCY) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else if (_currencyType == "GBP(￡)") {
                            if (_targetValue > _revenueValue * GBP_CURRENCY) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else {
                            if (_targetValue > _revenueValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        }
                    } else {
                        if (_currencyType == "EUR(€)") {
                            if (_targetValue * EUR_CURRENCY < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else if (_currencyType == "GBP(￡)") {
                            if (_targetValue * GBP_CURRENCY < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        } else {
                            if (_targetValue < _payoutValue) {
                                compare_flag = true;
                            } else {
                                compare_flag = false;
                            }
                        }
                    }
                }
            } else { //有扣量，允许payout大于revenue
                compare_flag = true;
            }
            return compare_flag;
        },
        submitForm: function(){
            let that = this;
            var payout_per_conversion = that.default_payout - 0; //default payout
            var dynamic_revenue_value = that.offer_val; //payout
            var revenue_per_conversion = that.default_revenue - 0 ; //default revenue
            var confirmed = false
            var title = that.type
            var change_conversion = that.offer_hide_conv; //offer设定的扣量
            var pattern = /^\d+(\.\d+)?$/;
            var pattern2 = /^[1-9]\d*$/;
            var is_dynamic = that.isDynamic
            //校验输入格式
            if (is_dynamic && title =='payout') {
                if (!pattern.test(revenue_per_conversion) || !pattern2.test(dynamic_revenue_value)) {
                    that.showAlert('The value is illegal, Please check.', 'info')
                    return;
                }
                //不小于0
                if (this.offer_val <= 0) {
                    $(this.$refs.offer_val).focus();
                    that.showAlert('Price must be greater than 0%', 'info')
                    return false;
                }
                //不能大于default revenue
                if (dynamic_revenue_value / 100 * revenue_per_conversion > revenue_per_conversion && change_conversion == 0) {
                    that.winWndModalState = true
                    return false;
                }
            } else {
                if (!pattern.test(payout_per_conversion) || !pattern.test(revenue_per_conversion)) {
                    that.showAlert('The value is illegal, Please check.', 'info')
                    return;
                }
            }


            //compare payout and revenue
            if (!confirmed) {
                if (parseFloat(change_conversion) == 0) { //offer没有设定扣量
                    //当offer没有设定扣量，不论渠道是否有扣量设定，不允许offer的payout大于revenue
                    var tips = 'Offer payout is more than revenue';
                    that.modalBody = tips
                    if (that.comparePayoutRevenue(title)) {
                        that.winWndModalState = true
                        return
                    } else {
                        confirmed = true;
                    }
                } else {
                    confirmed = true;
                }
            }

            if (confirmed) {
                var value = this.offer_val
                if (!pattern.test(value)) {
                    that.showAlert('The value of ' + title + ' is illegal, Please check.', 'info');
                    return false;
                }
                let status = this.status,
                    method=this.method,
                    time=this.startDate + " " + this.time
                let opt = {id:this.$route.query.id,method:method}

                if (that.type == "payout") {
                    if(that.isDynamic) {
                        opt.dynamic_revenue_value = that.offer_val

                    }else{
                        opt.payout_per_conversion = that.offer_val
                    }
                } else {
                    opt.revenue_per_conversion = that.offer_val
                }

                if (method === 'customized') {
                    opt.run_time = time
                }
                Vue.http.post('Offer2/setTask', opt).then(response => {
                    that.showAlert(response.body.msg, "success");
                    let obj = {}
                    if(opt.payout_per_conversion) obj.payout_per_conversion = parseFloat(opt.payout_per_conversion).toFixed(3);
                    if(opt.dynamic_revenue_value) obj.dynamic_revenue_value = opt.dynamic_revenue_value
                    if(opt.revenue_per_conversion) {
                        obj.revenue_per_conversion = parseFloat(opt.revenue_per_conversion).toFixed(3);
                        if(method !== "-1"){
                            obj.alert_revenue = obj.revenue_per_conversion
                            obj.alert_revenue_time = that.method === 'customized' ? time : moment().add(method, 'hour').utcOffset("+00:00").format("YYYY-MM-DD HH:00:00")
                        } else {
                            obj.alert_revenue = "";
                            obj.alert_revenue_time = ""
                        }
                    }

                    that.$store.dispatch('setOfferInfo', obj)
                    that.$nextTick(function(){
                    })

                }, response => {
                    that.showAlert(response.body.msg);
                })
            }
            this.handleClose()
        }
    },
    props:{
        outerVisible: {
          type: [Boolean,String],
          required: true,
          default: false
        },
        dialogName: {
          type: String,
          required: true,
        },
        showAlert: {
          type: Function,
          required: true
        },
        type: {
          type: String,
          required: true,
          default: ''
        },
        val: {
          type: [Number, String],
          required: true,
          default: 0
        },
        isDynamic: {
          type: [Number, String],
          required: true,
          default: 0
        },
        default_payout: {
          type: [Number, String],
          required: true,
          default: ''
        },
        default_revenue: {
          type: [Number, String],
          required: true,
          default: ''
        },
        offer_hide_conv: {
          type: [Number, String],
          required: true,
          default: 0
        },
        currency: {
          type: [Number, String],
          required: true,
          default: ''
        },
    },
    created() {
        this.effectiveTime2 = effectiveTime2()
    },
}
</script>