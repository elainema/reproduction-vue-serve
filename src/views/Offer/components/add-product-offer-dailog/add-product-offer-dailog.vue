<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :title="'Add Offer'"
  :onConfirm="confirmAdded"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <form class="form-horizontal" ref="selecOffer">
        <div class="control-group form-group">
            <div class="col-md-12">
                <p>Offer<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
                <select2offer :select2_mode="'simple'" :showSelectAll="false" :select2_name="'offer_id'"></select2offer>
            </div>
        </div>
    </form>
  </template>
</modal>
</template>

<script>
import mixin_dialog from '@/mixins/dialog'
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/');

const select2offer = () => import(
/* webpackChunkName: "select2offer" */ '@/components/Select2Offer.vue'
);
export default {
    data(){
        return {
          outerVisible:false,
        }
    },
    mixins:[mixin_dialog],
    components: {
      Modal,select2offer
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
    	list_offers:{
    		type:Function,
    		required:true
    	},
      showAlert:{
        type:Function,
        required:true
      }
    },
    watch:{
        modalState () {
        	this.outerVisible = this.modalState
        }
    },
    methods:{
      confirmAdded() {
          var offers = $(this.$refs.selecOffer).getFormQuery();
          var that = this
       		let offer_product_id = this.$route.query.product_id
          var query = $.extend(offers, {offer_product_id});

          this.$http.post('Offer/updateParentProduct', query).then(response => {
              that.list_offers();
              that.add_product_offer_dailog = false
          }, response => {
              that.loadingZone = ""
              // error callback
              that.showAlert(response.body.msg)
          })
          this.handleClose()
      },
    }
}
</script>