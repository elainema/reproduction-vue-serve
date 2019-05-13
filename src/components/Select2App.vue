<template>
  <div :class="classList">
      <p v-show='select2_mode!=="simple"'>App Name<span style="color: #888;padding: 0 15px;">search maximum show 50 search results</span></p>
      <input :name="select2_name" type="hidden" class=" nopadding col-xs-12" :class="select2_class" ref="select2" v-model="singleVal" />

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
    select2CallBack:{},
    select2_multiple:{
      default:true
    },
    classList:{default:'chosen-filter nopadding col-xs-12'},
    select2_name:{
        type:String,
        default:'app_ids'
    },
    singleVal: ""
  },
  data(){
    return {
        app_id:''
    }
  },
  computed: {

  },
  methods: {
    setValue(val){
      this.app_id = val
      $(this.$refs.select2).select2('val',val)
    }
  },
  mounted () {
      let that = this

      $(this.$refs.select2).select2({
          multiple: true,
          placeholder: 'Search for an App',
          quietMillis: 100,
          width:250,
          containerCssClass :this.select2_class,
          minimumInputLength: 1,
          ajax: {
              dataType: 'json',
              data: function(term, page) {
                  return {
                      app: term, // search term
                  };
              },
              results: function(data, page) { // parse the results into the format expected by Select2.
                  // since we are using custom formatting functions we do not need to alter remote JSON data
                  return { results: data.data && data.data.list || [] };
              },
              params: select2_ajax_param.app,
              onShowResult:function(){

              }
          },
          initSelection: function(element, callback) {
              // the input tag has a value attribute preloaded that points to a preselected movie's id
              // this function resolves that id attribute to an object that select2 can render
              // using its formatResult renderer - that way the movie name is shown preselected
              var id = that.singleVal;
              if (id !== "" && id != undefined) {
                  Vue.http.get('Publisher/searchApp',{app:id}).then(response => {
                      callback(response.body.data.list);
                  }, response => {
                      // error callback
                  });
              }
              else if(that.app_id.length > 0){
                  callback(that.app_id)
              }
          },
          formatResult: function(app) {
              return '<li>' + app.id + ' ' + app.name  + '</li>';
          },
          formatSelection: function(app) {
              return app.id + ' ' + app.name;
          },
          escapeMarkup: function(app) {
              return app; 
          } // we do not want to escape markup since we are displaying html in results
      })
      $(that.$refs.select2).on('change', function(e) {
          var val = e.val
          that.select2CallBack && that.select2CallBack(val)
      })

  }

}
</script>
