<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :onConfirm="onConfirmBtn"
        :closeOnClickModal="false"
        ref="modal"
        :onCancel="handleClose">
        <template slot="dialogBody">
           <form class="form-horizontal form-report" ref="form">
                <div v-show="publisherAppModalType != 'capProportionEdit'">
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">ID</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="hidden" name="publisher_id" :value="publisher_id">
                                <input type="text" name="id" readonly="readonly" class="col-md-12" v-model="modalData && modalData.id || ''">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Name
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="name" id="name" class="txt-required col-md-12" v-model="modalData.name">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Status
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="status" id="status" v-model="modalData.status">
                                    <option value="active" selected="">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="deleted">Deleted</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Platform
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="platform" id="platform" @change="onChangePlatform"  v-model="modalData.platform">
                                    <option value="ios" selected="">IOS</option>
                                    <option value="android">Android</option>
                                    <option value="windows">Windows</option>
                                    <option value="others">Others</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Category
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="category_id" id="category" data-name="categoryId"  v-model="modalData.categoryId || categorList && categorList[0] && categorList[0].id">
                                  <option v-for="item in categorList" :value="item.id">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Keyword
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="keyword" id="keyword" class=" col-md-12" v-model="modalData.keyword">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Version
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="version" id="version" class=" col-md-12" v-model="modalData.version">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Download Url
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="download_url" id="url" class="txt-required url-value col-md-12" v-model="modalData.download_url">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Package Name/Bundle Id
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input type="text" name="pkg_name" data-name="package_name" id="pkg_name" class="txt-required   col-md-12" v-model="modalData.package_name">
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Description
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <textarea id="" name="description" class=" col-md-12"  v-model="modalData.description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">DAU
                            <i class="icon-exclamation red"></i>
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="dau" v-model="modalData.dau">
                                    <option value="0-1w">0 - 1w</option>
                                    <option value="1w-10w">1w - 10w</option>
                                    <option value="10w-50w">10w - 50w</option>
                                    <option value="50w-100w">50w - 100w</option>
                                    <option value=">100w"> &gt; 100w</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">LBS Status
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="lbs_status" data-name="acquire_location" v-model="modalData.lbs_status">
                                    <option value="true" selected="">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Paid App
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="paid_app" data-name="is_charged" v-model="modalData.paid_app">
                                    <option value="true" selected="">Yes</option>
                                    <option value="false">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3">Target User Gender
                        </label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class=" form-control txt-required" name="target_user_gender" data-name="gender" v-model="modalData.gender">
                                    <option value="all" selected="">All</option>
                                    <option value="male-oriented">Male oriented</option>
                                    <option value="female-oriented">Female oriented</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="control-group form-group">
                        <label class="control-label col-md-3" for="">Target User Age</label>
                        <div class="controls col-md-9" id="calcus_chk_box">
                            <input type="hidden" name="target_user_age" data-name="age" v-model="target_age.join(',')">
                            <label class="checkbox-inline">
                                <input type="checkbox" value="0-17" name="" data-name="target_age" v-model="target_age"> 0-17
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="18-24" name="" data-name="target_age" v-model="target_age"> 18-24
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="25-34" name="" data-name="target_age" v-model="target_age"> 25-34
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="35-44" name="" data-name="target_age" v-model="target_age"> 35-44
                            </label>
                            <label class="checkbox-inline">
                                <input type="checkbox" value="45-54" name="" data-name="target_age" v-model="target_age"> 45-54
                            </label>
                            <label class="checkbox-inline no-margin">
                                <input type="checkbox" value=">55" name="" data-name="target_age" v-model="target_age"> 55 or more
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-group" v-show="publisherAppModalType === 'capProportionEdit' || publisherAppModalType === 'edit'">
                    <label class="control-label col-md-3">Proportion Cap:</label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input class="col-md-6" type="number" name="daily_conversions_percentage" v-model="modalData.dailyConversionsPercentage"><span>%</span>
                        </div>
                    </div>
                </div>
                <div class="form-group"  v-show="publisherAppModalType === 'capProportionEdit' || publisherAppModalType === 'edit'">
                    <label class="control-label col-md-3">Uniform Cap:</label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input class="col-md-6 form-control" type="number" name="daily_conversions" v-model="modalData.dailyConversions">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-3">Offer Max Count:</label>
                    <div class="controls col-md-9">
                        <div class="input-append">
                            <input class="col-md-6 form-control txt-required" id="offerMaxCount" type="number" name="offer_max_count" v-model="modalData.offerMaxCount">
                        </div>
                    </div>
                </div>
                <template v-if="publisherAppModalType == 'edit'">
                    <div class="form-group">
                        <label class="control-label col-md-3">Gift ECPM Type:</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <select class="" name="gift_ecpm_type" id="gift_ecpm_type" v-model="modalData.giftEcpmType">
                                    <option value=" " selected="">-Please select Gift ECPM Type-</option>
                                    <option value="app">app</option>
                                    <option value="slot">slot</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group" v-if="modalData.giftEcpmType == 'app'">
                        <label class="control-label col-md-3">Gift ECPM Ratio:</label>
                        <div class="controls col-md-9">
                            <div class="input-append">
                                <input class="col-md-6 form-control" id="gift_ecpm_ratio" type="number" name="gift_ecpm_ratio" v-model="modalData.giftEcpmRatio">
                            </div>
                        </div>
                    </div>
                </template>
            </form>
        </template>
    </modal>
</div>
</template>

<script>

import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
import publisherAPI from '@/api/publisher'

import chosen from "@/components/Chosen.vue"
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);


export default{
    data() {
        return {
            visible:false,
            platform:"ios",
            categorList:[],
            modalData:{},
            target_age:[],
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal,chosen
    },
    computed: {
        title() {
            return this.publisherAppModalType === 'capProportionEdit' ? 'Allow Cap' : (this.publisherAppModalType === 'edit' ? 'Edit App' : "Add App")
        }
    },
    watch: {
      modalState (msg) {
        this.visible = this.modalState
        if(msg == 'show' || msg == true){
            this.getCategoryList()
        }
      },
      advs: function(val) {
        if(val){
          this.advChosen = { name: "advertiser_id", trans_name:"",  full_name: "advertiser_id", data: this.advs }
        }
      },
      appData() {
        this.modalData = this.appData
        this.target_age = this.appData.age ? this.appData.age.split(",") : []
      }
    },
    methods:{
        onConfirmBtn:function(){
            this.onConfirm($(this.$refs.form))
            //this.modalData = {}
            this.target_age = []
        },
        getCategoryList(){
          let that = this
          publisherAPI.getCategoryList({type:this.platform},function(data){
            that.categorList = data
          })
        },
        onChangePlatform(){
          this.getCategoryList()
        },
    },
    props:{
        modalState: {
          type: [Boolean,String],
          required: true,
          default: false
        },
        dialogName: {
          type: String,
          required: true,
        },
        onConfirm: {
          type: Function,
          required: true
        },
        publisher_id:{
          type:String,
          required: false
        },
        publisherAppModalType:{
          type:String,
          required: false
        },
        appData:{
          type:Object,
          required: false
        }
    },
    created() {
    },
}
</script>