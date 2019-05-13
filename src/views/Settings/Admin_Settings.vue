<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to ="/">Home</router-link></li>
            <li class="active">Site Settings</li>
        </ul>
    </div>
    <div class="box" ref="box_form">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        <div class="box-header">
            <h2>Email</h2>
        </div>
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="form-group">
                <label class="control-label col-md-2">Smtp Server</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'smtp_server'" :offer_val="smtp_server" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Smtp Port</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'smtp_port'" :offer_val="smtp_port" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Smtp Account</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'smtp_account'" :offer_val="smtp_account" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Smtp Password</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'smtp_password'" :offer_val="smtp_password" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Encryption</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'encryption'" :offer_val="encryption" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">System Email Account</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'system_email'" :offer_val="system_email" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Email Signature</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'email_signature'" :offer_val="email_signature" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
        </div>
    </div>
    <div class="box" ref="box_form">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        <div class="box-header">
            <h2>Tracking</h2>
        </div>
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="form-group">
                <label class="control-label col-md-2">Tracking Domain</label>
                <div class="controls">
                    <editable-textarea-offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'click_handler'" :offer_val="track_domain" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable-textarea-offer>
                    <a href="#" data-type="textarea" id="track_domain" data-inputclass=" col-md-6"></a>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Click Handler</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'click_handler'" :offer_val="click_handler" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Conversion Handler</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'conversion_handler'" :offer_val="conversion_handler" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Offer ID Key</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'offer_id_key'" :offer_val="offer_id_key" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-md-2">Aff ID Key</label>
                <div class="controls">
                    <editable_text_offer :offer_class="'col-md-7'" :showAlert="showAlert" :offer_name="'aff_id_key'" :offer_val="aff_id_key" :renderOffer="renderOffer" :offer_api="offer_api" :showConfirmModal="false"></editable_text_offer>
                </div>
            </div>
        </div>
    </div>
    <div class="box" ref="box_form">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        <div class="box-header">
            <h2>Customise</h2>
        </div>
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="form-group">
                <label class="control-label col-md-2">Company Logo</label>
                <div class="controls">
                    <div id="company_logo">
                        <img :src="logo ? logo : defaultImg" alt="Company logo" />
                        <!-- <UploadFormOfferLogo  :beforeChange="beforeChange" :afterChange="afterChange" :showAlert="showAlert" :uploadSuccess="uploadSuccess" :btnName="'Update Logo'" :url="url" :accept="accept"></UploadFormOfferLogo> -->
                        <upload-file-directly
                            v-if="renderOffer"
                            :uploadUrl="url"
                            :beforeChange="beforeChange" 
                            :afterChange="afterChange" 
                            :uploadSuccess="uploadSuccess"
                            :btnName="'Update Logo'"
                            :showAlert="showAlert"
                            :accept="accept">
                        </upload-file-directly>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');
import mixin_alert_msg from '@/mixins/alert_msg'
import editable_text_offer from '@/components/Editable_Text_Offer.vue'
//import editable_textarea_offer from '@/components/Editable_TextArea_Offer.vue'
import EditableTextareaOffer from '@/components/business/editable-textarea-offer/'
//import UploadFormOfferLogo from '@/components/UploadFormOfferLogo.vue'
import cors_config from '@/util/config'

const UploadFileDirectly = () => import(
/* webpackChunkName: "UploadFileDirectly" */ '@/components/common/upload-file-directly/');


export default {
  data(){
    return {
        loadingZone:"",
        smtp_port:'',
        smtp_account:'',
        smtp_password:'',
        encryption:'',
        system_email:'',
        email_signature:'',
        track_domain:'',
        click_handler:'',
        conversion_handler:'',
        offer_id_key:'',
        aff_id_key:'',
        logo:'',
        offer_api:'Union/editCurrentUnion',
        defaultImg:'http://dummyimage.com/240x90/4d494d/686a82.gif&text=Company logo',
        offer_id:this.$route.query.id,
        url:cors_config.swfupload.upload_url.uploadCompanyLogo,
        smtp_server:'',
        renderOffer:false,
        accept:'.jpg,.png,.bmp,.gif',
    }
  },
  mixins: [mixin_alert_msg],
  watch:{
  },
  computed: {
  },
  components: { AlertPop, editable_text_offer, EditableTextareaOffer,UploadFileDirectly},
  methods: {
      beforeChange(){
        this.loadingZone = true
        return true
    },
    afterChange(){
        this.loadingZone = false
    },

      renderCallback() {

      },
      getCurrentUnion() {
        let that = this
        that.$http.get('Union/getCurrentUnion').then(response => {
            that.loadingZone = ""
            if(response.body.flag != "success"){
                that.showAlert(response.body.msg, "error")
            } else {
                var data = response && response.body && response.body.data
                _.forEach(data, function(n, key) {
                     that[key] = n
                });
                that.renderOffer = true
            }
        }, response => {
            that.loadingZone = ""
            that.showAlert(response.body.msg, "error")
        })
      },
    uploadSuccess: function(data) {
        this.logo = data
    }

  },
  created () {
      this.getCurrentUnion()
  },
  mounted () {

  }
}
</script>

<style scoped>
</style>