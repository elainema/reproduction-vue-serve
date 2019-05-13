<template>
  <div class="v__skeleton" :style="{background: bgColor, paddingBottom, width}">
  </div>
</template>
<style>
.v__skeleton {
    animation: w-opacity 2s infinite linear;
}
@keyframes w-opacity {
    0% {
        opacity: 1
    }

    10%,90% {
        opacity: .9
    }

    20%,80% {
        opacity: .8
    }

    30%,70% {
        opacity: .7
    }

    40%,60% {
        opacity: .6
    }

    50% {
        opacity: .5
    }

    to {
        opacity: .95
    }
}

</style>
<script>
  export default{
    name: 'VSkeleton',
    props: {
      proportion: {
        type: Number,
        default: 1
      }, // h : w
      bgColor: {
        type: String,
        default: '#b4bccc'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: [String, Boolean],
        default: false
      }
    },
    data () {
      return {
          paddingBottom: this.height || `${this.proportion * 100}%`
      }
    }
  }
</script>
