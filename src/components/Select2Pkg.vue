<template>
  <div :class="classList">
      <p v-show='select2_mode!=="simple"'>Pkg Name<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
      <input :name="pkg_name" type="hidden" class=" nopadding col-xs-12" :class="select2_class" ref="select2" />
  </div>
</template>
<script>
import select2_ajax_param from '../util/select2_ajax_param'
import select2_select_all from '../plugins/select2_select_all'

import Vue from "vue"
export default {
  props: {
    select2_mode:{
      default:""
    },
    select2_class:{
      default:"col-md-5 nopadding"
    },
    pkg_name:{
      default:"filters[pkg_name]"
    },
    showSelectAll: {
      default:true
    },
    select_api:{
      default:"offer2_pkg"
    },
    placeholder:{
      default:"Search for an Package"
    },
    select2CallBack:{},
    select2_multiple:{
      default:true
    },
    classList:{default:'filter-pkg_name chosen-filter nopadding col-xs-12'},
    select2_container_width:{default:'300px!important'},
    isShadow:{
        default:false
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
      let action = this.aggregation ? "add" : "remove";
      let name = $(e.target).val()
      this.changeAggregationFilters(action,name)
    }
  },
  mounted () {
      let that = this

      $(this.$refs.select2).select2({
          multiple: that.select2_multiple,
          placeholder: this.placeholder,
          quietMillis: 100,
          width:that.select2_container_width,
          containerCssClass :this.select2_class,
          minimumInputLength: 1,
          ajax: {
              dataType: 'json',
              data: function(term, page) {
                  return {
                      pkg_name: term, // search term
                  };
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data.data && data.data || [] };
              },
              params: select2_ajax_param[that.select_api],
              onShowResult:function(){
                  console.log("onShowResult");
                  if (that.showSelectAll) {
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
                  Vue.http.get('Affiliate/search',{pkg_name:id}).then(response => {
                      callback(response.body.data.list);
                  }, response => {
                      // error callback
                  });
              }
          },
          formatResult: function(data) {
              return '<li>' + data.id + '</li>';
          },
          formatSelection: function(data) {
              return data.id;
          },
          escapeMarkup: function(aff) {
              return aff; 
          } // we do not want to escape markup since we are displaying html in results
      })
      $(that.$refs.select2).on('change', function(e) {
          var val = e.val
          that.select2CallBack && that.select2CallBack(val)
      })

  }

}
</script>
