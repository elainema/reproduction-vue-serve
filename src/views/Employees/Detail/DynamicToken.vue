<template>
    <div class="box">
        <div class="box-header">
            <h2>Dynamic Token</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group">
                    <label class="control-label col-md-2">Enable</label>
                    <div class="controls">
                        <!-- <switch_offer :offer_param='"is_active"' :offer_val="empInfo.dynamic_token_check || 0" :showAlert='showAlert' :renderOffer="empInfo"  :switchDefaultAPI="'Employee/editDynamicTokenCheck'"></switch_offer> -->
                        <common-switch
                            :showAlert='showAlert'
                            :default_val="empInfo.dynamic_token_check || 0"
                            :switch_param='"is_active"'
                            :switchGetCustomParam="onChange"
                            :switchDefaultAPI="'Employee/editDynamicTokenCheck'"
                        />
                        <i class="icon-ok ibutton-edit-done"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import switch_offer from '@/components/Switch_Offer.vue'

import Vue from "vue"
import CommonSwitch from '@/components/common/common-switch/'

export default {
    data () {
        return {
        }
    },
    props:{
        empInfo:{},
        showAlert:{}
    },
    components: {CommonSwitch},
    methods: {
        onChange(param,value) {
            let that = this
            let _val = value ? 1 : 0
            let query = {
                id:this.$route.query.id,
                [param]: _val
            }
            return query
        }
    },
    mounted () {
    }
}
</script>