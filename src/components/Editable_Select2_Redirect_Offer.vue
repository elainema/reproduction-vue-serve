<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a href="#" ref="editable" id=""  :data-value="offer_val"  :data-mode="editable_mode"  :data-name="offer_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>
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
    source:{},
    "showAlert":{},
    offer_val:{},
    renderOffer:{},
    offer_name:{},
    savenochange:{default:false},
    editable_mode:{default:"inline"},
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
    renderEditable(){
      let that = this
      let _params = {};
      $(this.$refs.editable).attr('data-value', this.offer_val).show();
      let id = that.$route.query.id;
      $(this.$refs.editable).editable({
            pk: that.$route.query.id,
            onblur: 'ignore',
            display: function(value, source) {
              Vue.http.get('Offer2/getRedirectOfferTitle?offer_id='+that.$route.query.id).then(function(response){

                  if(response.body.data.title) {
                      $(that.$refs.editable).text(response.body.data.title + " (status: " + response.body.data.status + ")").removeClass("editable-empty");
                  }else{
                      $(that.$refs.editable).text('Empty').addClass("editable-empty");
                  }
              })
            },
            select2: {
                allowClear: true,
                placeholder: 'Search for an Offer',
                quietMillis: 100,
                width: "450px",
                minimumInputLength: 1,
                ajax: {
                    dataType: 'json',
                    data: function(term, page) {
                        return {
                            offer: term, // search term
                            stat: 1,
                            offer_id: id
                        };
                    },
                    results: function(data, page) { // parse the results into the format expected by Select2.
                        // since we are using custom formatting functions we do not need to alter remote JSON data
                        return { results: data.data.list };
                    },
                    params: select2_ajax_params.offer
                },
                initSelection: function(element, callback) {
                    // the input tag has a value attribute preloaded that points to a preselected movie's id
                    // this function resolves that id attribute to an object that select2 can render
                    // using its formatResult renderer - that way the movie name is shown preselected
                    var id = $(element).val();
                    if (id !== "") {
                        Vue.http.get("offer2/getReportOffer?stat=1&offer_ids="+id).then(response => {
                            if (response.body.data.list && response.body.data.list.length == 0) {
                                $(element).val('');
                            }
                            callback(response.body.data.list[0]);
                        }, response => {

                        })
                    }
                },
                formatResult: function(offer) {
                    var _country = '';
                    if (offer.country.length > 11) {
                        _country = offer.country.substring(0, 11) + '...';
                    } else {
                        _country = offer.country;
                    }

                    /* return '<li>' + offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout + '</li>';*/

                    var pattern = offer.payout ? offer.payout.toLowerCase() : "";
                    return '<li>' + offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + (pattern.indexOf("dynamic") >= 0 ? offer.payout : '$' + offer.payout) + '</li>';
                },
                formatSelection: function(offer) {
                    var _country = '';
                    if (offer.country.length > 11) {
                        _country = offer.country.substring(0, 11) + '...';
                    } else {
                        _country = offer.country;
                    }

                    /*return offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout;*/
                    var pattern = offer.payout ? offer.payout.toLowerCase() : "";
                    return offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + (pattern.indexOf("dynamic") >= 0 ? offer.payout : '$' + offer.payout);
                },
                escapeMarkup: function(offer) {
                        return offer;
                    } // we do not want to escape markup since we are displaying html in results
            },
            params: function(params) {
                var new_params = { id: params.pk };
                new_params[params.name] = params.value;
                return new_params;
            },
            url: function(new_params) {
                return  Vue.http.post('Offer2/edit', new_params)
            },
            success: function(response, new_value) {
                if ('success' === response.body.flag) {
                    return { newValue: new_value };
                } else {
                    that.showAlert(response.body.msg || 'unknown error');
                    return response.body.msg || 'unknown error';
                }
            },
            error: function(response, newValue) {
                that.showAlert(response.body.msg || 'unknown error');
                if(response.body.status === 500) {
                    return 'Service unavailable. Please try later.';
                } else {
                    return response.body.msg;
                }
            }
        })
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
      that.modalState = "show"
    })

  }
}
</script>