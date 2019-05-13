<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a href="#" ref="editable" id="" data-mode="popup" :data-value="publisher_val"   :data-name="publisher_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>

  </div>
</template>
<script>
import Vue from "vue"
import confirmModal from "./ConfirmModal.vue"
import select2_ajax_params from "../util/select2_ajax_param"
export default {
  data(){
    return {
      modalState:"hide"
    }
  },
  props: {
    "showAlert":{},
    publisher_val:{},
    renderPublisher:{},
    publisher_name:{},
    data:{},
    savenochange:{default:false},
    emptytext:{default:"Empty"},
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
    },
    startRender(){
        let that = this;
        let _params = {};
        $(this.$refs.editable).attr('data-value', this.offer_val).show();
        if(that.data['referral_by']) $(this.$refs.editable).text(that.data['referral_by'] + " - " + that.data['referral_first_name'] + " " + that.data['referral_last_name']);
        let id = that.$route.query.id;
        $(this.$refs.editable).editable({
            emptytext: that.emptytext,
            pk: id,
            savenochange: true,
            select2: {
                allowClear: true,
                placeholder: 'Search for an affiliate',
                ajax: {
                    dataType: 'json',
                    data: function(term, page) {
                        return {
                            id: id,
                            key: term 
                        };
                    },
                    results: function(data, page) { // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter remote JSON data
                        return { results: data.data };
                    },
                    params: select2_ajax_params.affiliate_getOtherReferral
                },
                initSelection: function(element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected movie's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the movie name is shown preselected

                },
                formatResult: function(aff) {
                    return '<li>' + aff.id + ' - ' + aff.first_name + ' '+ aff.last_name + '</li>';
                },
                formatSelection: function(aff) {
                    return aff.id + ' - ' + aff.first_name + ' '+ aff.last_name;
                },
                escapeMarkup: function(aff) {
                        return aff;
                    }
            },
            params: function(params) {
                //hack
                var new_params = {id: params.pk};
                var val_k = 'profile[referral_by]';
                if($(".control-group-referBy .select2-chosen").text() === "Select an affiliate"){
                    new_params[val_k] = null;
                }else{
                    new_params[val_k] = params.value;
                }
                return new_params;
            },
            url: function(new_params) {
                return  Vue.http.post('Affiliate/edit', new_params)

            },
            success: function(response, new_value) {
                if($(".control-group-referBy .select2-chosen").text() === "Select an affiliate"){
                    new_value = ""
                }
                if ('success' === response.body.flag) {
                    return {
                        newValue: new_value
                    };
                } else {
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
        $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
          e.preventDefault()
          that.modalState = "show"
        })
    }
  },
  watch:{
    renderPublisher:function(newVal, oldVal){
      if(newVal) {
        this.startRender()
      }
    }
  },
  mounted () {
    if(this.renderPublisher) {
        this.startRender()
    }

  }
}
</script>