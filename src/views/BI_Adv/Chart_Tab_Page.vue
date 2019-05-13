<template>
    <div class="diagram_block">
        
            <div class="data-show">
                <alert-pop :alertPop="alertPop" :hideAlertPop="hideAlertPop" :alertMsg="alertMsg" :alertType="alertType"></alert-pop>
                <h2>{{report_title[map_type]}}</h2>
                <div class="action">
                            <span v-if="summary_state!='edit' ">
                                <button class="btn btn-primary" @click="summary_state='edit'">Edit</button>
                            </span>
                </div>
                <div style="height:50px;" v-if="map_type=='product'">
                    <ul class="row text-center total-data">
                        <li class="col-md-3">
                            <div><span>{{total.total_products}}</span>&nbsp;Products</div>
                        </li>
                        <li class="col-md-3">
                            <div>

                                <input v-if="summary_state == 'edit'" type="text"  name="total_revenue"
                                       :value="total.total_revenue" style="width:100px;height:18px;" />
                                <span v-else>{{total.total_revenue}}</span>&nbsp;Cost/USD
                            </div>
                        </li>
                        <li class="col-md-3">
                            <div><span>{{total.total_convs}}</span>&nbsp;Conversions</div>
                        </li>
                        <li class="col-md-3"></li>
                    </ul>
                </div>
                <div class="row">
                    <div class="col-md-7">
                        <chart
                                :options="map"
                                :init-options="initOptions"
                                ref="map"
                                auto-resize
                                v-if="map_type =='country'"
                        />
                        <chart
                                :options="pie"
                                :init-options="initOptions"
                                theme="chalk"
                                ref="pie"
                                auto-resize
                                v-if="map_type =='os_android'"
                        />
                        <chart
                                :options="pie"
                                :init-options="initOptions"
                                theme="chalk"
                                ref="pie"
                                auto-resize
                                v-if="map_type =='os_ios'"
                        />

                        <chart
                                :options="bar"
                                :init-options="initOptions"
                                ref="bar"
                                auto-resize
                                v-if="map_type =='platform'"
                        />
                        <chart
                                :options="bar2"
                                :init-options="initOptions"
                                ref="bar2"
                                auto-resize
                                v-if="map_type =='product'"
                        />
                        <chart
                            :options="bar3"
                            :init-options="initOptions"
                            ref="bar3"
                            auto-resize
                            v-if="map_type =='affiliate'"
                        />
                        <chart
                                :options="pie"
                                :init-options="initOptions"
                                theme="chalk"
                                ref="pie"
                                auto-resize
                                v-if="map_type =='brand'"
                        />
                        <chart
                                :options="bar4"
                                :init-options="initOptions"
                                ref="bar4"
                                auto-resize
                                v-if="map_type =='quality'"
                        />
                    </div>
                    <form role="form" ref="form" class="form" @submit.prevent="onSubmit">
                    <div class="col-md-5 table-box">
                        <table class="table table-bordered data-table">
                            <thead>
                            <tr style="background: #edeef5;font-size:22px;color:#000">
                                <th>{{table_col[map_type]}}</th>
                                <th>{{table_col2[map_type]}}</th>
                                <th v-if="table_col3[map_type]">{{table_col3[map_type]}}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) of chart_data">
                                <td class="col-md-5">{{index}}</td>
                                <td class="col-md-5" v-if="item instanceof Object">
                                    <div v-if="summary_state == 'edit'">
                                        <input type="text" :name="index"  :id="index" data-col="cols1"
                                               :value="chart_data[index]['Fraud']" style="width:100px;height:18px;">
                                    </div>
                                    <div v-else>
                                        <span>{{chart_data[index]['Fraud']}}</span>
                                    </div>
                                </td>
                                <td class="col-md-5" v-if="item instanceof Object">
                                    <div v-if="summary_state == 'edit'">
                                        <input type="text" :name="index"  :id="index" data-col="cols2"
                                               :value="chart_data[index]['BlockTime']" style="width:100px;height:18px;">(hour)
                                    </div>
                                    <div v-else>
                                        <span>{{chart_data[index]['BlockTime']}}</span>
                                    </div>
                                    <input type="text" :name="index"  :id="index"
                                           :value="chart_data[index]['Quality']" style="display: none">
                                </td>
                                <td class="col-md-5" v-else>
                                    <div v-if="summary_state == 'edit'">
                                        <input type="text" :name="index"  :id="index" data-col="cols1"
                                               :value="chart_data[index]" style="width:100px;height:18px;">
                                    </div>
                                    <div v-else>
                                        <span>{{item}}</span>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                        <textarea id="comment" name="comment" ref="comment" rows="5" :value="comment" v-if="summary_state =='edit' ">{{comment}}</textarea>
                        <p v-else><i style="font-weight: bold" v-if="comment">Comment:</i>&nbsp;<span class="realVal">{{comment}}</span></p>

                    <!--<div class="form-group">-->
                        <div v-if="summary_state =='edit' " class="text-right">
                            <button class="btn btn-default" style="background:#edeef5"
                                    @click.prevent="summary_state='view'">Cancle
                            </button>
                            <button class="btn btn-primary" type="submit">Save</button>
                        </div>
                    <!--</div>-->
                    </form>
                </div>
            </div>

    </div>
</template>
<style lang="less">
    .diagram_block {
        padding: 20px;
        position: relative;
        h2 {
            font-size: 16px;
            height: 50px;
            line-height: 50px;
        }
        .action {
            position: absolute;
            right: 20px;
            top: 30px;
            z-index: 999;
        }
    }
    .echarts {
        width: 480px !important;
        height: 330px !important;
    }
    .data-show h2 {
        font-size: 20px;
        font-weight: bold;
    }

    .data-table {
        margin-top: 10px;
    }
    .table-box {
        min-height: 330px;
    }
    .total-data {
        font-size: 16px;
        font-weight: bold;
    }
</style>

<script>
    import Vue from "vue"
    import theme from '@/assets/chalk.json'
    import worldJson from  '@/assets/world.json'
    import globalCountries from  '@/assets/global.json'
    import AlertPop from '@/components/common/alert-pop/'
    import mixin_alert_msg from '@/mixins/alert_msg'
    import ECharts from './ECharts.vue'
    import '../../../node_modules/echarts/lib/chart/pie'
    import '../../../node_modules/echarts/lib/chart/map'
    import '../../../node_modules/echarts/lib/chart/bar'
    import '../../../node_modules/echarts/lib/component/geo'
    import '../../../node_modules/echarts/lib/component/tooltip'

    ECharts.registerTheme('chalk', theme);
    ECharts.registerMap('world',worldJson)
    Vue.component('chart', ECharts);

    export default {
        data (){
            return {
                loadingZone: false,
                init: false,
                initOptions: {
                    renderer: "canvas"
                },
                report_title:{
                    "country":"Divided by country chanel",
                    "affiliate":"Divided by affiliate chanel",
                    "os_android":"Divided by system chanel",
                    "os_ios":"Divided by system chanel",
                    "platform":"Divided by conversion chanel",
                    "product":"Divided by summary latitude",
                    "brand":"Divided by brand chanel",
                    "quality":"Divided by quality chanel"
                },
                table_col:{
                    "country":"Country",
                    "affiliate":"Products",
                    "os_android":"Android",
                    "os_ios":"IOS",
                    "platform":"Products",
                    "product":"Products",
                    "brand":"Products",
                    "quality":"Products"
                },
                table_col2:{
                    "country":"Ratio",
                    "affiliate":"Ratio",
                    "os_android":"Proportion",
                    "os_ios":"Proportion",
                    "platform":"Ratio",
                    "product":"Conversions",
                    "brand":"Ratic",
                    "quality":"Fraud"
                },
                table_col3:{
                    "quality":"Block Time"
                },
                summary_state: "",
                chart_data: this.summary_data.data ? JSON.parse(this.summary_data.data) : '',
                comment: this.summary_data.comment,
                total:this.total_data ? JSON.parse(this.total_data.data) : ''
            }
        },
        props: {
            summary_data: {},
            map_type:'',
            total_data:''
        },
        components: {AlertPop},
        mixins: [mixin_alert_msg],
        methods: {
            onSubmit(){
                let that = this;
                let value = $('#comment').val();
                if(value.length > 180){
                    this.showAlert('No more than 180 characters',"info")
                    $('#comment').focus();
                    return false;
                }
                let flag = false;
                $("input[type=text]").each(function (index,item) {
                    if ($.trim(item.value) == ''){
                        flag = true;
                        return false;
                    }
                    if (item.getAttribute("data-col") == 'cols1' && that.map_type != 'product'){
                        item.value = item.value.indexOf('%')== -1 ? item.value+'%' : item.value;
                    }
                    if (item.getAttribute("data-col") == 'cols2'){
                        item.value = item.value.indexOf('h')== -1 ? item.value+'h' : item.value;
                    }
                });
                if (flag){
                    return;
                }

                this.summary_state='view';

                var obj = $(this.$refs.form).getFormQuery();
                delete obj.comment;

                if (this.map_type == 'product'){
                    let sum = this.sum(Object.values(obj));
                    let tmp_revenue = $('input[name=total_revenue]').val()
                    let paraTotal = {
                        "total_convs":sum,
                        "total_revenue":tmp_revenue,
                        "total_products":this.total.total_products
                    }
                    let sumObj = {
                        id:this.$route.query.id,
                        report_type:'total',
                        data: JSON.stringify(paraTotal),
                        comment: ''
                    }
                    Vue.http.post('Bi/editBiReport',sumObj).then(response => {
                        this.total.total_convs = sum;
                        this.total.total_revenue = tmp_revenue;
                    }, response => {
                        this.showAlert(response.body.msg)
                    })
                }
                if (this.map_type == 'quality' && Object.keys(obj).length > 0){
                    let newObj = {};
                    for(let k in obj){
                        if (Array.isArray(obj[k])){
                            newObj.Fraud = obj[k][0];
                            newObj.BlockTime = obj[k][1];
                            newObj.Quality = (100 - obj[k][0].replace('%',''))+'%';
                            obj[k] = newObj;
                            newObj = {}
                        }
                    }
                }
                let para = {
                    id:this.$route.query.id,
                    report_type: this.map_type,
                    data: JSON.stringify(obj),
                    comment: $(this.$refs.comment).val()
                }

                Vue.http.post('Bi/editBiReport',para).then(response => {
                    this.comment = para.comment;
                    this.chart_data = JSON.parse(para.data);
                    $('.realVal:visible').html(para.comment);
                }, response => {
                    this.showAlert(response.body.msg)
                })
            },
            sum(arr) {
                var s=0;
                if(arr.length==0){
                    return 0;
                }
                else if(arr.length==1){
                    return arr[0];
                }
                else{
                    for(var i=0;i<arr.length;i++){
                        s+=parseInt(arr[i]);
                    }
                    return s;
                }
            }
        },

        computed: {
            pie() {
                let newObj = [];

                let obj = this.chart_data;
                for (let [k, v] of Object.entries(obj)) {
                    newObj.push({'name' : k,'value' : parseInt(v.replace('%',''))});
                }
                return {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}: {c}%"
                    },
                    series: [
                        {
                            name:'',
                            type:'pie',
                            radius: ['33%', '60%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'outside'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: true
                                }
                            },
                            data:newObj
                        }
                    ]
                };

            },
            map() {
                let obj = this.chart_data;
                let keys = Object.keys(obj);
                let values = Object.values(obj);
                let holeName = [];
                let colorList = [
                    'yellow', '#827bff', '#4dd8ff', 'pink', 'greenyellow',
                    '#fdb15b', '#80baff', '#98cd98'
                ];

                for (let i=0;i < keys.length;i++){  //遍历不算other
                    if (globalCountries[keys[i]]){
                        holeName[keys[i]] = globalCountries[keys[i]]['en'];
                    }
                }

                let seriesArr = [],regionArr = [];
                let tmpObj = {},reObj = {};
                for (let j=0;j<keys.length;j++){
                    //series数组
                    tmpObj.name = keys[j] + ' '+ values[j];
                    tmpObj.type = 'map';
                    tmpObj.itemStyle = {color : colorList[j]};
                    tmpObj.mapType = 'world';
                    seriesArr.push(tmpObj);
                    tmpObj = {};
                    //geo region 数组
                    reObj.name = holeName[keys[j]];
                    reObj.itemStyle = { areaColor:colorList[j]};
                    regionArr.push(reObj);
                    reObj = {};
                }

                return {
                    /*tooltip: {
                        trigger: 'item',
                        formatter: '{b}'
                    },*/
                    legend: {
                        selectedMode:false,
                        bottom:'20rem',
                        width:'310rem'
                    },
                    series:seriesArr,
                    geo: [
                        {
                            name: '世界地图',
                            type: 'map',
                            map: 'world',
                            roam: false,
                            silent:false,
                            z:100,
                            features:'',
                            regions: regionArr,
                            itemStyle: {
                                normal: {
                                    areaColor: '#ccc'
                                }
                            },
                            /*label:{
                                emphasis: {
                                    label:{
                                        show:true
                                    }
                                }
                            }*/
                        }
                    ]
                };
            },
            bar() {
                let obj = this.chart_data;
                var colorList = [
                    '#827bff', '#a5a2f1', '#ba75fe', '#cc4a76', '#fdb15b',
                    '#4dd8ff', '#80baff', '#98cd98'
                ];

                let newObj = [];
                for (let [k, v] of Object.entries(obj)) {
                    newObj.push({'name' : k,'value' : parseInt(v.replace('%',''))});
                }
                return {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c}%"
                    },
                    series : [
                        {
                            name: '',
                            type: 'pie',
                            silent:false,
                            radius : '55%',
                            data:newObj,
                            itemStyle:{
                                normal:{
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                }
                            },
                        }
                    ]
                };
            },
            bar2() {
                let obj = this.chart_data;
                let dataShadow = [];
                let xMax = 100;
                let oKeys = [];
                let oVal = [];
                for (let k in obj){
                    dataShadow.push(xMax);
                    oKeys.unshift(k);
                    oVal.unshift(Math.floor(obj[k]/this.total.total_convs*100));
                }

                var colorList = [
                    '#827bff', '#a5a2f1', '#ba75fe', '#cc4a76', '#fdb15b',
                    '#4dd8ff', '#80baff', '#98cd98'
                ];

                return {
                    title : {
                        text: '',
                        subtext: ''
                    },
                    xAxis : [
                        {
                            show:false,
                            type : 'value',
                            boundaryGap : [0, 0],
                            position: 'top'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : oKeys,
                            axisLine:{show:false},     //坐标轴,
                            /*axisLabel:{rotate: 30,interval: 0},*/

                            axisLabel:{
                                inside: true,
                                padding:[-30,0,0,0]
                            },
                            /*min: function(value) {
                                return value.min-2;
                            },*/
                            z : 10,
                            //boundaryGap  :false,
                            nameLocation : 'start',
                            axisTick:[{    //坐标轴小标记
                                show:false
                            }]
                        }
                    ],
                    series : [
                        { // For shadow
                            type: 'bar',
                            barWidth:'10rem',
                            legendHoverLink:false,
                            color: 'rgba(0,0,0,0.1)',
                            barGap:'-100%',
                            barCategoryGap:'40%',
                            data: dataShadow,
                            animation: false
                        },
                        {
                            name:'',
                            type:'bar',
                            barWidth:'10rem',
                            data:oVal,
                            color: function (params) {
                                return colorList[params.dataIndex]
                            },
                            itemStyle:{
                                normal:{    //柱状图颜色
                                    label:{
                                        show: true,   //显示文本
                                        position: 'right',  //数据值位置
                                        formatter:"{c}%"
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            bar4() {
                let obj = this.chart_data;
                let dataShadow = [];
                let xMax = 100;
                let oKeys = [];
                let oVal = [];
                for (let k in obj){
                    dataShadow.push(xMax);
                    oKeys.unshift(k);
                    if (obj[k]['Quality']){
                        oVal.unshift(obj[k]['Quality'].replace('%',''));
                    }
                    
                }

                return {
                    title : {
                        text: '',
                        subtext: ''
                    },
                    xAxis : [
                        {
                            show:false,
                            type : 'value',
                            boundaryGap : [0, 0],
                            position: 'top'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : oKeys,
                            axisLine:{show:false},     //坐标轴,
                            /*axisLabel:{rotate: 30,interval: 0},*/

                            axisLabel:{
                                inside: true,
                                padding:[-30,0,0,0]
                            },
                            /*min: function(value) {
                                return value.min-1;
                            },*/
                            z : 10,
                            //boundaryGap  :false,
                            nameLocation : 'start',
                            axisTick:[{    //坐标轴小标记
                                show:false
                            }]
                        }
                    ],
                    series : [
                        { // For shadow
                            type: 'bar',
                            barWidth:'12rem',
                            legendHoverLink:false,
                            color: '#fa816e',
                            barGap:'-100%',
                            barCategoryGap:'40%',
                            data: dataShadow,
                            z:1,
                            animation: false,
                            selient:true
                        },
                        {
                            name:'',
                            type:'bar',
                            barWidth:'12rem',
                            data:oVal,
                            color: '#00dfdc',
                            z:10,
                            itemStyle:{
                                normal:{    //柱状图颜色
                                    label:{
                                        show: true,   //显示文本
                                        position: 'right',  //数据值位置
                                        formatter:"{c}%"
                                    }
                                }
                            }
                        }
                    ]
                }
            },
            bar3() {
                var colorList = [
                    '#827bff', '#a5a2f1', '#ba75fe', '#cc4a76', '#fdb15b',
                    '#4dd8ff', '#80baff', '#98cd98'
                ];
                let obj = this.chart_data;
                let newObj = [];
                Object.keys(obj).forEach(function (key) {
                    newObj.push({'name' : key,'value' : parseInt(obj[key].replace('%',''))});
                })
                return {
                    title: {
                        text: ''
                    },
                    /*tooltip: {},*/
                    xAxis: {
                        data: Object.keys(obj),
                        axisLine:{}
                    },
                    yAxis: {
                        show:true,
                        axisLine:{
                            show:true,
                            lineStyle:{ color:'#666'}
                        }
                    },
                    series: [{
                        name: '',
                        type: 'bar',
                        barWidth:'20rem',
                        data: newObj,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                },
                                label: {
                                    show: true,
                                    position:'top',
                                    formatter:"{c}%"
                                }
                            }
                        }
                    }]
                };
            }
        },
        created() {

        },
        mounted() {
            
        }
    }
</script>
