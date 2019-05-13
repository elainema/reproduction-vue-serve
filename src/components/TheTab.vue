<template>
<div>
<ul id="chartTab" class="nav nav-tabs">
    <li class="active"><a href="#res_table" data-toggle="tab" aria-expanded="false">Table</a></li>
    <li style="" class=""><a href="#date_chart" data-toggle="tab" aria-expanded="false">Date</a></li>
    <li style="" class=""><a href="#aff_id_chart" data-toggle="tab" aria-expanded="false">Affiliate</a></li>
    <li class=""><a href="#offline_table" data-toggle="tab" id="offline_table_href" aria-expanded="true">Offline Table</a></li>
</ul>
<div class="tab-content" id="report_result_block">
    <div class="tab-pane active" id="res_table">
        <div id="report_container">
            <div class="pagination pagination-right hide">
                <ul>
                    <li class="disabled"><a href="###" data-target="prev">« Prev</a></li>
                    <li class="active"><a href="#" data-target="1">1</a></li>
                    <li class="disabled"><a href="###" data-target="next">Next »</a></li>
                </ul>
            </div>
            <table class="list-table table table-hover tablesorter col-md-12" id="report_list" data-sort="{&quot;index&quot;:3,&quot;class&quot;:&quot;desc&quot;,&quot;key&quot;:&quot;click&quot;}">
                <thead class="cap">
                    <tr>
                        <th class="report_name" data-name="am_team">am_team</th>
                        <th data-name="aff_id" data-id="1">aff_id</th>
                        <th class="report_name" data-name="affiliate">affiliate</th>
                        <th data-name="click" data-id="3">Gross Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-id="0">unknown</td>
                        <td data-id="1"><a style="cursor:pointer;" id="aff_filter1">1</a></td>
                        <td data-id="2"><a href="/p_manage_aff.html?id=1" target="_blank" style="color:#3a8bcc">yeahmobi </a></td>
                        <td data-id="3">3</td>
                    </tr>
                    <tr class="p_bold">
                        <td>Page Total</td>
                        <td class="aff_id"></td>
                        <td class="affiliate"></td>
                        <td class="click">3</td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination pagination-right hide">
                <ul>
                    <li class="disabled"><a href="###" data-target="prev">« Prev</a></li>
                    <li class="active"><a href="#" data-target="1">1</a></li>
                    <li class="disabled"><a href="###" data-target="next">Next »</a></li>
                </ul>
            </div>
        </div>
    </div>
    <div class="tab-pane" id="date_chart">
        <div class="chartshow" data-highcharts-chart="2"></div>
    </div>
    <div class="tab-pane" id="aff_id_chart">
    </div>
    <div class="tab-pane" id="offline_table">
    </div>
</div>
</div>
</template>

<style>
@import '../../asset/css/highcharts.css'
</style>
