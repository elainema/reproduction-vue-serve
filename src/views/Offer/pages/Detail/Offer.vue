<template>
<div v-yeah-loading='loadingZone'>
    <div class="box" ref="offer_wrapper">
        <div class="box-header"  v-box-action-resize>
            <h2>Offer</h2>
            <div class="box-action"><i class="icon-chevron-up" title="Fold"></i> <i class="icon-chevron-down hide" title="Unfold"></i></div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div id="offer_logo">
                    <img alt="Offer Logo" :src="src || config.parseOfferLogo(offerInfo.logo)"/>
                   <!--  <UploadFormOfferLogo :offer_id="offer_id"  :beforeChange="beforeChange" :afterChange="afterChange" :showAlert="showAlert" v-if="renderOffer" :uploadSuccess="uploadSuccess" :btnName="'Update Logo'" :accept="accept" :nonsupport="nonsupport"></UploadFormOfferLogo> -->
                    <upload-file-directly
                        v-if="renderOffer"
                        :offer_id="offer_id"
                        :beforeChange="beforeChange" 
                        :afterChange="afterChange" 
                        :uploadSuccess="uploadSuccess"
                        :btnName="'Update Logo'" 
                        :nonsupport="nonsupport"
                        :showAlert="showAlert"
                        :accept="accept">
                    </upload-file-directly>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Offer ID</label>
                    <div class="controls">
                        <span class="text"><strong id="offer_id" v-if="renderOffer">{{offerInfo.id}}</strong></span>
                        <a class="btn token-toggle" id="create_similar" :href="'p_create_offer?from='+offerInfo.id">Create Similar Offer</a>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Advertiser</label>
                    <div class="controls">
                        <editable_select2_offer :showAlert="showAlert" :source="sourceAdv" :offer_name="'advertiser_id'" :offer_val="offerInfo.advertiser_id" :renderOffer="renderOffer"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Adv identifier</label>
                    <div class="controls">
                        <editable_select2_offer :showAlert="showAlert" :source="sourceAdvIdent" :offer_name="'adv_identifier'" :offer_val="offerInfo.adv_identifier" :renderOffer="renderOffer"></editable_select2_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Advertiser Manager</label>
                    <div class="controls">
                        <span class="text" id="advertiser_manager" v-if="renderOffer && advertiser">{{offerInfo.advertiser[0].first_name + " " + offerInfo.advertiser[0].last_name}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="name" data-type="ReBack">Offer Name</a> <span class="red">*</span></label>
                    <div class="controls">
                        <editable_text_offer :offer_class="'col-md-7'"  :showAlert="showAlert"  :offer_name="'name'" :offer_val="offerInfo.name" :renderOffer="renderOffer"></editable_text_offer>
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Status</label>
                    <div class="controls">
                        <a href="#" @click.prevent="modalState = true" class="editable editable-click" style="display: inline;" id="reserve_change_status"><span id="status">{{offerInfo.status | capitalize}}</span> <span class="" v-show="offerInfo.alert_status_time">(<span id="alert_status">{{offerInfo.alert_status | capitalize}}</span> after <span id="alert_status_time">{{offerInfo.alert_status_time}}</span> GMT)</span></a>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="icon-building icon-large" id="StatusShowLog"></span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Exclude from Mana<help-box :content="helpTips.exclude_from_mana"></help-box></label>
                    <div class="controls">
                        <common-switch
                            :default_val="offerInfo.is_exclude_from_mana"
                            :switch_param='"is_exclude_from_mana"'
                            :render="renderOffer"
                            :switchDefaultAPI="Offer2edit"
                            :showAlert="showAlert"
                            :updateInfo="updateOfferInfo"
                        />
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- <changeOfferStatusModal :modalState="modalState" :hideModal="hideModal" :showAlert="showAlert"></changeOfferStatusModal> -->
    <change-offer-status-modal 
        :outerVisible.sync="modalState" 
        :showAlert="showAlert"
        :dialogName="'outerVisible'">
    </change-offer-status-modal>

</div>


</template>

<script>
import { offerHelpTips,tokenList } from '../../config/config'
const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
const editable_select2_offer = () => import(
/* webpackChunkName: "editable_select2_offer" */ '@/components/Editable_Select2_Offer.vue');
const editable_text_offer = () => import(
/* webpackChunkName: "editable_text_offer" */ '@/components/Editable_Text_Offer.vue');
const ChangeOfferStatusModal = () => import(
/* webpackChunkName: "changeOfferStatusModal" */ '../../components/change-offer-status-modal/');

/*const UploadFormOfferLogo = () => import(
 webpackChunkName: "UploadFormOfferLogo"  '@/components/UploadFormOfferLogo.vue');
*/
const UploadFileDirectly = () => import(
/* webpackChunkName: "UploadFileDirectly" */ '@/components/common/upload-file-directly/');

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

import cors_config from '@/util/config'
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            sourceAdvIdent:[{"id":"","text":"empty"},{"id":"googleAdvId","text":"gaid"},{"id":"idfa","text":"idfa"}],
            modalState:false,
            offer_id:this.$route.query.id,
            config:cors_config,
            src:'',
            loadingZone:false,
            accept:'image',
            nonsupport:'image/bmp',
            helpTips: {},
            Offer2edit:'Offer2/edit'
        }
    },
    computed:{
        ...mapGetters({
          cookieHash:"cookieHash",
        }),
        advertiser() {
            return !_.isEmpty(this.offerInfo && this.offerInfo.advertiser)
        }
    },
    watch:{
        renderOffer(newVal, oldVal) {
            if (newVal) {
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.offer_wrapper)
                })
            }
        }
    },
    components: { editable_select2_offer, editable_text_offer, ChangeOfferStatusModal,CommonSwitch,UploadFileDirectly, HelpBox},
    methods: {
        renderCallback(swfu) {
            this.swfu = swfu
        },
        hideModal:function() {
          this.modalState = false
        },
        beforeChange(){
            this.loadingZone = true
            return true
        },
        afterChange(){
            this.loadingZone = false
        },
        uploadSuccess: function(data) {
            this.src = data
        }
    },
    props:{
      renderOffer:{default:false},
      sourceAdv:{
        default:""
      },
      offerInfo:{},
      showAlert:{},
      setOfferEditAuth:{},
      updateOfferInfo:{}
    },
    created () {
        this.helpTips = offerHelpTips
    },
    mounted () {
    }
}
</script>


<style scoped>
</style>