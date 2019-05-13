<template>
  <div ref="editable_zone">
    <!-- <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal> -->
    <modal 
      :dialogVisible.sync="modalState" 
      :dialogBody="'Confirm edit?'" 
      :title="'Confirm'"
      :onConfirm="onConfirm">
    </modal>
    <a href="javascript:;" ref="editable" :id="editable_id"  :data-maxlength="maxlength" :data-mode="editable_mode" :data-savenochange="savenochange" :data-placeholder="placeholder" :data-inputclass="offer_class" :data-value="offer_val"   :data-name="offer_name"  data-type="textarea" class="hide-normal"></a>
  </div>
</template>
<script>
import Vue from "vue"
//import confirmModal from "./ConfirmModal.vue"
const Modal = () => import(
/* webpackChunkName: "Modal" */ '@/components/common/modal/'
);
export default {
  data(){
    return {
      modalState:"hide"
    }
  },
  props: {
    source:{},
    "showAlert":{},
    offer_val:{},
    renderOffer:{},
    offer_name:{},
    onShown:{},
    placeholder:{},
    emptytext:{default:"Empty"},
    maxlength:{},
    getCustomParam:{},
    onSelectChange:{},
    savenochange:{default:true},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    offer_class:{},
    onSuccess:{},
    editable_id:{},
    offer_api:{default:'Offer2/edit'},
    editable_disable:{default:false},
    showConfirmModal:{default:true},
  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: { Modal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      $(this.$refs.editable_zone).find(".editableform").submit();
      this.modalState = false
    },
    renderEditable(){
        let that = this;
        let id = that.$route.query.id
        let _params = {};
        $(that.$refs.editable).attr('data-value', this.offer_val).show();
        $(that.$refs.editable).editable({
            pk: id,
            emptytext:that.emptytext,
            params: function(params) {
                var new_params = { id: params.pk };
                if(that.getCustomParam) {
                  new_params = that.getCustomParam(params, $(that.$refs.editable_zone))
                  params.value = new_params[params.name]
                }else{
                  new_params[params.name] = params.value;
                }
                _params = new_params
                return new_params;
            },
            url: function(new_params) {
                return  Vue.http.post(that.offer_api, new_params)
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    obj[that.offer_name] = _params[that.offer_name] 
                    if (that.offer_name == "conversion_flow") {
                      obj.conversion_flow = _params.nosend_flow
                    }
                    if(that.offer_api === 'Offer2/edit' || that.offer_api === 'Pixel/edit'){
                      that.$store.dispatch('setOfferInfo', obj)
                    }
                    // if($(this).attr('id') == 'preview_url'){
                    //  $('#btn_preview').attr('href', new_value);
                    // }
                    that.onSuccess && that.onSuccess(new_value, _params)
                    return { newValue: new_value };
                } else {
                    that.showAlert(response.body.msg || 'unknown error');
                    return response.body.msg || 'unknown error';
                }
            },
            error: function(response, newValue) {
                that.showAlert(response.body.msg || 'unknown error');
                if(response.status === 500) {
                    return 'Service unavailable. Please try later.';
                } else {
                    return response.body.msg;
                }
            }
        });
        $(that.$refs.editable).on("shown", function(e, editable){
          that.onShown && that.onShown($(that.$refs.editable_zone), e, editable)
        })
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      let that = this
      if(newVal){
        that.renderEditable()
        if (this.editable_disable) {
          $(this.$refs.editable).editable('disable')
        }
      }
    },
    editable_disable() {
      if (this.editable_disable) {
        $(this.$refs.editable).editable('disable')
      } else {
        $(this.$refs.editable).editable('enable')
      }
    },
    offer_val:function(newVal, oldVal) {
        this.$nextTick(function() {
          this.renderEditable()
          $(this.$refs.editable).editable("setValue",newVal)
          if (this.editable_disable) {
            $(this.$refs.editable).editable('disable')
          } else {
            $(this.$refs.editable).editable('enable')
          }
        })
    }
  },
  mounted () {
    let that = this;
    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      if (that.showConfirmModal) {
        that.modalState = "show"
      } else {
        $(that.$refs.editable_zone).find(".editableform").submit();
      }
    })

  }
}
</script>