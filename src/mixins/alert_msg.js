import alert_pop_util from '@/util/alert_pop'

let mixin_alert_msg  = {
  data(){
    return {
        alertPop:"hide",
        alertType:"info",
        alertMsg:""
     }
  },
  methods: {
    hideAlertPop:function() {
      this.alertPop = "hide"
    },
    showAlert(msg,type){
      alert_pop_util.setAlertPop(this, "show", type || "error", msg)
    }
  }
}
export default mixin_alert_msg = mixin_alert_msg