let colors = ['#7cb5ec', '#434348']
export default{
    title: {
        left: 'center',
        top: 22,
        left: 25,
        textStyle: {
            color: '#010409',
            fontSize: 20,
            fontWeight: 'bolder'
        },
        textAlign: 'left',
        show: false,
    },
    color: ['#DFDFDF'], 
    tooltip: {
        trigger: 'axis',
    },
    // toolbox: {
    //     feature: {
    //         dataView: {readOnly: false},
    //     }
    // },
    series: [
        {   
            name: 'My Goal',
            type: 'pie',
            clockWise: true,
            
            label: {
                emphasis: {
                    show: false,
                }
            },
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            hoverAnimation: false, 
        }
    ]
}