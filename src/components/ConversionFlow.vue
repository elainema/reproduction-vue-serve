<template>
    <select :class="'form-control col-md-4 a1 conversion_flow_' + type" data-control-name="conversion_flow" @change="selectCallback">
       <option v-if="i[type] === '1'" v-for="i in flowData" :value="i.id" :selected="i.id == defaultConversionFlow ? true : false">{{ i.name }}</option>
    </select>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default{
  props: {
      type:{
          default:' '
      },
      defaultConversionFlow :{default:''},
      chosen:{},
      renderOffer:{},
      changeCallback:{},
  },
    data() {
        return {
      flowId:1,
      flowData:[],
        }
    },
  watch:{
    defaultConversionFlow(newVal, oldVal) {
        let that = this
        if (newVal) {
            that.flowData = that.chosen
        }
    },
    renderOffer(newVal, oldVal) {
        let that = this
        if (newVal) {
            that.flowData = that.chosen
        }
    }
  },
    computed: {
    },
  methods:{
    selectCallback(e) {
      var val = e.target.value
      this.changeCallback(val)
    }
  },
    mounted() {
    }
}
</script>