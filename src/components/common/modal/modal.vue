<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :width="dialogWidth"
    :before-close="handleCancel">
    
    <template slot="title" class="el-dialog__header">
      <h4 :class="classList" v-if="title">{{ title }}</h4>
      <template v-if="titleHtml">
        <div v-html="titleHtml"></div>
      </template>
      <template v-if="additionalTitleHtml">
        <div v-html="additionalTitleHtml"></div>
      </template>
      <button type="button" aria-label="Close" class="el-dialog__headerbtn">
        <i class="el-dialog__close el-icon el-icon-close"></i></button>
    </template>
    
    <template v-if="dialogBody" class="el-dialog__body">
      <div v-html="dialogBody" :class="classList"></div>
    </template>
    <template v-else>
      <slot name="dialogBody"></slot>
    </template>

    <template slot="footer" v-if="!dialogFooter">
      <el-button type="primary" @click="handleClickOnConfirm" v-if="showConfirmText" :disabled="disabled" v-html="confirmText"></el-button>
      <el-button @click="handleClickOnCancel" v-if="showCancelText" :class="{'order0':cancelOnLeft}">{{cancelText}}</el-button>
    </template>
    <template slot="footer" v-if="dialogFooter">
      <slot name="dialogFooter"></slot>
    </template>
  </el-dialog>
</template>

<script>
import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'
export default {
  data() {
    return {
      dialogName:'dialogVisible'
    };
  },
  computed:{
    visible() {
      if (typeof(this.dialogVisible) === "boolean") {
        return this.dialogVisible
      }
      if (typeof(this.dialogVisible) === "string") {
        if (this.dialogVisible == 'show' || this.dialogVisible == 'true') {
          return true
        } else {
          return false
        }
      }
    }
  },
  watch:{
  },
  mixins:[mixin_dialog],
  props: {
    closeOnClickModal:{
      type:Boolean,
      required:false,
      default:true,
    },
    closeOnPressEscape:{
      type:Boolean,
      required:false,
      default:true,
    },
    disabled:{
      type:Boolean,
      required:false,
      default:false,
    },
    dialogVisible: {
      type: [String,Boolean],
      required: true,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    classList:{
      type: String,
      required: false,
      default: ''
    },
    dialogBody:{
      type:String,
      required: false,
      default: ''
    },
    confirmText: {
      type: String,
      required: false,
      default: 'Confirm'
    },
    showConfirmText: {
      type: Boolean,
      required: false,
      default: true
    },
    cancelText: {
      type: String,
      required: false,
      default: 'Cancel'
    },
    showCancelText: {
      type: Boolean,
      required: false,
      default: true
    },
    // 点击确认按钮时除了隐藏子组件之外需要额外在父组件处理的函数
    onConfirm: {
      type: Function,
      required: false
    },
    // 点击取消按钮时除了隐藏子组件之外需要额外在父组件处理的函数
    onCancel: {
      type: Function,
      required: false
    },
    // 某些模态框需要在顶部展示除title之外的其他静态文本
    additionalTitleHtml:{
      type: String,
      required: false,
      default: ''
    },
    // 某些模态框顶部title有自定义的额外内容
    titleHtml:{
      type: String,
      required: false,
      default: ''
    },
    dialogWidth:{
      type: [String,Number],
      required: false,
      default: '600px'
    },
    clickOnCancel:{
      type: Function,
      required: false
    },
    dialogFooter:{
      type: [String,Boolean],
      required: false,
      default: false
    },
    // 取消按钮位于左侧
    cancelOnLeft:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    handleCancel() {
      this.onCancel && this.onCancel()
      this.handleClose()
    },
    handleClickOnCancel() {
    // 特殊情况，像EditBlendTrafficModal，点击取消(reset)按钮时自定义其他方法，并不关闭模态框，而在点击X时依旧是关闭模态框，故需props参数clickOnCancel和onCancel
      if (this.clickOnCancel) {
        this.clickOnCancel()
        return;
      }

    // 默认情况下，点击模态框底部取消按钮和点击X都是关闭当前模态框,同步更新模态框状态
      if (this.onCancel) {
        this.onCancel();
        return;
      }

      this.handleClose()
    },
    handleClickOnConfirm(){
      if (this.onConfirm) {
        this.onConfirm();
        return;
      }
      this.handleClose()
    }

  }
};
</script>

<style lang="less">
@import "~@css/_modal.less";
.order0{
  order:0 !important;
}
</style>