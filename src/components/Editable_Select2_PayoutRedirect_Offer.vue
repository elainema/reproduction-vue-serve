<template>
  <div ref="editable_zone">
    <confirmModal  :modalState="modalState" :hideModal="hideModal"  :onConfirm="onConfirm"></confirmModal>
    <a href="#" ref="editable" id="" data-mode="popup" :data-value="offer_val"   :data-name="offer_name" data-control-name="bt-select" data-type="select2" class="hide-normal"></a>
    <div class="hide-normal" ref="redirect_templ">
        <div class="radio">
            <label>
                <input type="radio"  name="offer_redirect_option" id="optionsRadios1" value="" checked="" data-name="Use Default"> Use Default</label>
        </div>
        <div class="radio">
            <label>
                <input type="radio" name="offer_redirect_option" id="optionsRadios2" value="-1" data-name="No redirect Offer">No redirect Offer</label>
        </div>
        <div class="radio select2_radio" style="display: block;">
            <label style="display: block;">
                <input type="radio" class="pull-left" name="offer_redirect_option" id="optionsRadios3" value="offer_id" data-name="offer_id">
                <a href='javascript:void(0)' :data_select2_aff="aff_id + '_select2'" class='select2-choice pull-left nomargin col-md-10' tabindex='-1' ref="select2-choice" id="select2-choice">
                    <span class='select2-chosen'>&nbsp;</span>
                    <abbr class='select2-search-choice-close'></abbr>
                    <span class='select2-arrow'><b></b></span>
                </a>
            </label>
        </div>
        <input class="select2-focusser select2-offscreen" type="text" id="s2id_autogen6">
        <div class="select2-drop select2-display-none select2-with-searchbox">
            <div class="select2-search">
                <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" class="select2-input"> </div>
            <ul class="select2-results"> </ul>
        </div>
    </div>
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
    aff_id:{},
    savenochange:{default:false},
    dynamic_render:{default:false},
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
    }
  },
  watch:{
    renderOffer:function(newVal, oldVal){

    }
  },
  mounted () {
    let that = this;
    let DIRECT_TMPL = $(that.$refs.redirect_templ).html()
    let _params = {};
    $(this.$refs.editable).attr('data-value', this.offer_val).show();
    let id = that.$route.query.id;
    $(this.$refs.editable).editable({
        placement: 'left',
        emptytext: that.emptytext,
        pk: id,
        savenochange: true,
        display: function(value, source) {
            var name = value && value.toString() === "-1" ? "No redirect Offer" : value;
            $(this).text(name || '');
        },
        select2: {
            allowClear: true,
            width: '400px',
            placeholder: 'Search for an Offer',
            quietMillis: 100,
            custom_tmpl: DIRECT_TMPL,
            dropdownElm: "[data_select2_aff='"+that.aff_id+"_select2']",
            minimumInputLength: 0,
            ajax: {
                dataType: 'json',
                data: function(term, page) {
                    return {
                        offer: term, // search term
                        stat: 1,
                        offer_ids: id,
                        aff_id: that.aff_id
                    };
                },
                results: function(data, page) { // parse the results into the format expected by Select2.
                    // since we are using custom formatting functions we do not need to alter remote JSON data
                    return { results: data.data.list };
                },
                params: select2_ajax_params.offer
            },
            onShowDropdown: function() {
                $("[data-name='offer_id']").prop("checked", true)
            },
            initSelection: function(element, callback) {
                // the input tag has a value attribute preloaded that points to a preselected movie's id
                // this function resolves that id attribute to an object that select2 can render
                // using its formatResult renderer - that way the movie name is shown preselected
                var id = $(element).val();
                var selector = "offer_id"
                if (id === "" || id === "0" || id === "Use Default") {
                    selector = "Use Default"
                } else if (id === "-1" || id === "No redirect Offer") {
                    selector = "No redirect Offer"
                }
                $("[data-name='" + selector + "']").prop("checked", true)
                if (selector === "offer_id") {

                    Vue.http.get("offer2/getReportOffer?stat=1&offer_ids="+id).then(response => {
                      if (response.body.data.list[0]) {
                          callback(response.body.data.list[0]);
                      } else {
                          $(element).val('');
                          $(element).prev('div.select2-container').find('span.select2-chosen').text('This offer: ' + id + ' no longer active.');
                          $(element).parents('div.editable-container').prev('a').addClass('editable-empty');
                      }
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

                var pattern = offer.payout ? offer.payout.toLowerCase() : "";
                return '<li>' + offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + (pattern.indexOf("dynamic") >= 0 ? offer.payout : '$' + offer.payout) + '</li>';
                /* return '<li>'+ offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout +'</li>';*/

            },
            formatSelection: function(offer) {
                var _country = '';
                if (offer.country.length > 11) {
                    _country = offer.country.substring(0, 11) + '...';
                } else {
                    _country = offer.country;
                }
                /* return offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout;*/
                var pattern = offer.payout ? offer.payout.toLowerCase() : "";
                return offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + (pattern.indexOf("dynamic") >= 0 ? offer.payout : '$' + offer.payout);
            },
            escapeMarkup: function(offer) {
                    return offer;
                } // we do not want to escape markup since we are displaying html in results
        },
        params: function(params) {
            params.name = $(this).attr('data-name');
            var new_params = { id: params.pk, aff_id: that.aff_id };
            var val = $('input[name="offer_redirect_option"]:checked').val();
            if (val === "offer_id") {
                new_params[params.name] = params.value;
            } else {
                new_params[params.name] = val;
            }
            return new_params;
        },
        url: function(new_params) {
            return  Vue.http.post('Offer2/editCapsAssign', new_params)
        },
        success: function(response, new_value) {
            var $that = $('input[name="offer_redirect_option"]:checked')
            var val = $that.val();
            var name = $that.attr("data-name")
            if (val === "offer_id") {
                new_value = new_value;
            } else {
                new_value = name;
            }
            if ('success' === response.body.flag) {
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
    $(this.$refs.editable_zone).on("click",".editable-submit", function(e){
      e.preventDefault()
      that.modalState = "show"
    })

  }
}
</script>