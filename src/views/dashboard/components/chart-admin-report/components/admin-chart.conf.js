let colors = ['#7cb5ec', '#434348']
export default{
  color: ['#7cb5ec', '#434348'],
  title : {
    text: 'Offer Report',
    subtext: 'Source: Yeahmobi.com',
    top: 10,
    x: 'center',
    align: 'right'
  },
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    top: '20%',
  },
  toolbox: {
    feature: {
      saveAsImage: {show: true}
    },
    top: 0,
    right: 20
  },
  legend: {
    y: 'bottom'
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true
      },
    } 
  ],
  yAxis: [
    {
      type: 'value',
      position: 'left',
      name: 'click',
      axisLine: {
        lineStyle: {
          color: colors[0]
        }
      },
      scale: true
    },
    {
      type: 'value',
      position: 'right',
      axisLine: {
        lineStyle: {
            color: colors[1]
        }
      },
      scale: true
    }
  ],
  
  animationEasing: 'elasticOut',
  animationDelay: function (idx) {
    // 越往后的数据延迟越大
    return idx * 100;
  }
}
