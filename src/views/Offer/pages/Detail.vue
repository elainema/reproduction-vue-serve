<template>
<div>
    <div ref="offerDetailWraper" id="offerDetailWraper">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li><router-link to="./">Home</router-link></li>
                <li><router-link to="./p_offers">Offers</router-link></li>
                <li>Offer Management</li>
            </ul>
        </div>
            
        <div class="toTop hide-normal" id="toTop"><a href="#" title=""><i class="fa fa-angle-up" aria-hidden="true"></i></a>
        </div>

        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
        
        <nav id="myScrollspy" class="navbar navbar-default" :style="!visible ? {top:0}: ''">
            <ul class="nav navbar-nav pull-left">
                <li :class="{active:activeMenu == 'submodule_offer'}" @click="scrollTo('submodule_offer')">Offer</li>
                <li :class="{active:activeMenu == 'submodule_kpi_setting'}" @click="scrollTo('submodule_kpi_setting')" v-if="renderOffer">KPI Setting</li>
                <li :class="{active:activeMenu == 'submodule_payment'}" @click="scrollTo('submodule_payment')">Payment</li>
                <li :class="{active:activeMenu == 'submodule_basic'}" @click="scrollTo('submodule_basic')">Basic</li>
                <li :class="{active:activeMenu == 'submodule_landing_page'}" @click="scrollTo('submodule_landing_page')" v-if="renderOffer && offerInfo && offerInfo.unique_key && offerInfo.unique_key.unique_key && offerInfo.advertiser_id">Landing Page</li>
                <li :class="{active:activeMenu == 'submodule_aff_access'}" @click="scrollTo('submodule_aff_access')">Affiliate Access</li>
                <li :class="{active:activeMenu == 'submodule_app_access'}" @click="scrollTo('submodule_app_access')">App Access</li>
                <li :class="{active:activeMenu == 'submodule_blend_traffic'}" @click="scrollTo('submodule_blend_traffic')" v-if="userInfo.is_allow_blend_ops && renderOffer">Blend Traffic</li>
                <li :class="{active:activeMenu == 'submodule_tracking'}" @click="scrollTo('submodule_tracking')">Tracking</li>
                <li :class="{active:activeMenu == 'submodule_targeting'}" @click="scrollTo('submodule_targeting')">Targeting</li>
                <li :class="{active:activeMenu == 'submodule_creativeCertificate'}" @click="scrollTo('submodule_creativeCertificate')">Certificate</li>
                <li :class="{active:activeMenu == 'submodule_creativeFiles'}" @click="scrollTo('submodule_creativeFiles')">Creative Files</li>
            </ul>
        </nav>

        <div id="scroll">
            <div v-scrollWatch="{name:'submodule_offer',offset:0,callback:spyDomChange}" id="submodule_offer"> 
                <submodule_offer 
                    :renderOffer="submodule_offer" 
                    :sourceAdv="sourceAdv" 
                    :offerInfo="offerInfo" 
                    :showAlert="showAlert" 
                    :setOfferEditAuth="setOfferEditAuth"
                    :updateOfferInfo="updateOfferInfo" 
                ></submodule_offer>
            </div>
            
            <div v-scrollWatch="{name:'submodule_kpi_setting',offset:0,callback:spyDomChange}" id="submodule_kpi_setting">
                <submodule_kpi_setting  
                    v-if="renderOffer"  
                    :renderOffer="renderOffer" 
                    :offerInfo="offerInfo" 
                    :ocpaData="ocpaData" 
                    :showAlert="showAlert"
                    :setOfferEditAuth="setOfferEditAuth"
                    :offerKpiSettingEvents = "offerKpiSettingData.events">
                </submodule_kpi_setting>
            </div>
            
            <div v-scrollWatch="{name:'submodule_payment',offset:0,callback:spyDomChange}" id="submodule_payment">
                <submodule_payment
                   :updateOfferInfo="updateOfferInfo" 
                   :renderOffer="submodule_payment" 
                   :activeUser="activeUsers" 
                   :appAccessInfo="appAccessInfo" 
                   :offerInfo="offerInfo" 
                   :showAlert="showAlert" 
                   :affAccessInfo="affAccessInfo" 
                   :payoutAndCapsInfo="publisherPayoutAndCapsInfo" 
                   :appPayoutInfo="publisherAppPayoutAndCapsInfo" 
                   :GBP_CURRENCY="GBP_CURRENCY" 
                   :EUR_CURRENCY="EUR_CURRENCY" 
                   :getPayoutAndCapsByOfferId="getPayoutAndCapsByOfferId"  
                   :userInfo="userInfo"
                   :getAppPayoutAndCaps="getAppPayoutAndCaps"
                   :setOfferEditAuth="setOfferEditAuth"
                   :editCancel="editCancel"
                ></submodule_payment>
            </div>
            
            <div v-scrollWatch="{name:'submodule_basic',offset:0,callback:spyDomChange}" id="submodule_basic">
               <submodule_basic
                  :updateOfferInfo="updateOfferInfo"
                  :renderOffer="submodule_basic" 
                  :ocpaData="ocpaData" 
                  :userInfo="userInfo" 
                  :activeUser="activeUsers" 
                  :sourceCat="sourceCat" 
                  :offerInfo="offerInfo" 
                  :showAlert="showAlert" 
                  :currentTrackLink="currentTrackLink" 
                  :sourceTraffics="sourceTraffics" 
                  :sourceConversionFlow="sourceConversionFlow" 
                  :offerExpirationAction="offerExpirationAction"
                  :setOfferEditAuth="setOfferEditAuth" 
                  :integratedSource = "offerKpiSettingData.source"
                  :isIntegrated = "offerKpiSettingData.is_integrated"
                  :fetchOcpaInfo = 'fetchOcpaInfo'
                  :editCancel="editCancel"
               ></submodule_basic>
            </div>
            
            <div v-scrollWatch="{name:'submodule_landing_page',offset:0,callback:spyDomChange}" id="submodule_landing_page">
              <submodule_landing_page
                  v-if="renderOffer && offerInfo.unique_key && offerInfo.unique_key.unique_key && offerInfo.advertiser_id"  
                  :renderOffer="renderOffer" 
                  :showAlert="showAlert" 
                  :offerInfo="offerInfo"
                  :setOfferEditAuth="setOfferEditAuth" 
              ></submodule_landing_page>
            </div>
            
            <div v-scrollWatch="{name:'submodule_aff_access',offset:0,callback:spyDomChange}" id="submodule_aff_access">
               <submodule_aff_access 
                    :refresh_aff_access="refresh_aff_access" 
                    :renderOffer="renderOffer" 
                    :showAlert="showAlert" 
                    :offerInfo="offerInfo"
                    :setOfferEditAuth="setOfferEditAuth" 
               ></submodule_aff_access>
            </div>
                       
            <div v-scrollWatch="{name:'submodule_app_access',offset:0,callback:spyDomChange}" id="submodule_app_access">
               <submodule_app_access 
                    :onAppAccessChanged="onAppAccessChanged" 
                    :refresh_app_access="refresh_app_access" 
                    :renderOffer="renderOffer" 
                    :affAccessInfo="activeUsers" 
                    :showAlert="showAlert"
                    :setOfferEditAuth="setOfferEditAuth" 
               ></submodule_app_access>
            </div>
            
            <div v-scrollWatch="{name:'submodule_blend_traffic',offset:0,callback:spyDomChange}" id="submodule_blend_traffic">
               <submodule_blend_traffic 
                    v-show="userInfo.is_allow_blend_ops && renderOffer"
                    :offerInfo="offerInfo" 
                    :showAlert="showAlert" 
                    :renderOffer="renderOffer" 
                    :affAccessInfo="affAccessInfo"
                    :appAccessInfo="appAccessInfo" 
                    :ocpaData="ocpaData"
                    :setOfferEditAuth="setOfferEditAuth" 
                    :offerKpiSettingEvents = "offerKpiSettingData.events"
               ></submodule_blend_traffic>
            </div>
                       
            <div v-scrollWatch="{name:'submodule_tracking',offset:0,callback:spyDomChange}" id="submodule_tracking">
               <submodule_tracking 
                    :renderOffer="renderOffer" 
                    :offerInfo="offerInfo" 
                    :affAccessInfo="affAccessInfo" 
                    :sourceAdv="sourceAdv" 
                    :showAlert="showAlert"
                    :setOfferEditAuth="setOfferEditAuth"
                    :updateOfferInfo="updateOfferInfo"
               ></submodule_tracking>
            </div>

           <div v-scrollWatch="{name:'submodule_targeting',offset:0,callback:spyDomChange}" id="submodule_targeting">
               <submodule_targeting  
                  :renderOffer="submodule_targeting" 
                  :parseCombinedModel="parseCombinedModel"  
                  :sourcePlatform="sourcePlatform" 
                  :sourceDeviceOS="sourceDeviceOS" 
                  :sourceStates="sourceStates" 
                  :sourceDeviceModels="sourceDeviceModels" 
                  :deviceModels="deviceModels" 
                  :offerInfo="offerInfo" 
                  :showAlert="showAlert" 
                  :userInfo="userInfo" 
                  :geoTargeting="geoTargeting" 
                  :platformTargeting="platformTargeting" 
                  :Carriers="Carriers"
                  :setOfferEditAuth="setOfferEditAuth"
               ></submodule_targeting>
           </div> 
           
           <div v-scrollWatch="{name:'submodule_creativeCertificate',offset:0,callback:spyDomChange}" id="submodule_creativeCertificate">
              <submodule_creativeCertificate 
                  :showAlert="showAlert" 
                  :renderOffer="renderOffer"
                  :setOfferEditAuth="setOfferEditAuth"
              ></submodule_creativeCertificate>
           </div>
           
           <div v-scrollWatch="{name:'submodule_creativeFiles',offset:0,callback:spyDomChange}" id="submodule_creativeFiles">
              <submodule_creativeFiles 
                  :showAlert="showAlert" 
                  :renderOffer="renderOffer"
                  :setOfferEditAuth="setOfferEditAuth"
              ></submodule_creativeFiles>
           </div>

        </div>

    </div> 
</div>
</template>
<script>
import Vue from "vue"
import { mapGetters, mapActions } from 'vuex'

import {setReadOnlyFactory, setReadOnly} from '@/util/offerDetail'

import commonDataAPI from '@/api/commonData'
import offerAPI from '@/api/offer'
import mixin_alert_msg from '@/mixins/alert_msg'
import mixin_switch from '@/mixins/switch'
import submodule_offer from "./Detail/Offer.vue"
import submodule_payment from "./Detail/Payment.vue"
import submodule_basic from "./Detail/Basic.vue"
import submodule_targeting from "./Detail/Targeting.vue"
import submodule_pyament from "./Detail/Payment.vue"
import submodule_app_access from "./Detail/App_Access.vue"
import submodule_tracking from './Detail/Tracking.vue'
import submodule_aff_access from './Detail/Affiliate_Access.vue'
import submodule_landing_page from './Detail/Landing_Page.vue'
import submodule_blend_traffic from './Detail/Blend_Traffic.vue'
import scrollWatch from "vue-scrollwatch"
const submodule_creativeFiles = () => import(
/* webpackChunkName: "submodule_creativeFiles" */ './Detail/Creative_Files.vue'
);
const AlertPop = () => import(
/* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/'
);
const submodule_kpi_setting = () => import(
/* webpackChunkName: "submodule_kpi_setting" */ './Detail/KPI_Setting.vue'
);
const submodule_creativeCertificate = () => import(
/* webpackChunkName: "submodule_creativeCertificate" */ './Detail/Creative_Certificate.vue'
);



Vue.use(scrollWatch)


export default {
    data () {
        return {
            activeMenu: '',
            visible:true,
            alertMsg:"",
            alertType:"info",
            alertPop:"hide",
            sourceAdv:"",
            sourceCat:"",
            sourcePlatform:"",
            sourceDeviceOS:"",
            sourceCounries:"",
            sourceDeviceModels:'',
            sourceStates:'',
            sourceTraffics:'',
            renderOffer:false,
            currentTrackLink:{},
            GBP_CURRENCY:"1.6418",
            EUR_CURRENCY:"1.3669",
            payoutAndCapsInfo:[],
            appPayoutInfo:[],
            deviceModels:"",
            geoTargeting:'',
            platformTargeting:'',
            Carriers:'',
            id:this.$route.query.id,
            sourceAdvIdent:[{"id":"","text":"empty"},{"id":"googleAdvId","text":"gaid"},{"id":"idfa","text":"idfa"}],
            affAccessParam: {offer_id:this.$route.query.id},
            appAccessParam: {offer_id:this.$route.query.id},
            activeUsers:[],
            sourceConversionFlow:"",
            offerExpirationAction:{},
            offerKpiSettingData: {
                events: [],
                source: null
            },

            submodule_targeting:false,
            submodule_offer:false,
            submodule_basic:false,
            submodule_payment:false,
            initcarriers:'',
            map:{
                submodule_targeting:{
                  sourcePlatform:'',
                  Carriers:'',
                  sourceStates:'',
                  sourceDeviceOS:'',
                  sourceDeviceModels:'',
                  deviceModels:'',
                  geoTargeting:'',
                  platformTargeting:''
                },
                submodule_offer:{
                  sourceAdv:'',
                  offerInfo:''
                },
                submodule_basic:{
                  offerInfo:'',
                  sourceAdv:'',
                  sourceTraffics:'',
                  sourceCat:'',
                  sourceConversionFlow:'',
                },
                submodule_payment:{
                  offerInfo:'',
                  appPayoutInfo:'',
                  payoutAndCapsInfo:'',
                }
            }

        }
    },
    mixins: [mixin_alert_msg,mixin_switch],    
    components: {AlertPop, submodule_creativeFiles, submodule_creativeCertificate, submodule_offer, submodule_payment, submodule_basic, submodule_targeting, submodule_app_access, submodule_tracking, submodule_aff_access, submodule_landing_page, submodule_kpi_setting,submodule_blend_traffic},
    watch:{
      'map.submodule_targeting': {
          handler:function (val,oldVal){
            this.checkIfStartRender('submodule_targeting')
          },
          deep:true
      },
      'map.submodule_offer': {
          handler:function (val,oldVal){
            this.checkIfStartRender('submodule_offer')
          },
          deep:true
      },
      'map.submodule_basic': {
          handler:function (val,oldVal){
            this.checkIfStartRender('submodule_basic')
          },
          deep:true
      },
      'map.submodule_payment': {
          handler:function (val,oldVal){
            this.checkIfStartRender('submodule_payment')
          },
          deep:true
      },

    },
    methods: {
        ...mapActions([
          'getOfferInfo',
          'getAffAccess',
          'getActiveUser',
          'getAppAccess',
          'getOCPAInfo',
          'fetchAppPayoutAndCaps',
          'fetchPayoutAndCaps'
        ]),
        updateOfferInfo(query) {
          var update = {}
          _.map(query, function(v,k){
              if (k != 'method' && k != 'id') {
                  if(k === "is_dynamic_revenue") v = v
                  update[''+k] = v;
              }
              if (k == 'is_quality' ) {
                  update.is_quality_rating = v;
              }
          })
          this.$store.dispatch('setOfferInfo', update)
        },
        checkIfStartRender(module) {
          let vm = this
          var passed = Object.keys(vm.map[module]).every((element, index) => {
            return vm.map[module][element]
          });
          vm[module] = passed
        },
        initActiveUser() {
            let activeUser = this.activeUser || []
            this.activeUsers = activeUser.map(function(c_obj) {
                var pm = c_obj.pm ? (' - ' + c_obj.pm) :'';
                var text =  c_obj.id + ' - ' + (c_obj.firstName || '') +  ' ' + (c_obj.lastName || '')  + pm;
                var name = (c_obj.firstName || '') +  ' ' + (c_obj.lastName|| '');
                return { id: c_obj.id, name: name, text:text};
            })
        },
        onAppAccessChanged(){
        },
        hideAlertPop:function() {
          this.alertPop = "hide"
        },
        getPayoutAndCapsByOfferId:function(newData) {
            let that = this
            if (newData && Object.prototype.toString.call(newData)  === '[object Array]') {
              that.$store.dispatch('payoutAndCapsInfoUpdate', newData)
            } else {
              that.fetchPayoutAndCaps({id:that.$route.query.id, cb:function(data){
                that.callAPIAndSetFlag('payoutAndCapsInfo')
              }})
            }
        },
        getAppPayoutAndCaps:function(newData){
            let that = this
            if (newData && Object.prototype.toString.call(newData)  === '[object Array]') {
              that.$store.dispatch('AppPayoutAndCapsUpdate', newData)
            } else {
              that.fetchAppPayoutAndCaps({id:that.$route.query.id, cb:function(data){
                that.callAPIAndSetFlag('appPayoutInfo')
              }})
            }
        },
        setOfferEditAuth(dom){
           if(this.offerInfo.is_writeable === 0 || this.userInfo.role_id === "14"){
              setReadOnly($(dom).find(".editable"), 500)
              setReadOnlyFactory(['button', 'switch', 'checkbox', 'select', 'text', ' textarea'],$(dom))
            }
        },
        BindRebackUrl(){
            let that = this

            $('[data-type="ReBack"]').each(function(){
                let label = $(this).attr("data-value")
                $(this).click(function(){
                    let url = "./reback_log?id="+ that.$route.query.id+"&label=" + label + "&modul=offer"
                    that.$router.push(url)
                })

            })
        },
        getDeviceModels(){
            let that = this
            var data = that.offerInfo
            if (data['device_model']) {
                if (_.isEmpty(data['device_model'][0])) {
                    return 'all'
                } else {
                    var device_model = that.parseCombinedModel(data['device_model'])
                    device_model = device_model.join(",")
                    return device_model
                }
            } else {
                return 'all'
            }
        },
        parseCombinedModel(new_value) {
            new_value = _.uniq(new_value)
            var obj = {};
            new_value.map(function(val, index) {
                var split_elm = val.split(/\s/)
                var key = split_elm[0]
                var append_val = split_elm.splice(1, split_elm.length).join(" ")
                if (obj[key]) {
                    obj[key].push(val)
                } else {
                    obj[key] = [val]
                }
            })
            var arr_val = []
            _.map(obj, function(val, index) {
                if (val.length > 300) {
                    var appendText = index + "(" + val.length + " models)"
                    arr_val.push(appendText)
                    if (!window['Large_Device_Model_Selected']) {
                        window['Large_Device_Model_Selected'] = {}
                    }
                    window['Large_Device_Model_Selected'][md5(appendText)] = val
                } else {
                    arr_val = arr_val.concat(val)
                }
            })
            return arr_val;
        },
        getDevices(devices){
            let that = this
            var data = that.offerInfo
            var data_source = that.getDeviceModels()
            devices.unshift({
                id: 'all',
                device: 'All'
            });
            var source = devices.map(function(c_obj) {

                if (c_obj.id == 'all') return {
                    id: 'all',
                    text: 'All',
                    locked: true
                };
                return {
                    id: c_obj,
                    text: c_obj
                };
            })

            if (!_.isEmpty(data_source) && data_source !== "all") {
                data_source = data_source.split(",")
                data_source.map(function(each) {
                    source.push({
                        id: each,
                        text: each
                    })
                })
            }
            that.sourceDeviceModels = source
            that.callAPIAndSetFlag('sourceDeviceModels')
        },
        getGeoTargeting() {
            var data = this.offerInfo
            if (data['country']) {
                if (_.isEmpty(data['country'][0])) {
                    return 'all'
                } else {
                    return data['country']
                }
            } else {
                return 'all'
            }
        },
        getPlatformTargeting() {
            let that = this
            var data = that.offerInfo
            if (data['device_names']) {
                if (_.isEmpty(data['device_names'][0])) {
                    return 'all'
                } else {
                    return data['device_names']
                }
            } else {
                return 'all'
            }
        },
        getCarriers(carriers) {
            let that = this
            var data = that.offerInfo
            if (data['carrier_names']) {
                if (_.isEmpty(data['carrier_names'][0])) {
                    return 'all'
                } else {
                    let carrier_ids = []
                    _.each(data['carrier_names'], function(val){
                        var obj = _.find(carriers, {carrier:val})
                        if(obj) {
                            carrier_ids.push(obj.id)
                        }
                    })
                    return carrier_ids
                }
            } else if(!_.isEmpty(data['carriers'])) {
                return data['carriers']
            } else {
                return 'all'
            }
        },
        getConverionFlow(data){
            let arr = []
            let that = this
            _.map(data, function(val, key) {
                if(val[that.offerInfo.offer_type] === '1') {
                    arr.push({id:val.id, text:val.name})
                }
            })
            return arr
        },
        spyDomChange(node) {
            if (this.activeMenu != node.name)
                this.activeMenu = node.name
        },
        scrollTo(name){
            document.querySelector("#" + name).scrollIntoView({block: "start",behavior:"instant"})
        },
        handleScroll() {
            let scrollTop = $(window).scrollTop();
            if (scrollTop >= 200) {
                this.visible = false
            } else {
                this.visible = true
            }
        },
        fetchOcpaInfo() {
            console.log(this.ocpaData)
            let that = this
            let ocpaParam = {offer_id:this.id, alliance_id: 2}
            this.getOCPAInfo({ocpaParam, cb: function(data){
                that.$store.dispatch('setOCPAInfo', {kpis:[]})
            }})
        },
        judgeAndFetchMoreFromAPI() {
            let that = this
            let affAccessParam = that.affAccessParam
            if (!this.offerInfo.is_import_offer) {
                this.getAffAccess({affAccessParam, cb: function(data){
                }})
            }
            let deviceModelsAndGeoTargeting = async () => {
              that.deviceModels = await that.getDeviceModels()
              that.geoTargeting = await that.getGeoTargeting()
              that.callAPIAndSetFlag('deviceModels')
              that.callAPIAndSetFlag('geoTargeting')
            }

            deviceModelsAndGeoTargeting()
            /*
            *Carriers
            *submodule_targeting使用
            */
            commonDataAPI.getCarriers(function(carriers) {
                let getCarriers = async () => {
                  let initcarriers = carriers
                  that.Carriers = await that.getCarriers(initcarriers)
                  that.callAPIAndSetFlag('Carriers')
                }
                getCarriers()
            })

            commonDataAPI.getDeviceBrandTargeting(function(devices) {
                that.getDevices(devices)
            })

            commonDataAPI.getConversionFlow(function(data) {
              let getConverionFlow = async () => {
                that.sourceConversionFlow = await that.getConverionFlow(data)
                that.callAPIAndSetFlag('sourceConversionFlow')
              }
              getConverionFlow()
            })


        /*
        *sourcePlatform
        *submodule_targeting使用
        */
        commonDataAPI.getPlatforms(function(platforms) {
            var saved_devices = that.getPlatformTargeting() || []
            var new_saved_devices = []
            platforms.unshift({
                id: 'all',
                device: 'All'
            });
            that.sourcePlatform = platforms.map(function(c_obj) {
                if (c_obj.id == 'all') return {
                    id: 'all',
                    text: 'All',
                    locked: true
                };
                if(saved_devices.indexOf(c_obj.id.toString()) !== -1){
                    new_saved_devices.push(c_obj.device_names)
                }
                return { id: c_obj.device_names, text: c_obj.device_names };
            })
            new_saved_devices = new_saved_devices.length > 0 ? new_saved_devices:saved_devices
            that.platformTargeting =  new_saved_devices
            that.callAPIAndSetFlag('sourcePlatform')
            that.callAPIAndSetFlag('platformTargeting')
        })
        },
        callAPIAndSetFlag(tag) {
          let vm = this
          Object.keys(this.map).forEach((ele, index) => {
            if (Object.keys(vm.map[ele]).includes(tag)) {
              vm.map[ele][tag] = true
              return
            }
          })
        }
        
    },

    computed: {
        ...mapGetters({
          offerInfo:"offerInfo",
          affAccessInfo:'affAccessInfo',
          activeUser:'getActiveUserInfo',
          refresh_app_access:"refresh_app_access",
          refresh_aff_access:"refresh_aff_access",
          userInfo:"userInfo",
          appAccessInfo:"appAccessInfo",
          ocpaData:"ocpaData",
          publisherPayoutAndCapsInfo:"payoutAndCapsInfo",
          publisherAppPayoutAndCapsInfo:"AppPayoutAndCaps"
        }),
    },
    created () { 
        let that = this
        var appAccessParam = that.appAccessParam
        var ocpaParam = {offer_id:that.id, alliance_id: 2}

        /*
        *多个模块公用的offerInfo
        *offerInfo获取到就可以渲染offer模块
        */
        that.getOfferInfo({id: that.$route.query.id, cb: function(data, error){
            
            that.submodule_kpi_setting = true
            that.submodule_payment = true
            that.submodule_landing_page = true
            that.submodule_aff_access = true
            that.submodule_app_access = true

            that.callAPIAndSetFlag('offerInfo')

            that.$nextTick(function(){
                that.renderOffer = true
                that.BindRebackUrl()
                that.judgeAndFetchMoreFromAPI()
            })

        }})

        /*
        *sourceAdv
        *submodule_offer和submodule_tracking公用
        */
        commonDataAPI.getAdvertisers(function(advertisers) {
          that.sourceAdv = advertisers.map(function(c_obj) {
              return { id: c_obj.id, text: c_obj.name };
          })
          that.callAPIAndSetFlag('sourceAdv')
        })

        /*ocpaData
        *submodule_kpi_setting、submodule_basic、submodule_blend_traffic公用
        */
        that.getOCPAInfo({ocpaParam, cb: function(data){
        }})

        /*
        *sourceTraffics
        *submodule_basic使用
        */
        commonDataAPI.getTraffics(function(traffics) {
            that.sourceTraffics = traffics
            that.callAPIAndSetFlag('sourceTraffics')
        })

        /*
        *sourceCat
        *submodule_basic
        */
        commonDataAPI.getCategories(function(categories) {
            that.sourceCat = categories.map(function(c_obj) {
                return { id: c_obj.id, text: c_obj.name };
            })
            that.callAPIAndSetFlag('sourceCat')
        })

        /*
        *activeUsers
        * submodule_payment submodule_basic submodule_app_access公用
        */
        that.getActiveUser({ cb: function(data){
            that.initActiveUser()
        }})

        /*
        *currentTrackLink
        *submodule_basic使用
        */
        offerAPI.getCurrentTrackLink({}, function(data){
            that.currentTrackLink = data.data
        })

        /*
        *EUR_CURRENCY
        *submodule_payment使用
        */
        offerAPI.getExchangeRateFromEURToUSD({}, function(data){
            that.EUR_CURRENCY = data
        })
        
        /*
        *GBP_CURRENCY
        *submodule_payment使用
        */
        offerAPI.getExchangeRateFromGBPToUSD({}, function(data){
            that.GBP_CURRENCY = data
        })

        /*
        *offerExpirationAction
        *submodule_basic使用
        */
        offerAPI.getExpirationAction({id:that.$route.query.id}, function(data){
            that.offerExpirationAction = data || {}
        })

        /*
        *sourceStates
        *submodule_targeting使用
        */
        commonDataAPI.getGeoStateList(function(states) {
            that.sourceStates = states
            that.callAPIAndSetFlag('sourceStates')
        })

        /*
        *sourceDeviceOS
        *submodule_targeting
        */
        commonDataAPI.getDeviceOsTargeting(function(device_os) {
            device_os.unshift({
                id: 'all',
                device: 'All'
            });
            that.sourceDeviceOS = device_os.map(function(c_obj) {
                if (c_obj.id == 'all') return {
                    id: 'all',
                    text: 'All',
                    locked: true
                };
                return { id: c_obj.name, text: c_obj.name };
            })
            that.callAPIAndSetFlag('sourceDeviceOS')
        })

        offerAPI.getOfferKpiSetting({id:that.$route.query.id}, data => {
            if(data) {
                this.offerKpiSettingData = data
            }
        })
        // offerAPI.getOfferKpiSetting({id:that.$route.query.id}, (data) => {
        //     this.offerKpiSettingData = data || {}
        //     ep.emit("offerKpiSetting", data || {})
        // })

        that.getAppAccess({appAccessParam, cb: function(data){
        }}) 


        /*
        *appPayoutInfo,payoutAndCapsInfo
        *submodule_payment使用
        */
        that.getPayoutAndCapsByOfferId()
        that.getAppPayoutAndCaps()

    },
    mounted () {
        window.show_confirm = true;
        $(document).ready(function() {
            $(document).scroll(function(e) {
                if ($("body").scrollTop() < 200) {
                    $("#toTop").fadeOut();
                } else {
                    $("#toTop").fadeIn();
                }
            })
        })
        window.addEventListener('scroll', this.handleScroll)
        console.log(this.offerInfo)
        console.log(this.ocpaData)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
}
</script>


<style scoped>
    #myScrollspy{    
        margin-left: -150px;    
        padding: 10px 0 10px 10px;
        width:140px;
        font-size:14px;
        position: fixed;
        background:#fff;
    }
    #myScrollspy li {
        padding-left: 10px;
        font-size: 14px;
        color: #666;    
        width: 100%;
        margin-bottom: 5px;
        cursor: pointer;
        padding-top: 10px !important;
        padding-bottom: 10px !important;
    }
    #myScrollspy li.active {
        background-color: #e7e7e7;
    }
    #offerDetailWraper{
        position:relative;
        margin-left: 150px;
    }
    .toTop {
        position: fixed;
        z-index: 111111;
        right: 25px;
        bottom: 100px;
        background: rgb(152, 152, 152);
        width: 50px;
        height: 50px;
        text-align: center;
        border-radius: 4px;
    }

    .toTop a {
        display: block;
        width: 100%;
        height: 100%;
    }

    .toTop .fa {
        font-size: 40px;
        color: #fff;
    }
</style>
