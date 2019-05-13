
<template>
    <div style="position:relative;width:300px;margin-left:-30px;" v-show="matrix">
        <div id="chartdiv"></div>

    </div>

</template>
<script>

</script>
<script>
import VueScript2  from 'vue-script2'
import Vue from 'vue'

export default {
  data(){
    return {}
  },
  props:  {
    matrix:{},
    predict_level:{},
    stats:{}
  },
  watch:{
    predict_level(newVal, oldVal){
        if(newVal) {
            this.render()
        }
    }
  },
  methods: {
    render(){
            if(!this.matrix) return
            let obj = {count:[]}
            _.map(this.matrix.return_rate, function(val, key) {
              if(val === 1) {
                obj.return_rate = parseInt(key)
              }
              obj.count.push(parseInt(key))
            })

            _.map(this.matrix.cr, function(val, key) {
              if(val === 1) {
                obj.cr = parseInt(key)
              }
              obj.count.push(parseInt(key))
            })

            _.map(this.matrix.revenue, function(val, key) {
              if(val === 1) {
                obj.revenue = parseInt(key)
              }
              obj.count.push(parseInt(key))
            })

            _.map(this.matrix.ctr, function(val, key) {
              if(val === 1) {
                obj.ctr = parseInt(key)
              }
              obj.count.push(parseInt(key))
            })

            _.map(this.matrix.rtr, function(val, key) {
              if(val === 1) {
                obj.rtr = parseInt(key)
              }
              obj.count.push(parseInt(key))
            })

            var chart = AmCharts.makeChart("chartdiv", {
                "type": "radar",
                "dataProvider": [{
                    "direction": "Revenue",
                    "value": obj.revenue- _.min(obj.count) + 10,
                    "value1":this.stats.revenue 
                }, {
                    "direction": "CR",
                    "value": obj.cr- _.min(obj.count) + 10,
                    "value1":this.stats.cr
                }, {
                    "direction": "Return Rate",
                    "value": obj.return_rate- _.min(obj.count)  + 10  ,
                    "value1":this.stats.return_rate
                }, {
                    "direction": "RTR",
                    "value": obj.rtr- _.min(obj.count)  + 10  ,
                    "value1":this.stats.rtr
                }, {
                    "direction": "CTR",
                    "value": obj.ctr- _.min(obj.count)  + 10  ,
                    "value1":this.stats.ctr
                }],
                "valueAxes": [{
                    "fillAlpha": 0.1,
                    "fillColor": "green",
                    "gridColor": "#fff",
                    "axisColor": "#999",
                    "gridType": "circles",
                    "showFirstLabel": true,
                    "showLastLabel":true,
                    "labelsEnabled": false,
                    "position": "left",
                    "autoGridCount":false,
                    "gridCount":16,
                    "maximum":_.max(obj.count) - _.min(obj.count) < 200 ? 220 : _.max(obj.count) - _.min(obj.count) ,
                    "minimum":0
                }],
                "graphs": [{
                    "balloonText": "[[category]]: [[value]]",
                    "bullet": "round",
                    "fillAlphas": 1,
                    "valueField": "value",
                    "labelText": "[[value1]]",
                    "labelPosition": "left",
                    "color": "#000",
                    fontSize:"14",
                    "valueField": "value"

                }],
                "categoryField": "direction",
                "export": {
                    "enabled": false
                }
            });

    }
  },
  watch: {

  },
  mounted() {
    VueScript2.load('../../js/amcharts.js')
    VueScript2.load('../../js/radar.js')
    VueScript2.load('../../js/export.min.js')
    VueScript2.load('../../js/light.js').then(this.render)
  }

}
</script>
<style scoped>
#chartdiv {
    width: 300px;
    height: 250px;

}

body {
    background: #fff
}

.text {
    position: absolute;
    top: 50%;
    left: 49%;
    font-size: 16px;
    margin: -15px 0 0 -15px;
    font-weight: bold;
    color: #fff;
    z-index: 0
}

.amcharts-balloon-div {
    z-index: 11
}


</style>