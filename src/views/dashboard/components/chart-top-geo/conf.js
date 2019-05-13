export default{
  color: ['#7cb5ec', '#434348'],
tooltip: {
    trigger: 'item',
    formatter: function (params) {
        return params.name ? params.name + ' : ' + params.value : "";
    }
},
visualMap: {
    show: true,
    type:'piecewise',
    right : 30,
    color: ['#0F7DFF','#CEE5FF'],
    itemGap : 2,
    itemSymbol :'rect',
    itemWidth :24,
    itemHeight :14,
    pieces:[
        {min: 9000}, // 不指定 max，表示 max 为无限大（Infinity）。
        {min: 6000, max: 9000},
        {min: 3000, max: 6000},
        {min:1000,max: 3000},
        {max:1000}// 不指定 min，表示 min 为无限大（-Infinity）。
    ],
}
// visualMap: {
//     min: 0,
//     max: 10000,
//     text:['High','Low'],
//     realtime: false,
//     calculable: true,
//     color: ['#0F7DFF','#CEE5FF'],
//     right : 30
// }
}