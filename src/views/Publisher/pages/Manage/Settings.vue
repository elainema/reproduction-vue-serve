<template>
    <div class="box" :class="!renderPublisher ? 'ajax_loading' : '' ">
    <div class="box-header"v-box-action-resize>
        <h2>Settings</h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div class="control-group form-group">
                <label class="control-label col-md-3"><a data-value="parent_id" data-type="ReBack">Account Manager</a> <span class="red">*</span>
                </label>
                <div class="controls col-md-9">
                    <!-- <editable_select2_publisher   :id="'parent_id'"  :showAlert="showAlert" :source="sourceAM" :validate="validatorParentID" :publisher_name="'parent_id'" :publisher_val="publisherSettings.parent_id"  :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                    <editable-select2-publisher
                        :id="'parent_id'"  
                        :showAlert="showAlert" 
                        :source="sourceAM" 
                        :validate="validatorParentID" 
                        :publisher_name="'parent_id'" 
                        :publisher_val="publisherSettings.parent_id"  
                        :renderPublisher="renderPublisher">
                    </editable-select2-publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3"><a data-value="parent_id2" data-type="ReBack">Second Account Manager</a> <span class="red">*</span>
                </label>
                <div class="controls col-md-9">
                    <!-- <editable_select2_publisher  :id="'parent_id2'" :showAlert="showAlert" :source="sourceAM" :validate="validatorParentID2"  :publisher_name="'profile[parent_id2]'" :publisher_val="publisherSettings.parent_id2"  :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                    <editable-select2-publisher
                        :id="'parent_id2'" 
                        :showAlert="showAlert" 
                        :source="sourceAM" 
                        :validate="validatorParentID2"  
                        :publisher_name="'profile[parent_id2]'"
                        :publisher_val="publisherSettings.parent_id2"
                        :renderPublisher="renderPublisher">
                    </editable-select2-publisher>

                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Account Status</label>
                <div class="controls col-md-9">
                    <a href="#" id="status" data-type="select2"></a>
                    <!-- <editable_select2_publisher   :showAlert="showAlert" :source='sourceStatus'   :publisher_name="'status'" :publisher_val="publisherSettings.status"  :renderPublisher="renderPublisher" ></editable_select2_publisher > -->
                    <editable-select2-publisher
                        :showAlert="showAlert" 
                        :source='sourceStatus'   
                        :publisher_name="'status'" 
                        :publisher_val="publisherSettings.status"  
                        :renderPublisher="renderPublisher">
                    </editable-select2-publisher>

                </div>
            </div>

            <div class="control-group form-group control-group-referBy">
                <label class="control-label col-md-3">Referred by AFF
                </label>
                <div class="controls col-md-9">
                    <editable_select2_publisher_referred   :data="publisherSettings" :showAlert="showAlert"   :publisher_name="'profile[referral_by]'" :publisher_val="publisherSettings.referral_by"  :renderPublisher="renderPublisher" ></editable_select2_publisher_referred >
                </div>
            </div>
            <div class="control-group form-group control-group-referBy">
                <label class="control-label col-md-3">Referred by PM
                </label>
                <div class="controls col-md-9">
                    <span id="refered_by_am" class="text">{{publisherSettings.referral_by_am}}</span>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3" for=""><a data-value="tracking_domain" data-type="ReBack">Tracking Domain</a>
                <help-box :content="helpTips.tracking_domain"></help-box>
                </label>
                <div class="controls col-md-9">
                    <editable_text_publisher  :editable_id="'tracking_domain'" :showAlert="showAlert"  :publisher_name="'profile[tracking_domain]'" :publisher_val="tracking_link.tracking_domain_host" :renderPublisher="renderPublisher" :customParam="customDomainParam"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Relocate(200 redirect) <help-box :content="helpTips.relocate"></help-box></label>
                <div class="controls col-md-9">
                    <!-- <switch_publisher :publisher_param='"profile[redirect_200]"' :publisher_val="publisherSettings.redirect_200" :showAlert='showAlert' :renderPublisher="renderPublisher"></switch_publisher> -->
                    <common-switch
                        :showAlert='showAlert'
                        :default_val="publisherSettings.redirect_200"
                        :switch_param='"profile[redirect_200]"'
                        :render="renderPublisher"
                        :switchDefaultAPI="defaultApi">
                    </common-switch>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Global Pixel Type<help-box :content="helpTips.global_pixel_type"></help-box></label>
                <div class="controls col-md-9">
                    <!-- <switch_publisher style="" :publisher_param='"use_advanced_pixel"' :onSuccess="onAdvancedPixelSuccess" :aff_id="aff_id" :switchDefaultAPI="'Pixel/setUseAdvancedPixel'" :yes_text="'Advanced'" :no_text="'Simple'"  :publisher_val="publisherSettings.useAdvancedPixel" :showAlert='showAlert' :renderPublisher="renderPublisher"></switch_publisher> -->
                    <common-switch
                        :showAlert='showAlert'
                        :default_val="publisherSettings.useAdvancedPixel"
                        :switch_param='"use_advanced_pixel_pub"'
                        :yes_text="'Advanced'" 
                        :no_text="'Simple'"
                        :render="renderPublisher"
                        :onChange="onAdvancedPixelSuccess">
                    </common-switch>
                    <advanced-global-pixel 
                        class="mt20 setting_global_pixel" 
                        style="width:100%" 
                        :is_use_advanced_pixel="publisherSettings.useAdvancedPixel" 
                        :renderOffer="renderPublisher" 
                        :advancedPixel="publisherSettings.advancedPixel" 
                        :showAlert="showAlert"    
                        :aff_id="aff_id" 
                        :showLoading="showLoading" 
                        :hideLoading="hideLoading" 
                        :customParam="customParam">
                    </advanced-global-pixel>
                </div>
            </div>
            <div class="control-group form-group" id="">
                <label class="control-label col-md-3">
                    <a data-value="reject_conv_pixel" data-type="ReBack">
                        Reject_Conv_Pixel
                    </a> 
                    <span class="red">*</span>
                </label>
                <div class="controls col-md-9">
                    <editable-textarea-publisher 
                        :publisher_class="'span6'" 
                        :showAlert="showAlert"   
                        :savenochange="true" 
                        :onShown="onShownRejectConvPixel" 
                        :maxlength="1000" 
                        :publisher_name="'profile[reject_conv_pixel]'" 
                        :publisher_val="publisherSettings.reject_conv_pixel" 
                        :getCustomParam="getCustomParamRejectConvPixel" 
                        :renderPublisher="renderPublisher" 
                        :editable_id="'reject_conv_pixel_key'"   >
                    </editable-textarea-publisher>
                </div>
            </div>
            <div class="control-group form-group" id=""  v-show="publisherSettings.useAdvancedPixel == 0">
                <label class="control-label col-md-3"><a data-value="global_pixel" data-type="ReBack">Global Pixel</a> <span class="red">*</span>
                </label>
                <div class="controls col-md-9">
                    <editable-textarea-publisher :publisher_class="'span6'" :showAlert="showAlert"   :savenochange="true" :onShown="onShownGlobalPixel" :maxlength="1000" :publisher_name="'profile[global_pixel]'" :publisher_val="publisherSettings.global_pixel" :getCustomParam="getCustomParamGlobalPixel" :renderPublisher="renderPublisher" :editable_id="'global_pixel_key'"   ></editable-textarea-publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Hide Conversion<help-box :content="helpTips.hide_conversion"></help-box></label>
                <div class="controls col-md-9">
                   <!--  <switch_publisher style="" :publisher_param='"profile[is_manual_hide_conv]"'  :publisher_val="is_manual_hide_conv" :onSuccess="onHideConversionSuccess" :showAlert='showAlert' :renderPublisher="renderPublisher"></switch_publisher> -->
                    <common-switch
                        :showAlert='showAlert'
                        :default_val="is_manual_hide_conv"
                        :switch_param='"profile[is_manual_hide_conv]"'
                        :render="renderPublisher"
                        :switchDefaultAPI="defaultApi"
                        :onSuccess="onHideConversionSuccess">
                    </common-switch>
                    &nbsp;&nbsp;
                    <editable_text_publisher v-show="is_manual_hide_conv == 1" :editable_mode="'pop_up'"  :onShown="onShowHideConv" :displayOpt="displayOpt" :showAlert="showAlert"  :publisher_name="'profile[tuning_percentage]'" :publisher_val="publisherSettings.tuning_percentage" :renderPublisher="renderPublisher" :validate="validateCC"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Hide Payout<help-box :content="helpTips.hide_payout"></help-box></label>
                <div class="controls col-md-9">
                    <editable_text_publisher  class="inline-block" :editable_mode="'pop_up'"  :onShown="onShowHidePayout" :displayOpt="displayOpt" :showAlert="showAlert"  :publisher_name="'profile[tuning_payout_percentage]'" :publisher_val="publisherSettings.tuning_payout_percentage" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Proportion Cap<help-box :content="helpTips.proportion_cap"></help-box></label>
                <div class="controls col-md-9">
                    <editable_text_publisher  class="inline-block" :editable_mode="'pop_up'" :onShown="onShowCapProportion" :displayOpt="displayOpt" :showAlert="showAlert"  :publisher_name="'profile[daily_conversions_percentage]'" :publisher_val="publisherSettings.daily_conversions_percentage || ''" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Uniform Cap<help-box :content="helpTips.uniform_cap"></help-box></label>
                <div class="controls col-md-9">
                    <editable_text_publisher  class="inline-block" :editable_mode="'pop_up'" :onShown="onShowCapUniform" :showAlert="showAlert"  :publisher_name="'profile[daily_conversions]'" :publisher_val="publisherSettings.daily_conversions || ''" :renderPublisher="renderPublisher"></editable_text_publisher>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Contract Type</label>
                <div class="controls col-md-9">
                    {{publisherSettings.contract_type == 'b' ? 'To B' : (publisherSettings.contract_type == 'c' ? 'To C' : '' )}}
                </div>
            </div>

            <div class="control-group form-group" id="html_pixel_key">
                <label class="control-label col-md-3"><a data-value="global_pixel" data-type="ReBack">HTML Pixel</a>
                <help-box :content="helpTips.html_pixels"></help-box>
                </label>
                <div class="controls col-md-9">
                    <textarea id="html_pixel" class="form-control" v-model="html_pixel"></textarea>
                    <a href="#" class="btn save-btn" id="save_html_pixel" @click.prevent="saveHtmlPixel">Save Pixel</a>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Password</label>
                <div class="controls col-md-9">
                    <a href="#" class="btn" id="change_psw" @click.prevent="onChangePass">Change Password</a>
                    <span v-show="newPass">New Password is: <strong>{{newPass}}</strong></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import Vue from 'vue'

//import editable_textarea_publisher from '@/components/Editable_TextArea_Publisher.vue'
import EditableTextareaPublisher from '@/components/business/editable-textarea-publisher/'
import editable_text_publisher from '@/components/Editable_Text_Publisher.vue'
import commonDataAPI from '@/api/commonData'
import publisherAPI from '@/api/publisher'

/*const editable_select2_publisher = () => import(
 webpackChunkName: "editable_select2_publisher"  '@/components/Editable_Select2_Publisher.vue'
);*/
//import EditableSelect2Publisher from '../../components/editable-select2-publisher/'
const EditableSelect2Publisher = () => import(
/* webpackChunkName: "EditableSelect2Publisher" */ '../../components/editable-select2-publisher/'
);
/*const switch_publisher = () => import(
 webpackChunkName: "switch_publisher"  '@/components/Switch_Publisher.vue'
);*/
const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
const AdvancedGlobalPixel = () => import(
/* webpackChunkName: "AdvancedGlobalPixel" */ '@/components/business/advanced-global-pixel/'
);
const editable_select2_publisher_referred = () => import(
/* webpackChunkName: "editable_select2_publisher_referred" */ '@/components/Editable_Select2_Publisher_Referred.vue'
);
const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');

import PixelURL from '@/util/pixelURL'

let EventProxy = require('eventproxy');
let ep = new EventProxy()

export default {
    data(){
        return {
                publisherSettings:{},
                renderPublisher:false,
                sourceAM:[],
                newPass:"",
                html_pixel:"",
                loadingZone:"",
                aff_id:this.$route.query.id,
                tracking_link:{},
                is_manual_hide_conv: 0,
                sourceStatus:[{"id":"active","text":"Active"},{"id":"pending","text":"Pending"},{"id":"deleted","text":"Delete"}],
                sourceGrade:[{"id":"","text":""},{"id":"level1","text":"level1"},{"id":"level2","text":"level2"}],
                sourceAccountType:[
                    {"id":"Publisher/Developer","text":"Publisher/Developer"},
                    {"id":"Media Buyer","text":"Media Buyer"},
                    {"id":"Ad Network","text":"Ad Network"},
                    {"id":"Network","text":"Affiliate Network"}],
                helpTips : {
                    'tracking_domain' : 'Setting the individual domain of tracking link for this publisher, it default to be “global.ymtracking.com”.',
                    'relocate': 'Default No, YES to set redirect traffic here.',
                    'global_pixel_type': 'Simple：Default mode, use Global Pixel as the post back url for this affiliate.</br>Advanced: Choose this mode to post back conversions to affiliate when micro that required are not in token list. Pixel Url, Request Methods and Headers should be provided by affiliate side. </br>',
                    'hide_conversion' : 'Set CC of conversions at affiliate level</br>Notice: If you set publisher’s CC both at publisher page and individual offer page, cc in offer page will take effect.',
                    'hide_payout' : 'Set a proportion for this affiliate’s payout. For example, PM set 10% hide payout ,meanwhile AM set offer’s default payout as 100, so this this affiliate will see that payout for him is 90.',
                    'proportion_cap' : 'Set a publisher level cap for offers with a fixed cap.',
                    'uniform_cap': 'Set a publisher level cap for offers with open cap.',
                    'html_pixels': 'Set affiliate post back in HTML format according to affiliate requirement. It should be provided by affiliate.'

                },
                defaultApi:"Affiliate/edit"
            }
    },
    computed: {
    },
    components:{EditableSelect2Publisher, editable_text_publisher, EditableTextareaPublisher,CommonSwitch, AdvancedGlobalPixel, editable_select2_publisher_referred,HelpBox},
    methods: {
        customParam() {
            var query = {}
            query.aff_id = this.aff_id
            return query
        },
        validatorParentID2(value) {
            if (value == $('#parent_id').editable('getValue').parent_id) {
                return 'Account Manager can not be same as Second Account Manager';
            }
        },
        validatorParentID(value) {
            if (value == $('#parent_id2').editable('getValue')['profile[parent_id2]']) {
                return 'Account Manager can not be same as Second Account Manager';
            }
        },
        customDomainParam(params){
            let that = this
            let _params = {
                id:params.pk
            }
            var index = that.tracking_link.track_domain.indexOf("//")
            var http_prefix = index === -1 ? "" : that.tracking_link.track_domain.substr(0,index+2)
            _params[params.name] = http_prefix + params.value;
            return _params
        },
        onShowHideConv($el){
            if (!$el.find(".editable_append").length){
                $el.find(".editable-input").before("<span class='editable_append'>Hide</span>")
                $el.find(".editable-input").after("<span class='editable_append'>Conversion</span>")
            }
        },
        onShowHidePayout($el){
            if (!$el.find(".editable_append").length){
                $el.find(".editable-input").before("<span class='editable_append'>Hide</span>")
                $el.find(".editable-input").after("<span class='editable_append'>Payout</span>")
            }
        },
        onShowCapProportion($el){
            if (!$el.find(".editable_append").length){
                $el.find(".editable-input").before("<span class='editable_append'>Proportion</span>")
                $el.find(".editable-input").after("<span class='editable_append'>%</span>")
            }
        },
        onShowCapUniform($el){
            if (!$el.find(".editable_append").length){
                $el.find(".editable-input").before("<span class='editable_append'>Daily Conversion</span>")
            }
        },
        onChangePass(){
            let that = this 
            let newPass  = _.generate_password()
            Vue.http.post('Affiliate/edit',{id:this.$route.query.id, password: newPass}).then(response => {
                that.newPass  = newPass
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        saveHtmlPixel(){
            Vue.http.post('Affiliate/edit',{id:this.$route.query.id, 'profile[html_pixel]': this.html_pixel}).then(response => {
                this.showAlert("success!!","success")
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        onAdvancedPixelSuccess(value, param){
            let that = this
            Vue.http.post('Pixel/setUseAdvancedPixel',{aff_id:this.$route.query.id, 'use_advanced_pixel': value}).then(response => {
                this.showAlert("success!","success")
                that.publisherSettings['useAdvancedPixel'] = value
            }, response => {
                this.$store.dispatch('updateSwitchInfo', {[param]: value == 1 ? 0 : 1})
                this.showAlert(response.body.msg)
            })
        },
        onHideConversionSuccess(params, newval){
            this.is_manual_hide_conv = newval
        },
        showLoading() {
            this.loadingZone = true;
        },
        hideLoading(){
            this.loadingZone = false;
        },
        displayOpt:function(value, sourceData ,$el) {
            if (value !== "") {
                if ($el.attr("data-name") === 'profile[tuning_percentage]' || $el.attr("data-name") === 'profile[tuning_payout_percentage]' || $el.attr("data-name") === 'profile[daily_conversions_percentage]') {
                    $el.html(value + '%');
                }
            }
        },
        onShownGlobalPixel: function($elm, e, editable, newval){
            window.pixel_url_globalPixel.onShown($elm, e, editable, newval || this.publisherSettings.global_pixel)
        },
        onShownRejectConvPixel($elm, e, editable, newval) {
            window.pixel_url_rejectConvPixel.onShown($elm, e, editable, newval || this.publisherSettings.reject_conv_pixel)
        },
        getCustomParamGlobalPixel(params, $editable){
            let new_params = {id: params.pk}
            new_params['profile[global_pixel]'] = pixel_url_globalPixel.getNewValue()
            return new_params
        },
        getCustomParamRejectConvPixel(params, $editable) {
            let new_params = {id: params.pk}
            new_params['profile[reject_conv_pixel]'] = pixel_url_rejectConvPixel.getNewValue()
            return new_params
        },
        validateCC(new_value) {
             if (Number(new_value) != NaN) {
                if (new_value >= 0 && new_value <= 100) return ''
            }
            return 'This value is between 0 and 100';
        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    mounted() {
        window.pixel_url_globalPixel = PixelURL({
            tag: '#global_pixel_key',
            limit: 50
        });
        
        window.pixel_url_rejectConvPixel = PixelURL({
            tag: '#reject_conv_pixel_key',
            limit: 50
        });
    },
    created () {
        let that = this
        publisherAPI.getSettings({id:this.$route.query.id}, function(settings){

            ep.emit("publisherSettings", settings.data)
            that.html_pixel = settings.data.html_pixel

        })
        ep.all("am","publisherSettings", "tracking_link",function(am, publisherSettings, tracking_link){
            that.renderPublisher = true
            that.sourceAM = am
            that.publisherSettings = publisherSettings
            that.tracking_link = tracking_link

        })

        commonDataAPI.getManagerList(function(data){
            let source = data.map(function (c_obj) {
                return {id: c_obj.id, text: c_obj.id + ' - ' + c_obj.name + ' ' + c_obj.last_name};
            })
          ep.emit("am", source)
        })
        publisherAPI.getCurrentTrackLink({id:this.$route.query.id}, function(data){
          let _tracking_link = data.data || {}
          _tracking_link.tracking_domain_host = _tracking_link.track_domain && _tracking_link.track_domain.substr(7)
          ep.emit("tracking_link",_tracking_link )
        })

        this.$http.get('Affiliate/getAffQualityLevel',{params:{aff_id:this.$route.query.id}})
        .then(response => {
            that.is_manual_hide_conv = response.body.data[0] ? (response.body.data[0].is_manual_hide_conv ? parseInt(response.body.data[0].is_manual_hide_conv) : 0) : 0
        },(response => {
            
        }))

    }
}
</script>
<style >
.editableform .editable_append {
    display: inline-block;
    line-height: 30px;
    height: 30px;
    margin: 0 5px;
}
.setting_global_pixel .advanced {
    width: 100%
}
</style>
