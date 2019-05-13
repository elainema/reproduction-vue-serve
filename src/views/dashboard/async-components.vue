<template>
<div>
  <component 
    :is="model.componentName" 
    :roleName='roleName'
    :modelTitle="model.title"
    >
  </component>
  <template
    v-for="(item, index) in model.component">
    <async-components  
      v-if="hasChild" 
      :class="item.className" 
      v-bind:model="item" 
      :roleName='roleName'
      :key="index" />
  </template>
  
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import generateComponents from './permission'
import { 
  ChartTotalAdv, 
  ChartMyGoal,
  ChartTeamGoals,
  ChartTopAdv,
  ChartTopPub,
  ChartTopOffer,
  ChartTopGeo,
  ChartOs,
  ChartBrands,
  ChartSource,
  NewMessage,
  ChartAdminReport,
} from './components/index.js'

export default {
  name: 'async-components',
  props: ['model', 'roleName'],
  data(){
    return {
      components: []
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      dashboardCacheId: 'dashboardCacheId',
    }),
    hasChild(){
      return this.model.component && this.model.component.length
    }
  },
  components: {
    ChartTotalAdv, 
    ChartMyGoal,
    ChartTeamGoals,
    ChartTopAdv,
    ChartTopPub,
    ChartTopOffer,
    ChartTopGeo,
    ChartOs,
    ChartBrands,
    ChartSource,
    NewMessage,
    ChartAdminReport,
  },

  watch: {
    userInfo(val) {
      if(val) {
        this.addAllPrmComponents() 
      }
    },
    dashboardCacheId(val) {
      if(val) {
        this.addAllPrmComponents() 
      }
    },
  },
  
  created () {
  },
  methods:{
    addAllPrmComponents() {
      this.components = this.components.concat(generateComponents(this.userInfo.role_id))
    }
  },
}

</script>
<style lang="less" scoped>
.bgc{
  background:rgba(255,255,255,1);
  box-shadow:0px 0px 4px 3px rgba(29,31,45,0.05);
  border-radius:4px;
}
.bottom30{
  margin-bottom: 30px;
}

.wrap-base(@h: 400px, @w:100%){
  height:@h;
  width: @w;
  .bgc;
  .bottom30;
}
.flexCenter{
  display: flex;
  justify-content: space-between;
}

.wrap-pm-top{
  .flexCenter;
  margin-top: 20px;
  .chart-total-adv, {
    .wrap-base(260px, 784px);
    padding: 0 20px;
  }
  .chart-my-global{
    .wrap-base(260px, 386px);
  }
}

.wrap-os-brands{
  .flexCenter;
  .chart-os{
    .wrap-base(410px, 510px);
  }
  .chart-brands{
    .wrap-base(410px, 660px);
  }
}

.wrap-top-adv{
  .wrap-base;
}

.wrap-top-pub{
  .wrap-base;
}

.wrap-team-goals{
  .wrap-base(418px);
}
.chart-top-adv-m{
  .wrap-base(500px)
}
.chart-top-pub-m{
  .wrap-base(500px)
}
.chart-top-adv{
  .wrap-base(456px);
}
.chart-top-offer{
  .wrap-base(456px);
}
.chart-top-pub{
  .wrap-base(456px);
}
.chart-top-geo{
  .wrap-base(360px)
}
.chart-source{
  .wrap-base(385px);
}
.new-message{
  .wrap-base(400px)
}
</style>

