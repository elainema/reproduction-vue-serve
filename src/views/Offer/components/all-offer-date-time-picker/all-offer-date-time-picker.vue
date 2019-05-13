<template>
<div id="datepicker" class="input-daterange input-group datepicker datetimePicker clearfix" ref="datepicker">
    <span>View data for:</span>
    <select class="select_date" name="date_type">
        <option value="create_time" selected>Create Time</option>
        <option value="expiration_date">Expiration Date</option>
    </select>&nbsp;&nbsp;&nbsp;&nbsp;
    <input type="text" readonly="readonly" name="from" v-model="startdate" class="input-sm form-control col-md-6 start" ref="start" id="start"  placeholder="From">
    <input type="text" readonly="readonly" name="to" v-model="enddate" class="input-sm form-control end  col-md-6"  ref="end" id="end"  placeholder="To">
    <div class="date_shortcut" id="date_shortcut">
        <span class="label label-inverse calink" data-date="today" @click="selectDate('today')">Today</span>
        <span class="label label-inverse calink" data-date="yesterday"  @click="selectDate('yesterday')">Yesterday</span>
        <span class="label label-inverse calink" data-date="week" @click="selectDate('week')">Last 7 Days</span>
        <span class="label label-inverse calink" data-date="lmonth" @click="selectDate('lmonth')">Last Month</span>
        <span class="label label-inverse calink" data-date="month" @click="selectDate('month')">This Month</span>
        <span class="label label-inverse calink" data-date="hfyear" @click="selectDate('hfyear')" v-show="limitRange !== 'one_month' ">Last 6 Months</span>
        <span class="label label-inverse calink" data-date="year" @click="selectDate('year')" v-show="limitRange !== 'one_month' ">Last Year</span>
    </div><!--
    <input type="hidden" name="from" v-model="startdate">
    <input type="hidden" name="to" v-model="enddate"> -->
</div>

</template>
<style scoped>
.datepicker table tr td.selected{
    background: #fff;
    color: #666;
    text-shadow: none;
}
input[type="text"]{
    float: none
}
.select_date {
    width: 140px;
}
.input-daterange input{
    text-align: left;
}
</style>

<script>
export default {
    props:{
        start: {},
        end:{}
    },
    data () {
        return {
            startdate: '',
            enddate: '',
            limitRange:{
                default:""
            },
        }
    },
  computed: {
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
        }

    }
  },
  mounted () {
    let that = this;
    $(this.$refs.datepicker).datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        defaultDate: '2017-06-26'
    }).on('changeDate', function(e) {
        // `e` here contains the extra attributes
        that.$nextTick(function(){
            that.startdate = $(this.$refs.start).val();
            that.enddate = $(this.$refs.end).val();
        })
    });
        $(this.$refs.start).data().datepicker.setDate(that.start)
        $(this.$refs.end).data().datepicker.setDate(that.end)
  },
  watch:{
  }
}
</script>