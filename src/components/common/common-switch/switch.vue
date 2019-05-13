<template>
  <div class="inline_block switch" v-yeah-loading='loading'>
    <i-switch size="large" :name="switch_param" v-model="isEnable" @on-change="switchOnChange" :disabled="disabled" ref="switch" class="mb10" :true-value="1" :false-value="0">
        <span slot="open">{{ yes_text }}</span>
        <span slot="close">{{ no_text }}</span>
    </i-switch>
    <i class="icon-ok ibutton-edit-done" ref="ibutton_edit_done"></i>
  </div>
</template>

<script>
/*
* 如果在点击开关时只有默认行为(开>关，关>开)，不立即调接口，也不会弹窗，也不需要设计参数(用于某方法自动获取值等)，也不影响其他模块/内容的展示隐藏等，直接调用iview开关组件即可
*/
import { mapGetters } from 'vuex'
import Vue from "vue"
import mixin_switch from '@/mixins/switch'
import  { Switch }  from 'iview';
Vue.component('iSwitch', Switch);

export default {
  data () {
    return {
      loading: false,
    }
  },
  mixins:[mixin_switch],
  computed: {
      ...mapGetters({
        switchInfo:"switchInfo",
      }),
      isEnable: {
        get: function () {
          let value = 0
          if (this.updateState) {
            value = this.switchInfo && this.switchInfo[this.switch_param] || 0
          } else {
            value = this.default_val ? 1 : 0
            
          }
          return value
        },
        set: function () {
        }
      },
  },
  props: {
    default_val:{
      required: true,
      default: ''
    },
    switch_param: {
      type: String, // String, Number, Boolean, Function, Object, Array
      required: true,
      default: ''
    },
    showAlert: {
      type: Function,
      required: false,
      default: () => {}
    },
    yes_text: {
      type: String,
      required: false,
      default: 'Yes'
    },
    no_text: {
      type: String,
      required: false,
      default: 'No'
    },
    switchDefaultAPI: {
      type: String,
      required: false,
      default: 'Offer2/setTask'
    },
    switchGetCustomParam:{}, // 点击开关时不需要额外处理，比如弹窗提示，需要用户输入等，自定义接口参数
    onSuccess:{
      /*
      * 点击开关立即调用接口，成功后的回调处理
      */
      type: Function,
      required: false,
      default: () => {}
    },
    render:{
      type: Boolean,
      required: false,
      default: false
    },
    updateInfo:{
      type: Function,
      required: false,
      default: () => {}
    },
    disabled:{
      type: Boolean,
      required: false,
      default: false
    },
    updateState:{
      /*
      *updateState，某些开关需要在点击后关联其他模块的展示或者处理，也需设置input name(以供$(form).serialize()获取参数)，即switch_param,但是又和其他模块使用的参数名重复，可设置此参数为false,参考create offer用法
      */
      type: Boolean,
      required: false,
      default: true
    },
    onChange:{},
    /*
    * onChange
    * 点击开关后需要进行额外的输入或者处理时，使用此方法，
    * 需要注意的是，使用此方法时，接口调用及回调需要自己处理,包括失败重置开关等
    * 重置开关只需调用this.$store.dispatch('updateSwitchInfo', {[this.switch_param]:value})或者this.editCancel()封装在app/mixins/switch.js里
    */
    setOffWhenDisabled:{
      type: Boolean,
      required: false,
      default: false
    }
  },
  watch:{
    render (newVal, oldVal){
      if (newVal) {
        let that = this
        that.$nextTick(function() {
          that.loading = false
        })
      }
    },
    default_val: {
      immediate:true,
      handler:function (newVal, oldVal){
        if (this.switch_param && this.updateState) {
          this.$store.dispatch('updateSwitchInfo', {[this.switch_param]:this.default_val == 1 ? 1: 0})
        }
      }
    },
    disabled (newVal, oldVal) {
      if(newVal && this.setOffWhenDisabled && this.updateState && this.render) {
        this.$store.dispatch('updateSwitchInfo', {[this.switch_param]: 0})
        this.switchOnChange();
      }
    },
  },
  methods: {
    switchOnChange (status) {
      let that = this
      let value = status ? 1: 0

      if (this.switch_param && this.updateState) {
        this.$store.dispatch('updateSwitchInfo', {[this.switch_param]:value})
      }
      if (that.onChange) {
        that.onChange(value,that.switch_param)
        return
      }
      let query = {
        [this.switch_param]:value
      }
      if (that.switchGetCustomParam) {
        query = that.switchGetCustomParam(this.switch_param,value)
      } else {
        query = that.getSwitchCustomParam(this.switch_param,value)
      }
      let switch_api = that.switchDefaultAPI
      that.loading = true
      Vue.http.post(switch_api, query).then(response => {
          that.updateInfo && that.updateInfo(query);
          $(that.$refs.ibutton_edit_done).show().delay(1250).fadeOut(500);
          that.showAlert && that.showAlert(response.body.msg, "success");
          that.onSuccess && that.onSuccess(that.switch_param, value)
          that.loading = false
      }, response => {
          if (this.switch_param && this.updateState) {
            this.$store.dispatch('updateSwitchInfo', {[this.switch_param]:value ? 0: 1})
          }
          that.showAlert && that.showAlert(response.body.msg)
          that.loading = false
      })
    }
  },
  created() {
    if (!this.render) {
      this.loading = false
    }
  }
}
</script>
<style lang="less">
.switch{
  .ivu-switch-large.ivu-switch-checked:after{
    left:70%;
  }
  input{
    display:none;
  }
  .ivu-switch-inner {
    color: #000 !important;
    font-size: 14px;
    position: absolute;
    left: 30%;
    width: 70%;
    text-align: center;
  }

  .ivu-switch {    
    box-sizing: content-box;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    background-image: -moz-linear-gradient(top, #e6e6e6, #ffffff);
    background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#e6e6e6), to(#ffffff));
    background-image: -webkit-linear-gradient(top, #e6e6e6, #ffffff);
    background-image: -o-linear-gradient(top, #e6e6e6, #ffffff);
    background-image: linear-gradient(to bottom, #e6e6e6, #ffffff);
    background-repeat: repeat-x;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffe6e6e6', endColorstr='#ffffffff', GradientType=0);
    border-color: #ffffff #ffffff #d9d9d9;
    border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
    background-color: #ffffff;

    &:after{
      width: 30%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 0;
      border-right: 1px solid #cccccc;
      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
      background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
      background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
      background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
      background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
      background-repeat: repeat-x;
      filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
      border-color: #e6e6e6 #e6e6e6 #bfbfbf;
      border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
      background-color: #e6e6e6;
    }
    &:focus{
      box-shadow: none;
    }
  }
  .ivu-switch-checked{
    border-color: #ccc;
    background-color: #f70;    
    background: #f70;
    .ivu-switch-inner{
      color: #fff !important;
      text-align: center !important;
      width: 70% !important;
      left: 0 !important;
    }
  }
}
</style>