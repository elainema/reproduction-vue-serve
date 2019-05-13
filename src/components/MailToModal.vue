<template>
<div class="modal fade" ref="modal" tabindex="-1" role="dialog" aria-labelledby="gridSystemModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header"> <a class="close offline_cancel" @click.prevent="hideModal" data-dismiss="modal">×</a>
        <h3>Mail To {{!count ? '' : '(' + count + ')'}}</h3>
      </div>
      <div class="modal-body">
        <div class="box-container">
          <div class="box-content form-horizontal frm-entity frm-detail">
            <table class="table table-hover tablesorter" id="email_to_table">
              <colgroup>
                <col width="" />
                <col width="200" />
                <col width="150" />
              </colgroup>
              <thead>
                <tr>
                  <th>Email To</th>
                  <th data-sort="send_time">Arrival Time</th>
                  <th data-sort="mail_status">
                    <select id="mail_status_filter" class="col-md-12" @change="filterList" v-model="mail_status">
                      <option value="all">All status</option>
                      <option value="succeed">Success</option>
                      <option value="failed">Fail</option>
                      <option value="sending">waiting</option>
                      <option value="applied">sending</option>
                    </select>
                  </th>
                </tr>
              </thead>
              <tbody id="email_to_list">

                <tr v-for="item in mailToList" v-if="item.status == mail_status || mail_status == 'all' ">
                    <td>
                      {{item.aff_id}} | {{item.email}}
                    </td>
                    <td>
                      {{item.send_time}}
                    </td>
                    <td>
                      {{item.status}}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-default offline_cancel" @click.prevent="hideModal" >Close</button>
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
      mail_status:"all",
      count:""
    }
  },
  props: ['modalState','hideModal','mailToList'],
  methods: {
    toggleModal:function(msg) {
      $(this.$refs.modal).modal(msg)
    },
    filterList(){
      let len = 0
      let that = this
      _.each(this.mailToList, function(item){
        if(item.status === that.mail_status || that.mail_status === 'all') {
          len ++
        }
      })
      this.count = len
    }
  },
  watch: {
    modalState: function (val) {
      this.toggleModal(val)
      if(val == "show") {
        this.count = this.mailToList.length
        this.mail_status = "all"
      }
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