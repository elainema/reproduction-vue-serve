<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="./">Home</router-link></li>
            <li class="active">File Application</li>
        </ul>
    </div>

    <div class="box">
        <div class="box-header">
            <h2>File Application</h2>
        </div>
        <div class="box-container">
            <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
            <div class="box-content">
                <div class="overflow_scroll">
                    <table class="table table-hover tablesorter list-table" id="file_list">
                        <colgroup>
                            <col width="25" />
                            <col width="280" />
                            <col width="150" />
                            <col width="80" />
                        </colgroup>
                        <thead>
                            <tr>
                                <th><input type="checkbox" id="check_all" v-model="toggleAll" @click="selectchange"></th>
                                <th>Offer</th>
                                <th>Files</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="n in renderData" v-if="renderData.length > 0" :class="selected_id.join(',').indexOf(n.offer_id +'`'+ n.streamer_id) != '-1' ? 'active': ''">
                                <td>
                                    <input type="checkbox" name="checkItem" :value="n.offer_id +'`'+ n.streamer_id" class="check-box" v-model="selected_id" />
                                </td>
                                <td class="">
                                    <div>
                                        <a :href="n.file_path" target="_blank">{{ n.offer_id }}  -  {{ n.offer_name }}</a>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <a :href="n.file_path " target="_blank">{{ n.file_name }}</a>
                                    </div>
                                </td>
                                <td class="status"> {{ n.status }}
                                    <a href="#" class="btn btn-primar reason" v-show="reason">Reason</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-actions mt20">
                    <button type="button" class="btn btn-primary" id="btn_approve" @click="btn_action('approved')">Approved</button>
                    <button type="button" class="btn btn-default" id="btn_reject" @click="btn_action('rejected')">Rejected</button>
                </div>
            </div>
        </div>
    </div>
    <confirm_modal :modalState="file_appreved_confirm_modal" :hideModal="hideModal" :editable_modal_body="editable_modal_body" :editable_confirm_btn="editable_confirm_btn" :onConfirm="onConfirmBtn"></confirm_modal>
    <textareaModal :modalState="file_reject_confirm_modal" :hideModal="hideModal" :onConfirm="onConfirmBtn"></textareaModal>
</div>
</template>
<script>
import auth from '@/util/auth'
import alert_pop_util from '@/util/alert_pop'
import { mapGetters, mapActions } from 'vuex'
import confirm_modal from '@/components/ConfirmModal.vue'
import textareaModal from '@/components/TextareaModal.vue'

import mixin_alert_msg from '@/mixins/alert_msg'

import Vue from 'vue'

export default {
  data(){
    return {
            loadingZone:"",
            renderData:[],
            reason:false,
            selected_id:[],
            toggleAll:false,
            editable_modal_body: 'Are you sure you want to approval the file?',
            editable_confirm_btn:'Submit',
            file_appreved_confirm_modal:'hide',
            file_reject_confirm_modal:'hide',
            action:'',
            info:'',
        }
    },
    mixins: [mixin_alert_msg],
    components:{confirm_modal, textareaModal},
    computed:{
    },
    watch:{
        selected_id() {
            this.toggleAll = this.renderData.length > 0 && (this.selected_id.length == this.renderData.length)
        }
    },
    methods: {
        selectchange (e) {
            var selectall = e.target.checked
            this.toggleAll = selectall
            if (selectall) {
                this.selected_id = []
                for (var i = 0; i < this.renderData.length; i++) {
                    this.selected_id.push(this.renderData[i].offer_id +'`'+ this.renderData[i].streamer_id)
                }
            } else {
                this.selected_id = []
            }
        },
        hideModal () {
            this.file_appreved_confirm_modal = "hide"
            this.file_reject_confirm_modal = "hide"
        },
        hideAlertPop() {
          this.alertPop = "hide"
        },
        onConfirmBtn(reason) {
            let that = this
            var info = reason || that.info
            var query = {
                offer_ids:that.selected_id.join(','),
                status:that.action,
                info:info
            }
            Vue.http.post('Streamer/check', query).then(response => {
                that.showAlert(response.body.msg, 'info')
                that.getCheckList()
                that.selected_id = []
            }, response => {
                that.showAlert(response.body.msg, 'info')
            })
        },
        getCheckList() {
            let that = this
            that.renderData = [];
            Vue.http.get('Streamer/getCheckList').then(response => {
                var data = response.body && response.body.data && response.body.data.list
                if(data){
                    that.renderData = data
                }
            }, response => {
                that.showAlert(response.body.msg, 'info')
            })
        },
        btn_action(type) {
            var that = this
            var $checkedAcc= that.selected_id
            that.action = type
            if($checkedAcc.length==0){
                var msg = type === 'approved' ? "Please select a file to approve": "Please select a file to reject"
                that.showAlert(msg, 'info')
            }else{
                var modal =  type === 'approved' ? "file_appreved_confirm_modal": "file_reject_confirm_modal"
                that[modal] = 'show'
            }
        },
    },
    created () {
        this.getCheckList()
    },
}
</script>