<template>
<div class="box">
    <div class="box-header" v-box-action-resize>
        <h2>Publisher Apps<help-box :content="helpTips.add_app"></help-box></h2>
        <div class="box-action">
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
        </div>
    </div>
    <div class="box-container">
        <div class="box-content">
            <div>
                <a href="javascript:void(0)" id="addApp" class="btn  btn-primary btn-add" @click.prevent="onAddApp">Add App</a>
            </div>
            <div class="overflow_scroll">
            <table class="table table-hover tablesorter list-table" id="publisherApps">
                <thead>
                    <tr>
                        <th>App ID</th>
                        <th>App Name</th>
                        <th>App Platform</th>
                        <th>Slots</th>
                        <th>Offer Preference</th>
                        <th>Allow caps</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="apps">
                    <tr v-for="item in appList">
                        <td><a href="javascript:;" class="editable editable-click" @click.prevent="onEditApp(item)">{{item.id}}</a></td>
                        <td>{{item.name}}</td>
                        <td>{{item.platform}}</td>
                        <td><a href="javascript:;" class="editable editable-click" @click.prevent="onEditSlot(item)" >{{item.slot_count}}</a></td>
                        <td><a href="javascript:;" class="editable editable-click" @click.prevent="onEditRule(item)">{{item.preferenceSet ? 'setting' : 'empty'}}</a></td>
                        <td>
                            <a href="javascript:;" class="editable editable-click" @click.prevent="onEditRuleCapProportion(item)">
                                Proportion Cap:{{typeof item.dailyConversionsPercentage === "undefined" ? 'Empty' : item.dailyConversionsPercentage + '%'}}<br />
                                Uniform Cap:{{typeof item.dailyConversions === "undefined" ? 'Empty': item.dailyConversions}}
                            </a>
                        </td>
                        <td><a href="javascript:;" class="delete" data-id="" @click.prevent="onDeleteApp(item.id)"><span class="fa fa-remove" ></span></a></td>
                    </tr>
                </tbody>
            </table>
            </div>

            <div class="mt20 ">
                <a href="javascript:void(0)" id="addTemplate" class="btn  btn-primary btn-add" @click.prevent="onAddTemplate">Add Template</a>
            </div>
            <table class="table table-hover tablesorter list-table" id="publisherTemplates">
                <thead>
                    <tr>
                        <th>Template ID</th>
                        <th>Template Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="templates">
                    <tr v-for="item in appTemplate">
                        <td><a href="javascript:;" class="templateID editable editable-click" @click.prevent="onEditTemplate(item)">{{item.id}}</a></td>
                        <td>{{item.name}}</td>
                        <td><a href="javascript:;" class="delete" data-id="" @click.prevent="onDeleteTemplate(item.id)"><span class="fa fa-remove" ></span></a></td>
                    </tr>
                </tbody>
            </table>
            <div class="btn-group" id="pager_foot"></div>
            <div class="clearfix"></div>
        </div>
    </div>
    <!-- <publisherAppModal :modalState="modalState" :hideModal="hideModal"  :publisherAppModalType="publisherAppModalType" :onConfirm="onAddAPPConfirm" :publisher_id="publisher_id" :appData="appData"></publisherAppModal> -->
    <publisher-app-modal 
        :modalState.sync="modalState" 
        :hideModal="hideModal"  
        :publisherAppModalType="publisherAppModalType" 
        :onConfirm="onAddAPPConfirm" 
        :publisher_id="publisher_id" 
        :appData="appData"
        :dialogName="'modalState'">
    </publisher-app-modal>
    
    <!-- <PreferenceRuleModal :modalState="modalState_rule" :showAlert="showAlert" :appRules="appRules" :hideMyModal="hideModal_rule"  :onConfirm="onRuleConfirm" :app_id="appData.id"> </PreferenceRuleModal> -->
    <preference-rule-modal 
        :modalStateRule.sync="modalState_rule"
        :appRules="appRules"
        :onConfirm="onRuleConfirm"
        :app_id="appData.id || ''"
        :showAlert="showAlert"
        :dialogName="'modalStateRule'">
    </preference-rule-modal>

    <!-- <appTemplateModal :modalState="modalState_appTemplate"  :templateData="templateData"  :appTemplateModalType="appTemplateModalType" :hideModal="hideModal('modalState_appTemplate')"  :onConfirm="onAppTemplateConfirm" > </appTemplateModal> -->
    <app-template-modal 
        :modalStateAppTemplate.sync="modalState_appTemplate"
        :templateData="templateData"
        :onConfirm="onAppTemplateConfirm"
        :appTemplateModalType="appTemplateModalType"
        :dialogName="'modalStateAppTemplate'">
    </app-template-modal>

    <!-- <appSlotModal :modalState="modalState_appSlot" :hideModal="hideModal_appSlot" :modalState_appSlotEdit="modalState_appSlotEdit" :appData="appData"  :slotsList="slotsList"  :onDeleteSlot="onDeleteSlot"  :appTemplate="appTemplate" :hideModal_appSlotEdit="hideModal_appSlotEdit"  :showModal_appSlotEdit="showModal_appSlotEdit" :onConfirm="onAppSlotConfirm" > </appSlotModal> -->
    <app-slot-modal
        :modalStateAppSlot.sync="modalState_appSlot"
        :appData="appData"  
        :slotsList="slotsList"  
        :onDeleteSlot="onDeleteSlot"  
        :appTemplate="appTemplate"
        :onConfirm="onAppSlotConfirm"
        :showAlert="showAlert"
        :dialogName="'modalStateAppSlot'">
    </app-slot-modal>


    <!-- <confirmModal  :modalState="modalState_delete" :hideModal="hideModal_delete"  :onConfirm="onDeleteConfirm" :editable_modal_body="'Are you sure to delete the App?'"></confirmModal>
    <confirmModal  :modalState="modalState_deleteTemplate" :hideModal="hideModal_deleteTemplate"  :onConfirm="onDeleteTemplateConfirm" :editable_modal_body="'Are you sure to delete the Template?'"></confirmModal> -->
    <modal 
      :dialogVisible.sync="modalState_delete" 
      :dialogBody="'Are you sure to delete the App?'" 
      :title="title"
      :onConfirm="onDeleteConfirm">
    </modal>
    <modal 
      :dialogVisible.sync="modalState_deleteTemplate" 
      :dialogBody="'Are you sure to delete the Template?'" 
      :title="title"
      :onConfirm="onDeleteTemplateConfirm">
    </modal>

</div>
</template>

<script>
//onEditCapsConfirm
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"

import publisherAPI from '@/api/publisher'

//import PublisherAppModal from '@/components/PublisherAppModal.vue/'
//import confirmModal from '@/components/ConfirmModal.vue'
//import preferenceRuleModal from '@/components/PreferenceRuleModal.vue'
//import appTemplateModal from '@/components/AppTemplateModal.vue'
//import appSlotModal from '@/components/AppSlotModal.vue/'

const AppSlotModal = () => import(
/* webpackChunkName: "AppSlotModal" */ '../../components/app-slot-modal/'
);
import commonDataAPI from '@/api/commonData'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
const PreferenceRuleModal = () => import(
/* webpackChunkName: "PreferenceRuleModal" */ '../../components/preference-rule-modal/'
);
const AppTemplateModal = () => import(
/* webpackChunkName: "AppTemplateModal" */ '../../components/app-template-modal/'
);
const HelpBox = () => import(
/* webpackChunkName: "HelpBox" */ '@/components/common/help-box/'
);
const PublisherAppModal = () => import(
/* webpackChunkName: "PublisherAppModal" */ '../../components/publisher-app-modal/'
);

let EventProxy = require('eventproxy');
let ep = new EventProxy()
export default {
    data(){
        return {
                appList:[],
                appTemplate:[],
                appData:{},
                templateData:{},
                publisher_id:this.$route.query.id,
                modalState_delete:"hide",
                modalState_rule:"hide",
                modalState_appTemplate:"hide",
                modalState_deleteTemplate:"hide",
                modalState_appSlot:"hide",
                modalState_appSlotEdit:"hide",
                currentAppId:"",
                currentTemplateId:"",
                publisherAppModalType:"",
                appTemplateModalType:"",
                appSlotModalType:"",
                appRules:{},
                slotsList:[],
                renderPublisher:false,
                app_id:'',
                helpTips: {
                    add_app: 'Add App: Record detailed publisher’s app info here when settings-bulk api is YES, app_id will be generated automatically when you submit app info. The app info in publisher system and manage system will be synchronized to each other’s system in a real time.'
                },
                title:'Confirm',
                initAppData:{
                    status:'active',
                    platform:'ios',
                    dau:'0-1w',
                    lbs_status:true,
                    paid_app:true,
                    gender:'all',
                    offerMaxCount:0
                },
            }
    },
    computed: {
    },
    mixins: [mixin_modal],
    components:{PublisherAppModal, Modal, PreferenceRuleModal, AppTemplateModal, AppSlotModal,HelpBox},
    methods: {
        hideModal(type){
            if (type && typeof(type) == 'string') {
                this[type] = 'hide'
            } else {
                this.modalState = 'hide'
            }
        },
        hideModal_appSlot(){
            this.modalState_appSlot = "hide"
        },
        hideModal_appSlotEdit(){
          this.modalState_appSlotEdit = "hide"
        },
        calcuProportion(app){
            return app.preferenceSet ? 'setting' : 'empty'
        },
        onAddApp(){
            this.appData = this.initAppData
            this.modalState = "show"
            this.publisherAppModalType = "add"
        },
        onShowCapProportion($el){
            if (!$el.find(".editable_append").length){
                $el.find(".editable-input").before("<span class='editable_append'>Proportion</span>")
                $el.find(".editable-input").after("<span class='editable_append'>%</span>")
            }
        },
        onEditRuleCapProportion(item) {
            this.appData = item;
            this.modalState = 'show'
            this.publisherAppModalType = "capProportionEdit"
        },
        onEditRule(app){
            let that = this
            that.getOfferPreference(app.id, function(){
                that.modalState_rule = "show"
                that.appData = app;
                if (!app.preferenceSet){
                    that.appRules.platforms = "Android,iOS,Windows Phone,Other";
                    that.appRules.type = "store_app"
                }
            })
        },
        onEditApp(app){
            this.appData = app;
            this.modalState = "show"
            this.publisherAppModalType = "edit"
        },
        onEditTemplate(template){
            this.templateData = template
            this.modalState_appTemplate = "show"
            this.appTemplateModalType = "edit"
        },
        onEditSlot(app){
            this.appData = app
            this.modalState_appSlot = "show"
            this.getSlotList()
        },
        getSlotList(){
            let that = this;
            publisherAPI.getSlotList({publisher_id: that.$route.query.id, app_id: that.appData.id},function(data){
                that.slotsList = data || [];
            })
        },
        onDeleteSlot(id){
            let that = this
            this.deleteSlot(id, function(){
                that.getSlotList()
                that.getAppList()
            })
        },
        onDeleteConfirm(){
            let that = this
            this.deleteApp(function(){
                that.getAppList()
            })
            this.deleteOfferPreference()
            this.modalState_delete = false
        },
        onDeleteTemplateConfirm(){
            let that = this
            this.deleteTemplate(function(){
                that.getAllTemplates()
            })
            this.modalState_deleteTemplate = false
        },
        deleteApp(callback){
            let  param = {publisher_id:this.publisher_id, app_id: this.currentAppId}

            Vue.http.post("Publisher/deleteApp",param).then(response => {
                this.showAlert("Delete app success!", "success")
                this.getSlotList()
                callback && callback()
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        deleteSlot(id, callback){
            let  param = {id:id}

            Vue.http.post("Publisher/deleteSlot",param).then(response => {
                this.showAlert("Delete slot success!", "success")
                callback && callback()
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        deleteTemplate(callback){
            let  param = {publisher_id:this.publisher_id, id: this.currentTemplateId}

            Vue.http.post("Publisher/deleteTemplate",param).then(response => {
                this.showAlert("Delete app template!", "success")
                callback && callback()
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        deleteOfferPreference(){
            let  param = { app_id: this.currentAppId}

            Vue.http.post("Publisher/deleteOfferPreference",param).then(response => {
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        getOfferPreference(app_id, callback){
          let that = this
          publisherAPI.getOfferPreference({app_id:app_id},function(data){
            that.appRules = {};
            if(!data || (data.white_list=="" && data.countries == undefined)){
                that.appRules = {
                    countries:"all",
                    excludedAdvs:"",
                    excludedApps:"",
                    platforms:"Android,iOS,Windows Phone,Other",
                    type:"store_app",
                    adultAllowed:"",
                    incentiveTrafficAllowed:"",
                    adultTrafficAllowed:"",
                    white_list:[]
                }
            } else {
                that.appRules = data
            }
            callback && callback()
          })
        },
        validatorForm($form){
            let that = this;
            let $formcontrol = $form.find(".txt-required")
            let flag = true
            if ($("#gift_ecpm_type").val() == 'app') {
                let $this= $("#gift_ecpm_ratio")
                if ($this.val() > 2 || $this.val() < 0)  {
                    that.showAlert("The gift ECPM ratio value must be between 0 and 2.", "info")
                    flag = false
                    return false
                }
            }
            $formcontrol.each(function(){
                let $this = $(this);
                let name = $this.attr("id")
                if(!$this.val()){
                    that.showAlert("The " + name + " value is required!", "info")
                    flag = false
                    return false
                }

                if($this.hasClass("url-value") && !$this.val().match(/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/)) {
                    that.showAlert("The url value is invalid!", "info")
                    flag = false
                    return false
                }
                if (name == 'offerMaxCount') {
                    var r = /^\+?[0-9][0-9]*$/;
                    if (!r.test($this.val())) {
                        that.showAlert("The offer max count value must be positive integer!", "info")
                        flag = false
                        return false
                    }
                }
            })
            return flag
        },
        onDeleteApp(app_id){
            this.modalState_delete = "show";
            this.currentAppId = app_id
        },
        onAddTemplate(){
            this.templateData = {}
            this.modalState_appTemplate = "show"
            this.appTemplateModalType = "add"
        },
        onDeleteTemplate(id){
            this.modalState_deleteTemplate = "show";
            this.currentTemplateId = id
        },
        getAppList(){
          let that = this
          publisherAPI.getAppList({id:this.publisher_id},function(data){
            that.appList = data
            that.renderPublisher = true
          })
        },
        getAllTemplates(){
          let that = this
          publisherAPI.getAllTemplates({id:this.publisher_id},function(data){
            that.appTemplate = data || []
          })
        },
        onAddAPPConfirm($form){
            if(this.validatorForm($form)) {
                this.modalState ="hide"
                let  param = $form.getFormQuery()
                Vue.http.post("Publisher/saveAppInfo",param).then(response => {
                    this.getAppList()
                    this.showAlert(this.publisherAppModalType === "add" ? "Add app success!" : "Edit app success!", "success")
                }, response => {
                    this.showAlert(response.body.msg);
                })
            }
        },
        onRuleConfirm($form){
            this.hideModal('modalState_rule')
            let param = $form.getFormQuery()
            Vue.http.post("Publisher/saveOfferPreference",param).then(response => {
                this.getAppList()
                this.showAlert( "Edit Offer Preference Success!", "success")
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        onAppTemplateConfirm($form){
            if(this.validatorForm($form)) {
                let  param = $form.getFormQuery()
                Vue.http.post("Publisher/saveTemplate",param).then(response => {
                    this.getAllTemplates()
                    this.showAlert(this.appTemplateModalType === "add" ? "Add app template success!" : "Edit app template success!", "success")
                }, response => {
                    this.showAlert(response.body.msg);
                })
            }
            this.hideModal('modalState_appTemplate');

        },
        onAppCapsConfirm() {

        },

        onAppSlotConfirm(type, $form) {
            if(type === "add") {
                if(this.validatorForm($form)) {
                    this.hideModal('modalState_appSlotEdit')
                    let  param = $form.getFormQuery()
                    Vue.http.post("Publisher/addSlot",param).then(response => {
                        this.getAppList()
                        this.getSlotList()
                        this.showAlert("Add app slot success!", "success")
                    }, response => {
                        this.showAlert(response.body.msg);
                    })
                }
            } else {
                if(this.validatorForm($form)) {
                    this.hideModal('modalState_appSlotEdit')
                    let  param = $form.getFormQuery()
                    Vue.http.post("Publisher/editSlot",param).then(response => {
                        this.getAppList()
                        this.getSlotList()
                        this.showAlert("Edit app slot success!", "success")
                    }, response => {
                        this.showAlert(response.body.msg);
                    })
                }
            }
        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        this.getAppList()
        this.getAllTemplates()
    }
}
</script>
<style  scoped>
.box-content .btn-add {
    text-decoration: none;
    float: right;
    font-size: 14px;
    margin-bottom: 10px;
}
</style>