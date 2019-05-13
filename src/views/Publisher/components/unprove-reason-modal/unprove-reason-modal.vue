<template>
<modal 
    :dialogVisible.sync="outerVisible"
    :title="'Problems:'"
    :onConfirm="onConfirmBtn"
    :onCancel="handleClose">
    <template slot="dialogBody">
        <div>
            <div class="row-fluid">
                <label class="col-md-3">Problems:</label>
                <textarea rows="4" class="col-md-8 form-control" id="problems" v-model="problems"></textarea>
            </div>
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
            problems:"",
            outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal
    },
    computed: {
    },
    props:{
        dialogName:{
            type: String,
            required: true,
        },
        modalState:{
            type:[Boolean,String],
            required:true
        },
        onConfirm:{
            type: Function,
            required: true,
        },
    },
    watch:{
        modalState () {
            this.outerVisible = this.modalState
        }
    },
    methods:{
        onConfirmBtn:function(){
            this.handleClose()
            this.onConfirm(this.problems)
        }
    }
}
</script>