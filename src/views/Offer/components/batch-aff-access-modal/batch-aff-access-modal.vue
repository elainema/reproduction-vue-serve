<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :title="title"
  :onConfirm="onConfirm"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <form class="form-horizontal" ref="selecAff">
        <div class="control-group form-group">
            <div class="col-md-12">
                <select2-aff :select2_mode="'simple'" :showSelectAll="false" :aff_name="'aff_ids'"></select2-aff>
            </div>
        </div>
    </form>
  </template>
</modal>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'

const Select2Aff = () => import(
/* webpackChunkName: "Select2Aff" */ '@/components/Select2Aff.vue');
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');
export default {
    data(){
        return {
            value: "",
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            affs: '',
            outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,Select2Aff
    },
    computed:{
        title () {
            return `Batch ${this.batch_title} Affiliate Access `
        }
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
        batch_title:{
            type:String,
            required: true,
        },
        batchAffAccess:{
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
            this.batchAffAccess(this.getParams())
        },
        getParams() {
            var affs = $(this.$refs.selecAff).getFormQuery();
            return affs;
       }
    }
}
</script>