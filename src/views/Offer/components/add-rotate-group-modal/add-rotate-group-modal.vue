<template>
<modal 
  :dialogVisible.sync="outerVisible"
  :title="'Add Offer To Rotate Group'"
  :onConfirm="submitForm"
  :onCancel="handleClose">
  <template slot="dialogBody">
    <p style="display:none;text-align:left;padding-left:25px" class="red"><span id="affs_count"></span> affiliates have traffic on this offer</p>
    <form class="form-horizontal"  @submit="submitForm">
        <div class="control-group form-group">
            <label class="control-label col-md-4">Group</label>
            <div class="controls col-md-8">
                <select name="group_id" v-model="status">
                    <option value="0" selected="">-All Group -</option>
                    <option v-for="n in groupChosen" :value="n.id">{{ n.name }}</option>
                </select>
            </div>
        </div>
    </form>
  </template>
</modal>
</template>

<script>
import Vue from "vue"
import commonDataAPI from '@/api/commonData'
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
          status:"0",
          groupChosen:[]
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
            type:[Boolean, String],
            required:true
        },
        showAlert:{
            type:Function,
            required:true
        },
        selected_id:{
            type:String,
            required:true
        },
        onSuccess:{
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
        submitForm: function(){
            let that = this;
            var ids = this.selected_id || this.$route.query.id
            var opts = {
                'offer_ids': ids,
                'group_id': $("select[name=group_id]").val()
            }
            Vue.http.post('Offer2/addOffersToGroup', opts).then(response => {
                that.showAlert(response.body.msg, "success");
                that.onSuccess && that.onSuccess()
            }, response => {
                that.showAlert(response.body.msg);
            })
            this.handleClose()
        }
    },

    mounted () {
        let that = this
        commonDataAPI.getRotateGroup(function(data) {
            that.groupChosen = data;
        })
    }
}
</script>