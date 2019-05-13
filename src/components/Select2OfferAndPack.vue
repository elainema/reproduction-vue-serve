<template>
    <div class="filter-offer_id chosen-filter nopadding col-xs-12" ref="filter_offer">
        <input v-if="placeholder" :data-name="data_name" :name="select2_name" type="hidden" :class="select2_class" class=" nopadding  col-xs-12"  ref="select2" :placeholder="data_placeholder" />
        <input v-else :data-name="data_name" :name="select2_name" type="hidden" :class="select2_class" class=" nopadding  col-xs-12"  ref="select2" />
        <button type="submit" class="btn btn-primary go">go</button>
    </div>
</template>
<script>
import select2_ajax_param from '../util/select2_ajax_param'
import select2_select_all from '../plugins/select2_select_all'

import Vue from "vue"
export default {
  props:  {
    changeAggregationFilters:{},
    select2_mode:{
      default:""
    },
    select2_class:{
      default:"col-md-7 nopadding"
    },
    select2_name:{
      default:"filters[offer_id]"
    },
    showSelectAll: {
      default:true
    },
    select2_multiple:{
      default:true
    },
    params_offer_api:{
      default:"new"
    },
    onSelect:{

    },
    select2CallBack:{},
    data_name:{},
    select2_api:{},
    adv_id:{},
    placeholder: {}
  },
  data(){
    return {
      aggregation:false,
      data_placeholder:''
    }
  },
  computed: {
  },
  watch:{
      placeholder(newVal, oldVal) {
        var $ele = $('[data-name="offer"]').siblings().find(".select2-search-field input");
        this.data_placeholder = this.placeholder
        $ele.val("").attr("placeholder", this.placeholder);
      }
  },
  methods: {
    changeAggregation(e){
      let action = this.aggregation ? "add" : "remove";
      let name = $(e.target).val()
      this.changeAggregationFilters(action,name)
    }
  },
  mounted () {
    let  that = this
    $(this.$refs.select2).select2({
          multiple: this.select2_multiple,
          placeholder: 'Search for an Offer',
          quietMillis: 100,
          width:300,
          containerCssClass :this.select2_class,
          minimumInputLength: 1,
          ajax: {
              quietMillis: 500,//delay search
              dataType: 'json',
              data: function(term, page) {
                if (that.adv_id) {
                  if (/\,/.test(term)) {
                      term = term.replace(/all,/, "");
                  }
                  return {
                      offer: term,
                      adv_id:$('[data-name="adv"]').trimVal() || '',
                  };
                } else {
                  return {
                      offer: term, // search term
                  };
                }
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data && data.data && data.data.list || [] };
              },

              params: select2_ajax_param[that.select2_api] || select2_ajax_param.offer2,

              onShowResult:function(){
                  console.log("onShowResult");
                  if(that.select2_multiple){
                    select2_select_all.appendAllMatchedDomToSelect2()
                  }
              }
          },
          initSelection: function(element, callback) {
              // the input tag has a value attribute preloaded that points to a preselected movie's id
              // this function resolves that id attribute to an object that select2 can render
              // using its formatResult renderer - that way the movie name is shown preselected
              var id = $(element).val();
              if (id !== "") {
                  Vue.http.get(select2_ajax_param[that.select2_api] || select2_ajax_param.offer2, {offer:id}).then(response => {
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
              that.onSelect && that.onSelect(offer)
              return offer.id + ' ' + offer.name;
          },
          escapeMarkup: function(offer) {
              return offer; 
          } // we do not want to escape markup since we are displaying html in results
    })


    $(that.$refs.select2).on('change', function(e) {
        var val = e.val
        that.select2CallBack && that.select2CallBack(val)
    })
  }

}
</script>
<style scoped>
.go{
  margin-left:5px;
}
</style>