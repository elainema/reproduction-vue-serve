<template>

</template>

<script>
import auth from '../util/auth'
import { mapGetters, mapActions } from 'vuex'

export default {
  methods: mapActions([
    'logOut'
  ]),
  computed: mapGetters({
  }),
  created () {
    let that = this
    let redirect = this.$route.query.redirect
    this.logOut(function(){
      auth.logout()
      that.$router.push("/login"+ (redirect ? "?redirect="+redirect : "" ))
      console.log(that.$router)
    })
    
  }
}
</script>
