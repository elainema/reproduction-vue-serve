<template>
  <div ref="editable_zone">
   <!--  <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal> -->
    <modal 
      :dialogVisible.sync="modalState" 
      :dialogBody="'Confirm edit?'" 
      :title="'Confirm'"
      :onConfirm="onConfirm">
    </modal>
    <a href="javascript:void(0)" ref="editable" :id="editable_id"  :data-maxlength="maxlength" :data-mode="editable_mode" :data-savenochange="savenochange" :data-placeholder="placeholder" :data-inputclass="publisher_class" :data-value="publisher_val"   :data-name="publisher_name" data-control-name="bt-select" data-type="textarea" class="hide-normal"></a>
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
    publisher_val:{},
    renderPublisher:{},
    publisher_name:{},
    onShown:{},
    placeholder:{},
    maxlength:{},
    getCustomParam:{},
    onSelectChange:{},
    dynamic_render:{},
    savenochange:{default:true},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    publisher_class:{},
    onSuccess:{},
    editable_id:{},
    emptytext:{default:"Empty"},
    publisher_api:{default:'Affiliate/edit'},
    editable_disable:{default:false},
    action_type:{default:"post"},
    publisher_id:{default:""}
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
        let id = that.$route.query.id || that.publisher_id
        let _params = {};
        $.fn.editable.defaults.mode = 'inline';
        $(that.$refs.editable).attr('data-value', this.publisher_val).show();
        $(this.$refs.editable).editable({
            pk: id,
            emptytext:that.emptytext,
            params: function(params) {
                params.pk = that.$route.query.id || that.publisher_id
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
                if (that.action_type === 'post') {
                  return  Vue.http.post(that.publisher_api, new_params)
                } else {
                  return  Vue.http.get(that.publisher_api, {params: new_params})
                }
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    let obj = {}
                    new_value = _params[that.publisher_name] || new_value
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
          that.onShown && that.onShown($(that.$refs.editable_zone), e, editable, _params[that.publisher_name])
        })
    }
  },
  watch:{
    renderPublisher:function(newVal, oldVal){
      let that = this
      if(newVal){
        that.renderEditable()
        if (this.editable_disable) {
          $(this.$refs.editable).editable('disable')
        }
      }
    },
    publisher_val:function(newVal, oldVal) {
      if (this.editable_disable) {
        $(this.$refs.editable).editable('disable')
      } else {
        $(this.$refs.editable).editable('enable')
      }
      $(this.$refs.editable).editable("setValue",newVal)

    },
  },
  mounted () {
    let that = this;

    if(that.dynamic_render) {
      that.renderEditable()
    }

    if(that.renderPublisher) {
      that.renderEditable()
    }

    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      that.modalState = "show"
    })

  }
}
</script>