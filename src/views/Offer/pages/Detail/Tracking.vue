<template>
<div v-yeah-loading='loadingZone'>
    <div class="box" ref="tracking_wrapper">
        <div class="box-header"  v-box-action-resize>
            <h2>Tracking</h2>
            <div class="box-action">
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
            </div>
        </div>
        <div class="box-container">
            <div class="box-content form-horizontal frm-entity frm-detail">
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Affiliate</label>
                    <div class="controls">
                        <chosen_container_offer :option0="option0" :chosenInfo="accessInfo" :chosenCallback="chosenCallback" :renderOffer="accessInfo"></chosen_container_offer>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2"><a data-value="tracking_domain" data-type="ReBack">Tracking Domain</a><help-box :content="helpTips.tracking_domain"></help-box></label>
                    <div class="controls">
                        <editable_text_offer data-offer-tracking-domain='true' :offer_class="'col-md-7'"  :showAlert="showAlert"  :offer_name="'offer_tracking_domain'" :offer_val="tracking_domain" :renderOffer="renderOffer" :onSuccess="onSuccess" :editable_modal_title="editable_modal_title" :editable_modal_body="editable_modal_body" :offer_api="tracking_domain_offer_api" :editable_confirm_btn="editable_confirm_btn" :action_type="api_action_type"></editable_text_offer>
                    </div>
                </div>
                <div class="control-group form-group input-append">
                    <label class="control-label col-md-2">Tracking Link<help-box :content="helpTips.tracking_link"></help-box></label>
                    <div class="controls">
                        <input class="col-md-6 uneditable-input normal-cursor  form-control pull-left" id="tracking_link" :value="tracking_link" @click="showPrompt(tracking_link)"></input><a class="btn token-toggle"  data-toggle="collapse" href="#collapseTrackingLink">Parameters</a>
                    </div>
                </div>

                <div class="control-group form-group" v-show="showAffIndDomain">
                    <label class="control-label col-md-2">Independent Domain<help-box :content="helpTips.independent_domain"></help-box></label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <div class="col-md-5 nopadding">
                            <input type="text" name="fetch_url" class="form-control " v-model="AffIndDomain">
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-primary " @click.prevent="saveLandingPage('landing')">Save</button>
                        </div>

                    </div>
                </div>
                <div class="control-group form-group  collapse" id="collapseTrackingLink">
                    <label class="control-label col-md-2">&nbsp;</label>
                    <div class="controls">
                        <p>aff_sub: Affiliate sub specified in the tracking link.</p>
                        <p>aff_sub2: Affiliate sub 2 specified in the tracking link.</p>
                        <p>aff_sub3: Affiliate sub 3 specified in the tracking link.</p>
                        <p>aff_sub4: Affiliate sub 4 specified in the tracking link.</p>
                        <p>aff_sub5: Affiliate sub 5 specified in the tracking link.</p>
                        <p>aff_sub6: Affiliate sub 6 specified in the tracking link.</p>
                        <p>aff_sub7: Affiliate sub 7 specified in the tracking link.</p>
                        <p>idfa: Apple's advertiser identifier of the traffic source.</p>
                        <p>android_id: The android id of the traffic source.</p>
                        <p>google_adv_id: Google's advertising identifier of the traffic source.</p>
                        <p>sub_affiliate_id: Sub affiliate id.</p>
                    </div>
                </div>
                <div class="control-group form-group" id="globalTypeShowWithAff"  v-show="aff_id != ''">
                    <label class="control-label col-md-2">Global Pixel Type</label>
                    <div class="controls col-md-10 nomargin nopadding">
                        <common-switch
                            :showAlert='showAlert'
                            :updateInfo="updateOfferInfo"
                            :default_val="is_use_advanced_pixel"
                            :switch_param='"use_advanced_pixel_aff"'
                            :render="render"
                            :yes_text="'Advanced'" 
                            :no_text="'Simple'"
                            :switchDefaultAPI="setUseAdvancedPixel"
                            :switchGetCustomParam="getCustomParamPixel"
                            :onSuccess="switchCallBack"
                        />
                        <advanced-global-pixel 
                            :advancedPixel="advancedPixel" 
                            :saveType="saveType" 
                            :aff_id="aff_id" 
                            :callBack="getConversionByAffId"  
                            :is_use_advanced_pixel="is_use_advanced_pixel" 
                            :showLoading="showLoading" 
                            :hideLoading="hideLoading" 
                            :showAlert="showAlert" 
                            :customParam="customParam">
                        </advanced-global-pixel>
                    </div>
                </div>
                <div class="control-group form-group" id="postback_pixel_control" v-show="!is_use_advanced_pixel">
                    <label class="control-label col-md-2">Postback Pixel<help-box :content="helpTips.postback_pixel"></help-box></label>
                    <div class="controls col-md-10 nopadding">
                        <editable-textarea-offer :offer_class="'span6'"  :savenochange="true" :showAlert="showAlert"   :onShown="onShown" :maxlength="1000" :offer_name="'conversion_url'" :getCustomParam="getCustomParam" :offer_val="conversion_url" :renderOffer="renderOffer" :editable_id="'postback_pixel'" :onSuccess="onPostbackPixelSuccess" :offer_api="pixel_offer_api" :editable_disable="editable_disable"></editable-textarea-offer>
                        <a class="token-list-toggle"  data-toggle="collapse" href="#collapseTokenList" >View token list</a>
                    </div>
                </div>
                <div class="control-group form-group  collapse" id="collapseTokenList">
                    <label class="control-label col-md-2">&nbsp;</label>
                    <div class="controls col-md-10 nopadding">
                        <p>{offer_id} ID of offer.</p>
                        <p>{affiliate_id} or {aff_id} ID of affiliate.</p>
                        <p>{aff_sub} Affiliate sub specified in the tracking link.</p>
                        <p>{aff_sub2} Affiliate sub 2 specified in the tracking link.</p>
                        <p>{aff_sub3} Affiliate sub 3 specified in the tracking link.</p>
                        <p>{aff_sub4} Affiliate sub 4 specified in the tracking link.</p>
                        <p>{aff_sub5} Affiliate sub 5 specified in the tracking link.</p>
                        <p>{aff_sub6} Affiliate sub 6 specified in the tracking link.</p>
                        <p>{aff_sub7} Affiliate sub 7 specified in the tracking link.</p>
                        <p>{transaction_id} or {click_id} ID of the transaction for your network. Don't get confused with an ID an affiliate passes into aff_sub.</p>
                        <p>{click_ip} IP address that started the tracking session.</p>
                        <p>{conv_ip} IP address that made the conversion request.</p>
                        <p>{datetime} Current date and time of conversion formatted as YYYY-MM-DD HH:MM:SS.</p>
                        <p>{ran} Randomly generated number.</p>
                        <p>{payout} Amount paid to affiliate for conversion.</p>
                        <p>{device_brand} For mobile app tracking, the brand name of the mobile device (example: Apple).</p>
                        <p>{device_model} For mobile app tracking, the model of the mobile device (example: iPhone).</p>
                        <p>{device_os} For mobile app tracking, the operating system of the device version (example:10.11.2).</p>
                        <p>{idfa} Apple's advertiser identifier with iOS 6+.</p>
                        <p>{android_id} For Android devices only.</p>
                        <p>{google_adv_id} Google's advertising identifier.</p>
                        <p>{sub_affiliate_id} Sub affiliate id.</p>
                    </div>
                </div>
                <div class="control-group form-group" id="html_pixel_key">
                    <label class="control-label col-md-2"><a data-value="global_pixel" data-type="ReBack">HTML Pixel</a><help-box :content="helpTips.html_pixel"></help-box>
                    </label>
                    <div class="controls">
                        <textarea id="html_pixel" class="col-md-6 form-control mr20" data-type='text' v-model="pixel"></textarea>
                        <a href="#" class="btn save-btn" id="save_html_pixel" @click.prevent="saveHtmlPixel">Save Pixel</a>
                    </div>
                </div>
                <div class="control-group form-group " v-show="aff_id && offerInfo.offer_type === 'cps'" id="event_pixel_container">
                    <label class="control-label col-md-2"><a data-value="global_pixel" data-type="ReBack">Event Pixel</a>
                    </label>

                    <div class="event_pixel_box">
                        <div class="type-action">
                            <button class="btn btn-primary btn-submit" type="submit" id="save_event_pixel_btn" data-type="offer_id" @click="saveEventPixel"><i class="icon-ok icon-white"></i></button>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-md-2" for="event_select">Event</label>
                            <div>
                                <select class="col-md-6 form-control" id="event_select" @change="onChangeEvent" v-model="event_select">
                                    <option v-for="item in eventPixel" :value="item.event">{{item.event}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" >
                            <label class="control-label col-md-2">HTMl Pixel</label>
                            <textarea id="event_html_pixel" class="col-md-6 form-control" :value="event_selected.html_pixel"></textarea>
                        </div>

                        <div class="form-group" id="event_postback_pixel_control">
                            <label class="control-label col-md-2">Postback Pixel</label>
                            <input class="col-md-6" id="event_postback_pixel" maxlength="800" type="text"   :value="event_selected.postback_pixel" />
                        </div>
                    </div>
                </div>
                <div class="control-group form-group">
                    <label class="control-label col-md-2">Advertiser Conversion White List<help-box :content="helpTips.advertiser_conversion_white_list"></help-box></label>
                    <div class="controls col-md-10 nopadding">
                        <select style="float:left;width:280px" size="5" multiple="multiple" class="form-control" id="adv_white_list" data-control-name="bt-select">
                            <option :value="x" v-for="x in adv_white_list"> {{ x }}</option>
                        </select>
                    </div>
                </div>

               <div class="control-group form-group">
                   <label class="control-label col-md-2">Offer Conversion White List<help-box :content="helpTips.offer_conversion_white_list"></help-box></label>
                   <!-- <offerConversionWhiteList :originIPS="new_ips" :showAlert="showAlert" :editConversionWhiteList="editConversionWhiteList" :ADVWHITEIP="ADVWHITEIP"></offerConversionWhiteList> -->
                   <conversion-white-list
                        :originIPS="new_ips" 
                        :showAlert="showAlert" 
                        :editConversionWhiteList="editConversionWhiteList" 
                        :ADVWHITEIP="ADVWHITEIP"
                    ></conversion-white-list>
               </div>
            </div>
        </div>

    </div>
</div>
</template>

<script>
import AdvancedGlobalPixel from '@/components/business/editable-textarea-offer/'
//import editable_textarea_offer from '@/components/Editable_TextArea_Offer.vue'
import EditableTextareaOffer from '@/components/business/editable-textarea-offer/'
//import multipleInputRow from "../@/components/MultipleInputRow.vue"
//import offerConversionWhiteList from '@/components/OfferConversionWhiteList.vue'
import PixelURL from '@/util/pixelURL'
import Vue from "vue"
import { trackingHelpTips } from '../../config/config'

const editable_text_offer = () => import(/* webpackChunkName: "editable_text_offer" */ '@/components/Editable_Text_Offer.vue');
const HelpBox = () => import(/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/');
const CommonSwitch = () => import(
/* webpackChunkName: "CommonSwitch" */ '@/components/common/common-switch/'
);
const ConversionWhiteList = () => import(
/* webpackChunkName: "ConversionWhiteList" */ '@/components/business/conversion-white-list/'
);

export default {
    data() {
        return {
            option0:'- Select an Affiliate -',
            aff_id:'',
            advancedPixel:'',
            is_use_advanced_pixel:'',
            saveType:'aff_id',
            loadingZone:false,
            conversion_url:"Empty",
            offer_id: this.$route.query.id,
            tracking_link:'',
            tracking_domain:'',
            pixel_offer_api:'Pixel/saveConversionUrl',
            setUseAdvancedPixel:"Pixel/setUseAdvancedPixel",
            editVal: [],
            editable_disable:true,
            editConversionWhiteList:'Offer2/editConversionWhiteList',
            adv_white_list:[],
            ADVWHITEIP: '',
            editable_modal_title:'Update Offer Tracking Domain',
            editable_modal_body:'Do you confirm this operation ?',
            editable_confirm_btn:'Confirm & Send Email',
            tracking_domain_offer_api:'Offer2/editOfferTrackingDomain',
            api_action_type:'get',
            is_writeable:0,
            accessInfo:[],
            pixel:"",
            eventPixel:[],
            event_select:"",
            event_selected:{},
            AffIndDomain:'',
            showAffIndDomain:false,
            helpTips:{},
            render:false
        }
    },
    props:{
      renderOffer:{default:false},
      offerInfo:{},
      showAlert:{},
      affAccessInfo:{},
      sourceAdv:{},
      setOfferEditAuth:{},
      updateOfferInfo:{}
    },
    computed:{
        new_ips() {
            return this.offerInfo && this.offerInfo.offer_white_ip && this.offerInfo.offer_white_ip.split(',') || []
        },
    },
    watch:{
        /*aff_id(newVal, oldVal) {
            this.getConversionByAffId()
            this.getCurrentTrackLink()
        },*/
        renderOffer(newVal, oldVal) {
            this.tracking_domain = this.offerInfo.tracking_domain
            if (newVal) {
                this.render_adv_white_list()
                this.is_writeable = this.offerInfo.is_writeable
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.tracking_wrapper)
                })
            }
        },
        affAccessInfo(newVal, oldVal) {
           if (newVal) {
                this.getAccessInfo()
                this.$nextTick(function () {
                    this.setOfferEditAuth(this.$refs.tracking_wrapper)
                })
            } 
        },
    },
    components: { AdvancedGlobalPixel, editable_text_offer, ConversionWhiteList, EditableTextareaOffer,HelpBox,CommonSwitch },
    methods: {
        customParam() {
            var query = {}
            query.aff_id = this.aff_id
            query.offer_id = this.offer_id
            return query
        },
        getAccessInfo(){
            if ('status' in this.offerInfo && this.offerInfo.status == 'pending') {
                this.accessInfo = [{id:'1', name: 'YeahMobi', text: 'YeahMobi'}]
            } else {
                var approved = this.affAccessInfo && this.affAccessInfo.approved || []
                approved = approved.map(function(c_obj) {
                    var text =  c_obj.id + ' - ' + (c_obj.first_name || '') +  ' ' + (c_obj.last_name || '') + ' - ' + c_obj.pm;
                    var name = (c_obj.first_name || '') +  ' ' + (c_obj.last_name|| '');
                    return { id: c_obj.id, name: name, text:text};
                })
                this.accessInfo = approved
            }
        },
        render_adv_white_list() {
            var that = this;
            var this_adv = _.findIndex(that.sourceAdv, function(o) { return o.id == that.offerInfo.advertiser_id });
            var advertiser = that.offerInfo.advertiser || [];
            var length = advertiser.length
            this_adv = that.sourceAdv[this_adv] && that.sourceAdv[this_adv].text || '';
            for (var w = 0; w < length; w++) {
                if (advertiser[w].company == this_adv) {
                    var result_adv_ip = that.ADVWHITEIP = advertiser[w].advertiser_white_ip.split(',');
                    if (result_adv_ip[0]) {
                        that.adv_white_list = result_adv_ip
                    }
                    break;
                }
            }
        },
        onPostbackPixelSuccess(val, _params) {
            this.conversion_url = _params.conversion_url
        },
        showPrompt:function(val){
            window.prompt('Press CTRL+C, then ENTER', val);
        },
        getCustomParam (params, $editable){
            let new_params = {offer_id: params.pk}
            new_params.aff_id = this.aff_id;
            new_params.conversion_url = pixel_url.getNewValue()
            return new_params
        },
        getCustomParamPixel(params, value){
            let new_params = {offer_id: this.$route.query.id}
            new_params.aff_id = this.aff_id;
            new_params.use_advanced_pixel = value
            return new_params
        },
        onChangeEvent($event){
            this.event_selected = _.find(this.eventPixel, {"event":this.event_select}) || {}
        },
        updateEventPixel(params){
            let  index = _.findIndex(this.eventPixel, {"event":params.event})
            let that = this
            _.map(params, function(val, key) {
                that.eventPixel[index][key] = val
            })
        },
        saveHtmlPixel(){
            var that = this
            if(!that.aff_id) {
                 that.showAlert("Please select a affiliate first.")
                 return;
            }
            that.showLoading()
            var params = {
                passport_id: that.aff_id,
                offer_id: that.offer_id,
                pixel:that.pixel
            }
            Vue.http.post('Pixel/saveHtmlPixel', params).then(response => {
                that.showAlert("Success!", "success")
                that.hideLoading()
            }, response => {
                // error callback
                that.showAlert(response.body.msg)
                that.hideLoading()
            })
        },
        saveEventPixel(){
            var that = this
            if(!that.event_select) {
                 that.showAlert("Please select a event first.")
                 return;
            }
            var params = {
                passport_id: that.aff_id,
                offer_id: that.offer_id,
                event:that.event_select,
                html_pixel:$("#event_html_pixel").val(),
                postback_pixel:$("#event_postback_pixel").val()
            }
            that.showLoading()
            Vue.http.post('Pixel/saveEventPixel', params).then(response => {
                that.showAlert("Success!", "success")
                that.hideLoading()
                that.updateEventPixel(params)
            }, response => {
                // error callback
                that.hideLoading()
                that.showAlert(response.body.msg)
            })
        },
        showLoading() {
            this.loadingZone = true;
        },
        hideLoading(){
            this.loadingZone = false;
        },
        calcu_tracking_link(union) {
            var tracking_link = (union.track_domain.match(/^https*:\/\//gi) ? "" : "http://") + union.track_domain + (union.track_domain.match(/\/$/) ? "" : "/") + union.click_handler + '?' + union.offer_id_key + '=' + this.offer_id + '&' + union.aff_id_key + '=' + this.aff_id
            return tracking_link
        },
        getConversionByAffId() {
            let that = this
            var query = {
                aff_id: that.aff_id,
                offer_id: that.offer_id
            }
            Vue.http.get('Pixel/getConversionByAffId', {params: query}).then(response => {
                var data = response.body && response.body.data
                that.advancedPixel = data && data.advancedPixel
                that.is_use_advanced_pixel = data && data.useAdvancedPixel
                that.conversion_url = data && data.url 
                that.eventPixel = data && data.eventPixel || []
                that.pixel = data && data.html_pixel
                that.event_selected = that.eventPixel && that.eventPixel[0] || {}
                that.event_select = that.event_selected && that.event_selected.event || {}
                that.render = true
            }, response => {
                // error callback
            })
        },
        onShown: function($elm, e, editable){
            window.pixel_url.onShown($elm, e, editable, this.conversion_url)
        },
        getCurrentTrackLink() {
            var that = this
            var query = {
                id: that.aff_id,
                offer_id: that.offer_id
            }
            Vue.http.get('Union/getCurrentTrackLink', {params: query}).then(response => {
                var union = response && response.body && response.body.data;
                if (that.aff_id) {
                    var tracking_link = that.calcu_tracking_link(union)
                    that.tracking_link = tracking_link
                }
                that.tracking_domain = union.track_domain
            }, response => {
                // error callback
            })
        },
        switchCallBack(param,value){
            this.is_use_advanced_pixel = value
        },
        chosenCallback(v,text){
            this.aff_id = v
            this.getConversionByAffId()
            this.getCurrentTrackLink()
            if (v) {
                this.editable_disable = false
                this.showAffIndDomain = true
                this.getAffIndDomain()
            }
        },
        getAffIndDomain() {
            var query = {
                offer_id:this.offer_id,
                aff_id:this.aff_id,
            }
            Vue.http.get('Offer2/getAffIndDomain', {params: query}).then(response => {
                var data = response.body && response.body.data && response.body.data.domain
                this.AffIndDomain = data || ''
            }, response => {
                // error callback
            })
        },
        saveLandingPage() {
            this.showLoading()
            if (!this.checkUrl(this.AffIndDomain)){
                this.showAlert('URL format error!', 'info');
                this.hideLoading()
                return false;
            }
            var query = {
                offer_id:this.offer_id,
                aff_id:this.aff_id,
                domain:this.AffIndDomain
            }
            Vue.http.post('Offer2/saveAffIndDomain', query).then(response => {
                this.showAlert("Success!", "success")
                this.hideLoading()
            }, response => {
                this.showAlert(response.body.msg)
                this.hideLoading()
            })
        },
        onSuccess() {
            this.getConversionByAffId()
            this.getCurrentTrackLink()
        },
        checkUrl(str) {
            var RegUrl = new RegExp();
            RegUrl.compile("[a-zA-z]+://[^s]*");
            if (str != '' && !RegUrl.test(str)) {
                return false;
            }
            return true;
        },
    },
    created() {
        this.helpTips = trackingHelpTips
    },
    mounted() {
        window.pixel_url = PixelURL({
            tag: '#postback_pixel',
            limit: 50
        });
    }
}
</script>

<style scoped>
.ms-container {
        min-width: 100%;
    margin: 0 auto;
    background: none;
}
.event_pixel_box{
    background: transparent;
    border-radius: 5px;
    border: 1px #ddd solid;
    padding: 10px 10px 0 10px;
    position: relative;
    margin: 10px;
    width: 60%;
    display: inline-block;
}
.ms-container select {
    width: 100%;
}

.select_block {
    margin: 0 auto 20px;
    min-width: 100%;
    padding-left: 15px;
}

.ms-container option {
    border-bottom: 1px #eee solid;
    padding: 2px 10px;
    color: #555;
    font-size: 13px;
    height: 26px;
    line-height: 26px;
}
.ms-container option:hover {
    color: #fff;
}
.ms-container .ms-selection {
    background: transparent;
    width: 32%;
}
.ms-container .ms-selection:last-child{
    margin-left: 0;
}
a.token-list-toggle {
    background: none;
    color: blue;
    text-decoration: underline;
}



</style>
