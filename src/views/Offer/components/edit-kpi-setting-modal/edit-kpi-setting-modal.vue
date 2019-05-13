<template>
<div>
    <modal 
      :dialogVisible.sync="outerVisible"
      :onConfirm="onConfirmBtn"
      :title="title"
      :onCancel="handleClose">
        <template slot="dialogBody">
            <form class="form-horizontal" ref="form">
                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI</label>
                    <div class="controls col-md-8 ">
                        <span>{{getTypeName(kpiItem.type)}}</span>
                    </div>
                </div>
                
                <div class="control-group form-group" v-if="eventParamRef.hasOwnProperty(kpiItem.type)">
                    <label class="control-label col-md-4">{{ eventParamRef[kpiItem.type] }}</label>
                    <div class="controls col-md-8 ">
                        <span>{{getTypeName(kpiItem.event_param)}}</span>
                        <!-- <input type="text" name="kpis[event_param]" required="" class="form-control col-md-4" :value="kpiItem.event_param" disabled> -->
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI Index</label>
                    <div class="controls col-md-8 ">
                        <input type="text" name="kpis[quality]" required="" class="form-control col-md-4" placeholder="kpi index (between 0 and 1)" pattern="^(?!0+(?:\.0+)?$)\d?\d(?:\.\d\d?)?$" :value="kpiItem.quality*10000/100"> %
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-4">KPI Weighting</label>
                    <div class="controls col-md-8 ">
                        <input type="text" name="kpis[wighting]" required="" :value="kpiItem.wighting" class="form-control col-md-4" placeholder="kpi weighting (between 0 and 1)" pattern="^(0(\.\d+)?|1(\.0+)?)$"> 
                    </div>
                </div>
            </form>
        </template>
    </modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

export default {
    data(){
        return {
            outerVisible:false,
            eventParamRef: {
                retention: 'Day'
            },
            title:''
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    props:{
        showAlert:{
            type:Function,
            required: true,
        },
        modalState:{
            type:[Boolean,String],
            required:true
        },
        kpiItem:{
            type:Object,
            required:true
        },
        onConfirm:{
            type:Function,
            required: true,
        },
        dialogName:{
            type: String,
            required: true,
        },
    },
    watch:{
        modalState (val) {
            this.outerVisible = this.modalState
        },
        kpiItem (val) {
            let _type = this.getTypeName(this.kpiItem.type)
            this.title = `Edit ${_type}`
        }
    },
    methods:{
        onConfirmBtn:function(){
            let $form = $(this.$refs.form)
            this.onConfirm({
                id:this.kpiItem.id,
                type: this.kpiItem.type,
                wighting: $form.find("[name='kpis[wighting]']").val(),
                quality: $form.find("[name='kpis[quality]']").val()*100 / 10000,
                event_name: this.kpiItem.event_name,
                event_param: this.kpiItem.event_param,
                is_monitor:this.kpiItem.is_monitor,
            })
        },
        getTypeName:function(key){
            let obj = {
                    'cr': 'CR',
                    'retention': 'Retention Rate',
                    'click_hijacking': "Click Injection",
                    'click_flood': "Click Flood"
                }
            return obj[key] || key;
        }
    }
}
</script>

<style scoped>
.overflow_scroll{
    width: 80%;
    margin-bottom: 50px;
}
</style>