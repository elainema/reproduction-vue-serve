<template>
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
        <tr 
          v-for='(item,index) in reportData' 
          v-show="index !==0" 
          :key="index">
          <td v-for='_item in item' :key="_item">
            {{_item}}
          </td>
          <td>
            <router-link 
              :to="'report?date=' + item[0]" 
              target="_blank">
              View
            </router-link>
          </td>
        </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    name: 'AdminReport',
    props: {
      reportData: [ Array ]
    },

    data() {
      return {
        chart: {}
      }
    },

    watch: {
    },

    computed: {
    },

    methods: {
    },

    mounted() {
      
    }
  };
</script>
