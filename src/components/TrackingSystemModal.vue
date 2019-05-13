<template>
<div id="confirm_dailog" class="modal  fade" ref="modal">
    <div class="modal-dialog"><div class="modal-content">
      <div class="modal-header"> <a class="close " @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>Tracking System</h3>
    </div>
    <div class="modal-body text-left">
        <p class="" id="">Do you want to auto update tracking information of Adv's offers with same tracking system?</p>
    </div>
    <div class="modal-footer"> 
        <a href="#" class="btn secondary" data-dismiss="modal" id="confirmBtn"  @click="changeTrackingSystem(1)">Yes</a>
        <a href="#" class="btn secondary" data-dismiss="modal" id="noBtn"  @click="changeTrackingSystem(0)">No</a>
        <a href="#" class="btn secondary" data-dismiss="modal" >Cancel</a>
    </div>
    </div></div>
</div>

</template>
<script>

export default {
  props: ['modalState','hideModal','onConfirm'],
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    changeTrackingSystem(type) {
        this.onConfirm({all_offer:type})
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