<template>
  <div class="wrap-message-detail">
    <i class="el-icon-back return" @click="toggleCtxModule('list')"></i>
    <div class="" style="width: 90%; margin: 30px auto">
      <p>
        {{ msgData.title }}
      </p>
      <p>{{ msgData.create_time | setData}}</p>
    </div>
    <div class='htmlStr' v-html="msgData.content_str" style="width: 90%; margin: 30px auto">
    </div>
    <el-table
      v-if="msgData.content"
      :data="msgData.content"
      border
      style="width: 90%; margin: 30px auto">
      <!-- <el-table-column
        v-for="(item, index ) in titlesOrderList"
        :key="index"
        :label="headers[item] && headers[item].label"
        >
        <template slot-scope="scope"> 
            <span class="cell-common"> {{ scope.row[item] | setEmpty2NA }} </span>
        </template>
      </el-table-column> -->

      <el-table-column
          v-for="(item, index ) in headers"
          :key="index"
          :label="item.label"
          >
          <template slot-scope="scope"> 
              <span class="cell-common"> {{ scope.row[item.prop] | setEmpty2NA }} </span>
          </template>
      </el-table-column>
      <el-table-column
        v-if="model && model.showPenetrate || false"
        label='By Publishers'>
        <template slot-scope="scope"> 
            <a class="report" @click="handleReportClick(scope.row, msgData.create_time)"> Report </a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { formatDate } from '@/util/date'
import mixin_alert_msg from '@/mixins/alert_msg'

export default {
    props: {
      msgData:{
        type: Object,
        default:  () => {
          return {}
        }
      },
      model:{
        type: Object,
      }
    },
    data(){
        return {
          titlesOrderList: ['date','offer_id', 'offer_name', 'publisher_id','publisher_name','sub_publisher_id','adv_id','adv_name','am_name','pm_name'], //消息内容固定化字段顺序
          headers: {},
          kpiRef: {
            click_flood: {
              kpiDmnsn: 'ctit_gt',
            },
            click_hijacking: { 
              kpiDmnsn: 'ctit_lt',
            },
            cr: { 
              kpiDmnsn: 'cr',
            },
            cdr: { 
              kpiDmnsn: 'conflicting_device_region',
            },
            abnormal_ip: { 
              kpiDmnsn: 'abnormal_ip',
            },
            cdi: { 
              kpiDmnsn: 'conflicting_device_info',
            },
            incentive_user: { 
              kpiDmnsn: 'incentive_user',
            },
            out_of_store: { 
              kpiDmnsn: 'out_of_store',
            },
            rejected_install: { 
              kpiDmnsn: 'rejected_install',
            },
          },
          penetrate:{

          }
        }
    },
    mixins: [mixin_alert_msg],
    watch:{
      msgData() {
        this.setTableHeader()
      }
    },
    computed: {
    },
    components: {
    },
    filters: {
      setEmpty2NA(str) {
        return str !== "" ?  str : "N/A"
      },

      setData(timestamp) {
        // 后台传过来的时间戳为秒级别
        let date = new Date(parseInt(timestamp) * 1000)
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      },
      set_Data(str) {
        return str.toLowerCase().replace(" ", "_")
      }
    },
    created () {

    },
    mounted () {
      this.setTableHeader()
    },
    methods: {
      toggleCtxModule(ctx) {
        this.$emit('toggleCtxModule', ctx)
      },

      setTableHeader() {
        let result = {}
        let data = this.msgData.content[0]
        /*Object.keys(data).map(key => {
            result[key] = {
              prop: key,
              label: key.replace(/\_/g, ' ').replace(/\b[a-z]/g, char => char.toUpperCase())
            }
        })*/
        for(let el in data) {
          result[el] = {
            prop: el,
            label: el.replace(/\_/g, ' ').replace(/\b[a-z]/g, char => char.toUpperCase())
          }
        }
        this.headers = result
      },

      handleReportClick({ offer_id, offer_name, kpi, pkg_name, adv_id }, createTime) {
        let routerName = 'eventReport' // default
        let kpiDmnsn = ''

        let oneDay = -1 * 24 * 60 * 60 * 1000

        let crtTmStmp = parseInt(createTime) * 1000
        let lastcrtTmStmp = crtTmStmp + oneDay

        

        if(this.kpiRef.hasOwnProperty(kpi)) {
          routerName = 'fraudReport'
          kpiDmnsn = this.kpiRef[kpi].kpiDmnsn
          
        } else {
          kpiDmnsn = kpi ? kpi : ''
          if(kpi && kpi.match(/retention/)) {
            lastcrtTmStmp = crtTmStmp + oneDay * (parseInt(kpi.split('Day')[1]) + 1)
            crtTmStmp = crtTmStmp + oneDay * (parseInt(kpi.split('Day')[1]))
          }
        }
      
        let startDate = formatDate(lastcrtTmStmp)
        let endDate = formatDate(crtTmStmp)
        const { href } = this.$router.resolve({
          name: routerName,
          query: { offer_id, offer_name, kpiDmnsn, pkg_name, adv_id, startDate, endDate }
        })
        window.open(href, '_blank');
      }
    },
    
}
</script>

<style lang="less">
.wrap-message-detail{
  .return{
    font-size: 25px;
    color: #ff8400;
    cursor: pointer;
  }
  .report{
    color: #3a8bcc;
    cursor: pointer;
  }
}
.htmlStr{
  .tableList{
    width: 100%!important;
  }
  .title, .even{
    background: #fff!important;
  }
  td, th{
    padding: 12px 10px;
    min-width: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    vertical-align: middle;
    position: relative;
    text-align: left;
    border: 1px solid #EBEEF5!important;
    line-height: 23px;
    background: #fff!important;
    color: #333!important;
  }
  td a{
    color: #3a8bcc!important;
    cursor: pointer!important;
  }
}
</style>
