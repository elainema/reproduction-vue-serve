<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a v-if="!onfocus"　href="#" ref="editable" id="" :data-value="offer_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-select2='data_select2'  :data-name="offer_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

    <a v-if="onfocus"　href="#" ref="editable" id="" :data-value="offer_val"  :data-mode="editable_mode"  :data-send="editable_send" :data-savenochange="savenochange" :data-name="offer_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>
  </div>
</template>
<script>
import Vue from "vue"
import confirmModal from "./ConfirmModal.vue"
export default {
  data(){
    return {
      modalState:"hide",
      new_params:'',
    }
  },
  props: {
    source:{},
    "showAlert":{},
    offer_val:{},
    renderOffer:{},
    validate:{default:$.noop},
    offer_name:{},
    onShown:{},
    onSuccess:{},
    getCustomParam:{},
    onSelectChange:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    editable_send:{},
    select2_multiple:{default:false},
    onfocus:{},
    type:{default:''},
    confirmCallBack:{},
    init:{default:''},
    offer_api:{default:'Offer2/edit'},
    showConfirmModal:{default:true},
    editable_disable:{default:false},
    setText:{default:false},
    text:{},
    onHidden:{}
  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: { confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function(params) {
      $(this.$refs.editable_zone).find(".editableform").submit();
      if (this.confirmCallBack) {
        this.confirmCallBack(this.new_params)
      }
    },
    renderEditable(){
      let that = this;
      let _params = {};
      $(this.$refs.editable).attr('data-value', this.offer_val).show();
      $(this.$refs.editable).editable({
          pk: that.$route.query.id,
          source: that.source,
          onblur: 'ignore',
          autotext: 'always',
          mode:"inline",
          validate:that.validate,
          select2: {
              multiple: true,
              muiltiSelect: true,
              hideDropMenu: true,
              formatSearching: function() {
                  $(this.element).select2("close");
              },
              saveElm: $("#choose_citys_dailog a[data-action='save']"),
              type: that.type,
              onfocus: function(e) {
                that.onfocus && that.onfocus(that.offer_name)
              },
              formatResult: function(item) {
                  console.log(item);
              },
          },
          params: function(params) {
              var new_params = { id: params.pk };
              if(that.getCustomParam) {
                new_params = that.getCustomParam(params, $(that.$refs.editable_zone))
                params.value = new_params[params.name]
              }else{
                new_params[params.name] = params.value;
              }
              _params = new_params
              that.new_params = new_params
              return new_params;
          },
          url: function(new_params) {
              return  Vue.http.post(that.offer_api, new_params)
          },
          success: function(response, new_value) {
              if ('success' === response.body.flag) {
                  let obj = {}
                  obj[that.offer_name] = _params[that.offer_name]
                  if (that.offer_name == 'carriers_target') {
                    obj.carrier_names = _params[that.offer_name]
                  }
                  if (that.offer_name == "conversion_flow") {
                    obj.conversion_flow = new_value
                  }
                  that.$store.dispatch('setOfferInfo', obj)
                  that.onSuccess && that.onSuccess(that.offer_name, response, new_value, $(that.$refs.editable) )
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
      })

      if(that.setText) {
        $(that.$refs.editable).attr('data-value', that.offer_val).text(that.text)
      }
      $(that.$refs.editable).on("shown", function(){
        that.onShown && that.onShown($(that.$refs.editable_zone))
      })
      $(that.$refs.editable).on("hidden", function(){
        that.onHidden && that.onHidden($(that.$refs.editable_zone))
      })


      $(that.$refs.editable_zone).on('select2-selecting', '.select2-offscreen', function(e) {
          if (e.val == 'all') {
              $(this).select2('val', '');
          } else {
              // $(this).trigger('change');
          }
      });
      $(that.$refs.editable_zone).on('change', '.select2-offscreen', function(e) {
          // var target = $(this).parents('.control-group.form-group');
          // var next = target.next('.control-group.form-group');
          if (typeof(e.val) !== 'undefined' && e.val.length == 0) {
              var _this = $(this);
              setTimeout(function() {
                  _this.val('all');
                  _this.trigger('change');
              }, 10);
              // next.find('.bt-switch').bootstrapSwitch('setActive', false);
              // next.find('input[type=checkbox]').attr('disabled', true);
          }
          if (typeof(e.val) !== 'undefined' && e.val.indexOf('all') != -1 && e.val.length > 1) {
              e.val.shift(0);
              $(this).select2('val', e.val);
              $(this).trigger('change');
              // next.find('.bt-switch').bootstrapSwitch('setActive', true);
              // next.find('input[type=checkbox]').attr('disabled', false);
          }

          that.onSelectChange && that.onSelectChange(e, $(that.$refs.editable_zone))
      });

      if (that.init) {
          $(this.$refs.editable).trigger("click")
          $(this.$refs.editable).next(".editable-container").find(".editable-buttons").css("display", 'none')
      }

      if(that.editable_disable) {
        $(that.$refs.editable).editable('disable')
      } else {
        $(that.$refs.editable).editable('enable')
      }
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      let that = this
      if(newVal){
        that.renderEditable()
      }
    }
  },
  mounted () {
    let that = this;
    if(this.renderOffer) {

      that.renderEditable()
    }
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