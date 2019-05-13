<template>
	<div>
		<div class="control-group form-group">
        <label :class="labelClassList">Effective Time (in GMT)</label>
        <div :class="timeClassList">
            <select name="method" :value="method" @change="handleChange($event,'method')">
                <option v-for="i in data" :value="i.key">{{ i.value}}</option>}
            </select>
        </div>
    </div>

    <div id="customized_time_status" v-show="method==='customized' || method === 'custom'">
        <hr />
        <div class="control-group form-group">
            <label :class="labelClassList">Date</label>
            <div :class="timeClassList">
                <date-picker-single :defaultDate.sync="startDate" :pickerOptions="pickerOptions"></date-picker-single>
            </div>
        </div>
        <div class="control-group form-group">
            <label :class="labelClassList">Time</label>
            <div :class="timeClassList">
                <select class="time" :value="time"  @change="handleChange($event,'time')">
                    <option value="00:00">00:00</option><option value="01:00">01:00</option><option value="02:00">02:00</option><option value="03:00">03:00</option><option value="04:00">04:00</option><option value="05:00">05:00</option><option value="06:00">06:00</option><option value="07:00">07:00</option><option value="08:00">08:00</option><option value="09:00">09:00</option><option value="10:00">10:00</option><option value="11:00">11:00</option><option value="12:00">12:00</option><option value="13:00">13:00</option><option value="14:00">14:00</option><option value="15:00">15:00</option><option value="16:00">16:00</option><option value="17:00">17:00</option><option value="18:00">18:00</option><option value="19:00">19:00</option><option value="20:00">20:00</option><option value="21:00">21:00</option><option value="22:00">22:00</option><option value="23:00">23:00</option>
                </select>
            </div>
        </div>
    </div>
	</div>
</template>

<script>
const DatePickerSingle = () => import(
/* webpackChunkName: "DatePickerSingle" */ '@/components/common/date-picker-single/'
);
export default {
    data() {
        return {
            startDate:'',
            pickerOptions: {
                disabledDate(time) {
                  return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000) ;
                },
            }
        }
    },
    components: {
        DatePickerSingle
    },
	props: {
	  defaultEffectiveDate: {
	    required: false,
	    default: ''
	  },
	  method: {
	    type: String,
	    required: false,
	    default: '-1'
	  },
      time: {
        type: String,
        required: false,
        default: '00:00'
      },
      data: {
        type: Array,
        required: true
      },
      timeClassList: {
        type: String,
        required: false,
        default: 'controls col-md-8'
      },
      labelClassList: {
        type: String,
        required: false,
        default: 'control-label col-md-4'
      }
	},
	watch:{
		startDate() {
            this.$emit('update:defaultEffectiveDate', this.startDate)
		}
	},
    created() {
        this.startDate = this.defaultEffectiveDate
    },
	methods: {
	  handleChange ($el,type) {
        this.$emit(`update:${type}`, $el.target.value)
	  }
	}
}
</script>
<style>
.datetimePicker {
    display: inline-block;
}
</style>