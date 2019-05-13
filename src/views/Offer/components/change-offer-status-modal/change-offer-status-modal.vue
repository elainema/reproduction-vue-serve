<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :confirmText="confirmText"
        :onConfirm="submitForm"
        :disabled="disabled"
        :onCancel="handleClose">
        <template slot="dialogBody">
            <p style="display:none;text-align:left;padding-left:25px" class="red"><span id="affs_count"></span> affiliates have traffic on this offer</p>
            <form class="form-horizontal">
                <div class="control-group form-group">
                    <label class="control-label col-md-4">Status</label>
                    <div class="controls col-md-8">
                        <select name="status" v-model="status">
                            <option value="0" selected="">- Status -</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="paused">Paused</option>
                            <option value="deleted">Deleted</option>
                        </select>
                    </div>
                </div>

                <effective-time 
                    :defaultEffectiveDate.sync="startDate" 
                    :method.sync="method" 
                    :data="effectiveTime1" 
                    :time.sync="time"
                    :timeClassList="timeClassList">
                </effective-time>
            </form>
        </template>
    </modal>
</div>
</template>


<script>

import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
const EffectiveTime = () => import(
/* webpackChunkName: "EffectiveTime" */ '../effective-time/'
);
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
import { effectiveTime1 } from '../../config/config'

export default{
    data() {
        return {
            title:'Change Offer Status',
            status:"0",
            method:"now+",
            visible:false,
            startDate:moment().format("YYYY-MM-DD"),
            confirmText:'Confirm &amp; Send Email',
            time:'00:00',
            disabled:true,
            timeClassList:'controls col-md-8',
            pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000) ;
                },
              }
            }
    },
    mixins:[mixin_dialog],
    props: {
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
        param_id:{
          type: String,
          required: false,
          default:'id'
        },
        onSuccess:{
          type: Function,
          required: false
        },
        selected_id:{
          type: String,
          required: false,
        }
    },
    components: {
        EffectiveTime,Modal
    },
    methods: {
        submitForm: function(){
            let that = this;
            console.log(this.status, this.method, $('.datetimePicker input', this.$refs.modal).val(),$('.time', this.$refs.modal).val() )
            let status = this.status,
                method=this.method,
                run_time="",
                _status="",
                _alert_status="", 
                _alert_status_time="",
                time=this.startDate+ " " + this.time
            if(this.method !== "custom"){
                method = this.method.split("+")[0]
                run_time = this.method.split("+")[1]
            }else{
                run_time = time
            }

            if(this.method === "now+") {
                _status = status;

            }else{
                _alert_status = status;
                _alert_status_time = this.method === 'custom' ? time : moment().add(run_time, 'hour').utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss")
            }
            var ids = this.selected_id || this.$route.query.id
            var opts = {status:status, method:method, run_time: run_time}
            opts[this.param_id] = ids
            Vue.http.post('Offer2/setStatus', opts).then(response => {
                that.showAlert(response.body.msg, "success");
                let obj = {}
                if(_status) obj.status = _status;
                obj.alert_status = _alert_status
                obj.alert_status_time = _alert_status_time
                that.$store.dispatch('setOfferInfo', obj)
                that.onSuccess && that.onSuccess()
                that.$nextTick(function(){
                    $("alert_status_time").text()
                })
            }, response => {
                that.showAlert(response.body.msg);
            })
            this.handleClose()
        }
    },
    watch: {
        outerVisible () {
            this.visible = this.outerVisible
        },
        status() {
            this.disabled = this.status === '0' ? true: false;
        },
    },
    created() {
        this.effectiveTime1 = effectiveTime1()
    },
    mounted () {
    }
}
</script>