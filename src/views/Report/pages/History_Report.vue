
<template>
  <div >
    <div id="breadcrumb_container">
        <ul class="breadcrumb">
            <li><router-link to="/">Home</router-link></li>
            <li class="active">History Report</li>
        </ul>
    </div>


    <div class="box">
        <div class="box-header" v-box-action-resize>
            <h2>Result</h2>
            <div class="box-action"><span class="icon-chevron-up" title="Fold"></span> <span class="icon-chevron-down hide" title="Unfold"></span></div>
        </div>
        <div class="box-container">
            <div class="box-content">
                <ul id="chartTab" class="nav nav-tabs">
                    <li class="active"><a href="#res_table" data-toggle="tab">History Report</a></li>
                </ul>
                <div class="tab-content" id="report_result_block">
                    <div class="tab-pane active" id="res_table">
                        <div id="report_container">
                            <table class="list-table table table-hover">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Download</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2014-05</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-05.xlsx">2014-05.xlsx</a></td>
                                    </tr>
                                     <tr>
                                        <td>2014-06</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-06.xlsx">2014-06.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-07</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-07.xlsx">2014-07.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-08</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-08.xlsx">2014-08.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-09</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-09.xlsx">2014-09.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-10</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-10.xlsx">2014-10.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-11</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-11.xlsx">2014-11.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2014-12</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2014-12.xlsx">2014-12.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-01</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-01.xlsx">2015-01.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-02</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-02.xlsx">2015-02.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-03</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-03.xlsx">2015-03.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-04</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-04.xlsx">2015-04.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-05</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-05.xlsx">2015-05.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-06</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-06.xlsx">2015-06.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-07</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-07.xlsx">2015-07.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-08</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-08.xlsx">2015-08.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-09</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-09.xlsx">2015-09.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-10</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-10.xlsx">2015-10.xlsx</a></td>
                                    </tr>
                                    <tr>
                                        <td>2015-11</td>
                                        <td><a href="http://cdn.uploads.yeahmobi.com/historyReport/2015-11.xlsx">2015-11.xlsx</a></td>
                                    </tr>
                                    <tr v-for="(item,index) in listData" :key="index" >
                                        <td>{{item.date}}</td>
                                        <td><a :href="item.url">{{item.name}}</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

 </div>
</template>

<script>
export default {
    data(){
        return {
            listData:[
                {date:'2015-12',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2015-12.csv',name:'2015-12.csv'},
                {date:'2016-01',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-01.csv',name:'2016-01.cs'},
                {date:'2016-02',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-02.csv',name:'2016-02.csv'},
                {date:'2016-03',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-03.csv',name:'2016-03.csv'},
                {date:'2016-03CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-03CC.csv',name:'2016-03CC.csv'},
                {date:'2016-04',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-04.csv',name:'2016-04.csv'},
                {date:'2016-04CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-04CC.csv',name:'2016-04CC.csv'},
                {date:'2016-05',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-05.csv',name:'2016-05.csv'},
                {date:'2016-05CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-05CC.csv',name:'2016-05CC.csv'},
                {date:'2016-06',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-06.csv',name:'2016-06.csv'},
                {date:'2016-06CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-06CC.csv',name:'2016-06CC.csv'},
                {date:'2016-07',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-07.csv',name:'2016-07.csv'},
                {date:'2016-07CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-07CC.csv',name:'2016-07CC.csv'},
                {date:'2016-08',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-08.rar',name:'2016-08.rar'},
                {date:'2016-08CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-08CC.rar',name:'2016-08CC.rar'},
                {date:'2016-09',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-09.rar',name:'2016-09.rar'},
                {date:'2016-09CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-09CC.rar',name:'2016-09CC.rar'},
                {date:'2016-10',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-10.rar',name:'2016-10.rar'},
                {date:'2016-10CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-10CC.rar',name:'2016-10CC.rar'},
                {date:'2016-11',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-11.rar',name:'2016-11.rar'},
                {date:'2016-11CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-11CC.rar',name:'2016-11CC.rar'},
                {date:'2016-12',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-12.rar',name:'2016-12.rar'},
                {date:'2016-12CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2016-12CC.rar',name:'2016-12CC.rar'},
                {date:'2017-01',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-01.zip',name:'2017-01.zip'},
                {date:'2017-01CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-01CC.zip',name:'2017-01CC.zip'},
                {date:'2017-02',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-02.zip',name:'2017-02.zip'},
                {date:'2017-02CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-02CC.zip',name:'2017-02CC.zip'},
                {date:'2017-03',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-03.zip',name:'2017-03.zip'},
                {date:'2017-03CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-03CC.zip',name:'2017-03CC.zip'},
                {date:'2017-04',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-04.zip',name:'2017-04.zip'},
                {date:'2017-04CC',url:'https://s3.ap-southeast-1.amazonaws.com/uploads.yeahmobi.com/historyReport/2017-04CC.zip',name:'2017-04CC.zip'}
            ]
        }
    }
}
</script>
