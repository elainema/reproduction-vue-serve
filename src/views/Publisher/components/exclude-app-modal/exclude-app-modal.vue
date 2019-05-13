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
                <label class="control-label col-md-3">App Package Name: </label>
                <div class="controls col-md-9">
                    <input type="text" v-model="app_name"></input>
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

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);


export default{
    data() {
        return {
          visible:false,
          app_name:""
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    computed: {
      title (){
        return this.excludeAppType === "add" ?  "Add App" : "Edit App"
      }
    },
    watch: {
      modalStateExcludeApp () {
          let that = this
          this.visible = this.modalStateExcludeApp
          if ((this.modalStateExcludeApp == 'show' || this.modalStateExcludeApp == true) && that.excludeAppType === "add"){
            that.app_name = ""
          }
      },
      current_exclude_app_selected (){
        this.app_name  = this.current_exclude_app_selected
      },
    },
    methods:{
      onConfirmBtn:function(){
        this.onConfirm(this.app_name, this.excludeAppType)
        this.handleClose()
      }
    },
    props:{
      modalStateExcludeApp: {
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
      current_exclude_app_selected:{
        type: String,
        required: true,
      },
      excludeAppType:{
        type:String,
        required: true
      }
    }
}
</script>