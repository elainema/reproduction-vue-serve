<template>
	<select :name="name" :class="classList" :value="timeZone" @change="change">
	    <option value="" >- Timezone -</option>
	    <option value="-12">(GMT -12:00) Eniwetok, Kwajalein</option>
	    <option value="-11">(GMT -11:00) Midway Island, Samoa</option>
	    <option value="-10">(GMT -10:00) Hawaii</option>
	    <option value="-9">(GMT -9:00) Alaska</option>
	    <option value="-8">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
	    <option value="-7">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
	    <option value="-6">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
	    <option value="-5">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
	    <option value="-4">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
	    <option value="-3.5">(GMT -3:30) Newfoundland</option>
	    <option value="-3">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
	    <option value="-2">(GMT -2:00) Mid-Atlantic</option>
	    <option value="-1">(GMT -1:00 hour) Azores, Cape Verde Islands</option>
	    <option value="0">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
	    <option value="1">(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris</option>
	    <option value="2">(GMT +2:00) Kaliningrad, South Africa</option>
	    <option value="3">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
	    <option value="3.5">(GMT +3:30) Tehran</option>
	    <option value="4">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
	    <option value="4.5">(GMT +4:30) Kabul</option>
	    <option value="5">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
	    <option value="5.5">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
	    <option value="5.75">(GMT +5:45) Kathmandu</option>
	    <option value="6">(GMT +6:00) Almaty, Dhaka, Colombo</option>
	    <option value="7">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
	    <option value="8">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
	    <option value="9">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
	    <option value="9.5">(GMT +9:30) Adelaide, Darwin</option>
	    <option value="10">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
	    <option value="11">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
	    <option value="12">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
	</select>
</template>
<script>
export default {
	data () {
	  return {
	  };
	},
	computed: {
	  timeZone () {
	    return this.defaultVal
	  }
	},
	props: {
		name:{
	    type: String,
	    required: true,
	  },
	  defaultVal:{
	    type: String,
	    required: true,
	  },
	  classList:{
	    type: String,
	    required: false,
	    default: ''
	  },
	  cal_day:{
	    type: Boolean,
	    required: true,
	  },
	},
	methods: {
	  change () {
	    this.$emit('cal_day',true)
	  }
	}
}
</script>