<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :titleHtml="titleHtml"
  :onConfirm="onConfirm"
  :confirmText="'OK'"
  :cancelOnLeft="true"
  :onCancel="clickOnCancel">
  <template slot="dialogBody">
    <div class="dialogBody"> 
        <h4>Are you sure to make the offer private? </h4>
        <ul>
            <li>Level 1 &amp; 2 affiliates blocked. All application info is removed.</li>
            <li>Level 3 affiliates approved.</li>
            <li>Previous manual adjustment is not affected.</li>
            <li>The change you made results in offer access difference of affiliates.</li>
        </ul>
        <p>We suggest your in-time notification to your affiliates about all these changes.</p>
    </div>
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
        modalStateConfirmPermission:{
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
    },
    watch:{
        modalStateConfirmPermission () {
            this.outerVisible = this.modalStateConfirmPermission
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
<style scoped="" lang="less">
.dialogBody {
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