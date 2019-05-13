<template>
<div id="confirm_dialog" class="modal  fade " aria-hidden="false" ref="modal" >
    <div class="modal-backdrop fade in" style=""></div>
    <div class="modal-dialog">
        <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
                <h3 :class="classList">{{ editable_modal_title }}</h3>
            </div>
            <div class="modal-body" v-html="editable_modal_body" :class="classList">
                <p>{{ editable_modal_body }}</p>
            </div>
            <slot>
              <div class="modal-footer">
                  <button class="btn btn-primary " @click.prevent="onConfirmBtn">{{ editable_confirm_btn }}</button>
                  <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
              </div>
            </slot>
        </div>
    </div>
</div>
</template>
<script>

export default {
  props: {
    modalState:{},
    hideModal:{},
    onConfirm:{},
    editable_modal_body:{default:"Confirm edit?"},
    editable_modal_title:{default:"Confirm"},
    editable_confirm_btn:{default:"Confirm"},
    classList:{},
  },
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    onConfirmBtn:function(){
        this.onConfirm()
        this.hideModal();
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
    }
  },
  mounted () {
    let that = this
    $(this.$refs.modal).on('hidden.bs.modal', function () {
      that.hideModal()
    })

  }
}
</script>