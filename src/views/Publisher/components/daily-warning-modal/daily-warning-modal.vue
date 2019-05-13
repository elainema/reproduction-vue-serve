<template>
<div>
    <modal
        :dialogVisible.sync="visible"
        :title="title"
        :onConfirm="onConfirm"
        :showConfirmText="false"
        :onCancel="handleClose">
        <template slot="dialogBody">
          <div id="detail_aff" class="detail_aff">
              <p class="detail_aff"><span>ID : {{affInfo.id}}</span><span>Affiliate : {{affInfo.first_name}} {{affInfo.last_name}} </span><span class="ml15">Company : {{affInfo.company_name}}</span><span>Status : {{affInfo.status}}</span></p>
              <p class="detail_aff"><span>Email : {{affInfo.email_send_address}}</span> <span class="ml15">Phone : <span v-if="affInfo.phone">{{affInfo.phone}}</span><span v-else class="empty">(empty)</span></span>
              </p>
              <p class="table_desc mt20">Top 10 offers with high revenue raise.</p>
          </div>
          <div id="detail_aff" class="detail_aff">

          </div>
          <div class="overflow_scroll">
            <table class="table table-hover  tablesorter" id="">
                <colgroup>
                    <!-- <col width="25" /> -->
                    <col width="80" />
                    <col width="280" />
                    <col width="80" />
                    <col width="100" />
                    <col width="100" />
                    <col width="80" />
                    <col width="80" />
                </colgroup>
                <thead>
                    <tr>
                        <!-- <th class="tl-left"><input type="checkbox" id="check_all" /></th> -->
                        <th class="tl-left">Offer ID</th>
                        <th class="tl-left">Offer</th>
                        <th class="tl-left">Status</th>
                        <th class="tl-left">Revenue</th>
                        <th class="tl-left">CR</th>
                        <th class="tl-left">Click</th>
                        <th class="tl-left">Conversion</th>
                    </tr>
                </thead>
                <tbody id="offer_list">
                <tr v-for="item in offerAnalysisInfo">
                  <td>{{item.offer_id}}</td>
                  <td>{{item.offer}}</td>
                  <td>{{item.status}}</td>
                  <td>{{item.revenue}}/{{item.revenue_range}}</td>
                  <td>{{item.cr}}/{{item.cr_range}}</td>
                  <td>{{item.click}}/{{item.click_range}}</td>
                  <td>{{item.conversion}}/{{item.conversion_range}}</td>
                </tr>
                </tbody>
            </table>
          </div>

        </form>
        </template>
    </modal>
</div>
</template>

<script>

import Vue from "vue"
import mixin_dialog from '@/mixins/dialog'

const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);

export default{
    data() {
      return {
        visible:false,
        toggleMacro:true,
        publisher_id:this.$route.query.id
      }
    },
    computed:{
      title () {
        return 'Detail'
      }
    },
    mixins:[mixin_dialog],
    components: {
        Modal
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
      onConfirm: {
        type: Function,
        required: true
      },
      offerAnalysisInfo:{
        type: Array,
        required: true
      },
      affInfo:{
        type: Object,
        required: true
      }
    }
}
</script>

<style scoped>
.macro_link{
  color: #08c;
  text-decoration: underline;
}
</style>