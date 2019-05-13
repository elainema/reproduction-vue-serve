<template>
    <div class="box">
        <div class="box-header">
            <h2>Personal Info</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">ID</label>
                    <div class="controls">
                        <span id="id" class="text">{{ empInfo.id }}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">E-mail</label>
                    <div class="controls">
                        <span id="email" class="text"> {{ empInfo.email }}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Full Name</label>
                    <div class="controls">
                        <editable_text_name :showAlert="showAlert" :getCustomParam="customNameParam" :save_api="offer_api" :showConfirmModal="false" :offer_val="fullName" :optionValue="optionValue" :renderOffer="empInfo && namejs"></editable_text_name>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Phone</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[phone]'" :offer_val="empInfo.profile && empInfo.profile.phone" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false" :validate="validate_phone"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">QQ</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[qq]'" :offer_val="empInfo.profile && empInfo.profile.qq" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Skype</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[skype]'" :offer_val="empInfo.profile && empInfo.profile.skype" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Msn</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[msn]'" :offer_val="empInfo.profile && empInfo.profile.msn" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Gtalk</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[gtalk]'" :offer_val="empInfo.profile && empInfo.profile.gtalk" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Wechat</label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-4'" :showAlert="showAlert" :offer_name="'profile[wechat]'" :offer_val="empInfo.profile && empInfo.profile.wechat" :renderOffer="empInfo && empInfo.profile" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Create Date</label>
                    <div class="controls">
                        <span class="text" id="create_time"> {{ create_time(empInfo.create_time) }}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Status</label>
                    <div class="controls">
                        <editable_select2_offer :showAlert="showAlert" :source="statusInfo" :offer_name="'status'" :offer_val="empInfo.status" :savenochange="true" :renderOffer="empInfo && empInfo.status" :offer_api="offer_api" :showConfirmModal="false"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Password</label>
                    <div class="controls">
                        <button type="button" id="change_psw" class="btn btn-primary" @click.prevent="change_psw">Change Password</button>
                        <span v-if="new_psw">New Password is: <strong>{{ new_psw }}</strong></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue"
import editable_text_offer from '@/components/Editable_Text_Offer.vue'
import editable_select2_offer from '@/components/Editable_Select2_Offer.vue'
import editable_text_name from '@/components/Editable_Text_Name.vue'
import VueScript2  from 'vue-script2'

import common from '@/util/common'

export default {
    data () {
        return {
            loadingZone:false,
            id:this.$route.query.id,
            offer_api:'Employee/edit',
            statusInfo:[
                {id:'active', text:'Active'},
                {id:'pending', text:'Pending'},
                {id:'deleted', text:'Deleted'}
            ],
            new_psw:'',
            optionValue:{},
            fullName:'',
            namejs:false,
        }
    },
    props:{
        empInfo:{},
        showAlert:{},
    },
    components: {editable_text_offer,editable_select2_offer,editable_text_name},
    methods: {
        validate_phone(val) {
            let that = this
            if(/^\+?[\s\d\-\(\)]*$/.test(val) == false){
                $(that.$refs.editable).editable('activate');
                return 'Please input the correct phone number'
            }
        },
        customNameParam(params){
            var new_params = {}
            if ('object' === typeof params.value) {
                for (var key in params.value) {
                    new_params[key] = params.value[key];
                }
            }
            return new_params
        },
        change_psw(e) {
            var clicked = $(e.target).attr('clicked');
            if(!clicked){
                var new_psw = common.generate_password();
                var param = {id: this.$route.query.id, password: new_psw}
                $(e.target).attr('clicked', 'true');

                Vue.http.get('Employee/edit', {params:param}).then(response => {
                    this.showAlert(response.body.msg, 'success')
                    $(e.target).attr('clicked', 'false');
                    this.new_psw = new_psw
                }, response => {
                })
            }
        },
        create_time(time) {
            var createTime = moment(time);
            return createTime.fromNow() + ' (' + createTime.format("YYYY-MM-DD HH:MM:SS") + ')'
        },
    },
    watch:{
        empInfo() {
            var info = this.empInfo
            var optionValue = {
                first_name: info['first_name'],
                last_name: info['last_name']
            }
            this.optionValue = optionValue
            this.fullName = info['first_name'] + ' ' + info['last_name']
        },
    },
    created() {
        let that = this;
        VueScript2.load('/js/bootstrap-editable/input-ext/name.js').then(() => {
            that.namejs = true
        })
    },
    mounted () {
        this.id = this.$route.query.id
    }
}
</script>