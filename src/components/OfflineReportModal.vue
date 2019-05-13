<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>Offline Report</h3>
      </div>
      <div class="modal-body">
        <p>According to your search criteria, the result is too large to be loaded in a short time. The system will export the data for you to download. You can specify a report name:</p>
        <div class="form-group row mt20 mb20">
            <label for="offline_input" class="control-label col-md-3">Report Name
            </label>
            <div class="col-md-9">
                <input id="offline_input" class="form-control"  v-model="report_name" type="text" value="" maxlength="255">
            </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary offline_confirm" @click.prevent="runOfflineReport(report_name)">Confirm</button>
        <button class="btn btn-default offline_cancel" @click.prevent="hideModal" >Cancel</button>
      </div>
    </div>
    <!-- /.modal-dialog -->
  </div>
  <!-- /.modal -->
</div>
</template>
<script>

export default {
  data(){
    return {
      report_name:""
    }
  },
  props: ['modalState','hideModal','runOfflineReport'],
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
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