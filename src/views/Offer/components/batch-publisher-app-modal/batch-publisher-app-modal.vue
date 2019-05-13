<template>
<div>
    <modal 
      :dialogVisible.sync="outerVisible"
      :onConfirm="onConfirm"
      :title="title"
      :onCancel="handleClose">
      <template slot="dialogBody">
        <form class="form-horizontal" ref="selectPublisher" id="modal_batch_publisher_access">
            <div class="control-group form-group">
                <div class="col-md-12">
                    <select2-app></select2-app>
                </div>
            </div>
        </form>
      </template>
    </modal>
</div>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

const Select2App = () => import(
/* webpackChunkName: "Select2App" */ '@/components/Select2App.vue'
);

export default {
    data(){
        return {
            outerVisible:false,
            value: "",
            alertPop:"hide",
            alertMsg:"",
            alertType:"info",
            affs: ''
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,Select2App
    },
    computed:{
        title () {
            return `Batch ${this.batch_title} App Access `
        }
    },
    props:{
        batch_title:{
            type: String,
            required: true,
        },
        batchPublisherAccess:{
            type:Function,
            required: true,
        },
        modalState:{
            type:[Boolean,String],
            required:true
        },
        dialogName:{
            type: String,
            required: true,
        },
    },
    watch:{
        modalState (val) {
            this.outerVisible = this.modalState
        }
    },
    methods:{
        getParams() {
            var query = $(this.$refs.selectPublisher).getFormQuery();
            return query;
        },
        onConfirm() {
            let query = this.getParams()
            this.handleClose()
            this.batchPublisherAccess(query)
        }
    }
}
</script>

<style scoped>
.overflow_scroll{
    width: 80%;
    margin-bottom: 50px;
}
</style>