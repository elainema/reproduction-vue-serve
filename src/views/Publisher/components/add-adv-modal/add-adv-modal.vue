<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :onConfirm="onConfirmBtn"
        :closeOnClickModal="false"
        :onCancel="handleClose">
        <template slot="dialogBody">
          <form class="form-horizontal" role="form">
            <div class="control-group form-group">
                <label class="control-label col-md-3">Advertiser:</label>
                <div class="controls col-md-9">
                    <chosen  v-if="advChosen" ref="chosen" :chosen="advChosen"  :chosen_name="'adv_id'" :chosen_type="'simple'" style="width:auto;" :default_option="'- All Advs -'" :changeCallback="changeCallback"></chosen>
                </div>
            </div>
          </form>
        </template>
    </modal>
</div>
</template>

<script>

import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'

import chosen from "@/components/Chosen.vue"
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);


export default{
    data() {
        return {
          visible:false,
          title:'Add Advertiser',
          advChosen:[],
          selected:''
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal,chosen
    },
    computed: {
    },
    watch: {
      modalStateAddAdv () {
          this.visible = this.modalStateAddAdv
      },
      advs: function(val) {
        if(val){
          this.advChosen = { name: "advertiser_id", trans_name:"",  full_name: "advertiser_id", data: this.advs }
        }
      }
    },
    methods:{
      onConfirmBtn:function(){
          this.onConfirm(this.selected)
          this.handleClose()
      },
      changeCallback(selected){
        this.selected = selected
      }
    },
    props:{
        modalStateAddAdv: {
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
        advs:{
          type:Array,
          required: false
        }
    },
    created() {
    },
}
</script>