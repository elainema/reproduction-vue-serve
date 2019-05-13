<template>
    <div class=" chosen-filter  nopadding col-xs-12" :class="'filter' + chosen.full_name">
        <p v-if="chosen_type !== 'simple'">{{chosen.full_name | capitalize}}</p>
        <select :name="!chosen_name ? 'filters['+chosen.trans_name+'][]' :  chosen_name" :class="select_class" :data-placeholder="chosen_placeholder" v-conditionAttr='multiple_vue' ref="chosen" :show_all_matched_select="chosen.name==='adv' ? 1 : 0">
            <option v-if="default_option==='All'" value="" selected="selected">{{default_option}}</option>
            <option v-else-if="default_option !== 'no'" :value="default_value" selected="selected" >{{default_option}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='geo'" :value="n.id">{{n.code}} - {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='dev'" :value="n.device_names">{{n.device_names}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='browser'" :value="n">{{n}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='device'" :value="n">{{n}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='adv'" :value="n.id">{{n.id}} {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='am'" :value="n.id">{{n.id}} {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='pm'" :value="n.id">{{n.id}} {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='company'" :value="n">{{n}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='offer'" :value="n.id">{{n.id}} - {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='advertiser_id'" :value="n.id">{{n.id}} {{n.name}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='tool_adv'" :value="n.id">{{n.id}} {{n.company}}</option>
            <option v-for="n in chosen.data" v-if="chosen.name==='aff'" :value="n.id">{{n.id}} {{n.first_name}} {{n.last_name}}</option>
            <option v-for="n in chosen" v-if="chosen_name==='app_id'" :value="n.id"> {{n.name}}</option>
            <option v-for="n in chosen" v-if="chosen_name==='shadow_affiliate_id'" :value="n"> {{n}}</option>

            <option v-for="n in chosen.data" v-if="chosen.name==='contract'" :value="n.contract_id" :type="n.contract_type">{{n.contract_id}} {{n.customer_name}}</option>

        </select>
        <!-- <label class="checkbox-inline ml15 xs-ml15" v-if="chosen.name === 'adv'">
            <input type="checkbox" class="aggregation_filters" :value="chosen.trans_name" @change="changeAggregation" v-model="aggregation" > Aggregate
        </label> -->
    </div>
</template>
<script>
import chosen_select_all from '../plugins/chosen_select_all'

export default {
  data(){
    return {
      aggregation:false,
      selected_opstion: []
    }
  },
  props:  {
    chosen:{},
    chosen_type:{
      default:""
    },
    chosen_name:{

    },
    default_option:{
      default:"All"
    },
    default_value:{default:""},
    multiple_vue:{},
    changeAggregationFilters:{
      default:$.noop
    },
    onChange:{},
    afterRender:{},
    select_class:{default:"col-md-5"},
    checked_first:{default:false},
    chosen_width:{
      default:"300px"
    },
    chosen_placeholder:{
      default:""
    },
    selected_option:{
      default:() => {
        return []
      }
    },
    changeCallback:{}
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
  watch:{
    chosen:function(newVal, oldVal) {
      let that = this
      setTimeout(function(){
        $(that.$refs.chosen).trigger("chosen:updated");
      },0)
    },
    selected_opstion:function(newVal){
      let that = this
      setTimeout(function(){
        $(that.$refs.chosen).trigger("chosen:updated");
      },0)
    }
  },
  mounted () {
    let that = this
    if(that.checked_first){
        $(this.$refs.chosen).find("option").eq(1).prop("selected",true)
    }
    $(this.$refs.chosen)

      .chosen({width:that.chosen_width})
      .change(function(e, val) {
        if (_.isNull($(this).val())) {
            $(this).find('option[value=""]').prop('selected', true);
            $(this).trigger('chosen:updated');
            return;
        }
        if (val.selected == '') {
            $(this).find('option:selected').prop('selected', false).end().find('option[value=""]').prop('selected', true);
        } else {
            $(this).find('option[value=""]').prop('selected', false);
        }
        $(this).trigger('chosen:updated');
        if (that.chosen.name==='contract' || that.chosen_name==='shadow_affiliate_id') {
          that.onChange && that.onChange(val.selected, $(e.target).find("option:selected").text(), e)
        } else {
          that.onChange && that.onChange(val.selected, $(e.target).find("option:selected").text())
        }
        that.changeCallback && that.changeCallback(val.selected)
        
      })

          


    let chosen_data = $(this.$refs.chosen).data('chosen')
    
    if(chosen_data){
      chosen_data.container.bind('keyup', function(e){
          if($(that.$refs.chosen).attr("show_all_matched_select") === "1"){
           setTimeout(function(){
              chosen_select_all.appendAllMatchedDomToChosen($(that.$refs.chosen));
            },0)
          }
      });
      
    }

    that.afterRender && that.afterRender()

  },
  created() {
  }
}
</script>