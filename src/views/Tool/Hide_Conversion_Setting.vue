<template>
    <div >
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="/">Home</router-link> </li>
                <li><router-link to="/offer_audit_log">Tools</router-link> </li>
                <li class="active">Hide Conversion Setting</li>
            </ul>
        </div>

        <div class="box">
            <div class="box-header">
                <h2>Hide Conversion Setting</h2>
                <div class="box-action">
                </div>
            </div>
            <div class="box-container">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <form class="form-horizontal frm-entity frm-detail form-report " style="margin-top:40px" ref="conversion_form" @submit.prevent="onLevelSubmit">
                    <div class="control-group form-group">
                        <label class="control-label pull-left col-md-2" for="start">Level 1</label>
                        <div class="controls col-md-10">
                            <input type="number" min="0" max="100" class="form-control col-md-1" name="1" v-model="levelData[1]" @blur="checkVal">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label pull-left col-md-2" for="start">Level 2</label>
                        <div class="controls col-md-10">
                            <input type="number" min="0" max="100" class="form-control col-md-1" name="2" v-model="levelData[2]" @blur="checkVal">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label pull-left col-md-2" for="start">Level 3</label>
                        <div class="controls col-md-10">
                            <input type="number" min="0" max="100" class="form-control col-md-1" name="3" v-model="levelData[3]" @blur="checkVal">
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label pull-left col-md-2" for="start">Level 4</label>
                        <div class="controls col-md-10">
                            <input type="number" min="0" max="100" class="form-control col-md-1" name="4" v-model="levelData[4]" @blur="checkVal">
                        </div>
                    </div>

                    <div class="control-group form-group">
                        <div class="btns-group col-md-offset-2 col-md-10">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
export default {
    data (){
        return {
            levelData:{}
        }
    },
    mixins: [mixin_alert_msg],
    components: {AlertPop},
    methods: {
        checkVal(e){
            if (e.target.value === ''){
                e.target.value = 0
            }
        },
        onLevelSubmit() {
            let params = $(this.$refs.conversion_form).getFormQuery();
            Vue.http.post('Affiliate/setAutoTuningPercentage',params).then(response => {
                this.showAlert(response.body.msg,'success')
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        getLevelPersentage(){
            Vue.http.get('Affiliate/getAutoTuningPercentage').then(response => {
                this.levelData = response.body.data 
                
            }, response => {
                this.showAlert(response.body.msg)
            })
        }
    },
    mounted (){
        this.getLevelPersentage()
    }
}
</script>
