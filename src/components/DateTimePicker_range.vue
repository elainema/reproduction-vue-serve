<template>
<div id="datepicker" :class="classes" ref="datepicker">
    <div class="col-md-6">
        <input type="text"  readonly="readonly" v-model="startdate" class="input-sm form-control  col-md-8 start" :class="no_hour ? 'col-md-12' : ''" ref="start" >
        <select id="" class="hour_sel col-md-4" v-model="starthour" v-if="!no_hour">
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
        </select>
    </div>

    <div class="col-md-6">
        <input type="text" readonly="readonly" :class="no_hour ? 'col-md-12' : ''" v-model="enddate" class="input-sm form-control end  col-md-8"  ref="end">
        <select id="" class="hour_sel col-md-4" v-model="endhour" v-if="!no_hour">
            <option value="00:00">00:00</option>
            <option value="01:00">01:00</option>
            <option value="02:00">02:00</option>
            <option value="03:00">03:00</option>
            <option value="04:00">04:00</option>
            <option value="05:00">05:00</option>
            <option value="06:00">06:00</option>
            <option value="07:00">07:00</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
            <option value="22:00">22:00</option>
            <option value="23:00">23:00</option>
        </select>
    </div>
    <div class="col-md-12 date_shortcut" id="date_shortcut" v-if="show_date_shortcut">
        <span class="label label-inverse calink" v-show="!limitRange || typeof limitRange === 'string' || (typeof limitRange === 'object' && limitRange.indexOf('today') !== -1 ) " data-date="today" @click="selectDate('today')">Today</span>
        <span class="label label-inverse calink" data-date="yesterday"  @click="selectDate('yesterday')" v-show="!limitRange || typeof limitRange === 'string' || (typeof limitRange === 'object' && limitRange.indexOf('yesterday') !== -1 ) " >Yesterday</span>
        <span class="label label-inverse calink" data-date="week" @click="selectDate('week')" v-show="!limitRange || typeof limitRange === 'string' || (typeof limitRange === 'object' && limitRange.indexOf('week') !== -1 ) ">Last 7 Days</span>
        <span class="label label-inverse calink" data-date="month" @click="selectDate('month')"  v-show="!limitRange || typeof limitRange === 'string' || (typeof limitRange === 'object' && limitRange.indexOf('month') !== -1 ) "  >This Month</span>
        <span class="label label-inverse calink" data-date="lmonth" @click="selectDate('lmonth')" v-show="!limitRange || typeof limitRange === 'string' || (typeof limitRange === 'object' && limitRange.indexOf('lmonth') !== -1 ) " >Last Month</span>
        <span class="label label-inverse calink" data-date="hfyear" @click="selectDate('hfyear')" v-show="!limitRange || (typeof limitRange === 'string' && typeof limitRange !== 'one_month') || (typeof limitRange === 'object' && limitRange.indexOf('hfyear') !== -1 ) " >Last 6 Months</span>
        <span class="label label-inverse calink" data-date="year" @click="selectDate('year')" v-show="!limitRange || (typeof limitRange === 'string' && typeof limitRange !== 'one_month' )|| (typeof limitRange === 'object' && limitRange.indexOf('year') !== -1 ) ">Last Year</span>
    </div>
    <input type="hidden" :name="start_class" v-model="start">
    <input type="hidden" :name="end_class" v-model="end">
</div>

</template>
<style>
.datepicker table tr td.selected{
    background: #fff;
    color: #666;
    text-shadow: none;
}

.dateTimePicker_inline {
    float: left !important;
    width: auto !important;
    clear: inherit !important
}
.dateTimePicker_inline .col-md-10,
.dateTimePicker_inline .col-md-6,
.dateTimePicker_inline .col-md-12{
    width: auto !important;
}


.dateTimePicker_inline .date_shortcut{
    margin-top: 2px !important;
}


</style>
<script>

export default {
  props:  {
    cal_day:{
        default: true,
        type:Boolean
    },
    dateChange:{
        default: $.noop,
        type:Function

    },
    limitRange:{
        default:""
    },
    init_date:{
        default:"today"
    },
    no_hour:{
        default:false
    },
    start_class:{
        default:"start"
    },
    end_class:{
        default:"end"
    },
    show_date_shortcut: {
        default: true
    },
    from_date:{
        default:"today"
    },
    detaultStartDate: {
        default:""
    },
    defaultEndDate: {
        default:""
    },
    classList:{
        default:"col-md-8"
    },

  },
  data () {
    return {
    startdate:"",
    enddate:"",
    starthour:"00:00",
    endhour:"00:00",
   }
  },
  computed: {
    start(){
        return this.no_hour ? this.startdate  :  this.startdate + " " + this.starthour
    },
    end(){
        return this.no_hour ? this.enddate  :  this.enddate + " " + this.endhour
    },
    classes() {
        return this.classList + ' input-daterange input-group datepicker datetimePicker  clearfix'
    }
  },
  methods: {
    selectDate(msg) {
        this.starthour = this.endhour = "00:00"
        switch(msg) {
            case "today":
                this.startdate = moment().format("YYYY-MM-DD");
                this.enddate =  moment().add(1, 'day').format("YYYY-MM-DD");
                break;
            case "yesterday":
                this.startdate =  moment().add(-1, 'day').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "week":
                this.startdate =  moment().add(-1, 'week').add(1, 'day').format("YYYY-MM-DD");
                this.enddate =  moment().add(1, 'day').format("YYYY-MM-DD");
                break;
            case "month":
                this.startdate =  moment().format("YYYY-MM-01");
                this.enddate =  moment().add(1, 'day').format("YYYY-MM-DD");
                break;
            case "lmonth":
                this.startdate = moment().add(-1, 'month').format("YYYY-MM-01");
                this.enddate =  moment().format("YYYY-MM-01");
                break;
            case "hfyear":
                this.startdate =  moment().add(-0.5, 'year').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "year":
                this.startdate =  moment().add(-1, 'year').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "lmonth_minus":
                this.startdate =  moment().add(-1, 'month').format("YYYY-MM-DD");
                this.enddate =  moment().format("YYYY-MM-DD");
                break;
            case "lmonth_2d":
                this.startdate =  moment().add(2, "day").add(-1, 'month').format("YYYY-MM-DD");
                this.enddate =  moment().add(1, "day").format("YYYY-MM-DD");
                break;



        }

    }
  },
  mounted () {
    let that = this;
    $(this.$refs.datepicker).datepicker({
        format: "yyyy-mm-dd",
        startDate:that.startDate,
        endDate:that.endDate,
        autoclose: true,
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        that.$nextTick(function(){
            that.startdate = $(this.$refs.start).val();
            that.enddate = $(this.$refs.end).val();
        })

    });

    if (!(this.detaultStartDate && this.defaultEndDate) && that.from_date) {
        that.selectDate(that.from_date)
        return
    }
    this.startdate = this.detaultStartDate
    this.enddate = this.defaultEndDate
  },
  watch:{
    detaultStartDate(val) {
        this.startdate = val
    },
    defaultEndDate(val) {
        this.enddate = val
    },

    startdate:function(val ,oldval){
        $(this.$refs.start).data().datepicker.setDate(val)
    },
    enddate:function(val ,oldval){
        $(this.$refs.end).data().datepicker.setDate(val)
    },
    start:function(val, oldval){
        this.dateChange(this.startdate, this.enddate);
    },
    end: function(){
        this.dateChange(this.startdate, this.enddate);
    },
    cal_day:function(val ,oldval){
        val && this.selectDate("today")
    }
  }
}
</script>
<style scoped>
    .date_shortcut {
        margin-top: 10px;
    }
    .col-md-6,
    .col-md-12{
        padding-left: 0
    }
</style>