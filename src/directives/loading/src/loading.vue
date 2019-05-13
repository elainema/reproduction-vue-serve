<template>
  <transition name="el-loading-fade">
    <div
      v-show="visible"
      class="yeah-loading-mask"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="yeah-loading-spinner">
        <img :src="imgSrc" alt="">
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    data() {
      return {
        fullscreen: true,
        visible: false,
        customClass: '',
        imgSrc: require('@/assets/image/ajax_loader.gif')
      };
    },

    methods: {
      setText(text) {
        this.text = text;
      }
    }
  };
</script>
<style>
.yeah-loading-mask{
  position: absolute;
  z-index: 800;
  background-color: rgba(255,255,255,.8);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-transition: opacity .3s;
  -o-transition: opacity .3s;
  transition: opacity .3s;
}
.yeah-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
</style>
