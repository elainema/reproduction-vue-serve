<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="'Change Offer ' + title"
        :confirmText="confirmText"
        :onConfirm="onConfirm"
        :onCancel="onCancel">
        <template slot="dialogBody">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <form class="form-horizontal">
                <div class="control-group form-group">
                    <label class="control-label col-md-5 label-title"> {{title}} </label>
                    <div class="col-md-5">
                        <input class="form-control " type="text" v-model="value">
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
</div>
</template>


<script>
import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
import alert_pop_http from '@/util/alert_pop'
import { effectiveTime2 } from '../../config/config'
const EffectiveTime = () => import(
/* webpackChunkName: "EffectiveTime" */ '../effective-time/'
);
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
const AlertPop = () => import(
/* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/index'
);


export default{
    data() {
        return {
            status:"0",
            method:"-1",
            visible:false,
            startDate:moment().format("YYYY-MM-DD"),
            confirmText:'',
            time:'00:00',
            timeClassList:'col-md-5',
            labelClassList:'control-label col-md-5',
            value: "",
            flag: false,
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
        }
    },
    mixins:[mixin_dialog],
    props: {
        outerVisible: {
          type: Boolean,
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
        title:{
          type: String,
          required: false,
        },
        arrSetTask:{
          type: Function,
          required: true
        },
    },
    components: {
        EffectiveTime,Modal,AlertPop
    },
    methods: {
        onCancel() {
            this.hideAlertPop();
            this.handleClose();
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        onConfirm() {
            this.arrSetTask(this.getParams(),this.flag)
            this.flag = false
        },
        getParams() {
            var flag = this.checkParams();
            if (flag) {
                var params = {
                    method: this.method.split('+')[0],
                }
                if (this.method == 'customized') {
                    params.run_time = this.startDate + ' ' + this.time
                }
                if (this.title == 'Payout') {
                    params['payout_per_conversion'] = this.value;
                } else {
                    params['revenue_per_conversion'] = this.value;
                }
                return params;
            }
        },
        checkParams () {
            var flag = false;
            var pattern = /^\d+(\.\d+)?$/;
            if (!pattern.test(this.value)) {
                alert_pop_http.setAlertPop(this, "show", "info", 'The value of ' + this.title + ' is illegal, Please check.')
                return false;
            } else {
                flag = true
            }
            this.flag = flag
            return flag
        }
    },
    watch: {
        outerVisible () {
            this.visible = this.outerVisible
        },
        title () {
            this.confirmText = this.title=='Payout' ? 'Confirm &amp; Send Email': 'Confirm'
        }
    },
    created() {
        this.effectiveTime2 = effectiveTime2()
    },
    mounted () {
    }
}
</script>