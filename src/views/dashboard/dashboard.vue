<template>
<div>
  <div id="breadcrumb_container">
    <ul class="breadcrumb">
        <li><a href="/">Home</a></li>
        <li class="active">Dashboard</li>
    </ul>
  </div>
  <div v-yeah-loading='hasGetRole' style="min-height: 200px;">
    <async-components 
      v-for="(menuItem, index) in components" 
      :key="index" :model="menuItem" 
      :class="menuItem.className"
      :roleName='roleName'>
    </async-components>
  </div>


  
</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import generateComponents from './permission'
import asyncComponents from './async-components'
import { getRoleName } from './role-ref'
export default {
  data(){
    return {
      components: [],
      hasGetRole: true,
      roleName: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'userInfo',
      dashboardCacheId: 'dashboardCacheId'
    }),
    hasChild() {
      return 
    }
  },
  components: {
    asyncComponents,
  },

  watch: {
    userInfo(val) {
      if(val) {
        this.setRoleName()
        // this.renderAsyncComponents()
        this.addAllPrmComponents() 
        this.hasGetRole = false
      }
    },
    // dashboardCacheId(val) {
    //   if(val) {
    //     this.renderAsyncComponents()
    //   }
    // }
  },
  
  created () {
    if(this.$route.query && this.$route.query.redirect){
      this.$router.push(this.$route.query.redirect)
    }
    // this.getDashboardCacheId()
    if(this.userInfo.role_id) {
      this.setRoleName()
      this.addAllPrmComponents() 
      this.hasGetRole = false
    }
  },
  
  mounted() {
   
  },

  destroyed() {
    // this.setDashboardCacheId(null)
  },

  methods:{
    // ...mapActions([
    //   'getDashboardCacheId',
    //   'setDashboardCacheId'
    // ]),

    setRoleName() {
      let { item_role_id, group_type, role_id } = this.userInfo
      this.roleName = getRoleName(item_role_id, group_type, role_id)
    },

    beforeRenderAsyncComponents() {
      if(this.userInfo && this.dashboardCacheId) {
        this.renderAsyncComponents()
      }
    },

    renderAsyncComponents() {
      if(this.userInfo && this.dashboardCacheId) {
        this.addAllPrmComponents() 
        this.hasGetRole = false
      }
    },

    addAllPrmComponents() {
      this.components = this.components.concat(generateComponents(this.roleName))
    }
  },
}

</script>
<style>
</style>
