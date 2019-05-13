<template>
  <div ref="editable_zone">
    <!-- <afflevelconfirmModal  v-if="needConfirmModal" :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm" :curVal="curVal"></afflevelconfirmModal> -->
    <aff-level-confirm-modal
      v-if="needConfirmModal" 
      :modalState.sync="modalState"
      :onConfirm="onConfirm"
      :dialogName="'modalState'"
      :curVal="curVal">
    </aff-level-confirm-modal>

    <a v-if="!onfocus"　href="#" ref="editable" :id="id" :data-value="publisher_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-select2='editable_select2'  :data-name="publisher_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

    <a v-if="onfocus"　href="#" ref="editable" :id="id" :data-value="publisher_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-name="publisher_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

  </div>
</template>
<script>
import Vue from "vue"
const AffLevelConfirmModal = () => import(
/* webpackChunkName: "AffLevelConfirmModal" */ '../aff-level-confirm-modal/'
);
export default {
  data(){
    return {
      modalState:"hide",
      new_params:'',
      custom_params:{},
      curVal:""
    }
  },
  props: {
    source:{},
    "showAlert":{},
    publisher_val:{},
    renderPublisher:{},
    publisher_name:{},
    onSuccess:{},
    onSelectChange:{},
    validate:{default:$.noop},
    onfocus:{},
    onShown:{},
    id:{default:""},
    savenochange:{default:false},
    editable_mode:{default:"popup"},
    select2_multiple:{default:false},
    needConfirmModal:{default:false},
    type:{default:''},
    editable_api:{default:"Affiliate/edit"},
    confirmCallBack:{}
  },
  computed: {
    editable_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: { AffLevelConfirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function(params) {
      if(params){
        this.custom_params = params
      }
      $(this.$refs.editable_zone).find(".editableform").submit();

    },
    renderingPublisher() {
        let that = this
        let _params = {};
        $(this.$refs.editable).attr('data-value', this.publisher_val).css("display","inline-block").text();
        $(this.$refs.editable).editable({
            pk: that.$route.query.id,
            source: that.source,
            onblur: 'ignore',
            autotext: 'always',
            validate:that.validate,
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
                } else if(params.name === 'level'){
                    new_params = {aff_ids:params.pk, level:params.value}
                } else {
                    new_params[params.name] = params.value;
                }
                that.new_params = new_params
                new_params  = _.extend(new_params, that.custom_params)
                _params = new_params

                return new_params;
            },
            url: function(new_params) {
                return  Vue.http.post(that.editable_api, new_params)
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
  },
  watch:{
    renderPublisher:function(newVal, oldVal){
      if(newVal){
        this.renderingPublisher()
      }
    }
  },
  mounted () {
    let that = this;
    //that.renderingPublisher()
    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      if(that.needConfirmModal) {
        e.preventDefault()
        that.curVal = $(that.$refs.editable_zone).find(".select2-offscreen:last").val()

        that.modalState = "show"
      }

    })
  }
}
</script>