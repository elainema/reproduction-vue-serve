<template>
<div class="" ref="highchart">
  <div class="piechart_click" ></div>
  <div class="piechart_conversion"></div>
  <div class="piechart_revenue"></div>
</div>
</template>
<script>

var Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);

export default {
  props: ['chartData'],
  computed: {

  },
  methods: {
    preppare_chart_options(type, config) {
      return {
          options: {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              credits: {
                  enabled: 0
              },
              title: {
                  text: config.title + ' Report',
                  x: -20 //center
              },
              subtitle: {
                  text: 'Source: YeahMobi.com',
                  x: -20
              },
              legend: {
                  labelFormat: '{basic_name}'
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                          color: '#000000',
                          connectorColor: '#000000',
                          format: '<b>{point.basic_name}</b>: {point.percentage:.1f} %'
                      },
                      showInLegend: true
                  }
              },
              series: []
          }
      };
    }
  },
  watch: {
    chartData: function(data) {
      if(data.length < 1){
         return;
      }
      let that = this;
      let data_count = data.data.length;
      let thead_count = data.data[0].length;
      let chart_index = {
        hour: { index: null, title: 'Hourly' },
        date: { index: null, title: 'Daily' },
        aff_id: { index: null, title: 'Affiliate' },
        am: { index: null, title: 'PM' },
        advertiser_id: { index: null, title: 'Advertiser' },
        bd: { index: null, title: 'AM' },
        offer_id: { index: null, title: 'Offer' },
        country: { index: null, title: 'Country' },
        platform: { index: null, title: 'Platform' },
        browser: { index: null, title: 'Browser' },
        device_type: { index: null, title: 'Device Type' },
        click: { index: null, title: 'Click' },
        conversion: { index: null, title: 'Conversion' },
        revenue: { index: null, title: 'Revenue' }
      }
      // find data index
      for (let i = 0; i < thead_count; i++) {
        let head_name = data.data[0][i].toLowerCase();
        if (chart_index[head_name] !== undefined) chart_index[head_name].index = i;
      }
      $.each(chart_index, function(index, n) {
          if (index != 'click' && index != 'conversion' && index != 'revenue' && n.index !== null) {
              let options = that.preppare_chart_options(index, n);
              // prepare chart data
              let pie_data = {};
              let pie_count = { click: 0, conv: 0, revenue: 0 };
              let pie_other = { click: { other: 'Others', count: 0 }, conv: { other: 'Others', count: 0 }, revenue: { other: 'Others', count: 0 } };
              let pie_final_data = { click: [], conv: [], revenue: [] };
              if (chart_index.click.index !== null || chart_index.conversion.index !== null || chart_index.revenue.index !== null) {
                  for (let i = 1; i < data_count; i++) {
                      // if key exist then do math
                      // else create new key and put data in it
                      let index_name = data.data[i][chart_index[index].index];
                      let basic_name = data.data[i][chart_index[index].index];
                      switch (index) {
                          case 'aff_id':
                          case 'offer_id':
                              index_name = data.data[i][chart_index[index].index] + ' - ' + data.data[i][chart_index[index].index + 1];
                              break;
                          default:
                              break;
                      }

                      if (pie_data[index_name]) {
                          if (chart_index.click.index !== null) {
                              pie_data[index_name].click += data.data[i][chart_index.click.index];
                          }
                          if (chart_index.conversion.index !== null) {
                              pie_data[index_name].conv += data.data[i][chart_index.conversion.index];
                          }
                          if (chart_index.revenue.index !== null) {
                              pie_data[index_name].revenue += parseFloat(data.data[i][chart_index.revenue.index].replace('$', ''));
                          }
                      } else {
                          pie_data[index_name] = { basic_name: basic_name };
                          if (chart_index.click.index !== null) {
                              pie_data[index_name].click = data.data[i][chart_index.click.index];
                          }
                          if (chart_index.conversion.index !== null) {
                              pie_data[index_name].conv = data.data[i][chart_index.conversion.index];
                          }
                          if (chart_index.revenue.index !== null) {
                              pie_data[index_name].revenue = parseFloat(data.data[i][chart_index.revenue.index].replace('$', ''));
                          }
                      }

                      // total count
                      if (chart_index.click.index !== null) pie_count.click += data.data[i][chart_index.click.index];
                      if (chart_index.conversion.index !== null) pie_count.conv += data.data[i][chart_index.conversion.index];
                      if (chart_index.revenue.index !== null) pie_count.revenue += parseFloat(data.data[i][chart_index.revenue.index].replace('$', ''));
                  }

                  $.each(pie_data, function(i, n) {
                          let click_percentage = Math.round(n.click / pie_count.click * 100) / 100;
                          let conv_percentage = Math.round(n.conv / pie_count.conv * 100) / 100;
                          let revenue_percentage = Math.round(n.revenue / pie_count.revenue * 100) / 100;
                          pie_data[i]['percentage'] = { click: click_percentage, conv: conv_percentage, revenue: revenue_percentage };
                          // over than 1%, put data to other
                          if (click_percentage > 0.01) {
                              pie_final_data.click.push({ name: i, y: n.click, basic_name: n.basic_name });
                          } else {
                              // add others name
                              // pie_other.click.other += ' ' + i;
                              pie_other.click.count += n.click;
                          }
                          // over than 1%, put data to other
                          if (conv_percentage > 0.01) {
                              pie_final_data.conv.push({ name: i, y: n.conv, basic_name: n.basic_name });
                          } else {
                              // add others name
                              // pie_other.conv.other += ' ' + i;
                              pie_other.conv.count += n.conv;
                          }
                          if (revenue_percentage > 0.01) {
                              pie_final_data.revenue.push({ name: i, y: n.revenue, basic_name: n.basic_name });
                          } else {
                              // add others name
                              // pie_other.revenue.other += ' ' + i;
                              pie_other.revenue.count += n.revenue;
                          }
                      })
                      // if other count is not zero
                  if (pie_other.click.count > 0) {
                      pie_final_data.click.push({ name: pie_other.click.other, y: pie_other.click.count, basic_name: 'Others' });
                  }
                  if (pie_other.conv.count > 0) {
                      pie_final_data.conv.push({ name: pie_other.conv.other, y: pie_other.conv.count, basic_name: 'Others' });
                  }
                  if (pie_other.revenue.count > 0) {
                      pie_final_data.revenue.push({ name: pie_other.revenue.other, y: pie_other.revenue.count, basic_name: 'Others' });
                  }

                  // config chart
                  let click_title = options.options.title.text.replace(' - Clicks', '').replace(' - Conversions', '').replace(' - Revenues', '') + ' - Clicks';
                  let conv_title = options.options.title.text.replace(' - Clicks', '').replace(' - Conversions', '').replace(' - Revenues', '') + ' - Conversions';
                  let revenue_title = options.options.title.text.replace(' - Clicks', '').replace(' - Conversions', '').replace(' - Revenues', '') + ' - Revenues';


                  if (pie_final_data.click.length > 0) {
                      options.options.title.text = click_title;
                      options.options.series = [{
                          name: 'Clicks',
                          data: pie_final_data.click
                      }];

                      $('.piechart_click').highcharts(options.options);
                  }


                  if (pie_final_data.conv.length > 0) {
                      options.options.title.text = conv_title;
                      options.options.series = [{
                          name: 'Conversions',
                          data: pie_final_data.conv
                      }];

                      $('.piechart_conversion').highcharts(options.options);
                  }
                  if (pie_final_data.revenue.length > 0) {
                      options.options.title.text = revenue_title;
                      options.options.series = [{
                          name: 'Revenues',
                          data: pie_final_data.revenue
                      }];

                      $('.piechart_revenue').highcharts(options.options);
                  }
              }
          }
      })
    }
  },
  created() {
  }
}
</script>
<style src="@/assets/css/highcharts.css">
.piechart_click,.piechart_conversion,.piechart_revenue {
  width: 85%
}
</style>