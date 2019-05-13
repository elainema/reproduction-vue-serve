<template>
  <div style="height: 100%">
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'Echarts',
    props: {
      viewOpt: [Object],
      modelOpt: [Object],
      renderer: {
        type: String,
        default: 'canvas'
      },
      clearOption: { //setOption失效时，需要先clear，此时option一次加载，不能分两次
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        chart: {}
      }
    },

    watch: {
      modelOpt(val) {
      if(val) {
        this.setModelOpt()
      }
      }
    },

    computed: {
    },

    methods: {
      init() {
        this.chart = echarts.init(this.$el, null, {renderer: this.renderer})
        this.chart.showLoading()
        
        if(this.modelOpt) {
          this.setModelOpt()
        }
      },

      setOption(opt) {
        if(!opt) {
          return 
        }
        if (this.clearOption){
          this.chart.clear()
        }
        this.chart.setOption(opt)
      },
      setModelOpt() {
        this.setOption(this.modelOpt)
        this.chart.hideLoading()
      },
      bindEvent(event,type,callback) {
        this.chart.on(event, type,function(obj){
          callback && callback(obj)
        })
      }
    },

    mounted() {
      this.init()
      if (!this.clearOption){
        this.setOption(this.viewOpt)
      }
    },
    registerMap (mapName, geoJSON, specialAreas) {
      echarts.registerMap(mapName, geoJSON, specialAreas)
    },
    registerTheme (name, theme) {
      echarts.registerTheme(name, theme)
    }
  }
</script>
