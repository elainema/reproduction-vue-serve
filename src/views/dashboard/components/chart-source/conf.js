export default{
    textStyle: {
        color: 'white'
    },
    title : {
        top: 0,
        left: 0,
        text: 'Source',
        textStyle :{
          color: '#010409',
          fontSize:20,
          fontWeight: 'bold',
        },
        show: false,
    },
    grid: {
        top: 37,
        left: 30,
        bottom: 25,
        right: 20,
        containLabel: true
    },
    
    color: ['#FFCB4E', '#57A4FF', '#61D89B'],
    legend: {
        show: true,
        data: ['Rejected rate', 'rejected', 'success'],
        bottom: 0
    },
    //   legend: {
    //     left: 0,
    //     top:40,
    //     padding: [0, 0,60,0],
    //     bottom:30,
    //     itemWidth:20,
    //     itemHeight:4,
    //     itemGap:12,
    //     data: [{name:'Conversion',icon:'rect'},{name:'Revenue',icon:'rect'},{name:'Profit',icon:'rect'}]
    // },
    xAxis: {
        
    },
    yAxis:[{
        type: 'value',
        name: '人数',
        min: 0,
        position: 'left',
        axisLine:{
            show: false,
            lineStyle :{ color:'#E7EBED'},
        },
        axisLabel: {
            color:'#646F76',
        },
        splitLine: {
            lineStyle:{
              color: '#E7EBED'
            }
        }
    }, {
        type: 'value',
        name: '离职率',
        min: 0,
        position: 'right',
        axisLine:{
            show: false,
            lineStyle :{ color:'#E7EBED'},
        },
        axisLabel: {
            // formatter
            color:'#646F76',
            formatter:function(value, index){
                return `${value}%`
            }
        },
        splitLine: {
            lineStyle:{
              color: '#E7EBED'
            }
        }
    }],
    xAxis: {
        type: 'category',
    },
    series: [{
        yAxisIndex: 1,
        name:'Rejected rate',
        type: 'line',
        smooth: true,
        label: {
            normal: {
                show: true,
                formatter: '{@[1]}%',
                color: '#010409'
            }
        },
    },{
        name: 'rejected',
        stack: 'a',
        type: 'bar',
        barMaxWidth: 38,
        label: {
            normal: {
                show: false,
                position: 'insideRight'
            }
        },
    },{
        name: 'success',
        stack: 'a',
        type: 'bar',
        barMaxWidth: 38,
        label: {
            normal: {
                show: false,
                position: 'insideRight'
            }
        },
    }]
}