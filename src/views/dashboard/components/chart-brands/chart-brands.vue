<template>
  <div class ='chart-brands-content'>
    <header>
      <div class="title">
        Brands
      </div>
    </header>
    <div style="height: 354px">
      <echarts
        v-yeah-loading='loading'
        class='zindex0'
        :viewOpt='viewOpt'
        :modelOpt='modelOpt'
        >
      </echarts>
      <div v-if="brandsData.length < 1 && !loading" class="empty-image">
        <img src="@/assets/image/empty.png" />
      </div>
    </div>
  </div>
  
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import viewOptConf from "./conf";
  import { Echarts } from '@/components/common'
  import { CacheService } from '@/util/cacheService'

  export default {
    name: 'chart-brands',
    props: {
      emptyText: {
        type: String,
        default: 'There is no data in recent 7 days.'
      }
    },

    data() {
      return {
        loading: true,
        reportData: [],
        viewOpt: {},
        brandsData: []
      }
    },

    components: { Echarts },
    
    watch: {
    },

    computed: {
      ...mapGetters({
        userInfo: 'userInfo',
      }),
      modelOpt() {
        let valueList = this.brandsData.map(item => {
          return item.conversion
        })
        
        let nameList = this.brandsData.map(item => {
          return item.brand
        })
        
        let maxValueList = new Array(valueList.length).fill(
          Math.max(...valueList)
        )
        
        return {
            yAxis:[{
              data: nameList.reverse()
            }],
            xAxis: {
            },
            series: [{
              type: 'bar',
              z:3,
              barMaxWidth :38,
              label: {
                normal: {
                  show: true,
                  position: "right",
                  textStyle: {
                    color: "#010409",
                    fontSize: 12
                  }
                }
              },
              data: valueList.reverse()
            },
            { // For shadow
                type: 'bar',
                barMaxWidth :38,
                itemStyle: {
                    normal: {
                        color: 'rgba(0,0,0,0.05)',
                    }
                },
                label:{
                  normal: {
                    show:false,
                    position:'right',
                    color :'#000',
                    formatter: '{@old_goal}/{@goal}'
                  }
                },
                barGap:'-100%',
                barCategoryGap:'40%',
                animation: true,
                data: maxValueList
            }
          ]
        }
      }
    },

    created() {
      this.viewOpt = viewOptConf
      this.fetchBrandsData()
    },

    methods: {
      fetchBrandsData() {
        this.loading = true
        CacheService.fetchData('Dashboard/getConversionByBrands')
          .then(data => {
            this.loading = false
            
            if(data) {
              this.brandsData = data
            } else {
              this.brandsData = []
            }
          })
          .catch(err => {
            this.brandsData = []
            this.loading = false
          })
      },
    },

    mounted() {
      
    }
  };
</script>
<style lang="less">
.chart-brands-content{
  position: relative;
  height: 100%;
  width: 100%;
  header{
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 0 30px;
    .title{
      color:rgba(1,4,9,1);
      line-height:26px;
      font-size:22px;
      font-weight: 800;
      height: 26px;
    }
  }
  .empty-image{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    transform: translate(0,-100%);
    img{
      width: 510px;
    }
  }
}
</style>