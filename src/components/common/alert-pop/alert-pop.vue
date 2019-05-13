<template>
<div>
  <div class="dypop-up alert " :class="'alert-'+ alerttype" ref="pop_up" ><strong>{{alerttype.toUpperCase()}}: </strong> {{alertMsg}}
    <a class="close" @click.prevent="dismiss">&times;</a>
  </div>
</div>
</template>

<script>

export default {
  data(){
    return {
      alerttype:"info"
    }
  },
  props:  {
    alertPop:{
      default:"hide"
    },
    hideAlertPop:{
      default:function() {
        this.alertPop = "hide"
      }
    },
    alertMsg:{
      default:""
    },
    alertType:{
      default:"info"
    }
  },
  methods: {
    onShow() {
      let that = this
      if($(this.$refs.pop_up).is(":visible")) {
        return;
      }
      $(this.$refs.pop_up).show().css("opacity",1).delay(6000).animate({
        opacity: 0
      }, {
        duration: 300,
        complete: function() {
          $(this).hide()
          that.hideAlertPop()
        }
      });
    },
    dismiss() {
      $(this.$refs.pop_up).hide().stop();
      this.hideAlertPop && this.hideAlertPop()
    },
  },
  watch: {
    alertPop: function(val) {
      if(val === "show") this.onShow()
    },
    alertType: function(val){
      this.alerttype = val;
    }
  },
  created () {
    let that = this;
    $(window).on("scroll",function(e){
      
      //$(that.$refs.pop_up).show().css("top",$("body").scrollTop()+"px")
    })
  }
}
</script>
<style>

</style>