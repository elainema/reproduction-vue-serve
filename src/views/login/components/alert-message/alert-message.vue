<template>

<div id="msg_placeholder" v-if="error"  class="alert_msg_body" style="">
    <div class="alert alert-error fade in" style="position:relative">
        <a class="close" style="position:absolute;right:4px;top:10px;cursor:pointer;z-index:1" data-dismiss="alert" @click.prevent="hideErrorMsg">×</a>
        <div class="alert_msg" style="">
            <strong> </strong> {{error}}
        </div>
    </div>
    <div class="arrow_down"></div>
    <p id="msg_content">
        <span class="icon-attention"></span>
    </p>
</div>


</template>

<script>

export default {
  props: ['error','hideErrorMsg'],
  computed: {

  },
  methods: {

  },
  created () {
  }
}
</script>
<style>

</style>