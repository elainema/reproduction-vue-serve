<template>
<div class="add-to-home-screen" v-show="is_show_addToHomeScreen">
  <div class="ios" v-show="mobile_browser == 'safari'">Install this web app on your iPhone: tap <img src="../assets/css/image/ios8share.png"> and then <strong>Add to Home Screen</strong>.</div>
  <div class="android_chrome" v-show="mobile_browser == 'chrome'">Install this web app on your Browser: tap Options and then <strong>Add to Home Screen</strong>.</div>
</div>
</template>
<script>

export default {
  data(){
    return {
      is_show_addToHomeScreen:false,
      mobile_browser:"chrome"
    }
  },
  mounted () {
    let that = this
    if(_.isMobile()) {
      this.is_show_addToHomeScreen = true
    }


    if ( /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
        this.mobile_browser = "chrome";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        this.mobile_browser = "safari";
    }


    setTimeout(function(){
      if(that.is_show_addToHomeScreen) {
        that.is_show_addToHomeScreen = false;
        localStorage.setItem('is_show_addToHomeScreen',false)
      }
    },10000)

  }
}
</script>
<style scoped="">
  .add-to-home-screen{
    font-size: 14px;
    background: #ecf0f1;
    color: #000;
    padding: 8px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1111;
  }
  .add-to-home-screen img {
    width: 12px
  }
</style>