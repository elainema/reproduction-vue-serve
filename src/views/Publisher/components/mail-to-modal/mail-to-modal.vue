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
          mail_status:"all",
          count:""
        }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
    },
    computed: {
      title() {
        let count = !this.count ? ' ' : '(' + this.count + ')'
        return `Mail To ${count}`
      }
    },
    watch: {
      modalState (val) {
        this.visible = this.modalState
        if(val == "show" || val == true) {
          this.count = this.mailToList.length
          this.mail_status = "all"
        }
      },
    },
    methods:{
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
      mailToList: {
        type: Array,
        required: true
      },
    }
}
</script>