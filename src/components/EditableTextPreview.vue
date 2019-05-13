<template>
    <div ref="editable_zone">
      <confirmModal  
        :modalState="modalState" 
        :hideModal="hideModal"  
        :onConfirm="onConfirm" 
        :editable_modal_body="editable_modal_body" 
        :editable_modal_title="editable_modal_title" 
        :editable_confirm_btn="editable_confirm_btn" 
        :id="offer_name">
        <div class="modal-footer">
          <button class="btn btn-primary " v-if="canRetainKpiSetting" @click.prevent="onKpiConfirm(0)">Confirm,Retain KPI Setting</button>
          <button class="btn btn-primary " @click.prevent="onKpiConfirm(1)">Confirm,Clear KPI Setting</button>
          <button class="btn btn-default " @click.prevent="hideModal">Cancel</button>
        </div>
      </confirmModal>
      <a href="#" ref="editable" :id="editable_id" :offer_data="offer_data" :data-mode="editable_mode" :data-savenochange="savenochange" :data-inputclass="offer_class" :data-value="offer_val"   :data-name="offer_name" data-control-name="bt-select" data-type="text" class="hide-normal"></a>
    </div>
</template>
<script>
import Vue from "vue"
import confirmModal  from "./ConfirmModal.vue"
let $multipleInputRowRef
export default {
  data(){
    return {
      modalState:"hide",
      multiple_input_items:[],
      has_error:'',
      appId: '',
      canRetainKpiSetting: true,
      newOffer_val: '',
    }
  },
  props: {
    source:{},
    "showAlert":{},
    is_multl_input:{},
    offer_val:{},
    editable_disable:{default:false},
    renderOffer:{default:false},
    dynamic_render:{},
    offer_name:{},
    onShown:{},
    offer_data:{},
    getCustomParam:{},
    onSelectChange:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
    select2_multiple:{default:false},
    displayOpt:{},
    offer_class:{},
    onSuccess:{},
    onRenderAfter:{},
    editable_id:{},
    emptytext:{default:"Empty"},
    offer_api:{default:'Offer2/edit'},
    editable_modal_body:'Are you sure to change the preview link?',
    editable_modal_title:{},
    editable_confirm_btn:{},
    action_type:{default:"post"},
    query_id:{},
    showConfirmModal:{default:true},
    validate:{default:$.noop},
  },
  computed: {
    data_select2(){
      return '{"multiple":'+this.select2_multiple+'}'
    },
  },
  components: {confirmModal},
  methods: {
    hideModal:function() {
      this.modalState = "hide"
    },
    onConfirm:function() {
      $(this.$refs.editable_zone).find(".editableform").submit();
    },
    renderEditable:function(){
        let that = this
        let id = that.$route.query.id || that.query_id
        let _params = {};

        $(this.$refs.editable).attr('data-value', this.offer_val).show();
        let opt = {
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
            /*validate: function(value) {
                if (that.offer_name === 'offer_tracking_domain') {
                  if ($.trim(value) == '') {
                      that.has_error = 'This field is required';
                  }
                }
            },*/
            validate:that.validate,
            url: function(new_params) {
              that.newOffer_val = new_params.preview_url
              // debugger
              // if (that.action_type === 'post') {
              //   return  Vue.http.post(that.offer_api, new_params)
              // } else {
              //   return  Vue.http.get(that.offer_api, {params: new_params})
              // }
            },
            success: function(response, new_value) {
                // if ('success' === response.body.flag) {
                //     let obj = {}
                //     obj[that.offer_name] = new_value
                //     if(that.offer_api === 'Offer2/edit'){
                //       that.$store.dispatch('setOfferInfo', obj)
                //     }
                //     // if($(this).attr('id') == 'preview_url'){
                //     //  $('#btn_preview').attr('href', new_value);
                //     // }
                //     that.onSuccess && that.onSuccess(new_value, _params)
                //     return { newValue: new_value };
                // } else {
                //     that.showAlert(response.body.msg || 'unknown error');
                //     return response.body.msg || 'unknown error';
                // }
            },
            error: function(response, newValue) {
                //that.showAlert(response.body.msg || 'unknown error');
                /*if(response.status === 500) {
                    return 'Service unavailable. Please try later.';
                  } else {
                    return response.body.msg;
                  }*/

                  // if(response.status === 500) {
                  //     that.showAlert('Service unavailable. Please try later.');
                  // } else {
                  //   that.showAlert(that.has_error || response.body.msg);
                  // }
            }
        }
        if(this.displayOpt) {
          opt.display = function(value, sourceData){
            that.displayOpt(value, sourceData, $(that.$refs.editable))
          }
        }
        $(this.$refs.editable).editable(opt);
        that.onRenderAfter && that.onRenderAfter($(that.$refs.editable), that.offer_val)

        if(that.editable_disable) {
          $(that.$refs.editable).editable('disable')
        } else {
          $(that.$refs.editable).editable('enable')
        }


        $(that.$refs.editable).on("shown", function(){
          if(that.is_multl_input){
            $multipleInputRowRef = $multipleInputRowRef ? $multipleInputRowRef : $("#multipleInputRowRef")
            $multipleInputRowRef.removeClass("hide")
            $(that.$refs.editable_zone).find(".editable-input").empty()
            $(that.$refs.editable_zone).find(".editable-input").html($multipleInputRowRef)
          }
          that.onShown && that.onShown($(that.$refs.editable_zone))
        })
        $(that.$refs.editable).on("hidden", function(){
          that.onRenderAfter && that.onRenderAfter($(that.$refs.editable), that.offer_val)
        })

        $(that.$refs.editable).on("error", function(){
        })
    },

    getStoreAppIdIfExist(url) {
      const GOOGLE_PLAY_PATTERN = new RegExp(/play\.google\.com\/store\/apps\/details\?id=(\S*)/)
      const ITUNES_STORE_PATTERN = new RegExp(/itunes\.apple\.com\/.*\/id(\S*)\?/)
      
      if(GOOGLE_PLAY_PATTERN.test(url)) {
        url.replace(GOOGLE_PLAY_PATTERN)
        return RegExp.$1
      }

      if(ITUNES_STORE_PATTERN.test(url)) {
        url.replace(ITUNES_STORE_PATTERN)
        return `id${RegExp.$1}`
      }

      return ''
    },

    onKpiConfirm(isClear) {
      this.onConfirm()
      this.sendPreviewAppidAndIsClearKpiSetting(isClear)
    },

    sendPreviewAppidAndIsClearKpiSetting(isClear) {
      let params = {
        id: this.$route.query.id,
        pkg_name: this.getStoreAppIdIfExist(this.newOffer_val),
        is_clear: isClear,
        preview_url: this.newOffer_val
      }
      Vue.http.post('Offer2/checkOfferKpiSetting', params)
        .then(res => {
          if(res.body.data) {
            this.showAlert("Success!", "success")
            this.hideModal()
            this.$emit('fetchOcpaInfo')
            this.updateOfferPreviewUrl()
            return
          } else {
            if(!isClear) {
              this.showAlert('KPI dimensions can\'t be retained, which differs from the original dimensions!', 'error')
              this.canRetainKpiSetting = false
            }
          }
        }).catch(err => {
          this.hideModal()
          this.showAlert(err.body.msg, 'error')
        })
    },
    updateOfferPreviewUrl(isClear){
      if(!this.newOffer_val || this.offer_val == this.newOffer_val) {
        this.showAlert('Preview url is not changed');
        this.hideModal()
        return 
      }
      Vue.http.post(this.offer_api, {
        preview_url: this.newOffer_val,
        id:  this.$route.query.id
      }).then(res => {
         if ('success' === res.body.flag) {
            this.$store.dispatch('setOfferInfo', {
              offer_name: this.newOffer_val
            })
          } else {
            this.showAlert(response.body.msg || 'unknown error');
            return response.body.msg || 'unknown error';
          }
      }).catch(err => {
        this.showAlert(err.body.msg || 'unknown error');
      })
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){
      if(newVal){
        this.renderEditable()
      }
    },
    offer_val:function(newVal, oldVal) {
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
    if(this.dynamic_render) {
      this.renderEditable()
    }
    if(this.renderOffer) {
      this.renderEditable()
    }

    $(this.$refs.editable_zone).on("click",".editable-submit", e => {
      e.preventDefault()
      this.appId = this.getStoreAppIdIfExist(this.newOffer_val)
      console.log(this.appId)
      if (that.showConfirmModal) {
        that.modalState = "show"
      } else {
        that.onConfirm && that.onConfirm()
      }
    })
  }
}
</script>
