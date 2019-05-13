<template>
  <div :class="classList">
      <p v-show='select2_mode!=="simple"'>Affiliate<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
      <input :name="aff_name" type="hidden" class=" nopadding col-xs-12" :class="select2_class" ref="select2" v-model="singleVal" /> 
      <label class="checkbox-inline ml15 xs-ml15" v-show='select2_mode!=="simple"'>
          <input type="checkbox" class="aggregation_filters" value="affiliate_id" @change="changeAggregation"> Aggregate
      </label>
      <label class="checkbox-inline ml15 xs-ml15" v-if="isShadow">
          <input type="checkbox" class="aggregation_filters" value="1" name="shadow" > Shadow
      </label>
  </div>
</template>
<script>
import select2_ajax_param from '../util/select2_ajax_param'
import select2_select_all from '../plugins/select2_select_all'

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
    aff_name:{
      default:"filters[affiliate_id]"
    },
    showSelectAll: {
      default:true
    },
    select_api:{
      default:"affiliate"
    },
    placeholder:{
      default:"Search for an Affiliate"
    },
    select2CallBack:{},
    select2_multiple:{
      default:true
    },
    classList:{default:'filter-affiliate_id chosen-filter nopadding col-xs-12'},
    select2_container_width:{default:'300px!important'},
    isShadow:{
        default:false
    },
    singleVal:""
  },
  data(){
    return {
      aggregation:false,
      aff_id:''
    }
  },
  computed: {

  },
  methods: {
    changeAggregation(e){
      let action = $(e.target).is(":checked") ? "add" : "remove";
      let name = $(e.target).val()
      this.changeAggregationFilters(action,name)
    },
    setValue(val){
        this.aff_id = val
        $(this.$refs.select2).select2('val',val)
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
                      aff: term, // search term
                  };
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data.data && data.data.list || [] };
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
              var id = that.singleVal
              if (id !='' && id != undefined) {
                  var params = {aff : id}
                  Vue.http.get('Affiliate/search',{params}).then(response => {
                      let result = response.body.data ? response.body.data.list[0] : []
                      callback(result);  //模糊查询有多个结果，选中默认用第一个结果,aff_id=1
                  }, response => {
                      // error callback
                  });
              }
              else if(that.aff_id.length > 0){
                  callback(that.aff_id)
              }
          },
          formatResult: function(aff) {
              return '<li>' + aff.id + ' ' + aff.first_name + ' ' + aff.last_name + '</li>';
          },
          formatSelection: function(aff) {
              return aff.id + ' ' + aff.first_name + ' ' + aff.last_name;
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
