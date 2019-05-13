<template>
<div :class="loadingZone ? 'ajax_loading' : '' ">
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><a href="/">Home</a></li>
            <li class="active">Dashboard</li>
        </ul>
    </div>
    <div class="box">
        <div class="box-header">
            <h2>STATISTICS</h2>

        </div>
        <div class="box-container">
            <div class="box-content">
                <ul id="myTab" class="nav nav-tabs">
                    <li class="active"><a href="#chartshow" data-toggle="tab" aria-expanded="true">Chart</a></li>
                    <li class=""><a href="#tableshow" data-toggle="tab" aria-expanded="false">Table</a></li>
                </ul>
                <div id="myTabContent" class="tab-content">
                    <div class="tab-pane fade active in" ref="chartshow" id="chartshow" align="center" data-highcharts-chart="0">
                        <p v-show='reportData === "empty"'>There is no data in recent 7 days.</p>
                    </div>
                    <div class="tab-pane fade overflow_scroll" id="tableshow" align="center">
                        <table class="table table-hover tablesorter tbl2-fixed list-table">
                            <colgroup>
                                <col width="16.7%" />
                                <col width="16.7%" />
                                <col width="16.7%" />
                                <col width="16.7%" />
                                <col width="16.7%" />
                                <col width="" />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Clicks</th>
                                    <th>Conversions</th>
                                    <th>Total Revenue</th>
                                    <th>Conversion Rate</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody id="sta_table">
                                <tr v-for='(item,index) in reportData.data' v-if="index!==0">
                                    <td v-for='_item in item' >{{_item}}</td>

                                    <td><router-link :to="'report?date=' + item[0]" target="_blank">View</router-link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import Vue from 'vue'
import alert_pop_util from '@/util/alert_pop'
var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default {
  data(){
    return {
        loadingZone:"",
        reportData:[]
    }
  },
  methods:{
    setReportData: function(data) {
        let data_date = []
        let data_clicks = []
        let data_conversion = []
        for (let i = 1; i < data.length ; i++) {
            data_date.push(data[i][0]);
            data_clicks.push(data[i][1]);
            data_conversion.push(data[i][2]);
        }
        this.renderHighchart(data_date,data_clicks,data_conversion )

    },
    renderHighchart: function(data_date,data_clicks,data_conversion){
        $(this.$refs.chartshow).highcharts({
            credits: {
                enabled:0
            },
            chart: {
                type: 'line',
                // , zoomType: 'x'
            },
            title: {
                text: 'Offer Report',
                x: -20 //center
            },
            subtitle: {
                // text: 'Click and drag in the plot area to zoom in. Source: YeahMobi.com',
                text: 'Source: YeahMobi.com',
                x: -20
            },
            xAxis: {
                type: 'datetime',
                categories: data_date
            },
            yAxis: {
                title: {
                    text: 'Counts'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                startOnTick: false
            },
            tooltip: {
                crosshairs: true,
                shared: true
            },
            series: [
                {
                    name: 'Clicks',
                    data: data_clicks
                }, {
                    name: 'Conversions',
                    data: data_conversion
                }
            ]
        });
    },
    getReportData: function(){
        console.log("getReportData")
        this.loadingZone = true
        let url = 'Report/adminReport'
        let param = {interval:{day:1},filters:{show_hide:1},druid2:1,snapshot:1, timezone:'default',statistic:{click:'',conversion:'',revenue:''},calcus:{cr:''},'start':moment().add(-1, 'week').add(1,'day').format("YYYY-MM-DD"),end:moment().add(1,'day').format("YYYY-MM-DD")}
        if(this.userInfo.role_id === "12") {
            url = "Report/advertiserReport"
            param = {interval:{day:1},filters:{show_hide:1},druid2:1,timezone:'default',statistic:{click:'',conversion:''},calcus:{cr:''},'start':moment().add(-1, 'week').add(1,'day').format("YYYY-MM-DD"),end:moment().add(1,'day').format("YYYY-MM-DD")}
        }
        Vue.http.post(url, param).then(response => {
            this.loadingZone = ""

            let somedata = response.body;
            this.reportData = somedata.data 
            if(somedata.data){
                this.setReportData(somedata.data.data)
            }else{
                this.reportData = "empty"
            }
            console.log(this.someData)
        }, response => {
            this.loadingZone = ""
            // error callback
            alert_pop_util.setAlertPop(this, "show", "error", response.body.msg)

            // error callback
        })
    }
  },
  created () {
    if(this.$route.query && this.$route.query.redirect){
        this.$router.push(this.$route.query.redirect)
    }
    this.getReportData()
  },
  computed: {

    userInfo(){
      return this.$store.state.app.userInfo
    }
  },
  watch:{
    userInfo(newVal, oldVal) {
        //this.getReportData()
    }
  }
}

</script>
<style>
@import "~@css/highcharts.css";
</style>
