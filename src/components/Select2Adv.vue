<template>
  <div class="filter-adv_id chosen-filter nopadding col-xs-12">
      <p v-show='select2_mode!=="simple"'>Advertiser<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
      <input :data-name="data_name"　:name="adv_name" type="hidden" class=" nopadding col-xs-12" :class="select2_class" ref="select2" />
      <label class="checkbox-inline ml15 xs-ml15" v-show='select2_mode!=="simple"'>
          <input type="checkbox" class="aggregation_filters" value="affiliate_id" @change="changeAggregation" v-model="aggregation"> Aggregate
      </label>
  </div>
</template>
<script>
import select2_ajax_param from '@/util/select2_ajax_param'
import select2_select_all from '@/plugins/select2_select_all'

import Vue from "vue"
export default {
  props: {
    changeAggregationFilters:{},
    select2_mode:{
      default:""
    },
    select2_class:{
      default:"col-md-5 nopadding"
    },
    adv_name:{
      default:"filters[adv_id][]"
    },
    select2CallBack:{},
    data_name:{},
    select2_api:{default: 'Advertiser'},
  },
  data(){
    return {
      aggregation:false
    }
  },
  computed: {

  },
  methods: {
    changeAggregation(e){
      let action = this.aggregation ? "add" : "remove";
      let name = $(e.target).val()
      this.changeAggregationFilters(action,name)
    }
  },
  mounted () {
    var that = this
    $(this.$refs.select2).select2({
          multiple: true,
          placeholder: 'Search for an Advertiser',
          quietMillis: 100,
          width:250,
          containerCssClass :this.select2_class,
          minimumInputLength: 1,
          ajax: {
              dataType: 'json',
              data: function(term, page) {
                  return {
                      keyword: term, // search term
                  };
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data && data.data && data.data.list || [] };
              },
              params: select2_ajax_param[that.select2_api],
              onShowResult:function(){
                  console.log("onShowResult");
                  select2_select_all.appendAllMatchedDomToSelect2()
              }
          },
          initSelection: function(element, callback) {
              // the input tag has a value attribute preloaded that points to a preselected movie's id
              // this function resolves that id attribute to an object that select2 can render
              // using its formatResult renderer - that way the movie name is shown preselected
              var id = $(element).val();
              if (id !== "") {
                  Vue.http.get('Affiliate/searchAdvByKeywords',{keyword:id}).then(response => {
                      callback(response.body.data.list);
                  }, response => {
                      // error callback
                  });

              }
          },
          formatResult: function(adv) {
              return '<li>' + adv.id + ' ' + adv.company + '</li>';
          },
          formatSelection: function(adv) {
              return adv.id + ' ' + adv.company;
          },
          escapeMarkup: function(adv) {
              return adv; 
          } // we do not want to escape markup since we are displaying html in results
    })

    $(that.$refs.select2).on('change', function(e) {
      var val = e.val
      if (typeof(e.val) !== 'undefined' && e.val.length == 0) {
        that.select2CallBack && that.select2CallBack('')
      } else {
        that.select2CallBack && that.select2CallBack(val)
      }
    })

  }

}
</script>
