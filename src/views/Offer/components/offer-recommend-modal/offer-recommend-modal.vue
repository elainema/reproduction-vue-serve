<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :onConfirm="onConfirm"
  :title="'Recommend Reason'"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <textarea class="text_area" id="recommendInfo" v-model="recommend_info"></textarea>
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
            outerVisible:false,
            recommend_info: ''
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    props:{
        modalState:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
            default: ''
        },
        setBatchRecommendOffer:{
            type:Function,
            required: true,
        }
    },
    watch:{
        modalState () {
            this.outerVisible = this.modalState
        }
    },
    methods:{
        onConfirm() {
            var params = {
                recommend_info: this.recommend_info,
            }
            this.setBatchRecommendOffer(params)
        }
    }
}
</script>