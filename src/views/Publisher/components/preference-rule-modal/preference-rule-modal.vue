<template>
<div>
    <modal 
      :dialogVisible.sync="outerVisible" 
      :cancelText="'Close'"
      :title="title"
      :additionalTitleHtml="additionalTitleHtml"
      :onConfirm="onConfirmBtn"
      :closeOnClickModal="false"
      :onCancel="handleClose">
      <template slot="dialogBody">
        <form class="form-horizontal frm-entity offer_recommended_form preference_rule_form" ref="form" id="offer_recommended_form">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Platform:
                </label>
                <div class="controls col-md-9" id="checkbox_platform">
                   <input type="hidden" name="platforms" v-model="platforms">
                    <input type="hidden" name="app_id" :value="app_id">
                    <label class="checkbox-inline" v-for="i in platFormTypes" :key="i.value">
                         <input type="checkbox" :value="i.value" v-model="platforms" data-name="type"> {{i.text}}
                    </label>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Type:
                </label>
                <div class="controls col-md-9" id="checkbox_type">
                    <input type="hidden" name="type" v-model="type">
                    <label class="checkbox-inline" v-for="i in types" :key="i.value">
                         <input type="checkbox" :value="i.value" v-model="type" data-name="type"> {{i.text}}
                    </label>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-3">Countries:
                </label>
                <div class=" col-md-6">
                    <input type="hidden" name="countries" v-model="countries">
                    <!-- <editable_select2_publisher_lite  :source="sourceGeo"  :editable_mode="'inline'" :select2_multiple=true :publisher_val="appRules.countries || 'all' " :savenochange=true :renderEditable="renderEditable" :onSuccess="onCountrySelectSuccess"></editable_select2_publisher_lite> -->
                    <editable-select2-publisher-lite  :source="sourceGeo"  :editable_mode="'inline'" :select2_multiple=true :publisher_val="appRules.countries || 'all' " :savenochange=true :renderEditable="renderEditable" :onSuccess="onCountrySelectSuccess"></editable-select2-publisher-lite>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-4">Allowed&nbsp;adult/sex&nbsp;offer:
                </label>
                <div class="controls col-md-8">
                    <label class="radio-inline">
                        <input type="radio" value="1" data-name="adultAllowed" name="adultAllowed">Allowed
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="0" data-name="adultAllowed" name="adultAllowed">Not Allowd
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="" data-no-send-when-checked="1" data-name="adultAllowed" name="adultAllowed" >All
                    </label>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-4">Allowed&nbsp;incentive&nbsp;traffic:
                </label>
                <div class="controls col-md-8">
                    <label class="radio-inline">
                        <input type="radio" value="1" data-name="incentiveTrafficAllowed"  name="incentiveTrafficAllowed">Allowed
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="0" data-name="incentiveTrafficAllowed" name="incentiveTrafficAllowed">Not Allowd
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="" data-no-send-when-checked="1" data-name="incentiveTrafficAllowed" name="incentiveTrafficAllowed" >All
                    </label>
                </div>
            </div>
            <div class="control-group form-group">
                <label class="control-label col-md-4">Allowed adult/18+ traffic:
                </label>
                <div class="controls col-md-8">
                    <label class="radio-inline">
                        <input type="radio" value="1" data-name="adultTrafficAllowed"  name="adultTrafficAllowed">Allowed
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="0"  data-name="adultTrafficAllowed" name="adultTrafficAllowed">Not Allowd
                    </label>
                    <label class="radio-inline">
                        <input type="radio" value="" data-no-send-when-checked="1" data-name="adultTrafficAllowed" name="adultTrafficAllowed" >All
                    </label>
                </div>
            </div>
            <div class="control-group form-group control-group-exclude-app">
                <label class="control-label col-md-4">Exclude APP:
                </label>
                <div class="controls col-md-8">
                    <input type="hidden" name="excludedApps" :value="excludedApps.length ? excludedApps.join(',') : []">
                    <select style="" size="5" multiple="multiple" class=" exclude_app mr15" id="exclude_app">
                        <option v-for="item in excludedApps" :value="item" @click="current_exclude_app_selected = item">{{item}}</option>
                    </select>
                    <div class="">
                        <input type="button" class="btn add_app" value="Add" id="add_btn" @click="addExcludeApp" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                        <input type="button" class="btn edit_app" value="Edit" id="edit_btn" @click="editExcludeApp" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                        <input type="button" class="btn delete_app" value="Delete" id="delete_btn" @click="deleteExcludeApp">
                    </div>
                </div>
            </div>
            <div class="control-group form-group control-group-exclude-adv">
                <label class="control-label col-md-4">Exclude&nbsp;advertisers:
                </label>
                <div class="controls col-md-8">
                    <input type="hidden" name="excludedAdvs"  :value="excludedAdvs.length ? excludedAdvs.join(',') : []">
                    <select style="" size="5" multiple="multiple" class=" mr15 exclude_adv" id="exclude_adv">
                        <option v-for="item in excludedAdvsArr" v-if="item" :value="item.id" @click="current_exclude_adv_selected = item">{{item.id}} {{item.name || 'adv'}}</option>
                    </select>
                    <div class="">
                        <input type="button" class="btn add_adv" value="Add" id="add_btn" @click="addExcludeAdv" data-container="body" data-toggle="popover" data-placement="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
                        <input type="button" class="btn delete_adv" value="Delete" id="delete_btn" @click="deleteExcludeAdv" >
                    </div>
                </div>
            </div>
        </form>
      </template>
    </modal>

    <!-- <excludeAppModal :modalState="modalState_excludeApp"  :current_exclude_app_selected="current_exclude_app_selected" :hideModal="hideModal_excludeApp"   :excludeAppType="excludeAppType" :onConfirm="onAddExcludeAppConfirm" ></excludeAppModal> -->
    <exclude-app-modal
        :modalStateExcludeApp.sync="modalState_excludeApp"
        :current_exclude_app_selected="current_exclude_app_selected"
        :onConfirm="onAddExcludeAppConfirm"
        :excludeAppType="excludeAppType"
        :dialogName="'modalStateExcludeApp'">
    </exclude-app-modal>

    <!-- <addAdvModal :modalState="modalState_addAdv" :advs="enableAdvs" :hideModal="hideModal_addAdv"    :onConfirm="onAddAdvConfirm" ></addAdvModal> -->
    <add-adv-modal
        :modalStateAddAdv.sync="modalState_addAdv"
        :advs="enableAdvs"
        :onConfirm="onAddAdvConfirm"
        :dialogName="'modalStateAddAdv'">
    </add-adv-modal>
</div>
</template>

<script>
//import EditableSelect2PublisherLite from '@/components/Editable_Select2_Publisher_Lite.vue'
import Modal from "@/components/common/modal/"
import ExcludeAppModal from "../exclude-app-modal/"
import AddAdvModal from "../add-adv-modal/"
import commonDataAPI from '@/api/commonData'
import mixin_dialog from '@/mixins/dialog'
import publisherAPI from '@/api/publisher'
const EditableSelect2PublisherLite = () => import(
/* webpackChunkName: "EditableSelect2PublisherLite" */ '../editable-select2-publisher-lite/')

export default {
    data(){
        return {
            outerVisible:false,
            platform:"ios",
            categorList:[],
            sourceGeo:[],
            advs:[],
            enableAdvs:[],
            countries:"",
            excludedAdvsArr:[],
            excludedApps:[],
            excludedAdvs:[],
            renderEditable:false,
            platforms:[],
            type:[],
            excludeAppType:'',
            current_exclude_app_selected:"",
            current_exclude_adv_selected:"",
            modalState_excludeApp:"hide",
            modalState_addAdv:"hide",
            title:'Preference rules',
            additionalTitleHtml:`<p class="mt20 break-all">Please create rules of offer preference. System will approve campaigns towards this app automatically depending on the rules</p>`,
            types:[
                {
                    value:'store_app',
                    text:'Store APP'
                },
                {
                    value:'online_ddl',
                    text:'Online DDL'
                },
                {
                    value:'mobile_content',
                    text:'Mobile Content'
                },
                {
                    value:'other',
                    text:'Other APP'
                },
            ],
            platFormTypes:[
                {
                    value:'Android',
                    text:'Android'
                },
                {
                    value:'iOS',
                    text:'iOS'
                },
                {
                    value:'Windows Phone',
                    text:'Windows Phone'
                },
                {
                    value:'Other',
                    text:'Other'
                }
            ],
        }
    },

    mixins:[mixin_dialog],
    components:{EditableSelect2PublisherLite, ExcludeAppModal, AddAdvModal,Modal},
    props:{
        modalStateRule:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
        onConfirm:{
            type: Function,
            required: true,
        },
        appRules:{
            type:Object,
            required: true,
        },
        app_id:{
            type:[Number, String],
            required: false,
        },
        showAlert:{
            type: Function,
            required: true,
        }
    },
    watch:{
        modalStateRule () {
            let that = this;
            this.outerVisible = this.modalStateRule

            if(this.modalStateRule === "show" || this.modalStateRule == true) {
                that.showBsModal()
                that.excludedApps = _.compact((that.appRules.excludedApps || "" ).split(","))
                that.excludedAdvs =  _.compact((that.appRules.excludedAdvs || "" ).split(","))
                that.setExcludedAdvsArr()
            }
        },

        renderEditable: function(val) {
          this.setExcludedAdvsArr()
        },
    },
    methods:{
        showBsModal() {
            let that = this
            that.enableAdvs = [];
            that.countries  = that.convertCountry(that.appRules.countries)
            that.platforms = that.appRules.platforms.split(",")
            that.type = that.appRules.type.split(",")

            let white_list = that.appRules.white_list ? that.appRules.white_list : []
            let result = _.filter(that.advs,function(o){
                return white_list.indexOf(o.id) == -1
            })
            that.enableAdvs = result;
        },
        setExcludedAdvsArr(){
            let _arr = []
            let that = this
            _.each(this.excludedAdvs, function(item){
                let __obj = _.find(that.advs, {id:item})
                _arr.push(__obj)
            })
            this.excludedAdvsArr = _arr;
        },
        onConfirmBtn:function(){
            this.onConfirm($(this.$refs.form))

            this.handleClose()
        },
        convertCountry(data){
            return  (data || "").toLowerCase() === "all" ? '' : data
        },
        onCountrySelectSuccess(data){
            this.countries = this.convertCountry(data)
        },
        hideModal_excludeApp(){
            this.modalState_excludeApp = "hide"
        },
        hideModal_addAdv(){
            this.modalState_addAdv = "hide"
        },
        onAddExcludeAppConfirm(app_name, excludeAppType){
            if(excludeAppType === "edit") {
                let index = this.excludedApps.indexOf(this.current_exclude_app_selected)
                this.excludedApps.splice(index , 1, app_name)
                this.current_exclude_app_selected = app_name
            }else{
                if(this.excludedApps.indexOf(app_name) === -1) {
                    this.excludedApps.push(app_name)
                }
            }

        },
        onAddAdvConfirm(adv_id){
            if(this.excludedAdvs.indexOf(adv_id) === -1) {
                let obj = {}

                this.excludedAdvs.push(adv_id)
                this.setExcludedAdvsArr()
            }
        },
        editExcludeApp(){
            this.excludeAppType = "edit"
            this.modalState_excludeApp = "show"

        },
        addExcludeApp(){
            this.excludeAppType = "add"
            this.modalState_excludeApp = "show"
        },
        deleteExcludeApp(){
            let index = this.excludedApps.indexOf(this.current_exclude_app_selected)
             this.excludedApps.splice(index , 1)

        },
        addExcludeAdv(){
            this.modalState_addAdv = "show"
        },
        deleteExcludeAdv(){
            if(!this.current_exclude_adv_selected || !this.current_exclude_adv_selected.id) return
            let index = this.excludedAdvs.indexOf(this.current_exclude_adv_selected.id)
            this.excludedAdvs.splice(index , 1)
            this.setExcludedAdvsArr()

        },
    },
    created () {
        let that = this
        commonDataAPI.getGeos(function(data){
            let source = data.map(function (c_obj) {
                return {id: c_obj.code, text: c_obj.code + ' - ' + c_obj.name};
            })
            source = _.union([{ id: "all", text: "All" }], source)
            that.sourceGeo = source
            that.renderEditable = true
        })

        commonDataAPI.getAdvertisers(function(data){
            that.advs = data
        })
    },
    mounted () {
    }
}
</script>

<style scoped>
.preference_rule_form .control-label.col-md-4 {
    padding-right: 0px;
    padding-top: 2px;
}
.preference_rule_form .controls.col-md-8 {
    margin-left: 0;
}
</style>