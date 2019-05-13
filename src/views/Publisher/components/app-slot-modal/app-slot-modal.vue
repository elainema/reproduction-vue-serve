<template>
<div>
  <modal
    :dialogVisible.sync="visible"
    :title="title"
    :showConfirmText="false"
    :showCancelText="false"
    :closeOnClickModal="false"
    :onCancel="handleClose">
    <template slot="dialogBody">
      <div class="overflow_scroll" style="min-height: 350px;">
        <table class="table table-hover tablesorter list-table" id="" >
          <thead>
              <tr>
                  <th>Slot ID</th>
                  <th>Slot Name</th>
                  <th>Status</th>
                  <th>Slot Type</th>
                  <th>Slot Size</th>
                  <th></th>
              </tr>
          </thead>
          <tbody id="slotsList">
            <tr v-for="item in slotsList">
              <td><a href="javascript:;" class="slotID editable editable-click" @click="editSlot(item)">{{item.id}}</a></td>
              <td>{{item.name}}</td>
              <td>{{item.status}}</td>
              <td>{{item.type}}</td>
              <td>{{item.width}} * {{item.height}}</td>
              <td><a href="javascript:;" class="delete fa fa-remove" @click="deleteSlot(item.id)"></a></td>

            </tr>
          </tbody>
        </table>
        <button type="button" class="btn btn-primary addSlot pull-right mt20" @click="addSlot">Add</button>
      </div>
    </template>
  </modal>
  <app-slot-edit-modal
    :modalStateAppSlotEdit.sync="modalState_appSlotEdit"
    :slotData="currentSlotData" 
    :appData="appData" 
    :appSlotModalType="appSlotModalType"
    :onConfirm="onAppSlotEditConfirm" 
    :appTemplate="appTemplate"
    :showAlert="showAlert"
    append-to-body
    :dialogName="'modalStateAppSlotEdit'">
  </app-slot-edit-modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);

//import AppSlotEditModal from '@/components/AppSlotEditModal.vue/'
const AppSlotEditModal = () => import(
/* webpackChunkName: "AppSlotEditModal" */ '../app-slot-edit-modal/'
);

export default{
    data() {
        return {
          visible:false,
          title:'Manage Slot',
          appSlotModalType:"",
          currentSlotData:{status:'active', type:'BANNER'},
          modalState_appSlotEdit:false
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,AppSlotEditModal
    },
    
    computed: {

    },
    watch: {
      modalStateAppSlot () {
        this.visible = this.modalStateAppSlot
      },
     /* modalStateAppSlotEdit() {
        this.modalState_appSlotEdit = this.modalStateAppSlotEdit
      }*/
    },
    methods:{
      onConfirmBtn:function(){
        this.onConfirm()
        this.handleClose()
      },
      deleteSlot:function(id){
        this.onDeleteSlot(id)
      },
      onAppSlotEditConfirm($form){
        this.onConfirm(this.appSlotModalType, $form)
      },
      addSlot(){
        this.currentSlotData = {status:'active', type:'BANNER'}
        this.appSlotModalType = "add"
        this.showModal_appSlotEdit()
      },
      editSlot(item){
        this.currentSlotData = item
        this.appSlotModalType = "edit"
        this.showModal_appSlotEdit()
      },
      showModal_appSlotEdit(){
        this.modalState_appSlotEdit = "show"
      },
    },
    props:{
      modalStateAppSlot: {
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
      slotsList:{
        type:Array,
        required: true,
      },
      onDeleteSlot:{
        type:Function,
        required: true,
      },
      appData:{
        type:Object,
        required: true,
      },
      appTemplate:{
        type:Array,
        required: true,
      },
      showAlert:{
        type:Function,
        required: true,
      },
      /*modalStateAppSlotEdit: {
        type: [Boolean,String],
        required: true,
        default: false
      },*/
    }
}
</script>