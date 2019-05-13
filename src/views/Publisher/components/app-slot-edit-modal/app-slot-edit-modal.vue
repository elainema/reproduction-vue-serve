<template>
<div>
  <modal
    :dialogVisible.sync="visible"
    :title="title"
    :onConfirm="onConfirmBtn"
    :onCancel="onCancel">
    <template slot="dialogBody">
      <form class="form-horizontal form-edit-slot" ref="form">
        <div class="control-group form-group">
            <label class="control-label col-md-3">App Name</label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <input type="text" data-name="devapp_name" :value="appData.name" readonly=readonly />
                    <input type="hidden" name="devapp_id" :value="appData.id" />
                    <input type="hidden" name="id" :value="slotData.id" />
                </div>
            </div>
        </div>
        <div class="control-group form-group">
            <label class="control-label col-md-3">Name
                <i class="icon-exclamation red"></i>
            </label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <input type="text" id="name" name="name" value="" class="txt-required" v-model="slotData.name"/>
                </div>
            </div>
        </div>
        <div class="control-group form-group">
            <label class="control-label col-md-3">Token</label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <input type="text" data-name="token" value="" readonly=readonly  v-model="slotData.token"/>
                </div>
            </div>
        </div>
        <div class="control-group form-group">
            <label class="control-label col-md-3">Status
                <i class="icon-exclamation red"></i>
            </label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <select class=" form-control txt-required" name="status"  id="status" v-model="slotData.status">
                        <option value="active" selected>Active</option>
                        <option value="paused">Paused</option>
                        <option value="deleted">Deleted</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="control-group form-group">
            <label class="control-label col-md-3">Type
                <i class="icon-exclamation red"></i>
            </label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <select class=" form-control txt-required" name="type" id="type" v-model="slotData.type">
                        <option value="BANNER" selected>BANNER</option>
                        <option value="NATIVE">NATIVE</option>
                        <option value="INTERSTITIAL" data-action='{".control-group-size":"hide","[name=width],[name=height]":"emptyVal"}'>INTERSTITIAL</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="control-group form-group control-group-size " v-if="slotData.type !== 'INTERSTITIAL' ">
            <label class="control-label col-md-3">Size
                <i class="icon-exclamation red"></i>
            </label>
            <div class="controls col-md-9">
                <input type="text" name="width" value="" id="size" class="col-md-3 txt-required" v-model="slotData.width"/> X 
                <input type="text" name="height" value=""  id="size" class="col-md-3 txt-required" v-model="slotData.height"/>
            </div>
        </div>
        <div class="control-group form-group control-group-size hide" v-else>
            <label class="control-label col-md-3">Size
                <i class="icon-exclamation red"></i>
            </label>
            <div class="controls col-md-9">
                <input type="text" name="width" value=""/> X 
                <input type="text" name="height" value="">
            </div>
        </div>

        <div class="control-group form-group mb10">
            <label class="control-label col-md-3">Template
            </label>
            <div class="controls col-md-9">
                <div class="input-append">
                    <select class="  form-control  col-md-9 pull-left mr10" data-name="template" v-model="template" ref="template" @click="onChangeTemplate">
                        <option value="">select a template</option>
                        <option v-for="item in appTemplate" :value="item.id" :data-val="item.name" :data-item="JSON.stringify(item)">{{item.id}} - {{item.name}}</option>
                    </select>
                    <a href="javascript:;" title="" class="btn btn-primary  addSlotTemplate col-md-2" id="" @click="addSlotTemplate">Add</a>
                </div>
            </div>
        </div>
        <div class="control-group control-group-template">
            <label class="control-label col-md-3"></label>
            <div class="controls col-md-9">
                <input type="hidden" name="templates[]" v-for="item in templateIds.split(',')" :value="item">
                <ul ref="templateList">
                  <li v-for="(item,index) in slotTemplate" :data-id="item.id" ><a class="mr20" href="javascript:;" data-toggle="popover" data-placement="top" data-trigger="click" data-html="true" data-original-title="" title="">{{item.id}} - {{item.name}}</a> <a href="javascript:;" class="delete fa fa-remove" @click="deleteSlotTemplate(index, $event)"></a></li>
                </ul>
            </div>
        </div> 
        <div class="control-group form-group mb10" v-if="appSlotModalType == 'edit'">
          <label class="control-label col-md-3">Gift ECPM Slot:</label>
          <div class="controls col-md-9">
              <div class="input-append">
                  <input class="col-md-6 form-control" id="gift_ecpm_slot" type="number" name="gift_ecpm_ratio" v-model="slotData.giftEcpmRatio">
              </div>
          </div>
        </div>
      </form>
    </template>
  </modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);

export default{
    data() {
        return {
          visible:false,
          template:"",
          slotTemplate:[],
          templateIds:"",
          currentTemplate:""
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    
    computed: {
      title() {
        return this.appSlotModalType == 'edit' ? "Edit Slot" : "Add Slot"
      }
    },
    watch: {
      modalStateAppSlotEdit () {
        this.visible = this.modalStateAppSlotEdit
      },
    },
    methods:{
      onCancel() {
        this.handleClose()
      },
      onConfirmBtn:function(){
        let that = this;
        if (this.appSlotModalType == 'edit' && (this.slotData.giftEcpmRatio > 2 || this.slotData.giftEcpmRatio < 0))  {
            that.showAlert("The gift ECPM ratio value must be between 0 and 2 !", "info")
            return false
        }
        let arr = []
        $(this.$refs.templateList).find("li").each(function(){
          arr.push($(this).attr("data-id"))
        })
        this.templateIds = arr.join(",")
        this.$nextTick(function(){
          that.onConfirm($(that.$refs.form))
        })
        this.handleClose()
      },
      addSlotTemplate(){
        if(this.currentTemplate) {
          let obj = JSON.parse(this.currentTemplate)
          if(_.findIndex(this.slotTemplate, {id:obj.id}) === -1) {
            this.slotTemplate.push(obj)
          }
        }
      },
      onChangeTemplate(item){
        this.currentTemplate = $(this.$refs.template).find("option:selected").attr("data-item")
      },
      deleteSlotTemplate(index, $event){
        this.slotTemplate.splice(index, 1)
      }
    },
    props:{
      modalStateAppSlotEdit: {
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
      appSlotModalType:{
        type: String,
        required: true,
      },
      appData:{
        type: Object,
        required: true,
      },
      slotData:{
        type: Object,
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
    }
}
</script>

<style scoped>
.macro_link{
  color: #08c;
  text-decoration: underline;
}
</style>