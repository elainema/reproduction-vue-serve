<template>
<div v-yeah-loading='loadingZone'>
    <div class="box">
        <div class="box-header"  v-box-action-resize>
            <h2>Basic</h2>
            <div class="box-action"><i class="icon-chevron-up" title="Fold"></i> <i class="icon-chevron-down hide" title="Unfold"></i></div>
        </div>
        <div class="box-container" ref="basic_wrapper">
            <div class="box-content form-horizontal frm-entity frm-detail">

                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="description" data-type="ReBack">Description</a> <span class="red">*</span></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <div id="" class="well desc-well" data-control-name="bt-button" @click="descriptionVisibility='show'" v-show="descriptionVisibility==='hide'">
                            <p  id="" class="editable editable-click" v-html="offerInfo.description"></p>
                        </div>
                        <ckeditor :descriptions="offerInfo.description" v-if="renderOffer" :editor_width="'auto'" :visibility="descriptionVisibility" v-show="descriptionVisibility==='show'"></ckeditor>
                        <p id="desc_action" class="" v-show="descriptionVisibility==='show'">
                            <br />
                            <a href="#"  data-control-name="bt-button" class="btn btn-primary" @click.prevent="setDescription"><i class="icon-ok icon-white"></i></a>
                            <a href="#"  data-control-name="bt-button" class="btn" @click.prevent="descriptionVisibility='hide'"><i class="icon-remove icon-white"></i></a>
                            <i class="icon-ok green hide"></i>
                        </p>
                    </div>
                </div>
                <div class="control-group form-group  publisher_group_white_black_list">
                    <label class="control-label col-md-2"><a data-value="" data-type="">Publisher White Black List</a><help-box :content="helpTips.publisher_white_black_list"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <a href="#" v-show="setting_white_black_list==='hide'" data-target=".edit_block" class="editable editable-click setting-white-black-list" title="" @click.prevent="setting_white_black_list='show'">Setting</a>
                        <div class="edit_block" v-show="setting_white_black_list === 'show'">
                            <chosen_container_offer class="inline-block" :option0="'- Select an Publisher -'" :renderOffer="renderOffer" v-if="activeUser" :chosenInfo="activeUser" :onChange="onChangeAff"  :classList="'col-md-3 chosenSelect'"></chosen_container_offer><span class="red ml15 hidden-xs">*</span>
                            <div class="mt20">
                                <select id="publisher_white_black_select" class="col-md-3 form-control" name="flag" v-model="publisher_flag" @change="getOfferPublisherWhiteBlackList">
                                    <option value="">- Select a White list or Black list -</option>
                                    <option value="black">black list</option>
                                    <option value="white">white list</option>
                                </select><span class="red ml15 hidden-xs">*</span>
                            </div>
                            <div style="position: relative;" class="row  nomargin  nopadding col-md-5 clearfix">
                                <textarea id="" class="mt20 " ref="list" style="" v-model="publisher_list" name="list" rows="5" placeholder="paste excel data here, seperated by a new line"></textarea>
                                <span style="position: absolute;right: -20px;top:20px;" class="hidden-xs"><span class="red">*</span></span>
                            </div>
                            <div class="mt20 clearfix">
                                <button class="btn btn-primary submit" @click="createOfferPublisherWhiteBlackList">Submit</button>
                                <button class="btn  ml15 cancel" data-target='.setting-white-black-list' @click="setting_white_black_list='hide'">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="offer_url" data-type="ReBack">Offer URL</a> <span class="red">*</span><help-box :content="helpTips.offer_url"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_text_offer :offer_class="'col-md-12'" :showAlert="showAlert"  :offer_name="'offer_url'" :offer_val="offerInfo.offer_url" :renderOffer="renderOffer"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2" for="is_s2s_notify">Check Redirect Pattern<help-box :content="helpTips.check_redirect_pattern"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <label class="checkbox">
                            <input type="checkbox" name="is_s2s_notify" id="is_s2s_notify" :checked="offerInfo.is_s2s_notify == 1" :value="offerInfo.is_s2s_notify" disabled="disabled"/> S2S Async
                        </label>
                    </div>
                </div>
                <div class="control-group form-group" id="notify_url_body" v-show="offerInfo.is_s2s_notify === 1 ">
                    <label class="control-label col-md-2"><a data-value="notify_url" data-type="ReBack">Notification URL</a> <span class="red">*</span><help-box :content="helpTips.notification_url"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_text_offer :offer_class="'col-md-12'" :showAlert="showAlert"  :offer_name="'notify_url'" :offer_val="offerInfo.notify_url" :renderOffer="renderOffer"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="preview_url" data-type="ReBack">Preview URL</a> <span class="red">*</span><help-box :content="helpTips.preview_link"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable-text-preview
                            :offer_class="'col-md-12'" 
                            class="inline-block" 
                            :showAlert="showAlert"  
                            :offer_name="'preview_url'" 
                            :offer_val="offerInfo.preview_url" 
                            :renderOffer="renderOffer"
                            @fetchOcpaInfo = 'fetchOcpaInfo'>
                        </editable-text-preview>
                        <a target="_blank" class="btn btn-primary" id="btn_preview" :href="offerInfo.preview_url">View</a>
                        <span v-if="isIntegrated =='1'">integrated <span v-if="integratedSource">with {{ integratedSource }} </span></span>
                        <span v-else>Unintegrated</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Conversion Tracking Type</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <span class="text" id="convertion_tracking_type">Server Postback w/ Transaction ID</span>
                    </div>
                </div>
                <div class="control-group form-group" id="tracking">
                    <label class="control-label col-md-2" for="tracking_system">Tracking System<help-box :content="helpTips.tracking_system"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <a href="#" id="tracking_system" data-type="select2" data-inputclass="span5"></a>
                        <editable_select2_offer class="inline-block" :showAlert="showAlert" :source="sourceTrackingSystem" :offer_name="'tracking_system'" :offer_val="tracking_system" :savenochange="true" :renderOffer="renderOffer" :onShown="onShown" :getCustomParam="getCustomParam" :onSelectChange="onSelectChange"></editable_select2_offer >
                        <span class="other" v-if="is_other_tracking_system">Other：{{offerInfo.tracking_system}}</span>
                    </div>
                </div>
                <div class="control-group form-group" id="">
                    <label class="control-label col-md-2">Conversion Pixel<help-box :content="helpTips.conversion_pixel"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding no-padding">
                        <span class="col-md-6 uneditable-input normal-cursor form-control  pull-left" id="conversion_pixel" @click="showPrompt(conversion_pixel)" v-if="renderOffer">{{conversion_pixel}}</span><a class="btn btn-primary token-toggle" href="#" @click.prevent="modalState_addTokenModal = true ">Add Tokens</a><a href="#" class="btn btn-default" id="show_img_pixel" @click.prevent="toggleImgPixel">Image Pixel</a>
                    </div>
                </div>
                <div class="control-group form-group hide-normal" id="img_pixel_container">
                    <div class=" col-md-10  nopadding col-md-offset-2">
                        <input type="text" class="span6" :value="img_pixel"/>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Global Pixel Type</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <common-switch
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.use_advanced_pixel"
                            :switch_param='"use_advanced_pixel"'
                            :render="renderOffer"
                            :yes_text="'Advanced'" 
                            :no_text="'Simple'"
                            :switchDefaultAPI="Offer2edit"
                            :onSuccess="onSuccess"
                        />
                        <advanced-global-pixel 
                            :is_use_advanced_pixel="offerInfo.use_advanced_pixel" 
                            :renderOffer="renderOffer" 
                            :advancedPixel="advancedPixels" 
                            :saveType="saveType" 
                            :showLoading="showLoading" 
                            :hideLoading="hideLoading" 
                            :showAlert="showAlert" 
                            :customParam="customParam">
                        </advanced-global-pixel>
                    </div>
                </div>
                <div class="control-group form-group" id="" v-show="offerInfo.use_advanced_pixel != 1">
                    <label class="control-label col-md-2"><a data-value="global_pixel" data-type="ReBack">Global Pixel Key</a> <span class="red">*</span></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable-textarea-offer :offer_class="'span6'" :showAlert="showAlert"  :onShown="onShownGlobalPixel" :maxlength="1000" :offer_name="'global_pixel'" :offer_val="offerInfo.global_pixel" :getCustomParam="getCustomParamGlobalPixel" :renderOffer="renderOffer" :editable_id="'global_pixel_key'"  :offer_api="'Pixel/edit'" ></editable-textarea-offer>

                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Permission<help-box :content="helpTips.permission"></help-box></label>
                    <common-switch
                        :showAlert='showAlert'
                        :updateInfo="updateOfferInfo"
                        :default_val="offerInfo.is_private"
                        :switch_param='"is_private"'
                        :render="renderOffer"
                        :yes_text="'Private'" 
                        :no_text="'Public'"
                        :onChange="switchPermissionOnChange"
                    />
                </div>
                <div class="control-group form-group" v-show="offerInfo.is_private != 1">
                    <label class="control-label col-md-2">Require Approval</label>
                    <common-switch
                        :showAlert='showAlert'
                        :updateInfo="updateOfferInfo"
                        :default_val="offerInfo.is_require_approval"
                        :switch_param='"is_require_approval"'
                        :render="renderOffer"
                        :onChange="switchRequireApprovalOnChange"
                    />
                </div>
                <div class="control-group form-group" id="app_questions" v-show="offerInfo.is_require_approval == 1 || show_app_questions">
                    <label class="control-label col-md-2" for="">Application Questions</label>
                    <form id="app_qna_container" ref="app_qna_container" class="controls col-md-10 nomargin nopadding">
                        <application-questions :defaultQuestions="app_questions" :renderOffer="app_questions" :removeCallback="removeCallback" :is_require_approval="offerInfo.is_require_approval"></application-questions>
                    </form>
                    <div class="col-md-10 col-md-offset-2 nopadding mt10" id="question_action">
                        <a href="#" class="btn btn-primary" data-control-name="bt-button" @click.prevent="showConfirmModal">
                            <i class="icon-ok icon-white"></i>
                        </a>
                        <i class="icon-ok green hide"></i>
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Expiration Date</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_date_offer  :showAlert="showAlert" :offer_name="'expiration_date'"  :offer_val="offerInfo.expiration_date" :renderOffer="renderOffer"></editable_date_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Offer Action</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_select2_offer  :select2_multiple="false"  :offer_api="offer_api_action" :getCustomParam="getCustomParam_offerAction" :onShown="onShown_offerAction" :onHidden="onHidden_offerAction" :savenochange=true :onSelectChange="onSelectChange_offerAction"   :showAlert="showAlert" :source="sourceOfferAction" :offer_name="'offer_expiration_action'" :onSuccess="onSuccess_offerAction"  :offer_val="offerExpirationAction.action"  :renderOffer="renderOffer"></editable_select2_offer >
                        <select class="mt10 mb20 col-md-3" v-show="currentOfferAction === 'RENEW'" v-model="renew_offset">
                          <option value="ONE_WEEK">One Week</option>
                          <option value="ONE_MONTH">One Month</option>
                        </select>

                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Categories</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_select2_offer  :select2_multiple="true"  :showAlert="showAlert" :source="sourceCat" :offer_name="'category_ids'" :offer_val="offerInfo.category_ids" :validate="validateCat"  :renderOffer="renderOffer"></editable_select2_offer >
                    </div>
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Allowed Traffic<help-box :content="helpTips.allowed_traffic"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_checkbox_offer :renderOffer="renderOffer" :allowed_traffic="allowed_traffic" :source="source"></editable_checkbox_offer>
                    </div>
                </div>


                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="note" data-type="ReBack">Note</a> <span class="red">*</span></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable-textarea-offer :offer_class="'span6'" :showAlert="showAlert" :maxlength="320" :offer_name="'note'"  :offer_val="offerInfo.note" :renderOffer="renderOffer"></editable-textarea-offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Recommend</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <input id="recommend_info" type="text" :value="offerInfo.recommend_info"  class="col-md-4 pull-left mr10" placeholder="Recommend reason" /> <a href="#" class="btn btn-primary" data-control-name="bt-button" @click.prevent="setRecommend">{{offerInfo.is_recommend === "1" ? "Unset Recommend" : "Set Recommend"}}</a>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Offer Type<help-box :content="helpTips.offer_type"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <span id="offer_type">{{getFotmatOfferType(offerInfo.offer_type)}}</span>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Exclusive<help-box :content="helpTips.exclusive"></help-box></label>
                    <common-switch
                        :showAlert='showAlert'
                        :updateInfo="updateOfferInfo"
                        :default_val="offerInfo.is_exclusive"
                        :switch_param='"is_exclusive"'
                        :render="renderOffer"
                        :switchDefaultAPI="Offer2edit"
                    />
                </div>

                
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Incentive<help-box :content="helpTips.incentive"></help-box></label>
                    <common-switch
                        :showAlert='showAlert'
                        :updateInfo="updateOfferInfo"
                        :default_val="offerInfo.is_incentive"
                        :switch_param='"is_incentive"'
                        :render="renderOffer"
                        :switchDefaultAPI="Offer2edit"
                    />
                </div>

                <div class="control-group form-group">
                    <label class="control-label col-md-2">Conversion Flow<help-box :content="helpTips.conversion_flow"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable_select2_offer   :showAlert="showAlert" :source="sourceConversionFlow" :offer_name="'conversion_flow'" :offer_val="conversion_flow_id"  :renderOffer="renderOffer"  :getCustomParam="getCustomParamConversion"></editable_select2_offer >
                    </div>

                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Conversion Flow Description</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <editable-textarea-offer :offer_class="'span6'" :showAlert="showAlert"  :placeholder="'Write detailed Conversion Flow Description here'" :maxlength="1000" :offer_name="'conversion_flow'" :getCustomParam="getCustomParamConversionFlowDesc" :offer_val="offerInfo.conversion_flow_description" :renderOffer="renderOffer"></editable-textarea-offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a href="javascript:;">Quality Rating</a></label>
                        <common-switch
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="ocpaData.is_quality_rating"
                            :switch_param='"is_quality"'
                            :render="renderOffer"
                            :switchDefaultAPI="'Ocpa/setOfferQuality'"
                            :switchGetCustomParam="getCustomParamOfferQuality"
                        />
                        <span class=" red " >(Offer must have ocpa data  for at least 7 days)</span>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a href="javascript:;">Fraud Traffic Allowed</a></label>
                        <common-switch
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="ocpaData.is_fraud_allowed"
                            :switch_param='"is_fraud_allowed"'
                            :render="renderOffer"
                            :switchDefaultAPI="'Ocpa/setOfferQuality'"
                            :switchGetCustomParam="getCustomParamOfferQuality"
                        />
                </div>
                <div class="control-group form-group" v-if="['2','3','6'].indexOf(userInfo.role_id) !== -1">
                    <label class="control-label col-md-2"><a href="javascript:;">Caps Subscription</a></label>
                       <!--  <switch_btn :offer_val="capEmailState"  name="caps_subscription" :showAlert="showAlert" :renderOffer="renderOffer" :switchCallBack="switchBtnCallBack"></switch_btn> -->
                        <common-switch
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="offerInfo.caps_subscription"
                            :switch_param='"caps_subscription"'
                            :render="renderOffer"
                            :switchDefaultAPI="'Offer2/setOfferEmailSubscription'"
                            :switchGetCustomParam="getCustomParamOfferCapsSubscription"
                        />

                </div>
            </div>
        </div>
    </div>
    <!-- <confirmModal :modalState="modalState" :hideModal="hideModal" :onConfirm="confirm_is_require_approval"></confirmModal> -->
    <modal 
      :dialogVisible.sync="modalState"
      :title="'Confirmation'"
      :onConfirm="confirm_is_require_approval"
      :dialogBody="'Are you sure to submit?'"
      :cancelOnLeft="true"
      :confirmText="'OK'">
    </modal>

    <!-- <addTokenModal :modalState="modalState_addTokenModal" :hideModal="hideModal_addTokenModal" :conversion_pixel="conversion_pixel" :showPrompt="showPrompt"></addTokenModal> -->      
    <add-token-modal 
        :modalStateAddTokenModal.sync="modalState_addTokenModal"
        :tokenList="tokenList" 
        :conversion_pixel="conversion_pixel" 
        :dialogName="'modalStateAddTokenModal'" 
        :showPrompt="showPrompt"
    ></add-token-modal>

    <!-- <confirmPermissionModal :modalState="confirmPermissionModal" :hideModal="hideModalAndCancelSwitch" :isPrivate="value" :editConfirm="hideModalAndcomfirmEdit"  :editCancel="editCancel"></confirmPermissionModal> -->
    <confirm-permission-modal 
        :modalStateConfirmPermission.sync="confirmPermissionModal" 
        :isPrivate="value" 
        :onConfirm="hideModalAndcomfirmEdit"  
        :onCancel="onCancel"
        :dialogName="'modalStateConfirmPermission'"
    ></confirm-permission-modal>


   <!--  <confirmApproveModal :modalState="confirmApproveModal" :hideModal="hideModalAndCancelSwitch" :editConfirm="hideModalAndcomfirmEdit" :editCancel="editCancel" :modalBody="modalBody"></confirmApproveModal> -->
    <confirm-approve-modal
        :modalStateConfirmApprove.sync="confirmApproveModal" 
        :isPrivate="value" 
        :onConfirm="hideModalAndcomfirmEdit"  
        :onCancel="onCancelRequireApproval"
        :dialogBody="modalBody"
        :dialogName="'modalStateConfirmApprove'"
    ></confirm-approve-modal>
</div>


</template>

<script>
import Vue from "vue"
import { mapActions } from 'vuex'
//import editable_textarea_offer from '@/components/Editable_TextArea_Offer.vue'
import EditableTextareaOffer from '@/components/business/editable-textarea-offer/'
import ApplicationQuestions from '../../components/application-questions/'
import editable_checkbox_offer from '@/components/Editable_Checkbox_Offer.vue'
import editable_date_offer from '@/components/Editable_Date_Offer.vue'
import AdvancedGlobalPixel from '@/components/business/advanced-global-pixel/'
const editable_select2_offer = () => import(
/* webpackChunkName: "editable_select2_offer" */ '@/components/Editable_Select2_Offer.vue');

const editable_text_offer = () => import(
/* webpackChunkName: "editable_text_offer" */ '@/components/Editable_Text_Offer.vue');

const ckeditor = () => import(
/* webpackChunkName: "ckeditor" */ '@/components/Ckeditor.vue');

/*const confirmModal = () => import(
 webpackChunkName: "confirmModal"  '@/components/ConfirmWnd.vue');*/
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');


/*const addTokenModal = () => import(
 webpackChunkName: "addTokenModal"  '@/components/add-token-modal/');
*/
const AddTokenModal = () => import(
/* webpackChunkName: "AddTokenModal" */ '../../components/add-token-modal/');

const chosen_container_offer = () => import(
/* webpackChunkName: "chosen_container_offer" */ '@/components/Chosen_Container_Offer.vue'
);
const EditableTextPreview = () => import(
/* webpackChunkName: "EditableTextPreview" */ '@/components/EditableTextPreview.vue'
);

/*const confirmPermissionModal = () => import(
 webpackChunkName: "confirmPermissionModal"  '@/components/ConfirmPermissionModal.vue'
);*/
const ConfirmPermissionModal = () => import(
/* webpackChunkName: "ConfirmPermissionModal" */ '../../components/confirm-permission-modal/'
);

/*const confirmApproveModal = () => import(
 webpackChunkName: "confirmApproveModal"  '@/components/ConfirmApproveModal.vue'
);*/

const ConfirmApproveModal = () => import(
/* webpackChunkName: "ConfirmApproveModal" */ '../../components/confirm-approve-modal/'
);

const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
import PixelURL from '@/util/pixelURL'
import { tokenList, basicHelpTips } from '../../config/config'

export default {
    data () {
        return {
            show_app_questions: false,
            is_require_approval:0,
            publisher_flag:"",
            publisher_list:"",
            modalState:'hide',
            descriptionVisibility:"hide",
            modalState_addTokenModal:false,
            setting_white_black_list:"hide",
            recommend_info:"",
            selectedAff:"",
            img_pixel:"<img src='http://global.ymtracking.com/wconv?offer_id=" + this.$route.query.id + "' width=1 height=1 />",
            sourceTrackingSystem:[
                {"id":"Adjust","text":"Adjust"},
                {"id":"Appsflyer","text":"Appsflyer"},
                {"id":"MAT","text":"MAT"},
                {"id":"other","text":"Other 3rd Party System"},
                {"id":"Self-Tracking","text":"Self-Tracking"}],
            sourceOfferAction:[
                {id:0,value:"",text:""},
                {"id":"1", "value":"DO_NOTHING", "text":"Do Nothing"},
                {"id":"3", "value":"SUSPEND_OFFER","text":"Suspend Offer"},
                {"id":"4", "value":"RENEW","text":"Renew"}
            ],
            saveType:'offer_id',
            loadingZone:false,
            allowed_traffic:'',
            source:'',
            app_questions:{},
            question_type:'',
            showModal:true,
            currentOfferAction:"",
            renew_offset:"ONE_WEEK",
            offer_api_action:'Offer2/saveExpirationAction',
            conversion_flow_id:'',
            helpTips: {},
            confirmPermissionModal:'hide',
            confirmApproveModal:'hide',
            modalBody:'',
            require_approval_off: '<h4>Are you sure to turn the "Require Approval" off? </h4><ul><li>Level 1, 2 &amp; 3 affiliates approved.</li><li>Previous manual adjustment is not affected.</li><li>The change you made results in offer access difference of affiliates.</li></ul><p>We suggest your in-time notification to your affiliates about all these changes.</p>',
            require_approval_on: '<h4>Are you sure to turn the "Require Approval" on? </h4><ul><li>Level 1 affiliates blocked.</li><li>Level 2 &amp; 3 affiliates approved.</li><li>Previous manual adjustment is not affected.</li><li>The change you made results in offer access difference of affiliates.</li></ul><p>We suggest your in-time notification to your affiliates about all these changes.</p>',
            value:0,
            offer_param:'',
            Offer2edit:'Offer2/edit',
            tokenList:'',
            copyBtn:null
        }
    },
    components: {
        CommonSwitch, 
        ApplicationQuestions, 
        ckeditor, 
        editable_select2_offer,
        EditableTextareaOffer,
        editable_text_offer,
        editable_date_offer,
        Modal, 
        AddTokenModal, 
        AdvancedGlobalPixel, 
        chosen_container_offer, 
        editable_checkbox_offer,
        HelpBox,
        ConfirmPermissionModal,
        ConfirmApproveModal,
        EditableTextPreview
    },
    computed:{
        is_other_tracking_system(){
            let id_arr = _.map(this.sourceTrackingSystem,"id")
            return this.offerInfo.tracking_system &&  id_arr.indexOf(this.offerInfo.tracking_system) == -1  || this.offerInfo.tracking_system === "other"
        },
        tracking_system(){
            let id_arr = _.map(this.sourceTrackingSystem,"id")

            if(!this.offerInfo.tracking_system){
                return ""
            } else if(id_arr.indexOf(this.offerInfo.tracking_system) == -1 || this.offerInfo.tracking_system === "other") {
                return "other"
            } else{
                return this.offerInfo.tracking_system
            }

        },
        conversion_pixel(){
            if(this.offerInfo.is_dynamic_revenue){
                return this.currentTrackLink.track_domain + this.currentTrackLink.conversion_handler + '?transaction_id={transaction_id}&revenue={adv_revenue}'
            }else{
                return this.currentTrackLink.track_domain + this.currentTrackLink.conversion_handler + '?transaction_id={transaction_id}'
            }
        },
        advancedPixels() {
            return this.offerInfo && this.offerInfo.advancedPixel
        }
    },
    watch:{
        renderOffer:function(newVal, oldVal) {
            if (newVal) {
                this.get_allowed_traffic();
                this.getInitQuestions();
            }
        },
        sourceConversionFlow:function(newVal, oldVal) {
            if (newVal) {
                this.get_conversion_flow_id()
            }
        }
    },
    methods: {
        ...mapActions([
          'refreshAffAccess',
        ]),
        onCancel() {
            this.editCancel('is_private',this.offerInfo.is_private)
        },
        onCancelRequireApproval() {
            this.editCancel('is_require_approval',this.offerInfo.is_require_approval)
        },
        hideModalAndcomfirmEdit() {
            let param_val = !this.offerInfo[this.offer_param]
            let query = {id:this.$route.query.id}
            let that = this
            param_val = param_val ? 1 : 0
            query[that.offer_param] = param_val
            if (that.offer_param === 'is_private' || that.offer_param === 'is_require_approval') {
                query.isTrusted = true
            }
            if (that.offer_param === 'is_private') {
                query.is_require_approval = 0
            }
            Vue.http.post(that.Offer2edit, query).then(response => {
                that.showAlert(response.body.msg, "success");
                that.updateOfferInfo(query)
                if(that.offer_param === 'is_private' || that.offer_param === 'is_require_approval'){
                    that.refreshAffAccess(Math.random())
                }
                if(that.offer_param === 'is_require_approval') {
                    that.switchCallBack_permission(param_val)
                }
            }, response => {
                that.showAlert(response.body.msg);
                that.editCancel()
            })
            this.hideModal()
        },
        hideModalAndCancelSwitch() {
            this.hideModal()
        },
        switchPermissionOnChange(value,param) {
            this.confirmPermissionModal = 'show'
            this.offer_param = param
        },
        switchRequireApprovalOnChange(value,param) {
            let that = this
            if (value == 1) {
                that.modalBody = that.require_approval_on
            } else {
                that.modalBody = that.require_approval_off
            }
            that.confirmApproveModal = 'show'
            that.offer_param = param
        },
        onSuccess(param,value) {
            let query = {[param]:value}
            this.updateOfferInfo(query)
        },
        get_conversion_flow_id() {
            var that = this;
            var source = that.sourceConversionFlow

            var conversion_flow_id  = _.result(_.find(source, { 'text': that.offerInfo.conversion_flow}), 'id');
            that.conversion_flow_id = conversion_flow_id
            this.$nextTick(function () {
                this.setOfferEditAuth(this.$refs.basic_wrapper)
            })
        },
        getCustomParam_offerAction(params){
            let params_offerAction = {offer_id: params.pk, action: this.currentOfferAction}
            if(this.currentOfferAction === "RENEW") {
                params_offerAction.renew_offset = this.renew_offset
            } else {
            }
            return params_offerAction;
        },
        validateCat(value) {
            try{
                if (value && value[0] == "all") {
                    return 'Offer Category can not be empty';
                }
            }catch(e){}

        },
        onShown_offerAction(){
            this.currentOfferAction = this.offerExpirationAction.action
            this.renew_offset = this.offerExpirationAction.renew_offset || "ONE_WEEK"
        },
        onHidden_offerAction(){
            this.currentOfferAction = ""
        },
        onSelectChange_offerAction(e, $dom){
            this.currentOfferAction = e.val
            if(e.val === "") {
                this.offer_api_action = 'Offer2/deleteExpirationAction'
            }
        },
        onSuccess_offerAction(){
            this.offerExpirationAction.action = this.currentOfferAction;
            this.offerExpirationAction.renew_offset = this.renew_offset

        },
        customParam() {
            var query = {}
            query.offer_id = this.$route.query.id
            return query
        },
        onPrivateSwitchSuccess(){
            
        },
        getFotmatOfferType(offer_type) {
            return _.startCase(offer_type)
        },
        hideAppQA() {
            this.show_app_questions = false
        },
        removeCallback(is_require_approval) {
            let that = this;
            if (is_require_approval) {
                that.showLoading()
                var params = { id: this.$route.query.id, is_require_approval: 0 }
                Vue.http.post(that.Offer2edit, params).then(response => {
                    that.$store.dispatch('setOfferInfo', {is_require_approval:0})
                    that.showModal = false;
                    that.hideLoading();
                    that.hideAppQA();
                }, response => {
                    that.showAlert(response.body.msg);
                    that.hideLoading();
                })
            } else {
                that.hideAppQA();
            }
        },
        getInitQuestions() {
            var o = this.offerInfo
            var that = this
            var questions = false;
            var defaultQA = '{"question":{"0" : ""}, "answer":{"0" : ""}}'
            try {
                questions = JSON.parse(o.application_questions || defaultQA);
                that.question_type = 3
            } catch (e) {
                console.log('application_questions JSON.parse error, field is not a JSON string.');
            }
            if (questions) {
                that.app_questions = questions
            }
        },

        get_allowed_traffic() {
            var source = []
            var allowed_traffic = []
            var traffices = this.sourceTraffics;
            var data = this.offerInfo
            var that = this
            traffices.map(function(c_obj) {
                if (data.traffic_ids && c_obj[data.offer_type] === "1") {
                    source.push({ id: c_obj.id, text: c_obj.name, allowed: data.traffic_ids[c_obj.id] })
                    if (data.traffic_ids[c_obj.id] == "1") {
                        allowed_traffic.push(c_obj.name)
                    }
                }
            })
            that.allowed_traffic = allowed_traffic
            that.source = source;
        },
        showLoading() {
            this.loadingZone = true;
        },
        setSelectedAffVal(val, text) {
            this.selectedAff =  val
        },
        hideLoading(){
            this.loadingZone = false;
        },
        onChangeAff(val, text){
            this.setSelectedAffVal(val, text)
            this.getOfferPublisherWhiteBlackList()
        },
        toggleImgPixel() {
            $('#img_pixel_container').slideToggle(150, function() {
                $(this).find('input').select();
            });
        },
        switchCallBack(value) {
            this.show_app_questions = !!value;
            this.is_require_approval = value
        },
        switchCallBack_permission(value) {
            if(value) {
                this.show_app_questions = false;
            }
        },
        showPrompt:function(val){
            window.prompt('Press CTRL+C, then ENTER', val);
        },
        confirm_is_require_approval() {
            let that = this
            var params = $(this.$refs.app_qna_container).getFormQuery()
            params.id =  this.$route.query.id
            params.is_require_approval = 1
            that.showLoading()
            Vue.http.post(that.Offer2edit, params).then(response => {
                $(that.$refs.ibutton_edit_done).show().delay(1250).fadeOut(500);
                that.showAlert(response.body.msg, "success");
                that.$store.dispatch('setOfferInfo', {is_require_approval:1})
                that.hideLoading()
                that.hideModal()
                that.refreshAffAccess(Math.random())
            }, response => {
                that.hideModal()
                that.hideLoading()
                that.showAlert(response.body.msg);
                $(that.$refs.switch).bootstrapSwitch('setState', !that.value, true);
            })
            that.hideModal()
        },
        getOfferPublisherWhiteBlackList(){
            let that = this;
            let list = $(that.$refs.list).trimVal().split("\n") 
            let aff_id = that.selectedAff;
            let flag = that.publisher_flag
            if(aff_id && flag) {
            Vue.http.post('Offer2/getOfferPublisherWhiteBlackList', {offer_id:this.$route.query.id, aff_id: aff_id,flag:flag}).then(response => {
                let  subaff = _.pluck(response.body.data, "subaffiliate_id")
                $(that.$refs.list).val(subaff.join("\n"))

            }, response => {
                that.showAlert(response.body.msg);
            })
            }
        },
        createOfferPublisherWhiteBlackList:function(){
            let that = this;
            let list = $(that.$refs.list).trimVal().split("\n") 
            let aff_id = that.selectedAff;
            let flag = that.publisher_flag
            if(!aff_id || !flag )  return that.showAlert("both publisher and whitebalck list  can not be empty ", "error")
            list = _.filter(list,function(v){return v})

            if(_.uniq(list).length !== list.length) return that.showAlert("can not save two same sub affiliate ", "error")
            Vue.http.post('Offer2/createOfferPublisherWhiteBlackList', {offer_id:this.$route.query.id, aff_id: aff_id,flag:flag,list:list}).then(response => {
                that.showAlert(response.body.msg, "success");
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        setRecommend:function(){
            let that = this;
            Vue.http.post('Offer2/setRecommendOffer', {offer_id:this.$route.query.id, recommend_info:$("#recommend_info").trimVal()}).then(response => {
                that.showAlert(response.body.msg, "success");
                that.$store.dispatch('setOfferInfo', {is_recommend:that.offerInfo.is_recommend === "0" ? "1" : "0", recommend_info: $("#recommend_info").trimVal()})
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        setDescription:function(){
            let that = this;
            Vue.http.post(that.Offer2edit, {id:this.$route.query.id, description:window.editor.getData()}).then(response => {
                that.showAlert(response.body.msg, "success");
                that.$store.dispatch('setOfferInfo', {description:window.editor.getData()})
                that.descriptionVisibility = "hide"
            }, response => {
                that.showAlert(response.body.msg);
            })
        },
        showConfirmModal() {
          this.modalState = "show"
        },
        hideModal:function() {
          this.modalState = "hide"
          this.confirmPermissionModal = 'hide'
          this.confirmApproveModal = 'hide'
        },
        hideModal_addTokenModal:function() {
          this.modalState_addTokenModal = false
        },
        onShown: function($editable){
            if(this.is_other_tracking_system) {
                if($editable.find("#otherTracking").length == 0){
                    $editable.find(".editable-buttons").before('<input id="otherTracking" class="form-control" type="text" value="'+this.offerInfo.tracking_system+'" />');
                }else{
                    $editable.find("#otherTracking").show()
                }
            }
        },
        onShownGlobalPixel: function($elm, e, editable){
            window.pixel_url.onShown($elm, e, editable, this.offerInfo.global_pixel)
        },
        getCustomParam: function(params, $editable){
            let new_params = {id: params.pk}
            if (params.value == "other") {
                let otherTracking = $editable.find("#otherTracking").val();
                new_params[params.name] = otherTracking;
            } else {
                new_params[params.name] = params.value;
            }
            return new_params
        },
        getCustomParamConversion: function(params, $editable){
            let new_params = {id: params.pk}
            let _val = this.offerInfo.conversion_flow_description
            new_params[params.name + "['" + params.value + "']"] = _val
            return new_params
        },

        getCustomParamConversionFlowDesc: function(params, $editable){
            let new_params = {id: params.pk}
            new_params[params.name + "['" + this.conversion_flow_id + "']"] = params.value
            new_params.nosend_flow = this.conversion_flow_id
            return new_params
        },
        getCustomParamGlobalPixel(params, $editable){
            let new_params = {id: params.pk}
            new_params.global_pixel = pixel_url_globalPixel.getNewValue()
            return new_params
        },
        onSelectChange: function(e, $editable){
            //如果tracking system选择的是other，显示输入框，允许用户自己输入
            if (e.val == "other") {
                if ($editable.find("#otherTracking").length <= 0) {
                    $editable.find(".editable-buttons").before('<input id="otherTracking" class="form-control" type="text" value="" />');
                } else {
                    $editable.find("#otherTracking").show();
                }
            } else {
                $editable.find("#otherTracking").empty().hide();
            }
        },
        getCustomParamOfferQuality: function(param,value){
            let query = {}
            query.offer_id = this.$route.query.id
            query.alliance_id = 2
            query[param] = value
            return query
        },
        getCustomParamOfferCapsSubscription(param,value) {
            let query = {}
            query[param] = value
            query.offer_id = this.$route.query.id
            return query
        },
        fetchOcpaInfo() {
            this.$emit('fetchOcpaInfo')
        }
    },
    props:{
      renderOffer:{default:false},
      userInfo:{},
      offerInfo:{},
      showAlert:{},
      sourceCat:{},
      currentTrackLink:{default:function(){return {}}},
      activeUser:{},
      sourceTraffics:{},
      sourceConversionFlow:{},
      offerExpirationAction:{},
      ocpaData:{
          default:{}
      },
      integratedSource: null,
      isIntegrated: {
        default: '0'
      },
      setOfferEditAuth:{},
      updateOfferInfo:{},
      editCancel:{},
    },
    created() {
    },
    mounted() {
        this.tokenList = tokenList
        this.helpTips = basicHelpTips
        window.pixel_url_globalPixel = PixelURL({
            tag: '#global_pixel_key',
            limit: 50
        });
    }
}
</script>


<style scoped>
</style>