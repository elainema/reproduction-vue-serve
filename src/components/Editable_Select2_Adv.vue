<template>
  <div ref="editable_zone">
    <a v-if="!onfocus"　href="#" ref="editable" id="" :data-value="adv_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-select2='data_select2'  :data-name="adv_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

    <a v-if="onfocus"　href="#" ref="editable" id="" :data-value="adv_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-name="adv_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

    <trackingSystemModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></trackingSystemModal>
    <confirmModal ref="recountComfirm" :modalState="modalState2" :hideModal="hideModal2" :onConfirm="onConfirm" :editable_modal_body="editable_modal_body"></confirmModal>
  </div>
</template>
<script>
import Vue from "vue"
import trackingSystemModal from "./TrackingSystemModal.vue"
import confirmModal  from "./ConfirmModal.vue"
export default {
  data(){
    return {
      modalState:"hide",
      new_params:'',
      custom_params:{},
      modalState2:"hide",
      changeVal: '',
      issyncOffer: 0,
      isAlertConfirm: false,
      fromConfirm:false //避免发两次请求
    }
  },
  props: {
    source:{},
    "showAlert":{},
    adv_val:{},
    renderAdv:{},
    adv_name:{},
    onSuccess:{},
    onSelectChange:{},
    getCustomParam:{},
    onfocus:{},
    onShown:{},
    onHidden:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    needConfirmModal:{default:false},
    type:{default:''},
    confirmCallBack:{},
    confirmAgain:{default:false},
    editable_modal_body:'',
    otherParams:'',
    isDisabled: {default:false}
  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: {trackingSystemModal ,confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    hideModal2:function() {
      this.issyncOffer = 0
      this.modalState2 = "hide"
      if (!this.fromConfirm){
          $(this.$refs.editable_zone).find(".editableform").submit();
      }
    },
    onConfirm:function(params) {
      if(params){
        this.custom_params = params
      }
      this.issyncOffer = 1
      this.fromConfirm = true
      $(this.$refs.editable_zone).find(".editableform").submit();
    }
  },
  watch:{
    renderAdv:function(newVal, oldVal){
      let that = this
      
      if(newVal){
        let _params = {};
        $(this.$refs.editable).attr('data-value', this.adv_val).css("display","inline-block");
        $(this.$refs.editable).editable({
            pk: that.$route.query.id,
            source: that.source,
            disabled: that.isDisabled,
            onblur: 'ignore',
            autotext: 'always',
            select2: {
                multiple: true,
                muiltiSelect: true,
                hideDropMenu: true,
                formatSearching: function() {
                    $(this.element).select2("close");
                },
                type: that.type,
                onfocus: function(e) {
                },
                formatResult: function(item) {
                    console.log(item);
                },
            },
            params: function(params) {
                var new_params = { id: params.pk };
                if(params.name === 'tracking_system' && params.value === "other") {
                    new_params[params.name] = $(that.$refs.editable_zone).find("#otherTracking").val()
                } else {
                    new_params[params.name] = params.value;
                }

                if(that.getCustomParam) {
                    new_params = _.extend({id: params.pk},that.getCustomParam(params, $(that.$refs.editable_zone)))
                }
                if (that.isAlertConfirm){
                    new_params['active_offer'] = that.issyncOffer
                }
                
                that.new_params = new_params
                new_params  = _.extend(new_params, that.custom_params)
                _params = new_params

                return new_params;
            },
            url: function(new_params) {
                
                return  Vue.http.post('Advertiser/edit', new_params)
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    that.onSuccess && that.onSuccess(_params)
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

        $(that.$refs.editable).on("hidden", function(){
          that.onHidden && that.onHidden($(that.$refs.editable_zone))
        })
        $(that.$refs.editable).on("shown", function(){
          that.onShown && that.onShown($(that.$refs.editable_zone))
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
            that.changeVal = e.val
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

      }
    }
  },
  mounted () {
    let that = this;

    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      if(that.needConfirmModal) {
        e.preventDefault()
        that.modalState = "show"
      }
      
      if(that.confirmAgain && that.changeVal==="active" && that.otherParams.is_manual_close == 1 && that.otherParams.is_3rd == 0) {
        e.preventDefault()
        that.modalState2 = "show"
        that.isAlertConfirm = true
      }
      else {
          that.isAlertConfirm = false
          that.fromConfirm = false
      }

    })
    
  }
}
</script>