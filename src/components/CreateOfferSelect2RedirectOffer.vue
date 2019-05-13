<template>
    <div class="controls">
        <input name="caps_redirect_offer_id" type="hidden" :class="select2_class"  ref="select2" />
        <span style="color: #888;padding: 0 4px;">search maximum show 50 search results</span>
    </div>
</template>
<script>
import select2_ajax_param from '../util/select2_ajax_param'

import Vue from "vue"
export default {
  props:  {
    select2_mode:{
      default:""
    },
    select2_class:{
      default:"col-md-6 nopadding"
    }
  },
  computed: {

  },
  mounted () {
      $(this.$refs.select2).select2({
            allowClear: true,
            placeholder: 'Search for an Offer',
            quietMillis: 100,
            minimumInputLength: 1,
            ajax: {
              dataType: 'json',
              data: function(term, page) {
                  return {
                      offer: term, // search term
                      stat: 1
                  };
              },
              results: function(data, page) {
                  return {
                      results: data && data.data &&　data.data.list
                  };
              },
              params: select2_ajax_param.offer
            },
            initSelection: function(element, callback) {
              var id = $(element).val();
              if (id !== "" && id != 0) {
                Vue.http.get('Offer2/getReportOffer', {offer_ids:id, stat: 1}).then(response => {
                      if (data.list && data.list.length == 0) {
                          $(element).val('');
                      }
                      callback(response.body.data.list[0]);
                  }, response => {
                      // error callback
                  });
              }
            },
            formatResult: function(offer) {
              var _country = '';
              if (offer.country.length > 11) {
                  _country = offer.country.substring(0, 11) + '...';
              } else {
                  _country = offer.country;
              }

              return '<li>' + offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout + '</li>';
            },
            formatSelection: function(offer) {
              var _country = '';
              if (offer.country.length > 11) {
                  _country = offer.country.substring(0, 11) + '...';
              } else {
                  _country = offer.country;
              }

              return offer.id + ' - ' + offer.name + ' - ' + _country + ' - ' + '$' + offer.payout;
            },
            escapeMarkup: function(offer) {
              return offer;
            }
      })
    }

}
</script>
