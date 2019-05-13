<template>
    <div class="filter-smart-link_id chosen-filter nopadding col-xs-12">
        <p>Smart Url<span style="color: #888;padding: 0 15px;"></span></p>
        <input name="filters[smart_link]" type="hidden" class="pull-left col-xs-12 nopadding" ref="select2"/>
        <label class="checkbox-inline ml15 xs-ml15">
            <input type="checkbox"  class="aggregation_filters" value="smart_link" @change="changeAggregation" v-model="aggregation"> Aggregate
        </label>
    </div>
</template>
<script>
import config from '../util/config'

import Vue from "vue"
export default {
  props: ['changeAggregationFilters'],
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
    //   Vue.http.get(document.location.protocol + "//" + config.api_host + "/rotate/Offer/getAllGroups").then(response => {
    //       var groups = [];
    //       var _data = _.filter(response.body.data, function(obj) {
    //           return obj.id === "1" || obj.id === "8" || obj.id === "9" || obj.id === "12" || obj.id === "16" || obj.id === "2" || obj.id === "22" || obj.id === "23"
    //       });
    //       _.map(_data, function(v, k) {
    //           _data[k].text = v.name
    //       })
    //       $(this.$refs.select2).select2({
    //           multiple: true,
    //           placeholder: 'Search for an smart link',
    //           data: _data
    //       })
    //   }, response => {
          
    //   });
  }

}
</script>
