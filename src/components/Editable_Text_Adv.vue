<template>
  <div ref="editable_zone">
    <a href="#" ref="editable" :id="editable_id"  :data-mode="editable_mode" :data-savenochange="savenochange" :data-inputclass="adv_class" :data-value="adv_val"   :data-name="adv_name" data-control-name="bt-select" data-type="text" class="hide-normal"></a>
  </div>
</template>
<script>
import Vue from "vue"
export default {
  data(){
    return {
      modalState:"hide",

    }
  },
  props: {
    source:{},
    "showAlert":{},
    adv_val:{},
    renderAdv:{},
    editable_id:{},
    adv_name:{},
    onShown:{},
    onSelectChange:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    displayOpt:{},
    adv_class:{},
    onSuccess:{},
    onRenderAfter:{},
    emptytext:{default:"Empty"},
    adv_api:{default:'Advertiser/edit'},
    action_type:{default:"post"},
    isDisabled:{
      type:Boolean,
      default: false
    }
  },
  computed: {

  },
  components: {},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    renderEditable:function(){
        let that = this
        let id = that.$route.query.id
        let _params = {};

        $(this.$refs.editable).attr('data-value', this.adv_val).css("display","inline-block")
        let opt = {
            pk: id,
            emptytext:that.emptytext,
            disabled: this.isDisabled,
            params: function(params) {
                var new_params = { id: params.pk };

                new_params[params.name] = params.value;
                _params = new_params
                return new_params;
            },
            url: function(new_params) {
              if (that.action_type === 'post') {
                return  Vue.http.post(that.adv_api, new_params)
              } else {
                return  Vue.http.get(that.adv_api, {params: new_params})
              }
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    obj[that.adv_name] = new_value

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
        }
        if(this.displayOpt) {
          opt.display = function(value, sourceData){
            that.displayOpt(value, sourceData, $(that.$refs.editable))
          }
        }
        $(this.$refs.editable).editable(opt);



        $(that.$refs.editable).on("shown", function(){
          that.onShown && that.onShown($(that.$refs.editable_zone))
        })
        $(that.$refs.editable).on("hidden", function(){
          that.onRenderAfter && that.onRenderAfter($(that.$refs.editable))
        })

    }
  },
  watch:{
    renderAdv:function(newVal, oldVal){
      if(newVal){
        this.renderEditable()
      }
    },
    adv_val:function(newVal, oldVal) {
      if(newVal){

          this.$nextTick(function() {
            this.renderEditable()
            $(this.$refs.editable).editable("setValue",newVal)

          })
      }
    }
  },
  mounted () {
    let that = this;


  }
}
</script>
