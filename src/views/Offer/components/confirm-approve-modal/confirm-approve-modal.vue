<template>
<modal 
    :dialogVisible.sync="outerVisible"
    :titleHtml="titleHtml"
    :onConfirm="onConfirm"
    :onCancel="clickOnCancel">
    <template slot="dialogBody">
      <div v-html="dialogBody" id="confirm_approve_modal"></div>
    </template>
</modal>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');
export default {
    data(){
        return {
            titleHtml:'<h3 class="red">Warning</h3>',
            outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    props:{
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
        modalStateConfirmApprove:{
            type:[Boolean,String],
            required:true
        },
        onConfirm:{
            type:Function,
            required:true
        },
        onCancel:{
            type:Function,
            required:true
        },
        dialogBody:{
            type: String,
            required: true,
            default: ''
        },
    },
    watch:{
        modalStateConfirmApprove () {
            this.outerVisible = this.modalStateConfirmApprove
        }
    },
    methods:{
        clickOnCancel:function(){
            this.onCancel()
            this.handleClose()
        }
    }
}
</script>
<style lang="less">
#confirm_approve_modal{
    h4 {
        font-size: 20px;
    }  
    ul {
        margin: 0;
        padding: 10px 0;
        li {
            font-size: 14px;
            display: table;
            color: #666;
            line-height: 24px;
        }
    }
    p {
        font-size: 13px;
        margin: 10px 0;
        font-weight: bold;
        color: #333;
    }

}
</style>