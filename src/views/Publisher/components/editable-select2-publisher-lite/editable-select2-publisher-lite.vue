<template>
  <div ref="editable_zone">

    <a v-if="!onfocus"　href="#" ref="editable" :id="id" :data-value="publisher_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-select2='editable_select2'  :data-name="publisher_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

    <a v-if="onfocus"　href="#" ref="editable" :id="id" :data-value="publisher_val"  :data-mode="editable_mode"  :data-savenochange="savenochange" :data-name="publisher_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

  </div>
</template>
<script>

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
    publisher_val:{},
    renderEditable:{},
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
    confirmCallBack:{}
  },
  computed: {
    editable_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    }
  },
  components: { },
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
    renderEditableLite(){
        let that = this
        let _params = {};
        $(this.$refs.editable).attr('data-value', this.publisher_val).css("display","inline-block");
        $(this.$refs.editable).editable({
            autotext: 'always',
            mode: "inline",
            pk: 1,
            source: that.source,
            params: function(params) {
                var new_params = {
                    id: params.pk
                };
                new_params[params.name] = _.isEmpty(params.value) ? [''] : params.value;
                return new_params;
            },
            url: function(new_params) {

            },
            success: function(response, new_value) {
                that.onSuccess && that.onSuccess(new_value && new_value.join(",") || "")
                return {
                    newValue: new_value
                };
            }
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
    renderEditable:function(newVal, oldVal){
      if(newVal){
        this.renderEditableLite()

      }
    },
    publisher_val:function(newVal, oldVal) {
        this.$nextTick(function() {
          $(this.$refs.editable).editable("setValue",newVal.indexOf(',') !== -1 ? newVal.split(",") : newVal)

        })
    }
  },
  mounted () {
    this.renderEditableLite()
    let that = this;

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