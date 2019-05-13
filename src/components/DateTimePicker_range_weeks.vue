<template>
<div id="datepicker" class="col-md-12 date input-daterange input-group " ref="datepicker">
    <input type="text"  readonly="readonly" v-model="startdate" class="input_date col-md-2 yeah-dtpicker" ref="start" >
    <input type="text" readonly="readonly"  v-model="enddate" class="input_date col-md-2 yeah-dtpicker"  ref="end">
    <span class="week_shortcut date_shortcut " id="date_shortcut">
        <span class="label label-inverse calink"  @click="selectDate('week')">Last Week</span>
        <span class="label label-inverse calink"  @click="selectDate('two_weeks')">Last 2 Weeks</span>
        <span class="label label-inverse calink"  @click="selectDate('three_weeks')">Last 3 Weeks</span>
        <span class="label label-inverse calink"  @click="selectDate('four_weeks')">Last 4 Weeks</span>
    </span>
    <input type="hidden" name="start_time" v-model="start">
    <input type="hidden" name="end_time" v-model="end">
</div>

</template>
<style>
.datepicker table tr td.selected{
    background: #fff;
    color: #666;
    text-shadow: none;
}

</style>
<script>

export default {
  props:  {
    dateChange:{
        default: $.noop,
        type:Function

    },
    init_date:{
        default:"week"
    },
    callBack:{},
  },
  data () {
    return {
    startdate:"",
    enddate:""
   }
  },
  computed: {
    start(){
        return this.startdate 
    },
    end(){
        return this.enddate
    }
  },
  methods: {
    selectDate(msg) {
        console.log(msg)
        switch(msg) {

            case "week":
                this.startdate =  moment().add(-1, 'week').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "two_weeks":
                this.startdate =  moment().add(-2, 'week').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "three_weeks":
                this.startdate =  moment().add(-3, 'week').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "four_weeks":
                this.startdate =  moment().add(-4, 'week').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
        }

    }
  },
  mounted () {
    let that = this;
    $(this.$refs.datepicker).datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        that.$nextTick(function(){
            that.startdate = $(this.$refs.start).val();
            that.enddate = $(this.$refs.end).val();
        })

    });
    that.selectDate('week')
    that.callBack && that.callBack()
  },
  watch:{
    startdate:function(val ,oldval){
        $(this.$refs.start).data().datepicker.setDate(val)
    },
    enddate:function(val ,oldval){
        $(this.$refs.end).data().datepicker.setDate(val)
    }
  }
}
</script>