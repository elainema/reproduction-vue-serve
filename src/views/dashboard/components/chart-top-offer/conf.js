export default{
  color: ['#4DA0FF', '#5ED899','#FFCB4E'],
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    top:"24%",
    bottom:40,
    right:0
  },
  legend: {
    left: 0,
    top:40,
    padding: [0, 0,60,0],
    bottom:30,
    itemWidth:20,
    itemHeight:4,
    itemGap:12,
    data: [{name:'click',icon:'rect'},{name:'conversion',icon:'rect'}]
  },
  xAxis: [
    {
      type: 'category',
      axisTick: {
        alignWithLabel: true,
        
      },
      axisLine:{
        lineStyle :{ color:'#E7EBED'},
      },
      axisLabel:{
        margin: 16,
        color:'#646F76',
        formatter: function (value, index) {
          var date = new Date(value);
          var month = (date.getMonth() + 1) < 10 ? "0"+(date.getMonth() + 1) : (date.getMonth() + 1)
          var texts = [month, date.getDate()];
          return texts.join('-');
        }
      }
    } 
  ],
  yAxis: [
    {
      type: 'value',
      position: 'left',
      axisLine:{
        lineStyle :{ color:'#E7EBED'},
      },
      axisLabel:{
        color:'#646F76',
        formatter: function(value, index){
          console.log(value)
          return (value/1000) !==0 ? (value/1000)+"k" : value/1000
        }
      },
      splitLine: {
        lineStyle:{
          color: '#E7EBED'
        }
      }
      //scale: true
    }
  ],
  series: [
    {
      type:'line',
    },
    {
      type:'line',
    }
  ],
}