<template>
    <div class="filter-offer_id chosen-filter nopadding col-xs-12">
        <input name="filters[offer_id]" type="hidden" :class="select2_class" class=" nopadding  col-xs-12"  ref="select2"/>
        <label class="checkbox-inline ml15 xs-ml15" v-show='select2_mode!=="simple"'>
            <input type="checkbox"  class="aggregation_filters"  value="offer_id" @change="changeAggregation"> Aggregate
        </label>
    </div>
</template>
<script>
import select2_ajax_param from '../util/select2_ajax_param'

import Vue from "vue"
export default {
  props:  {
    changeAggregationFilters:{},
    select2_mode:{
      default:""
    },
    select2_class:{
      default:"col-md-7 nopadding"
    }
  },
  data(){
    return {

    }
  },
  computed: {

  },
  methods: {
    changeAggregation(e){
      let action = $(e.target).is(":checked") ? "add" : "remove";
      let name = $(e.target).val()
      this.changeAggregationFilters(action,name)
    }
  },
  mounted () {
      $(this.$refs.select2).select2({
          multiple: true,
          placeholder: 'Search for an PM',
          quietMillis: 100,
          width:250,
          containerCssClass :this.select2_class,
          minimumInputLength: 1,
          ajax: {
              quietMillis: 100,//delay search
              dataType: 'json',
              data: function(term, page) {
                  return {
                      offer: term, // search term
                  };
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data.data && data.data.list || [] };
              },
              params: select2_ajax_param.referralAM,
              onShowResult:function(){
                  console.log("onShowResult");
              }
          },
          initSelection: function(element, callback) {
              // the input tag has a value attribute preloaded that points to a preselected movie's id
              // this function resolves that id attribute to an object that select2 can render
              // using its formatResult renderer - that way the movie name is shown preselected
              var id = $(element).val();
              if (id !== "") {
                  Vue.http.get('Am/getAmByKeywords', {offer:id}).then(response => {
                      callback(response.body.data.list);
                  }, response => {
                      // error callback
                  });

              }
          },
          formatResult: function(offer) {
              return '<li>' + offer.id + ' ' + offer.name + '</li>';
          },
          formatSelection: function(offer) {
              return offer.id + ' ' + offer.name;
          },
          escapeMarkup: function(offer) {
              return offer; 
          } // we do not want to escape markup since we are displaying html in results
    })
  }

}
</script>
