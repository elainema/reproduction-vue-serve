<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a ref="editable" href="#" id="traffic_ids" data-type="checkbox" class="editable editable-click"  :data-mode="editable_mode"  ></a>
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
    showAlert:{},
    offer_val:{},
    renderOffer:{},
    offer_name:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    allowed_traffic:{},
    offer_api:{default:'Offer2/edit'},
    source:{},
  },
  computed: {

  },
  components: { confirmModal },
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      $(this.$refs.editable_zone).find(".editableform").submit();
    },
  },
  watch:{
    renderOffer:function(newVal, oldVal){
        let that = this
        if(newVal){
            let id = that.$route.query.id
            $(this.$refs.editable).attr('data-value', JSON.stringify(that.allowed_traffic));
            $(this.$refs.editable).attr('data-source', JSON.stringify(that.source));
            $(this.$refs.editable).editable({
                pk: id,
                emptytext:'Empty',
                validate: function(value) {

                },
                params: function(params) {
                  var new_params = { id: params.pk };
                    if (!_.isEmpty(params.value)) {
                        new_params = _.extend(new_params, params.value);
                        return new_params;
                    } else {
                        that.showAlert("Please choise category", 'error');
                    }
                },
                url: function(new_params) {
                    return Vue.http.post(that.offer_api, new_params)
                },
                success: function(response, new_value) {
                  if ('success' === response.body.flag) {
                      var arr = []
                      $(".allow_traffic_list .icon_zone:not('.not-check')").each(function() {
                          var $this = $(this).parent();
                          arr.push($this.trimText())
                      })
                      arr = arr.length === 0 ? ['Empty'] : arr;
                      return { newValue: arr };
                  } else {
                      return response.msg || 'unknown error';
                  }
                }
            })
            $(that.$refs.editable).on("shown", function(){
              $(".editable-buttons").css("display", "block");
            })
        }
    }
  },
  mounted () {
    let that = this;
    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      that.modalState = "show"
    })

  }
}
</script>