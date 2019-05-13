<template>
  <div >
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link> </li>
            <li class="active">Notice</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>Notice</h2>
            <div class="box-action">
            </div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <ul class="nav nav-tabs" id="myTab"> 
                  <li class="active"><a href="#publish" data-toggle="tab">Publish</a></li> 
                  <li><a href="#history" data-toggle="tab">History</a></li> 
                </ul> 
                
                <div class="tab-content"> 
                  <div class="tab-pane active" id="publish">
                        <form class="form-horizontal frm-entity" action="" method="post" id="publish"  @submit.prevent="onAddPmNotice">
                            <div class="control-group form-group mt20">
                                <label class="col-md-2" for="remark">Notice</label>
                                <div class=" col-md-5 nomargin">
                                    <textarea id="remark" name="remark" rows="5" class="col-md-12" v-model="content"></textarea>
                                    <p style="margin-top:3px">Maximum input <span id="max-characters"></span> characters including space and punctuation, <span id="left" style="color:red;font-weight:bold"></span> <span id="tips">left</span></p>
                                </div>
                                <div class=" col-md-offset-2 col-md-5">
                                    <button type="submit" class="btn btn-primary" id="submit">Submit</button>
                                </div>
                            </div>  
                        </form>     
                  </div> 
                  <div class="tab-pane overflow_scroll" id="history">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th width='120px' style="padding-left:25px">Start Time</th>
                                    <th width='111px'>End Time</th>
                                    <th width='320px'>Notice Content</th>
                                    <th width='140px'>Action</th>
                                </tr>

                            </thead>
                            <tbody id="notice-list">
                                <tr v-for="item in pmnotice">
                                    <td>{{item.create_time}}</td>
                                    <td>
                                        {{item.end_time}}
                                    </td>
                                    <td>{{item.content}}</td>
                                    <td>
                                        <a href="javascript:void(0)" style="color: #4e4edc;" class="stop" @click="onStopNotice(item.id)" v-if="item.status === '1'">stop</a>
                                        <span v-else></span>
                                    </td>
                                </tr>
                            </tbody>        
                        </table>
                  </div> 
                </div>
            </div>


        </div>
    </div>

    <!-- <confirmModal :modalState="modalState" :hideModal="hideModal" :onConfirm="addPmNotice" :editable_modal_title="'warning'" :editable_modal_body = "'There is published notice now. Are you sure to replace the current one? confirm'"></confirmModal>
    <confirmModal :modalState="modalState_stop" :hideModal="hideModal_stop" :onConfirm="stopNotice" :editable_modal_title="'warning'" :editable_modal_body = "'confirm stop this notice'"></confirmModal> -->
    <modal 
        :dialogVisible.sync="modalState" 
        :dialogBody="editable_modal_body1"
        :title="title"
        :onConfirm="addPmNotice">
    </modal>

    <modal 
      :dialogVisible.sync="modalState_stop" 
      :dialogBody="editable_modal_body2" 
      :title="title"
      :onConfirm="stopNotice">
    </modal>

  </div>


</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
import mixin_modal from "@/mixins/modal"
import commonDataAPI from '@/api/commonData'
/*import confirmModal from "@/components/ConfirmModal.vue"*/
import mixin_alert_msg from '@/mixins/alert_msg'
import mixin_dialog from '@/mixins/dialog'

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
export default {
    data(){
        return {
            pmnotice:[],
            content:"",
            modalState_stop:"hide",
            stopNotice_id:"",
            editable_modal_body1:"There is published notice now. Are you sure to replace the current one? confirm",
            editable_modal_body2:"confirm stop this notice",
            title:'warning',
        }
    },
    computed: {
    },
    mixins: [mixin_modal,mixin_alert_msg,mixin_dialog],
    components:{Modal},
    methods: {
        ...mapActions([
          'getPmNotice',
        ]),
        getPmNoticeList(){

            Vue.http.get('Pm/getPmNoticeList').then(response => {
                let data  = response.body.data 
                this.pmnotice = data.list || []
            }, response => {
                this.showAlert(response.body.msg)
            })
        },
        addPmNotice(){
            Vue.http.get('Pm/addPmNotice', {params:{content:this.content, flag:1}}).then(response => {
                $('[href="#history"]').click()
                this.getPmNoticeList()
                this.content = ""
                this.getPmNotice()
            }, response => {
                this.showAlert(response.body.msg)
            })
            this.modalState = 'hide'
        },
        onAddPmNotice(){
            if(!this.content) return
            this.modalState = 'show'
        },
        stopNotice(){

            Vue.http.get('Pm/changeStatusToOff', {params:{id:this.stopNotice_id }}).then(response => {
                this.getPmNoticeList()
                this.getPmNotice()
            }, response => {
                this.showAlert(response.body.msg)
            })
            this.modalState_stop = 'hide'
        },
        onStopNotice(id){
            this.stopNotice_id = id
            this.modalState_stop = "show"
        },
        hideModal_stop(){
            this.modalState_stop = "hide"
        }
    },
    mounted() {
        this.getPmNoticeList()
    }
}
</script>