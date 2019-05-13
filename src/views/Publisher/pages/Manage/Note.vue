<template>
<div class="box">
    <div class="box-header">
        <h2>Note</h2>
        <div class="box-action col-md-12">
            <a href="javascript:void(0)" id="add-note"  @click="currentState = !currentState" class="btn btn-primary mt10">{{currentState ? 'Add Note' : 'Close Note'}}</a>
            <!--
            <i class="icon-resize-full fa fa-expand" title="Max"></i>
            <i class="icon-resize-small hide fa fa-compress" title="Min"></i>
            <i class="icon-chevron-up" title="Fold"></i>
            <i class="icon-chevron-down hide" title="Unfold"></i>
             -->
        </div>
    </div>
    <div class="box-container">
        <div class="box-content form-horizontal frm-entity frm-detail">
            <div id="note-box" class="" v-show="!currentState">
                <textarea class="note-input"  v-model="remark" >
                    
                </textarea>
                <a href="javascript:void(0)"class="btn default-btn sub-btn btn-primary mt10 mb20 pull-right" @click="onSubmit">submit</a>
            </div>
            <table class="note-list table">
                <thead>
                    <th width="25%">Account Manager</th>
                    <th width="50px">Note</th>
                    <th width="30.33%">Time</th>
                </thead>

                <tbody>
                    <tr v-for="item in remarks">
                        <td class="account_manager">{{item.name}}</td>
                        <td class="note">{{item.remark}}</td>
                        <td class="time">{{item.create_time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</div>
</template>
<script>
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"

import publisherAPI from '@/api/publisher'
import editable_text_publisher from '@/components/Editable_Text_Publisher.vue'

//import eventProxy from '@/assets/js/eventproxy'
import commonDataAPI from '@/api/commonData'

//let ep = new eventProxy()
let EventProxy = require('eventproxy');
let ep = new EventProxy()
export default {
    data(){
        return {
                currentState:true,
                remark:"",
                remarks:[]
            }
    },
    computed: {
    },
    mixins: [mixin_modal],
    components:{ editable_text_publisher},
    methods: {
        onSubmit(){
            Vue.http.post("Affiliate/addRemark", {id:this.$route.query.id, remark:this.remark}).then(response => {
                this.currentState = !this.currentState;
                this.remark = ""
                this.getRemark()
            }, response => {
                this.showAlert(response.body.msg);
            })
        },
        getRemark(){
            let that = this
            publisherAPI.getRemark({id:this.$route.query.id},function(data){
                that.remarks = data.list || []

            })

        }
    },
    props:{
        publisherInfo:{},
        showAlert:{}
    },
    created () {
        this.getRemark()

    }
}
</script>
