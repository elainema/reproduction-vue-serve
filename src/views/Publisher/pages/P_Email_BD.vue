<template>
  <div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li><router-link to="/p_affs">Publishers</router-link> </li>
            <li class="active">AM Send Email to Publishers</li>
        </ul>
    </div>
    <ul class="nav nav-pills mb10">
        <li class="active" ><router-link to="p_email_bd">Send Email</router-link></li>
        <li><router-link to="p_bd_history">History</router-link></li>
    </ul>

    <div class="box">
        <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>

        <div class="box-header">
            <h2>AM Send Email to Publishers</h2>
            <div class="box-action">
                <!-- 
                <i class="icon-resize-full fa fa-expand" title="Max"></i>
                <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
                <i class="icon-chevron-up" title="Fold"></i>
                <i class="icon-chevron-down hide" title="Unfold"></i>
                 -->
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <div class="tabbable account-tab">
                    <ul id="opt_tabs" class="nav nav-tabs">
                        <li class="active"><a href="#select_aff" data-type="select" data-toggle="tab">Select</a></li>
                        <li><a href="#draft_email" data-type="draft" data-toggle="tab">Draft</a></li>
                        <li v-show="showPreviewTab" ><a href="#preview_email" data-type="preview" data-toggle="tab" @click.prevent="onPreview('tab')">Preview</a></li>
                    </ul>
                    <div class="tab-content mt10">

                        <div class="tab-pane active" id="select_aff">
                        <div class="tab-content">
                            <div class="tab-pane active" id="by_admin">
                                <div class="form-horizontal frm-entity">
                                    <p><strong>First Step: </strong></p>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">Choose Your Advertisers</label>
                                        <div class="controls col-md-9">
                                            <select class=" form-control col-md-6" id="admin_bd_adv" @change="onChangeMeAdv" v-model="me_adv_id">
                                                <option value="">- Advertisers -</option>
                                                <option v-for="item in advs_me" :value="item.id"> {{item.id}} - {{item.company}} </option>
                                            </select>
                                        </div>
                                    </div>

                                    <p><strong>Second Step: </strong></p>

                                    <div class="control-group form-group"  style="display:block">
                                        <label class="control-label col-md-3">Choose Your Offers</label>
                                        <div class="controls col-md-9">
                                            <chosen   :multiple_vue="true" :chosen_width="'600px'" :chosen="meOfferChosen"  :chosen_name="'offer'" :chosen_type="'simple'" :default_option="'no'" :chosen_placeholder="'- Offer -'"></chosen>

                                        </div>
                                    </div>

                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">Affiliate Status</label>
                                        <div class="controls col-md-9" id="aff_status">
                                            <form ref="status_form">
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="status[]" value="sevendays" checked="checked"> With traffic within 7 days
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="status[]" value="approved"  /> Approved
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="status[]" value="unapproved" /> Unapproved
                                                </label>
                                                <label class="checkbox-inline">
                                                    <input type="checkbox" name="status[]" value="blocked" /> Blocked
                                                </label>
                                            </form>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="col-md-offset-3 col-md-9">
                                            <a href="#" id="get_bd_affiliates" class="btn btn-primary"  @click.prevent="getAMAff">Load All Offer Related Affiliates</a>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                            <br />
                            <div id="preselect_affs">
                                <p><strong>Final Step: </strong></p>
                                <multiselect :list="publisherList" :afterSelect="afterMSSelect" :goToNext="goToNext"></multiselect>
                            </div>
                        </div>

                        <div class="tab-pane" id="draft_email">
                            <div class="form-horizontal frm-entity">
                                <div class="control-group form-group">
                                    <label class="control-label col-md-3" for="subject">Subject</label>
                                    <div class="controls col-md-9">
                                        <input type="text" class="col-md-6" id="subject" required autofocus v-model="subject" />
                                    </div>
                                </div>
                                <div class="control-group form-group">
                                    <label class="control-label col-md-3" for="content">Content</label>
                                    <div class="controls col-md-9">
                                        <!-- <textarea class="col-md-8" id="content" rows="18" required></textarea> -->
                                        <ckeditor ></ckeditor>
                                        <p id="mail_macro"><a class="label" @click.prevent="insertText('{email}')">{email}</a>, <a class="label" @click.prevent="insertText('{first_name}')">{first_name}</a>, <a class="label" @click.prevent="insertText('{last_name}')">{last_name}</a></p><!-- <span class="label">{name}</span>, <span class="label">{gender}</span>,  --><!-- <span class="label">{country}</span></p> -->
                                    </div>
                                </div>

                                <div class="control-group form-group">
                                    <label class="control-label col-md-3" >Offer</label>
                                    <div class="controls col-md-9">
                                        <select2_offer class="pull-left mr20 width-auto filter_offer" :select2_mode="'simple'" :select2_multiple=false :params_offer_api="''" :select2_class="''" :onSelect="onSelect"></select2_offer>
                                        <a href="#" class="btn btn-primary" id="add_offer" @click.prevent="addOffer">Add</a>
                                    </div>
                                </div>

                                <div class="control-group form-group">
                                    <label class="control-label col-md-3">&nbsp;</label>
                                    <div class="controls col-md-9">
                                        <a href="#" class="btn" id="go_to_preview" @click.prevent="onPreview">Preview</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane" id="preview_email">
                            <p>You are about to send the following content</p>
                            <form @submit.prevent="onSendEmailSubmit" ref="form">
                                <div class="form-horizontal frm-entity">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">Subject</label>
                                        <div class="controls col-md-9">
                                            <input type="hidden" name="title" :value="subject">
                                            <input type="text" class="col-md-6" id="pre_subject" disabled  v-model="subject"/>
                                        </div>
                                    </div>
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">Content</label>
                                        <div class="controls col-md-9">
                                            <!-- <textarea class="col-md-8" id="pre_content" rows="18" disabled></textarea> -->
                                            <input type="hidden" name="content" :value="content">
                                            <p class="col-md-8 preContent"  v-html="content">
                                                
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <p>To</p>

                                <div class="form-horizontal frm-entity">
                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">Selected Affiliates</label>
                                        <div class="controls col-md-9">
                                            <input type="hidden" name="aff_ids" :value="mail_send_affs_id.join(',')">
                                            <textarea class="col-md-8 form-control" rows="10" id="pre_aff" :value="mail_send_affs_preview" disabled></textarea>
                                        </div>
                                    </div>

                                    <div class="control-group form-group">
                                        <label class="control-label col-md-3">&nbsp;</label>
                                        <div class="controls col-md-9">
                                            <button type="submit" class="btn btn-primary" >Send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>


  </div>


</template>

<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"
import mixin_alert_msg from '@/mixins/alert_msg'
import chosen from '@/components/Chosen.vue'

import commonDataAPI from '@/api/commonData'
import multiselect from "@/components/MultiSelect.vue"
import ckeditor from '@/components/Ckeditor.vue'
const AlertPop = () => import( /* webpackChunkName: "AlertPop" */ '@/components/common/alert-pop/');

import select2_offer from "@/components/Select2Offer.vue"

export default {
    data(){
        return {
            publisherList:[],
            showPreviewTab:false,
            subject:"",
            pm_id:"",
            am_offer_ids:[],
            content:"",
            loadingZone:"",
            select_offer_data:{},
            mail_send_affs:[],
            mail_send_affs_id:[],

            advs_me:[],
            meOfferChosen:{},
            am_id:"",
            me_adv_id:""
        }
    },
    computed: {
        mail_send_affs_preview(){
            let emails = []
            _.each(this.mail_send_affs, function(item){
                if(item) {
                    emails.push(item)
                }
            })
            return emails.join("\n")
        }
    },
    mixins: [mixin_modal, mixin_alert_msg],
    components:{multiselect, ckeditor, select2_offer,AlertPop, chosen},
    methods: {

        getAMAff() {
            let params = $(this.$refs.status_form).getFormQuery()
            params.ids = $("[name=offer]").val().join(",")
            params.adv_id = this.me_adv_id
            if(!params.ids) return this.showAlert("Please choose your offer.","info")

            this.loadingZone = "ajax_loading"

                
            Vue.http.get('Offer2/getAffiliateByOfferStatus', {params:params}).then(response => {
                let data  = response.body.data
                let arr = [] 
                _.map(data.list, function(val, key) {
                    arr.push(val[0])
                })
                this.loadingZone = ""
                this.publisherList = arr
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        },
        onChangeMeAdv(){
            if(!this.me_adv_id) return
            this.loadingZone = "ajax_loading"
            Vue.http.get('Offer/getOfferByAdvIds', {params:{id:this.me_adv_id}}).then(response => {
                let data  = response.body.data
                this.meOfferChosen = { name: "offer", trans_name:"",  full_name: "offer", data: data.list }  
                this.loadingZone = ""
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        },
        afterMSSelect(emails, ids) {
            console.log(ids)
            this.mail_send_affs = emails;
            this.mail_send_affs_id = ids
        },
        goToNext(ids) {

            $('[data-type="draft"]').click()
        },
        insertText(text) {
            window.editor.insertText(text)
        },
        onPreview(type){
            let subject = this.subject
            let content = $.trim(window.editor.getData());
            
            if(!this.mail_send_affs.length) {
                this.showAlert("Please select affiliates you want to mail to.","info")
                $('[data-type="select"]').click()
                return
            }
              
            if (subject == '' || content == '') {
                this.showAlert("Subject or Content can not be empty","info")
                setTimeout(function(){
                    $('[data-type="draft"]').click()
                },0)
                
            } else {
                this.showPreviewTab = true
                this.content = content
                if(type !== "tab") {
                    $('[data-type="preview"]').click()
                }
            }
        },
        onSelect(offer) {
            this.select_offer_data = offer
        },
        addOffer(){
            let offer_data = this.select_offer_data
            if(!_.isEmpty(offer_data)) {
                let str = ' <a href="' + offer_data.preview_url + '">'+ offer_data.id + " : " + offer_data.name +'</a> ';
                window.editor.insertHtml(str);
            }
        },
        onSendEmailSubmit(){
            this.loadingZone = "ajax_loading"
            Vue.http.post('Email/sendEmailByAffId',$(this.$refs.form).getFormQuery()).then(response => {
                this.showAlert(response.body.msg, "success")
                this.loadingZone = ""
            }, response => {
                this.loadingZone = ""

                this.showAlert(response.body.msg)
            })
        },
        getsBySessionBdId(){
            this.loadingZone = "ajax_loading"
            Vue.http.get('Advertiser/getsBySessionBdId').then(response => {
                let data  = response.body.data
                this.advs_me = data  
                this.loadingZone = ""
            }, response => {
                this.loadingZone = ""
                this.showAlert(response.body.msg)
            })
        }
    },
    props:{

    },
    created () {
        let that = this
        that.getsBySessionBdId()

        commonDataAPI.getAMs(function(list){
            that.ams = list
        })
    },
    mounted() {
    }
}
</script>
<style>
    .preContent {
        height: 200px;
        margin-left: 0;
        background-color: #eee;
        border-radius: 4px;
        border: 1px solid #ccc;
        padding: 4px 6px;
        margin-bottom: 10px;
        font-size: 14px;
        color: #555;
        overflow: auto;
    },
    .filteroffer_id .chosen-container {
        width: 600px !important;
    }
</style>