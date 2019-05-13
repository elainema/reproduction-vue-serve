<template>
<modal 
    :dialogVisible.sync="outerVisible"
    :title="title"
    :onConfirm="onConfirm"
    :onCancel="handleClose">
    <template slot="dialogBody">
      <p>According to your search criteria, the result is too large to be loaded in a short time. The system will export the data for you to download. You can specify a report name:</p>
      <div class="form-group row mt20 mb20">
          <label for="offline_input" class="control-label col-md-3">Report Name
          </label>
          <div class="col-md-9">
              <input id="offline_input" class="form-control"  v-model="report_name" type="text" value="" maxlength="255">
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
          title:'Offline Report',
          outerVisible:false,
          report_name:""
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
        modalState:{
            type:[Boolean,String],
            required:true
        },
        runOfflineReport:{
            type:Function,
            required:true
        },
    },
    watch:{
        modalState () {
          this.outerVisible = this.modalState
        }
    },
    methods:{
        onConfirm(){
            this.runOfflineReport(this.report_name)
        }
    }
}
</script>
<style lang="less">
</style>