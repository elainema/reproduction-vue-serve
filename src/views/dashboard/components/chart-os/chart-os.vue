<template>
  <div class ='chart-os-content'>
    <header>
      <div class="title">
        OS Version
      </div>
      <el-radio-group v-model="osType" class='radio-group'>
        <el-radio-button label="Android">Android</el-radio-button>
        <el-radio-button label="iOS">iOS</el-radio-button>
      </el-radio-group>
    </header>
    
    <div style="height: 354px">
      <echarts
        v-yeah-loading='loading'
        class='zindex0'
        :viewOpt='viewOpt'
        :modelOpt='modelOpt'
        >
      </echarts>
      <div v-if="osData.length < 1 && !loading" class="empty-image">
        <img src="@/assets/image/empty.png" />
      </div>
    </div>
  </div>
  
</template>

<script>
  import Vue from 'vue'
  import { Tabs, TabPane, RadioButton, RadioGroup } from "element-ui";
  import { mapGetters, mapActions } from 'vuex'
  import viewOptConf from "./conf";
  import { Echarts } from '@/components/common'
  import { CacheService } from '@/util/cacheService'


  Vue.use(Tabs);
  Vue.use(TabPane);
  Vue.use(RadioButton);
  Vue.use(RadioGroup);

  export default {
    name: 'chart-total-adv',
    props: {
      roleName: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        loading: true,
        osType: 'Android',
        reportData: [],
        viewOpt: {},
        osData: []
      }
    },

    components: { Echarts },
    
    watch: {
      osType(val) {
        this.fetchOsData()
        this.$ga && this.$ga.event(this.roleName, 'osversion', this.osType)
      }
    },

    computed: {
      ...mapGetters({
        userInfo: 'userInfo',
      }),
      modelOpt() {
        let data = this.osData.map((item, index) => {
          return {
            value: item.rate,
            name: item.os_version,
            icon:'circle'
          }
        })

        return {
          legend: {
            data
          },
          series: [{
            type: 'pie',
            data
        }]
        }
      }
    },

    created() {
      this.viewOpt = viewOptConf
      this.fetchOsData()
    },

    methods: {
      fetchOsData() {
        this.loading = true
        CacheService.fetchData('Dashboard/getConversionByOsVersion', { type: this.osType })
          .then(data => {
            this.loading = false

            if(data) {
              this.osData = data
            } else {
              this.osData = []
            }
            
          })
          .catch(err => {
            this.osData = []
            this.loading = false
          })
      },
    },

    mounted() {
      
    }
  };
</script>
<style lang="less">
.chart-os-content{
    position: relative;
    height: 100%;
    width: 100%;
    header{
      display: flex;
      justify-content: space-between;
      padding: 30px 30px 0 30px;
      .title{
        height: 26px;
        color:rgba(1,4,9,1);
        line-height:26px;
        font-size:22px;
        font-weight: 800;
      }
      .radio-group{
        height: 26px;
        .el-radio-button__inner{
            padding: 5px 11px!important;
            border-radius:0px;
            font-size:14px!important;
            color: rgba(1,4,9,0.3);
            border:1px solid rgba(204,206,207,1)
        }
        .el-radio-button:first-child .el-radio-button__inner{
        }
      }
    }
    
    .zindex0{
      z-index: 0;
    }
    .box-chart-os{
      height: 354px!important;
    }
    .empty-image{
      display: flex;
      align-items: center;
      height: 100%;
      transform: translate(0,-100%);
      img{
        width: 100%;
      }
    }
    .el-radio-button__orig-radio:checked+.el-radio-button__inner{
      background-color: #57A4FF!important;
      border-radius: 2px!important;
      color: #fff!important;
      border:1px solid #57A4FF!important;
    }
   
}

</style>