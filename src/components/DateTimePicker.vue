<template>
    <div class="datepicker datetimePicker">

      <input type="text" class="form-control" ref="datepicker" readonly="readonly" :value="start" :name="name"></input>
    </div>
</template>
<script>

export default {
  data(){
    return {
      start:""
    }
  },
  props: {
    startDate:{},

    fromDate:{},

    name:{},
    date: {default:""}
  },
  methods: {

  },
  watch:{
    date(newVal, oldVal) {
      if(newVal) {
        this.start = newVal
      }
    }
  },
  mounted () {
    let option = {
        format: "yyyy-mm-dd",
        clearBtn: true,
        autoclose: true,
        todayHighlight: true
    }


    if(this.startDate){

      option.startDate = this.startDate
      this.start = this.startDate
    }

    if(this.fromDate == 'today') {
      this.start = moment().format("YYYY-MM-DD")
    }

    $(this.$refs.datepicker).datepicker(option)

  }
}
</script>

<style>
</style>