<template>
<div>
    <modal
      :dialogVisible.sync="visible"
      :title="title"
      :cancelText="'Close'"
      :showConfirmText="false"
      :onCancel="handleClose">
      <template slot="dialogBody">
        <div class="box-container">
          <div class="box-content form-horizontal frm-entity frm-detail row">
            <div class="control-group form-group">
              <label class="col-md-10"><strong>Mail Subject</strong></label>
              <div class="">
                <textarea id="subject" class="text col-md-12 form-control" rows="1" :value="sysTemEmail.title"></textarea>
              </div>
            </div>
            <div class="control-group form-group">
              <label class="col-md-10"><strong>Conent</strong></label>
              <div class="">
                <textarea id="content" class="text col-md-12 form-control" rows="10" :value="sysTemEmail.content"></textarea>
              </div>
            </div>
            <div class="control-group form-group">
              <label class="col-md-10"><strong>To</strong></label>
              <div class="">
                <textarea id="list_to" class="text col-md-12 form-control" rows="4"  v-html="sysTemEmail.email && sysTemEmail.email.replace(/,/g,'\n')"></textarea>
              </div>
            </div>
          </div>
        </div>
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
          title:'Mail Content'
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    computed: {
    },
    watch: {
      modalState () {
        this.visible = this.modalState
      },
    },
    methods:{
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
      sysTemEmail: {
        type: Object,
        required: true
      },
    }
}
</script>