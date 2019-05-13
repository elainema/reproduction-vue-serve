
let mixin_switch  = {
  methods: {
    editCancel(switch_param,value) {
      if (switch_param) {
        this.$store.dispatch('updateSwitchInfo', {[switch_param]:value})
      } else {
        this.$store.dispatch('updateSwitchInfo', {is_dynamic_revenue:this.offerInfo.is_dynamic_revenue})
      }
    },
    getSwitchCustomParam(param,value) {
        let query = {[param]:value}
        query.id = this.$route.query.id
        return query
    },
  }
}
export default mixin_switch = mixin_switch