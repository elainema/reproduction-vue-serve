<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a href="#" ref="editable" data-type="name" :data-inputclass="offer_class" :data-mode="editable_mode" :data-name="offer_name" class="hide-normal"></a>
  </div>
</template>
<script>
import Vue from "vue"
import confirmModal from "./ConfirmModal.vue"
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
    getCustomParam:{},
    editable_mode:{default:"inline"},
    offer_class:{},
    save_api:{},
    showConfirmModal:{default:true},
    optionValue:{default:{}},
  },
  computed: {

  },
  components: { confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      $(this.$refs.editable_zone).find(".editableform").submit();
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      let that = this
      if(newVal){
        let id = that.$route.query.id
        let _params = {};
        that.$nextTick(function() {
          $(this.$refs.editable).attr('data-value', this.offer_val).show();
        })

        $(this.$refs.editable).editable({
            pk: id,
            value: that.optionValue,
              params: function(params) {
                var new_params = {id:params.pk};
                if(that.getCustomParam) {
                  new_params = that.getCustomParam(params, $(that.$refs.editable_zone))
                  params.value = new_params[params.name]
                }else{
                    new_params[params.name] = params.value;
                }
                return new_params;
              },
              url: function(new_params) {
                return  Vue.http.post(that.save_api, new_params)
              },
              success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    obj[that.offer_name] = new_value
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

      }
    }
  },
  mounted () {
    let that = this;
    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      if (that.showConfirmModal) {
        that.modalState = "show"
      } else {
        that.onConfirm && that.onConfirm()
      }
    })

  }
}
</script>