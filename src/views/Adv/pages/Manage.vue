<template>
    <div :class="loadingZone ? 'ajax_loading' : '' ">
        <div id="breadcrumb_container">
            <ul class="breadcrumb">
                <li>
                    <router-link to="./">Home</router-link>
                </li>
                <li class="">
                    <router-link to="p_advertisers">Advertisers</router-link>
                </li>
                <li class="active">Advertiser Management</li>
            </ul>
        </div>
       
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

        <submodule-basic
            :advData="advData" 
            :userInfo="userInfo"
            :sourceAdvGrade="sourceAdvGrade"
            :sourceGeo="sourceGeo"
            :matrix="matrix"
            :getCustomParam_Contract="getCustomParam_Contract"
            :getCustomParam="getCustomParam"
            :renderAdv="renderAdv"
            :sourceContract="sourceContract"
            :showPalarChart="showPalarChart"
            :predict_level="predict_level"
            :stats="stats"
            :onTrackingSuccess="onTrackingSuccess"
        ></submodule-basic>

        <submodule-settings
            :showAlert="showAlert"
            :advData="advData" 
            :userInfo="userInfo"
            :getCustomParam_ReportApi="getCustomParam_ReportApi"
            :renderAdv="renderAdv"
            :sourceAdvManager="sourceAdvManager"
            :notice="notice"
            :collection_cycle_settype="collection_cycle_settype"
        ></submodule-settings>

        <div class="box">
            <div class="box-header" v-box-action-resize>
                <h2>Aff-Black/WhiteList<help-box :content="notice.aff_black_whitelist" ></help-box></h2>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div>
            <div class="box-container" id="">
                <div class="box-content form-horizontal frm-entity frm-detail">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2"></label>
                        <div class="controls col-md-10">
                            <input name="list" type="radio" id="blist" value="1" :checked="aff_bw" @click="isCheck" /><label for="blist"> BlackList</label>
                            &nbsp;&nbsp;<input name="list" type="radio" id="wlist" :checked="!aff_bw" value="2" @click="isCheck" /><label for="wlist"> WhiteList</label>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Aff</label>
                        <div class="controls col-md-10">
                            <chosen style="width: 320px; margin-right:20px;" v-if="affChosen" :chosen_width="'320px'"
                                    class="inline-block " :select_class="'col-md-11 '" :onChange="onAffChange"
                                    :chosen_name="'affiliate_id'" :default_option="'- Select an Aff -'"
                                    :chosen="affChosen" :chosen_type="'simple'"></chosen>
                            <a href="javascript:;" class="btn btn_block" data-control-name='bt-button'
                               data-target="#aff_payment_container" @click.prevent="blockAff">Add</a>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">List</label>
                        <div class="controls col-md-10">
                            <select multiple="multiple" class="col-md-8 form-control  pull-left mr20"
                                    v-model="aff_unblocked_arr" id="adv_unblocked" data-value="unblocked">
                                <option v-for="(_item,_index) in aff_blocked_arr" :value="_item.id" :key="_index" v-if="aff_blocked_arr.length">{{_item.val}}</option>
                            </select>
                            <a href="javascript:;" class="btn  btn_unblock  pull-left " @click.prevent="unblockAff">Delete</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="box-header" v-box-action-resize>
                <h2>Block-Sub-Aff<help-box :content="notice.block_sub_aff"></help-box></h2>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div>
            <div class="box-container" id="">
                <div class="box-content form-horizontal frm-entity frm-detail">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Aff</label>
                        <div class="controls col-md-10">
                            <chosen style="width: 320px; margin-right:20px;" v-if="affChosen" :chosen_width="'320px'"
                                    class="inline-block " :select_class="'col-md-11 '" :onChange="onAffForSubChange"
                                    :chosen_name="'affiliate_id'" :default_option="'- Select an Aff -'"
                                    :chosen="affChosen" :chosen_type="'simple'"></chosen>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Sub Aff</label>
                        <div class="controls col-md-10">
                            <textarea class="col-md-8 form-comtrol "  style="" v-model="subAff_blocked_arr" name="list_block" rows="5" placeholder="please input sub aff you want block"></textarea>
                            <a href="javascript:;" class="btn btn_block" data-control-name='bt-button' style="margin-left:20px"
                               data-target="#aff_payment_container" @click.prevent="blockSubAff">Block</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="box">
            <div class="box-header" v-box-action-resize>
                <h2>Publisher Apps Black/WhiteList<help-box :content="notice.publisher_apps_black_whitelist"></help-box></h2>
                <div class="box-action">
                    <i class="icon-chevron-up" title="Fold"></i>
                    <i class="icon-chevron-down hide" title="Unfold"></i>
                </div>
            </div>
            <div class="box-container">
                <div class="box-content form-horizontal frm-entity frm-detail">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2"></label>
                        <div class="controls col-md-10">
                            <input name="app-list" type="radio" id="bAppList" value="1" :checked="app_bw" @click="isAppCheck" /><label for="bAppList"> BlackList</label>
                            &nbsp;&nbsp;<input name="app-list" type="radio" id="wAppList" value="2" :checked="!app_bw" @click="isAppCheck" /><label for="wAppList"> WhiteList</label>
                        </div>
                    </div>
                    <div class="control-group form-group" style="height:30px">
                            <label class="control-label col-md-2">Publish App</label>
                            <div class="controls col-md-10">
                                <chosen style="width: 320px; margin-right:20px;" v-if="affChosen" :chosen_width="'320px'"
                                        class="inline-block " :select_class="'col-md-4 '" :onChange="onPublishChange"
                                        :chosen_name="'affiliate_id'" :default_option="'- Select an Publish -'"
                                        :chosen="affChosen" :chosen_type="'simple'"></chosen>
                                <chosen style="width: 320px; margin-right:20px;" :chosen_width="'320px'"
                                        class="inline-block " :select_class="'col-md-4 '" :onChange="onAppChange"
                                        :chosen_name="'app_id'" :default_option="'- Select an App -'"
                                        :chosen="appChosen" :chosen_type="'simple'"></chosen>
                                <a href="javascript:void(0)" id="addApp" class="btn  btn-primary btn-add"
                                   @click.prevent="onAddApp">Add</a>
                            </div>
                        </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">List</label>
                        <div class="controls col-md-10">
                            <table class="table table-hover tablesorter list-table" id="publisherApps" style="width:640px" v-model="appList">
                            <thead>
                            <tr>
                                <th>Affiliate</th>
                                <th>App ID</th>
                                <th>App Name</th>
                                <td></td>
                            </tr>
                            </thead>
                            <tbody id="apps">
                            <tr v-for="item in appList">
                                <th>{{item.aff_id}}</th>
                                <td><a href="javascript:;" class="editable editable-click"
                                       >{{item.app_id}}</a></td>
                                <td>{{item.app_name}}</td>
                                <td><a href="javascript:;" class="delete" data-id="" @click.prevent="unblockApp(item.aff_id,item.app_id)"><span class="fa fa-remove" ></span></a></td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="box">
            <div class="box-header">
                <h2>Bi Report<help-box :content="notice.bi_report"></help-box></h2>
                <div class="box-action">

                </div>
            </div>
            <div class="box-container">
                <div class="box-content form-horizontal frm-entity frm-detail">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Weekly</label>
                        <div class="controls col-md-10">
                           <!--  <switch_adv :switch_param='"weekly"' class="pull-left mr10" :getCustomParam="getBiReportApi"
                                       :switch_val="biReportData.weekly" :switchDefaultAPI="'Bi/setBiReport'"
                                       :showAlert='showAlert' :renderAdv="renderAdv"></switch_adv> -->
                            <common-switch
                                :showAlert='showAlert'
                                :default_val="biReportData.weekly"
                                :switch_param='"weekly"'
                                :render="renderAdv"
                                :switchGetCustomParam="getBiReportApi"
                                :switchDefaultAPI="setBiReport">
                            </common-switch>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Monthly</label>
                        <div class="controls col-md-10">
                            <!-- <switch_adv :switch_param='"monthly"' class="pull-left mr10"
                                        :getCustomParam="getBiReportApi" :switch_val="biReportData.monthly"
                                        :switchDefaultAPI="'Bi/setBiReport'" :showAlert='showAlert'
                                        :renderAdv="renderAdv"></switch_adv> -->
                            <common-switch
                                :showAlert='showAlert'
                                :default_val="biReportData.monthly"
                                :switch_param='"monthly"'
                                :render="renderAdv"
                                :switchGetCustomParam="getBiReportApi"
                                :switchDefaultAPI="setBiReport">
                            </common-switch>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Quarterly</label>
                        <div class="controls col-md-10">
                           <!--  <switch_adv :switch_param='"quarterly"' class="pull-left mr10"
                                       :getCustomParam="getBiReportApi" :switch_val="biReportData.quarterly"
                                       :switchDefaultAPI="'Bi/setBiReport'" :showAlert='showAlert'
                                       :renderAdv="renderAdv"></switch_adv> -->
                            <common-switch
                                :showAlert='showAlert'
                                :default_val="biReportData.quarterly"
                                :switch_param='"quarterly"'
                                :render="renderAdv"
                                :switchGetCustomParam="getBiReportApi"
                                :switchDefaultAPI="setBiReport">
                            </common-switch>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Annual</label>
                        <div class="controls col-md-10">
                           <!--  <switch_adv :switch_param='"yearly"' class="pull-left mr10" :getCustomParam="getBiReportApi"
                                       :switch_val="biReportData.yearly" :switchDefaultAPI="'Bi/setBiReport'"
                                       :showAlert='showAlert' :renderAdv="renderAdv"></switch_adv> -->
                            <common-switch
                                :showAlert='showAlert'
                                :default_val="biReportData.yearly"
                                :switch_param='"yearly"'
                                :render="renderAdv"
                                :switchGetCustomParam="getBiReportApi"
                                :switchDefaultAPI="setBiReport">
                            </common-switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <submodule_payment :advData="advData" :renderAdv='renderAdv' :showAlert="showAlert"></submodule_payment>

        <!--     <submodule_credit :advData="advData" :renderAdv='renderAdv'></submodule_credit> -->

        <submodule_action :advData="advData" :renderAdv='renderAdv'></submodule_action>

        <div class="box">
            <div class="box-header" v-box-action-resize @click="getStatistic">
                <h2>Statistics</h2>
                <div class="box-action">
                    <i class="icon-chevron-down" title="Unfold"></i>
                    <i class="icon-chevron-up hide" title="Fold"></i>
                </div>
            </div>
            <div class="box-container" style="display:none">
                <div class="box-content form-horizontal frm-entity frm-detail">
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Offer Count</label>
                        <div class="controls col-md-10">
                            <span class="text" id="offer_count">{{advData.offer_count}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Total Revenue</label>
                        <div class="controls col-md-10">
                            <span class="text" id="revenue">{{advStatistic.revenue}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Total Payout</label>
                        <div class="controls col-md-10">
                            <span class="text" id="cost">{{advStatistic.cost}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Total Clicks</label>
                        <div class="controls col-md-10">
                            <span class="text" id="click">{{advStatistic.click}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Total Conversions</label>
                        <div class="controls col-md-10">
                            <span class="text" id="conversion">{{advStatistic.conversion}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Average CR</label>
                        <div class="controls col-md-10">
                            <span class="text" id="cr">{{advStatistic.cr}}</span>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-2">Average EPC</label>
                        <div class="controls col-md-10">
                            <span class="text" id="epc">{{advStatistic.epc}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <confirmModal :modalState="modalState_delete" :hideModal="hideModal_delete"  :onConfirm="onDeleteConfirm" :editable_modal_body="'Are you sure to delete the App?'"></confirmModal>
    </div>
</template>
<script>
    import Vue from 'vue'
    import mixin_alert_msg from '@/mixins/alert_msg'
    import {mapGetters, mapActions} from 'vuex'
    import editable_select2_adv from '@/components/Editable_Select2_Adv.vue'
    import editable_text_adv from '@/components/Editable_Text_Adv.vue'
    import editable_textarea_adv from '@/components/Editable_TextArea_Adv.vue'

    import polarChart from '@/components/PolarChart.vue'
    import chosen from "@/components/Chosen.vue"

    //import offerConversionWhiteList from '@/components/OfferConversionWhiteList.vue'
    //import switch_adv from '@/components/Switch_Adv.vue'
    import CommonSwitch from '@/components/common/common-switch/'

    import SubmoduleBasic from './Detail/Basic.vue'
    import SubmoduleSettings from './Detail/Settings.vue'
    import submodule_payment from './Detail/Payment.vue'
//    import submodule_credit from './Detail/Credit.vue'
    import submodule_action from './Detail/Action.vue'

    import commonDataAPI from '@/api/commonData'
    import publisherAPI from '@/api/publisher'
    //import PixelURL from '@/util/pixelURL'
    import confirmModal from '@/components/ConfirmModal.vue'
    const HelpBox = () => import(
    /* webpackChunkName: "HelpBox" */ '@/components/common/help-box/'
    );
    const AlertPop = () => import(
    /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/'
    );

    var EventProxy = require('eventproxy');
    let ep = new EventProxy()
    let reportCache = []
    let nameCache = []
    let pageCache = {}

    export default {
        data() {
            return {
                loadingZone: "",
                advData: {},
                biReportData: {},
                renderAdv: false,
                showPalarChart: true,
                sourceGeo: [],
                ind_domain: [],
                advStatistic: {},
                predict_level: "",
                matrix: "",
                stats: "",
                report_api_info: {},
                sourceAdvManager: [],
                sourceContract: [],
                sourceAdvGrade: [{"id": "", "text": ""}, {"id": "level1", "text": "level1"}, {
                    "id": "level2",
                    "text": "level2"
                }],
                affChosen: "",
                appChosen:[],
                aff_blocked_arr: [],
                aff_unblocked_arr: [],
                aff_selected: {},
                aff_forSub_selected:{},
                renderPublisher: false,
                subAff_selected:"",
                subAff_unblock:[],
                subAff_blocked_arr:[],
                appList:[],
                publish_selected:"",
                app_selected:"",
                modalState_delete:"",
                currentAppId:"",
                currentAffId:"",
                aff_bw:"checked",
                app_bw:"checked",
                switchDefaultAPI:'Advertiser/edit',
                api_key:'',
                setBiReport:"Bi/setBiReport",
                notice: {
                    'conversion_white_list' : "Modify the conversion ip white list here according to adv’s requirement. Conversions will be rejected by YM system if the ip is not in the white list you set.",
                    'disable_caps_retro' : "<ul><li>1.  NO: Conversions over the daily cap for each offer will be relocate to the next three days preferentially as normal conversions.</li><li>2.  YES: Disable Caps Retro function</li></ul>",
                    'report_api' : "1.  NO: Disable Report API function.<br/>2. YES: Available for adv to get the report data in api feed. Check the instructor Report API Integration to learn more details. ",
                    'disable_internal_tuning' : "1. YES: Disable Internal Tuning function.</br>2. NO: Conversions which is illegal will be accepted and CC in YM system.",
                    'click_limit' : "Set the ceiling click quantity here. When affiliate who sent clicks over the amount setting here and with no one conversion in 1hour will be blocked to offer. ",
                    'aff_black_whitelist' : "Modify publisher black/white list at adv level.</br>Notice: white list and black list can’t take effect together, and the latest operation will take effect if you set both of them.",
                    'block_sub_aff' : "Block sub-publisher at adv level.</br>It’s available to block sub-aff in batches (copy a column from excel), or you can type in sub-aff-ids one by one (separate different ids with ‘Enter’).",
                    'publisher_apps_black_whitelist' : "Modify devapp-publisher black/white list at adv level.</br>Notice：White list and black list can’t take effect together, and the latest operation will take effect if you set both of them.",
                    'bi_report' : "Default NO. ADV BI will be generated weekly/monthly/ Quarterly/Annual automatically when change the set to YES.",
                },
                collection_cycle_settype:""

            }
        },
        mixins: [mixin_alert_msg],
        computed: {
            ...mapGetters({
                chosens: "chosens"
            })
        },
        components: {
            editable_textarea_adv,
            editable_text_adv,
            editable_select2_adv,
            //ConversionWhiteList,
            SubmoduleBasic,
            SubmoduleSettings,
            submodule_payment,
            //submodule_credit,
            submodule_action,
            polarChart,
            chosen,
            confirmModal,
            HelpBox,
            CommonSwitch,
            AlertPop
        },
        computed: {
            userInfo(){
                return this.$store.state.app.userInfo
            },
        },
        methods: {
            ...mapActions([
                'getChosen'
            ]),
            isCheck: function(e){
                if(e.target.value == 1){
                    this.getAffBlackOrWhiteList('black')
                    this.aff_bw = "checked"
                }else if (e.target.value == 2){
                    this.getAffBlackOrWhiteList('white')
                    this.aff_bw = ""
                }
            },
            isAppCheck: function(e){
                if (e.target.value == 1){
                    this.getBlockedAppList('black');
                    this.app_bw = "checked"
                }else if (e.target.value == 2){
                    this.getBlockedAppList('white');
                    this.app_bw = ""
                }
            },
            // onShownIndependentDomain: function ($elm, e, editable) {
            //     window.independent_domain.onShown($elm, e, editable, this.ind_domain.join('\n'))
            // },
            // getCustomParamIndependentDomain(params, $editable) {
            //     let new_params = {id: params.pk}
            //     let _domain = independent_domain.getNewValue().split("\n")
            //     new_params["domain"] = _domain

            //     new_params.action = new_params["domain"].length && new_params["domain"][0] ? "edit" : "delete"
            //     return new_params
            // },
            getCustomParam_Contract(params, $editable) {
                let new_params = {id: params.pk}
                new_params["contract_id"] = params.value;

                return new_params
            },
            // validatDomain() {
            //     let _domain = independent_domain.getNewValue().split("\n")

            //     for (var i = 0; i < _domain.length; i++) {
            //         if (!_.isValidDomain(_domain[i])) {
            //             this.showAlert("You must input a valid domain")
            //             return false
            //         }
            //     }

            //     if (_.uniq(_domain).length !== _domain.length) {
            //         this.showAlert("You can not add duplicate domain")
            //         return false
            //     } else {
            //         return true
            //     }

            // },
            // onIndDomainSuccess(newVal) {
            //     var _int_domain = independent_domain.getNewValue()
            //     this.ind_domain = $.trim(_int_domain) ? _int_domain.split("\n") : []
            // },
            onTrackingSuccess(params) {
                this.advData.tracking_system = params.tracking_system;
            },
            getCustomParam_ReportApi(param, value) {
                let api_key = _.generate_password(32)
                this.api_key = api_key
                return {
                    id: this.$route.query.id,
                    type: value == 1 ? "active" : "block",
                    api_key
                }
            },
            getBiReportApi(param, value) {
                return {
                    adv_id: this.$route.query.id,
                    time_type: param,
                    on: value
                }
            },
            getStatistic() {
                if (!_.isEmpty(this.advStatistic)) return;
                Vue.http.get('Advertiser/getStatistic', {params: {advertiser_id: this.$route.query.id}}).then(response => {

                    this.advStatistic = response.body.data;

                }, response => {
                    this.showAlert(response.body.msg)
                })
            },
            getContract(callback) {
                Vue.http.get('Advertiser/getContractList', {params: {}}).then(response => {
                    let data = response.body.data
                    callback && callback(data)
                }, response => {
                    this.showAlert(response.body.msg)
                    callback && callback()


                })
            },
            getReportApi(callback, query) {

                Vue.http.get('Advertiser/getReportApi', {params: {id: this.$route.query.id}}).then(response => {

                    $.isFunction(callback) && callback(response.body.data)
                }, response => {
                    this.showAlert(response.body.msg)
                    $.isFunction(callback) && callback(response.body.data)
                })
            },
            getCustomParam: function (params, $editable) {
                let new_params = {id: params.pk}
                if (params.value == "other") {
                    let otherTracking = $editable.find("#otherTracking").val();
                    new_params[params.name] = otherTracking;
                } else {
                    new_params[params.name] = params.value;
                }
                return new_params
            },
            onSelectChange: function (e, $editable) {
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
            getAdvData() {

                Vue.http.get('Advertiser/getById?id=' + this.$route.query.id).then(response => {

                    ep.emit("advData", response.body.data)

                }, response => {
                    ep.emit("advData", {})
                    this.showAlert(response.body.msg)

                })
            },
            getBiReportData() {
                Vue.http.post('Bi/setBiReport', {adv_id: this.$route.query.id}).then(response => {

                    if (response.body.data) {
                        ep.emit("biReportData", response.body.data);
                        this.biReportData = response.body.data;
                    }
                    else {
                        this.biReportData = {'yearly': '0', 'monthly': '0', 'quarterly': '0', 'weekly': '0'};
                    }
                }, response => {
                    ep.emit("biReportData", {})
                    this.showAlert(response.body.msg)

                })
            },
            getAdvertiserManager() {
                Vue.http.get('Advertiser/getManagerList').then(response => {
                    let source = response.body.data.list.map(function (c_obj) {
                        return {
                            id: c_obj.id,
                            text: c_obj.name + ' ' + c_obj.last_name
                        };
                    })
                    this.sourceAdvManager = source
                    ep.emit("advManager", source)

                }, response => {
                    ep.emit("advManager", {})
                    this.showAlert(response.body.msg)

                })
            },
            getAdvertiserIndDomain() {
                Vue.http.get('Advertiser/getAdvertiserIndDomain', {params: {advertiser_id: this.$route.query.id}}).then(response => {

                    ep.emit("advertiserIndDomain", response.body.data)

                }, response => {
                    ep.emit("advertiserIndDomain", {})
                    this.showAlert(response.body.msg)

                })
            },
            unblockAff() {
                let that = this

                if (!this.aff_unblocked_arr.length || !this.aff_unblocked_arr) {
                    return
                }
                _.each(this.aff_unblocked_arr, function (val) {
                    let index = that.aff_blocked_arr.indexOf(val)
                    that.aff_blocked_arr.splice(index, 1)
                })

                let checkVal = $("input[name=list]:checked").val();
                if (checkVal == 1){
                    Vue.http.post('Affiliate/unBlockAdvs', {
                        aff_id: that.aff_unblocked_arr.join(","),
                        adv_ids: this.$route.query.id,
                        is_adv:1
                    }).then(response => {
                        that.showAlert("success", "success");
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
                else if (checkVal == 2){
                    Vue.http.post('Advertiser/saveAffiliateWhiteList', {
                        aff_id: that.aff_unblocked_arr.join(","),
                        adv_id: this.$route.query.id,
                        method:'sub'
                    }).then(response => {
                        that.showAlert("success", "success");
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }

                
            },
            onAffChange(val, text) {
                let obj = {}
                obj.id = val;
                obj.val = text;
                this.aff_selected = obj
            },
            onAffForSubChange(val, text) {
                let obj = {}
                obj.id = val;
                obj.val = text;
                this.aff_forSub_selected = obj
                this.getunBlackList();
            },
            onPublishChange(val,text) {
                let obj = {}
                obj.id = val;
                obj.val = text;
                this.publish_selected = obj
                this.getAppList();
            },
            onAppChange(val,text){
                let obj = {}
                obj.id = val;
                obj.val = text;
                this.app_selected = obj
            },
            blockAff() {
                let that = this;

                if (!this.aff_selected.id) {
                    return;
                }
                if (!_.findIndex(this.aff_blocked_arr, {id: this.aff_selected.id}) === -1) {
                    return;
                }

                let checkVal = $("input[name=list]:checked").val();
                if (checkVal == 1){
                    Vue.http.post('Affiliate/blockAdvs', {aff_id:this.aff_selected.id, adv_ids: this.$route.query.id}).then(response => {
                        that.showAlert("success","success");
                        this.aff_blocked_arr.push(this.aff_selected)
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
                else if (checkVal == 2){
                    Vue.http.post('Advertiser/saveAffiliateWhiteList', {aff_id:this.aff_selected.id, adv_id: this.$route.query.id, method:'add'}).then(response => {
                        that.showAlert("success","success");
                        this.aff_blocked_arr.push(this.aff_selected)
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
            },
            blockSubAff() {
                let that = this;
                let list_block = $("textarea[name=list_block]").trimVal().split("\n")
                let aff_id = that.aff_forSub_selected.id;
                if(!aff_id )  return that.showAlert("publisher list can not be empty ", "error")
                list_block = _.filter(list_block,function(v){return v})
                if(_.uniq(list_block).length !== list_block.length) return that.showAlert("can not save two same sub affiliate ", "error")

                Vue.http.post('advertiser/blockSubAffiliate', {
                    id: this.$route.query.id,
                    publisher_id: aff_id,
                    sub_aff: list_block
                }).then(response => {
                    that.showAlert("success", "success");
                    that.subAff_selected = ""
                }, response => {
                    that.showAlert(response.body.msg);
                })
            },
            getAppList(){
                let that = this;
                that.appChosen = [];
                if (this.publish_selected.id){
                    publisherAPI.getAppList({id:this.publish_selected.id},function(data){
                        if (data){
                            _.each(data, function(item) {
                                if (item.preferenceSet) {
                                    that.appChosen.push(item)
                                }
                            })
                        }
                        that.renderPublisher = true
                    })
                }

            },
            onAddApp(){
                let that = this;
                if (this.app_selected.id && this.publish_selected.id){
                    let isCheckList = $('input[name=app-list]:checked').val();
                    if (isCheckList == 1){
                        Vue.http.post('advertiser/blockDevApp', {
                            app_id: this.app_selected.id,
                            publisher_id: this.publish_selected.id,
                            type:'store_app',
                            excludedAdvs: this.$route.query.id,
                            method:'block'
                        }).then(response => {
                            that.showAlert("success", "success");
                            that.getBlockedAppList('black');
                            that.app_selected = ""
                        }, response => {
                            that.showAlert(response.body.msg);
                        })
                    }
                    else if (isCheckList == 2){
                        Vue.http.post('advertiser/saveDevappWhiteList', {
                            app_id: this.app_selected.id,
                            publisher_id: this.publish_selected.id,
                            adv_id: this.$route.query.id,
                            method:'add'
                        }).then(response => {
                            that.showAlert("success", "success");
                            that.getBlockedAppList('white');
                            that.app_selected = ""
                        }, response => {
                            that.showAlert(response.body.msg);
                        })
                    }
                }
            },
            getBlockedAppList(type,loading){
                let that = this;
                that.appList = [];
                if (type == 'black'){
                    
                    Vue.http.get('advertiser/getBlockedAppList', {
                        params:{id: this.$route.query.id}
                    }).then(response => {
                        that.appList = response.body.data;
                        that.app_bw = "checked";
                        that.showAlert("success", "success");
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
                else if (type == 'white') {
                    Vue.http.get('advertiser/getDevappWhiteList', {
                        params:{id: this.$route.query.id}
                    }).then(response => {
                        that.appList = response.body.data ? response.body.data : [];
                        if (that.appList=='' && loading){
                            that.getBlockedAppList('black');
                            return
                        }
                        that.app_bw = ""
                        that.showAlert("success", "success");
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
            },
            getunBlackList(){
                let that = this;
                let aff_id = that.aff_forSub_selected.id;
                if(aff_id) {
                    Vue.http.get('advertiser/getBlockedSubAffiliate',{params: {id:this.$route.query.id, publisher_id: aff_id}}).then(response => {
                        let  subaff = _.pluck(response.body.data)
                        $("textarea[name=list_block]").val(subaff.join("\n"));
                        console.log(subaff);
                    }, response => {
                        that.showAlert(response.body.msg);
                    })
                }
            },
            onunblockApp(){
                let that = this;
                let isCheckList = $("input[name=app-list]:checked").val();
                if (this.currentAffId && this.currentAppId){
                    if (isCheckList == 1){
                        Vue.http.post('advertiser/blockDevApp', {
                            app_id: this.currentAppId,
                            publisher_id: this.currentAffId,
                            type:'store_app',
                            excludedAdvs: this.$route.query.id,
                            method:'unblock'
                        }).then(response => {
                            that.showAlert("success", "success");
                            that.getBlockedAppList('black');
                            that.currentAppId = "";
                            that.currentAffId = ""
                        }, response => {
                            that.showAlert(response.body.msg);
                        })
                    }
                    else if (isCheckList == 2){
                        Vue.http.post('advertiser/saveDevappWhiteList', {
                            app_id: this.currentAppId,
                            publisher_id: this.currentAffId,
                            adv_id: this.$route.query.id,
                            method:'sub'
                        }).then(response => {
                            that.showAlert("success", "success");
                            that.getBlockedAppList('white');
                            that.currentAppId = "";
                            that.currentAffId = ""
                        }, response => {
                            that.showAlert(response.body.msg);
                        })
                    }
                }
            },
            getBlockAff(advIds){
                let that = this
                let arr = []

                _.each(advIds, function(obj) {
                    let o = {}
                    o.val = obj.id + " " + obj.first_name + " " + obj.last_name;
                    o.id = obj.id
                    arr.push(o)
                })
                return arr
            },
            unblockApp(aff_id,app_id){
                this.modalState_delete = "show";
                this.currentAffId = aff_id;
                this.currentAppId = app_id
            },
            onDeleteConfirm(){
                this.onunblockApp()
            },
            hideModal_delete(){
                this.modalState_delete = "hide"
            },
            getAffBlackOrWhiteList(type,loading){
                let that = this;
                if (type == 'black'){
                    publisherAPI.getBlockedAffsByAdv({id:that.$route.query.id}, function(data){
                        that.aff_blocked_arr = [];
                        that.aff_blocked_arr = that.getBlockAff(data.data ? data.data : [])
                        console.log(that.aff_blocked_arr)
                        that.aff_bw = "checked"
                    })
                }
                else if (type == 'white'){
                    publisherAPI.getWhiteListByAdv({id:that.$route.query.id}, function(data){
                        that.aff_blocked_arr = [];
                        that.aff_blocked_arr = that.getBlockAff(data.data ? data.data : [])
                        if (that.aff_blocked_arr == '' && loading){
                            that.getAffBlackOrWhiteList('black')
                            return
                        }
                        that.aff_bw = ""
                    })
                }
            },
            sendYMBoss(){
                let that = this
                this.btnDisabled = true
                Vue.http.get('advertiser/resendAdvInfoToYmboss', {
                    params:{id: that.$route.query.id}
                }).then(response => {
                    that.showAlert("success", "success");
                    that.btnDisabled = false
                }, response => {
                    that.showAlert(response.body.msg);
                })
            },
        },
        created() {
            let that = this
            that.loadingZone = true
            ep.all("geo", "advData", "advManager", "report_api_info", "advertiserIndDomain", "contract", function (geo, _advData, advManager, report_api_info, advertiserIndDomain, contract) {
                that.sourceGeo = geo
                that.loadingZone = ""
                that.report_api_info = report_api_info && report_api_info[0] || {}
                that.renderAdv = true

                let _data = _advData.level_predicted.replace(/'/g, "\"")
                if (_data) {
                    _data = JSON.parse(_data)
                    that.predict_level = _data.predict_level || ""
                    that.matrix = _data.matrix || ""
                    that.stats = _data.stats || ""
                }


                that.advData = _advData
                that.ind_domain = advertiserIndDomain && advertiserIndDomain.ind_domain || []
                that.collection_cycle_settype = that.advData.collection_cycle_settype
                that.collection_begin_type = that.advData.collection_begin_type

            })
            commonDataAPI.getGeos(function (data) {
                let source = data.map(function (c_obj) {
                    return {id: c_obj.id, text: c_obj.code + ' - ' + c_obj.name};
                })
                ep.emit("geo", source)
            })
            publisherAPI.getAffiliateList(function(publishers){
                that.affChosen = { name: "aff", trans_name:"advertiser_id",  full_name: "advertiser", data: publishers.data }
                that.getAffBlackOrWhiteList('white',true)
            })



            this.getAdvData()
            this.getAdvertiserManager()
            this.getReportApi(function (data) {
                ep.emit("report_api_info", data)
            })
            this.getAdvertiserIndDomain()
            this.getContract(function (data) {
                ep.emit("contract", data)
                var new_contract = [];
                _.each(data && data.list || [], function (item) {
                    new_contract.push({
                        id: item.contract_id,
                        text: item.contract_id + "  " + item.customer_name
                    })
                })

                that.sourceContract = new_contract

            });
            this.getBiReportData();
            this.getBlockedAppList('white',true);
        },
        mounted() {
            // window.independent_domain = PixelURL({
            //     tag: '#independent_domain',
            //     limit: 50
            // });
        }
    }
</script>