<template>
<div>
    <modal
      :dialogVisible.sync="visible"
      :title="editable_modal_title"
      :onConfirm="onConfirmBtn"
      :closeOnClickModal="false"
      :confirmText="editable_confirm_btn"
      :onCancel="handleClose">
      <template slot="dialogBody">
        <b><p class="demotion " id="levelConfirm">Are you sure to change the affiliate level to  {{curVal}}?</p></b>
        <span v-html="formatAffLevelNote"></span>
        <p class="demotion ">The change you made results in a status difference of offers!</p>
        <p class="demotion ">The following offers will be affected that <span class="red"><i>generated some clicks</i></span> in last 7 days</p>
        <div id="levelInfo"></div>
        <p>we suggest your in-time notification to your affiliates about all these changes.</p>
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
          app_name:""
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    
  computed: {
    formatAffLevelNote(){
        let desc = ""
        switch (this.curVal) {
            case "1":
                desc += "<ul class='affLevel'>" + "<li>Public offer without approval:approved</li>" + "<li>Public offer need approval:unapproved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "2":
                desc += "<ul class='affLevel'>" + "<li>Public offer:approved</li>" + "<li>Private offer:blocked</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
            case "3":
                desc += "<ul class='affLevel'>" + "<li>All offers:approved</li>" + "<li>Previous manual adjustment is not affected</li>" + "</ul>"
                break;
        }
        return desc
    }

  },
    watch: {
      modalState () {
          this.visible = this.modalState
      },
    },
    methods:{
      onConfirmBtn:function(){
        this.onConfirm()
        this.handleClose()
      }
    },
    props:{
      modalState: {
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
      editable_modal_title:{
        type:String,
        required: false,
        default:"Confirm"
      },
      editable_confirm_btn:{
        type:String,
        required: false,
        default:'Confirm'
      },
      curVal:{
        type:String,
        required: true,
        default:"Confirm"
      }
    }
}
</script>