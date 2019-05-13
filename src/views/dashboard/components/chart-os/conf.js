let colors = ['#7cb5ec', '#434348']
export default{
    title : {
        show: false,
        top: 22,
        left: 25,
        text: 'OS Version',
        textStyle :{
          color: '#010409',
          fontSize:20,
          fontWeight: 'bold'
        }
    },
    color: ['#57A4FF', '#6289F2', '#61D89B', '#C1C5E1', '#258BD4', '#9F8BC3', '#6289F2', '#85CDEB', '#25D1D4', '#793CF9','#6289F2', '#61D89B', '#C1C5E1', '#258BD4', '#9F8BC3', '#6289F2', '#85CDEB', '#25D1D4', '#793CF9'], 
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c}%"
    },
    legend: {
        left: 40,
        bottom:24,
        right: 24,
        itemWidth:10,
        itemHeight:10,
        itemGap:12,
    },
    series: [
        {
            name:'',
            type:'pie',
            center: ['50%', '35%'],
            radius: ['35%', '53%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            
        }
    ]
}